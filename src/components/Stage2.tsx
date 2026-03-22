import React, { useState } from 'react'
import { Session, Idea } from '../types'

interface Stage2Props {
  session: Session
  onUpdate: (session: Session) => void
  onNext: () => void
  onBack: () => void
}

const promptTemplates = [
  {
    emoji: '🎯',
    title: 'Help reduce frustration using automation?',
    desc: 'Focus on removing manual effort or repetitive tasks',
  },
  {
    emoji: '⚡',
    title: 'How could we make this feel rewarding?',
    desc: 'Focus on positive emotion or quick wins',
  },
  {
    emoji: '👥',
    title: 'Different user or audience to target?',
    desc: 'Shift perspective to a different group',
  },
  {
    emoji: '🔧',
    title: 'Using a different tool or process?',
    desc: 'Try a completely different approach',
  },
]

export const Stage2: React.FC<Stage2Props> = ({ session, onUpdate, onNext, onBack }) => {
  const [showManualInput, setShowManualInput] = useState(false)
  const [manualIdea, setManualIdea] = useState({ name: '', oneLiner: '' })

  const addManualIdea = () => {
    if (manualIdea.name.trim()) {
      const newIdea: Idea = {
        id: Math.random().toString(36).slice(2, 9),
        name: manualIdea.name,
        oneLiner: manualIdea.oneLiner,
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

      setManualIdea({ name: '', oneLiner: '' })
    }
  }

  return (
    <div className="stage-container">
      <div className="stage-header">
        <div className="stage-number">🌱 Stage 2</div>
        <h1>Generate Ideas</h1>
        <p style={{ marginBottom: 0 }}>Pick a prompt or manually add ideas</p>
      </div>

      {session.ideas.length > 0 && (
        <div className="alert alert-success mb-6">
          ✓ You have {session.ideas.length} idea{session.ideas.length !== 1 ? 's' : ''} so far
        </div>
      )}

      <div style={{ marginBottom: '2rem' }}>
        <p style={{ fontSize: '0.875rem', color: '#718096', marginBottom: '1rem' }}>
          Try one of these prompts (copy into ChatGPT or Claude):
        </p>
        <div className="grid grid-2">
          {promptTemplates.map((prompt, idx) => (
            <div key={idx} className="card">
              <div className="card-header">{prompt.emoji} {prompt.title}</div>
              <p className="card-description">{prompt.desc}</p>
              <button className="btn-secondary btn-small" onClick={() => alert('Copy to clipboard:\n\nProblem: ' + session.problem + '\n\n' + prompt.title)}>
                📋 Copy Prompt
              </button>
            </div>
          ))}
        </div>
      </div>

      <div style={{ borderTop: '2px solid #e2e8f0', paddingTop: '2rem' }}>
        <h3>Or add ideas manually</h3>
        
        {!showManualInput ? (
          <button className="btn-secondary" onClick={() => setShowManualInput(true)}>
            + Add Idea Manually
          </button>
        ) : (
          <div className="flex flex-col gap-4">
            <div>
              <label htmlFor="idea-name">Idea Name</label>
              <input
                id="idea-name"
                type="text"
                value={manualIdea.name}
                onChange={(e) => setManualIdea({ ...manualIdea, name: e.target.value })}
                placeholder="e.g., Async Decision Doc"
              />
            </div>

            <div>
              <label htmlFor="idea-liner">One-liner</label>
              <input
                id="idea-liner"
                type="text"
                value={manualIdea.oneLiner}
                onChange={(e) => setManualIdea({ ...manualIdea, oneLiner: e.target.value })}
                placeholder="How does this help?"
              />
            </div>

            <div className="button-group gap-4">
              <button className="btn-primary" onClick={addManualIdea}>
                + Add Idea
              </button>
              <button className="btn-secondary" onClick={() => setShowManualInput(false)}>
                Cancel
              </button>
            </div>
          </div>
        )}
      </div>

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
