import React from 'react'
import { Session } from '../types'

interface Stage5Props {
  session: Session
  onUpdate: (session: Session) => void
  onNext: () => void
  onBack: () => void
}

export const Stage5: React.FC<Stage5Props> = ({ session, onUpdate, onNext, onBack }) => {
  const toggleSelection = (ideaId: string) => {
    const isSelected = session.selectedIdeas.includes(ideaId)
    let newSelected = session.selectedIdeas

    if (isSelected) {
      newSelected = newSelected.filter((id) => id !== ideaId)
    } else {
      if (newSelected.length < 3) {
        newSelected = [...newSelected, ideaId]
      }
    }

    onUpdate({
      ...session,
      selectedIdeas: newSelected,
      ideas: session.ideas.map((i) => ({
        ...i,
        selected: newSelected.includes(i.id),
      })),
      updatedAt: Date.now(),
    })
  }

  const isComplete = session.selectedIdeas.length === 3

  return (
    <div className="stage-container">
      <div className="stage-header">
        <div className="stage-number">🎯 Stage 5</div>
        <h1>Pick Your Top 3</h1>
        <p style={{ marginBottom: 0 }}>You must choose exactly 3 to continue</p>
      </div>

      <div className="alert alert-info mb-6">
        Selected: {session.selectedIdeas.length}/3
      </div>

      <div className="flex flex-col gap-3">
        {session.ideas.map((idea) => {
          const isSelected = session.selectedIdeas.includes(idea.id)
          return (
            <div
              key={idea.id}
              style={{
                padding: '1rem',
                border: '2px solid ' + (isSelected ? '#4299e1' : '#e2e8f0'),
                borderRadius: '0.5rem',
                backgroundColor: isSelected ? '#ebf8ff' : 'white',
                cursor:
                  isSelected || session.selectedIdeas.length < 3
                    ? 'pointer'
                    : 'not-allowed',
                transition: 'all 0.2s',
              }}
              onClick={() => {
                if (isSelected || session.selectedIdeas.length < 3) {
                  toggleSelection(idea.id)
                }
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                <input
                  type="checkbox"
                  checked={isSelected}
                  onChange={() => {}}
                  style={{
                    width: '20px',
                    height: '20px',
                    cursor: 'pointer',
                  }}
                />
                <div style={{ flex: 1 }}>
                  <div className="card-header" style={{ marginBottom: '0.25rem' }}>
                    {idea.name}
                  </div>
                  <p className="card-description" style={{ marginBottom: 0 }}>
                    {idea.oneLiner}
                  </p>
                </div>
                {isSelected && <span style={{ fontSize: '1.5rem' }}>✓</span>}
              </div>
            </div>
          )
        })}
      </div>

      {!isComplete && (
        <div className="alert alert-info" style={{ marginTop: '2rem' }}>
          Choose {3 - session.selectedIdeas.length} more idea{3 - session.selectedIdeas.length !== 1 ? 's' : ''}
        </div>
      )}

      <div className="button-group" style={{ marginTop: '3rem' }}>
        <button className="btn-secondary" onClick={onBack}>
          ← Back
        </button>
        <button
          className="btn-primary"
          disabled={!isComplete}
          onClick={onNext}
          style={{ opacity: isComplete ? 1 : 0.5, cursor: isComplete ? 'pointer' : 'not-allowed' }}
        >
          Next →
        </button>
      </div>
    </div>
  )
}
