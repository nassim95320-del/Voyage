// Moteur audio ODONTIA — 100 % Web Audio API (sons synthétisés, aucun fichier externe).
// Singleton léger : l'AudioContext est créé/réveillé au premier geste utilisateur.

let ctx = null
let masterGain = null
let muted = false
const listeners = new Set()

function ensureCtx() {
  if (typeof window === 'undefined') return null
  if (!ctx) {
    const AC = window.AudioContext || window.webkitAudioContext
    if (!AC) return null
    ctx = new AC()
    masterGain = ctx.createGain()
    masterGain.gain.value = 0.9
    masterGain.connect(ctx.destination)
  }
  if (ctx.state === 'suspended') ctx.resume()
  return ctx
}

function notify() {
  listeners.forEach((l) => l(muted))
}

// Brique de base : une note simple avec enveloppe ADSR minimale.
function tone({ freq = 440, type = 'sine', start = 0, dur = 0.15, gain = 0.2, slideTo = null }) {
  const c = ensureCtx()
  if (!c || muted) return
  const t0 = c.currentTime + start
  const osc = c.createOscillator()
  const g = c.createGain()
  osc.type = type
  osc.frequency.setValueAtTime(freq, t0)
  if (slideTo) osc.frequency.exponentialRampToValueAtTime(slideTo, t0 + dur)
  g.gain.setValueAtTime(0.0001, t0)
  g.gain.exponentialRampToValueAtTime(gain, t0 + 0.012)
  g.gain.exponentialRampToValueAtTime(0.0001, t0 + dur)
  osc.connect(g)
  g.connect(masterGain)
  osc.start(t0)
  osc.stop(t0 + dur + 0.02)
}

// Bruit filtré (utile pour le « flip » de carte).
function noise({ start = 0, dur = 0.12, gain = 0.15, type = 'highpass', freq = 1200 }) {
  const c = ensureCtx()
  if (!c || muted) return
  const t0 = c.currentTime + start
  const frames = Math.floor(c.sampleRate * dur)
  const buffer = c.createBuffer(1, frames, c.sampleRate)
  const data = buffer.getChannelData(0)
  for (let i = 0; i < frames; i++) data[i] = (Math.random() * 2 - 1) * (1 - i / frames)
  const src = c.createBufferSource()
  src.buffer = buffer
  const filter = c.createBiquadFilter()
  filter.type = type
  filter.frequency.value = freq
  const g = c.createGain()
  g.gain.setValueAtTime(gain, t0)
  g.gain.exponentialRampToValueAtTime(0.0001, t0 + dur)
  src.connect(filter)
  filter.connect(g)
  g.connect(masterGain)
  src.start(t0)
  src.stop(t0 + dur)
}

const SFX = {
  click: () => tone({ freq: 520, type: 'triangle', dur: 0.08, gain: 0.12 }),
  nav: () => tone({ freq: 380, type: 'sine', dur: 0.1, gain: 0.12, slideTo: 600 }),
  flip: () => { noise({ dur: 0.1, gain: 0.18, freq: 1600 }); tone({ freq: 300, type: 'square', dur: 0.05, gain: 0.04 }) },
  correct: () => { tone({ freq: 660, type: 'sine', dur: 0.12, gain: 0.18 }); tone({ freq: 880, type: 'sine', start: 0.1, dur: 0.18, gain: 0.18 }) },
  wrong: () => { tone({ freq: 220, type: 'sawtooth', dur: 0.28, gain: 0.16, slideTo: 110 }) },
  levelup: () => [523, 659, 784, 1047].forEach((f, i) => tone({ freq: f, type: 'triangle', start: i * 0.09, dur: 0.22, gain: 0.16 })),
  badge: () => [880, 1175, 1568].forEach((f, i) => tone({ freq: f, type: 'sine', start: i * 0.06, dur: 0.2, gain: 0.14 })),
  victory: () => {
    [392, 523, 659, 784].forEach((f, i) => tone({ freq: f, type: 'triangle', start: i * 0.12, dur: 0.3, gain: 0.18 }))
    tone({ freq: 1047, type: 'sine', start: 0.48, dur: 0.5, gain: 0.2 })
  },
  save: () => tone({ freq: 740, type: 'sine', dur: 0.07, gain: 0.06 }),
}

export const audio = {
  play(name) {
    const fn = SFX[name]
    if (fn) fn()
  },
  isMuted: () => muted,
  setMuted(value) {
    muted = !!value
    notify()
  },
  toggle() {
    muted = !muted
    if (!muted) ensureCtx() // réveille le contexte sur ré-activation
    notify()
    if (!muted) SFX.click()
    return muted
  },
  subscribe(fn) {
    listeners.add(fn)
    return () => listeners.delete(fn)
  },
  init(initialMuted) {
    muted = !!initialMuted
  },
}
