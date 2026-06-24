import React, { createContext, useCallback, useContext, useRef, useState } from 'react'

const ToastCtx = createContext(() => {})

export function useToast() {
  return useContext(ToastCtx)
}

export function ToastProvider({ children }) {
  const [toasts, setToasts] = useState([])
  const idRef = useRef(0)
  const lastSaveRef = useRef(0)

  const push = useCallback((toast) => {
    // Anti-spam pour les toasts de sauvegarde (max 1 / 2,5 s).
    if (toast.kind === 'save') {
      const now = Date.now()
      if (now - lastSaveRef.current < 2500) return
      lastSaveRef.current = now
    }
    const id = ++idRef.current
    const duration = toast.duration ?? (toast.kind === 'save' ? 1600 : 3200)
    setToasts((t) => [...t, { id, ...toast }])
    setTimeout(() => setToasts((t) => t.filter((x) => x.id !== id)), duration)
  }, [])

  return (
    <ToastCtx.Provider value={push}>
      {children}
      <div className="toast-stack" aria-live="polite">
        {toasts.map((t) => (
          <div key={t.id} className={`toast toast-${t.kind || 'info'}`}>
            <span className="toast-icon">{t.icon || '✓'}</span>
            <div className="toast-body">
              {t.title && <strong>{t.title}</strong>}
              <span>{t.message}</span>
            </div>
          </div>
        ))}
      </div>
    </ToastCtx.Provider>
  )
}
