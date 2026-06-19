import { useEffect, useRef, useState } from 'react'
import { FolderPlus, Library, Loader2, Upload, X } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useAddResourceByUrl } from '@/hooks/useAddResourceByUrl'

interface AddSourcesMenuProps {
  projectId: string
  // "Browse Resources" — opens the in-project Add resources popup (the Resources
  // tab's corpus browser, scoped to adding into this project).
  onBrowseResources: () => void
  // Called after a source is successfully added via the Upload dialog, so the
  // project view can refetch its document list.
  onSourceAdded: () => void
}

// "Add Resources" control on a project's detail page. Opens a small menu with
// two ways to add a resource: browse the corpus/timeline (in a popup), or add a
// single source by URL via the Upload dialog.
export function AddSourcesMenu({ projectId, onBrowseResources, onSourceAdded }: AddSourcesMenuProps) {
  const [open, setOpen] = useState(false)
  const [showUpload, setShowUpload] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!open) return
    function onClick(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false)
    }
    document.addEventListener('mousedown', onClick)
    return () => document.removeEventListener('mousedown', onClick)
  }, [open])

  return (
    <div className="relative" ref={ref}>
      <Button
        type="button"
        variant="outline"
        size="sm"
        onClick={() => setOpen(v => !v)}
        className="gap-1.5"
      >
        <FolderPlus className="h-4 w-4" aria-hidden /> Add Resources
      </Button>

      {open && (
        <div className="absolute right-0 z-20 mt-1 w-52 rounded-md border bg-popover p-1 shadow-md">
          <button
            type="button"
            onClick={() => { setOpen(false); onBrowseResources() }}
            className="flex w-full items-center gap-2 rounded px-2 py-1.5 text-left text-sm hover:bg-accent/60"
          >
            <Library className="h-3.5 w-3.5 text-muted-foreground" aria-hidden />
            Browse Resources
          </button>
          <button
            type="button"
            onClick={() => { setOpen(false); setShowUpload(true) }}
            className="flex w-full items-center gap-2 rounded px-2 py-1.5 text-left text-sm hover:bg-accent/60"
          >
            <Upload className="h-3.5 w-3.5 text-muted-foreground" aria-hidden />
            Upload
          </button>
        </div>
      )}

      {showUpload && (
        <UploadSourceDialog
          projectId={projectId}
          onClose={() => setShowUpload(false)}
          onAdded={onSourceAdded}
        />
      )}
    </div>
  )
}

// "Upload" → add a source by URL (reuses research-ingest-url). File upload
// isn't offered here yet — there's no backend to process an uploaded file, so
// this dialog stays URL-only until that exists.
function UploadSourceDialog({
  projectId,
  onClose,
  onAdded,
}: {
  projectId: string
  onClose: () => void
  onAdded: () => void
}) {
  const [url, setUrl] = useState('')
  const [notice, setNotice] = useState<string | null>(null)
  const addUrl = useAddResourceByUrl()

  useEffect(() => {
    function onKey(e: KeyboardEvent) { if (e.key === 'Escape') onClose() }
    document.addEventListener('keydown', onKey)
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = prev
    }
  }, [onClose])

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    const trimmed = url.trim()
    if (!trimmed || addUrl.loading) return
    setNotice(null)
    const res = await addUrl.add(trimmed, projectId)
    if (res) {
      const verb = res.status === 'duplicate' ? 'Already in the corpus' : 'Added'
      const review = res.document.is_in_review ? ' (pending review)' : ''
      setNotice(`${verb}: ${res.document.title}${review}.`)
      setUrl('')
      onAdded()
    }
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-end justify-center bg-black/50 p-0 sm:items-center sm:p-4"
      role="dialog"
      aria-modal="true"
      aria-label="Add source by URL"
      onMouseDown={e => { if (e.target === e.currentTarget) onClose() }}
    >
      <div className="flex max-h-[92vh] w-full max-w-lg flex-col overflow-hidden rounded-t-2xl border bg-card shadow-xl sm:rounded-2xl">
        <div className="flex items-center justify-between border-b px-5 py-3.5">
          <h2 className="text-lg font-semibold">Add source by URL</h2>
          <button
            type="button"
            onClick={onClose}
            className="rounded-md p-1 text-muted-foreground hover:bg-accent hover:text-foreground"
            aria-label="Close"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-3 px-5 py-4">
          <p className="text-sm text-muted-foreground">
            Paste a link to a bulletin, guideline, regulation, or filing — it'll be fetched and added to this project.
          </p>
          <div className="flex items-center gap-2">
            <input
              type="url"
              value={url}
              onChange={e => setUrl(e.target.value)}
              placeholder="https://…"
              autoFocus
              className="h-9 flex-1 rounded-md border border-input bg-background px-3 text-sm focus:outline-none focus:ring-1 focus:ring-ring"
            />
            <Button type="submit" disabled={!url.trim() || addUrl.loading} className="gap-1.5">
              {addUrl.loading && <Loader2 className="h-4 w-4 animate-spin" aria-hidden />}
              Add
            </Button>
          </div>
          {addUrl.error && <p className="text-sm text-destructive">{addUrl.error}</p>}
          {notice && <p className="text-sm text-primary">{notice}</p>}
        </form>

        <div className="flex items-center justify-end gap-2 border-t px-5 py-3.5">
          <Button type="button" variant="ghost" onClick={onClose}>Done</Button>
        </div>
      </div>
    </div>
  )
}
