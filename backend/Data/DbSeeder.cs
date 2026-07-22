using backend.Data.Entities;
using Microsoft.EntityFrameworkCore;
using System.Security.Cryptography;
using System.Text;

namespace backend.Data;

public static class DbSeeder
{
    public static async Task SeedAsync(AppDbContext db)
    {
        // Create admin account if it doesn't exist
        if (!await db.IdentityUsers.AnyAsync())
        {
            var adminUser = new AppIdentityUser
            {
                Id = "admin-001",
                Username = "admin",
                Email = "admin@system.local",
                FullName = "Quản trị viên",
                Phone = "0000000000",
                Department = "IT",
                Room = "IT",
                Role = "Quản trị viên",
                Status = "Đang hoạt động",
                IsActive = true,
                PasswordHash = HashPassword("Admin@123"),
                CreatedAt = DateTime.Now.ToString("dd/MM/yyyy HH:mm:ss"),
                LastLogin = ""
            };

            db.IdentityUsers.Add(adminUser);
            await db.SaveChangesAsync();
        }
    }

    private static string HashPassword(string password)
    {
        using (var sha256 = SHA256.Create())
        {
            var hashedBytes = sha256.ComputeHash(Encoding.UTF8.GetBytes(password));
            return Convert.ToBase64String(hashedBytes);
        }
    }
}
