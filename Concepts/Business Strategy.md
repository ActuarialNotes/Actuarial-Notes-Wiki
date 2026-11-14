---
verification:
  status: stale
  confidence: null
  last_checked: 2026-10-18
  last_checked_by: agent:validate-v1
  content_hash: sha256:42c920afbfcc5bed59fe86e48988ad16ee48c0eb6ca78ea4c91bf1b98c70ea7a
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

**Business Strategy** is the set of choices by which an insurer pursues its goals: which lines, markets and customers to write, how much risk to retain, and how much capital to hold and where to deploy it. **Strategic management** is the process of setting, executing and monitoring those choices.

[[Enterprise Risk Management|ERM]] ties risk to strategy by putting every option on a common risk-adjusted footing. The risk-adjusted return on capital of an option is

> $$\text{RAROC} = \frac{E[\text{Profit}]}{\text{Risk Capital}}$$

- $E[\text{Profit}]$ is the option's expected profit.
- $\text{Risk Capital}$ is the [[Risk Capital|risk capital]] the ERM model assigns to the option through a [[Risk Measure|risk measure]], such as VaR or TVaR at a chosen level.

Its economic value added is

> $$\text{EVA} = E[\text{Profit}] - r_h \times \text{Risk Capital}$$

- $r_h$ is the hurdle rate, the [[Cost of Capital|cost of capital]].

A strategy adds value when RAROC exceeds $r_h$, or equivalently when EVA is positive ([[Risk-Adjusted Performance|risk-adjusted performance]]). Ranking by RAROC and by EVA can disagree. The ratio can favour a smaller business, while EVA measures the value actually added.

> [!example]- How do these three reinsurance options rank by RAROC and by EVA? {Example}
> The hurdle rate is 12%. The ERM model gives each option's expected profit and risk capital, in $\$$ millions:
>
> | Option | Expected profit | Risk capital |
> | :--- | ---: | ---: |
> | A, no reinsurance | 60 | 400 |
> | B, a 40% quota share | 45 | 250 |
> | C, catastrophe excess of loss | 52 | 300 |
>
> > [!answer]-
> > - RAROC is $60/400 = 15.0\%$ for A, $45/250 = 18.0\%$ for B and $52/300 = 17.3\%$ for C.
> > - EVA is $60 - 0.12(400) = 12$ for A, $45 - 0.12(250) = 15$ for B and $52 - 0.12(300) = 16$ for C.
> > - All three clear the hurdle. B has the best ratio, but C adds the most value.
> > - C gives up less profit to the reinsurer than the quota share while still releasing $\$100$ million of capital.
> > - Choosing on RAROC alone, the insurer would shrink more than it should.

## Risk measures and models in strategy

The ERM model turns strategic questions into comparable distributions of results. Those questions include capital adequacy, allocating capital to lines and units, reinsurance ([[Reinsurance Strategy|reinsurance strategy]]), asset mix and planned growth. Plotting the alternatives by risk and return traces an **efficient frontier**, and the insurer picks a point on it within its [[Risk Appetite|risk appetite]].

The choice of risk measure matters. Changing the measure, its confidence level or the allocation method changes each unit's capital, and so its measured return and which lines look worth growing. In the reinsurance example, a different risk measure would change the three capital amounts, and the ranking could change with them.

## Levels of strategy

The [[Strategic Management Process|strategic management process]] sets a vision, mission and goals, analyzes the environment, and then formulates, implements and evaluates the strategy. Strategy is set at more than one level:

1. [[Corporate-Level Strategy|Corporate strategy]] chooses which businesses to be in.
2. [[Business-Level Strategy|Business strategy]] chooses how each one competes, for example by cost leadership or differentiation.

The risk of choosing the wrong strategy, or executing it badly, is a risk category in its own right ([[Risk Taxonomies|risk taxonomies]], [[Business Risk|business risk]]).

## Business goals in a predictive model

In a modelling project, the business goal decides what the model must predict, such as loss cost or retention, and how its success is judged. The [[Generalized Linear Models for Insurance Rating (Goldburd et al. - 2020)|GLM monograph]] names lack of stakeholder alignment on goals and outcomes as one of the most common reasons modelling projects fail or fall behind.

> [!example]- How should these two models built from the same data differ? {Example}
> A commercial property insurer asks for two models from the same submissions data. Underwriting wants to decide which new submissions get an on-site inspection, and it can inspect 15% of them. Pricing wants new rating relativities.
>
> > [!answer]-
> > - The underwriting model's target is the probability of a large loss, or of a loss ratio above a threshold. The pricing model's target is the expected pure premium, with an exposure [[Offset Variable|offset]].
> > - The underwriting model is judged by the share of large losses captured in the top 15% of scores, the inspection budget. The pricing model is judged by its lift over the current plan, on quantile plots, a double lift chart and a loss ratio chart.
> > - The underwriting model may use any submission information available when the decision is made. Pricing variables must be permissible, filable and programmable.
> > - A single model built without settling these questions would serve neither goal well.

> [!trap] Ranking strategies by RAROC alone
> The highest ratio is not the most value added. In the reinsurance example the quota share has the best RAROC, 18.0%, but the catastrophe cover has the higher EVA, $\$16$ million against $\$15$ million. EVA measures the value actually added.
