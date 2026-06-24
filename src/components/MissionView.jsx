import React, { useState } from 'react'
import Codex from './Codex.jsx'
import Flashcards from './Flashcards.jsx'
import Quiz from './Quiz.jsx'

export default function MissionView({ mission, save, onBack, onFinishMission, onRecordFlash }) {
  const [tab, setTab] = useState('codex')
  const score = save.completed[mission.id] || 0
  const done = score >= 80

  return (
    <div className="mission" style={{ '--m-color': mission.color }}>
      <div className="mission-head">
        <button className="btn-ghost back" onClick={onBack}>← Carte</button>
        <div className="mission-title">
          <span className="mission-icon">{mission.icon}</span>
          <div>
            <span className="mission-kicker">{mission.isFinal ? 'BOSS FINAL' : `Mission ${mission.n} · ${mission.zone}`}</span>
            <h2>{mission.title}</h2>
          </div>
        </div>
        {done && <span className="mission-done-badge">{mission.badge?.icon} validée · {score}%</span>}
      </div>

      <nav className="tabs">
        <button className={tab === 'codex' ? 'active' : ''} onClick={() => setTab('codex')}>📖 Codex</button>
        <button className={tab === 'flash' ? 'active' : ''} onClick={() => setTab('flash')}>
          🃏 Flashcards {mission.flashcards.length > 0 && <em>({mission.flashcards.length})</em>}
        </button>
        <button className={tab === 'boss' ? 'active' : ''} onClick={() => setTab('boss')}>🏆 Boss</button>
      </nav>

      <div className="tab-content">
        {tab === 'codex' && <Codex mission={mission} />}
        {tab === 'flash' && <Flashcards mission={mission} onRecord={onRecordFlash} />}
        {tab === 'boss' && (
          <Quiz mission={mission} onFinish={(s) => onFinishMission(mission, s)} />
        )}
      </div>
    </div>
  )
}
