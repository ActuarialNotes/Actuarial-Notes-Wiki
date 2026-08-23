---
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:ae069733cefe5d74f1991949d9deb7922dbb1e8d0a270cc0e8f1bd3e43fcf12d
  sources: []
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
