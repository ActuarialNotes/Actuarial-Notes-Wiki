---
verification:
  status: stale
  confidence: null
  last_checked: 2026-10-31
  last_checked_by: agent:validate-v1
  content_hash: sha256:992b8a930290d06b2da6ada544b7236fa7f76281897340872046b244d19d4db6
  sources:
    - "Friedland, Estimating Unpaid Claims Using Basic Techniques (CAS, 2010), Ch. 4 p. 44 (policy limits and deductibles); Ch. 6 p. 76 (deductibles and retentions distort averages); Ch. 7 p. 96; Ch. 13 p. 283 (policy year instead of accident year after a change in limits or deductibles), sha256:5e9830823346d2001d9bdcebecd0d0d399cac32a9a63d5cf021a6c7f03d50464 — https://www.casact.org/sites/default/files/2021-03/5_Friedland.pdf"
    - "Werner & Modlin, Basic Ratemaking (CAS, 5th ed. May 2016), Ch. 6 pp. 100-104 (benefit changes, direct/indirect effects, restating claims, parallelogram for policies written after the change); Ch. 6 p. 110 (adjust trend data for benefit changes); Ch. 11 p. 199 (deductibles), sha256:6b214d4db52674df2e83343920c06781e491254bd77f27e32ba312faaff3782c — https://www.casact.org/sites/default/files/2021-03/5_Werner_Modlin.pdf"
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Policy Provision Changes.md
---

**Policy Provision Changes** are changes in the terms of the contract itself — deductibles, limits, sub-limits, exclusions, coverage triggers, benefit levels — that alter how loss is shared between insurer and insured for the *same* underlying risk.

> $$\text{Adjusted Loss} = \sum_i \left[\min(X_i, L_{\text{new}}) - \min(X_i, d_{\text{new}})\right]$$

- Unlike [[Underwriting Changes|underwriting changes]], which change *which risks* are written, provision changes change *what is covered* on the risks already there. That makes them far easier to quantify: the effective date is known, the terms are documented, and the historical claims can be re-valued under the new provisions.
- The adjustment is a **pro-forma restatement**: take each historical claim and recompute what the insurer would have paid under the new terms, then develop the restated history. This is exactly the [[Loss Elimination Ratio|loss elimination ratio]] calculation applied retrospectively.
- Provision changes affect the **development pattern**, not only the level. A higher deductible eliminates small, fast-closing claims, so the surviving claims are larger and slower — the restated triangle has a longer tail and a different shape, and simply scaling the old factors is wrong.
- Changes attach to the **policy**, so they phase in over the policy term. On a [[Policy Year]] basis the change is clean; on an [[Accident Year]] basis it phases in over roughly two years, which is one of the few situations where policy year is the better reserving basis.
- **Benefit-level changes** in statutory lines (workers compensation reform, auto no-fault changes) are the same problem at industry scale, and are handled by a law-level adjustment factor applied to historical losses before trend — deliberately kept separate from trend so the two are not confused.
- On the pricing side the same restatement is required, or the indication prices coverage the insurer no longer sells.

## Benefit changes in workers compensation

Werner & Modlin (Ch. 6 and App. D) work the statutory case through for [[Workers Compensation Insurance|workers compensation]], where the statute sets the benefit structure.

