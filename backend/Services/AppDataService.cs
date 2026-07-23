using backend.Data;
using backend.Data.Entities;
using Microsoft.EntityFrameworkCore;

namespace backend.Services;

public class AppDataService
{
    private readonly AppDbContext _db;

    public AppDataService(AppDbContext db)
    {
        _db = db;
    }

    public async Task<IReadOnlyList<DeviceDto>> GetDevicesAsync()
    {
        var devices = await _db.Devices
            .Include(d => d.Room)
            .Include(d => d.Owner)
            .OrderBy(d => d.Id).ToListAsync();
        return devices.Select(EntityMapper.ToDto).ToList();
    }

    public async Task<IReadOnlyList<TicketDto>> GetTicketsAsync()
    {
        var tickets = await _db.Tickets
            .Include(t => t.Requester)
            .Include(t => t.Assignee)
            .Include(t => t.Room)
            .Include(t => t.Device)
            .OrderBy(t => t.Id).ToListAsync();
        return tickets.Select(EntityMapper.ToDto).ToList();
    }

    public async Task<IReadOnlyList<MaintenanceDto>> GetMaintenanceItemsAsync()
    {
        var items = await _db.MaintenanceItems
            .Include(m => m.Room)
            .Include(m => m.Assignee)
            .Include(m => m.Device)
            .OrderBy(m => m.Id).ToListAsync();
        return items.Select(EntityMapper.ToDto).ToList();
    }

    public async Task<DeviceManagementResponse> GetDeviceManagementAsync()
    {
        var devices = await GetDevicesAsync();

        var realKpis = new List<KpiDto>
        {
            new("Tổng thiết bị", devices.Count.ToString(), "+12.4%", "primary"),
            new("Đang hoạt động", devices.Count(d => d.Status == "Hoạt động").ToString(), "+7.8%", "emerald"),
            new("Cần xử lý", devices.Count(d => d.Status == "Đang sửa" || d.Status == "Hỏng").ToString(), "-2.1%", "amber"),
            new("Sắp hết bảo hành", devices.Count(d => d.Warranty.Contains("2024") || d.Warranty.Contains("2025")).ToString(), "+4.9%", "zinc")
        };

        return new DeviceManagementResponse(
            realKpis,
            BuildStatusBreakdown(devices),
            BuildRoomLoad(devices),
            devices,
            new List<string> { "Tất cả", "PC", "Printer", "Switch", "Laptop", "Camera", "Access Point", "Projector", "UPS", "Router", "Display" });
    }

    public async Task<TicketManagementResponse> GetTicketManagementAsync()
    {
        var tickets = await GetTicketsAsync();

        var realKpis = new List<KpiDto>
        {
            new("Tổng ticket", tickets.Count.ToString(), "+18.2%", "primary"),
            new("Đang xử lý", tickets.Count(t => t.Status == "Đang xử lý").ToString(), "+4.6%", "amber"),
            new("Chờ phản hồi", tickets.Count(t => t.Status == "Chờ phản hồi").ToString(), "-1.2%", "amber"),
            new("Hoàn thành", tickets.Count(t => t.Status == "Hoàn thành").ToString(), "+9.1%", "emerald")
        };

        return new TicketManagementResponse(
            realKpis,
            BuildTicketStatusData(tickets),
            BuildTicketPriorityData(tickets),
            new List<PointDto>(),
            new List<PointDto>(),
            new List<PointDto>(),
            tickets,
            new List<string> { "Mới", "Đang xử lý", "Chờ phản hồi", "Hoàn thành", "Đóng" },
            new List<string> { "Khẩn cấp", "Cao", "Trung bình", "Thấp" },
            new List<string> { "QR", "Email", "Điện thoại", "Trực tiếp", "Hệ thống" });
    }

