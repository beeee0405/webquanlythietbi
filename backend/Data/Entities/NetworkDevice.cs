namespace backend.Data.Entities;

public class NetworkDevice
{
    public int Id { get; set; }
    public string Code { get; set; } = "";
    public string Name { get; set; } = "";
    public string Type { get; set; } = ""; // Switch, Router, Access Point, Firewall
    public string Brand { get; set; } = "";
    public string Model { get; set; } = "";
    public string Room { get; set; } = "";
    public string IpAddress { get; set; } = "";
    public string MacAddress { get; set; } = "";
    public string Vlan { get; set; } = "";
    public string Port { get; set; } = "";
    public string Status { get; set; } = "";
    public string Warranty { get; set; } = "";
    public string InstalledAt { get; set; } = "";
    public string Note { get; set; } = "";
}
