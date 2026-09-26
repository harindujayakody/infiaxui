"use client"

import React, { useState } from "react"
import { TweetCard, MagicTweet, SAMPLE_TWEET, Twitter, Verified } from "@/components/magicui/tweet-card"
import type { Tweet } from "react-tweet/api"
import { Heart, MessageCircle, Repeat2, Bookmark, Share } from "lucide-react"

// 1. Default Tweet Card Demo
export function TweetCardDemo() {
  const [likes, setLikes] = useState(1420)
  const [isLiked, setIsLiked] = useState(false)
  const [retweets, setRetweets] = useState(248)
  const [isRetweeted, setIsRetweeted] = useState(false)

  const handleLike = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    if (isLiked) {
      setLikes((prev) => prev - 1)
      setIsLiked(false)
    } else {
      setLikes((prev) => prev + 1)
      setIsLiked(true)
    }
  }

  const handleRetweet = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    if (isRetweeted) {
      setRetweets((prev) => prev - 1)
      setIsRetweeted(false)
    } else {
      setRetweets((prev) => prev + 1)
      setIsRetweeted(true)
    }
  }

  return (
    <div className="flex w-full items-center justify-center p-4 sm:p-8">
      <div className="w-full max-w-lg space-y-3">
        <TweetCard tweet={SAMPLE_TWEET} />

        {/* Action bar for interactive feedback */}
        <div className="flex items-center justify-between px-4 py-2 rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-card)] text-xs text-[var(--text-muted)]">
          <button
            onClick={handleLike}
            className={`flex items-center gap-1.5 transition-colors cursor-pointer ${
              isLiked ? "text-rose-500 font-medium" : "hover:text-rose-400"
            }`}
          >
            <Heart className={`size-4 ${isLiked ? "fill-rose-500" : ""}`} />
            <span>{likes.toLocaleString()}</span>
          </button>

          <button
            onClick={handleRetweet}
            className={`flex items-center gap-1.5 transition-colors cursor-pointer ${
              isRetweeted ? "text-emerald-400 font-medium" : "hover:text-emerald-400"
            }`}
          >
            <Repeat2 className="size-4" />
            <span>{retweets.toLocaleString()}</span>
          </button>

          <div className="flex items-center gap-1.5 hover:text-blue-400 transition-colors cursor-pointer">
            <MessageCircle className="size-4" />
            <span>88</span>
          </div>

          <div className="flex items-center gap-3">
            <Bookmark className="size-4 hover:text-amber-400 transition-colors cursor-pointer" />
            <Share className="size-4 hover:text-[var(--text-main)] transition-colors cursor-pointer" />
          </div>
        </div>
      </div>
    </div>
  )
}

// 2. Tweet Card with Multiple Images Demo
const MULTI_IMAGE_TWEET: Tweet = {
  ...SAMPLE_TWEET,
  id_str: "1780044485541699585",
  text: "UI polish is all about the subtle details. 4-column responsive grid, spring magnification docks, and diagonal glare highlights. Which one is your favorite?",
  favorite_count: 3280,
  conversation_count: 142,
  photos: [
    {
      backgroundColor: { red: 0, green: 0, blue: 0 },
      cropCandidates: [],
      expandedUrl: "https://twitter.com",
      url: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=800&auto=format&fit=crop&q=80",
      width: 1200,
      height: 675,
    },
    {
      backgroundColor: { red: 0, green: 0, blue: 0 },
      cropCandidates: [],
      expandedUrl: "https://twitter.com",
      url: "https://images.unsplash.com/photo-1579783902614-a3fb3927b675?w=800&auto=format&fit=crop&q=80",
      width: 1200,
      height: 675,
    },
  ],
}

export function TweetCardImagesDemo() {
  return (
    <div className="flex w-full items-center justify-center p-4 sm:p-6">
      <MagicTweet tweet={MULTI_IMAGE_TWEET} className="max-w-md" />
    </div>
  )
}

// 3. Tweet Card with Meta URL Preview
const META_TWEET: Tweet = {
  ...SAMPLE_TWEET,
  id_str: "1780044485541699586",
  text: "Excited to introduce Magic UI: 50+ animated components built with React, Tailwind CSS, and Framer Motion. Free and open source.",
  photos: [],
}

export function TweetCardMetaPreviewDemo() {
  return (
    <div className="flex w-full items-center justify-center p-4 sm:p-6">
      <div className="w-full max-w-md space-y-3">
        <MagicTweet tweet={META_TWEET} />
        {/* Link card preview */}
        <a
          href="https://magicui.design"
          target="_blank"
          rel="noreferrer"
          className="group block rounded-2xl border border-[var(--border-subtle)] bg-[var(--bg-card)] overflow-hidden hover:border-[var(--border-active)] transition-colors"
        >
          <div className="h-32 w-full bg-gradient-to-r from-blue-900/40 via-purple-900/40 to-cyan-900/40 p-4 flex flex-col justify-end">
            <span className="text-[11px] font-mono text-cyan-400">magicui.design</span>
            <span className="text-sm font-semibold text-[var(--text-main)] group-hover:text-blue-400 transition-colors">
              UI library for Design Engineers
            </span>
          </div>
        </a>
      </div>
    </div>
  )
}

// 4. Real Component Preview for /blocks Grid (Card Preview)
export function TweetCardBlockPreview() {
  return (
    <div className="relative w-full h-full flex flex-col justify-center items-center bg-[#090A0F] p-4 select-none overflow-hidden">
      {/* Real unbordered interactive tweet card matching single frame rule */}
      <div className="w-full max-w-sm rounded-xl border border-white/10 bg-zinc-900/90 p-3.5 shadow-xl transition-transform hover:scale-[1.02] duration-200">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <img
              src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80"
              alt="Dillion Verma"
              className="size-8 rounded-full border border-white/15 object-cover"
            />
            <div className="flex flex-col">
              <div className="flex items-center gap-1">
                <span className="text-xs font-semibold text-white">Dillion Verma</span>
                <Verified className="size-3 text-blue-400" />
              </div>
              <span className="text-[11px] text-zinc-400">@dillionverma</span>
            </div>
          </div>
          <Twitter className="size-3.5 text-zinc-400" />
        </div>

        {/* Text */}
        <p className="mt-2 text-xs text-zinc-200 leading-snug line-clamp-2">
          Building <span className="text-blue-400">@magicui</span> with React, Tailwind CSS, and Framer Motion ✨
        </p>

        {/* Mini stats */}
        <div className="mt-2.5 flex items-center gap-4 text-[10px] text-zinc-400 font-mono">
          <span className="flex items-center gap-1 text-rose-400">
            <Heart className="size-3 fill-rose-400" /> 1.4k
          </span>
          <span className="flex items-center gap-1 text-emerald-400">
            <Repeat2 className="size-3" /> 248
          </span>
          <span className="flex items-center gap-1 text-blue-400">
            <MessageCircle className="size-3" /> 88
          </span>
        </div>
      </div>
    </div>
  )
}
