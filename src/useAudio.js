import { useSyncExternalStore } from 'react'
import { audio } from './audio.js'

// Expose l'état "muet" de façon réactive + les actions audio.
export function useAudio() {
  const muted = useSyncExternalStore(
    (cb) => audio.subscribe(cb),
    () => audio.isMuted(),
    () => true,
  )
  return {
    muted,
    toggle: () => audio.toggle(),
    play: (name) => audio.play(name),
  }
}
