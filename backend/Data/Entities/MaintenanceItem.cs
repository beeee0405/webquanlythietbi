namespace backend.Data.Entities;

public class MaintenanceItem
{
    public int Id { get; set; }
    public string Code { get; set; } = "";
    public string Title { get; set; } = "";
    public string AssetCode { get; set; } = "";
    public string AssetName { get; set; } = "";
    public string Room { get; set; } = "";
    public string Type { get; set; } = "";
    public string Priority { get; set; } = "";
    public string Status { get; set; } = "";
    public string Assignee { get; set; } = "";
    public string ScheduledAt { get; set; } = "";
    public string CompletedAt { get; set; } = "";
    public string Cost { get; set; } = "";
    public string Note { get; set; } = "";
}
