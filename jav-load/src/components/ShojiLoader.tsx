import { useEffect, useMemo, useRef, useState } from 'react'
import gsap from 'gsap'
import { motion } from 'framer-motion'
import { usePrefersReducedMotion } from '../hooks/usePrefersReducedMotion'

// Cinematic intro:
// 1) Shoji doors open → 2) sakura petals fall → 3) petals converge → 4) title appears → 5) fade out.
// Click / Enter / Esc skips (and `prefers-reduced-motion` auto-skips).

type Petal = {
  id: string
  x: number
  size: number
  drift: number
  spin: number
}

function makePetals(count: number): Petal[] {
  const petals: Petal[] = []
  for (let i = 0; i < count; i++) {
    petals.push({
      id: `p-${i}`,
      x: Math.random() * 100,
      size: 10 + Math.random() * 14,
      drift: (Math.random() - 0.5) * 120,
      spin: (Math.random() - 0.5) * 240,
    })
  }
  return petals
}

export type ShojiLoaderProps = {
  open: boolean
  onComplete: () => void
  title?: string
  tagline?: string
  hint?: string
  petalCount?: number
}

export default function ShojiLoader({
  open,
  onComplete,
  title = "HIGHWAYS ’26",
  tagline = 'College Cultural Fest',
  hint = 'Click / Enter / Esc to skip',
  petalCount = 26,
}: ShojiLoaderProps) {
  const reduced = usePrefersReducedMotion()
  const rootRef = useRef<HTMLDivElement | null>(null)
  const leftDoorRef = useRef<HTMLDivElement | null>(null)
  const rightDoorRef = useRef<HTMLDivElement | null>(null)
  const titleRef = useRef<HTMLDivElement | null>(null)
  const [petals] = useState(() => makePetals(petalCount))
  const [skipHint, setSkipHint] = useState(true)

  const petalRefs = useRef<Record<string, HTMLDivElement | null>>({})
  const setPetalRef = (id: string) => (node: HTMLDivElement | null) => {
    petalRefs.current[id] = node
  }

  const stableTitle = useMemo(() => title, [title])

  useEffect(() => {
    if (!open) return

    if (reduced) {
      const t = window.setTimeout(onComplete, 240)
      return () => window.clearTimeout(t)
    }

    const root = rootRef.current
    const left = leftDoorRef.current
    const right = rightDoorRef.current
    const titleEl = titleRef.current
    if (!root || !left || !right || !titleEl) return

    gsap.set(titleEl, { opacity: 0, y: 14, filter: 'blur(8px)' })
    gsap.set([left, right], { xPercent: 0 })

    const tl = gsap.timeline({
      defaults: { ease: 'power2.out' },
      onComplete,
    })

    tl.to({}, { duration: 0.6 })
    tl.to([left], { xPercent: -102, duration: 1.35, ease: 'power3.inOut' }, 0.2)
    tl.to(
      [right],
      { xPercent: 102, duration: 1.35, ease: 'power3.inOut' },
      0.2,
    )
    tl.to({}, { duration: 0.2 })

    const petalEls = petals
      .map((p) => petalRefs.current[p.id])
      .filter(Boolean) as HTMLDivElement[]

    tl.add(() => setSkipHint(false), '-=0.6')
    tl.to(
      petalEls,
      {
        y: () => window.innerHeight * 0.65,
        x: (i) => petals[i]!.drift,
        rotate: (i) => petals[i]!.spin,
        opacity: 1,
        duration: 1.8,
        stagger: { each: 0.03, from: 'random' },
        ease: 'sine.out',
      },
      '-=0.55',
    )

    tl.to(
      petalEls,
      {
        x: 0,
        y: 0,
        rotate: 0,
        opacity: 0.0,
        duration: 0.75,
        ease: 'power3.in',
        stagger: { each: 0.012, from: 'center' },
      },
      '+=0.1',
    )
    tl.to(
      titleEl,
      {
        opacity: 1,
        y: 0,
        filter: 'blur(0px)',
        duration: 0.6,
        ease: 'power2.out',
      },
      '-=0.35',
    )
    tl.to({}, { duration: 0.65 })
    tl.to(root, { opacity: 0, duration: 0.55, ease: 'power2.inOut' })

    return () => tl.kill()
  }, [open, onComplete, petals, reduced])

  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape' || e.key === 'Enter' || e.key === ' ') onComplete()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open, onComplete])

  if (!open) return null

  return (
    <div
      ref={rootRef}
      className="fixed inset-0 z-[999] grid place-items-center bg-ink"
      aria-label="Shoji loader"
      onClick={onComplete}
    >
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(900px_500px_at_50%_0%,rgba(246,245,242,0.08),transparent_55%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(800px_520px_at_50%_100%,rgba(29,78,216,0.08),transparent_60%)]" />
      </div>

      <div className="absolute inset-0 overflow-hidden">
        <div
          ref={leftDoorRef}
          className="absolute left-0 top-0 h-full w-1/2 shadow-shoji"
        >
          <ShojiDoor side="left" />
        </div>
        <div
          ref={rightDoorRef}
          className="absolute right-0 top-0 h-full w-1/2 shadow-shoji"
        >
          <ShojiDoor side="right" />
        </div>
      </div>

      <div className="pointer-events-none absolute inset-0 grid place-items-center">
        <div className="relative h-[62vh] w-[min(900px,92vw)]">
          {petals.map((p) => (
            <div
              key={p.id}
              ref={setPetalRef(p.id)}
              className="absolute top-0 opacity-0"
              style={{
                left: `${p.x}%`,
                transform: `translate3d(-50%, -10vh, 0)`,
              }}
            >
              <div
                className="rounded-[999px] bg-[linear-gradient(135deg,rgba(251,113,133,0.92),rgba(244,114,182,0.25))] ring-1 ring-paper/10"
                style={{
                  width: `${p.size}px`,
                  height: `${p.size * 0.72}px`,
                  filter: 'drop-shadow(0 10px 22px rgba(0,0,0,0.35))',
                }}
              />
            </div>
          ))}
        </div>
      </div>

      <div ref={titleRef} className="relative z-10 text-center">
        <div className="text-xs uppercase tracking-[0.28em] text-paper/60">
          {tagline}
        </div>
        <div className="mt-4 text-5xl font-semibold tracking-tight text-paper sm:text-6xl">
          {stableTitle}
        </div>
        <div className="mt-3 text-sm text-paper/65">
          Calm → Balanced → Powerful
        </div>
      </div>

      <motion.div
        initial={false}
        animate={{ opacity: skipHint ? 1 : 0.65 }}
        className="absolute bottom-6 left-1/2 -translate-x-1/2 text-xs tracking-[0.22em] text-paper/55"
      >
        {hint}
      </motion.div>
    </div>
  )
}

