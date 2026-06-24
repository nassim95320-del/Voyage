import React, { useState } from 'react'
import Codex from './Codex.jsx'
import Flashcards from './Flashcards.jsx'
import Quiz from './Quiz.jsx'

export default function MissionView({ mission, save, onBack, onFinishMission, getCard, onReview, playSound }) {
  const [tab, setTab] = useState('codex')
  const score = save.completed[mission.id] || 0
  const done = score >= 80

  const switchTab = (t) => {
    if (t === tab) return
    playSound?.('nav')
    setTab(t)
  }

  return (
    <div className="mission" style={{ '--m-color': mission.color }}>
      <div className="mission-head glass">
        <button className="btn-ghost back" onClick={() => { playSound?.('click'); onBack() }}>← Carte</button>
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
        <button className={tab === 'codex' ? 'active' : ''} onClick={() => switchTab('codex')}>📖 Codex</button>
        <button className={tab === 'flash' ? 'active' : ''} onClick={() => switchTab('flash')}>
          🃏 Flashcards {mission.flashcards.length > 0 && <em>({mission.flashcards.length})</em>}
        </button>
        <button className={tab === 'boss' ? 'active' : ''} onClick={() => switchTab('boss')}>🏆 Boss</button>
      </nav>

      <div className="tab-content" key={tab}>
        {tab === 'codex' && <Codex mission={mission} />}
        {tab === 'flash' && (
          <Flashcards mission={mission} getCard={getCard} onReview={onReview} playSound={playSound} />
        )}
        {tab === 'boss' && (
          <Quiz mission={mission} onFinish={(s) => onFinishMission(mission, s)} playSound={playSound} />
        )}
      </div>
    </div>
  )
}
