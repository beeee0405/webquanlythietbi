import { useAuth } from '../contexts/AuthContext'
import type { UserRole } from '../types/auth'

interface RolePermissions {
  canAccessDashboard: boolean
  canAccessAdminModules: boolean  // Devices, Rooms, Cameras, Network, Software, Users, Maintenance
  canCreateInventory: boolean
  canCreateTransfer: boolean
  canCreateLiquidation: boolean
  canCreateTicket: boolean
  canEditTicket: boolean
  canDeleteTicket: boolean
  canAccessEndUserPortal: boolean
}

function getPermissions(role: UserRole): RolePermissions {
  switch (role) {
    case 'Quản trị viên':
      return {
        canAccessDashboard: true,
        canAccessAdminModules: true,
        canCreateInventory: true,
        canCreateTransfer: true,
        canCreateLiquidation: true,
        canCreateTicket: true,
        canEditTicket: true,
        canDeleteTicket: true,
        canAccessEndUserPortal: false,
      }
    case 'Chuyên viên Phòng Hạ tầng':
      return {
        canAccessDashboard: true,
        canAccessAdminModules: true,
        canCreateInventory: true,
        canCreateTransfer: true,
        canCreateLiquidation: true,
        canCreateTicket: true,
        canEditTicket: true,
        canDeleteTicket: false,
        canAccessEndUserPortal: false,
      }
    case 'Người dùng':
      return {
        canAccessDashboard: false,
        canAccessAdminModules: false,
        canCreateInventory: false,
        canCreateTransfer: false,
        canCreateLiquidation: false,
        canCreateTicket: true,
        canEditTicket: true,  // Can edit own tickets
        canDeleteTicket: false,
        canAccessEndUserPortal: true,
      }
    default:
      return {
        canAccessDashboard: false,
        canAccessAdminModules: false,
        canCreateInventory: false,
        canCreateTransfer: false,
        canCreateLiquidation: false,
        canCreateTicket: false,
        canEditTicket: false,
        canDeleteTicket: false,
        canAccessEndUserPortal: false,
      }
  }
}

export function usePermission() {
  const { user } = useAuth()
  
  if (!user) {
    return {
      role: null,
      permissions: getPermissions('Người dùng'),
      isAdmin: false,
      isInfrastructure: false,
      isEndUser: false,
      canCreate: () => false,
      canEdit: () => false,
      canDelete: () => false,
    }
  }

  const permissions = getPermissions(user.role)
  const isAdmin = user.role === 'Quản trị viên'
  const isInfrastructure = user.role === 'Chuyên viên Phòng Hạ tầng'
  const isEndUser = user.role === 'Người dùng'

  return {
    role: user.role,
    permissions,
    isAdmin,
    isInfrastructure,
    isEndUser,
    
    // Module access
    canAccessDashboard: () => permissions.canAccessDashboard,
    canAccessAdminModules: () => permissions.canAccessAdminModules,
    canAccessEndUserPortal: () => permissions.canAccessEndUserPortal,
    
    // CRUD operations
    canCreate: () => permissions.canCreateInventory || permissions.canCreateTransfer || permissions.canCreateLiquidation,
    canEdit: () => !isEndUser,
    canDelete: () => isAdmin,
    
    // Specific operations
    canCreateTicket: () => permissions.canCreateTicket,
    canEditTicket: () => permissions.canEditTicket,
    canDeleteTicket: () => permissions.canDeleteTicket,
    canCreateInventory: () => permissions.canCreateInventory,
    canCreateTransfer: () => permissions.canCreateTransfer,
    canCreateLiquidation: () => permissions.canCreateLiquidation,
  }
}
