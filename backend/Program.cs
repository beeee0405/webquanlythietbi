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
        try {
            await db.Database.ExecuteSqlRawAsync($"INSERT INTO {table} (\"MigrationId\", \"ProductVersion\") VALUES ('20260723053250_InitPostgres', '8.0.2')");
        } catch { }
    }
    catch { }

    // Apply migrations (works for both SQLite and PostgreSQL)
    await db.Database.MigrateAsync();
    await DbSeeder.SeedAsync(db);
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
