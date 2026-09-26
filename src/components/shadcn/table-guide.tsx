import React, { useState } from "react"
import { CodeBlock } from "@/components/ui/code-block"
import {
  Table,
  TableHeader,
  TableBody,
  TableFooter,
  TableHead,
  TableRow,
  TableCell,
} from "@/components/shadcn/table"
import { MoreHorizontal, ArrowUpDown, Copy, Trash2, ExternalLink } from "lucide-react"

// ---------- Simple dropdown for actions ----------
function ActionMenu({ onCopy, onDelete }: { onCopy: () => void; onDelete: () => void }) {
  const [open, setOpen] = useState(false)

  return (
    <div className="relative">
      <button
        onClick={() => setOpen(!open)}
        className="size-7 flex items-center justify-center rounded-md text-[var(--text-muted)] hover:text-[var(--text-main)] hover:bg-[var(--bg-subtle)] transition-colors"
      >
        <MoreHorizontal className="size-4" />
      </button>
      {open && (
        <>
          <div className="fixed inset-0 z-40" onClick={() => setOpen(false)} />
          <div className="absolute right-0 top-8 z-50 w-40 rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-card)] shadow-xl overflow-hidden text-xs">
            <button
              onClick={() => { onCopy(); setOpen(false) }}
              className="flex items-center gap-2 w-full px-3 py-2 text-[var(--text-main)] hover:bg-[var(--bg-subtle)] transition-colors"
            >
              <Copy className="size-3.5 text-[var(--text-muted)]" />
              Copy ID
            </button>
            <button
              onClick={() => setOpen(false)}
              className="flex items-center gap-2 w-full px-3 py-2 text-[var(--text-main)] hover:bg-[var(--bg-subtle)] transition-colors"
            >
              <ExternalLink className="size-3.5 text-[var(--text-muted)]" />
              View details
            </button>
            <div className="border-t border-[var(--border-subtle)]" />
            <button
              onClick={() => { onDelete(); setOpen(false) }}
              className="flex items-center gap-2 w-full px-3 py-2 text-red-400 hover:bg-red-500/10 transition-colors"
            >
              <Trash2 className="size-3.5" />
              Delete
            </button>
          </div>
        </>
      )}
    </div>
  )
}

// ---------- Status badge ----------
function StatusBadge({ status }: { status: string }) {
  const styles: Record<string, string> = {
    Paid: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
    Pending: "bg-amber-500/10 text-amber-400 border-amber-500/20",
    Unpaid: "bg-red-500/10 text-red-400 border-red-500/20",
    Processing: "bg-sky-500/10 text-sky-400 border-sky-500/20",
  }
  return (
    <span className={`px-2 py-0.5 rounded-full text-[10px] font-medium border ${styles[status] || "bg-[var(--bg-subtle)] text-[var(--text-muted)]"}`}>
      {status}
    </span>
  )
}

// ---------- Sample data ----------
const INVOICES = [
  { id: "INV001", status: "Paid", method: "Credit Card", amount: "$250.00" },
  { id: "INV002", status: "Pending", method: "PayPal", amount: "$150.00" },
  { id: "INV003", status: "Unpaid", method: "Bank Transfer", amount: "$350.00" },
  { id: "INV004", status: "Processing", method: "Stripe", amount: "$450.00" },
  { id: "INV005", status: "Paid", method: "Credit Card", amount: "$550.00" },
]

