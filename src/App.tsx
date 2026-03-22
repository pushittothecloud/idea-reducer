import React, { useState, useEffect } from 'react'
import { Session } from './types'
import { storage } from './storage'
import { Stage1 } from './components/Stage1'
import { Stage2 } from './components/Stage2'
import { Stage3 } from './components/Stage3'
import { Stage4 } from './components/Stage4'
import { Stage5 } from './components/Stage5'
import { Stage6 } from './components/Stage6'

function App() {
  const [session, setSession] = useState<Session | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Load session from localStorage
    const loaded = storage.loadSession()
    if (loaded) {
      setSession(loaded)
    } else {
      setSession(storage.createNewSession())
    }
    setLoading(false)
  }, [])

  useEffect(() => {
    // Auto-save to localStorage whenever session changes
    if (session) {
      storage.saveSession(session)
    }
  }, [session])

  if (loading || !session) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh' }}>
        <p>Loading...</p>
      </div>
    )
  }

  const goToStage = (mode: Session['mode']) => {
    setSession({ ...session, mode, focusedIdeaId: null })
  }

  const goToNextStage = () => {
    const stageOrder: Array<Session['mode']> = ['clarify', 'generate', 'list', 'focus', 'reduce', 'prioritize']
    const currentIndex = stageOrder.indexOf(session.mode)
    if (currentIndex < stageOrder.length - 1) {
      const nextMode = stageOrder[currentIndex + 1]
      if (nextMode === 'focus' && session.ideas.length > 0) {
        // Auto-select first idea for focus mode if not already set
        if (!session.focusedIdeaId) {
          setSession({ ...session, mode: nextMode, focusedIdeaId: session.ideas[0].id })
        } else {
          setSession({ ...session, mode: nextMode })
        }
      } else {
        setSession({ ...session, mode: nextMode })
      }
    }
  }

  const goToPrevStage = () => {
    const stageOrder: Array<Session['mode']> = ['clarify', 'generate', 'list', 'focus', 'reduce', 'prioritize']
    const currentIndex = stageOrder.indexOf(session.mode)
    if (currentIndex > 0) {
      const prevMode = stageOrder[currentIndex - 1]
      setSession({ ...session, mode: prevMode, focusedIdeaId: null })
    }
  }

  const handleFocusIdea = (ideaId: string) => {
    setSession({ ...session, mode: 'focus', focusedIdeaId: ideaId })
  }

  const handleNewSession = () => {
    if (confirm('Start a new session? Your current session will be saved.')) {
      const newSession = storage.createNewSession()
      setSession(newSession)
      goToStage('clarify')
    }
  }

  return (
    <div style={{ minHeight: '100vh', paddingBottom: '2rem' }}>
      <div style={{ maxWidth: '100%', backgroundColor: '#fff', borderBottom: '2px solid #e2e8f0' }}>
        <div className="container" style={{ paddingTop: '1rem', paddingBottom: '1rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <h2 style={{ marginBottom: 0 }}>🧠 Idea Reducer</h2>
            <button className="btn-secondary btn-small" onClick={handleNewSession}>
              + New Session
            </button>
          </div>
          <p style={{ fontSize: '0.875rem', color: '#718096', marginBottom: 0 }}>
            Reduce → Structure → Decide
          </p>
        </div>
      </div>

      <div className="container" style={{ paddingTop: '2rem' }}>
        {session.mode === 'clarify' && (
          <Stage1
            session={session}
            onUpdate={setSession}
            onNext={goToNextStage}
          />
        )}

        {session.mode === 'generate' && (
          <Stage2
            session={session}
            onUpdate={setSession}
            onNext={goToNextStage}
            onBack={goToPrevStage}
          />
        )}

        {session.mode === 'list' && (
          <Stage3
            session={session}
            onUpdate={setSession}
            onFocusIdea={handleFocusIdea}
            onNext={goToNextStage}
            onBack={goToPrevStage}
          />
        )}

        {session.mode === 'focus' && (
          <Stage4
            session={session}
            onUpdate={setSession}
            onNext={() => setSession({ ...session, mode: 'reduce', focusedIdeaId: null })}
            onBack={() => setSession({ ...session, mode: 'list' })}
          />
        )}

        {session.mode === 'reduce' && (
          <Stage5
            session={session}
            onUpdate={setSession}
            onNext={goToNextStage}
            onBack={goToPrevStage}
          />
        )}

        {session.mode === 'prioritize' && (
          <Stage6
            session={session}
            onUpdate={setSession}
            onBack={goToPrevStage}
          />
        )}
      </div>
    </div>
  )
}

export default App
