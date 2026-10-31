---
verification:
  status: stale
  confidence: null
  last_checked: 2026-10-31
  last_checked_by: agent:validate-v1
  content_hash: sha256:ac4367855c263bca5ea3023b30f4273c927b34de2d789d7a135625dc4df0825b
  sources:
    - "Friedland, Estimating Unpaid Claims Using Basic Techniques (CAS, 3rd ver. July 2010), full-text search; Ch.11 p.198 (PDF p.204), sha256:5e9830823346d2001d9bdcebecd0d0d399cac32a9a63d5cf021a6c7f03d50464 — https://www.casact.org/sites/default/files/2021-03/5_Friedland.pdf"
    - "ASOP No. 43, Property/Casualty Unpaid Claim Estimates (ASB, June 2007, Doc. No. 159), full-text search, sha256:776302c442cb8d3210fc41269d38caeec4c547da8159084b80fa2ac4ce949cce — https://www.actuarialstandardsboard.org/wp-content/uploads/2014/02/asop043_159.pdf"
    - "CAS Exam 5 Content Outline, Fall 2026, pp.3-6 (tasks A3, B16-B20; Complete Text References), sha256:fd8373ae9bbe7e56b93f99cee304c76c1d29a9d0dc7f07e6ed500bd647f41795 — https://www.casact.org/sites/default/files/2026-03/Exam_5_CO_2026_Fall.pdf"
  open_findings: 1
  open_critical: 0
  log: .verify/Concepts/Close Year.md
---

**Close Year** is the vault's own label for grouping claims by the calendar year in which they **close** — settle — so that a year's closed claims and the payments on them can be compared year to year. It is not a term Exam 5's readings use: [[Basic Ratemaking (Werner - 2016)|Werner & Modlin]] name four aggregation methods ([[Calendar Year|calendar]], [[Accident Year|accident]], [[Policy Year|policy]] and [[Report Year|report]] year, Ch. 6), but both they and Friedland work with the closed-claim data behind it.

> $$\text{Close-year severity}_t = \frac{\text{Paid on claims closed in year } t}{\text{Number of claims closed in year } t}$$

- This is Werner & Modlin's **paid severity** — "paid losses on closed claims divided by closed claims" (Ch. 1) — with the claims grouped by the year they closed. A claim is *closed* once it is settled, and may be re-opened if further activity occurs (Ch. 1).
- A [[Severity|severity]] has to say which losses and which claims it uses: paid or reported losses; reported, paid or closed claims; with or without claims that closed without payment (Werner & Modlin Ch. 6). Paid severity on closed claims and reported severity on reported claims are different numbers.
- In ratemaking, closed counts are the denominator of the [[Loss Trend|loss trend]] data Werner & Modlin show for short-tailed lines: calendar-year paid losses and closed claim counts for the 12 months ending each quarter, because paid losses are free of changes in case reserving (Ch. 6, Exhibit 6.14; Appendix A).
- Changes in severity show loss trends and "the impact of any changes in claims handling procedures" (Werner & Modlin Ch. 1) — see [[Claims Processing Changes]].
- Friedland measures closed counts by **accident year** instead: the **disposal rate** is cumulative closed claim counts divided by the selected ultimate claim count for the accident year (Ch. 11), used in the disposal-rate [[Frequency-Severity Method|frequency-severity technique]] and the [[Berquist-Sherman Method|Berquist-Sherman]] paid adjustment for a change in [[Settlement Rate|settlement rate]] (Ch. 13).
- Closed is not always final: Friedland's unpaid claim estimate carries an estimate for reopened claims (Ch. 1), and an insurer that re-opens a closed claim rather than coding a new one can make closed counts *fall* along an accident year (Ch. 6).

> [!idea] The idea
> The claims that close in a year are not a random sample of claims. Smaller claims settle faster than complicated, costly ones (Friedland Ch. 11), so the average closed claim depends on *which* claims the claim department finished that year as well as on what each one cost. Clear a pile of small claims and the average falls, though no claim got cheaper.

![[Media/Figures/Close_Year.svg|340]]

