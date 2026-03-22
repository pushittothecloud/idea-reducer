import { Session } from './types'

const STORAGE_KEY = 'ideaReducer_session'

export const storage = {
  saveSession: (session: Session) => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(session))
  },

  loadSession: (): Session | null => {
    const data = localStorage.getItem(STORAGE_KEY)
    return data ? JSON.parse(data) : null
  },

  clearSession: () => {
    localStorage.removeItem(STORAGE_KEY)
  },

  createNewSession: (): Session => {
    return {
      id: Math.random().toString(36).slice(2, 9),
      problem: '',
      emotion: '',
      who: '',
      when: '',
      ideas: [],
      selectedIdeas: [],
      mode: 'clarify',
      focusedIdeaId: null,
      createdAt: Date.now(),
      updatedAt: Date.now(),
    }
  },
}
