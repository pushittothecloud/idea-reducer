import React, { useState } from 'react'
import { Session, Branch } from '../types'

interface Stage4Props {
  session: Session
  onUpdate: (session: Session) => void
  onBack: () => void
  onNext: () => void
}

const branchSuggestions = [
  { emoji: '✨', text: 'Make it simpler' },
  { emoji: '💰', text: 'Make it cheaper' },
  { emoji: '👥', text: 'Target different user' },
  { emoji: '⚡', text: 'Make it more engaging' },
]

export const Stage4: React.FC<Stage4Props> = ({ session, onUpdate, onBack, onNext }) => {
  const focusedIdea = session.focusedIdeaId ? session.ideas.find((i) => i.id === session.focusedIdeaId) : null
  const [newBranch, setNewBranch] = useState({ name: '', description: '' })

  if (!focusedIdea) {
    return (
      <div className="stage-container">
        <p>No idea selected. Please go back.</p>
        <button className="btn-primary" onClick={onBack}>
          ← Back
        </button>
      </div>
    )
  }

  const addBranch = () => {
    if (newBranch.name.trim()) {
      const branch: Branch = {
        id: Math.random().toString(36).slice(2, 9),
        name: newBranch.name,
        description: newBranch.description,
      }

      onUpdate({
        ...session,
        ideas: session.ideas.map((i) =>
          i.id === focusedIdea.id ? { ...i, branches: [...i.branches, branch] } : i
        ),
        updatedAt: Date.now(),
      })

      setNewBranch({ name: '', description: '' })
    }
  }

  const deleteBranch = (branchId: string) => {
    onUpdate({
      ...session,
      ideas: session.ideas.map((i) =>
        i.id === focusedIdea.id
          ? { ...i, branches: i.branches.filter((b) => b.id !== branchId) }
          : i
      ),
      updatedAt: Date.now(),
    })
  }

  return (
    <div className="stage-container">
      <div className="stage-header">
        <div className="stage-number">🌳 Stage 4</div>
        <h1>Expand: {focusedIdea.name}</h1>
        <p style={{ marginBottom: 0 }}>Add dimensions to grow this idea</p>
      </div>

      <div className="card mb-6" style={{ backgroundColor: '#f7fafc', border: '2px solid #4299e1' }}>
        <p style={{ color: '#2d3748', marginBottom: 0 }}>{focusedIdea.oneLiner}</p>
      </div>

      {focusedIdea.branches.length > 0 && (
        <div style={{ marginBottom: '2rem' }}>
          <h3>Current Branches</h3>
          <div className="flex flex-col gap-3">
            {focusedIdea.branches.map((branch) => (
              <div key={branch.id} className="card p-4">
                <div className="flex justify-between items-center">
                  <div>
                    <div className="card-header" style={{ marginBottom: '0.25rem' }}>
                      {branch.name}
                    </div>
                    {branch.description && <p className="card-description">{branch.description}</p>}
                  </div>
                  <button
                    className="btn-secondary btn-small"
                    style={{ color: '#e53e3e' }}
                    onClick={() => deleteBranch(branch.id)}
                  >
                    🗑️
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      <div style={{ borderTop: '2px solid #e2e8f0', paddingTop: '2rem', marginBottom: '2rem' }}>
        <h3>Suggested Directions</h3>
        <p style={{ fontSize: '0.875rem', color: '#718096', marginBottom: '1rem' }}>
          Copy a prompt into ChatGPT/Claude:
        </p>
        <div className="flex flex-col gap-2">
          {branchSuggestions.map((sugg, idx) => (
            <button
              key={idx}
              className="card"
              style={{
                background: 'white',
                textAlign: 'left',
                padding: '1rem',
                border: '2px solid #e2e8f0',
                cursor: 'pointer',
                transition: 'all 0.2s',
              }}
              onClick={() => alert('Copy to ChatGPT:\n\n' + sugg.text + ' the solution "' + focusedIdea.name + '"')}
              onMouseEnter={(e) => (e.currentTarget.style.borderColor = '#4299e1')}
              onMouseLeave={(e) => (e.currentTarget.style.borderColor = '#e2e8f0')}
            >
              {sugg.emoji} {sugg.text}
            </button>
          ))}
        </div>
      </div>

      <div style={{ borderTop: '2px solid #e2e8f0', paddingTop: '2rem' }}>
        <h3>Add Branch Manually</h3>
        <div className="flex flex-col gap-4">
          <div>
            <label htmlFor="branch-name">Branch Name</label>
            <input
              id="branch-name"
              type="text"
              value={newBranch.name}
              onChange={(e) => setNewBranch({ ...newBranch, name: e.target.value })}
              placeholder="e.g., Use Google Doc template"
            />
          </div>

          <div>
            <label htmlFor="branch-desc">Description (optional)</label>
            <textarea
              id="branch-desc"
              value={newBranch.description}
              onChange={(e) => setNewBranch({ ...newBranch, description: e.target.value })}
              placeholder="How would this work?"
            />
          </div>

          <button
            className="btn-success"
            onClick={addBranch}
            disabled={!newBranch.name.trim()}
            style={{ opacity: newBranch.name.trim() ? 1 : 0.5 }}
          >
            + Add Branch
          </button>
        </div>
      </div>

      <div className="button-group" style={{ marginTop: '3rem' }}>
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