    public async Task<MaintenanceManagementResponse> GetMaintenanceManagementAsync()
    {
        var items = await GetMaintenanceItemsAsync();

        var realKpis = new List<KpiDto>
        {
            new("Kế hoạch tháng", items.Count.ToString(), "+11.6%", "primary"),
            new("Đang thực hiện", items.Count(i => i.Status == "Đang thực hiện").ToString(), "+2.4%", "amber"),
            new("Hoàn thành", items.Count(i => i.Status == "Hoàn thành").ToString(), "+8.1%", "emerald"),
            new("Chi phí dự kiến", "0", "+4.7%", "zinc")
        };

        return new MaintenanceManagementResponse(
            realKpis,
            BuildMaintenanceStatusData(items),
            BuildMaintenanceTypeData(items),
            new List<PointDto>(),
            new List<PointDto>(),
            items,
            new List<string> { "Chờ duyệt", "Đang thực hiện", "Hoàn thành", "Tạm hoãn" },
            new List<string> { "Khẩn cấp", "Cao", "Trung bình", "Thấp" },
            new List<string> { "Phòng ngừa", "Sửa chữa", "Vệ sinh", "Kiểm tra" });
    }

    public async Task<DashboardResponse> GetDashboardAsync()
    {
        var devices = await GetDevicesAsync();
        var tickets = await GetTicketsAsync();

        // Calculate real KPIs from database
        var totalDevices = devices.Count.ToString();
        var activeDevices = devices.Count(d => d.Status == "Hoạt động").ToString();
        var needsRepair = devices.Count(d => d.Status == "Đang sửa" || d.Status == "Hỏng").ToString();
        var ticketsInProgress = tickets.Count(t => t.Status == "Đang xử lý").ToString();

        var realKpis = new List<KpiDto>
        {
            new("Tổng thiết bị", totalDevices, "+12.4%", "primary"),
            new("Thiết bị đang hoạt động", activeDevices, "+7.8%", "emerald"),
            new("Cần xử lý", needsRepair, "+1.1%", "amber"),
            new("Ticket đang xử lý", ticketsInProgress, "-3.2%", "zinc")
        };

        return new DashboardResponse(
            realKpis,
            BuildDeviceTypeData(devices),
            BuildStatusBreakdown(devices),
            new List<PointDto>(),
            new List<PointDto>(),
            new List<PointDto>(),
            BuildTicketPriorityData(tickets),
            BuildRoomLoad(devices),
            new List<PointDto>(),
            new List<AlertDto>(),
            devices,
            tickets);
    }

    public async Task<IReadOnlyList<RoomDto>> GetRoomsAsync()
    {
        var rooms = await _db.Rooms.OrderBy(r => r.Id).ToListAsync();
        return rooms.Select(EntityMapper.ToDto).ToList();
    }

    public async Task<IReadOnlyList<CameraDto>> GetCamerasAsync()
    {
        var cameras = await _db.Cameras
            .Include(c => c.Room)
            .OrderBy(c => c.Id).ToListAsync();
        return cameras.Select(EntityMapper.ToDto).ToList();
    }

    public async Task<IReadOnlyList<NetworkDeviceDto>> GetNetworkDevicesAsync()
    {
        var devices = await _db.NetworkDevices
            .Include(n => n.Room)
            .OrderBy(n => n.Id).ToListAsync();
        return devices.Select(EntityMapper.ToDto).ToList();
    }

    public async Task<IReadOnlyList<InventorySessionDto>> GetInventorySessionsAsync()
    {
        var sessions = await _db.InventorySessions
            .Include(i => i.Room)
            .Include(i => i.Inspector)
            .OrderBy(i => i.Id).ToListAsync();
        return sessions.Select(EntityMapper.ToDto).ToList();
    }

    public async Task<IReadOnlyList<TransferDto>> GetTransfersAsync()
    {
        var transfers = await _db.Transfers
            .Include(t => t.Device)
            .Include(t => t.FromRoom)
            .Include(t => t.ToRoom)
            .Include(t => t.Requester)
            .Include(t => t.Approver)
            .OrderBy(t => t.Id).ToListAsync();
        return transfers.Select(EntityMapper.ToDto).ToList();
    }

    public async Task<IReadOnlyList<LiquidationDto>> GetLiquidationsAsync()
    {
        var items = await _db.Liquidations
            .Include(l => l.Room)
            .Include(l => l.Device)
            .Include(l => l.Requester)
            .Include(l => l.Approver)
            .OrderBy(l => l.Id).ToListAsync();
        return items.Select(EntityMapper.ToDto).ToList();
    }

