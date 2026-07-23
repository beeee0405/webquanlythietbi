namespace backend.Data.Entities;

public class Software
{
    public int Id { get; set; }
    public string Name { get; set; } = "";
    public string Publisher { get; set; } = "";
    public string Version { get; set; } = "";
    public string Category { get; set; } = ""; // Há»‡ Ä‘iá»u hÃ nh, VÄƒn phÃ²ng, Báº£o máº­t, Thiáº¿t káº¿, Láº­p trÃ¬nh
    public string LicenseType { get; set; } = ""; // Báº£n quyá»n, MÃ£ nguá»“n má»Ÿ, Trial
    public string LicenseKey { get; set; } = "";
    public int TotalLicenses { get; set; }
    public int UsedLicenses { get; set; }
    public string ExpiresAt { get; set; } = "";
    public int? RoomId { get; set; }
    public string Status { get; set; } = ""; // Äang dÃ¹ng, Háº¿t háº¡n, Sáº¯p háº¿t háº¡n
    public string Note { get; set; } = "";

    // Navigation properties
    public Room? Room { get; set; }
}

