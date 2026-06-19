import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import {
  ChevronLeft, ChevronRight, Plus, Trash2, StickyNote, FileText, Loader2, X,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useResearchStore } from '@/stores/researchStore'
import { useProjectSections } from '@/hooks/useProjectSections'
import { useProjectWikiItems } from '@/hooks/useResearchProjects'
import type { ResearchProject } from '@/hooks/useResearchProjects'
import {
  projectSections,
  sectionTemplate,
  type SubsectionTemplate,
} from '@/lib/researchProjectMeta'
import { wikiRoute, type WikiEntryRef } from '@/lib/wikiRoutes'

// A single section of a project, opened in its own page. Models call these
// "steps" (Data, Assumptions, …); documents call them "sections" (Introduction,
// Methodology, …). Each renders its template subsections, and to each subsection
// the user can pin resources saved to the project and write custom notes — the
// idea being the workflow walks them through the decisions the artifact needs.
export default function ProjectSectionView({ project, sectionKey }: { project: ResearchProject; sectionKey: string }) {
  const setOpenSection = useResearchStore(s => s.setOpenSection)
  const sections = projectSections(project.artifactType, project.documentType)
  const template = sectionTemplate(project.artifactType, project.documentType, sectionKey)
  const isModel = project.artifactType === 'model'
  const unitLabel = isModel ? 'Step' : 'Section'

  const index = sections.findIndex(s => s.key === sectionKey)
  const prev = index > 0 ? sections[index - 1] : null
  const next = index >= 0 && index < sections.length - 1 ? sections[index + 1] : null

  const sectionsApi = useProjectSections(project.id)
  const { items: wikiItems } = useProjectWikiItems(project.id)

  if (!template) {
    return (
      <div className="space-y-4">
        <BackToOverview onBack={() => setOpenSection(null)} />
        <p className="py-8 text-center text-sm text-muted-foreground">This section is no longer part of the project.</p>
      </div>
    )
  }

  // Sections without explicit subsections still get a single bucket so resources
  // and notes have somewhere to live (stored with subsection_key = null).
  const buckets: (SubsectionTemplate | null)[] =
    template.subsections.length > 0 ? [...template.subsections] : [null]

  return (
    <div className="space-y-5">
      <BackToOverview onBack={() => setOpenSection(null)} />

      <div className="space-y-1">
        <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
          {unitLabel} {index + 1} of {sections.length}
        </p>
        <h2 className="text-lg font-semibold">{template.title}</h2>
        <p className="text-sm text-muted-foreground">{template.hint}</p>
      </div>

      <div className="space-y-5">
        {buckets.map(bucket => (
          <SubsectionBlock
            key={bucket?.key ?? '_section'}
            sectionKey={sectionKey}
            subsection={bucket}
            wikiItems={wikiItems}
            api={sectionsApi}
          />
        ))}
      </div>

      <div className="flex items-center justify-between gap-2 border-t pt-4">
        {prev ? (
          <Button variant="ghost" className="gap-1" onClick={() => setOpenSection(prev.key)}>
            <ChevronLeft className="h-4 w-4" /> {prev.title}
          </Button>
        ) : <span />}
        {next ? (
          <Button variant="ghost" className="gap-1" onClick={() => setOpenSection(next.key)}>
            {next.title} <ChevronRight className="h-4 w-4" />
          </Button>
        ) : <span />}
      </div>
    </div>
  )
}

function BackToOverview({ onBack }: { onBack: () => void }) {
  return (
    <button
      type="button"
      onClick={onBack}
      className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground"
    >
      <ChevronLeft className="h-4 w-4" aria-hidden /> Project overview
    </button>
  )
}

type SectionsApi = ReturnType<typeof useProjectSections>

