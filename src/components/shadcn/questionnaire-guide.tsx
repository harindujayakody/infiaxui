import React, { useState } from "react"
import { CodeBlock } from "@/components/ui/code-block"
import { Button } from "@/components/shadcn/button"
import { Input } from "@/components/shadcn/input"
import { Check, ArrowRight, ArrowLeft, RotateCcw } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import { cn } from "@/lib/utils"

const QUESTIONS = [
  {
    name: "direction",
    prompt: "What should we prototype next?",
    description: "Choose a direction or write your own.",
    required: true,
    choices: [
      { value: "delegation", label: "Delegation", description: "Show how work moves to a specialist." },
      { value: "questions", label: "Question prompts", description: "Show choices while the interface waits." },
      { value: "both", label: "Both together", description: "Combine both capabilities." },
    ],
    allowCustom: true,
  },
  {
    name: "detail",
    prompt: "How much detail should it include?",
    description: "Skip this if you are not sure yet.",
    required: false,
    choices: [
      { value: "focused", label: "Focused prototype", description: "Narrow scope on the core workflow." },
      { value: "complete", label: "Complete end-to-end flow", description: "Full UI across all screens." },
    ],
    allowCustom: false,
  },
  {
    name: "tech",
    prompt: "Which framework do you prefer?",
    description: "Select all that apply to your stack.",
    required: true,
    multiple: true,
    choices: [
      { value: "react", label: "React / Next.js", description: "App Router with Tailwind CSS" },
      { value: "vue", label: "Vue / Nuxt", description: "Vue 3 with Composition API" },
      { value: "svelte", label: "Svelte / SvelteKit", description: "Svelte 5 runes" },
    ],
    allowCustom: false,
  },
]

