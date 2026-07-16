namespace backend.Data.Entities;

public class AppUser
{
    public int Id { get; set; }
    public string FullName { get; set; } = "";
    public string Email { get; set; } = "";
    public string Phone { get; set; } = "";
    public string Department { get; set; } = "";
    public string Room { get; set; } = "";
    public string Role { get; set; } = ""; // Quản trị viên, Kỹ thuật viên, Nhân viên
    public string Status { get; set; } = ""; // Đang hoạt động, Nghỉ phép, Đã nghỉ việc
    public string CreatedAt { get; set; } = "";
    public string LastLogin { get; set; } = "";
    public string Avatar { get; set; } = "";
}