- **The weekly indemnity benefit.** The statute sets a compensation rate, a percentage of the worker's pre-injury wage, and a minimum and a maximum weekly benefit, each stated as a percentage of the state average weekly wage (SAWW). A worker's weekly benefit is the compensation rate times the wage, raised to the minimum if it falls below it and cut to the maximum if it exceeds it.
- **Direct effect.** The direct effect of a change is found by calculating the benefits before and after the change over the distribution of workers by wage, then dividing total benefits after by total benefits before and subtracting one. Each wage band below the minimum or above the maximum is paid the limit times its number of workers; a band between the limits is paid the compensation rate times its total wages, which is the band's average wage times its number of workers.
- **Who a change in a limit reaches.** Lowering the maximum benefit cuts benefits only for the higher-wage workers whose benefit is at or above the new maximum, and more workers are capped the lower it falls; workers paid the minimum or the compensation rate times their wage are unaffected. A change in the minimum likewise reaches only the low-wage workers it binds.
- **Indirect effects** arise from changes in claimant behaviour as a consequence of the benefit change, and are much harder to quantify than direct effects. A benefit that replaces more of the wage may make workers more inclined to file claims and give claimants less incentive to return to work in a timely manner, so claim frequency and duration may rise; a benefit that replaces less may work the other way, and only on the workers whose benefit it changes. With no data to estimate it, the indirect effect is set judgmentally (Werner & Modlin, Ch. 6).
- **Putting history on current benefit level.** In Werner & Modlin's workers compensation indication (App. D), each accident year's indemnity losses are multiplied by the cumulative product of the annual benefit-level changes in the years after it, so a year's own change is not applied to it, and then by any known change after the experience period. Werner & Modlin's annual figures combine the benefit-level change with the impact of wage inflation on benefits.

![[Media/Figures/Policy_Provision_Changes.svg|340]]

> [!example]- Restating for a Deductible Increase {Example}
> A commercial auto programme raises its per-occurrence deductible from $\$1{,}000$ to $\$5{,}000$ effective $1/1/2024$. A sample of $1{,}000$ historical claims:
>
> | Claim size | Count | Total losses |
> |---|---|---|
> | $\$1{,}000$–$\$5{,}000$ | $600$ | $\$1{,}800{,}000$ |
> | over $\$5{,}000$ | $400$ | $\$6{,}200{,}000$ |
>
> (All figures are already net of the old $\$1{,}000$ deductible.) Restate the historical losses to the new deductible.
>
> > [!answer]-
> > Under the new $\$5{,}000$ deductible, the insurer pays nothing on the first group and $\$4{,}000$ less on each claim in the second:
> >
> > $$\begin{align*}
> > \text{Eliminated (small claims)} &= \$1{,}800{,}000 \\
> > \text{Eliminated (layer on large)} &= 400 \times \$4{,}000 = \$1{,}600{,}000 \\[4pt]
> > \text{Total eliminated} &= \$3{,}400{,}000 \\[4pt]
> > \text{Restated losses} &= \$8{,}000{,}000 - \$3{,}400{,}000 \\
> > &= \$4{,}600{,}000
> > \end{align*}$$
> >
> > The loss elimination ratio is $\$3{,}400{,}000/\$8{,}000{,}000 = 42.5\%$.
> >
> > But note what else changed: **claim counts fell from $1{,}000$ to $400$** — $60\%$ of claims disappear entirely. Average severity on the restated basis is $\$4{,}600{,}000/400 = \$11{,}500$ against $\$8{,}000$ before. The restated book has fewer, larger, slower claims, so its development pattern is longer-tailed. Applying the old factors to the restated triangle would understate ultimate.

> [!example]- A Provision Change Across Accident and Policy Years {Example}
> The same deductible change takes effect for policies written on or after $1/1/2024$. All policies are annual and written uniformly.
>
> How does the change appear on each aggregation basis?
>
> > [!answer]-
> > **Policy year** — PY 2023 is entirely old-deductible business and PY 2024 entirely new. Clean, immediate, and fully comparable after restatement.
> >
> > **Accident year** — AY 2024 losses arise from both $2023$-written policies (old deductible, running off) and $2024$-written policies (new). With uniform writing, roughly half of AY 2024's exposure is on each basis, and AY 2025 is the first fully-new year.
> >
> > So on an accident year basis the change phases in over **two years**, at approximately $50\%$ and $100\%$. Restating AY 2024 requires applying the loss elimination ratio to only the affected half of the exposure — which requires knowing, claim by claim, which policy it arose under.
> >
> > This is one of the specific situations where [[Policy Year]] earns its longer development period: when the thing that changed attaches to the policy, only the policy-year cohort isolates it. The general rule from [[Ratemaking Data Organization]] applies — use the most responsive basis that can be *corrected* to current conditions, and here the correction on an accident year basis is materially harder.
