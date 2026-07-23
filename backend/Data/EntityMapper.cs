using backend.Data.Entities;

namespace backend.Data;

public static class EntityMapper {
    private static int? ParseId(string? input) => int.TryParse(input, out var id) ? id : null;
    // â”€â”€ ToDto â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€

    public static DeviceDto ToDto(Device d) => new(
        d.Id.ToString(), d.AssetCode, d.Name, d.Category, d.Brand,
        d.RoomId.ToString(), d.OwnerId.ToString(), d.Status, d.Warranty, d.Serial,
        d.PurchaseDate, d.UpdatedAt);

    public static TicketDto ToDto(Ticket t) => new(
        t.Id.ToString(), t.Code, t.Subject, t.RequesterId.ToString(), t.RoomId.ToString(),
        t.DeviceId.ToString(), t.Category, t.Priority, t.Status, t.Channel,
        t.AssigneeId.ToString(), t.Sla, t.CreatedAt, t.UpdatedAt);

    public static MaintenanceDto ToDto(MaintenanceItem m) => new(
        m.Id.ToString(), m.Code, m.Title, m.AssetCode, m.AssetName,
        m.RoomId.ToString(), m.Type, m.Priority, m.Status, m.AssigneeId.ToString(),
        m.ScheduledAt, m.CompletedAt, m.Cost, m.Note);

    public static RoomDto ToDto(Room r) => new(
        r.Id.ToString(), r.Code, r.Name, r.Building, r.Floor,
        r.Type, r.Capacity.ToString(), r.Status, r.Manager, r.Note);

    public static CameraDto ToDto(Camera c) => new(
        c.Id.ToString(), c.Code, c.Name, c.RoomId.ToString(), c.IpAddress,
        c.Brand, c.Model, c.Resolution, c.Status,
        c.InstalledAt, c.Warranty, c.Note);

    public static NetworkDeviceDto ToDto(NetworkDevice n) => new(
        n.Id.ToString(), n.Code, n.Name, n.Type, n.Brand, n.Model,
        n.RoomId.ToString(), n.IpAddress, n.MacAddress, n.Vlan, n.Port,
        n.Status, n.Warranty, n.InstalledAt, n.Note);

    public static InventorySessionDto ToDto(InventorySession i) => new(
        i.Id.ToString(), i.Code, i.RoomId.ToString(), i.InspectorId.ToString(), i.Status,
        i.TotalDevices.ToString(), i.CheckedDevices.ToString(),
        i.MissingDevices.ToString(), i.ExtraDevices.ToString(),
        i.StartedAt, i.CompletedAt, i.Note);

    public static TransferDto ToDto(Transfer t) => new(
        t.Id.ToString(), t.Code, t.AssetCode, t.AssetName,
        t.FromRoomId.ToString(), t.ToRoomId.ToString(), t.RequesterId.ToString(), t.ApproverId.ToString(),
        t.Status, t.TransferredAt, t.ApprovedAt, t.Note);

    public static LiquidationDto ToDto(Liquidation l) => new(
        l.Id.ToString(), l.Code, l.AssetCode, l.AssetName,
        l.RoomId.ToString(), l.Reason, l.Condition, l.Status, l.RequesterId.ToString(),
        l.ApproverId.ToString(), l.ResidualValue.ToString("N0"),
        l.RequestedAt, l.CompletedAt, l.Note);

    public static SoftwareDto ToDto(Software s) => new(
        s.Id.ToString(), s.Name, s.Publisher, s.Version, s.Category,
        s.LicenseType, s.LicenseKey, s.TotalLicenses.ToString(),
        s.UsedLicenses.ToString(), s.ExpiresAt, s.RoomId.ToString(), s.Status, s.Note);

    public static AppUserDto ToDto(AppUser u) => new(
        u.Id.ToString(), u.FullName, u.Email, u.Phone,
        u.Department, "", u.Role, u.Status,
        u.CreatedAt, u.LastLogin);

    // â”€â”€ ToEntity â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€

    public static Device ToEntity(DeviceDto d) => new()
    {
        AssetCode = d.AssetCode ?? "", Name = d.Name ?? "", Category = d.Category ?? "",
        Brand = d.Brand ?? "", RoomId = ParseId(d.Room),
        OwnerId = ParseId(d.Owner),
        Status = d.Status ?? "", Warranty = d.Warranty ?? "", Serial = d.Serial ?? "",
        PurchaseDate = d.PurchaseDate ?? "", UpdatedAt = d.UpdatedAt ?? ""
    };

    public static Ticket ToEntity(TicketDto t) => new()
    {
        Code = t.Code ?? "", Subject = t.Subject ?? "", RequesterId = ParseId(t.Requester),
        RoomId = ParseId(t.Room), DeviceId = ParseId(t.Device),
        Category = t.Category ?? "",
        Priority = t.Priority ?? "", Status = t.Status ?? "", Channel = t.Channel ?? "",
        AssigneeId = ParseId(t.Assignee), Sla = t.Sla ?? "",
        CreatedAt = t.CreatedAt ?? "", UpdatedAt = t.UpdatedAt ?? ""
    };

