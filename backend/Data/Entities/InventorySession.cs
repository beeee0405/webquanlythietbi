namespace backend.Data.Entities;

public class InventorySession
{
    public int Id { get; set; }
    public string Code { get; set; } = "";
    public int RoomId { get; set; }
    public int InspectorId { get; set; }
    public string Status { get; set; } = ""; // Đang kiểm, Hoàn thành, Có lệch
    public int TotalDevices { get; set; }
    public int CheckedDevices { get; set; }
    public int MissingDevices { get; set; }
    public int ExtraDevices { get; set; }
    public string StartedAt { get; set; } = "";
    public string CompletedAt { get; set; } = "";
    public string Note { get; set; } = "";

    // Navigation properties
    public Room? Room { get; set; }
    public AppUser? Inspector { get; set; }
}
