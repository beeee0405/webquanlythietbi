import { createContext, useContext, useState, useEffect } from 'react'
import type { UserInfoDto } from '../types/auth'

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
      const response = await fetch('http://localhost:5016/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password })
      })

      if (!response.ok) return false

      const data = await response.json()
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
      const response = await fetch('http://localhost:5016/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, email, password, fullName, phone, department, room })
      })

      if (!response.ok) return false

      const data = await response.json()
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
