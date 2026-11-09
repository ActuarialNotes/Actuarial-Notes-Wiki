---
verification:
  status: stale
  confidence: null
  last_checked: 2026-10-31
  last_checked_by: agent:validate-v1
  content_hash: sha256:a61f11b598e0c26ea8ea024862d748f681503947950b58299ad835a7fb22efeb
  sources:
    - "Werner & Modlin, Basic Ratemaking (CAS, 5th ed. May 2016), Ch.1 pp.3, 8, 11 (PDF pp.15, 20, 23); Ch.3 p.42 (PDF p.54); Ch.6 pp.91, 94, 108-112 (PDF pp.103, 106, 120-124); App. A p.A-5 (PDF p.342), sha256:6b214d4db52674df2e83343920c06781e491254bd77f27e32ba312faaff3782c — https://www.casact.org/sites/default/files/2021-03/5_Werner_Modlin.pdf"
    - "Friedland, Estimating Unpaid Claims Using Basic Techniques (CAS, 3rd ver. July 2010), Ch.1 p.14 (PDF p.20); Ch.6 pp.70-71 (PDF pp.76-77); Ch.11 pp.206-208 (PDF pp.212-214); Ch.13 pp.284, 288 (PDF pp.290, 294), sha256:5e9830823346d2001d9bdcebecd0d0d399cac32a9a63d5cf021a6c7f03d50464 — https://www.casact.org/sites/default/files/2021-03/5_Friedland.pdf"
    - "CAS Exam 5 Content Outline, Fall 2026 (Exam_5_CO_2026_F v02), p.3 task A3, sha256:fd8373ae9bbe7e56b93f99cee304c76c1d29a9d0dc7f07e6ed500bd647f41795 — https://www.casact.org/sites/default/files/2026-03/Exam_5_CO_2026_Fall.pdf"
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Close Year.md
---

![[Media/Figures/Close_Year.svg|340]]

A **Close Year** of data is the claims that closed during a twelve-month period, grouped by the year they were settled, regardless of when they occurred or were reported. It is the vault's name for closed-claim data. Werner & Modlin's four aggregation methods are [[Calendar Year|calendar]], [[Accident Year|accident]], [[Policy Year|policy]] and [[Report Year|report]] year, but both they and Friedland work with the closed-claim counts behind it. The average severity of a close year is

> $$\text{Close Year Severity} = \frac{\text{Paid Losses on Closed Claims}}{\text{Closed Claim Count}}$$

- $\text{Paid Losses on Closed Claims}$ are the payments on the claims closed in the year.
- $\text{Closed Claim Count}$ is the number of claims closed in the year.

A claim is closed once it is settled and has no case reserve left. It may be reopened if further activity occurs. A [[Severity|severity]] says which losses and which claims it uses, and whether claims closed without payment are counted.

> [!example]- In 2024 an insurer closes 700 claims, paying $\$3{,}500{,}000$ on them. What is its close year 2024 severity? {Example}
> - The paid losses on the closed claims are divided by the number closed.
> - The close year severity is $3{,}500{,}000/700 = \$5{,}000$ per closed claim.

## Closed claims and the mix of claim sizes

The claims that close in a year are not a random sample of claims. Small, simple claims usually settle before large ones, so the average closed claim depends on which claims the claim department finished as well as on what each one cost.

> [!example]- In 2024 an insurer closes 800 small claims averaging $\$2{,}000$ and 200 large claims averaging $\$20{,}000$. In 2025 it clears a backlog and closes 1,200 small claims and the same 200 large ones, at the same average costs. What happens to its close year severity? {Example}
> - In 2024 the paid losses are $800 \times 2{,}000 + 200 \times 20{,}000 = \$5{,}600{,}000$ on 1,000 claims, a severity of $\$5{,}600$.
> - In 2025 they are $1{,}200 \times 2{,}000 + 200 \times 20{,}000 = \$6{,}400{,}000$ on 1,400 claims, a severity of $\$4{,}571$.
> - The severity falls 18.4%, although no claim got cheaper. The closed claim count rose by more than the paid losses, because the extra closures were all small.
> - The fall is a change in the mix of claims closed, not a change in claim cost.

## Closed claims by accident year

In reserving, Friedland counts closed claims by accident year. A cell of the closed claim count triangle is the cumulative number of reported claims closed by that age. Dividing it by the accident year's ultimate claim count gives the disposal rate:

> $$\text{Disposal Rate} = \frac{\text{Cumulative Closed Claim Count}}{\text{Ultimate Claim Count}}$$

- $\text{Cumulative Closed Claim Count}$ is the number of the accident year's claims closed by the age.
- $\text{Ultimate Claim Count}$ is the selected ultimate number of claims for the accident year.

Friedland notes that other authors define the disposal rate differently. Disposal rates should increase with age, and at each age they should be stable across accident years unless the [[Settlement Rate|settlement rate]] has changed.

> [!example]- Accident year 2023 has 700 claims closed at 24 months and a selected ultimate claim count of 1,000. What is its disposal rate at 24 months? {Example}
> - The cumulative closed claim count is divided by the ultimate claim count.
> - The disposal rate is $700/1{,}000 = 70\%$ of the ultimate claims closed at 24 months.

## Closed claims and the Berquist-Sherman paid adjustment

The [[Berquist-Sherman Method|Berquist-Sherman]] paid claim adjustment restates paid claims at each age to the latest disposal rates. Its key assumption is that a higher percentage of closed claim counts relative to ultimate claim counts goes with a higher percentage of ultimate claims paid. A shift in which sizes of claim are closed breaks that assumption. If the department closes small claims faster, disposal rates rise while paid severity on closed claims falls, and the adjustment makes the accident years less comparable rather than more.

> [!trap] Reading a change in mix as a severity trend
> A trend fitted through the backlog year above would show claim costs falling 18.4%. It is a change in which claims closed. Check closed claim counts and claims handling before selecting a severity trend from closed-claim data.
