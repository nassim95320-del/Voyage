import React, { useMemo, useState } from 'react'
import { RATINGS, buildQueue, deckStats, nextDueLabel } from '../srs.js'

// Révision active à répétition espacée (SM-2).
export default function Flashcards({ mission, getCard, onReview, playSound }) {
  const total = mission.flashcards.length
  const cardOf = (i) => getCard(mission.id, i)

  // La file est figée à l'ouverture de la session (le state SRS, lui, évolue en fond).
  const [queue, setQueue] = useState(() => {
    const q = buildQueue(total, (i) => cardOf(i))
    return q.length ? q : [...Array(total).keys()]
  })
  const [flipped, setFlipped] = useState(false)
  const [done, setDone] = useState(0)

  const stats = useMemo(() => deckStats(total, (i) => cardOf(i)), [mission, done]) // eslint-disable-line

  if (total === 0) {
    return <div className="empty">Pas de flashcards pour ce duel — fonce sur le Boss !</div>
  }

  if (queue.length === 0) {
    return (
      <div className="flash-done glass">
        <div className="big-emoji">🃏✨</div>
        <h3>Session terminée !</h3>
        <p>
          Tu as révisé toutes les cartes dues. Cartes maîtrisées : <strong>{stats.learned}/{total}</strong>.
        </p>
        <p className="muted-text">Reviens plus tard : la répétition espacée te représentera les cartes au bon moment.</p>
        <button
          className="btn"
          onClick={() => {
            playSound?.('click')
            setQueue([...Array(total).keys()])
            setFlipped(false)
          }}
        >
          Tout réviser quand même
        </button>
      </div>
    )
  }

  const idx = queue[0]
  const card = mission.flashcards[idx]
  const srs = cardOf(idx)

  const flip = () => {
    playSound?.('flip')
    setFlipped((f) => !f)
  }

  const rate = (ratingKey) => {
    playSound?.(ratingKey === 'again' ? 'wrong' : 'correct')
    onReview?.(mission.id, idx, ratingKey)
    setQueue((q) => {
      const rest = q.slice(1)
      // "À revoir" : la carte repasse en fin de session.
      return ratingKey === 'again' ? [...rest, idx] : rest
    })
    setFlipped(false)
    setDone((d) => d + 1)
  }

  const sessionTotal = done + queue.length
  const progressPct = Math.round((done / Math.max(1, sessionTotal)) * 100)

  return (
    <div className="flash">
      <div className="flash-progress">
        <div className="flash-progress-bar"><span style={{ width: `${progressPct}%` }} /></div>
        <div className="flash-progress-meta">
          <span>📚 {stats.learned}/{total} maîtrisées</span>
          <span>🔁 {queue.length} en file</span>
          <span>⏱ {nextDueLabel(srs)}</span>
        </div>
      </div>

      <button className={`flashcard ${flipped ? 'flipped' : ''}`} onClick={flip} aria-label="Retourner la carte">
        <div className="flashcard-inner">
          <div className="flashcard-face front glass">
            <span className="flash-tag">Question</span>
            <p>{card.q}</p>
            <small>Clique pour révéler</small>
          </div>
          <div className="flashcard-face back glass">
            <span className="flash-tag">Réponse</span>
            <p>{card.a}</p>
          </div>
        </div>
      </button>

      {flipped ? (
        <div className="flash-ratings">
          {Object.entries(RATINGS).map(([key, r]) => (
            <button key={key} className={`rating ${r.cls}`} onClick={() => rate(key)}>
              <span className="rating-icon">{r.icon}</span>
              <span>{r.label}</span>
            </button>
          ))}
        </div>
      ) : (
        <p className="flash-hint">Réfléchis à la réponse, puis retourne la carte pour t'auto-évaluer.</p>
      )}
    </div>
  )
}
