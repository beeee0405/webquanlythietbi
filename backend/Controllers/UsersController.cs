using backend.Data;
using backend.Data.Entities;
using backend.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Security.Cryptography;
using System.Text;

namespace backend.Controllers;

[ApiController]
[Route("api/[controller]")]
public class UsersController : ControllerBase
{
    private readonly AppDataService _data;
    private readonly AppDbContext _db;

    public UsersController(AppDataService data, AppDbContext db)
    {
        _data = data;
        _db = db;
    }

    [HttpGet]
    [Authorize(Policy = "AnyUser")]
    public async Task<ActionResult<UserManagementResponse>> Get()
    {
        return Ok(await _data.GetUserManagementAsync());
    }

    [HttpPost]
    [Authorize(Policy = "AdminOnly")]
    public async Task<ActionResult<AppUserDto>> Create([FromBody] CreateUserRequest dto)
    {
        if (string.IsNullOrEmpty(dto.FullName) || string.IsNullOrEmpty(dto.Email))
            return BadRequest("Họ tên và email không được để trống");

        if (string.IsNullOrEmpty(dto.Username) || string.IsNullOrEmpty(dto.Password))
            return BadRequest("Username và mật khẩu không được để trống");

        // Check if username already exists
        var existingUser = await _db.IdentityUsers.FirstOrDefaultAsync(u => u.Username == dto.Username);
        if (existingUser != null)
            return BadRequest("Username đã tồn tại");

        // Create IdentityUser (for login)
        var hashedPassword = HashPassword(dto.Password);
        var identityUser = new AppIdentityUser
        {
            Id = Guid.NewGuid().ToString(),
            Username = dto.Username,
            Email = dto.Email,
            FullName = dto.FullName,
            Phone = dto.Phone ?? "",
            Department = dto.Department ?? "",
            Room = dto.Room ?? "",
            Role = dto.Role ?? "Người dùng",
            Status = dto.Status ?? "Đang hoạt động",
            IsActive = true,
            PasswordHash = hashedPassword,
            CreatedAt = DateTime.Now.ToString("dd/MM/yyyy HH:mm:ss"),
            LastLogin = ""
        };

        _db.IdentityUsers.Add(identityUser);

        // Create AppUser (for display)
        var appUser = new AppUser
        {
            Avatar = "",
            Email = dto.Email,
            FullName = dto.FullName,
            Phone = dto.Phone ?? "",
            Department = dto.Department ?? "",
            Room = dto.Room ?? "",
            Role = dto.Role ?? "Người dùng",
            Status = dto.Status ?? "Đang hoạt động",
            CreatedAt = DateTime.Now.ToString("dd/MM/yyyy HH:mm:ss"),
            LastLogin = ""
        };

        _db.AppUsers.Add(appUser);
        await _db.SaveChangesAsync();

        return CreatedAtAction(nameof(Get), EntityMapper.ToDto(appUser));
    }

    [HttpPut("{id}")]
    [Authorize(Policy = "AdminOnly")]
    public async Task<IActionResult> Update(int id, [FromBody] AppUserDto dto)
    {
        var user = await _db.AppUsers.FirstOrDefaultAsync(u => u.Id == id);
        if (user == null)
            return NotFound();

        user.FullName = dto.FullName ?? user.FullName;
        user.Email = dto.Email ?? user.Email;
        user.Phone = dto.Phone ?? user.Phone;
        user.Department = dto.Department ?? user.Department;
        user.Room = dto.Room ?? user.Room;
        user.Role = dto.Role ?? user.Role;
        user.Status = dto.Status ?? user.Status;

        await _db.SaveChangesAsync();
        return Ok(new { message = "Cập nhật người dùng thành công" });
    }

    [HttpDelete("{id}")]
    [Authorize(Policy = "AdminOnly")]
    public async Task<IActionResult> Delete(int id)
    {
        var user = await _db.AppUsers.FirstOrDefaultAsync(u => u.Id == id);
        if (user == null)
            return NotFound();

        _db.AppUsers.Remove(user);
        await _db.SaveChangesAsync();
        return Ok(new { message = "Xóa người dùng thành công" });
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

public class CreateUserRequest
{
    public string? FullName { get; set; }
    public string? Email { get; set; }
    public string? Username { get; set; }
    public string? Password { get; set; }
    public string? Phone { get; set; }
    public string? Department { get; set; }
    public string? Room { get; set; }
    public string? Role { get; set; }
    public string? Status { get; set; }
}
