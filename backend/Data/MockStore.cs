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
}
