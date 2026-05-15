import KrishiSage from './components/KrishiSage'

import { useState, useEffect } from 'react'

import {
  SignedIn,
  SignedOut,
  SignInButton,
  UserButton,
} from '@clerk/clerk-react'

import {
  Leaf,
  BookOpen,
  AlertCircle,
  Activity,
  ShieldCheck,
  Sparkles,
  BrainCircuit,
  ScanSearch,
  Database,
  Cpu,
  Orbit,
  ArrowRight,
} from 'lucide-react'

import ImageUpload from './components/ImageUpload'
import ModelSelector from './components/ModelSelector'
import ProgressIndicator from './components/ProgressIndicator'
import ResultsDashboard from './components/ResultsDashboard'

import { usePrediction } from './hooks/usePrediction'
import { checkHealth } from './services/api'

function StatusDot({ online }) {
  return (
    <div className="flex items-center gap-2">
      <div
        className={[
          'relative w-2.5 h-2.5 rounded-full',
          online === null
            ? 'bg-yellow-400'
            : online
            ? 'bg-emerald-400'
            : 'bg-red-500',
        ].join(' ')}
      >
        <div
          className={[
            'absolute inset-0 rounded-full animate-ping',
            online === null
              ? 'bg-yellow-400'
              : online
              ? 'bg-emerald-400'
              : 'bg-red-500',
          ].join(' ')}
        />
      </div>

      <span
        className={[
          'font-mono text-[10px] tracking-[0.24em] uppercase',
          online === null
            ? 'text-yellow-400'
            : online
            ? 'text-emerald-300'
            : 'text-red-400',
        ].join(' ')}
      >
        {online === null
          ? 'Connecting'
          : online
          ? 'API Online'
          : 'API Offline'}
      </span>
    </div>
  )
}

function FloatingParticle({
  className = '',
  delay = '0s',
  duration = '12s',
}) {
  return (
    <div
      className={[
        'absolute rounded-full blur-3xl opacity-20',
        className,
      ].join(' ')}
      style={{
        animation: `float ${duration} ease-in-out infinite`,
        animationDelay: delay,
      }}
    />
  )
}

function MetricCard({
  value,
  label,
  icon: Icon,
  glow = 'emerald',
}) {
  const glowMap = {
    emerald:
      'shadow-[0_0_80px_rgba(34,197,94,0.10)]',
    cyan:
      'shadow-[0_0_80px_rgba(6,182,212,0.10)]',
    violet:
      'shadow-[0_0_80px_rgba(124,58,237,0.10)]',
  }

  return (
    <div
      className={[
        'group relative overflow-hidden min-h-[165px]',
        'rounded-[28px]',
        'border border-white/[0.06]',
        'bg-gradient-to-b from-white/[0.04] to-black/20',
        'backdrop-blur-2xl',
        'p-4',
        'transition-all duration-500',
        'hover:-translate-y-1',
        glowMap[glow],
      ].join(' ')}
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.05),transparent_70%)]" />

      <div className="relative z-10">
        <div
          className="
            w-12 h-12 rounded-2xl
            border border-white/[0.08]
            bg-white/[0.03]
            flex items-center justify-center
            mb-5
          "
        >
          <Icon
            size={20}
            className="text-white/80"
          />
        </div>

        
        <p className="font-sans text-[2rem] font-bold tracking-[-0.05em] text-white">
  {value}
        </p>       

        <p className="mt-2 font-mono text-[10px] tracking-[0.22em] uppercase text-white/52">
          {label}
        </p>
      </div>
    </div>
  )
}

