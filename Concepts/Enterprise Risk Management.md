---
verification:
  status: in_review
  confidence: null
  last_checked: 2026-10-18
  last_checked_by: agent:validate-v1
  content_hash: sha256:34d128a942bc0bd33682d0ba455c85214e3b9ccb262fbb4483d116e846b7b30c
  sources:
    - "CAS Exam 9 Content Outline, Fall 2026 (v01, 2026-03-18), PDF pp.3-7: Domains B, C and D tasks and readings; complete text references (Brehm et al.: D1-D6, Chapters 1, 2 excl. 2.6, 3 excl. 3.4, 4, 5.4; source SK), sha256:be1980d41470fed30dec1b9af9412f4e936d666e65d01237684acde11f3e7fc8 — https://www.casact.org/sites/default/files/2026-03/Exam_9_CO_2026_Fall.pdf"
    - "CAS Enterprise Risk Management Committee, Overview of Enterprise Risk Management (CAS Forum, Summer 2003), pp.109-114 (PDF pp.11-16: definition, four risk types and lists, process steps, treat/exploit: avoid, retain, reduce, transfer, exploit); pp.117-118 (PDF pp.19-20: solvency- and performance-related measures); PDF pp.23, 25 (DFA as structural simulation model; ESG linking interest rates and inflation; natural hedge), sha256:f433c8300785640b2f4fd168d3b38878d1bfbc9b9f8f74c08e43de8e98982efd — https://www.casact.org/sites/default/files/database/forum_03sforum_03sf099.pdf"
    - "COSO, Enterprise Risk Management: Integrating with Strategy and Performance, Executive Summary (June 2017), p.10 (performance component: prioritize against risk appetite, select responses, develop portfolio view), sha256:2d4809dd09687d701944987f65ca6ddc39074a00236abebfd436d79f4563abd1 — https://www.coso.org/_files/ugd/3059fc_61ea5985b03c4293960642fdce408eaa.pdf"
    - "CAS Exam 7 Spring 2016 - exam and sample answers/examiner's report, Q21 PDF pp.25, 88-89 (ERM program: monitoring, operational and strategic risk, materiality per 'the Brehm text', upside, dependencies); Q22 PDF pp.90-92 (cycle and asset strategy; reinsurance reduces volatility); Q23 PDF p.92 (capital reference points); Q26 PDF pp.99-100 (operational vs underwriting risk); Q27 PDF pp.101-103 (agency theory, cycle management); Q28 PDF pp.104-105 (soft and technical cycle models), sha256:e07f38dd81edc9715ef2528c1861e75c609c85b598b51b723d665cf63b745b84 — https://www.casact.org/sites/default/files/2021-03/16-7.pdf"
    - "Directive 2009/138/EC (Solvency II), consolidated HTML, Art.13(30)-(34) definitions (underwriting, market, credit, operational, liquidity risk); Art.45(1) ORSA; Art.101(3) 99.5% one-year VaR; Art.104(1) risk modules; Art.105(2), (5), (6) non-life premium/reserve and catastrophe, market sub-modules, counterparty default (reinsurance, derivatives, receivables from intermediaries); Art.107(1), (3) operational risk capital requirement, sha256:ad77288b3961fb0425f2e8db221ecc9706975bf72c37d7d3adcf8f0df62f702e — https://eur-lex.europa.eu/legal-content/EN/TXT/HTML/?uri=CELEX:32009L0138"
    - "NAIC Risk Management and Own Risk and Solvency Assessment Model Act (#505), Sec.6 Exemption (PDF p.3: direct written and unaffiliated assumed premium under $500,000,000; group test), sha256:d5df715f08b8061178f58fbf5d6aefd4b5993d845584455f0fa7eef492108798 — https://content.naic.org/sites/default/files/model-law-505.pdf"
    - "OSFI Guideline E-19, Own Risk and Solvency Assessment, purpose and scope: ORSA of federally regulated insurers, sha256:4667c437611bf88f20c3e35f4166863b2f4b5c32edac19dfcf1f03d9a7adb282 — https://www.osfi-bsif.gc.ca/en/guidance/guidance-library/own-risk-solvency-assessment"
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Enterprise Risk Management.md
---

**Enterprise Risk Management** (ERM) is the process of systematically and comprehensively identifying an organisation's critical risks, quantifying their impacts and implementing integrated strategies to maximise enterprise value (Brehm et al.). The CAS definition puts it as the discipline by which an organisation assesses, controls, exploits, finances and monitors risks **from all sources** to increase its short- and long-term value to stakeholders.

