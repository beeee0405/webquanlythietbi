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

        // Seed sample data for other modules (Make sure each table has 10 lines of data)
        if (await db.AppUsers.CountAsync() < 10)
        {
            db.AppUsers.RemoveRange(db.AppUsers);
            await db.SaveChangesAsync();

            var users = new List<AppUser>
            {
                new() { Id = 1, FullName = "Thanh Khuông", Email = "thanh@tdmu.edu.vn", Phone = "0987654321", Department = "IT", Role = "Kỹ thuật viên", Status = "Đang hoạt động", CreatedAt = DateTime.Now.ToString("dd/MM/yyyy"), LastLogin = DateTime.Now.ToString("dd/MM/yyyy HH:mm") },
                new() { Id = 2, FullName = "Trần Bắc Hoàn", Email = "hoaan@gmail.com", Phone = "0912345678", Department = "Quản trị", Role = "Nhân viên", Status = "Đang hoạt động", CreatedAt = DateTime.Now.ToString("dd/MM/yyyy"), LastLogin = DateTime.Now.ToString("dd/MM/yyyy HH:mm") },
                new() { Id = 3, FullName = "Phòng Hạ tầng", Email = "phong@tdmu.edu.vn", Phone = "0909090909", Department = "IT", Role = "Kỹ thuật viên", Status = "Đang hoạt động", CreatedAt = DateTime.Now.ToString("dd/MM/yyyy"), LastLogin = DateTime.Now.ToString("dd/MM/yyyy HH:mm") },
                new() { Id = 4, FullName = "Nguyễn Văn An", Email = "an.nv@tdmu.edu.vn", Phone = "0911223344", Department = "Đào tạo", Role = "Nhân viên", Status = "Đang hoạt động", CreatedAt = DateTime.Now.ToString("dd/MM/yyyy"), LastLogin = "" },
                new() { Id = 5, FullName = "Lê Thị Bình", Email = "binh.lt@tdmu.edu.vn", Phone = "0922334455", Department = "Hành chính", Role = "Nhân viên", Status = "Đang hoạt động", CreatedAt = DateTime.Now.ToString("dd/MM/yyyy"), LastLogin = "" },
                new() { Id = 6, FullName = "Phạm Văn Cường", Email = "cuong.pv@tdmu.edu.vn", Phone = "0933445566", Department = "IT", Role = "Kỹ thuật viên", Status = "Đang hoạt động", CreatedAt = DateTime.Now.ToString("dd/MM/yyyy"), LastLogin = "" },
                new() { Id = 7, FullName = "Hoàng Thị Dung", Email = "dung.ht@tdmu.edu.vn", Phone = "0944556677", Department = "Tài chính", Role = "Nhân viên", Status = "Đang hoạt động", CreatedAt = DateTime.Now.ToString("dd/MM/yyyy"), LastLogin = "" },
                new() { Id = 8, FullName = "Đỗ Văn Em", Email = "em.dv@tdmu.edu.vn", Phone = "0955667788", Department = "Khảo thí", Role = "Nhân viên", Status = "Đang hoạt động", CreatedAt = DateTime.Now.ToString("dd/MM/yyyy"), LastLogin = "" },
                new() { Id = 9, FullName = "Ngô Thị Phương", Email = "phuong.nt@tdmu.edu.vn", Phone = "0966778899", Department = "Hợp tác quốc tế", Role = "Nhân viên", Status = "Đang hoạt động", CreatedAt = DateTime.Now.ToString("dd/MM/yyyy"), LastLogin = "" },
                new() { Id = 10, FullName = "Bùi Văn Giang", Email = "giang.bv@tdmu.edu.vn", Phone = "0977889900", Department = "Cơ sở vật chất", Role = "Kỹ thuật viên", Status = "Đang hoạt động", CreatedAt = DateTime.Now.ToString("dd/MM/yyyy"), LastLogin = "" }
            };
            db.AppUsers.AddRange(users);
            await db.SaveChangesAsync();
        }

        if (await db.Rooms.CountAsync() < 10)
        {
            db.Rooms.RemoveRange(db.Rooms);
            await db.SaveChangesAsync();

            var rooms = new List<Room>
            {
                new() { Id = 1, Code = "A3.302", Name = "Phòng Máy Tính 01", Building = "A", Floor = "3", Type = "Phòng máy", Capacity = 30, Status = "Đang sử dụng", Manager = "Thanh Khuông", Note = "Phòng thực hành lập trình" },
                new() { Id = 2, Code = "A4.101", Name = "Phòng Hệ thống", Building = "A", Floor = "4", Type = "Server", Capacity = 10, Status = "Đang sử dụng", Manager = "Phòng Hạ tầng", Note = "Phòng máy chủ chính" },
                new() { Id = 3, Code = "B2.205", Name = "Phòng Mạng", Building = "B", Floor = "2", Type = "Phòng máy", Capacity = 25, Status = "Đang sử dụng", Manager = "Trần Bắc Hoàn", Note = "Phòng thực hành mạng máy tính" },
                new() { Id = 4, Code = "A1.101", Name = "Hội trường A1", Building = "A", Floor = "1", Type = "Phòng học", Capacity = 150, Status = "Đang sử dụng", Manager = "Nguyễn Văn An", Note = "Hội trường lớn tổ chức sự kiện" },
                new() { Id = 5, Code = "B3.301", Name = "Phòng họp B3", Building = "B", Floor = "3", Type = "Phòng họp", Capacity = 50, Status = "Đang sử dụng", Manager = "Lê Thị Bình", Note = "Phòng họp giao ban các khoa" },
                new() { Id = 6, Code = "C2.201", Name = "Phòng Lab IoT", Building = "C", Floor = "2", Type = "Phòng máy", Capacity = 40, Status = "Đang sử dụng", Manager = "Phạm Văn Cường", Note = "Nghiên cứu phát triển IoT" },
                new() { Id = 7, Code = "C1.102", Name = "Phòng học C1.102", Building = "C", Floor = "1", Type = "Phòng học", Capacity = 80, Status = "Đang sử dụng", Manager = "Hoàng Thị Dung", Note = "Phòng học lý thuyết chung" },
                new() { Id = 8, Code = "D1.101", Name = "Phòng Đào tạo", Building = "D", Floor = "1", Type = "Văn phòng", Capacity = 20, Status = "Đang sử dụng", Manager = "Ngô Thị Phương", Note = "Văn phòng làm việc phòng đào tạo" },
                new() { Id = 9, Code = "A2.202", Name = "Phòng máy Cán bộ", Building = "A", Floor = "2", Type = "Văn phòng", Capacity = 15, Status = "Đang sử dụng", Manager = "Đỗ Văn Em", Note = "Phòng làm việc cán bộ giảng viên" },
                new() { Id = 10, Code = "B1.105", Name = "Kho Thiết bị", Building = "B", Floor = "1", Type = "Văn phòng", Capacity = 5, Status = "Dự phòng", Manager = "Bùi Văn Giang", Note = "Kho chứa thiết bị công nghệ thông tin dự phòng" }
            };
            db.Rooms.AddRange(rooms);
            await db.SaveChangesAsync();
        }

        if (await db.Devices.CountAsync() < 10)
        {
            db.Devices.RemoveRange(db.Devices);
            await db.SaveChangesAsync();

            var devices = new List<Device>
            {
                new() { Id = 1, AssetCode = "PC001", Name = "Máy Tính Dell XPS", Category = "Laptop", Brand = "Dell", RoomId = 1, OwnerId = 1, Status = "Hoạt động", Warranty = "2 năm", Serial = "ABC123456", PurchaseDate = "01/01/2024", UpdatedAt = DateTime.Now.ToString("dd/MM/yyyy HH:mm") },
                new() { Id = 2, AssetCode = "PC002", Name = "Máy Tính HP Pro", Category = "Desktop", Brand = "HP", RoomId = 1, OwnerId = 1, Status = "Hoạt động", Warranty = "1 năm", Serial = "XYZ789012", PurchaseDate = "15/01/2024", UpdatedAt = DateTime.Now.ToString("dd/MM/yyyy HH:mm") },
                new() { Id = 3, AssetCode = "SRV001", Name = "Server Dell PowerEdge", Category = "Server", Brand = "Dell", RoomId = 2, OwnerId = 3, Status = "Hoạt động", Warranty = "3 năm", Serial = "SRV123456", PurchaseDate = "10/12/2023", UpdatedAt = DateTime.Now.ToString("dd/MM/yyyy HH:mm") },
                new() { Id = 4, AssetCode = "PC003", Name = "Máy Tính Lenovo ThinkPad", Category = "Laptop", Brand = "Lenovo", RoomId = 3, OwnerId = 2, Status = "Hoạt động", Warranty = "2 năm", Serial = "LNV778899", PurchaseDate = "20/02/2024", UpdatedAt = DateTime.Now.ToString("dd/MM/yyyy HH:mm") },
                new() { Id = 5, AssetCode = "PRN001", Name = "Máy in Canon LBP2900", Category = "Thiết bị ngoại vi", Brand = "Canon", RoomId = 8, OwnerId = 4, Status = "Hoạt động", Warranty = "1 năm", Serial = "CAN2900", PurchaseDate = "05/03/2024", UpdatedAt = DateTime.Now.ToString("dd/MM/yyyy HH:mm") },
                new() { Id = 6, AssetCode = "PROJ001", Name = "Máy chiếu Panasonic", Category = "Thiết bị giảng đường", Brand = "Panasonic", RoomId = 4, OwnerId = 5, Status = "Hoạt động", Warranty = "2 năm", Serial = "PAN1122", PurchaseDate = "10/01/2024", UpdatedAt = DateTime.Now.ToString("dd/MM/yyyy HH:mm") },
                new() { Id = 7, AssetCode = "PC004", Name = "Máy tính iMac 24 inch", Category = "Desktop", Brand = "Apple", RoomId = 6, OwnerId = 6, Status = "Hoạt động", Warranty = "2 năm", Serial = "APL8899", PurchaseDate = "12/04/2024", UpdatedAt = DateTime.Now.ToString("dd/MM/yyyy HH:mm") },
                new() { Id = 8, AssetCode = "PC005", Name = "Laptop Asus Zenbook", Category = "Laptop", Brand = "Asus", RoomId = 9, OwnerId = 7, Status = "Hoạt động", Warranty = "2 năm", Serial = "ASU0099", PurchaseDate = "22/04/2024", UpdatedAt = DateTime.Now.ToString("dd/MM/yyyy HH:mm") },
                new() { Id = 9, AssetCode = "PRN002", Name = "Máy in HP LaserJet M404n", Category = "Thiết bị ngoại vi", Brand = "HP", RoomId = 8, OwnerId = 9, Status = "Bảo trì", Warranty = "1 năm", Serial = "HPLJ404", PurchaseDate = "14/02/2024", UpdatedAt = DateTime.Now.ToString("dd/MM/yyyy HH:mm") },
                new() { Id = 10, AssetCode = "PC006", Name = "Máy tính Dell Inspiron", Category = "Desktop", Brand = "Dell", RoomId = 3, OwnerId = 10, Status = "Hỏng", Warranty = "1 năm", Serial = "DEL5566", PurchaseDate = "30/03/2024", UpdatedAt = DateTime.Now.ToString("dd/MM/yyyy HH:mm") }
            };
            db.Devices.AddRange(devices);
            await db.SaveChangesAsync();
        }

        if (await db.Cameras.CountAsync() < 10)
        {
            db.Cameras.RemoveRange(db.Cameras);
            await db.SaveChangesAsync();

            var cameras = new List<Camera>
            {
                new() { Id = 1, Code = "CAM001", Name = "Camera Hikvision DS-2CD", RoomId = 1, IpAddress = "192.168.1.100", Brand = "Hikvision", Model = "DS-2CD2143G0-I", Resolution = "4MP", Status = "Hoạt động", InstalledAt = "01/01/2024", Warranty = "2 năm", Note = "Camera entrance" },
                new() { Id = 2, Code = "CAM002", Name = "Camera Dahua IPC", RoomId = 2, IpAddress = "192.168.1.101", Brand = "Dahua", Model = "IPC-HDBW2431E", Resolution = "4MP", Status = "Hoạt động", InstalledAt = "01/01/2024", Warranty = "2 năm", Note = "Camera server room" },
                new() { Id = 3, Code = "CAM003", Name = "Camera Hikvision Dome", RoomId = 3, IpAddress = "192.168.1.102", Brand = "Hikvision", Model = "DS-2CD1123G0-I", Resolution = "2MP", Status = "Hoạt động", InstalledAt = "15/01/2024", Warranty = "2 năm", Note = "Camera phòng mạng" },
                new() { Id = 4, Code = "CAM004", Name = "Camera KBVision KB-101", RoomId = 4, IpAddress = "192.168.1.103", Brand = "KBVision", Model = "KX-C2003C5", Resolution = "2MP", Status = "Hoạt động", InstalledAt = "10/02/2024", Warranty = "2 năm", Note = "Camera hội trường" },
                new() { Id = 5, Code = "CAM005", Name = "Camera Ezviz C8W PTZ", RoomId = 5, IpAddress = "192.168.1.104", Brand = "Ezviz", Model = "C8W", Resolution = "3MP", Status = "Hoạt động", InstalledAt = "01/03/2024", Warranty = "1 năm", Note = "Camera phòng họp" },
                new() { Id = 6, Code = "CAM006", Name = "Camera Dahua Bullet", RoomId = 6, IpAddress = "192.168.1.105", Brand = "Dahua", Model = "IPC-HFW1230S", Resolution = "2MP", Status = "Hoạt động", InstalledAt = "12/03/2024", Warranty = "2 năm", Note = "Camera phòng Lab IoT" },
                new() { Id = 7, Code = "CAM007", Name = "Camera Hikvision Bullet Outdoor", RoomId = 7, IpAddress = "192.168.1.106", Brand = "Hikvision", Model = "DS-2CD2021G1-I", Resolution = "2MP", Status = "Offline", InstalledAt = "20/03/2024", Warranty = "2 năm", Note = "Camera ngoài trời" },
                new() { Id = 8, Code = "CAM008", Name = "Camera Imou Ranger 2", RoomId = 8, IpAddress = "192.168.1.107", Brand = "Imou", Model = "Ranger 2", Resolution = "2MP", Status = "Hoạt động", InstalledAt = "05/04/2024", Warranty = "1 năm", Note = "Camera phòng đào tạo" },
                new() { Id = 9, Code = "CAM009", Name = "Camera Panasonic Dome", RoomId = 9, IpAddress = "192.168.1.108", Brand = "Panasonic", Model = "WV-S2136", Resolution = "2MP", Status = "Bảo trì", InstalledAt = "14/04/2024", Warranty = "3 năm", Note = "Camera phòng cán bộ" },
                new() { Id = 10, Code = "CAM010", Name = "Camera Bosch IP FLEXIDOME", RoomId = 10, IpAddress = "192.168.1.109", Brand = "Bosch", Model = "FLEXIDOME", Resolution = "5MP", Status = "Hoạt động", InstalledAt = "25/04/2024", Warranty = "3 năm", Note = "Camera giám sát kho" }
            };
            db.Cameras.AddRange(cameras);
            await db.SaveChangesAsync();
        }

        if (await db.NetworkDevices.CountAsync() < 10)
        {
            db.NetworkDevices.RemoveRange(db.NetworkDevices);
            await db.SaveChangesAsync();

            var networkDevices = new List<NetworkDevice>
            {
                new() { Id = 1, Code = "SW001", Name = "Switch Cisco Catalyst", Type = "Switch", Brand = "Cisco", Model = "Catalyst 2960", RoomId = 2, IpAddress = "192.168.1.1", MacAddress = "00:11:22:33:44:55", Vlan = "VLAN10", Port = "24", Status = "Hoạt động", Warranty = "3 năm", InstalledAt = "01/01/2024", Note = "Core Switch" },
                new() { Id = 2, Code = "RT001", Name = "Router Mikrotik RB4011", Type = "Router", Brand = "Mikrotik", Model = "RB4011iGS+", RoomId = 2, IpAddress = "192.168.1.2", MacAddress = "00:11:22:33:44:56", Vlan = "", Port = "10", Status = "Hoạt động", Warranty = "2 năm", InstalledAt = "01/01/2024", Note = "Gateway Router" },
                new() { Id = 3, Code = "AP001", Name = "Access Point Aruba AP-515", Type = "Access Point", Brand = "Aruba", Model = "AP-515", RoomId = 1, IpAddress = "192.168.1.3", MacAddress = "00:11:22:33:44:57", Vlan = "VLAN20", Port = "1", Status = "Hoạt động", Warranty = "3 năm", InstalledAt = "15/01/2024", Note = "Wifi phòng máy tính" },
                new() { Id = 4, Code = "SW002", Name = "Switch HP ProCurve", Type = "Switch", Brand = "HP", Model = "2530-24G", RoomId = 3, IpAddress = "192.168.1.4", MacAddress = "00:11:22:33:44:58", Vlan = "VLAN10", Port = "24", Status = "Hoạt động", Warranty = "3 năm", InstalledAt = "20/01/2024", Note = "Switch phòng mạng" },
                new() { Id = 5, Code = "AP002", Name = "Access Point Cisco C9115", Type = "Access Point", Brand = "Cisco", Model = "C9115AX", RoomId = 4, IpAddress = "192.168.1.5", MacAddress = "00:11:22:33:44:59", Vlan = "VLAN20", Port = "1", Status = "Hoạt động", Warranty = "2 năm", InstalledAt = "10/02/2024", Note = "Wifi hội trường" },
                new() { Id = 6, Code = "SW003", Name = "Switch D-Link 16 Port", Type = "Switch", Brand = "D-Link", Model = "DGS-1100", RoomId = 6, IpAddress = "192.168.1.6", MacAddress = "00:11:22:33:44:5A", Vlan = "VLAN30", Port = "16", Status = "Hoạt động", Warranty = "2 năm", InstalledAt = "12/03/2024", Note = "Switch phòng Lab IoT" },
                new() { Id = 7, Code = "FW001", Name = "Firewall Fortinet FortiGate", Type = "Firewall", Brand = "Fortinet", Model = "FortiGate 60F", RoomId = 2, IpAddress = "192.168.1.7", MacAddress = "00:11:22:33:44:5B", Vlan = "", Port = "8", Status = "Hoạt động", Warranty = "3 năm", InstalledAt = "20/03/2024", Note = "Tường lửa bảo vệ hệ thống" },
                new() { Id = 8, Code = "AP003", Name = "Access Point TP-Link EAP225", Type = "Access Point", Brand = "TP-Link", Model = "EAP225", RoomId = 7, IpAddress = "192.168.1.8", MacAddress = "00:11:22:33:44:5C", Vlan = "VLAN20", Port = "1", Status = "Offline", Warranty = "1 năm", InstalledAt = "05/04/2024", Note = "Wifi phòng học C1.102" },
                new() { Id = 9, Code = "SW004", Name = "Switch Cisco Catalyst 9200", Type = "Switch", Brand = "Cisco", Model = "Catalyst 9200", RoomId = 9, IpAddress = "192.168.1.9", MacAddress = "00:11:22:33:44:5D", Vlan = "VLAN10", Port = "48", Status = "Hoạt động", Warranty = "3 năm", InstalledAt = "14/04/2024", Note = "Switch phòng cán bộ" },
                new() { Id = 10, Code = "RT002", Name = "Router DrayTek Vigor2927", Type = "Router", Brand = "DrayTek", Model = "Vigor2927", RoomId = 8, IpAddress = "192.168.1.10", MacAddress = "00:11:22:33:44:5E", Vlan = "", Port = "6", Status = "Hoạt động", Warranty = "2 năm", InstalledAt = "25/04/2024", Note = "Router phụ phòng đào tạo" }
            };
            db.NetworkDevices.AddRange(networkDevices);
            await db.SaveChangesAsync();
        }

        if (await db.Softwares.CountAsync() < 10)
        {
            db.Softwares.RemoveRange(db.Softwares);
            await db.SaveChangesAsync();

            var softwares = new List<Software>
            {
                new() { Id = 1, Name = "Windows 11 Pro", Publisher = "Microsoft", Version = "22H2", Category = "Hệ điều hành", LicenseType = "Bản quyền", LicenseKey = "XXXXX-XXXXX-XXXXX", TotalLicenses = 50, UsedLicenses = 30, ExpiresAt = "01/01/2026", RoomId = 1, Status = "Đang dùng", Note = "OS for lab" },
                new() { Id = 2, Name = "Microsoft Office 365", Publisher = "Microsoft", Version = "Latest", Category = "Văn phòng", LicenseType = "Bản quyền", LicenseKey = "YYYYY-YYYYY-YYYYY", TotalLicenses = 100, UsedLicenses = 80, ExpiresAt = "01/01/2025", RoomId = null, Status = "Đang dùng", Note = "Office suite" },
                new() { Id = 3, Name = "Visual Studio Code", Publisher = "Microsoft", Version = "1.85", Category = "Lập trình", LicenseType = "Mã nguồn mở", LicenseKey = "", TotalLicenses = 999, UsedLicenses = 200, ExpiresAt = "", RoomId = 1, Status = "Đang dùng", Note = "Code editor" },
                new() { Id = 4, Name = "Adobe Photoshop 2024", Publisher = "Adobe", Version = "2024", Category = "Đồ họa", LicenseType = "Bản quyền", LicenseKey = "ADOBE-PS-2024", TotalLicenses = 20, UsedLicenses = 15, ExpiresAt = "01/01/2025", RoomId = 6, Status = "Đang dùng", Note = "Thiết kế đồ họa Lab" },
                new() { Id = 5, Name = "Autodesk AutoCAD 2024", Publisher = "Autodesk", Version = "2024", Category = "Kỹ thuật", LicenseType = "Bản quyền", LicenseKey = "ACAD-2024-KEY", TotalLicenses = 15, UsedLicenses = 10, ExpiresAt = "15/06/2025", RoomId = 6, Status = "Đang dùng", Note = "Vẽ kỹ thuật công trình" },
                new() { Id = 6, Name = "MATLAB R2023b", Publisher = "MathWorks", Version = "R2023b", Category = "Tính toán", LicenseType = "Bản quyền", LicenseKey = "MATLAB-R2023b-LIC", TotalLicenses = 30, UsedLicenses = 25, ExpiresAt = "01/09/2025", RoomId = 1, Status = "Đang dùng", Note = "Thực hành tính toán số học" },
                new() { Id = 7, Name = "SQL Server 2022 Enterprise", Publisher = "Microsoft", Version = "2022", Category = "Cơ sở dữ liệu", LicenseType = "Bản quyền", LicenseKey = "SQL-2022-ENT", TotalLicenses = 5, UsedLicenses = 3, ExpiresAt = "", RoomId = 2, Status = "Đang dùng", Note = "Hệ quản trị CSDL phòng máy chủ" },
                new() { Id = 8, Name = "IntelliJ IDEA Ultimate", Publisher = "JetBrains", Version = "2023.3", Category = "Lập trình", LicenseType = "Bản quyền", LicenseKey = "JB-INTELLIJ-KEY", TotalLicenses = 40, UsedLicenses = 30, ExpiresAt = "01/12/2024", RoomId = 1, Status = "Đang dùng", Note = "IDE lập trình Java Lab 1" },
                new() { Id = 9, Name = "Kaspersky Endpoint Security", Publisher = "Kaspersky", Version = "12.0", Category = "Bảo mật", LicenseType = "Bản quyền", LicenseKey = "KASP-SEC-2024", TotalLicenses = 150, UsedLicenses = 120, ExpiresAt = "10/10/2025", RoomId = null, Status = "Đang dùng", Note = "Phần mềm diệt virus cho toàn bộ máy trạm" },
                new() { Id = 10, Name = "VMware Workstation Pro 17", Publisher = "VMware", Version = "17.0", Category = "Ảo hóa", LicenseType = "Bản quyền", LicenseKey = "VMW-WORK-17", TotalLicenses = 30, UsedLicenses = 20, ExpiresAt = "", RoomId = 3, Status = "Đang dùng", Note = "Phần mềm tạo máy ảo thực hành mạng" }
            };
            db.Softwares.AddRange(softwares);
            await db.SaveChangesAsync();
        }

        if (await db.Tickets.CountAsync() < 10)
        {
            db.Tickets.RemoveRange(db.Tickets);
            await db.SaveChangesAsync();

            var tickets = new List<Ticket>
            {
                new() { Id = 1, Code = "TKT001", Subject = "Máy tính Dell lỗi màn hình xanh", RequesterId = 1, RoomId = 1, DeviceId = 1, Category = "Phần cứng", Priority = "Cao", Status = "Mới", Channel = "Trực tiếp", AssigneeId = 3, Sla = "8h", CreatedAt = DateTime.Now.ToString("dd/MM/yyyy"), UpdatedAt = DateTime.Now.ToString("dd/MM/yyyy HH:mm") },
                new() { Id = 2, Code = "TKT002", Subject = "Cần cập nhật Windows phòng máy chủ", RequesterId = 2, RoomId = 2, DeviceId = 3, Category = "Phần mềm", Priority = "Trung bình", Status = "Đang xử lý", Channel = "Email", AssigneeId = 3, Sla = "24h", CreatedAt = DateTime.Now.ToString("dd/MM/yyyy"), UpdatedAt = DateTime.Now.ToString("dd/MM/yyyy HH:mm") },
                new() { Id = 3, Code = "TKT003", Subject = "Mạng wifi phòng Lab IoT chập chờn", RequesterId = 4, RoomId = 6, DeviceId = 4, Category = "Mạng", Priority = "Cao", Status = "Mới", Channel = "Trực tiếp", AssigneeId = 1, Sla = "8h", CreatedAt = DateTime.Now.ToString("dd/MM/yyyy"), UpdatedAt = DateTime.Now.ToString("dd/MM/yyyy HH:mm") },
                new() { Id = 4, Code = "TKT004", Subject = "Lỗi máy in Canon không kết nối được", RequesterId = 5, RoomId = 8, DeviceId = 5, Category = "Phần cứng", Priority = "Trung bình", Status = "Đang xử lý", Channel = "Điện thoại", AssigneeId = 3, Sla = "12h", CreatedAt = DateTime.Now.ToString("dd/MM/yyyy"), UpdatedAt = DateTime.Now.ToString("dd/MM/yyyy HH:mm") },
                new() { Id = 5, Code = "TKT005", Subject = "Yêu cầu cài đặt phần mềm AutoCAD", RequesterId = 7, RoomId = 6, DeviceId = 7, Category = "Phần mềm", Priority = "Thấp", Status = "Hoàn thành", Channel = "Trực tiếp", AssigneeId = 1, Sla = "48h", CreatedAt = DateTime.Now.AddDays(-2).ToString("dd/MM/yyyy"), UpdatedAt = DateTime.Now.ToString("dd/MM/yyyy HH:mm") },
                new() { Id = 6, Code = "TKT006", Subject = "Máy chiếu hội trường A1 mờ hình", RequesterId = 6, RoomId = 4, DeviceId = 6, Category = "Phần cứng", Priority = "Cao", Status = "Mới", Channel = "Email", AssigneeId = 3, Sla = "8h", CreatedAt = DateTime.Now.ToString("dd/MM/yyyy"), UpdatedAt = DateTime.Now.ToString("dd/MM/yyyy HH:mm") },
                new() { Id = 7, Code = "TKT007", Subject = "Camera hành lang mất kết nối hệ thống", RequesterId = 10, RoomId = 7, DeviceId = 1, Category = "Mạng", Priority = "Trung bình", Status = "Đang xử lý", Channel = "Hệ thống", AssigneeId = 3, Sla = "24h", CreatedAt = DateTime.Now.ToString("dd/MM/yyyy"), UpdatedAt = DateTime.Now.ToString("dd/MM/yyyy HH:mm") },
                new() { Id = 8, Code = "TKT008", Subject = "Máy tính phòng cán bộ nhiễm virus", RequesterId = 9, RoomId = 9, DeviceId = 8, Category = "Phần mềm", Priority = "Trung bình", Status = "Hoàn thành", Channel = "Trực tiếp", AssigneeId = 3, Sla = "12h", CreatedAt = DateTime.Now.AddDays(-1).ToString("dd/MM/yyyy"), UpdatedAt = DateTime.Now.ToString("dd/MM/yyyy HH:mm") },
                new() { Id = 9, Code = "TKT009", Subject = "Server báo hết dung lượng phân vùng ổ cứng", RequesterId = 3, RoomId = 2, DeviceId = 3, Category = "Mạng", Priority = "Khẩn cấp", Status = "Đang xử lý", Channel = "Hệ thống", AssigneeId = 3, Sla = "4h", CreatedAt = DateTime.Now.ToString("dd/MM/yyyy"), UpdatedAt = DateTime.Now.ToString("dd/MM/yyyy HH:mm") },
                new() { Id = 10, Code = "TKT010", Subject = "Xin cấp phát chuột bàn phím mới phòng mạng", RequesterId = 2, RoomId = 3, DeviceId = 10, Category = "Phần cứng", Priority = "Thấp", Status = "Hoàn thành", Channel = "Trực tiếp", AssigneeId = 3, Sla = "72h", CreatedAt = DateTime.Now.AddDays(-3).ToString("dd/MM/yyyy"), UpdatedAt = DateTime.Now.ToString("dd/MM/yyyy HH:mm") }
            };
            db.Tickets.AddRange(tickets);
            await db.SaveChangesAsync();
        }

        if (await db.MaintenanceItems.CountAsync() < 10)
        {
            db.MaintenanceItems.RemoveRange(db.MaintenanceItems);
            await db.SaveChangesAsync();

            var maintenanceItems = new List<MaintenanceItem>
            {
                new() { Id = 1, Code = "MNT001", Title = "Vệ sinh máy tính Dell XPS", DeviceId = 1, RoomId = 1, Type = "Vệ sinh", Priority = "Thấp", Status = "Lên lịch", AssigneeId = 1, ScheduledAt = DateTime.Now.AddDays(3).ToString("dd/MM/yyyy"), CompletedAt = "", Cost = "500000", Note = "Cleaning and maintenance" },
                new() { Id = 2, Code = "MNT002", Title = "Kiểm tra hệ thống mạng máy chủ", DeviceId = 3, RoomId = 2, Type = "Bảo dưỡng", Priority = "Cao", Status = "Đang thực hiện", AssigneeId = 3, ScheduledAt = DateTime.Now.ToString("dd/MM/yyyy"), CompletedAt = "", Cost = "2000000", Note = "Network system check" },
                new() { Id = 3, Code = "MNT003", Title = "Vệ sinh UPS phòng server B", DeviceId = 3, RoomId = 2, Type = "Bảo dưỡng", Priority = "Trung bình", Status = "Hoàn thành", AssigneeId = 3, ScheduledAt = DateTime.Now.ToString("dd/MM/yyyy"), CompletedAt = DateTime.Now.ToString("dd/MM/yyyy 16:30"), Cost = "1200000", Note = "Thay lọc bụi, kiểm tra pin dự phòng" },
                new() { Id = 4, Code = "MNT004", Title = "Sửa máy in Canon LBP2900 kẹt giấy", DeviceId = 5, RoomId = 8, Type = "Sửa chữa", Priority = "Cao", Status = "Đang thực hiện", AssigneeId = 1, ScheduledAt = DateTime.Now.ToString("dd/MM/yyyy"), CompletedAt = "", Cost = "800000", Note = "Thay roller và bộ phận cảm biến trục kéo" },
                new() { Id = 5, Code = "MNT005", Title = "Căn chỉnh góc quay camera hành lang", DeviceId = 1, RoomId = 1, Type = "Bảo dưỡng", Priority = "Thấp", Status = "Hoàn thành", AssigneeId = 3, ScheduledAt = DateTime.Now.AddDays(-5).ToString("dd/MM/yyyy"), CompletedAt = DateTime.Now.AddDays(-5).ToString("dd/MM/yyyy"), Cost = "300000", Note = "Kiểm tra dây nối mạng và hướng góc camera" },
                new() { Id = 6, Code = "MNT006", Title = "Thay bóng đèn máy chiếu hội trường", DeviceId = 6, RoomId = 4, Type = "Sửa chữa", Priority = "Cao", Status = "Lên lịch", AssigneeId = 3, ScheduledAt = DateTime.Now.AddDays(2).ToString("dd/MM/yyyy"), CompletedAt = "", Cost = "1500000", Note = "Bóng cũ mờ, thay bóng mới chính hãng" },
                new() { Id = 7, Code = "MNT007", Title = "Cập nhật Firmware Core Switch Cisco", DeviceId = 3, RoomId = 2, Type = "Bảo dưỡng", Priority = "Cao", Status = "Hoàn thành", AssigneeId = 3, ScheduledAt = DateTime.Now.AddDays(-2).ToString("dd/MM/yyyy"), CompletedAt = DateTime.Now.AddDays(-2).ToString("dd/MM/yyyy"), Cost = "1000000", Note = "Nâng cấp bản vá bảo mật và cải thiện định tuyến" },
                new() { Id = 8, Code = "MNT008", Title = "Vệ sinh máy tính iMac phòng Lab IoT", DeviceId = 7, RoomId = 6, Type = "Vệ sinh", Priority = "Trung bình", Status = "Lên lịch", AssigneeId = 1, ScheduledAt = DateTime.Now.AddDays(4).ToString("dd/MM/yyyy"), CompletedAt = "", Cost = "1200000", Note = "Hút bụi thổi gió tản nhiệt màn hình" },
                new() { Id = 9, Code = "MNT009", Title = "Cài đặt lại hệ thống phần mềm virus", DeviceId = 8, RoomId = 9, Type = "Bảo dưỡng", Priority = "Thấp", Status = "Hoàn thành", AssigneeId = 3, ScheduledAt = DateTime.Now.AddDays(-1).ToString("dd/MM/yyyy"), CompletedAt = DateTime.Now.AddDays(-1).ToString("dd/MM/yyyy"), Cost = "500000", Note = "Cập nhật cơ sở dữ liệu virus mới" },
                new() { Id = 10, Code = "MNT010", Title = "Kiểm tra điều hòa phòng Server chính", DeviceId = 3, RoomId = 2, Type = "Bảo dưỡng", Priority = "Khẩn cấp", Status = "Hoàn thành", AssigneeId = 3, ScheduledAt = DateTime.Now.AddDays(-3).ToString("dd/MM/yyyy"), CompletedAt = DateTime.Now.AddDays(-3).ToString("dd/MM/yyyy"), Cost = "2500000", Note = "Bảo dưỡng ga điều hòa, đảm bảo nhiệt độ phòng server luôn ổn định" }
            };
            db.MaintenanceItems.AddRange(maintenanceItems);
            await db.SaveChangesAsync();
        }

        if (await db.InventorySessions.CountAsync() < 10)
        {
            db.InventorySessions.RemoveRange(db.InventorySessions);
            await db.SaveChangesAsync();

            var inventorySessions = new List<InventorySession>
            {
                new() { Id = 1, Code = "INV001", RoomId = 1, InspectorId = 1, Status = "Hoàn thành", TotalDevices = 10, CheckedDevices = 10, MissingDevices = 0, ExtraDevices = 0, StartedAt = "01/01/2024", CompletedAt = "01/01/2024 10:30", Note = "Lab inventory completed" },
                new() { Id = 2, Code = "INV002", RoomId = 2, InspectorId = 3, Status = "Đang kiểm", TotalDevices = 5, CheckedDevices = 3, MissingDevices = 0, ExtraDevices = 0, StartedAt = DateTime.Now.ToString("dd/MM/yyyy"), CompletedAt = "", Note = "Server room inventory in progress" },
                new() { Id = 3, Code = "INV003", RoomId = 3, InspectorId = 2, Status = "Hoàn thành", TotalDevices = 12, CheckedDevices = 12, MissingDevices = 0, ExtraDevices = 0, StartedAt = "15/01/2024", CompletedAt = "15/01/2024 11:45", Note = "Kiểm kê phòng mạng định kỳ" },
                new() { Id = 4, Code = "INV004", RoomId = 4, InspectorId = 4, Status = "Hoàn thành", TotalDevices = 8, CheckedDevices = 8, MissingDevices = 0, ExtraDevices = 0, StartedAt = "10/02/2024", CompletedAt = "10/02/2024 15:30", Note = "Kiểm kê thiết bị hội trường" },
                new() { Id = 5, Code = "INV005", RoomId = 5, InspectorId = 5, Status = "Có lệch", TotalDevices = 6, CheckedDevices = 5, MissingDevices = 1, ExtraDevices = 0, StartedAt = "01/03/2024", CompletedAt = "01/03/2024 14:00", Note = "Thiếu 1 mic không dây phòng họp" },
                new() { Id = 6, Code = "INV006", RoomId = 6, InspectorId = 6, Status = "Hoàn thành", TotalDevices = 15, CheckedDevices = 15, MissingDevices = 0, ExtraDevices = 0, StartedAt = "12/03/2024", CompletedAt = "12/03/2024 11:00", Note = "Kiểm kê Lab IoT định kỳ" },
                new() { Id = 7, Code = "INV007", RoomId = 7, InspectorId = 7, Status = "Đang kiểm", TotalDevices = 20, CheckedDevices = 10, MissingDevices = 0, ExtraDevices = 0, StartedAt = DateTime.Now.ToString("dd/MM/yyyy"), CompletedAt = "", Note = "Đang tiến hành kiểm kê phòng học C1.102" },
                new() { Id = 8, Code = "INV008", RoomId = 8, InspectorId = 8, Status = "Hoàn thành", TotalDevices = 7, CheckedDevices = 7, MissingDevices = 0, ExtraDevices = 0, StartedAt = "05/04/2024", CompletedAt = "05/04/2024 09:30", Note = "Kiểm kê phòng đào tạo hoàn tất" },
                new() { Id = 9, Code = "INV009", RoomId = 9, InspectorId = 9, Status = "Hoàn thành", TotalDevices = 4, CheckedDevices = 4, MissingDevices = 0, ExtraDevices = 0, StartedAt = "14/04/2024", CompletedAt = "14/04/2024 10:15", Note = "Kiểm kê phòng làm việc cán bộ" },
                new() { Id = 10, Code = "INV010", RoomId = 10, InspectorId = 10, Status = "Đang kiểm", TotalDevices = 3, CheckedDevices = 1, MissingDevices = 0, ExtraDevices = 0, StartedAt = DateTime.Now.ToString("dd/MM/yyyy"), CompletedAt = "", Note = "Kiểm kê kho thiết bị dự phòng" }
            };
            db.InventorySessions.AddRange(inventorySessions);
            await db.SaveChangesAsync();
        }

        if (await db.Transfers.CountAsync() < 10)
        {
            db.Transfers.RemoveRange(db.Transfers);
            await db.SaveChangesAsync();

            var transfers = new List<Transfer>
            {
                new() { Id = 1, Code = "TRF001", DeviceId = 1, FromRoomId = 1, ToRoomId = 3, RequesterId = 1, ApproverId = 3, Status = "Đã duyệt", TransferredAt = "01/01/2024", ApprovedAt = "01/01/2024 09:00", Note = "Điều chuyển laptop sang phòng mạng" },
                new() { Id = 2, Code = "TRF002", DeviceId = 2, FromRoomId = 1, ToRoomId = 6, RequesterId = 4, ApproverId = 3, Status = "Đã duyệt", TransferredAt = "15/01/2024", ApprovedAt = "15/01/2024 10:30", Note = "Điều chuyển PC HP sang Lab IoT" },
                new() { Id = 3, Code = "TRF003", DeviceId = 4, FromRoomId = 3, ToRoomId = 8, RequesterId = 2, ApproverId = 3, Status = "Chờ duyệt", TransferredAt = DateTime.Now.ToString("dd/MM/yyyy"), ApprovedAt = "", Note = "Yêu cầu chuyển Laptop Lenovo sang phòng Đào tạo" },
                new() { Id = 4, Code = "TRF004", DeviceId = 5, FromRoomId = 8, ToRoomId = 10, RequesterId = 9, ApproverId = 3, Status = "Đã duyệt", TransferredAt = "05/02/2024", ApprovedAt = "05/02/2024 11:00", Note = "Chuyển máy in cũ vào kho dự phòng" },
                new() { Id = 5, Code = "TRF005", DeviceId = 6, FromRoomId = 4, ToRoomId = 5, RequesterId = 5, ApproverId = 3, Status = "Từ chối", TransferredAt = "10/02/2024", ApprovedAt = "", Note = "Yêu cầu chuyển máy chiếu sang phòng họp bị từ chối" },
                new() { Id = 6, Code = "TRF006", DeviceId = 7, FromRoomId = 6, ToRoomId = 1, RequesterId = 6, ApproverId = 3, Status = "Đã duyệt", TransferredAt = "12/03/2024", ApprovedAt = "12/03/2024 09:15", Note = "Chuyển iMac sang phòng máy tính 01" },
                new() { Id = 7, Code = "TRF007", DeviceId = 8, FromRoomId = 9, ToRoomId = 3, RequesterId = 7, ApproverId = 3, Status = "Chờ duyệt", TransferredAt = DateTime.Now.ToString("dd/MM/yyyy"), ApprovedAt = "", Note = "Chuyển laptop Asus sang phòng mạng" },
                new() { Id = 8, Code = "TRF008", DeviceId = 3, FromRoomId = 2, ToRoomId = 10, RequesterId = 3, ApproverId = 3, Status = "Đã duyệt", TransferredAt = "20/03/2024", ApprovedAt = "20/03/2024 15:45", Note = "Chuyển switch cũ vào kho" },
                new() { Id = 9, Code = "TRF009", DeviceId = 9, FromRoomId = 8, ToRoomId = 9, RequesterId = 9, ApproverId = 3, Status = "Đã duyệt", TransferredAt = "05/04/2024", ApprovedAt = "05/04/2024 14:00", Note = "Chuyển máy in HP sang phòng cán bộ" },
                new() { Id = 10, Code = "TRF010", DeviceId = 10, FromRoomId = 3, ToRoomId = 6, RequesterId = 10, ApproverId = 3, Status = "Chờ duyệt", TransferredAt = DateTime.Now.ToString("dd/MM/yyyy"), ApprovedAt = "", Note = "Yêu cầu chuyển máy tính hỏng sang phòng Lab kỹ thuật" }
            };
            db.Transfers.AddRange(transfers);
            await db.SaveChangesAsync();
        }

        if (await db.Liquidations.CountAsync() < 10)
        {
            db.Liquidations.RemoveRange(db.Liquidations);
            await db.SaveChangesAsync();

            var liquidations = new List<Liquidation>
            {
                new() { Id = 1, Code = "LIQ001", DeviceId = 2, RoomId = 1, Reason = "Hỏng màn hình, mainboard cũ", Condition = "Hỏng hoàn toàn", Status = "Chờ duyệt", RequesterId = 1, ApproverId = 0, ResidualValue = 500000, RequestedAt = DateTime.Now.ToString("dd/MM/yyyy"), CompletedAt = "", Note = "Máy tính HP cũ không dùng được" },
                new() { Id = 2, Code = "LIQ002", DeviceId = 5, RoomId = 8, Reason = "Máy in hỏng đầu phun nghiêm trọng", Condition = "Hỏng hoàn toàn", Status = "Đã duyệt", RequesterId = 4, ApproverId = 3, ResidualValue = 300000, RequestedAt = "15/01/2024", CompletedAt = "16/01/2024", Note = "Hồ sơ thanh lý thiết bị ngoại vi" },
                new() { Id = 3, Code = "LIQ003", DeviceId = 6, RoomId = 4, Reason = "Máy chiếu mờ bóng, hết khấu hao", Condition = "Lạc hậu", Status = "Hoàn thành", RequesterId = 2, ApproverId = 3, ResidualValue = 1000000, RequestedAt = "10/02/2024", CompletedAt = "12/02/2024", Note = "Thanh lý máy chiếu hội trường cũ" },
                new() { Id = 4, Code = "LIQ004", DeviceId = 9, RoomId = 8, Reason = "Máy in laser cũ liên tục kẹt giấy", Condition = "Hỏng hoàn toàn", Status = "Chờ duyệt", RequesterId = 9, ApproverId = 0, ResidualValue = 400000, RequestedAt = DateTime.Now.ToString("dd/MM/yyyy"), CompletedAt = "", Note = "Máy in HP LaserJet M404n" },
                new() { Id = 5, Code = "LIQ005", DeviceId = 10, RoomId = 3, Reason = "Máy tính cựu thế hệ Pentium", Condition = "Lạc hậu", Status = "Đã duyệt", RequesterId = 10, ApproverId = 3, ResidualValue = 200000, RequestedAt = "05/03/2024", CompletedAt = "06/03/2024", Note = "Thanh lý phần cứng máy tính cũ" },
                new() { Id = 6, Code = "LIQ006", DeviceId = 1, RoomId = 1, Reason = "Laptop hỏng phím, hỏng nguồn sửa đắt", Condition = "Hỏng hoàn toàn", Status = "Hoàn thành", RequesterId = 1, ApproverId = 3, ResidualValue = 800000, RequestedAt = "12/03/2024", CompletedAt = "15/03/2024", Note = "Thanh lý Dell XPS hỏng" },
                new() { Id = 7, Code = "LIQ007", DeviceId = 3, RoomId = 2, Reason = "Server cũ thế hệ 11, tiêu tốn nhiều điện năng", Condition = "Lạc hậu", Status = "Chờ duyệt", RequesterId = 3, ApproverId = 0, ResidualValue = 3000000, RequestedAt = DateTime.Now.ToString("dd/MM/yyyy"), CompletedAt = "", Note = "Server Dell PowerEdge cũ" },
                new() { Id = 8, Code = "LIQ008", DeviceId = 4, RoomId = 3, Reason = "Laptop vỡ vỏ, hỏng bàn phím và màn hình", Condition = "Hỏng hoàn toàn", Status = "Hoàn thành", RequesterId = 2, ApproverId = 3, ResidualValue = 600000, RequestedAt = "20/03/2024", CompletedAt = "22/03/2024", Note = "Thanh lý Lenovo ThinkPad cũ" },
                new() { Id = 9, Code = "LIQ009", DeviceId = 7, RoomId = 6, Reason = "Màn hình iMac nứt kính, hỏng panel", Condition = "Hỏng hoàn toàn", Status = "Đã duyệt", RequesterId = 6, ApproverId = 3, ResidualValue = 1500000, RequestedAt = "05/04/2024", CompletedAt = "06/04/2024", Note = "Thanh lý iMac 24 inch hỏng" },
                new() { Id = 10, Code = "LIQ010", DeviceId = 8, RoomId = 9, Reason = "Laptop hỏng ổ cứng, pin phồng rộp", Condition = "Hỏng hoàn toàn", Status = "Chờ duyệt", RequesterId = 7, ApproverId = 0, ResidualValue = 700000, RequestedAt = DateTime.Now.ToString("dd/MM/yyyy"), CompletedAt = "", Note = "Thanh lý Laptop Asus phòng cán bộ" }
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
