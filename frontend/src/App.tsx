import { TooltipProvider } from '@radix-ui/react-tooltip'
import { Toaster } from 'sonner'
import { AuthProvider } from './contexts/AuthContext'
import { AppRouter } from './routes/AppRouter'

export default function App() {
  return (
    <TooltipProvider>
      <AuthProvider>
        <AppRouter />
        <Toaster position="bottom-right" theme="dark" richColors />
      </AuthProvider>
    </TooltipProvider>
  )
}
