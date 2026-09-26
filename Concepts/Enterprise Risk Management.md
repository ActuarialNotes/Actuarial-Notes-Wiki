---
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:82aa4774b5308f92bbe97381844b3f9f61da2ce13d69e6391bef9c360eade70e
  sources: []
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Enterprise Risk Management.md
---

**Enterprise Risk Management** (ERM) is the process of systematically and comprehensively identifying an organisation's critical risks, quantifying their impacts and implementing integrated strategies to maximise enterprise value (Brehm et al.). The CAS definition puts it as the discipline by which an organisation assesses, controls, exploits, finances and monitors risks **from all sources** to increase its short- and long-term value to stakeholders.

> $$
> \begin{aligned}
> &\text{Diagnose} \rightarrow \text{Analyze} \\
> &\rightarrow \text{Implement} \rightarrow \text{Monitor} \rightarrow \cdots
> \end{aligned}
> $$

- **The four phases.** *Diagnose*: a high-level assessment of the risks that could seriously threaten the firm's value — general environment, industry and firm-specific. *Analyze*: model the critical risks as probability distributions of outcomes, with their correlations, and rank what drives the bad outcomes. *Implement*: treat each risk — avoid it, reduce its frequency or severity, transfer it, retain it, or exploit it ([[Risk Mitigation]]). *Monitor*: compare results with expectations and update. ERM is a continuing cycle, not a project.
- **What makes it "enterprise".** Every [[Risk Taxonomies|category]] — insurance hazard, [[Financial Risk|financial]], [[Operational Risk|operational]] and strategic — is managed as one portfolio, so correlations and concentrations that no silo sees become visible, and upside is exploited as well as downside controlled. That is its link to the overall [[Business Risk|risk of the business]] and to [[Business Strategy|strategy]].
- **The internal risk model is its engine.** A realistic program needs an internal model ([[Risk Modeling]]) of underwriting, reserve, catastrophe and asset risk with their dependencies, used for capital adequacy, capital allocation, reinsurance, asset allocation and planning. Brehm's implementation issues are practical: staffing and scope; [[Model Selection|model choice]] and parameter development, much of it expert opinion, with correlations sensitive enough to need executive ownership; and integration into the planning and reinsurance-buying calendar so the output is actually used.
- **It is anchored by [[Risk Appetite|risk appetite]]** and expressed through [[Risk Measure|risk measures]] (VaR, TVaR, expected policyholder deficit) that turn the model's output into capital targets and limits. Regulators — OSFI in Canada, Solvency II in Europe, and the NAIC for U.S. insurers above a size threshold — now expect insurers to document it in an [[ORSA]].

> [!example]- Setting Up the Program at a Regional Insurer {Example}
> A regional insurer writes Gulf Coast homeowners and commercial property plus a fast-growing commercial auto book, and holds mostly long-duration corporate bonds. The CEO asks the new chief risk officer to "set up ERM". What should each phase produce in the first year?
>
> > [!answer]-
> > 1. **Diagnose.** Workshops with underwriting, claims, investments and finance produce a ranked risk register. The top entries are likely hurricane concentration, commercial auto reserve adequacy (long tail, rising severity), interest-rate and credit risk in the bond portfolio, and soft-market pricing.
> > 2. **Analyze.** An internal model: catastrophe-model output for property; frequency–severity with [[Parameter Risk|parameter risk]] for auto; a stochastic reserve distribution; an economic scenario generator for the bonds. The dependencies matter most — inflation raises auto severity *and* depresses bond values, and a hurricane can force asset sales into a weak market. Output: the distribution of next year's surplus, with TVaR set against appetite.
> > 3. **Implement.** Decide per risk: more catastrophe reinsurance or a cap on coastal growth; rate and reserve action on auto; shorter duration or better credit quality in the portfolio; limits for each.
> > 4. **Monitor.** Quarterly indicators (net PML to capital, auto severity trend, duration gap), results against plan, annual recalibration, board reporting.
> >
> > The test of the program is whether it changes a decision — for example, slowing the auto plan because the model shows its reserve risk and the bond portfolio share an inflation driver.

> [!example]- The Silo View Misses the Enterprise Limit {Example}
> The property unit's standalone capital need is $\$60$ million and the investment unit's $\$50$ million, each well inside its own limit. The enterprise holds $\$100$ million. Using variance–covariance aggregation, find the enterprise need for correlations $\rho = 0$, $0.5$ and $0.7$.
>
> > [!answer]-
> > $$C = \sqrt{C_1^2 + C_2^2 + 2\rho\,C_1 C_2}$$
> >
> > $$
> > \begin{align*}
> > \rho = 0: \quad C &= \sqrt{3{,}600 + 2{,}500} \\
> > &= 78.1 \\[4pt]
> > \rho = 0.5: \quad C &= \sqrt{6{,}100 + 3{,}000} \\
> > &= 95.4 \\[4pt]
> > \rho = 0.7: \quad C &= \sqrt{6{,}100 + 4{,}200} \\
> > &= 101.5
> > \end{align*}
> > $$
> >
> > At the stressed correlation — a hurricane forcing asset sales in a falling market — the enterprise is **short of capital although neither unit breached its own limit**. The diversification benefit — $\$110\text{M} - \$95.4\text{M} = \$14.6\text{M}$ at $\rho = 0.5$ — is real, but it rests on the parameter hardest to estimate and most likely to rise in a crisis. (The square-root rule is exact for standard-deviation-based capital, and an approximation for VaR.)