> [!example]- One Claim, Grouped Every Way {Example}
> A liability policy is written effective $7/1/2022$. A covered accident happens on $2/14/2023$ and is reported on $3/2/2023$, when a case reserve is set. A partial payment is made in $2024$, and the claim is settled with a final payment on $11/20/2025$.
>
> Which year does the claim belong to under each grouping?
>
> > [!answer]-
> > Each grouping keys on a different date in the claim's life, so read off the matching date.
> >
> > | Grouping | Keyed on | Year |
> > |---|---|---|
> > | [[Policy Year]] | policy written | 2022 |
> > | [[Accident Year]] | accident date | 2023 |
> > | [[Report Year]] | report date | 2023 |
> > | Close year | settlement date | 2025 |
> >
> > [[Calendar Year|Calendar year]] doesn't place the claim at all: it places *transactions*, so the reserve set in 2023, the 2024 payment and the 2025 payment each fall in their own calendar year (Werner & Modlin Ch. 6).
> >
> > *Why does close year wait until 2025?* The claim has no closing date until it settles; until then it sits in the accident and report years as an open claim.

> [!example]- A Backlog Clears and Severity Falls {Example}
> In 2024 an insurer closes $800$ small claims averaging $\$2{,}000$ and $200$ large claims averaging $\$20{,}000$. In 2025 the claim department clears a backlog, closing $1{,}200$ small claims and the same $200$ large ones, at the same average costs.
>
> Compute close-year severity for each year and explain the change.
>
> > [!answer]-
> > Severity is paid on closed claims over closed claims, so total each year's payments and counts.
> >
> > $$\begin{align*}
> > \text{2024 paid} &= 800(2{,}000) + 200(20{,}000) \\
> > &= \$5{,}600{,}000 \\[4pt]
> > \text{2024 severity} &= \frac{5{,}600{,}000}{1{,}000} \\
> > &= \$5{,}600 \\[4pt]
> > \text{2025 paid} &= 1{,}200(2{,}000) + 200(20{,}000) \\
> > &= \$6{,}400{,}000 \\[4pt]
> > \text{2025 severity} &= \frac{6{,}400{,}000}{1{,}400} \\
> > &= \$4{,}571
> > \end{align*}$$
> >
> > Severity falls $18.4\%$ with no change in the cost of any claim: the extra closures are all small, so the **mix** of what closed moved, not the cost level. A temporary rise in closings when a claim department works down its backlog is one of the claims-handling changes Friedland names (Ch. 6).
> >
> > > [!trap] Mix read as trend
> > > A severity trend fitted through 2025 would show a fall in cost. It is a settlement-speed effect: know the history of claims handling (Werner & Modlin Ch. 6) before selecting a trend from it.
> >
> > *Why not a rise, since the backlog claims are older?* Age doesn't set the average here; size does, and the backlog was small claims.

> [!example]- The Claim Department Turns to Large Claims {Example}
> Claims management says adjusters are now concentrating on large claims. Explain the likely effect on close-year severity.
>
> > [!answer]-
> > - Large claims settle sooner than before, so more of them close in the current year — closed severity rises.
> > - Small claims, with less attention, settle more slowly than in the past, so fewer of them close — closed severity rises again.
> > - Friedland (Ch. 13, after Berquist and Sherman) adds that neglected small claims may grow larger more quickly than past experience suggests — a real cost change on top of the mix change.
> >
> > *What separates full credit?* Naming both mix effects, and saying that the rise is mostly a change in which claims closed, not in what claims cost.

> [!tip]- How it appears on the exam
> - "Close year" is not in CAS's Exam 5 outline (task A3 lists calendar, policy, accident and report year, and in-force) or its readings; it is the vault's name for closed-claim data.
> - Closed claim counts appear as the denominator of severity in Werner & Modlin's loss trend exhibits and Appendix A indication — a frequency, severity or pure premium calculation from exposures, closed counts and paid losses.
> - On the reserving side, closed counts feed Friedland's diagnostic triangles (closed-to-reported counts), the disposal-rate frequency-severity technique and the Berquist-Sherman paid adjustment.
> - The vault's own question on this page asks which way closed-claim severity moves after a claims-handling change, and why.

> [!warning]- Exam traps
> - **"Close ratio" is something else.** Werner & Modlin's close ratio is quotes that become policies, a marketing measure (Ch. 1).
> - **"Closed" can mean "fixed".** Werner & Modlin say an accident year is "not closed (fixed)" at year end, meaning its losses still develop (Ch. 6) — not that its claims are settled.
> - **Disposal rate denominator.** In Friedland it is the selected *ultimate* claim count for the accident year, not reported counts; she notes other authors define it differently (Ch. 13).
> - **Closed without payment.** Counting claims closed with no payment in the denominator lowers severity; say which you used (Werner & Modlin Ch. 6).
