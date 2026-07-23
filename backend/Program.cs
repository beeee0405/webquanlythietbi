using backend.Data;
using backend.Services;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using System.Text;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddControllers(options => 
{
    options.SuppressImplicitRequiredAttributeForNonNullableReferenceTypes = true;
});
builder.Services.AddCors(options =>
{
    options.AddPolicy("Frontend", policy =>
    {
        policy.AllowAnyOrigin()
            .AllowAnyHeader()
            .AllowAnyMethod();
    });
});
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

// Add JWT Authentication
var jwtSettings = builder.Configuration.GetSection("JwtSettings");
var key = Encoding.ASCII.GetBytes(jwtSettings["Key"]!);

builder.Services.AddAuthentication(x =>
{
    x.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
    x.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
})
.AddJwtBearer(x =>
{
    x.TokenValidationParameters = new TokenValidationParameters
    {
        ValidateIssuerSigningKey = true,
        IssuerSigningKey = new SymmetricSecurityKey(key),
        ValidateIssuer = true,
        ValidIssuer = jwtSettings["Issuer"],
        ValidateAudience = true,
        ValidAudience = jwtSettings["Audience"],
        ValidateLifetime = true,
        ClockSkew = TimeSpan.Zero
    };
});

// Add Authorization Policies
builder.Services.AddAuthorization(options =>
{
    options.AddPolicy("AdminOnly", policy =>
        policy.RequireRole("Quản trị viên"));

    options.AddPolicy("InfrastructureOrAdmin", policy =>
        policy.RequireRole("Quản trị viên", "Chuyên viên Phòng Hạ tầng"));

    options.AddPolicy("AnyUser", policy =>
        policy.RequireAuthenticatedUser());
    
    // Legacy policy for backward compatibility
    options.AddPolicy("TechOrAdmin", policy =>
        policy.RequireRole("Quản trị viên", "Chuyên viên Phòng Hạ tầng"));
});

// Detect DATABASE_URL env var (Render/Supabase) → PostgreSQL, fallback to SQLite for local dev
var dbUrl = Environment.GetEnvironmentVariable("DATABASE_URL")
    ?? builder.Configuration.GetConnectionString("DefaultConnection");

builder.Services.AddDbContext<AppDbContext>(options =>
{
    if (dbUrl != null && (dbUrl.StartsWith("postgresql://") || dbUrl.StartsWith("postgres://")))
    {
        // Parse Supabase URI format: postgresql://user:password@host:port/db
        var uri = new Uri(dbUrl);
        var userInfo = uri.UserInfo.Split(':', 2);
        
        var builder = new Npgsql.NpgsqlConnectionStringBuilder
        {
            Host = uri.Host,
            Port = uri.Port > 0 ? uri.Port : 5432,
            Username = userInfo[0],
            Password = userInfo.Length > 1 ? userInfo[1] : "",
            Database = uri.AbsolutePath.TrimStart('/'),
            SslMode = Npgsql.SslMode.Require,
            TrustServerCertificate = true,
            Timeout = 60,
            CommandTimeout = 60,
            Pooling = true
        };
        options.UseNpgsql(builder.ConnectionString);
    }
    else
        options.UseSqlite(dbUrl ?? "Data Source=devices.db");
});

// Register Services
builder.Services.AddScoped<AppDataService>();
builder.Services.AddScoped<IJwtTokenService, JwtTokenService>();
builder.Services.AddScoped<IAuthService, AuthService>();

var app = builder.Build();

