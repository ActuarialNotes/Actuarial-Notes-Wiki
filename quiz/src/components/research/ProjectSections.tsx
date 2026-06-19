import { useMemo, useState } from 'react'
import {
  DndContext,
  closestCorners,
  MouseSensor,
  TouchSensor,
  useSensor,
  useSensors,
  useDraggable,
  useDroppable,
  type DragEndEvent,
} from '@dnd-kit/core'
import {
  arrayMove,
  SortableContext,
  useSortable,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import {
  ChevronRight, GripVertical, Plus, Trash2, StickyNote, FileText, X, Loader2, BookOpen,
} from 'lucide-react'
import { useConceptPopup } from '@/hooks/useConceptPopup'
import { useProjectSections, type SectionResource } from '@/hooks/useProjectSections'
import type { ResearchProject } from '@/hooks/useResearchProjects'
import { effectiveSections, makeSectionKey, type SectionTemplate, type SubsectionTemplate } from '@/lib/researchProjectMeta'
import { entryRefToRepoPath, type WikiEntryRef, type WikiEntryKind } from '@/lib/wikiRoutes'

// The body of a project: its sections, rendered as inline collapsible cards
// (no page navigation). Sections can be reordered by drag handle, added, and
// removed; resources can be dragged from one section/subsection to another;
// each resource opens the shared popup viewer when clicked.
export function ProjectSections({
  project,
  wikiItems,
  onSectionsChange,
}: {
  project: ResearchProject
  wikiItems: WikiEntryRef[]
  onSectionsChange: (sections: SectionTemplate[]) => Promise<void>
}) {
  const isModel = project.artifactType === 'model'
  const [sections, setSections] = useState<SectionTemplate[]>(() => effectiveSections(project))
  const api = useProjectSections(project.id)

  const sensors = useSensors(
    useSensor(MouseSensor, { activationConstraint: { distance: 5 } }),
    useSensor(TouchSensor, { activationConstraint: { delay: 250, tolerance: 5 } }),
  )

  function persist(next: SectionTemplate[]) {
    setSections(next)
    onSectionsChange(next)
  }

  function firstSubKey(sectionKey: string): string | null {
    const s = sections.find(x => x.key === sectionKey)
    return s?.subsections[0]?.key ?? null
  }

  function handleDragEnd(e: DragEndEvent) {
    const { active, over } = e
    if (!over) return
    const aType = active.data.current?.type
    const oData = over.data.current

    if (aType === 'section') {
      const overSectionKey = oData?.type === 'section' ? String(over.id) : oData?.sectionKey
      const oldIdx = sections.findIndex(s => s.key === active.id)
      const newIdx = sections.findIndex(s => s.key === overSectionKey)
      if (oldIdx < 0 || newIdx < 0 || oldIdx === newIdx) return
      persist(arrayMove(sections, oldIdx, newIdx))
      return
    }

    if (aType === 'resource') {
      let sectionKey: string | undefined
      let subsectionKey: string | null = null
      if (oData?.type === 'bucket') {
        sectionKey = oData.sectionKey
        subsectionKey = oData.subsectionKey ?? null
      } else if (oData?.type === 'section') {
        sectionKey = String(over.id)
        subsectionKey = firstSubKey(sectionKey)
      }
      if (!sectionKey) return
      const res = api.resources.find(r => r.id === active.id)
      if (!res || (res.sectionKey === sectionKey && res.subsectionKey === subsectionKey)) return
      api.moveResource(res.id, sectionKey, subsectionKey)
    }
  }

  function addSection() {
    const title = window.prompt('New section title:')?.trim()
    if (!title) return
    const key = makeSectionKey(title, sections.map(s => s.key))
    persist([...sections, { key, title, hint: '', subsections: [] }])
  }

  function removeSection(sectionKey: string) {
    const section = sections.find(s => s.key === sectionKey)
    if (!section) return
    if (!window.confirm(`Remove “${section.title}” and its resources and notes?`)) return
    persist(sections.filter(s => s.key !== sectionKey))
    api.removeSectionContent(sectionKey)
  }

  return (
    <div className="space-y-2">
      <h3 className="text-sm font-semibold text-muted-foreground">
        {isModel ? 'Model workflow' : 'Sections'}
      </h3>

      <DndContext sensors={sensors} collisionDetection={closestCorners} onDragEnd={handleDragEnd}>
        <SortableContext items={sections.map(s => s.key)} strategy={verticalListSortingStrategy}>
          <ol className="space-y-2">
            {sections.map((section, i) => (
              <SectionAccordion
                key={section.key}
                index={i}
                section={section}
                api={api}
                wikiItems={wikiItems}
                onRemove={() => removeSection(section.key)}
              />
            ))}
          </ol>
        </SortableContext>
      </DndContext>

      <button
        type="button"
        onClick={addSection}
        className="flex w-full items-center justify-center gap-1.5 rounded-lg border border-dashed border-input py-2.5 text-sm text-muted-foreground transition-colors hover:bg-accent/50 hover:text-foreground"
      >
        <Plus className="h-4 w-4" aria-hidden /> Add section
      </button>
    </div>
  )
}

type SectionsApi = ReturnType<typeof useProjectSections>

function SectionAccordion({
  index,
  section,
  api,
  wikiItems,
  onRemove,
}: {
  index: number
  section: SectionTemplate
  api: SectionsApi
  wikiItems: WikiEntryRef[]
  onRemove: () => void
}) {
  const [open, setOpen] = useState(false)
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({
    id: section.key,
    data: { type: 'section' },
  })
  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
    zIndex: isDragging ? 40 : undefined,
  }

  const resCount = api.resources.filter(r => r.sectionKey === section.key).length
  const noteCount = api.notes.filter(n => n.sectionKey === section.key).length
  const buckets: (SubsectionTemplate | null)[] =
    section.subsections.length > 0 ? [...section.subsections] : [null]

  return (
    <li ref={setNodeRef} style={style} className="overflow-hidden rounded-lg border bg-card">
      <div className="flex items-center gap-2 p-3">
        <button
          type="button"
          className="shrink-0 cursor-grab touch-none rounded p-1 text-muted-foreground hover:bg-accent active:cursor-grabbing"
          aria-label="Drag to reorder"
          {...attributes}
          {...listeners}
        >
          <GripVertical className="h-4 w-4" />
        </button>
        <button
          type="button"
          onClick={() => setOpen(o => !o)}
          aria-expanded={open}
          className="flex min-w-0 flex-1 items-center gap-3 text-left"
        >
          <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-accent text-xs font-semibold text-muted-foreground">
            {index + 1}
          </span>
          <span className="min-w-0 flex-1">
            <span className="block truncate text-sm font-medium">{section.title}</span>
            {section.hint && <span className="block truncate text-xs text-muted-foreground">{section.hint}</span>}
          </span>
          {(resCount > 0 || noteCount > 0) && (
            <span className="flex shrink-0 items-center gap-2 text-xs text-muted-foreground">
              {resCount > 0 && <span className="flex items-center gap-1"><BookOpen className="h-3 w-3" />{resCount}</span>}
              {noteCount > 0 && <span className="flex items-center gap-1"><StickyNote className="h-3 w-3" />{noteCount}</span>}
            </span>
          )}
          <ChevronRight className={`h-4 w-4 shrink-0 text-muted-foreground transition-transform ${open ? 'rotate-90' : ''}`} aria-hidden />
        </button>
        <button
          type="button"
          onClick={onRemove}
          className="shrink-0 rounded p-1 text-muted-foreground hover:bg-destructive/10 hover:text-destructive"
          aria-label={`Remove ${section.title}`}
        >
          <Trash2 className="h-4 w-4" />
        </button>
      </div>

      {open && (
        <div className="space-y-4 border-t bg-background/40 p-3">
          {buckets.map(bucket => (
            <SubsectionBucket
              key={bucket?.key ?? '_section'}
              sectionKey={section.key}
              subsection={bucket}
              api={api}
              wikiItems={wikiItems}
            />
          ))}
        </div>
      )}
    </li>
  )
}

