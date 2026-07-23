namespace backend.Data;

public static class MockStore
{
    public static DashboardResponse Dashboard { get; } = new(
        new List<KpiDto>
        {
            new("Tổng thiết bị", "2,450", "+12.4%", "primary"),
            new("Thiết bị đang hoạt động", "1,862", "+7.8%", "emerald"),
            new("Thiết bị đang sửa", "48", "+1.1%", "amber"),
            new("Ticket đang xử lý", "17", "-3.2%", "zinc")
        },
        new List<PointDto>
        {
            new("PC", 980), new("Laptop", 210), new("Printer", 144), new("Network", 276), new("Camera", 98), new("Other", 742)
        },
        new List<PointDto>
        {
            new("Hoạt động", 1862), new("Đang sửa", 48), new("Bảo trì", 17), new("Hỏng", 39), new("Chờ thanh lý", 14)
        },
        new List<PointDto>
        {
            new("T1", 38), new("T2", 42), new("T3", 35), new("T4", 49), new("T5", 54), new("T6", 61)
        },
        new List<PointDto>
        {
            new("T1", 8.2m), new("T2", 6.7m), new("T3", 9.1m), new("T4", 12.6m), new("T5", 10.4m), new("T6", 14.3m)
        },
        new List<PointDto>
        {
            new("T1", 4.2m), new("T2", 5.1m), new("T3", 6.4m), new("T4", 7.8m), new("T5", 7.2m), new("T6", 8.9m)
        },
        new List<PointDto>
        {
            new("Khẩn cấp", 12), new("Cao", 27), new("Trung bình", 44), new("Thấp", 18)
        },
        new List<PointDto>
        {
            new("A3.302", 18), new("A2.101", 13), new("B1.201", 11), new("C1.103", 9), new("Server A", 7), new("Server B", 6)
        },
        new List<PointDto>
        {
            new("Mới", 38), new("Ổn định", 52), new("Sắp hết BH", 14), new("Cần thay thế", 9)
        },
        new List<AlertDto>
        {
            new("Thiết bị quá hạn kiểm kê", "12"), new("Ticket chưa phân công", "8"), new("Thiết bị sắp hết bảo hành", "21"), new("Lịch bảo trì tuần này", "5")
        },
        Devices,
        Tickets
    );

    public static DeviceManagementResponse DeviceManagement { get; } = new(
        new List<KpiDto>
        {
            new("Tổng thiết bị", "2,450", "+12.4%", "primary"),
            new("Đang hoạt động", "1,862", "+7.8%", "emerald"),
            new("Cần xử lý", "87", "-2.1%", "amber"),
            new("Sắp hết bảo hành", "21", "+4.9%", "zinc")
        },
        new List<PointDto>
        {
            new("Hoạt động", 1862), new("Đang sửa", 48), new("Bảo trì", 17), new("Hỏng", 39), new("Chờ thanh lý", 14)
        },
        new List<PointDto>
        {
            new("A3.302", 42), new("A2.101", 31), new("B1.201", 28), new("Server A", 14), new("Server B", 11), new("VP Khoa", 9)
        },
        Devices,
        new List<string> { "Tất cả", "PC", "Printer", "Switch", "Laptop", "Camera", "Access Point", "Projector", "UPS", "Router", "Display" }
    );

    public static TicketManagementResponse TicketManagement { get; } = new(
        new List<KpiDto>
        {
            new("Tổng ticket", "184", "+18.2%", "primary"),
            new("Đang xử lý", "27", "+4.6%", "amber"),
            new("Chờ phản hồi", "14", "-1.2%", "amber"),
            new("Hoàn thành hôm nay", "38", "+9.1%", "emerald")
        },
        new List<PointDto>
        {
            new("Mới", 41), new("Đang xử lý", 27), new("Chờ phản hồi", 14), new("Hoàn thành", 82), new("Đóng", 20)
        },
        new List<PointDto>
        {
            new("Khẩn cấp", 12), new("Cao", 37), new("Trung bình", 89), new("Thấp", 46)
        },
        new List<PointDto>
        {
            new("QR", 58), new("Email", 41), new("Điện thoại", 23), new("Trực tiếp", 18), new("Hệ thống", 44)
        },
        new List<PointDto>
        {
            new("T1", 78), new("T2", 82), new("T3", 85), new("T4", 88), new("T5", 90), new("T6", 93)
        },
        new List<PointDto>
        {
            new("< 1 ngày", 19), new("1-3 ngày", 24), new("3-7 ngày", 10), new("> 7 ngày", 6)
        },
        Tickets,
        new List<string> { "Mới", "Đang xử lý", "Chờ phản hồi", "Hoàn thành", "Đóng" },
        new List<string> { "Khẩn cấp", "Cao", "Trung bình", "Thấp" },
        new List<string> { "QR", "Email", "Điện thoại", "Trực tiếp", "Hệ thống" }
    );

