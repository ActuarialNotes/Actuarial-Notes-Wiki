---
verification:
  status: verified
  confidence: medium
  last_checked: 2026-10-10
  last_checked_by: agent:validate-v1
  content_hash: sha256:3976580c3ca5b55632ab4fb4bec124d482992cb1b0cce66010e445d42cea01f5
  sources:
    - "Baranoff et al., Risk Management for Enterprises and Individuals v1.0 (Saylor Academy 2012), s05 Tables 1.2-1.3; catastrophe = concentration of positively correlated exposures; fundamental vs particular; hotels, sha256:4d894cf157c8f6b7a4c620f551f76e788a2b6fb98bf979d3cbe23c3f32071592 — https://saylordotorg.github.io/text_risk-management-for-enterprises-and-individuals/s05-04-types-of-risks-risk-exposures.html"
    - "Baranoff et al., Risk Management for Enterprises and Individuals v1.0 (Saylor Academy 2012), s10 objective vs subjective estimates in ratemaking, sha256:a643d7b54dd325ce18405f2c482ebef89986853c6894651046d3f112a552cc04 — https://saylordotorg.github.io/text_risk-management-for-enterprises-and-individuals/s10-02-nature-of-insurance.html"
    - "Baranoff et al., Risk Management for Enterprises and Individuals v1.0 (Saylor Academy 2012), s10 binomial mean/SD, CV, sha256:0fb4dd0d04812eb4f4ceaf8bc2e059ae323809659ce7945309682a998ee487fd — https://saylordotorg.github.io/text_risk-management-for-enterprises-and-individuals/s10-05-appendix-more-exposures-less-r.html"
    - "Rejda & McNamara, Principles of Risk Management and Insurance, 12th ed. (Pearson 2014), Ch.1 pp.3-4 (PDF pp.22-23): objective risk = relative variation of actual from expected loss, varies inversely with sqrt of exposures, measured by SD/CV; subjective risk = uncertainty from state of mind, alters behavior, sha256:d287eea5870c8b2d7dcfd205f5c26283d5c3cb4f536965eb8c21a344c428aed0"
    - "Spaulding, \"Subjective and Objective Risks\", thismatter.com (rank 3, corroborating Rejda), page, sha256:659df83373126ab2bcbc77f5c62f32ad63dc672422c9d5e5ddf8fc6cdf26343d — https://thismatter.com/money/insurance/risk.htm"
    - "CAS Enterprise Risk Management Committee, Overview of Enterprise Risk Management (CAS Forum, Summer 2003), pp.111, 114 (PDF pp.13, 16), sha256:f433c8300785640b2f4fd168d3b38878d1bfbc9b9f8f74c08e43de8e98982efd — https://www.casact.org/sites/default/files/database/forum_03sforum_03sf099.pdf"
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Risk Classifications.md
---

**Risk classifications** sort an organization's risks by their nature so that each can be matched to a suitable treatment: whether a risk offers a chance of gain (pure or speculative), whether it is a perception or a measurable variation (subjective or objective), whether pooling reduces it (diversifiable or nondiversifiable), and where it comes from (hazard, operational, financial or strategic).

> $$\text{Objective risk} = \frac{\sigma}{\mu} = \frac{\sqrt{n p q}}{n p}$$

> $$\frac{\sqrt{n p q}}{n p} = \sqrt{\frac{q}{n p}}$$

- **Symbols:** $n$ is the number of independent, similar exposure units, $p$ the probability that a unit has a loss in the period and $q = 1 - p$. The number of losses then has mean $np$ and standard deviation $\sqrt{npq}$, and objective risk, the relative variation of actual from expected losses, is their ratio, the [[Coefficient of Variation|coefficient of variation]]. Because $n$ sits under the square root, quadrupling the exposures halves the objective risk ([[Law of Large Numbers]]).
- **Pure versus speculative risk:** A pure risk offers a chance of loss and no chance of gain, such as physical damage to property from fire, flood or weather, liability claims, and natural disasters. A speculative risk offers a chance of gain or loss, such as market risk (interest rates, foreign exchange, stock prices), reputational and brand risk, product success, regulatory change and investment risk. The line is not always sharp: operational risk is pure if defined as mistakes that cause losses, but operations can also produce gains. Insurance deals mainly with pure risk ([[Insurable Risk]]), while [[Enterprise Risk Management|ERM]] considers pure and speculative risks together.
- **Subjective versus objective risk:** Subjective risk is what a person perceives the chance of an unwanted event to be, shaped by experience and by subjective probability; someone who was in a bad accident may drive more carefully than someone who never was. Objective risk, also called degree of risk, is the variation of actual losses from expected losses, measured statistically by the variance or standard deviation, and it falls as the number of exposures grows. Two groups with the same expected losses can carry different objective risk. In the same way, probability estimates built on observed data or theory are objective, those built on judgment are subjective, and in practice ratemaking uses both.
- **Diversifiable versus nondiversifiable risk:** A diversifiable, or idiosyncratic, risk is particular to one firm or exposure, so a large portfolio of independent exposures makes the loss per unit predictable: hotels spread across many locations, physical damage, liability, operational and reputational risk. A nondiversifiable, or systemic, risk is shared by every exposure, so adding more does not reduce it: market risk, inflation and recession, regulatory and political risk. Catastrophe exposure, a concentration of strongly correlated exposures such as many homes in one flood plain, is a *fundamental* risk and generally systemic; noncatastrophic accidental losses such as fires are *particular* risks ([[Catastrophe Risk]]).
- **Hazard, operational, financial and strategic risk:** The CAS's 2003 ERM overview sorts the risks of any enterprise into four types. **Hazard** risks come from fire and other property damage, windstorm and other natural perils, theft and other crime, personal injury, business interruption, disease and disability, and liability claims. **Financial** risks come from prices (asset values, interest rates, foreign exchange, commodities), liquidity, credit, inflation and hedging or basis risk. **Operational** risks come from business operations, empowerment and leadership, information technology, and information and business reporting. **Strategic** risks come from reputational damage, competition, customer wants, demographic and social trends, technological innovation, capital availability, and regulatory and political trends. The overview notes that the exact slotting matters less than covering every material risk.
- **Why classify:** The category points to the tools. For hazard risk the usual transfer mechanism has been insurance; financial risks are treated through capital-market instruments for commodity, interest rate and currency risk; and until recently operational and strategic risks had no transfer mechanism, so they were avoided or retained ([[Risk Treatment]], [[Holistic Risk Treatment]]). A diversifiable pure risk is a candidate for pooling by an insurer; a nondiversifiable one strains it.
- **The actuarial / Exam 9 treatment:** How insurers' own frameworks, the RBC formula and Solvency II slice an insurer's risks for capital modelling is in [[Risk Taxonomies]].

