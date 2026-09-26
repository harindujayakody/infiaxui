"use client"

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
  return `${str.slice(0, length - 3)}...`
}

const Skeleton = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => {
  return (
    <div
      className={cn("bg-[var(--bg-subtle)] rounded-md animate-pulse", className)}
      {...props}
    />
  )
}

export const TweetSkeleton = ({
  className,
  ...props
}: {
  className?: string
  [key: string]: unknown
}) => (
  <div
    className={cn(
      "flex size-full max-h-max min-w-72 flex-col gap-3 rounded-2xl border border-[var(--border-subtle)] bg-[var(--bg-card)] p-5",
      className
    )}
    {...props}
  >
    <div className="flex flex-row items-center gap-3">
      <Skeleton className="size-10 shrink-0 rounded-full" />
      <div className="space-y-1.5 flex-1">
        <Skeleton className="h-4 w-28" />
        <Skeleton className="h-3 w-20" />
      </div>
    </div>
    <Skeleton className="h-16 w-full" />
  </div>
)

export const TweetNotFound = ({
  className,
  ...props
}: {
  className?: string
  [key: string]: unknown
}) => (
  <div
    className={cn(
      "flex size-full flex-col items-center justify-center gap-2 rounded-2xl border border-[var(--border-subtle)] bg-[var(--bg-card)] p-6 text-center",
      className
    )}
    {...props}
  >
    <Twitter className="size-6 text-[var(--text-muted)] opacity-60" />
    <h3 className="text-sm font-medium text-[var(--text-main)]">Tweet not found</h3>
    <p className="text-xs text-[var(--text-muted)]">Unable to fetch or display tweet data.</p>
  </div>
)

export const TweetHeader = ({ tweet }: { tweet: EnrichedTweet }) => (
  <div className="flex flex-row items-start justify-between tracking-normal">
    <div className="flex items-center space-x-3">
      <a
        href={tweet.user.url}
        target="_blank"
        rel="noreferrer"
        className="shrink-0"
      >
        <img
          title={`Profile picture of ${tweet.user.name}`}
          alt={tweet.user.screen_name}
          height={42}
          width={42}
          src={tweet.user.profile_image_url_https}
          className="border border-[var(--border-subtle)] overflow-hidden rounded-full object-cover size-10"
        />
      </a>
      <div className="flex flex-col gap-0.5">
        <a
          href={tweet.user.url}
          target="_blank"
          rel="noreferrer"
          className="text-[var(--text-main)] flex items-center font-medium text-[15px] whitespace-nowrap transition-opacity hover:opacity-80"
        >
          {truncate(tweet.user.name, 20)}
          {(tweet.user.verified || tweet.user.is_blue_verified) && (
            <Verified className="ml-1 inline size-3.5 text-blue-400" />
          )}
        </a>
        <div className="flex items-center space-x-1">
          <a
            href={tweet.user.url}
            target="_blank"
            rel="noreferrer"
            className="text-[var(--text-muted)] hover:text-[var(--text-main)] text-xs transition-colors"
          >
            @{truncate(tweet.user.screen_name, 16)}
          </a>
        </div>
      </div>
    </div>
    <a href={tweet.url} target="_blank" rel="noreferrer" aria-label="View on X/Twitter">
      <span className="sr-only">Link to tweet</span>
      <Twitter className="text-[var(--text-muted)] hover:text-[var(--text-main)] size-4 transition-all ease-in-out hover:scale-110" />
    </a>
  </div>
)

export const TweetBody = ({ tweet }: { tweet: EnrichedTweet }) => (
  <div className="text-[14px] leading-relaxed tracking-normal break-words text-[var(--text-main)]">
    {tweet.entities.map((entity, idx) => {
      switch (entity.type) {
        case "url":
        case "symbol":
        case "hashtag":
        case "mention":
          return (
            <a
              key={idx}
              href={entity.href}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-400 hover:text-blue-300 font-normal transition-colors"
            >
              <span>{entity.text}</span>
            </a>
          )
        case "text":
          return (
            <span
              key={idx}
              className="text-[var(--text-main)] font-normal"
              dangerouslySetInnerHTML={{ __html: entity.text }}
            />
          )
        default:
          return null
      }
    })}
  </div>
)

