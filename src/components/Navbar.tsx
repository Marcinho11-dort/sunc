import { NavLink, Link } from 'react-router-dom'
import { useStore } from '@/store/useStore'

const links = [
  { to: '/planets', label: 'Планеты' },
  { to: '/missions', label: 'Миссии' },
  { to: '/compare', label: 'Сравнение' },
  { to: '/quiz', label: 'Квиз' },
]

export default function Navbar() {
  const favCount = useStore((s) => s.favorites.length)
  return (
    <header className="nav">
      <Link to="/" className="brand">
        <span className="brand-dot" /> Cosmos Atlas
      </Link>
      <nav>
        {links.map((l) => (
          <NavLink key={l.to} to={l.to} className={({ isActive }) => (isActive ? 'active' : '')}>
            {l.label}
          </NavLink>
        ))}
        <NavLink to="/favorites" className={({ isActive }) => `fav-link ${isActive ? 'active' : ''}`}>
          ★ {favCount}
        </NavLink>
      </nav>
    </header>
  )
}
