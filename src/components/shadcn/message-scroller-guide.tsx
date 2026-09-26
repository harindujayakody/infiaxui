import React, { useState, useRef, useEffect } from "react"
import { CodeBlock } from "@/components/ui/code-block"
import { Button } from "@/components/shadcn/button"
import { Input } from "@/components/shadcn/input"
import { ArrowDown, Send, Bot, User, Sparkles, Plus, History } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import { cn } from "@/lib/utils"

interface ChatMsg {
  id: string
  role: "user" | "assistant" | "system"
  text: string
  timestamp: string
}

const INITIAL_MESSAGES: ChatMsg[] = [
  { id: "1", role: "assistant", text: "Hello! How can I help you prototype your app today?", timestamp: "10:00 AM" },
  { id: "2", role: "user", text: "I need a streaming chat scroller that doesn't jump while reading.", timestamp: "10:01 AM" },
  { id: "3", role: "assistant", text: "MessageScroller is designed exactly for this! It anchors new turns near the top, follows streaming output only when you're at the live edge, and preserves scroll position when history loads above.", timestamp: "10:01 AM" },
]

export function MessageScrollerGuide() {
  const [messages, setMessages] = useState<ChatMsg[]>(INITIAL_MESSAGES)
  const [inputText, setInputText] = useState("")
  const [isStreaming, setIsStreaming] = useState(false)
  const [showScrollBottom, setShowScrollBottom] = useState(false)
  const viewportRef = useRef<HTMLDivElement>(null)

  const handleSend = () => {
    if (!inputText.trim()) return
    const userMsg: ChatMsg = {
      id: String(Date.now()),
      role: "user",
      text: inputText,
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    }
    setMessages((prev) => [...prev, userMsg])
    setInputText("")

    // Simulate AI Streaming reply
    setIsStreaming(true)
    const assistantId = String(Date.now() + 1)
    const fullText = "Here is a streamed response arriving in real-time. Notice how the scroll anchor stays stable without jarring layout jumps as new content streams in!"
    let currentLen = 0

    setMessages((prev) => [
      ...prev,
      { id: assistantId, role: "assistant", text: "", timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }) },
    ])

    const interval = setInterval(() => {
      currentLen += 4
      if (currentLen > fullText.length) {
        clearInterval(interval)
        setIsStreaming(false)
      } else {
        setMessages((prev) =>
          prev.map((m) => (m.id === assistantId ? { ...m, text: fullText.slice(0, currentLen) } : m))
        )
      }
    }, 40)
  }

  const handleLoadEarlier = () => {
    const earlier: ChatMsg[] = [
      { id: `hist-${Date.now()}-1`, role: "user", text: "Earlier message from history...", timestamp: "09:55 AM" },
      { id: `hist-${Date.now()}-2`, role: "assistant", text: "Loaded older conversation turn without disrupting view.", timestamp: "09:56 AM" },
    ]
    setMessages((prev) => [...earlier, ...prev])
  }

  const scrollToBottom = () => {
    if (viewportRef.current) {
      viewportRef.current.scrollTop = viewportRef.current.scrollHeight
      setShowScrollBottom(false)
    }
  }

  return (
    <div className="space-y-12 pt-6 text-[var(--text-main)]">
      {/* Composition */}
      <section id="composition" className="scroll-mt-20 space-y-4">
        <h2 className="type-h2 text-[var(--text-main)]">Composition</h2>
        <p className="text-sm text-[var(--text-muted)]">
          Use the following composition to build a <code className="bg-[var(--bg-subtle)] text-[var(--text-main)] px-1.5 py-0.5 rounded text-xs font-mono">MessageScroller</code>:
        </p>
        <div className="rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-card)] p-4 font-mono text-xs text-[var(--text-muted)] space-y-0.5">
          {[
            "MessageScrollerProvider",
            "└── MessageScroller",
            "    ├── MessageScrollerViewport",
            "    │   └── MessageScrollerContent",
            "    │       ├── MessageScrollerItem",
            "    │       ├── MessageScrollerItem",
            "    │       └── MessageScrollerItem",
            "    └── MessageScrollerButton",
          ].map((l, i) => <div key={i}>{l}</div>)}
        </div>
      </section>

      {/* Live Interactive Demo */}
      <section id="demo" className="scroll-mt-20 space-y-4">
        <h2 className="type-h2 text-[var(--text-main)]">Live Interactive Demo</h2>
        <p className="text-sm text-[var(--text-muted)]">
          Send a message to test streaming output, turn anchoring, and "load history" scroll preservation.
        </p>
        <div className="p-4 sm:p-8 rounded-2xl border border-[var(--border-subtle)] bg-[var(--bg-card)]">
          <div className="relative flex flex-col h-[480px] max-w-lg mx-auto rounded-2xl border border-[var(--border-subtle)] bg-[var(--bg-page)] overflow-hidden shadow-xl">
            {/* Header bar */}
            <div className="flex items-center justify-between px-4 py-3 border-b border-[var(--border-subtle)] bg-[var(--bg-card)] select-none">
              <div className="flex items-center gap-2">
                <div className="size-2.5 rounded-full bg-emerald-400 animate-pulse" />
                <span className="text-xs font-semibold text-[var(--text-main)]">AI Assistant</span>
                {isStreaming && <span className="text-[10px] text-sky-400 font-mono">streaming...</span>}
              </div>
              <Button size="sm" variant="ghost" className="h-7 text-xs" onClick={handleLoadEarlier}>
                <History className="size-3 mr-1" />
                Load earlier
              </Button>
            </div>

            {/* Message viewport */}
            <div
              ref={viewportRef}
              onScroll={(e) => {
                const target = e.currentTarget
                const atBottom = target.scrollHeight - target.scrollTop - target.clientHeight < 40
                setShowScrollBottom(!atBottom)
              }}
              className="flex-1 overflow-y-auto p-4 space-y-4 scroll-smooth"
            >
              {messages.map((m) => {
                const isUser = m.role === "user"
                return (
                  <motion.div
                    key={m.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={cn("flex items-start gap-2.5", isUser ? "flex-row-reverse" : "flex-row")}
                  >
                    <div className={cn(
                      "size-7 rounded-full flex items-center justify-center shrink-0 text-xs font-bold",
                      isUser ? "bg-[var(--text-main)] text-[var(--bg-page)]" : "bg-sky-500/10 text-sky-400 border border-sky-500/20"
                    )}>
                      {isUser ? <User className="size-3.5" /> : <Bot className="size-3.5" />}
                    </div>
                    <div className={cn(
                      "max-w-[80%] rounded-2xl px-3.5 py-2.5 text-xs leading-relaxed",
                      isUser
                        ? "bg-[var(--text-main)] text-[var(--bg-page)] rounded-tr-sm"
                        : "bg-[var(--bg-card)] border border-[var(--border-subtle)] text-[var(--text-main)] rounded-tl-sm shadow-sm"
                    )}>
                      <p className="whitespace-pre-wrap">{m.text || <span className="animate-pulse">Thinking...</span>}</p>
                      <span className={cn("block text-[9px] mt-1 opacity-60 text-right", isUser ? "text-[var(--bg-page)]" : "text-[var(--text-muted)]")}>
                        {m.timestamp}
                      </span>
                    </div>
                  </motion.div>
                )
              })}
            </div>

            {/* Jump to latest floating button */}
            <AnimatePresence>
              {showScrollBottom && (
                <motion.button
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  onClick={scrollToBottom}
                  className="absolute bottom-16 right-4 z-10 flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[var(--text-main)] text-[var(--bg-page)] text-xs font-semibold shadow-xl hover:opacity-90 transition-opacity"
                >
                  <ArrowDown className="size-3" />
                  <span>Jump to latest</span>
                </motion.button>
              )}
            </AnimatePresence>

            {/* Input bar */}
            <div className="p-3 border-t border-[var(--border-subtle)] bg-[var(--bg-card)] flex items-center gap-2">
              <Input
                placeholder="Type a message..."
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSend()}
                className="h-8 text-xs flex-1"
              />
              <Button size="sm" className="h-8 px-3" onClick={handleSend} disabled={!inputText.trim()}>
                <Send className="size-3" />
              </Button>
            </div>
          </div>
        </div>
        <CodeBlock
          language="tsx"
          code={`import {
  MessageScroller,
  MessageScrollerButton,
  MessageScrollerContent,
  MessageScrollerItem,
  MessageScrollerProvider,
  MessageScrollerViewport,
} from "@/components/ui/message-scroller"

<MessageScrollerProvider autoScroll defaultScrollPosition="last-anchor">
  <MessageScroller className="h-[500px]">
    <MessageScrollerViewport>
      <MessageScrollerContent>
        {messages.map((message) => (
          <MessageScrollerItem
            key={message.id}
            messageId={message.id}
            scrollAnchor={message.role === "user"}
          >
            <Message message={message} />
          </MessageScrollerItem>
        ))}
      </MessageScrollerContent>
    </MessageScrollerViewport>
    <MessageScrollerButton />
  </MessageScroller>
</MessageScrollerProvider>`}
        />
      </section>

      {/* Core Concepts */}
      <section id="concepts" className="scroll-mt-20 space-y-4">
        <h2 className="type-h2 text-[var(--text-main)]">Core Concepts</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
          <div className="p-4 rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-card)] space-y-1.5">
            <h4 className="font-semibold text-[var(--text-main)]">1. Turn Anchoring</h4>
            <p className="text-[var(--text-muted)] leading-relaxed">
              When a new turn starts, <code className="font-mono">scrollAnchor</code> pins the prompt near the top of the viewport and lets the reply stream down without pushing the reader.
            </p>
          </div>
          <div className="p-4 rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-card)] space-y-1.5">
            <h4 className="font-semibold text-[var(--text-main)]">2. Live Edge Following</h4>
            <p className="text-[var(--text-muted)] leading-relaxed">
              Auto-scroll only follows when the reader is already at the bottom edge. Scrolling up pauses auto-scroll immediately.
            </p>
          </div>
          <div className="p-4 rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-card)] space-y-1.5">
            <h4 className="font-semibold text-[var(--text-main)]">3. History Prepend Preservation</h4>
            <p className="text-[var(--text-muted)] leading-relaxed">
              When older messages are loaded above, <code className="font-mono">preserveScrollOnPrepend</code> locks the visible row in place without jumping.
            </p>
          </div>
          <div className="p-4 rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-card)] space-y-1.5">
            <h4 className="font-semibold text-[var(--text-main)]">4. Performance</h4>
            <p className="text-[var(--text-muted)] leading-relaxed">
              Built with <code className="font-mono">content-visibility: auto</code> and zero forced React re-renders on scroll hot paths.
            </p>
          </div>
        </div>
      </section>

      {/* API Reference */}
      <section id="api-reference" className="scroll-mt-20 space-y-4">
        <h2 className="type-h2 text-[var(--text-main)]">API Reference</h2>
        <div className="rounded-xl border border-[var(--border-subtle)] overflow-hidden">
          <table className="w-full text-xs text-left">
            <thead className="bg-[var(--bg-subtle)]/60 text-[var(--text-main)] border-b border-[var(--border-subtle)]">
              <tr>
                <th className="p-3 font-semibold">Component / Hook</th>
                <th className="p-3 font-semibold">Prop / Return</th>
                <th className="p-3 font-semibold">Description</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[var(--border-subtle)] text-[var(--text-muted)]">
              <tr>
                <td className="p-3 font-mono text-[var(--text-main)]">MessageScrollerProvider</td>
                <td className="p-3 font-mono">autoScroll</td>
                <td className="p-3">Keeps streamed replies in view when at the live edge</td>
              </tr>
              <tr>
                <td className="p-3 font-mono text-[var(--text-main)]">MessageScrollerProvider</td>
                <td className="p-3 font-mono">defaultScrollPosition</td>
                <td className="p-3">"last-anchor" | "start" | "end"</td>
              </tr>
              <tr>
                <td className="p-3 font-mono text-[var(--text-main)]">MessageScrollerItem</td>
                <td className="p-3 font-mono">scrollAnchor</td>
                <td className="p-3">Marks the row boundary that anchors new conversation turns</td>
              </tr>
              <tr>
                <td className="p-3 font-mono text-[var(--text-main)]">useMessageScroller</td>
                <td className="p-3 font-mono">scrollToMessage(id)</td>
                <td className="p-3">Programmatically jumps directly to any message row</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>
    </div>
  )
}
