import React from 'react'
import { gradeForXp, nextGrade } from '../useGame.js'

export default function HUD({ save, onReset, onHome }) {
  const grade = gradeForXp(save.xp)
  const next = nextGrade(save.xp)
  const pct = next
    ? Math.round(((save.xp - grade.xp) / (next.xp - grade.xp)) * 100)
    : 100

  return (
    <header className="hud">
      <button className="hud-logo" onClick={onHome} title="Carte du monde">
        🦷 <span>ODONTIA</span>
      </button>

      <div className="hud-grade">
        <span className="hud-grade-icon">{grade.icon}</span>
        <div className="hud-grade-text">
          <strong>{grade.title}</strong>
          <div className="xpbar" aria-label="progression vers le grade suivant">
            <div className="xpbar-fill" style={{ width: `${pct}%` }} />
          </div>
          <small>
            {save.xp} XP{next ? ` · plus que ${next.xp - save.xp} pour ${next.title}` : ' · grade maximal !'}
          </small>
        </div>
      </div>

      <div className="hud-right">
        <span className="hud-badges" title="Badges gagnés">🏅 {save.badges.length}</span>
        <button className="btn-ghost" onClick={onReset} title="Réinitialiser la progression">↺</button>
      </div>
    </header>
  )
}