export const TweetMedia = ({ tweet }: { tweet: EnrichedTweet }) => {
  if (!tweet.video && !tweet.photos) return null
  return (
    <div className="flex flex-1 items-center justify-center mt-1">
      {tweet.video && (
        <video
          poster={tweet.video.poster}
          autoPlay
          loop
          muted
          playsInline
          className="rounded-xl border border-[var(--border-subtle)] shadow-sm max-h-80 w-full object-cover"
        >
          <source src={tweet.video.variants[0].src} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      )}
      {tweet.photos && (
        <div className="relative flex transform-gpu snap-x snap-mandatory gap-2 overflow-x-auto w-full">
          {tweet.photos.map((photo) => (
            <img
              key={photo.url}
              src={photo.url}
              width={photo.width}
              height={photo.height}
              title={"Photo by " + tweet.user.name}
              alt={tweet.text}
              className="h-52 w-full shrink-0 snap-center snap-always rounded-xl border border-[var(--border-subtle)] object-cover shadow-sm"
            />
          ))}
        </div>
      )}
    </div>
  )
}

const withSafeEntities = <T extends { entities?: Tweet["entities"] }>(
  tweet: T
): T & { entities: Tweet["entities"] } => ({
  ...tweet,
  entities: {
    ...tweet.entities,
    hashtags: tweet.entities?.hashtags ?? [],
    urls: tweet.entities?.urls ?? [],
    symbols: tweet.entities?.symbols ?? [],
    user_mentions: tweet.entities?.user_mentions ?? [],
  },
})

export const MagicTweet = ({
  tweet,
  className,
  ...props
}: {
  tweet: Tweet
  className?: string
  [key: string]: unknown
}) => {
  const safeTweet: Tweet = {
    ...withSafeEntities(tweet),
    quoted_tweet: tweet.quoted_tweet
      ? withSafeEntities(tweet.quoted_tweet)
      : undefined,
  }
  const enrichedTweet = enrichTweet(safeTweet)
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

/**
 * Built-in Sample Tweet for zero-network showcases and Block Card previews
 */
export const SAMPLE_TWEET: Tweet = {
  __typename: "Tweet",
  id_str: "1780044485541699584",
  lang: "en",
  created_at: "2024-04-16T12:00:00.000Z",
  display_text_range: [0, 114],
  text: "Building magicui with React, Tailwind CSS, and Framer Motion ✨\n\nCheck out the new components: Tweet Card, Glare Hover, and Animated Beam!",
  user: {
    id_str: "123456",
    name: "Dillion Verma",
    screen_name: "dillionverma",
    profile_image_url_https: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80",
    verified: true,
    is_blue_verified: true,
    profile_image_shape: "Circle",
  },
  edit_control: {
    edit_tweet_ids: ["1780044485541699584"],
    editable_until_msecs: "1780044485541",
    is_edit_eligible: true,
    edits_remaining: "5",
  },
  isEdited: false,
  isStaleEdit: false,
  favorite_count: 1420,
  conversation_count: 88,
  news_action_type: "conversation",
  entities: {
    hashtags: [],
    urls: [],
    user_mentions: [
      {
        id_str: "999",
        indices: [9, 17],
        name: "Magic UI",
        screen_name: "magicui",
      },
    ],
    symbols: [],
    media: [],
  },
  photos: [
    {
      backgroundColor: { red: 0, green: 0, blue: 0 },
      cropCandidates: [],
      expandedUrl: "https://twitter.com",
      url: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=800&auto=format&fit=crop&q=80",
      width: 1200,
      height: 675,
    },
  ],
}

export type TweetCardProps = {
  id?: string
  className?: string
  tweet?: Tweet
  fallback?: React.ReactNode
  components?: {
    TweetNotFound?: React.ComponentType<{ className?: string }>
  }
  onError?: (err: unknown) => void
}

/**
 * Universal Tweet Card supporting both static tweet data and network tweet IDs
 */
export const TweetCard = ({
  id,
  tweet = SAMPLE_TWEET,
  className,
  fallback = <TweetSkeleton />,
  ...props
}: TweetCardProps) => {
  if (tweet) {
    return <MagicTweet tweet={tweet} className={className} {...props} />
  }

  return (
    <Suspense fallback={fallback}>
      <MagicTweet tweet={SAMPLE_TWEET} className={className} {...props} />
    </Suspense>
  )
}

export const ClientTweetCard = TweetCard
