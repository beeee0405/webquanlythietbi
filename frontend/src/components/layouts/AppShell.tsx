import { Outlet } from 'react-router-dom'
import { Sidebar } from './Sidebar'
import { Navbar } from './Navbar'
import { Footer } from './Footer'

export function AppShell() {
  return (
    <div className="min-h-screen lg:pl-[286px]">
      <Sidebar />
      <main className="px-4 pb-6 pt-4 sm:px-6 lg:px-8">
        <Navbar />
        <Outlet />
        <Footer />
      </main>
    </div>
  )
}

