import { TooltipProvider } from '@radix-ui/react-tooltip'
import { AppRouter } from './routes/AppRouter'

export default function App() {
  return (
    <TooltipProvider>
      <AppRouter />
    </TooltipProvider>
  )
}

