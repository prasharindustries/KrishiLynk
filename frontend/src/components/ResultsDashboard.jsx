import { useMemo, useState } from 'react'
import {
  RefreshCw,
  Clock3,
  CheckCircle2,
  LayoutGrid,
  LayoutList,
  ShieldCheck,
  Activity,
  BrainCircuit,
  Sparkles,
  ArrowUpRight,
} from 'lucide-react'

import ModelResultCard from './ModelResultCard'
import AOPCChart from './AOPCChart'

function formatClass(raw) {
  return raw?.replace(/___/g, ' — ').replace(/_/g, ' ') ?? '—'
}

function averageConfidence(results) {
  if (!results?.length) return 0

  return (
    results.reduce((acc, r) => acc + r.confidence, 0) /
    results.length
  )
}

export default function ResultsDashboard({
  result,
  onReset,
  duration,
}) {
  const [layout, setLayout] = useState('stack')

  const recommended = useMemo(
    () =>
      result?.model_results?.find((r) => r.reliable),
    [result]
  )

  const primaryPrediction = useMemo(
    () =>
      recommended?.prediction ??
      result?.model_results?.[0]?.prediction,
    [recommended, result]
  )

  const allAgree = useMemo(() => {
    if (!result?.model_results?.length) return true

    const preds = result.model_results.map(
      (r) => r.prediction
    )

    return preds.every((p) => p === preds[0])
  }, [result])

  const avgConfidence = useMemo(
    () => averageConfidence(result?.model_results),
    [result]
  )

  if (!result) return null

  return (
    <div className="relative space-y-6 animate-fade-up">
      {/* HERO PANEL */}

      <section
        className="
          relative overflow-hidden rounded-[28px]
          border border-white/[0.06]
          bg-gradient-to-b from-emerald-950/10 via-black/40 to-black/50
          backdrop-blur-2xl
        "
      >
        {/* Ambient lighting */}

        <div className="absolute -top-24 left-[-5%] h-[280px] w-[280px] rounded-full bg-emerald-500/8 blur-[140px]" />

        <div className="absolute bottom-[-140px] right-[-5%] h-[240px] w-[240px] rounded-full bg-cyan-500/8 blur-[140px]" />

        {/* Subtle grid */}

        <div
          className="absolute inset-0 opacity-[0.025] pointer-events-none"
          style={{
            backgroundImage: `
              linear-gradient(rgba(255,255,255,0.06) 1px, transparent 1px),
              linear-gradient(90deg, rgba(255,255,255,0.06) 1px, transparent 1px)
            `,
            backgroundSize: '42px 42px',
          }}
        />

        <div className="relative z-10 p-6 sm:p-8">
          <div className="flex flex-col xl:flex-row gap-8 xl:items-start xl:justify-between">
            {/* LEFT */}

            <div className="flex gap-5 min-w-0">
              {/* IMAGE */}

              <div className="relative shrink-0">
                <div className="absolute inset-0 rounded-[22px] bg-emerald-500/10 blur-2xl" />

                <img
                  src={result.original_image}
                  alt="Uploaded sample"
                  className="
                    relative
                    w-24 h-24 sm:w-28 sm:h-28
                    rounded-[22px]
                    object-cover
                    border border-white/10
                    shadow-[0_10px_40px_rgba(34,197,94,0.10)]
                  "
                />

                {/* VERIFIED */}

                <div
                  className="
                    absolute -bottom-3 left-1/2 -translate-x-1/2
                    px-3 py-1 rounded-full
                    border border-emerald-500/15
                    bg-black/70 backdrop-blur-xl
                  "
                >
                  <div className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />

                    <span className="font-mono text-[9px] tracking-[0.16em] uppercase text-emerald-300">
                      Verified
                    </span>
                  </div>
                </div>
              </div>

              {/* TEXT */}

              <div className="min-w-0 pt-1">
                {/* BADGES */}

                <div className="flex flex-wrap items-center gap-2 mb-5">
                  <div
                    className="
                      inline-flex items-center gap-2
                      px-3 py-1.5 rounded-full
                      bg-emerald-500/10
                      border border-emerald-500/15
                    "
                  >
                    <CheckCircle2
                      size={13}
                      className="text-emerald-400"
                    />

                    <span className="font-mono text-[9px] tracking-[0.18em] uppercase text-emerald-300">
                      Analysis Complete
                    </span>
                  </div>

                  {duration && (
                    <div
                      className="
                        inline-flex items-center gap-2
                        px-3 py-1.5 rounded-full
                        bg-white/[0.03]
                        border border-white/[0.06]
                      "
                    >
                      <Clock3
                        size={12}
                        className="text-white/45"
                      />

                      <span className="font-mono text-[9px] tracking-[0.16em] uppercase text-white/55">
                        {(duration / 1000).toFixed(1)}s
                      </span>
                    </div>
                  )}
                </div>

                {/* TITLE */}

                <h1
                  className="
                    font-sans
                    font-extrabold
                    leading-[0.95]
                    tracking-[-0.045em]
                    text-[2.3rem]
                    sm:text-[3.2rem]
                    lg:text-[4.4rem]
                    text-white
                    max-w-4xl
                  "
                >
                  {formatClass(primaryPrediction)}
                </h1>

                {/* DESC */}

                <p className="mt-5 max-w-3xl text-[14px] leading-[1.85] text-white/58 font-light">
                  Multi-model explainable AI consensus generated
                  using convolutional lesion analysis,
                  attribution-based explainability, and
                  perturbation faithfulness validation.
                </p>

                {/* METRICS */}

                <div className="mt-7 flex flex-wrap gap-4">
                  {/* CONF */}

                  <div
                    className="
                      glass rounded-[22px]
                      px-5 py-4
                      min-w-[145px]
                    "
                  >
                    <div className="flex items-center gap-2 mb-2">
                      <Activity
                        size={13}
                        className="text-emerald-400"
                      />

                      <span className="font-mono text-[9px] tracking-[0.16em] uppercase text-white/45">
                        Avg Confidence
                      </span>
                    </div>

                    <p className="font-sans text-[2rem] font-bold tracking-[-0.04em] text-white">
                      {(avgConfidence * 100).toFixed(1)}
                      <span className="text-emerald-400">
                        %
                      </span>
                    </p>
                  </div>

                  {/* MODELS */}

                  <div
                    className="
                      glass rounded-[22px]
                      px-5 py-4
                      min-w-[145px]
                    "
                  >
                    <div className="flex items-center gap-2 mb-2">
                      <BrainCircuit
                        size={13}
                        className="text-cyan-400"
                      />

                      <span className="font-mono text-[9px] tracking-[0.16em] uppercase text-white/45">
                        Models Analysed
                      </span>
                    </div>

                    <p className="font-sans text-[2rem] font-bold tracking-[-0.04em] text-white">
                      {result.model_results.length}
                    </p>
                  </div>

                  {/* BEST */}

                  <div
                    className="
                      glass rounded-[22px]
                      px-5 py-4
                      min-w-[180px]
                    "
                  >
                    <div className="flex items-center gap-2 mb-2">
                      <ShieldCheck
                        size={13}
                        className="text-emerald-400"
                      />

                      <span className="font-mono text-[9px] tracking-[0.16em] uppercase text-white/45">
                        Recommended XAI
                      </span>
                    </div>

                    <p className="font-sans text-[1.05rem] font-semibold tracking-[-0.02em] text-emerald-300">
                      EfficientNet-B0
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* CONTROLS */}

            <div className="flex items-center gap-3 shrink-0">
              <button
                onClick={() =>
                  setLayout((l) =>
                    l === 'stack' ? 'grid' : 'stack'
                  )
                }
                className="
                  h-11 px-4 rounded-[18px]
                  border border-white/[0.06]
                  bg-white/[0.03]
                  backdrop-blur-xl
                  text-white/55
                  hover:text-emerald-300
                  hover:border-emerald-500/20
                  hover:bg-emerald-500/5
                  transition-all duration-300
                "
              >
                {layout === 'stack' ? (
                  <LayoutGrid size={17} />
                ) : (
                  <LayoutList size={17} />
                )}
              </button>

              <button
                onClick={onReset}
                className="
                  group
                  h-11 px-5 rounded-[18px]
                  border border-white/[0.06]
                  bg-white/[0.03]
                  backdrop-blur-xl
                  flex items-center gap-2
                  text-white/55
                  hover:text-white
                  hover:border-emerald-500/20
                  hover:bg-emerald-500/5
                  transition-all duration-300
                "
              >
                <RefreshCw
                  size={15}
                  className="group-hover:rotate-180 transition-transform duration-500"
                />

                <span className="text-sm font-medium">
                  New Analysis
                </span>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* CONSENSUS */}

      {result.model_results.length > 1 && (
        <section
          className={[
            'relative overflow-hidden rounded-[22px]',
            'border backdrop-blur-xl',
            allAgree
              ? 'border-emerald-500/15 bg-emerald-950/10'
              : 'border-yellow-500/15 bg-yellow-950/10',
          ].join(' ')}
        >
          <div className="relative z-10 p-5 flex flex-col sm:flex-row sm:items-center gap-4">
            <div
              className={[
                'w-12 h-12 rounded-[18px] flex items-center justify-center shrink-0',
                allAgree
                  ? 'bg-emerald-500/10 border border-emerald-500/15'
                  : 'bg-yellow-500/10 border border-yellow-500/15',
              ].join(' ')}
            >
              {allAgree ? (
                <ShieldCheck
                  size={20}
                  className="text-emerald-400"
                />
              ) : (
                <AlertTriangleIcon />
              )}
            </div>

            <div className="flex-1">
              <div className="flex items-center gap-2 mb-2">
                <Sparkles
                  size={13}
                  className={
                    allAgree
                      ? 'text-emerald-400'
                      : 'text-yellow-400'
                  }
                />

                <span
                  className={[
                    'font-mono text-[9px] tracking-[0.18em] uppercase',
                    allAgree
                      ? 'text-emerald-300'
                      : 'text-yellow-300',
                  ].join(' ')}
                >
                  Consensus Verification
                </span>
              </div>

              <p
                className={[
                  'font-medium text-sm',
                  allAgree
                    ? 'text-emerald-100'
                    : 'text-yellow-100',
                ].join(' ')}
              >
                {allAgree
                  ? 'All neural architectures converged on the same diagnosis.'
                  : 'Model disagreement detected across neural architectures.'}
              </p>

              <p
                className={[
                  'mt-1 text-xs leading-relaxed',
                  allAgree
                    ? 'text-emerald-200/58'
                    : 'text-yellow-200/58',
                ].join(' ')}
              >
                {allAgree
                  ? 'Cross-model consistency significantly increases diagnostic confidence.'
                  : 'EfficientNet-B0 is recommended due to superior explainability faithfulness scores.'}
              </p>
            </div>

            <div
              className={[
                'flex items-center gap-2 px-4 py-2 rounded-[18px] border shrink-0',
                allAgree
                  ? 'border-emerald-500/15 bg-emerald-500/10'
                  : 'border-yellow-500/15 bg-yellow-500/10',
              ].join(' ')}
            >
              <ArrowUpRight
                size={13}
                className={
                  allAgree
                    ? 'text-emerald-300'
                    : 'text-yellow-300'
                }
              />

              <span
                className={[
                  'font-mono text-[9px] tracking-[0.16em] uppercase',
                  allAgree
                    ? 'text-emerald-300'
                    : 'text-yellow-300',
                ].join(' ')}
              >
                {allAgree
                  ? 'High Reliability'
                  : 'Review XAI'}
              </span>
            </div>
          </div>
        </section>
      )}

      {/* MODEL CARDS */}

      <section
        className={
          layout === 'grid'
            ? 'grid grid-cols-1 2xl:grid-cols-2 gap-5'
            : 'space-y-5'
        }
      >
        {result.model_results.map((r, i) => (
          <div
            key={r.model_key}
            className="animate-fade-up"
            style={{
              animationDelay: `${i * 80}ms`,
            }}
          >
            <ModelResultCard
              result={r}
              rank={i + 1}
            />
          </div>
        ))}
      </section>

      {/* AOPC */}

      <section
        className="
          relative overflow-hidden rounded-[28px]
          border border-white/[0.06]
          bg-gradient-to-b from-white/[0.02] to-black/20
          backdrop-blur-2xl
          p-6
        "
      >
        <div className="relative z-10">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-5 mb-8">
            <div>
              <div className="flex items-center gap-2 mb-3">
                <Activity
                  size={14}
                  className="text-emerald-400"
                />

                <span className="font-mono text-[10px] tracking-[0.18em] uppercase text-emerald-300/70">
                  Faithfulness Validation
                </span>
              </div>

              <h2
                className="
                  font-sans
                  text-[2.1rem]
                  font-bold
                  tracking-[-0.04em]
                  text-white
                "
              >
                AOPC Explainability Analysis
              </h2>

              <p className="mt-3 max-w-2xl text-sm leading-[1.8] text-white/58">
                Area Over Perturbation Curve measures whether
                highlighted regions genuinely influence model
                predictions. Positive values indicate faithful
                explainability.
              </p>
            </div>

            <div
              className="
                glass rounded-[22px]
                px-5 py-4
                border border-emerald-500/10
              "
            >
              <p className="font-mono text-[9px] tracking-[0.16em] uppercase text-white/45 mb-2">
                Best Faithfulness
              </p>

              <p className="font-sans text-[1.25rem] font-bold tracking-[-0.03em] text-emerald-300">
                EfficientNet-B0
              </p>
            </div>
          </div>

          <AOPCChart
            highlightModel={recommended?.model_key}
          />
        </div>
      </section>
    </div>
  )
}

function AlertTriangleIcon() {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      className="text-yellow-400"
    >
      <path
        d="M12 9V13"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <circle
        cx="12"
        cy="17"
        r="1"
        fill="currentColor"
      />
      <path
        d="M10.29 3.86L1.82 18A2 2 0 003.53 21H20.47A2 2 0 0022.18 18L13.71 3.86A2 2 0 0010.29 3.86Z"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}