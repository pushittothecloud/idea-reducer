# 🧠 Idea Reducer

A guided thinking system that helps you reduce bad ideas, structure good ones, and make better decisions.

**Reduce → Structure → Decide**

## 🎯 What It Does

Instead of generating endless ideas, Idea Reducer:

1. **Clarifies** your problem (+ emotion)
2. **Generates** guided ideas (5+ options)
3. **Tiles** all ideas for easy review
4. **Branches** ideas (expand in dimensions)
5. **Forces** you to pick your top 3
6. **Prioritizes** by effort vs value

All data saves locally—no backend needed.

---

## 🚀 Quick Start

### Install & Run

```bash
npm install
npm run dev
```

Open [http://localhost:5173/](http://localhost:5173/)

### Build for Production

```bash
npm run build
```

Creates optimized files in `dist/` folder.

---

## 🌐 Deploy to GitHub Pages

### 1. Create a GitHub Repository

```bash
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/idea-reducer.git
git push -u origin main
```

### 2. Update `vite.config.ts` (if needed)

For a **project site** (e.g., `github.com/YOUR_USERNAME/idea-reducer`):

```typescript
export default defineConfig({
  plugins: [react()],
  base: '/idea-reducer/', // Change to repo name
})
```

For a **user/org site** (e.g., `github.com/YOUR_USERNAME.github.io`):

```typescript
export default defineConfig({
  plugins: [react()],
  base: '/',
})
```

### 3. Enable GitHub Pages

1. Go to your repo → **Settings**
2. Scroll to **Pages**
3. Source: Select **Deploy from a branch**
4. Branch: Select **main** (or your branch) + `/root` folder
5. Save

### 4. Deploy

```bash
npm run build
npm run deploy
```

Your app will be live at:
- **Project site**: `https://YOUR_USERNAME.github.io/idea-reducer/`
- **User site**: `https://YOUR_USERNAME.github.io/`

---

## 📁 Project Structure

```
src/
├── main.tsx          # Entry point
├── App.tsx           # Main component & stage orchestration
├── types.ts          # TypeScript interfaces
├── storage.ts        # localStorage utilities
├── index.css         # Base styles
└── components/
    ├── Stage1.tsx    # Problem Clarification
    ├── Stage2.tsx    # Idea Generation
    ├── Stage3.tsx    # Idea Tiles (List View)
    ├── Stage4.tsx    # Branching (Focus Mode)
    ├── Stage5.tsx    # Top-3 Selection
    └── Stage6.tsx    # Effort/Value Matrix
```

---

## 🔄 Data Model

### Session
```typescript
{
  id: string                    // Unique session ID
  problem: string               // Main problem
  emotion: string               // Frustration/driver
  who: string                   // Who experiences it
  when: string                  // When it happens
  ideas: Idea[]                 // All ideas
  selectedIdeas: string[]       // Top-3 selected
  mode: 'clarify' | 'generate' | 'list' | 'focus' | 'reduce' | 'prioritize'
  focusedIdeaId: string | null  // Currently focused for branching
  createdAt: number             // Timestamp
  updatedAt: number             // Last update
}
```

### Idea
```typescript
{
  id: string
  name: string
  oneLiner: string
  branches: Branch[]
  selected: boolean
  effortScore: 1-5
  valueScore: 1-5
}
```

### Branch
```typescript
{
  id: string
  name: string
  description: string
}
```

---

## 💾 Local Storage

Everything saves automatically to `localStorage['ideaReducer_session']`.

### Clear Data
```javascript
localStorage.removeItem('ideaReducer_session')
location.reload()
```

---

## 🛠️ Tech Stack

- **Vite** - Fast build tool
- **React 18** - UI framework
- **TypeScript** - Type safety
- **CSS** - Custom styling (no Tailwind)
- **localStorage** - Client-side persistence

---

## 📝 Next Steps

### Future Features
- [ ] Export to PDF / Markdown
- [ ] Share sessions via URL
- [ ] AI prompt cards (ChatGPT/Claude)
- [ ] Dark mode
- [ ] Import existing ideas
- [ ] Collaboration (comments on ideas)

### Contributing
Feel free to fork, enhance, and deploy your own version!

---

## 📄 License

MIT

---

## 💡 How to Use

### Stage 1: Clarify (3-5 min)
Write: problem + emotion + who + when

### Stage 2: Generate (5-10 min)
Paste prompts into ChatGPT/Claude OR add ideas manually

### Stage 3: Review (5 min)
See all ideas as tiles, branch any idea you want

### Stage 4: Branch (10-20 min)
Expand 1 idea at a time (simpler, cheaper, different user, more engaging)

### Stage 5: Reduce (5 min)
Force yourself to pick exactly 3 ideas

### Stage 6: Prioritize (10 min)
Adjust effort/value sliders, find quick wins

**Total: 40-60 minutes for a complete ideation → prioritization cycle**

---

Made with 🧠 + ⚡
