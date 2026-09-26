import React, { useState, useMemo } from "react"
import { ArrowUpDown, ChevronDown, MoreHorizontal, Check, Copy } from "lucide-react"
import { Checkbox } from "@/components/shadcn/checkbox"
import { Button } from "@/components/shadcn/button"
import { Input } from "@/components/shadcn/input"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/shadcn/table"
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuCheckboxItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
} from "@/components/shadcn/dropdown-menu"

export interface Payment {
  id: string
  amount: number
  status: "pending" | "processing" | "success" | "failed"
  email: string
}

const INITIAL_PAYMENTS: Payment[] = [
  {
    id: "m5gr84i9",
    amount: 316,
    status: "success",
    email: "ken99@example.com",
  },
  {
    id: "3u1reuv4",
    amount: 242,
    status: "success",
    email: "abe45@example.com",
  },
  {
    id: "derv1ws0",
    amount: 837,
    status: "processing",
    email: "monserrat44@example.com",
  },
  {
    id: "5kma53ae",
    amount: 874,
    status: "success",
    email: "silas22@example.com",
  },
  {
    id: "bhqecj4p",
    amount: 721,
    status: "failed",
    email: "carmella@example.com",
  },
]

export function DataTableDemo() {
  const [filterText, setFilterText] = useState("")
  const [sortDirection, setSortDirection] = useState<"asc" | "desc" | null>(null)
  const [selectedRowIds, setSelectedRowIds] = useState<Set<string>>(new Set())
  const [columnVisibility, setColumnVisibility] = useState({
    status: true,
    email: true,
    amount: true,
  })
  const [copiedId, setCopiedId] = useState<string | null>(null)

  // Filter and sort payments
  const filteredPayments = useMemo(() => {
    let list = INITIAL_PAYMENTS.filter((p) =>
      p.email.toLowerCase().includes(filterText.toLowerCase())
    )

    if (sortDirection === "asc") {
      list = [...list].sort((a, b) => a.email.localeCompare(b.email))
    } else if (sortDirection === "desc") {
      list = [...list].sort((a, b) => b.email.localeCompare(a.email))
    }

    return list
  }, [filterText, sortDirection])

  const toggleSort = () => {
    if (sortDirection === "asc") {
      setSortDirection("desc")
    } else if (sortDirection === "desc") {
      setSortDirection(null)
    } else {
      setSortDirection("asc")
    }
  }

  const isAllSelected =
    filteredPayments.length > 0 &&
    filteredPayments.every((p) => selectedRowIds.has(p.id))

  const isSomeSelected =
    filteredPayments.some((p) => selectedRowIds.has(p.id)) && !isAllSelected

  const toggleSelectAll = (checked: boolean) => {
    if (checked) {
      setSelectedRowIds(new Set(filteredPayments.map((p) => p.id)))
    } else {
      setSelectedRowIds(new Set())
    }
  }

  const toggleSelectRow = (id: string, checked: boolean) => {
    const next = new Set(selectedRowIds)
    if (checked) {
      next.add(id)
    } else {
      next.delete(id)
    }
    setSelectedRowIds(next)
  }

  const handleCopyPaymentId = (id: string) => {
    navigator.clipboard.writeText(id)
    setCopiedId(id)
    setTimeout(() => setCopiedId(null), 2000)
  }

  return (
    <div className="w-full space-y-4">
      {/* Top Filter and Column Visibility Controls */}
      <div className="flex items-center justify-between gap-4">
        <Input
          placeholder="Filter emails..."
          value={filterText}
          onChange={(e) => setFilterText(e.target.value)}
          className="max-w-sm h-9 bg-[var(--bg-page)]/70 border-[var(--border-subtle)] text-xs text-[var(--text-main)] placeholder:text-[var(--text-muted)]/70 rounded-lg focus:ring-1 focus:ring-[var(--brand)]"
        />

        <DropdownMenu>
          <DropdownMenuTrigger className="h-9 px-3.5 py-1.5 rounded-lg border border-[var(--border-subtle)] bg-[var(--bg-card)] hover:bg-[var(--bg-subtle)] text-xs text-[var(--text-main)] font-medium transition-colors flex items-center gap-1.5 shadow-sm">
            <span>Columns</span>
            <ChevronDown className="size-3.5 text-[var(--text-muted)]" />
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-36">
            <DropdownMenuCheckboxItem
              checked={columnVisibility.status}
              onCheckedChange={(checked) =>
                setColumnVisibility((prev) => ({ ...prev, status: !!checked }))
              }
            >
              Status
            </DropdownMenuCheckboxItem>
            <DropdownMenuCheckboxItem
              checked={columnVisibility.email}
              onCheckedChange={(checked) =>
                setColumnVisibility((prev) => ({ ...prev, email: !!checked }))
              }
            >
              Email
            </DropdownMenuCheckboxItem>
            <DropdownMenuCheckboxItem
              checked={columnVisibility.amount}
              onCheckedChange={(checked) =>
                setColumnVisibility((prev) => ({ ...prev, amount: !!checked }))
              }
            >
              Amount
            </DropdownMenuCheckboxItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      {/* Table Container */}
      <div className="overflow-hidden rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-card)] shadow-md">
        <Table>
          <TableHeader>
            <TableRow className="border-b border-[var(--border-subtle)] bg-[var(--bg-page)]/40 hover:bg-transparent">
              <TableHead className="w-12 px-4">
                <Checkbox
                  checked={isAllSelected}
                  indeterminate={isSomeSelected}
                  onChange={(e) => toggleSelectAll(e.target.checked)}
                  aria-label="Select all rows"
                />
              </TableHead>
              {columnVisibility.status && (
                <TableHead className="text-xs font-semibold text-[var(--text-main)]">
                  Status
                </TableHead>
              )}
              {columnVisibility.email && (
                <TableHead className="text-xs font-semibold text-[var(--text-main)]">
                  <button
                    type="button"
                    onClick={toggleSort}
                    className="inline-flex items-center gap-1.5 font-semibold text-[var(--text-main)] hover:text-[var(--brand)] transition-colors cursor-pointer -ml-2 px-2 py-1 rounded-md hover:bg-[var(--bg-subtle)]"
                  >
                    <span>Email</span>
                    <ArrowUpDown className="size-3.5 text-[var(--text-muted)]" />
                  </button>
                </TableHead>
              )}
              {columnVisibility.amount && (
                <TableHead className="text-right text-xs font-semibold text-[var(--text-main)] pr-4">
                  Amount
                </TableHead>
              )}
              <TableHead className="w-12 px-2" />
            </TableRow>
          </TableHeader>

          <TableBody>
            {filteredPayments.length > 0 ? (
              filteredPayments.map((payment) => {
                const isSelected = selectedRowIds.has(payment.id)
                const formattedAmount = new Intl.NumberFormat("en-US", {
                  style: "currency",
                  currency: "USD",
                }).format(payment.amount)

                return (
                  <TableRow
                    key={payment.id}
                    data-state={isSelected ? "selected" : undefined}
                    className={`border-b border-[var(--border-subtle)] transition-colors hover:bg-[var(--bg-subtle)]/50 ${
                      isSelected ? "bg-[var(--bg-subtle)]/40" : ""
                    }`}
                  >
                    <TableCell className="w-12 px-4 py-3">
                      <Checkbox
                        checked={isSelected}
                        onChange={(e) =>
                          toggleSelectRow(payment.id, e.target.checked)
                        }
                        aria-label={`Select row ${payment.email}`}
                      />
                    </TableCell>

                    {columnVisibility.status && (
                      <TableCell className="py-3 text-xs capitalize text-[var(--text-main)] font-normal">
                        {payment.status}
                      </TableCell>
                    )}

                    {columnVisibility.email && (
                      <TableCell className="py-3 text-xs font-mono text-[var(--text-main)] lowercase">
                        {payment.email}
                      </TableCell>
                    )}

                    {columnVisibility.amount && (
                      <TableCell className="py-3 text-right text-xs font-mono font-medium text-[var(--text-main)] pr-4">
                        {formattedAmount}
                      </TableCell>
                    )}

                    <TableCell className="w-12 px-2 py-3 text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger className="size-8 p-0 rounded-lg inline-flex items-center justify-center text-[var(--text-muted)] hover:text-[var(--text-main)] hover:bg-[var(--bg-subtle)] transition-colors">
                          <span className="sr-only">Open menu</span>
                          <MoreHorizontal className="size-4" />
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end" className="w-44">
                          <DropdownMenuLabel>Actions</DropdownMenuLabel>
                          <DropdownMenuItem
                            onClick={() => handleCopyPaymentId(payment.id)}
                            className="flex items-center justify-between"
                          >
                            <span>Copy payment ID</span>
                            {copiedId === payment.id && (
                              <Check className="size-3 text-emerald-400" />
                            )}
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem>View customer</DropdownMenuItem>
                          <DropdownMenuItem>View payment details</DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                )
              })
            ) : (
              <TableRow>
                <TableCell
                  colSpan={5}
                  className="h-24 text-center text-xs text-[var(--text-muted)]"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      {/* Bottom Bar: Selection Count & Pagination Controls */}
      <div className="flex items-center justify-between pt-1 text-xs">
        <div className="text-[var(--text-muted)]">
          {selectedRowIds.size} of {filteredPayments.length} row(s) selected.
        </div>
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            disabled={true}
            className="h-8 px-3 rounded-lg border-[var(--border-subtle)] bg-[var(--bg-card)] text-xs text-[var(--text-muted)] opacity-50 cursor-not-allowed"
          >
            Previous
          </Button>
          <Button
            variant="outline"
            size="sm"
            disabled={true}
            className="h-8 px-3 rounded-lg border-[var(--border-subtle)] bg-[var(--bg-card)] text-xs text-[var(--text-muted)] opacity-50 cursor-not-allowed"
          >
            Next
          </Button>
        </div>
      </div>
    </div>
  )
}
