using backend.Data.Entities;
using Microsoft.EntityFrameworkCore;
using System.Security.Cryptography;
using System.Text;

namespace backend.Data;

public static class DbSeeder
{
    public static async Task SeedAsync(AppDbContext db)
    {
        // Create admin account if it doesn't exist
        if (!await db.IdentityUsers.AnyAsync())
        {
            var adminUser = new AppIdentityUser
            {
                Id = "admin-001",
                Username = "admin",
                Email = "admin@system.local",
                FullName = "Quản trị viên",
                Phone = "0000000000",
                Department = "IT",
                Room = "IT",
                Role = "Quản trị viên",
                Status = "Đang hoạt động",
                IsActive = true,
                PasswordHash = HashPassword("Admin@123"),
                CreatedAt = DateTime.Now.ToString("dd/MM/yyyy HH:mm:ss"),
                LastLogin = ""
            };

            db.IdentityUsers.Add(adminUser);
            await db.SaveChangesAsync();
        }

        // Seed sample data for other modules
        if (!await db.AppUsers.AnyAsync())
        {
            var users = new List<AppUser>
            {
                new() { Id = 1, FullName = "Thanh Khuông", Email = "thanh@tdmu.edu.vn", Phone = "0987654321", Department = "IT", Role = "Kỹ thuật viên", Status = "Đang hoạt động", CreatedAt = DateTime.Now.ToString("dd/MM/yyyy"), LastLogin = DateTime.Now.ToString("dd/MM/yyyy HH:mm") },
                new() { Id = 2, FullName = "Trần Bắc Hoàn", Email = "hoaan@gmail.com", Phone = "0912345678", Department = "Quản trị", Role = "Nhân viên", Status = "Đang hoạt động", CreatedAt = DateTime.Now.ToString("dd/MM/yyyy"), LastLogin = DateTime.Now.ToString("dd/MM/yyyy HH:mm") },
                new() { Id = 3, FullName = "Phòng Hạ tầng", Email = "phong@tdmu.edu.vn", Phone = "0909090909", Department = "IT", Role = "Kỹ thuật viên", Status = "Đang hoạt động", CreatedAt = DateTime.Now.ToString("dd/MM/yyyy"), LastLogin = DateTime.Now.ToString("dd/MM/yyyy HH:mm") }
            };
            db.AppUsers.AddRange(users);
            await db.SaveChangesAsync();
        }

        if (!await db.Rooms.AnyAsync())
        {
            var rooms = new List<Room>
            {
                new() { Id = 1, Code = "A3.302", Name = "Phòng Máy Tính", Building = "A", Floor = "3", Type = "Phòng Lab", Capacity = 30, Status = "Hoạt động", Manager = "Thanh Khuông", Note = "Phòng thực hành lập trình" },
                new() { Id = 2, Code = "A4.101", Name = "Phòng Hệ thống", Building = "A", Floor = "4", Type = "Phòng Server", Capacity = 10, Status = "Hoạt động", Manager = "Phòng Hạ tầng", Note = "Phòng máy chủ chính" },
                new() { Id = 3, Code = "B2.205", Name = "Phòng Mạng", Building = "B", Floor = "2", Type = "Phòng Lab", Capacity = 25, Status = "Hoạt động", Manager = "Trần Bắc Hoàn", Note = "Phòng thực hành mạng máy tính" }
            };
            db.Rooms.AddRange(rooms);
            await db.SaveChangesAsync();
        }

        if (!await db.Devices.AnyAsync())
        {
            var devices = new List<Device>
            {
                new() { Id = 1, AssetCode = "PC001", Name = "Máy Tính Dell XPS", Category = "Laptop", Brand = "Dell", RoomId = 1, OwnerId = 1, Status = "Hoạt động", Warranty = "2 năm", Serial = "ABC123456", PurchaseDate = "01/01/2024", UpdatedAt = DateTime.Now.ToString("dd/MM/yyyy HH:mm") },
                new() { Id = 2, AssetCode = "PC002", Name = "Máy Tính HP", Category = "Desktop", Brand = "HP", RoomId = 1, OwnerId = 1, Status = "Hoạt động", Warranty = "1 năm", Serial = "XYZ789012", PurchaseDate = "15/01/2024", UpdatedAt = DateTime.Now.ToString("dd/MM/yyyy HH:mm") },
                new() { Id = 3, AssetCode = "SRV001", Name = "Server Dell PowerEdge", Category = "Server", Brand = "Dell", RoomId = 2, OwnerId = 3, Status = "Hoạt động", Warranty = "3 năm", Serial = "SRV123456", PurchaseDate = "10/12/2023", UpdatedAt = DateTime.Now.ToString("dd/MM/yyyy HH:mm") }
            };
            db.Devices.AddRange(devices);
            await db.SaveChangesAsync();
        }

        if (!await db.Cameras.AnyAsync())
        {
            var cameras = new List<Camera>
            {
                new() { Id = 1, Code = "CAM001", Name = "Camera Hikvision DS-2CD", RoomId = 1, IpAddress = "192.168.1.100", Brand = "Hikvision", Model = "DS-2CD2143G0-I", Resolution = "4MP", Status = "Hoạt động", InstalledAt = "01/01/2024", Warranty = "2 năm", Note = "Camera entrance" },
                new() { Id = 2, Code = "CAM002", Name = "Camera Dahua IPC", RoomId = 2, IpAddress = "192.168.1.101", Brand = "Dahua", Model = "IPC-HDBW2431E", Resolution = "4MP", Status = "Hoạt động", InstalledAt = "01/01/2024", Warranty = "2 năm", Note = "Camera server room" }
            };
            db.Cameras.AddRange(cameras);
            await db.SaveChangesAsync();
        }

        if (!await db.NetworkDevices.AnyAsync())
        {
            var networkDevices = new List<NetworkDevice>
            {
                new() { Id = 1, Code = "SW001", Name = "Switch Cisco", Type = "Switch", Brand = "Cisco", Model = "Catalyst 2960", RoomId = 2, IpAddress = "192.168.1.1", MacAddress = "00:11:22:33:44:55", Vlan = "VLAN10", Port = "24", Status = "Hoạt động", Warranty = "3 năm", InstalledAt = "01/01/2024", Note = "Core Switch" },
                new() { Id = 2, Code = "RT001", Name = "Router Mikrotik", Type = "Router", Brand = "Mikrotik", Model = "RB4011iGS+", RoomId = 2, IpAddress = "192.168.1.2", MacAddress = "00:11:22:33:44:56", Vlan = "", Port = "10", Status = "Hoạt động", Warranty = "2 năm", InstalledAt = "01/01/2024", Note = "Gateway Router" }
            };
            db.NetworkDevices.AddRange(networkDevices);
            await db.SaveChangesAsync();
        }

        if (!await db.Softwares.AnyAsync())
        {
            var softwares = new List<Software>
            {
                new() { Id = 1, Name = "Windows 11 Pro", Publisher = "Microsoft", Version = "22H2", Category = "Hệ điều hành", LicenseType = "Bản quyền", LicenseKey = "XXXXX-XXXXX-XXXXX", TotalLicenses = 50, UsedLicenses = 30, ExpiresAt = "01/01/2026", RoomId = 1, Status = "Đang dùng", Note = "OS for lab" },
                new() { Id = 2, Name = "Microsoft Office 365", Publisher = "Microsoft", Version = "Latest", Category = "Văn phòng", LicenseType = "Bản quyền", LicenseKey = "YYYYY-YYYYY-YYYYY", TotalLicenses = 100, UsedLicenses = 80, ExpiresAt = "01/01/2025", RoomId = null, Status = "Đang dùng", Note = "Office suite" },
                new() { Id = 3, Name = "Visual Studio Code", Publisher = "Microsoft", Version = "1.85", Category = "Lập trình", LicenseType = "Mã nguồn mở", LicenseKey = "", TotalLicenses = 999, UsedLicenses = 200, ExpiresAt = "", RoomId = 1, Status = "Đang dùng", Note = "Code editor" }
            };
            db.Softwares.AddRange(softwares);
            await db.SaveChangesAsync();
        }

        if (!await db.Tickets.AnyAsync())
        {
            var tickets = new List<Ticket>
            {
                new() { Id = 1, Code = "TKT001", Subject = "Máy tính Dell lỗi màn hình", RequesterId = 1, RoomId = 1, DeviceId = 1, Category = "Phần cứng", Priority = "Cao", Status = "Mới", Channel = "Trực tiếp", AssigneeId = 3, Sla = "8h", CreatedAt = DateTime.Now.ToString("dd/MM/yyyy"), UpdatedAt = DateTime.Now.ToString("dd/MM/yyyy HH:mm") },
                new() { Id = 2, Code = "TKT002", Subject = "Cần cập nhật Windows", RequesterId = 2, RoomId = 2, DeviceId = 3, Category = "Phần mềm", Priority = "Trung bình", Status = "Đang xử lý", Channel = "Email", AssigneeId = 3, Sla = "24h", CreatedAt = DateTime.Now.ToString("dd/MM/yyyy"), UpdatedAt = DateTime.Now.ToString("dd/MM/yyyy HH:mm") }
            };
            db.Tickets.AddRange(tickets);
            await db.SaveChangesAsync();
        }

        if (!await db.MaintenanceItems.AnyAsync())
        {
            var maintenanceItems = new List<MaintenanceItem>
            {
                new() { Id = 1, Code = "MNT001", Title = "Vệ sinh máy tính Dell", DeviceId = 1, RoomId = 1, Type = "Vệ sinh", Priority = "Thấp", Status = "Lên lịch", AssigneeId = 1, ScheduledAt = DateTime.Now.AddDays(3).ToString("dd/MM/yyyy"), CompletedAt = "", Cost = "500000", Note = "Cleaning and maintenance" },
                new() { Id = 2, Code = "MNT002", Title = "Kiểm tra hệ thống mạng", DeviceId = 3, RoomId = 2, Type = "Bảo dưỡng", Priority = "Cao", Status = "Đang thực hiện", AssigneeId = 3, ScheduledAt = DateTime.Now.ToString("dd/MM/yyyy"), CompletedAt = "", Cost = "2000000", Note = "Network system check" }
            };
            db.MaintenanceItems.AddRange(maintenanceItems);
            await db.SaveChangesAsync();
        }

        if (!await db.InventorySessions.AnyAsync())
        {
            var inventorySessions = new List<InventorySession>
            {
                new() { Id = 1, Code = "INV001", RoomId = 1, InspectorId = 1, Status = "Hoàn thành", TotalDevices = 10, CheckedDevices = 10, MissingDevices = 0, ExtraDevices = 0, StartedAt = "01/01/2024", CompletedAt = "01/01/2024 10:30", Note = "Lab inventory completed" },
                new() { Id = 2, Code = "INV002", RoomId = 2, InspectorId = 3, Status = "Đang kiểm", TotalDevices = 5, CheckedDevices = 3, MissingDevices = 0, ExtraDevices = 0, StartedAt = DateTime.Now.ToString("dd/MM/yyyy"), CompletedAt = "", Note = "Server room inventory in progress" }
            };
            db.InventorySessions.AddRange(inventorySessions);
            await db.SaveChangesAsync();
        }

        if (!await db.Transfers.AnyAsync())
        {
            var transfers = new List<Transfer>
            {
                new() { Id = 1, Code = "TRF001", DeviceId = 1, FromRoomId = 1, ToRoomId = 3, RequesterId = 1, ApproverId = 3, Status = "Đã duyệt", TransferredAt = "01/01/2024", ApprovedAt = "01/01/2024 09:00", Note = "Transfer to network lab" }
            };
            db.Transfers.AddRange(transfers);
            await db.SaveChangesAsync();
        }

        if (!await db.Liquidations.AnyAsync())
        {
            var liquidations = new List<Liquidation>
            {
                new() { Id = 1, Code = "LIQ001", DeviceId = 2, RoomId = 1, Reason = "Lạc hậu, không sử dụng", Condition = "Lạc hậu", Status = "Chờ duyệt", RequesterId = 1, ApproverId = 0, ResidualValue = 1000000, RequestedAt = DateTime.Now.ToString("dd/MM/yyyy"), CompletedAt = "", Note = "Old HP desktop for liquidation" }
            };
            db.Liquidations.AddRange(liquidations);
            await db.SaveChangesAsync();
        }
    }

    private static string HashPassword(string password)
    {
        return BCrypt.Net.BCrypt.HashPassword(password);
    }
}
