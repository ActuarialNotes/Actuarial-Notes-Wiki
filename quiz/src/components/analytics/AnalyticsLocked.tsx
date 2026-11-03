import { Link } from 'react-router-dom'
import { Lock } from 'lucide-react'
import { buttonVariants } from '@/components/ui/buttonVariants'
import { ProBadge } from '@/components/ProBadge'

/**
 * The Analytics section for a reader who isn't Pro: the section's heading over
 * the locked card the Dashboard's other Pro feature (Today's Study Plan) uses —
 * a blurred stand-in behind a lock and an Upgrade button. The stand-in is drawn,
 * not read: nothing of the reader's answers is fetched or shown.
 */
export function AnalyticsLocked() {
  return (
    <section aria-labelledby="analytics-heading" className="space-y-3">
      <h2 id="analytics-heading" className="flex items-center gap-2 text-lg font-semibold">
        Analytics
        <ProBadge />
      </h2>
      <div className="relative overflow-hidden rounded-xl">
        <div className="pointer-events-none absolute inset-0 select-none rounded-xl opacity-50 blur-sm" aria-hidden="true">
          <div className="h-full rounded-xl bg-card p-5">
            <div className="h-3 w-20 rounded bg-muted-foreground/40" />
            <div className="mt-3 h-8 w-24 rounded bg-foreground/60" />
            <svg className="mt-5 h-20 w-full" viewBox="0 0 100 40" preserveAspectRatio="none">
              <polyline points="0,30 15,26 30,28 45,18 60,20 75,12 100,8" fill="none" className="stroke-primary" strokeWidth="2" vectorEffect="non-scaling-stroke" />
            </svg>
            <div className="mt-2 flex items-end gap-2">
              {[5, 8, 3, 9, 6, 7, 4, 8].map((h, i) => (
                <span key={i} className="w-full rounded-sm bg-primary/40" style={{ height: h * 2 }} />
              ))}
            </div>
          </div>
        </div>
        <div className="relative z-10 flex flex-col items-center rounded-xl bg-background/75 px-6 pb-5 pt-6 text-center backdrop-blur-md">
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary ring-1 ring-primary/20">
            <Lock className="h-5 w-5" aria-hidden="true" />
          </div>
          <p className="mt-2 text-base font-semibold">See where your marks go</p>
          <p className="mt-1 max-w-xs text-xs text-muted-foreground">
            Your accuracy over time, the sections costing you most, and your pace against the exam's.
          </p>
          <Link to="/upgrade" className={buttonVariants({ size: 'sm' }) + ' mt-6 w-full max-w-xs gap-1.5'}>
            Upgrade
          </Link>
        </div>
      </div>
    </section>
  )
}
