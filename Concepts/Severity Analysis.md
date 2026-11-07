---
verification:
  status: stale
  confidence: null
  last_checked: 2026-10-31
  last_checked_by: agent:validate-v1
  content_hash: sha256:22e9337fb408b4be39edf5d3b0464098ac5cea931d49dd7147ef30cd0fb24d2d
  sources:
    - "Friedland, Estimating Unpaid Claims Using Basic Techniques (CAS, Third Version, July 2010), Ch. 6 pp. 71, 76-82; Ch. 11 p. 210; Ch. 13 pp. 291-292 (PDF pages), sha256:5e9830823346d2001d9bdcebecd0d0d399cac32a9a63d5cf021a6c7f03d50464 — https://www.casact.org/sites/default/files/2021-03/5_Friedland.pdf"
    - "Werner & Modlin, Basic Ratemaking (CAS, 5th ed. May 2016), Ch. 6 p. 94 (PDF p. 106), sha256:6b214d4db52674df2e83343920c06781e491254bd77f27e32ba312faaff3782c — https://www.casact.org/sites/default/files/2021-03/5_Werner_Modlin.pdf"
  open_findings: 1
  open_critical: 0
  log: .verify/Concepts/Severity Analysis.md
---

![[Media/Figures/Severity_Analysis.svg|340]]

**Severity Analysis** is the study of average claim size, or [[Severity|severity]], by accident year and age, used to diagnose what a [[Development Triangle|development triangle]] is doing and to select a [[Loss Trend|severity trend]]. An accident year's average severity at an age is

> $$\text{Severity} = \frac{\text{Claims}}{\text{Claim Counts}}$$

- $\text{Claims}$ and $\text{Claim Counts}$ are cumulative and measured to the same age.
- They must be measured consistently: reported claims over reported claim counts, paid claims over closed claim counts, or ultimate claims over ultimate claim counts.

A severity triangle holds these averages for each accident year at each age, and it can be developed with age-to-age factors of its own. Mixing measures, such as reported claims over closed counts, gives a series that measures nothing. An incremental paid severity is the incremental paid claims of a period divided by the claims closed in the same period.

> [!example]- An accident year has $\$4{,}200{,}000$ of reported claims on 1,400 reported claims, and $\$2{,}000{,}000$ paid on 800 closed claims, at 24 months. What are its average reported and average paid claims? {Example}
> - The average reported claim is $4{,}200{,}000/1{,}400 = \$3{,}000$.
> - The average paid claim is $2{,}000{,}000/800 = \$2{,}500$.

## Reading a severity triangle

Severity triangles are read down the columns, comparing accident years at the same age, because movement along a row is development. In a stable environment the averages down a column grow only at the severity trend, and each calendar year diagonal shows that year's inflation. Three forces move a severity down a column:

1. **Cost inflation**, such as medical, wage, repair and legal costs.
2. **[[Large Loss|Large losses]]**, a shock claim in one year, which is why severity is often studied on claims limited to a threshold.
3. **[[Mix of Business|Mix]]**, a shift toward larger insureds or higher limits, or a change in which claims are open or closed at an age.

Splitting the triangle by segment shows whether one part of the book is driving a shift. A change in the profile of the insureds, such as a workforce moving to lower-hazard jobs, changes severity too, so the history is adjusted to the current profile or only the relevant years are used.

> [!example]- A book closes 100 claims for $\$1{,}000{,}000$ in a year. A new claims push also closes 50 small claims for $\$2{,}000$ each in the same year. What happens to the average closed claim? {Example}
> - Without the push, the average closed claim is $1{,}000{,}000/100 = \$10{,}000$.
> - With it, the average is $(1{,}000{,}000 + 50 \times 2{,}000)/150 = \$7{,}333$.
> - The count rose by more than the paid claims, so the average fell 27% with no change in what any claim costs.
> - The fall is a change in mix and is kept out of the selected severity trend.

## Severity trend

The annual severity trend $t$ between two accident years $n$ years apart is

> $$t = \left(\frac{\text{Later Severity}}{\text{Earlier Severity}}\right)^{1/n} - 1$$

- $\text{Later Severity}$ and $\text{Earlier Severity}$ are the two years' severities at the same age, or at ultimate.

The trend is selected from the changes in average paid severity, which no case reserving practice affects, rather than from total claims or average case outstanding. A severity change caused by claims processing or mix is not a loss cost trend.

> [!example]- Ultimate severities are $\$5{,}000$ for accident year 2021 and $\$6{,}000$ for accident year 2023. What is the annual severity trend? {Example}
> - The years are $n = 2$ apart.
> - The trend is $(6{,}000/5{,}000)^{1/2} - 1 = 1.0954 - 1 = 9.5\%$.
> - Two points give a number but not a pattern, so a selection uses the whole series.

## Severity as a reserving diagnostic

Average case outstanding per open claim is the severity that tests [[Case Adequacy|case adequacy]]. A rise faster than the severity trend down the columns, on the latest diagonal at every age, is a strengthening of case outstanding. A rise in one accident year only is a change in that year's claims. Rising paid and reported severities down a column can come from larger claims closing faster or from stronger case outstanding, so they are read with the claim count triangles.

> [!example]- Average case outstanding per open claim is 9,000, 14,500 and 21,000 at 12, 24 and 36 months for accident year 2021, 9,300, 15,100 and 27,500 for 2022, 9,500 and 19,600 for 2023, and 12,400 at 12 months for 2024. What has happened? {Example}
> - At 12 months the averages rose 3.3% and 2.2% a year, then 30.5% for 2024.
> - At 24 months they rose 4.1%, then 29.8% for 2023.
> - At 36 months they rose 31.0% for 2022.
> - The jump sits on the latest diagonal at every age and is the same size, so case outstanding was strengthened during 2024.
> - The reported development technique is now biased high, because its factors come from weaker reserves, while the paid technique is unaffected.
> - The [[Berquist-Sherman Method|Berquist-Sherman]] adjustment restates the historical average case outstanding by detrending the latest diagonal at the selected severity trend, and the reported triangle is rebuilt from it.

Severity analysis is the basis of the [[Frequency-Severity Method|frequency-severity techniques]], which project ultimate claim counts and ultimate severities separately and multiply them.
