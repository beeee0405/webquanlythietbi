namespace backend.Data.Entities;

public class Ticket
{
    public int Id { get; set; }
    public string Code { get; set; } = "";
    public string Subject { get; set; } = "";
    public int RequesterId { get; set; }
    public int RoomId { get; set; }
    public int DeviceId { get; set; }
    public string Category { get; set; } = "";
    public string Priority { get; set; } = "";
    public string Status { get; set; } = "";
    public string Channel { get; set; } = "";
    public int AssigneeId { get; set; }
    public string Sla { get; set; } = "";
    public string CreatedAt { get; set; } = "";
    public string UpdatedAt { get; set; } = "";

    // Navigation properties
    public AppUser? Requester { get; set; }
    public Room? Room { get; set; }
    public Device? Device { get; set; }
    public AppUser? Assignee { get; set; }
}
