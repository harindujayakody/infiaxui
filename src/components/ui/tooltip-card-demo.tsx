"use client"

import React from "react"
import { Tooltip } from "@/components/ui/tooltip-card"
import { Sparkles, Cloud, Quote, CheckCircle2 } from "lucide-react"

// Tyler Durden Card content
export const TylerDurdenCard = () => {
  return (
    <div className="w-56 sm:w-60">
      <div className="relative aspect-square w-full overflow-hidden rounded-lg bg-neutral-800 border border-neutral-700/50">
        <img
          src="/images/tyler.webp"
          alt="Tyler Durden"
          className="aspect-square w-full object-cover transition-transform duration-300 hover:scale-105"
          onError={(e) => {
            // Fallback if network issue
            e.currentTarget.style.display = "none"
            const fallback = e.currentTarget.parentElement?.querySelector(".avatar-fallback") as HTMLElement
            if (fallback) fallback.style.display = "flex"
          }}
        />
        <div className="avatar-fallback hidden absolute inset-0 items-center justify-center bg-gradient-to-br from-amber-600/30 to-amber-900/40 text-amber-200 text-3xl font-bold">
          TD
        </div>
      </div>
      <div className="my-3 flex flex-col">
        <p className="text-base font-bold text-neutral-900 dark:text-white">Tyler Durden</p>
        <p className="mt-1 text-xs leading-relaxed text-neutral-600 dark:text-neutral-400">
          Soap Developer from a Tier 3 college. Enthusiastic and exhibits entrepreneurial spirit.
        </p>
      </div>
    </div>
  )
}

// Testimonial Card content
export const TestimonialCard = () => {
  return (
    <div className="w-64 sm:w-72">
      <blockquote className="mb-3.5 text-xs sm:text-[13px] italic leading-relaxed text-neutral-700 dark:text-neutral-300 border-l-2 border-amber-500/70 pl-3">
        &ldquo;This product is absolutely, grade A horse shit.&rdquo;
      </blockquote>
      <div className="flex items-center gap-2.5 pt-1 border-t border-neutral-200/60 dark:border-neutral-800/80">
        <img
          src="/images/tyler.webp"
          alt="Tyler Durden"
          className="size-7 rounded-full object-cover ring-1 ring-amber-500/40"
        />
        <div className="min-w-0">
          <p className="text-xs font-semibold text-neutral-900 dark:text-neutral-100 truncate">
            Tyler Durden
          </p>
          <p className="text-[10px] text-neutral-500 dark:text-neutral-400 truncate">
            Senior Product Manager at FC
          </p>
        </div>
      </div>
    </div>
  )
}

// 1. Primary Showcase matching screenshots media_1790460659634.png & media_1790460683845.png
export function TooltipCardDemo() {
  return (
    <div className="w-full max-w-2xl rounded-2xl border border-neutral-800 bg-[#0A0A0A] p-6 sm:p-10 text-neutral-400 shadow-2xl">
      <p className="text-sm sm:text-base leading-relaxed text-neutral-300">
        There was a problem with the server. Once{" "}
        <Tooltip
          containerClassName="text-neutral-300"
          content={
            <div className="w-64 sm:w-72 leading-relaxed">
              AWS markets itself as the &ldquo;world&apos;s most comprehensive and broadly adopted cloud platform&rdquo; offering over 200 fully featured services globally.
            </div>
          }
        >
          <span className="cursor-pointer font-bold text-white underline decoration-neutral-600 underline-offset-4 transition-colors hover:decoration-white hover:text-white">
            AWS
          </span>
        </Tooltip>{" "}
        went down, we had to quickly migrate to a new provider. AWS in general is a great service,
        but sometimes it&apos;s not available.
      </p>

      <p className="mt-8 text-sm sm:text-base leading-relaxed text-neutral-300">
        The server was administered by{" "}
        <Tooltip
          containerClassName="text-neutral-300"
          content={<TylerDurdenCard />}
        >
          <span className="cursor-pointer font-bold text-white underline decoration-neutral-600 underline-offset-4 transition-colors hover:decoration-white hover:text-white">
            Tyler Durden.
          </span>
        </Tooltip>{" "}
        Tyler has been with us for a long time. He is a great asset to the team and sometimes
        tries to act in different ways which can be difficult to manage.
      </p>

      <p className="mt-8 text-sm sm:text-base leading-relaxed text-neutral-300">
        That is when we approached Tyler for a cute little{" "}
        <Tooltip
          containerClassName="text-neutral-300"
          content={<TestimonialCard />}
        >
          <span className="cursor-pointer font-bold text-white underline decoration-neutral-600 underline-offset-4 transition-colors hover:decoration-white hover:text-white">
            testimonial.
          </span>
        </Tooltip>{" "}
        Instead of a testimonial, he started yapping about project mayhem and how we should be
        using our skills to build a better future.
      </p>
    </div>
  )
}

// 2. Blocks Page Preview (Compact interactive preview for /blocks)
export function TooltipCardBlockPreview() {
  return (
    <div className="relative size-full overflow-hidden bg-[#0A0A0A] flex flex-col justify-center items-center p-4 sm:p-6 select-none">
      <div className="w-full max-w-sm rounded-xl border border-neutral-800 bg-[#121212]/90 p-4 shadow-lg">
        <div className="flex items-center gap-2 mb-2.5">
          <div className="size-2 rounded-full bg-emerald-500 animate-pulse" />
          <span className="text-[11px] font-mono uppercase tracking-wider text-neutral-400">
            System Outage Incident
          </span>
        </div>
        <p className="text-xs sm:text-[13px] leading-relaxed text-neutral-300">
          When{" "}
          <Tooltip
            containerClassName="text-neutral-300"
            content={
              <div className="w-48 text-[11px] leading-snug">
                <span className="font-semibold text-white block mb-0.5">Amazon Web Services</span>
                Cloud infrastructure provider hosting mission-critical microservices.
              </div>
            }
          >
            <span className="cursor-pointer font-bold text-white underline decoration-zinc-500 hover:decoration-white">
              AWS
            </span>
          </Tooltip>{" "}
          went offline, our lead developer{" "}
          <Tooltip
            containerClassName="text-neutral-300"
            content={<TylerDurdenCard />}
          >
            <span className="cursor-pointer font-bold text-white underline decoration-zinc-500 hover:decoration-white">
              Tyler Durden
            </span>
          </Tooltip>{" "}
          deployed emergency hotfixes. Hover above words to inspect.
        </p>
      </div>
    </div>
  )
}
