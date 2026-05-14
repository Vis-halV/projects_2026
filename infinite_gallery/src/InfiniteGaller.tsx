import { useEffect, useMemo, useRef, useState } from "react";
import type { KeyboardEvent } from "react";

type Mode = "free" | "focus";
type GridCoord = { col: number; row: number };
type Vec2 = { x: number; y: number };

const GRID_COLS = 6;
const GRID_ROWS = 3;

const mod = (n: number, m: number) => ((n % m) + m) % m;

const hash2 = (a: number, b: number) => {
  // deterministic, fast-ish 2D hash; stable across sessions
  let x = a | 0;
  let y = b | 0;
  x = Math.imul(x, 0x7feb352d);
  y = Math.imul(y, 0x846ca68b);
  let h = x ^ y;
  h ^= h >>> 15;
  h = Math.imul(h, 0x2c1b3c6d);
  h ^= h >>> 12;
  return h >>> 0;
};

const clamp = (v: number, min: number, max: number) => Math.max(min, Math.min(max, v));

function normalizeCamera(v: Vec2, basis: number) {
  // Avoid unbounded growth over long sessions (precision/perf)
  const limit = basis * 20000;
  if (Math.abs(v.x) > limit) v.x = v.x % limit;
  if (Math.abs(v.y) > limit) v.y = v.y % limit;
}

function tileStyle(imageIndex: number) {
  const h = hash2(imageIndex, 913);
  const hueA = h % 360;
  const hueB = (hueA + 40 + (h % 80)) % 360;
  const sat = 55 + (h % 20);
  const lumA = 34 + (h % 10);
  const lumB = 22 + (h % 12);
  const sheen = 0.06 + ((h >>> 8) % 10) / 200;

  return {
    backgroundImage: [
      `linear-gradient(135deg, hsl(${hueA} ${sat}% ${lumA}%), hsl(${hueB} ${sat}% ${lumB}%))`,
      `radial-gradient(100% 80% at 10% 10%, rgba(255,255,255,${sheen}), rgba(255,255,255,0) 55%)`,
      `radial-gradient(120% 90% at 90% 90%, rgba(0,0,0,0.35), rgba(0,0,0,0) 55%)`,
    ].join(", "),
  } as const;
}

