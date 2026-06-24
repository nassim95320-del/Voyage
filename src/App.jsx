import React, { useState } from 'react'
import { MISSIONS } from './data/missions.js'
import { useGame } from './useGame.js'
import HUD from './components/HUD.jsx'
import WorldMap from './components/WorldMap.jsx'
import MissionView from './components/MissionView.jsx'
import Badges from './components/Badges.jsx'

export default function App() {
  const { save, finishMission, recordFlash, reset } = useGame()
  const [activeMissionId, setActiveMissionId] = useState(null)
  const [showBadges, setShowBadges] = useState(false)

  const activeMission = MISSIONS.find((m) => m.id === activeMissionId) || null

  return (
    <div className="app">
      <HUD
        save={save}
        onHome={() => setActiveMissionId(null)}
        onReset={reset}
      />

      <button className="trophy-fab" onClick={() => setShowBadges(true)} title="Salle des trophées">
        🏅
      </button>

      <main className="content">
        {activeMission ? (
          <MissionView
            mission={activeMission}
            save={save}
            onBack={() => setActiveMissionId(null)}
            onFinishMission={finishMission}
            onRecordFlash={recordFlash}
          />
        ) : (
          <WorldMap save={save} onOpen={setActiveMissionId} />
        )}
      </main>

      {showBadges && <Badges save={save} onClose={() => setShowBadges(false)} />}

      <footer className="footer">
        ODONTIA — Les Gardiens de l'Émail · contenu d'après le CM6 UE2 « Lésions carieuses ».
        Progression sauvegardée dans ce navigateur.
      </footer>
    </div>
  )
}
