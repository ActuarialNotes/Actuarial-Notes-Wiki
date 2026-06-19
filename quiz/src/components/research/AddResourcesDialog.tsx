import { useEffect, useMemo, useState } from 'react'
import { X, Search } from 'lucide-react'
import { useResearchStore } from '@/stores/researchStore'
import { useResearchProjects, useProjectDocuments, useProjectWikiItems } from '@/hooks/useResearchProjects'
import type { WikiEntryRef } from '@/lib/wikiRoutes'
import ResourcesView from '@/pages/Research/ResourcesView'

interface AddResourcesDialogProps {
  projectId: string
  onClose: () => void
  // Called after a resource is added so the project view can refetch.
  onMutated: () => void
}

// A full "Add resources" surface, opened as a popup within a project instead of
// navigating away to the Resources tab. It renders the very same corpus browser
// (timeline + cards) the Resources tab uses, in "add to this project" mode, so
// adding sources never loses the user's place in the project.
export function AddResourcesDialog({ projectId, onClose, onMutated }: AddResourcesDialogProps) {
  const searchQuery = useResearchStore(s => s.searchQuery)
  const setSearchQuery = useResearchStore(s => s.setSearchQuery)
  const { addDocument, addWikiItem } = useResearchProjects()
  const [docRefreshKey, setDocRefreshKey] = useState(0)
  const [wikiRefreshKey, setWikiRefreshKey] = useState(0)
  const { documentIds: addToProjectIds } = useProjectDocuments(projectId, docRefreshKey)
  const { items: addedWikiItems } = useProjectWikiItems(projectId, wikiRefreshKey)
  const addedWikiKeys = useMemo(
    () => new Set(addedWikiItems.map(item => `${item.kind}:${item.name}`)),
    [addedWikiItems],
  )

  // Reset the shared keyword query on open/close so the dialog starts clean and
  // doesn't leak a query back into the Resources tab.
  useEffect(() => {
    setSearchQuery('')
    function onKey(e: KeyboardEvent) { if (e.key === 'Escape') onClose() }
    document.addEventListener('keydown', onKey)
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = prev
      setSearchQuery('')
    }
  }, [onClose, setSearchQuery])

  const handleAddToProject = async (documentId: string) => {
    await addDocument(projectId, documentId)
    setDocRefreshKey(k => k + 1)
    onMutated()
  }

  const handleAddWikiItem = async (ref: WikiEntryRef) => {
    await addWikiItem(projectId, ref)
    setWikiRefreshKey(k => k + 1)
    onMutated()
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-end justify-center bg-black/50 p-0 sm:items-center sm:p-4"
      role="dialog"
      aria-modal="true"
      aria-label="Add resources"
      onMouseDown={e => { if (e.target === e.currentTarget) onClose() }}
    >
      <div className="flex h-[92vh] w-full max-w-3xl flex-col overflow-hidden rounded-t-2xl border bg-card shadow-xl sm:rounded-2xl">
        <div className="flex items-center justify-between border-b px-5 py-3.5">
          <h2 className="text-lg font-semibold">Add resources</h2>
          <button
            type="button"
            onClick={onClose}
            className="rounded-md p-1 text-muted-foreground hover:bg-accent hover:text-foreground"
            aria-label="Close"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="border-b px-5 py-3">
          <div className="flex items-center gap-2 rounded-md border border-input bg-background px-3">
            <Search className="h-4 w-4 shrink-0 text-muted-foreground" aria-hidden />
            <input
              type="text"
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              placeholder="Search bulletins, guidance, regulations, filings"
              className="h-10 flex-1 bg-transparent text-[16px] outline-none sm:text-sm"
            />
          </div>
        </div>

        <div className="min-h-0 flex-1 overflow-y-auto px-5 py-4">
          <ResourcesView
            addToProjectId={projectId}
            addToProjectIds={addToProjectIds}
            onAddToProject={handleAddToProject}
            addedWikiKeys={addedWikiKeys}
            onAddWikiItem={handleAddWikiItem}
          />
        </div>

        <div className="flex items-center justify-end border-t px-5 py-3">
          <button
            type="button"
            onClick={onClose}
            className="rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90"
          >
            Done
          </button>
        </div>
      </div>
    </div>
  )
}
