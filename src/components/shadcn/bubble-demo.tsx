import * as React from "react"
import {
  Bubble,
  BubbleContent,
  BubbleReactions,
  BubbleGroup,
} from "@/components/shadcn/bubble"
import { Button } from "@/components/shadcn/button"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/shadcn/popover"
import { ChevronDown, AlertCircle, Info, ThumbsUp, Heart, Flame } from "lucide-react"

export function BubbleDemo() {
  return (
    <div className="w-full max-w-md mx-auto space-y-6 p-4 select-none">
      {/* 1. User Message (Right) */}
      <Bubble variant="default" align="end">
        <BubbleContent>Hey there! what's up?</BubbleContent>
      </Bubble>

      {/* 2. Assistant Bubble Group (Left) */}
      <BubbleGroup className="space-y-1.5">
        <Bubble variant="secondary" align="start">
          <BubbleContent>Hey! Want to see chat bubbles?</BubbleContent>
        </Bubble>
        <Bubble variant="secondary" align="start" className="mb-2">
          <BubbleContent>
            I can group messages, switch sides, and keep the whole thread easy to scan.
          </BubbleContent>
          <BubbleReactions>
            <span>👍</span>
          </BubbleReactions>
        </Bubble>
      </BubbleGroup>

      {/* 3. User Message (Right) */}
      <Bubble variant="default" align="end">
        <BubbleContent>Sure. Hit me with your best demo.</BubbleContent>
      </Bubble>

      {/* 4. Assistant Message (Left) */}
      <Bubble variant="secondary" align="start" className="mb-2">
        <BubbleContent>
          Yes. You are reading a demo that is demoing itself. Very meta. Very on-brand.
        </BubbleContent>
        <BubbleReactions>
          <span>👍</span>
          <span>🔥</span>
          <span>👀</span>
          <span className="text-[10px] font-mono text-zinc-400 font-semibold">+2</span>
        </BubbleReactions>
      </Bubble>
    </div>
  )
}

export function BubbleVariantsDemo() {
  return (
    <div className="w-full max-w-md space-y-3">
      <Bubble variant="default" align="end">
        <BubbleContent>Default primary user bubble</BubbleContent>
      </Bubble>
      <Bubble variant="secondary" align="start">
        <BubbleContent>Secondary standard response bubble</BubbleContent>
      </Bubble>
      <Bubble variant="muted" align="start">
        <BubbleContent>Muted subtle supporting text</BubbleContent>
      </Bubble>
      <Bubble variant="tinted" align="start">
        <BubbleContent>Tinted primary theme accent</BubbleContent>
      </Bubble>
      <Bubble variant="outline" align="start">
        <BubbleContent>Outlined structured message</BubbleContent>
      </Bubble>
      <Bubble variant="destructive" align="start">
        <BubbleContent>Destructive error notification</BubbleContent>
      </Bubble>
      <Bubble variant="ghost" align="start">
        <BubbleContent>Ghost unframed markdown output</BubbleContent>
      </Bubble>
    </div>
  )
}

export function BubbleAlignmentDemo() {
  return (
    <div className="w-full max-w-md space-y-3">
      <Bubble align="start" variant="secondary">
        <BubbleContent>Align start (Incoming receiver)</BubbleContent>
      </Bubble>
      <Bubble align="end" variant="default">
        <BubbleContent>Align end (Outgoing sender)</BubbleContent>
      </Bubble>
    </div>
  )
}

export function BubbleGroupDemo() {
  return (
    <div className="w-full max-w-md space-y-3">
      <BubbleGroup>
        <Bubble variant="secondary" align="start">
          <BubbleContent>First part of a multi-line thought...</BubbleContent>
        </Bubble>
        <Bubble variant="secondary" align="start">
          <BubbleContent>And the concluding second message!</BubbleContent>
        </Bubble>
      </BubbleGroup>
    </div>
  )
}

export function BubbleLinkButtonDemo() {
  return (
    <div className="w-full max-w-md space-y-3">
      <Bubble variant="muted" align="start">
        <BubbleContent
          render={
            <button
              type="button"
              onClick={() => alert("Bubble clicked!")}
              className="hover:underline font-medium text-blue-400 cursor-pointer"
            />
          }
        >
          Click here to view repository logs →
        </BubbleContent>
      </Bubble>
    </div>
  )
}

export function BubbleReactionsDemo() {
  return (
    <div className="w-full max-w-md space-y-6 pt-2 pb-4">
      <Bubble variant="secondary" align="start">
        <BubbleContent>Great job on the new release!</BubbleContent>
        <BubbleReactions>
          <span>🚀</span>
          <span>❤️</span>
          <span>🙌</span>
        </BubbleReactions>
      </Bubble>
    </div>
  )
}

export function BubbleCollapsibleDemo() {
  const [expanded, setExpanded] = React.useState(false)

  return (
    <div className="w-full max-w-md space-y-2">
      <Bubble variant="secondary" align="start">
        <BubbleContent>
          <p>This is a summarized output from the build process.</p>
          {expanded && (
            <div className="mt-2 pt-2 border-t border-zinc-700 font-mono text-[11px] text-zinc-300 space-y-1 animate-in fade-in-0">
              <div>✓ 2424 modules transformed.</div>
              <div>✓ built in 6.8s (production)</div>
              <div>✓ 0 TypeScript errors detected.</div>
            </div>
          )}
          <button
            type="button"
            onClick={() => setExpanded(!expanded)}
            className="mt-2 text-[11px] text-blue-400 hover:underline block cursor-pointer"
          >
            {expanded ? "Show less" : "Show more (3 lines)"}
          </button>
        </BubbleContent>
      </Bubble>
    </div>
  )
}

export function BubbleTooltipDemo() {
  return (
    <div className="w-full max-w-md space-y-3">
      <div className="group relative inline-block w-full">
        <Bubble variant="default" align="end">
          <BubbleContent>Hover to see timestamp</BubbleContent>
        </Bubble>
        <div className="opacity-0 group-hover:opacity-100 transition-opacity text-right text-[10px] text-[var(--text-muted)] font-mono mt-1 pr-1">
          Delivered at 09:42 AM · Read
        </div>
      </div>
    </div>
  )
}

export function BubblePopoverDemo() {
  return (
    <div className="w-full max-w-md space-y-3">
      <Bubble variant="destructive" align="start">
        <BubbleContent>
          <span>Deployment failed: Exit code 1</span>
          <Popover>
            <PopoverTrigger asChild>
              <button className="ml-2 underline text-[11px] text-rose-300 hover:text-white cursor-pointer inline-flex items-center gap-0.5">
                <Info className="size-3" />
                <span>Details</span>
              </button>
            </PopoverTrigger>
            <PopoverContent className="w-64 text-xs font-mono">
              <div className="font-bold text-rose-400">Build Error Trace:</div>
              <div className="text-[11px] text-[var(--text-muted)] mt-1">
                Port 3000 already in use by background process.
              </div>
            </PopoverContent>
          </Popover>
        </BubbleContent>
      </Bubble>
    </div>
  )
}