function PipelineCard() {
  const steps = [
    {
      step: '01',
      title: 'CNN Inference',
      desc:
        'Multi-model classification across ResNet-18, EfficientNet-B0, and DenseNet-121.',
      icon: BrainCircuit,
    },

    {
      step: '02',
      title: 'Grad-CAM Attribution',
      desc:
        'Spatial lesion localization via gradient-weighted activation mapping.',
      icon: ScanSearch,
    },

    {
      step: '03',
      title: 'LIME Analysis',
      desc:
        'Superpixel perturbation explainability for localized interpretation.',
      icon: Orbit,
    },

    {
      step: '04',
      title: 'Integrated Gradients',
      desc:
        'Path-integrated attribution accumulation for neural transparency.',
      icon: Activity,
    },

    {
      step: '05',
      title: 'AOPC Validation',
      desc:
        'Quantitative faithfulness verification across attribution methods.',
      icon: ShieldCheck,
    },
  ]

  return (
    <div
      className="
        relative overflow-hidden
        rounded-[28px]
        border border-white/[0.06]
        bg-gradient-to-b from-white/[0.03] to-black/20
        backdrop-blur-2xl
        p-6
      "
    >
      {/* Glow */}
      <div className="absolute -top-20 right-[-10%] w-[240px] h-[240px] rounded-full bg-emerald-500/10 blur-[120px]" />

      {/* Grid */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `
            linear-gradient(rgba(255,255,255,0.08) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.08) 1px, transparent 1px)
          `,
          backgroundSize: '30px 30px',
        }}
      />

      <div className="relative z-10">
        {/* Header */}
        <div className="flex items-center gap-3 mb-7">
          <div
            className="
              w-11 h-11 rounded-2xl
              border border-emerald-500/20
              bg-emerald-500/10
              flex items-center justify-center
            "
          >
            <Cpu
              size={18}
              className="text-emerald-300"
            />
          </div>

          <div>
            <p className="font-sans text-[1.05rem] font-semibold tracking-[-0.02em] text-white">
              Neural Explainability Pipeline
            </p>

            <p className="mt-1 font-mono text-[10px] tracking-[0.22em] uppercase text-white/45">
              Research-grade diagnostic workflow
            </p>
          </div>
        </div>

        {/* Steps */}
        <div className="space-y-3">
          {steps.map((item) => {
            const Icon = item.icon

            return (
              <div
                key={item.step}
                className="
                  group relative overflow-hidden
                  rounded-2xl
                  border border-white/[0.05]
                  bg-white/[0.02]
                  p-4
                  transition-all duration-300
                  hover:border-emerald-500/15
                  hover:bg-emerald-500/[0.03]
                "
              >
                <div className="flex gap-4">
                  {/* Step */}
                  <div
                    className="
                      relative shrink-0
                      w-11 h-11 rounded-2xl
                      border border-white/[0.08]
                      bg-white/[0.03]
                      flex items-center justify-center
                    "
                  >
                    <Icon
                      size={16}
                      className="text-emerald-300"
                    />
                  </div>

                  {/* Text */}
                  <div className="flex-1">
                    <div className="flex items-center gap-3">
                      <span className="font-mono text-[10px] tracking-[0.18em] uppercase text-emerald-300">
                        {item.step}
                      </span>

                      <div className="h-px flex-1 bg-white/[0.05]" />
                    </div>

                    <p className="mt-2 font-semibold text-white">
                      {item.title}
                    </p>

                    <p className="mt-1 text-[12px] leading-[1.7] text-white/50">
                      {item.desc}
                    </p>
                  </div>
                </div>
              </div>
            )
          })}
        </div>

        {/* Footer */}
        <div
          className="
            mt-6 rounded-2xl
            border border-emerald-500/10
            bg-emerald-500/[0.04]
            p-4
          "
        >
          <div className="flex items-start gap-3">
            <ShieldCheck
              size={18}
              className="text-emerald-400 shrink-0 mt-0.5"
            />

            <div>
              <p className="font-medium text-emerald-100">
                Explainability Verification Active
              </p>

              <p className="mt-1 text-[12px] leading-relaxed text-emerald-100/50">
                Attribution outputs validated using
                Area Over Perturbation Curve (AOPC)
                fidelity analysis.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default function App() {
  const [imageFile, setImageFile] = useState(null)

  const [selectedModels, setSelectedModels] =
    useState([
      'resnet18',
      'efficientnet_b0',
      'densenet121',
    ])

  const [apiOnline, setApiOnline] =
    useState(null)

  const {
    status,
    progress,
    stage,
    result,
    error,
    duration,
    predict,
    reset,
  } = usePrediction()

  useEffect(() => {
    let cancelled = false

    const check = async () => {
      try {
        await checkHealth()

        if (!cancelled) {
          setApiOnline(true)
        }
      } catch {
        if (!cancelled) {
          setApiOnline(false)
        }
      }
    }

    check()

    const id = setInterval(check, 30000)

    return () => {
      cancelled = true
      clearInterval(id)
    }
  }, [])

  const handleReset = () => {
    reset()
    setImageFile(null)
  }

  const canAnalyse =
    imageFile &&
    selectedModels.length > 0 &&
    status !== 'uploading' &&
    status !== 'processing'

  const isProcessing =
    status === 'uploading' ||
    status === 'processing'

  return (
    <div className="relative min-h-screen overflow-hidden bg-[#020617] pb-10">
      {/* ================================================= */}
      {/* ATMOSPHERIC BACKGROUND */}
      {/* ================================================= */}

      <FloatingParticle
        className="top-[-180px] left-[-140px] w-[520px] h-[520px] bg-emerald-500"
        delay="0s"
        duration="18s"
      />

      <FloatingParticle
        className="top-[10%] right-[-140px] w-[420px] h-[420px] bg-cyan-500"
        delay="-4s"
        duration="22s"
      />

      <FloatingParticle
        className="bottom-[-200px] left-[20%] w-[480px] h-[480px] bg-violet-500"
        delay="-8s"
        duration="24s"
      />

      {/* ================================================= */}
      {/* HEADER */}
      {/* ================================================= */}

      <header
        className="
          sticky top-0 z-50
          border-b border-white/[0.06]
          bg-black/20
          backdrop-blur-2xl
        "
      >
        <div className="max-w-[1450px] mx-auto px-4 sm:px-6 py-4 flex items-center justify-between gap-4">
          {/* Brand */}
          <div className="flex items-center gap-4">
            <div
              className="
                relative overflow-hidden
                w-12 h-12 rounded-[18px]
                border border-emerald-500/20
                bg-gradient-to-br
                from-emerald-500/20
                to-emerald-500/5
                flex items-center justify-center
                shadow-[0_0_60px_rgba(34,197,94,0.12)]
              "
            >
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.10),transparent_70%)]" />

              <Leaf
                size={20}
                className="relative z-10 text-emerald-300"
              />
            </div>

            <div>
              <div className="flex items-center gap-3">
                <h1 className="font-sans text-[1.7rem] font-extrabold tracking-[-0.03em] text-white">
                  KrishiLynk
                </h1>

                <div
                  className="
                    px-2.5 py-1 rounded-full
                    border border-emerald-500/20
                    bg-emerald-500/10
                  "
                >
                  <span className="font-mono text-[9px] tracking-[0.2em] uppercase text-emerald-300">
                    v1
                  </span>
                </div>
              </div>

              <p className="hidden sm:block mt-1 font-mono text-[10px] tracking-[0.24em] uppercase text-white/45">
                Explainable AI for Crop Disease Intelligence.
              </p>
            </div>
          </div>

          {/* Right */}
          {/* Right */}
