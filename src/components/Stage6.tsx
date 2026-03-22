import React from 'react'
import { Session } from '../types'

interface Stage6Props {
  session: Session
  onUpdate: (session: Session) => void
  onBack: () => void
}

export const Stage6: React.FC<Stage6Props> = ({ session, onUpdate, onBack }) => {
  const selectedIdeas = session.ideas.filter((i) => session.selectedIdeas.includes(i.id))

  const updateScore = (ideaId: string, field: 'effortScore' | 'valueScore', value: number) => {
    onUpdate({
      ...session,
      ideas: session.ideas.map((i) =>
        i.id === ideaId ? { ...i, [field]: value } : i
      ),
      updatedAt: Date.now(),
    })
  }

  // Sort by value/effort ratio (high value, low effort = quick wins)
  const sortedIdeas = [...selectedIdeas].sort((a, b) => {
    const aScore = a.valueScore / a.effortScore
    const bScore = b.valueScore / b.effortScore
    return bScore - aScore
  })

  return (
    <div className="stage-container">
      <div className="stage-header">
        <div className="stage-number">⚖️ Stage 6</div>
        <h1>Prioritize</h1>
        <p style={{ marginBottom: 0 }}>Effort vs Value Matrix</p>
      </div>

      <div style={{ marginBottom: '2rem' }}>
        <h3>Adjust Scores (1 = Low, 5 = High)</h3>
        <div className="flex flex-col gap-4">
          {selectedIdeas.map((idea) => (
            <div key={idea.id} className="card">
              <div className="card-header">{idea.name}</div>
              <p style={{ fontSize: '0.875rem', color: '#718096', marginBottom: '1rem' }}>
                {idea.oneLiner}
              </p>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                <div>
                  <label style={{ fontSize: '0.875rem', marginBottom: '0.5rem' }} htmlFor={`effort-${idea.id}`}>
                    Effort: {idea.effortScore}
                  </label>
                  <input
                    id={`effort-${idea.id}`}
                    type="range"
                    min="1"
                    max="5"
                    value={idea.effortScore}
                    onChange={(e) => updateScore(idea.id, 'effortScore', parseInt(e.target.value))}
                    style={{ width: '100%' }}
                  />
                </div>

                <div>
                  <label style={{ fontSize: '0.875rem', marginBottom: '0.5rem' }} htmlFor={`value-${idea.id}`}>
                    Value: {idea.valueScore}
                  </label>
                  <input
                    id={`value-${idea.id}`}
                    type="range"
                    min="1"
                    max="5"
                    value={idea.valueScore}
                    onChange={(e) => updateScore(idea.id, 'valueScore', parseInt(e.target.value))}
                    style={{ width: '100%' }}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div style={{ borderTop: '2px solid #e2e8f0', paddingTop: '2rem', marginBottom: '2rem' }}>
        <h3>🎯 Quick Wins (High Value, Low Effort)</h3>
        <div className="flex flex-col gap-2">
          {sortedIdeas
            .filter((i) => i.valueScore >= 4 && i.effortScore <= 2)
            .map((idea) => (
              <div key={idea.id} style={{ padding: '1rem', backgroundColor: '#f0fff4', border: '2px solid #48bb78', borderRadius: '0.5rem' }}>
                <div className="card-header" style={{ color: '#22543d', marginBottom: '0.25rem' }}>
                  ⭐ {idea.name}
                </div>
                <p style={{ color: '#22543d', fontSize: '0.875rem', marginBottom: 0 }}>
                  Start here! Effort: {idea.effortScore}, Value: {idea.valueScore}
                </p>
              </div>
            ))}
          {sortedIdeas.filter((i) => i.valueScore >= 4 && i.effortScore <= 2).length === 0 && (
            <p style={{ color: '#718096' }}>No quick wins yet. Adjust the scores to find them.</p>
          )}
        </div>
      </div>

      <div style={{ borderTop: '2px solid #e2e8f0', paddingTop: '2rem' }}>
        <h3>Ranked by Value/Effort</h3>
        <div className="flex flex-col gap-2">
          {sortedIdeas.map((idea, idx) => {
            const quickWin = idea.valueScore >= 4 && idea.effortScore <= 2
            return (
              <div
                key={idea.id}
                style={{
                  padding: '1rem',
                  backgroundColor: quickWin ? '#f0fff4' : 'white',
                  border: '2px solid ' + (quickWin ? '#48bb78' : '#e2e8f0'),
                  borderRadius: '0.5rem',
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div>
                    <div className="card-header" style={{ marginBottom: '0.25rem' }}>
                      {idx + 1}. {idea.name} {quickWin && '⭐'}
                    </div>
                    <p style={{ fontSize: '0.875rem', color: '#718096', marginBottom: 0 }}>
                      Effort: {idea.effortScore}/5 | Value: {idea.valueScore}/5
                    </p>
                  </div>
                  <div style={{ textAlign: 'center' }}>
                    <div style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#4299e1' }}>
                      {(idea.valueScore / idea.effortScore).toFixed(1)}x
                    </div>
                    <p style={{ fontSize: '0.75rem', color: '#718096' }}>ratio</p>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>

      <div className="button-group" style={{ marginTop: '3rem' }}>
        <button className="btn-secondary" onClick={onBack}>
          ← Back
        </button>
        <button className="btn-success" onClick={() => alert('✓ Session saved! Share your results or start a new session.')}>
          ✓ Done
        </button>
      </div>
    </div>
  )
}
