import { useMemo, useState } from 'react'
import { AnimatePresence } from 'framer-motion'
import { planets } from '@/data/planets'
import type { BodyKind } from '@/types'
import PlanetCard from '@/components/PlanetCard'

type SortKey = 'distance' | 'size' | 'moons' | 'name'

const filters: { value: BodyKind | 'all'; label: string }[] = [
  { value: 'all', label: 'Все' },
  { value: 'terrestrial', label: 'Земные' },
  { value: 'gas-giant', label: 'Газовые гиганты' },
  { value: 'ice-giant', label: 'Ледяные гиганты' },
  { value: 'dwarf', label: 'Карликовые' },
]

export default function Planets() {
  const [query, setQuery] = useState('')
  const [kind, setKind] = useState<BodyKind | 'all'>('all')
  const [sort, setSort] = useState<SortKey>('distance')

  const list = useMemo(() => {
    const q = query.trim().toLowerCase()
    return planets
      .filter((p) => (kind === 'all' || p.kind === kind) && (!q || `${p.name} ${p.nameEn}`.toLowerCase().includes(q)))
      .sort((a, b) => {
        switch (sort) {
          case 'size':
            return b.radiusKm - a.radiusKm
          case 'moons':
            return b.moons - a.moons
          case 'name':
            return a.name.localeCompare(b.name, 'ru')
          default:
            return a.distanceMkm - b.distanceMkm
        }
      })
  }, [query, kind, sort])

  return (
    <section>
      <h1 className="page-title">Планеты</h1>
      <div className="toolbar">
        <input
          className="input"
          placeholder="Поиск: Марс, Saturn…"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          aria-label="Поиск планеты"
        />
        <div className="pills" role="tablist">
          {filters.map((f) => (
            <button key={f.value} className={`pill ${kind === f.value ? 'pill-on' : ''}`} onClick={() => setKind(f.value)}>
              {f.label}
            </button>
          ))}
        </div>
        <select className="input select" value={sort} onChange={(e) => setSort(e.target.value as SortKey)} aria-label="Сортировка">
          <option value="distance">По удалённости</option>
          <option value="size">По размеру</option>
          <option value="moons">По числу спутников</option>
          <option value="name">По алфавиту</option>
        </select>
      </div>
      <div className="grid">
        <AnimatePresence>
          {list.map((p, i) => (
            <PlanetCard key={p.id} planet={p} index={i} />
          ))}
        </AnimatePresence>
      </div>
      {list.length === 0 && <p className="muted center">Ничего не найдено. Попробуйте другой запрос.</p>}
    </section>
  )
}
