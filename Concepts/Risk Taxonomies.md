---
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:01e6e6281e0bf7182c818b60847fba2fced0f5f75b1ec72c9bb84161fd4fe1a5
  sources: []
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Risk Taxonomies.md
---

**Risk Taxonomies** are structured classifications of the risks an organisation faces — a common language that lets each risk be identified, owned, measured and aggregated without gaps or double counting. For a P&C insurer the usual categories are underwriting, reserve, catastrophe, market, credit, operational and strategic (business) risk.

> $$\Delta S = \sum_{k} \Delta S_k$$

> $$\text{Var}(\Delta S) = \sum_{k} \sigma_k^2 + 2\sum_{j<k} \rho_{jk}\,\sigma_j\,\sigma_k$$

- $\Delta S$ is the change in surplus over the horizon, $\Delta S_k$ the part attributable to category $k$, $\sigma_k$ its standard deviation and $\rho_{jk}$ the correlation between categories. A good taxonomy is **exhaustive and non-overlapping**, so the pieces add up; the correlation terms are why the pieces cannot be managed in isolation.
- **The categories**, each defined by the *source* of loss:
  - **[[Insurance Risk|Insurance risk]]** — *underwriting* (premium) risk on current and future business, *reserve* risk on past business, and *catastrophe* risk from events that strike many policies together.
  - **Market risk** — [[Interest Rate Risk|interest rates]], equity prices, credit spreads, currency and inflation, acting on assets and liabilities alike. With liquidity risk it makes up [[Financial Risk|financial risk]].
  - **[[Credit Risk|Credit risk]]** — default or downgrade of bond issuers and, above all for an insurer, of reinsurers ([[Reinsurance Credit Risk]]).
  - **[[Operational Risk|Operational risk]]** — failed processes, people and systems, and external events.
  - **Strategic or [[Business Risk|business]] risk** — competition, the underwriting cycle, regulation, reputation, the wrong strategy.
- **Frameworks slice it differently.** The CAS ERM framework uses four types — hazard, financial, operational and strategic — and Brehm et al. use the insurer's version (insurance hazard in place of hazard). The NAIC [[Risk-Based Capital|RBC]] formula charges separately for asset, credit, reserve, premium and catastrophe risk; [[Solvency II]] has modules for non-life underwriting, market, counterparty default and operational risk, among others. The exact slotting matters less than covering every material risk exactly once.
- A taxonomy is the first step in choosing a [[Risk Measure|risk measure]] and a model for each category — the "diverse risks" that [[Risk Modeling]] must integrate.

> [!example]- Selecting a Model for Each Category {Example}
> An insurer building its first internal model must choose an approach for each risk category, with a limited budget. What should it use, and where is a simple approach good enough?
>
> > [!answer]-
> > - **Underwriting:** frequency–severity models by line ([[Frequency-Severity Models]]), with [[Parameter Risk|parameter risk]] layered on as a common multiplier — otherwise volume appears to diversify everything.
> > - **Reserve:** a stochastic reserving method giving a distribution of unpaid claims ([[Stochastic Reserving]]), on the same horizon as the rest of the model.
> > - **Catastrophe:** vendor [[Catastrophe Modelling|catastrophe model]] event-loss output, ideally compared across more than one model.
> > - **Market:** an economic scenario generator producing interest rates, equity returns and inflation consistently — the inflation path must also feed claim severity.
> > - **Credit:** default and [[Credit Rating Migration|rating-migration]] probabilities for bonds; reinsurer default made *conditional* on the catastrophe scenarios.
> > - **Operational:** often a factor or a few calibrated scenarios, supported by loss data and key risk indicators.
> > - **Strategic:** scenario planning rather than a probability distribution.
> >
> > Proportionality: the sophistication should follow materiality. Most of the budget belongs where the capital is (usually catastrophe and reserves) and in the **dependencies** — the shared inflation driver, and the link between catastrophes and reinsurer failure — which a category-by-category build is most likely to miss.

> [!example]- Aggregating Three Categories {Example}
> Standard deviations of the one-year change in surplus: underwriting $\$60$M, reserve $\$80$M, market $\$50$M. Correlations: underwriting–reserve $0.5$, underwriting–market $0$, reserve–market $0.25$. Find the total standard deviation and the diversification benefit, then redo it with reserve–market correlation $0.75$ (an inflation-shock view).
>
> > [!answer]-
> > $$
> > \begin{align*}
> > \text{Var} &= 60^2 + 80^2 + 50^2 + 2[0.5(60)(80) + 0.25(80)(50)] \\
> > &= 12{,}500 + 6{,}800 \\
> > &= 19{,}300 \\
> > \sigma &= 138.9
> > \end{align*}
> > $$
> >
> > The standalone sum is $190$, so diversification is worth $190 - 138.9 = \$51.1$M ($27\%$).
> >
> > $$
> > \begin{align*}
> > \text{Var}' &= 12{,}500 + 2[2{,}400 + 0.75(80)(50)] \\
> > &= 23{,}300 \\
> > \sigma' &= 152.6
> > \end{align*}
> > $$
> >
> > One correlation assumption moves the requirement by $\$13.7$M and cuts the diversification benefit to $\$37.4$M. The taxonomy tells you which pairs exist; the capital depends on how honestly their dependence is estimated.
