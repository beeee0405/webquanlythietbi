namespace backend.Data;

public record LoginRequest(string Username, string Password);

public record RegisterRequest(
    string Username,
    string Email,
    string Password,
    string FullName,
    string Phone,
    string Department,
    string Room);

public record LoginResponse(
    string AccessToken,
    string RefreshToken,
    UserInfoDto User);

public record RefreshTokenRequest(string RefreshToken);

public record UserInfoDto(
    string Id,
    string Username,
    string Email,
    string FullName,
    string Phone,
    string Department,
    string Room,
    string Role,
    string Status);

public record TokenResponse(
    string AccessToken,
    string RefreshToken);
