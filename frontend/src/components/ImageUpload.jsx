import { useCallback, useState } from 'react'
import { useDropzone } from 'react-dropzone'
import {
  Upload,
  ImageIcon,
  X,
  Leaf,
  ShieldCheck,
  ScanLine,
} from 'lucide-react'

const ACCEPTED = {
  'image/jpeg': [],
  'image/png': [],
  'image/webp': [],
}

const MAX_SIZE = 10 * 1024 * 1024

export default function ImageUpload({
  onImageSelected,
  disabled,
}) {
  const [preview, setPreview] = useState(null)
  const [fileName, setFileName] = useState(null)
  const [fileSize, setFileSize] = useState(null)

  const onDrop = useCallback(
    (accepted, rejected) => {
      if (rejected.length > 0) return

      const file = accepted[0]
      if (!file) return

      const url = URL.createObjectURL(file)

      setPreview(url)
      setFileName(file.name)
      setFileSize((file.size / 1024).toFixed(1) + ' KB')

      onImageSelected(file)
    },
    [onImageSelected]
  )

  const {
    getRootProps,
    getInputProps,
    isDragActive,
    isDragReject,
  } = useDropzone({
    onDrop,
    accept: ACCEPTED,
    maxFiles: 1,
    maxSize: MAX_SIZE,
    disabled,
  })

  const clear = (e) => {
    e.stopPropagation()

    setPreview(null)
    setFileName(null)
    setFileSize(null)

    onImageSelected(null)
  }

  return (
    <div className="w-full">
      <div
        {...getRootProps()}
        className={[
          'group relative overflow-hidden rounded-[32px]',
          'border transition-all duration-500 cursor-pointer',
          'backdrop-blur-2xl',
          isDragActive && !isDragReject
            ? 'border-emerald-400/50 scale-[1.01] shadow-[0_0_140px_rgba(34,197,94,0.20)]'
            : isDragReject
            ? 'border-red-500/40 bg-red-950/10'
            : preview
            ? 'border-emerald-900/50'
            : 'border-white/[0.08] hover:border-emerald-400/20',
          disabled && 'opacity-50 pointer-events-none',
        ].join(' ')}
        style={{
          minHeight: preview ? '360px' : '320px',
          background:
            'linear-gradient(180deg, rgba(10,16,13,0.90), rgba(5,8,7,0.96))',
        }}
      >
        <input {...getInputProps()} />

        {/* ===================================================== */}
        {/* ATMOSPHERIC LAYERS */}
        {/* ===================================================== */}

        {/* Emerald glow */}
        <div className="absolute -top-40 left-[-10%] w-[340px] h-[340px] rounded-full bg-emerald-500/10 blur-[140px]" />

        {/* Cyan glow */}
        <div className="absolute bottom-[-180px] right-[-10%] w-[340px] h-[340px] rounded-full bg-cyan-500/10 blur-[140px]" />

        {/* Grid overlay */}
        <div
          className="absolute inset-0 opacity-[0.04] pointer-events-none"
          style={{
            backgroundImage: `
              linear-gradient(rgba(255,255,255,0.08) 1px, transparent 1px),
              linear-gradient(90deg, rgba(255,255,255,0.08) 1px, transparent 1px)
            `,
            backgroundSize: '36px 36px',
          }}
        />

        {/* Scan effect */}
        <div className="upload-scan pointer-events-none" />

        {/* ===================================================== */}
        {/* PREVIEW STATE */}
        {/* ===================================================== */}

        {preview ? (
          <div
            className="relative w-full h-full"
            style={{ minHeight: '360px' }}
          >
            {/* Image */}
            <img
              src={preview}
              alt="Selected leaf"
              className="w-full h-full object-contain transition-transform duration-700 group-hover:scale-[1.015]"
              style={{ maxHeight: '460px' }}
            />

            {/* Cinematic overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/10 to-transparent pointer-events-none" />

            {/* Top diagnostics */}
            <div className="absolute top-5 left-5 right-5 flex items-start justify-between">
              <div className="glass px-4 py-3 rounded-2xl">
                <p className="font-mono text-[10px] tracking-[0.28em] uppercase text-emerald-400/70 mb-1">
                  Neural Intake
                </p>

                <p className="font-semibold text-sm text-white">
                  Biological sample acquired
                </p>
              </div>

              <div className="flex items-center gap-2 px-3 py-2 rounded-xl border border-emerald-500/20 bg-black/30 backdrop-blur-xl">
                <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />

                <span className="font-mono text-[11px] tracking-[0.2em] uppercase text-emerald-300/80">
                  ACTIVE
                </span>
              </div>
            </div>

            {/* Bottom info strip */}
            <div className="absolute bottom-0 left-0 right-0 p-5 flex items-center justify-between">
              <div className="flex items-center gap-4">
                {/* Icon */}
                <div
                  className="w-12 h-12 rounded-2xl
                             bg-black/40 border border-white/10
                             flex items-center justify-center
                             backdrop-blur-xl"
                >
                  <ImageIcon
                    size={18}
                    className="text-emerald-300"
                  />
                </div>

                {/* File info */}
                <div>
                  <p className="font-semibold text-sm text-white truncate max-w-[220px]">
                    {fileName}
                  </p>

                  <div className="flex items-center gap-2 mt-1">
                    <span className="tag bg-emerald-500/10 text-emerald-300 border border-emerald-500/20">
                      {fileSize}
                    </span>

                    <span className="tag bg-white/[0.03] text-white/50 border border-white/5">
                      AI Ready
                    </span>
                  </div>
                </div>
              </div>

              {/* Remove button */}
              <button
                onClick={clear}
                className="
                  w-11 h-11 rounded-2xl
                  bg-black/40 border border-white/10
                  flex items-center justify-center
                  text-white/50
                  hover:text-red-400
                  hover:border-red-500/30
                  hover:bg-red-500/10
                  transition-all duration-300
                "
                title="Remove image"
              >
                <X size={16} />
              </button>
            </div>

            {/* Analysis telemetry */}
            <div className="absolute left-5 bottom-24 flex items-center gap-3">
              <div className="glass px-3 py-2 rounded-xl flex items-center gap-2">
                <ShieldCheck
                  size={14}
                  className="text-emerald-400"
                />

                <span className="font-mono text-[11px] text-white/60 uppercase tracking-[0.18em]">
                  Explainable AI Enabled
                </span>
              </div>
            </div>
          </div>
        ) : (
          /* ===================================================== */
          /* EMPTY STATE */
          /* ===================================================== */

          <div className="relative flex flex-col items-center justify-center gap-8 py-20 px-8 text-center">
            {/* Central ambient glow */}
            <div className="absolute w-[280px] h-[280px] rounded-full bg-emerald-500/10 blur-[120px]" />

            {/* Upload core */}
            <div className="relative z-10">
              {/* Outer ring */}
              <div className="absolute inset-[-18px] rounded-[40px] border border-emerald-500/10 animate-pulse" />

              {/* Main core */}
              <div
                className={[
                  'relative w-32 h-32 rounded-[36px]',
                  'border transition-all duration-500',
                  'flex items-center justify-center',
                  isDragActive
                    ? 'border-emerald-400/40 bg-emerald-500/10 shadow-[0_0_120px_rgba(34,197,94,0.25)]'
                    : 'border-white/10 bg-white/[0.03]',
                ].join(' ')}
              >
                {/* Secondary glow */}
                <div className="absolute inset-0 rounded-[36px] bg-gradient-to-br from-emerald-500/10 to-cyan-500/5 opacity-70" />

                {/* Icon */}
                <Leaf
                  size={52}
                  className={[
                    'relative z-10 transition-all duration-500',
                    isDragActive
                      ? 'text-emerald-300 scale-110'
                      : 'text-emerald-500',
                  ].join(' ')}
                />

                {/* Floating upload indicator */}
                <div
                  className="
                    absolute -top-4 -right-4
                    w-12 h-12 rounded-2xl
                    bg-black/70 border border-white/10
                    flex items-center justify-center
                    backdrop-blur-xl
                    shadow-[0_0_40px_rgba(34,197,94,0.12)]
                  "
                >
                  <Upload
                    size={18}
                    className="text-emerald-300"
                  />
                </div>
              </div>
            </div>

            {/* Headline */}
            <div className="relative z-10">
              <div className="flex items-center justify-center gap-2 mb-4">
                <ScanLine
                  size={16}
                  className="text-emerald-400"
                />

                <span className="font-mono text-[11px] tracking-[0.28em] uppercase text-emerald-300/70">
                  Neural Diagnostic Intake
                </span>
              </div>

              <h2 className="font-display font-semibold text-3xl text-white mb-4">
                {isDragActive
                  ? 'Release to begin analysis'
                  : 'Upload Plant Sample'}
              </h2>

              <p className="max-w-xl text-sm leading-relaxed text-white/45">
                Advanced explainable AI diagnostics powered by
                convolutional neural networks, Grad-CAM, LIME,
                Integrated Gradients, and fidelity analysis.
              </p>
            </div>

            {/* Format pills */}
            <div className="relative z-10 flex flex-wrap items-center justify-center gap-3">
              {['JPEG', 'PNG', 'WebP'].map((fmt) => (
                <span
                  key={fmt}
                  className="
                    tag
                    bg-white/[0.03]
                    text-white/60
                    border border-white/[0.06]
                    px-4 py-1.5
                  "
                >
                  {fmt}
                </span>
              ))}

              <span
                className="
                  tag
                  bg-emerald-500/10
                  text-emerald-300
                  border border-emerald-500/20
                  px-4 py-1.5
                "
              >
                max 10 MB
              </span>
            </div>

            {/* Bottom telemetry */}
            <div className="relative z-10 flex items-center gap-3 mt-2">
              <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />

              <span className="font-mono text-[11px] tracking-[0.25em] uppercase text-emerald-300/70">
                Explainable Neural Diagnostics Ready
              </span>
            </div>
          </div>
        )}
      </div>

      {/* Error state */}
      {isDragReject && (
        <p className="mt-4 text-xs text-red-400 text-center font-mono tracking-wide">
          ✗ Invalid biological sample format — only JPEG, PNG, WebP accepted
        </p>
      )}
    </div>
  )
}