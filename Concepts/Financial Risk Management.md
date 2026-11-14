---
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:da6e1e6535687af45be49db375b924b736407c65a72e3e045fb8b62ec120c409
  sources: []
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Financial Risk Management.md
---

**Financial Risk Management (FRM)** is the discipline by which an insurer decides how much [[Financial Risk|financial]] and [[Insurance Risk|insurance risk]] to bear, how much capital to hold against it, and how to charge each [[Line of Business|line]] and [[Business Unit|business unit]] for the capital it uses. It is the financial core of [[Enterprise Risk Management|enterprise risk management]].

The value of the firm is

> $$V_{\text{firm}} = V_{\text{frictionless}} - \text{PV}(\text{frictional costs})$$

- $V_{\text{frictionless}}$ is the value the firm would have in a perfect (Modigliani–Miller) market.
- $\text{PV}(\text{frictional costs})$ is the present value of the costs that [[Insurance Market Imperfections|insurance market imperfections]] impose.

In a perfect market risk management cannot create value, because shareholders can diversify or hedge on their own account. FRM adds value only by reducing the frictional costs: taxes on capital held inside the firm, financial distress, agency conflicts, costly external capital, and policyholders who, unlike bondholders, are customers averse to their insurer's default.

## Purpose

FRM sets the insurer's [[Capital Structure|capital structure]], the amount of capital that balances the [[Cost of Capital|cost of holding capital]] against the cost of default risk. It prices business to earn the cost of the [[Risk Capital|risk capital]] it consumes, and directs capital toward the units that earn more than that cost.

## Design

1. Choose a [[Risk Measure|risk measure]] and tolerance, such as TVaR at a chosen level, an expected policyholder deficit ratio or a rating target.
2. Build a model of the joint distribution of insurance and financial outcomes.
3. Choose a capital allocation method: proportional, Merton–Perold, Shapley, Myers–Read or Euler, co-measures, or a direct allocation of margin.

Different allocation methods give materially different answers, so the choice is a management decision.

## Execution

Execution runs as a loop:

1. Allocate capital to lines and units.
2. Set [[Risk-Adjusted Pricing|risk-adjusted prices]].
3. Measure [[Risk-Adjusted Performance|risk-adjusted performance]] (RAROC, EVA), and compare each unit's return with the cost of capital.
4. Transfer or hedge what the firm should not keep, through [[Reinsurance|reinsurance]], [[CAT Bonds|catastrophe bonds]] and other [[Securitization|securitizations]], asset–liability management of [[Interest Rate Risk|interest rate risk]], and limits on [[Credit Risk|credit risk]].

Capital is never physically divided. All of it stands behind every policy, because an insolvent insurer defaults on every line at once. What is really allocated is the cost of capital, which is why Mildenhall and Major argue for allocating margin directly rather than capital.

> [!example]- Does this catastrophe treaty add value? {Example}
> A catastrophe excess-of-loss treaty costs $\$13$M and has expected recoveries of $\$10$M. The insurer's capital model says the treaty reduces required capital by $\$35$M. Investors require a $12\%$ return on capital, and capital held inside the insurer is invested at $4\%$. Ignore taxes.
>
> > [!answer]-
> > - The net cost of reinsurance is the margin paid to the reinsurer, $\$13$M less $\$10$M, or $\$3.0$M.
> > - The capital would have earned $4\%$ while held, so the cost of holding it is the $8\%$ spread on $\$35$M, or $\$2.8$M, not the full $12\%$ ($\$4.2$M).
> > - The net benefit is $\$2.8$M less $\$3.0$M, or $-\$0.2$M, so on the capital model alone the treaty slightly destroys value.
> > - The capital saving depends on the risk measure. A TVaR model credits a tail cover far more than a volatility model.
> > - The treaty also cuts distress costs (downgrade, lost renewals, forced capital raising after the event) that a capital model may not price. FRM puts those on the same scale as the $\$3$M.
