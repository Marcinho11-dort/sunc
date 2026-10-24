import { motion } from 'framer-motion'

interface Props {
  label: string
  value: number
  max: number
  unit: string
  color: string
}

export default function StatBar({ label, value, max, unit, color }: Props) {
  const pct = Math.max(2, Math.min(100, (value / max) * 100))
  return (
    <div className="statbar">
      <div className="statbar-head">
        <span>{label}</span>
        <strong>
          {value.toLocaleString('ru-RU')} {unit}
        </strong>
      </div>
      <div className="statbar-track">
        <motion.div
          className="statbar-fill"
          style={{ background: color }}
          initial={{ width: 0 }}
          animate={{ width: `${pct}%` }}
          transition={{ duration: 0.9, ease: 'easeOut' }}
        />
      </div>
    </div>
  )
}
