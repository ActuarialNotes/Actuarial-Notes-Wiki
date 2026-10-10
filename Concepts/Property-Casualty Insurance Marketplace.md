---
verification:
  status: verified
  confidence: medium
  last_checked: 2026-10-10
  last_checked_by: agent:validate-v1
  content_hash: sha256:6e154b1bba43fa41ce200336627de56eff53c7da8d5c2b33660e3dc96e1978b2
  sources:
    - "CAS, Statement of Principles Regarding Property and Casualty Insurance Ratemaking (1988), §II, Principle 1, sha256:f240ea62dd033aac827c2073e56c0a4061d5c84531e5cf6be02d333a8f9f2140 — https://www.casact.org/sites/default/files/2021-05/Statement-Of-Principles-Ratemaking.pdf"
    - "Baranoff et al., Risk Management for Enterprises and Individuals v1.0 (Saylor Academy 2012), s12-01 combined ratio, cycle, break-even, sha256:7e7830b39c5a0cd17f75dbfeb2f0d2abe4e422df2b92c3f0218097ca48411d3d — https://saylordotorg.github.io/text_risk-management-for-enterprises-and-individuals/s12-01-insurance-market-conditions.html"
    - "Baranoff et al., Risk Management for Enterprises and Individuals v1.0 (Saylor Academy 2012), s11-01 agents vs brokers, sha256:9abf601a8c7e62c112667b15df20471c0a07e5e32ff1dea40448eec0afdccf7e — https://saylordotorg.github.io/text_risk-management-for-enterprises-and-individuals/s11-01-insurance-operations-marketing.html"
    - "Baranoff et al., Risk Management for Enterprises and Individuals v1.0 (Saylor Academy 2012), s11-03 reinsurance, sha256:85078f2f0eb5eeae7a77d336f6f5ff14be25519272bfc27d528e037c21424877 — https://saylordotorg.github.io/text_risk-management-for-enterprises-and-individuals/s11-03-insurance-operations-reinsuran.html"
    - "Baranoff et al., Risk Management for Enterprises and Individuals v1.0 (Saylor Academy 2012), s10-02 ISO advisory, sha256:a643d7b54dd325ce18405f2c482ebef89986853c6894651046d3f112a552cc04 — https://saylordotorg.github.io/text_risk-management-for-enterprises-and-individuals/s10-02-nature-of-insurance.html"
    - "Baranoff et al., Risk Management for Enterprises and Individuals v1.0 (Saylor Academy 2012), s12-02 state regulation, sha256:d6b9f53c3fd3c106c652f9ef8b46b21ee9199f1fda6e8951f64e4cf4b09bb021 — https://saylordotorg.github.io/text_risk-management-for-enterprises-and-individuals/s12-02-insurance-regulation.html"
    - "NAIC Insurance Topics: Surplus Lines (last updated 10/27/2025), read via WebFetch 2026-10-10 (direct fetch 403; no hash) — https://content.naic.org/insurance-topics/surplus-lines"
    - "Triple-I, Facts + Statistics: Auto insurance, \"The shared/residual market\", sha256:86950959d65e25ac88028b883dfa1f928927d41f43314281b50e4477b16c5840 — https://www.iii.org/fact-statistic/facts-statistics-auto-insurance"
    - "Hartwig & Wilkinson, Residual Market Property Plans (Insurance Information Institute, May 2016), pp.4, 25, sha256:8f3a5bb1df3d8cd47fd05936bd4558ae06c04c321414e8cd650ae1822b7ba90d — https://www.iii.org/sites/default/files/docs/pdf/residual_markets_wp_051616.pdf"
    - "Rejda & McNamara, Principles of Risk Management and Insurance, 12th ed. (Pearson 2014), Ch.8 p.149, sha256:d287eea5870c8b2d7dcfd205f5c26283d5c3cb4f536965eb8c21a344c428aed0"
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Property-Casualty Insurance Marketplace.md
---

