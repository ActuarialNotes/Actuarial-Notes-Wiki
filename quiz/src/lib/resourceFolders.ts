// Where a resource page lives (docs/resource-pages.md, "Folders").
//
// A resource page describes one real document. They all began in
// `Resources/Books/`, which is why that folder holds papers, ASOPs, guidelines
// and statutes as well as books; those pages stay where they are. A new page
// goes in the folder its `Type` names — `TYPE_FOLDER`, which
// `scripts/resource_folders.py` keeps too (`test_resource_pages.py` holds the
// two equal).
//
// A page is addressed by its *name* — `[[IFRS 17]]`, `/wiki/resource/IFRS+17`
// — never by its folder, so a name is unique across the folders
// (`resource_lint.py` fails a duplicate) and the folder is looked up:
// `registerResourcePaths` is fed the bundle's file list wherever the wiki
// bundle is installed (`installWikiBundle`), and `resourceRepoPath` reads it.
// Before that — or for a page the bundle doesn't carry — the answer is
// `Resources/Books/<name>.md`, where every page written before the folders were
// introduced still is.
//
// `Regulation/`, `Data/` and `Benchmarks/` also hold pages in other shapes: the
// Research tab's dated timeline entries and the Actuarial Tools data pages. A
// page there is a resource page when its frontmatter carries `Title:`.
//
// Imports are none — `vite.config.ts` pulls this into its own Node graph.

export const RESOURCE_TYPE_FOLDER: Record<string, string> = {
  Textbook: 'Books',
  Casebook: 'Books',
  Monograph: 'Books',
  Course: 'Books',
  Syllabus: 'Books',
  Guide: 'Books',
  Glossary: 'Books',
  'Reference Sheet': 'Books',
  Paper: 'Papers',
  'Study Note': 'Papers',
  Report: 'Reports',
  'Standard of Practice': 'Standards',
  'Accounting Standard': 'Standards',
  'Statement of Principles': 'Standards',
  'Educational Note': 'Standards',
  'Code of Conduct': 'Standards',
  Guideline: 'Regulation',
  Instructions: 'Regulation',
  'Regulatory Return': 'Regulation',
  Legislation: 'Regulation',
  'Case Law': 'Regulation',
  Dataset: 'Data',
  Benchmark: 'Benchmarks',
}

/** Every folder under `Resources/` a resource page may sit in, Books first. */
export const RESOURCE_FOLDERS: readonly string[] = [
  ...new Set(['Books', ...Object.values(RESOURCE_TYPE_FOLDER)]),
]

/** Folders shared with pages of other shapes (timeline entries, Tools data pages). */
export const SHARED_RESOURCE_FOLDERS: readonly string[] = ['Regulation', 'Data', 'Benchmarks']

const RESOURCE_PATH = /^Resources\/([^/]+)\/([^/]+)\.md$/

/** `Resources/Standards/IFRS 17.md` → `{ folder: 'Standards', name: 'IFRS 17' }`. */
export function splitResourcePath(path: string): { folder: string; name: string } | null {
  const m = RESOURCE_PATH.exec(path)
  return m && RESOURCE_FOLDERS.includes(m[1]!) ? { folder: m[1]!, name: m[2]! } : null
}

function frontmatterOf(text: string): string {
  if (!text.startsWith('---')) return ''
  const end = text.indexOf('\n---', 3)
  return end > 0 ? text.slice(3, end) : ''
}

/** Whether the file at `path` (repo-relative) is a resource page in the standard's shape. */
export function isResourcePage(path: string, text: string): boolean {
  const split = splitResourcePath(path)
  if (!split) return false
  if (split.folder === 'Books') return true
  return /^Title:/m.test(frontmatterOf(text))
}

const pathByName = new Map<string, string>()

/**
 * Learn where each resource page is from a list of repo paths (the wiki
 * bundle's file names). Only pages outside Books need recording; the rest of
 * the list is ignored. Pass `isPage` to skip files in a shared folder that
 * aren't resource pages.
 */
export function registerResourcePaths(
  paths: Iterable<string>,
  isPage: (path: string) => boolean = () => true,
): void {
  for (const path of paths) {
    const split = splitResourcePath(path)
    if (!split || split.folder === 'Books' || !isPage(path)) continue
    if (!pathByName.has(split.name)) pathByName.set(split.name, path)
  }
}

/** The repo path of the resource page called `name` (its filename, without `.md`). */
export function resourceRepoPath(name: string): string {
  return pathByName.get(name) ?? `Resources/Books/${name}.md`
}
