"use client"

import React from "react"
import { ContainerScroll } from "@/components/ui/container-scroll-animation"
import {
  CheckCircle2,
  Circle,
  Clock,
  Filter,
  FolderGit2,
  LayoutGrid,
  Plus,
  Search,
  Sparkles,
  Users,
} from "lucide-react"
import { cn } from "@/lib/utils"

export function LinearDashboardMockup() {
  const tasks = [
    { id: "ENG-248", title: "Release new website", tag: "Magic", date: "Oct 12", due: "12 Oct", status: "in-progress" },
    { id: "ENG-250", title: "Design translucent assets", tag: "Design", date: "Oct 12", due: "11 Oct", status: "in-progress" },
    { id: "ENG-078", title: "Update documentation", tag: "Docs", date: "30 Sep", due: "30 Sep", status: "backlog" },
    { id: "ENG-199", title: "Batch loading of partial stores", tag: "SuperSync", date: "5 Sep", due: "5 Sep", status: "backlog" },
    { id: "ENG-201", title: "Fix CSS in roadmap team graph", tag: "Bug", date: "5 Sep", due: "5 Sep", status: "backlog" },
    { id: "ENG-344", title: "Enable data transmission beams", tag: "Core", date: "Oct 20", due: "5 Oct", status: "icebox" },
    { id: "ENG-402", title: "Tease the upcoming product release", tag: "Marketing", date: "Oct 19", due: "27 Sep", status: "icebox" },
  ]

  return (
    <div className="flex h-full w-full bg-[#0E0F14] text-zinc-300 font-sans select-none overflow-hidden rounded-xl border border-white/10">
      {/* Sidebar Navigation */}
      <div className="w-48 border-r border-white/10 p-3 hidden sm:flex flex-col justify-between bg-[#0A0B0E]/60 shrink-0">
        <div className="space-y-4">
          <div className="flex items-center gap-2 px-2 py-1.5 rounded-lg bg-white/5 border border-white/10">
            <div className="size-4 rounded-full bg-blue-500" />
            <span className="text-xs font-semibold text-white">Linear</span>
          </div>

          <button className="w-full flex items-center justify-between px-2.5 py-1.5 rounded-lg bg-blue-600/20 border border-blue-500/30 text-blue-400 text-xs font-medium">
            <span className="flex items-center gap-1.5">
              <Plus className="size-3.5" />
              <span>New Issue</span>
            </span>
            <kbd className="text-[10px] bg-blue-500/20 px-1 rounded">C</kbd>
          </button>

          <div className="space-y-1 text-xs">
            <div className="px-2 py-1.5 text-zinc-400 hover:text-white rounded hover:bg-white/5 cursor-pointer flex items-center gap-2">
              <Circle className="size-3.5 text-zinc-500" />
              <span>Inbox</span>
            </div>
            <div className="px-2 py-1.5 text-white bg-white/10 rounded font-medium flex items-center gap-2">
              <CheckCircle2 className="size-3.5 text-blue-400" />
              <span>My Issues</span>
            </div>
            <div className="px-2 py-1.5 text-zinc-400 hover:text-white rounded hover:bg-white/5 cursor-pointer flex items-center gap-2">
              <LayoutGrid className="size-3.5 text-zinc-500" />
              <span>Views</span>
            </div>
          </div>
        </div>

        <div className="text-[11px] text-zinc-500 space-y-1">
          <div className="px-2 py-1 font-semibold uppercase tracking-wider text-[10px] text-zinc-600">
            Favorites
          </div>
          <div className="px-2 py-1 hover:text-zinc-300 cursor-pointer flex items-center gap-1.5">
            <FolderGit2 className="size-3 text-purple-400" />
            <span>GitHub Sync</span>
          </div>
          <div className="px-2 py-1 hover:text-zinc-300 cursor-pointer flex items-center gap-1.5">
            <Sparkles className="size-3 text-cyan-400" />
            <span>Warp Mode</span>
          </div>
        </div>
      </div>

      {/* Main Task Feed */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top Header */}
        <div className="h-12 border-b border-white/10 px-4 flex items-center justify-between bg-black/20">
          <div className="flex items-center gap-2 text-xs">
            <span className="font-semibold text-white">Project Solar Sailer</span>
            <span className="text-zinc-500">•</span>
            <span className="px-2 py-0.5 rounded-full bg-blue-500/10 text-blue-400 text-[10px] border border-blue-500/20 font-medium">
              Engineering 89%
            </span>
          </div>
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1 px-2 py-1 rounded bg-white/5 border border-white/10 text-[11px] text-zinc-400">
              <Filter className="size-3" />
              <span>Filter</span>
            </div>
            <span className="px-2 py-1 rounded bg-white/10 text-white text-[11px] font-medium">
              Updates
            </span>
          </div>
        </div>

        {/* Task List */}
        <div className="flex-1 p-3 sm:p-4 space-y-2 overflow-y-auto font-mono text-xs">
          <div className="text-[11px] font-semibold text-zinc-400 font-sans px-1 pb-1 flex items-center gap-2">
            <span className="size-2 rounded-full bg-amber-400" />
            <span>In Progress</span>
            <span className="text-zinc-500">2</span>
          </div>

          {tasks.slice(0, 2).map((t) => (
            <div
              key={t.id}
              className="flex items-center justify-between p-2.5 rounded-lg bg-white/[0.03] border border-white/[0.06] hover:border-white/20 transition-colors"
            >
              <div className="flex items-center gap-2.5 min-w-0">
                <span className="text-zinc-500 text-[11px]">{t.id}</span>
                <span className="size-2 rounded-full bg-amber-400/80" />
                <span className="font-sans text-xs text-zinc-200 truncate">{t.title}</span>
              </div>
              <div className="flex items-center gap-2 text-[10px] shrink-0">
                <span className="px-1.5 py-0.5 rounded bg-white/5 text-zinc-400 border border-white/10">
                  {t.tag}
                </span>
                <span className="text-zinc-500 flex items-center gap-1 font-sans">
                  <Clock className="size-3 text-zinc-600" />
                  {t.due}
                </span>
              </div>
            </div>
          ))}

          <div className="text-[11px] font-semibold text-zinc-400 font-sans px-1 pt-3 pb-1 flex items-center gap-2">
            <span className="size-2 rounded-full bg-blue-400" />
            <span>Backlog</span>
            <span className="text-zinc-500">3</span>
          </div>

          {tasks.slice(2, 5).map((t) => (
            <div
              key={t.id}
              className="flex items-center justify-between p-2.5 rounded-lg bg-white/[0.02] border border-white/[0.05] hover:border-white/15 transition-colors"
            >
              <div className="flex items-center gap-2.5 min-w-0">
                <span className="text-zinc-500 text-[11px]">{t.id}</span>
                <Circle className="size-2.5 text-zinc-600" />
                <span className="font-sans text-xs text-zinc-300 truncate">{t.title}</span>
              </div>
              <div className="flex items-center gap-2 text-[10px] shrink-0">
                <span className="px-1.5 py-0.5 rounded bg-white/5 text-zinc-400 border border-white/10">
                  {t.tag}
                </span>
                <span className="text-zinc-500 font-sans">{t.due}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Right Properties Panel */}
      <div className="w-56 border-l border-white/10 p-4 hidden lg:flex flex-col justify-between bg-[#0A0B0E]/60 shrink-0 text-xs">
        <div className="space-y-4">
          <div>
            <span className="text-[11px] uppercase tracking-wider font-semibold text-zinc-500">
              Properties
            </span>
            <div className="mt-2 space-y-2 text-[11px]">
              <div className="flex justify-between py-1 border-b border-white/5">
                <span className="text-zinc-500">Status</span>
                <span className="text-amber-400 font-medium">In Progress</span>
              </div>
              <div className="flex justify-between py-1 border-b border-white/5">
                <span className="text-zinc-500">Lead</span>
                <span className="text-zinc-200">Erin Frey</span>
              </div>
              <div className="flex justify-between py-1 border-b border-white/5">
                <span className="text-zinc-500">Members</span>
                <span className="text-zinc-200">4 engineers</span>
              </div>
              <div className="flex justify-between py-1">
                <span className="text-zinc-500">Target date</span>
                <span className="text-zinc-200">19 Oct</span>
              </div>
            </div>
          </div>
        </div>
        <div className="pt-4 border-t border-white/10 text-[10px] text-zinc-500">
          Sync active with Linear API v2
        </div>
      </div>
    </div>
  )
}

export function ContainerScrollDemo({ className }: { className?: string }) {
  return (
    <div className={cn("flex flex-col overflow-hidden bg-[#0A0A0A] rounded-2xl border border-white/10", className)}>
      <ContainerScroll
        titleComponent={
          <>
            <h1 className="text-3xl sm:text-4xl font-semibold text-zinc-300">
              Unleash the power of <br />
              <span className="text-4xl md:text-[6rem] font-bold mt-1 leading-none text-white tracking-tight">
                Scroll Animations
              </span>
            </h1>
          </>
        }
      >
        <LinearDashboardMockup />
      </ContainerScroll>
    </div>
  )
}

export function ContainerScrollBlockPreview() {
  return (
    <div className="relative size-full flex flex-col items-center justify-center overflow-hidden bg-[#0A0A0A] p-4 select-none">
      <div className="text-center mb-2">
        <p className="text-[10px] text-zinc-400">Unleash the power of</p>
        <p className="text-sm font-bold text-white tracking-tight">Scroll Animations</p>
      </div>
      <div
        className="w-full max-w-[280px] h-32 rounded-xl border-2 border-neutral-700 bg-neutral-900 p-1.5 shadow-2xl"
        style={{
          transform: "perspective(600px) rotateX(16deg) scale(0.95)",
        }}
      >
        <div className="w-full h-full rounded-lg bg-[#0E0F14] border border-white/10 p-2 flex flex-col justify-between">
          <div className="flex items-center justify-between border-b border-white/10 pb-1">
            <div className="flex items-center gap-1.5">
              <span className="size-2 rounded-full bg-blue-500" />
              <span className="text-[9px] font-semibold text-white">Solar Sailer</span>
            </div>
            <span className="text-[8px] text-zinc-400 font-mono">89%</span>
          </div>
          <div className="space-y-1">
            <div className="h-2 rounded bg-white/10 w-3/4" />
            <div className="h-2 rounded bg-white/5 w-1/2" />
          </div>
          <div className="flex justify-between items-center text-[8px] text-zinc-500">
            <span>ENG-248 Release new website</span>
            <span className="text-amber-400">Active</span>
          </div>
        </div>
      </div>
    </div>
  )
}