<div className="flex items-center gap-4">
  <StatusDot online={apiOnline} />

  <SignedOut>
    <SignInButton mode="modal">
      <button
        className="
          h-11 px-5 rounded-[18px]
          border border-emerald-500/20
          bg-emerald-500/10
          backdrop-blur-xl
          text-sm font-medium text-emerald-300
          hover:bg-emerald-500/15
          hover:border-emerald-500/30
          transition-all duration-300
        "
      >
        Sign In
      </button>
    </SignInButton>
  </SignedOut>

  <SignedIn>
    <div className="flex items-center gap-3">
      <div
        className="
          hidden sm:flex items-center gap-2
          px-3 py-2 rounded-[16px]
          border border-white/[0.06]
          bg-white/[0.03]
          text-white/55
        "
      >
        <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />

        <span className="font-mono text-[10px] tracking-[0.16em] uppercase">
          Authenticated
        </span>
      </div>

      <UserButton
        appearance={{
          elements: {
            avatarBox:
              'w-11 h-11 ring-2 ring-emerald-500/20',
          },
        }}
      />
    </div>
  </SignedIn>
</div>
        </div>
      </header>

      {/* ================================================= */}
      {/* MAIN */}
      {/* ================================================= */}

      <main
        className="
        relative z-10
        max-w-[1450px]
        mx-auto
        px-4 sm:px-6 py-8

        before:absolute
        before:inset-0
        before:pointer-events-none
        before:bg-[radial-gradient(circle_at_top,rgba(16,185,129,0.08),transparent_55%)]
        "
      >
        {status === 'done' ? (
          <ResultsDashboard
            result={result}
            onReset={handleReset}
            duration={duration}
          />
        ) : (
          <div className="grid grid-cols-1 xl:grid-cols-[1.15fr_0.85fr] gap-6 xl:gap-7 items-start">
            {/* ================================================= */}
            {/* LEFT */}
            {/* ================================================= */}

            <div className="space-y-6">
              {/* ================================================= */}
              {/* HERO */}
              {/* ================================================= */}

              <section
                className="
                  relative overflow-hidden
                  rounded-[28px]
                  border border-white/[0.06]
                  bg-gradient-to-b
                  from-white/[0.03]
                  to-black/20
                  backdrop-blur-2xl
                  px-7 py-8 sm:px-9 sm:py-9 lg:px-10 lg:py-10
                  animate-fade-up
                "
              >
                {/* Glow */}
                <div className="absolute -top-24 left-[-10%] w-[320px] h-[320px] rounded-full bg-emerald-500/10 blur-[160px]" />

                <div className="absolute top-[20%] right-[-10%] w-[280px] h-[280px] rounded-full bg-cyan-500/10 blur-[160px]" />

                {/* Grid */}
                <div
                  className="absolute inset-0 opacity-[0.03]"
                  style={{
                    backgroundImage: `
                      linear-gradient(rgba(255,255,255,0.08) 1px, transparent 1px),
                      linear-gradient(90deg, rgba(255,255,255,0.08) 1px, transparent 1px)
                    `,
                    backgroundSize: '42px 42px',
                  }}
                />

                <div className="relative z-10">
                  {/* Telemetry */}
                  <div
                    className="
                      inline-flex items-center gap-3
                      rounded-full
                      border border-emerald-500/20
                      bg-emerald-500/5
                      px-4 py-2
                      backdrop-blur-xl
                      mb-8
                    "
                  >
                    <div className="relative">
                      <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />

                      <div className="absolute inset-0 rounded-full bg-emerald-400 animate-ping opacity-60" />
                    </div>

                    <span className="font-mono text-[10px] tracking-[0.26em] uppercase text-emerald-300">
                      Research-Grade Neural Intelligence
                    </span>
                  </div>

                  {/* Heading */} 
                  <div className="max-w-[980px]">
  {/* Main heading */}
  <h1
    className="
      font-sans
      font-black
      leading-[0.96]
      tracking-[-0.045em]
      text-[2.9rem]
      sm:text-[4.4rem]
      lg:text-[4.6rem]
      xl:text-[5rem]
      text-white
    "
  >
    <span className="text-white">
      KrishiLynk.
    </span>

    <br />

    <span
      className="
        bg-gradient-to-r
        from-emerald-200
        via-green-400
        to-cyan-300
        bg-clip-text
        text-transparent
      "
    >
      Explainable AI
    </span>

    <span className="text-white/92">
      {' '}for Crop
    </span>

    <br />

    <span className="text-white/92">
      Disease Intelligence
    </span>
  </h1>

  {/* Premium subtitle */}
  <div className="mt-6 flex items-center gap-3">
    <div className="h-px w-16 bg-gradient-to-r from-emerald-400 to-transparent" />

    <span
      className="
        font-mono
        text-[10px]
        tracking-[0.28em]
        uppercase
        text-emerald-300/80
      "
    >
      Research-Grade Agricultural Neural Systems
    </span>
  </div>
</div>

                  {/* Description */}
                  <p
                    className="
                      mt-6
                      max-w-3xl
                      text-[15px]
                      sm:text-[16px]
                      leading-[1.9]
                      text-white/58
                      font-light
                    "
                  >
                    Research-grade explainable
                    artificial intelligence platform
                    for precision agricultural
                    diagnostics, combining multi-model
                    convolutional inference,
                    Grad-CAM lesion localization,
                    Integrated Gradients attribution,
                    LIME perturbation explainability,
                    and AOPC faithfulness validation
                    into a unified neural diagnostic
                    workflow.
                  </p>

                  {/* Capability pills */}
                  <div className="mt-6 flex flex-wrap gap-3">
                    {[
                      'Explainable AI',
                      'Multi-Model CNNs',
                      'Research-Grade XAI',
                      'AOPC Validation',
                      'Precision Agriculture',
                    ].map((item) => (
                      <div
                        key={item}
                        className="
                          rounded-2xl
                          border border-white/[0.06]
                          bg-white/[0.03]
                          px-4 py-2
                          backdrop-blur-xl
                          transition-all duration-300
                          hover:border-emerald-500/20
                          hover:bg-emerald-500/[0.03]
                        "
                      >
                        <span className="font-mono text-[10px] tracking-[0.18em] uppercase text-white/60">
                          {item}
                        </span>
                      </div>
                    ))}
                  </div>

                  {/* CTA */}
                  {/* CTA */}
<div className="mt-8 flex flex-wrap gap-4">
  <SignedOut>
    <SignInButton mode="modal">
      <button
        className="
          inline-flex items-center gap-3
          rounded-2xl
          bg-gradient-to-r
          from-emerald-500
          to-green-400
          px-6 py-4
          font-semibold text-black
          shadow-[0_0_80px_rgba(34,197,94,0.18)]
          transition-all duration-300
          hover:scale-[1.02]
        "
      >
        Access Neural Platform

        <ArrowRight size={18} />
      </button>
    </SignInButton>
  </SignedOut>

  <SignedIn>
    <button
      onClick={() => {
        const uploadZone =
          document.getElementById('upload-zone')

        if (uploadZone) {
          uploadZone.scrollIntoView({
            behavior: 'smooth',
            block: 'start',
          })
        }
      }}
      className="
        inline-flex items-center gap-3
        rounded-2xl
        bg-gradient-to-r
        from-emerald-500
        to-green-400
        px-6 py-4
        font-semibold text-black
        shadow-[0_0_80px_rgba(34,197,94,0.18)]
        transition-all duration-300
        hover:scale-[1.02]
      "
    >
      Begin Neural Analysis

      <ArrowRight size={18} />
    </button>
  </SignedIn>

  <div
    className="
      flex items-center gap-3
      rounded-2xl
      border border-white/[0.06]
      bg-white/[0.03]
      px-5 py-4
      backdrop-blur-xl
    "
  >
    <Database
      size={18}
      className="text-cyan-300"
    />

    <div>
      <p className="font-medium text-white">
        Multi-Model Pipeline
      </p>

      <p className="text-[11px] text-white/52">
        ResNet · EfficientNet · DenseNet
      </p>
    </div>
  </div>
</div>

                  {/* Stats */}
                  <div className="mt-9 grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <MetricCard
                      value="3"
                      label="Neural Architectures"
                      icon={BrainCircuit}
                      glow="emerald"
                    />

                    <MetricCard
                      value="4"
                      label="Explainability Systems"
                      icon={ScanSearch}
                      glow="cyan"
                    />

                    <MetricCard
                      value="AOPC"
                      label="Faithfulness Validation"
                      icon={ShieldCheck}
                      glow="violet"
                    />
                  </div>
                </div>
              </section>

              {/* ================================================= */}
{/* PROTECTED PLATFORM */}
{/* ================================================= */}

<SignedIn>
  {/* ================================================= */}
  {/* IMAGE UPLOAD */}
  {/* ================================================= */}

  <div
    id="upload-zone"
    className="animate-fade-up"
    style={{
      animationDelay: '100ms',
    }}
  >
    <ImageUpload
      onImageSelected={setImageFile}
      disabled={isProcessing}
    />
  </div>

  {/* ================================================= */}
  {/* PROGRESS */}
  {/* ================================================= */}

  {isProcessing && (
    <ProgressIndicator
      progress={progress}
      stage={stage}
    />
  )}

  {/* ================================================= */}
  {/* ERROR */}
  {/* ================================================= */}

  {status === 'error' && (
    <div
      className="
        relative overflow-hidden
        rounded-[28px]
        border border-red-500/20
        bg-red-950/20
        backdrop-blur-2xl
        p-6
        animate-fade-up
      "
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(239,68,68,0.12),transparent_70%)]" />

      <div className="relative z-10 flex gap-4">
        <div
          className="
            w-12 h-12 rounded-2xl
            border border-red-500/20
            bg-red-500/10
            flex items-center justify-center
            shrink-0
          "
        >
          <AlertCircle
            size={20}
            className="text-red-400"
          />
        </div>

        <div className="flex-1">
          <p className="font-sans text-xl font-bold tracking-[-0.03em] text-red-200">
            Neural Analysis Failed
          </p>

          <p className="mt-2 text-sm leading-relaxed text-red-100/60">
            {error}
          </p>

          <button
            onClick={reset}
            className="
              mt-4 inline-flex items-center gap-2
              rounded-xl
              border border-red-500/20
              bg-red-500/10
              px-4 py-2
              text-sm font-medium text-red-300
              transition-all duration-300
              hover:bg-red-500/15
            "
          >
            Retry Analysis
          </button>
        </div>
      </div>
    </div>
  )}

  {/* ================================================= */}
  {/* ANALYSE BUTTON */}
  {/* ================================================= */}

  {!isProcessing && (
    <button
      onClick={() =>
        predict(imageFile, selectedModels)
      }
      disabled={!canAnalyse}
      className="
        group relative overflow-hidden
        w-full rounded-[28px]
        border border-emerald-500/20
        bg-gradient-to-r
        from-emerald-500
        via-green-400
        to-cyan-400
        py-4
        text-[15px] font-semibold tracking-[-0.01em] text-black
        shadow-[0_10px_60px_rgba(34,197,94,0.12)]
        transition-all duration-500
        hover:-translate-y-[2px]
        disabled:cursor-not-allowed
        disabled:opacity-40
      "
    >
      <div className="absolute inset-0 bg-[linear-gradient(90deg,transparent,rgba(255,255,255,0.18),transparent)] translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000" />

      <span className="relative z-10 inline-flex items-center gap-3">
        {imageFile
          ? 'Begin Neural Analysis'
          : 'Upload a Crop Image to Begin'}

        <ArrowRight size={18} />
      </span>
    </button>
  )}