export function QuestionnaireGuide() {
  const [currentStep, setCurrentStep] = useState(0)
  const [answers, setAnswers] = useState<Record<string, string | string[]>>({})
  const [customInput, setCustomInput] = useState("")
  const [isSubmitted, setIsSubmitted] = useState(false)

  const question = QUESTIONS[currentStep]
  const isLast = currentStep === QUESTIONS.length - 1
  const currentAnswer = answers[question?.name]

  const handleSelectChoice = (val: string) => {
    if (question.multiple) {
      const arr = Array.isArray(currentAnswer) ? [...currentAnswer] : []
      if (arr.includes(val)) {
        setAnswers({ ...answers, [question.name]: arr.filter((x) => x !== val) })
      } else {
        setAnswers({ ...answers, [question.name]: [...arr, val] })
      }
    } else {
      setAnswers({ ...answers, [question.name]: val })
      setCustomInput("")
    }
  }

  const handleNext = () => {
    if (currentStep < QUESTIONS.length - 1) {
      setCurrentStep(currentStep + 1)
    } else {
      setIsSubmitted(true)
    }
  }

  const handlePrev = () => {
    if (currentStep > 0) setCurrentStep(currentStep - 1)
  }

  const handleReset = () => {
    setCurrentStep(0)
    setAnswers({})
    setCustomInput("")
    setIsSubmitted(false)
  }

  return (
    <div className="space-y-12 pt-6 text-[var(--text-main)]">
      {/* Composition */}
      <section id="composition" className="scroll-mt-20 space-y-4">
        <h2 className="type-h2 text-[var(--text-main)]">Composition</h2>
        <p className="text-sm text-[var(--text-muted)]">
          Use the following composition to build a multi-step <code className="bg-[var(--bg-subtle)] text-[var(--text-main)] px-1.5 py-0.5 rounded text-xs font-mono">Questionnaire</code>:
        </p>
        <div className="rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-card)] p-4 font-mono text-xs text-[var(--text-muted)] space-y-0.5">
          {[
            "Questionnaire",
            "├── QuestionnaireProgress",
            "├── QuestionnaireItem",
            "│   ├── QuestionnaireTitle",
            "│   ├── QuestionnaireDescription",
            "│   ├── QuestionnaireChoices",
            "│   │   ├── QuestionnaireChoice",
            "│   │   └── QuestionnaireInput",
            "│   └── QuestionnaireError",
            "└── QuestionnaireActions",
            "    ├── QuestionnairePrevious",
            "    ├── QuestionnaireSkip",
            "    ├── QuestionnaireNext",
            "    └── QuestionnaireSubmit",
          ].map((l, i) => <div key={i}>{l}</div>)}
        </div>
      </section>

      {/* Interactive Live Demo */}
      <section id="demo" className="scroll-mt-20 space-y-4">
        <h2 className="type-h2 text-[var(--text-main)]">Live Demo</h2>
        <p className="text-sm text-[var(--text-muted)]">
          Interactive multi-step questionnaire with step progress, choices, custom input, and validation.
        </p>
        <div className="p-8 rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-card)]">
          <div className="max-w-md mx-auto space-y-6">
            {!isSubmitted ? (
              <>
                {/* Progress bar */}
                <div className="space-y-1.5">
                  <div className="flex justify-between text-xs text-[var(--text-muted)]">
                    <span>Question {currentStep + 1} of {QUESTIONS.length}</span>
                    <span>{Math.round(((currentStep + 1) / QUESTIONS.length) * 100)}% complete</span>
                  </div>
                  <div className="h-1.5 w-full bg-[var(--bg-subtle)] rounded-full overflow-hidden">
                    <motion.div
                      className="h-full bg-[var(--text-main)]"
                      initial={{ width: 0 }}
                      animate={{ width: `${((currentStep + 1) / QUESTIONS.length) * 100}%` }}
                      transition={{ duration: 0.3 }}
                    />
                  </div>
                </div>

                {/* Step Content */}
                <AnimatePresence mode="wait">
                  <motion.div
                    key={currentStep}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.2 }}
                    className="space-y-4"
                  >
                    <div>
                      <h3 className="text-base font-semibold text-[var(--text-main)]">
                        {question.prompt}
                        {question.required && <span className="text-red-400 ml-1">*</span>}
                      </h3>
                      <p className="text-xs text-[var(--text-muted)] mt-1">{question.description}</p>
                    </div>

                    <div className="space-y-2">
                      {question.choices.map((c) => {
                        const isSelected = question.multiple
                          ? Array.isArray(currentAnswer) && currentAnswer.includes(c.value)
                          : currentAnswer === c.value

                        return (
                          <div
                            key={c.value}
                            onClick={() => handleSelectChoice(c.value)}
                            className={cn(
                              "flex items-start gap-3 p-3.5 rounded-xl border cursor-pointer transition-all",
                              isSelected
                                ? "border-[var(--text-main)] bg-[var(--bg-subtle)]/40"
                                : "border-[var(--border-subtle)] hover:border-[var(--text-muted)]"
                            )}
                          >
                            <div className={cn(
                              "size-4 rounded-full border flex items-center justify-center shrink-0 mt-0.5",
                              isSelected ? "bg-[var(--text-main)] text-[var(--bg-page)] border-[var(--text-main)]" : "border-[var(--border-subtle)]"
                            )}>
                              {isSelected && <Check className="size-2.5" />}
                            </div>
                            <div>
                              <div className="text-xs font-semibold text-[var(--text-main)]">{c.label}</div>
                              <div className="text-[11px] text-[var(--text-muted)] mt-0.5">{c.description}</div>
                            </div>
                          </div>
                        )
                      })}

                      {question.allowCustom && (
                        <div className="pt-2">
                          <Input
                            placeholder="Or type another answer…"
                            value={customInput}
                            onChange={(e) => {
                              setCustomInput(e.target.value)
                              setAnswers({ ...answers, [question.name]: e.target.value })
                            }}
                            className="text-xs"
                          />
                        </div>
                      )}
                    </div>
                  </motion.div>
                </AnimatePresence>

                {/* Actions */}
                <div className="flex items-center justify-between pt-4 border-t border-[var(--border-subtle)]">
                  <Button
                    variant="ghost"
                    size="sm"
                    disabled={currentStep === 0}
                    onClick={handlePrev}
                  >
                    <ArrowLeft className="size-3.5 mr-1" />
                    Back
                  </Button>

                  <div className="flex items-center gap-2">
                    {!question.required && (
                      <Button variant="ghost" size="sm" onClick={handleNext}>
                        Skip
                      </Button>
                    )}
                    <Button size="sm" onClick={handleNext}>
                      {isLast ? "Submit" : "Next"}
                      <ArrowRight className="size-3.5 ml-1" />
                    </Button>
                  </div>
                </div>
              </>
            ) : (
              <div className="text-center py-8 space-y-4">
                <div className="size-12 rounded-full bg-emerald-500/10 text-emerald-400 flex items-center justify-center mx-auto">
                  <Check className="size-6" />
                </div>
                <div>
                  <h3 className="text-base font-semibold text-[var(--text-main)]">Thank you!</h3>
                  <p className="text-xs text-[var(--text-muted)] mt-1">Your answers have been recorded.</p>
                </div>
                <Button size="sm" variant="outline" onClick={handleReset}>
                  <RotateCcw className="size-3.5 mr-1.5" />
                  Restart Questionnaire
                </Button>
              </div>
            )}
          </div>
        </div>
        <CodeBlock
          language="tsx"
          code={`import {
  Questionnaire,
  QuestionnaireItem,
  QuestionnaireTitle,
  QuestionnaireDescription,
  QuestionnaireChoices,
  QuestionnaireChoice,
  QuestionnaireActions,
  QuestionnaireNext,
  QuestionnairePrevious,
  QuestionnaireSubmit,
} from "@/components/ui/questionnaire"

<Questionnaire items={items} onSubmit={handleSubmit}>
  <QuestionnaireProgress />
  {items.map((q) => (
    <QuestionnaireItem key={q.name} name={q.name} required={q.required}>
      <QuestionnaireTitle>{q.prompt}</QuestionnaireTitle>
      <QuestionnaireDescription>{q.description}</QuestionnaireDescription>
      <QuestionnaireChoices>
        {q.choices.map((c) => (
          <QuestionnaireChoice key={c.value} value={c.value}>
            {c.label}
          </QuestionnaireChoice>
        ))}
      </QuestionnaireChoices>
    </QuestionnaireItem>
  ))}
  <QuestionnaireActions>
    <QuestionnairePrevious />
    <QuestionnaireNext />
    <QuestionnaireSubmit />
  </QuestionnaireActions>
</Questionnaire>`}
        />
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
              <tr>
                <td className="p-3 font-mono text-[var(--text-main)]">Questionnaire</td>
                <td className="p-3">Root orchestrator managing steps, answers, validation, and progress</td>
              </tr>
              <tr>
                <td className="p-3 font-mono text-[var(--text-main)]">QuestionnaireItem</td>
                <td className="p-3">Renders semantic fieldset for an individual step question</td>
              </tr>
              <tr>
                <td className="p-3 font-mono text-[var(--text-main)]">QuestionnaireChoice</td>
                <td className="p-3">Checkable option preserving radio/checkbox accessibility</td>
              </tr>
              <tr>
                <td className="p-3 font-mono text-[var(--text-main)]">QuestionnaireActions</td>
                <td className="p-3">Navigation bar wrapping previous, skip, next, and submit buttons</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>
    </div>
  )
}
