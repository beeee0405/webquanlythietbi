namespace backend.Data.Entities;

public class Ticket
{
    public int Id { get; set; }
    public string Code { get; set; } = "";
    public string Subject { get; set; } = "";
    public string Requester { get; set; } = "";
    public string Room { get; set; } = "";
    public string Device { get; set; } = "";
    public string Category { get; set; } = "";
    public string Priority { get; set; } = "";
    public string Status { get; set; } = "";
    public string Channel { get; set; } = "";
    public string Assignee { get; set; } = "";
    public string Sla { get; set; } = "";
    public string CreatedAt { get; set; } = "";
    public string UpdatedAt { get; set; } = "";
}
