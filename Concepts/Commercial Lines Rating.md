---
verification:
  status: stale
  confidence: null
  last_checked: 2026-10-31
  last_checked_by: agent:validate-v1
  content_hash: sha256:88a82922a081789869e3783d8f106d12d4c0715fd87a63af6f97265f6a9789f8
  sources:
    - "Werner & Modlin, Basic Ratemaking (CAS, 5th ed. May 2016), Ch. 15 pp.289-311 (PDF pp.301-323), sha256:6b214d4db52674df2e83343920c06781e491254bd77f27e32ba312faaff3782c — https://www.casact.org/sites/default/files/2021-03/5_Werner_Modlin.pdf"
  open_findings: 1
  open_critical: 0
  log: .verify/Concepts/Commercial Lines Rating.md
---

![[Media/Figures/Commercial_Lines_Rating.svg|340]]

**Commercial Lines Rating** is the set of mechanisms that move a commercial risk's price away from the class manual rate toward its own expected cost. Commercial risks vary widely within any class, and the larger ones have enough volume for their own experience to carry [[Credibility|credibility]], so the manual rate is a starting point. Before any premium discount or retrospective adjustment, a risk's standard premium is

> $$\text{Standard Premium} = \text{Manual Premium} \times \text{Experience Mod} \times (1 + \text{Schedule Mod})$$

- $\text{Manual Premium}$ is the class rate times the risk's exposures.
- $\text{Experience Mod}$ is the [[Experience Rating|experience rating]] modification.
- $\text{Schedule Mod}$ is the sum of the [[Schedule Rating|schedule rating]] debits and credits.

> [!example]- A commercial auto risk has a manual premium of $\$50{,}000$, an experience modification of 1.15 and schedule credits totalling 5%. What is its standard premium? {Example}
> - The experience-modified premium is $50{,}000 \times 1.15 = \$57{,}500$.
> - The schedule credit leaves $1 - 0.05 = 0.95$ of it.
> - The standard premium is $57{,}500 \times 0.95 = \$54{,}625$, which is 9.25% above manual.

## Rating mechanisms

The mechanisms fall into two groups. Those that modify the manual rate are:

1. **[[Experience Rating]]** — a credibility-weighted modification from the insured's own past losses. Prospective.
2. **[[Schedule Rating]]** — judgmental debits and credits for risk characteristics the classification system misses. Prospective, and capped by filing.

Those that derive a premium for a large commercial risk itself are:

1. **Loss-rated composite rating** — a single, auditable, composite exposure in place of many class exposures, with a rate based entirely on the insured's own prior experience.
2. **[[Large Deductible Policy|Large deductible policies]]** — the insured funds losses below a substantial deductible, and the insurer provides the excess coverage and usually handles the claims. A [[Self-Insured Retention|self-insured retention]] leaves the claims below the retention to the insured as well.
3. **[[Retrospective Rating]]** — the current policy's premium recalculated after the period from its own losses, between a minimum and a maximum.

A risk may be subject to several of them. The [[Rating Algorithm|rating algorithm]] specifies the order: manual premium, then the experience and schedule modifications, giving standard premium, then the premium discount (for size), then any retrospective adjustment or deductible credit. Each later step transfers more risk back to the insured. It also adds credit exposure, because the insured owes money after the loss.

> [!example]- Which rating approach suits workers compensation accounts with $\$40{,}000$, $\$600{,}000$ and $\$8{,}000{,}000$ of manual premium? {Example}
> - The $\$40{,}000$ account suits manual rating with schedule rating. At this size credibility is near zero, so an experience mod would sit close to $1.0$ whatever the record.
> - The $\$600{,}000$ account suits experience rating, because it has enough volume for partial credibility and its mod carries real information.
> - The $\$8{,}000{,}000$ account suits a retrospective plan or a large deductible, because its own experience is close to fully credible and it effectively pays its own losses either way.
> - **The larger the account, the more of its own losses it funds**, and the more the insurer provides services and protection against large losses.
