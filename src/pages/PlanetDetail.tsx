import { Link, useParams } from 'react-router-dom'
import { motion } from 'framer-motion'
import { getPlanet, kindLabel, planets } from '@/data/planets'
import { useStore } from '@/store/useStore'
import PlanetOrb from '@/components/PlanetOrb'
import StatBar from '@/components/StatBar'
import OrbitDiagram from '@/components/OrbitDiagram'
import NotFound from './NotFound'

export default function PlanetDetail() {
  const { id } = useParams()
  const planet = id ? getPlanet(id) : undefined
  const fav = useStore((s) => (planet ? s.favorites.includes(planet.id) : false))
  const toggle = useStore((s) => s.toggleFavorite)

  if (!planet) return <NotFound />

  const idx = planets.findIndex((p) => p.id === planet.id)
  const prev = planets[(idx - 1 + planets.length) % planets.length]
  const next = planets[(idx + 1) % planets.length]
  const color = planet.colors[1]
  const earthRatio = (planet.radiusKm / 6371).toFixed(2)

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.4 }}>
      <Link to="/planets" className="back">← Все планеты</Link>

      <section className="detail-hero">
        <div className="detail-orb">
          <PlanetOrb planet={planet} size={300} />
        </div>
        <div>
          <span className="chip">{kindLabel[planet.kind]}</span>
          <h1>
            {planet.name} <small>{planet.nameEn}</small>
          </h1>
          <p className="lead">{planet.description}</p>
          <button className={`btn ${fav ? 'btn-primary' : 'btn-ghost'}`} onClick={() => toggle(planet.id)}>
            {fav ? '★ В избранном' : '☆ В избранное'}
          </button>
        </div>
      </section>

      <section className="split">
        <div className="panel">
          <h2>Характеристики</h2>
          <StatBar label="Радиус" value={planet.radiusKm} max={70000} unit="км" color={color} />
          <StatBar label="Масса" value={planet.massE24} max={1900} unit="·10²⁴ кг" color={color} />
          <StatBar label="Гравитация" value={planet.gravity} max={25} unit="м/с²" color={color} />
          <StatBar label="Расстояние до Солнца" value={planet.distanceMkm} max={6000} unit="млн км" color={color} />
          <StatBar label="Год" value={planet.orbitDays} max={90560} unit="земн. дней" color={color} />
          <p className="muted small">Радиус — {earthRatio} земного. Средняя температура: {planet.tempC} °C. Спутников: {planet.moons}.</p>
        </div>
        <div className="panel">
          <h2>Положение в системе</h2>
          <OrbitDiagram activeId={planet.id} />
        </div>
      </section>

      <section>
        <h2>Интересные факты</h2>
        <ul className="facts">
          {planet.facts.map((f, i) => (
            <motion.li key={f} initial={{ opacity: 0, x: -16 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.1 * i }}>
              <span className="fact-n">{i + 1}</span>
              {f}
            </motion.li>
          ))}
        </ul>
      </section>

      <nav className="pager">
        <Link to={`/planets/${prev.id}`}>← {prev.name}</Link>
        <Link to={`/planets/${next.id}`}>{next.name} →</Link>
      </nav>
    </motion.div>
  )
}