function SubsectionBucket({
  sectionKey,
  subsection,
  api,
  wikiItems,
}: {
  sectionKey: string
  subsection: SubsectionTemplate | null
  api: SectionsApi
  wikiItems: WikiEntryRef[]
}) {
  const subKey = subsection?.key ?? null
  const { setNodeRef, isOver } = useDroppable({
    id: `bkt:${sectionKey}:${subKey ?? '_'}`,
    data: { type: 'bucket', sectionKey, subsectionKey: subKey },
  })

  const resources = api.resources.filter(r => r.sectionKey === sectionKey && r.subsectionKey === subKey)
  const notes = api.notes.filter(n => n.sectionKey === sectionKey && n.subsectionKey === subKey)

  return (
    <section
      ref={setNodeRef}
      className={`space-y-2 rounded-md border p-3 transition-colors ${isOver ? 'border-primary bg-primary/5' : 'border-border/60'}`}
    >
      {subsection && <h4 className="text-sm font-semibold">{subsection.title}</h4>}

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
          <p className="text-xs text-muted-foreground">Drag a resource here, or add one.</p>
        ) : (
          <div className="grid gap-2 sm:grid-cols-2">
            {resources.map(r => (
              <ResourceCard key={r.id} resource={r} onRemove={() => api.removeResource(r.id)} />
            ))}
          </div>
        )}
      </div>

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
        {notes.length > 0 && (
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

// Colored kind badge, mirroring the Resources-tab card tags.
const KIND_BADGE: Record<WikiEntryKind, string> = {
  concept: 'bg-violet-500/10 text-violet-700 dark:text-violet-300',
  resource: 'bg-emerald-500/10 text-emerald-700 dark:text-emerald-300',
  regulation: 'bg-blue-500/10 text-blue-700 dark:text-blue-300',
  event: 'bg-amber-500/10 text-amber-700 dark:text-amber-300',
  exam: 'bg-rose-500/10 text-rose-700 dark:text-rose-300',
}

// A draggable resource card that opens the popup viewer on click, styled like
// the cards on the Resources tab.
function ResourceCard({ resource, onRemove }: { resource: SectionResource; onRemove: () => void }) {
  const openWikiPage = useConceptPopup(s => s.openAt)
  const { attributes, listeners, setNodeRef, transform, isDragging } = useDraggable({
    id: resource.id,
    data: { type: 'resource' },
  })
  const style = {
    transform: CSS.Translate.toString(transform),
    opacity: isDragging ? 0.5 : 1,
    zIndex: isDragging ? 50 : undefined,
  }
  const { ref } = resource

  return (
    <div
      ref={setNodeRef}
      style={style}
      className="group flex items-center gap-2 rounded-lg border bg-card p-3 transition-colors hover:border-primary/40"
      {...attributes}
      {...listeners}
    >
      <button
        type="button"
        onClick={() => openWikiPage([ref], 0, entryRefToRepoPath(ref))}
        className="flex min-w-0 flex-1 flex-col items-start gap-1 text-left"
      >
        <span className={`rounded-full px-2 py-0.5 text-[10px] font-medium uppercase ${KIND_BADGE[ref.kind]}`}>
          {ref.kind}
        </span>
        <span className="line-clamp-2 text-sm font-medium text-foreground">{ref.name}</span>
      </button>
      <button
        type="button"
        onClick={e => { e.stopPropagation(); onRemove() }}
        onPointerDown={e => e.stopPropagation()}
        className="shrink-0 rounded p-1 text-muted-foreground opacity-0 transition-opacity hover:bg-destructive/10 hover:text-destructive group-hover:opacity-100"
        aria-label={`Remove ${ref.name}`}
      >
        <X className="h-3.5 w-3.5" />
      </button>
    </div>
  )
}

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
