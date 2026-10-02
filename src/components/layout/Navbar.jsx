import { useEffect, useState } from 'react'
import { NavLink, Link } from 'react-router-dom'
import { HiMenu, HiX } from 'react-icons/hi'

const links = [
  { to: '/', label: 'Home' },
  { to: '/projects', label: 'Projects' },
  { to: '/about', label: 'About' },
  { to: '/contact', label: 'Contact' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)

  // عند تجاوز 40px سكرول تتفعّل الخلفية الزجاجية
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        scrolled ? 'bg-night/80 backdrop-blur-md border-b border-white/5' : 'bg-transparent'
      }`}
    >
      <nav className="container flex h-16 items-center justify-between">
        <Link to="/" className="flex items-center gap-2 font-display text-lg font-bold">
          <span className="grid h-9 w-9 place-items-center rounded-full bg-blob text-xs">RY</span>
          Ragheb<span className="text-gold">.</span>
        </Link>

        {/* روابط سطح المكتب */}
        <ul className="hidden md:flex items-center gap-8 text-sm">
          {links.map(({ to, label }) => (
            <li key={to}>
              <NavLink
                to={to}
                end={to === '/'}
                className={({ isActive }) =>
                  `transition-colors hover:text-gold ${isActive ? 'text-gold' : 'text-white/80'}`
                }
              >
                {label}
              </NavLink>
            </li>
          ))}
          <li>
            <Link
              to="/contact"
              className="rounded-full border border-gold/60 px-4 py-1.5 text-gold transition hover:bg-gold hover:text-night"
            >
              Hire me
            </Link>
          </li>
        </ul>

        {/* زر القائمة للجوال */}
        <button className="md:hidden text-2xl" onClick={() => setOpen(!open)} aria-label="Toggle menu">
          {open ? <HiX /> : <HiMenu />}
        </button>
      </nav>

      {/* قائمة الجوال المنسدلة */}
      {open && (
        <ul className="md:hidden bg-coal/95 backdrop-blur-md border-t border-white/5 px-6 py-4 space-y-3">
          {links.map(({ to, label }) => (
            <li key={to}>
              <NavLink
                to={to}
                end={to === '/'}
                onClick={() => setOpen(false)}
                className={({ isActive }) => (isActive ? 'text-gold' : 'text-white/80')}
              >
                {label}
              </NavLink>
            </li>
          ))}
        </ul>
      )}
    </header>
  )
}