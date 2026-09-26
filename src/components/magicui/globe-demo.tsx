"use client"

import React, { useState } from "react"
import { Globe, GLOBE_CONFIG } from "@/components/magicui/globe"
import { RotateCw, Sparkles, Navigation } from "lucide-react"

// 1. Primary Showcase matching user screenshot media_1790455342657.png
export function GlobeDemo() {
  return (
    <div className="relative flex size-full min-h-[460px] w-full max-w-2xl flex-col items-center justify-start overflow-hidden rounded-2xl border border-[var(--border-subtle)] bg-[#0A0A0A] px-6 pt-10 pb-48 sm:pb-64 select-none shadow-2xl">
      <span className="pointer-events-none whitespace-pre-wrap bg-gradient-to-b from-white via-zinc-200 to-zinc-600/40 bg-clip-text text-center text-7xl sm:text-8xl font-semibold leading-none text-transparent tracking-tight z-10 drop-shadow-md">
        Globe
      </span>
      <p className="z-10 mt-3 text-xs sm:text-[13px] text-zinc-400 text-center max-w-xs sm:max-w-sm">
        Drag to rotate. Autorotating, interactive WebGL globe with glowing pinpoint markers.
      </p>
      <Globe className="top-32 sm:top-36" />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_120%,rgba(120,119,198,0.1),transparent_60%)]" />
    </div>
  )
}

// 2. Interactive / Custom Markers Demo
export function GlobeInteractiveDemo() {
  const [selectedCity, setSelectedCity] = useState("Tokyo")

  const CITIES = [
    { name: "Tokyo", coords: [35.6762, 139.6503] as [number, number] },
    { name: "New York", coords: [40.7128, -74.006] as [number, number] },
    { name: "London", coords: [51.5074, -0.1278] as [number, number] },
    { name: "Sydney", coords: [-33.8688, 151.2093] as [number, number] },
  ]

  return (
    <div className="relative flex min-h-[440px] w-full max-w-2xl flex-col items-center justify-between overflow-hidden rounded-2xl border border-[var(--border-subtle)] bg-[#0A0A0A] p-6 shadow-2xl">
      {/* Top Header */}
      <div className="relative z-10 flex w-full items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="size-2 rounded-full bg-emerald-500 animate-pulse" />
          <span className="text-xs font-mono text-zinc-400">Global Network</span>
        </div>
        <div className="flex items-center gap-1.5">
          {CITIES.map((c) => (
            <button
              key={c.name}
              onClick={() => setSelectedCity(c.name)}
              className={`px-2.5 py-1 text-[11px] rounded-lg border transition-all ${
                selectedCity === c.name
                  ? "bg-white text-black font-medium border-white"
                  : "bg-zinc-900 text-zinc-400 border-zinc-800 hover:text-white"
              }`}
            >
              {c.name}
            </button>
          ))}
        </div>
      </div>

      {/* Center Globe Stage */}
      <div className="relative size-full min-h-[280px] w-full flex items-center justify-center">
        <Globe
          className="top-12"
          config={{
            ...GLOBE_CONFIG,
            mapSamples: 14000,
            markerColor: [249 / 255, 115 / 255, 22 / 255],
          }}
        />
      </div>

      {/* Footer Info */}
      <div className="relative z-10 w-full flex items-center justify-between text-xs text-zinc-500 pt-2 border-t border-zinc-900">
        <span className="flex items-center gap-1 font-mono">
          <Navigation className="size-3 text-orange-400" />
          <span>Active Target: {selectedCity}</span>
        </span>
        <span className="font-mono text-[11px]">10 nodes active</span>
      </div>
    </div>
  )
}

// 3. Blocks Page Preview (Strictly NO inner frame inside frame, NO dividing border, real WebGL Globe)
export function GlobeBlockPreview() {
  return (
    <div className="relative size-full overflow-hidden bg-[#0A0A0A] flex flex-col items-center justify-start pt-6 select-none">
      {/* Subtle Title Backdrop */}
      <span className="pointer-events-none whitespace-pre-wrap bg-gradient-to-b from-white via-zinc-200 to-zinc-600/30 bg-clip-text text-center text-4xl sm:text-5xl font-semibold leading-none text-transparent tracking-tight z-10 drop-shadow-sm">
        Globe
      </span>

      {/* Real Interactive WebGL Globe positioned to dome up gracefully */}
      <Globe
        className="top-14 scale-95"
        config={{
          ...GLOBE_CONFIG,
          mapSamples: 12000,
          mapBrightness: 1.1,
        }}
      />

      {/* Ambient gradient overlay */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#0A0A0A]/40 via-transparent to-transparent" />
    </div>
  )
}
