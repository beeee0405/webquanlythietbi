namespace backend.Data.Entities;

public class Room
{
    public int Id { get; set; }
    public string Code { get; set; } = "";
    public string Name { get; set; } = "";
    public string Building { get; set; } = "";
    public string Floor { get; set; } = "";
    public string Type { get; set; } = "";
    public int Capacity { get; set; }
    public string Status { get; set; } = "";
    public string Manager { get; set; } = "";
    public string Note { get; set; } = "";
}

