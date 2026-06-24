import React from 'react'
import { MISSIONS } from '../data/missions.js'
import { isUnlocked } from '../useGame.js'

export default function WorldMap({ save, onOpen, playSound }) {
  return (
    <div className="map">
      <div className="map-intro">
        <h1>🗺️ Carte d'Odontia</h1>
        <p>
          Descends dans la dent, de l'émail jusqu'à la pulpe. Chaque zone se débloque en réussissant
          le Boss de la précédente (≥ 80 %).
        </p>
      </div>

      <div className="tooth-path">
        {MISSIONS.map((m, i) => {
          const unlocked = isUnlocked(i, save)
          const score = save.completed[m.id] || 0
          const done = score >= 80
          return (
            <React.Fragment key={m.id}>
              {i > 0 && <div className={`path-link ${unlocked ? 'lit' : ''}`} />}
              <button
                className={`node glass ${unlocked ? '' : 'locked'} ${done ? 'done' : ''} ${m.isFinal ? 'final' : ''}`}
                style={{ '--node-color': m.color }}
                disabled={!unlocked}
                onMouseEnter={() => unlocked && playSound?.('click')}
                onClick={() => {
                  if (!unlocked) return
                  playSound?.('nav')
                  onOpen(m.id)
                }}
              >
                <span className="node-icon">{unlocked ? m.icon : '🔒'}</span>
                <span className="node-body">
                  <span className="node-n">{m.isFinal ? 'BOSS FINAL' : `Mission ${m.n}`}</span>
                  <span className="node-title">{m.title}</span>
                  <span className="node-zone">{m.zone}</span>
                </span>
                {done && <span className="node-check">✓ {score}%</span>}
              </button>
            </React.Fragment>
          )
        })}
      </div>
    </div>
  )
}
