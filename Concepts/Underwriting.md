---
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:7e889f7459d232c0dacf09c8d7d8c64c562dfe7e5ef72a7b8e631a47c58d99fa
  sources: []
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Underwriting.md
---

**Underwriting** is an insurer's process of evaluating, selecting and classifying the risks offered to it — deciding whether to accept each one, on what terms and at what premium — so that the business actually written matches the assumptions built into the rates. It is the insurer's defence against [[Adverse Selection|adverse selection]]: pricing assumes an average risk in each class, and underwriting is what keeps the risks in the class average.

> $$\frac{E[L_i]}{P_i} \leq \text{PLR}$$

> $$P_i^{\text{req}} = \frac{E[L_i]}{\text{PLR}}$$

- $E[L_i]$ is the underwriter's estimate of expected losses for risk $i$, $P_i$ the premium it would be written at, and $\text{PLR}$ the permissible [[Loss Ratio|loss ratio]] — one minus the expense and profit provisions. A risk whose expected loss ratio at the offered price exceeds the PLR is declined, re-priced or written on different terms (a higher deductible, a sublimit, required risk control).
- **The P&C process** (DISC-RM, GI-201) runs in six steps: evaluate the submission (physical, moral and morale hazards, COPE for property, loss history), develop alternatives, select one, set the premium, implement, and monitor. Results are measured by [[Underwriting Profit|underwriting profit]]; [[Underwriting Changes|changes in underwriting]] shift the mix of risks and distort loss development and trend.
- **Life underwriting** (ILA-101) classifies individual applicants by mortality: full medical, simplified issue, guaranteed issue and data-driven accelerated programs trade underwriting cost and speed against [[Mortality|mortality]] slippage. Underwritten lives show **select** mortality, lower than ultimate, that wears off with duration.
- **Group health underwriting** (GH-101, CP-321) looks at the group rather than the person: size, industry, participation and contribution rules, prior claims experience and its [[Credibility|credibility]], large claimants and pooling levels. Where law forbids health-status underwriting — the ACA individual and small group markets — risk adjustment (GH-301) transfers money between insurers for the risks underwriting can no longer price.

> [!example]- Accept, Debit or Decline a Commercial Account {Example}
> A commercial property account rates to a manual premium of $\$80{,}000$. After reviewing its COPE details and loss history, the underwriter estimates expected losses of $\$58{,}000$. The permissible loss ratio is $65\%$ and schedule rating allows debits up to $25\%$. Should the account be written at manual, and if not, at what premium?
>
> > [!answer]-
> > $$
> > \begin{align*}
> > \text{ELR at manual} &= 58{,}000 / 80{,}000 \\
> > &= 72.5\% \\
> > P^{\text{req}} &= 58{,}000 / 0.65 \\
> > &= 89{,}231 \\
> > \text{Debit} &= 89{,}231 / 80{,}000 - 1 \\
> > &= 11.5\%
> > \end{align*}
> > $$
> >
> > At manual the account would run $7.5$ points above the PLR. A schedule debit of $11.5\%$ — inside the $25\%$ limit — brings it to $\$89{,}231$. If the market will not bear that price, the alternatives are terms that reduce expected loss (a higher deductible, sprinklers as a condition) or declining it.

> [!example]- Is Full Underwriting Worth Its Cost? {Example}
> A life insurer sells $\$250{,}000$ ten-year term at standard rates assuming $q = 0.002$ a year. Full medical underwriting costs $\$300$ per policy. Without it, $5\%$ of the applicants it now places as standard would be impaired lives with $q = 0.010$. Ignoring lapses and changes in $q$ over the term, and discounting at $4\%$ with claims at the start of each year, compare the mortality cost of dropping full underwriting with its cost.
>
> > [!answer]-
> > $$
> > \begin{align*}
> > q^{\text{pooled}} &= 0.95(0.002) + 0.05(0.010) \\
> > &= 0.0024 \\
> > \text{Extra claims a year} &= (0.0024 - 0.002)(250{,}000) \\
> > &= 100 \\
> > \ddot{a}_{\overline{10}|4\%} &= 8.4353 \\
> > \text{PV of slippage} &= 100 \times 8.4353 \\
> > &= 843.53
> > \end{align*}
> > $$
> >
> > Dropping full underwriting saves $\$300$ but adds about $\$844$ of expected claims per policy, so at this face amount full underwriting pays for itself. At small face amounts the slippage shrinks in proportion while the cost does not — which is why simplified issue and accelerated programs are offered below a face-amount limit.

> [!tip]- How it appears on the exam
> - GH-101 and CP-321: written recommendations of strategies for pricing, underwriting and funding a case-specific risk — participation requirements, large-claim pooling, credibility on the group's own experience — usually built on a calculation from the case.
> - GH-301: how risk adjustment substitutes for underwriting where health-status rating is barred, and its use in underwriting and pricing decisions for Medicare, Medicaid and ACA products.
> - ILA-101: describing and assessing underwriting approaches (full, simplified, accelerated, guaranteed issue) against cost, speed and mortality slippage — written answers.
> - DISC-RM and GI-201: the steps of the underwriting process, underwriting authority, and line-specific considerations (premises and products liability, auto, workers compensation, umbrella).

> [!warning]- Exam traps
> - Comparing expected losses with premium instead of with the PLR: a $72.5\%$ loss ratio is profitable only if expenses and profit need less than $27.5\%$.
> - Computing the debit as $(P^{\text{req}} - P)/P^{\text{req}}$: that gives $10.3\%$, not the $11.5\%$ that applied to manual reaches the required premium.
> - Expecting select mortality to last: an underwriting saving is largest in early durations and wears off, so a level saving over a long term overstates the value.
> - Describing ACA individual-market underwriting by health status: those products are guaranteed issue; selection is handled by risk adjustment and limited enrollment periods.
