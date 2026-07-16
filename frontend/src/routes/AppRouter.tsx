import { Navigate, Route, Routes } from 'react-router-dom'
import { AppShell } from '../components/layouts/AppShell'
import { DashboardPage } from '../pages/DashboardPage'
import { DeviceManagementPage } from '../pages/DeviceManagementPage'
import { TicketManagementPage } from '../pages/TicketManagementPage'
import { MaintenancePage } from '../pages/MaintenancePage'
import { ModulePage } from '../pages/ModulePage'

export function AppRouter() {
  return (
    <Routes>
      <Route element={<AppShell />}>
        <Route index element={<DashboardPage />} />
        <Route path="devices" element={<DeviceManagementPage />} />
        <Route path="rooms" element={<ModulePage />} />
        <Route path="cameras" element={<ModulePage />} />
        <Route path="network" element={<ModulePage />} />
        <Route path="tickets" element={<TicketManagementPage />} />
        <Route path="maintenance" element={<MaintenancePage />} />
        <Route path="inventory" element={<ModulePage />} />
        <Route path="transfer" element={<ModulePage />} />
        <Route path="liquidation" element={<ModulePage />} />
        <Route path="software" element={<ModulePage />} />
        <Route path="users" element={<ModulePage />} />
        <Route path="reports" element={<ModulePage />} />
        <Route path="settings" element={<ModulePage />} />
      </Route>
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  )
}