    public static MaintenanceManagementResponse MaintenanceManagement { get; } = new(
        new List<KpiDto>
        {
            new("Kế hoạch tháng", "42", "+11.6%", "primary"),
            new("Đang thực hiện", "9", "+2.4%", "amber"),
            new("Hoàn thành", "28", "+8.1%", "emerald"),
            new("Chi phí dự kiến", "126M", "+4.7%", "zinc")
        },
        new List<PointDto>
        {
            new("Chờ duyệt", 11), new("Đang thực hiện", 9), new("Hoàn thành", 28), new("Tạm hoãn", 5)
        },
        new List<PointDto>
        {
            new("Phòng ngừa", 19), new("Sửa chữa", 14), new("Vệ sinh", 7), new("Kiểm tra", 10)
        },
        new List<PointDto>
        {
            new("T1", 7), new("T2", 9), new("T3", 11), new("T4", 13), new("T5", 15), new("T6", 18)
        },
        new List<PointDto>
        {
            new("T1", 16), new("T2", 18), new("T3", 20), new("T4", 22), new("T5", 24), new("T6", 26)
        },
        MaintenanceItems,
        new List<string> { "Chờ duyệt", "Đang thực hiện", "Hoàn thành", "Tạm hoãn" },
        new List<string> { "Khẩn cấp", "Cao", "Trung bình", "Thấp" },
        new List<string> { "Phòng ngừa", "Sửa chữa", "Vệ sinh", "Kiểm tra" }
    );

    public static IReadOnlyList<DeviceDto> Devices { get; } = new List<DeviceDto>
    {
        new("1", "TS-2401", "Dell OptiPlex 3080", "PC", "Dell", "A3.302", "Phòng máy", "Hoạt động", "10/08/2026", "DL3080-01", "12/08/2023", "2 phút trước"),
        new("2", "TS-2402", "HP LaserJet 1020", "Printer", "HP", "B1.201", "Hành chính", "Hỏng", "12/08/2026", "HPLJ-1020", "28/09/2022", "10 phút trước"),
        new("3", "TS-2403", "Cisco 24 Port", "Switch", "Cisco", "Server A", "Hạ tầng", "Bảo trì", "18/09/2026", "CISCO-24P", "04/01/2024", "15 phút trước"),
        new("4", "TS-2404", "MacBook Air M2", "Laptop", "Apple", "VP Khoa", "Lê Minh C", "Đang sửa", "30/07/2026", "MBA-M2-14", "20/07/2024", "18 phút trước"),
        new("5", "TS-2405", "Hikvision DS-2CD", "Camera", "Hikvision", "A2.101", "An ninh", "Hoạt động", "01/12/2026", "HK-2CD-33", "14/03/2024", "22 phút trước"),
        new("6", "TS-2406", "AP Aruba AP-515", "Access Point", "Aruba", "A1.205", "Mạng", "Hoạt động", "20/11/2026", "ARB-AP515", "11/11/2023", "25 phút trước"),
        new("7", "TS-2407", "Sony VPL-DX221", "Projector", "Sony", "C1.103", "Khoa CNTT", "Hoạt động", "14/10/2026", "SONY-VPL-221", "05/04/2024", "30 phút trước"),
        new("8", "TS-2408", "UPS Santak", "UPS", "Santak", "Server B", "Hạ tầng", "Bảo trì", "05/09/2026", "STK-UPS-2200", "01/02/2023", "35 phút trước"),
        new("9", "TS-2409", "Router Mikrotik", "Router", "Mikrotik", "Server A", "Mạng", "Hoạt động", "01/01/2027", "MIK-RB4011", "18/01/2024", "40 phút trước"),
        new("10", "TS-2410", "TV Samsung 55”", "Display", "Samsung", "D1.109", "Phòng họp", "Hoạt động", "12/11/2026", "SAM-TV55-24", "02/10/2023", "42 phút trước"),
        new("11", "TS-2411", "Lenovo ThinkCentre M70q", "PC", "Lenovo", "A3.302", "Phòng máy", "Hoạt động", "10/08/2026", "LN-M70Q-08", "15/05/2024", "1 giờ trước"),
        new("12", "TS-2412", "Dell Latitude 5440", "Laptop", "Dell", "VP Khoa", "Nguyễn Văn A", "Chờ thanh lý", "20/03/2026", "DL-5440-22", "08/03/2022", "1 giờ trước")
    };

    public static IReadOnlyList<TicketDto> Tickets { get; } = new List<TicketDto>
    {
        new("1", "TK-140", "Máy in kẹt giấy phòng A102", "GV Nguyễn Văn A", "A102", "HP LaserJet 1020", "In ấn", "Cao", "Mới", "QR", "Chưa phân công", "4h", "08:55", "08:55"),
        new("2", "TK-141", "Mất mạng phòng A202", "Khoa CNTT", "A202", "AP Aruba AP-515", "Mạng", "Khẩn cấp", "Đang xử lý", "Email", "Nguyễn Văn Hoàng", "2h", "09:10", "09:40"),
        new("3", "TK-142", "Chuột máy A5.2 không hoạt động", "CB Trần Thị B", "A5.2", "Dell OptiPlex 3080", "Ngoại vi", "Trung bình", "Hoàn thành", "Hệ thống", "Lê Minh Tâm", "8h", "09:25", "10:15"),
        new("4", "TK-143", "Thiết bị camera mất tín hiệu", "Phòng Hành chính", "B1.101", "Hikvision DS-2CD", "Camera", "Cao", "Đang xử lý", "Điện thoại", "Trần Quốc Bảo", "4h", "09:45", "10:35"),
        new("5", "TK-144", "Cài đặt phần mềm văn phòng", "GV Lê Minh C", "VP Khoa", "MacBook Air M2", "Phần mềm", "Thấp", "Chờ phản hồi", "Trực tiếp", "Phạm Anh Khoa", "24h", "10:05", "10:50"),
        new("6", "TK-145", "Máy tính phòng máy tự restart", "Phòng máy", "A3.302", "Lenovo ThinkCentre M70q", "Phần cứng", "Khẩn cấp", "Đang xử lý", "QR", "Nguyễn Văn Hoàng", "2h", "10:20", "11:05"),
        new("7", "TK-146", "Switch server báo đèn đỏ", "KTV nội bộ", "Server A", "Cisco 24 Port", "Mạng", "Cao", "Mới", "Hệ thống", "Chưa phân công", "4h", "10:28", "11:12"),
        new("8", "TK-147", "Wifi yếu khu giảng đường", "Sinh viên", "C1", "AP Aruba AP-515", "Mạng", "Trung bình", "Hoàn thành", "QR", "Lê Minh Tâm", "8h", "10:35", "11:20"),
        new("9", "TK-148", "UPS phát tiếng kêu bất thường", "KTV", "Server B", "UPS Santak", "Nguồn", "Cao", "Đang xử lý", "Điện thoại", "Trần Quốc Bảo", "4h", "10:50", "11:30"),
        new("10", "TK-149", "Thiết bị scan QR không nhận mã", "Giảng viên", "A2.104", "Máy quét QR", "Hệ thống", "Trung bình", "Mới", "Email", "Chưa phân công", "8h", "11:02", "11:42"),
        new("11", "TK-150", "Thiết bị âm thanh phòng họp rè", "Phòng họp", "D1.109", "TV Samsung 55”", "Âm thanh", "Thấp", "Chờ phản hồi", "Trực tiếp", "Phạm Anh Khoa", "24h", "11:15", "11:50"),
        new("12", "TK-151", "Mất quyền truy cập máy in", "Phòng tài vụ", "A1.205", "HP LaserJet 1020", "Phần mềm", "Trung bình", "Đóng", "Hệ thống", "Lê Minh Tâm", "12h", "11:20", "11:55")
    };

