import { useEffect, useRef } from 'react'

interface Star {
  x: number
  y: number
  z: number
  r: number
  tw: number
}

export default function Starfield() {
  const ref = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = ref.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let w = 0
    let h = 0
    let stars: Star[] = []
    let raf = 0
    let mx = 0
    let my = 0
    const dpr = Math.min(window.devicePixelRatio || 1, 2)
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    const resize = () => {
      w = window.innerWidth
      h = window.innerHeight
      canvas.width = w * dpr
      canvas.height = h * dpr
      canvas.style.width = `${w}px`
      canvas.style.height = `${h}px`
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
      const count = Math.floor((w * h) / 4500)
      stars = Array.from({ length: count }, () => ({
        x: Math.random() * w,
        y: Math.random() * h,
        z: Math.random() * 0.9 + 0.1,
        r: Math.random() * 1.3 + 0.2,
        tw: Math.random() * Math.PI * 2,
      }))
    }

    const onMove = (e: MouseEvent) => {
      mx = (e.clientX / w - 0.5) * 2
      my = (e.clientY / h - 0.5) * 2
    }

    const draw = (t: number) => {
      ctx.clearRect(0, 0, w, h)
      for (const s of stars) {
        const px = s.x + mx * 18 * s.z
        const py = s.y + my * 18 * s.z
        const a = reduce ? 0.7 : 0.45 + 0.45 * Math.sin(t / 900 + s.tw)
        ctx.globalAlpha = a * s.z + 0.1
        ctx.fillStyle = s.z > 0.8 ? '#cfe3ff' : s.z > 0.5 ? '#ffffff' : '#ffe4c4'
        ctx.beginPath()
        ctx.arc(px, py, s.r * s.z + 0.2, 0, Math.PI * 2)
        ctx.fill()
      }
      ctx.globalAlpha = 1
      if (!reduce) raf = requestAnimationFrame(draw)
    }

    resize()
    window.addEventListener('resize', resize)
    window.addEventListener('mousemove', onMove)
    raf = requestAnimationFrame(draw)
    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('resize', resize)
      window.removeEventListener('mousemove', onMove)
    }
  }, [])

  return <canvas ref={ref} className="starfield" aria-hidden="true" />
}
