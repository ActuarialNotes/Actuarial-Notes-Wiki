---
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:bfc2ade429394992f30b55e05408070f17a140d54a35fcd46c08eb545956ccc8
  sources: []
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/MCT.md
---

**The Minimum Capital Test** (MCT) is [[OSFI]]'s risk-based capital framework for Canadian P&C insurers. It compares the capital an insurer actually has — **[[Capital Available]]** — with the capital its risk profile requires — the **[[Base Solvency Buffer]]** — and expresses the result as a ratio that drives supervisory action.

> $$\text{MCT Ratio} = \frac{\text{Capital Available}}{\text{Base Solvency Buffer}} \times 100\%$$

- **The build-up.** [[Capital Required]] is the sum of the [[Insurance Risk Margin|insurance]], [[Market Risk Margin|market]], [[Credit Risk Margin|credit]] and [[Operational Risk Margin|operational]] risk margins, less a [[Diversification Credit]] recognising that insurance and market risk do not peak together. The **Base Solvency Buffer** is then $1.5$ times capital required.
- **The thresholds:** a **minimum** ratio of $100\%$, a **[[Supervisory Target Capital Ratio|supervisory target]]** of $150\%$ at which OSFI expects insurers to operate, and an **[[Internal Target Capital Ratio|internal target]]** each insurer sets for itself above the supervisory target through its [[ORSA]].
- **Risk-based, not premium-based.** Required capital scales with the actual composition of the balance sheet — line of business mix, reserve duration, asset allocation, catastrophe exposure and reinsurance structure — rather than with a flat percentage of premium. Two insurers of the same size can have very different requirements.
- **Reinsurance credit depends on registration.** Ceded liabilities reduce the requirement only where the reinsurer is [[Registered Reinsurance|registered]] or the cession is collateralised; see [[Unregistered Reinsurance]].
- **It is a point-in-time measure**, which is why it does not stand alone: [[FCT]] tests it under adverse scenarios and [[ORSA]] asks whether the insurer's own view of required capital exceeds the formula's.
- Provincially regulated insurers are generally subject to the same test, adopted by their provincial regulator, so the MCT is effectively the national capital standard.

> [!example]- Computing the MCT Ratio {Example}
> An insurer reports: capital available $\$248$ million; insurance risk margin $\$92$ million; market risk margin $\$54$ million; credit risk margin $\$21$ million; operational risk margin $\$17$ million; diversification credit $\$26$ million. Its internal target is $185\%$.
>
> Compute the ratio and assess.
>
> > [!answer]-
> > **Capital required:**
> >
> > $$\begin{align*}
> > \text{CR} &= \$92 + \$54 + \$21 + \$17 - \$26 \\
> > &= \$158\text{M}
> > \end{align*}$$
> >
> > **Base solvency buffer:**
> >
> > $$\begin{align*}
> > \text{BSB} &= 1.5 \times \$158\text{M} \\
> > &= \$237\text{M}
> > \end{align*}$$
> >
> > **MCT ratio:**
> >
> > $$\begin{align*}
> > \text{MCT} &= \frac{\$248\text{M}}{\$237\text{M}} \times 100\% \\
> > &= 104.6\%
> > \end{align*}$$
> >
> > **Above the $100\%$ minimum, far below the $150\%$ supervisory target and the $185\%$ internal target.** This insurer is in serious difficulty.
> >
> > **What follows immediately:** OSFI escalation to a supervisory stage with a required capital restoration plan, a prohibition on dividends and other distributions, increased reporting frequency, and probable restrictions on growth — since writing more business raises the [[Insurance Risk Margin|insurance risk margin]] and therefore the buffer, worsening the ratio.
> >
> > **The available remedies, and their speed:** raise capital (fastest, if a parent or the market will provide it); buy reinsurance to reduce insurance risk (fast, and it directly cuts the largest margin here); de-risk the investment portfolio to cut the market risk margin (fast but sacrifices yield); reduce writings (slow, and it hurts the franchise). Note that the insurer needs roughly $\$29$ million of additional capital to reach the supervisory target and $\$191$ million to reach its own internal target — the second figure is the one that shows how far the position has fallen.