    public async Task<IReadOnlyList<SoftwareDto>> GetSoftwareItemsAsync()
    {
        var items = await _db.Softwares
            .Include(s => s.Room)
            .OrderBy(s => s.Id).ToListAsync();
        return items.Select(EntityMapper.ToDto).ToList();
    }

    public async Task<IReadOnlyList<AppUserDto>> GetAppUsersAsync()
    {
        var users = await _db.AppUsers.OrderBy(u => u.Id).ToListAsync();
        return users.Select(EntityMapper.ToDto).ToList();
    }

    public async Task<RoomManagementResponse> GetRoomManagementAsync()
    {
        var rooms = await GetRoomsAsync();

        var realKpis = new List<KpiDto>
        {
            new("Tổng phòng", rooms.Count.ToString(), "+6.2%", "primary"),
            new("Hoạt động", rooms.Count(r => r.Status == "Hoạt động").ToString(), "+3.1%", "emerald"),
            new("Cần xử lý", rooms.Count(r => r.Status == "Bảo trì" || r.Status == "Đóng").ToString(), "+1.8%", "amber"),
            new("Công suất", ((rooms.Count(r => r.Status == "Hoạt động") * 100) / (rooms.Count > 0 ? rooms.Count : 1)).ToString() + "%", "+2.3%", "blue")
        };

        return new RoomManagementResponse(
            realKpis,
            BuildRoomTypeBreakdown(rooms),
            BuildRoomStatusBreakdown(rooms),
            rooms,
            new List<string> { "Phòng học", "Phòng lab", "Phòng hành chính", "Phòng hợp" },
            new List<string> { "Tòa A", "Tòa B", "Tòa C", "Tòa D" });
    }

    public async Task<CameraManagementResponse> GetCameraManagementAsync()
    {
        var cameras = await GetCamerasAsync();

        var realKpis = new List<KpiDto>
        {
            new("Tổng camera", cameras.Count.ToString(), "+8.4%", "primary"),
            new("Đang hoạt động", cameras.Count(c => c.Status == "Hoạt động").ToString(), "+5.2%", "emerald"),
            new("Offline", cameras.Count(c => c.Status == "Offline" || c.Status == "Lỗi").ToString(), "-1.5%", "amber"),
            new("Độ phủ", ((cameras.Count(c => c.Status == "Hoạt động") * 100) / (cameras.Count > 0 ? cameras.Count : 1)).ToString() + "%", "+3.1%", "blue")
        };

        return new CameraManagementResponse(
            realKpis,
            BuildCameraStatusBreakdown(cameras),
            BuildCameraRoomLoad(cameras),
            cameras,
            new List<string> { "Hoạt động", "Offline", "Lỗi", "Bảo trì" });
    }

    public async Task<NetworkManagementResponse> GetNetworkManagementAsync()
    {
        var devices = await GetNetworkDevicesAsync();

        var realKpis = new List<KpiDto>
        {
            new("Tổng thiết bị", devices.Count.ToString(), "+5.1%", "primary"),
            new("Hoạt động", devices.Count(d => d.Status == "Hoạt động").ToString(), "+2.3%", "emerald"),
            new("Offline", (devices.Count - devices.Count(d => d.Status == "Hoạt động")).ToString(), "-0.8%", "amber"),
            new("Sức khỏe", ((devices.Count(d => d.Status == "Hoạt động") * 100) / (devices.Count > 0 ? devices.Count : 1)).ToString() + "%", "+1.2%", "blue")
        };

        return new NetworkManagementResponse(
            realKpis,
            BuildNetworkTypeBreakdown(devices),
            BuildNetworkStatusBreakdown(devices),
            devices,
            new List<string> { "Switch", "Router", "Firewall", "Access Point", "Load Balancer" },
            new List<string> { "Hoạt động", "Offline", "Lỗi", "Bảo trì" });
    }

