---
verification:
  status: verified
  confidence: medium
  last_checked: 2026-10-31
  last_checked_by: agent:validate-v1
  content_hash: sha256:70b1edaec9eac7b27f85c0983e2eb75e88187346e259e630f82692338223f331
  sources:
    - "CAS Enterprise Risk Management Committee, Overview of Enterprise Risk Management (CAS Forum, Summer 2003), pp.109-114 (PDF pp.11-16: definition, silo vs comprehensive view, value-creating, all material risk factors, seven AS/NZS 4360 process steps and their descriptions, treat/exploit responses, monitor and review fed back to context); pp.117-118 (PDF pp.19-20: VaR, TVaR, EPD); pp.121-126 (PDF pp.23-28: statistical vs structural models, DFA, ESG linking interest rates and inflation, natural hedge, capital adequacy, attribution, allocation, asset allocation, reinsurance/hedging, strategic planning), sha256:f433c8300785640b2f4fd168d3b38878d1bfbc9b9f8f74c08e43de8e98982efd — https://www.casact.org/sites/default/files/database/forum_03sforum_03sf099.pdf"
    - "COSO, Enterprise Risk Management: Integrating with Strategy and Performance, Executive Summary (June 2017), p.10 (performance component: prioritize against risk appetite, select responses, develop portfolio view), sha256:2d4809dd09687d701944987f65ca6ddc39074a00236abebfd436d79f4563abd1 — https://www.coso.org/_files/ugd/3059fc_61ea5985b03c4293960642fdce408eaa.pdf"
    - "CAS Exam 7 Spring 2016 sample answers and examiner's report, Q21 PDF pp.88-89 (ERM monitoring dynamic and ongoing; operational and strategic risk; focus on material risks; upside to exploit; tail dependencies between lines), sha256:e07f38dd81edc9715ef2528c1861e75c609c85b598b51b723d665cf63b745b84 — https://www.casact.org/sites/default/files/2021-03/16-7.pdf"
    - "Directive 2009/138/EC (Solvency II), Article 45, as published by legislation.gov.uk, Art.45(1): every insurance and reinsurance undertaking shall conduct its own risk and solvency assessment, sha256:8a14b6ba695f01c2b32f763266242a6dd1291d3a9676ef795556e9646861b512 — https://www.legislation.gov.uk/eudr/2009/138/article/45"
    - "NAIC Risk Management and Own Risk and Solvency Assessment Model Act (#505), Sec.6 Exemption, PDF p.3 (premium under $500,000,000), sha256:d5df715f08b8061178f58fbf5d6aefd4b5993d845584455f0fa7eef492108798 — https://content.naic.org/sites/default/files/model-law-505.pdf"
    - "OSFI Guideline E-19, Own Risk and Solvency Assessment, purpose and scope: ORSA of federally regulated insurers, sha256:21c71a7b9bea4e6607232581c0f24787b212b263e3864c0ea7c0c1ca8172eef9 — https://www.osfi-bsif.gc.ca/en/guidance/guidance-library/own-risk-solvency-assessment"
    - "CAS Exam 9 Content Outline, Fall 2026 (v01, 2026-03-18), pp.3-7: Domains B-D tasks and readings; text references (Brehm et al. D1-D6, source SK; Coval, Jurek, and Stafford C5-C6, SK; Cummins CAT Bond C7, RMIR 11(1) pp.23-47, SK), sha256:be1980d41470fed30dec1b9af9412f4e936d666e65d01237684acde11f3e7fc8 — https://www.casact.org/sites/default/files/2026-03/Exam_9_CO_2026_Fall.pdf"
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Enterprise Risk Management.md
---

**Enterprise Risk Management** (ERM) is, in the CAS's definition, the discipline by which an organisation in any industry assesses, controls, exploits, finances and monitors risks **from all sources** for the purpose of increasing its short- and long-term value to its stakeholders. It replaces the silo approach of managing each risk separately with a comprehensive view, treats risk management as value-creating as well as risk-mitigating, and covers all categories and all material risk factors that can influence the organisation's value.

> $$
> \begin{aligned}
> &\text{Establish context} \rightarrow \text{Identify} \rightarrow \text{Analyze/quantify} \\
> &\rightarrow \text{Integrate} \rightarrow \text{Assess/prioritize} \\
> &\rightarrow \text{Treat/exploit} \rightarrow \text{Monitor and review} \rightarrow \cdots
> \end{aligned}
> $$

