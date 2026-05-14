import { useMemo, useState } from 'react'
import {
  Eye,
  X,
  Sparkles,
  ScanSearch,
  Microscope,
  ShieldCheck,
  MoveDiagonal,
  Expand,
  Activity,
  Layers3,
  Cpu,
} from 'lucide-react'

const XAI_META = [
  {
    key: 'grad_cam',
    label: 'Grad-CAM',
    short: 'Gradient Localization',
    color: 'orange',
    accent: 'from-orange-500/20 to-red-500/10',
    glow: 'shadow-[0_0_60px_rgba(249,115,22,0.12)]',
    text: 'text-orange-300',
    border: 'border-orange-500/20',
    description:
      'Gradient-weighted activation mapping isolates the most influential spatial lesion regions contributing to the neural classification.',
  },

  {
    key: 'lime',
    label: 'LIME',
    short: 'Perturbation Analysis',
    color: 'emerald',
    accent: 'from-emerald-500/20 to-green-500/10',
    glow: 'shadow-[0_0_60px_rgba(34,197,94,0.12)]',
    text: 'text-emerald-300',
    border: 'border-emerald-500/20',
    description:
      'Local interpretable surrogate modeling identifies biologically relevant superpixel segments affecting model confidence.',
  },

  {
    key: 'ig',
    label: 'Integrated Gradients',
    short: 'Attribution Field',
    color: 'violet',
    accent: 'from-violet-500/20 to-fuchsia-500/10',
    glow: 'shadow-[0_0_60px_rgba(168,85,247,0.12)]',
    text: 'text-violet-300',
    border: 'border-violet-500/20',
    description:
      'Path-integrated attribution analysis accumulates gradients across interpolation trajectories for faithful feature attribution.',
  },
]

