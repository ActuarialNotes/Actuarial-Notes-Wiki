---
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:c4285c1676a8751b98b2a6ae3093d4d20f72bf65109a30985748a6302c3aaad3
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
- **The four types for any organization:** The CAS's 2003 ERM overview sorts the risks of any enterprise, not only an insurer, into four types. **Hazard risks** come from fire and other property damage, windstorm and other natural perils, theft and other crime, personal injury, business interruption, disease and disability (including work-related injury) and liability claims. **Financial risks** come from prices (asset values, interest rates, foreign exchange, commodities), liquidity, credit, inflation and hedging or basis risk. **Operational risks** come from business operations (human resources, product development, capacity, supply chain, product failure), empowerment and leadership, information technology, and information and business reporting. **Strategic risks** come from reputational damage, competition, customer wants, demographic and social trends, technological innovation, capital availability, and regulatory and political trends.
- **Pure versus speculative risk:** A pure risk offers only a chance of loss or no loss, such as fire, flood or a liability claim. A speculative risk offers a chance of gain as well as loss, such as an investment, a new product or a change in exchange rates. Traditional risk management and insurance deal with pure risk ([[Insurable Risk]]); [[Enterprise Risk Management|ERM]] considers both. Some risks can be slotted either way depending on how narrowly they are defined, such as operational risk.
- **Diversifiable versus nondiversifiable risk:** A diversifiable, or idiosyncratic, risk is particular to one firm or exposure, so holding many independent exposures makes the average loss predictable, as with fires at homes in different places. A nondiversifiable, or systemic, risk is shared by every exposure, such as an economy-wide recession or inflation, and adding more exposures does not reduce it.
- **Fundamental versus particular risk:** A fundamental risk, such as a flood or hurricane striking many homes in one area, affects a large number of exposures at once and is generally systemic; private insurers often cannot take it on alone. A particular risk, such as a single house fire, affects one exposure accidentally and is usually insurable.
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
> > \text{Var} &= 60^2 + 80^2 + 50^2 \\
> > &\quad + 2[0.5(60)(80) + 0.25(80)(50)] \\
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

> [!example]- Classifying a Restaurant Chain's Risks {Example}
> A restaurant chain lists these risks: (a) a kitchen fire; (b) a rise in interest rates on its floating-rate loan; (c) a point-of-sale system outage; (d) a food critic's viral review that drives customers away; (e) a recession that cuts restaurant spending everywhere. Classify each by the four types, as pure or speculative, and as diversifiable or not.
>
> > [!answer]-
> > - **(a) Hazard, pure, diversifiable:** A fire can only cause a loss, and fires at different restaurants are largely independent.
> > - **(b) Financial, speculative, nondiversifiable:** Rates can fall as well as rise, and they move for every borrower at once.
> > - **(c) Operational, pure as defined here, diversifiable:** An outage causes only loss and is particular to the chain's systems.
> > - **(d) Strategic, speculative, diversifiable:** Reputation is particular to the firm, and a review can help as well as hurt.
> > - **(e) Strategic, speculative, nondiversifiable:** A recession is systemic, affecting every business, and spending can recover as well as fall.
> >
> > Only (a), and (c) to a degree, would be covered by traditional insurance. The others need financial, operational or strategic responses, which is why holistic identification looks beyond insurable exposures.

> [!tip]- How it appears on the exam
> - **DISC-RM:** The introduction to risk management covers classifications and categories of risk. Questions give a risk and ask whether it is pure or speculative, diversifiable or not, or hazard, financial, operational or strategic, or ask why a classification matters for treating it.
> - **Exam 9:** The insurer's version of the taxonomy (underwriting, reserve, catastrophe, market, credit, operational and strategic risk) frames the internal-model and capital questions, where the categories are aggregated with their correlations, as in the examples above.

> [!warning]- Exam traps
> - **Pure is not the same as hazard:** Hazard risks are pure, but operational risks can be pure too. A speculative risk is defined by the possibility of gain, not by its category.
> - **Diversifiable is about correlation:** A risk is diversifiable when losses are independent across exposures. A rare, severe event that strikes many exposures together, such as a hurricane, is not diversified away by writing more of them.
> - **The slotting is less important than the coverage:** Frameworks place some risks differently, such as reputation as strategic or operational. What matters is that every material risk is captured once.

