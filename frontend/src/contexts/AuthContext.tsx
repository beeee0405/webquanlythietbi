import { createContext, useContext, useState, useEffect } from 'react'
import type { UserInfoDto } from '../types/auth'
import { http } from '../services/http'

interface AuthContextType {
  user: UserInfoDto | null
  accessToken: string | null
  isAuthenticated: boolean
  login: (username: string, password: string) => Promise<boolean>
  register: (username: string, email: string, password: string, fullName: string, phone: string, department: string, room: string) => Promise<boolean>
  logout: () => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<UserInfoDto | null>(null)
  const [accessToken, setAccessToken] = useState<string | null>(null)

  // Load từ localStorage khi mount
  useEffect(() => {
    const stored = localStorage.getItem('auth_user')
    const token = localStorage.getItem('auth_token')
    if (stored && token) {
      setUser(JSON.parse(stored))
      setAccessToken(token)
    }
  }, [])

  const login = async (username: string, password: string): Promise<boolean> => {
    try {
      const response = await http.post('/auth/login', { username, password })
      const data = response.data
      setUser(data.user)
      setAccessToken(data.accessToken)
      localStorage.setItem('auth_user', JSON.stringify(data.user))
      localStorage.setItem('auth_token', data.accessToken)
      localStorage.setItem('refresh_token', data.refreshToken)
      return true
    } catch (error) {
      console.error('Login error:', error)
      return false
    }
  }

  const register = async (
    username: string,
    email: string,
    password: string,
    fullName: string,
    phone: string,
    department: string,
    room: string
  ): Promise<boolean> => {
    try {
      const response = await http.post('/auth/register', {
        username,
        email,
        password,
        fullName,
        phone,
        department,
        room
      })
      const data = response.data
      setUser(data.user)
      setAccessToken(data.accessToken)
      localStorage.setItem('auth_user', JSON.stringify(data.user))
      localStorage.setItem('auth_token', data.accessToken)
      localStorage.setItem('refresh_token', data.refreshToken)
      return true
    } catch (error) {
      console.error('Register error:', error)
      return false
    }
  }

  const logout = () => {
    setUser(null)
    setAccessToken(null)
    localStorage.removeItem('auth_user')
    localStorage.removeItem('auth_token')
    localStorage.removeItem('refresh_token')
    // BUG-13: Redirect to login after logout
    window.location.href = '/login'
  }

  return (
    <AuthContext.Provider value={{ user, accessToken, isAuthenticated: !!accessToken, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider')
  }
  return context
}
