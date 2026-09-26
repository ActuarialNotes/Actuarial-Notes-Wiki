---
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:6f4dbec8041f8e929db98e1d92efe8e4a413e1f80753ee084358d51e84842f8e
  sources: []
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Risk Mitigation.md
---

**Risk Mitigation** is the set of actions — the **ERM tools** — that move an organisation's risk profile toward its [[Risk Appetite|risk appetite]]: **avoid** a risk, **reduce** its frequency or severity, **transfer** it to another party, or **retain** it and hold capital against it. A strategy's effectiveness is judged by how far it lowers a chosen [[Risk Measure|risk measure]], and the capital that measure implies, per unit of cost.

> $$\text{Net cost} = \text{Premium paid} - E[\text{Recoveries}]$$

> $$\text{Value added} = r_{\text{CoC}}\,\Delta C - \text{Net cost}$$

- $\Delta C$ is the capital released, $C_{\text{before}} - C_{\text{after}}$, where required capital is set by the risk measure (for example $C = \text{TVaR}_{99\%}(L) - E[L]$), and $r_{\text{CoC}}$ is the [[Cost of Capital|cost of capital]]. Transfer pays when the capital it frees is worth more than the margin it hands over.
- **The tools:**
  - *Avoid* — decline a class, exit a territory, turn down an account outside appetite.
  - *Reduce* — underwriting standards, loss control, exposure and aggregate limits, diversification, and internal controls for [[Operational Risk|operational risk]].
  - *Transfer* — [[Reinsurance]] ([[Quota Share]], [[Excess of Loss]]), [[CAT Bonds|cat bonds]] and other [[Insurance-Linked Securities|ILS]]; for financial risk, hedging with derivatives (interest-rate swaps, equity puts, credit default swaps) and asset–liability matching ([[Immunization]]).
  - *Retain* — keep the risk and hold [[Risk Capital|capital]]: right when the risk is the business the firm is paid for, or when transfer costs more than the capital it saves.
- **Assessing effectiveness** means checking the change in the risk measure against the net cost; the **residual** risk against appetite; **basis risk**, where the hedge pays on something other than the actual loss; **counterparty risk**, since transfer swaps the original risk for [[Reinsurance Credit Risk|credit risk]], concentrated in the scenario the cover exists for; changed behaviour ([[Moral Hazard|moral hazard]]); and whether the answer survives a different risk measure or model.
- **Mitigation shapes strategy.** Capital released can support growth or be returned. Brehm puts reinsurance programmes on an **efficient frontier** of expected return against risk: a programme below the frontier is dominated, and the choice along it is a question of appetite. See [[Reinsurance Strategy]] and [[Business Risk]].

> [!example]- Before and After an Excess-of-Loss Treaty {Example}
> Annual gross loss (in $\$$M): $100$ with probability $70\%$, $150$ with $20\%$, $250$ with $8\%$, $400$ with $1.5\%$, $700$ with $0.5\%$. The insurer can buy $250$ xs $250$ for a premium of $7.0$. Capital is $\text{TVaR}_{99\%} - E[L]$ and the cost of capital is $10\%$. Does the treaty add value?
>
> > [!answer]-
> > **Gross.** The worst $1\%$ is $0.5\%$ at $700$ and $0.5\%$ at $400$.
> >
> > $$
> > \begin{align*}
> > E[L] &= 70 + 30 + 20 + 6 + 3.5 \\
> > &= 129.5 \\
> > \text{TVaR}_{99\%} &= \frac{0.005(700) + 0.005(400)}{0.01} \\
> > &= 550 \\
> > C_{\text{gross}} &= 550 - 129.5 \\
> > &= 420.5
> > \end{align*}
> > $$
> >
> > **Ceded.** The layer pays $150$ on a $400$ loss and $250$ on a $700$ loss:
> >
> > $$
> > \begin{align*}
> > E[\text{Ceded}] &= 0.015(150) + 0.005(250) \\
> > &= 3.5 \\
> > \text{Net cost} &= 7.0 - 3.5 \\
> > &= 3.5
> > \end{align*}
> > $$
> >
> > **Net.** Losses become $100$ ($70\%$), $150$ ($20\%$), $250$ ($9.5\%$), $450$ ($0.5\%$).
> >
> > $$
> > \begin{align*}
> > E[L_{\text{net}}] &= 129.5 - 3.5 \\
> > &= 126.0 \\
> > \text{TVaR}_{99\%} &= \frac{0.005(450) + 0.005(250)}{0.01} \\
> > &= 350 \\
> > C_{\text{net}} &= 350 - 126.0 \\
> > &= 224.0 \\[4pt]
> > \text{Value added} &= 0.10(420.5 - 224.0) - 3.5 \\
> > &= 16.15
> > \end{align*}
> > $$
> >
> > The treaty frees $\$196.5$M of capital, worth $\$19.65$M a year, for a net cost of $\$3.5$M: it adds about $\$16$M of value a year. $\text{VaR}_{99\%}$ falls from $400$ to $250$ as well.

> [!example]- Quota Share or Excess of Loss? {Example}
> For the same insurer, the alternative is a $20\%$ quota share whose net cost — margin ceded, net of ceding commission — is $\$3.0$M. Which strategy is more effective?
>
> > [!answer]-
> > A quota share scales every outcome by $0.8$, so capital falls by $20\%$:
> >
> > $$
> > \begin{align*}
> > \Delta C_{\text{QS}} &= 0.20 \times 420.5 \\
> > &= 84.1 \\
> > \text{Value added}_{\text{QS}} &= 0.10(84.1) - 3.0 \\
> > &= 5.41
> > \end{align*}
> > $$
> >
> > Capital freed per dollar of net cost is $196.5 / 3.5 = 56$ for the excess of loss against $84.1 / 3.0 = 28$ for the quota share. The excess of loss is **twice as effective** because it cedes only the tail that drives the capital measure; the quota share also gives away profitable attritional business.
> >
> > The quota share still has a place: it cuts premium leverage and its ceding commission gives a growing insurer surplus relief, so a company constrained by premium-to-surplus rather than by tail risk might prefer it. And the excess-of-loss recoveries arrive in catastrophe years, when reinsurers are most stressed — the reinsurer's credit quality is part of the assessment.
