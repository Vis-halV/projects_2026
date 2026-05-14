import { useState } from 'react'
import ShojiLoader from './components/ShojiLoader'

export default function App() {
  const [open, setOpen] = useState(false)

  return (
    <div className="relative grid min-h-full place-items-center p-6">
      <div className="max-w-xl text-center">
        <div className="text-xs uppercase tracking-[0.28em] text-paper/60">
          jav-load
        </div>
        <h1 className="mt-4 text-4xl font-semibold tracking-tight">
          Shoji Loader
        </h1>
        <p className="mt-3 text-sm leading-relaxed text-paper/70">
          Self-contained loading intro: sliding shoji doors → sakura petals →
          title reveal. Click / Enter / Esc to skip.
        </p>
        <button
          className="mt-8 inline-flex items-center justify-center rounded-full bg-paper px-5 py-3 text-sm text-ink transition hover:-translate-y-0.5 active:translate-y-0"
          onClick={() => setOpen(true)}
        >
          Replay Loader
        </button>
      </div>

      <ShojiLoader open={open} onComplete={() => setOpen(false)} />
    </div>
  )
}

