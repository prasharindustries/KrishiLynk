import { useMemo, useState } from 'react'
import {
  Star,
  Clock3,
  ChevronDown,
  ChevronUp,
  BrainCircuit,
  Activity,
  ShieldCheck,
  Sparkles,
  Eye,
  ScanLine,
} from 'lucide-react'

import ConfidenceBar from './ConfidenceBar'
import XAIPanel from './XAIPanel'

function formatClass(raw) {
  return raw?.replace(/___/g, ' — ').replace(/_/g, ' ') ?? '—'
}

function formatMs(ms) {
  if (!ms) return '—'

  return ms > 1000
    ? `${(ms / 1000).toFixed(1)}s`
    : `${Math.round(ms)}ms`
}

function getConfidenceTheme(confidence) {
  if (confidence >= 0.85) {
    return {
      pill:
        'bg-emerald-500/10 text-emerald-300 border border-emerald-500/20',

      glow: 'shadow-[0_0_100px_rgba(34,197,94,0.10)]',

      bar: 'from-emerald-400 to-green-500',
    }
  }

  if (confidence >= 0.6) {
    return {
      pill:
        'bg-yellow-500/10 text-yellow-300 border border-yellow-500/20',

      glow: 'shadow-[0_0_100px_rgba(245,158,11,0.10)]',

      bar: 'from-yellow-400 to-orange-500',
    }
  }

  return {
    pill:
      'bg-red-500/10 text-red-300 border border-red-500/20',

    glow: 'shadow-[0_0_100px_rgba(239,68,68,0.10)]',

    bar: 'from-red-400 to-rose-500',
  }
}

