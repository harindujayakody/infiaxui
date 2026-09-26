import React, { useState } from "react"
import { CodeBlock } from "@/components/ui/code-block"
import { AlertTriangle, Trash2, X, ShieldAlert } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import { cn } from "@/lib/utils"

export function AlertDialogGuide() {
  const [openBasic, setOpenBasic] = useState(false)
  const [openMedia, setOpenMedia] = useState(false)
  const [size, setSize] = useState<"default" | "sm">("default")

  return (
    <div className="space-y-12 pt-6 text-[var(--text-main)]">
      {/* Composition */}
      <section id="composition" className="scroll-mt-20 space-y-4">
        <h2 className="type-h2 text-[var(--text-main)]">Composition</h2>
        <p className="text-sm text-[var(--text-muted)]">
          Build modal interrupt dialogs using the <code className="bg-[var(--bg-subtle)] text-[var(--text-main)] px-1.5 py-0.5 rounded text-xs font-mono">AlertDialog</code> components:
        </p>
        <div className="rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-card)] p-4 font-mono text-xs text-[var(--text-muted)] space-y-0.5">
          {[
            "AlertDialog",
            "├── AlertDialogTrigger",
            "└── AlertDialogContent (size='default' | 'sm')",
            "    ├── AlertDialogHeader",
            "    │   ├── AlertDialogMedia (Icon / Avatar)",
            "    │   ├── AlertDialogTitle",
            "    │   └── AlertDialogDescription",
            "    └── AlertDialogFooter",
            "        ├── AlertDialogCancel",
            "        └── AlertDialogAction (variant='destructive')",
          ].map((l, i) => <div key={i}>{l}</div>)}
        </div>
      </section>

      {/* Basic Demo */}
      <section id="basic" className="scroll-mt-20 space-y-4">
        <h2 className="type-h2 text-[var(--text-main)]">Basic Alert Dialog</h2>
        <p className="text-sm text-[var(--text-muted)]">
          Destructive action confirmation modal with background backdrop.
        </p>
        <div className="p-12 rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-card)] flex items-center justify-center min-h-[200px]">
          <button
            onClick={() => setOpenBasic(true)}
            className="px-4 py-2 rounded-lg bg-red-500 text-white text-xs font-medium hover:bg-red-600 transition-colors shadow-sm flex items-center gap-2"
          >
            <Trash2 className="size-3.5" />
            <span>Delete Database Cluster</span>
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
                  transition={{ duration: 0.18 }}
                  className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-md rounded-2xl border border-[var(--border-subtle)] bg-[var(--bg-card)] p-6 shadow-2xl z-50 text-[var(--text-main)] space-y-4"
                >
                  <div className="space-y-2">
                    <h3 className="text-base font-bold text-[var(--text-main)]">
                      Are you absolutely sure?
                    </h3>
                    <p className="text-xs text-[var(--text-muted)] leading-relaxed">
                      This action cannot be undone. This will permanently delete your cluster and purge all associated database tables and automated backups from our servers.
                    </p>
                  </div>

                  <div className="flex items-center justify-end gap-2 pt-2 border-t border-[var(--border-subtle)]">
                    <button
                      onClick={() => setOpenBasic(false)}
                      className="px-3.5 py-1.5 rounded-lg border border-[var(--border-subtle)] text-xs font-medium hover:bg-[var(--bg-subtle)] text-[var(--text-main)] transition-colors"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={() => setOpenBasic(false)}
                      className="px-3.5 py-1.5 rounded-lg bg-red-500 hover:bg-red-600 text-white text-xs font-semibold shadow-sm transition-colors"
                    >
                      Delete Cluster
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
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { Button } from "@/components/ui/button"

export function AlertDialogDemo() {
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant="destructive">Delete Database Cluster</Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete your
            cluster and remove all records from our servers.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction variant="destructive">Continue</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}`}
        />
      </section>

      {/* Media & Size Variant */}
      <section id="media" className="scroll-mt-20 space-y-4">
        <h2 className="type-h2 text-[var(--text-main)]">With Media Icon & Small Size</h2>
        <p className="text-sm text-[var(--text-muted)]">
          Include <code className="bg-[var(--bg-subtle)] text-[var(--text-main)] px-1.5 py-0.5 rounded text-xs font-mono">AlertDialogMedia</code> and toggle <code className="bg-[var(--bg-subtle)] text-[var(--text-main)] px-1.5 py-0.5 rounded text-xs font-mono">size="sm"</code>.
        </p>

        <div className="p-8 rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-card)] flex items-center justify-center">
          <button
            onClick={() => setOpenMedia(true)}
            className="px-4 py-2 rounded-lg border border-[var(--border-subtle)] bg-[var(--bg-page)] text-xs font-medium hover:bg-[var(--bg-subtle)] transition-colors"
          >
            Show Security Alert Dialog
          </button>

          <AnimatePresence>
            {openMedia && (
              <>
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  onClick={() => setOpenMedia(false)}
                  className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
                />

                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-sm rounded-2xl border border-[var(--border-subtle)] bg-[var(--bg-card)] p-5 shadow-2xl z-50 text-[var(--text-main)] space-y-4 text-center flex flex-col items-center"
                >
                  <div className="size-11 rounded-full bg-amber-500/15 text-amber-500 flex items-center justify-center">
                    <ShieldAlert className="size-6" />
                  </div>

                  <div className="space-y-1">
                    <h4 className="text-sm font-bold">Revoke API Credentials?</h4>
                    <p className="text-xs text-[var(--text-muted)] leading-relaxed">
                      Active integrations using this key will fail immediately.
                    </p>
                  </div>

                  <div className="flex items-center gap-2 w-full pt-2">
                    <button
                      onClick={() => setOpenMedia(false)}
                      className="flex-1 h-8 rounded-lg border border-[var(--border-subtle)] text-xs font-medium hover:bg-[var(--bg-subtle)]"
                    >
                      Keep Key
                    </button>
                    <button
                      onClick={() => setOpenMedia(false)}
                      className="flex-1 h-8 rounded-lg bg-red-500 text-white text-xs font-semibold hover:bg-red-600"
                    >
                      Revoke
                    </button>
                  </div>
                </motion.div>
              </>
            )}
          </AnimatePresence>
        </div>

        <CodeBlock
          language="tsx"
          code={`<AlertDialogContent size="sm">
  <AlertDialogHeader>
    <AlertDialogMedia>
      <ShieldAlert className="size-6 text-amber-500" />
    </AlertDialogMedia>
    <AlertDialogTitle>Revoke API Credentials?</AlertDialogTitle>
    <AlertDialogDescription>
      Active integrations using this key will fail immediately.
    </AlertDialogDescription>
  </AlertDialogHeader>
  <AlertDialogFooter>
    <AlertDialogCancel>Keep Key</AlertDialogCancel>
    <AlertDialogAction variant="destructive">Revoke</AlertDialogAction>
  </AlertDialogFooter>
</AlertDialogContent>`}
        />
      </section>

      {/* RTL */}
      <section id="rtl" className="scroll-mt-20 space-y-4">
        <h2 className="type-h2 text-[var(--text-main)]">RTL Support</h2>
        <p className="text-sm text-[var(--text-muted)]">
          Footer button hierarchy and text align in right-to-left layout mode.
        </p>
        <div dir="rtl" className="p-8 rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-card)] max-w-sm mx-auto space-y-3">
          <h4 className="text-sm font-semibold text-[var(--text-main)]">
            تأكيد حذف الحساب
          </h4>
          <p className="text-xs text-[var(--text-muted)]">
            سيتم مسح جميع الإعدادات وسجلات النشاط فوراً وبشكل نهائي.
          </p>
          <div className="flex items-center gap-2 pt-2">
            <button className="px-3 py-1.5 rounded-lg bg-red-500 text-white text-xs font-medium">
              تأكيد الحذف
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
                <td className="p-3 font-mono text-[var(--text-main)]">AlertDialogContent.size</td>
                <td className="p-3 font-mono">"default" | "sm"</td>
                <td className="p-3 font-mono">"default"</td>
                <td className="p-3">Controls modal maxWidth and padding constraints</td>
              </tr>
              <tr>
                <td className="p-3 font-mono text-[var(--text-main)]">AlertDialogMedia</td>
                <td className="p-3 font-mono">HTMLDivElement</td>
                <td className="p-3 font-mono">-</td>
                <td className="p-3">Slot for leading icon badge or security artwork</td>
              </tr>
              <tr>
                <td className="p-3 font-mono text-[var(--text-main)]">AlertDialogAction.variant</td>
                <td className="p-3 font-mono">"default" | "destructive"</td>
                <td className="p-3 font-mono">"default"</td>
                <td className="p-3">Visual styling for the primary confirmation button</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>
    </div>
  )
}
