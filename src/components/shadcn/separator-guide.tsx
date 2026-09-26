import React from 'react'
import { cn } from '@/lib/utils'
import { Separator } from '@/components/shadcn/separator'
import { CodeBlock } from '@/components/ui/code-block'

// ---------------------------------------------------------------------------
// Section wrapper
// ---------------------------------------------------------------------------
function Section({
  id,
  title,
  description,
  children,
}: {
  id: string
  title: string
  description?: string
  children: React.ReactNode
}) {
  return (
    <section id={id} className='scroll-mt-20 space-y-4'>
      <div>
        <h2 className='type-h2 text-[var(--text-main)]'>{title}</h2>
        {description && (
          <p className='text-sm text-[var(--text-muted)]'>{description}</p>
        )}
      </div>
      {children}
    </section>
  )
}

// ---------------------------------------------------------------------------
// Demo card wrapper
// ---------------------------------------------------------------------------
function Demo({
  className,
  children,
  dir,
}: {
  className?: string
  children: React.ReactNode
  dir?: string
}) {
  return (
    <div
      dir={dir}
      className={cn(
        'rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-card)] p-6',
        className,
      )}
    >
      {children}
    </div>
  )
}

// ---------------------------------------------------------------------------
// SeparatorGuide
// ---------------------------------------------------------------------------
export function SeparatorGuide() {
  return (
    <div className='space-y-16'>
      {/* ------------------------------------------------------------------ */}
      {/* Basic                                                               */}
      {/* ------------------------------------------------------------------ */}
      <Section
        id='basic'
        title='Basic'
        description='A horizontal separator used to visually divide two pieces of content.'
      >
        <Demo>
          <p className='text-sm text-[var(--text-main)]'>
            Above the separator — introductory content or a heading.
          </p>
          <Separator className='my-4' />
          <p className='text-sm text-[var(--text-muted)]'>
            Below the separator — secondary content or additional details.
          </p>
        </Demo>

        <CodeBlock
          language='tsx'
          code={`import { Separator } from '@/components/shadcn/separator'

<p>Above the separator</p>
<Separator className='my-4' />
<p>Below the separator</p>`}
        />
      </Section>

      {/* ------------------------------------------------------------------ */}
      {/* Vertical                                                            */}
      {/* ------------------------------------------------------------------ */}
      <Section
        id='vertical'
        title='Vertical'
        description='Vertical separators can be used between inline items such as navigation links.'
      >
        <Demo>
          <div className='flex items-center gap-4'>
            <span className='text-sm text-[var(--text-main)]'>Home</span>
            <Separator orientation='vertical' className='h-4' />
            <span className='text-sm text-[var(--text-main)]'>About</span>
            <Separator orientation='vertical' className='h-4' />
            <span className='text-sm text-[var(--text-main)]'>Contact</span>
          </div>
        </Demo>

        <CodeBlock
          language='tsx'
          code={`<div className='flex items-center gap-4'>
  <span>Home</span>
  <Separator orientation='vertical' className='h-4' />
  <span>About</span>
  <Separator orientation='vertical' className='h-4' />
  <span>Contact</span>
</div>`}
        />
      </Section>

      {/* ------------------------------------------------------------------ */}
      {/* Menu                                                                */}
      {/* ------------------------------------------------------------------ */}
      <Section
        id='menu'
        title='Menu'
        description='Settings card with rows separated by horizontal dividers.'
      >
        <Demo className='max-w-xs'>
          <div className='space-y-0'>
            {[
              { label: 'Profile', icon: '👤' },
              { label: 'Billing', icon: '💳' },
              { label: 'Settings', icon: '⚙️' },
              { label: 'Sign out', icon: '🚪' },
            ].map((item, i, arr) => (
              <React.Fragment key={item.label}>
                <div className='flex items-center gap-3 py-3 cursor-pointer hover:bg-[var(--bg-subtle)] -mx-2 px-2 rounded-md transition-colors'>
                  <span className='text-base'>{item.icon}</span>
                  <span className='text-sm text-[var(--text-main)]'>{item.label}</span>
                </div>
                {i < arr.length - 1 && <Separator />}
              </React.Fragment>
            ))}
          </div>
        </Demo>

        <CodeBlock
          language='tsx'
          code={`const items = ['Profile', 'Billing', 'Settings', 'Sign out']

{items.map((item, i) => (
  <React.Fragment key={item}>
    <div className='py-3'>{item}</div>
    {i < items.length - 1 && <Separator />}
  </React.Fragment>
))}`}
        />
      </Section>

      {/* ------------------------------------------------------------------ */}
      {/* List                                                                */}
      {/* ------------------------------------------------------------------ */}
      <Section
        id='list'
        title='List'
        description='A list of items separated by horizontal rules.'
      >
        <Demo className='max-w-sm'>
          <div>
            {[
              { title: 'Item one', sub: 'Supporting detail for item one' },
              { title: 'Item two', sub: 'Supporting detail for item two' },
              { title: 'Item three', sub: 'Supporting detail for item three' },
              { title: 'Item four', sub: 'Supporting detail for item four' },
            ].map((item, i, arr) => (
              <React.Fragment key={item.title}>
                <div className='py-3'>
                  <p className='text-sm font-medium text-[var(--text-main)]'>{item.title}</p>
                  <p className='text-xs text-[var(--text-muted)] mt-0.5'>{item.sub}</p>
                </div>
                {i < arr.length - 1 && <Separator />}
              </React.Fragment>
            ))}
          </div>
        </Demo>

        <CodeBlock
          language='tsx'
          code={`const items = [
  { title: 'Item one', sub: 'Detail one' },
  { title: 'Item two', sub: 'Detail two' },
  { title: 'Item three', sub: 'Detail three' },
  { title: 'Item four', sub: 'Detail four' },
]

{items.map((item, i) => (
  <React.Fragment key={item.title}>
    <div className='py-3'>
      <p>{item.title}</p>
      <p>{item.sub}</p>
    </div>
    {i < items.length - 1 && <Separator />}
  </React.Fragment>
))}`}
        />
      </Section>

      {/* ------------------------------------------------------------------ */}
      {/* With Label                                                          */}
      {/* ------------------------------------------------------------------ */}
      <Section
        id='with-label'
        title='With Label'
        description='A separator with a centered text label, commonly used as a visual "OR" divider.'
      >
        <Demo className='max-w-sm'>
          <div className='relative flex items-center'>
            <Separator />
            <span className='absolute left-1/2 -translate-x-1/2 bg-[var(--bg-card)] px-2 text-xs text-[var(--text-muted)]'>
              OR
            </span>
          </div>
        </Demo>

        <CodeBlock
          language='tsx'
          code={`<div className='relative flex items-center'>
  <Separator />
  <span className='absolute left-1/2 -translate-x-1/2 bg-[var(--bg-card)] px-2 text-xs text-[var(--text-muted)]'>
    OR
  </span>
</div>`}
        />
      </Section>

      {/* ------------------------------------------------------------------ */}
      {/* RTL                                                                 */}
      {/* ------------------------------------------------------------------ */}
      <Section
        id='rtl'
        title='RTL'
        description='Separator inside a right-to-left settings menu.'
      >
        <Demo className='max-w-xs' dir='rtl'>
          <div className='space-y-0'>
            {[
              { label: 'الملف الشخصي', icon: '👤' },
              { label: 'الفواتير', icon: '💳' },
              { label: 'الإعدادات', icon: '⚙️' },
              { label: 'تسجيل الخروج', icon: '🚪' },
            ].map((item, i, arr) => (
              <React.Fragment key={item.label}>
                <div className='flex items-center gap-3 py-3 cursor-pointer hover:bg-[var(--bg-subtle)] -mx-2 px-2 rounded-md transition-colors'>
                  <span className='text-base'>{item.icon}</span>
                  <span className='text-sm text-[var(--text-main)]'>{item.label}</span>
                </div>
                {i < arr.length - 1 && <Separator />}
              </React.Fragment>
            ))}
          </div>
        </Demo>

        <CodeBlock
          language='tsx'
          code={`<div dir='rtl'>
  {items.map((item, i) => (
    <React.Fragment key={item.label}>
      <div className='flex items-center gap-3 py-3'>
        <span>{item.icon}</span>
        <span>{item.label}</span>
      </div>
      {i < items.length - 1 && <Separator />}
    </React.Fragment>
  ))}
</div>`}
        />
      </Section>

      {/* ------------------------------------------------------------------ */}
      {/* API Reference                                                       */}
      {/* ------------------------------------------------------------------ */}
      <Section
        id='api'
        title='API Reference'
        description='Props accepted by the Separator component.'
      >
        <div className='rounded-xl border border-[var(--border-subtle)] overflow-hidden'>
          {/* Table header */}
          <div className='grid grid-cols-4 gap-0 bg-[var(--bg-subtle)]/60'>
            {['Prop', 'Type', 'Default', 'Description'].map((h) => (
              <div
                key={h}
                className='p-3 text-xs font-semibold text-[var(--text-muted)] border-b border-[var(--border-subtle)]'
              >
                {h}
              </div>
            ))}
          </div>
          {/* Row: orientation */}
          <div className='grid grid-cols-4 gap-0'>
            <div className='p-3 text-sm font-mono text-[var(--text-main)]'>orientation</div>
            <div className='p-3 text-sm text-[var(--text-muted)]'>
              <code>'horizontal' | 'vertical'</code>
            </div>
            <div className='p-3 text-sm text-[var(--text-muted)]'>
              <code>'horizontal'</code>
            </div>
            <div className='p-3 text-sm text-[var(--text-muted)]'>
              Controls whether the separator is drawn horizontally or vertically.
            </div>
          </div>
          {/* Row: className */}
          <div className='grid grid-cols-4 gap-0 bg-[var(--bg-subtle)]/30'>
            <div className='p-3 text-sm font-mono text-[var(--text-main)]'>className</div>
            <div className='p-3 text-sm text-[var(--text-muted)]'>string</div>
            <div className='p-3 text-sm text-[var(--text-muted)]'>—</div>
            <div className='p-3 text-sm text-[var(--text-muted)]'>
              Additional Tailwind classes merged via <code>cn()</code>.
            </div>
          </div>
          {/* Row: ...props */}
          <div className='grid grid-cols-4 gap-0'>
            <div className='p-3 text-sm font-mono text-[var(--text-main)]'>...props</div>
            <div className='p-3 text-sm text-[var(--text-muted)]'>HTMLDivElement</div>
            <div className='p-3 text-sm text-[var(--text-muted)]'>—</div>
            <div className='p-3 text-sm text-[var(--text-muted)]'>
              All native <code>div</code> attributes are forwarded.
            </div>
          </div>
        </div>
      </Section>
    </div>
  )
}
