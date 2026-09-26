import React from "react"
import {
  AvatarBasicDemo,
  AvatarBadgeDemo,
  AvatarBadgeIconDemo,
  AvatarGroupDemo,
  AvatarGroupCountDemo,
  AvatarGroupCountIconDemo,
  AvatarSizeDemo,
  AvatarDropdownDemo,
  AvatarRtlDemo,
} from "@/components/shadcn/avatar-demo"
import { InstallationSection } from "@/components/shadcn/installation-section"
import { CodeBlock } from "@/components/ui/code-block"

export function AvatarGuide() {
  const avatarPrimitiveCode = `import * as React from "react"
import { cn } from "@/lib/utils"

export interface AvatarProps extends React.HTMLAttributes<HTMLDivElement> {
  size?: "default" | "sm" | "lg"
}

const sizeClasses = {
  sm: "size-8 text-xs",
  default: "size-10 text-sm",
  lg: "size-14 text-base",
}

export function Avatar({
  className,
  size = "default",
  children,
  ...props
}: AvatarProps) {
  return (
    <div
      className={cn(
        "relative inline-flex shrink-0 rounded-full border border-[var(--border-subtle)] select-none",
        sizeClasses[size],
        className
      )}
      data-size={size}
      {...props}
    >
      {children}
    </div>
  )
}

export interface AvatarImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  src?: string
  alt?: string
}

export function AvatarImage({ className, src, alt = "", onError, ...props }: AvatarImageProps) {
  const [hasError, setHasError] = React.useState(false)

  if (!src || hasError) return null

  return (
    <img
      src={src}
      alt={alt}
      onError={(e) => {
        setHasError(true)
        onError?.(e)
      }}
      className={cn("aspect-square size-full rounded-full object-cover", className)}
      {...props}
    />
  )
}

export interface AvatarFallbackProps extends React.HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode
}

export function AvatarFallback({ className, children, ...props }: AvatarFallbackProps) {
  return (
    <div
      className={cn(
        "flex size-full items-center justify-center rounded-full bg-[var(--bg-subtle)] font-medium text-[var(--text-main)]",
        className
      )}
      {...props}
    >
      {children}
    </div>
  )
}

export interface AvatarBadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  children?: React.ReactNode
}

export function AvatarBadge({ className, children, ...props }: AvatarBadgeProps) {
  return (
    <span
      className={cn(
        "absolute bottom-0 right-0 rtl:right-auto rtl:left-0 z-10 flex size-3 items-center justify-center rounded-full bg-emerald-500 ring-2 ring-[var(--bg-page)]",
        children && "size-4 text-[9px] text-white",
        className
      )}
      {...props}
    >
      {children}
    </span>
  )
}

export interface AvatarGroupProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode
}

export function AvatarGroup({ className, children, ...props }: AvatarGroupProps) {
  return (
    <div
      className={cn("flex items-center -space-x-2.5 rtl:space-x-reverse overflow-hidden", className)}
      {...props}
    >
      {children}
    </div>
  )
}

export interface AvatarGroupCountProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode
}

export function AvatarGroupCount({ className, children, ...props }: AvatarGroupCountProps) {
  return (
    <div
      className={cn(
        "relative flex size-10 items-center justify-center rounded-full border border-[var(--border-subtle)] bg-[var(--bg-card)] text-xs font-semibold text-[var(--text-main)] shadow-sm",
        className
      )}
      {...props}
    >
      {children}
    </div>
  )
}`

  return (
    <div className="space-y-12 pt-6 text-[var(--text-main)]">
      {/* Global Installation UI */}
      <section id="installation" className="scroll-mt-20 space-y-4">
        <h2 className="type-h2 text-[var(--text-main)]">Installation</h2>
        <InstallationSection
          componentName="avatar"
          dependencies="@base-ui/react"
          sourceCode={avatarPrimitiveCode}
          sourcePath="components/ui/avatar.tsx"
        />
      </section>

      {/* Usage */}
      <section id="usage" className="scroll-mt-20 space-y-4">
        <h2 className="type-h2 text-[var(--text-main)]">Usage</h2>
        <p className="type-body text-[var(--text-muted)]">
          Import the components and compose image or fallback states with optional badges and groups.
        </p>
        <CodeBlock
          language="tsx"
          code={`import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"`}
        />
        <CodeBlock
          language="tsx"
          code={`<Avatar>
  <AvatarImage src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&q=80" alt="@shadcn" />
  <AvatarFallback>CN</AvatarFallback>
</Avatar>`}
        />
      </section>

      {/* Composition */}
      <section id="composition" className="scroll-mt-20 space-y-4">
        <h2 className="type-h2 text-[var(--text-main)]">Composition</h2>
        <p className="type-body text-[var(--text-muted)]">
          Use the following composition to build an <code className="bg-[var(--bg-subtle)] text-[var(--text-main)] px-1.5 py-0.5 rounded text-xs font-mono">Avatar</code>:
        </p>

        <CodeBlock
          language="txt"
          showLineNumbers={false}
          code={`Avatar
├── AvatarImage
├── AvatarFallback
└── AvatarBadge`}
        />

        <p className="type-body text-[var(--text-muted)] pt-2">
          Use the following composition to build an <code className="bg-[var(--bg-subtle)] text-[var(--text-main)] px-1.5 py-0.5 rounded text-xs font-mono">AvatarGroup</code>:
        </p>

        <CodeBlock
          language="txt"
          showLineNumbers={false}
          code={`AvatarGroup
├── Avatar
│   ├── AvatarImage
│   ├── AvatarFallback
│   └── AvatarBadge
├── Avatar
│   ├── AvatarImage
│   ├── AvatarFallback
│   └── AvatarBadge
└── AvatarGroupCount`}
        />
      </section>

      {/* Basic */}
      <section id="basic" className="scroll-mt-20 space-y-4">
        <h2 className="type-h2 text-[var(--text-main)]">Basic</h2>
        <p className="type-body text-[var(--text-muted)]">
          A basic avatar component with an image and a fallback.
        </p>

        {/* Live Demo */}
        <div className="rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-card)]">
          <AvatarBasicDemo />
        </div>

        <CodeBlock
          language="tsx"
          code={`import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

export function AvatarBasic() {
  return (
    <div className="flex items-center gap-4">
      <Avatar>
        <AvatarImage src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&q=80" alt="@shadcn" />
        <AvatarFallback>CN</AvatarFallback>
      </Avatar>
      <Avatar>
        <AvatarFallback>CN</AvatarFallback>
      </Avatar>
    </div>
  )
}`}
        />
      </section>

      {/* Badge */}
      <section id="badge" className="scroll-mt-20 space-y-4">
        <h2 className="type-h2 text-[var(--text-main)]">Badge</h2>
        <p className="type-body text-[var(--text-muted)]">
          Use the <code className="bg-[var(--bg-subtle)] text-[var(--text-main)] px-1.5 py-0.5 rounded text-xs font-mono">AvatarBadge</code> component to add a badge to the avatar. The badge is positioned at the bottom right of the avatar.
        </p>

        {/* Live Demo */}
        <div className="rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-card)]">
          <AvatarBadgeDemo />
        </div>

        <p className="type-body text-[var(--text-muted)]">
          Use the <code className="text-[var(--text-main)] font-mono">className</code> prop to add custom styles to the badge such as custom colors, sizes, etc.
        </p>

        <CodeBlock
          language="tsx"
          code={`<Avatar>
  <AvatarImage src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&q=80" alt="@shadcn" />
  <AvatarFallback>CN</AvatarFallback>
  <AvatarBadge className="bg-green-600 dark:bg-green-800" />
</Avatar>`}
        />
      </section>

      {/* Badge with Icon */}
      <section id="badge-with-icon" className="scroll-mt-20 space-y-4">
        <h2 className="type-h2 text-[var(--text-main)]">Badge with Icon</h2>
        <p className="type-body text-[var(--text-muted)]">
          You can also use an icon inside <code className="bg-[var(--bg-subtle)] text-[var(--text-main)] px-1.5 py-0.5 rounded text-xs font-mono">&lt;AvatarBadge&gt;</code>.
        </p>

        {/* Live Demo */}
        <div className="rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-card)]">
          <AvatarBadgeIconDemo />
        </div>

        <CodeBlock
          language="tsx"
          code={`import { Shield } from "lucide-react"

<Avatar size="lg">
  <AvatarImage src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&q=80" alt="@shadcn" />
  <AvatarFallback>CN</AvatarFallback>
  <AvatarBadge className="bg-blue-600 size-5 text-white">
    <Shield className="size-3" />
  </AvatarBadge>
</Avatar>`}
        />
      </section>

      {/* Avatar Group */}
      <section id="avatar-group" className="scroll-mt-20 space-y-4">
        <h2 className="type-h2 text-[var(--text-main)]">Avatar Group</h2>
        <p className="type-body text-[var(--text-muted)]">
          Use the <code className="bg-[var(--bg-subtle)] text-[var(--text-main)] px-1.5 py-0.5 rounded text-xs font-mono">AvatarGroup</code> component to add a group of avatars.
        </p>

        {/* Live Demo */}
        <div className="rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-card)]">
          <AvatarGroupDemo />
        </div>

        <CodeBlock
          language="tsx"
          code={`<AvatarGroup>
  <Avatar>
    <AvatarImage src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&q=80" />
    <AvatarFallback>AL</AvatarFallback>
  </Avatar>
  <Avatar>
    <AvatarImage src="https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150&q=80" />
    <AvatarFallback>SA</AvatarFallback>
  </Avatar>
  <Avatar>
    <AvatarImage src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&q=80" />
    <AvatarFallback>MA</AvatarFallback>
  </Avatar>
</AvatarGroup>`}
        />
      </section>

      {/* Avatar Group Count */}
      <section id="avatar-group-count" className="scroll-mt-20 space-y-4">
        <h2 className="type-h2 text-[var(--text-main)]">Avatar Group Count</h2>
        <p className="type-body text-[var(--text-muted)]">
          Use <code className="bg-[var(--bg-subtle)] text-[var(--text-main)] px-1.5 py-0.5 rounded text-xs font-mono">&lt;AvatarGroupCount&gt;</code> to add a count to the group.
        </p>

        {/* Live Demo */}
        <div className="rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-card)]">
          <AvatarGroupCountDemo />
        </div>

        <CodeBlock
          language="tsx"
          code={`<AvatarGroup>
  <Avatar>
    <AvatarImage src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&q=80" />
    <AvatarFallback>AL</AvatarFallback>
  </Avatar>
  <Avatar>
    <AvatarImage src="https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150&q=80" />
    <AvatarFallback>SA</AvatarFallback>
  </Avatar>
  <AvatarGroupCount>+5</AvatarGroupCount>
</AvatarGroup>`}
        />
      </section>

      {/* Avatar Group with Icon */}
      <section id="avatar-group-count-icon" className="scroll-mt-20 space-y-4">
        <h2 className="type-h2 text-[var(--text-main)]">Avatar Group with Icon</h2>
        <p className="type-body text-[var(--text-muted)]">
          You can also use an icon inside <code className="bg-[var(--bg-subtle)] text-[var(--text-main)] px-1.5 py-0.5 rounded text-xs font-mono">&lt;AvatarGroupCount&gt;</code>.
        </p>

        {/* Live Demo */}
        <div className="rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-card)]">
          <AvatarGroupCountIconDemo />
        </div>

        <CodeBlock
          language="tsx"
          code={`import { Plus } from "lucide-react"

<AvatarGroup>
  <Avatar>
    <AvatarImage src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&q=80" />
    <AvatarFallback>AL</AvatarFallback>
  </Avatar>
  <Avatar>
    <AvatarImage src="https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150&q=80" />
    <AvatarFallback>SA</AvatarFallback>
  </Avatar>
  <AvatarGroupCount className="bg-primary text-primary-foreground cursor-pointer">
    <Plus className="size-4" />
  </AvatarGroupCount>
</AvatarGroup>`}
        />
      </section>

      {/* Sizes */}
      <section id="sizes" className="scroll-mt-20 space-y-4">
        <h2 className="type-h2 text-[var(--text-main)]">Sizes</h2>
        <p className="type-body text-[var(--text-muted)]">
          Use the <code className="bg-[var(--bg-subtle)] text-[var(--text-main)] px-1.5 py-0.5 rounded text-xs font-mono">size</code> prop to change the size of the avatar.
        </p>

        {/* Live Demo */}
        <div className="rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-card)]">
          <AvatarSizeDemo />
        </div>

        <CodeBlock
          language="tsx"
          code={`<Avatar size="sm">
  <AvatarImage src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&q=80" />
  <AvatarFallback>SM</AvatarFallback>
</Avatar>
<Avatar size="default">
  <AvatarImage src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&q=80" />
  <AvatarFallback>MD</AvatarFallback>
</Avatar>
<Avatar size="lg">
  <AvatarImage src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&q=80" />
  <AvatarFallback>LG</AvatarFallback>
</Avatar>`}
        />
      </section>

      {/* Dropdown */}
      <section id="dropdown" className="scroll-mt-20 space-y-4">
        <h2 className="type-h2 text-[var(--text-main)]">Dropdown</h2>
        <p className="type-body text-[var(--text-muted)]">
          You can use the <code className="bg-[var(--bg-subtle)] text-[var(--text-main)] px-1.5 py-0.5 rounded text-xs font-mono">Avatar</code> component as a trigger for a dropdown menu.
        </p>

        {/* Live Demo */}
        <div className="rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-card)]">
          <AvatarDropdownDemo />
        </div>

        <CodeBlock
          language="tsx"
          code={`import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu"

<DropdownMenu>
  <DropdownMenuTrigger className="p-0 border-0 bg-transparent rounded-full focus:ring-2 focus:ring-primary">
    <Avatar className="cursor-pointer">
      <AvatarImage src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&q=80" />
      <AvatarFallback>CN</AvatarFallback>
      <AvatarBadge className="bg-emerald-500" />
    </Avatar>
  </DropdownMenuTrigger>
  <DropdownMenuContent align="start" className="w-52">
    <DropdownMenuLabel>My Account</DropdownMenuLabel>
    <DropdownMenuSeparator />
    <DropdownMenuItem>Profile</DropdownMenuItem>
    <DropdownMenuItem>Notifications</DropdownMenuItem>
    <DropdownMenuItem>Settings</DropdownMenuItem>
    <DropdownMenuSeparator />
    <DropdownMenuItem variant="destructive">Log out</DropdownMenuItem>
  </DropdownMenuContent>
</DropdownMenu>`}
        />
      </section>

      {/* RTL */}
      <section id="rtl" className="scroll-mt-20 space-y-4">
        <h2 className="type-h2 text-[var(--text-main)]">RTL</h2>
        <p className="type-body text-[var(--text-muted)]">
          To enable RTL support in shadcn/ui, avatars and avatar groups automatically adapt their overlapping order and status badge positioning.
        </p>

        {/* Live Demo */}
        <div className="rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-card)]">
          <AvatarRtlDemo />
        </div>

        <CodeBlock
          language="tsx"
          code={`<div dir="rtl">
  <AvatarGroup>
    <Avatar>
      <AvatarFallback>أ</AvatarFallback>
    </Avatar>
    <Avatar>
      <AvatarFallback>ب</AvatarFallback>
    </Avatar>
    <AvatarGroupCount>+۳</AvatarGroupCount>
  </AvatarGroup>
</div>`}
        />
      </section>

      {/* API Reference */}
      <section id="api-reference" className="scroll-mt-20 space-y-4">
        <h2 className="type-h2 text-[var(--text-main)]">API Reference</h2>
        
        <h3 className="text-sm font-semibold text-[var(--text-main)] pt-2">Avatar</h3>
        <p className="text-xs text-[var(--text-muted)]">The root container component wrapping the image, fallback, and badge.</p>
        <div className="rounded-xl border border-[var(--border-subtle)] overflow-hidden">
          <table className="w-full text-xs text-left">
            <thead className="bg-[var(--bg-subtle)]/60 text-[var(--text-main)] border-b border-[var(--border-subtle)]">
              <tr>
                <th className="p-3 font-semibold">Prop</th>
                <th className="p-3 font-semibold">Type</th>
                <th className="p-3 font-semibold">Default</th>
                <th className="p-3 font-semibold">Description</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[var(--border-subtle)] text-[var(--text-muted)]">
              <tr>
                <td className="p-3 font-mono text-[var(--text-main)]">size</td>
                <td className="p-3 font-mono text-indigo-400">&quot;default&quot; | &quot;sm&quot; | &quot;lg&quot;</td>
                <td className="p-3 font-mono">&quot;default&quot;</td>
                <td className="p-3">Changes size dimension (sm: 32px, default: 40px, lg: 56px).</td>
              </tr>
              <tr>
                <td className="p-3 font-mono text-[var(--text-main)]">className</td>
                <td className="p-3 font-mono text-indigo-400">string</td>
                <td className="p-3 font-mono">-</td>
                <td className="p-3">Custom classes for sizing, borders, or rings.</td>
              </tr>
            </tbody>
          </table>
        </div>

        <h3 className="text-sm font-semibold text-[var(--text-main)] pt-4">AvatarImage</h3>
        <p className="text-xs text-[var(--text-muted)]">The image element with automatic error handling and fallback switching.</p>
        <div className="rounded-xl border border-[var(--border-subtle)] overflow-hidden">
          <table className="w-full text-xs text-left">
            <thead className="bg-[var(--bg-subtle)]/60 text-[var(--text-main)] border-b border-[var(--border-subtle)]">
              <tr>
                <th className="p-3 font-semibold">Prop</th>
                <th className="p-3 font-semibold">Type</th>
                <th className="p-3 font-semibold">Default</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[var(--border-subtle)] text-[var(--text-muted)]">
              <tr>
                <td className="p-3 font-mono text-[var(--text-main)]">src</td>
                <td className="p-3 font-mono text-indigo-400">string</td>
                <td className="p-3 font-mono">-</td>
              </tr>
              <tr>
                <td className="p-3 font-mono text-[var(--text-main)]">alt</td>
                <td className="p-3 font-mono text-indigo-400">string</td>
                <td className="p-3 font-mono">-</td>
              </tr>
              <tr>
                <td className="p-3 font-mono text-[var(--text-main)]">className</td>
                <td className="p-3 font-mono text-indigo-400">string</td>
                <td className="p-3 font-mono">-</td>
              </tr>
            </tbody>
          </table>
        </div>

        <h3 className="text-sm font-semibold text-[var(--text-main)] pt-4">AvatarBadge</h3>
        <p className="text-xs text-[var(--text-muted)]">Displays a badge indicator on the avatar, positioned at the bottom right (mirrored in RTL).</p>
        <div className="rounded-xl border border-[var(--border-subtle)] overflow-hidden">
          <table className="w-full text-xs text-left">
            <thead className="bg-[var(--bg-subtle)]/60 text-[var(--text-main)] border-b border-[var(--border-subtle)]">
              <tr>
                <th className="p-3 font-semibold">Prop</th>
                <th className="p-3 font-semibold">Type</th>
                <th className="p-3 font-semibold">Default</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[var(--border-subtle)] text-[var(--text-muted)]">
              <tr>
                <td className="p-3 font-mono text-[var(--text-main)]">className</td>
                <td className="p-3 font-mono text-indigo-400">string</td>
                <td className="p-3 font-mono">-</td>
              </tr>
              <tr>
                <td className="p-3 font-mono text-[var(--text-main)]">children</td>
                <td className="p-3 font-mono text-indigo-400">React.ReactNode</td>
                <td className="p-3 font-mono">-</td>
              </tr>
            </tbody>
          </table>
        </div>

        <h3 className="text-sm font-semibold text-[var(--text-main)] pt-4">AvatarGroup &amp; AvatarGroupCount</h3>
        <p className="text-xs text-[var(--text-muted)]">Displays overlapping grouped avatars with optional numeric or icon counter indicator.</p>
        <div className="rounded-xl border border-[var(--border-subtle)] overflow-hidden">
          <table className="w-full text-xs text-left">
            <thead className="bg-[var(--bg-subtle)]/60 text-[var(--text-main)] border-b border-[var(--border-subtle)]">
              <tr>
                <th className="p-3 font-semibold">Component</th>
                <th className="p-3 font-semibold">Prop</th>
                <th className="p-3 font-semibold">Type</th>
                <th className="p-3 font-semibold">Default</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[var(--border-subtle)] text-[var(--text-muted)]">
              <tr>
                <td className="p-3 font-mono text-[var(--text-main)]">AvatarGroup</td>
                <td className="p-3 font-mono">className</td>
                <td className="p-3 font-mono text-indigo-400">string</td>
                <td className="p-3 font-mono">-</td>
              </tr>
              <tr>
                <td className="p-3 font-mono text-[var(--text-main)]">AvatarGroupCount</td>
                <td className="p-3 font-mono">className</td>
                <td className="p-3 font-mono text-indigo-400">string</td>
                <td className="p-3 font-mono">-</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>
    </div>
  )
}