export function TableGuide() {
  const [copied, setCopied] = useState<string | null>(null)
  const [sortDir, setSortDir] = useState<"asc" | "desc" | null>(null)

  const sortedInvoices = [...INVOICES].sort((a, b) => {
    if (!sortDir) return 0
    const av = parseFloat(a.amount.replace(/[$,]/g, ""))
    const bv = parseFloat(b.amount.replace(/[$,]/g, ""))
    return sortDir === "asc" ? av - bv : bv - av
  })

  return (
    <div className="space-y-12 pt-6 text-[var(--text-main)]">

      {/* Composition */}
      <section id="composition" className="scroll-mt-20 space-y-4">
        <h2 className="type-h2 text-[var(--text-main)]">Composition</h2>
        <p className="text-sm text-[var(--text-muted)]">
          Use the following composition to build a <code className="bg-[var(--bg-subtle)] text-[var(--text-main)] px-1.5 py-0.5 rounded text-xs font-mono">Table</code>:
        </p>
        <div className="rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-card)] p-4 font-mono text-xs text-[var(--text-muted)] space-y-0.5">
          <div>Table</div>
          <div className="pl-4">├── TableCaption</div>
          <div className="pl-4">├── TableHeader</div>
          <div className="pl-8">└── TableRow</div>
          <div className="pl-12">├── TableHead × N</div>
          <div className="pl-4">├── TableBody</div>
          <div className="pl-8">└── TableRow × N</div>
          <div className="pl-12">└── TableCell × N</div>
          <div className="pl-4">└── TableFooter</div>
        </div>
      </section>

      {/* Basic */}
      <section id="basic" className="scroll-mt-20 space-y-4">
        <h2 className="type-h2 text-[var(--text-main)]">Basic</h2>
        <p className="text-sm text-[var(--text-muted)]">
          A simple invoice table with a <code className="bg-[var(--bg-subtle)] text-[var(--text-main)] px-1.5 py-0.5 rounded text-xs font-mono">TableCaption</code>.
        </p>
        <div className="rounded-xl border border-[var(--border-subtle)] overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[100px]">Invoice</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Method</TableHead>
                <TableHead className="text-right">Amount</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {INVOICES.slice(0, 3).map((inv) => (
                <TableRow key={inv.id}>
                  <TableCell className="font-medium font-mono">{inv.id}</TableCell>
                  <TableCell><StatusBadge status={inv.status} /></TableCell>
                  <TableCell>{inv.method}</TableCell>
                  <TableCell className="text-right font-mono">{inv.amount}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
        <CodeBlock
          language="tsx"
          code={`import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

<Table>
  <TableCaption>A list of your recent invoices.</TableCaption>
  <TableHeader>
    <TableRow>
      <TableHead className="w-[100px]">Invoice</TableHead>
      <TableHead>Status</TableHead>
      <TableHead>Method</TableHead>
      <TableHead className="text-right">Amount</TableHead>
    </TableRow>
  </TableHeader>
  <TableBody>
    <TableRow>
      <TableCell className="font-medium">INV001</TableCell>
      <TableCell>Paid</TableCell>
      <TableCell>Credit Card</TableCell>
      <TableCell className="text-right">$250.00</TableCell>
    </TableRow>
  </TableBody>
</Table>`}
        />
      </section>

      {/* Footer */}
      <section id="footer" className="scroll-mt-20 space-y-4">
        <h2 className="type-h2 text-[var(--text-main)]">Footer</h2>
        <p className="text-sm text-[var(--text-muted)]">
          Use the <code className="bg-[var(--bg-subtle)] text-[var(--text-main)] px-1.5 py-0.5 rounded text-xs font-mono">TableFooter</code> component to add a totals row.
        </p>
        <div className="rounded-xl border border-[var(--border-subtle)] overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[100px]">Invoice</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Method</TableHead>
                <TableHead className="text-right">Amount</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {INVOICES.map((inv) => (
                <TableRow key={inv.id}>
                  <TableCell className="font-medium font-mono">{inv.id}</TableCell>
                  <TableCell><StatusBadge status={inv.status} /></TableCell>
                  <TableCell>{inv.method}</TableCell>
                  <TableCell className="text-right font-mono">{inv.amount}</TableCell>
                </TableRow>
              ))}
            </TableBody>
            <TableFooter>
              <TableRow>
                <TableCell colSpan={3} className="font-semibold">Total</TableCell>
                <TableCell className="text-right font-mono font-semibold">$1,750.00</TableCell>
              </TableRow>
            </TableFooter>
          </Table>
        </div>
        <CodeBlock
          language="tsx"
          code={`<TableFooter>
  <TableRow>
    <TableCell colSpan={3}>Total</TableCell>
    <TableCell className="text-right">$1,750.00</TableCell>
  </TableRow>
</TableFooter>`}
        />
      </section>

      {/* Actions */}
      <section id="actions" className="scroll-mt-20 space-y-4">
        <h2 className="type-h2 text-[var(--text-main)]">Actions</h2>
        <p className="text-sm text-[var(--text-muted)]">
          A table with per-row action menus using a <code className="bg-[var(--bg-subtle)] text-[var(--text-main)] px-1.5 py-0.5 rounded text-xs font-mono">DropdownMenu</code>. Click the ⋯ to try it live.
        </p>
        <div className="rounded-xl border border-[var(--border-subtle)] overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[100px]">Invoice</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>
                  <button
                    className="flex items-center gap-1 hover:text-[var(--text-main)] transition-colors text-xs font-medium"
                    onClick={() => setSortDir(d => d === "asc" ? "desc" : "asc")}
                  >
                    Amount
                    <ArrowUpDown className="size-3.5" />
                  </button>
                </TableHead>
                <TableHead className="w-10" />
              </TableRow>
            </TableHeader>
            <TableBody>
              {sortedInvoices.map((inv) => (
                <TableRow key={inv.id}>
                  <TableCell className="font-medium font-mono">{inv.id}</TableCell>
                  <TableCell><StatusBadge status={inv.status} /></TableCell>
                  <TableCell className="font-mono">
                    {inv.amount}
                    {copied === inv.id && (
                      <span className="ml-2 text-[10px] text-emerald-400 font-sans">Copied!</span>
                    )}
                  </TableCell>
                  <TableCell>
                    <ActionMenu
                      onCopy={() => {
                        navigator.clipboard.writeText(inv.id)
                        setCopied(inv.id)
                        setTimeout(() => setCopied(null), 1500)
                      }}
                      onDelete={() => {}}
                    />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
        <CodeBlock
          language="tsx"
          code={`import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { MoreHorizontal } from "lucide-react"

<TableCell>
  <DropdownMenu>
    <DropdownMenuTrigger asChild>
      <Button variant="ghost" size="icon">
        <MoreHorizontal className="size-4" />
      </Button>
    </DropdownMenuTrigger>
    <DropdownMenuContent align="end">
      <DropdownMenuItem onClick={() => navigator.clipboard.writeText(id)}>
        Copy ID
      </DropdownMenuItem>
      <DropdownMenuItem>View details</DropdownMenuItem>
      <DropdownMenuItem className="text-destructive">Delete</DropdownMenuItem>
    </DropdownMenuContent>
  </DropdownMenu>
</TableCell>`}
        />
      </section>

      {/* RTL */}
      <section id="rtl" className="scroll-mt-20 space-y-4">
        <h2 className="type-h2 text-[var(--text-main)]">RTL</h2>
        <p className="text-sm text-[var(--text-muted)]">
          Tables support RTL layout. Add <code className="bg-[var(--bg-subtle)] text-[var(--text-main)] px-1.5 py-0.5 rounded text-xs font-mono">dir="rtl"</code> to the wrapper. See the <a href="/docs/rtl" className="underline hover:text-[var(--text-main)]">RTL configuration guide</a>.
        </p>
        <div dir="rtl" className="rounded-xl border border-[var(--border-subtle)] overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>الفاتورة</TableHead>
                <TableHead>الحالة</TableHead>
                <TableHead>طريقة الدفع</TableHead>
                <TableHead className="text-left">المبلغ</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {INVOICES.slice(0, 3).map((inv) => (
                <TableRow key={inv.id}>
                  <TableCell className="font-mono">{inv.id}</TableCell>
                  <TableCell><StatusBadge status={inv.status} /></TableCell>
                  <TableCell>{inv.method}</TableCell>
                  <TableCell className="text-left font-mono">{inv.amount}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
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
                <th className="p-3 font-semibold">Description</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[var(--border-subtle)] text-[var(--text-muted)]">
              {[
                ["Table", "Root wrapper rendered as <table>"],
                ["TableHeader", "Renders <thead>"],
                ["TableBody", "Renders <tbody>"],
                ["TableFooter", "Renders <tfoot> for totals"],
                ["TableRow", "Renders <tr>"],
                ["TableHead", "Renders <th> in the header"],
                ["TableCell", "Renders <td> in the body"],
                ["TableCaption", "Renders <caption> above the table"],
              ].map(([comp, desc]) => (
                <tr key={comp}>
                  <td className="p-3 font-mono text-[var(--text-main)]">{comp}</td>
                  <td className="p-3">{desc}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

    </div>
  )
}
