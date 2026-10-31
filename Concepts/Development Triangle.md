---
verification:
  status: stale
  confidence: null
  last_checked: 2026-10-31
  last_checked_by: agent:validate-v1
  content_hash: sha256:0bbcc60ff037872d55590d10572210f8c32d6fe08044ec5aa35c022d8aa9a935
  sources:
    - "Friedland, Estimating Unpaid Claims Using Basic Techniques (CAS, Version 3, July 30 2010), Ch.5 pp.51-62 (PDF 57-68); Ch.6 (PDF 69-83); Ch.7 pp.84-95 (PDF 90-101), sha256:5e9830823346d2001d9bdcebecd0d0d399cac32a9a63d5cf021a6c7f03d50464 — https://www.casact.org/sites/default/files/2021-03/5_Friedland.pdf"
  open_findings: 1
  open_critical: 0
  log: .verify/Concepts/Development Triangle.md
---

**Development Triangle** is the fundamental data structure of reserving: amounts arranged with **cohorts as rows** (usually [[Accident Year|accident years]]), **maturities as columns** (age in months since the start of the cohort), and **valuation dates as diagonals**.

> $$f_{k \to k+1} = \frac{\sum_{\text{AY}} C_{\text{AY},\,k+1}}{\sum_{\text{AY}} C_{\text{AY},\,k}}$$

- Cell $C_{\text{AY},k}$ holds the cumulative amount for that accident year at age $k$. The triangle is triangular because a $2024$ accident year cannot yet have a $36$-month valuation.
- **Incremental and cumulative cells.** An incremental cell holds what was paid (or reported) for one cohort during one calendar period. Friedland builds the incremental paid triangle from claim transactions by placing each payment in the row of its accident year and the column for the calendar period in which it was made (Ch.5, pp.55–56). The cumulative triangle is the running sum of the incremental cells along each row: the first column is the same in both triangles, and each later cumulative cell is the cumulative cell before it plus the incremental cell at its own age. Read the other way, an incremental cell is the difference between successive cumulative values in a row.
- **A diagonal is a calendar period.** Every incremental cell on one diagonal was paid in the same calendar period, so the incremental cells along a diagonal add up to that calendar period's payments: each cohort's latest cumulative value minus its value on the previous diagonal, with the newest cohort's first cell counted in full. A new diagonal is built the same way in reverse: each cohort's new cumulative value is its value on the previous diagonal plus what was paid on it during the new calendar period (Ch.5, pp.56–57).
- The three directions carry three different signals, and reading them apart is the core diagnostic skill:
  - **Along a row** — how one cohort develops.
  - **Down a column** — how successive cohorts compare at the *same* maturity. A trend here is a change in cost level, [[Mix of Business|mix]] or rate adequacy.
  - **Along a diagonal** — everything that happened in one calendar period. A diagonal effect is [[Inflation|inflation]], a reserve strengthening, or a settlement push, and it hits every cohort at once.
- Build the same triangle on several bases — [[Paid Losses|paid]], [[Incurred Losses|reported]], [[Claim Count Triangle|counts]] (reported, closed, open), [[Allocated Loss Adjustment Expense|ALAE]], and recoveries. The *comparison* between them is where the diagnostics live: paid-to-reported ratios, average case outstanding, closure rates.
- Triangles may be annual, semi-annual or quarterly. Finer periods are more responsive and show seasonality; they also thin the data and multiply the factors to select.
- Friedland names the credibility of the experience and the stability of development as the considerations in choosing the time interval (Ch.5, p.61). An annual cohort is comparable with earlier years only if its claims are spread through the year in the same way: a cumulative factor for an accident year at 12 months is in effect an average of the factors for its accident months, the January accidents at 12 months down to the December accidents at 1 month (Ch.7, pp.96–97). When exposures grow during the year, more of the year's accidents happen late in it, so its average accident date falls later and the year is less mature at each age than the history its factors came from; applying those factors understates its ultimate, and shrinking exposures do the reverse. Berquist and Sherman's remedy is to substitute accident quarters for accident years when the rate of growth of earned exposures changes markedly, because a quarter is too short for its average accident date to drift far from its midpoint (Friedland Ch.13, p.283).
- Assumptions being made implicitly by using one at all: each cohort develops in a similar pattern, the pattern is stable over time, and the mix inside each cohort is comparable. Every reserving distortion on the syllabus is one of these three failing.

![[Media/Figures/Development_Triangle.svg|340]]

> [!example]- Reading a Triangle in Three Directions {Example}
> Cumulative reported losses ($000s), valued $12/31/2024$:
>
> | AY | 12 mo | 24 mo | 36 mo | 48 mo |
> |---|---|---|---|---|
> | $2021$ | $2{,}000$ | $3{,}000$ | $3{,}450$ | $3{,}588$ |
> | $2022$ | $2{,}200$ | $3{,}300$ | $3{,}795$ | |
> | $2023$ | $2{,}600$ | $3{,}900$ | | |
> | $2024$ | $3{,}100$ | | | |
>
> Read the triangle in each direction.
>
> > [!answer]-
> > **Along rows** — AY 2021 grew $2{,}000 \to 3{,}000 \to 3{,}450 \to 3{,}588$: factors $1.500$, $1.150$, $1.040$. Development decelerates with maturity, as expected.
> >
> > **Down columns** — the $12$-month column runs $2{,}000$, $2{,}200$, $2{,}600$, $3{,}100$: growth of $10\%$, $18\%$, $19\%$. Something is increasing — exposure volume, cost level, or both. Without exposure counts the triangle cannot tell which, which is why counts and premium are analyzed alongside it.
> >
> > **Along diagonals** — the $12/31/2024$ diagonal is $3{,}588$, $3{,}795$, $3{,}900$, $3{,}100$. Its age-to-age factors ($1.040$, $1.150$, $1.500$) match the corresponding factors from earlier years exactly, so there is **no calendar year effect**: nothing unusual happened in $2024$.
> >
> > A clean triangle like this one is the case in which the [[Chain Ladder Method|chain ladder]] is at its most defensible.

> [!example]- Spotting a Diagonal Effect {Example}
> Age-to-age factors from a reported triangle, with the latest diagonal in bold:
>
> | AY | 12–24 | 24–36 | 36–48 |
> |---|---|---|---|
> | $2020$ | $1.48$ | $1.15$ | **$1.19$** |
> | $2021$ | $1.51$ | **$1.29$** | |
> | $2022$ | **$1.67$** | | |
>
> Prior column averages: $1.49$, $1.16$, $1.06$. What should the actuary conclude?
>
> > [!answer]-
> > Every bolded factor exceeds its column history, and the excess is roughly proportional at each maturity ($+12\%$, $+11\%$, $+12\%$). That pattern — a uniform lift across all maturities on one diagonal — is the signature of a **calendar year effect**, not of a change in any cohort.
> >
> > The candidates are a case reserve strengthening ([[Case Adequacy]]), an [[Inflation|inflation]] or legal shock, or a change in claims handling. Distinguishing them requires the companion triangles:
> >
> > - Average case outstanding jumping on the same diagonal → **case strengthening**.
> > - Paid triangle showing the same lift → **inflation or faster settlement**, since payments are not a reserving judgment.
> > - Closure rates moving → **[[Settlement Rate|settlement rate]] change**.
> >
> > What must *not* happen is selecting factors that average the elevated diagonal in with the history. That applies a one-time level shift as though it were an ongoing pattern, and over-states every future year's development. The remedies are on [[Berquist-Sherman Method]].
