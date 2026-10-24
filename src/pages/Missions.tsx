import { useMemo, useState } from 'react'
import { motion } from 'framer-motion'
import { missions } from '@/data/missions'
import type { Mission } from '@/types'

const statusLabel: Record<Mission['status'], string> = {
  success: 'Завершена',
  ongoing: 'Продолжается',
  lost: 'Потеряна',
}

export default function Missions() {
  const [status, setStatus] = useState<Mission['status'] | 'all'>('all')
  const list = useMemo(
    () => missions.filter((m) => status === 'all' || m.status === status).sort((a, b) => a.year - b.year),
    [status],
  )

  return (
    <section>
      <h1 className="page-title">История миссий</h1>
      <div className="pills">
        {(['all', 'success', 'ongoing', 'lost'] as const).map((s) => (
          <button key={s} className={`pill ${status === s ? 'pill-on' : ''}`} onClick={() => setStatus(s)}>
            {s === 'all' ? 'Все' : statusLabel[s]}
          </button>
        ))}
      </div>
      <ol className="timeline">
        {list.map((m, i) => (
          <motion.li
            key={m.id}
            className={`tl-item tl-${m.status}`}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ delay: (i % 3) * 0.05 }}
          >
            <span className="tl-year">{m.year}</span>
            <div className="tl-card">
              <h3>{m.name}</h3>
              <p className="muted small">
                {m.agency} · {m.target}
              </p>
              <p>{m.summary}</p>
              <span className={`badge badge-${m.status}`}>{statusLabel[m.status]}</span>
            </div>
          </motion.li>
        ))}
      </ol>
    </section>
  )
}
