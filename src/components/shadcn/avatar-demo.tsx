import * as React from "react"
import {
  Avatar,
  AvatarImage,
  AvatarFallback,
  AvatarBadge,
  AvatarGroup,
  AvatarGroupCount,
} from "@/components/shadcn/avatar"
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuGroup,
} from "@/components/shadcn/dropdown-menu"
import { Button } from "@/components/shadcn/button"
import {
  Shield,
  Check,
  Plus,
  User,
  Settings,
  CreditCard,
  LogOut,
  Sparkles,
  Users,
  Bell,
} from "lucide-react"

// Unsplash high quality curated avatars
export const AVATAR_IMAGES = {
  alex: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80",
  sarah: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150&auto=format&fit=crop&q=80",
  marcus: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&auto=format&fit=crop&q=80",
  elena: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150&auto=format&fit=crop&q=80",
  david: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80",
}

/**
 * Primary interactive showcase for Avatar component
 */
export function AvatarDemo() {
  const [status, setStatus] = React.useState<"online" | "away" | "busy" | "offline">("online")
  const [showImage, setShowImage] = React.useState(true)
  const [currentSize, setCurrentSize] = React.useState<"sm" | "default" | "lg">("default")

  return (
    <div className="w-full max-w-lg mx-auto flex flex-col items-center justify-center p-6 space-y-8 select-none">
      {/* Interactive Avatar Preview */}
      <div className="flex flex-col sm:flex-row items-center justify-center gap-8 p-6 rounded-2xl border border-[var(--border-subtle)] bg-[var(--bg-card)]/50 backdrop-blur-sm shadow-sm w-full">
        {/* Main interactive profile avatar */}
        <div className="flex flex-col items-center gap-3">
          <DropdownMenu>
            <DropdownMenuTrigger className="p-0 border-0 bg-transparent rounded-full focus:outline-none focus:ring-2 focus:ring-primary/40 focus:ring-offset-2">
              <Avatar
                size={currentSize}
                className="cursor-pointer ring-2 ring-primary/20 hover:ring-primary/40 transition-all shadow-md"
              >
                <AvatarImage
                  src={showImage ? AVATAR_IMAGES.alex : undefined}
                  alt="@shadcn"
                />
                <AvatarFallback className="bg-gradient-to-br from-indigo-500 to-purple-600 text-white font-semibold">
                  CN
                </AvatarFallback>
                <AvatarBadge
                  className={
                    status === "online"
                      ? "bg-emerald-500 ring-2 ring-[var(--bg-card)]"
                      : status === "away"
                      ? "bg-amber-500 ring-2 ring-[var(--bg-card)]"
                      : status === "busy"
                      ? "bg-rose-500 ring-2 ring-[var(--bg-card)]"
                      : "bg-zinc-400 ring-2 ring-[var(--bg-card)]"
                  }
                />
              </Avatar>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="center" className="w-56">
              <DropdownMenuLabel className="font-normal">
                <div className="flex flex-col space-y-1">
                  <p className="text-xs font-semibold leading-none text-[var(--text-main)]">shadcn</p>
                  <p className="text-[11px] leading-none text-[var(--text-muted)]">m@example.com</p>
                </div>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuGroup>
                <DropdownMenuItem className="cursor-pointer">
                  <User className="mr-2 size-3.5 text-[var(--text-muted)]" />
                  <span>Profile</span>
                  <DropdownMenuShortcut>⇧⌘P</DropdownMenuShortcut>
                </DropdownMenuItem>
                <DropdownMenuItem className="cursor-pointer">
                  <CreditCard className="mr-2 size-3.5 text-[var(--text-muted)]" />
                  <span>Billing</span>
                  <DropdownMenuShortcut>⌘B</DropdownMenuShortcut>
                </DropdownMenuItem>
                <DropdownMenuItem className="cursor-pointer">
                  <Settings className="mr-2 size-3.5 text-[var(--text-muted)]" />
                  <span>Settings</span>
                  <DropdownMenuShortcut>⌘S</DropdownMenuShortcut>
                </DropdownMenuItem>
              </DropdownMenuGroup>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                variant="destructive"
                className="cursor-pointer text-rose-500 focus:text-rose-500"
              >
                <LogOut className="mr-2 size-3.5" />
                <span>Log out</span>
                <DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          <span className="text-xs text-[var(--text-muted)] font-mono">
            Click avatar for menu
          </span>
        </div>

        {/* Avatar Team Group */}
        <div className="flex flex-col items-center gap-3">
          <AvatarGroup>
            <Avatar size={currentSize}>
              <AvatarImage src={AVATAR_IMAGES.sarah} alt="Sarah" />
              <AvatarFallback className="bg-pink-500 text-white">SA</AvatarFallback>
            </Avatar>
            <Avatar size={currentSize}>
              <AvatarImage src={AVATAR_IMAGES.marcus} alt="Marcus" />
              <AvatarFallback className="bg-blue-600 text-white">MA</AvatarFallback>
            </Avatar>
            <Avatar size={currentSize}>
              <AvatarImage src={AVATAR_IMAGES.elena} alt="Elena" />
              <AvatarFallback className="bg-emerald-600 text-white">EL</AvatarFallback>
            </Avatar>
            <AvatarGroupCount className={currentSize === "sm" ? "size-8 text-[10px]" : currentSize === "lg" ? "size-14 text-sm" : "size-10 text-xs"}>
              +4
            </AvatarGroupCount>
          </AvatarGroup>
          <span className="text-xs text-[var(--text-muted)] font-mono">
            Team Workspace
          </span>
        </div>
      </div>

      {/* Interactive Controls Panel */}
      <div className="flex flex-wrap items-center justify-center gap-3 p-3 rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-subtle)]/40 text-xs">
        <div className="flex items-center gap-1.5">
          <span className="text-[var(--text-muted)] font-medium">Status:</span>
          <div className="flex items-center gap-1">
            {(["online", "away", "busy", "offline"] as const).map((s) => (
              <button
                key={s}
                onClick={() => setStatus(s)}
                className={`px-2 py-1 rounded text-[11px] font-mono capitalize transition-colors ${
                  status === s
                    ? "bg-[var(--bg-card)] text-[var(--text-main)] shadow-sm font-semibold border border-[var(--border-subtle)]"
                    : "text-[var(--text-muted)] hover:text-[var(--text-main)]"
                }`}
              >
                {s}
              </button>
            ))}
          </div>
        </div>

        <div className="h-4 w-px bg-[var(--border-subtle)]" />

        <div className="flex items-center gap-1.5">
          <span className="text-[var(--text-muted)] font-medium">Size:</span>
          {(["sm", "default", "lg"] as const).map((sz) => (
            <button
              key={sz}
              onClick={() => setCurrentSize(sz)}
              className={`px-2 py-1 rounded text-[11px] font-mono capitalize transition-colors ${
                currentSize === sz
                  ? "bg-[var(--bg-card)] text-[var(--text-main)] shadow-sm font-semibold border border-[var(--border-subtle)]"
                  : "text-[var(--text-muted)] hover:text-[var(--text-main)]"
              }`}
            >
              {sz}
            </button>
          ))}
        </div>

        <div className="h-4 w-px bg-[var(--border-subtle)]" />

        <Button
          variant="outline"
          size="sm"
          onClick={() => setShowImage(!showImage)}
          className="h-7 text-xs px-2.5"
        >
          {showImage ? "Simulate Fallback" : "Load Image"}
        </Button>
      </div>
    </div>
  )
}

