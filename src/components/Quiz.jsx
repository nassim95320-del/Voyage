import React, { useState } from 'react'

const MAX_HP = 100

export default function Quiz({ mission, onFinish }) {
  const questions = mission.quiz
  const [qi, setQi] = useState(0)
  const [selected, setSelected] = useState([])
  const [checked, setChecked] = useState(false)
  const [hp, setHp] = useState(MAX_HP)
  const [correctCount, setCorrectCount] = useState(0)
  const [finished, setFinished] = useState(false)

  const q = questions[qi]
  const dmg = Math.ceil(MAX_HP / questions.length) // dégâts par mauvaise réponse

  const toggle = (i) => {
    if (checked) return
    if (q.type === 'single') setSelected([i])
    else setSelected((s) => (s.includes(i) ? s.filter((x) => x !== i) : [...s, i]))
  }

  const isCorrectSet = () => {
    const correct = q.options.map((o, i) => (o.ok ? i : null)).filter((x) => x !== null)
    const sel = [...selected].sort()
    return correct.length === sel.length && correct.sort().every((v, i) => v === sel[i])
  }

  const check = () => {
    if (selected.length === 0) return
    const ok = isCorrectSet()
    setChecked(true)
    if (ok) setCorrectCount((c) => c + 1)
    else setHp((h) => Math.max(0, h - dmg))
  }

  const next = () => {
    if (qi + 1 < questions.length) {
      setQi(qi + 1)
      setSelected([])
      setChecked(false)
    } else {
      const score = Math.round((correctCount / questions.length) * 100)
      setFinished(true)
      onFinish?.(score)
    }
  }

  if (finished) {
    const score = Math.round((correctCount / questions.length) * 100)
    const passed = score >= 80
    return (
      <div className={`quiz-result ${passed ? 'win' : 'lose'}`}>
        <div className="big-emoji">{passed ? '🏆' : '💥'}</div>
        <h3>{passed ? 'Boss vaincu !' : 'Le Boss résiste…'}</h3>
        <p className="score-line">Score : <strong>{score}%</strong> ({correctCount}/{questions.length})</p>
        {passed ? (
          <p>Tu remportes <strong>{mission.badge?.icon} {mission.badge?.name}</strong> et l'XP de la quête !</p>
        ) : (
          <p>Il faut <strong>≥ 80 %</strong> pour valider la mission. Révise le Codex et les flashcards, puis réessaie.</p>
        )}
        <button className="btn" onClick={() => {
          setQi(0); setSelected([]); setChecked(false); setHp(MAX_HP); setCorrectCount(0); setFinished(false)
        }}>
          Rejouer le Boss
        </button>
      </div>
    )
  }

  return (
    <div className="quiz">
      <div className="hp-row">
        <span className="hp-label">❤️ PV d'Émail</span>
        <div className="hpbar">
          <div className="hpbar-fill" style={{ width: `${hp}%` }} data-low={hp <= 30} />
        </div>
        <span className="hp-val">{hp}</span>
      </div>

      <div className="quiz-meta">
        <span>Question {qi + 1}/{questions.length}</span>
        <span>{q.type === 'multi' ? 'Plusieurs réponses possibles' : 'Une seule réponse'}</span>
      </div>

      <h3 className="quiz-q">{q.q}</h3>

      <div className="options">
        {q.options.map((o, i) => {
          const sel = selected.includes(i)
          let cls = 'option'
          if (sel) cls += ' selected'
          if (checked) {
            if (o.ok) cls += ' correct'
            else if (sel) cls += ' wrong'
          }
          return (
            <button key={i} className={cls} onClick={() => toggle(i)} disabled={checked}>
              <span className="opt-mark">{checked ? (o.ok ? '✓' : sel ? '✗' : '') : (sel ? '●' : '○')}</span>
              <span>{o.t}</span>
            </button>
          )
        })}
      </div>

      {checked && (
        <div className={`explain ${isCorrectSet() ? 'ok' : 'ko'}`}>
          <strong>{isCorrectSet() ? '✅ Correct !' : '❌ Raté.'}</strong> {q.explain}
        </div>
      )}

      <div className="quiz-actions">
        {!checked ? (
          <button className="btn" disabled={selected.length === 0} onClick={check}>Valider</button>
        ) : (
          <button className="btn" onClick={next}>
            {qi + 1 < questions.length ? 'Question suivante →' : 'Voir le résultat'}
          </button>
        )}
      </div>
    </div>
  )
}
