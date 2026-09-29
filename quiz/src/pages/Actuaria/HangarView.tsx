import { Term } from '@/components/actuaria/Term'
import { ShipBay } from '@/components/actuaria/ShipBay'

/**
 * The **Hangar** (docs/actuaria-online.md §6.7): the player's ship and its
 * cosmetic slots, and the abilities a private-channel battle can take in.
 */
export function HangarView() {
  return (
    <div className="mx-auto w-full max-w-4xl space-y-6 px-4 py-4 sm:px-6 lg:py-6">
      <h1 className="actuaria-display text-xl sm:text-2xl"><Term id="hangar" /></h1>

      <section className="rounded-xl bg-card p-4 sm:p-6" aria-label="Ship bay">
        <ShipBay look={{}} labels={{ hull: 'Stock', trail: 'Stock', calculator: 'Stock' }} />
      </section>

      <section className="space-y-2 rounded-xl bg-card p-5" aria-labelledby="hangar-abilities">
        <h2 id="hangar-abilities" className="actuaria-display text-[11px] text-muted-foreground"><Term id="ability">Abilities</Term></h2>
        <p className="text-sm text-muted-foreground">Abilities arrive in private-channel battles soon.</p>
      </section>
    </div>
  )
}
