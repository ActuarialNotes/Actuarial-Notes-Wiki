---
verification:
  status: verified
  confidence: medium
  last_checked: 2026-10-18
  last_checked_by: agent:validate-v1
  content_hash: sha256:f4a2c8a827080c1d673190a7b7452fbb67d73f0852ae9e418ad5e5de0bfa946f
  sources:
    - "CAS Exam 9 Content Outline, Fall 2026 (v01, 2026-03-18), PDF pp.3-7: Domains B, C and D tasks and readings; complete text references (Brehm et al.: D1-D6, Chapters 1, 2 excl. 2.6, 3 excl. 3.4, 4, 5.4; source SK), sha256:be1980d41470fed30dec1b9af9412f4e936d666e65d01237684acde11f3e7fc8 — https://www.casact.org/sites/default/files/2026-03/Exam_9_CO_2026_Fall.pdf"
    - "CAS Exam 9 Spring 2013 - exam and sample answers/examiner's report, Q15 PDF pp.49, 97 (RAROC and EVA: profit over capital, profit less cost of capital; choose higher EVA when capital constrained); Q24-25 PDF pp.26, 74-75 (ROE decomposition with premium-to-surplus and reserves-to-surplus leverage; leverage raises expected return and volatility), sha256:8cad072030f7457e0220739fd8af1f74ce23873efd78efdd1d99021816131e75 — https://www.casact.org/sites/default/files/2021-02/admissions_studytools_exam9_13-9.pdf"
    - "CAS Exam 7 Spring 2013 - exam and sample answers/examiner's report, Q15 PDF p.68 (cat models, ESGs, copulas); Q19 PDF pp.75-76 (TVaR, EPD, subadditivity); Q20 PDF pp.77-78 (efficient frontier, cost allocation); Q21 PDF pp.25, 79-80 (Basel II basic indicator and standardized approaches); Q22 PDF pp.26, 81-82 (pricing risk, claim variability, market risk, correlation; inflation raises liabilities and lowers bond values), sha256:b10657555e3da0116f715810c94b20afbcb50b86a4ba6b2fa3b9f771f2ab9d99 — https://www.casact.org/sites/default/files/2021-03/13-7.pdf"
    - "CAS Exam 7 Spring 2015 - exam and sample answers/examiner's report, Q22 PDF pp.84-85 (key elements of parameter uncertainty); Q26 PDF pp.30, 93-95 (efficient frontier on three risk measures; capital = 1-in-100 TVaR; cost of capital plus net reinsurance cost; report: commonest mistake was examining only one risk measure); Q28 PDF pp.97-98 (operational vs strategic risk; strategic risk types); Q29 PDF p.99 (currency, concentration, catastrophe, liquidity risk), sha256:b3ff9352d93b7aeaa7ffe531de52bc928e635bd72fae89247fb310580c99a568 — https://www.casact.org/sites/default/files/2021-03/15-7.pdf"
    - "CAS Exam 7 Spring 2018 - exam and sample answers/examiner's report, Q1 PDF pp.6, 34-37 (strategic risk types; deficient loss reserves a primary cause of insolvency, impairment causes 'as mentioned in Brehm'; process vs parameter risk); Q20 PDF p.25 (reduce insurance hazard risk by reinsurance; capital set by 1-in-100 TVaR), sha256:b5f6e6454919cfb04da8295ac4a70c89af58e770707daa4faf575bdca8a4fa6b — https://www.casact.org/sites/default/files/2021-03/18-7_0.pdf"
    - "CAS Enterprise Risk Management Committee, Overview of Enterprise Risk Management (CAS Forum, Summer 2003), pp.109-114 (PDF pp.11-16: definition, four risk types and lists, process steps, treat/exploit: avoid, retain, reduce, transfer, exploit); pp.117-118 (PDF pp.19-20: solvency- and performance-related measures); PDF pp.23, 25 (DFA as structural simulation model; ESG linking interest rates and inflation; natural hedge), sha256:f433c8300785640b2f4fd168d3b38878d1bfbc9b9f8f74c08e43de8e98982efd — https://www.casact.org/sites/default/files/database/forum_03sforum_03sf099.pdf"
    - "Carpenter, Bauer & Erdogan, Principles of Management v1.1 (Saylor, CC BY-NC-SA), Sec.5.2, strategic management process: vision and mission, formulation and implementation; corporate vs business strategy; SWOT, sha256:f8b7b28801d9bdb61effb2c7e7ed4269d9bf3831502508d2ddfb0688bcda5890 — https://saylordotorg.github.io/text_principles-of-management-v1.1/s09-02-strategic-management-in-the-p-.html"
    - "Mastering Strategic Management (Saylor), Sec.5.1, generic business-level strategies: cost leadership, differentiation, sha256:b1d6cffee58ce0f293707e6d2918e12f550d6f19eca0aeb3a03eabc13b1f2b5a — https://saylordotorg.github.io/text_mastering-strategic-management/s09-01-understanding-business-level-s.html"
    - "Goldburd, Khare, Tevet & Guller, Generalized Linear Models for Insurance Rating (CAS Monograph 5, 2nd ed. 2020), PDF pp.41-42 (goals: rating plan, underwriting criteria, renewal probability; stakeholder alignment), p.53 (target variable by goal: pure premium, loss ratio, probability of a large loss), pp.88-91 (quantile plots, double lift, loss ratio charts, Lorenz curve), pp.27-29 (offsets), sha256:89b203ea55208911c4d8f6ef1ede4dd6c0206d47999b5e8aff96fe233c0ff757 — https://www.casact.org/sites/default/files/2021-01/05-Goldburd-Khare-Tevet.pdf"
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Business Strategy.md
---

