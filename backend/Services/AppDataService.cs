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
        var devices = await _db.Devices.OrderBy(d => d.Id).ToListAsync();
        return devices.Select(EntityMapper.ToDto).ToList();
    }

    public async Task<IReadOnlyList<TicketDto>> GetTicketsAsync()
    {
        var tickets = await _db.Tickets.OrderBy(t => t.Id).ToListAsync();
        return tickets.Select(EntityMapper.ToDto).ToList();
    }

    public async Task<IReadOnlyList<MaintenanceDto>> GetMaintenanceItemsAsync()
    {
        var items = await _db.MaintenanceItems.OrderBy(m => m.Id).ToListAsync();
        return items.Select(EntityMapper.ToDto).ToList();
    }

    public async Task<DeviceManagementResponse> GetDeviceManagementAsync()
    {
        var devices = await GetDevicesAsync();
        var mock = MockStore.DeviceManagement;

        return new DeviceManagementResponse(
            mock.Overview,
            BuildStatusBreakdown(devices),
            BuildRoomLoad(devices),
            devices,
            mock.Categories);
    }

    public async Task<TicketManagementResponse> GetTicketManagementAsync()
    {
        var tickets = await GetTicketsAsync();
        var mock = MockStore.TicketManagement;

        return new TicketManagementResponse(
            mock.Overview,
            BuildTicketStatusData(tickets),
            BuildTicketPriorityData(tickets),
            mock.ChannelData,
            mock.SlaTrendData,
            mock.AgeBuckets,
            tickets,
            mock.Statuses,
            mock.Priorities,
            mock.Channels);
    }

    public async Task<MaintenanceManagementResponse> GetMaintenanceManagementAsync()
    {
        var items = await GetMaintenanceItemsAsync();
        var mock = MockStore.MaintenanceManagement;

        return new MaintenanceManagementResponse(
            mock.Overview,
            BuildMaintenanceStatusData(items),
            BuildMaintenanceTypeData(items),
            mock.TrendData,
            mock.BudgetData,
            items,
            mock.Statuses,
            mock.Priorities,
            mock.Types);
    }

    public async Task<DashboardResponse> GetDashboardAsync()
    {
        var devices = await GetDevicesAsync();
        var tickets = await GetTicketsAsync();
        var mock = MockStore.Dashboard;

        return new DashboardResponse(
            mock.Kpis,
            BuildDeviceTypeData(devices),
            BuildStatusBreakdown(devices),
            mock.TicketMonthly,
            mock.MaintenanceCosts,
            mock.MaintenanceTrend,
            BuildTicketPriorityData(tickets),
            BuildRoomLoad(devices),
            mock.AssetLifecycle,
            mock.Alerts,
            devices,
            tickets);
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
}
