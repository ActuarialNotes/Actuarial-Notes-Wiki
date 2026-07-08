import { TrendingUp } from 'lucide-react'
import type { MasteryState } from '@/lib/mastery'

export interface LevelNotice {
  conceptSlug: string
  from: MasteryState
  to: MasteryState
}

const LEVEL_LABEL: Record<MasteryState, string> = {
  new: 'New',
  level1: 'Lv 1',
  level2: 'Lv 2',
  level3: 'Lv 3',
  forgotten: 'Forgotten',
}

const TOAST_CLASS: Partial<Record<MasteryState, string>> = {
  level1: 'bg-emerald-50 text-emerald-800 dark:bg-emerald-950/60 dark:text-emerald-300',
  level2: 'bg-sky-50 text-sky-800 dark:bg-sky-950/60 dark:text-sky-300',
  level3: 'bg-amber-50 text-amber-800 dark:bg-amber-950/60 dark:text-amber-300',
}

function formatSlug(slug: string): string {
  return slug.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ')
}

export function LevelUpToast({ notices }: { notices: LevelNotice[] }) {
  if (notices.length === 0) return null

  return (
    <div
      className="fixed bottom-20 sm:bottom-8 left-0 right-0 z-50 flex flex-col items-center gap-2 pointer-events-none px-4"
      aria-live="polite"
      aria-label="Level up notifications"
    >
      {notices.map((notice, i) => {
        const isLevel3 = notice.to === 'level3'
        const colorClass = TOAST_CLASS[notice.to] ?? TOAST_CLASS.level1!
        return (
          <div
            key={`${notice.conceptSlug}-${i}`}
            className={`${isLevel3 ? 'level-up-toast-shimmer' : 'level-up-toast-in'} flex items-center gap-2 px-4 py-2.5 rounded-full shadow-md backdrop-blur-sm text-sm font-medium ${colorClass}`}
            style={{ animationDelay: `${i * 160}ms` }}
          >
            <TrendingUp className="h-3.5 w-3.5 shrink-0" />
            <span className="max-w-[180px] truncate">{formatSlug(notice.conceptSlug)}</span>
            <span className="shrink-0 font-semibold text-xs opacity-80">
              {LEVEL_LABEL[notice.from]} → {LEVEL_LABEL[notice.to]}
            </span>
          </div>
        )
      })}
    </div>
  )
}
