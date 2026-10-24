import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { planets, getPlanet } from '@/data/planets'
import { missions } from '@/data/missions'
import { useCountUp } from '@/hooks/useCountUp'
import PlanetOrb from '@/components/PlanetOrb'
import OrbitDiagram from '@/components/OrbitDiagram'

function Counter({ to, label, suffix = '' }: { to: number; label: string; suffix?: string }) {
  const v = useCountUp(to)
  return (
    <div className="counter">
      <strong>
        {Math.round(v).toLocaleString('ru-RU')}
        {suffix}
      </strong>
      <span>{label}</span>
    </div>
  )
}

export default function Home() {
  const saturn = getPlanet('saturn')!
  const totalMoons = planets.reduce((a, p) => a + p.moons, 0)

  return (
    <>
      <section className="hero">
        <motion.div
          className="hero-text"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
        >
          <span className="chip">Интерактивный атлас</span>
          <h1>
            Путешествие по <em>Солнечной системе</em>
          </h1>
          <p className="lead">
            Изучайте планеты, сравнивайте их характеристики, листайте историю космических миссий и проверьте себя в квизе.
          </p>
          <div className="hero-actions">
            <Link to="/planets" className="btn btn-primary">
              Начать исследование
            </Link>
            <Link to="/quiz" className="btn btn-ghost">
              Пройти квиз
            </Link>
          </div>
        </motion.div>
        <motion.div
          className="hero-visual"
          initial={{ opacity: 0, scale: 0.85 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.9, delay: 0.15 }}
        >
          <PlanetOrb planet={saturn} size={280} />
        </motion.div>
      </section>

      <section className="counters">
        <Counter to={planets.length} label="небесных тел" />
        <Counter to={totalMoons} label="спутников" suffix="+" />
        <Counter to={missions.length} label="миссий" />
        <Counter to={4500} label="млн лет возраст" />
      </section>

      <section className="split">
        <div>
          <h2>Карта орбит</h2>
          <p className="muted">
            Схема в логарифмическом масштабе: нажмите на планету, чтобы открыть подробности. Расстояния сжаты, чтобы поместились все миры — от Меркурия до Плутона.
          </p>
          <Link to="/compare" className="btn btn-ghost">
            Сравнить планеты →
          </Link>
        </div>
        <OrbitDiagram />
      </section>

      <section>
        <h2>Знакомьтесь с мирами</h2>
        <div className="strip">
          {planets.map((p) => (
            <Link key={p.id} to={`/planets/${p.id}`} className="strip-item">
              <PlanetOrb planet={p} size={72} spin={false} />
              <span>{p.name}</span>
            </Link>
          ))}
        </div>
      </section>
    </>
  )
}
