import { useEffect, useMemo, useState } from 'react'

import {
  Cpu,
  Activity,
  BrainCircuit,
  ScanSearch,
  ShieldCheck,
  Sparkles,
  Database,
  Eye,
  Layers3,
  CheckCircle2,
} from 'lucide-react'

const PIPELINE = [
  {
    id: 'upload',
    title: 'Sample Acquisition',
    subtitle: 'Biological image ingestion',
    icon: Database,
    threshold: 8,
  },

  {
    id: 'cnn',
    title: 'CNN Inference',
    subtitle: 'Multi-model neural classification',
    icon: BrainCircuit,
    threshold: 28,
  },

  {
    id: 'gradcam',
    title: 'Grad-CAM',
    subtitle: 'Spatial lesion localization',
    icon: ScanSearch,
    threshold: 48,
  },

  {
    id: 'lime',
    title: 'LIME',
    subtitle: 'Perturbation explainability mapping',
    icon: Layers3,
    threshold: 70,
  },

  {
    id: 'ig',
    title: 'Integrated Gradients',
    subtitle: 'Attribution path integration',
    icon: Eye,
    threshold: 88,
  },

  {
    id: 'aopc',
    title: 'Faithfulness Validation',
    subtitle: 'AOPC explainability verification',
    icon: ShieldCheck,
    threshold: 100,
  },
]

function getStageDescription(progress) {
  if (progress < 15) {
    return 'Initializing neural diagnostic systems.'
  }

  if (progress < 35) {
    return 'Running convolutional inference across selected architectures.'
  }

  if (progress < 55) {
    return 'Generating lesion activation localization maps.'
  }

  if (progress < 75) {
    return 'Computing perturbation-based explainability surfaces.'
  }

  if (progress < 92) {
    return 'Accumulating integrated attribution trajectories.'
  }

  return 'Validating explainability faithfulness metrics.'
}

function NeuralPulse() {
  return (
    <div className="relative w-28 h-28">
      {/* Outer rings */}
      <div
        className="
          absolute inset-0 rounded-full
          border border-emerald-500/10
          animate-ping
        "
      />

      <div
        className="
          absolute inset-[12px] rounded-full
          border border-cyan-500/10
          animate-ping
        "
        style={{
          animationDelay: '400ms',
        }}
      />

      {/* Main core */}
      <div
        className="
          absolute inset-[22px]
          rounded-full
          border border-emerald-500/20
          bg-gradient-to-br
          from-emerald-500/20
          to-cyan-500/10
          backdrop-blur-xl
          flex items-center justify-center
          shadow-[0_0_120px_rgba(34,197,94,0.18)]
        "
      >
        <Cpu
          size={30}
          className="text-emerald-300 animate-pulse"
        />
      </div>

      {/* Rotating orbital */}
      <div
        className="
          absolute inset-0
          rounded-full
          border border-transparent
          border-t-emerald-400/40
          animate-spin
        "
        style={{
          animationDuration: '6s',
        }}
      />

      {/* Secondary orbital */}
      <div
        className="
          absolute inset-[8px]
          rounded-full
          border border-transparent
          border-r-cyan-400/30
          animate-spin
        "
        style={{
          animationDirection: 'reverse',
          animationDuration: '9s',
        }}
      />
    </div>
  )
}

