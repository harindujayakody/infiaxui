"use client"

import React from "react"
import { Marquee } from "@/components/magicui/marquee"
import { cn } from "@/lib/utils"

export const reviews = [
  {
    name: "Jack",
    username: "@jack",
    body: "I've never seen anything like this before. It's amazing. I love it.",
    gradient: "from-lime-400 to-emerald-600",
  },
  {
    name: "Jill",
    username: "@jill",
    body: "I don't know what to say. I'm speechless. This is amazing.",
    gradient: "from-indigo-500 via-purple-500 to-pink-500",
  },
  {
    name: "John",
    username: "@john",
    body: "I'm at a loss for words. This is amazing. I love it.",
    gradient: "from-yellow-400 to-emerald-500",
  },
  {
    name: "Jane",
    username: "@jane",
    body: "I'm at a loss for words. This is amazing. I love it.",
    gradient: "from-rose-500 to-purple-500",
  },
  {
    name: "Jenny",
    username: "@jenny",
    body: "I'm at a loss for words. This is amazing. I love it.",
    gradient: "from-amber-500 to-emerald-600",
  },
  {
    name: "James",
    username: "@james",
    body: "I'm at a loss for words. This is amazing. I love it.",
    gradient: "from-blue-500 to-indigo-600",
  },
]

const firstRow = reviews.slice(0, reviews.length / 2)
const secondRow = reviews.slice(reviews.length / 2)

export function ReviewCard({
  name,
  username,
  body,
  gradient,
  className,
}: {
  name: string
  username: string
  body: string
  gradient?: string
  className?: string
}) {
  return (
    <figure
      className={cn(
        "relative w-64 cursor-pointer overflow-hidden rounded-2xl border p-4 transition-all duration-300",
        "border-[var(--border-subtle)] bg-[var(--bg-card)] hover:bg-[var(--bg-subtle)]",
        "shadow-lg hover:shadow-2xl hover:-translate-y-0.5",
        className
      )}
    >
      <div className="flex flex-row items-center gap-2.5">
        <div
          className={cn(
            "size-8 rounded-full bg-gradient-to-tr shadow-sm shrink-0",
            gradient ?? "from-blue-500 to-purple-500"
          )}
        />
        <div className="flex flex-col">
          <figcaption className="text-sm font-semibold text-[var(--text-main)] leading-none">
            {name}
          </figcaption>
          <p className="text-xs font-mono text-[var(--text-muted)] mt-1">{username}</p>
        </div>
      </div>
      <blockquote className="mt-2.5 text-xs text-[var(--text-muted)] leading-relaxed">
        {body}
      </blockquote>
    </figure>
  )
}

// 1. Default Marquee Demo matching screenshot 1 (media_1790455290583.png)
export function MarqueeDemo() {
  return (
    <div className="relative flex h-[380px] w-full flex-col items-center justify-center overflow-hidden rounded-2xl border border-[var(--border-subtle)] bg-[var(--bg-card)] p-4 shadow-2xl">
      <Marquee pauseOnHover className="[--duration:25s]">
        {firstRow.map((review) => (
          <ReviewCard key={review.username} {...review} />
        ))}
      </Marquee>
      <Marquee reverse pauseOnHover className="[--duration:25s] mt-1">
        {secondRow.map((review) => (
          <ReviewCard key={review.username} {...review} />
        ))}
      </Marquee>

      {/* Left & Right gradient edge masks */}
      <div className="pointer-events-none absolute inset-y-0 left-0 w-1/4 bg-gradient-to-r from-[var(--bg-card)] to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 w-1/4 bg-gradient-to-l from-[var(--bg-card)] to-transparent" />
    </div>
  )
}

