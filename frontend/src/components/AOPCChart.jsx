import { useEffect, useState } from 'react'
import {
  ShieldCheck,
  Activity,
  BrainCircuit,
  Sparkles,
  TrendingUp,
  TrendingDown,
  ScanSearch,
  Trophy,
} from 'lucide-react'

const AOPC_DATA = {
  resnet18: {
    ig: -0.107,
    gradcam: -0.157,
    lime: -0.013,
  },

  efficientnet_b0: {
    ig: 0.136,
    gradcam: 0.054,
    lime: 0.087,
  },

  densenet121: {
    ig: 0.067,
    gradcam: -0.197,
    lime: -0.128,
  },
}

const XAI_META = {
  ig: {
    label: 'Integrated Gradients',
    gradient:
      'from-violet-400 via-fuchsia-400 to-purple-300',

    glow:
      'shadow-[0_0_60px_rgba(168,85,247,0.18)]',

    text: 'text-violet-300',

    border: 'border-violet-500/20',
  },

  gradcam: {
    label: 'Grad-CAM',

    gradient:
      'from-orange-400 via-amber-400 to-red-300',

    glow:
      'shadow-[0_0_60px_rgba(249,115,22,0.18)]',

    text: 'text-orange-300',

    border: 'border-orange-500/20',
  },

  lime: {
    label: 'LIME',

    gradient:
      'from-emerald-400 via-green-400 to-teal-300',

    glow:
      'shadow-[0_0_60px_rgba(34,197,94,0.18)]',

    text: 'text-emerald-300',

    border: 'border-emerald-500/20',
  },
}

const MODEL_LABELS = {
  resnet18: 'ResNet-18',
  efficientnet_b0: 'EfficientNet-B0',
  densenet121: 'DenseNet-121',
}

const MIN_VAL = -0.22
const MAX_VAL = 0.16
const RANGE = MAX_VAL - MIN_VAL

const ZERO_PCT = ((0 - MIN_VAL) / RANGE) * 100

function scoreColor(value) {
  if (value > 0) {
    return 'text-emerald-300'
  }

  return 'text-red-300'
}

function TelemetryBar({
  value,
  xai,
  delay = 0,
}) {
  const [width, setWidth] = useState(0)

  const meta = XAI_META[xai]

  const positive = value >= 0

  const barWidth = Math.abs((value / RANGE) * 100)

  useEffect(() => {
    const t = setTimeout(() => {
      setWidth(barWidth)
    }, delay)

    return () => clearTimeout(t)
  }, [barWidth, delay])

  return (
    <div className="space-y-2">
      {/* Top row */}
      <div className="flex items-center justify-between gap-3">
        <div className="flex items-center gap-2 min-w-0">
          <div
            className={[
              'w-2 h-2 rounded-full',
              meta.glow,
              xai === 'ig'
                ? 'bg-violet-400'
                : xai === 'gradcam'
                ? 'bg-orange-400'
                : 'bg-emerald-400',
            ].join(' ')}
          />

          <span
            className={[
              'font-mono text-[10px]',
              'tracking-[0.18em] uppercase truncate',
              meta.text,
            ].join(' ')}
          >
            {meta.label}
          </span>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          {positive ? (
            <TrendingUp
              size={12}
              className="text-emerald-400"
            />
          ) : (
            <TrendingDown
              size={12}
              className="text-red-400"
            />
          )}

          <span
            className={[
              'font-display text-sm font-black',
              scoreColor(value),
            ].join(' ')}
          >
            {positive ? '+' : ''}
            {value.toFixed(3)}
          </span>
        </div>
      </div>

      {/* Bar system */}
      <div
        className="
          relative h-4 overflow-hidden rounded-full
          border border-white/[0.05]
          bg-black/30 backdrop-blur-xl
        "
      >
        {/* Grid texture */}
        <div
          className="absolute inset-0 opacity-[0.06]"
          style={{
            backgroundImage: `
              linear-gradient(90deg, rgba(255,255,255,0.08) 1px, transparent 1px)
            `,
            backgroundSize: '18px 18px',
          }}
        />

        {/* Zero line */}
        <div
          className="
            absolute top-0 bottom-0 z-20
            w-px bg-white/20
          "
          style={{
            left: `${ZERO_PCT}%`,
          }}
        />

        {/* Positive/negative zone */}
        <div
          className="
            absolute inset-y-0 left-1/2
            border-l border-white/[0.03]
          "
        />

        {/* Main bar */}
        <div
          className={[
            'absolute top-0 h-full rounded-full',
            'bg-gradient-to-r transition-all duration-[1800ms]',
            'ease-[cubic-bezier(0.22,1,0.36,1)]',
            meta.gradient,
            meta.glow,
          ].join(' ')}
          style={{
            width: `${width}%`,

            ...(positive
              ? {
                  left: `${ZERO_PCT}%`,
                }
              : {
                  right: `${100 - ZERO_PCT}%`,
                }),
          }}
        >
          {/* Shimmer */}
          <div
            className="
              absolute inset-y-0 -left-1/3 w-1/3
              bg-gradient-to-r from-transparent via-white/30 to-transparent
              animate-[shimmer_2.5s_infinite]
            "
          />

          {/* Energy node */}
          <div
            className={[
              'absolute top-1/2 right-0 -translate-y-1/2',
              'w-5 h-5 rounded-full blur-xl',
              xai === 'ig'
                ? 'bg-violet-400/50'
                : xai === 'gradcam'
                ? 'bg-orange-400/50'
                : 'bg-emerald-400/50',
            ].join(' ')}
          />
        </div>
      </div>
    </div>
  )
}