    public static IReadOnlyList<MaintenanceDto> MaintenanceItems { get; } = new List<MaintenanceDto>
    {
        new("1", "MT-001", "Bảo trì phòng máy A3.302", "TS-2401", "Dell OptiPlex 3080", "A3.302", "Phòng ngừa", "Cao", "Đang thực hiện", "Nguyễn Văn Hoàng", "02/08/2026 08:00", "-", "12.500.000", "Vệ sinh bụi, kiểm tra RAM và ổ SSD"),
        new("2", "MT-002", "Kiểm tra switch server", "TS-2403", "Cisco 24 Port", "Server A", "Kiểm tra", "Khẩn cấp", "Chờ duyệt", "Trần Quốc Bảo", "02/08/2026 10:00", "-", "6.800.000", "Đèn đỏ port 12, gián đoạn mạng nội bộ"),
        new("3", "MT-003", "Vệ sinh UPS phòng server B", "TS-2408", "UPS Santak", "Server B", "Vệ sinh", "Trung bình", "Hoàn thành", "Phạm Anh Khoa", "28/07/2026 14:00", "28/07/2026 16:30", "3.200.000", "Thay lọc bụi, kiểm tra pin dự phòng"),
        new("4", "MT-004", "Sửa máy in phòng A102", "TS-2402", "HP LaserJet 1020", "B1.201", "Sửa chữa", "Cao", "Đang thực hiện", "Lê Minh Tâm", "03/08/2026 09:00", "-", "2.900.000", "Kẹt giấy liên tục, thay roller và cảm biến"),
        new("5", "MT-005", "Kiểm tra AP khu giảng đường", "TS-2406", "AP Aruba AP-515", "A1.205", "Kiểm tra", "Trung bình", "Chờ duyệt", "Nguyễn Văn Hoàng", "04/08/2026 13:30", "-", "1.500.000", "Tín hiệu dao động theo giờ cao điểm"),
        new("6", "MT-006", "Bảo trì camera hành lang", "TS-2405", "Hikvision DS-2CD", "A2.101", "Phòng ngừa", "Thấp", "Hoàn thành", "Trần Quốc Bảo", "25/07/2026 15:00", "25/07/2026 16:15", "2.100.000", "Căn chỉnh góc quay, cập nhật firmware"),
        new("7", "MT-007", "Bảo trì projector phòng học", "TS-2407", "Sony VPL-DX221", "C1.103", "Vệ sinh", "Thấp", "Hoàn thành", "Phạm Anh Khoa", "26/07/2026 10:00", "26/07/2026 11:10", "1.200.000", "Vệ sinh bụi lens, kiểm tra bóng đèn"),
        new("8", "MT-008", "Sửa router core nội bộ", "TS-2409", "Router Mikrotik", "Server A", "Sửa chữa", "Khẩn cấp", "Đang thực hiện", "Nguyễn Văn Hoàng", "02/08/2026 11:15", "-", "8.450.000", "Packet loss tăng, cần kiểm tra nguồn và firmware"),
        new("9", "MT-009", "Vệ sinh máy tính phòng máy", "TS-2411", "Lenovo ThinkCentre M70q", "A3.302", "Vệ sinh", "Trung bình", "Tạm hoãn", "Lê Minh Tâm", "05/08/2026 08:30", "-", "4.000.000", "Dời lịch do đang thi giữa kỳ"),
        new("10", "MT-010", "Kiểm tra máy in quyền truy cập", "TS-2412", "Dell Latitude 5440", "A1.205", "Kiểm tra", "Cao", "Chờ duyệt", "Trần Quốc Bảo", "06/08/2026 09:45", "-", "700.000", "Đánh giá khả năng thanh lý hoặc điều chuyển")
    };

    // ── Rooms ──────────────────────────────────────────────────

