import { useEffect, useRef, useState } from 'react'

import {
  Bot,
  Mic,
  Send,
  Sparkles,
  X,
} from 'lucide-react'

import { askKrishiSage } from '../services/assistantApi'

export default function KrishiSage() {
  const [open, setOpen] = useState(false)

  const [input, setInput] = useState('')

  const [loading, setLoading] =
    useState(false)

  const [messages, setMessages] =
    useState([
      {
        role: 'assistant',
        text: 'Hello. I am KrishiSage — your AI agricultural intelligence assistant. Ask me about crop diseases, symptoms, soil health, irrigation, or plant diagnostics.',
      },
    ])

  const messagesEndRef = useRef(null)

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({
      behavior: 'smooth',
    })
  }, [messages])

  const sendMessage = async () => {
    if (!input.trim()) return

    const userMessage = {
      role: 'user',
      text: input,
    }

    setMessages((prev) => [
      ...prev,
      userMessage,
    ])

    const currentInput = input

    setInput('')

    setLoading(true)

    try {
      const data = await askKrishiSage(
        currentInput
      )

      setMessages((prev) => [
        ...prev,
        {
          role: 'assistant',
          text: data.response,
        },
      ])
    } catch (err) {
      setMessages((prev) => [
        ...prev,
        {
          role: 'assistant',
          text: 'KrishiSage could not process your request right now.',
        },
      ])
    }

    setLoading(false)
  }

  return (
    <>
      {/* Floating Button */}

      <button
        onClick={() => setOpen(!open)}
        className="
          fixed bottom-6 right-6 z-[999]
          group
          flex items-center gap-3
          rounded-2xl
          border border-emerald-500/20
          bg-black/70
          backdrop-blur-2xl
          px-5 py-4
          shadow-[0_0_50px_rgba(16,185,129,0.15)]
          transition-all duration-300
          hover:scale-[1.03]
        "
      >
        <div
          className="
            flex items-center justify-center
            w-11 h-11 rounded-xl
            bg-gradient-to-br
            from-emerald-400
            to-cyan-400
            text-black
          "
        >
          <Sparkles size={20} />
        </div>

        <div className="text-left">
          <p
            className="
              font-sans
              text-sm font-bold
              text-white
            "
          >
            KrishiSage
          </p>

          <p
            className="
              text-[11px]
              text-emerald-300/70
            "
          >
            Neural AI Assistant
          </p>
        </div>
      </button>

      {/* Assistant Panel */}

      {open && (
        <div
          className="
            fixed bottom-24 right-6 z-[999]
            w-[390px]
            h-[650px]
            overflow-hidden
            rounded-[34px]
            border border-white/[0.08]
            bg-[#04111f]/95
            backdrop-blur-3xl
            shadow-[0_0_100px_rgba(16,185,129,0.12)]
          "
        >
          {/* Ambient */}
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(16,185,129,0.12),transparent_45%)]" />

          {/* Header */}
          <div
            className="
              relative z-10
              flex items-center justify-between
              border-b border-white/[0.06]
              px-5 py-5
            "
          >
            <div className="flex items-center gap-4">
              <div
                className="
                  flex items-center justify-center
                  w-12 h-12 rounded-2xl
                  bg-gradient-to-br
                  from-emerald-400
                  to-cyan-400
                  text-black
                "
              >
                <Bot size={22} />
              </div>

              <div>
                <h3
                  className="
                    font-sans
                    text-lg font-bold
                    text-white
                  "
                >
                  KrishiSage
                </h3>

                <p
                  className="
                    text-xs
                    text-emerald-300/70
                  "
                >
                  Agricultural Intelligence
                </p>
              </div>
            </div>

            <button
              onClick={() => setOpen(false)}
              className="
                flex items-center justify-center
                w-10 h-10 rounded-xl
                border border-white/[0.06]
                bg-white/[0.03]
                text-white/70
              "
            >
              <X size={18} />
            </button>
          </div>

          {/* Messages */}
          <div
            className="
              relative z-10
              h-[470px]
              overflow-y-auto
              px-5 py-5
              space-y-4
            "
          >
            {messages.map((msg, index) => (
              <div
                key={index}
                className={`flex ${
                  msg.role === 'user'
                    ? 'justify-end'
                    : 'justify-start'
                }`}
              >
                <div
                  className={`
                    max-w-[85%]
                    rounded-3xl
                    px-5 py-4
                    text-sm leading-relaxed
                    ${
                      msg.role === 'user'
                        ? `
                          bg-gradient-to-r
                          from-emerald-500
                          to-cyan-400
                          text-black
                          font-medium
                        `
                        : `
                          border border-white/[0.06]
                          bg-white/[0.04]
                          text-white/85
                        `
                    }
                  `}
                >
                  {msg.text}
                </div>
              </div>
            ))}

            {loading && (
              <div
                className="
                  inline-flex items-center gap-2
                  rounded-2xl
                  border border-white/[0.06]
                  bg-white/[0.03]
                  px-4 py-3
                  text-white/60
                "
              >
                <div className="w-2 h-2 rounded-full bg-emerald-400 animate-bounce" />

                <div className="w-2 h-2 rounded-full bg-emerald-400 animate-bounce delay-100" />

                <div className="w-2 h-2 rounded-full bg-emerald-400 animate-bounce delay-200" />

                <span className="ml-2 text-sm">
                  KrishiSage thinking...
                </span>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <div
            className="
              absolute bottom-0 left-0 right-0
              border-t border-white/[0.06]
              bg-black/30
              p-4
            "
          >
            <div className="flex items-center gap-3">
              <button
                className="
                  flex items-center justify-center
                  w-12 h-12 rounded-2xl
                  border border-white/[0.06]
                  bg-white/[0.03]
                  text-emerald-300
                "
              >
                <Mic size={18} />
              </button>

              <input
                value={input}
                onChange={(e) =>
                  setInput(e.target.value)
                }
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    sendMessage()
                  }
                }}
                placeholder="Ask KrishiSage about crop health..."
                className="
                  flex-1
                  rounded-2xl
                  border border-white/[0.06]
                  bg-white/[0.03]
                  px-4 py-3
                  text-sm text-white
                  outline-none
                  placeholder:text-white/30
                "
              />

              <button
                onClick={sendMessage}
                className="
                  flex items-center justify-center
                  w-12 h-12 rounded-2xl
                  bg-gradient-to-r
                  from-emerald-500
                  to-cyan-400
                  text-black
                "
              >
                <Send size={18} />
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}