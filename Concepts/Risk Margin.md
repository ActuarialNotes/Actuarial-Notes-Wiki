---
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:9b61421b9596cc3c1cbfb51d8a14d4ca40809e764c1ac1d810e2cc2f56d98ce5
  sources: []
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Risk Margin.md
---

**A risk margin** is an amount held on top of a best (central) estimate to allow for the uncertainty in an insurance liability or in an insurer's risks. It carries two exam meanings. In unpaid-claim estimation (Exam 7) it is the loading above the central estimate of unpaid claims that brings the provision to a target probability of adequacy. In Canadian solvency (Exam 6C) the **risk margins** are the risk-by-risk capital requirements of the [[MCT]].

> $$\text{Risk margin} = V_p - \text{Central estimate}$$

> $$\text{Target capital} = \text{IR} + \text{MR} + \text{CR} + \text{OR} - \text{DC}$$

- $V_p$ is the $p$-th percentile of the liability's distribution, where $p$ is the probability of adequacy. IR, MR, CR and OR are the MCT's insurance, market, credit and operational risk margins, and DC is the [[Diversification Credit]].

### Exam 7: a margin over the central estimate (Marshall et al.)

- **Sources of uncertainty.**
  - **Independent risk** is the random part of process and parameter risk. It is measured with Mack, bootstrap, GLM or Bayesian models.
  - **Internal systemic risk** is specification error, parameter selection error and data error. It is scored against best practice on a **balanced scorecard**, with each indicator rated 1 to 5, and the weighted score is mapped to a CoV.
  - **External systemic risk** covers seven categories: economic and social; legislative, political and claims inflation; claim management process change; expense; event; latent claim; and recovery. Each is assessed directly.
- **Consolidation.** CoVs are set by valuation class, separately for outstanding claims and premium liabilities. They are combined across classes with judgmental correlations (nil, low $25\%$, medium $50\%$, high $75\%$, full). The three sources are taken as independent, so $\mathrm{CoV}^2 = \mathrm{CoV}_{\text{ind}}^2 + \mathrm{CoV}_{\text{int}}^2 + \mathrm{CoV}_{\text{ext}}^2$.
- **From CoV to margin.** Under a normal distribution the margin is $z_p \times \mathrm{CoV} \times$ the central estimate. A lognormal gives a smaller margin at $75\%$ and can give a larger one at $90\%$.
- **Checks on the result.** The margin is then tested with sensitivity testing, scenario testing, internal and external benchmarking, and hindsight analysis.
- Stochastic models capture independent risk well but systemic risk poorly. That is why a bootstrap percentile alone understates the margin (see [[Stochastic Reserving]] and [[Parameter Risk]]).

### Exam 6C: the MCT risk margins (Canada)

- The **[[Insurance Risk Margin|insurance risk margin]]** covers the [[Liability for Incurred Claims|liability for incurred claims]], unexpired coverage, unregistered reinsurance, and earthquake and nuclear catastrophe reserves (see the [[Earthquake Exposure Risk Margin]]). The LIC factors are applied to the best estimate **excluding** the IFRS 17 risk adjustment.
- The **[[Market Risk Margin|market risk margin]]** covers interest rate, foreign exchange, equity, real estate and other exposures. The **[[Credit Risk Margin|credit risk margin]]** covers counterparty default on and off the balance sheet, including collateral for unregistered reinsurance.
- The **[[Operational Risk Margin|operational risk margin]]** is a formula in [[Capital Required|capital required]] (before operational risk and diversification) and premium volumes, capped at $30\%$ of that capital required.
- **The diversification credit** recognises that asset risk and insurance risk do not peak together. With $A$ = market + credit and $I$ = insurance, it is $A + I - \sqrt{A^2 + I^2 + 2RAI}$ with $R = 50\%$.
- **Calibration.** The margins are set at a target level of 99% CTE over one year, including a terminal provision. Their sum less the credit (the second block) is divided by $1.5$ to give **minimum capital required**. The MCT ratio is [[Capital Available|capital available]] over minimum capital required: $100\%$ is the minimum and $150\%$ the [[Supervisory Target Capital Ratio|supervisory target]], and each insurer also sets an [[Internal Target Capital Ratio|internal target]].

### The accounting margin: IFRS 17

The Canadian financial-statement margin is the [[Risk Adjustment for Non-Financial Risk|risk adjustment for non-financial risk]]. It is entity-specific and is commonly set by a confidence-level, cost-of-capital or CTE technique. Whichever is used, its equivalent confidence level must be disclosed. It replaced the [[Margin for Adverse Deviations|MfADs]]. [[Solvency II]]'s risk margin is instead a [[Cost of Capital|cost-of-capital]] amount.

> [!example]- Consolidating CoVs into a Risk Margin {Example}
> For a casualty portfolio with a net central estimate of $\$200$ million, the analysis selects CoVs of $6\%$ for independent risk, $5\%$ for internal systemic risk and $8\%$ for external systemic risk. The target probability of adequacy is $75\%$.
>
> Compute the risk margin under a normal and a lognormal distribution.
>
> > [!answer]-
> > $$
> > \begin{align*}
> > \mathrm{CoV} &= \sqrt{0.06^2 + 0.05^2 + 0.08^2} \\
> > &= 11.18\% \\
> > \text{Normal} &= 0.6745 \times 11.18\% \\
> > &= 7.54\%
> > \end{align*}
> > $$
> >
> > The normal margin is $\$15.1$ million. For the lognormal, $\sigma^2 = \ln(1 + 0.1118^2) = 0.01242$ and $\sigma = 0.1115$:
> >
> > $$
> > \begin{align*}
> > \text{Lognormal} &= e^{-\sigma^2/2 + 0.6745\sigma} - 1 \\
> > &= 7.14\%
> > \end{align*}
> > $$
> >
> > The lognormal margin is $\$14.3$ million. The external systemic CoV is the largest single input, yet it came from judgment rather than from the triangle. Dropping it would cut the CoV to $7.8\%$ and the normal margin to $5.3\%$. That sensitivity is exactly what the framework's sensitivity testing is meant to expose.

> [!example]- MCT Risk Margins to a Ratio {Example}
> A Canadian P&C insurer's target-level margins are: insurance $\$90$M, market $\$40$M, credit $\$30$M and operational $\$17$M. Capital available is $\$250$M.
>
> Compute the diversification credit, minimum capital required and the MCT ratio.
>
> > [!answer]-
> > With $A = 40 + 30 = 70$ and $I = 90$:
> >
> > $$
> > \begin{align*}
> > \text{DC} &= 70 + 90 - \sqrt{70^2 + 90^2 + 2(0.5)(70)(90)} \\
> > &= 160 - 138.92 \\
> > &= 21.08 \\
> > \text{Target} &= 90 + 40 + 30 + 17 - 21.08 \\
> > &= 155.92 \\
> > \text{Minimum} &= 155.92 / 1.5 \\
> > &= 103.95
> > \end{align*}
> > $$
> >
> > $$\text{MCT} = 250 / 103.95 = 240.5\%$$
> >
> > At the $150\%$ supervisory target the insurer would hold exactly the target-level capital of $\$155.9$M. The target is where capital meets the 99% CTE calibration, and the $100\%$ minimum is two-thirds of it. The insurer has about $\$94$M above the supervisory target, to be judged against its own internal target.
