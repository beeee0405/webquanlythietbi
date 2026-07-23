import { Navigate, Route, Routes } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'
import { AppShell } from '../components/layouts/AppShell'
import { ProtectedRoute } from '../components/ProtectedRoute'
import { LoginPage } from '../pages/LoginPage'
import { DashboardPage } from '../pages/DashboardPage'
import { UserPortalDashboard } from '../pages/UserPortalDashboard'
import { DeviceManagementPage } from '../pages/DeviceManagementPage'
import { TicketManagementPage } from '../pages/TicketManagementPage'
import { MaintenancePage } from '../pages/MaintenancePage'
import { RoomManagementPage } from '../pages/RoomManagementPage'
import { CameraManagementPage } from '../pages/CameraManagementPage'
import { NetworkManagementPage } from '../pages/NetworkManagementPage'
import { InventoryManagementPage } from '../pages/InventoryManagementPage'
import { TransferManagementPage } from '../pages/TransferManagementPage'
import { LiquidationManagementPage } from '../pages/LiquidationManagementPage'
import { SoftwareManagementPage } from '../pages/SoftwareManagementPage'
import { UserManagementPage } from '../pages/UserManagementPage'
import { ReportsPage } from '../pages/ReportsPage'
import { SettingsPage } from '../pages/SettingsPage'

// Role-based routing component
function AdminRoutes() {
  return (
    <Routes>
      <Route element={<ProtectedRoute><AppShell /></ProtectedRoute>}>
        <Route index element={<DashboardPage />} />
        <Route path="devices" element={<DeviceManagementPage />} />
        <Route path="rooms" element={<RoomManagementPage />} />
        <Route path="cameras" element={<CameraManagementPage />} />
        <Route path="network" element={<NetworkManagementPage />} />
        <Route path="tickets" element={<TicketManagementPage />} />
        <Route path="maintenance" element={<MaintenancePage />} />
        <Route path="inventory" element={<InventoryManagementPage />} />
        <Route path="transfer" element={<TransferManagementPage />} />
        <Route path="liquidation" element={<LiquidationManagementPage />} />
        <Route path="software" element={<SoftwareManagementPage />} />
        <Route path="users" element={<UserManagementPage />} />
        <Route path="reports" element={<ReportsPage />} />
        <Route path="settings" element={<SettingsPage />} />
      </Route>
    </Routes>
  )
}

// Infrastructure specialist routes
function InfrastructureRoutes() {
  return (
    <Routes>
      <Route element={<ProtectedRoute><AppShell /></ProtectedRoute>}>
        <Route index element={<DashboardPage />} />
        <Route path="devices" element={<DeviceManagementPage />} />
        <Route path="rooms" element={<RoomManagementPage />} />
        <Route path="cameras" element={<CameraManagementPage />} />
        <Route path="network" element={<NetworkManagementPage />} />
        <Route path="tickets" element={<TicketManagementPage />} />
        <Route path="maintenance" element={<MaintenancePage />} />
        <Route path="inventory" element={<InventoryManagementPage />} />
        <Route path="transfer" element={<TransferManagementPage />} />
        <Route path="liquidation" element={<LiquidationManagementPage />} />
        <Route path="software" element={<SoftwareManagementPage />} />
        <Route path="reports" element={<ReportsPage />} />
        <Route path="settings" element={<SettingsPage />} />
      </Route>
    </Routes>
  )
}

// End user routes
function EndUserRoutes() {
  return (
    <Routes>
      <Route path="/" element={<ProtectedRoute><UserPortalDashboard /></ProtectedRoute>} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  )
}

export function AppRouter() {
  const { user } = useAuth()

  // Nếu đã đăng nhập và vào /login → redirect về trang chủ
  const LoginGuard = () => {
    if (user) return <Navigate to="/" replace />
    return <LoginPage />
  }

  return (
    <Routes>
      <Route path="/login" element={<LoginGuard />} />
      
      {/* Role-based routing */}
      {user?.role === 'Quản trị viên' ? (
        <>
          <Route path="/*" element={<AdminRoutes />} />
        </>
      ) : user?.role === 'Chuyên viên Phòng Hạ tầng' ? (
        <>
          <Route path="/*" element={<InfrastructureRoutes />} />
        </>
      ) : user ? (
        <>
          <Route path="/*" element={<EndUserRoutes />} />
        </>
      ) : (
        <Route path="/*" element={<Navigate to="/login" replace />} />
      )}
    </Routes>
  )
}
