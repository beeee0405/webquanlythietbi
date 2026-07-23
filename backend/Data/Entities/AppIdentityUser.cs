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
    public string Role { get; set; } = "NhÃ¢n viÃªn"; // Quáº£n trá»‹ viÃªn, Ká»¹ thuáº­t viÃªn, NhÃ¢n viÃªn
    public string Status { get; set; } = "Äang hoáº¡t Ä‘á»™ng"; // Äang hoáº¡t Ä‘á»™ng, Nghá»‰ phÃ©p, ÄÃ£ nghá»‰ viá»‡c
    public bool IsActive { get; set; } = true;
    public string CreatedAt { get; set; } = DateTime.Now.ToString("dd/MM/yyyy HH:mm");
    public string LastLogin { get; set; } = "";
}

