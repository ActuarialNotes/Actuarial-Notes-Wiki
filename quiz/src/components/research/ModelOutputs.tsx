import { useState } from 'react'
import { Check } from 'lucide-react'
import { MODEL_OUTPUTS, CODE_LANGUAGES } from '@/lib/researchProjectMeta'

interface ModelOutputsProps {
  outputs: string[]
  codeLanguage: string | null
  onSave: (outputs: string[], codeLanguage: string | null) => Promise<void>
}

// The Outputs panel for a Model project: pick which artifacts the model
// generates — Documentation and/or Code — and, when Code is selected, the target
// language (R, Python, or Excel). Selections persist to the project immediately
// (research_projects.model_outputs / model_code_language). Generation itself is
// gated behind the research assistant and surfaced as "coming soon" for now.
export function ModelOutputs({ outputs, codeLanguage, onSave }: ModelOutputsProps) {
  const [saving, setSaving] = useState(false)
  const codeSelected = outputs.includes('code')

  async function persist(nextOutputs: string[], nextLang: string | null) {
    setSaving(true)
    await onSave(nextOutputs, nextLang)
    setSaving(false)
  }

  function toggleOutput(slug: string) {
    const next = outputs.includes(slug) ? outputs.filter(o => o !== slug) : [...outputs, slug]
    // Default a language when Code is first turned on; clear it when turned off.
    const nextLang = next.includes('code') ? (codeLanguage ?? 'python') : null
    persist(next, nextLang)
  }

  return (
    <section className="space-y-3 rounded-lg bg-card p-4">
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-semibold">Outputs</h3>
        {saving && <span className="text-xs text-muted-foreground">Saving…</span>}
      </div>
      <p className="text-xs text-muted-foreground">Choose what this model generates.</p>

      <div className="grid gap-2 sm:grid-cols-2">
        {MODEL_OUTPUTS.map(o => {
          const active = outputs.includes(o.slug)
          const Icon = o.icon
          return (
            <button
              key={o.slug}
              type="button"
              onClick={() => toggleOutput(o.slug)}
              className={`flex items-start gap-3 rounded-lg border p-3 text-left transition-colors ${
                active ? 'border-primary bg-primary/5' : 'border-input hover:bg-accent/50'
              }`}
            >
              <span
                className={`mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-md ${
                  active ? 'bg-primary/10 text-primary' : 'bg-accent text-muted-foreground'
                }`}
              >
                <Icon className="h-4 w-4" />
              </span>
              <span className="min-w-0">
                <span className="flex items-center gap-1.5 text-sm font-medium">
                  {active && <Check className="h-3.5 w-3.5 text-primary" aria-hidden />}
                  {o.label}
                </span>
                <span className="mt-0.5 block text-xs text-muted-foreground">{o.description}</span>
              </span>
            </button>
          )
        })}
      </div>

      {codeSelected && (
        <div className="space-y-2">
          <p className="text-xs font-medium text-muted-foreground">Language</p>
          <div className="flex flex-wrap gap-2">
            {CODE_LANGUAGES.map(l => {
              const active = codeLanguage === l.slug
              const Icon = l.icon
              return (
                <button
                  key={l.slug}
                  type="button"
                  onClick={() => persist(outputs, l.slug)}
                  className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-sm transition-colors ${
                    active
                      ? 'border-primary bg-primary/10 text-primary'
                      : 'border-input text-muted-foreground hover:bg-accent/60 hover:text-foreground'
                  }`}
                >
                  <Icon className="h-3.5 w-3.5" aria-hidden /> {l.label}
                </button>
              )
            })}
          </div>
        </div>
      )}

      {outputs.length > 0 && (
        <button
          type="button"
          disabled
          title="Generation is coming soon"
          className="w-full cursor-not-allowed rounded-md border border-dashed border-input py-2 text-sm text-muted-foreground"
        >
          Generate {outputs.map(o => MODEL_OUTPUTS.find(m => m.slug === o)?.label).filter(Boolean).join(' & ')} — coming soon
        </button>
      )}
    </section>
  )
}
