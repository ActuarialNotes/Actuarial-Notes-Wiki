---
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:efe7ff5785e96bc4ca01629e52493da4b6928806bcabe2a66854ddbdb68cea0a
  sources: []
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Financial Risk Management.md
---

**Financial Risk Management (FRM)** is the discipline by which an insurer decides how much [[Financial Risk|financial]] and [[Insurance Risk|insurance risk]] to bear, how much capital to hold against it, and how to charge each [[Line of Business|line]] and [[Business Unit|business unit]] for the capital it uses — so that pricing, underwriting, investment, reinsurance and capital decisions add to the value of the firm. It is the financial core of [[Enterprise Risk Management]].

> $$V_{\text{firm}} = V_{\text{frictionless}} - \text{PV}(\text{frictional costs})$$

- **Need.** In a perfect (Modigliani–Miller) market, risk management cannot create value: shareholders can diversify or hedge on their own account. FRM earns its keep only by reducing the frictional costs of [[Insurance Market Imperfections]] — taxes on capital held inside the firm, financial distress, agency conflicts, costly external capital, and policyholders who, unlike bondholders, are customers averse to their insurer's default.
- **Purpose.** Hold the amount of capital that balances the [[Cost of Capital|cost of holding capital]] against the cost of default risk (the insurer's [[Capital Structure]]); price business to earn the cost of the [[Risk Capital]] it consumes; and direct capital toward the units that earn more than that cost.
- **Design.** Choose a [[Risk Measure]] and tolerance (TVaR at a chosen level, an expected policyholder deficit ratio, a rating target); build a model of the joint distribution of insurance and financial outcomes; and choose a capital allocation method — proportional, Merton–Perold, Shapley, Myers–Read or Euler, co-measures, or a direct allocation of margin. Different methods give materially different answers, so the choice is a management decision, not a technicality.
- **Execution** runs as a loop: allocate capital → set [[Risk-Adjusted Pricing|risk-adjusted prices]] → measure [[Risk-Adjusted Performance]] (RAROC, EVA) → transfer or hedge what the firm should not keep — [[Reinsurance]], [[CAT Bonds]] and other [[Securitization|securitizations]], asset–liability management of [[Interest Rate Risk]], and limits on [[Credit Risk]].
- **Allocation is a device.** Capital is never physically divided: all of it stands behind every policy, because an insolvent insurer defaults on every line at once. What is really allocated is the *cost* of capital — which is why Mildenhall and Major argue for allocating margin directly rather than capital.

> [!example]- Reinsurance as a Substitute for Capital {Example}
> A catastrophe excess-of-loss treaty costs $\$13$M and has expected recoveries of $\$10$M. The insurer's capital model says the treaty reduces required capital by $\$35$M. Investors require a $12\%$ return on capital; capital held inside the insurer is invested at $4\%$. Ignore taxes.
>
> Does the treaty add value?
>
> > [!answer]-
> > The **net cost of reinsurance** is the margin paid to the reinsurer:
> >
> > $$\$13\text{M} - \$10\text{M} = \$3.0\text{M}$$
> >
> > The **capital saving** is not $12\%$ of $\$35$M. The capital would have earned $4\%$ while held, so the cost of holding it is only the spread:
> >
> > $$
> > \begin{align*}
> > \text{Cost of capital saved} &= (0.12 - 0.04) \times \$35\text{M} \\
> > &= \$2.8\text{M}
> > \end{align*}
> > $$
> >
> > Net benefit $= 2.8 - 3.0 = -\$0.2$M. Using the gross $12\%$ ($\$4.2$M) would have made the treaty look clearly worthwhile; on the net spread it slightly destroys value.
> >
> > The decision is not closed, though. The capital saving depends on the risk measure — a TVaR model credits a tail cover far more than a volatility model — and the treaty also cuts distress costs (downgrade, lost renewals, forced capital raising after the event) that a capital model may not price. FRM's job is to put those on the same scale as the $\$3$M.
