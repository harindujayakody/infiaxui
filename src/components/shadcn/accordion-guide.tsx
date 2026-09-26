import React from "react"
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/shadcn/accordion"
import { Card, CardContent } from "@/components/shadcn/card"
import { CodeBlock } from "@/components/ui/code-block"

export function AccordionGuide() {
  return (
    <div className="space-y-12 pt-6 text-[var(--text-main)]">
      {/* Composition */}
      <section id="composition" className="scroll-mt-20 space-y-4">
        <h2 className="type-h2 text-[var(--text-main)]">Composition</h2>
        <p className="text-sm text-[var(--text-muted)]">
          Use the following composition to build an <code className="bg-[var(--bg-subtle)] text-[var(--text-main)] px-1.5 py-0.5 rounded text-xs font-mono">Accordion</code>:
        </p>

        <CodeBlock
          language="txt"
          showLineNumbers={false}
          code={`Accordion
├── AccordionItem
│   ├── AccordionTrigger
│   └── AccordionContent
└── AccordionItem
    ├── AccordionTrigger
    └── AccordionContent`}
        />
      </section>

      {/* Basic */}
      <section id="basic" className="scroll-mt-20 space-y-4">
        <h2 className="type-h2 text-[var(--text-main)]">Basic</h2>
        <p className="text-sm text-[var(--text-muted)]">
          A basic accordion that shows one item at a time. The first item is open by default.
        </p>

        {/* Live Demo */}
        <div className="p-6 rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-card)]">
          <div className="max-w-md mx-auto">
            <Accordion type="single" defaultValue="item-1">
              <AccordionItem value="item-1">
                <AccordionTrigger>Is it accessible?</AccordionTrigger>
                <AccordionContent>
                  Yes. It adheres to the WAI-ARIA design pattern.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-2">
                <AccordionTrigger>Is it styled?</AccordionTrigger>
                <AccordionContent>
                  Yes. It comes with default styles that matches the other components&apos; aesthetic.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-3">
                <AccordionTrigger>Is it animated?</AccordionTrigger>
                <AccordionContent>
                  Yes. It&apos;s animated by default, but you can disable it if you prefer.
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
        </div>

        <CodeBlock
          language="tsx"
          code={`<Accordion defaultValue={["item-1"]}>
  <AccordionItem value="item-1">
    <AccordionTrigger>Is it accessible?</AccordionTrigger>
    <AccordionContent>
      Yes. It adheres to the WAI-ARIA design pattern.
    </AccordionContent>
  </AccordionItem>
  <AccordionItem value="item-2">
    <AccordionTrigger>Is it styled?</AccordionTrigger>
    <AccordionContent>
      Yes. It comes with default styles that matches the other components' aesthetic.
    </AccordionContent>
  </AccordionItem>
  <AccordionItem value="item-3">
    <AccordionTrigger>Is it animated?</AccordionTrigger>
    <AccordionContent>
      Yes. It's animated by default, but you can disable it if you prefer.
    </AccordionContent>
  </AccordionItem>
</Accordion>`}
        />
      </section>

      {/* Multiple */}
      <section id="multiple" className="scroll-mt-20 space-y-4">
        <h2 className="type-h2 text-[var(--text-main)]">Multiple</h2>
        <p className="text-sm text-[var(--text-muted)]">
          Use the <code className="bg-[var(--bg-subtle)] text-[var(--text-main)] px-1.5 py-0.5 rounded text-xs font-mono">multiple</code> prop to allow multiple items to be open at the same time.
        </p>

        {/* Live Demo */}
        <div className="p-6 rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-card)]">
          <div className="max-w-md mx-auto">
            <Accordion multiple defaultValue={["item-1", "item-2"]}>
              <AccordionItem value="item-1">
                <AccordionTrigger>What is Shadcn UI?</AccordionTrigger>
                <AccordionContent>
                  Beautifully designed components that you can copy and paste into your apps. Accessible. Customizable. Open Source.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-2">
                <AccordionTrigger>Can I use it with Next.js?</AccordionTrigger>
                <AccordionContent>
                  Yes! It works seamlessly with Next.js App Router, Vite, Remix, Astro, and any React setup.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-3">
                <AccordionTrigger>Is it free to use?</AccordionTrigger>
                <AccordionContent>
                  Yes. Free and open-source under the MIT license.
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
        </div>

        <CodeBlock
          language="tsx"
          code={`<Accordion multiple defaultValue={["item-1", "item-2"]}>
  <AccordionItem value="item-1">
    <AccordionTrigger>What is Shadcn UI?</AccordionTrigger>
    <AccordionContent>
      Beautifully designed components that you can copy and paste into your apps.
    </AccordionContent>
  </AccordionItem>
  <AccordionItem value="item-2">
    <AccordionTrigger>Can I use it with Next.js?</AccordionTrigger>
    <AccordionContent>
      Yes! It works seamlessly with Next.js App Router, Vite, Remix, and more.
    </AccordionContent>
  </AccordionItem>
</Accordion>`}
        />
      </section>

      {/* Disabled */}
      <section id="disabled" className="scroll-mt-20 space-y-4">
        <h2 className="type-h2 text-[var(--text-main)]">Disabled</h2>
        <p className="text-sm text-[var(--text-muted)]">
          Use the <code className="bg-[var(--bg-subtle)] text-[var(--text-main)] px-1.5 py-0.5 rounded text-xs font-mono">disabled</code> prop on <code className="bg-[var(--bg-subtle)] text-[var(--text-main)] px-1.5 py-0.5 rounded text-xs font-mono">AccordionItem</code> to disable individual items.
        </p>

        {/* Live Demo */}
        <div className="p-6 rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-card)]">
          <div className="max-w-md mx-auto">
            <Accordion type="single" defaultValue="item-1">
              <AccordionItem value="item-1">
                <AccordionTrigger>Active Item 1</AccordionTrigger>
                <AccordionContent>
                  This item is active and can be toggled normally.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-2" disabled>
                <AccordionTrigger>Disabled Item 2</AccordionTrigger>
                <AccordionContent>
                  This content is disabled and cannot be opened.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-3">
                <AccordionTrigger>Active Item 3</AccordionTrigger>
                <AccordionContent>
                  This item is also fully interactive.
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
        </div>

        <CodeBlock
          language="tsx"
          code={`<Accordion type="single" defaultValue="item-1">
  <AccordionItem value="item-1">
    <AccordionTrigger>Active Item 1</AccordionTrigger>
    <AccordionContent>This item is active.</AccordionContent>
  </AccordionItem>
  <AccordionItem value="item-2" disabled>
    <AccordionTrigger>Disabled Item 2</AccordionTrigger>
    <AccordionContent>This content cannot be opened.</AccordionContent>
  </AccordionItem>
</Accordion>`}
        />
      </section>

      {/* Borders */}
      <section id="borders" className="scroll-mt-20 space-y-4">
        <h2 className="type-h2 text-[var(--text-main)]">Borders</h2>
        <p className="text-sm text-[var(--text-muted)]">
          Add <code className="bg-[var(--bg-subtle)] text-[var(--text-main)] px-1.5 py-0.5 rounded text-xs font-mono">border</code> to the <code className="bg-[var(--bg-subtle)] text-[var(--text-main)] px-1.5 py-0.5 rounded text-xs font-mono">Accordion</code> and <code className="bg-[var(--bg-subtle)] text-[var(--text-main)] px-1.5 py-0.5 rounded text-xs font-mono">border-b last:border-b-0</code> to the <code className="bg-[var(--bg-subtle)] text-[var(--text-main)] px-1.5 py-0.5 rounded text-xs font-mono">AccordionItem</code> to add borders to the items.
        </p>

        {/* Live Demo */}
        <div className="p-6 rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-card)]">
          <div className="max-w-md mx-auto">
            <Accordion
              type="single"
              defaultValue="item-1"
              className="rounded-xl border border-[var(--border-subtle)] divide-y-0 px-4"
            >
              <AccordionItem value="item-1" className="border-b border-[var(--border-subtle)]">
                <AccordionTrigger>Bordered Item 1</AccordionTrigger>
                <AccordionContent>
                  Clean contained border around the accordion group.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-2" className="border-b-0">
                <AccordionTrigger>Bordered Item 2</AccordionTrigger>
                <AccordionContent>
                  Last item has border-b-0 to maintain clean container styling.
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
        </div>

        <CodeBlock
          language="tsx"
          code={`<Accordion
  type="single"
  defaultValue="item-1"
  className="rounded-xl border border-[var(--border-subtle)] px-4"
>
  <AccordionItem value="item-1" className="border-b border-[var(--border-subtle)]">
    <AccordionTrigger>Bordered Item 1</AccordionTrigger>
    <AccordionContent>Clean contained border.</AccordionContent>
  </AccordionItem>
  <AccordionItem value="item-2" className="border-b-0">
    <AccordionTrigger>Bordered Item 2</AccordionTrigger>
    <AccordionContent>Last item without bottom border.</AccordionContent>
  </AccordionItem>
</Accordion>`}
        />
      </section>

      {/* Card */}
      <section id="card" className="scroll-mt-20 space-y-4">
        <h2 className="type-h2 text-[var(--text-main)]">Card</h2>
        <p className="text-sm text-[var(--text-muted)]">
          Wrap the <code className="bg-[var(--bg-subtle)] text-[var(--text-main)] px-1.5 py-0.5 rounded text-xs font-mono">Accordion</code> in a <code className="bg-[var(--bg-subtle)] text-[var(--text-main)] px-1.5 py-0.5 rounded text-xs font-mono">Card</code> component.
        </p>

        {/* Live Demo */}
        <div className="p-6 rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-card)]">
          <div className="max-w-md mx-auto">
            <Card className="p-4 bg-[var(--bg-card)] border-[var(--border-subtle)] shadow-md">
              <CardContent className="p-0">
                <Accordion type="single" defaultValue="item-1">
                  <AccordionItem value="item-1">
                    <AccordionTrigger>Card Accordion 1</AccordionTrigger>
                    <AccordionContent>
                      Nested smoothly inside a styled Card container with padding.
                    </AccordionContent>
                  </AccordionItem>
                  <AccordionItem value="item-2" className="border-b-0">
                    <AccordionTrigger>Card Accordion 2</AccordionTrigger>
                    <AccordionContent>
                      Provides an elevated card background for your FAQ or navigation.
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              </CardContent>
            </Card>
          </div>
        </div>

        <CodeBlock
          language="tsx"
          code={`<Card className="p-4">
  <CardContent className="p-0">
    <Accordion type="single" defaultValue="item-1">
      <AccordionItem value="item-1">
        <AccordionTrigger>Card Accordion 1</AccordionTrigger>
        <AccordionContent>
          Nested smoothly inside a Card container.
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-2" className="border-b-0">
        <AccordionTrigger>Card Accordion 2</AccordionTrigger>
        <AccordionContent>
          Elevated card background.
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  </CardContent>
</Card>`}
        />
      </section>

      {/* RTL */}
      <section id="rtl" className="scroll-mt-20 space-y-4">
        <h2 className="type-h2 text-[var(--text-main)]">RTL</h2>
        <p className="text-sm text-[var(--text-muted)]">
          To enable RTL support in shadcn/ui, see the <a href="/docs/rtl" className="text-[var(--text-main)] underline font-medium hover:text-[var(--brand)]">RTL configuration guide</a>.
        </p>

        {/* Live Demo */}
        <div dir="rtl" className="p-6 rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-card)]">
          <div className="max-w-md mx-auto text-right">
            <Accordion type="single" defaultValue="item-1">
              <AccordionItem value="item-1">
                <AccordionTrigger>هل هو متوافق مع إمكانية الوصول؟</AccordionTrigger>
                <AccordionContent>
                  نعم. يتوافق تماماً مع نمط تصميم WAI-ARIA ويدعم لوحة المفاتيح وقارئات الشاشة.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-2" className="border-b-0">
                <AccordionTrigger>هل يمكن استخدامه مع React؟</AccordionTrigger>
                <AccordionContent>
                  نعم، متوافق مع كافة بيئات React و Next.js و Vite.
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
        </div>
      </section>

      {/* API Reference */}
      <section id="api-reference" className="scroll-mt-20 space-y-4">
        <h2 className="type-h2 text-[var(--text-main)]">API Reference</h2>
        <p className="text-sm text-[var(--text-muted)]">
          See the{" "}
          <a
            href="https://base-ui.com/react/components/accordion#api-reference"
            target="_blank"
            rel="noreferrer"
            className="text-[var(--text-main)] underline font-medium hover:text-[var(--brand)]"
          >
            Base UI Accordion documentation
          </a>{" "}
          for more information.
        </p>
      </section>
    </div>
  )
}
