namespace backend.Data.Entities;

public class Liquidation
{
    public int Id { get; set; }
    public string Code { get; set; } = "";
    public int? DeviceId { get; set; }
    public int? RoomId { get; set; }
    public string Reason { get; set; } = "";
    public string Condition { get; set; } = ""; // Há»ng hoÃ n toÃ n, Láº¡c háº­u, Máº¥t mÃ¡t
    public string Status { get; set; } = ""; // Chá» duyá»‡t, ÄÃ£ duyá»‡t, HoÃ n thÃ nh
    public int? RequesterId { get; set; }
    public int? ApproverId { get; set; }
    public decimal ResidualValue { get; set; }
    public string RequestedAt { get; set; } = "";
    public string CompletedAt { get; set; } = "";
    public string Note { get; set; } = "";

    // Navigation properties
    public Device? Device { get; set; }
    public Room? Room { get; set; }
    public AppUser? Requester { get; set; }
    public AppUser? Approver { get; set; }
}

