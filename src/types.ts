export interface Idea {
  id: string
  name: string
  oneLiner: string
  branches: Branch[]
  selected: boolean
  effortScore: number
  valueScore: number
}

export interface Branch {
  id: string
  name: string
  description: string
}

export interface Session {
  id: string
  problem: string
  emotion: string
  who: string
  when: string
  ideas: Idea[]
  selectedIdeas: string[]
  mode: 'clarify' | 'generate' | 'list' | 'focus' | 'reduce' | 'prioritize'
  focusedIdeaId: string | null
  createdAt: number
  updatedAt: number
}
