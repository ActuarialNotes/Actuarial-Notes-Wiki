---
verification:
  status: verified
  confidence: medium
  last_checked: 2026-10-09
  last_checked_by: agent:validate-v1
  content_hash: sha256:3bf4e88c71212bed15553b6a0073277a3b55a6b6e7e2dd8c6b04104698e25496
  sources:
    - "Werner & Modlin, Basic Ratemaking (CAS, 5th ed. May 2016), Ch. 5 p.64 and pp.81-88 (PDF p.76, pp.93-100), sha256:6b214d4db52674df2e83343920c06781e491254bd77f27e32ba312faaff3782c — https://www.casact.org/sites/default/files/2021-03/5_Werner_Modlin.pdf"
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Premium Trend.md
---

**Premium Trend** is the change over time in the average premium per exposure at a *constant rate level* — the drift caused by distributional shifts in the policies written (amounts of insurance, limits, deductibles, [[Mix of Business|mix of business]]), as distinct from deliberate [[Rate Change|rate changes]], which [[On-Leveling|on-levelling]] handles, and from inflation in an inflation-sensitive exposure base, which Werner & Modlin treat as [[Exposure Trend|exposure trend]].

> $$\text{Average Premium at Current Rate Level} = \frac{\text{On-Level Premium}}{\text{Earned Exposures}}$$

> $$\text{Premium Trend Factor} = (1 + t_P)^{n}$$

- The trend is measured on the **average premium per exposure at current rate level**, usually from written data — a leading indicator, reflecting distributional shifts sooner than earned premium — often quarterly. An exponential or linear fit may guide the selection, though Werner & Modlin note curve-fitting is usually unnecessary because the changes are normally consistent from period to period.
- The trend period $n$ runs from the average written date of the policies earning premium in the experience period to the **average written date of the policies in effect while the new rates are** — for calendar-year 2011 earned premium and annual policies written in 2013, $1/1/2011$ to $6/30/2013$, or $2.5$ years. Measuring between average *earned* dates gives the same $2.5$ years, because both dates shift by the same amount; with six-month policies the trend-from date moves to $4/1/2011$ and the period is $2.25$ years.
- **One-step trending** applies a single selected annual trend across the whole period. It is adequate when the drift has been steady.
- **Two-step trending** is used when the recent history contains a shift the historical fit would understate or overstate. Step one brings historical average earned premium up to the **current** average written premium level (a known, observed figure); step two projects forward from there at a selected prospective trend:

> $$\text{Step 1} = \frac{\text{Latest avg written premium at CRL}}{\text{Historical avg earned premium at CRL}}$$

> $$\text{Step 2} = (1 + t_P)^{n_2}$$

- Premium trend matters where the book is drifting — homeowners amounts of insurance indexed to inflation, a move of insureds to higher deductibles, the acquisition of a book of higher-valued homes (Werner & Modlin's three examples). The actuary decides whether an observed shift was a one-time event or will continue, and where the mix is stable the trend is near zero.
- Premium trend is not needed for a [[Pure Premium Method]] indication: only the loss ratio approach requires the actuary to estimate the premium to be collected in the future period.

![[Media/Figures/Premium_Trend.svg|340]]

> [!example]- One-Step Premium Trend {Example}
> A homeowners book has on-level earned premium of $\$5{,}000{,}000$ for accident year $2024$. Average premium at current rate level has been rising $3.0\%$ a year with rising amounts of insurance. The trend period from the average written date of AY 2024 to the average written date of the forecast period is $2.0$ years.
>
> Compute trended on-level premium.
>
> > [!answer]-
> > $$\begin{align*}
> > \text{Trend factor} &= 1.03^{2.0} \\
> > &= 1.0609 \\[4pt]
> > \text{Trended premium} &= \$5{,}000{,}000 \times 1.0609 \\
> > &= \$5{,}304{,}500
> > \end{align*}$$
> >
> > The projected loss ratio is then computed against $\$5{,}304{,}500$ rather than $\$5{,}000{,}000$. Omitting the adjustment would overstate the loss ratio by $6\%$ relative and indicate a rate increase the insurer does not need — because average premium is already rising on its own as insured values grow.

> [!example]- Two-Step Trending After a Mix Shift {Example}
> An auto insurer introduced a higher-deductible option in mid-$2024$, and take-up moved quickly. Average premium at current rate level:
>
> | Period | Avg. earned premium (CRL) | Avg. written premium (CRL) |
> |---|---|---|
> | AY $2023$ | $\$820$ | $\$835$ |
> | AY $2024$ | $\$835$ | $\$810$ |
> | Latest quarter | — | $\$798$ |
>
> The historical fitted trend is $+1.8\%$; the actuary selects $+1.0\%$ prospectively. AY 2024 is the experience year, and the forecast period's average written date is $1.75$ years after the latest quarter's.
>
> Trend AY 2024 average earned premium.
>
> > [!answer]-
> > The historical fit is misleading — average earned premium rose while average *written* premium fell, because the earned figures still contain pre-shift policies. One-step trending at $+1.8\%$ would project the average premium upward when the book is actually moving down.
> >
> > **Step 1** — restate AY 2024 average earned premium to the current written level:
> >
> > $$\frac{\$798}{\$835} = 0.9557$$
> >
> > **Step 2** — project forward at the selected trend:
> >
> > $$1.010^{1.75} = 1.0176$$
> >
> > $$\begin{align*}
> > \text{Combined} &= 0.9557 \times 1.0176 \\
> > &= 0.9725
> > \end{align*}$$
> >
> > AY 2024 premium is trended **down** by $2.75\%$. The deductible shift genuinely reduces the premium the insurer will collect per exposure going forward — and, importantly, it reduces expected losses too, so the corresponding adjustment must also be made on the loss side ([[Deductible Rating]]) rather than left to show up as a spurious rate need.
