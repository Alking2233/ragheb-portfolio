import { Outlet } from 'react-router-dom'
import Navbar from './Navbar'
import Footer from './Footer'

export default function Layout() {
  return (
    <div className="flex min-h-screen flex-col bg-night text-white">
      <Navbar />
      <main className="flex-1 pt-16">
        <Outlet /> {/* صفحة الطريق النشط تُحقن هنا */}
      </main>
      <Footer />
    </div>
  )
}