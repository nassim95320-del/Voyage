import React, { useEffect, useRef, useState } from 'react'
import { MISSIONS } from './data/missions.js'
import { useGame, gradeForXp } from './useGame.js'
import { useAudio } from './useAudio.js'
import { audio } from './audio.js'
import HUD from './components/HUD.jsx'
import WorldMap from './components/WorldMap.jsx'
import MissionView from './components/MissionView.jsx'
import Badges from './components/Badges.jsx'
import Confetti from './components/Confetti.jsx'
import { useToast } from './components/Toast.jsx'

export default function App() {
  const { save, savedTick, finishMission, reviewCard, getCard, setMuted, reset } = useGame()
  const { muted, toggle, play } = useAudio()
  const pushToast = useToast()

  const [activeMissionId, setActiveMissionId] = useState(null)
  const [showBadges, setShowBadges] = useState(false)
  const [confettiTick, setConfettiTick] = useState(0)
  const fireConfetti = () => setConfettiTick((t) => t + 1)

  const activeMission = MISSIONS.find((m) => m.id === activeMissionId) || null

  // Synchronise le moteur audio avec le réglage sauvegardé.
  useEffect(() => { audio.setMuted(save.settings?.muted ?? false) }, [save.settings?.muted])

  const handleToggleMute = () => {
    const m = toggle()
    setMuted(m)
  }

  // Toast discret à chaque sauvegarde automatique.
  useEffect(() => {
    if (savedTick === 0) return
    pushToast({ kind: 'save', icon: '💾', message: 'Progression sauvegardée' })
    play('save')
  }, [savedTick]) // eslint-disable-line

  // Détection de montée de grade → confettis + son + toast.
  const prevGrade = useRef(gradeForXp(save.xp).lvl)
  useEffect(() => {
    const g = gradeForXp(save.xp)
    if (g.lvl > prevGrade.current) {
      prevGrade.current = g.lvl
      fireConfetti()
      play('levelup')
      pushToast({ kind: 'levelup', icon: g.icon, title: 'Niveau supérieur !', message: `Tu es désormais ${g.title}`, duration: 4200 })
    }
  }, [save.xp]) // eslint-disable-line

  // Détection de nouveau badge → confettis + son + toast.
  const prevBadges = useRef(save.badges.length)
  useEffect(() => {
    if (save.badges.length > prevBadges.current) {
      const newest = save.badges[save.badges.length - 1]
      prevBadges.current = save.badges.length
      fireConfetti()
      play('badge')
      pushToast({ kind: 'badge', icon: '🏅', title: 'Badge débloqué !', message: newest, duration: 4200 })
    } else {
      prevBadges.current = save.badges.length
    }
  }, [save.badges.length]) // eslint-disable-line

  return (
    <div className="app">
      <Confetti trigger={confettiTick} />

      <HUD
        save={save}
        muted={muted}
        onToggleMute={handleToggleMute}
        onHome={() => { play('click'); setActiveMissionId(null) }}
        onOpenBadges={() => { play('nav'); setShowBadges(true) }}
        onReset={reset}
      />

      <main className="content">
        {activeMission ? (
          <MissionView
            mission={activeMission}
            save={save}
            onBack={() => setActiveMissionId(null)}
            onFinishMission={finishMission}
            getCard={getCard}
            onReview={reviewCard}
            playSound={play}
          />
        ) : (
          <WorldMap save={save} onOpen={setActiveMissionId} playSound={play} />
        )}
      </main>

      {showBadges && <Badges save={save} onClose={() => { play('click'); setShowBadges(false) }} />}

      <footer className="footer">
        ODONTIA — Les Gardiens de l'Émail · contenu d'après le CM6 UE2 « Lésions carieuses ».
        Progression et révisions sauvegardées dans ce navigateur.
      </footer>
    </div>
  )
}
