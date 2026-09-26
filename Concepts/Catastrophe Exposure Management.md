---
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:b771bf9a4f53905fcb5b8bbf1c5db6014fca87addfba6c5318c98a94eeefc8ba
  sources: []
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Catastrophe Exposure Management.md
---

**Catastrophe Exposure Management** is controlling how much catastrophe loss an [[Insurance Portfolio|insurance portfolio]] as a whole can suffer from one event or one bad year. It works by measuring accumulations, setting limits relative to capital, steering what is written where, and transferring the excess, so that no plausible catastrophe threatens solvency.

> $$\text{PML}_p = \text{VaR}_p(\text{annual catastrophe loss})$$
>
> $$\Delta \rho = \rho(\text{portfolio} + \text{account}) - \rho(\text{portfolio})$$

- **Measure the accumulation.** The crude measure is total insured value by zone. The modelled measures are the occurrence and aggregate exceedance curves, the [[Probable Maximum Loss|PML]] at return periods such as 1-in-100 and 1-in-250 (a VaR), and tail averages (TVaR), by peril and region, gross and net of reinsurance. Geocoding and construction data drive all of them ([[Data Quality]]).
- **Set tolerances.** A [[Risk Appetite|risk appetite]] typically caps a net PML or TVaR as a share of surplus, with capacity limits for peak zones.
- **Underwrite at the margin.** Model-based portfolio management judges each new account by its *marginal* effect $\Delta\rho$ on the portfolio's AAL and tail, not by its stand-alone loss. An account in an unrelated region can add little to the portfolio's tail; the same account in the peak zone adds a great deal, and should be priced or declined accordingly ([[Concentration Risk]]).
- **Transfer and mitigate.** Catastrophe excess of loss and quota share [[Reinsurance|reinsurance]], [[CAT Bonds]] and other [[Insurance-Linked Securities]] move the tail off the balance sheet; policy terms (percentage hurricane deductibles, sublimits) and mitigation incentives shrink it at source ([[Risk Mitigation]]). Recoveries are only as good as the counterparties ([[Reinsurance Credit Risk]]).
- **Mind the measure.** A limit at a single return period can be met by adding risk just beyond it, and model and climate uncertainty are large ([[Model Risk]], [[Climate Risk]]). Using more than one [[Risk Measure|risk measure]] and more than one model is the defence.

> [!example]- Can the Insurer Grow in the Peak Zone? {Example}
> Risk appetite caps the net 1-in-250 hurricane PML at $15\%$ of surplus of \$800M. The gross 1-in-250 PML is \$420M and the catastrophe programme is \$300M xs \$100M. A growth plan would raise the gross PML by $10\%$. Test the plan and size a fix.
>
> > [!answer]-
> > $$
> > \begin{align*}
> > \text{Tolerance} &= 0.15(800) \\
> > &= \$120\text{M} \\
> > \text{Net today} &= 100 + (420 - 400) \\
> > &= \$120\text{M} \\
> > \text{Gross after growth} &= 1.10(420) \\
> > &= \$462\text{M} \\
> > \text{Net after growth} &= 100 + (462 - 400) \\
> > &= \$162\text{M}
> > \end{align*}
> > $$
> >
> > Today the insurer is exactly at its limit; the plan breaches it by \$42M. Options: buy \$42M more limit on top of the programme (\$342M xs \$100M brings net back to \$120M); cede part of the new business on a quota share; or grow outside the peak zone. The cost of each is weighed against the margin the new business earns.

> [!example]- Marginal Analysis: VaR and TVaR Disagree {Example}
> Assume at most one event a year. A portfolio's event losses (\$M) are: zone A major hurricane, probability $0.008$, loss $80$; zone A minor hurricane, $0.030$, $30$; zone B earthquake, $0.004$, $60$; zone B hail, $0.050$, $10$. Account A would add $15$ and $6$ to the two zone A events; account B would add $25$ and $4$ to the two zone B events. Compare the accounts' effects on AAL, $\text{VaR}_{0.99}$ and $\text{TVaR}_{0.99}$.
>
> > [!answer]-
> > Both accounts add the same expected loss: $0.008(15) + 0.03(6) = 0.30$ and $0.004(25) + 0.05(4) = 0.30$, taking AAL from $2.28$ to $2.58$.
> >
> > **Base.** $P(L \geq 80) = 0.008$ and $P(L \geq 60) = 0.012$, so $\text{VaR}_{0.99} = 60$ and the worst $1\%$ is $0.8\%$ at $80$ plus $0.2\%$ at $60$.
> >
> > $$
> > \begin{align*}
> > \text{TVaR}_{\text{base}} &= \frac{0.008(80) + 0.002(60)}{0.01} \\
> > &= 76 \\
> > \text{TVaR}_{+A} &= \frac{0.008(95) + 0.002(60)}{0.01} \\
> > &= 88 \\
> > \text{TVaR}_{+B} &= \frac{0.004(85) + 0.006(80)}{0.01} \\
> > &= 82
> > \end{align*}
> > $$
> >
> > **VaR.** With A the 1% point is still the earthquake at $60$: $\Delta\text{VaR} = 0$. With B the earthquake becomes $85$ and the two large events together have probability $0.012$, so $\text{VaR}_{0.99} = 80$: $\Delta\text{VaR} = +20$.
> >
> > VaR calls account A free and B expensive; TVaR says A adds $12$ and B only $6$. Account A loads the 1-in-125 event that VaR at 1-in-100 cannot see. The measure chosen decides which account looks diversifying — the reason exposure managers track tail averages and several return periods, not one PML.
