---
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:44c11b17d5cab32a78eaea83bced36a676d0200667ba3a196c5da13438b57e20
  sources: []
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Non-Financial Risk.md
---

**Non-Financial Risk**, in [[Enterprise Risk Management|enterprise risk management]], is the collection of risks that don't arise from taking market, credit, liquidity or insurance positions. These risks are taken on by running the business rather than chosen for a return, are hard to quantify, and are managed mainly through governance, controls and culture rather than through hedging or capital alone.

Its main categories are:

| Category | What it is |
| :--- | :--- |
| Strategic risk | The risk that the business model or major decisions fail (see [[Business Risk]]) |
| Reputational risk | Loss of trust among customers, investors or regulators. It usually follows another event, such as a breach or misconduct, rather than arising alone |
| Conduct risk | The risk of unfair outcomes for customers, such as mis-selling |
| [[Operational Risk]], legal and compliance risk, and model risk | Losses from running the business's processes, systems and models |
| Cyber risk | Breaches and outages of systems and data |
| ESG risks | Environmental, social and governance risks, including [[Climate Risk]] and social expectations of the firm |

Hardy and Saunders place many of these in their [[Risk Taxonomies|risk taxonomy]] alongside the financial risks.

## Managing non-financial risk

Non-financial risks are managed through five layers:

1. **Governance.** Each risk needs an owner, a place in the risk appetite (often a qualitative statement, such as "no tolerance for deliberate mistreatment of customers") and oversight by the board through the three lines of defence. [[Corporate Governance|Governance]] issues such as agency problems between management and owners are themselves a source of conduct and strategic risk.
2. **Controls.** [[Internal Control|Internal controls]] in each organisational process are the first defence. Preventive controls stop errors and misconduct, detective controls find them, and corrective controls limit the damage.
3. **Monitoring.** [[Key Risk Indicator|Key risk indicators]] track the drivers, such as complaints, staff turnover, system outages or overdue audit actions. Loss-event and near-miss databases record what has gone wrong so that patterns can be found.
4. **Scenario analysis.** Because loss data is thin, experts build severe but plausible scenarios, such as a data breach, a mis-selling scandal or a failed acquisition, and estimate a frequency and a severity range for each. The results feed [[Stress Testing|stress testing]], the [[ORSA|ORSA]] and capital, and the discussion itself often reveals control gaps.
5. **Culture and resilience.** A [[Risk Aware Culture|risk-aware culture]], aligned incentives and [[Business Continuity Management|business continuity management]] and [[Organizational Resilience|organizational resilience]] reduce both the chance and the cost of these events.

Holding capital pays for a loss but does nothing to prevent it, and many non-financial losses, such as lost trust, are not well measured in money.

## Quantifying a scenario

In a scenario assessment, a scenario that occurs $\lambda$ times a year on average with loss $S$ each time has expected annual loss

> $$E[L] = \lambda \times E[S]$$

If events arrive as a Poisson process, the probability that the largest single loss in a year, $M$, exceeds $x$ is

> $$P\left(M > x\right) = 1 - e^{-\lambda\,P(S > x)}$$

This links a frequency and a severity distribution to a 1-in-$N$-year loss. The frequency and severity are expert judgments, so sensitivity tests belong with the figure.

> [!example]- What are this scenario's expected annual loss and its annual 1-in-200 loss? {Example}
> A scenario workshop considers a data breach that becomes a public scandal, bringing regulatory fines, customer compensation and a year of elevated lapses. The experts judge that such an event happens about once every 25 years. Its median cost is $\$20$ million, and in one event in ten it would cost at least $\$80$ million. The severity is modelled as lognormal.
>
> > [!answer]-
> > - The median of 20 gives $\mu = \ln 20$, and the 90th percentile fixes $\sigma = \ln(80/20)/1.2816 = 1.0817$.
> > - The mean severity is $E[S] = 20\,e^{\sigma^2/2} = 35.90$.
> > - With $\lambda = 1/25 = 0.04$, the expected annual loss is $E[L] = 0.04 \times 35.90 = 1.44$, about $\$1.4$ million.
> > - For the 1-in-200 loss, $P(M > x) = 0.005$, so $P(S > x) = -\ln(0.995)/0.04 = 0.1253$.
> > - The standard normal quantile at $1 - 0.1253$ is $1.1488$, so $x = 20\,e^{1.0817 \times 1.1488} = 69.3$, about $\$69$ million.
> > - That is below the 1-in-10 event cost of $\$80$ million, because the scenario itself occurs only once in 25 years.

## Non-financial risk under IFRS 17

Under [[IFRS 17]], the [[Risk Adjustment for Non-Financial Risk|risk adjustment for non-financial risk]] covers insurance, lapse and expense risk, meaning any risk other than movements in financial variables such as interest rates and prices. Those are core insurance risks in ERM, so the two uses of "non-financial" cover mostly different risks.

> [!example]- Which of these risks are non-financial in ERM, and which does the IFRS 17 risk adjustment cover? {Example}
> The risks are (a) annuitants living longer than expected, (b) sales staff mis-selling a savings product, (c) a fall in equity markets and (d) a ransomware attack that shuts down policy administration for a week.
>
> > [!answer]-
> > - (a) Longevity risk is an insurance risk, taken on deliberately for a return, so it is not non-financial in ERM. IFRS 17 calls it non-financial and covers it in the risk adjustment.
> > - (b) Mis-selling is conduct risk, non-financial in ERM. It is outside the risk adjustment because it doesn't arise from the insurance contracts' cash flows.
> > - (c) Equity risk is a financial risk in both senses and is outside the risk adjustment.
> > - (d) Ransomware is a cyber and operational risk, non-financial in ERM, and outside the risk adjustment.
> > - Only (a) is covered by the risk adjustment.

> [!trap] Mixing the ERM and IFRS 17 meanings
> In ERM, non-financial risk means operational, strategic, reputational and similar risks. The IFRS 17 risk adjustment for non-financial risk covers insurance, lapse and expense risk. Applying one definition to a question about the other gives the wrong list of risks.