/**
 * Basic Demo: Image & Fallback
 */
export function AvatarBasicDemo() {
  return (
    <div className="flex items-center justify-center gap-6 p-6">
      <div className="flex flex-col items-center gap-2">
        <Avatar>
          <AvatarImage src={AVATAR_IMAGES.alex} alt="@shadcn" />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
        <span className="text-[11px] text-[var(--text-muted)] font-mono">Image</span>
      </div>
      <div className="flex flex-col items-center gap-2">
        <Avatar>
          <AvatarFallback className="bg-indigo-500/20 text-indigo-400 font-semibold">
            CN
          </AvatarFallback>
        </Avatar>
        <span className="text-[11px] text-[var(--text-muted)] font-mono">Fallback</span>
      </div>
    </div>
  )
}

/**
 * Badge Demo: Online, Away, Busy, Offline
 */
export function AvatarBadgeDemo() {
  return (
    <div className="flex flex-wrap items-center justify-center gap-6 p-6">
      <div className="flex flex-col items-center gap-2">
        <Avatar>
          <AvatarImage src={AVATAR_IMAGES.alex} alt="@shadcn" />
          <AvatarFallback>CN</AvatarFallback>
          <AvatarBadge className="bg-emerald-500" />
        </Avatar>
        <span className="text-[11px] text-emerald-400 font-mono">Online</span>
      </div>
      <div className="flex flex-col items-center gap-2">
        <Avatar>
          <AvatarImage src={AVATAR_IMAGES.sarah} alt="@sarah" />
          <AvatarFallback>SA</AvatarFallback>
          <AvatarBadge className="bg-amber-500" />
        </Avatar>
        <span className="text-[11px] text-amber-400 font-mono">Away</span>
      </div>
      <div className="flex flex-col items-center gap-2">
        <Avatar>
          <AvatarImage src={AVATAR_IMAGES.marcus} alt="@marcus" />
          <AvatarFallback>MA</AvatarFallback>
          <AvatarBadge className="bg-rose-500" />
        </Avatar>
        <span className="text-[11px] text-rose-400 font-mono">Busy</span>
      </div>
      <div className="flex flex-col items-center gap-2">
        <Avatar>
          <AvatarImage src={AVATAR_IMAGES.david} alt="@david" />
          <AvatarFallback>DA</AvatarFallback>
          <AvatarBadge className="bg-zinc-500" />
        </Avatar>
        <span className="text-[11px] text-zinc-400 font-mono">Offline</span>
      </div>
    </div>
  )
}