function PipelineNode({
  item,
  active,
  completed,
  index,
}) {
  const Icon = item.icon

  return (
    <div
      className={[
        'group relative overflow-hidden rounded-[28px]',
        'border backdrop-blur-xl',
        'transition-all duration-700',
        completed
          ? 'border-emerald-500/20 bg-emerald-500/5'
          : active
          ? 'border-cyan-500/20 bg-cyan-500/5'
          : 'border-white/[0.05] bg-white/[0.02]',
      ].join(' ')}
      style={{
        animationDelay: `${index * 120}ms`,
      }}
    >
      {/* Glow */}
      <div
        className={[
          'absolute inset-0 opacity-40',
          completed
            ? 'bg-[radial-gradient(circle_at_top,rgba(34,197,94,0.18),transparent_70%)]'
            : active
            ? 'bg-[radial-gradient(circle_at_top,rgba(6,182,212,0.18),transparent_70%)]'
            : '',
        ].join(' ')}
      />

      {/* Scan shimmer */}
      {(active || completed) && (
        <div
          className="
            absolute inset-y-0 -left-1/3 w-1/3
            bg-gradient-to-r
            from-transparent
            via-white/10
            to-transparent
            animate-[shimmer_2.8s_infinite]
          "
        />
      )}

      <div className="relative z-10 p-4">
        {/* Top */}
        <div className="flex items-start justify-between gap-3 mb-4">
          {/* Icon */}
          <div
            className={[
              'relative w-12 h-12 rounded-2xl',
              'border flex items-center justify-center',
              completed
                ? 'border-emerald-500/20 bg-emerald-500/10'
                : active
                ? 'border-cyan-500/20 bg-cyan-500/10'
                : 'border-white/[0.06] bg-white/[0.03]',
            ].join(' ')}
          >
            {/* Glow */}
            <div
              className={[
                'absolute inset-0 rounded-2xl blur-xl opacity-60',
                completed
                  ? 'bg-emerald-500/10'
                  : active
                  ? 'bg-cyan-500/10'
                  : '',
              ].join(' ')}
            />

            {completed ? (
              <CheckCircle2
                size={18}
                className="relative z-10 text-emerald-300"
              />
            ) : (
              <Icon
                size={18}
                className={[
                  'relative z-10',
                  active
                    ? 'text-cyan-300'
                    : 'text-white/35',
                ].join(' ')}
              />
            )}
          </div>

          {/* Status */}
          <div
            className={[
              'px-2.5 py-1 rounded-full',
              'border font-mono text-[9px]',
              'tracking-[0.18em] uppercase',
              completed
                ? 'border-emerald-500/20 bg-emerald-500/10 text-emerald-300'
                : active
                ? 'border-cyan-500/20 bg-cyan-500/10 text-cyan-300'
                : 'border-white/[0.05] bg-white/[0.02] text-white/30',
            ].join(' ')}
          >
            {completed
              ? 'complete'
              : active
              ? 'active'
              : 'queued'}
          </div>
        </div>

        {/* Text */}
        <h3
          className={[
            'font-display text-lg font-black tracking-tight',
            completed
              ? 'text-emerald-100'
              : active
              ? 'text-cyan-100'
              : 'text-white/55',
          ].join(' ')}
        >
          {item.title}
        </h3>

        <p
          className={[
            'mt-2 text-[12px] leading-relaxed',
            completed
              ? 'text-emerald-100/55'
              : active
              ? 'text-cyan-100/55'
              : 'text-white/30',
          ].join(' ')}
        >
          {item.subtitle}
        </p>
      </div>
    </div>
  )
}

