namespace backend.Data;

public record KpiDto(string Label, string Value, string Delta, string Tone);

public record PointDto(string Name, decimal Value);

public record AlertDto(string Label, string Value);

// ── Existing DTOs ──────────────────────────────────────────────

public record DeviceDto(
    string? Id,
    string? AssetCode,
    string? Name,
    string? Category,
    string? Brand,
    string? Room,
    string? Owner,
    string? Status,
    string? Warranty,
    string? Serial,
    string? PurchaseDate,
    string? UpdatedAt);

public record TicketDto(
    string? Id,
    string? Code,
    string? Subject,
    string? Requester,
    string? Room,
    string? Device,
    string? Category,
    string? Priority,
    string? Status,
    string? Channel,
    string? Assignee,
    string? Sla,
    string? CreatedAt,
    string? UpdatedAt);

public record MaintenanceDto(
    string? Id,
    string? Code,
    string? Title,
    string? AssetCode,
    string? AssetName,
    string? Room,
    string? Type,
    string? Priority,
    string? Status,
    string? Assignee,
    string? ScheduledAt,
    string? CompletedAt,
    string? Cost,
    string? Note);

// ── New Module DTOs ────────────────────────────────────────────

public record RoomDto(
    string? Id,
    string? Code,
    string? Name,
    string? Building,
    string? Floor,
    string? Type,
    string? Capacity,
    string? Status,
    string? Manager,
    string? Note);

public record CameraDto(
    string? Id,
    string? Code,
    string? Name,
    string? Room,
    string? IpAddress,
    string? Brand,
    string? Model,
    string? Resolution,
    string? Status,
    string? InstalledAt,
    string? Warranty,
    string? Note);

public record NetworkDeviceDto(
    string? Id,
    string? Code,
    string? Name,
    string? Type,
    string? Brand,
    string? Model,
    string? Room,
    string? IpAddress,
    string? MacAddress,
    string? Vlan,
    string? Port,
    string? Status,
    string? Warranty,
    string? InstalledAt,
    string? Note);

public record InventorySessionDto(
    string? Id,
    string? Code,
    string? Room,
    string? Inspector,
    string? Status,
    string? TotalDevices,
    string? CheckedDevices,
    string? MissingDevices,
    string? ExtraDevices,
    string? StartedAt,
    string? CompletedAt,
    string? Note);

public record TransferDto(
    string? Id,
    string? Code,
    string? AssetCode,
    string? AssetName,
    string? FromRoom,
    string? ToRoom,
    string? Requester,
    string? Approver,
    string? Status,
    string? TransferredAt,
    string? ApprovedAt,
    string? Note);

public record LiquidationDto(
    string? Id,
    string? Code,
    string? AssetCode,
    string? AssetName,
    string? Room,
    string? Reason,
    string? Condition,
    string? Status,
    string? Requester,
    string? Approver,
    string? ResidualValue,
    string? RequestedAt,
    string? CompletedAt,
    string? Note);

public record SoftwareDto(
    string? Id,
    string? Name,
    string? Publisher,
    string? Version,
    string? Category,
    string? LicenseType,
    string? LicenseKey,
    string? TotalLicenses,
    string? UsedLicenses,
    string? ExpiresAt,
    string? Room,
    string? Status,
    string? Note);

public record AppUserDto(
    string? Id,
    string? FullName,
    string? Email,
    string? Phone,
    string? Department,
    string? Room,
    string? Role,
    string? Status,
    string? CreatedAt,
    string? LastLogin);


// ── Response wrappers ──────────────────────────────────────────

public record DashboardResponse(
    IReadOnlyList<KpiDto> Kpis,
    IReadOnlyList<PointDto> DeviceTypes,
    IReadOnlyList<PointDto> DeviceStatuses,
    IReadOnlyList<PointDto> TicketMonthly,
    IReadOnlyList<PointDto> MaintenanceCosts,
    IReadOnlyList<PointDto> MaintenanceTrend,
    IReadOnlyList<PointDto> TicketPriority,
    IReadOnlyList<PointDto> RoomWorkload,
    IReadOnlyList<PointDto> AssetLifecycle,
    IReadOnlyList<AlertDto> Alerts,
    IReadOnlyList<DeviceDto> Devices,
    IReadOnlyList<TicketDto> Tickets);