export default function ModelResultCard({
  result,
  rank,
}) {
  const [expanded, setExpanded] = useState(true)

  const isRecommended = result.reliable

  const theme = useMemo(
    () => getConfidenceTheme(result.confidence),
    [result.confidence]
  )

  return (
    <section
      className={[
        'group relative overflow-hidden rounded-[34px]',
        'border backdrop-blur-2xl transition-all duration-500',
        'hover:translate-y-[-2px]',
        theme.glow,
        isRecommended
          ? 'border-emerald-500/20 bg-gradient-to-b from-emerald-950/10 via-black/30 to-black/40'
          : 'border-white/[0.06] bg-gradient-to-b from-white/[0.02] to-black/20',
      ].join(' ')}
    >
      {/* ===================================================== */}
      {/* ATMOSPHERIC LAYERS */}
      {/* ===================================================== */}

      {/* Top glow */}
      <div
        className={[
          'absolute top-[-140px] left-[10%] w-[320px] h-[320px]',
          'rounded-full blur-[140px]',
          isRecommended
            ? 'bg-emerald-500/10'
            : 'bg-cyan-500/10',
        ].join(' ')}
      />

      {/* Grid overlay */}
      <div
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage: `
            linear-gradient(rgba(255,255,255,0.08) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.08) 1px, transparent 1px)
          `,
          backgroundSize: '34px 34px',
        }}
      />

      {/* ===================================================== */}
      {/* HEADER */}
      {/* ===================================================== */}

      <header
        className={[
          'relative z-10 px-5 py-4 sm:px-6 sm:py-5',
          'flex flex-col lg:flex-row lg:items-start lg:justify-between gap-5',
          'cursor-pointer transition-all duration-300',
          isRecommended
            ? 'bg-emerald-500/[0.03]'
            : 'bg-white/[0.015]',
        ].join(' ')}
        onClick={() => setExpanded((e) => !e)}
      >
        {/* LEFT */}
        <div className="flex items-start gap-4 min-w-0">
          {/* Rank */}
          <div
            className={[
              'relative shrink-0',
              'w-11 h-11 rounded-2xl',
              'flex items-center justify-center',
              'border font-mono font-bold text-sm',
              isRecommended
                ? 'bg-emerald-500/10 border-emerald-500/20 text-emerald-300'
                : 'bg-white/[0.03] border-white/[0.06] text-white/60',
            ].join(' ')}
          >
            {rank}

            {/* Glow */}
            <div
              className={[
                'absolute inset-0 rounded-2xl blur-xl opacity-60',
                isRecommended
                  ? 'bg-emerald-500/10'
                  : 'bg-cyan-500/10',
              ].join(' ')}
            />
          </div>

          {/* Main content */}
          <div className="min-w-0">
            {/* Top telemetry */}
            <div className="flex flex-wrap items-center gap-2 mb-3">
              {/* Model name */}
              <div
                className="
                  inline-flex items-center gap-2
                  px-3 py-1.5 rounded-full
                  bg-white/[0.03]
                  border border-white/[0.06]
                "
              >
                <BrainCircuit
                  size={13}
                  className={
                    isRecommended
                      ? 'text-emerald-400'
                      : 'text-cyan-400'
                  }
                />

                <span className="font-mono text-[10px] tracking-[0.2em] uppercase text-white/60">
                  {result.model_name}
                </span>
              </div>

              {/* Recommended */}
              {isRecommended && (
                <div
                  className="
                    inline-flex items-center gap-2
                    px-3 py-1.5 rounded-full
                    bg-emerald-500/10
                    border border-emerald-500/20
                  "
                >
                  <Star
                    size={12}
                    className="fill-emerald-400 text-emerald-400"
                  />

                  <span className="font-mono text-[10px] tracking-[0.2em] uppercase text-emerald-300">
                    Best XAI
                  </span>
                </div>
              )}
            </div>

            {/* Prediction */}
            <h2
              className="
                font-display
                font-black
                leading-[0.92]
                tracking-[-0.04em]
                text-[1.5rem]
                sm:text-[2rem]
                text-white
                max-w-3xl
              "
            >
              {formatClass(result.prediction)}
            </h2>

            {/* Bottom telemetry */}
            <div className="mt-4 flex flex-wrap items-center gap-4">
              {/* Timing */}
              <div className="flex items-center gap-2 text-white/40">
                <Clock3 size={13} />

                <span className="font-mono text-[11px] tracking-[0.15em] uppercase">
                  {formatMs(result.inference_ms)}
                </span>
              </div>

              {/* Vision */}
              <div className="flex items-center gap-2 text-white/40">
                <Eye size={13} />

                <span className="font-mono text-[11px] tracking-[0.15em] uppercase">
                  Explainability Active
                </span>
              </div>

              {/* Reliability */}
              {isRecommended && (
                <div className="flex items-center gap-2 text-emerald-300/70">
                  <ShieldCheck size={13} />

                  <span className="font-mono text-[11px] tracking-[0.15em] uppercase">
                    Highest Faithfulness
                  </span>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* RIGHT */}
        <div className="flex items-center gap-4 shrink-0">
          {/* Confidence */}
          <div
            className={[
              'relative overflow-hidden',
              'rounded-2xl px-4 py-3 border backdrop-blur-xl',
              theme.pill,
            ].join(' ')}
          >
            {/* Glow */}
            <div
              className={[
                'absolute inset-0 opacity-30',
                result.confidence >= 0.85
                  ? 'bg-[radial-gradient(circle_at_top,rgba(34,197,94,0.25),transparent_60%)]'
                  : result.confidence >= 0.6
                  ? 'bg-[radial-gradient(circle_at_top,rgba(245,158,11,0.25),transparent_60%)]'
                  : 'bg-[radial-gradient(circle_at_top,rgba(239,68,68,0.25),transparent_60%)]',
              ].join(' ')}
            />

            <div className="relative z-10">
              <div className="flex items-center gap-2 mb-1">
                <Activity size={12} />

                <span className="font-mono text-[9px] tracking-[0.18em] uppercase">
                  Confidence
                </span>
              </div>

              <p className="font-display text-2xl font-black leading-none">
                {(result.confidence * 100).toFixed(1)}
                <span className="text-[0.8em] opacity-80">
                  %
                </span>
              </p>
            </div>
          </div>

          {/* Expand */}
          <button
            className="
              w-11 h-11 rounded-2xl
              border border-white/[0.06]
              bg-white/[0.03]
              backdrop-blur-xl
              flex items-center justify-center
              text-white/50
              hover:text-emerald-300
              hover:border-emerald-500/20
              hover:bg-emerald-500/5
              transition-all duration-300
            "
          >
            {expanded ? (
              <ChevronUp size={18} />
            ) : (
              <ChevronDown size={18} />
            )}
          </button>
        </div>
      </header>

      {/* ===================================================== */}
      {/* BODY */}
      {/* ===================================================== */}

      {expanded && (
        <div className="relative z-10 border-t border-white/[0.06]">
          {/* Confidence strip */}
          <div className="px-5 sm:px-6 pt-6">
            <div
              className="
                rounded-2xl
                border border-white/[0.04]
                bg-white/[0.015]
                p-4
              "
            >
              <div className="flex items-center justify-between gap-4 mb-4">
                <div className="flex items-center gap-2">
                  <ScanLine
                    size={14}
                    className="text-emerald-400"
                  />

                  <span className="font-mono text-[10px] tracking-[0.22em] uppercase text-emerald-300/70">
                    Neural Confidence
                  </span>
                </div>

                <span className="font-mono text-[11px] text-white/40">
                  calibrated softmax probability
                </span>
              </div>

              <ConfidenceBar
                value={result.confidence}
                size="lg"
                showPercent={false}
              />
            </div>
          </div>

          {/* Top-5 */}
          {result.top5?.length > 0 && (
            <div className="px-5 sm:px-6 pt-6">
              <div
                className="
                  rounded-2xl
                  border border-white/[0.04]
                  bg-white/[0.015]
                  p-5
                "
              >
                {/* Header */}
                <div className="flex items-center gap-2 mb-5">
                  <Sparkles
                    size={14}
                    className="text-emerald-400"
                  />

                  <span className="font-mono text-[10px] tracking-[0.22em] uppercase text-emerald-300/70">
                    Top-5 Predictions
                  </span>
                </div>

                {/* Predictions */}
                <div className="space-y-3">
                  {result.top5.map((item, i) => (
                    <div
                      key={i}
                      className="
                        rounded-2xl
                        border border-white/[0.04]
                        bg-black/20
                        p-3
                      "
                    >
                      <ConfidenceBar
                        value={item.confidence}
                        label={formatClass(
                          item.class_name || item.class
                        )}
                        size="sm"
                      />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* XAI */}
          <div className="px-5 sm:px-6 pt-6">
            <div
              className="
                rounded-[28px]
                border border-white/[0.04]
                bg-white/[0.015]
                p-5
              "
            >
              {/* Header */}
              <div className="flex items-center gap-2 mb-5">
                <Eye
                  size={15}
                  className="text-emerald-400"
                />

                <span className="font-mono text-[10px] tracking-[0.22em] uppercase text-emerald-300/70">
                  Explainability Surfaces
                </span>
              </div>

              <XAIPanel
                xai={result.xai}
                loading={false}
              />
            </div>
          </div>

          {/* Reliability note */}
          {isRecommended && (
            <div className="p-5 sm:p-6">
              <div
                className="
                  relative overflow-hidden rounded-[26px]
                  border border-emerald-500/20
                  bg-gradient-to-r from-emerald-500/10 to-transparent
                  p-5
                "
              >
                {/* Glow */}
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_left,rgba(34,197,94,0.12),transparent_45%)]" />

                <div className="relative z-10 flex gap-4">
                  {/* Icon */}
                  <div
                    className="
                      w-12 h-12 rounded-2xl
                      bg-emerald-500/10
                      border border-emerald-500/20
                      flex items-center justify-center
                      shrink-0
                    "
                  >
                    <ShieldCheck
                      size={20}
                      className="text-emerald-400"
                    />
                  </div>

                  {/* Content */}
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <Star
                        size={13}
                        className="fill-emerald-400 text-emerald-400"
                      />

                      <span className="font-mono text-[10px] tracking-[0.2em] uppercase text-emerald-300">
                        Highest Explainability Faithfulness
                      </span>
                    </div>

                    <p className="text-sm leading-relaxed text-emerald-100/80">
                      EfficientNet-B0 achieved positive AOPC
                      scores across all explainability methods,
                      confirming attention is concentrated on
                      biologically relevant lesion regions rather
                      than background artifacts or visual noise.
                    </p>

                    <div className="mt-4 flex flex-wrap gap-2">
                      {[
                        'IG +0.136',
                        'Grad-CAM +0.054',
                        'LIME +0.087',
                      ].map((metric) => (
                        <div
                          key={metric}
                          className="
                            px-3 py-1.5 rounded-full
                            bg-black/30
                            border border-emerald-500/10
                          "
                        >
                          <span className="font-mono text-[10px] tracking-[0.18em] uppercase text-emerald-300">
                            {metric}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </section>
  )
}