    public static MaintenanceItem ToEntity(MaintenanceDto m) => new()
    {
        Code = m.Code ?? "", Title = m.Title ?? "", AssetCode = m.AssetCode ?? "", AssetName = m.AssetName ?? "", DeviceId = null,
        RoomId = ParseId(m.Room), Type = m.Type ?? "",
        Priority = m.Priority ?? "", Status = m.Status ?? "", AssigneeId = ParseId(m.Assignee),
        ScheduledAt = m.ScheduledAt ?? "", CompletedAt = m.CompletedAt ?? "",
        Cost = m.Cost ?? "", Note = m.Note ?? ""
    };

    public static Room ToEntity(RoomDto r) => new()
    {
        Code = r.Code ?? "", Name = r.Name ?? "", Building = r.Building ?? "",
        Floor = r.Floor ?? "", Type = r.Type ?? "",
        Capacity = int.TryParse(r.Capacity, out var cap) ? cap : 0,
        Status = r.Status ?? "", Manager = r.Manager ?? "", Note = r.Note ?? ""
    };

    public static Camera ToEntity(CameraDto c) => new()
    {
        Code = c.Code ?? "", Name = c.Name ?? "", RoomId = ParseId(c.Room),
        IpAddress = c.IpAddress ?? "", Brand = c.Brand ?? "", Model = c.Model ?? "",
        Resolution = c.Resolution ?? "", Status = c.Status ?? "",
        InstalledAt = c.InstalledAt ?? "", Warranty = c.Warranty ?? "", Note = c.Note ?? ""
    };

    public static NetworkDevice ToEntity(NetworkDeviceDto n) => new()
    {
        Code = n.Code ?? "", Name = n.Name ?? "", Type = n.Type ?? "", Brand = n.Brand ?? "",
        Model = n.Model ?? "", RoomId = ParseId(n.Room), IpAddress = n.IpAddress ?? "",
        MacAddress = n.MacAddress ?? "", Vlan = n.Vlan ?? "", Port = n.Port ?? "",
        Status = n.Status ?? "", Warranty = n.Warranty ?? "",
        InstalledAt = n.InstalledAt ?? "", Note = n.Note ?? ""
    };

    public static InventorySession ToEntity(InventorySessionDto i) => new()
    {
        Code = i.Code ?? "", RoomId = ParseId(i.Room),
        InspectorId = ParseId(i.Inspector),
        Status = i.Status ?? "",
        TotalDevices = int.TryParse(i.TotalDevices, out var t) ? t : 0,
        CheckedDevices = int.TryParse(i.CheckedDevices, out var c) ? c : 0,
        MissingDevices = int.TryParse(i.MissingDevices, out var m) ? m : 0,
        ExtraDevices = int.TryParse(i.ExtraDevices, out var e) ? e : 0,
        StartedAt = i.StartedAt ?? "", CompletedAt = i.CompletedAt ?? "", Note = i.Note ?? ""
    };

    public static Transfer ToEntity(TransferDto t) => new()
    {
        Code = t.Code ?? "", AssetCode = t.AssetCode ?? "", AssetName = t.AssetName ?? "", DeviceId = null,
        FromRoomId = ParseId(t.FromRoom),
        ToRoomId = ParseId(t.ToRoom),
        RequesterId = ParseId(t.Requester),
        ApproverId = ParseId(t.Approver),
        Status = t.Status ?? "", TransferredAt = t.TransferredAt ?? "",
        ApprovedAt = t.ApprovedAt ?? "", Note = t.Note ?? ""
    };

    public static Liquidation ToEntity(LiquidationDto l) => new()
    {
        Code = l.Code ?? "", AssetCode = l.AssetCode ?? "", AssetName = l.AssetName ?? "", DeviceId = null,
        RoomId = ParseId(l.Room), Reason = l.Reason ?? "", Condition = l.Condition ?? "",
        Status = l.Status ?? "", RequesterId = ParseId(l.Requester),
        ApproverId = ParseId(l.Approver),
        ResidualValue = decimal.TryParse((l.ResidualValue ?? "0").Replace(",", ""), out var v) ? v : 0,
        RequestedAt = l.RequestedAt ?? "", CompletedAt = l.CompletedAt ?? "", Note = l.Note ?? ""
    };

    public static Software ToEntity(SoftwareDto s) => new()
    {
        Name = s.Name ?? "", Publisher = s.Publisher ?? "", Version = s.Version ?? "",
        Category = s.Category ?? "", LicenseType = s.LicenseType ?? "",
        LicenseKey = s.LicenseKey ?? "",
        TotalLicenses = int.TryParse(s.TotalLicenses, out var tl) ? tl : 0,
        UsedLicenses = int.TryParse(s.UsedLicenses, out var ul) ? ul : 0,
        ExpiresAt = s.ExpiresAt ?? "", RoomId = ParseId(s.Room), Status = s.Status ?? "", Note = s.Note ?? ""
    };

    public static AppUser ToEntity(AppUserDto u) => new()
    {
        FullName = u.FullName ?? "", Email = u.Email ?? "", Phone = u.Phone ?? "",
        Department = u.Department ?? "", Role = u.Role ?? "",
        Status = u.Status ?? "", CreatedAt = u.CreatedAt ?? "", LastLogin = u.LastLogin ?? ""
    };
}



