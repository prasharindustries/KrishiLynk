import { useEffect, useState } from 'react'
import { Activity, Zap } from 'lucide-react'

function getTheme(pct) {
  if (pct >= 85) {
    return {
      glow: 'shadow-[0_0_40px_rgba(34,197,94,0.18)]',
      border: 'border-emerald-500/20',
      track: 'bg-emerald-950/20',
      gradient: 'from-emerald-400 via-green-400 to-teal-300',
      pulse: 'bg-emerald-400/30',
      text: 'text-emerald-300',
      dim: 'text-emerald-300/60',
    }
  }

  if (pct >= 60) {
    return {
      glow: 'shadow-[0_0_40px_rgba(245,158,11,0.18)]',
      border: 'border-yellow-500/20',
      track: 'bg-yellow-950/20',
      gradient: 'from-yellow-400 via-amber-400 to-orange-300',
      pulse: 'bg-yellow-400/30',
      text: 'text-yellow-300',
      dim: 'text-yellow-300/60',
    }
  }

  return {
    glow: 'shadow-[0_0_40px_rgba(239,68,68,0.18)]',
    border: 'border-red-500/20',
    track: 'bg-red-950/20',
    gradient: 'from-red-400 via-rose-400 to-orange-300',
    pulse: 'bg-red-400/30',
    text: 'text-red-300',
    dim: 'text-red-300/60',
  }
}

export default function ConfidenceBar({
  value,
  label,
  size = 'md',
  showPercent = true,
}) {
  const pct = Math.max(0, Math.min(100, value * 100))

  const [animated, setAnimated] = useState(0)

  useEffect(() => {
    const t = setTimeout(() => {
      setAnimated(pct)
    }, 120)

    return () => clearTimeout(t)
  }, [pct])

  const theme = getTheme(pct)

  const heights = {
    sm: 'h-2',
    md: 'h-3',
    lg: 'h-4',
  }

  const containerHeights = {
    sm: 'h-2',
    md: 'h-3',
    lg: 'h-4',
  }

  return (
    <div className="w-full">
      {/* ================================================= */}
      {/* TOP ROW */}
      {/* ================================================= */}

      {(label || showPercent) && (
        <div className="flex items-center justify-between gap-3 mb-3">
          {/* LEFT */}
          <div className="min-w-0 flex items-center gap-2">
            <div
              className={[
                'w-7 h-7 rounded-xl shrink-0',
                'border backdrop-blur-xl',
                'flex items-center justify-center',
                theme.border,
                theme.track,
              ].join(' ')}
            >
              <Activity
                size={12}
                className={theme.text}
              />
            </div>

            <div className="min-w-0">
              {label && (
                <p
                  className="
                    text-[11px]
                    leading-none
                    truncate
                    text-white/75
                    font-medium
                  "
                >
                  {label}
                </p>
              )}

              <div className="flex items-center gap-1.5 mt-1">
                <div
                  className={[
                    'w-1.5 h-1.5 rounded-full animate-pulse',
                    theme.pulse,
                  ].join(' ')}
                />

                <span
                  className={[
                    'font-mono text-[9px]',
                    'tracking-[0.18em] uppercase',
                    theme.dim,
                  ].join(' ')}
                >
                  Neural telemetry
                </span>
              </div>
            </div>
          </div>

          {/* RIGHT */}
          {showPercent && (
            <div
              className={[
                'relative overflow-hidden shrink-0',
                'rounded-2xl px-3 py-2',
                'border backdrop-blur-xl',
                theme.border,
                theme.track,
                theme.glow,
              ].join(' ')}
            >
              {/* ambient glow */}
              <div
                className={[
                  'absolute inset-0 opacity-50',
                  pct >= 85
                    ? 'bg-[radial-gradient(circle_at_top,rgba(34,197,94,0.25),transparent_65%)]'
                    : pct >= 60
                    ? 'bg-[radial-gradient(circle_at_top,rgba(245,158,11,0.25),transparent_65%)]'
                    : 'bg-[radial-gradient(circle_at_top,rgba(239,68,68,0.25),transparent_65%)]',
                ].join(' ')}
              />

              <div className="relative z-10 flex items-center gap-2">
                <Zap
                  size={12}
                  className={theme.text}
                />

                <span
                  className={[
                    'font-display font-black leading-none',
                    'text-lg tracking-[-0.04em]',
                    theme.text,
                  ].join(' ')}
                >
                  {pct.toFixed(1)}
                  <span className="text-[0.7em] opacity-70">
                    %
                  </span>
                </span>
              </div>
            </div>
          )}
        </div>
      )}

      {/* ================================================= */}
      {/* BAR */}
      {/* ================================================= */}

      <div
        className={[
          'relative overflow-hidden rounded-full',
          'border backdrop-blur-xl',
          heights[size],
          containerHeights[size],
          theme.border,
          theme.track,
        ].join(' ')}
      >
        {/* Grid texture */}
        <div
          className="absolute inset-0 opacity-[0.08]"
          style={{
            backgroundImage: `
              linear-gradient(90deg, rgba(255,255,255,0.08) 1px, transparent 1px)
            `,
            backgroundSize: '16px 16px',
          }}
        />

        {/* Track shine */}
        <div
          className="
            absolute inset-0
            bg-gradient-to-r
            from-transparent
            via-white/[0.03]
            to-transparent
          "
        />

        {/* Main bar */}
        <div
          className={[
            'relative h-full rounded-full overflow-hidden',
            'bg-gradient-to-r transition-all duration-[1800ms]',
            'ease-[cubic-bezier(0.22,1,0.36,1)]',
            theme.gradient,
            theme.glow,
          ].join(' ')}
          style={{
            width: `${animated}%`,
          }}
        >
          {/* Animated shimmer */}
          <div
            className="
              absolute inset-y-0 -left-1/3 w-1/3
              bg-gradient-to-r
              from-transparent
              via-white/30
              to-transparent
              animate-[shimmer_2.5s_infinite]
            "
          />

          {/* Moving energy pulse */}
          <div
            className={[
              'absolute top-1/2 right-0 -translate-y-1/2',
              'w-6 h-6 rounded-full blur-xl',
              theme.pulse,
            ].join(' ')}
          />
        </div>

        {/* Percentage markers */}
        <div className="absolute inset-0 flex justify-between px-2 pointer-events-none">
          {[25, 50, 75].map((m) => (
            <div
              key={m}
              className="w-px h-full bg-white/[0.05]"
            />
          ))}
        </div>
      </div>

      {/* Bottom telemetry */}
      <div className="flex items-center justify-between mt-2 px-1">
        <span className="font-mono text-[9px] tracking-[0.16em] uppercase text-white/30">
          calibrated inference
        </span>

        <span
          className={[
            'font-mono text-[9px]',
            'tracking-[0.16em] uppercase',
            theme.dim,
          ].join(' ')}
        >
          confidence vector
        </span>
      </div>
    </div>
  )
}