import React from 'react'
import { gradeForXp, nextGrade } from '../useGame.js'

export default function HUD({ save, muted, onToggleMute, onReset, onHome, onOpenBadges }) {
  const grade = gradeForXp(save.xp)
  const next = nextGrade(save.xp)
  const pct = next ? Math.round(((save.xp - grade.xp) / (next.xp - grade.xp)) * 100) : 100

  return (
    <header className="hud glass">
      <button className="hud-logo" onClick={onHome} title="Carte du monde">
        🦷 <span>ODONTIA</span>
      </button>

      <div className="hud-grade">
        <span className="hud-grade-icon">{grade.icon}</span>
        <div className="hud-grade-text">
          <strong>{grade.title}</strong>
          <div className="xpbar" aria-label="progression vers le grade suivant">
            <div className="xpbar-fill" style={{ width: `${pct}%` }}>
              <span className="xpbar-shine" />
            </div>
          </div>
          <small>
            {save.xp} XP{next ? ` · plus que ${next.xp - save.xp} pour ${next.title}` : ' · grade maximal !'}
          </small>
        </div>
      </div>

      <div className="hud-right">
        <button className="hud-pill" onClick={onOpenBadges} title="Salle des trophées">
          🏅 <span>{save.badges.length}</span>
        </button>
        <button
          className="hud-pill"
          onClick={onToggleMute}
          title={muted ? 'Activer le son' : 'Couper le son'}
          aria-pressed={!muted}
        >
          {muted ? '🔇' : '🔊'}
        </button>
        <button className="btn-ghost icon" onClick={onReset} title="Réinitialiser la progression">↺</button>
      </div>
    </header>
  )
}
