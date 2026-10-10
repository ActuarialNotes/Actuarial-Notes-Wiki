---
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:82605011f9136233a478e5d01ffd04520f90728bb12260dca5997f79e0605d91
  sources: []
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Non-Financial Risk.md
---

**Non-financial risk**, in [[Enterprise Risk Management|enterprise risk management]], is the collection of risks that don't arise from taking market, credit, liquidity or insurance positions: strategic, reputational, conduct, [[Operational Risk|operational]], legal and compliance, cyber, model, and environmental, social and governance (ESG) risks. These risks are taken on by running the business rather than chosen for a return, are hard to quantify, and are managed mainly through governance, controls and culture rather than through hedging or capital alone.

> $$E[L] = \lambda \times E[S]$$

> $$P\left(M > x\right) = 1 - e^{-\lambda\,P(S > x)}$$

- **Symbols:** In a scenario assessment, $\lambda$ is the expected number of times a year the scenario occurs, $S$ is the loss each time it occurs, and $E[L]$ is the expected annual loss. $M$ is the largest single loss in a year. The second block assumes events arrive as a Poisson process and gives the probability that some event in a year costs more than $x$, which links a frequency and a severity distribution to a 1-in-$N$-year loss.
- **The main categories:** Strategic risk is the risk that the business model or major decisions fail (see [[Business Risk|business risk]]). Reputational risk is loss of trust among customers, investors or regulators, and usually follows another event rather than arising alone. Conduct risk is the risk of unfair outcomes for customers, such as mis-selling. Cyber risk covers breaches and outages of systems and data, and ESG risks include [[Climate Risk|climate risk]] and social expectations of the firm. Hardy and Saunders place many of these in their [[Risk Taxonomies|risk taxonomy]] alongside the financial risks.
- **Governance:** Each risk needs an owner, a place in the risk appetite (often a qualitative statement, such as "no tolerance for deliberate mistreatment of customers"), and oversight by the board through the three lines of defence. [[Corporate Governance|Governance]] issues such as agency problems between management and owners are themselves a source of conduct and strategic risk.
- **Controls:** [[Internal Control|Internal controls]] in each organisational process are the first defence. Preventive controls stop errors and misconduct, detective controls find them, and corrective controls limit the damage.
- **Monitoring:** [[Key Risk Indicator|Key risk indicators]] track the drivers, such as complaints, staff turnover, system outages or overdue audit actions. Loss-event and near-miss databases record what has gone wrong so that patterns can be found.
- **Scenario analysis:** Because loss data is thin, experts build severe but plausible scenarios, such as a data breach, a mis-selling scandal or a failed acquisition, and estimate a frequency and a severity range for each. The results feed [[Stress Testing|stress testing]], the [[ORSA|ORSA]] and capital, and the discussion itself often reveals control gaps.
- **Culture and resilience:** A [[Risk Aware Culture|risk-aware culture]], aligned incentives and the ability to keep critical services running through a disruption ([[Business Continuity Management|business continuity management]] and [[Organizational Resilience|organizational resilience]]) reduce both the chance and the cost of these events in ways no single control can.
- **Not the IFRS 17 meaning:** Under [[IFRS 17]], the [[Risk Adjustment for Non-Financial Risk|risk adjustment for non-financial risk]] covers insurance, lapse and expense risk, meaning any risk other than movements in financial variables such as interest rates and prices. Those are core insurance risks in ERM, so the two uses of "non-financial" cover mostly different risks.

