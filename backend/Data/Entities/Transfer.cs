namespace backend.Data.Entities;

public class Transfer
{
    public int Id { get; set; }
    public string Code { get; set; } = "";
    public int? DeviceId { get; set; }
    public int? FromRoomId { get; set; }
    public int? ToRoomId { get; set; }
    public int? RequesterId { get; set; }
    public int? ApproverId { get; set; }
    public string Status { get; set; } = ""; // Chá» duyá»‡t, ÄÃ£ duyá»‡t, HoÃ n thÃ nh, Tá»« chá»‘i
    public string TransferredAt { get; set; } = "";
    public string ApprovedAt { get; set; } = "";
    public string Note { get; set; } = "";

    // Navigation properties
    public Device? Device { get; set; }
    public Room? FromRoom { get; set; }
    public Room? ToRoom { get; set; }
    public AppUser? Requester { get; set; }
    public AppUser? Approver { get; set; }
}