function ShojiDoor({ side }: { side: 'left' | 'right' }) {
  return (
    <div className="relative h-full w-full bg-[linear-gradient(180deg,rgba(246,245,242,0.08),rgba(246,245,242,0.03))]">
      <div className="absolute inset-3 rounded-2xl bg-[radial-gradient(900px_560px_at_50%_20%,rgba(246,245,242,0.12),rgba(246,245,242,0.06))] ring-1 ring-paper/10" />

      <div className="absolute inset-3 rounded-2xl">
        <div className="absolute inset-0 rounded-2xl ring-1 ring-paper/10" />
        <div className="absolute inset-0 grid grid-cols-4 gap-0">
          {Array.from({ length: 4 }).map((_, i) => (
            <div
              key={i}
              className="border-r border-paper/10 last:border-r-0"
            />
          ))}
        </div>
        <div className="absolute inset-0 grid grid-rows-10 gap-0">
          {Array.from({ length: 10 }).map((_, i) => (
            <div
              key={i}
              className="border-b border-paper/10 last:border-b-0"
            />
          ))}
        </div>
      </div>

      <div className="absolute inset-y-0 w-3 bg-[linear-gradient(180deg,rgba(141,97,60,0.35),rgba(141,97,60,0.2))]" />
      <div className="absolute inset-y-0 right-0 w-3 bg-[linear-gradient(180deg,rgba(141,97,60,0.35),rgba(141,97,60,0.2))]" />
      <div className="absolute inset-x-0 top-0 h-3 bg-[linear-gradient(90deg,rgba(141,97,60,0.35),rgba(141,97,60,0.2))]" />
      <div className="absolute inset-x-0 bottom-0 h-3 bg-[linear-gradient(90deg,rgba(141,97,60,0.35),rgba(141,97,60,0.2))]" />

      <div
        className={[
          'absolute top-1/2 h-10 w-2 -translate-y-1/2 rounded-full bg-paper/25 ring-1 ring-paper/15',
          side === 'left' ? 'right-6' : 'left-6',
        ].join(' ')}
      />
    </div>
  )
}

