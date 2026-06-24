import React, { useMemo, useState } from 'react'

// File de révision active type répétition espacée simplifiée :
// "À revoir" replace la carte plus loin dans la file ; "Je sais" la sort.
export default function Flashcards({ mission, onRecord }) {
  const initial = useMemo(
    () => mission.flashcards.map((_, i) => i),
    [mission],
  )
  const [queue, setQueue] = useState(initial)
  const [flipped, setFlipped] = useState(false)
  const [knownCount, setKnownCount] = useState(0)
  const total = mission.flashcards.length

  if (total === 0) {
    return <div className="empty">Pas de flashcards pour ce duel — fonce sur le Boss !</div>
  }

  if (queue.length === 0) {
    return (
      <div className="flash-done">
        <div className="big-emoji">🃏✨</div>
        <h3>Deck maîtrisé !</h3>
        <p>Tu as validé les {total} flashcards de combat.</p>
        <button className="btn" onClick={() => { setQueue(initial); setFlipped(false); setKnownCount(0) }}>
          Rejouer le deck
        </button>
      </div>
    )
  }

  const idx = queue[0]
  const card = mission.flashcards[idx]

  const answer = (known) => {
    onRecord?.(mission.id, idx, known)
    if (known) setKnownCount((c) => c + 1)
    setQueue((q) => (known ? q.slice(1) : [...q.slice(1), q[0]]))
    setFlipped(false)
  }

  return (
    <div className="flash">
      <div className="flash-progress">
        <span>Maîtrisées : {knownCount}/{total}</span>
        <span>Restantes : {queue.length}</span>
      </div>
      <button
        className={`flashcard ${flipped ? 'flipped' : ''}`}
        onClick={() => setFlipped((f) => !f)}
        aria-label="Retourner la carte"
      >
        <div className="flashcard-inner">
          <div className="flashcard-face front">
            <span className="flash-tag">Question</span>
            <p>{card.q}</p>
            <small>Clique pour révéler</small>
          </div>
          <div className="flashcard-face back">
            <span className="flash-tag">Réponse</span>
            <p>{card.a}</p>
          </div>
        </div>
      </button>
      <div className="flash-actions">
        <button className="btn-danger" disabled={!flipped} onClick={() => answer(false)}>
          ❌ À revoir
        </button>
        <button className="btn-success" disabled={!flipped} onClick={() => answer(true)}>
          ✅ Je sais
        </button>
      </div>
      {!flipped && <p className="flash-hint">Réfléchis à la réponse, puis retourne la carte.</p>}
    </div>
  )
}