/**
 * Badge with Icon Demo
 */
export function AvatarBadgeIconDemo() {
  return (
    <div className="flex flex-wrap items-center justify-center gap-6 p-6">
      <div className="flex flex-col items-center gap-2">
        <Avatar size="lg">
          <AvatarImage src={AVATAR_IMAGES.alex} alt="@shadcn" />
          <AvatarFallback>CN</AvatarFallback>
          <AvatarBadge className="bg-blue-600 size-5 text-white">
            <Shield className="size-3" />
          </AvatarBadge>
        </Avatar>
        <span className="text-[11px] text-[var(--text-muted)] font-mono">Verified Admin</span>
      </div>
      <div className="flex flex-col items-center gap-2">
        <Avatar size="lg">
          <AvatarImage src={AVATAR_IMAGES.elena} alt="@elena" />
          <AvatarFallback>EL</AvatarFallback>
          <AvatarBadge className="bg-emerald-600 size-5 text-white">
            <Check className="size-3" />
          </AvatarBadge>
        </Avatar>
        <span className="text-[11px] text-[var(--text-muted)] font-mono">Approved</span>
      </div>
      <div className="flex flex-col items-center gap-2">
        <Avatar size="lg">
          <AvatarImage src={AVATAR_IMAGES.marcus} alt="@marcus" />
          <AvatarFallback>MA</AvatarFallback>
          <AvatarBadge className="bg-purple-600 size-5 text-white">
            <Sparkles className="size-3" />
          </AvatarBadge>
        </Avatar>
        <span className="text-[11px] text-[var(--text-muted)] font-mono">Pro Member</span>
      </div>
    </div>
  )
}

/**
 * Avatar Group Demo
 */
export function AvatarGroupDemo() {
  return (
    <div className="flex items-center justify-center p-6">
      <AvatarGroup>
        <Avatar>
          <AvatarImage src={AVATAR_IMAGES.alex} alt="Alex" />
          <AvatarFallback>AL</AvatarFallback>
        </Avatar>
        <Avatar>
          <AvatarImage src={AVATAR_IMAGES.sarah} alt="Sarah" />
          <AvatarFallback>SA</AvatarFallback>
        </Avatar>
        <Avatar>
          <AvatarImage src={AVATAR_IMAGES.marcus} alt="Marcus" />
          <AvatarFallback>MA</AvatarFallback>
        </Avatar>
        <Avatar>
          <AvatarImage src={AVATAR_IMAGES.elena} alt="Elena" />
          <AvatarFallback>EL</AvatarFallback>
        </Avatar>
      </AvatarGroup>
    </div>
  )
}

/**
 * Avatar Group Count Demo
 */
export function AvatarGroupCountDemo() {
  return (
    <div className="flex items-center justify-center p-6">
      <AvatarGroup>
        <Avatar>
          <AvatarImage src={AVATAR_IMAGES.alex} alt="Alex" />
          <AvatarFallback>AL</AvatarFallback>
        </Avatar>
        <Avatar>
          <AvatarImage src={AVATAR_IMAGES.sarah} alt="Sarah" />
          <AvatarFallback>SA</AvatarFallback>
        </Avatar>
        <Avatar>
          <AvatarImage src={AVATAR_IMAGES.marcus} alt="Marcus" />
          <AvatarFallback>MA</AvatarFallback>
        </Avatar>
        <AvatarGroupCount>+5</AvatarGroupCount>
      </AvatarGroup>
    </div>
  )
}

/**
 * Avatar Group Count with Icon Demo
 */
export function AvatarGroupCountIconDemo() {
  return (
    <div className="flex items-center justify-center gap-8 p-6">
      <div className="flex flex-col items-center gap-2">
        <AvatarGroup>
          <Avatar>
            <AvatarImage src={AVATAR_IMAGES.alex} alt="Alex" />
            <AvatarFallback>AL</AvatarFallback>
          </Avatar>
          <Avatar>
            <AvatarImage src={AVATAR_IMAGES.sarah} alt="Sarah" />
            <AvatarFallback>SA</AvatarFallback>
          </Avatar>
          <AvatarGroupCount className="bg-primary text-primary-foreground hover:bg-primary/90 cursor-pointer">
            <Plus className="size-4" />
          </AvatarGroupCount>
        </AvatarGroup>
        <span className="text-[11px] text-[var(--text-muted)] font-mono">Invite Member</span>
      </div>

      <div className="flex flex-col items-center gap-2">
        <AvatarGroup>
          <Avatar>
            <AvatarImage src={AVATAR_IMAGES.marcus} alt="Marcus" />
            <AvatarFallback>MA</AvatarFallback>
          </Avatar>
          <Avatar>
            <AvatarImage src={AVATAR_IMAGES.elena} alt="Elena" />
            <AvatarFallback>EL</AvatarFallback>
          </Avatar>
          <AvatarGroupCount className="bg-muted text-muted-foreground">
            <Users className="size-4" />
          </AvatarGroupCount>
        </AvatarGroup>
        <span className="text-[11px] text-[var(--text-muted)] font-mono">Team View</span>
      </div>
    </div>
  )
}

