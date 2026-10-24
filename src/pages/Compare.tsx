import { useState } from 'react'
import { planets, getPlanet } from '@/data/planets'
import type { Planet } from '@/types'
import PlanetOrb from '@/components/PlanetOrb'

const rows: { label: string; get: (p: Planet) => number; unit: string }[] = [
  { label: 'Радиус', get: (p) => p.radiusKm, unit: 'км' },
  { label: 'Масса', get: (p) => p.massE24, unit: '·10²⁴ кг' },
  { label: 'Гравитация', get: (p) => p.gravity, unit: 'м/с²' },
  { label: 'Расстояние до Солнца', get: (p) => p.distanceMkm, unit: 'млн км' },
  { label: 'Год', get: (p) => p.orbitDays, unit: 'дней' },
  { label: 'Сутки', get: (p) => p.dayHours, unit: 'ч' },
  { label: 'Температура', get: (p) => p.tempC, unit: '°C' },
  { label: 'Спутники', get: (p) => p.moons, unit: '' },
]

function Select({ value, onChange }: { value: string; onChange: (v: string) => void }) {
  return (
    <select className="input select" value={value} onChange={(e) => onChange(e.target.value)}>
      {planets.map((p) => (
        <option key={p.id} value={p.id}>
          {p.name}
        </option>
      ))}
    </select>
  )
}

export default function Compare() {
  const [aId, setA] = useState('earth')
  const [bId, setB] = useState('mars')
  const a = getPlanet(aId)!
  const b = getPlanet(bId)!

  return (
    <section>
      <h1 className="page-title">Сравнение планет</h1>
      <div className="compare-head">
        <div className="compare-col">
          <PlanetOrb planet={a} size={140} />
          <Select value={aId} onChange={setA} />
        </div>
        <span className="vs">VS</span>
        <div className="compare-col">
          <PlanetOrb planet={b} size={140} />
          <Select value={bId} onChange={setB} />
        </div>
      </div>

      <div className="panel">
        {rows.map((r) => {
          const va = r.get(a)
          const vb = r.get(b)
          const max = Math.max(Math.abs(va), Math.abs(vb)) || 1
          return (
            <div key={r.label} className="cmp-row">
              <div className="cmp-side cmp-left">
                <span>
                  {va.toLocaleString('ru-RU')} {r.unit}
                </span>
                <div className="cmp-bar" style={{ width: `${(Math.abs(va) / max) * 100}%`, background: a.colors[1] }} />
              </div>
              <span className="cmp-label">{r.label}</span>
              <div className="cmp-side cmp-right">
                <div className="cmp-bar" style={{ width: `${(Math.abs(vb) / max) * 100}%`, background: b.colors[1] }} />
                <span>
                  {vb.toLocaleString('ru-RU')} {r.unit}
                </span>
              </div>
            </div>
          )
        })}
      </div>
    </section>
  )
}
