// Répétition espacée — algorithme SM-2 (celui d'Anki/SuperMemo), adapté pour le web.
// Chaque carte stocke : facteur de facilité (ef), nb de répétitions réussies (reps),
// intervalle en jours (interval), date de prochaine révision (due), rechutes (lapses).

const DAY = 24 * 60 * 60 * 1000

// Qualités exposées à l'UI → note SM-2 (0–5).
export const RATINGS = {
  again: { q: 1, label: 'À revoir', icon: '🔁', cls: 'r-again' },
  hard: { q: 3, label: 'Difficile', icon: '😬', cls: 'r-hard' },
  good: { q: 4, label: 'Correct', icon: '🙂', cls: 'r-good' },
  easy: { q: 5, label: 'Facile', icon: '😎', cls: 'r-easy' },
}

export function defaultCard() {
  return { ef: 2.5, reps: 0, interval: 0, due: 0, lapses: 0, seen: 0 }
}

// Applique SM-2 et renvoie la carte mise à jour (sans muter l'original).
export function schedule(card, ratingKey, now = Date.now()) {
  const c = { ...defaultCard(), ...card }
  const q = RATINGS[ratingKey].q
  c.seen += 1

  if (q < 3) {
    // Échec : on relance l'apprentissage, révision rapprochée.
    c.reps = 0
    c.interval = 0
    c.lapses += 1
    c.due = now + 1 * 60 * 1000 // re-vue dans la même session (~1 min)
  } else {
    c.reps += 1
    if (c.reps === 1) c.interval = 1
    else if (c.reps === 2) c.interval = 6
    else c.interval = Math.round(c.interval * c.ef)

    // Mise à jour du facteur de facilité (borné à 1.3).
    c.ef = Math.max(1.3, c.ef + (0.1 - (5 - q) * (0.08 + (5 - q) * 0.02)))
    if (ratingKey === 'hard') c.interval = Math.max(1, Math.round(c.interval * 0.8))
    c.due = now + c.interval * DAY
  }
  return c
}

export function isDue(card, now = Date.now()) {
  if (!card || card.seen === 0) return true // jamais vue = à apprendre
  return (card.due || 0) <= now
}

// Construit la file de révision : cartes dues d'abord, puis nouvelles.
export function buildQueue(total, getCard, now = Date.now()) {
  const due = []
  const fresh = []
  for (let i = 0; i < total; i++) {
    const card = getCard(i)
    if (!card || card.seen === 0) fresh.push(i)
    else if (isDue(card, now)) due.push(i)
  }
  return [...due, ...fresh]
}

// Stats lisibles pour l'UI.
export function deckStats(total, getCard, now = Date.now()) {
  let learned = 0
  let dueCount = 0
  let fresh = 0
  for (let i = 0; i < total; i++) {
    const card = getCard(i)
    if (!card || card.seen === 0) fresh++
    else {
      if (card.reps >= 1) learned++
      if (isDue(card, now)) dueCount++
    }
  }
  return { learned, dueCount, fresh, total }
}

// Formatage humain de la prochaine échéance.
export function nextDueLabel(card, now = Date.now()) {
  if (!card || card.seen === 0) return 'nouvelle'
  const diff = (card.due || 0) - now
  if (diff <= 0) return 'à réviser'
  const days = Math.round(diff / DAY)
  if (days >= 1) return `dans ${days} j`
  const mins = Math.round(diff / 60000)
  return mins >= 1 ? `dans ${mins} min` : 'bientôt'
}
