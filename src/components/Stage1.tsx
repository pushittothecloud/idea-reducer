import React from 'react'
import { Session } from '../types'

interface Stage1Props {
  session: Session
  onUpdate: (session: Session) => void
  onNext: () => void
}

export const Stage1: React.FC<Stage1Props> = ({ session, onUpdate, onNext }) => {
  const handleChange = (field: keyof Pick<Session, 'problem' | 'emotion' | 'who' | 'when'>, value: string) => {
    onUpdate({
      ...session,
      [field]: value,
      updatedAt: Date.now(),
    })
  }

  const isComplete = session.problem.trim() && session.emotion.trim() && session.who.trim() && session.when.trim()

  return (
    <div className="stage-container">
      <div className="stage-header">
        <div className="stage-number">🟢 Stage 1</div>
        <h1>What are you working on?</h1>
        <p style={{ marginBottom: 0 }}>Let's clarify the problem and what makes it frustrating</p>
      </div>

      <div className="flex flex-col gap-6">
        <div>
          <label htmlFor="problem">What is the problem?</label>
          <textarea
            id="problem"
            value={session.problem}
            onChange={(e) => handleChange('problem', e.target.value)}
            placeholder="Describe the problem you're trying to solve..."
          />
        </div>

        <div>
          <label htmlFor="emotion">What is most frustrating about this?</label>
          <textarea
            id="emotion"
            value={session.emotion}
            onChange={(e) => handleChange('emotion', e.target.value)}
            placeholder="What emotion does this trigger? (wasted time, unclear, repetitive, etc.)"
          />
        </div>

        <div>
          <label htmlFor="who">Who experiences this?</label>
          <input
            id="who"
            type="text"
            value={session.who}
            onChange={(e) => handleChange('who', e.target.value)}
            placeholder="Your team, managers, customers, etc."
          />
        </div>

        <div>
          <label htmlFor="when">When does it happen?</label>
          <input
            id="when"
            type="text"
            value={session.when}
            onChange={(e) => handleChange('when', e.target.value)}
            placeholder="Weekly meetings, during launch, etc."
          />
        </div>

        <div className="button-group">
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
    </div>
  )
}
