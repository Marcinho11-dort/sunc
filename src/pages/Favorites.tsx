import { Link } from 'react-router-dom'
import { planets } from '@/data/planets'
import { useStore } from '@/store/useStore'
import PlanetCard from '@/components/PlanetCard'

export default function Favorites() {
  const favs = useStore((s) => s.favorites)
  const list = planets.filter((p) => favs.includes(p.id))

  return (
    <section>
      <h1 className="page-title">Избранное</h1>
      {list.length === 0 ? (
        <div className="panel center">
          <p className="muted">Пока пусто. Отмечайте планеты звёздочкой, и они появятся здесь.</p>
          <Link to="/planets" className="btn btn-primary">К планетам</Link>
        </div>
      ) : (
        <div className="grid">
          {list.map((p, i) => (
            <PlanetCard key={p.id} planet={p} index={i} />
          ))}
        </div>
      )}
    </section>
  )
}
