import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'
import { Button } from '../components/ui/button'
import { Input } from '../components/ui/input'
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card'
import { toast } from 'sonner'

export function RegisterPage() {
  const [fullName, setFullName] = useState('')
  const [email, setEmail] = useState('')
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const { user } = useAuth()
  const navigate = useNavigate()

  // Redirect nếu đã login
  useEffect(() => {
    if (user) {
      navigate('/', { replace: true })
    }
  }, [user, navigate])

  const validateForm = () => {
    if (!fullName.trim()) {
      setError('Vui lòng nhập họ tên')
      return false
    }
    if (!email.trim()) {
      setError('Vui lòng nhập email')
      return false
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError('Email không hợp lệ')
      return false
    }
    if (!username.trim()) {
      setError('Vui lòng nhập username')
      return false
    }
    if (username.length < 3) {
      setError('Username tối thiểu 3 ký tự')
      return false
    }
    if (!password) {
      setError('Vui lòng nhập password')
      return false
    }
    if (password.length < 6) {
      setError('Password tối thiểu 6 ký tự')
      return false
    }
    if (password !== confirmPassword) {
      setError('Password không khớp')
      return false
    }
    return true
  }

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')

    if (!validateForm()) {
      return
    }

    setLoading(true)

    try {
      const response = await fetch('https://webquanlythietbi.onrender.com/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          fullName,
          email,
          username,
          password,
          phone: '',
          department: 'IT',
          room: '',
          role: 'Nhân viên',
          status: 'Đang hoạt động'
        })
      })

      if (!response.ok) {
        const data = await response.json()
        throw new Error(data.message || 'Đăng ký thất bại')
      }

      toast.success('Đăng ký thành công! Vui lòng đăng nhập.')
      navigate('/login', { replace: true })
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Đăng ký thất bại')
      toast.error(err instanceof Error ? err.message : 'Đăng ký thất bại')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 to-slate-800 p-4">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-center text-2xl">Đăng ký Tài khoản</CardTitle>
          <p className="text-center text-sm text-slate-400 mt-2">Quản lý Thiết bị CNTT</p>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleRegister} className="space-y-3">
            <div>
              <label className="text-sm font-medium text-slate-300">Họ tên</label>
              <Input
                type="text"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                placeholder="Nguyễn Văn A"
                className="mt-1"
              />
            </div>
            <div>
              <label className="text-sm font-medium text-slate-300">Email</label>
              <Input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="email@example.com"
                className="mt-1"
              />
            </div>
            <div>
              <label className="text-sm font-medium text-slate-300">Username</label>
              <Input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="username"
                className="mt-1"
              />
            </div>
            <div>
              <label className="text-sm font-medium text-slate-300">Password</label>
              <Input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Nhập password"
                className="mt-1"
              />
            </div>
            <div>
              <label className="text-sm font-medium text-slate-300">Xác nhận Password</label>
              <Input
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Nhập lại password"
                className="mt-1"
              />
            </div>
            {error && <div className="text-red-500 text-sm">{error}</div>}
            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? 'Đang đăng ký...' : 'Đăng ký'}
            </Button>
            <div className="text-center text-sm text-slate-400">
              Đã có tài khoản?{' '}
              <button
                type="button"
                onClick={() => navigate('/login')}
                className="text-blue-400 hover:text-blue-300 font-medium"
              >
                Đăng nhập
              </button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
