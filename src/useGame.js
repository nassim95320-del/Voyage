import { useCallback, useEffect, useState } from 'react'
import { GRADES, MISSIONS } from './data/missions.js'

const STORAGE_KEY = 'odontia_save_v1'

const emptySave = {
  xp: 0,
  completed: {},        // { missionId: bestScorePercent }
  badges: [],           // [badgeName]
  flashStats: {},       // { "missionId:index": { seen, known } }
  createdAt: Date.now(),
}

function load() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return { ...emptySave }
    return { ...emptySave, ...JSON.parse(raw) }
  } catch {
    return { ...emptySave }
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

// Une mission est déverrouillée si la précédente est réussie à >= 80%
export function isUnlocked(missionIndex, save) {
  if (missionIndex === 0) return true
  const prev = MISSIONS[missionIndex - 1]
  return (save.completed[prev.id] || 0) >= 80
}

export function useGame() {
  const [save, setSave] = useState(load)

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(save))
  }, [save])

  const addXp = useCallback((amount) => {
    setSave((s) => ({ ...s, xp: s.xp + amount }))
  }, [])

  // Enregistre le résultat d'un boss : meilleur score, XP & badge si réussi (>=80%)
  const finishMission = useCallback((mission, scorePercent) => {
    setSave((s) => {
      const prevBest = s.completed[mission.id] || 0
      const isNewBest = scorePercent > prevBest
      const passed = scorePercent >= 80
      const alreadyHadBadge = s.badges.includes(mission.badge?.name)
      let xpGain = 0
      // XP de quête uniquement à la première réussite, sinon petit bonus de rejeu
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

  const recordFlash = useCallback((missionId, index, known) => {
    setSave((s) => {
      const key = `${missionId}:${index}`
      const cur = s.flashStats[key] || { seen: 0, known: 0 }
      return {
        ...s,
        flashStats: {
          ...s.flashStats,
          [key]: { seen: cur.seen + 1, known: cur.known + (known ? 1 : 0) },
        },
      }
    })
  }, [])

  const reset = useCallback(() => {
    if (typeof window !== 'undefined' && !window.confirm('Réinitialiser toute la progression ?')) return
    localStorage.removeItem(STORAGE_KEY)
    setSave({ ...emptySave, createdAt: Date.now() })
  }, [])

  return { save, addXp, finishMission, recordFlash, reset }
}
