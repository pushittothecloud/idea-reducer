import { useState } from 'react'
import { Session, Idea } from '../types'

interface Stage2Props {
  session: Session
  onUpdate: (session: Session) => void
  onNext: () => void
  onBack: () => void
}

export const Stage2: React.FC<Stage2Props> = ({ session, onUpdate, onNext, onBack }) => {
  const [ideaName, setIdeaName] = useState('')
  const [ideaOneLiner, setIdeaOneLiner] = useState('')

  const addIdea = () => {
    if (ideaName.trim()) {
      const newIdea: Idea = {
        id: Math.random().toString(36).slice(2, 9),
        name: ideaName,
        oneLiner: ideaOneLiner,
        branches: [],
        selected: false,
        effortScore: 3,
        valueScore: 3,
      }

      onUpdate({
        ...session,
        ideas: [...session.ideas, newIdea],
        updatedAt: Date.now(),
      })

      setIdeaName('')
      setIdeaOneLiner('')
    }
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && ideaName.trim()) {
      addIdea()
    }
  }

  return (
    <div className="stage-container">
      <div className="stage-header">
        <div className="stage-number">🌱 Stage 2</div>
        <h1>Add Your Ideas</h1>
        <p style={{ marginBottom: 0 }}>What could solve {session.problem.toLowerCase()}?</p>
      </div>

      {session.ideas.length > 0 && (
        <div className="alert alert-success mb-6">
          ✓ {session.ideas.length} idea{session.ideas.length !== 1 ? 's' : ''} added
        </div>
      )}

      <div className="flex flex-col gap-4" style={{ marginBottom: '2rem' }}>
        <div>
          <label htmlFor="idea-name">Idea Name *</label>
          <input
            id="idea-name"
            type="text"
            value={ideaName}
            onChange={(e) => setIdeaName(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="e.g., Async Decision Doc"
            autoFocus
          />
        </div>

        <div>
          <label htmlFor="idea-liner">How does it help? (optional)</label>
          <input
            id="idea-liner"
            type="text"
            value={ideaOneLiner}
            onChange={(e) => setIdeaOneLiner(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Brief description"
          />
        </div>

        <button
          className="btn-primary"
          onClick={addIdea}
          disabled={!ideaName.trim()}
          style={{ opacity: ideaName.trim() ? 1 : 0.5, cursor: ideaName.trim() ? 'pointer' : 'not-allowed' }}
        >
          + Add Idea
        </button>
      </div>

      {session.ideas.length > 0 && (
        <div style={{ borderTop: '2px solid #e2e8f0', paddingTop: '2rem' }}>
          <h3>Your Ideas So Far</h3>
          <div className="flex flex-col gap-2">
            {session.ideas.map((idea) => (
              <div key={idea.id} className="card p-4" style={{ backgroundColor: '#f7fafc' }}>
                <div className="card-header" style={{ marginBottom: '0.25rem' }}>
                  {idea.name}
                </div>
                {idea.oneLiner && <p className="card-description" style={{ marginBottom: 0 }}>{idea.oneLiner}</p>}
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="button-group" style={{ marginTop: '3rem' }}>
        <button className="btn-secondary" onClick={onBack}>
          ← Back
        </button>
        <button
          className="btn-primary"
          disabled={session.ideas.length === 0}
          onClick={onNext}
          style={{ opacity: session.ideas.length > 0 ? 1 : 0.5, cursor: session.ideas.length > 0 ? 'pointer' : 'not-allowed' }}
        >
          Next →
        </button>
      </div>
    </div>
  )
}
