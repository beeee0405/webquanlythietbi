namespace backend.Data.Entities;

public class Device
{
    public int Id { get; set; }
    public string AssetCode { get; set; } = "";
    public string Name { get; set; } = "";
    public string Category { get; set; } = "";
    public string Brand { get; set; } = "";
    public int RoomId { get; set; }
    public int OwnerId { get; set; }
    public string Status { get; set; } = "";
    public string Warranty { get; set; } = "";
    public string Serial { get; set; } = "";
    public string PurchaseDate { get; set; } = "";
    public string UpdatedAt { get; set; } = "";

    // Navigation properties
    public Room? Room { get; set; }
    public AppUser? Owner { get; set; }
}
