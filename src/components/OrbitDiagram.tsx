import { useNavigate } from 'react-router-dom'
import { planets } from '@/data/planets'

/** Схематичная диаграмма орбит (расстояния сжаты логарифмически). */
export default function OrbitDiagram({ activeId }: { activeId?: string }) {
  const nav = useNavigate()
  const size = 520
  const c = size / 2
  const maxLog = Math.log10(6000)
  const radius = (mkm: number) => 28 + ((Math.log10(mkm) - Math.log10(50)) / (maxLog - Math.log10(50))) * (c - 44)

  return (
    <svg viewBox={`0 0 ${size} ${size}`} className="orbit-svg" role="img" aria-label="Схема орбит планет">
      <defs>
        <radialGradient id="sun">
          <stop offset="0%" stopColor="#fff3c4" />
          <stop offset="60%" stopColor="#ffb347" />
          <stop offset="100%" stopColor="#ff7a18" />
        </radialGradient>
      </defs>
      <circle cx={c} cy={c} r={14} fill="url(#sun)" />
      <circle cx={c} cy={c} r={22} fill="#ffb347" opacity="0.15" />
      {planets.map((p, i) => {
        const r = radius(p.distanceMkm)
        const angle = (i / planets.length) * Math.PI * 2 + 0.6
        const x = c + Math.cos(angle) * r
        const y = c + Math.sin(angle) * r
        const active = p.id === activeId
        return (
          <g key={p.id} onClick={() => nav(`/planets/${p.id}`)} style={{ cursor: 'pointer' }}>
            <circle cx={c} cy={c} r={r} fill="none" stroke="rgba(255,255,255,0.12)" strokeDasharray="2 5" />
            <circle cx={x} cy={y} r={active ? 9 : 6} fill={p.colors[1]} stroke={active ? '#fff' : 'none'} strokeWidth="2">
              <title>{p.name}</title>
            </circle>
            {active && (
              <text x={x} y={y - 15} textAnchor="middle" fill="#fff" fontSize="12" fontFamily="Space Grotesk">
                {p.name}
              </text>
            )}
          </g>
        )
      })}
    </svg>
  )
}
