import React, { useEffect, useRef } from 'react'

// Confettis canvas, sans dépendance. `trigger` est un compteur :
// chaque incrément déclenche une nouvelle salve. `intensity` règle le nombre.
export default function Confetti({ trigger, intensity = 140 }) {
  const canvasRef = useRef(null)
  const particlesRef = useRef([])
  const rafRef = useRef(0)
  const lastTrigger = useRef(0)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')

    const resize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }
    resize()
    window.addEventListener('resize', resize)

    const colors = ['#5b8def', '#37c2c4', '#f6c453', '#ff7a8c', '#8ac926', '#b388eb', '#ffffff']

    const spawn = () => {
      const cx = canvas.width / 2
      for (let i = 0; i < intensity; i++) {
        const angle = Math.random() * Math.PI * 2
        const speed = 4 + Math.random() * 9
        particlesRef.current.push({
          x: cx + (Math.random() - 0.5) * 120,
          y: canvas.height * 0.35 + (Math.random() - 0.5) * 60,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed - 4,
          size: 5 + Math.random() * 7,
          color: colors[(Math.random() * colors.length) | 0],
          rot: Math.random() * Math.PI,
          vr: (Math.random() - 0.5) * 0.3,
          life: 1,
          shape: Math.random() > 0.5 ? 'rect' : 'circle',
        })
      }
    }

    const tick = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      const ps = particlesRef.current
      for (let i = ps.length - 1; i >= 0; i--) {
        const p = ps[i]
        p.vy += 0.22 // gravité
        p.vx *= 0.99
        p.x += p.vx
        p.y += p.vy
        p.rot += p.vr
        p.life -= 0.009
        if (p.life <= 0 || p.y > canvas.height + 40) {
          ps.splice(i, 1)
          continue
        }
        ctx.save()
        ctx.globalAlpha = Math.max(0, p.life)
        ctx.translate(p.x, p.y)
        ctx.rotate(p.rot)
        ctx.fillStyle = p.color
        if (p.shape === 'rect') ctx.fillRect(-p.size / 2, -p.size / 2, p.size, p.size * 0.6)
        else { ctx.beginPath(); ctx.arc(0, 0, p.size / 2, 0, Math.PI * 2); ctx.fill() }
        ctx.restore()
      }
      if (ps.length > 0) rafRef.current = requestAnimationFrame(tick)
      else rafRef.current = 0
    }

    if (trigger > 0 && trigger !== lastTrigger.current) {
      lastTrigger.current = trigger
      spawn()
      if (!rafRef.current) rafRef.current = requestAnimationFrame(tick)
    }

    return () => {
      window.removeEventListener('resize', resize)
      cancelAnimationFrame(rafRef.current)
      rafRef.current = 0
    }
  }, [trigger, intensity])

  return <canvas ref={canvasRef} className="confetti-canvas" aria-hidden="true" />
}
