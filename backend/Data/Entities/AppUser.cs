namespace backend.Data.Entities;

public class AppUser
{
    public int Id { get; set; }
    public string FullName { get; set; } = "";
    public string Email { get; set; } = "";
    public string Phone { get; set; } = "";
    public string Department { get; set; } = "";
    public string Room { get; set; } = "";
    public string Role { get; set; } = ""; // Quáº£n trá»‹ viÃªn, Ká»¹ thuáº­t viÃªn, NhÃ¢n viÃªn
    public string Status { get; set; } = ""; // Äang hoáº¡t Ä‘á»™ng, Nghá»‰ phÃ©p, ÄÃ£ nghá»‰ viá»‡c
    public string CreatedAt { get; set; } = "";
    public string LastLogin { get; set; } = "";
    public string Avatar { get; set; } = "";
}