// 2. Vertical Marquee Demo matching screenshot 2 (media_1790455298213.png)
export function MarqueeVerticalDemo() {
  return (
    <div className="relative flex h-[460px] w-full flex-row items-center justify-center overflow-hidden rounded-2xl border border-[var(--border-subtle)] bg-[var(--bg-card)] p-4 shadow-2xl gap-4">
      <Marquee vertical pauseOnHover className="[--duration:20s]">
        {firstRow.map((review) => (
          <ReviewCard key={review.username} {...review} />
        ))}
      </Marquee>
      <Marquee vertical reverse pauseOnHover className="[--duration:20s]">
        {secondRow.map((review) => (
          <ReviewCard key={review.username} {...review} />
        ))}
      </Marquee>

      {/* Top & Bottom gradient edge masks */}
      <div className="pointer-events-none absolute inset-x-0 top-0 h-1/4 bg-gradient-to-b from-[var(--bg-card)] to-transparent" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-1/4 bg-gradient-to-t from-[var(--bg-card)] to-transparent" />
    </div>
  )
}

// 3. 3D Perspective Marquee Demo matching screenshot 3 (media_1790455316514.png)
export function Marquee3DDemo() {
  return (
    <div className="relative flex h-[460px] w-full items-center justify-center overflow-hidden rounded-2xl border border-[var(--border-subtle)] bg-[var(--bg-card)] p-4 shadow-2xl">
      <div className="flex flex-row gap-4 [transform:rotateX(20deg)_rotateZ(-20deg)_skewX(20deg)] transform-gpu">
        <Marquee vertical pauseOnHover className="[--duration:30s]">
          {firstRow.map((review) => (
            <ReviewCard key={`3d-1-${review.username}`} {...review} />
          ))}
        </Marquee>
        <Marquee vertical reverse pauseOnHover className="[--duration:25s]">
          {secondRow.map((review) => (
            <ReviewCard key={`3d-2-${review.username}`} {...review} />
          ))}
        </Marquee>
        <Marquee vertical pauseOnHover className="[--duration:30s]">
          {firstRow.map((review) => (
            <ReviewCard key={`3d-3-${review.username}`} {...review} />
          ))}
        </Marquee>
        <Marquee vertical reverse pauseOnHover className="[--duration:25s]">
          {secondRow.map((review) => (
            <ReviewCard key={`3d-4-${review.username}`} {...review} />
          ))}
        </Marquee>
      </div>

      {/* 4-way vignette masks */}
      <div className="pointer-events-none absolute inset-x-0 top-0 h-1/4 bg-gradient-to-b from-[var(--bg-card)] to-transparent" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-1/4 bg-gradient-to-t from-[var(--bg-card)] to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 left-0 w-1/4 bg-gradient-to-r from-[var(--bg-card)] to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 w-1/4 bg-gradient-to-l from-[var(--bg-card)] to-transparent" />
    </div>
  )
}

// 4. Real Component Preview for /blocks Grid Card
export function MarqueeBlockPreview() {
  return (
    <div className="relative w-full h-full min-h-[170px] flex items-center justify-center bg-[#090A0F] select-none overflow-hidden">
      <Marquee pauseOnHover className="[--duration:15s] [--gap:0.75rem] py-1">
        {reviews.slice(0, 4).map((review) => (
          <div
            key={`block-${review.username}`}
            className="flex items-center gap-2 rounded-xl border border-white/10 bg-zinc-900/90 px-3 py-2 text-xs"
          >
            <div
              className={cn(
                "size-5 rounded-full bg-gradient-to-tr shrink-0",
                review.gradient
              )}
            />
            <div className="flex flex-col">
              <span className="font-semibold text-white text-[11px] leading-tight">
                {review.name}
              </span>
              <span className="text-[10px] text-zinc-400 font-mono">
                {review.username}
              </span>
            </div>
          </div>
        ))}
      </Marquee>

      {/* Gradient edge fades */}
      <div className="pointer-events-none absolute inset-y-0 left-0 w-1/5 bg-gradient-to-r from-[#090A0F] to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 w-1/5 bg-gradient-to-l from-[#090A0F] to-transparent" />
    </div>
  )
}
