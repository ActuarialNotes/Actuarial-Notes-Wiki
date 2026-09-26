import { useEffect, useState } from 'react'
import { downloadBlob } from '@/lib/xlsx'
import { fileKind } from '@/lib/pcpaAttempt'
import { fileBytes, type WorkspaceFile } from '@/hooks/usePcpaWorkspace'

/** Workspace files as the browser hands them out: blobs, downloads, URLs, embeds. */

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

/** The code files a submission can include: R, Python and SAS, not the submitted copies. */
export function codeFilesOf(files: Record<string, WorkspaceFile>): string[] {
  return Object.keys(files)
    .filter(p => !p.startsWith('submission/') && (['r', 'python'].includes(fileKind(p)) || p.toLowerCase().endsWith('.sas')))
    .sort()
}

const PRINT_CSS = `
  body { font: 11pt/1.5 -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif; color: #000; max-width: 46rem; margin: 2rem auto; padding: 0 1rem; }
  h1 { font-size: 18pt; } h2 { font-size: 14pt; margin-top: 1.4em; } h3 { font-size: 12pt; }
  table { border-collapse: collapse; font-size: 9pt; } th, td { border-bottom: 1px solid #ccc; padding: 2px 6px; text-align: left; }
  img { max-width: 100%; } section { page-break-inside: avoid; margin-top: 1.5em; }
  .text-muted-foreground { color: #555; }
`

/** A standalone HTML document of the report, for printing to PDF or saving. */
export function reportHtml(title: string, innerHtml: string): string {
  const safeTitle = title.replace(/[<>&]/g, '')
  return `<!doctype html><html lang="en"><head><meta charset="utf-8"><title>${safeTitle}</title>`
    + '<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/katex@0.16.45/dist/katex.min.css">'
    + `<style>${PRINT_CSS}</style></head><body>${innerHtml}</body></html>`
}