The **property-casualty insurance marketplace** is where buyers of property and liability insurance meet the [[Insurer|insurers]] that sell it, usually through producers, with reinsurers behind the insurers and state regulators overseeing the whole. It is divided into the admitted market of licensed insurers, the surplus lines market of nonadmitted insurers for risks the admitted market will not write, and the residual market for risks no insurer will write voluntarily. Three features set the product apart from most others: its price is set before its cost is known, its price and policy wording are regulated, and its prices and availability swing through the underwriting cycle.

> $$\text{Rate} \approx E[\text{future costs}] \ \text{(estimated before the policy period)}$$

> $$\text{CR} = \frac{\text{Losses}}{\text{Premium}} + \frac{\text{Expenses}}{\text{Premium}}$$

- **Symbols:** The rate is an estimate of the expected value of the losses, expenses and profit the policy will produce, made before any of them occur. The combined ratio (CR) is the loss ratio plus the expense ratio; above 100% the insurer pays more than a dollar in losses and expenses for each premium dollar, though investment income on the funds it holds can still leave it profitable ([[Combined Ratio]]).
- **Buyers:** Individuals and families buy personal lines such as auto and homeowners insurance. Businesses buy commercial lines, and larger ones employ a risk manager who decides what to retain and what to insure and buys through a broker ([[Risk Treatment]]).
- **Insurers:** The sellers include stock and mutual companies, reciprocal exchanges, Lloyd's syndicates, captives and government programs ([[Types of Insurers]]). Smaller insurers also rely on industry data: the Insurance Services Office (ISO) collects statistics and acts as an advisory organization on rates and policy forms.
- **Intermediaries:** Most property-casualty insurance is sold through agents or brokers paid by commission, with some sold by salaried employees or directly. An agent legally represents the insurer; a broker acts for the buyer when placing business, and in about half the states brokers are also required to be agents of the insurer. Many states call both producers ([[Insurance Producer]], [[Insurance Distribution Systems]]).
- **Reinsurers:** Reinsurance is an arrangement by which an insurer, the ceding insurer, transfers all or part of its risk to another company, the assuming reinsurer. It can be treaty (covering every policy that fits its terms automatically) or facultative (negotiated one risk at a time), and proportional (sharing premiums and losses by a set percentage) or nonproportional (paying losses above a retention) ([[Reinsurance]]).
- **Regulators:** Insurance in the United States is regulated mainly by the states. Legislatures pass the insurance laws, and the state insurance commissioner licenses insurers, agents, brokers and adjusters, oversees solvency, approves policy forms and controls rates. The National Association of Insurance Commissioners (NAIC) works for uniformity across the states, and each state has guaranty funds that pay claims of insolvent licensed insurers.
- **The admitted market:** An admitted insurer is licensed in the state and subject to its rate, form and solvency rules. In the voluntary market, auto insurers and other admitted insurers are free to choose which policyholders to accept.
- **The surplus lines market:** Nonadmitted insurers write risks that are not available in the admitted market, placed through a licensed surplus lines broker, who checks that the insurer is eligible and remits the surplus lines premium tax. New products with no loss history are often written here first, and coverage can move to the admitted market once data build up. Surplus lines policyholders have no guaranty fund protection. The NAIC reports U.S. surplus lines direct written premium of \$131 billion in 2024, 12% of the property-casualty total ([[Excess and Surplus Lines]]).
- **The residual market:** Residual, shared or involuntary market programs make basic coverage available to high-risk buyers the standard market will not take. All states and the District of Columbia use systems, commonly assigned risk plans, that guarantee auto insurance is available, assigning high-risk drivers proportionally to the insurers doing business in the state. For property, FAIR Plans, beach and windstorm plans, and the state-run Citizens insurers of Florida and Louisiana operate as pools whose premiums, losses and expenses are shared among member insurers.
- **Price set before cost is known:** Ratemaking is prospective, because the property-casualty rate must be developed before the risk is transferred. An insurer learns its true cost of goods sold only as claims are reported and settled, sometimes years later, so its prices rest on estimates of losses, trends and catastrophes.
- **Regulation of price and form:** Because the product is a promise of future payment, regulation aims first at insurers' solvency, and also at rates and policy forms. Most states regulate rates for auto, property, liability and workers compensation. Under prior approval, a rate must be approved before it is used; under file-and-use, an insurer may use a new rate as soon as it is filed. Approval methods vary by state.
- **The underwriting cycle:** Property-casualty markets alternate between soft markets, when losses are low and prices are very competitive and underwriting standards loosen, and hard markets, when losses exceed expectations, insurers draw on capital, capacity falls and prices rise ([[Underwriting Cycle]]). A buyer's best treatment can change with the cycle, since retention is more attractive when insurance is expensive.