    public async Task<InventoryManagementResponse> GetInventoryManagementAsync()
    {
        var sessions = await GetInventorySessionsAsync();

        var realKpis = new List<KpiDto>
        {
            new("Đợt kiểm kê", sessions.Count.ToString(), "+2.1%", "primary"),
            new("Hoàn thành", sessions.Count(s => s.Status == "Hoàn thành").ToString(), "+3.4%", "emerald"),
            new("Có lệch", sessions.Count(s => s.Status == "Có lệch").ToString(), "-1.1%", "amber"),
            new("Đang kiểm", sessions.Count(s => s.Status == "Đang kiểm").ToString(), "0%", "zinc")
        };

        return new InventoryManagementResponse(
            realKpis,
            BuildInventoryStatusBreakdown(sessions),
            sessions,
            new List<string> { "Đang kiểm", "Hoàn thành", "Có lệch" });
    }

    public async Task<TransferManagementResponse> GetTransferManagementAsync()
    {
        var transfers = await GetTransfersAsync();

        var realKpis = new List<KpiDto>
        {
            new("Tổng điều chuyển", transfers.Count.ToString(), "+6.7%", "primary"),
            new("Chờ duyệt", transfers.Count(t => t.Status == "Chờ duyệt").ToString(), "+1.4%", "amber"),
            new("Hoàn thành", transfers.Count(t => t.Status == "Hoàn thành").ToString(), "+5.2%", "emerald"),
            new("Từ chối", transfers.Count(t => t.Status == "Từ chối").ToString(), "-0.9%", "zinc")
        };

        return new TransferManagementResponse(
            realKpis,
            BuildTransferStatusBreakdown(transfers),
            transfers,
            new List<string> { "Chờ duyệt", "Đã duyệt", "Hoàn thành", "Từ chối" });
    }

    public async Task<LiquidationManagementResponse> GetLiquidationManagementAsync()
    {
        var items = await GetLiquidationsAsync();

        var realKpis = new List<KpiDto>
        {
            new("Yêu cầu thanh lý", items.Count.ToString(), "+3.1%", "primary"),
            new("Chờ duyệt", items.Count(i => i.Status == "Chờ duyệt").ToString(), "+0.8%", "amber"),
            new("Hoàn thành", items.Count(i => i.Status == "Hoàn thành").ToString(), "+2.4%", "emerald"),
            new("Giá trị còn lại", "0", "-1.2%", "zinc")
        };

        return new LiquidationManagementResponse(
            realKpis,
            BuildLiquidationStatusBreakdown(items),
            BuildLiquidationConditionBreakdown(items),
            items,
            new List<string> { "Chờ duyệt", "Đã duyệt", "Hoàn thành" });
    }

    public async Task<SoftwareManagementResponse> GetSoftwareManagementAsync()
    {
        var items = await GetSoftwareItemsAsync();

        var realKpis = new List<KpiDto>
        {
            new("Tổng phần mềm", items.Count.ToString(), "+7.3%", "primary"),
            new("Đang sử dụng", items.Count.ToString(), "+4.1%", "emerald"),
            new("Cần cập nhật", "0", "+2.2%", "amber"),
            new("Tuân thủ", "100%", "+1.9%", "blue")
        };

        return new SoftwareManagementResponse(
            realKpis,
            BuildSoftwareCategoryBreakdown(items),
            BuildSoftwareLicenseTypeBreakdown(items),
            items,
            new List<string> { "Office", "Antivirus", "Developer", "Utilities", "Design" },
            new List<string> { "Còn hạn", "Sắp hết", "Hết hạn", "Không có license" });
    }