function ModelPanel({
  modelKey,
  highlight,
  index,
}) {
  const model = AOPC_DATA[modelKey]

  const avg =
    Object.values(model).reduce((a, b) => a + b, 0) / 3

  return (
    <div
      className={[
        'group relative overflow-hidden rounded-[30px]',
        'border backdrop-blur-2xl',
        'transition-all duration-500',
        'hover:-translate-y-1',
        highlight
          ? 'border-emerald-500/20 bg-gradient-to-b from-emerald-950/10 via-black/30 to-black/40'
          : 'border-white/[0.06] bg-gradient-to-b from-white/[0.02] to-black/20',
      ].join(' ')}
      style={{
        animationDelay: `${index * 120}ms`,
      }}
    >
      {/* Atmospheric glow */}
      <div
        className={[
          'absolute -top-20 left-[20%]',
          'w-[220px] h-[220px] rounded-full blur-[120px]',
          highlight
            ? 'bg-emerald-500/10'
            : 'bg-cyan-500/10',
        ].join(' ')}
      />

      {/* Grid overlay */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `
            linear-gradient(rgba(255,255,255,0.08) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.08) 1px, transparent 1px)
          `,
          backgroundSize: '28px 28px',
        }}
      />

      <div className="relative z-10 p-5">
        {/* Header */}
        <div className="flex items-start justify-between gap-4 mb-6">
          {/* Left */}
          <div>
            {/* Top telemetry */}
            <div className="flex items-center gap-2 mb-3">
              <div
                className={[
                  'w-9 h-9 rounded-2xl',
                  'border flex items-center justify-center',
                  highlight
                    ? 'border-emerald-500/20 bg-emerald-500/10'
                    : 'border-white/[0.06] bg-white/[0.03]',
                ].join(' ')}
              >
                <BrainCircuit
                  size={16}
                  className={
                    highlight
                      ? 'text-emerald-400'
                      : 'text-cyan-400'
                  }
                />
              </div>

              {highlight && (
                <div
                  className="
                    inline-flex items-center gap-2
                    px-3 py-1.5 rounded-full
                    bg-emerald-500/10
                    border border-emerald-500/20
                  "
                >
                  <Trophy
                    size={12}
                    className="text-emerald-400"
                  />

                  <span className="font-mono text-[10px] tracking-[0.18em] uppercase text-emerald-300">
                    Best Faithfulness
                  </span>
                </div>
              )}
            </div>

            {/* Model name */}
            <h3 className="font-display text-2xl font-black text-white tracking-tight">
              {MODEL_LABELS[modelKey]}
            </h3>

            {/* Description */}
            <p className="mt-2 text-sm leading-relaxed text-white/40 max-w-lg">
              Attribution faithfulness evaluation across
              perturbation-aware explainability methods.
            </p>
          </div>

          {/* Average */}
          <div
            className={[
              'rounded-2xl px-4 py-3 border backdrop-blur-xl',
              avg > 0
                ? 'border-emerald-500/20 bg-emerald-500/10'
                : 'border-red-500/20 bg-red-500/10',
            ].join(' ')}
          >
            <div className="flex items-center gap-2 mb-1">
              <Activity
                size={12}
                className={
                  avg > 0
                    ? 'text-emerald-400'
                    : 'text-red-400'
                }
              />

              <span
                className={[
                  'font-mono text-[9px]',
                  'tracking-[0.18em] uppercase',
                  avg > 0
                    ? 'text-emerald-300'
                    : 'text-red-300',
                ].join(' ')}
              >
                Avg AOPC
              </span>
            </div>

            <p
              className={[
                'font-display text-2xl font-black',
                avg > 0
                  ? 'text-emerald-300'
                  : 'text-red-300',
              ].join(' ')}
            >
              {avg > 0 ? '+' : ''}
              {avg.toFixed(3)}
            </p>
          </div>
        </div>

        {/* Bars */}
        <div className="space-y-5">
          {Object.keys(XAI_META).map((xai, i) => (
            <TelemetryBar
              key={xai}
              value={model[xai]}
              xai={xai}
              delay={i * 180}
            />
          ))}
        </div>
      </div>
    </div>
  )
}

