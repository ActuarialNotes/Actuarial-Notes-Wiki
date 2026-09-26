import { useEffect, useRef, useState, type ReactNode } from 'react'
import { X } from 'lucide-react'
import { OverlayPortal } from '@/components/ui/OverlayPortal'
import { downloadBlob } from '@/lib/xlsx'
import { fileKind } from '@/lib/pcpaAttempt'
import { fileBytes, type WorkspaceFile } from '@/hooks/usePcpaWorkspace'
import { cn } from '@/lib/utils'

/** The standard modal (style guide §8.1), portalled so no workspace pane can clip it. */
export function ProjectDialog({
  title,
  onClose,
  children,
  footer,
  wide = false,
}: {
  title: string
  onClose: () => void
  children: ReactNode
  footer?: ReactNode
  wide?: boolean
}) {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose() }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [onClose])
  return (
    <OverlayPortal>
      <div
        className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-sm paper-scrim"
        onClick={onClose}
        role="dialog"
        aria-modal="true"
        aria-label={title}
      >
        <div
          className={cn('relative flex max-h-[90dvh] w-full flex-col gap-4 overflow-y-auto rounded-2xl bg-card p-6 shadow-2xl', wide ? 'max-w-lg' : 'max-w-sm')}
          onClick={e => e.stopPropagation()}
        >
          <button type="button" onClick={onClose} aria-label="Dismiss" className="absolute right-4 top-4 text-muted-foreground hover:text-foreground">
            <X className="h-4 w-4" />
          </button>
          <h2 className="pr-6 text-base font-semibold">{title}</h2>
          {children}
          {footer && <div className="flex flex-wrap justify-end gap-2">{footer}</div>}
        </div>
      </div>
    </OverlayPortal>
  )
}

export interface MenuItem {
  label: string
  icon?: ReactNode
  onSelect: () => void
  destructive?: boolean
  disabled?: boolean
}

/** A small dropdown: a trigger and a list of actions. */
export function PopMenu({
  trigger,
  items,
  align = 'left',
  label,
}: {
  trigger: ReactNode
  items: MenuItem[]
  align?: 'left' | 'right'
  label: string
}) {
  const [open, setOpen] = useState(false)
  const ref = useRef<HTMLDivElement>(null)
  useEffect(() => {
    if (!open) return
    const onDown = (e: MouseEvent) => { if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false) }
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') setOpen(false) }
    document.addEventListener('mousedown', onDown)
    window.addEventListener('keydown', onKey)
    return () => {
      document.removeEventListener('mousedown', onDown)
      window.removeEventListener('keydown', onKey)
    }
  }, [open])
  return (
    <div ref={ref} className="relative">
      <button
        type="button"
        aria-label={label}
        aria-haspopup="menu"
        aria-expanded={open}
        onClick={() => setOpen(o => !o)}
        className="flex h-8 items-center gap-1 rounded-md px-2 text-xs font-medium text-muted-foreground hover:bg-accent hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
      >
        {trigger}
      </button>
      {open && (
        <div
          role="menu"
          className={cn('absolute top-full z-50 mt-1 min-w-[11rem] rounded-lg bg-popover p-1 text-popover-foreground shadow-lg', align === 'right' ? 'right-0' : 'left-0')}
        >
          {items.map(item => (
            <button
              key={item.label}
              type="button"
              role="menuitem"
              disabled={item.disabled}
              onClick={() => { setOpen(false); item.onSelect() }}
              className={cn(
                'flex w-full items-center gap-2 rounded-md px-2.5 py-1.5 text-left text-sm hover:bg-accent disabled:pointer-events-none disabled:opacity-40',
                item.destructive && 'text-destructive',
              )}
            >
              {item.icon}
              {item.label}
            </button>
          ))}
        </div>
      )}
    </div>
  )
}

const MIME: Record<string, string> = {
  png: 'image/png', jpg: 'image/jpeg', jpeg: 'image/jpeg', gif: 'image/gif', svg: 'image/svg+xml', webp: 'image/webp',
  csv: 'text/csv;charset=utf-8', r: 'text/plain;charset=utf-8', py: 'text/x-python;charset=utf-8', md: 'text/markdown;charset=utf-8',
}

export function mimeOf(path: string): string {
  return MIME[path.split('.').pop()?.toLowerCase() ?? ''] ?? 'application/octet-stream'
}

export function fileBlob(file: WorkspaceFile): Blob {
  return new Blob([fileBytes(file).slice().buffer as ArrayBuffer], { type: mimeOf(file.path) })
}

export function downloadWorkspaceFile(file: WorkspaceFile) {
  downloadBlob(file.path.split('/').pop() ?? file.path, fileBlob(file))
}

/** An object URL for an image file, revoked when the file changes or the component leaves. */
export function useFileUrl(file: WorkspaceFile | undefined): string | null {
  const [url, setUrl] = useState<string | null>(null)
  useEffect(() => {
    if (!file || fileKind(file.path) !== 'image') { setUrl(null); return }
    const next = URL.createObjectURL(fileBlob(file))
    setUrl(next)
    return () => URL.revokeObjectURL(next)
  }, [file])
  return url
}

/** Base64 of bytes, chunked so a large image doesn't overflow `String.fromCharCode`. */
export function toBase64(bytes: Uint8Array): string {
  let binary = ''
  for (let i = 0; i < bytes.length; i += 0x8000) binary += String.fromCharCode(...bytes.subarray(i, i + 0x8000))
  return btoa(binary)
}
