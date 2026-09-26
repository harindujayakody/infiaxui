import React, { useState } from "react"
import { CodeBlock } from "@/components/ui/code-block"
import { X, AlertTriangle, User, Check, Copy } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import { cn } from "@/lib/utils"

export function DialogGuide() {
  const [openBasic, setOpenBasic] = useState(false)
  const [openCustomClose, setOpenCustomClose] = useState(false)
  const [openNoClose, setOpenNoClose] = useState(false)
  const [openScrollable, setOpenScrollable] = useState(false)
  const [name, setName] = useState("Pedro Duarte")
  const [username, setUsername] = useState("@peduarte")

  return (
    <div className="space-y-12 pt-6 text-[var(--text-main)]">
      {/* Composition */}
      <section id="composition" className="scroll-mt-20 space-y-4">
        <h2 className="type-h2 text-[var(--text-main)]">Composition</h2>
        <p className="text-sm text-[var(--text-muted)]">
          Use the following semantic structure to build accessible modal dialogs:
        </p>
        <div className="rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-card)] p-4 font-mono text-xs text-[var(--text-muted)] space-y-0.5">
          {[
            "Dialog",
            "├── DialogTrigger",
            "└── DialogContent",
            "    ├── DialogHeader",
            "    │   ├── DialogTitle",
            "    │   └── DialogDescription",
            "    ├── Modal Body / Form",
            "    └── DialogFooter",
            "        └── DialogClose",
          ].map((l, i) => <div key={i}>{l}</div>)}
        </div>
      </section>

      {/* Basic Demo */}
      <section id="basic" className="scroll-mt-20 space-y-4">
        <h2 className="type-h2 text-[var(--text-main)]">Basic Dialog</h2>
        <p className="text-sm text-[var(--text-muted)]">
          Standard profile edit dialog with backdrop and form controls.
        </p>
        <div className="p-12 rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-card)] flex items-center justify-center min-h-[220px]">
          <button
            onClick={() => setOpenBasic(true)}
            className="px-4 py-2 rounded-lg bg-[var(--text-main)] text-[var(--bg-page)] text-xs font-medium hover:opacity-90 transition-opacity shadow-sm"
          >
            Edit Profile
          </button>

          <AnimatePresence>
            {openBasic && (
              <>
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  onClick={() => setOpenBasic(false)}
                  className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
                />

                <motion.div
                  initial={{ opacity: 0, scale: 0.95, y: 8 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95, y: 8 }}
                  transition={{ duration: 0.2 }}
                  className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-md rounded-2xl border border-[var(--border-subtle)] bg-[var(--bg-card)] p-6 shadow-2xl z-50 text-[var(--text-main)] space-y-5"
                >
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="text-base font-semibold">Edit profile</h3>
                      <p className="text-xs text-[var(--text-muted)] mt-1">
                        Make changes to your profile here. Click save when you're done.
                      </p>
                    </div>
                    <button
                      onClick={() => setOpenBasic(false)}
                      className="p-1.5 rounded-lg text-[var(--text-muted)] hover:text-[var(--text-main)] hover:bg-[var(--bg-subtle)] transition-colors"
                    >
                      <X className="size-4" />
                    </button>
                  </div>

                  <div className="space-y-3 py-2">
                    <div className="grid grid-cols-4 items-center gap-3">
                      <label className="text-xs font-medium text-[var(--text-muted)] text-right">
                        Name
                      </label>
                      <input
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="col-span-3 h-9 px-3 rounded-lg border border-[var(--border-subtle)] bg-[var(--bg-page)] text-xs text-[var(--text-main)] focus:outline-none focus:ring-1 focus:ring-indigo-500"
                      />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-3">
                      <label className="text-xs font-medium text-[var(--text-muted)] text-right">
                        Username
                      </label>
                      <input
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        className="col-span-3 h-9 px-3 rounded-lg border border-[var(--border-subtle)] bg-[var(--bg-page)] text-xs text-[var(--text-main)] focus:outline-none focus:ring-1 focus:ring-indigo-500"
                      />
                    </div>
                  </div>

                  <div className="flex items-center justify-end gap-2 pt-3 border-t border-[var(--border-subtle)]">
                    <button
                      onClick={() => setOpenBasic(false)}
                      className="px-3.5 py-2 rounded-lg border border-[var(--border-subtle)] text-xs font-medium text-[var(--text-main)] hover:bg-[var(--bg-subtle)]"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={() => setOpenBasic(false)}
                      className="px-3.5 py-2 rounded-lg bg-[var(--text-main)] text-[var(--bg-page)] text-xs font-medium hover:opacity-90"
                    >
                      Save changes
                    </button>
                  </div>
                </motion.div>
              </>
            )}
          </AnimatePresence>
        </div>
        <CodeBlock
          language="tsx"
          code={`import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export function DialogDemo() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">Edit Profile</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Edit profile</DialogTitle>
          <DialogDescription>
            Make changes to your profile here. Click save when you're done.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-right">Name</Label>
            <Input id="name" defaultValue="Pedro Duarte" className="col-span-3" />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="username" className="text-right">Username</Label>
            <Input id="username" defaultValue="@peduarte" className="col-span-3" />
          </div>
        </div>
        <DialogFooter>
          <Button type="submit">Save changes</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}`}
        />
      </section>

      {/* Custom Close Button */}
      <section id="custom-close" className="scroll-mt-20 space-y-4">
        <h2 className="type-h2 text-[var(--text-main)]">Custom Close Button</h2>
        <p className="text-sm text-[var(--text-muted)]">
          Replace the default top-right close control with custom trigger buttons.
        </p>

        <div className="p-8 rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-card)] flex items-center justify-center">
          <button
            onClick={() => setOpenCustomClose(true)}
            className="px-4 py-2 rounded-lg border border-[var(--border-subtle)] bg-[var(--bg-page)] text-xs font-medium hover:bg-[var(--bg-subtle)] transition-colors"
          >
            Share Link Modal
          </button>

          <AnimatePresence>
            {openCustomClose && (
              <>
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  onClick={() => setOpenCustomClose(false)}
                  className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
                />

                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-sm rounded-2xl border border-[var(--border-subtle)] bg-[var(--bg-card)] p-6 shadow-2xl z-50 text-[var(--text-main)] space-y-4"
                >
                  <h3 className="text-sm font-semibold">Share link</h3>
                  <p className="text-xs text-[var(--text-muted)]">
                    Anyone who has this link will be able to view this.
                  </p>

                  <div className="flex items-center gap-2">
                    <input
                      readOnly
                      value="https://ui.shadcn.com/docs/installation"
                      className="flex-1 h-8 px-2.5 rounded-lg border border-[var(--border-subtle)] bg-[var(--bg-page)] text-xs font-mono text-[var(--text-muted)]"
                    />
                    <button className="h-8 px-2.5 rounded-lg bg-[var(--text-main)] text-[var(--bg-page)] text-xs font-medium flex items-center gap-1">
                      <Copy className="size-3" />
                      <span>Copy</span>
                    </button>
                  </div>

                  <div className="flex justify-end pt-2">
                    <button
                      onClick={() => setOpenCustomClose(false)}
                      className="h-8 px-4 rounded-lg border border-[var(--border-subtle)] text-xs font-medium hover:bg-[var(--bg-subtle)]"
                    >
                      Close
                    </button>
                  </div>
                </motion.div>
              </>
            )}
          </AnimatePresence>
        </div>

        <CodeBlock
          language="tsx"
          code={`<Dialog>
  <DialogTrigger asChild>
    <Button variant="outline">Share Link</Button>
  </DialogTrigger>
  <DialogContent className="sm:max-w-md">
    <DialogHeader>
      <DialogTitle>Share link</DialogTitle>
      <DialogDescription>
        Anyone who has this link will be able to view this.
      </DialogDescription>
    </DialogHeader>
    <div className="flex items-center space-x-2">
      <Input defaultValue="https://ui.shadcn.com/docs/installation" readOnly />
      <Button size="sm">Copy</Button>
    </div>
    <DialogFooter className="sm:justify-start">
      <DialogClose asChild>
        <Button type="button" variant="secondary">Close</Button>
      </DialogClose>
    </DialogFooter>
  </DialogContent>
</Dialog>`}
        />
      </section>

      {/* Scrollable Content & Sticky Footer */}
      <section id="scrollable" className="scroll-mt-20 space-y-4">
        <h2 className="type-h2 text-[var(--text-main)]">Scrollable Content & Sticky Footer</h2>
        <p className="text-sm text-[var(--text-muted)]">
          Keep modal action buttons accessible while the internal body content scrolls.
        </p>

        <div className="p-8 rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-card)] flex items-center justify-center">
          <button
            onClick={() => setOpenScrollable(true)}
            className="px-4 py-2 rounded-lg border border-[var(--border-subtle)] bg-[var(--bg-page)] text-xs font-medium hover:bg-[var(--bg-subtle)] transition-colors"
          >
            Terms of Service (Scrollable)
          </button>

          <AnimatePresence>
            {openScrollable && (
              <>
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  onClick={() => setOpenScrollable(false)}
                  className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
                />

                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-lg max-h-[85vh] flex flex-col rounded-2xl border border-[var(--border-subtle)] bg-[var(--bg-card)] shadow-2xl z-50 text-[var(--text-main)]"
                >
                  <div className="p-6 border-b border-[var(--border-subtle)] flex items-center justify-between shrink-0">
                    <h3 className="text-sm font-semibold">Terms of Service</h3>
                    <button onClick={() => setOpenScrollable(false)}>
                      <X className="size-4 text-[var(--text-muted)]" />
                    </button>
                  </div>

                  <div className="p-6 overflow-y-auto space-y-4 text-xs text-[var(--text-muted)] leading-relaxed flex-1">
                    <p>
                      Please read these terms and conditions carefully before using our service.
                    </p>
                    {Array.from({ length: 5 }).map((_, i) => (
                      <p key={i}>
                        Section {i + 1}. By accessing or using the platform, you agree to be bound by these terms. If you disagree with any part of the terms then you may not access the service. You are responsible for safeguarding your credentials and any actions performed under your account.
                      </p>
                    ))}
                  </div>

                  <div className="p-4 border-t border-[var(--border-subtle)] flex items-center justify-end gap-2 bg-[var(--bg-card)] shrink-0 rounded-b-2xl">
                    <button
                      onClick={() => setOpenScrollable(false)}
                      className="px-3.5 py-1.5 rounded-lg border border-[var(--border-subtle)] text-xs font-medium hover:bg-[var(--bg-subtle)]"
                    >
                      Decline
                    </button>
                    <button
                      onClick={() => setOpenScrollable(false)}
                      className="px-3.5 py-1.5 rounded-lg bg-[var(--text-main)] text-[var(--bg-page)] text-xs font-medium hover:opacity-90"
                    >
                      I Accept
                    </button>
                  </div>
                </motion.div>
              </>
            )}
          </AnimatePresence>
        </div>

        <CodeBlock
          language="tsx"
          code={`<DialogContent className="max-h-[80vh] flex flex-col">
  <DialogHeader className="p-6 border-b shrink-0">
    <DialogTitle>Terms of Service</DialogTitle>
  </DialogHeader>
  <div className="p-6 overflow-y-auto space-y-4">
    {/* Scrollable content */}
  </div>
  <DialogFooter className="p-4 border-t sticky bottom-0 bg-background shrink-0">
    <Button variant="outline">Decline</Button>
    <Button>I Accept</Button>
  </DialogFooter>
</DialogContent>`}
        />
      </section>

      {/* RTL */}
      <section id="rtl" className="scroll-mt-20 space-y-4">
        <h2 className="type-h2 text-[var(--text-main)]">RTL Support</h2>
        <p className="text-sm text-[var(--text-muted)]">
          Dialog header alignment and action button order mirror smoothly in RTL locales.
        </p>
        <div dir="rtl" className="p-8 rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-card)] max-w-md mx-auto space-y-3">
          <h4 className="text-sm font-semibold text-[var(--text-main)]">
            هل أنت متأكد تماماً؟
          </h4>
          <p className="text-xs text-[var(--text-muted)] leading-relaxed">
            لا يمكن التراجع عن هذا الإجراء. سيؤدي هذا إلى حذف حسابك نهائياً وإزالة بياناتك من خوادمنا.
          </p>
          <div className="flex items-center gap-2 pt-2">
            <button className="px-3 py-1.5 rounded-lg bg-red-500 text-white text-xs font-medium">
              حذف الحساب
            </button>
            <button className="px-3 py-1.5 rounded-lg border border-[var(--border-subtle)] text-xs font-medium">
              إلغاء
            </button>
          </div>
        </div>
      </section>

      {/* API Reference */}
      <section id="api-reference" className="scroll-mt-20 space-y-4">
        <h2 className="type-h2 text-[var(--text-main)]">API Reference</h2>
        <div className="rounded-xl border border-[var(--border-subtle)] overflow-hidden">
          <table className="w-full text-xs text-left">
            <thead className="bg-[var(--bg-subtle)]/60 text-[var(--text-main)] border-b border-[var(--border-subtle)]">
              <tr>
                <th className="p-3 font-semibold">Component / Prop</th>
                <th className="p-3 font-semibold">Type</th>
                <th className="p-3 font-semibold">Default</th>
                <th className="p-3 font-semibold">Description</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[var(--border-subtle)] text-[var(--text-muted)]">
              <tr>
                <td className="p-3 font-mono text-[var(--text-main)]">Dialog.open</td>
                <td className="p-3 font-mono">boolean</td>
                <td className="p-3 font-mono">-</td>
                <td className="p-3">Controlled open state of the dialog</td>
              </tr>
              <tr>
                <td className="p-3 font-mono text-[var(--text-main)]">DialogContent.showCloseButton</td>
                <td className="p-3 font-mono">boolean</td>
                <td className="p-3 font-mono">true</td>
                <td className="p-3">Whether to render the default top-right X close button</td>
              </tr>
              <tr>
                <td className="p-3 font-mono text-[var(--text-main)]">DialogClose</td>
                <td className="p-3 font-mono">HTMLButtonElement</td>
                <td className="p-3 font-mono">-</td>
                <td className="p-3">Button primitive that automatically closes the dialog on click</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>
    </div>
  )
}