</SignedIn>

{/* ================================================= */}
{/* SIGNED OUT CTA */}
{/* ================================================= */}

{/* ================================================= */}
{/* SIGNED OUT CTA */}
{/* ================================================= */}

<SignedOut>
  <div
    className="
      relative overflow-hidden
      rounded-[28px]
      border border-emerald-500/20
      bg-gradient-to-b
      from-emerald-500/[0.08]
      to-black/30
      backdrop-blur-2xl
      p-8 sm:p-10
      text-center
      animate-fade-up
    "
  >
    <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(16,185,129,0.16),transparent_70%)]" />

    <div className="relative z-10">
      <div
        className="
          mx-auto mb-6
          w-20 h-20 rounded-[28px]
          border border-emerald-500/20
          bg-emerald-500/10
          flex items-center justify-center
        "
      >
        <ShieldCheck
          size={34}
          className="text-emerald-300"
        />
      </div>

      <h3
        className="
          font-sans
          text-[2rem]
          sm:text-[2.6rem]
          font-black
          tracking-[-0.04em]
          text-white
        "
      >
        Access the Neural Platform
      </h3>

      <p
        className="
          mt-4
          max-w-2xl mx-auto
          text-[15px]
          leading-[1.9]
          text-white/60
        "
      >
        Sign in to unlock crop disease analysis,
        explainability intelligence, neural
        attribution systems, and multi-model
        AI diagnostics.
      </p>

      <div className="mt-8 flex justify-center">
        <SignInButton mode="modal">
          <button
            className="
              inline-flex items-center gap-3
              rounded-2xl
              bg-gradient-to-r
              from-emerald-500
              via-green-400
              to-cyan-400
              px-7 py-4
              text-[15px]
              font-semibold
              text-black
              shadow-[0_0_80px_rgba(34,197,94,0.18)]
              transition-all duration-300
              hover:scale-[1.03]
            "
          >
            Access KrishiLynk Platform

            <ArrowRight size={18} />
          </button>
        </SignInButton>
      </div>
    </div>
  </div>