    public static RoomManagementResponse RoomManagement { get; } = new(
        new List<KpiDto>
        {
            new("Tổng số phòng", "38", "+3.2%", "primary"),
            new("Phòng đang sử dụng", "31", "+5.1%", "emerald"),
            new("Phòng cần kiểm kê", "6", "-1.8%", "amber"),
            new("Ticket đang mở", "14", "+2.4%", "zinc")
        },
        new List<PointDto>
        {
            new("Phòng máy", 12), new("Phòng học", 14), new("Văn phòng", 7), new("Phòng họp", 3), new("Server", 2)
        },
        new List<PointDto>
        {
            new("Đang sử dụng", 31), new("Bảo trì", 3), new("Tạm ngưng", 2), new("Dự phòng", 2)
        },
        new List<PointDto>
        {
            new("Tòa A", 18), new("Tòa B", 10), new("Tòa C", 6), new("Khác", 4)
        },
        Rooms,
        new List<string> { "Phòng máy", "Phòng học", "Văn phòng", "Phòng họp", "Server" },
        new List<string> { "Tòa A", "Tòa B", "Tòa C", "Khác" }
    );

    public static IReadOnlyList<RoomDto> Rooms { get; } = new List<RoomDto>
    {
        new("1", "A3.302", "Phòng máy A3.302", "A3", "3", "Phòng máy", "45", "Đang sử dụng", "Nguyễn Văn Hoàng", "Phòng máy thực hành CNTT, kiểm tra định kỳ hằng tháng."),
        new("2", "A2.101", "Giảng đường A2.101", "A2", "1", "Phòng học", "80", "Đang sử dụng", "Lê Minh Tâm", "Có máy chiếu, camera và hệ thống âm thanh."),
        new("3", "B1.201", "Văn phòng B1.201", "B1", "2", "Văn phòng", "20", "Đang sử dụng", "Phạm Anh Khoa", "Khu hành chính, nhiều thiết bị in ấn và máy trạm."),
        new("4", "Server A", "Phòng Server A", "A1", "1", "Server", "6", "Đang sử dụng", "Trần Quốc Bảo", "Theo dõi nhiệt độ, UPS, switch core và lịch bảo trì ngoài giờ."),
        new("5", "Server B", "Phòng Server B", "A1", "1", "Server", "4", "Bảo trì", "Trần Quốc Bảo", "Đang kiểm tra UPS và nguồn dự phòng."),
        new("6", "D1.109", "Phòng họp D1.109", "D1", "1", "Phòng họp", "35", "Đang sử dụng", "Nguyễn Thị Lan", "Có màn hình trình chiếu, camera họp trực tuyến và âm thanh."),
        new("7", "C1.103", "Phòng học C1.103", "C1", "1", "Phòng học", "60", "Dự phòng", "Lê Minh Tâm", "Phòng dự phòng cho lịch học tăng cường."),
        new("8", "A1.205", "Văn phòng A1.205", "A1", "2", "Văn phòng", "18", "Tạm ngưng", "Phạm Anh Khoa", "Tạm ngưng để sửa chữa điện nhẹ và kiểm tra mạng nội bộ.")
    };

    // ── Cameras ────────────────────────────────────────────────

    public static CameraManagementResponse CameraManagement { get; } = new(
        new List<KpiDto>
        {
            new("Tổng camera", "42", "+5.3%", "primary"),
            new("Đang hoạt động", "38", "+4.1%", "emerald"),
            new("Cần kiểm tra", "4", "+1.2%", "amber"),
            new("Hết bảo hành", "7", "-0.8%", "zinc")
        },
        new List<PointDto>
        {
            new("Hoạt động", 38), new("Lỗi", 2), new("Mất tín hiệu", 2)
        },
        new List<PointDto>
        {
            new("A2.101", 6), new("A3.302", 5), new("Server A", 4), new("B1.201", 4), new("D1.109", 3), new("Sân trường", 8)
        },
        Cameras,
        new List<string> { "Hoạt động", "Lỗi", "Mất tín hiệu" }
    );

    public static IReadOnlyList<CameraDto> Cameras { get; } = new List<CameraDto>
    {
        new("1", "CAM-001", "Camera hành lang A2.101", "A2.101", "192.168.10.21", "Hikvision", "DS-2CD2143G2-I", "4MP", "Hoạt động", "14/03/2024", "14/03/2027", "Góc rộng, hướng cửa ra vào"),
        new("2", "CAM-002", "Camera phòng máy A3.302", "A3.302", "192.168.10.22", "Hikvision", "DS-2CD2143G2-I", "4MP", "Hoạt động", "14/03/2024", "14/03/2027", "Góc trên, bao phủ toàn phòng"),
        new("3", "CAM-003", "Camera Server A", "Server A", "192.168.10.30", "Dahua", "IPC-HDW2831T-AS", "8MP", "Hoạt động", "01/02/2023", "01/02/2026", "Camera phòng server, hỗ trợ hồng ngoại"),
        new("4", "CAM-004", "Camera sân trường B1", "Sân trường", "192.168.10.41", "Axis", "P3245-V", "2MP", "Mất tín hiệu", "10/06/2022", "10/06/2025", "Cần kiểm tra cáp và nguồn điện"),
        new("5", "CAM-005", "Camera cổng chính", "Cổng trường", "192.168.10.50", "Hikvision", "DS-2CD2T47G2-L", "4MP", "Hoạt động", "05/09/2023", "05/09/2026", "Camera màu ban đêm, tích hợp mic"),
        new("6", "CAM-006", "Camera phòng họp D1.109", "D1.109", "192.168.10.61", "Dahua", "IPC-HDW1439S1-LED", "4MP", "Hoạt động", "02/10/2023", "02/10/2026", "Góc rộng phục vụ họp online"),
        new("7", "CAM-007", "Camera hành lang B tầng 2", "B1.201", "192.168.10.72", "Hikvision", "DS-2CD2123G2-I", "2MP", "Lỗi", "08/01/2023", "08/01/2026", "Lỗi firmware, cần cập nhật"),
        new("8", "CAM-008", "Camera bãi xe", "Bãi xe A", "192.168.10.80", "Axis", "P3245-VE", "2MP", "Hoạt động", "20/07/2024", "20/07/2027", "Camera ngoài trời, chống nước IP67")
    };

