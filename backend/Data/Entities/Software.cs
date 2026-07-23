namespace backend.Data.Entities;

public class Software
{
    public int Id { get; set; }
    public string Name { get; set; } = "";
    public string Publisher { get; set; } = "";
    public string Version { get; set; } = "";
    public string Category { get; set; } = ""; // Hệ điều hành, Văn phòng, Bảo mật, Thiết kế, Lập trình
    public string LicenseType { get; set; } = ""; // Bản quyền, Mã nguồn mở, Trial
    public string LicenseKey { get; set; } = "";
    public int TotalLicenses { get; set; }
    public int UsedLicenses { get; set; }
    public string ExpiresAt { get; set; } = "";
    public int? RoomId { get; set; }
    public string Status { get; set; } = ""; // Đang dùng, Hết hạn, Sắp hết hạn
    public string Note { get; set; } = "";

    // Navigation properties
    public Room? Room { get; set; }
}
