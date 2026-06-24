import React from 'react'
import { MISSIONS, GRADES } from '../data/missions.js'
import { gradeForXp } from '../useGame.js'

export default function Badges({ save, onClose }) {
  const grade = gradeForXp(save.xp)
  const allBadges = MISSIONS.filter((m) => m.badge).map((m) => m.badge)

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal glass" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose}>✕</button>
        <h2>🏅 Salle des trophées</h2>

        <h3 className="trophy-sub">Grade actuel</h3>
        <div className="current-grade">
          <span className="cg-icon">{grade.icon}</span>
          <strong>{grade.title}</strong>
        </div>

        <h3 className="trophy-sub">Grades</h3>
        <div className="grade-track">
          {GRADES.map((g) => (
            <div key={g.lvl} className={`grade-pip ${save.xp >= g.xp ? 'reached' : ''}`}>
              <span>{g.icon}</span>
              <small>{g.title}</small>
              <em>{g.xp} XP</em>
            </div>
          ))}
        </div>

        <h3 className="trophy-sub">Badges ({save.badges.length}/{allBadges.length})</h3>
        <div className="badge-grid">
          {allBadges.map((b) => {
            const owned = save.badges.includes(b.name)
            return (
              <div key={b.name} className={`badge-card ${owned ? 'owned' : 'locked'}`}>
                <span className="badge-icon">{owned ? b.icon : '🔒'}</span>
                <span className="badge-name">{b.name}</span>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