> [!example]- Classifying a Trucking Company's Risks {Example}
> A regional trucking company lists five risks: (a) a collision in which one of its trucks injures another driver; (b) a rise in the price of diesel fuel; (c) an outage of its dispatch software; (d) a competitor launching a cheaper overnight service on its main routes; (e) a proposed federal rule changing the emissions standards every trucker must meet. Classify each as hazard, financial, operational or strategic; as pure or speculative; and as diversifiable or nondiversifiable.
>
> > [!answer]-
> > - **(a) Hazard, pure, diversifiable:** A liability claim can only cause a loss, and collisions are accidental events particular to each truck.
> > - **(b) Financial, speculative, nondiversifiable:** Fuel is a commodity price that can fall as well as rise, and it moves for every trucker at once.
> > - **(c) Operational, pure as defined here, diversifiable:** An outage is a failure of the firm's own information technology that causes only loss.
> > - **(d) Strategic, speculative, diversifiable:** Competition is a strategic risk particular to this firm's market, and its response could win business as well as lose it.
> > - **(e) Strategic, speculative, nondiversifiable:** Regulatory and political trends are strategic risks; a regulatory change can help or hurt, and it applies to every firm in the industry at once.
> >
> > Only (a) fits the traditional insurance approach. The others call for hedging, loss control, planning or retention, which is why the classification comes before the choice of treatment.

> [!example]- Objective Risk for a Small Fleet and an Insurer's Pool {Example}
> Each truck has a probability of 0.10 of a physical damage claim in a year, independently of the others. Compare the expected number of claims, the standard deviation and the objective risk for a company that self-insures its 40 trucks and for an insurer that pools 4,000 such trucks. After a serious crash the fleet owner says the risk now feels much higher. Which kind of risk has changed?
>
> > [!answer]-
> > $$
> > \begin{align*}
> > \text{Fleet: } \mu &= 40(0.10) = 4 \\
> > \sigma &= \sqrt{40(0.10)(0.90)} \approx 1.90 \\
> > \sigma / \mu &\approx 0.474
> > \end{align*}
> > $$
> > $$
> > \begin{align*}
> > \text{Pool: } \mu &= 4{,}000(0.10) = 400 \\
> > \sigma &= \sqrt{4{,}000(0.10)(0.90)} \approx 18.97 \\
> > \sigma / \mu &\approx 0.0474
> > \end{align*}
> > $$
> > The pool has a hundred times the exposures and ten times the standard deviation, so its objective risk is one-tenth of the fleet's: the insurer's actual claims will stay much closer to expected. The crash changed the owner's *subjective* risk, the perception, not the objective risk, which depends on $p$ and the number of trucks.

> [!tip]- How it appears on the exam
> - **DISC-RM:** The introduction to risk management covers classifications and categories of risk. Questions give a risk and ask whether it is pure or speculative, subjective or objective, diversifiable or not, or hazard, operational, financial or strategic.
> - **Classification and treatment:** A question may ask why a classification matters, such as why a nondiversifiable risk is hard to insure or why a speculative risk is outside traditional insurance.
> - **Objective risk:** A short calculation compares two pools of different size, or two groups with the same expected losses but different variation.

> [!warning]- Exam traps
> - **Speculative is about gain, not category:** Hazard risks are pure, but a pure risk need not be a hazard risk. Ask whether the outcome can be a gain.
> - **Subjective risk is a perception:** A frightening event changes how risky a situation feels, not the measurable variation of losses. Objective risk changes with the number of exposures and the loss probability.
> - **Diversifiable means independent:** Writing more homes in one hurricane zone does not diversify the hurricane risk; the losses strike together.
> - **More exposures, more absolute variation:** The standard deviation of the pool's losses grows with size; it is the *relative* variation that falls.
