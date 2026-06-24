import { useCallback, useEffect, useRef, useState } from 'react'
import { GRADES, MISSIONS } from './data/missions.js'
import { defaultCard, schedule } from './srs.js'

const STORAGE_KEY = 'odontia_save_v1'
const SAVE_VERSION = 2

const emptySave = () => ({
  version: SAVE_VERSION,
  xp: 0,
  completed: {}, // { missionId: bestScorePercent }
  badges: [], // [badgeName]
  srs: {}, // { "missionId:index": card SM-2 }
  settings: { muted: false },
  createdAt: Date.now(),
  updatedAt: Date.now(),
})

// Migration ascendante : garantit qu'une ancienne sauvegarde reste lisible.
function migrate(raw) {
  const base = emptySave()
  if (!raw || typeof raw !== 'object') return base
  const s = { ...base, ...raw }
  s.settings = { ...base.settings, ...(raw.settings || {}) }
  s.srs = raw.srs || {}
  // v1 stockait "flashStats" (compteurs) : on repart sur un SRS propre.
  if (raw.version == null && raw.flashStats) delete s.flashStats
  s.version = SAVE_VERSION
  return s
}

function load() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return emptySave()
    return migrate(JSON.parse(raw))
  } catch {
    return emptySave()
  }
}

export function gradeForXp(xp) {
  let g = GRADES[0]
  for (const grade of GRADES) if (xp >= grade.xp) g = grade
  return g
}

export function nextGrade(xp) {
  return GRADES.find((g) => g.xp > xp) || null
}

export function isUnlocked(missionIndex, save) {
  if (missionIndex === 0) return true
  const prev = MISSIONS[missionIndex - 1]
  return (save.completed[prev.id] || 0) >= 80
}

export function useGame() {
  const [save, setSave] = useState(load)
  const [savedTick, setSavedTick] = useState(0)
  const firstRun = useRef(true)

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify({ ...save, updatedAt: Date.now() }))
    if (firstRun.current) {
      firstRun.current = false
      return
    }
    setSavedTick((t) => t + 1) // signal pour le toast "Sauvegardé"
  }, [save])

  const addXp = useCallback((amount) => {
    setSave((s) => ({ ...s, xp: s.xp + amount }))
  }, [])

  const finishMission = useCallback((mission, scorePercent) => {
    setSave((s) => {
      const prevBest = s.completed[mission.id] || 0
      const isNewBest = scorePercent > prevBest
      const passed = scorePercent >= 80
      const alreadyHadBadge = s.badges.includes(mission.badge?.name)
      let xpGain = 0
      if (passed && prevBest < 80) xpGain = mission.xpReward
      else if (isNewBest) xpGain = 20
      return {
        ...s,
        xp: s.xp + xpGain,
        completed: { ...s.completed, [mission.id]: Math.max(prevBest, scorePercent) },
        badges:
          passed && mission.badge && !alreadyHadBadge
            ? [...s.badges, mission.badge.name]
            : s.badges,
      }
    })
  }, [])

  // Révision SM-2 : applique la note et reprogramme la carte.
  const reviewCard = useCallback((missionId, index, ratingKey) => {
    setSave((s) => {
      const key = `${missionId}:${index}`
      const current = s.srs[key] || defaultCard()
      return { ...s, srs: { ...s.srs, [key]: schedule(current, ratingKey) } }
    })
  }, [])

  const getCard = useCallback(
    (missionId, index) => save.srs[`${missionId}:${index}`] || defaultCard(),
    [save.srs],
  )

  const setMuted = useCallback((muted) => {
    setSave((s) => ({ ...s, settings: { ...s.settings, muted } }))
  }, [])

  const reset = useCallback(() => {
    if (typeof window !== 'undefined' && !window.confirm('Réinitialiser toute la progression ?')) return
    localStorage.removeItem(STORAGE_KEY)
    setSave(emptySave())
  }, [])

  return { save, savedTick, addXp, finishMission, reviewCard, getCard, setMuted, reset }
}