function SubsectionBlock({
  sectionKey,
  subsection,
  wikiItems,
  api,
}: {
  sectionKey: string
  subsection: SubsectionTemplate | null
  wikiItems: WikiEntryRef[]
  api: SectionsApi
}) {
  const subKey = subsection?.key ?? null
  const sameBucket = (sk: string | null) => sk === subKey

  const resources = api.resources.filter(r => r.sectionKey === sectionKey && sameBucket(r.subsectionKey))
  const notes = api.notes.filter(n => n.sectionKey === sectionKey && sameBucket(n.subsectionKey))

  return (
    <section className="space-y-3 rounded-lg border bg-card p-4">
      {subsection && <h3 className="text-sm font-semibold">{subsection.title}</h3>}

      {/* Resources pinned here */}
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">Resources</p>
          <AddResourceMenu
            wikiItems={wikiItems}
            existing={resources.map(r => r.ref)}
            onAdd={ref => api.addResource(sectionKey, subKey, ref)}
          />
        </div>
        {resources.length === 0 ? (
          <p className="text-xs text-muted-foreground">No resources yet.</p>
        ) : (
          <ul className="space-y-1">
            {resources.map(r => (
              <li key={r.id} className="flex items-center gap-2 rounded-md border bg-background px-2.5 py-1.5">
                <span className="rounded bg-accent px-1.5 py-0.5 text-[10px] font-medium uppercase text-muted-foreground">
                  {r.ref.kind}
                </span>
                <Link to={wikiRoute(r.ref)} className="min-w-0 flex-1 truncate text-sm hover:underline">
                  {r.ref.name}
                </Link>
                <button
                  type="button"
                  onClick={() => api.removeResource(r.id)}
                  className="shrink-0 rounded p-1 text-muted-foreground hover:bg-destructive/10 hover:text-destructive"
                  aria-label={`Remove ${r.ref.name}`}
                >
                  <X className="h-3.5 w-3.5" />
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* Notes */}
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <p className="flex items-center gap-1 text-xs font-medium uppercase tracking-wide text-muted-foreground">
            <StickyNote className="h-3 w-3" aria-hidden /> Notes
          </p>
          <button
            type="button"
            onClick={() => api.addNote(sectionKey, subKey, '')}
            className="inline-flex items-center gap-1 rounded-md border border-input px-2 py-1 text-xs text-muted-foreground hover:bg-accent/60 hover:text-foreground"
          >
            <Plus className="h-3 w-3" aria-hidden /> Add note
          </button>
        </div>
        {notes.length === 0 ? (
          <p className="text-xs text-muted-foreground">No notes yet.</p>
        ) : (
          <ul className="space-y-2">
            {notes.map(n => (
              <NoteEditor
                key={n.id}
                initialBody={n.body}
                onSave={body => api.updateNote(n.id, body)}
                onRemove={() => api.removeNote(n.id)}
              />
            ))}
          </ul>
        )}
      </div>
    </section>
  )
}

// A note block that saves on blur when its text changed, so the list isn't a
// pile of always-controlled inputs fighting the store on every keystroke.
function NoteEditor({
  initialBody,
  onSave,
  onRemove,
}: {
  initialBody: string
  onSave: (body: string) => Promise<void>
  onRemove: () => Promise<void>
}) {
  const [body, setBody] = useState(initialBody)
  const [saving, setSaving] = useState(false)

  async function handleBlur() {
    if (body === initialBody) return
    setSaving(true)
    await onSave(body)
    setSaving(false)
  }

  return (
    <li className="rounded-md border bg-background p-2">
      <textarea
        value={body}
        onChange={e => setBody(e.target.value)}
        onBlur={handleBlur}
        rows={2}
        placeholder="Write a note…"
        className="w-full resize-y bg-transparent text-[16px] outline-none sm:text-sm"
      />
      <div className="mt-1 flex items-center justify-end gap-2">
        {saving && <Loader2 className="h-3 w-3 animate-spin text-muted-foreground" aria-hidden />}
        <button
          type="button"
          onClick={onRemove}
          className="inline-flex items-center gap-1 rounded p-1 text-xs text-muted-foreground hover:text-destructive"
          aria-label="Delete note"
        >
          <Trash2 className="h-3.5 w-3.5" />
        </button>
      </div>
    </li>
  )
}

// Dropdown that adds a resource to this subsection from the project's saved
// pages. Excludes anything already pinned here.
function AddResourceMenu({
  wikiItems,
  existing,
  onAdd,
}: {
  wikiItems: WikiEntryRef[]
  existing: WikiEntryRef[]
  onAdd: (ref: WikiEntryRef) => Promise<void>
}) {
  const [open, setOpen] = useState(false)
  const available = useMemo(() => {
    const taken = new Set(existing.map(r => `${r.kind}:${r.name}`))
    return wikiItems.filter(w => !taken.has(`${w.kind}:${w.name}`))
  }, [wikiItems, existing])

  return (
    <div className="relative">
      <button
        type="button"
        onClick={() => setOpen(o => !o)}
        className="inline-flex items-center gap-1 rounded-md border border-input px-2 py-1 text-xs text-muted-foreground hover:bg-accent/60 hover:text-foreground"
      >
        <Plus className="h-3 w-3" aria-hidden /> Add resource
      </button>
      {open && (
        <>
          <div className="fixed inset-0 z-10" onClick={() => setOpen(false)} />
          <div className="absolute right-0 z-20 mt-1 max-h-64 w-64 overflow-y-auto rounded-md border bg-popover py-1 shadow-md">
            {wikiItems.length === 0 ? (
              <p className="flex items-start gap-2 px-3 py-2 text-xs text-muted-foreground">
                <FileText className="mt-0.5 h-3.5 w-3.5 shrink-0" aria-hidden />
                Save resources to the project first — then pin them here.
              </p>
            ) : available.length === 0 ? (
              <p className="px-3 py-2 text-xs text-muted-foreground">All saved resources are already here.</p>
            ) : (
              available.map(w => (
                <button
                  key={`${w.kind}:${w.name}`}
                  type="button"
                  onClick={async () => { await onAdd(w); setOpen(false) }}
                  className="flex w-full items-center gap-2 px-3 py-2 text-left text-sm hover:bg-accent"
                >
                  <span className="rounded bg-accent px-1.5 py-0.5 text-[10px] font-medium uppercase text-muted-foreground">
                    {w.kind}
                  </span>
                  <span className="min-w-0 flex-1 truncate">{w.name}</span>
                </button>
              ))
            )}
          </div>
        </>
      )}
    </div>
  )
}
