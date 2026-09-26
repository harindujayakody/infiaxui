import React from "react"
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
} from "@/components/shadcn/dropdown-menu"
import { CodeBlock } from "@/components/ui/code-block"
import { Check, Plus, User, Settings, LogOut, Shield } from "lucide-react"

export function AvatarGuide() {
  return (
    <div className="space-y-12 pt-6 text-[var(--text-main)]">
      {/* Composition */}
      <section id="composition" className="scroll-mt-20 space-y-4">
        <h2 className="type-h2 text-[var(--text-main)]">Composition</h2>
        <p className="text-sm text-[var(--text-muted)]">
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

        <p className="text-sm text-[var(--text-muted)] pt-2">
          Use the following composition to build an <code className="text-[var(--text-main)] font-mono">AvatarGroup</code>:
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
        <p className="text-sm text-[var(--text-muted)]">
          A basic avatar component with an image and fallback initials.
        </p>

        {/* Live Demo */}
        <div className="p-6 rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-card)] flex items-center gap-4">
          <Avatar>
            <AvatarImage src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=128&q=80" alt="@shadcn" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
          <Avatar>
            <AvatarImage src="" alt="@alex" />
            <AvatarFallback>JD</AvatarFallback>
          </Avatar>
        </div>

        <CodeBlock
          language="tsx"
          code={`<Avatar>
  <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
  <AvatarFallback>CN</AvatarFallback>
</Avatar>`}
        />
      </section>

      {/* Badge */}
      <section id="badge" className="scroll-mt-20 space-y-4">
        <h2 className="type-h2 text-[var(--text-main)]">Badge</h2>
        <p className="text-sm text-[var(--text-muted)]">
          Use the <code className="bg-[var(--bg-subtle)] text-[var(--text-main)] px-1.5 py-0.5 rounded text-xs font-mono">AvatarBadge</code> component to add a status indicator badge at the bottom right.
        </p>

        {/* Live Demo */}
        <div className="p-6 rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-card)] flex items-center gap-4">
          <Avatar>
            <AvatarImage src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=128&q=80" alt="@sarah" />
            <AvatarFallback>SA</AvatarFallback>
            <AvatarBadge className="bg-emerald-500" />
          </Avatar>
          <Avatar>
            <AvatarFallback>AL</AvatarFallback>
            <AvatarBadge className="bg-amber-500" />
          </Avatar>
        </div>

        <CodeBlock
          language="tsx"
          code={`<Avatar>
  <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
  <AvatarFallback>CN</AvatarFallback>
  <AvatarBadge className="bg-emerald-500" />
</Avatar>`}
        />
      </section>

      {/* Badge with Icon */}
      <section id="badge-icon" className="scroll-mt-20 space-y-4">
        <h2 className="type-h2 text-[var(--text-main)]">Badge with Icon</h2>
        <p className="text-sm text-[var(--text-muted)]">
          You can render an icon inside <code className="bg-[var(--bg-subtle)] text-[var(--text-main)] px-1.5 py-0.5 rounded text-xs font-mono">&lt;AvatarBadge&gt;</code>.
        </p>

        {/* Live Demo */}
        <div className="p-6 rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-card)] flex items-center gap-4">
          <Avatar>
            <AvatarImage src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=128&q=80" alt="@pro" />
            <AvatarFallback>PR</AvatarFallback>
            <AvatarBadge className="bg-blue-600">
              <Shield className="size-2.5" />
            </AvatarBadge>
          </Avatar>
          <Avatar>
            <AvatarFallback>OK</AvatarFallback>
            <AvatarBadge className="bg-emerald-600">
              <Check className="size-2.5" />
            </AvatarBadge>
          </Avatar>
        </div>

        <CodeBlock
          language="tsx"
          code={`<Avatar>
  <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
  <AvatarFallback>CN</AvatarFallback>
  <AvatarBadge className="bg-blue-600">
    <Shield className="size-2.5" />
  </AvatarBadge>
</Avatar>`}
        />
      </section>

      {/* Avatar Group */}
      <section id="avatar-group" className="scroll-mt-20 space-y-4">
        <h2 className="type-h2 text-[var(--text-main)]">Avatar Group</h2>
        <p className="text-sm text-[var(--text-muted)]">
          Use the <code className="bg-[var(--bg-subtle)] text-[var(--text-main)] px-1.5 py-0.5 rounded text-xs font-mono">AvatarGroup</code> component to render stacked overlapping avatars.
        </p>

        {/* Live Demo */}
        <div className="p-6 rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-card)]">
          <AvatarGroup>
            <Avatar>
              <AvatarImage src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=128&q=80" alt="@sarah" />
              <AvatarFallback>SA</AvatarFallback>
            </Avatar>
            <Avatar>
              <AvatarFallback className="bg-indigo-600 text-white font-semibold">JD</AvatarFallback>
            </Avatar>
            <Avatar>
              <AvatarFallback className="bg-purple-600 text-white font-semibold">EM</AvatarFallback>
            </Avatar>
            <AvatarGroupCount>+3</AvatarGroupCount>
          </AvatarGroup>
        </div>

        <CodeBlock
          language="tsx"
          code={`<AvatarGroup>
  <Avatar>
    <AvatarImage src="https://github.com/shadcn.png" />
    <AvatarFallback>CN</AvatarFallback>
  </Avatar>
  <Avatar>
    <AvatarFallback>JD</AvatarFallback>
  </Avatar>
  <Avatar>
    <AvatarFallback>EM</AvatarFallback>
  </Avatar>
  <AvatarGroupCount>+3</AvatarGroupCount>
</AvatarGroup>`}
        />
      </section>

      {/* Sizes */}
      <section id="sizes" className="scroll-mt-20 space-y-4">
        <h2 className="type-h2 text-[var(--text-main)]">Sizes</h2>
        <p className="text-sm text-[var(--text-muted)]">
          Use the <code className="bg-[var(--bg-subtle)] text-[var(--text-main)] px-1.5 py-0.5 rounded text-xs font-mono">size</code> prop to change avatar scale: <code className="text-[var(--text-main)]">&quot;sm&quot; | &quot;default&quot; | &quot;lg&quot;</code>.
        </p>

        {/* Live Demo */}
        <div className="p-6 rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-card)] flex items-center gap-4">
          <Avatar size="sm">
            <AvatarFallback>SM</AvatarFallback>
          </Avatar>
          <Avatar size="default">
            <AvatarFallback>MD</AvatarFallback>
          </Avatar>
          <Avatar size="lg">
            <AvatarFallback>LG</AvatarFallback>
          </Avatar>
        </div>

        <CodeBlock
          language="tsx"
          code={`<Avatar size="sm">
  <AvatarFallback>SM</AvatarFallback>
</Avatar>
<Avatar size="default">
  <AvatarFallback>MD</AvatarFallback>
</Avatar>
<Avatar size="lg">
  <AvatarFallback>LG</AvatarFallback>
</Avatar>`}
        />
      </section>

      {/* Dropdown */}
      <section id="dropdown" className="scroll-mt-20 space-y-4">
        <h2 className="type-h2 text-[var(--text-main)]">Dropdown</h2>
        <p className="text-sm text-[var(--text-muted)]">
          You can use the <code className="bg-[var(--bg-subtle)] text-[var(--text-main)] px-1.5 py-0.5 rounded text-xs font-mono">Avatar</code> component as an interactive trigger for a dropdown menu.
        </p>

        {/* Live Demo */}
        <div className="p-6 rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-card)]">
          <DropdownMenu>
            <DropdownMenuTrigger className="p-0 border-0 bg-transparent rounded-full focus:ring-2 focus:ring-[var(--brand)]">
              <Avatar className="cursor-pointer hover:opacity-80 transition-opacity">
                <AvatarImage src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=128&q=80" alt="@shadcn" />
                <AvatarFallback>CN</AvatarFallback>
                <AvatarBadge className="bg-emerald-500" />
              </Avatar>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start" className="w-48">
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="flex items-center gap-2">
                <User className="size-3.5 text-[var(--text-muted)]" />
                <span>Profile</span>
              </DropdownMenuItem>
              <DropdownMenuItem className="flex items-center gap-2">
                <Settings className="size-3.5 text-[var(--text-muted)]" />
                <span>Settings</span>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="flex items-center gap-2 text-red-400 hover:text-red-300">
                <LogOut className="size-3.5" />
                <span>Log out</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        <CodeBlock
          language="tsx"
          code={`<DropdownMenu>
  <DropdownMenuTrigger>
    <Avatar>
      <AvatarImage src="https://github.com/shadcn.png" />
      <AvatarFallback>CN</AvatarFallback>
    </Avatar>
  </DropdownMenuTrigger>
  <DropdownMenuContent>
    <DropdownMenuLabel>My Account</DropdownMenuLabel>
    <DropdownMenuItem>Profile</DropdownMenuItem>
    <DropdownMenuItem>Settings</DropdownMenuItem>
    <DropdownMenuItem>Log out</DropdownMenuItem>
  </DropdownMenuContent>
</DropdownMenu>`}
        />
      </section>

      {/* RTL */}
      <section id="rtl" className="scroll-mt-20 space-y-4">
        <h2 className="type-h2 text-[var(--text-main)]">RTL</h2>
        <p className="text-sm text-[var(--text-muted)]">
          Avatar groups and badges support automatic mirroring in right-to-left layout.
        </p>

        {/* Live Demo */}
        <div dir="rtl" className="p-6 rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-card)]">
          <AvatarGroup>
            <Avatar>
              <AvatarFallback className="bg-blue-600 text-white">أ</AvatarFallback>
            </Avatar>
            <Avatar>
              <AvatarFallback className="bg-emerald-600 text-white">ب</AvatarFallback>
            </Avatar>
            <AvatarGroupCount>+2</AvatarGroupCount>
          </AvatarGroup>
        </div>
      </section>

      {/* API Reference */}
      <section id="api-reference" className="scroll-mt-20 space-y-4">
        <h2 className="type-h2 text-[var(--text-main)]">API Reference</h2>
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
                <td className="p-3 font-mono text-[var(--text-main)]">Avatar</td>
                <td className="p-3 font-mono">size</td>
                <td className="p-3 font-mono">&quot;default&quot; | &quot;sm&quot; | &quot;lg&quot;</td>
                <td className="p-3 font-mono">&quot;default&quot;</td>
              </tr>
              <tr>
                <td className="p-3 font-mono text-[var(--text-main)]">AvatarImage</td>
                <td className="p-3 font-mono">src / alt</td>
                <td className="p-3 font-mono">string</td>
                <td className="p-3 font-mono">-</td>
              </tr>
              <tr>
                <td className="p-3 font-mono text-[var(--text-main)]">AvatarBadge</td>
                <td className="p-3 font-mono">className</td>
                <td className="p-3 font-mono">string</td>
                <td className="p-3 font-mono">-</td>
              </tr>
              <tr>
                <td className="p-3 font-mono text-[var(--text-main)]">AvatarGroup</td>
                <td className="p-3 font-mono">className</td>
                <td className="p-3 font-mono">string</td>
                <td className="p-3 font-mono">-</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>
    </div>
  )
}
