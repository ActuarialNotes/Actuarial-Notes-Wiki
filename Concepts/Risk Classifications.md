---
verification:
  status: stale
  confidence: null
  last_checked: 2026-10-10
  last_checked_by: agent:validate-v1
  content_hash: sha256:e0dbbb87b3a20448dc3212e54132caad5ecede56b0c2c5adbb3288225e41caa2
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
A **Risk Classification** is a grouping of an organization's risks by their nature, so that each risk can be matched to a suitable treatment. Risks are classified four ways:

1. Whether a risk offers a chance of gain: pure or speculative.
2. Whether it is a perception or a measurable variation: subjective or objective.
3. Whether pooling reduces it: diversifiable or nondiversifiable.
4. Where it comes from: hazard, operational, financial or strategic.

## Pure and speculative risk

A pure risk offers a chance of loss and no chance of gain, such as physical damage to property from fire, flood or weather, liability claims, and natural disasters. A speculative risk offers a chance of gain or loss, such as market risk (interest rates, foreign exchange, stock prices), reputational and brand risk, product success, regulatory change and investment risk. The line is not always sharp. Operational risk is pure if defined as mistakes that cause losses, but operations can also produce gains. Insurance deals mainly with pure risk ([[Insurable Risk]]), while [[Enterprise Risk Management|ERM]] considers pure and speculative risks together.

## Subjective and objective risk

Subjective risk is what a person perceives the chance of an unwanted event to be, shaped by experience and by subjective probability. Someone who was in a bad accident may drive more carefully than someone who never was. Objective risk, also called degree of risk, is the variation of actual losses from expected losses, measured statistically by the variance or standard deviation, and it falls as the number of exposures grows. Two groups with the same expected losses can carry different objective risk. In the same way, probability estimates built on observed data or theory are objective, those built on judgment are subjective, and in practice ratemaking uses both.

For $n$ independent, similar exposure units, each with probability $p$ of a loss in the period and $q = 1 - p$, the number of losses has mean $np$ and standard deviation $\sqrt{npq}$. Objective risk is their ratio, the [[Coefficient of Variation|coefficient of variation]], which is

> $$\frac{\sigma}{\mu} = \frac{\sqrt{n p q}}{n p}$$

- $\mu = np$ is the expected number of losses.
- $\sigma = \sqrt{npq}$ is the standard deviation of the number of losses.

It simplifies to

> $$\frac{\sigma}{\mu} = \sqrt{\frac{q}{n p}}$$

Because $n$ sits under the square root, quadrupling the exposures halves the objective risk ([[Law of Large Numbers]]). The standard deviation itself grows with the number of exposures. It is the relative variation that falls.

> [!example]- How does objective risk compare for the fleet and the pool, and which kind of risk has changed for the owner? {Example}
> Each truck has a probability of 0.10 of a physical damage claim in a year, independently of the others. A company self-insures its 40 trucks, and an insurer pools 4,000 such trucks. After a serious crash the fleet owner says the risk now feels much higher.
>
> > [!answer]-
> > - For the fleet, $\mu = 40(0.10) = 4$ and $\sigma = \sqrt{40(0.10)(0.90)} \approx 1.90$, so $\sigma / \mu \approx 0.474$.
> > - For the pool, $\mu = 4{,}000(0.10) = 400$ and $\sigma = \sqrt{4{,}000(0.10)(0.90)} \approx 18.97$, so $\sigma / \mu \approx 0.0474$.
> > - The pool has a hundred times the exposures and ten times the standard deviation, so its objective risk is one-tenth of the fleet's.
> > - The crash changed the owner's subjective risk, the perception. The objective risk depends only on $p$ and the number of trucks, and it has not changed.

## Diversifiable and nondiversifiable risk

A diversifiable, or idiosyncratic, risk is particular to one firm or exposure, so a large portfolio of independent exposures makes the loss per unit predictable: hotels spread across many locations, physical damage, liability, operational and reputational risk. A nondiversifiable, or systemic, risk is shared by every exposure, so adding more does not reduce it: market risk, inflation and recession, regulatory and political risk.

Catastrophe exposure, a concentration of strongly correlated exposures such as many homes in one flood plain, is a *fundamental* risk and generally systemic. Noncatastrophic accidental losses such as fires are *particular* risks ([[Catastrophe Risk]]). Writing more homes in one hurricane zone does not diversify the hurricane risk, because the losses strike together.

## Hazard, operational, financial and strategic risk

The CAS's 2003 ERM overview sorts the risks of any enterprise into four types:

| Type | Sources |
| :--- | :--- |
| **Hazard** | Fire and other property damage, windstorm and other natural perils, theft and other crime, personal injury, business interruption, disease and disability, and liability claims |
| **Financial** | Prices (asset values, interest rates, foreign exchange, commodities), liquidity, credit, inflation and hedging or basis risk |
| **Operational** | Business operations, empowerment and leadership, information technology, and information and business reporting |
| **Strategic** | Reputational damage, competition, customer wants, demographic and social trends, technological innovation, capital availability, and regulatory and political trends |

The overview notes that the exact slotting matters less than covering every material risk. How insurers' own frameworks, the RBC formula and Solvency II slice an insurer's risks for capital modelling is in [[Risk Taxonomies]].

## Classification and treatment

The category points to the tools ([[Risk Treatment]], [[Holistic Risk Treatment]]). For hazard risk the usual transfer mechanism has been insurance. Financial risks are treated through capital-market instruments for commodity, interest rate and currency risk. Until recently operational and strategic risks had no transfer mechanism, so they were avoided or retained. A diversifiable pure risk is a candidate for pooling by an insurer, and a nondiversifiable one strains it.

> [!example]- How does each of these trucking company risks classify, by type, by gain and by diversification? {Example}
> A regional trucking company lists five risks:
>
> 1. A collision in which one of its trucks injures another driver.
> 2. A rise in the price of diesel fuel.
> 3. An outage of its dispatch software.
> 4. A competitor launching a cheaper overnight service on its main routes.
> 5. A proposed federal rule changing the emissions standards every trucker must meet.
>
> > [!answer]-
> > - The collision is hazard, pure and diversifiable. A liability claim can only cause a loss, and collisions are accidental events particular to each truck.
> > - Fuel is financial, speculative and nondiversifiable. A commodity price can fall as well as rise, and it moves for every trucker at once.
> > - The outage is operational, pure as defined here, and diversifiable. It is a failure of the firm's own information technology that causes only loss.
> > - The competitor is strategic, speculative and diversifiable. Competition is particular to this firm's market, and its response could win business as well as lose it.
> > - The rule is strategic, speculative and nondiversifiable. A regulatory change can help or hurt, and it applies to every firm in the industry at once.
> > - Only the collision fits the traditional insurance approach. The others call for hedging, loss control, planning or retention.

> [!trap] Classifying pure or speculative by type instead of by gain
> Hazard risks are pure, but a pure risk need not be a hazard risk. Ask whether the outcome can be a gain.
