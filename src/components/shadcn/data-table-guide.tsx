import React from "react"
import { CodeBlock } from "@/components/ui/code-block"
import { Lightbulb, Info, FileText, CheckCircle2 } from "lucide-react"

export function DataTableGuide() {
  return (
    <div className="space-y-12 pt-6 text-[var(--text-main)]">
      {/* Introduction */}
      <section id="introduction" className="scroll-mt-20 space-y-4">
        <h2 className="type-h2 text-[var(--text-main)]">Introduction</h2>
        <p className="text-sm text-[var(--text-muted)] leading-relaxed">
          Every data table or datagrid I&apos;ve created has been unique. They all behave differently, have specific sorting and filtering requirements, and work with different data sources.
        </p>
        <p className="text-sm text-[var(--text-muted)] leading-relaxed">
          It doesn&apos;t make sense to combine all of these variations into a single component. If we do that, we&apos;ll lose the flexibility that{" "}
          <a
            href="https://tanstack.com/table/latest/docs/overview#what-is-headless-ui"
            target="_blank"
            rel="noreferrer"
            className="text-[var(--text-main)] underline font-medium hover:text-[var(--brand)]"
          >
            headless UI
          </a>{" "}
          provides.
        </p>
        <p className="text-sm text-[var(--text-muted)] leading-relaxed">
          So instead of a data-table component, I thought it would be more helpful to provide a guide on how to build your own.
        </p>
        <p className="text-sm text-[var(--text-muted)] leading-relaxed">
          We&apos;ll start with the basic <code className="bg-[var(--bg-subtle)] text-[var(--text-main)] px-1.5 py-0.5 rounded text-xs">&lt;Table /&gt;</code> component and build a complex data table from scratch.
        </p>

        {/* Tip Callout */}
        <div className="flex items-start gap-3 rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-card)] p-4 text-xs text-[var(--text-muted)] shadow-sm">
          <Lightbulb className="size-4 shrink-0 text-amber-400 mt-0.5" />
          <div>
            <strong className="text-[var(--text-main)] font-semibold">Tip:</strong> If you find yourself using the same table in multiple places in your app, you can always extract it into a reusable component.
          </div>
        </div>
      </section>

      {/* Table of Contents */}
      <section id="table-of-contents" className="scroll-mt-20 space-y-4">
        <h2 className="type-h2 text-[var(--text-main)]">Table of Contents</h2>
        <p className="text-sm text-[var(--text-muted)]">
          This guide will show you how to use{" "}
          <a
            href="https://tanstack.com/table"
            target="_blank"
            rel="noreferrer"
            className="text-[var(--text-main)] underline font-medium hover:text-[var(--brand)]"
          >
            TanStack Table
          </a>{" "}
          and the <code className="bg-[var(--bg-subtle)] text-[var(--text-main)] px-1.5 py-0.5 rounded text-xs">&lt;Table /&gt;</code> component to build your own custom data table. We&apos;ll cover the following topics:
        </p>

        <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs font-mono">
          {[
            { title: "Set up Table Features", href: "#set-up-table-features" },
            { title: "Basic Table", href: "#basic-table" },
            { title: "Row Actions", href: "#row-actions" },
            { title: "Pagination", href: "#pagination" },
            { title: "Sorting", href: "#sorting" },
            { title: "Filtering", href: "#filtering" },
            { title: "Visibility", href: "#visibility" },
            { title: "Row Selection", href: "#row-selection" },
            { title: "Reusable Components", href: "#reusable-components" },
          ].map((item) => (
            <li key={item.href}>
              <a
                href={item.href}
                className="flex items-center gap-2 p-2 rounded-lg border border-[var(--border-subtle)] bg-[var(--bg-card)] hover:bg-[var(--bg-subtle)] hover:text-[var(--text-main)] transition-colors text-[var(--text-muted)]"
              >
                <FileText className="size-3.5 text-[var(--text-muted)] shrink-0" />
                <span>{item.title}</span>
              </a>
            </li>
          ))}
        </ul>
      </section>

      {/* Installation */}
      <section id="installation" className="scroll-mt-20 space-y-5">
        <h2 className="type-h2 text-[var(--text-main)]">Installation</h2>

        <div className="space-y-4">
          <div className="space-y-2">
            <p className="text-xs text-[var(--text-main)] font-medium">
              1. Add the <code className="bg-[var(--bg-subtle)] px-1.5 py-0.5 rounded">&lt;Table /&gt;</code> component to your project:
            </p>
            <CodeBlock
              language="bash"
              code="npx @infiax/ui add table"
              showLineNumbers={false}
            />
          </div>

          <div className="space-y-2">
            <p className="text-xs text-[var(--text-main)] font-medium">
              2. Add the <code className="bg-[var(--bg-subtle)] px-1.5 py-0.5 rounded">@tanstack/react-table</code> dependency. This guide uses <strong>TanStack Table v9</strong>:
            </p>
            <CodeBlock
              language="bash"
              code="npm install @tanstack/react-table"
              showLineNumbers={false}
            />
          </div>
        </div>
      </section>

      {/* Prerequisites */}
      <section id="prerequisites" className="scroll-mt-20 space-y-4">
        <h2 className="type-h2 text-[var(--text-main)]">Prerequisites</h2>
        <p className="text-sm text-[var(--text-muted)]">
          We are going to build a table to show recent payments. Here&apos;s what our data looks like:
        </p>

        <CodeBlock
          language="tsx"
          fileName="types/payment.ts"
          code={`type Payment = {
  id: string
  amount: number
  status: "pending" | "processing" | "success" | "failed"
  email: string
}

export const payments: Payment[] = [
  {
    id: "728ed52f",
    amount: 100,
    status: "pending",
    email: "m@example.com",
  },
  {
    id: "489e1d42",
    amount: 125,
    status: "processing",
    email: "example@gmail.com",
  },
  // ...
]`}
        />
      </section>

      {/* Project Structure */}
      <section id="project-structure" className="scroll-mt-20 space-y-4">
        <h2 className="type-h2 text-[var(--text-main)]">Project Structure</h2>
        <p className="text-sm text-[var(--text-muted)]">
          Start by creating the following file structure:
        </p>

        <CodeBlock
          language="txt"
          showLineNumbers={false}
          code={`app
└── payments
    ├── columns.tsx
    ├── data-table-features.ts
    ├── data-table.tsx
    └── page.tsx`}
        />

        <p className="text-xs text-[var(--text-muted)] leading-relaxed">
          I&apos;m using a Next.js example here but this works for any other React framework.
        </p>
        <ul className="list-disc list-inside space-y-1 text-xs text-[var(--text-muted)]">
          <li><code className="text-[var(--text-main)]">columns.tsx</code> (client component) will contain our column definitions.</li>
          <li><code className="text-[var(--text-main)]">data-table-features.ts</code> will contain the shared <code className="text-[var(--text-main)]">features</code> object that tells TanStack Table which behavior to enable.</li>
          <li><code className="text-[var(--text-main)]">data-table.tsx</code> (client component) will contain our <code className="text-[var(--text-main)]">&lt;DataTable /&gt;</code> component.</li>
          <li><code className="text-[var(--text-main)]">page.tsx</code> (server component) is where we&apos;ll fetch data and render our table.</li>
        </ul>
      </section>

      {/* Set up Table Features */}
      <section id="set-up-table-features" className="scroll-mt-20 space-y-4">
        <h2 className="type-h2 text-[var(--text-main)]">Set up Table Features</h2>
        <p className="text-sm text-[var(--text-muted)] leading-relaxed">
          TanStack Table v9 is feature-based: you opt into the behavior you want — sorting, filtering, pagination, and so on — by declaring it with <code className="bg-[var(--bg-subtle)] text-[var(--text-main)] px-1.5 py-0.5 rounded text-xs">tableFeatures()</code>. Anything you don&apos;t list is tree-shaken out of your bundle.
        </p>

        <CodeBlock
          language="tsx"
          fileName="app/payments/data-table-features.ts"
          code={`import {
  columnFilteringFeature,
  columnVisibilityFeature,
  createFilteredRowModel,
  createPaginatedRowModel,
  createSortedRowModel,
  filterFn_includesString,
  rowPaginationFeature,
  rowSelectionFeature,
  rowSortingFeature,
  sortFn_alphanumeric,
  sortFn_text,
  tableFeatures,
} from "@tanstack/react-table"

// New in v9: declare the features this table uses — anything you don't
// register is tree-shaken out of the bundle.
export const features = tableFeatures({
  columnFilteringFeature,
  columnVisibilityFeature,
  rowPaginationFeature,
  rowSelectionFeature,
  rowSortingFeature,
  filteredRowModel: createFilteredRowModel(),
  paginatedRowModel: createPaginatedRowModel(),
  sortedRowModel: createSortedRowModel(),
  filterFns: { includesString: filterFn_includesString },
  sortFns: { alphanumeric: sortFn_alphanumeric, text: sortFn_text },
})

// Pass this as the first generic argument to \`ColumnDef\`, \`Column\`, \`Table\`,
// and \`Row\` so each type knows which feature APIs are available.
export type DataTableFeatures = typeof features`}
        />

        <div className="flex items-start gap-3 rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-card)] p-4 text-xs text-[var(--text-muted)] shadow-sm">
          <Info className="size-4 shrink-0 text-blue-400 mt-0.5" />
          <div>
            <strong className="text-[var(--text-main)] font-semibold">Note:</strong> The core row model is always included, so you never register it yourself. Row models for optional features are created with <code className="text-[var(--text-main)]">create*RowModel()</code> and registered on the features object — there are no more <code className="text-[var(--text-main)]">get*RowModel</code> table options.
          </div>
        </div>
      </section>

      {/* Basic Table */}
      <section id="basic-table" className="scroll-mt-20 space-y-6">
        <h2 className="type-h2 text-[var(--text-main)]">Basic Table</h2>
        <p className="text-sm text-[var(--text-muted)]">
          Let&apos;s start by building a basic table.
        </p>

        {/* 1. Column Definitions */}
        <div className="space-y-3">
          <h3 className="type-h3 text-[var(--text-main)]">Column Definitions</h3>
          <p className="text-xs text-[var(--text-muted)]">
            First, we&apos;ll define our columns in <code className="text-[var(--text-main)]">columns.tsx</code>:
          </p>
          <CodeBlock
            language="tsx"
            fileName="app/payments/columns.tsx"
            code={`"use client"

import { createColumnHelper } from "@tanstack/react-table"
import { type DataTableFeatures } from "./data-table-features"

export type Payment = {
  id: string
  amount: number
  status: "pending" | "processing" | "success" | "failed"
  email: string
}

// Use \`accessor\` for data columns and \`display\` for columns without one.
const columnHelper = createColumnHelper<DataTableFeatures, Payment>()

export const columns = columnHelper.columns([
  columnHelper.accessor("status", {
    header: "Status",
  }),
  columnHelper.accessor("email", {
    header: "Email",
  }),
  columnHelper.accessor("amount", {
    header: "Amount",
  }),
])`}
          />
        </div>

        {/* 2. DataTable Component */}
        <div className="space-y-3">
          <h3 className="type-h3 text-[var(--text-main)]">&lt;DataTable /&gt; component</h3>
          <p className="text-xs text-[var(--text-muted)]">
            Next, we&apos;ll create a <code className="text-[var(--text-main)]">&lt;DataTable /&gt;</code> component to render our table.
          </p>
          <CodeBlock
            language="tsx"
            fileName="app/payments/data-table.tsx"
            code={`"use client"

import { useTable, type ColumnDef, type RowData } from "@tanstack/react-table"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { features, type DataTableFeatures } from "./data-table-features"

interface DataTableProps<TData extends RowData> {
  columns: ColumnDef<DataTableFeatures, TData>[]
  data: TData[]
}

export function DataTable<TData extends RowData>({
  columns,
  data,
}: DataTableProps<TData>) {
  const table = useTable({
    features,
    data,
    columns,
  })

  return (
    <div className="overflow-hidden rounded-md border">
      <Table>
        <TableHeader>
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <TableHead key={header.id}>
                  {header.isPlaceholder ? null : (
                    <table.FlexRender header={header} />
                  )}
                </TableHead>
              ))}
            </TableRow>
          ))}
        </TableHeader>
        <TableBody>
          {table.getRowModel().rows?.length ? (
            table.getRowModel().rows.map((row) => (
              <TableRow
                key={row.id}
                data-state={row.getIsSelected() && "selected"}
              >
                {row.getVisibleCells().map((cell) => (
                  <TableCell key={cell.id}>
                    <table.FlexRender cell={cell} />
                  </TableCell>
                ))}
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={columns.length} className="h-24 text-center">
                No results.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  )
}`}
          />
        </div>

        {/* 3. Render Table */}
        <div className="space-y-3">
          <h3 className="type-h3 text-[var(--text-main)]">Render the table</h3>
          <p className="text-xs text-[var(--text-muted)]">
            Finally, we&apos;ll render our table in our page component.
          </p>
          <CodeBlock
            language="tsx"
            fileName="app/payments/page.tsx"
            code={`import { columns, Payment } from "./columns"
import { DataTable } from "./data-table"

async function getData(): Promise<Payment[]> {
  // Fetch data from your API here.
  return [
    {
      id: "728ed52f",
      amount: 100,
      status: "pending",
      email: "m@example.com",
    },
    // ...
  ]
}

export default async function DemoPage() {
  const data = await getData()

  return (
    <div className="container mx-auto py-10">
      <DataTable columns={columns} data={data} />
    </div>
  )
}`}
          />
        </div>
      </section>

      {/* Cell Formatting */}
      <section id="cell-formatting" className="scroll-mt-20 space-y-4">
        <h2 className="type-h2 text-[var(--text-main)]">Cell Formatting</h2>
        <p className="text-sm text-[var(--text-muted)]">
          Let&apos;s format the amount cell to display the dollar amount and right-align it.
        </p>

        <CodeBlock
          language="tsx"
          fileName="app/payments/columns.tsx"
          code={`export const columns = columnHelper.columns([
  columnHelper.accessor("amount", {
    header: () => <div className="text-right">Amount</div>,
    cell: ({ row }) => {
      const amount = parseFloat(row.getValue("amount"))
      const formatted = new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
      }).format(amount)

      return <div className="text-right font-medium">{formatted}</div>
    },
  }),
])`}
        />
      </section>

      {/* Row Actions */}
      <section id="row-actions" className="scroll-mt-20 space-y-4">
        <h2 className="type-h2 text-[var(--text-main)]">Row Actions</h2>
        <p className="text-sm text-[var(--text-muted)]">
          Let&apos;s add row actions to our table using a <code className="bg-[var(--bg-subtle)] text-[var(--text-main)] px-1.5 py-0.5 rounded text-xs">&lt;DropdownMenu /&gt;</code> component.
        </p>

        <CodeBlock
          language="tsx"
          fileName="app/payments/columns.tsx"
          code={`"use client"

import { createColumnHelper } from "@tanstack/react-table"
import { MoreHorizontal } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

export const columns = columnHelper.columns([
  // ...
  columnHelper.display({
    id: "actions",
    cell: ({ row }) => {
      const payment = row.original

      return (
        <DropdownMenu>
          <DropdownMenuTrigger
            render={<Button variant="ghost" className="h-8 w-8 p-0" />}
          >
            <span className="sr-only">Open menu</span>
            <MoreHorizontal className="h-4 w-4" />
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem
              onClick={() => navigator.clipboard.writeText(payment.id)}
            >
              Copy payment ID
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>View customer</DropdownMenuItem>
            <DropdownMenuItem>View payment details</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )
    },
  }),
])`}
        />
      </section>

      {/* Pagination */}
      <section id="pagination" className="scroll-mt-20 space-y-4">
        <h2 className="type-h2 text-[var(--text-main)]">Pagination</h2>
        <p className="text-sm text-[var(--text-muted)]">
          Because our features object includes <code className="bg-[var(--bg-subtle)] text-[var(--text-main)] px-1.5 py-0.5 rounded text-xs">rowPaginationFeature</code>, the table automatically paginates rows. We can add pagination controls using <code className="bg-[var(--bg-subtle)] text-[var(--text-main)] px-1.5 py-0.5 rounded text-xs">&lt;Button /&gt;</code> and <code className="bg-[var(--bg-subtle)] text-[var(--text-main)] px-1.5 py-0.5 rounded text-xs">table.previousPage()</code>, <code className="bg-[var(--bg-subtle)] text-[var(--text-main)] px-1.5 py-0.5 rounded text-xs">table.nextPage()</code>.
        </p>

        <CodeBlock
          language="tsx"
          fileName="app/payments/data-table.tsx"
          code={`import { Button } from "@/components/ui/button"

export function DataTable<TData extends RowData>({
  columns,
  data,
}: DataTableProps<TData>) {
  const table = useTable({
    features,
    data,
    columns,
  })

  return (
    <div>
      <div className="overflow-hidden rounded-md border">
        <Table>{/* ... */}</Table>
      </div>
      <div className="flex items-center justify-end space-x-2 py-4">
        <Button
          variant="outline"
          size="sm"
          onClick={() => table.previousPage()}
          disabled={!table.getCanPreviousPage()}
        >
          Previous
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={() => table.nextPage()}
          disabled={!table.getCanNextPage()}
        >
          Next
        </Button>
      </div>
    </div>
  )
}`}
        />
      </section>

      {/* Sorting */}
      <section id="sorting" className="scroll-mt-20 space-y-4">
        <h2 className="type-h2 text-[var(--text-main)]">Sorting</h2>
        <p className="text-sm text-[var(--text-muted)]">
          Wire up sorting state in <code className="text-[var(--text-main)]">data-table.tsx</code> and add sort toggle controls to the column header.
        </p>

        <CodeBlock
          language="tsx"
          fileName="app/payments/columns.tsx"
          code={`"use client"

import { createColumnHelper } from "@tanstack/react-table"
import { ArrowUpDown } from "lucide-react"
import { Button } from "@/components/ui/button"

export const columns = columnHelper.columns([
  columnHelper.accessor("email", {
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Email
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
  }),
])`}
        />
      </section>

      {/* Filtering */}
      <section id="filtering" className="scroll-mt-20 space-y-4">
        <h2 className="type-h2 text-[var(--text-main)]">Filtering</h2>
        <p className="text-sm text-[var(--text-muted)]">
          Add an input field to filter emails in real time:
        </p>

        <CodeBlock
          language="tsx"
          fileName="app/payments/data-table.tsx"
          code={`<div className="flex items-center py-4">
  <Input
    placeholder="Filter emails..."
    value={(table.getColumn("email")?.getFilterValue() as string) ?? ""}
    onChange={(event) =>
      table.getColumn("email")?.setFilterValue(event.target.value)
    }
    className="max-w-sm"
  />
</div>`}
        />
      </section>

      {/* Visibility */}
      <section id="visibility" className="scroll-mt-20 space-y-4">
        <h2 className="type-h2 text-[var(--text-main)]">Visibility</h2>
        <p className="text-sm text-[var(--text-muted)]">
          Toggle column visibility with a dropdown menu:
        </p>

        <CodeBlock
          language="tsx"
          fileName="app/payments/data-table.tsx"
          code={`<DropdownMenu>
  <DropdownMenuTrigger render={<Button variant="outline" className="ml-auto" />}>
    Columns
  </DropdownMenuTrigger>
  <DropdownMenuContent align="end">
    {table
      .getAllColumns()
      .filter((column) => column.getCanHide())
      .map((column) => (
        <DropdownMenuCheckboxItem
          key={column.id}
          className="capitalize"
          checked={column.getIsVisible()}
          onCheckedChange={(value) => column.toggleVisibility(!!value)}
        >
          {column.id}
        </DropdownMenuCheckboxItem>
      ))}
  </DropdownMenuContent>
</DropdownMenu>`}
        />
      </section>

      {/* Row Selection */}
      <section id="row-selection" className="scroll-mt-20 space-y-4">
        <h2 className="type-h2 text-[var(--text-main)]">Row Selection</h2>
        <p className="text-sm text-[var(--text-muted)]">
          Add a checkbox column for selecting rows and display the count of selected rows:
        </p>

        <CodeBlock
          language="tsx"
          fileName="app/payments/columns.tsx"
          code={`columnHelper.display({
  id: "select",
  header: ({ table }) => (
    <Checkbox
      checked={table.getIsAllPageRowsSelected()}
      indeterminate={
        table.getIsSomePageRowsSelected() && !table.getIsAllPageRowsSelected()
      }
      onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
      aria-label="Select all"
    />
  ),
  cell: ({ row }) => (
    <Checkbox
      checked={row.getIsSelected()}
      onCheckedChange={(value) => row.toggleSelected(!!value)}
      aria-label="Select row"
    />
  ),
  enableSorting: false,
  enableHiding: false,
})`}
        />

        <div className="pt-2">
          <p className="text-xs text-[var(--text-muted)] pb-2">Showing selected rows count:</p>
          <CodeBlock
            language="tsx"
            code={`<div className="flex-1 text-sm text-muted-foreground">
  {table.getFilteredSelectedRowModel().rows.length} of{" "}
  {table.getFilteredRowModel().rows.length} row(s) selected.
</div>`}
          />
        </div>
      </section>

      {/* Reusable Components */}
      <section id="reusable-components" className="scroll-mt-20 space-y-4">
        <h2 className="type-h2 text-[var(--text-main)]">Reusable Components</h2>
        <p className="text-sm text-[var(--text-muted)]">
          Modular components to plug into any data table:
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-4 rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-card)] space-y-2">
            <h4 className="type-caption font-semibold text-[var(--text-main)]">DataTableColumnHeader</h4>
            <p className="text-xs text-[var(--text-muted)]">Sort and hide controls built into any column header.</p>
          </div>
          <div className="p-4 rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-card)] space-y-2">
            <h4 className="type-caption font-semibold text-[var(--text-main)]">DataTablePagination</h4>
            <p className="text-xs text-[var(--text-muted)]">Advanced pagination controls with page size and selection.</p>
          </div>
          <div className="p-4 rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-card)] space-y-2">
            <h4 className="type-caption font-semibold text-[var(--text-main)]">DataTableViewOptions</h4>
            <p className="text-xs text-[var(--text-muted)]">Dropdown view options component to toggle column visibility.</p>
          </div>
        </div>
      </section>
    </div>
  )
}