> [!example]- Where Does Each Account Go? {Example}
> A producer has four new accounts in one state: (a) a family with a clean driving record that wants a personal auto policy; (b) a driver with several recent accidents whom every voluntary insurer the producer represents has declined, although the state requires auto liability insurance; (c) a start-up that rents electric scooters and wants liability coverage for a new kind of exposure that admitted insurers will not write; (d) a building owner in an older urban area who has been declined by several property insurers, and whose building passes the state FAIR Plan's inspection. Which part of the marketplace serves each?
>
> > [!answer]-
> > - **(a) The admitted, voluntary market:** Licensed insurers compete for the account and can choose to accept it.
> > - **(b) The residual market:** The state's auto insurance plan assigns the driver to an insurer doing business in the state, because coverage is compulsory and the voluntary market declined.
> > - **(c) The surplus lines market:** A licensed surplus lines broker places it with an eligible nonadmitted insurer. The policyholder will have no guaranty fund protection if that insurer fails.
> > - **(d) The residual market:** The FAIR Plan writes basic property insurance for buildings that pass its inspection but cannot get voluntary coverage.

> [!example]- Pricing Before the Cost Is Known {Example}
> With illustrative figures, an insurer prices a line of business for next year expecting losses of \$65 million and expenses of \$30 million on premium of \$100 million. During the year, a series of storms and rising repair costs push incurred losses to \$78 million, and investment income on the line's funds is \$8 million. Find the planned and actual combined ratios, and the result after investment income.
>
> > [!answer]-
> > $$
> > \begin{align*}
> > \text{CR}_{\text{planned}} &= \frac{65}{100} + \frac{30}{100} \\
> > &= 95\% \\
> > \text{CR}_{\text{actual}} &= \frac{78}{100} + \frac{30}{100} \\
> > &= 108\%
> > \end{align*}
> > $$
> > The underwriting result is a loss of \$8 million instead of the planned \$5 million gain. Investment income of \$8 million brings the line back to break-even. The premium could not be changed after the policies were sold: the insurer committed to its price before it knew its costs. If many insurers have the same experience, rising prices and tighter underwriting at the next renewals are the start of a hard market.

> [!tip]- How it appears on the exam
> - **DISC-RM:** The marketing and distribution section opens with the property-casualty insurer marketplace and the factors that make it unique. Questions name a participant's role, such as who a broker represents or what a reinsurer does, or ask which market (admitted, surplus lines or residual) a risk belongs in.
> - **Unique factors:** Questions ask why insurance pricing differs from pricing most products, how rate and form regulation affects an insurer's marketing, or how the underwriting cycle changes what buyers can get.

> [!warning]- Exam traps
> - **Agent versus broker:** An agent represents the insurer and a broker represents the buyer, but in about half the states a broker must also be the insurer's agent. Do not assume a broker owes nothing to the insurer.
> - **Surplus lines is not the residual market:** Surplus lines insurers choose to write risks the admitted market will not, at rates they set. The residual market is a mechanism, often a pool of admitted insurers, that provides coverage to buyers no insurer will take voluntarily.
> - **No guaranty fund for surplus lines:** Guaranty funds protect policyholders of licensed insurers. A surplus lines policyholder is not covered if the nonadmitted insurer fails.
> - **A combined ratio above 100% is not always a loss:** It means an underwriting loss, but investment income can leave the insurer profitable overall.
