import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { quiz } from '@/data/quiz'
import { useStore } from '@/store/useStore'

export default function Quiz() {
  const [step, setStep] = useState(0)
  const [picked, setPicked] = useState<number | null>(null)
  const [score, setScore] = useState(0)
  const best = useStore((s) => s.bestScore)
  const setBest = useStore((s) => s.setBestScore)

  const done = step >= quiz.length
  const q = quiz[step]

  const choose = (i: number) => {
    if (picked !== null) return
    setPicked(i)
    if (i === q.answer) setScore((s) => s + 1)
  }

  const next = () => {
    if (step === quiz.length - 1) setBest(score)
    setPicked(null)
    setStep((s) => s + 1)
  }

  const restart = () => {
    setStep(0)
    setPicked(null)
    setScore(0)
  }

  return (
    <section className="quiz">
      <h1 className="page-title">Космический квиз</h1>
      <p className="muted">Лучший результат: {best} / {quiz.length}</p>

      <div className="panel">
        <AnimatePresence mode="wait">
          {done ? (
            <motion.div key="done" className="center" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}>
              <h2>Результат: {score} из {quiz.length}</h2>
              <p className="muted">
                {score === quiz.length ? 'Безупречно! Вы настоящий астроном.' : score >= quiz.length / 2 ? 'Отличный результат, но есть куда расти.' : 'Загляните в атлас и попробуйте снова!'}
              </p>
              <button className="btn btn-primary" onClick={restart}>Пройти ещё раз</button>
            </motion.div>
          ) : (
            <motion.div key={q.id} initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -30 }}>
              <div className="progress"><div style={{ width: `${(step / quiz.length) * 100}%` }} /></div>
              <p className="muted small">Вопрос {step + 1} из {quiz.length}</p>
              <h2>{q.question}</h2>
              <div className="options">
                {q.options.map((o, i) => {
                  const state = picked === null ? '' : i === q.answer ? 'opt-right' : i === picked ? 'opt-wrong' : 'opt-dim'
                  return (
                    <button key={o} className={`opt ${state}`} onClick={() => choose(i)}>
                      {o}
                    </button>
                  )
                })}
              </div>
              {picked !== null && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="explain">
                  <p>{q.explain}</p>
                  <button className="btn btn-primary" onClick={next}>
                    {step === quiz.length - 1 ? 'Показать результат' : 'Дальше →'}
                  </button>
                </motion.div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  )
}