    // ── Network Devices ────────────────────────────────────────

    public static NetworkManagementResponse NetworkManagement { get; } = new(
        new List<KpiDto>
        {
            new("Tổng thiết bị mạng", "34", "+8.1%", "primary"),
            new("Đang hoạt động", "29", "+6.4%", "emerald"),
            new("Cần xử lý", "5", "+1.3%", "amber"),
            new("Hết bảo hành", "9", "+2.2%", "zinc")
        },
        new List<PointDto>
        {
            new("Switch", 12), new("Access Point", 14), new("Router", 4), new("Firewall", 2), new("Controller", 2)
        },
        new List<PointDto>
        {
            new("Hoạt động", 29), new("Cảnh báo", 3), new("Lỗi", 2)
        },
        NetworkDevices,
        new List<string> { "Switch", "Access Point", "Router", "Firewall", "Controller" },
        new List<string> { "Hoạt động", "Cảnh báo", "Lỗi" }
    );

    public static IReadOnlyList<NetworkDeviceDto> NetworkDevices { get; } = new List<NetworkDeviceDto>
    {
        new("1", "NET-001", "Cisco Core Switch", "Switch", "Cisco", "Catalyst 9300-24P", "Server A", "10.0.0.1", "AA:BB:CC:DD:EE:01", "VLAN 10,20,30", "24", "Hoạt động", "18/09/2026", "04/01/2024", "Switch core, uplink 10G tới router biên"),
        new("2", "NET-002", "AP Aruba A1.205", "Access Point", "Aruba", "AP-515", "A1.205", "192.168.20.10", "AA:BB:CC:DD:EE:02", "VLAN 100", "1", "Hoạt động", "20/11/2026", "11/11/2023", "Vùng phủ sóng hành lang A1"),
        new("3", "NET-003", "AP Aruba A3.302", "Access Point", "Aruba", "AP-515", "A3.302", "192.168.20.11", "AA:BB:CC:DD:EE:03", "VLAN 100", "1", "Hoạt động", "20/11/2026", "11/11/2023", "Phủ sóng phòng máy thực hành"),
        new("4", "NET-004", "Router Mikrotik Edge", "Router", "Mikrotik", "RB4011iGS+", "Server A", "10.0.0.254", "AA:BB:CC:DD:EE:04", "VLAN 1", "10", "Hoạt động", "01/01/2027", "18/01/2024", "Router biên, kết nối Internet và VPN"),
        new("5", "NET-005", "Firewall Fortigate", "Firewall", "Fortinet", "FortiGate 80F", "Server B", "10.0.0.2", "AA:BB:CC:DD:EE:05", "VLAN 1", "4", "Hoạt động", "15/06/2027", "15/06/2024", "Lọc traffic, IPS và content filter"),
        new("6", "NET-006", "Switch phân phối B1", "Switch", "Cisco", "Catalyst 2960X-24PS", "B1.201", "10.0.1.1", "AA:BB:CC:DD:EE:06", "VLAN 20", "24", "Cảnh báo", "10/08/2026", "10/08/2023", "Cổng uplink báo lỗi CRC, cần kiểm tra"),
        new("7", "NET-007", "AP khu sân trường", "Access Point", "Ubiquiti", "UniFi U6 Pro", "Sân trường", "192.168.20.50", "AA:BB:CC:DD:EE:07", "VLAN 100", "1", "Hoạt động", "22/03/2027", "22/03/2024", "AP ngoài trời, chống nước IP67"),
        new("8", "NET-008", "Aruba Controller", "Controller", "Aruba", "Mobility Conductor", "Server A", "10.0.0.10", "AA:BB:CC:DD:EE:08", "VLAN 1", "1", "Hoạt động", "30/04/2027", "30/04/2024", "Quản lý tập trung toàn bộ AP Aruba")
    };

    // ── Inventory Sessions ─────────────────────────────────────

    public static InventoryManagementResponse InventoryManagement { get; } = new(
        new List<KpiDto>
        {
            new("Đợt kiểm kê", "18", "+2.1%", "primary"),
            new("Hoàn thành", "12", "+3.4%", "emerald"),
            new("Có lệch", "4", "-1.1%", "amber"),
            new("Đang kiểm", "2", "0%", "zinc")
        },
        new List<PointDto>
        {
            new("Hoàn thành", 12), new("Có lệch", 4), new("Đang kiểm", 2)
        },
        InventorySessions,
        new List<string> { "Đang kiểm", "Hoàn thành", "Có lệch" }
    );

