namespace backend.Data.Entities;

public class MaintenanceItem
{
    public int Id { get; set; }
    public string Code { get; set; } = "";
    public string Title { get; set; } = "";
    public int? DeviceId { get; set; }
    public int? RoomId { get; set; }
    public string Type { get; set; } = "";
    public string Priority { get; set; } = "";
    public string Status { get; set; } = "";
    public int? AssigneeId { get; set; }
    public string ScheduledAt { get; set; } = "";
    public string CompletedAt { get; set; } = "";
    public string Cost { get; set; } = "";
    public string Note { get; set; } = "";

    // Navigation properties
    public Device? Device { get; set; }
    public Room? Room { get; set; }
    public AppUser? Assignee { get; set; }
}