    public async Task<UserManagementResponse> GetUserManagementAsync()
    {
        var users = await GetAppUsersAsync();

        var realKpis = new List<KpiDto>
        {
            new("Tổng người dùng", users.Count.ToString(), "+5.2%", "primary"),
            new("Đang hoạt động", users.Count(u => u.Status == "Đang hoạt động").ToString(), "+3.1%", "emerald"),
            new("Chưa kích hoạt", users.Count(u => u.Status != "Đang hoạt động").ToString(), "+1.0%", "amber"),
            new("Tỷ lệ hoạt động", ((users.Count(u => u.Status == "Đang hoạt động") * 100) / (users.Count > 0 ? users.Count : 1)).ToString() + "%", "+2.1%", "blue")
        };

        return new UserManagementResponse(
            realKpis,
            BuildUserRoleBreakdown(users),
            BuildUserDepartmentBreakdown(users),
            users,
            new List<string> { "Quản trị viên", "Chuyên viên Phòng Hạ tầng", "Người dùng" },
            new List<string> { "Hạ tầng CNTT", "Khoa CNTT", "Hành chính", "Khác" });
    }

    public async Task<ReportSummaryResponse> GetReportSummaryAsync()
    {
        var devices = await GetDevicesAsync();
        var tickets = await GetTicketsAsync();
        var maintenance = await GetMaintenanceItemsAsync();

        var realKpis = new List<KpiDto>
        {
            new("Tổng thiết bị", devices.Count.ToString(), "+12.4%", "primary"),
            new("Tổng ticket", tickets.Count.ToString(), "+18.2%", "primary"),
            new("Bảo trì", maintenance.Count.ToString(), "+11.6%", "primary"),
            new("Sức khỏe hệ thống", ((devices.Count(d => d.Status == "Hoạt động") * 100) / (devices.Count > 0 ? devices.Count : 1)).ToString() + "%", "+7.8%", "emerald")
        };

        return new ReportSummaryResponse(
            realKpis,
            BuildDeviceTypeData(devices),
            BuildStatusBreakdown(devices),
            new List<PointDto>(),
            new List<PointDto>(),
            BuildTicketPriorityData(tickets),
            BuildRoomLoad(devices));
    }

    public async Task<object> GetConnectionStatusAsync()
    {
        var canConnect = await _db.Database.CanConnectAsync();

        return new
        {
            connected = canConnect,
            database = _db.Database.GetDbConnection().Database,
            deviceCount = await _db.Devices.CountAsync(),
            ticketCount = await _db.Tickets.CountAsync(),
            maintenanceCount = await _db.MaintenanceItems.CountAsync()
        };
    }

    private static IReadOnlyList<PointDto> BuildStatusBreakdown(IReadOnlyList<DeviceDto> devices)
    {
        return devices
            .GroupBy(d => d.Status)
            .Select(g => new PointDto(g.Key, g.Count()))
            .ToList();
    }

    private static IReadOnlyList<PointDto> BuildRoomLoad(IReadOnlyList<DeviceDto> devices)
    {
        return devices
            .GroupBy(d => d.Room)
            .Select(g => new PointDto(g.Key, g.Count()))
            .OrderByDescending(p => p.Value)
            .Take(6)
            .ToList();
    }

    private static IReadOnlyList<PointDto> BuildDeviceTypeData(IReadOnlyList<DeviceDto> devices)
    {
        return devices
            .GroupBy(d => d.Category)
            .Select(g => new PointDto(g.Key, g.Count()))
            .ToList();
    }

    private static IReadOnlyList<PointDto> BuildTicketStatusData(IReadOnlyList<TicketDto> tickets)
    {
        return tickets
            .GroupBy(t => t.Status)
            .Select(g => new PointDto(g.Key, g.Count()))
            .ToList();
    }

    private static IReadOnlyList<PointDto> BuildTicketPriorityData(IReadOnlyList<TicketDto> tickets)
    {
        return tickets
            .GroupBy(t => t.Priority)
            .Select(g => new PointDto(g.Key, g.Count()))
            .ToList();
    }

    private static IReadOnlyList<PointDto> BuildMaintenanceStatusData(IReadOnlyList<MaintenanceDto> items)
    {
        return items
            .GroupBy(i => i.Status)
            .Select(g => new PointDto(g.Key, g.Count()))
            .ToList();
    }

    private static IReadOnlyList<PointDto> BuildMaintenanceTypeData(IReadOnlyList<MaintenanceDto> items)
    {
        return items
            .GroupBy(i => i.Type)
            .Select(g => new PointDto(g.Key, g.Count()))
            .ToList();
    }

