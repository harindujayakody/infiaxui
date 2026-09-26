import React, { useState } from "react"
import { CodeBlock } from "@/components/ui/code-block"
import { Copy, RotateCcw, ThumbsUp, ThumbsDown, Check, FileText, Download } from "lucide-react"
import { cn } from "@/lib/utils"

export function MessageGuide() {
  const [copied, setCopied] = useState(false)
  const [feedback, setFeedback] = useState<"up" | "down" | null>(null)

  const handleCopy = () => {
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="space-y-12 pt-6 text-[var(--text-main)]">
      {/* Composition */}
      <section id="composition" className="scroll-mt-20 space-y-4">
        <h2 className="type-h2 text-[var(--text-main)]">Composition</h2>
        <p className="text-sm text-[var(--text-muted)]">
          Use the following composition to build a <code className="bg-[var(--bg-subtle)] text-[var(--text-main)] px-1.5 py-0.5 rounded text-xs font-mono">Message</code>:
        </p>
        <div className="rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-card)] p-4 font-mono text-xs text-[var(--text-muted)] space-y-0.5">
          {[
            "Message",
            "├── MessageAvatar",
            "└── MessageContent",
            "    ├── MessageHeader",
            "    ├── Bubble",
            "    └── MessageFooter",
          ].map((l, i) => <div key={i}>{l}</div>)}
        </div>
      </section>

      {/* Basic */}
      <section id="basic" className="scroll-mt-20 space-y-4">
        <h2 className="type-h2 text-[var(--text-main)]">Basic</h2>
        <p className="text-sm text-[var(--text-muted)]">
          A conversation exchange showing start-aligned (assistant) and end-aligned (user) messages.
        </p>
        <div className="p-8 rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-card)] space-y-6">
          {/* Assistant message */}
          <div className="flex items-start gap-3 max-w-md">
            <div className="size-8 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white text-xs font-bold shrink-0">
              AI
            </div>
            <div className="space-y-1">
              <div className="text-[11px] font-semibold text-[var(--text-muted)]">Assistant</div>
              <div className="rounded-2xl rounded-tl-sm border border-[var(--border-subtle)] bg-[var(--bg-page)] p-3.5 text-xs text-[var(--text-main)] shadow-sm">
                How can I help you build your user interface today?
              </div>
              <div className="text-[10px] text-[var(--text-muted)]">10:24 AM</div>
            </div>
          </div>

          {/* User message */}
          <div className="flex items-start justify-end gap-3 max-w-md ml-auto">
            <div className="space-y-1 text-right">
              <div className="text-[11px] font-semibold text-[var(--text-muted)]">You</div>
              <div className="rounded-2xl rounded-tr-sm bg-[var(--text-main)] p-3.5 text-xs text-[var(--bg-page)] shadow-sm text-left">
                I'd like to implement an accessible chat layout with message bubbles and avatars.
              </div>
              <div className="text-[10px] text-[var(--text-muted)]">10:25 AM · Delivered</div>
            </div>
            <div className="size-8 rounded-full bg-[var(--text-main)] flex items-center justify-center text-[var(--bg-page)] text-xs font-bold shrink-0">
              U
            </div>
          </div>
        </div>
        <CodeBlock
          language="tsx"
          code={`import { Message, MessageAvatar, MessageContent, MessageHeader, MessageFooter } from "@/components/ui/message"
import { Bubble, BubbleContent } from "@/components/ui/bubble"
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"

{/* Assistant Message */}
<Message align="start">
  <MessageAvatar>
    <Avatar>
      <AvatarImage src="/bot.png" />
      <AvatarFallback>AI</AvatarFallback>
    </Avatar>
  </MessageAvatar>
  <MessageContent>
    <MessageHeader>Assistant</MessageHeader>
    <Bubble>
      <BubbleContent>How can I help you today?</BubbleContent>
    </Bubble>
    <MessageFooter>10:24 AM</MessageFooter>
  </MessageContent>
</Message>

{/* User Message */}
<Message align="end">
  <MessageContent>
    <MessageHeader>You</MessageHeader>
    <Bubble variant="primary">
      <BubbleContent>I'd like to implement a chat layout.</BubbleContent>
    </Bubble>
    <MessageFooter>10:25 AM · Delivered</MessageFooter>
  </MessageContent>
  <MessageAvatar>
    <Avatar>
      <AvatarFallback>U</AvatarFallback>
    </Avatar>
  </MessageAvatar>
</Message>`}
        />
      </section>

      {/* Message Group */}
      <section id="group" className="scroll-mt-20 space-y-4">
        <h2 className="type-h2 text-[var(--text-main)]">Message Group</h2>
        <p className="text-sm text-[var(--text-muted)]">
          Stack consecutive messages from the same sender. Only the bottom message displays the avatar.
        </p>
        <div className="p-8 rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-card)]">
          <div className="flex items-end gap-3 max-w-md">
            <div className="size-8 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white text-xs font-bold shrink-0">
              AI
            </div>
            <div className="space-y-1.5 flex-1">
              <div className="rounded-2xl border border-[var(--border-subtle)] bg-[var(--bg-page)] p-3 text-xs text-[var(--text-main)] shadow-sm">
                Here are the three components you need:
              </div>
              <div className="rounded-2xl rounded-tl-sm border border-[var(--border-subtle)] bg-[var(--bg-page)] p-3 text-xs text-[var(--text-main)] shadow-sm">
                1. <strong>Message</strong> for row layout<br />
                2. <strong>Bubble</strong> for styled text surfaces<br />
                3. <strong>MessageScroller</strong> for turn anchoring
              </div>
            </div>
          </div>
        </div>
        <CodeBlock
          language="tsx"
          code={`<MessageGroup>
  <Message align="start">
    <MessageContent>
      <Bubble><BubbleContent>Here are the components you need:</BubbleContent></Bubble>
    </MessageContent>
  </Message>
  <Message align="start">
    <MessageAvatar><Avatar>...</Avatar></MessageAvatar>
    <MessageContent>
      <Bubble><BubbleContent>1. Message, 2. Bubble, 3. MessageScroller</BubbleContent></Bubble>
    </MessageContent>
  </Message>
</MessageGroup>`}
        />
      </section>

      {/* Actions */}
      <section id="actions" className="scroll-mt-20 space-y-4">
        <h2 className="type-h2 text-[var(--text-main)]">Actions</h2>
        <p className="text-sm text-[var(--text-muted)]">
          Place message-level actions in <code className="bg-[var(--bg-subtle)] text-[var(--text-main)] px-1.5 py-0.5 rounded text-xs font-mono">MessageFooter</code>, such as copy, retry, or feedback buttons.
        </p>
        <div className="p-8 rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-card)]">
          <div className="flex items-start gap-3 max-w-md">
            <div className="size-8 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white text-xs font-bold shrink-0">
              AI
            </div>
            <div className="space-y-1.5">
              <div className="rounded-2xl rounded-tl-sm border border-[var(--border-subtle)] bg-[var(--bg-page)] p-3.5 text-xs text-[var(--text-main)] shadow-sm leading-relaxed">
                React Server Components render on the server and transmit zero client-side JavaScript for non-interactive subtrees.
              </div>
              <div className="flex items-center gap-1 text-[var(--text-muted)] pt-0.5">
                <button
                  type="button"
                  onClick={handleCopy}
                  className="flex items-center gap-1 rounded px-2 py-1 text-[10px] hover:bg-[var(--bg-subtle)] hover:text-[var(--text-main)] transition-colors"
                >
                  {copied ? <Check className="size-3 text-emerald-400" /> : <Copy className="size-3" />}
                  <span>{copied ? "Copied" : "Copy"}</span>
                </button>
                <button
                  type="button"
                  onClick={() => setFeedback(feedback === "up" ? null : "up")}
                  className={cn(
                    "rounded p-1 hover:bg-[var(--bg-subtle)] transition-colors",
                    feedback === "up" ? "text-emerald-400" : "hover:text-[var(--text-main)]"
                  )}
                  aria-label="Good response"
                >
                  <ThumbsUp className="size-3" />
                </button>
                <button
                  type="button"
                  onClick={() => setFeedback(feedback === "down" ? null : "down")}
                  className={cn(
                    "rounded p-1 hover:bg-[var(--bg-subtle)] transition-colors",
                    feedback === "down" ? "text-red-400" : "hover:text-[var(--text-main)]"
                  )}
                  aria-label="Bad response"
                >
                  <ThumbsDown className="size-3" />
                </button>
              </div>
            </div>
          </div>
        </div>
        <CodeBlock
          language="tsx"
          code={`<MessageFooter>
  <Button variant="ghost" size="icon" aria-label="Copy">
    <Copy className="size-3" />
  </Button>
  <Button variant="ghost" size="icon" aria-label="Thumbs up">
    <ThumbsUp className="size-3" />
  </Button>
</MessageFooter>`}
        />
      </section>

      {/* Attachment */}
      <section id="attachment" className="scroll-mt-20 space-y-4">
        <h2 className="type-h2 text-[var(--text-main)]">Attachment</h2>
        <p className="text-sm text-[var(--text-muted)]">
          Render file attachments and preview cards inside the message bubble.
        </p>
        <div className="p-8 rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-card)]">
          <div className="flex items-start gap-3 max-w-sm">
            <div className="size-8 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white text-xs font-bold shrink-0">
              AI
            </div>
            <div className="space-y-2">
              <div className="rounded-2xl rounded-tl-sm border border-[var(--border-subtle)] bg-[var(--bg-page)] p-3.5 text-xs text-[var(--text-main)] shadow-sm space-y-2">
                <p>I generated the design system specifications document for you:</p>
                <div className="flex items-center justify-between gap-3 rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-card)] p-2.5">
                  <div className="flex items-center gap-2.5">
                    <div className="size-8 rounded-lg bg-red-500/10 text-red-400 flex items-center justify-center">
                      <FileText className="size-4" />
                    </div>
                    <div>
                      <div className="text-xs font-semibold">design-tokens.pdf</div>
                      <div className="text-[10px] text-[var(--text-muted)]">2.4 MB · PDF Document</div>
                    </div>
                  </div>
                  <button className="rounded p-1.5 hover:bg-[var(--bg-subtle)] text-[var(--text-muted)] hover:text-[var(--text-main)] transition-colors">
                    <Download className="size-3.5" />
                  </button>
                </div>
              </div>
            </div>
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
                <th className="p-3 font-semibold">Component</th>
                <th className="p-3 font-semibold">Prop</th>
                <th className="p-3 font-semibold">Type</th>
                <th className="p-3 font-semibold">Description</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[var(--border-subtle)] text-[var(--text-muted)]">
              <tr>
                <td className="p-3 font-mono text-[var(--text-main)]">Message</td>
                <td className="p-3 font-mono">align</td>
                <td className="p-3 font-mono">"start" | "end"</td>
                <td className="p-3">Horizontal row alignment (start = received, end = sent)</td>
              </tr>
              <tr>
                <td className="p-3 font-mono text-[var(--text-main)]">MessageGroup</td>
                <td className="p-3 font-mono">className</td>
                <td className="p-3 font-mono">string</td>
                <td className="p-3">Container for consecutive message stacking</td>
              </tr>
              <tr>
                <td className="p-3 font-mono text-[var(--text-main)]">MessageAvatar</td>
                <td className="p-3 font-mono">className</td>
                <td className="p-3 font-mono">string</td>
                <td className="p-3">Avatar slot anchoring to bottom of bubble surface</td>
              </tr>
              <tr>
                <td className="p-3 font-mono text-[var(--text-main)]">MessageHeader</td>
                <td className="p-3 font-mono">className</td>
                <td className="p-3 font-mono">string</td>
                <td className="p-3">Sender name or timestamp above the bubble</td>
              </tr>
              <tr>
                <td className="p-3 font-mono text-[var(--text-main)]">MessageFooter</td>
                <td className="p-3 font-mono">className</td>
                <td className="p-3 font-mono">string</td>
                <td className="p-3">Actions or status indicators below the bubble</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>
    </div>
  )
}
