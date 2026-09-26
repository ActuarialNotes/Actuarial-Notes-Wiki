---
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:f5d3844593f77904c7b421f6b96880e635e144cb66becf09066561030fe8108a
  sources: []
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Extension of Exposures.md
---

**Extension of Exposures** is the [[On-Leveling|on-leveling]] method that re-rates every historical policy under the rates in effect today, using each policy's own rating characteristics, so that historical premium is restated at the current rate level policy by policy rather than by an average factor.

> $$\text{Premium at CRL} = \sum_{j} P_{\text{current}}(\mathbf{x}_j,\ e_j)$$

> $$\text{Implied OLF} = \frac{\sum_j P_{\text{current}}(\mathbf{x}_j, e_j)}{\sum_j P_{\text{historical}, j}}$$

- $\mathbf{x}_j$ is policy $j$'s set of rating characteristics (class, territory, limit, deductible, …), $e_j$ its exposure, and $P_{\text{current}}$ the premium the current [[Rating Algorithm|rating algorithm]] — rates, relativities, fees — produces for it. The result is [[On Level Premium|on-level premium]] for whatever cohort the policies are summed over.
- **The most accurate current-rate-level method** (Werner & Modlin), given the data. Computing power is no longer the obstacle; the obstacle is having every historical policy's rating characteristics, which companies often do not have readily available. Policies with identical characteristics may be grouped, which in practice helps only in lines with simple algorithms.
- **Why accuracy matters:** because each policy is re-rated, changes that differed by class, territory or fee are reflected exactly, and so is the mix of business in the historical period. The premium is on-level *by segment* — which the [[Parallelogram Method|parallelogram method]]'s single average factor cannot deliver — so it is the method needed for [[Classification Ratemaking|classification]] and territorial analyses. Werner notes that this has moved many companies to it, especially in lines with complex, frequently changed rating structures such as personal auto and homeowners.
- **Where it struggles:** a characteristic the current algorithm uses but historical records never captured cannot be re-rated; and in commercial lines, subjective [[Schedule Rating|schedule rating]] debits and credits are hard to restate to today's guidelines. Werner suggests measuring how debit and credit practice has changed from its distribution over recent years.
- It restates *rates*, not risks: drift in average premium from a changing book at constant rates is [[Premium Trend|premium trend]], handled separately. In reserving, Friedland describes the same re-rating as computer-intensive and not always feasible, with the aggregate method as the fallback for on-level premium used in expected claim ratios.

> [!example]- Re-rating a Policy Year {Example}
> Rating algorithm: premium $=$ base rate $\times$ territory factor $\times$ class factor $+$ policy fee. All policies are annual with one exposure each.
>
> | | Historical (PY 2024) | Current |
> |---|---|---|
> | Base rate | $\$600$ | $\$630$ |
> | Territory 2 factor | $1.25$ | $1.35$ |
> | Class B factor | $1.40$ | $1.30$ |
> | Policy fee | $\$40$ | $\$50$ |
>
> Territory 1 and class A have factor $1.00$ throughout. PY 2024 wrote $400$ T1/A, $250$ T2/A, $200$ T1/B and $150$ T2/B policies. Compute premium at current rate level in total and by class.
>
> > [!answer]-
> > Per-policy premium, historical → current:
> >
> > - T1/A: $\$640 \to \$680$
> > - T2/A: $\$790 \to \$900.50$ $(630 \times 1.35 + 50)$
> > - T1/B: $\$880 \to \$869$ $(630 \times 1.30 + 50)$
> > - T2/B: $\$1{,}090 \to \$1{,}155.65$ $(630 \times 1.35 \times 1.30 + 50)$
> >
> > $$
> > \begin{align*}
> > \text{Historical} &= \$453{,}500_A + \$339{,}500_B = \$793{,}000 \\
> > \text{Current} &= \$497{,}125_A + \$347{,}147.50_B = \$844{,}272.50 \\
> > \text{Implied OLF} &= 844{,}272.50 / 793{,}000 = 1.0647 \\
> > \text{OLF}_A &= 497{,}125 / 453{,}500 = 1.0962 \\
> > \text{OLF}_B &= 347{,}147.50 / 339{,}500 = 1.0225
> > \end{align*}
> > $$
> >
> > The book-wide factor is $1.0647$, but class A moved $9.6\%$ and class B only $2.3\%$ because the class B relativity was cut. Applying $1.0647$ to both would overstate class B's on-level premium by about $4\%$ and understate class A's by about $3\%$ — enough to corrupt a class relativity review built on loss ratios.

> [!example]- Schedule Rating in a Commercial Book {Example}
> A commercial property book's historical policies re-rate to $\$5{,}000{,}000$ of manual premium at current rates. Historically, underwriters applied schedule credits averaging $12\%$ (average modification $0.88$). Under current guidelines, credits over the last several quarters have averaged $5\%$ ($0.95$). How should the premium at current rate level be stated?
>
> > [!answer]-
> > Keeping each policy's historical modification gives
> >
> > $$\$5{,}000{,}000 \times 0.88 = \$4{,}400{,}000$$
> >
> > but today's underwriters would not grant those credits. Restating to current practice:
> >
> > $$\$5{,}000{,}000 \times 0.95 = \$4{,}750{,}000$$
> >
> > The difference is $0.95 / 0.88 - 1 = 8.0\%$ of premium — as large as a typical rate change. Using the historical modifications would understate on-level premium, overstate the historical loss ratios, and inflate the indicated rate level by about $8\%$. The restatement rests on a judgment about current debit and credit practice, read from the recent distribution of schedule modifications, and it should be documented as such.