> $$
> \begin{aligned}
> &\text{Diagnose} \rightarrow \text{Analyze} \\
> &\rightarrow \text{Implement} \rightarrow \text{Monitor} \rightarrow \cdots
> \end{aligned}
> $$

- **The four phases.** *Diagnose*: a high-level assessment of the risks that could seriously threaten the firm's value — general environment, industry and firm-specific. *Analyze*: model the critical risks as probability distributions of outcomes, with their correlations, and rank what drives the bad outcomes. *Implement*: treat each risk — avoid it, reduce its frequency or severity, transfer it, retain it, or exploit it ([[Risk Mitigation]]). *Monitor*: compare results with expectations and update. ERM is a continuing cycle, not a project.
- **What makes it "enterprise".** Every [[Risk Taxonomies|category]] — insurance hazard, [[Financial Risk|financial]], [[Operational Risk|operational]] and strategic — is managed as one portfolio, so correlations and concentrations that no silo sees become visible, and upside is exploited as well as downside controlled. That is its link to the overall [[Business Risk|risk of the business]] and to [[Business Strategy|strategy]].
- **Treating risk holistically.** Treatment under ERM is chosen for the organization's net position, not risk by risk. The CAS overview lists the responses as avoiding, retaining (and financing), reducing, transferring or exploiting a risk, and stresses that portfolio risk is not the simple sum of the parts: exposures that offset each other are natural hedges, such as one division long and another short in the same currency, and hedging each separately wastes money. COSO's 2017 framework makes developing a portfolio view one of its principles, after risks are prioritized against the [[Risk Appetite|risk appetite]] and responses chosen. See [[Risk Treatment]].
- **The internal risk model is its engine.** A realistic program needs an internal model ([[Risk Modeling]]) of underwriting, reserve, catastrophe and asset risk with their dependencies, used for capital adequacy, capital allocation, reinsurance, asset allocation and planning. Brehm's implementation issues are practical: staffing and scope; [[Model Selection|model choice]] and parameter development, much of it expert opinion, with correlations sensitive enough to need executive ownership; and integration into the planning and reinsurance-buying calendar so the output is actually used.
- **It is anchored by [[Risk Appetite|risk appetite]]** and expressed through [[Risk Measure|risk measures]] (VaR, TVaR, expected policyholder deficit) that turn the model's output into capital targets and limits. Regulators — OSFI in Canada, Solvency II in Europe, and the NAIC for U.S. insurers above a size threshold — now expect insurers to document it in an [[ORSA]].

> [!example]- Setting Up the Program at a Regional Insurer {Example}
> A regional insurer writes Gulf Coast homeowners and commercial property plus a fast-growing commercial auto book, and holds mostly long-duration corporate bonds. The CEO asks the new chief risk officer to "set up ERM". What should each phase produce in the first year?
>
> > [!answer]-
> > 1. **Diagnose.** Workshops with underwriting, claims, investments and finance produce a ranked risk register. The top entries are likely hurricane concentration, commercial auto reserve adequacy (long tail, rising severity), interest-rate and credit risk in the bond portfolio, and soft-market pricing.
> > 2. **Analyze.** An internal model: catastrophe-model output for property; frequency–severity with [[Parameter Risk|parameter risk]] for auto; a stochastic reserve distribution; an economic scenario generator for the bonds. The dependencies matter most — inflation raises auto severity *and* depresses bond values, and a hurricane can force asset sales into a weak market. Output: the distribution of next year's surplus, with TVaR set against appetite.
> > 3. **Implement.** Decide per risk: more catastrophe reinsurance or a cap on coastal growth; rate and reserve action on auto; shorter duration or better credit quality in the portfolio; limits for each.
> > 4. **Monitor.** Quarterly indicators (net PML to capital, auto severity trend, duration gap), results against plan, annual recalibration, board reporting.
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
> - **Exam 9:** ERM frames the internal model, capital and risk appetite questions: the phases of a program, the risk measures and correlations that drive aggregate capital, and the regulatory expectation of an ORSA.

> [!warning]- Exam traps
> - **Holistic does not mean one technique:** ERM still uses avoidance, control, retention and transfer. What changes is that the choice is made for the whole portfolio, with the interactions between risks in view.
> - **Silo limits can all be met while the total is breached:** Each unit inside its own limit says nothing about the enterprise unless the correlations are counted.
> - **Exploiting is a response too:** ERM can keep or seek out a risk the organization is well placed to manage. Answers that list only ways to reduce risk leave it out.