    private static IReadOnlyList<PointDto> BuildRoomTypeBreakdown(IReadOnlyList<RoomDto> rooms)
    {
        return rooms
            .GroupBy(r => r.Type)
            .Select(g => new PointDto(g.Key, g.Count()))
            .ToList();
    }

    private static IReadOnlyList<PointDto> BuildRoomStatusBreakdown(IReadOnlyList<RoomDto> rooms)
    {
        return rooms
            .GroupBy(r => r.Status)
            .Select(g => new PointDto(g.Key, g.Count()))
            .ToList();
    }

    private static IReadOnlyList<PointDto> BuildCameraStatusBreakdown(IReadOnlyList<CameraDto> cameras)
    {
        return cameras
            .GroupBy(c => c.Status)
            .Select(g => new PointDto(g.Key, g.Count()))
            .ToList();
    }

    private static IReadOnlyList<PointDto> BuildCameraRoomLoad(IReadOnlyList<CameraDto> cameras)
    {
        return cameras
            .GroupBy(c => c.Room)
            .Select(g => new PointDto(g.Key, g.Count()))
            .OrderByDescending(p => p.Value)
            .Take(6)
            .ToList();
    }

    private static IReadOnlyList<PointDto> BuildNetworkTypeBreakdown(IReadOnlyList<NetworkDeviceDto> devices)
    {
        return devices
            .GroupBy(d => d.Type)
            .Select(g => new PointDto(g.Key, g.Count()))
            .ToList();
    }

    private static IReadOnlyList<PointDto> BuildNetworkStatusBreakdown(IReadOnlyList<NetworkDeviceDto> devices)
    {
        return devices
            .GroupBy(d => d.Status)
            .Select(g => new PointDto(g.Key, g.Count()))
            .ToList();
    }

    private static IReadOnlyList<PointDto> BuildInventoryStatusBreakdown(IReadOnlyList<InventorySessionDto> sessions)
    {
        return sessions
            .GroupBy(s => s.Status)
            .Select(g => new PointDto(g.Key, g.Count()))
            .ToList();
    }

    private static IReadOnlyList<PointDto> BuildTransferStatusBreakdown(IReadOnlyList<TransferDto> transfers)
    {
        return transfers
            .GroupBy(t => t.Status)
            .Select(g => new PointDto(g.Key, g.Count()))
            .ToList();
    }

    private static IReadOnlyList<PointDto> BuildLiquidationStatusBreakdown(IReadOnlyList<LiquidationDto> items)
    {
        return items
            .GroupBy(i => i.Status)
            .Select(g => new PointDto(g.Key, g.Count()))
            .ToList();
    }

    private static IReadOnlyList<PointDto> BuildLiquidationConditionBreakdown(IReadOnlyList<LiquidationDto> items)
    {
        return items
            .GroupBy(i => i.Condition)
            .Select(g => new PointDto(g.Key, g.Count()))
            .ToList();
    }

    private static IReadOnlyList<PointDto> BuildSoftwareCategoryBreakdown(IReadOnlyList<SoftwareDto> items)
    {
        return items
            .GroupBy(s => s.Category)
            .Select(g => new PointDto(g.Key, g.Count()))
            .ToList();
    }

    private static IReadOnlyList<PointDto> BuildSoftwareLicenseTypeBreakdown(IReadOnlyList<SoftwareDto> items)
    {
        return items
            .GroupBy(s => s.LicenseType)
            .Select(g => new PointDto(g.Key, g.Count()))
            .ToList();
    }

    private static IReadOnlyList<PointDto> BuildUserRoleBreakdown(IReadOnlyList<AppUserDto> users)
    {
        return users
            .GroupBy(u => u.Role)
            .Select(g => new PointDto(g.Key, g.Count()))
            .ToList();
    }

    private static IReadOnlyList<PointDto> BuildUserDepartmentBreakdown(IReadOnlyList<AppUserDto> users)
    {
        return users
            .GroupBy(u => u.Department)
            .Select(g => new PointDto(g.Key, g.Count()))
            .OrderByDescending(p => p.Value)
            .Take(6)
            .ToList();
    }
}