public record DeviceManagementResponse(
    IReadOnlyList<KpiDto> Overview,
    IReadOnlyList<PointDto> StatusBreakdown,
    IReadOnlyList<PointDto> RoomLoad,
    IReadOnlyList<DeviceDto> Devices,
    IReadOnlyList<string> Categories);

public record TicketManagementResponse(
    IReadOnlyList<KpiDto> Overview,
    IReadOnlyList<PointDto> StatusData,
    IReadOnlyList<PointDto> PriorityData,
    IReadOnlyList<PointDto> ChannelData,
    IReadOnlyList<PointDto> SlaTrendData,
    IReadOnlyList<PointDto> AgeBuckets,
    IReadOnlyList<TicketDto> Items,
    IReadOnlyList<string> Statuses,
    IReadOnlyList<string> Priorities,
    IReadOnlyList<string> Channels);

public record MaintenanceManagementResponse(
    IReadOnlyList<KpiDto> Overview,
    IReadOnlyList<PointDto> StatusData,
    IReadOnlyList<PointDto> TypeData,
    IReadOnlyList<PointDto> TrendData,
    IReadOnlyList<PointDto> BudgetData,
    IReadOnlyList<MaintenanceDto> Items,
    IReadOnlyList<string> Statuses,
    IReadOnlyList<string> Priorities,
    IReadOnlyList<string> Types);

public record RoomManagementResponse(
    IReadOnlyList<KpiDto> Overview,
    IReadOnlyList<PointDto> TypeBreakdown,
    IReadOnlyList<PointDto> StatusBreakdown,
    IReadOnlyList<RoomDto> Items,
    IReadOnlyList<string> Types,
    IReadOnlyList<string> Buildings);

public record CameraManagementResponse(
    IReadOnlyList<KpiDto> Overview,
    IReadOnlyList<PointDto> StatusBreakdown,
    IReadOnlyList<PointDto> RoomLoad,
    IReadOnlyList<CameraDto> Items,
    IReadOnlyList<string> Statuses);

public record NetworkManagementResponse(
    IReadOnlyList<KpiDto> Overview,
    IReadOnlyList<PointDto> TypeBreakdown,
    IReadOnlyList<PointDto> StatusBreakdown,
    IReadOnlyList<NetworkDeviceDto> Items,
    IReadOnlyList<string> Types,
    IReadOnlyList<string> Statuses);

public record InventoryManagementResponse(
    IReadOnlyList<KpiDto> Overview,
    IReadOnlyList<PointDto> StatusBreakdown,
    IReadOnlyList<InventorySessionDto> Items,
    IReadOnlyList<string> Statuses);

public record TransferManagementResponse(
    IReadOnlyList<KpiDto> Overview,
    IReadOnlyList<PointDto> StatusBreakdown,
    IReadOnlyList<TransferDto> Items,
    IReadOnlyList<string> Statuses);

public record LiquidationManagementResponse(
    IReadOnlyList<KpiDto> Overview,
    IReadOnlyList<PointDto> StatusBreakdown,
    IReadOnlyList<PointDto> ConditionBreakdown,
    IReadOnlyList<LiquidationDto> Items,
    IReadOnlyList<string> Statuses);

public record SoftwareManagementResponse(
    IReadOnlyList<KpiDto> Overview,
    IReadOnlyList<PointDto> CategoryBreakdown,
    IReadOnlyList<PointDto> LicenseTypeBreakdown,
    IReadOnlyList<SoftwareDto> Items,
    IReadOnlyList<string> Categories,
    IReadOnlyList<string> Statuses);

public record UserManagementResponse(
    IReadOnlyList<KpiDto> Overview,
    IReadOnlyList<PointDto> RoleBreakdown,
    IReadOnlyList<PointDto> DepartmentBreakdown,
    IReadOnlyList<AppUserDto> Users,
    IReadOnlyList<string> Roles,
    IReadOnlyList<string> Departments);

public record ReportSummaryResponse(
    IReadOnlyList<KpiDto> Overview,
    IReadOnlyList<PointDto> DeviceByCategory,
    IReadOnlyList<PointDto> DeviceByStatus,
    IReadOnlyList<PointDto> TicketByMonth,
    IReadOnlyList<PointDto> MaintenanceCostByMonth,
    IReadOnlyList<PointDto> TicketByPriority,
    IReadOnlyList<PointDto> RoomWorkload);
