"use client"

import React, { useState, useEffect, useRef } from "react"
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from "framer-motion"
import { Menu, X } from "lucide-react"
import { cn } from "@/lib/utils"

export interface NavItemType {
  name: string
  link: string
}

export interface ResizableNavbarProps {
  navItems?: NavItemType[]
  className?: string
  logo?: React.ReactNode
  cta?: React.ReactNode
  login?: React.ReactNode
  children?: React.ReactNode
  scrollContainerRef?: React.RefObject<HTMLElement | null>
}

export const ResizableNavbar = ({
  navItems = [
    { name: "Features", link: "#features" },
    { name: "Pricing", link: "#pricing" },
    { name: "Contact", link: "#contact" },
  ],
  logo,
  cta,
  login,
  className,
  children,
  scrollContainerRef,
}: ResizableNavbarProps) => {
  const [scrolled, setScrolled] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  // Support either global window scroll or dedicated container scroll
  const { scrollY } = useScroll(
    scrollContainerRef
      ? { container: scrollContainerRef }
      : undefined
  )

  useMotionValueEvent(scrollY, "change", (latest) => {
    if (latest > 50) {
      setScrolled(true)
    } else {
      setScrolled(false)
    }
  })

  return (
    <motion.header
      animate={{
        width: scrolled ? "90%" : "100%",
        maxWidth: scrolled ? "780px" : "1000px",
        y: scrolled ? 16 : 0,
      }}
      transition={{
        duration: 0.35,
        ease: [0.16, 1, 0.3, 1],
      }}
      className={cn(
        "sticky top-0 z-50 mx-auto flex items-center justify-between transition-all select-none",
        scrolled
          ? "rounded-full border border-white/10 bg-[#090A0F]/80 px-4 py-2.5 backdrop-blur-xl shadow-[0_8px_32px_rgba(0,0,0,0.6)]"
          : "border-b border-white/[0.08] bg-[#0A0A0A]/40 px-6 py-4 backdrop-blur-md",
        className
      )}
    >
      {/* Brand Logo */}
      <div className="flex items-center gap-2.5">
        {logo || (
          <div className="flex items-center gap-2">
            <div className="flex size-7 items-center justify-center rounded-lg bg-white font-bold text-black text-sm">
              A
            </div>
            <span className="font-bold text-white tracking-tight text-sm sm:text-base">
              Startup
            </span>
          </div>
        )}
      </div>

      {/* Desktop Navigation Links */}
      <nav className="hidden md:flex items-center gap-6">
        {navItems.map((item) => (
          <a
            key={item.name}
            href={item.link}
            className="text-xs sm:text-sm font-medium text-zinc-400 hover:text-white transition-colors"
          >
            {item.name}
          </a>
        ))}
      </nav>

      {/* Desktop Actions (Login + CTA) */}
      <div className="hidden md:flex items-center gap-4">
        {login || (
          <a
            href="#login"
            className="text-xs sm:text-sm font-medium text-zinc-300 hover:text-white transition-colors"
          >
            Login
          </a>
        )}
        {cta || (
          <button className="rounded-full bg-white px-4 py-1.5 text-xs font-semibold text-black hover:bg-zinc-200 transition-colors shadow-sm">
            Book a call
          </button>
        )}
      </div>

      {/* Mobile Menu Toggle */}
      <div className="flex md:hidden items-center gap-2">
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="p-1.5 rounded-lg text-zinc-300 hover:text-white hover:bg-white/10 transition-colors"
          aria-label="Toggle navigation menu"
        >
          {mobileMenuOpen ? <X className="size-5" /> : <Menu className="size-5" />}
        </button>
      </div>

      {/* Mobile Drawer Dropdown */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="absolute top-full left-0 right-0 mt-2 p-4 rounded-2xl border border-white/10 bg-[#0E0F14]/95 backdrop-blur-2xl shadow-2xl flex flex-col gap-3 md:hidden"
          >
            {navItems.map((item) => (
              <a
                key={item.name}
                href={item.link}
                onClick={() => setMobileMenuOpen(false)}
                className="px-3 py-2 rounded-lg text-sm text-zinc-300 hover:text-white hover:bg-white/5 font-medium transition-colors"
              >
                {item.name}
              </a>
            ))}
            <div className="pt-2 border-t border-white/10 flex flex-col gap-2">
              <a
                href="#login"
                onClick={() => setMobileMenuOpen(false)}
                className="px-3 py-2 text-center text-sm font-medium text-zinc-300 hover:text-white"
              >
                Login
              </a>
              <button className="w-full rounded-xl bg-white py-2 text-xs font-semibold text-black hover:bg-zinc-200 transition-colors">
                Book a call
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  )
}