    public static IReadOnlyList<InventorySessionDto> InventorySessions { get; } = new List<InventorySessionDto>
    {
        new("1", "INV-001", "A3.302", "Nguyễn Văn Hoàng", "Hoàn thành", "42", "42", "0", "0", "01/07/2026 08:00", "01/07/2026 11:30", "Tất cả thiết bị khớp, không có lệch"),
        new("2", "INV-002", "B1.201", "Lê Minh Tâm", "Có lệch", "16", "16", "1", "0", "05/07/2026 09:00", "05/07/2026 10:45", "Thiếu 1 máy in HP LaserJet, đang xác minh"),
        new("3", "INV-003", "Server A", "Trần Quốc Bảo", "Hoàn thành", "14", "14", "0", "0", "10/07/2026 14:00", "10/07/2026 15:20", "Tất cả thiết bị server và mạng đầy đủ"),
        new("4", "INV-004", "D1.109", "Phạm Anh Khoa", "Hoàn thành", "9", "9", "0", "0", "12/07/2026 08:30", "12/07/2026 09:15", "Thiết bị phòng họp kiểm kê đủ"),
        new("5", "INV-005", "A2.101", "Nguyễn Văn Hoàng", "Đang kiểm", "18", "12", "0", "0", "18/07/2026 08:00", "-", "Đang tiến hành, dự kiến hoàn thành chiều nay"),
        new("6", "INV-006", "A1.205", "Lê Minh Tâm", "Có lệch", "8", "8", "0", "2", "15/07/2026 10:00", "15/07/2026 11:30", "Phát hiện 2 thiết bị không trong danh mục, cần xử lý"),
        new("7", "INV-007", "C1.103", "Phạm Anh Khoa", "Hoàn thành", "7", "7", "0", "0", "08/07/2026 13:00", "08/07/2026 14:10", "Phòng dự phòng, ít thiết bị, kiểm tra nhanh"),
        new("8", "INV-008", "Server B", "Trần Quốc Bảo", "Đang kiểm", "11", "7", "0", "0", "19/07/2026 09:00", "-", "Đang kiểm tra thiết bị UPS và nguồn dự phòng")
    };

    // ── Transfers ──────────────────────────────────────────────

    public static TransferManagementResponse TransferManagement { get; } = new(
        new List<KpiDto>
        {
            new("Tổng điều chuyển", "24", "+6.7%", "primary"),
            new("Chờ duyệt", "5", "+1.4%", "amber"),
            new("Hoàn thành", "16", "+5.2%", "emerald"),
            new("Từ chối", "3", "-0.9%", "zinc")
        },
        new List<PointDto>
        {
            new("Chờ duyệt", 5), new("Đã duyệt", 3), new("Hoàn thành", 16)
        },
        Transfers,
        new List<string> { "Chờ duyệt", "Đã duyệt", "Hoàn thành", "Từ chối" }
    );

    public static IReadOnlyList<TransferDto> Transfers { get; } = new List<TransferDto>
    {
        new("1", "TRF-001", "TS-2404", "MacBook Air M2", "VP Khoa", "A3.302", "Lê Minh C", "Nguyễn Văn Hoàng", "Hoàn thành", "10/07/2026", "09/07/2026", "Điều chuyển phục vụ phòng máy thực hành"),
        new("2", "TRF-002", "TS-2407", "Sony VPL-DX221", "C1.103", "D1.109", "Khoa CNTT", "Trần Quốc Bảo", "Chờ duyệt", "-", "-", "Mượn tạm cho hội nghị tháng 8"),
        new("3", "TRF-003", "TS-2410", "TV Samsung 55\"", "D1.109", "B1.201", "Phòng họp", "Phạm Anh Khoa", "Đã duyệt", "-", "15/07/2026", "Chuyển sang khu hội trường"),
        new("4", "TRF-004", "TS-2401", "Dell OptiPlex 3080", "A3.302", "A2.101", "Nguyễn Văn Hoàng", "Lê Minh Tâm", "Hoàn thành", "05/07/2026", "04/07/2026", "Bổ sung máy cho phòng học số"),
        new("5", "TRF-005", "TS-2408", "UPS Santak", "Server B", "Server A", "KTV", "Trần Quốc Bảo", "Chờ duyệt", "-", "-", "Dồn UPS về Server A để nâng cấp hạ tầng"),
        new("6", "TRF-006", "TS-2406", "AP Aruba AP-515", "A1.205", "C1.103", "Phòng hạ tầng", "Nguyễn Văn Hoàng", "Hoàn thành", "18/06/2026", "17/06/2026", "Tăng vùng phủ sóng khu giảng đường C1"),
        new("7", "TRF-007", "TS-2411", "Lenovo ThinkCentre M70q", "A3.302", "VP Khoa", "KTV nội bộ", "Phạm Anh Khoa", "Từ chối", "-", "-", "Không đủ lý do điều chuyển, cần bổ sung hồ sơ"),
        new("8", "TRF-008", "TS-2403", "Cisco 24 Port", "Server A", "Server B", "Hạ tầng", "Trần Quốc Bảo", "Chờ duyệt", "-", "-", "Cân bằng tải mạng giữa hai phòng server")
    };

    // ── Liquidations ───────────────────────────────────────────

    public static LiquidationManagementResponse LiquidationManagement { get; } = new(
        new List<KpiDto>
        {
            new("Yêu cầu thanh lý", "11", "+3.1%", "primary"),
            new("Chờ duyệt", "4", "+0.8%", "amber"),
            new("Hoàn thành", "6", "+2.4%", "emerald"),
            new("Giá trị còn lại", "18.4M", "-1.2%", "zinc")
        },
        new List<PointDto>
        {
            new("Chờ duyệt", 4), new("Đã duyệt", 1), new("Hoàn thành", 6)
        },
        new List<PointDto>
        {
            new("Hỏng hoàn toàn", 5), new("Lạc hậu", 4), new("Mất mát", 2)
        },
        Liquidations,
        new List<string> { "Chờ duyệt", "Đã duyệt", "Hoàn thành" }
    );

