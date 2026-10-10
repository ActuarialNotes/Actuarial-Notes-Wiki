---
verification:
  status: verified
  confidence: medium
  last_checked: 2026-10-09
  last_checked_by: agent:validate-v1
  content_hash: sha256:0e0b2f3659c55b333485503b8c7475dc25638103c98c36d775e1a10b7a05bba2
  sources:
    - "Werner & Modlin, Basic Ratemaking (CAS, 5th ed. May 2016), Ch. 3 pp.42-44 (PDF pp.54-56); Ch. 5 p.69 (PDF p.81), sha256:6b214d4db52674df2e83343920c06781e491254bd77f27e32ba312faaff3782c — https://www.casact.org/sites/default/files/2021-03/5_Werner_Modlin.pdf"
    - "Friedland, Estimating Unpaid Claims Using Basic Techniques (CAS, 3rd ed. 2010), Ch. 3 pp.36, 39-40 (PDF pp.42, 45-46), sha256:5e9830823346d2001d9bdcebecd0d0d399cac32a9a63d5cf021a6c7f03d50464 — https://www.casact.org/sites/default/files/2021-03/5_Friedland.pdf"
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Calendar Year.md
---

**Calendar Year** (CY) is a data aggregation method that groups every transaction by the calendar year in which it is *booked* — premium as it is earned, losses as they are paid or as case reserves change — without regard to the policy's effective date or the claim's accident date.

> $$\text{CY Earned Premium} = \text{Written Premium} - \Delta\text{UEP}$$

> $$\text{CY Reported Losses} = \text{Paid} + \Delta\text{Case Reserves}$$

> $$\text{CY Incurred Losses (finance)} = \text{Paid} + \Delta\text{Case Reserves} + \Delta\text{IBNR}$$

- $\Delta\text{UEP}$ is the change in the [[Unearned Premium|unearned premium reserve]] over the year; $\Delta$ terms are ending balance minus beginning balance.
- Werner & Modlin and Friedland both define calendar-year **reported** losses as paid losses plus the change in case reserves. The IBNR-inclusive form is the finance department's "incurred" figure (Friedland).
- CY is the **financial reporting** basis: most insurers report financially by calendar year, so the data is available quickly once the year ends and costs nothing extra to aggregate for ratemaking.
- A calendar year **never develops** — it is closed and fixed the moment the books close. Friedland counts that as an advantage and also as a disadvantage: calendar-year data cannot address development.
- CY incurred losses **mix accident years**: a CY 2024 figure contains payments and reserve changes on claims from $2024$ and from every prior year. A single large reserve strengthening on a $2018$ claim lands entirely in CY 2024 and contaminates the CY 2024 loss ratio.
- Because of that mismatch, Werner & Modlin say calendar-year aggregation for ratemaking may be most appropriate for lines or coverages whose losses are reported and settled relatively quickly, such as homeowners. [[Accident Year]] aggregation matches premium and losses better, and [[Policy Year]] best — see [[Ratemaking Data Organization]].
- Accident-year aggregation takes its premium and exposures on the calendar-year basis — Werner & Modlin note the method is often called *calendar-accident year* — and Friedland observes that actuaries often use calendar-year exposures with accident-year claims. [[Policy Year]] premium is aggregated differently, by policy effective date.

![[Media/Figures/Calendar_Year.svg|340]]

> [!example]- Calendar Year Earned Premium from Written Premium {Example}
> An insurer writes $\$5{,}000{,}000$ of $12$-month policies during calendar year $2024$. The unearned premium reserve was $\$1{,}800{,}000$ at $12/31/2023$ and $\$2{,}400{,}000$ at $12/31/2024$.
>
> Calculate CY 2024 earned premium, and explain what the change in UEP says about the book.
>
> > [!answer]-
> > $$\begin{align*}
> > \text{CY 2024 EP} &= \text{WP} - (\text{UEP}_{\text{end}} - \text{UEP}_{\text{begin}}) \\
> > &= \$5{,}000{,}000 - (\$2{,}400{,}000 - \$1{,}800{,}000) \\
> > &= \$5{,}000{,}000 - \$600{,}000 \\
> > &= \$4{,}400{,}000
> > \end{align*}$$
> >
> > Written premium exceeds earned premium because the unearned reserve grew: the book is **growing** (or prices rose). In a shrinking book the UEP falls and earned premium exceeds written premium.

> [!example]- How a Prior-Year Reserve Change Distorts the Calendar Year {Example}
> An insurer's CY 2024 results: paid losses $\$7{,}200{,}000$; case reserves $\$5{,}000{,}000$ at $12/31/2023$ and $\$6{,}100{,}000$ at $12/31/2024$; IBNR $\$3{,}000{,}000$ at $12/31/2023$ and $\$3{,}400{,}000$ at $12/31/2024$. Of the reserve movement, $\$900{,}000$ is adverse development on accident years $2021$ and prior. Earned premium is $\$12{,}000{,}000$.
>
> Compute the CY 2024 loss ratio and comment on its use for ratemaking.
>
> > [!answer]-
> > $$\begin{align*}
> > \text{CY incurred} &= 7{,}200{,}000 + (6{,}100{,}000 - 5{,}000{,}000) \\
> > &\quad + (3{,}400{,}000 - 3{,}000{,}000) \\
> > &= \$8{,}700{,}000 \\[4pt]
> > \text{CY 2024 LR} &= \frac{\$8{,}700{,}000}{\$12{,}000{,}000} \\
> > &= 72.5\%
> > \end{align*}$$
> >
> > Stripping the prior-year strengthening:
> >
> > $$\frac{\$8{,}700{,}000 - \$900{,}000}{\$12{,}000{,}000} = 65.0\%$$
> >
> > The $7.5$ point gap is entirely about accident years $2021$ and prior. Using $72.5\%$ to set $2026$ rates would charge today's policyholders for a five-year-old reserving miss — the reason a rate indication is built on accident-year losses developed to ultimate, not on the calendar year the accountants report.
