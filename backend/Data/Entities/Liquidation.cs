namespace backend.Data.Entities;

public class Liquidation
{
    public int Id { get; set; }
    public string Code { get; set; } = "";
    public int DeviceId { get; set; }
    public int RoomId { get; set; }
    public string Reason { get; set; } = "";
    public string Condition { get; set; } = ""; // Hỏng hoàn toàn, Lạc hậu, Mất mát
    public string Status { get; set; } = ""; // Chờ duyệt, Đã duyệt, Hoàn thành
    public int RequesterId { get; set; }
    public int ApproverId { get; set; }
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
