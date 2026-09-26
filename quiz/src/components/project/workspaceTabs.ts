/**
 * The workspace's open editor tabs, remembered per attempt so the files a
 * candidate had open are open again when they come back — and so another view
 * (the brief's data sets) can ask the workspace to open a file.
 */

export interface WorkspaceTabs {
  open: string[]
  active: string | null
}

const key = (attemptId: string) => `pcpa.tabs.${attemptId}`

export function loadTabs(attemptId: string): WorkspaceTabs {
  try {
    const parsed = JSON.parse(localStorage.getItem(key(attemptId)) ?? 'null') as WorkspaceTabs | null
    if (parsed && Array.isArray(parsed.open)) return { open: parsed.open, active: parsed.active ?? null }
  } catch { /* fall through */ }
  return { open: [], active: null }
}

export function saveTabs(attemptId: string, tabs: WorkspaceTabs): void {
  try {
    localStorage.setItem(key(attemptId), JSON.stringify(tabs))
  } catch { /* quota */ }
}

/** Opens a file in the workspace the next time it mounts. */
export function queueOpenFile(attemptId: string, path: string): void {
  const tabs = loadTabs(attemptId)
  saveTabs(attemptId, { open: tabs.open.includes(path) ? tabs.open : [...tabs.open, path], active: path })
}
