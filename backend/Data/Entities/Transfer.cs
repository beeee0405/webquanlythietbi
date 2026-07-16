namespace backend.Data.Entities;

public class Transfer
{
    public int Id { get; set; }
    public string Code { get; set; } = "";
    public string AssetCode { get; set; } = "";
    public string AssetName { get; set; } = "";
    public string FromRoom { get; set; } = "";
    public string ToRoom { get; set; } = "";
    public string Requester { get; set; } = "";
    public string Approver { get; set; } = "";
    public string Status { get; set; } = ""; // Chờ duyệt, Đã duyệt, Hoàn thành, Từ chối
    public string TransferredAt { get; set; } = "";
    public string ApprovedAt { get; set; } = "";
    public string Note { get; set; } = "";
}