function XAICard({
  meta,
  src,
  loading,
  onExpand,
}) {
  const [hovered, setHovered] = useState(false)

  return (
    <div
      className={[
        'group relative overflow-hidden rounded-[28px]',
        'border bg-black/20 backdrop-blur-xl',
        'transition-all duration-500',
        'hover:-translate-y-1',
        meta.border,
        meta.glow,
      ].join(' ')}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Ambient gradient */}
      <div
        className={[
          'absolute inset-0 opacity-60',
          `bg-gradient-to-br ${meta.accent}`,
        ].join(' ')}
      />

      {/* Neural grid */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `
            linear-gradient(rgba(255,255,255,0.08) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.08) 1px, transparent 1px)
          `,
          backgroundSize: '26px 26px',
        }}
      />

      {/* Scan beam */}
      <div
        className={[
          'absolute inset-y-0 w-24 blur-3xl opacity-0 group-hover:opacity-100',
          'transition-all duration-1000',
          hovered ? 'translate-x-[250%]' : '-translate-x-full',
          meta.color === 'orange'
            ? 'bg-orange-400/20'
            : meta.color === 'emerald'
            ? 'bg-emerald-400/20'
            : 'bg-violet-400/20',
        ].join(' ')}
      />

      {/* ================================================= */}
      {/* HEADER */}
      {/* ================================================= */}

      <div className="relative z-10 px-4 py-4 border-b border-white/[0.05]">
        <div className="flex items-start justify-between gap-3">
          {/* Left */}
          <div className="min-w-0">
            {/* Label */}
            <div className="flex items-center gap-2 mb-2">
              <div
                className={[
                  'w-2.5 h-2.5 rounded-full',
                  meta.color === 'orange'
                    ? 'bg-orange-400'
                    : meta.color === 'emerald'
                    ? 'bg-emerald-400'
                    : 'bg-violet-400',
                ].join(' ')}
              />

              <span
                className={[
                  'font-mono text-[10px]',
                  'tracking-[0.22em] uppercase',
                  meta.text,
                ].join(' ')}
              >
                {meta.label}
              </span>
            </div>

            {/* Title */}
            <h3 className="font-display font-bold text-lg text-white leading-none">
              {meta.short}
            </h3>
          </div>

          {/* Controls */}
          <div className="flex items-center gap-2">
            <div
              className="
                w-8 h-8 rounded-xl
                border border-white/[0.06]
                bg-white/[0.03]
                flex items-center justify-center
              "
            >
              <Activity
                size={13}
                className={meta.text}
              />
            </div>

            {src && (
              <button
                onClick={() => onExpand(meta, src)}
                className="
                  w-8 h-8 rounded-xl
                  border border-white/[0.06]
                  bg-white/[0.03]
                  flex items-center justify-center
                  text-white/40
                  hover:text-white
                  hover:border-white/[0.12]
                  transition-all duration-300
                "
              >
                <Expand size={13} />
              </button>
            )}
          </div>
        </div>
      </div>

      {/* ================================================= */}
      {/* IMAGE */}
      {/* ================================================= */}

      <div className="relative z-10 p-4">
        <div
          className="
            relative overflow-hidden rounded-[22px]
            border border-white/[0.06]
            bg-black/30
            aspect-[1/1]
          "
        >
          {/* Loading */}
          {loading ? (
            <div className="absolute inset-0 overflow-hidden">
              <div className="absolute inset-0 bg-white/[0.02]" />

              <div
                className="
                  absolute inset-y-0 -left-1/3 w-1/3
                  bg-gradient-to-r from-transparent via-white/10 to-transparent
                  animate-[shimmer_2s_infinite]
                "
              />

              <div className="absolute inset-0 flex flex-col items-center justify-center gap-3">
                <div
                  className="
                    w-14 h-14 rounded-2xl
                    border border-white/[0.06]
                    bg-white/[0.03]
                    flex items-center justify-center
                  "
                >
                  <Cpu
                    size={24}
                    className="text-white/40 animate-pulse"
                  />
                </div>

                <div className="text-center">
                  <p className="font-mono text-[11px] tracking-[0.2em] uppercase text-white/60">
                    Rendering XAI Surface
                  </p>
                </div>
              </div>
            </div>
          ) : src ? (
            <>
              {/* Image */}
              <img
                src={src}
                alt={meta.label}
                className="
                  absolute inset-0 w-full h-full
                  object-cover
                  transition-all duration-700
                  group-hover:scale-[1.045]
                "
              />

              {/* Overlay */}
              <div
                className="
                  absolute inset-0
                  bg-gradient-to-t from-black/70 via-transparent to-transparent
                "
              />

              {/* Telemetry */}
              <div className="absolute top-3 left-3 right-3 flex items-center justify-between">
                <div
                  className="
                    inline-flex items-center gap-2
                    px-2.5 py-1 rounded-full
                    bg-black/40 backdrop-blur-xl
                    border border-white/[0.06]
                  "
                >
                  <ScanSearch
                    size={11}
                    className={meta.text}
                  />

                  <span className="font-mono text-[9px] tracking-[0.18em] uppercase text-white/70">
                    Neural Attribution
                  </span>
                </div>

                <div
                  className="
                    w-8 h-8 rounded-xl
                    bg-black/40 backdrop-blur-xl
                    border border-white/[0.06]
                    flex items-center justify-center
                  "
                >
                  <Eye
                    size={13}
                    className="text-white/60"
                  />
                </div>
              </div>

              {/* Bottom analysis */}
              <div className="absolute bottom-0 inset-x-0 p-4">
                <div
                  className="
                    rounded-2xl
                    bg-black/50 backdrop-blur-2xl
                    border border-white/[0.06]
                    p-3
                  "
                >
                  <div className="flex items-center gap-2 mb-2">
                    <Microscope
                      size={12}
                      className={meta.text}
                    />

                    <span
                      className={[
                        'font-mono text-[9px]',
                        'tracking-[0.18em] uppercase',
                        meta.text,
                      ].join(' ')}
                    >
                      Lesion Analysis
                    </span>
                  </div>

                  <p className="text-[11px] leading-relaxed text-white/65">
                    {meta.description}
                  </p>
                </div>
              </div>
            </>
          ) : (
            <div className="absolute inset-0 flex flex-col items-center justify-center gap-4">
              <div
                className="
                  w-16 h-16 rounded-2xl
                  border border-white/[0.06]
                  bg-white/[0.03]
                  flex items-center justify-center
                "
              >
                <Layers3
                  size={26}
                  className="text-white/30"
                />
              </div>

              <div className="text-center">
                <p className="font-mono text-[11px] tracking-[0.2em] uppercase text-white/50">
                  No Explainability Surface
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Bottom metadata */}
        <div className="mt-4 flex items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <ShieldCheck
              size={12}
              className={meta.text}
            />

            <span className="font-mono text-[10px] tracking-[0.18em] uppercase text-white/50">
              XAI Verified
            </span>
          </div>

          <div className="flex items-center gap-2 text-white/40">
            <MoveDiagonal size={11} />

            <span className="font-mono text-[10px] tracking-[0.18em] uppercase">
              Interactive Surface
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}