export default function AOPCChart({
  highlightModel,
}) {
  const best =
    highlightModel || 'efficientnet_b0'

  return (
    <div className="space-y-7">
      {/* ================================================= */}
      {/* HEADER */}
      {/* ================================================= */}

      <div
        className="
          relative overflow-hidden rounded-[34px]
          border border-white/[0.06]
          bg-gradient-to-b from-white/[0.02] to-black/20
          backdrop-blur-2xl
          p-6
        "
      >
        {/* Glow */}
        <div className="absolute -top-24 right-[-10%] w-[320px] h-[320px] rounded-full bg-emerald-500/10 blur-[160px]" />

        {/* Grid */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `
              linear-gradient(rgba(255,255,255,0.08) 1px, transparent 1px),
              linear-gradient(90deg, rgba(255,255,255,0.08) 1px, transparent 1px)
            `,
            backgroundSize: '34px 34px',
          }}
        />

        <div className="relative z-10">
          {/* Top telemetry */}
          <div className="flex items-center gap-2 mb-4">
            <ScanSearch
              size={14}
              className="text-emerald-400"
            />

            <span className="font-mono text-[10px] tracking-[0.24em] uppercase text-emerald-300/70">
              Explainability Fidelity Observatory
            </span>
          </div>

          {/* Title */}
          <h2 className="font-display text-4xl font-black text-white tracking-tight leading-none">
            AOPC Faithfulness Intelligence
          </h2>

          {/* Description */}
          <p className="mt-5 max-w-3xl text-sm leading-relaxed text-white/45">
            Area Over Perturbation Curve quantifies
            whether highlighted image regions genuinely
            influence model predictions. Positive scores
            indicate biologically relevant lesion attention
            rather than background bias.
          </p>

          {/* Legend */}
          <div className="mt-7 flex flex-wrap gap-3">
            {Object.entries(XAI_META).map(
              ([key, meta]) => (
                <div
                  key={key}
                  className={[
                    'inline-flex items-center gap-2',
                    'px-4 py-2 rounded-2xl',
                    'border backdrop-blur-xl',
                    meta.border,
                  ].join(' ')}
                >
                  <div
                    className={[
                      'w-2.5 h-2.5 rounded-full',
                      meta.glow,
                      key === 'ig'
                        ? 'bg-violet-400'
                        : key === 'gradcam'
                        ? 'bg-orange-400'
                        : 'bg-emerald-400',
                    ].join(' ')}
                  />

                  <span
                    className={[
                      'font-mono text-[10px]',
                      'tracking-[0.18em] uppercase',
                      meta.text,
                    ].join(' ')}
                  >
                    {meta.label}
                  </span>
                </div>
              )
            )}
          </div>
        </div>
      </div>

      {/* ================================================= */}
      {/* MODEL PANELS */}
      {/* ================================================= */}

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-5">
        {Object.keys(AOPC_DATA).map(
          (modelKey, index) => (
            <ModelPanel
              key={modelKey}
              modelKey={modelKey}
              highlight={modelKey === best}
              index={index}
            />
          )
        )}
      </div>

      {/* ================================================= */}
      {/* FOOTNOTE */}
      {/* ================================================= */}

      <div
        className="
          rounded-[28px]
          border border-emerald-500/10
          bg-emerald-950/10
          backdrop-blur-xl
          p-5
        "
      >
        <div className="flex items-start gap-4">
          <div
            className="
              w-12 h-12 rounded-2xl
              border border-emerald-500/20
              bg-emerald-500/10
              flex items-center justify-center
              shrink-0
            "
          >
            <ShieldCheck
              size={20}
              className="text-emerald-400"
            />
          </div>

          <div>
            <div className="flex items-center gap-2 mb-2">
              <Sparkles
                size={13}
                className="text-emerald-400"
              />

              <span className="font-mono text-[10px] tracking-[0.22em] uppercase text-emerald-300">
                Research Interpretation
              </span>
            </div>

            <p className="text-sm leading-relaxed text-emerald-100/75">
              EfficientNet-B0 demonstrates the strongest
              explainability faithfulness profile with
              consistently positive AOPC values across
              all attribution methods, suggesting the
              network attends to genuine pathological
              lesion structures rather than environmental
              artifacts or dataset bias.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}