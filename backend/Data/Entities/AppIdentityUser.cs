namespace backend.Data.Entities;

public class AppIdentityUser
{
    public string Id { get; set; } = Guid.NewGuid().ToString();
    public string Username { get; set; } = "";
    public string Email { get; set; } = "";
    public string PasswordHash { get; set; } = "";
    public string FullName { get; set; } = "";
    public string Phone { get; set; } = "";
    public string Department { get; set; } = "";
    public string Room { get; set; } = "";
    public string Role { get; set; } = "Nhân viên"; // Quản trị viên, Kỹ thuật viên, Nhân viên
    public string Status { get; set; } = "Đang hoạt động"; // Đang hoạt động, Nghỉ phép, Đã nghỉ việc
    public bool IsActive { get; set; } = true;
    public string CreatedAt { get; set; } = DateTime.Now.ToString("dd/MM/yyyy HH:mm");
    public string LastLogin { get; set; } = "";
}
