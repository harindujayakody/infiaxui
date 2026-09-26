"use client"

import React, { useState } from "react"
import { Copy, Check, ExternalLink } from "lucide-react"
import { InstallationSection } from "@/components/shadcn/installation-section"
import {
  TweetCardImagesDemo,
  TweetCardMetaPreviewDemo,
} from "@/components/magicui/tweet-card-demo"

export function TweetCardGuide() {
  const [copiedId, setCopiedId] = useState<string | null>(null)

  const handleCopy = (id: string, text: string) => {
    navigator.clipboard.writeText(text)
    setCopiedId(id)
    setTimeout(() => setCopiedId(null), 2000)
  }

  const manualSourceCode = `"use client"

import React, { Suspense } from "react"
import { enrichTweet, type EnrichedTweet, type TweetProps } from "react-tweet"
import type { Tweet } from "react-tweet/api"
import { cn } from "@/lib/utils"

export interface TwitterIconProps {
  className?: string
  [key: string]: unknown
}

export const Twitter = ({ className, ...props }: TwitterIconProps) => (
  <svg
    stroke="currentColor"
    fill="currentColor"
    strokeWidth="0"
    viewBox="0 0 24 24"
    height="1em"
    width="1em"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    {...props}
  >
    <g>
      <path fill="none" d="M0 0h24v24H0z"></path>
      <path d="M22.162 5.656a8.384 8.384 0 0 1-2.402.658A4.196 4.196 0 0 0 21.6 4c-.82.488-1.719.83-2.656 1.015a4.182 4.182 0 0 0-7.126 3.814 11.874 11.874 0 0 1-8.62-4.37 4.168 4.168 0 0 0-.566 2.103c0 1.45.738 2.731 1.86 3.481a4.168 4.168 0 0 1-1.894-.523v.052a4.185 4.185 0 0 0 3.355 4.101 4.21 4.21 0 0 1-1.89.072A4.185 4.185 0 0 0 7.97 16.65a8.394 8.394 0 0 1-6.191 1.732 11.83 11.83 0 0 0 6.41 1.88c7.693 0 11.9-6.373 11.9-11.9 0-.18-.005-.362-.013-.54a8.496 8.496 0 0 0 2.087-2.165z"></path>
    </g>
  </svg>
)

export const Verified = ({ className, ...props }: TwitterIconProps) => (
  <svg
    aria-label="Verified Account"
    viewBox="0 0 24 24"
    className={className}
    {...props}
  >
    <g fill="currentColor">
      <path d="M22.5 12.5c0-1.58-.875-2.95-2.148-3.6.154-.435.238-.905.238-1.4 0-2.21-1.71-3.998-3.818-3.998-.47 0-.92.084-1.336.25C14.818 2.415 13.51 1.5 12 1.5s-2.816.917-3.437 2.25c-.415-.165-.866-.25-1.336-.25-2.11 0-3.818 1.79-3.818 4 0 .494.083.964.237 1.4-1.272.65-2.147 2.018-2.147 3.6 0 1.495.782 2.798 1.942 3.486-.02.17-.032.34-.032.514 0 2.21 1.708 4 3.818 4 .47 0 .92-.086 1.335-.25.62 1.334 1.926 2.25 3.437 2.25 1.512 0 2.818-.916 3.437-2.25.415.163.865.248 1.336.248 2.11 0 3.818-1.79 3.818-4 0-.174-.012-.344-.033-.513 1.158-.687 1.943-1.99 1.943-3.484zm-6.616-3.334l-4.334 6.5c-.145.217-.382.334-.625.334-.143 0-.288-.04-.416-.126l-.115-.094-2.415-2.415c-.293-.293-.293-.768 0-1.06s.768-.294 1.06 0l1.77 1.767 3.825-5.74c.23-.345.696-.436 1.04-.207.346.23.44.696.21 1.04z" />
    </g>
  </svg>
)

export const truncate = (str: string | null, length: number) => {
  if (!str || str.length <= length) return str
  return \`\${str.slice(0, length - 3)}...\`
}

export const MagicTweet = ({
  tweet,
  className,
  ...props
}: {
  tweet: Tweet
  className?: string
  [key: string]: unknown
}) => {
  const enrichedTweet = enrichTweet(tweet)
  return (
    <div
      className={cn(
        "relative flex h-fit w-full max-w-lg flex-col gap-3.5 overflow-hidden rounded-2xl border border-[var(--border-subtle)] bg-[var(--bg-card)] p-5 shadow-2xl transition-colors",
        className
      )}
      {...props}
    >
      <TweetHeader tweet={enrichedTweet} />
      <TweetBody tweet={enrichedTweet} />
      <TweetMedia tweet={enrichedTweet} />
    </div>
  )
}

export const TweetCard = ({
  id,
  tweet,
  className,
  fallback,
  ...props
}: TweetCardProps) => {
  return <MagicTweet tweet={tweet} className={className} {...props} />
}`

  return (
    <div className="space-y-12 pt-6">
      {/* Installation Section with CLI + Manual */}
      <InstallationSection
        componentName="Tweet Card"
        componentSlug="tweet-card"
        dependencies="react-tweet"
        sourceCode={manualSourceCode}
        sourcePath="components/magicui/tweet-card.tsx"
      />

      {/* Usage Examples Section */}
      <div id="usage" className="scroll-mt-20 space-y-4 pt-6 border-t border-[var(--border-subtle)]">
        <h2 className="type-h2 text-[var(--text-main)]">Usage</h2>
        <p className="type-body text-[var(--text-muted)] text-[13px]">
          Render tweets on the server side using Next.js 13+ RSC or on the client side with custom fallbacks.
        </p>

        <div className="space-y-4">
          <div className="space-y-2">
            <span className="text-xs font-mono text-[var(--text-muted)]">Client-Side Usage</span>
            <div className="relative rounded-2xl border border-[var(--border-subtle)] bg-[var(--bg-card)] p-4 font-mono text-xs overflow-x-auto">
              <button
                onClick={() =>
                  handleCopy(
                    "usage-client",
                    `import { ClientTweetCard } from "@/components/magicui/tweet-card"\n\nexport default function App() {\n  return <ClientTweetCard id="1441032681968212480" />\n}`
                  )
                }
                className="absolute top-3 right-3 p-1.5 rounded-lg text-[var(--text-muted)] hover:text-[var(--text-main)]"
              >
                {copiedId === "usage-client" ? (
                  <Check className="size-3.5 text-emerald-400" />
                ) : (
                  <Copy className="size-3.5" />
                )}
              </button>
              <pre className="text-[var(--text-main)]">
                <code>{`import { ClientTweetCard } from "@/components/magicui/tweet-card"

export default function App() {
  return <ClientTweetCard id="1441032681968212480" />
}`}</code>
              </pre>
            </div>
          </div>

          <div className="space-y-2">
            <span className="text-xs font-mono text-[var(--text-muted)]">RSC (Server Side) Usage</span>
            <div className="relative rounded-2xl border border-[var(--border-subtle)] bg-[var(--bg-card)] p-4 font-mono text-xs overflow-x-auto">
              <button
                onClick={() =>
                  handleCopy(
                    "usage-rsc",
                    `import { TweetCard } from "@/components/magicui/tweet-card"\n\nexport default async function App() {\n  return <TweetCard id="1441032681968212480" />\n}`
                  )
                }
                className="absolute top-3 right-3 p-1.5 rounded-lg text-[var(--text-muted)] hover:text-[var(--text-main)]"
              >
                {copiedId === "usage-rsc" ? (
                  <Check className="size-3.5 text-emerald-400" />
                ) : (
                  <Copy className="size-3.5" />
                )}
              </button>
              <pre className="text-[var(--text-main)]">
                <code>{`import { TweetCard } from "@/components/magicui/tweet-card"

export default async function App() {
  return <TweetCard id="1441032681968212480" />
}`}</code>
              </pre>
            </div>
          </div>
        </div>
      </div>

      {/* Examples Header */}
      <div id="examples" className="scroll-mt-20 space-y-4 pt-6 border-t border-[var(--border-subtle)]">
        <h2 className="type-h2 text-[var(--text-main)]">Examples</h2>
        <p className="type-body text-[var(--text-muted)] text-[13px]">
          Explore multi-image galleries, media carousels, and rich metadata preview cards.
        </p>
      </div>

      {/* Example 1: Image Carousel */}
      <div id="example-images" className="scroll-mt-20 space-y-4 pt-4">
        <h3 className="type-heading text-[var(--text-main)] font-semibold text-[16px]">
          Tweet Card With Image Carousel
        </h3>
        <p className="text-[13px] text-[var(--text-muted)]">
          Displays tweets containing multiple embedded images with responsive aspect ratios and horizontal snapping.
        </p>
        <div className="rounded-2xl border border-[var(--border-subtle)] bg-[var(--bg-card)] p-6">
          <TweetCardImagesDemo />
        </div>
      </div>

      {/* Example 2: Meta URL Preview */}
      <div id="example-meta-preview" className="scroll-mt-20 space-y-4 pt-4">
        <h3 className="type-heading text-[var(--text-main)] font-semibold text-[16px]">
          Tweet Card With Meta URL Preview
        </h3>
        <p className="text-[13px] text-[var(--text-muted)]">
          Integrate rich link cards and OpenGraph thumbnail cards beneath the primary tweet copy.
        </p>
        <div className="rounded-2xl border border-[var(--border-subtle)] bg-[var(--bg-card)] p-6">
          <TweetCardMetaPreviewDemo />
        </div>
      </div>

      {/* Props Reference Table */}
      <div id="props" className="scroll-mt-20 space-y-4 pt-6 border-t border-[var(--border-subtle)]">
        <h2 className="type-h2 text-[var(--text-main)]">Props</h2>
        <p className="type-body text-[var(--text-muted)] text-[13px]">
          API reference properties for <code className="text-[var(--text-main)] font-mono">&lt;TweetCard /&gt;</code> and <code className="text-[var(--text-main)] font-mono">&lt;ClientTweetCard /&gt;</code>.
        </p>

        {/* ClientTweetCard */}
        <h3 className="type-heading text-[var(--text-main)] font-semibold text-[15px] pt-2">
          ClientTweetCard Props
        </h3>
        <div className="rounded-2xl border border-[var(--border-subtle)] bg-[var(--bg-card)] overflow-x-auto">
          <table className="w-full text-left text-xs font-mono">
            <thead className="border-b border-[var(--border-subtle)] bg-[var(--bg-subtle)]/50 text-[var(--text-muted)]">
              <tr>
                <th className="p-3.5 font-semibold">Prop</th>
                <th className="p-3.5 font-semibold">Type</th>
                <th className="p-3.5 font-semibold">Default</th>
                <th className="p-3.5 font-semibold font-sans">Description</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[var(--border-subtle)] text-[var(--text-main)]">
              <tr>
                <td className="p-3.5 text-blue-400 font-semibold">id</td>
                <td className="p-3.5 text-[var(--text-muted)]">string</td>
                <td className="p-3.5 text-[var(--text-muted)]">—</td>
                <td className="p-3.5 font-sans text-[var(--text-muted)] text-[13px]">The unique ID of the tweet to display.</td>
              </tr>
              <tr>
                <td className="p-3.5 text-blue-400 font-semibold">tweet</td>
                <td className="p-3.5 text-[var(--text-muted)]">Tweet</td>
                <td className="p-3.5 text-emerald-400">SAMPLE_TWEET</td>
                <td className="p-3.5 font-sans text-[var(--text-muted)] text-[13px]">Static tweet data object for offline or custom rendering.</td>
              </tr>
              <tr>
                <td className="p-3.5 text-blue-400 font-semibold">fallback</td>
                <td className="p-3.5 text-[var(--text-muted)]">React.ReactNode</td>
                <td className="p-3.5 text-emerald-400">&lt;TweetSkeleton /&gt;</td>
                <td className="p-3.5 font-sans text-[var(--text-muted)] text-[13px]">Custom loading skeleton component while fetching.</td>
              </tr>
              <tr>
                <td className="p-3.5 text-blue-400 font-semibold">className</td>
                <td className="p-3.5 text-[var(--text-muted)]">string</td>
                <td className="p-3.5 text-[var(--text-muted)]">—</td>
                <td className="p-3.5 font-sans text-[var(--text-muted)] text-[13px]">Custom styling applied to the tweet card wrapper.</td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* TweetCard */}
        <h3 className="type-heading text-[var(--text-main)] font-semibold text-[15px] pt-4">
          TweetCard Props
        </h3>
        <div className="rounded-2xl border border-[var(--border-subtle)] bg-[var(--bg-card)] overflow-x-auto">
          <table className="w-full text-left text-xs font-mono">
            <thead className="border-b border-[var(--border-subtle)] bg-[var(--bg-subtle)]/50 text-[var(--text-muted)]">
              <tr>
                <th className="p-3.5 font-semibold">Prop</th>
                <th className="p-3.5 font-semibold">Type</th>
                <th className="p-3.5 font-semibold">Default</th>
                <th className="p-3.5 font-semibold font-sans">Description</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[var(--border-subtle)] text-[var(--text-main)]">
              <tr>
                <td className="p-3.5 text-blue-400 font-semibold">id</td>
                <td className="p-3.5 text-[var(--text-muted)]">string</td>
                <td className="p-3.5 text-[var(--text-muted)]">—</td>
                <td className="p-3.5 font-sans text-[var(--text-muted)] text-[13px]">The unique ID of the tweet to display.</td>
              </tr>
              <tr>
                <td className="p-3.5 text-blue-400 font-semibold">tweet</td>
                <td className="p-3.5 text-[var(--text-muted)]">Tweet</td>
                <td className="p-3.5 text-emerald-400">SAMPLE_TWEET</td>
                <td className="p-3.5 font-sans text-[var(--text-muted)] text-[13px]">Static tweet data object for offline or custom rendering.</td>
              </tr>
              <tr>
                <td className="p-3.5 text-blue-400 font-semibold">fallback</td>
                <td className="p-3.5 text-[var(--text-muted)]">React.ReactNode</td>
                <td className="p-3.5 text-emerald-400">&lt;TweetSkeleton /&gt;</td>
                <td className="p-3.5 font-sans text-[var(--text-muted)] text-[13px]">Custom loading skeleton component while resolving.</td>
              </tr>
              <tr>
                <td className="p-3.5 text-blue-400 font-semibold">className</td>
                <td className="p-3.5 text-[var(--text-muted)]">string</td>
                <td className="p-3.5 text-[var(--text-muted)]">—</td>
                <td className="p-3.5 font-sans text-[var(--text-muted)] text-[13px]">Custom styling applied to the tweet card wrapper.</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* Credits Section */}
      <div id="credits" className="scroll-mt-20 space-y-2 pt-6 border-t border-[var(--border-subtle)] text-[13px] text-[var(--text-muted)]">
        <h4 className="font-semibold text-[var(--text-main)] text-[14px]">Credits</h4>
        <p>
          This component is built on top of{" "}
          <a
            href="https://react-tweet.vercel.app/"
            target="_blank"
            rel="noreferrer"
            className="text-blue-400 hover:underline inline-flex items-center gap-1"
          >
            React Tweet <ExternalLink className="size-3" />
          </a>{" "}
          and created by{" "}
          <a
            href="https://twitter.com/dillionverma"
            target="_blank"
            rel="noreferrer"
            className="text-blue-400 hover:underline inline-flex items-center gap-1"
          >
            @dillionverma <ExternalLink className="size-3" />
          </a>
          .
        </p>
      </div>
    </div>
  )
}
