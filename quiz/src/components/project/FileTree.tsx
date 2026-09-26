import { useMemo, useRef, useState } from 'react'
import {
  ChevronDown,
  ChevronRight,
  Download,
  File,
  FileCode,
  FileImage,
  FilePlus,
  FileSpreadsheet,
  FileText,
  Folder,
  Lock,
  MoreHorizontal,
  Pencil,
  Sheet,
  Table2,
  Trash2,
  Upload,
} from 'lucide-react'
import { fileKind, type FileKind } from '@/lib/pcpaAttempt'
import type { WorkspaceFile } from '@/hooks/usePcpaWorkspace'
import { PopMenu, type MenuItem } from './shared'
import { cn } from '@/lib/utils'

const KIND_ICON: Record<FileKind, typeof File> = {
  r: FileCode,
  python: FileCode,
  csv: Table2,
  sheet: FileSpreadsheet,
  image: FileImage,
  markdown: FileText,
  text: FileText,
  binary: File,
}

/** Folders in the order a project is worked: the data, the code, what it produced. */
const FOLDER_ORDER = ['data', 'code', 'output', 'sheets']

export type NewFileKind = 'r' | 'python' | 'sheet' | 'markdown'

interface FileTreeProps {
  files: WorkspaceFile[]
  activePath: string | null
  onOpen: (path: string) => void
  onNew: (kind: NewFileKind) => void
  onUpload: (files: FileList) => void
  onRename: (path: string) => void
  onDelete: (path: string) => void
  onDownload: (path: string) => void
  onOpenInSheet: (path: string) => void
}

export function FileTree({ files, activePath, onOpen, onNew, onUpload, onRename, onDelete, onDownload, onOpenInSheet }: FileTreeProps) {
  const [collapsed, setCollapsed] = useState<Record<string, boolean>>({})
  const upload = useRef<HTMLInputElement>(null)

  const groups = useMemo(() => {
    const byFolder = new Map<string, WorkspaceFile[]>()
    for (const f of files) {
      const folder = f.path.includes('/') ? f.path.slice(0, f.path.indexOf('/')) : ''
      byFolder.set(folder, [...(byFolder.get(folder) ?? []), f])
    }
    for (const list of byFolder.values()) list.sort((a, b) => a.path.localeCompare(b.path))
    const folders = [...new Set([...FOLDER_ORDER, ...byFolder.keys()])].filter(f => f !== '' && (byFolder.has(f) || FOLDER_ORDER.includes(f)))
    return { folders, byFolder, root: byFolder.get('') ?? [] }
  }, [files])

  const newItems: MenuItem[] = [
    { label: 'R script', icon: <FileCode className="h-4 w-4" />, onSelect: () => onNew('r') },
    { label: 'Python script', icon: <FileCode className="h-4 w-4" />, onSelect: () => onNew('python') },
    { label: 'Spreadsheet', icon: <Sheet className="h-4 w-4" />, onSelect: () => onNew('sheet') },
    { label: 'Markdown note', icon: <FileText className="h-4 w-4" />, onSelect: () => onNew('markdown') },
  ]

  function row(f: WorkspaceFile, depth: number) {
    const kind = fileKind(f.path)
    const Icon = KIND_ICON[kind]
    const name = f.path.split('/').pop()
    const items: MenuItem[] = [
      ...(kind === 'csv' ? [{ label: 'Open in spreadsheet', icon: <FileSpreadsheet className="h-4 w-4" />, onSelect: () => onOpenInSheet(f.path) }] : []),
      { label: 'Download', icon: <Download className="h-4 w-4" />, onSelect: () => onDownload(f.path) },
      ...(!f.readOnly ? [
        { label: 'Rename', icon: <Pencil className="h-4 w-4" />, onSelect: () => onRename(f.path) },
        { label: 'Delete', icon: <Trash2 className="h-4 w-4" />, onSelect: () => onDelete(f.path), destructive: true },
      ] : []),
    ]
    return (
      <div
        key={f.path}
        className={cn(
          'group flex items-center rounded-md pr-1 text-sm',
          activePath === f.path ? 'bg-accent font-medium text-foreground' : 'text-muted-foreground hover:bg-accent/60 hover:text-foreground',
        )}
      >
        <button
          type="button"
          onClick={() => onOpen(f.path)}
          className="flex min-w-0 flex-1 items-center gap-2 py-1.5 text-left"
          style={{ paddingLeft: 8 + depth * 14 }}
          title={f.path}
        >
          <Icon className="h-4 w-4 shrink-0" aria-hidden />
          <span className="truncate">{name}</span>
          {f.readOnly && <Lock className="h-3 w-3 shrink-0 opacity-70" aria-label="read-only" />}
        </button>
        <div className="opacity-100 lg:opacity-0 lg:group-hover:opacity-100 lg:focus-within:opacity-100">
          <PopMenu label={`Actions for ${name}`} trigger={<MoreHorizontal className="h-4 w-4" />} items={items} align="right" />
        </div>
      </div>
    )
  }

  return (
    <div className="flex h-full min-h-0 flex-col">
      <div className="flex shrink-0 items-center gap-1 border-b border-border px-2 py-1">
        <span className="flex-1 px-1 text-xs font-semibold uppercase tracking-wide text-muted-foreground">Files</span>
        <PopMenu label="New file" trigger={<><FilePlus className="h-4 w-4" /> New</>} items={newItems} align="right" />
        <button
          type="button"
          onClick={() => upload.current?.click()}
          className="flex h-8 items-center gap-1 rounded-md px-2 text-xs font-medium text-muted-foreground hover:bg-accent hover:text-foreground"
          title="Upload files into the project"
        >
          <Upload className="h-4 w-4" />
        </button>
        <input
          ref={upload}
          type="file"
          multiple
          className="hidden"
          onChange={e => {
            if (e.target.files?.length) onUpload(e.target.files)
            e.target.value = ''
          }}
        />
      </div>
      <nav className="min-h-0 flex-1 space-y-0.5 overflow-y-auto p-1.5" aria-label="Project files">
        {groups.folders.map(folder => {
          const list = groups.byFolder.get(folder) ?? []
          const closed = collapsed[folder]
          return (
            <div key={folder}>
              <button
                type="button"
                onClick={() => setCollapsed(c => ({ ...c, [folder]: !closed }))}
                className="flex w-full items-center gap-1.5 rounded-md px-1.5 py-1.5 text-left text-sm font-medium hover:bg-accent/60"
                aria-expanded={!closed}
              >
                {closed ? <ChevronRight className="h-3.5 w-3.5 text-muted-foreground" /> : <ChevronDown className="h-3.5 w-3.5 text-muted-foreground" />}
                <Folder className="h-4 w-4 text-muted-foreground" aria-hidden />
                {folder}
                {folder === 'data' && <Lock className="h-3 w-3 text-muted-foreground" aria-label="read-only" />}
              </button>
              {!closed && (list.length ? list.map(f => row(f, 1)) : (
                <p className="py-1 pl-9 text-xs text-muted-foreground">Empty</p>
              ))}
            </div>
          )
        })}
        {groups.root.map(f => row(f, 0))}
      </nav>
    </div>
  )
}