    public static IReadOnlyList<LiquidationDto> Liquidations { get; } = new List<LiquidationDto>
    {
        new("1", "LIQ-001", "TS-2412", "Dell Latitude 5440", "VP Khoa", "Hỏng hoàn toàn, không sửa được", "Hỏng hoàn toàn", "Chờ duyệt", "Nguyễn Văn A", "BGH", "0", "10/07/2026", "-", "Máy cũ từ 2022, đã qua 3 lần sửa chữa"),
        new("2", "LIQ-002", "TS-2402", "HP LaserJet 1020", "B1.201", "Linh kiện không còn sản xuất", "Hỏng hoàn toàn", "Hoàn thành", "Phòng HC", "BGH", "500000", "01/06/2026", "20/06/2026", "Thanh lý phế liệu"),
        new("3", "LIQ-003", "TS-2408", "UPS Santak 2200VA", "Server B", "Công nghệ lạc hậu, thay thế UPS mới", "Lạc hậu", "Chờ duyệt", "Trần Quốc Bảo", "BGH", "2000000", "15/07/2026", "-", "Dự kiến thanh lý và mua thay thế APC 3000VA"),
        new("4", "LIQ-004", "TS-2403", "Cisco Switch 24P cũ", "Server A", "Thay thế thiết bị mới hơn", "Lạc hậu", "Đã duyệt", "Hạ tầng", "BGH", "3500000", "08/07/2026", "-", "Chờ hoàn thành thanh lý trước khi lắp switch mới"),
        new("5", "LIQ-005", "TS-2409", "Máy quét mã QR cũ", "A2.104", "Thiết bị không còn sử dụng", "Lạc hậu", "Hoàn thành", "Lê Minh Tâm", "Phạm Anh Khoa", "200000", "15/05/2026", "01/06/2026", "Đã thanh lý theo quy trình"),
        new("6", "LIQ-006", "TS-2411-B", "Bàn phím cũ Logitech", "A3.302", "Hư hỏng, không sử dụng được", "Hỏng hoàn toàn", "Hoàn thành", "Nguyễn Văn Hoàng", "Phạm Anh Khoa", "0", "20/05/2026", "05/06/2026", "Thanh lý phụ kiện nhỏ"),
        new("7", "LIQ-007", "TS-2413", "Projector cũ Epson", "C1.103", "Đèn projector hết tuổi thọ", "Hỏng hoàn toàn", "Chờ duyệt", "Lê Minh Tâm", "BGH", "1500000", "17/07/2026", "-", "Bóng đèn không còn sản xuất, không thể thay thế"),
        new("8", "LIQ-008", "TS-2414", "Router Dlink cũ", "Server B", "Thay thế bằng Mikrotik mới", "Lạc hậu", "Chờ duyệt", "KTV", "BGH", "300000", "18/07/2026", "-", "Router cũ dự phòng, không còn cần thiết")
    };

    // ── Software ───────────────────────────────────────────────

    public static SoftwareManagementResponse SoftwareManagement { get; } = new(
        new List<KpiDto>
        {
            new("Tổng phần mềm", "28", "+4.5%", "primary"),
            new("Đang sử dụng", "21", "+3.2%", "emerald"),
            new("Sắp hết hạn", "5", "+1.1%", "amber"),
            new("Đã hết hạn", "2", "-0.6%", "zinc")
        },
        new List<PointDto>
        {
            new("Hệ điều hành", 6), new("Văn phòng", 8), new("Bảo mật", 5), new("Thiết kế", 4), new("Lập trình", 5)
        },
        new List<PointDto>
        {
            new("Bản quyền", 18), new("Mã nguồn mở", 8), new("Trial", 2)
        },
        SoftwareItems,
        new List<string> { "Hệ điều hành", "Văn phòng", "Bảo mật", "Thiết kế", "Lập trình" },
        new List<string> { "Đang dùng", "Sắp hết hạn", "Hết hạn" }
    );

    public static IReadOnlyList<SoftwareDto> SoftwareItems { get; } = new List<SoftwareDto>
    {
        new("1", "Windows 11 Pro", "Microsoft", "23H2", "Hệ điều hành", "Bản quyền", "XXXXX-XXXXX-XXXXX", "50", "48", "31/12/2026", "A3.302", "Đang dùng", "Bản quyền volume cho phòng máy"),
        new("2", "Microsoft Office 365", "Microsoft", "2024", "Văn phòng", "Bản quyền", "O365-EDU-XXXXX", "200", "187", "30/06/2027", "Toàn trường", "Đang dùng", "Gói EDU cho giảng viên và sinh viên"),
        new("3", "Kaspersky Endpoint", "Kaspersky", "21.3", "Bảo mật", "Bản quyền", "KES-XXXXX-XXXXX", "100", "95", "31/08/2026", "Toàn trường", "Sắp hết hạn", "Hết hạn tháng 8, cần gia hạn"),
        new("4", "AutoCAD 2024", "Autodesk", "2024.1", "Thiết kế", "Bản quyền", "ACAD-XXXXX", "10", "8", "31/03/2026", "B1.201", "Hết hạn", "Bản quyền đã hết, cần mua mới"),
        new("5", "Visual Studio Code", "Microsoft", "1.90", "Lập trình", "Mã nguồn mở", "N/A", "0", "0", "-", "A3.302", "Đang dùng", "Phần mềm miễn phí, không cần bản quyền"),
        new("6", "Ubuntu Server 22.04 LTS", "Canonical", "22.04", "Hệ điều hành", "Mã nguồn mở", "N/A", "0", "0", "04/2027", "Server A", "Đang dùng", "OS cho các máy chủ nội bộ"),
        new("7", "MATLAB R2024a", "MathWorks", "R2024a", "Lập trình", "Bản quyền", "MLR24-XXXXX", "30", "28", "31/07/2026", "A3.302", "Sắp hết hạn", "License trường, hết hạn tháng 7"),
        new("8", "Adobe Acrobat Pro", "Adobe", "2024", "Văn phòng", "Bản quyền", "ACR-XXXXX", "20", "14", "31/10/2026", "B1.201", "Đang dùng", "Dùng cho phòng hành chính và in ấn")
    };