</SignedOut>

{/* ================================================= */}

</div>

            {/* ================================================= */}
            {/* RIGHT */}
            {/* ================================================= */}

            <div
              className="
              space-y-6
              animate-fade-up
              xl:sticky xl:top-28
              self-start
              "
              style={{
                animationDelay: '160ms',
              }}
            >
              {/* Model Selector */}
              <div
                className="
                  rounded-[28px]
                  border border-white/[0.06]
                  bg-gradient-to-b from-white/[0.03] to-black/20
                  backdrop-blur-2xl
                  p-5
                "
              >
                <ModelSelector
                  selected={selectedModels}
                  onChange={setSelectedModels}
                  disabled={isProcessing}
                />
              </div>

              {/* Pipeline */}
              {/* Pipeline */}
<PipelineCard />

{/* ================================================= */}
{/* GLOBAL OUTBREAK RADAR */}
{/* ================================================= */}

<div
  className="
    relative overflow-hidden
    rounded-[30px]
    border border-white/[0.06]
    bg-gradient-to-b
    from-white/[0.03]
    to-black/30
    backdrop-blur-2xl
    p-5
  "
>
  {/* Ambient */}
  <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(16,185,129,0.10),transparent_45%)]" />

  <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_right,rgba(59,130,246,0.10),transparent_45%)]" />

  <div className="relative z-10">
    {/* Header */}
    <div className="flex items-start justify-between gap-4">
      <div>
        <div
          className="
            inline-flex items-center gap-2
            rounded-full
            border border-red-500/20
            bg-red-500/[0.08]
            px-3 py-1.5
          "
        >
          <div className="w-2 h-2 rounded-full bg-red-400 animate-pulse" />

          <span
            className="
              font-mono
              text-[9px]
              uppercase
              tracking-[0.22em]
              text-red-300/80
            "
          >
            Global Disease Surveillance
          </span>
        </div>

        <h3
          className="
            mt-4
            font-sans
            text-[1.7rem]
            font-black
            tracking-[-0.04em]
            text-white
          "
        >
          Global Outbreak Radar
        </h3>

        <p className="mt-2 text-sm leading-relaxed text-white/55">
          Real-time agricultural pathogen monitoring
          across high-risk crop ecosystems and
          climate-sensitive disease zones.
        </p>
      </div>

      <div
        className="
          rounded-2xl
          border border-emerald-500/20
          bg-emerald-500/[0.08]
          px-3 py-2
        "
      >
        <p className="font-mono text-[9px] uppercase tracking-[0.22em] text-emerald-300">
          Live Intelligence
        </p>
      </div>
    </div>

    {/* Radar */}
    <div
      className="
        relative
        mt-8
        h-[320px]
        overflow-hidden
        rounded-[28px]
        border border-white/[0.06]
        bg-black/30
      "
    >
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="relative w-[260px] h-[260px]">
          <div className="absolute inset-0 rounded-full border border-emerald-500/10" />
          <div className="absolute inset-[18%] rounded-full border border-emerald-500/10" />
          <div className="absolute inset-[36%] rounded-full border border-emerald-500/10" />

          <div className="absolute left-1/2 top-0 bottom-0 w-px bg-emerald-500/10 -translate-x-1/2" />

          <div className="absolute top-1/2 left-0 right-0 h-px bg-emerald-500/10 -translate-y-1/2" />

          <div
            className="
              absolute inset-0 rounded-full
              bg-[conic-gradient(from_0deg,rgba(16,185,129,0.22),transparent,transparent)]
              animate-[spin_6s_linear_infinite]
            "
          />

          <div className="absolute inset-[32%] rounded-full bg-emerald-400/20 blur-2xl" />

          <div className="absolute top-[20%] left-[62%] w-3 h-3 rounded-full bg-red-400 shadow-[0_0_20px_rgba(248,113,113,0.9)] animate-pulse" />

          <div className="absolute top-[62%] left-[28%] w-2.5 h-2.5 rounded-full bg-yellow-300 shadow-[0_0_20px_rgba(253,224,71,0.9)] animate-pulse" />

          <div className="absolute top-[40%] left-[74%] w-2 h-2 rounded-full bg-cyan-300 shadow-[0_0_18px_rgba(103,232,249,0.9)] animate-pulse" />

          <div className="absolute top-[72%] left-[68%] w-2.5 h-2.5 rounded-full bg-orange-300 shadow-[0_0_18px_rgba(253,186,116,0.9)] animate-pulse" />
        </div>
      </div>
    </div>
  </div>
