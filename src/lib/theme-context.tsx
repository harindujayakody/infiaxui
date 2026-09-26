import React, { createContext, useContext, useEffect, useState } from "react"

interface ThemeContextType {
  isDark: boolean
  toggleDark: () => void
  copiedText: string | null
  copyToClipboard: (text: string, label?: string) => void
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined)

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isDark, setIsDark] = useState<boolean>(() => {
    if (typeof window !== "undefined") {
      const stored = localStorage.getItem("shadcn_theme")
      if (stored) return stored === "dark"
    }
    return true // Default dark mode (#0A0A0A)
  })

  const [copiedText, setCopiedText] = useState<string | null>(null)

  useEffect(() => {
    const root = document.documentElement
    if (isDark) {
      root.classList.add("dark")
      localStorage.setItem("shadcn_theme", "dark")
    } else {
      root.classList.remove("dark")
      localStorage.setItem("shadcn_theme", "light")
    }
  }, [isDark])

  const toggleDark = () => setIsDark((prev) => !prev)

  const copyToClipboard = (text: string, label?: string) => {
    navigator.clipboard.writeText(text)
    setCopiedText(label || text)
    setTimeout(() => {
      setCopiedText(null)
    }, 2000)
  }

  return (
    <ThemeContext.Provider
      value={{
        isDark,
        toggleDark,
        copiedText,
        copyToClipboard,
      }}
    >
      {children}
      {copiedText && (
        <div className="fixed bottom-6 right-6 z-50 flex items-center gap-2 rounded-lg bg-[#161616] dark:bg-[#161616] border border-[#262626] px-4 py-2.5 text-xs text-white shadow-2xl animate-in fade-in duration-150">
          <div className="size-2 rounded-full bg-emerald-400" />
          <span>Copied to clipboard</span>
        </div>
      )}
    </ThemeContext.Provider>
  )
}

export const useTheme = () => {
  const context = useContext(ThemeContext)
  if (!context) {
    throw new Error("useTheme must be used within ThemeProvider")
  }
  return context
}