/**
 * Sizes Demo: sm, default, lg
 */
export function AvatarSizeDemo() {
  return (
    <div className="flex items-center justify-center gap-6 p-6">
      <div className="flex flex-col items-center gap-2">
        <Avatar size="sm">
          <AvatarImage src={AVATAR_IMAGES.alex} alt="Small" />
          <AvatarFallback>SM</AvatarFallback>
        </Avatar>
        <span className="text-[11px] text-[var(--text-muted)] font-mono">sm (32px)</span>
      </div>
      <div className="flex flex-col items-center gap-2">
        <Avatar size="default">
          <AvatarImage src={AVATAR_IMAGES.alex} alt="Default" />
          <AvatarFallback>MD</AvatarFallback>
        </Avatar>
        <span className="text-[11px] text-[var(--text-muted)] font-mono">default (40px)</span>
      </div>
      <div className="flex flex-col items-center gap-2">
        <Avatar size="lg">
          <AvatarImage src={AVATAR_IMAGES.alex} alt="Large" />
          <AvatarFallback>LG</AvatarFallback>
        </Avatar>
        <span className="text-[11px] text-[var(--text-muted)] font-mono">lg (56px)</span>
      </div>
    </div>
  )
}

/**
 * Dropdown Trigger Demo
 */
export function AvatarDropdownDemo() {
  return (
    <div className="flex items-center justify-center p-6">
      <DropdownMenu>
        <DropdownMenuTrigger className="p-0 border-0 bg-transparent rounded-full focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2">
          <Avatar className="cursor-pointer hover:opacity-85 transition-opacity">
            <AvatarImage src={AVATAR_IMAGES.alex} alt="@shadcn" />
            <AvatarFallback>CN</AvatarFallback>
            <AvatarBadge className="bg-emerald-500" />
          </Avatar>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="start" className="w-52">
          <DropdownMenuLabel>
            <div className="flex flex-col">
              <span className="font-semibold text-xs text-[var(--text-main)]">shadcn</span>
              <span className="text-[11px] text-[var(--text-muted)] font-normal">m@example.com</span>
            </div>
          </DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem className="cursor-pointer">
            <User className="mr-2 size-3.5 text-[var(--text-muted)]" />
            <span>Profile</span>
          </DropdownMenuItem>
          <DropdownMenuItem className="cursor-pointer">
            <Bell className="mr-2 size-3.5 text-[var(--text-muted)]" />
            <span>Notifications</span>
          </DropdownMenuItem>
          <DropdownMenuItem className="cursor-pointer">
            <Settings className="mr-2 size-3.5 text-[var(--text-muted)]" />
            <span>Settings</span>
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem variant="destructive" className="cursor-pointer">
            <LogOut className="mr-2 size-3.5" />
            <span>Log out</span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  )
}

/**
 * RTL Demo
 */
export function AvatarRtlDemo() {
  return (
    <div dir="rtl" className="w-full flex flex-col items-center justify-center gap-6 p-6 select-none">
      <div className="flex items-center gap-6">
        <Avatar size="lg">
          <AvatarImage src={AVATAR_IMAGES.alex} alt="مستخدم" />
          <AvatarFallback className="bg-indigo-600 text-white font-bold">ع</AvatarFallback>
          <AvatarBadge className="bg-emerald-500" />
        </Avatar>

        <AvatarGroup>
          <Avatar size="lg">
            <AvatarFallback className="bg-blue-600 text-white font-bold">أ</AvatarFallback>
          </Avatar>
          <Avatar size="lg">
            <AvatarFallback className="bg-emerald-600 text-white font-bold">ب</AvatarFallback>
          </Avatar>
          <Avatar size="lg">
            <AvatarFallback className="bg-purple-600 text-white font-bold">ج</AvatarFallback>
          </Avatar>
          <AvatarGroupCount className="size-14 text-sm font-bold">+۳</AvatarGroupCount>
        </AvatarGroup>
      </div>
      <p className="text-xs text-[var(--text-muted)] font-mono">
        RTL Layout: Mirrored stacking order and badge alignment
      </p>
    </div>
  )
}