</div>

</div>
          </div>
        )}
      </main>

      {/* ================================================= */}
     {/* ================================================= */}
{/* GLOBAL AGRICULTURAL IMPACT */}
{/* ================================================= */}

<section
  className="
    relative z-10
    mt-16
    overflow-hidden
    rounded-[34px]
    border border-white/[0.06]
    bg-gradient-to-b
    from-white/[0.02]
    to-black/30
    backdrop-blur-2xl
    p-6 sm:p-8 lg:p-10
  "
>
  {/* Ambient */}
  <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(16,185,129,0.10),transparent_45%)]" />

  <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_right,rgba(59,130,246,0.10),transparent_45%)]" />

  <div className="relative z-10">
    {/* Top */}
    <div className="flex flex-col xl:flex-row xl:items-end xl:justify-between gap-8">
      <div className="max-w-3xl">
        <div
          className="
            inline-flex items-center gap-2
            rounded-full
            border border-emerald-500/20
            bg-emerald-500/[0.08]
            px-4 py-2
          "
        >
          <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />

          <span
            className="
              font-mono
              text-[10px]
              uppercase
              tracking-[0.24em]
              text-emerald-300/80
            "
          >
            Global Agricultural Impact Intelligence
          </span>
        </div>

        <h2
          className="
            mt-6
            font-sans
            text-[2.3rem]
            sm:text-[3.2rem]
            lg:text-[4rem]
            font-black
            leading-[0.95]
            tracking-[-0.05em]
            text-white
          "
        >
          Plant Diseases Cause
          <span className="block bg-gradient-to-r from-emerald-300 via-cyan-300 to-blue-400 bg-clip-text text-transparent">
            $220B+ Annual
          </span>
          Global Crop Losses
        </h2>

        <p
          className="
            mt-6
            max-w-2xl
            text-[15px]
            leading-[1.9]
            text-white/60
          "
        >
          Crop diseases and agricultural pathogens
          reduce global food production at massive
          scale, impacting national GDP, farmer
          income, food security, and agricultural
          sustainability across developing and
          industrial economies.
        </p>
      </div>

      {/* Research CTA */}
      <div
        className="
          flex flex-col items-start xl:items-end
          gap-4
        "
      >
        <div
          className="
            rounded-2xl
            border border-white/[0.06]
            bg-white/[0.03]
            px-5 py-4
            backdrop-blur-xl
          "
        >
          <p className="font-mono text-[10px] tracking-[0.24em] uppercase text-white/40">
            Research Sources
          </p>

          <p className="mt-2 text-sm leading-relaxed text-white/68">
            FAO · World Bank · Nature · CABI · ICAR
          </p>
        </div>

        <a
          href="https://your-ieee-paper-link.com"
          target="_blank"
          rel="noopener noreferrer"
          className="
            group relative overflow-hidden
            inline-flex items-center gap-3
            rounded-2xl
            bg-gradient-to-r
            from-emerald-500
            via-green-400
            to-cyan-400
            px-6 py-4
            font-semibold text-black
            shadow-[0_0_80px_rgba(34,197,94,0.18)]
            transition-all duration-300
            hover:scale-[1.02]
          "
        >
          <div className="absolute inset-0 bg-[linear-gradient(90deg,transparent,rgba(255,255,255,0.2),transparent)] translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000" />

          <span className="relative z-10 flex items-center gap-3">
            View Our Research Paper

            <ArrowRight size={18} />
          </span>
        </a>
      </div>
    </div>

    {/* Stats Grid */}
    <div className="mt-12 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-5">
      {[
        {
          country: 'India',
          usd: '$15.2B',
          inr: '₹1.26 Lakh Cr',
          loss: '18–25% crop loss',
          highlight: true,
        },
        {
          country: 'China',
          usd: '$20.1B',
          inr: '₹1.67 Lakh Cr',
          loss: 'Rice & wheat pathogen impact',
        },
        {
          country: 'United States',
          usd: '$12.4B',
          inr: '₹1.03 Lakh Cr',
          loss: 'Corn & soybean disease losses',
        },
        {
          country: 'Brazil',
          usd: '$9.3B',
          inr: '₹77K Cr',
          loss: 'Coffee & soybean outbreaks',
        },
      ].map((item, idx) => (
        <div
          key={idx}
          className={[
            `
              relative overflow-hidden
              rounded-[26px]
              border
              backdrop-blur-2xl
              p-5
              transition-all duration-500
              hover:-translate-y-[4px]
            `,
            item.highlight
              ? 'border-emerald-500/30 bg-emerald-500/[0.08]'
              : 'border-white/[0.06] bg-white/[0.03]',
          ].join(' ')}
        >
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(16,185,129,0.10),transparent_70%)]" />

          <div className="relative z-10">
            <div className="flex items-center justify-between">
              <p className="font-sans text-[1.1rem] font-bold text-white">
                {item.country}
              </p>

              {item.highlight && (
                <div
                  className="
                    rounded-full
                    border border-emerald-500/20
                    bg-emerald-500/10
                    px-3 py-1
                  "
                >
                  <span className="font-mono text-[9px] uppercase tracking-[0.22em] text-emerald-300">
                    Highest Priority
                  </span>
                </div>
              )}
            </div>

            <div className="mt-6">
              <p
                className="
                  font-sans
                  text-[2rem]
                  font-black
                  tracking-[-0.04em]
                  text-white
                "
              >
                {item.usd}
              </p>

              <p className="mt-1 text-sm text-emerald-300">
                {item.inr}
              </p>
            </div>

            <div className="mt-6 h-px bg-white/[0.06]" />

            <p className="mt-5 text-sm leading-relaxed text-white/55">
              {item.loss}
            </p>
          </div>
        </div>
      ))}
    </div>

    {/* Bottom Insight */}
    <div
      className="
        mt-10
        rounded-[28px]
        border border-cyan-500/10
        bg-gradient-to-r
        from-cyan-500/[0.06]
        to-emerald-500/[0.06]
        p-6
      "
    >
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
        <div>
          <p className="font-mono text-[10px] uppercase tracking-[0.24em] text-cyan-300/70">
            Explainable AI Opportunity
          </p>

          <h3 className="mt-3 font-sans text-[1.7rem] font-black tracking-[-0.04em] text-white">
            Earlier Disease Detection Could Save
            Billions in Agricultural GDP
          </h3>

          <p className="mt-3 max-w-3xl text-sm leading-relaxed text-white/60">
            Explainable AI systems like KrishiLynk
            enable transparent agricultural
            diagnostics, helping researchers,
            institutions, and farmers identify crop
            infections earlier and reduce large-scale
            economic losses.
          </p>
        </div>

        <div
          className="
            rounded-2xl
            border border-white/[0.06]
            bg-black/20
            px-6 py-5
            min-w-[240px]
          "
        >
          <p className="font-mono text-[10px] uppercase tracking-[0.24em] text-white/40">
            Estimated Global Savings Potential
          </p>

          <p
            className="
              mt-3
              font-sans
              text-[2.4rem]
              font-black
              tracking-[-0.05em]
              bg-gradient-to-r
              from-emerald-300
              to-cyan-300
              bg-clip-text
              text-transparent
            "
          >
            $85B+
          </p>

          <p className="mt-2 text-sm text-white/55">
            through earlier AI-assisted intervention
          </p>
        </div>
      </div>
    </div>
  </div>
