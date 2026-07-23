using System.Security.Cryptography;
using System.Text;
using backend.Data;
using backend.Data.Entities;
using Microsoft.EntityFrameworkCore;

namespace backend.Services;

public interface IAuthService
{
    Task<LoginResponse?> LoginAsync(LoginRequest request);
    Task<LoginResponse?> RegisterAsync(RegisterRequest request);
    Task<TokenResponse?> RefreshTokenAsync(string refreshToken, string userId);
}

public class AuthService : IAuthService
{
    private readonly AppDbContext _db;
    private readonly IJwtTokenService _jwtService;
    private readonly ILogger<AuthService> _logger;

    public AuthService(AppDbContext db, IJwtTokenService jwtService, ILogger<AuthService> logger)
    {
        _db = db;
        _jwtService = jwtService;
        _logger = logger;
    }

    public async Task<LoginResponse?> LoginAsync(LoginRequest request)
    {
        try
        {
            var reqUser = request.Username.ToLower().Trim();
            var user = await _db.IdentityUsers
                .FirstOrDefaultAsync(u => (u.Username.ToLower() == reqUser || u.Email.ToLower() == reqUser) && u.IsActive);

            if (user == null || !VerifyPassword(request.Password, user.PasswordHash))
            {
                _logger.LogWarning($"Đăng nhập thất bại: {request.Username}");
                return null;
            }

            var accessToken = _jwtService.GenerateAccessToken(user);
            var refreshToken = _jwtService.GenerateRefreshToken();

            user.LastLogin = DateTime.Now.ToString("dd/MM/yyyy HH:mm:ss");
            await _db.SaveChangesAsync();

            var userInfo = new UserInfoDto(
                user.Id, user.Username, user.Email, user.FullName,
                user.Phone, user.Department, user.Room, user.Role, user.Status);

            return new LoginResponse(accessToken, refreshToken, userInfo);
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Lỗi khi đăng nhập");
            return null;
        }
    }

    public async Task<LoginResponse?> RegisterAsync(RegisterRequest request)
    {
        try
        {
            var existingUser = await _db.IdentityUsers
                .FirstOrDefaultAsync(u => u.Username == request.Username || u.Email == request.Email);

            if (existingUser != null)
            {
                _logger.LogWarning($"Đăng ký thất bại: Username hoặc email đã tồn tại");
                return null;
            }

            var user = new AppIdentityUser
            {
                Username = request.Username,
                Email = request.Email,
                FullName = request.FullName,
                Phone = request.Phone,
                Department = request.Department,
                Room = request.Room,
                Role = "Người dùng",
                Status = "Đang hoạt động",
                PasswordHash = HashPassword(request.Password),
                IsActive = true
            };

            _db.IdentityUsers.Add(user);
            await _db.SaveChangesAsync();

            var accessToken = _jwtService.GenerateAccessToken(user);
            var refreshToken = _jwtService.GenerateRefreshToken();

            var userInfo = new UserInfoDto(
                user.Id, user.Username, user.Email, user.FullName,
                user.Phone, user.Department, user.Room, user.Role, user.Status);

            return new LoginResponse(accessToken, refreshToken, userInfo);
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Lỗi khi đăng ký");
            return null;
        }
    }

    public async Task<TokenResponse?> RefreshTokenAsync(string refreshToken, string userId)
    {
        try
        {
            var user = await _db.IdentityUsers.FirstOrDefaultAsync(u => u.Id == userId && u.IsActive);
            if (user == null)
                return null;

            var accessToken = _jwtService.GenerateAccessToken(user);
            var newRefreshToken = _jwtService.GenerateRefreshToken();

            return new TokenResponse(accessToken, newRefreshToken);
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Lỗi khi refresh token");
            return null;
        }
    }

    private string HashPassword(string password)
    {
        using (var sha256 = SHA256.Create())
        {
            var hashedBytes = sha256.ComputeHash(Encoding.UTF8.GetBytes(password));
            return Convert.ToBase64String(hashedBytes);
        }
    }

    private bool VerifyPassword(string password, string hash)
    {
        var hashOfInput = Convert.ToBase64String(SHA256.Create().ComputeHash(Encoding.UTF8.GetBytes(password)));
        return hashOfInput == hash;
    }
}
