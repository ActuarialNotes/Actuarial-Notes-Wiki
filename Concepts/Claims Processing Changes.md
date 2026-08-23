---
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:6c41694c2bb1e22919d249bfc0cf301ef942fbbe95ef92d6a58624a743d65e44
  sources: []
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Claims Processing Changes.md
---

**Claims Processing Changes** are changes in how claims are handled — staffing and caseloads, settlement authority, use of defence counsel, closure targets, outsourcing, reserving philosophy — that alter the **timing** of payments and case reserve changes, and therefore the shape of the development pattern.

> $$\text{Disposal Rate}_n = \frac{\text{Closed claims at age } n}{\text{Ultimate claim counts}}$$

> $$\text{Avg Case O/S} = \frac{\text{Case Reserves}}{\text{Open Claims}}$$

- Processing changes hit the **diagonal**: they affect every open accident year in the calendar period when the change happens, which is what distinguishes them from a change in one cohort's experience.
- The two diagnostics above separate the two kinds of change. A moving **disposal rate** is a [[Settlement Rate|settlement speed]] change and distorts **paid** development; a jump in **average case outstanding** is a [[Case Adequacy|case adequacy]] change and distorts **reported** development. Both call for the corresponding [[Berquist-Sherman Method|Berquist-Sherman]] adjustment.
- Faster closing inflates the recent paid diagonal, so historical paid factors **over-develop** it. Slower closing does the reverse. The intuitive answer is usually the wrong sign, which is why the disposal-rate table is computed rather than reasoned about.
- Unlike [[Claims Coding Changes]], which move losses between categories, processing changes genuinely change the emergence curve — so post-change data is describing a different process, not a relabelled one.
- Watch for **closed-without-payment** activity: a drive to clear old files can raise the closure rate without moving any money, which changes the disposal rate but not the paid pattern. Counting CWP separately reveals it.

![[Media/Figures/Claims_Processing_Changes.svg|340]]

> [!example]- A Fast-Track Settlement Programme {Example}
> An insurer introduces fast-track settlement for auto bodily injury in $2022$, cutting average time-to-close from $18$ months to $9$. Historical $12$–$24$ paid factors for AY $2018$–$2021$ averaged $1.45$; AY $2022$–$2023$ are coming in near $1.20$.
>
> What happens if the historical factor is applied to the recent years?
>
> > [!answer]-
> > More of each recent year's ultimate is already paid at $12$ months, so the $12$-month paid figure is high relative to its ultimate. Applying $1.45$ — a factor calibrated to a book that had paid much less by $12$ months — **overstates** ultimate losses for AY $2022$ onward.
> >
> > The observed $1.20$ is the correct factor for the new process, but two years of it is thin evidence and the change may still be bedding in.
> >
> > Options: restate the historical paid triangle to the current disposal pattern (Berquist-Sherman) so the full history is usable at the new pace; or lean on **reported** development, which is largely unaffected by closing speed, as the primary method while the paid series accumulates.

> [!example]- Two Changes at Once {Example}
> Diagnostics at $24$ months across four accident years:
>
> | AY | Disposal rate | Avg case O/S | Paid ÷ reported |
> |---|---|---|---|
> | $2021$ | $56\%$ | $\$11{,}000$ | $0.44$ |
> | $2022$ | $57\%$ | $\$11{,}500$ | $0.45$ |
> | $2023$ | $66\%$ | $\$14{,}900$ | $0.52$ |
> | $2024$ | $71\%$ | $\$18{,}200$ | $0.56$ |
>
> What is happening, and what does it do to the methods?
>
> > [!answer]-
> > **Both** things are happening at once, starting in $2023$:
> >
> > - Disposal rate up from $57\%$ to $71\%$ — claims closing faster.
> > - Average case outstanding up from $\$11{,}500$ to $\$18{,}200$, far beyond any plausible severity trend — case reserves strengthened.
> >
> > That combination is common in practice (a new claims leader often does both) and it is the hardest case, because it distorts **both** triangles at once:
> >
> > - **Paid** development is overstated by the faster closing.
> > - **Reported** development is overstated by the strengthening.
> >
> > Neither triangle can be used as the clean check on the other, which is the usual escape route. What remains:
> >
> > 1. Apply **both** Berquist-Sherman adjustments — restate the paid triangle to a common disposal rate and the reported triangle to current case adequacy — and compare the two restated results.
> > 2. Lean on methods that do not depend on the triangle's recent diagonal at all: the [[Expected Loss Method|expected claims]] technique and [[Bornhuetter-Ferguson Method|BF]] with an externally derived ELR.
> > 3. Use [[Frequency-Severity Method|frequency-severity]] on **closed** claims with a disposal-rate projection, which handles the settlement change explicitly.
> >
> > And document heavily: with both distortions active, the estimate rests far more on judgment than usual, and [[Reserve Communication|the report]] should say so.