export default function ProgressIndicator({
  progress = 0,
  stage,
}) {
  const [animated, setAnimated] = useState(0)

  useEffect(() => {
    const t = setTimeout(() => {
      setAnimated(progress)
    }, 120)

    return () => clearTimeout(t)
  }, [progress])

  const description = useMemo(
    () => getStageDescription(progress),
    [progress]
  )

  return (
    <section className="space-y-7 animate-fade-up">
      {/* ================================================= */}
      {/* HERO PANEL */}
      {/* ================================================= */}

      <div
        className="
          relative overflow-hidden rounded-[38px]
          border border-emerald-500/10
          bg-gradient-to-b from-emerald-950/10 via-black/30 to-black/40
          backdrop-blur-2xl
          p-8
        "
      >
        {/* Atmospheric glows */}
        <div className="absolute -top-28 left-[-10%] w-[320px] h-[320px] rounded-full bg-emerald-500/10 blur-[160px]" />

        <div className="absolute bottom-[-140px] right-[-10%] w-[320px] h-[320px] rounded-full bg-cyan-500/10 blur-[160px]" />

        {/* Grid */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `
              linear-gradient(rgba(255,255,255,0.08) 1px, transparent 1px),
              linear-gradient(90deg, rgba(255,255,255,0.08) 1px, transparent 1px)
            `,
            backgroundSize: '38px 38px',
          }}
        />

        <div className="relative z-10 flex flex-col lg:flex-row lg:items-center gap-10">
          {/* Left */}
          <div className="flex items-center justify-center lg:justify-start">
            <NeuralPulse />
          </div>

          {/* Right */}
          <div className="flex-1">
            {/* Top telemetry */}
            <div className="flex items-center gap-2 mb-4">
              <Sparkles
                size={14}
                className="text-emerald-400"
              />

              <span className="font-mono text-[10px] tracking-[0.24em] uppercase text-emerald-300/70">
                Neural Diagnostic Pipeline Active
              </span>
            </div>

            {/* Main title */}
            <h2
              className="
                font-display
                font-black
                leading-[0.94]
                tracking-[-0.04em]
                text-[2.3rem]
                sm:text-[3.2rem]
                text-white
              "
            >
              {stage?.label ||
                'Initializing neural systems'}
            </h2>

            {/* Description */}
            <p className="mt-5 max-w-3xl text-[15px] leading-[1.9] text-white/45">
              {description}
            </p>

            {/* Metrics */}
            <div className="mt-8 flex flex-wrap gap-4">
              {/* Progress */}
              <div
                className="
                  rounded-2xl
                  border border-emerald-500/10
                  bg-emerald-500/5
                  px-5 py-4
                  min-w-[150px]
                "
              >
                <div className="flex items-center gap-2 mb-2">
                  <Activity
                    size={13}
                    className="text-emerald-400"
                  />

                  <span className="font-mono text-[10px] tracking-[0.2em] uppercase text-emerald-300/70">
                    Progress
                  </span>
                </div>

                <p className="font-display text-3xl font-black text-white">
                  {animated}
                  <span className="text-emerald-400">
                    %
                  </span>
                </p>
              </div>

              {/* Status */}
              <div
                className="
                  rounded-2xl
                  border border-cyan-500/10
                  bg-cyan-500/5
                  px-5 py-4
                  min-w-[170px]
                "
              >
                <div className="flex items-center gap-2 mb-2">
                  <Cpu
                    size={13}
                    className="text-cyan-400"
                  />

                  <span className="font-mono text-[10px] tracking-[0.2em] uppercase text-cyan-300/70">
                    System Status
                  </span>
                </div>

                <p className="font-display text-xl font-black text-cyan-200">
                  Processing
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ================================================= */}
      {/* PROGRESS BAR */}
      {/* ================================================= */}

      <div
        className="
          relative overflow-hidden rounded-[32px]
          border border-white/[0.06]
          bg-gradient-to-b from-white/[0.02] to-black/20
          backdrop-blur-2xl
          p-6
        "
      >
        {/* Glow */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_left,rgba(34,197,94,0.10),transparent_40%)]" />

        <div className="relative z-10">
          {/* Top */}
          <div className="flex items-center justify-between gap-4 mb-5">
            <div className="flex items-center gap-2">
              <BrainCircuit
                size={15}
                className="text-emerald-400"
              />

              <span className="font-mono text-[10px] tracking-[0.22em] uppercase text-emerald-300/70">
                Pipeline Completion
              </span>
            </div>

            <span className="font-display text-2xl font-black text-white">
              {animated.toFixed(0)}%
            </span>
          </div>

          {/* Main bar */}
          <div
            className="
              relative overflow-hidden
              h-5 rounded-full
              border border-white/[0.05]
              bg-black/30
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

            {/* Main fill */}
            <div
              className="
                relative h-full rounded-full overflow-hidden
                bg-gradient-to-r
                from-emerald-400
                via-green-400
                to-cyan-300
                transition-all duration-[1800ms]
                ease-[cubic-bezier(0.22,1,0.36,1)]
                shadow-[0_0_80px_rgba(34,197,94,0.18)]
              "
              style={{
                width: `${animated}%`,
              }}
            >
              {/* Shimmer */}
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

              {/* Energy node */}
              <div
                className="
                  absolute top-1/2 right-0 -translate-y-1/2
                  w-8 h-8 rounded-full
                  bg-emerald-300/40
                  blur-xl
                "
              />
            </div>
          </div>

          {/* Bottom telemetry */}
          <div className="mt-3 flex items-center justify-between">
            <span className="font-mono text-[9px] tracking-[0.18em] uppercase text-white/30">
              neural throughput active
            </span>

            <span className="font-mono text-[9px] tracking-[0.18em] uppercase text-emerald-300/50">
              explainability orchestration
            </span>
          </div>
        </div>
      </div>

      {/* ================================================= */}
      {/* PIPELINE GRID */}
      {/* ================================================= */}

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
        {PIPELINE.map((item, index) => {
          const completed =
            progress >= item.threshold

          const active =
            progress >= item.threshold - 18 &&
            !completed

          return (
            <PipelineNode
              key={item.id}
              item={item}
              active={active}
              completed={completed}
              index={index}
            />
          )
        })}
      </div>
    </section>
  )
}