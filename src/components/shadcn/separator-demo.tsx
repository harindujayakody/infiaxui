import * as React from "react"
import { Separator } from "@/components/shadcn/separator"
import { Button } from "@/components/shadcn/button"
import { Badge } from "@/components/shadcn/badge"
import {
  User,
  CreditCard,
  Settings,
  LogOut,
  Bell,
  Shield,
  Layers,
  ExternalLink,
  ChevronRight,
  Code2,
  BookOpen,
  GitBranch,
} from "lucide-react"

/**
 * Primary interactive showcase for Separator component
 */
export function SeparatorDemo() {
  const [activeTab, setActiveTab] = React.useState("docs")

  return (
    <div className="w-full max-w-md mx-auto p-6 rounded-2xl border border-[var(--border-subtle)] bg-[var(--bg-card)] shadow-sm select-none">
      {/* Header section */}
      <div className="space-y-1.5">
        <div className="flex items-center justify-between">
          <h4 className="text-sm font-semibold tracking-tight text-[var(--text-main)]">
            Radix Primitives
          </h4>
          <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-primary/10 text-primary border border-primary/20">
            v2.1.0
          </span>
        </div>
        <p className="text-xs text-[var(--text-muted)] leading-relaxed">
          An open-source, unstyled UI component library for building accessible design systems.
        </p>
      </div>

      {/* Horizontal Separator */}
      <Separator className="my-4" />

      {/* Inline Navigation Links with Vertical Separators */}
      <div className="flex h-5 items-center justify-center space-x-4 text-xs font-medium text-[var(--text-muted)]">
        <button
          onClick={() => setActiveTab("blog")}
          className={`hover:text-[var(--text-main)] transition-colors flex items-center gap-1.5 ${
            activeTab === "blog" ? "text-[var(--text-main)] font-semibold" : ""
          }`}
        >
          <BookOpen className="size-3" />
          <span>Blog</span>
        </button>

        <Separator orientation="vertical" />

        <button
          onClick={() => setActiveTab("docs")}
          className={`hover:text-[var(--text-main)] transition-colors flex items-center gap-1.5 ${
            activeTab === "docs" ? "text-[var(--text-main)] font-semibold" : ""
          }`}
        >
          <Code2 className="size-3" />
          <span>Docs</span>
        </button>

        <Separator orientation="vertical" />

        <button
          onClick={() => setActiveTab("source")}
          className={`hover:text-[var(--text-main)] transition-colors flex items-center gap-1.5 ${
            activeTab === "source" ? "text-[var(--text-main)] font-semibold" : ""
          }`}
        >
          <GitBranch className="size-3" />
          <span>Source</span>
        </button>
      </div>

      {/* Horizontal Separator */}
      <Separator className="my-4" />

      {/* Mini status footer */}
      <div className="flex items-center justify-between text-[11px] text-[var(--text-muted)] pt-1">
        <span className="font-mono">Status: All systems operational</span>
        <div className="flex h-3.5 items-center space-x-2">
          <span>MIT</span>
          <Separator orientation="vertical" />
          <span>React 19</span>
        </div>
      </div>
    </div>
  )
}

/**
 * Vertical separator demo between inline items
 */
export function SeparatorVerticalDemo() {
  return (
    <div className="flex items-center justify-center p-6">
      <div className="flex h-5 items-center space-x-4 text-sm font-medium text-[var(--text-muted)]">
        <a href="#blog" className="hover:text-[var(--text-main)] transition-colors">
          Blog
        </a>
        <Separator orientation="vertical" />
        <a href="#docs" className="hover:text-[var(--text-main)] transition-colors">
          Docs
        </a>
        <Separator orientation="vertical" />
        <a href="#source" className="hover:text-[var(--text-main)] transition-colors">
          Source
        </a>
        <Separator orientation="vertical" />
        <a href="#changelog" className="hover:text-[var(--text-main)] transition-colors">
          Changelog
        </a>
      </div>
    </div>
  )
}

/**
 * Menu separators between items with descriptions
 */
