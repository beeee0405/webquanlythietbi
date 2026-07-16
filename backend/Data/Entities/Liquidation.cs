namespace backend.Data.Entities;

public class Liquidation
{
    public int Id { get; set; }
    public string Code { get; set; } = "";
    public string AssetCode { get; set; } = "";
    public string AssetName { get; set; } = "";
    public string Room { get; set; } = "";
    public string Reason { get; set; } = "";
    public string Condition { get; set; } = ""; // Hỏng hoàn toàn, Lạc hậu, Mất mát
    public string Status { get; set; } = ""; // Chờ duyệt, Đã duyệt, Hoàn thành
    public string Requester { get; set; } = "";
    public string Approver { get; set; } = "";
    public decimal ResidualValue { get; set; }
    public string RequestedAt { get; set; } = "";
    public string CompletedAt { get; set; } = "";
    public string Note { get; set; } = "";
}
