import React, { useState } from 'react'
import { Session, Idea } from '../types'

interface Stage3Props {
  session: Session
  onUpdate: (session: Session) => void
  onFocusIdea: (ideaId: string) => void
  onNext: () => void
  onBack: () => void
}

export const Stage3: React.FC<Stage3Props> = ({ session, onUpdate, onFocusIdea, onNext, onBack }) => {
  const [editingIdea, setEditingIdea] = useState<string | null>(null)

  const deleteIdea = (ideaId: string) => {
    onUpdate({
      ...session,
      ideas: session.ideas.filter((i) => i.id !== ideaId),
      updatedAt: Date.now(),
    })
  }

  const updateIdea = (ideaId: string, updates: Partial<Idea>) => {
    onUpdate({
      ...session,
      ideas: session.ideas.map((i) => (i.id === ideaId ? { ...i, ...updates } : i)),
      updatedAt: Date.now(),
    })
  }

  return (
    <div className="stage-container">
      <div className="stage-header">
        <div className="stage-number">🌿 Stage 3</div>
        <h1>Your Ideas ({session.ideas.length})</h1>
        <p style={{ marginBottom: 0 }}>Review and branch ideas</p>
      </div>

      <div
        className="grid grid-2"
        style={{ marginBottom: '2rem' }}
      >
        {session.ideas.map((idea) => (
          <div key={idea.id} className="card">
            <div>
              {editingIdea === idea.id ? (
                <div className="flex flex-col gap-2">
                  <input
                    type="text"
                    value={idea.name}
                    onChange={(e) => updateIdea(idea.id, { name: e.target.value })}
                    placeholder="Idea name"
                  />
                  <textarea
                    value={idea.oneLiner}
                    onChange={(e) => updateIdea(idea.id, { oneLiner: e.target.value })}
                    placeholder="One-liner"
                    style={{ minHeight: '80px' }}
                  />
                  <button
                    className="btn-secondary btn-small"
                    onClick={() => setEditingIdea(null)}
                  >
                    Done
                  </button>
                </div>
              ) : (
                <>
                  <div className="card-header">{idea.name}</div>
                  <p className="card-description">{idea.oneLiner}</p>
                  {idea.branches.length > 0 && (
                    <p style={{ fontSize: '0.8rem', color: '#4299e1', marginBottom: '1rem' }}>
                      🌱 {idea.branches.length} branch{idea.branches.length !== 1 ? 'es' : ''}
                    </p>
                  )}
                </>
              )}
            </div>

            <div className="flex gap-2" style={{ marginTop: '1rem' }}>
              {editingIdea !== idea.id && (
                <>
                  <button
                    className="btn-secondary btn-small"
                    onClick={() => onFocusIdea(idea.id)}
                  >
                    🌱 Branch
                  </button>
                  <button
                    className="btn-secondary btn-small"
                    onClick={() => setEditingIdea(idea.id)}
                  >
                    ✏️ Edit
                  </button>
                  <button
                    className="btn-secondary btn-small"
                    style={{ color: '#e53e3e' }}
                    onClick={() => deleteIdea(idea.id)}
                  >
                    🗑️
                  </button>
                </>
              )}
            </div>
          </div>
        ))}
      </div>

      <div className="button-group">
        <button className="btn-secondary" onClick={onBack}>
          ← Back
        </button>
        <button className="btn-primary" onClick={onNext}>
          Next →
        </button>
      </div>
    </div>
  )
}