- **The process steps.** The CAS framework, based on the Australian/New Zealand risk management standard, has seven iterative steps. *Establish context*: the external context (strengths, weaknesses, opportunities and threats; stakeholders), the internal context (objectives, strategies, key performance indicators, governance) and the risk management context (the risk categories that matter and common risk metrics). *Identify*: document the conditions and events, extreme ones included, that materially threaten the objectives or could be exploited for advantage. *Analyze/quantify*: calibrate, wherever possible, a probability distribution of outcomes for each material risk. *Integrate*: aggregate the distributions, with their correlations, into the aggregate risk profile. *Assess/prioritize*: find each risk's contribution to that profile and rank the risks. *Treat/exploit*: avoid, retain (and finance), reduce, transfer or exploit each risk ([[Risk Mitigation]]). *Monitor and review*: keep gauging the risk environment and how the strategies perform, and feed the results back into setting the context. ERM is a continuing cycle, not a project.
- **What makes it "enterprise".** Every [[Risk Taxonomies|category]] — insurance hazard, [[Financial Risk|financial]], [[Operational Risk|operational]] and strategic — is managed as one portfolio, so correlations and concentrations that no silo sees become visible, and upside is exploited as well as downside controlled. That is its link to the overall [[Business Risk|risk of the business]] and to [[Business Strategy|strategy]].
- **Treating risk holistically.** Treatment under ERM is chosen for the organization's net position, not risk by risk. The CAS overview lists the responses as avoiding, retaining (and financing), reducing, transferring or exploiting a risk, and stresses that portfolio risk is not the simple sum of the parts: exposures that offset each other are natural hedges, such as one division long and another short in the same currency, and hedging each separately wastes money. COSO's 2017 framework makes developing a portfolio view one of its principles, after risks are prioritized against the [[Risk Appetite|risk appetite]] and responses chosen. See [[Risk Treatment]].
- **The risk model is its engine.** Risks are modelled ([[Risk Modeling]]) either statistically or with a structural simulation model of the enterprise — for an insurer, dynamic financial analysis, which focuses on its hazard and financial risks. In a structural model the dependencies come from cause-and-effect links: an economic scenario generator drives interest rates and inflation, and through them costs, prices, asset values and investment income. The output supports capital adequacy, capital attribution and allocation, asset allocation, the reinsurance and hedging programme, and strategic planning.
- **It is anchored by [[Risk Appetite|risk appetite]]** and expressed through [[Risk Measure|risk measures]] (VaR, TVaR, expected policyholder deficit) that turn the model's output into capital targets and limits. Regulators — OSFI in Canada, Solvency II in Europe, and the NAIC for U.S. insurers above a size threshold — now expect insurers to document it in an [[ORSA]].

> [!example]- Setting Up the Program at a Regional Insurer {Example}
> A regional insurer writes Gulf Coast homeowners and commercial property plus a fast-growing commercial auto book, and holds mostly long-duration corporate bonds. The CEO asks the new chief risk officer to "set up ERM". What should each step produce in the first year?
>
> > [!answer]-
> > 1. **Establish context and identify.** A risk committee drawn from underwriting, claims, investments and finance sets common risk metrics, and workshops with those functions produce a risk register. The top entries are likely hurricane concentration, commercial auto reserve adequacy (long tail, rising severity), interest-rate and credit risk in the bond portfolio, and soft-market pricing.
> > 2. **Analyze, integrate and prioritize.** A risk model: catastrophe-model output for property; frequency–severity with [[Parameter Risk|parameter risk]] for auto; a stochastic reserve distribution; an economic scenario generator for the bonds. The dependencies matter most — inflation raises auto severity *and* depresses bond values, and a hurricane can force asset sales into a weak market. Output: the distribution of next year's surplus, with TVaR set against appetite, and each risk's contribution to it.
> > 3. **Treat/exploit.** Decide per risk: more catastrophe reinsurance or a cap on coastal growth; rate and reserve action on auto; shorter duration or better credit quality in the portfolio; limits for each.
> > 4. **Monitor and review.** Quarterly indicators (net PML to capital, auto severity trend, duration gap), results against plan, annual recalibration, board reporting.
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

> [!tip]- How it appears on the exam
> - **DISC-RM:** The section on treating risk ends with treating risk holistically, and the introduction contrasts ERM with the traditional insurance-buying approach ([[Risk Management]]). Questions ask what makes an approach enterprise-wide, why managing risks in silos can cost more or miss a concentration, and how a natural hedge changes the treatment.
> - **Exam 9:** ERM frames the internal model, capital and risk appetite questions: the steps of a program, the risk measures and correlations that drive aggregate capital, and the regulatory expectation of an ORSA.

> [!warning]- Exam traps
> - **Holistic does not mean one technique:** ERM still uses avoidance, control, retention and transfer. What changes is that the choice is made for the whole portfolio, with the interactions between risks in view.
> - **Silo limits can all be met while the total is breached:** Each unit inside its own limit says nothing about the enterprise unless the correlations are counted.
> - **Exploiting is a response too:** ERM can keep or seek out a risk the organization is well placed to manage. Answers that list only ways to reduce risk leave it out.