function ExpandedModal({
  meta,
  image,
  onClose,
}) {
  if (!meta || !image) return null

  return (
    <div
      className="
        fixed inset-0 z-[200]
        bg-black/90 backdrop-blur-2xl
        flex items-center justify-center
        p-6
      "
      onClick={onClose}
    >
      {/* Background glow */}
      <div
        className={[
          'absolute w-[700px] h-[700px] rounded-full blur-[180px]',
          meta.color === 'orange'
            ? 'bg-orange-500/10'
            : meta.color === 'emerald'
            ? 'bg-emerald-500/10'
            : 'bg-violet-500/10',
        ].join(' ')}
      />

      <div
        className="
          relative z-10
          w-full max-w-7xl
          rounded-[34px]
          overflow-hidden
          border border-white/[0.08]
          bg-[#050816]/90
          backdrop-blur-3xl
        "
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top */}
        <div className="px-6 py-5 border-b border-white/[0.06] flex items-center justify-between">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <Sparkles
                size={14}
                className={meta.text}
              />

              <span
                className={[
                  'font-mono text-[10px]',
                  'tracking-[0.22em] uppercase',
                  meta.text,
                ].join(' ')}
              >
                Explainability Surface Inspection
              </span>
            </div>

            <h2 className="font-display text-3xl font-black text-white">
              {meta.label}
            </h2>
          </div>

          <button
            onClick={onClose}
            className="
              w-11 h-11 rounded-2xl
              border border-white/[0.06]
              bg-white/[0.03]
              flex items-center justify-center
              text-white/50
              hover:text-white
              transition-all duration-300
            "
          >
            <X size={18} />
          </button>
        </div>

        {/* Image */}
        <div className="p-6">
          <div
            className="
              relative overflow-hidden rounded-[28px]
              border border-white/[0.06]
              bg-black/40
            "
          >
            <img
              src={image}
              alt={meta.label}
              className="w-full max-h-[72vh] object-contain"
            />
          </div>

          {/* Description */}
          <div
            className="
              mt-6 rounded-[24px]
              border border-white/[0.06]
              bg-white/[0.02]
              p-5
            "
          >
            <div className="flex items-center gap-2 mb-3">
              <Microscope
                size={14}
                className={meta.text}
              />

              <span
                className={[
                  'font-mono text-[10px]',
                  'tracking-[0.22em] uppercase',
                  meta.text,
                ].join(' ')}
              >
                Attribution Interpretation
              </span>
            </div>

            <p className="text-sm leading-relaxed text-white/70">
              {meta.description}
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default function XAIPanel({
  xai,
  loading,
}) {
  const [expanded, setExpanded] = useState(null)

  const cards = useMemo(
    () =>
      XAI_META.map((meta) => ({
        meta,
        src: xai?.[meta.key],
      })),
    [xai]
  )

  return (
    <>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <Sparkles
                size={14}
                className="text-emerald-400"
              />

              <span className="font-mono text-[10px] tracking-[0.24em] uppercase text-emerald-300/70">
                Explainability Surfaces
              </span>
            </div>

            <h2 className="font-display text-3xl font-black text-white leading-none">
              Visual Neural Reasoning
            </h2>
          </div>

          <div
            className="
              inline-flex items-center gap-2
              px-4 py-2 rounded-2xl
              border border-emerald-500/20
              bg-emerald-500/5
            "
          >
            <ShieldCheck
              size={14}
              className="text-emerald-400"
            />

            <span className="font-mono text-[10px] tracking-[0.2em] uppercase text-emerald-300">
              Research-grade XAI Active
            </span>
          </div>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-5">
          {cards.map(({ meta, src }) => (
            <XAICard
              key={meta.key}
              meta={meta}
              src={src}
              loading={loading}
              onExpand={(meta, image) =>
                setExpanded({ meta, image })
              }
            />
          ))}
        </div>
      </div>

      {/* Expanded Modal */}
      <ExpandedModal
        meta={expanded?.meta}
        image={expanded?.image}
        onClose={() => setExpanded(null)}
      />
    </>
  )
}