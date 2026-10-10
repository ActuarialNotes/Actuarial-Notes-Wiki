---
verification:
  status: in_review
  confidence: null
  last_checked: 2026-10-09
  last_checked_by: agent:validate-v1
  content_hash: sha256:134c0a9ad45182e24df265ddfcaf7e7eb7ce1c3e25195be19a5aba3cb1a3b6c4
  sources:
    - "Friedland, Estimating Unpaid Claims Using Basic Techniques (CAS, 3rd ed. 2010), Ch.1 p.14 (PDF p.20), Ch.4 p.44 (PDF p.50), Ch.6 p.71 (PDF p.77), Ch.11 pp.206-208 (PDF pp.212-214), Ch.13 p.288 (PDF p.294), sha256:5e9830823346d2001d9bdcebecd0d0d399cac32a9a63d5cf021a6c7f03d50464 — https://www.casact.org/sites/default/files/2021-03/5_Friedland.pdf"
    - "CAS Exam 5 Content Outline, Fall 2025, p.3 task A3, sha256:bbb07433732f1d2f097db74e69ed263771dd512ce3e14229384b6df5654ebfc7 — https://www.casact.org/sites/default/files/2025-05/Exam_5_ContentOutline_2025_F.pdf"
    - "CAS Exam 5 Content Outline, Fall 2026, p.3 task A3, sha256:fd8373ae9bbe7e56b93f99cee304c76c1d29a9d0dc7f07e6ed500bd647f41795 — https://www.casact.org/sites/default/files/2026-03/Exam_5_CO_2026_Fall.pdf"
  open_findings: 1
  open_critical: 0
  log: .verify/Concepts/Close Year.md
---

**Close Year** is a data aggregation method that groups claims by the calendar year in which they were finally *settled and closed*, regardless of when the loss occurred, when it was reported, or when partial payments were made.

> $$\text{Settlement lag} = \text{Close date} - \text{Accident date}$$

- A close-year cohort is **complete the moment it closes** — a settled claim has no further development unless it reopens, and reopened claims are a separate component of the unpaid claim estimate (Friedland Ch. 1) — so closed-claim data needs almost no [[Loss Development|development]].
- The trade-off is severe selection bias: within any recent accident year the claims that close first are the small, simple ones. Closed-claim severity therefore **understates** ultimate severity, and the bias is worst in the [[Long Tail Lines|long-tail lines]] where the expensive claims litigate for years.
- Close year is rarely a ratemaking basis. Its real work is **operational**: measuring the [[Settlement Rate|disposal rate]] (in Friedland, cumulative closed claim counts divided by the selected ultimate claim count for the accident year; other authors define it differently), claim-department throughput, and the average cost of a closed claim.
- Those same closed-claim counts drive the [[Berquist-Sherman Method|Berquist-Sherman]] paid adjustment and the disposal-rate variant of the [[Frequency-Severity Method]], where a triangle of *closed* counts is used to restate paid losses onto a common settlement pattern.
- A shift in closing speed is one of the operational changes an actuary must probe (Friedland Ch. 4): faster closing inflates historical paid development factors, slower closing deflates them — see [[Claims Processing Changes]].

![[Media/Figures/Close_Year.svg|340]]

> [!example]- One Claim Under Four Aggregation Bases {Example}
> An auto liability claim arises from an accident on $3/10/2022$ under a policy effective $9/1/2021$. It is reported $4/1/2022$, litigated, and settled $9/14/2024$.
>
> Assign the claim under each basis.
>
> > [!answer]-
> > | Basis | Year |
> > |---|---|
> > | [[Policy Year]] | 2021 |
> > | [[Accident Year]] | 2022 |
> > | [[Report Year]] | 2022 |
> > | **Close Year** | **2024** |
> >
> > The claim sits in a $2022$ development triangle for two and a half years, moving along the row as case reserves are revised, and only leaves the inventory in $2024$. Close year is the only basis that cannot be assigned until the claim is finished — which is why it is useless for a current-year rate indication and useful for measuring how long claims take.

> [!example]- Closed-Claim Severity Understates Ultimate Severity {Example}
> For accident year 2023, $1{,}000$ claims were reported. At $24$ months, $700$ are closed for total payments of $\$3{,}500{,}000$; the $300$ open claims carry case reserves of $\$4{,}200{,}000$.
>
> Compare average closed severity to the implied ultimate severity, ignoring further development.
>
> > [!answer]-
> > $$\begin{align*}
> > \text{Avg closed claim} &= \frac{\$3{,}500{,}000}{700} \\
> > &= \$5{,}000 \\[4pt]
> > \text{Avg open claim} &= \frac{\$4{,}200{,}000}{300} \\
> > &= \$14{,}000 \\[4pt]
> > \text{Avg reported claim} &= \frac{\$7{,}700{,}000}{1{,}000} \\
> > &= \$7{,}700
> > \end{align*}$$
> >
> > Closed claims average $\$5{,}000$ against $\$7{,}700$ on a reported basis — and the reported figure is itself understated, since case reserves on litigated claims typically develop upward.
> >
> > Pricing off closed-claim severity would understate the loss cost by roughly a third. The valid use of the $\$5{,}000$ figure is as a *diagnostic*: compare it across accident years at the same disposal rate to detect a real change in claim cost, rather than a change in what has closed so far.
