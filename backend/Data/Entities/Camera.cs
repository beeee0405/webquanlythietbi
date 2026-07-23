namespace backend.Data.Entities;

public class Camera
{
    public int Id { get; set; }
    public string Code { get; set; } = "";
    public string Name { get; set; } = "";
    public int RoomId { get; set; }
    public string IpAddress { get; set; } = "";
    public string Brand { get; set; } = "";
    public string Model { get; set; } = "";
    public string Resolution { get; set; } = "";
    public string Status { get; set; } = "";
    public string InstalledAt { get; set; } = "";
    public string Warranty { get; set; } = "";
    public string Note { get; set; } = "";

    // Navigation properties
    public Room? Room { get; set; }
}