try
{
    using var scope = app.Services.CreateScope();
    var db = scope.ServiceProvider.GetRequiredService<AppDbContext>();
    var logger = scope.ServiceProvider.GetRequiredService<ILogger<Program>>();

    try
    {
        await db.Database.ExecuteSqlRawAsync("SELECT 1 FROM \"AppIdentityUsers\" LIMIT 1");
        var isNpgsql = db.Database.IsNpgsql();
        var table = isNpgsql ? "\"__EFMigrationsHistory\"" : "__EFMigrationsHistory";
        await db.Database.ExecuteSqlRawAsync($"CREATE TABLE IF NOT EXISTS {table} (\"MigrationId\" TEXT NOT NULL PRIMARY KEY, \"ProductVersion\" TEXT NOT NULL)");
        var migrations = new[] {
            "20260723053250_InitPostgres",
            "20260723155551_RefactorToForeignKeys",
            "20260723173444_FixSoftwareRoomId",
            "20260723174051_MakeFKsNullable",
            "20260723180125_AddAssetCodeToModules"
        };
        foreach (var m in migrations) {
            try { await db.Database.ExecuteSqlRawAsync($"INSERT INTO {table} (\"MigrationId\", \"ProductVersion\") VALUES ('{m}', '8.0.2')"); } catch { }
        }

        if (isNpgsql)
        {
            var sqls = new[] {
                "ALTER TABLE \"Softwares\" ADD COLUMN IF NOT EXISTS \"RoomId\" integer;",
                "ALTER TABLE \"Tickets\" ADD COLUMN IF NOT EXISTS \"RoomId\" integer;",
                "ALTER TABLE \"Tickets\" ADD COLUMN IF NOT EXISTS \"DeviceId\" integer;",
                "ALTER TABLE \"Tickets\" ADD COLUMN IF NOT EXISTS \"RequesterId\" integer;",
                "ALTER TABLE \"Tickets\" ADD COLUMN IF NOT EXISTS \"AssigneeId\" integer;",
                "ALTER TABLE \"Devices\" ADD COLUMN IF NOT EXISTS \"RoomId\" integer;",
                "ALTER TABLE \"Devices\" ADD COLUMN IF NOT EXISTS \"OwnerId\" integer;",
                "ALTER TABLE \"Cameras\" ADD COLUMN IF NOT EXISTS \"RoomId\" integer;",
                "ALTER TABLE \"NetworkDevices\" ADD COLUMN IF NOT EXISTS \"RoomId\" integer;",
                "ALTER TABLE \"MaintenanceItems\" ADD COLUMN IF NOT EXISTS \"RoomId\" integer;",
                "ALTER TABLE \"MaintenanceItems\" ADD COLUMN IF NOT EXISTS \"AssigneeId\" integer;",
                "ALTER TABLE \"MaintenanceItems\" ADD COLUMN IF NOT EXISTS \"DeviceId\" integer;",
                "ALTER TABLE \"MaintenanceItems\" ADD COLUMN IF NOT EXISTS \"AssetCode\" text;",
                "ALTER TABLE \"MaintenanceItems\" ADD COLUMN IF NOT EXISTS \"AssetName\" text;",
                "ALTER TABLE \"Transfers\" ADD COLUMN IF NOT EXISTS \"FromRoomId\" integer;",
                "ALTER TABLE \"Transfers\" ADD COLUMN IF NOT EXISTS \"ToRoomId\" integer;",
                "ALTER TABLE \"Transfers\" ADD COLUMN IF NOT EXISTS \"RequesterId\" integer;",
                "ALTER TABLE \"Transfers\" ADD COLUMN IF NOT EXISTS \"ApproverId\" integer;",
                "ALTER TABLE \"Transfers\" ADD COLUMN IF NOT EXISTS \"DeviceId\" integer;",
                "ALTER TABLE \"Transfers\" ADD COLUMN IF NOT EXISTS \"AssetCode\" text;",
                "ALTER TABLE \"Transfers\" ADD COLUMN IF NOT EXISTS \"AssetName\" text;",
                "ALTER TABLE \"Liquidations\" ADD COLUMN IF NOT EXISTS \"RoomId\" integer;",
                "ALTER TABLE \"Liquidations\" ADD COLUMN IF NOT EXISTS \"RequesterId\" integer;",
                "ALTER TABLE \"Liquidations\" ADD COLUMN IF NOT EXISTS \"ApproverId\" integer;",
                "ALTER TABLE \"Liquidations\" ADD COLUMN IF NOT EXISTS \"DeviceId\" integer;",
                "ALTER TABLE \"Liquidations\" ADD COLUMN IF NOT EXISTS \"AssetCode\" text;",
                "ALTER TABLE \"Liquidations\" ADD COLUMN IF NOT EXISTS \"AssetName\" text;",
                "ALTER TABLE \"InventorySessions\" ADD COLUMN IF NOT EXISTS \"RoomId\" integer;",
                "ALTER TABLE \"InventorySessions\" ADD COLUMN IF NOT EXISTS \"InspectorId\" integer;",
                "ALTER TABLE \"Softwares\" DROP COLUMN IF EXISTS \"Room\";",
                "ALTER TABLE \"Tickets\" DROP COLUMN IF EXISTS \"Room\";",
                "ALTER TABLE \"Tickets\" DROP COLUMN IF EXISTS \"Requester\";",
                "ALTER TABLE \"Tickets\" DROP COLUMN IF EXISTS \"Assignee\";",
                "ALTER TABLE \"Tickets\" DROP COLUMN IF EXISTS \"Device\";",
                "ALTER TABLE \"Devices\" DROP COLUMN IF EXISTS \"Room\";",
                "ALTER TABLE \"Devices\" DROP COLUMN IF EXISTS \"Owner\";",
                "ALTER TABLE \"Cameras\" DROP COLUMN IF EXISTS \"Room\";",
                "ALTER TABLE \"NetworkDevices\" DROP COLUMN IF EXISTS \"Room\";",
                "ALTER TABLE \"MaintenanceItems\" DROP COLUMN IF EXISTS \"Room\";",
                "ALTER TABLE \"MaintenanceItems\" DROP COLUMN IF EXISTS \"Assignee\";",
                "ALTER TABLE \"MaintenanceItems\" DROP COLUMN IF EXISTS \"Device\";",
                "ALTER TABLE \"Transfers\" DROP COLUMN IF EXISTS \"FromRoom\";",
                "ALTER TABLE \"Transfers\" DROP COLUMN IF EXISTS \"ToRoom\";",
                "ALTER TABLE \"Transfers\" DROP COLUMN IF EXISTS \"Requester\";",
                "ALTER TABLE \"Transfers\" DROP COLUMN IF EXISTS \"Approver\";",
                "ALTER TABLE \"Transfers\" DROP COLUMN IF EXISTS \"Device\";",
                "ALTER TABLE \"Liquidations\" DROP COLUMN IF EXISTS \"Room\";",
                "ALTER TABLE \"Liquidations\" DROP COLUMN IF EXISTS \"Requester\";",
                "ALTER TABLE \"Liquidations\" DROP COLUMN IF EXISTS \"Approver\";",
                "ALTER TABLE \"Liquidations\" DROP COLUMN IF EXISTS \"Device\";",
                "ALTER TABLE \"InventorySessions\" DROP COLUMN IF EXISTS \"Room\";",
                "ALTER TABLE \"InventorySessions\" DROP COLUMN IF EXISTS \"Inspector\";"
            };
            foreach (var sql in sqls) {
                try { await db.Database.ExecuteSqlRawAsync(sql); } catch { }
            }
        }
    }
    catch { }

    // Apply migrations (works for both SQLite and PostgreSQL)
    try { await db.Database.MigrateAsync(); } catch (Exception ex) { logger.LogError(ex, "MigrateAsync failed"); }
    try { await DbSeeder.SeedAsync(db); } catch (Exception ex) { logger.LogError(ex, "DbSeeder failed"); }
    logger.LogInformation("Database đã sẵn sàng. Admin account đã được tạo (nếu chưa tồn tại).");
}
catch (Exception ex)
{
    var logger = app.Services.GetRequiredService<ILogger<Program>>();
    logger.LogError(ex, "Không thể kết nối SQL Server. Kiểm tra appsettings.json và đảm bảo SQL Server đang chạy.");
}

if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseCors("Frontend");
app.UseAuthentication();
app.UseAuthorization();
app.MapControllers();

app.Run();