export default function InfiniteGallery() {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const viewportRef = useRef<HTMLDivElement | null>(null);

  const [mode, setMode] = useState<Mode>("free");
  const modeRef = useRef<Mode>("free");
  const [selected, setSelected] = useState<GridCoord | null>(null);

  const [introStarted, setIntroStarted] = useState(false);
  const [introDone, setIntroDone] = useState(false);

  const [viewportSize, setViewportSize] = useState({ w: 0, h: 0 });

  const cameraRef = useRef<Vec2>({ x: 0, y: 0 }); // top-left world coord currently shown
  const [cameraPos, setCameraPos] = useState<Vec2>({ x: 0, y: 0 });
  const target = useRef<Vec2>({ x: 0, y: 0 }); // inertial / focus target
  const velocity = useRef<Vec2>({ x: 0, y: 0 });
  const returnTargetRef = useRef<Vec2 | null>(null);

  const layout = useMemo(() => {
    const w = viewportSize.w || 1;
    const h = viewportSize.h || 1;

    const base = Math.min(w / GRID_COLS, h / GRID_ROWS);
    const desiredGap = Math.round(base * 0.22);
    const maxGapW = Math.max(12, Math.floor((w - GRID_COLS * 80) / (GRID_COLS + 1)));
    const maxGapH = Math.max(12, Math.floor((h - GRID_ROWS * 80) / (GRID_ROWS + 1)));
    const gap = clamp(desiredGap, 18, Math.min(56, maxGapW, maxGapH));

    const tileW = Math.max(80, Math.floor((w - (GRID_COLS + 1) * gap) / GRID_COLS));
    const tileH = Math.max(80, Math.floor((h - (GRID_ROWS + 1) * gap) / GRID_ROWS));

    const unitW = tileW + gap;
    const unitH = tileH + gap;

    return { gap, tileW, tileH, unitW, unitH };
  }, [viewportSize.h, viewportSize.w]);

  useEffect(() => {
    modeRef.current = mode;
  }, [mode]);

  useEffect(() => {
    // Kick the intro reveal after first paint to avoid pop-in.
    let raf = 0;
    const t0 = window.setTimeout(() => {
      raf = requestAnimationFrame(() => setIntroStarted(true));
    }, 140);

    return () => {
      window.clearTimeout(t0);
      cancelAnimationFrame(raf);
    };
  }, []);

  useEffect(() => {
    if (!introStarted) return;
    const maxDelay = (GRID_COLS * GRID_ROWS - 1) * 70 + 90;
    const duration = 950;
    const settle = 220;
    const t = window.setTimeout(() => setIntroDone(true), maxDelay + duration + settle);
    return () => window.clearTimeout(t);
  }, [introStarted]);

  useEffect(() => {
    const viewport = viewportRef.current;
    if (!viewport) return;

    const ro = new ResizeObserver(() => {
      const r = viewport.getBoundingClientRect();
      setViewportSize({ w: Math.max(1, Math.round(r.width)), h: Math.max(1, Math.round(r.height)) });
    });
    ro.observe(viewport);
    return () => ro.disconnect();
  }, []);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const onWheel = (e: WheelEvent) => {
      // Always prevent page scroll; the "disable" part is ignoring motion in select mode.
      e.preventDefault();
      if (modeRef.current !== "free") return;

      // Trackpads feel better with a touch of damping + no acceleration spikes.
      velocity.current.x += e.deltaX;
      velocity.current.y += e.deltaY;
    };

    el.addEventListener("wheel", onWheel, { passive: false });
    return () => el.removeEventListener("wheel", onWheel);
  }, []);

  useEffect(() => {
    let rafId = 0;

    const animate = () => {
      if (modeRef.current === "free") {
        target.current.x += velocity.current.x;
        target.current.y += velocity.current.y;

        velocity.current.x *= 0.86;
        velocity.current.y *= 0.86;
      }

      const basis = Math.max(layout.unitW, layout.unitH);
      normalizeCamera(target.current, basis);
      normalizeCamera(cameraRef.current, basis);

      const ease = modeRef.current === "focus" ? 0.18 : 0.12;
      cameraRef.current.x += (target.current.x - cameraRef.current.x) * ease;
      cameraRef.current.y += (target.current.y - cameraRef.current.y) * ease;

      setCameraPos({ x: cameraRef.current.x, y: cameraRef.current.y });
      rafId = requestAnimationFrame(animate);
    };

    rafId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(rafId);
  }, [layout.unitH, layout.unitW]);

  useEffect(() => {
    if (mode !== "focus" || !selected) return;

    const desiredX = selected.col * layout.unitW + layout.gap + layout.tileW / 2 - viewportSize.w / 2;
    const desiredY = selected.row * layout.unitH + layout.gap + layout.tileH / 2 - viewportSize.h / 2;
    target.current.x = desiredX;
    target.current.y = desiredY;
  }, [layout.gap, layout.tileH, layout.tileW, layout.unitH, layout.unitW, mode, selected, viewportSize.h, viewportSize.w]);

  const grid = useMemo(() => {
    const w = viewportSize.w || 1;
    const h = viewportSize.h || 1;
    const overscan = 1;

    const cols = Math.ceil(w / layout.unitW) + overscan * 2 + 1;
    const rows = Math.ceil(h / layout.unitH) + overscan * 2 + 1;

    const startCol = Math.floor((cameraPos.x - layout.gap) / layout.unitW) - overscan;
    const startRow = Math.floor((cameraPos.y - layout.gap) / layout.unitH) - overscan;

    const cells: Array<{ key: string; col: number; row: number; left: number; top: number }> = [];
    for (let r = 0; r < rows; r++) {
      const row = startRow + r;
      const top = Math.round(row * layout.unitH + layout.gap - cameraPos.y);
      for (let c = 0; c < cols; c++) {
        const col = startCol + c;
        const left = Math.round(col * layout.unitW + layout.gap - cameraPos.x);
        cells.push({ key: `${col}:${row}`, col, row, left, top });
      }
    }

    return { cells };
  }, [cameraPos.x, cameraPos.y, layout.gap, layout.unitH, layout.unitW, viewportSize.h, viewportSize.w]);

  const onSelect = (coord: GridCoord) => {
    velocity.current.x = 0;
    velocity.current.y = 0;
    if (modeRef.current !== "focus" && !returnTargetRef.current) {
      returnTargetRef.current = { x: target.current.x, y: target.current.y };
    }
    setSelected(coord);
    setMode("focus");
    containerRef.current?.focus();
  };

  const exitFocus = () => {
    velocity.current.x = 0;
    velocity.current.y = 0;
    setMode("free");
    setSelected(null);
    if (returnTargetRef.current) {
      target.current.x = returnTargetRef.current.x;
      target.current.y = returnTargetRef.current.y;
      cameraRef.current.x = returnTargetRef.current.x;
      cameraRef.current.y = returnTargetRef.current.y;
      setCameraPos({ x: returnTargetRef.current.x, y: returnTargetRef.current.y });
      returnTargetRef.current = null;
    }
  };

  const onKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
    if (e.key === "Escape") {
      e.preventDefault();
      exitFocus();
      return;
    }
  };

  return (
    <div
      ref={containerRef}
      tabIndex={0}
      onKeyDown={onKeyDown}
      className="fixed inset-0 overflow-hidden bg-neutral-950 text-white outline-none touch-none"
      style={{
        backgroundColor: "#0a0a0a",
      }}
      aria-label="Infinite gallery"
    >
      <div
        ref={viewportRef}
        className="relative size-full overflow-hidden bg-neutral-950"
      >
        <div className="absolute inset-0">
          {grid.cells.map((cell) => {
            const isSelected = selected?.col === cell.col && selected?.row === cell.row;
            const hideOthers = mode === "focus" && selected && !isSelected;
            const baseCol = mod(cell.col, GRID_COLS);
            const baseRow = mod(cell.row, GRID_ROWS);
            const imageIndex = baseRow * GRID_COLS + baseCol;

            const isFirstBlock =
              cell.col >= 0 && cell.col < GRID_COLS && cell.row >= 0 && cell.row < GRID_ROWS;
            const hideUntilIntro = !introStarted && isFirstBlock;

            const isIntroTile =
              introStarted &&
              !introDone &&
              isFirstBlock;

            const introOrder = cell.row * GRID_COLS + cell.col;
            const jitter = hash2(introOrder, 77) % 90;
            const delayMs = introOrder * 70 + jitter;

            return (
              <button
                key={cell.key}
                type="button"
                onClick={() => {
                  if (modeRef.current === "focus" && isSelected) {
                    exitFocus();
                    return;
                  }
                  onSelect({ col: cell.col, row: cell.row });
                }}
                className={[
                  "absolute select-none overflow-hidden rounded-none ig-tile",
                  "bg-neutral-900",
                  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/50",
                  "will-change-transform",
                  "transition-[opacity,filter] duration-[700ms]",
                  isIntroTile ? "ig-reveal" : "",
                  isSelected ? "z-10 ring-2 ring-white/80" : "",
                ].join(" ")}
                style={{
                  left: cell.left,
                  top: cell.top,
                  width: layout.tileW,
                  height: layout.tileH,
                  opacity: hideOthers || hideUntilIntro ? 0 : 1,
                  filter: hideOthers ? "blur(10px)" : "none",
                  pointerEvents: hideOthers || hideUntilIntro ? "none" : "auto",
                  animationDelay: isIntroTile ? `${delayMs}ms` : undefined,
                  ...tileStyle(imageIndex),
                }}
                aria-label={`Image ${imageIndex + 1}`}
              >
                <span className="pointer-events-none absolute inset-0 opacity-[0.08] mix-blend-overlay">
                  <span
                    className="absolute inset-0"
                    style={{
                      backgroundImage:
                        "repeating-linear-gradient(0deg, rgba(255,255,255,0.18) 0 1px, rgba(255,255,255,0) 1px 6px)",
                      transform: `translateX(${(hash2(imageIndex, 33) % 9) - 4}px)`,
                    }}
                  />
                </span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