export function SeparatorMenuDemo() {
  const menuItems = [
    {
      icon: User,
      title: "Personal Profile",
      desc: "Manage your display name, email, and public profile",
    },
    {
      icon: CreditCard,
      title: "Billing & Plans",
      desc: "Manage your subscription tier and payment methods",
    },
    {
      icon: Shield,
      title: "Security & Authentication",
      desc: "Two-factor authentication and active sessions",
    },
    {
      icon: Bell,
      title: "Notifications",
      desc: "Email digests and real-time webhook alerts",
    },
  ]

  return (
    <div className="w-full max-w-sm mx-auto p-4 rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-card)]">
      {menuItems.map((item, index) => {
        const Icon = item.icon
        return (
          <React.Fragment key={item.title}>
            <div className="flex items-start gap-3 py-3 px-2 rounded-lg hover:bg-[var(--bg-subtle)] cursor-pointer transition-colors group">
              <div className="size-8 rounded-md bg-[var(--bg-subtle)] border border-[var(--border-subtle)] flex items-center justify-center text-[var(--text-main)] shrink-0 mt-0.5 group-hover:border-primary/40 transition-colors">
                <Icon className="size-4" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-medium text-[var(--text-main)] group-hover:text-primary transition-colors">
                    {item.title}
                  </span>
                  <ChevronRight className="size-3.5 text-[var(--text-muted)] group-hover:translate-x-0.5 transition-transform" />
                </div>
                <p className="text-[11px] text-[var(--text-muted)] leading-relaxed mt-0.5 truncate">
                  {item.desc}
                </p>
              </div>
            </div>
            {index < menuItems.length - 1 && <Separator />}
          </React.Fragment>
        )
      })}
    </div>
  )
}

/**
 * List separators between feed or activity rows
 */
export function SeparatorListDemo() {
  const listItems = [
    {
      tag: "v1.4.0",
      title: "Release candidate deployed",
      time: "10m ago",
      author: "alex",
    },
    {
      tag: "RFC-29",
      title: "Updated color tokens to Base Nova",
      time: "2h ago",
      author: "sarah",
    },
    {
      tag: "BUG-108",
      title: "Resolved touch gesture regression on mobile",
      time: "1d ago",
      author: "marcus",
    },
    {
      tag: "DOCS",
      title: "Added RTL configuration guides for all widgets",
      time: "3d ago",
      author: "elena",
    },
  ]

  return (
    <div className="w-full max-w-md mx-auto p-4 rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-card)]">
      {listItems.map((item, index) => (
        <React.Fragment key={item.title}>
          <div className="flex items-center justify-between py-3 px-1">
            <div className="space-y-1 min-w-0">
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-[var(--bg-subtle)] text-[var(--text-muted)] border border-[var(--border-subtle)]">
                  {item.tag}
                </span>
                <span className="text-xs font-medium text-[var(--text-main)] truncate">
                  {item.title}
                </span>
              </div>
              <p className="text-[11px] text-[var(--text-muted)]">
                Committed by <span className="font-mono text-[var(--text-main)]">@{item.author}</span>
              </p>
            </div>
            <span className="text-[11px] text-[var(--text-muted)] font-mono whitespace-nowrap ml-4">
              {item.time}
            </span>
          </div>
          {index < listItems.length - 1 && <Separator />}
        </React.Fragment>
      ))}
    </div>
  )
}

/**
 * RTL layout with vertical and horizontal separators
 */
export function SeparatorRtlDemo() {
  const rtlItems = [
    { label: "الملف الشخصي", sub: "إدارة تفاصيل حسابك ومعلومات الاتصال" },
    { label: "الفواتير والاشتراكات", sub: "عرض وتنزيل فواتير خطة المؤسسة" },
    { label: "إعدادات الأمان", sub: "المصادقة الثنائية والجلسات النشطة" },
  ]

  return (
    <div dir="rtl" className="w-full max-w-md mx-auto p-6 rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-card)] space-y-4 select-none">
      {/* Top Header */}
      <div className="space-y-1">
        <h4 className="text-sm font-semibold text-[var(--text-main)]">لوحة التحكم</h4>
        <p className="text-xs text-[var(--text-muted)]">مكتبة المكونات العربية المتكاملة.</p>
      </div>

      <Separator />

      {/* Inline Nav in RTL with Vertical Separators */}
      <div className="flex h-5 items-center justify-center space-x-4 rtl:space-x-reverse text-xs font-medium text-[var(--text-muted)]">
        <span className="hover:text-[var(--text-main)] cursor-pointer">الرئيسية</span>
        <Separator orientation="vertical" />
        <span className="hover:text-[var(--text-main)] cursor-pointer">التوثيق</span>
        <Separator orientation="vertical" />
        <span className="hover:text-[var(--text-main)] cursor-pointer">المصدر</span>
      </div>

      <Separator />

      {/* List items with Separator */}
      <div className="space-y-0">
        {rtlItems.map((item, idx) => (
          <React.Fragment key={item.label}>
            <div className="py-2.5">
              <div className="text-xs font-medium text-[var(--text-main)]">{item.label}</div>
              <div className="text-[11px] text-[var(--text-muted)] mt-0.5">{item.sub}</div>
            </div>
            {idx < rtlItems.length - 1 && <Separator />}
          </React.Fragment>
        ))}
      </div>
    </div>
  )
}
