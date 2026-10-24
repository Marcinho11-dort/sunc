import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import type { Planet } from '@/types'
import { kindLabel } from '@/data/planets'
import { useStore } from '@/store/useStore'
import PlanetOrb from './PlanetOrb'

export default function PlanetCard({ planet, index = 0 }: { planet: Planet; index?: number }) {
  const fav = useStore((s) => s.favorites.includes(planet.id))
  const toggle = useStore((s) => s.toggleFavorite)

  return (
    <motion.article
      className="card"
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05, duration: 0.45 }}
      layout
    >
      <button
        className={`fav ${fav ? 'fav-on' : ''}`}
        onClick={() => toggle(planet.id)}
        aria-label={fav ? 'Убрать из избранного' : 'В избранное'}
        aria-pressed={fav}
      >
        {fav ? '★' : '☆'}
      </button>
      <Link to={`/planets/${planet.id}`} className="card-link">
        <div className="card-orb">
          <PlanetOrb planet={planet} size={120} />
        </div>
        <span className="chip">{kindLabel[planet.kind]}</span>
        <h3>{planet.name}</h3>
        <p className="muted">{planet.tagline}</p>
        <dl className="mini-stats">
          <div><dt>Сутки</dt><dd>{planet.dayHours < 100 ? `${planet.dayHours} ч` : `${Math.round(planet.dayHours / 24)} дн`}</dd></div>
          <div><dt>Спутники</dt><dd>{planet.moons}</dd></div>
          <div><dt>Темп.</dt><dd>{planet.tempC} °C</dd></div>
        </dl>
      </Link>
    </motion.article>
  )
}