> [!example]- Quantifying a Reputational Scenario {Example}
> A scenario workshop considers a data breach that becomes a public scandal, bringing regulatory fines, customer compensation and a year of elevated lapses. The experts judge that such an event happens about once every 25 years. Its typical (median) cost is \$20 million, and in one event in ten it would cost at least \$80 million. Model the severity as lognormal and find the expected annual loss and the annual 1-in-200 loss.
>
> > [!answer]-
> > A lognormal with median 20 has $\mu = \ln 20$, and the 90th percentile fixes $\sigma$ through $z_{0.90} = 1.2816$.
> > $$
> > \begin{align*}
> > \sigma &= \frac{\ln(80/20)}{1.2816} \\
> > &= 1.0817 \\
> > E[S] &= 20\,e^{\sigma^2/2} \\
> > &= 35.90 \\
> > E[L] &= 0.04 \times 35.90 \\
> > &= 1.44
> > \end{align*}
> > $$
> > For the 1-in-200 loss, the annual probability that some event exceeds $x$ must be 0.5%, which fixes the probability that one event exceeds it.
> > $$
> > \begin{align*}
> > P(S > x) &= \frac{-\ln(0.995)}{0.04} \\
> > &= 0.1253 \\
> > x &= 20\,e^{1.0817 \times 1.1488} \\
> > &= 69.3
> > \end{align*}
> > $$
> > Here $1.1488$ is the standard normal quantile at $1 - 0.1253$. The expected cost is about \$1.4 million a year, and the 1-in-200 loss is about \$69 million. That is below the experts' 1-in-10 event cost of \$80 million, because the scenario itself occurs only once in 25 years. The answer is only as good as the two judgments behind it, so the workshop should test how the result moves if the event is twice as frequent or the 1-in-10 severity is \$120 million.

> [!example]- Sorting Risks into Financial and Non-Financial {Example}
> Classify each risk as financial or non-financial in the ERM sense, and say whether the IFRS 17 risk adjustment would cover it: (a) annuitants living longer than expected; (b) sales staff mis-selling a savings product; (c) a fall in equity markets; (d) a ransomware attack that shuts down policy administration for a week.
>
> > [!answer]-
> > (a) Longevity risk is an insurance risk, which ERM treats as a risk taken on deliberately for a return, like the financial risks, so it is not non-financial in the ERM sense. IFRS 17 calls it non-financial and covers it in the risk adjustment. (b) Mis-selling is conduct risk, non-financial in ERM, and it is outside the risk adjustment because it doesn't arise from the insurance contracts' cash flows. (c) Equity risk is a financial risk in both senses and is outside the risk adjustment. (d) Ransomware is a cyber and operational risk, non-financial in ERM, and outside the risk adjustment. Only (a) is covered, which shows how differently the two uses of "non-financial" draw the line.

> [!tip]- How it appears on the exam
> - **CFE-101:** Questions ask candidates to demonstrate techniques for managing non-financial risks, usually for a firm described in a case study. A good answer covers governance and appetite, controls, KRIs, scenario analysis and culture, and explains why each fits the risk in question.
> - **Quantification:** A question may give frequency and severity judgments for a scenario and ask for an expected loss or a 1-in-$N$-year figure. It may then ask what the figure can and cannot support, such as a capital add-on.
> - **Specific risks:** The readings on conduct, strategic, cyber, AI and ESG risk supply case material, and questions often ask how a risk from one of them would be identified, monitored and controlled.

> [!warning]- Exam traps
> - **Mixing the two meanings:** In ERM, non-financial risk means operational, strategic, reputational and similar risks. The IFRS 17 risk adjustment for non-financial risk covers insurance, lapse and expense risk. Applying one definition to a question about the other gives the wrong list of risks.
> - **Reputational risk as a standalone event:** Reputational damage almost always follows another failure, such as a breach or misconduct. Managing it means managing those causes and the response, not only communications after the event.
> - **Capital as the main tool:** Holding capital pays for a loss but does nothing to prevent it, and many non-financial losses, such as lost trust, are not well measured in money. Answers that rely on capital alone miss controls, culture and resilience.
> - **False precision:** A scenario's frequency and severity are expert judgments. Reporting a 1-in-200 loss to the nearest thousand dollars hides how much the answer depends on those judgments, so sensitivity tests belong with the figure.
