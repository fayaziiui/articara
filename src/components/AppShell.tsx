import { Link, NavLink, Outlet } from 'react-router-dom'
import {
  Activity,
  BookOpen,
  Home,
  Leaf,
  Pill,
  Settings,
  Sparkles,
} from 'lucide-react'

const links = [
  { to: '/', label: 'Home', icon: Home },
  { to: '/track', label: 'Track', icon: Activity },
  { to: '/meds', label: 'Meds', icon: Pill },
  { to: '/lifestyle', label: 'Live', icon: Leaf },
  { to: '/learn', label: 'Learn', icon: BookOpen },
  { to: '/progress', label: 'Trends', icon: Sparkles },
]

export function AppShell() {
  return (
    <div className="app-shell">
      <header className="topbar">
        <div className="brand-mark">
          <span className="brand-orb" aria-hidden />
          <div>
            <p className="brand-name">Articara</p>
            <p className="brand-tag">PsA companion</p>
          </div>
        </div>
        <Link to="/settings" className="icon-btn" aria-label="Settings">
          <Settings size={20} />
        </Link>
      </header>

      <main className="page">
        <Outlet />
      </main>

      <nav className="tabbar" aria-label="Primary">
        {links.map(({ to, label, icon: Icon }) => (
          <NavLink
            key={to}
            to={to}
            end={to === '/'}
            className={({ isActive }) => (isActive ? 'tab active' : 'tab')}
          >
            <Icon size={20} strokeWidth={2.1} />
            <span>{label}</span>
          </NavLink>
        ))}
      </nav>
    </div>
  )
}