</section>
{/* ================================================= */}
{/* FOOTER */}
{/* ================================================= */}

<footer className="relative z-10 mt-14 border-t border-white/[0.06]">
  <div className="max-w-[1450px] mx-auto px-4 sm:px-6 py-8">
    <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
      {/* Left */}
      <div>
        <div className="flex items-center gap-3">
          <Leaf
            size={18}
            className="text-emerald-400"
          />

          <span className="font-sans text-[1.3rem] font-bold tracking-[-0.03em] text-white">
            KrishiLynk
          </span>
        </div>

        <p className="mt-2 max-w-xl text-sm leading-relaxed text-white/52">
          Explainable AI platform for
          research-grade crop disease
          diagnostics and neural attribution
          intelligence.
        </p>
      </div>

      {/* Right */}
      <div className="flex flex-col items-start lg:items-end gap-3">
        <p className="font-mono text-[9px] tracking-[0.22em] uppercase text-white/45">
          ResNet-18 · EfficientNet-B0 · DenseNet-121
        </p>

        <p className="font-mono text-[9px] tracking-[0.22em] uppercase text-white/45">
          Grad-CAM · LIME · Integrated Gradients · AOPC
        </p>

        <p className="font-mono text-[9px] tracking-[0.22em] uppercase text-emerald-300/45">
          Neural Explainability Infrastructure
        </p>
      </div>
    </div>
  </div>
      </footer>

      <KrishiSage />
    </div>
  )
}