**Business Strategy** is the set of choices by which an insurer pursues its goals: which lines, markets and customers to write, how much risk to retain, and how much capital to hold and where to deploy it. **Strategic management** is the process of setting, executing and monitoring those choices. [[Enterprise Risk Management|ERM]] ties risk to strategy by putting every option on a common risk-adjusted footing. In a modelling project, the business goal decides what the model must predict and how its success is judged.

> $$\text{RAROC} = \frac{E[\text{Profit}]}{\text{Risk Capital}}$$

> $$\text{EVA} = E[\text{Profit}] - r_h \times \text{Risk Capital}$$

- **Risk capital** comes from the ERM model through a [[Risk Measure|risk measure]], such as VaR or TVaR at a chosen level ([[Risk Capital]]). $r_h$ is the hurdle rate, the [[Cost of Capital|cost of capital]]. A strategy adds value when RAROC exceeds $r_h$, or equivalently when EVA (economic value added) is positive ([[Risk-Adjusted Performance]]). Ranking by RAROC and by EVA can disagree: the ratio can favour a smaller business, while EVA measures the value actually added.
- **How risk measures and models shape strategy (Exam 9).** The ERM model turns strategic questions into comparable distributions of results. Those questions include capital adequacy, allocating capital to lines and units, reinsurance ([[Reinsurance Strategy]]), asset mix and planned growth. Plotting the alternatives by risk and return traces an **efficient frontier**, and the insurer picks a point on it within its [[Risk Appetite|risk appetite]].
- **The choice of risk measure matters.** Changing the measure, its confidence level or the allocation method changes each unit's capital, and so its measured return and which lines look worth growing.
- **Strategic management and levels of strategy (DISC-RM).** The [[Strategic Management Process]] sets a vision, mission and goals, analyzes the environment, formulates, implements and evaluates. Strategy is set at more than one level: [[Corporate-Level Strategy|corporate strategy]] chooses which businesses to be in, and [[Business-Level Strategy|business strategy]] chooses how each one competes, for example by cost leadership or differentiation.
- **Strategic risk.** The risk of choosing the wrong strategy, or executing it badly, is a risk category in its own right ([[Risk Taxonomies]], [[Business Risk]]).
- **Business goals in a model (PCPA).** The goal sets the target (loss cost, retention). The [[Generalized Linear Models for Insurance Rating (Goldburd et al. - 2020)|GLM monograph]] names lack of stakeholder alignment on goals and outcomes as one of the most common reasons modelling projects fail or fall behind.

> [!example]- Choosing a Reinsurance Strategy by EVA {Example}
> The hurdle rate is $12\%$. Expected profit and risk capital (from the ERM model, in \$ millions) under three options are:
>
> - A, no reinsurance: profit $60$, capital $400$
> - B, a 40% quota share: profit $45$, capital $250$
> - C, catastrophe excess of loss: profit $52$, capital $300$
>
> Rank the options by RAROC and by EVA.
>
> > [!answer]-
> > - **RAROC:** A $60/400 = 15.0\%$, B $45/250 = 18.0\%$, C $52/300 = 17.3\%$.
> > - **EVA:** A $60 - 0.12(400) = 12$, B $45 - 0.12(250) = 15$, C $52 - 0.12(300) = 16$.
> >
> > All three clear the hurdle. **B has the best ratio, but C adds the most value**: it gives up less profit to the reinsurer than the quota share while still releasing $\$100$ million of capital. If the choice were made on RAROC alone, the insurer would shrink more than it should.
> >
> > The ranking is only as good as the capital figures. Under a different risk measure or confidence level, the three capital amounts change, and so can the ranking.

> [!example]- Same Data, Different Business Goal {Example}
> A commercial property insurer asks for two models from the same submissions data. Underwriting wants to decide which new submissions get an on-site inspection, and it can inspect 15% of them. Pricing wants new rating relativities. How should the two designs differ?
>
> > [!answer]-
> > - **Target.** Underwriting needs the probability of a large loss, or of a loss ratio above a threshold. Pricing needs the expected pure premium (frequency and severity, or Tweedie) with an exposure [[Offset Variable|offset]].
> > - **Success metric.** Underwriting needs the share of large losses captured in the top 15% of scores, because that is the inspection budget. Pricing needs lift over the current plan: quantile plots, a double lift chart and a loss ratio chart.
> > - **Constraints.** The underwriting model may use any submission information available when the decision is made, subject to underwriting rules. Pricing variables must be permissible, filable and programmable.
> > - **The message to the business.** For underwriting: *"inspecting the top 15% finds about X% of the large losses."* For pricing: which customers' premiums move, by how much, and the expected change in loss ratio.
> >
> > A single model built without settling these questions would serve neither goal well.