    // ── Users ──────────────────────────────────────────────────

    public static UserManagementResponse UserManagement { get; } = new(
        new List<KpiDto>
        {
            new("Tổng người dùng", "52", "+4.2%", "primary"),
            new("Đang hoạt động", "48", "+3.8%", "emerald"),
            new("Nghỉ phép", "3", "+0.5%", "amber"),
            new("Đã nghỉ việc", "1", "0%", "zinc")
        },
        new List<PointDto>
        {
            new("Quản trị viên", 4), new("Kỹ thuật viên", 8), new("Nhân viên", 40)
        },
        new List<PointDto>
        {
            new("Khoa CNTT", 12), new("Hành chính", 8), new("Hạ tầng", 6), new("Thư viện", 5), new("Kế toán", 4), new("Khác", 17)
        },
        AppUsers,
        new List<string> { "Quản trị viên", "Kỹ thuật viên", "Nhân viên" },
        new List<string> { "Khoa CNTT", "Hành chính", "Hạ tầng", "Thư viện", "Kế toán" }
    );

    public static IReadOnlyList<AppUserDto> AppUsers { get; } = new List<AppUserDto>
    {
        new("1", "Nguyễn Văn Hoàng", "hoang.nv@tdmu.edu.vn", "0901234567", "Hạ tầng CNTT", "Server A", "Kỹ thuật viên", "Đang hoạt động", "01/01/2023", "19/07/2026 08:30"),
        new("2", "Trần Quốc Bảo", "bao.tq@tdmu.edu.vn", "0912345678", "Hạ tầng CNTT", "Server B", "Kỹ thuật viên", "Đang hoạt động", "15/03/2022", "19/07/2026 09:10"),
        new("3", "Lê Minh Tâm", "tam.lm@tdmu.edu.vn", "0923456789", "Hạ tầng CNTT", "A3.302", "Kỹ thuật viên", "Đang hoạt động", "20/06/2021", "18/07/2026 17:45"),
        new("4", "Phạm Anh Khoa", "khoa.pa@tdmu.edu.vn", "0934567890", "Hạ tầng CNTT", "B1.201", "Kỹ thuật viên", "Đang hoạt động", "10/08/2020", "19/07/2026 07:55"),
        new("5", "Nguyễn Thị Lan", "lan.nt@tdmu.edu.vn", "0945678901", "Hành chính", "D1.109", "Nhân viên", "Đang hoạt động", "05/02/2019", "17/07/2026 16:30"),
        new("6", "Lê Minh C", "c.lm@tdmu.edu.vn", "0956789012", "Khoa CNTT", "VP Khoa", "Nhân viên", "Đang hoạt động", "12/09/2018", "19/07/2026 10:20"),
        new("7", "Nguyễn Văn A", "a.nv@tdmu.edu.vn", "0967890123", "Khoa CNTT", "VP Khoa", "Nhân viên", "Nghỉ phép", "03/07/2017", "10/07/2026 08:00"),
        new("8", "Trần Thị B", "b.tt@tdmu.edu.vn", "0978901234", "Hành chính", "A1.205", "Quản trị viên", "Đang hoạt động", "01/01/2016", "19/07/2026 08:45")
    };

    // ── Reports ────────────────────────────────────────────────

    public static ReportSummaryResponse ReportSummary { get; } = new(
        new List<KpiDto>
        {
            new("Tổng thiết bị", "2,450", "+12.4%", "primary"),
            new("Ticket tháng này", "61", "+9.1%", "amber"),
            new("Chi phí bảo trì", "61.6M", "+4.7%", "zinc"),
            new("Tỉ lệ hoàn thành SLA", "93%", "+2.1%", "emerald")
        },
        new List<PointDto>
        {
            new("PC", 980), new("Laptop", 210), new("Printer", 144), new("Network", 276), new("Camera", 98), new("Khác", 742)
        },
        new List<PointDto>
        {
            new("Hoạt động", 1862), new("Đang sửa", 48), new("Bảo trì", 17), new("Hỏng", 39), new("Chờ thanh lý", 14)
        },
        new List<PointDto>
        {
            new("T1", 38), new("T2", 42), new("T3", 35), new("T4", 49), new("T5", 54), new("T6", 61)
        },
        new List<PointDto>
        {
            new("T1", 8), new("T2", 7), new("T3", 9), new("T4", 13), new("T5", 10), new("T6", 14)
        },
        new List<PointDto>
        {
            new("Khẩn cấp", 12), new("Cao", 27), new("Trung bình", 44), new("Thấp", 18)
        },
        new List<PointDto>
        {
            new("A3.302", 18), new("A2.101", 13), new("B1.201", 11), new("C1.103", 9), new("Server A", 7), new("Server B", 6)
        }
    );
}
