$adminLogin = Invoke-RestMethod -Method Post -Uri "https://webquanlythietbi.onrender.com/api/Auth/login" -ContentType "application/json" -Body '{"username":"admin","password":"Admin@123"}'
$token = $adminLogin.accessToken

$newUser = @{
    fullName = "Test User"
    email = "test@example.com"
    username = "testuser"
    password = "password123"
    department = "IT"
    role = "Nhân viên"
    status = "Đang hoạt động"
} | ConvertTo-Json

Invoke-RestMethod -Method Post -Uri "https://webquanlythietbi.onrender.com/api/Users" -Headers @{ Authorization = "Bearer $token" } -ContentType "application/json" -Body $newUser

$testLogin = Invoke-RestMethod -Method Post -Uri "https://webquanlythietbi.onrender.com/api/Auth/login" -ContentType "application/json" -Body '{"username":"testuser","password":"password123"}'

$testLogin | ConvertTo-Json
