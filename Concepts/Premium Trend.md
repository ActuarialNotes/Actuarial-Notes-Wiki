---
verification:
  status: stale
  confidence: null
  last_checked: 2026-10-09
  last_checked_by: agent:validate-v1
  content_hash: sha256:405aaa51834af4d34e130e689f6ee338396b405f5e66ba5dccc5661b80eb9778
  sources:
    - "Werner & Modlin, Basic Ratemaking (CAS, 5th ed. May 2016), Ch. 5 p.64 and pp.81-88 (PDF p.76, pp.93-100), sha256:6b214d4db52674df2e83343920c06781e491254bd77f27e32ba312faaff3782c — https://www.casact.org/sites/default/files/2021-03/5_Werner_Modlin.pdf"
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Premium Trend.md
---

![[Media/Figures/Premium_Trend.svg|340]]

**Premium Trend** is the change over time in the average premium per exposure at a *constant rate level*. It is the drift caused by distributional shifts in the policies written (amounts of insurance, limits, deductibles, [[Mix of Business|mix of business]]), as distinct from deliberate [[Rate Change|rate changes]], which [[On-Leveling|on-leveling]] handles. Inflation in an inflation-sensitive exposure base also moves the average premium, and Werner & Modlin treat it as [[Exposure Trend|exposure trend]]. The trend is measured on

> $$\text{Average Premium at Current Rate Level} = \frac{\text{On-Level Premium}}{\text{Exposures}}$$

- $\text{On-Level Premium}$ is the premium at current rate level, from [[On Level Premium|on-leveling]].
- $\text{Exposures}$ are in the exposure base that underlies the rate, on the same basis as the premium.

The trend is measured on the **average premium per exposure at current rate level**, usually from written data and often quarterly. Written premium is a leading indicator, reflecting distributional shifts sooner than earned premium. Total premium is not used, because a growing book has growing total premium even when its mix is unchanged. The selected annual trend $t_P$ is applied over a trend period of $n$ years:

> $$\text{Premium Trend Factor} = (1 + t_P)^{n}$$

Werner & Modlin's three examples are homeowners amounts of insurance indexed to inflation, a move of insureds to higher deductibles, and the acquisition of a book of higher-valued homes. The actuary decides whether an observed shift was a one-time event or will continue. Premium trend is not needed for a [[Pure Premium Method|pure premium method]] indication, since only the loss ratio approach requires the premium to be collected in the future period.

> [!example]- A homeowners book has on-level earned premium of $\$5{,}000{,}000$ for Accident Year 2024. Average premium at current rate level has been rising 3% a year with rising amounts of insurance, and the trend period is 2.0 years. What is the trended on-level premium? {Example}
> - The premium trend factor is $1.03^{2.0} = 1.0609$.
> - The trended on-level premium is $5{,}000{,}000 \times 1.0609 = \$5{,}304{,}500$.
> - The projected loss ratio is computed against $\$5{,}304{,}500$, because average premium is rising on its own as insured values grow.

## The premium trend period

The trend period $n$ runs from the average written date of the policies earning premium in the experience period to the **average written date of the policies in effect while the new rates are** in effect.

> [!example]- Rates will take effect on $1/1/2013$ for one year, on annual policies. The experience period is Calendar Year 2011 earned premium, and premium trend is 2% a year. What are the trend period and the premium trend factor? {Example}
> - Calendar Year 2011 earned premium comes from policies written from $1/1/2010$ to $12/31/2011$, so its average written date is $1/1/2011$.
> - The policies written under the new rates have an average written date of $6/30/2013$.
> - The trend period is $1/1/2011$ to $6/30/2013$, or $2.5$ years, and the factor is $1.02^{2.5} = 1.0508$.
> - Measuring between average *earned* dates gives the same $2.5$ years, because both dates shift by the same amount.
> - For the same rates, with six-month policies the trend-from date moves to $4/1/2011$ and the period is $2.25$ years.
> - For Policy Year 2011 premium the trend-from date is $7/1/2011$ and the period is 2 years.

## Two-step trending

**One-step trending** applies a single selected annual trend across the whole period. It is adequate when the drift has been steady. **Two-step trending** is used when the recent history contains a shift the historical fit would understate or overstate. Step one brings historical average earned premium up to the **current** average written premium level, a known, observed figure. Step two projects forward from there at a selected prospective trend:

> $$\text{Step 1} = \frac{\text{Latest avg written premium at CRL}}{\text{Historical avg earned premium at CRL}}$$

> $$\text{Step 2} = (1 + t_P)^{n_2}$$

- CRL is the current rate level.
- $n_2$ is the period from the average written date of the latest data point to the average written date of the policies under the new rates.

The premium trend factor is Step 1 times Step 2.

> [!example]- An auto insurer introduced a higher-deductible option in mid-2024, and take-up moved quickly. Accident Year 2024's average earned premium at current rate level is $\$835$, and the latest quarter's average written premium at current rate level is $\$798$. The selected prospective trend is +1.0%, over 1.75 years. What is the premium trend factor for 2024? {Example}
> - Step 1 restates 2024's average earned premium to the latest written level, $798/835 = 0.9557$.
> - Step 2 projects forward at the selected trend, $1.010^{1.75} = 1.0176$.
> - The premium trend factor is $0.9557 \times 1.0176 = 0.9725$, a trend of 2.75% **down**.
> - The deductible shift reduces the premium the insurer will collect per exposure going forward.
> - It reduces expected losses too, so the matching adjustment is made on the loss side ([[Deductible Rating]]).

> [!trap] Measuring premium trend on averages not at current rate level
> Average premium that has not been brought to current rate level jumps at each rate change. A trend fitted through that jump adjusts for the rate change twice, once in the on-level factor and once in the premium trend. Put the averages at current rate level first.
