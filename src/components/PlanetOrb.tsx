import type { CSSProperties } from 'react'
import type { Planet } from '@/types'

interface Props {
  planet: Planet
  size?: number
  spin?: boolean
}

export default function PlanetOrb({ planet, size = 160, spin = true }: Props) {
  const [light, mid, dark] = planet.colors
  const style = {
    '--size': `${size}px`,
    '--c1': light,
    '--c2': mid,
    '--c3': dark,
  } as CSSProperties

  return (
    <div className={`orb-wrap ${spin ? 'orb-float' : ''}`} style={style}>
      {planet.hasRings && <div className="orb-ring orb-ring-back" />}
      <div className={`orb orb-${planet.id}`}>
        <div className="orb-bands" />
        <div className="orb-shade" />
      </div>
      {planet.hasRings && <div className="orb-ring orb-ring-front" />}
    </div>
  )
}
