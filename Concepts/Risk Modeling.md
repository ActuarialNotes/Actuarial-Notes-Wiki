---
verification:
  status: verified
  confidence: medium
  last_checked: 2026-10-18
  last_checked_by: agent:validate-v1
  content_hash: sha256:47fe0100385f7b2e718b403aa3630a7060cb1b16a392e851fce3e29b1ceaf6cd
  sources:
    - "CAS Exam 9 Content Outline, Fall 2026 (v01, 2026-03-18), PDF pp.3-7: Domains B, C and D tasks and readings; complete text references (Brehm et al.: D1-D6, Chapters 1, 2 excl. 2.6, 3 excl. 3.4, 4, 5.4; source SK), sha256:be1980d41470fed30dec1b9af9412f4e936d666e65d01237684acde11f3e7fc8 — https://www.casact.org/sites/default/files/2026-03/Exam_9_CO_2026_Fall.pdf"
    - "CAS Enterprise Risk Management Committee, Overview of Enterprise Risk Management (CAS Forum, Summer 2003), pp.109-114 (PDF pp.11-16: definition, four risk types and lists, process steps, treat/exploit: avoid, retain, reduce, transfer, exploit); pp.117-118 (PDF pp.19-20: solvency- and performance-related measures); PDF pp.23, 25 (DFA as structural simulation model; ESG linking interest rates and inflation; natural hedge), sha256:f433c8300785640b2f4fd168d3b38878d1bfbc9b9f8f74c08e43de8e98982efd — https://www.casact.org/sites/default/files/database/forum_03sforum_03sf099.pdf"
    - "Hardy, An Introduction to Risk Measures for Actuarial Applications (SOA/CAS study note C-25-07, 2006), PDF pp.3 (expected value, standard deviation, variance premium principles), 8-11 (quantile, CTE = TVaR = TCE = expected shortfall; probability-mass adjustment; CTE robust to sampling error, easy with simulation), 15-18 (distortion risk measures: g increasing, g(0)=0, g(1)=1; quantile and CTE distortions; PH, dual power, Wang), 20-23 (coherence axioms; quantile not subadditive; SD principle fails monotonicity, variance principle fails subadditivity; semi-variance), sha256:9d0c40a0b4cb1e1e68e68744c096dd36e7422560e9eabe4ee89e539443bcddc7 — https://www.soa.org/globalassets/assets/files/edu/c-25-07.pdf"
    - "CAS Exam 7 Spring 2013 - exam and sample answers/examiner's report, Q15 PDF p.68 (cat models, ESGs, copulas); Q19 PDF pp.75-76 (TVaR, EPD, subadditivity); Q20 PDF pp.77-78 (efficient frontier, cost allocation); Q21 PDF pp.25, 79-80 (Basel II basic indicator and standardized approaches); Q22 PDF pp.26, 81-82 (pricing risk, claim variability, market risk, correlation; inflation raises liabilities and lowers bond values), sha256:b10657555e3da0116f715810c94b20afbcb50b86a4ba6b2fa3b9f771f2ab9d99 — https://www.casact.org/sites/default/files/2021-03/13-7.pdf"
    - "CAS Exam 7 Spring 2015 - exam and sample answers/examiner's report, Q22 PDF pp.84-85 (key elements of parameter uncertainty); Q26 PDF pp.30, 93-95 (efficient frontier on three risk measures; capital = 1-in-100 TVaR; cost of capital plus net reinsurance cost; report: commonest mistake was examining only one risk measure); Q28 PDF pp.97-98 (operational vs strategic risk; strategic risk types); Q29 PDF p.99 (currency, concentration, catastrophe, liquidity risk), sha256:b3ff9352d93b7aeaa7ffe531de52bc928e635bd72fae89247fb310580c99a568 — https://www.casact.org/sites/default/files/2021-03/15-7.pdf"
    - "CAS Exam 7 Spring 2016 - exam and sample answers/examiner's report, Q21 PDF pp.25, 88-89 (ERM program: monitoring, operational and strategic risk, materiality per 'the Brehm text', upside, dependencies); Q22 PDF pp.90-92 (cycle and asset strategy; reinsurance reduces volatility); Q23 PDF p.92 (capital reference points); Q26 PDF pp.99-100 (operational vs underwriting risk); Q27 PDF pp.101-103 (agency theory, cycle management); Q28 PDF pp.104-105 (soft and technical cycle models), sha256:e07f38dd81edc9715ef2528c1861e75c609c85b598b51b723d665cf63b745b84 — https://www.casact.org/sites/default/files/2021-03/16-7.pdf"
    - "CAS Exam 7 Spring 2017 - sample answers/examiner's report, Q22 PDF pp.86-88 (process vs parameter risk; parameter risk does not diversify; accepted aspects: estimation, projection, event, systematic, model risk; reduce over-parameterization); Q24 PDF pp.93-95 (scenario planning vs unilateral plan); Q25 PDF pp.96-98 (behavioral cycle models), sha256:c32697af25fff52e2c5e1e49de12dacd66662b78644bbb28fba827da035c03c4 — https://www.casact.org/sites/default/files/2021-01/17-7.PDF"
    - "CAS Exam 7 Spring 2018 - exam and sample answers/examiner's report, Q1 PDF pp.6, 34-37 (strategic risk types; deficient loss reserves a primary cause of insolvency, impairment causes 'as mentioned in Brehm'; process vs parameter risk); Q20 PDF p.25 (reduce insurance hazard risk by reinsurance; capital set by 1-in-100 TVaR), sha256:b5f6e6454919cfb04da8295ac4a70c89af58e770707daa4faf575bdca8a4fa6b — https://www.casact.org/sites/default/files/2021-03/18-7_0.pdf"
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Risk Modeling.md
---

**Risk Modeling** is the construction of a stochastic model of an organisation's material risks and their dependencies — for an insurer, an **internal risk model** (IRM), also called a dynamic financial analysis model — that simulates the distribution of its results, so that [[Risk Measure|risk measures]] can be computed and strategies compared on one basis.

> $$S_1^{(i)} = S_0 + P - L^{(i)} - X + I^{(i)}$$

> $$\widehat{\text{TVaR}}_{\alpha} = \frac{1}{m}\sum_{j=1}^{m} Y_{(n+1-j)}$$

- In scenario $i$ of $n$, year-end surplus $S_1^{(i)}$ is opening surplus $S_0$ plus premium $P$, less simulated losses $L^{(i)}$ and expenses $X$, plus the simulated investment result $I^{(i)}$. $Y_{(1)} \leq \cdots \leq Y_{(n)}$ are the simulated losses (or surplus declines) in order, and TVaR at level $\alpha$ averages the worst $m = n(1 - \alpha)$ of them.
- **Brehm's components:** underwriting risk (frequency and severity, pricing risk, [[Parameter Risk|parameter risk]], catastrophe risk), reserve risk, asset risk from an economic scenario generator, and — what makes the model realistic — **dependencies**: common drivers such as inflation acting on claims and asset values together, catastrophes crossing lines, the cycle moving lines together, and tail dependence. Without them the enterprise looks unrealistically stable.
- **Selecting models for diverse risks.** Each category needs a model suited to its nature, data and materiality — see [[Risk Taxonomies]] for the mapping and [[Model Selection]] for the statistical criteria. Parsimony matters: every added parameter adds estimation error and [[Model Risk|model risk]].
- **The effect on strategic management.** An IRM answers strategic questions: how much capital a target rating or ruin probability requires, how to allocate it ([[Risk Capital]]), which reinsurance programme or asset mix sits on the **efficient frontier** of return against risk, and whether the business plan fits [[Risk Appetite|appetite]].
- **The choice of risk measure is itself strategic.** VaR reads one quantile; TVaR averages the tail beyond it; they can rank the same strategies differently. Brehm recommends looking at several metrics rather than one.

> [!example]- VaR and TVaR Pick Different Growth Plans {Example}
> An insurer's model gives next year's net loss (in $\$$M) under two growth plans with the same premium.
>
> - Plan A (grow coastal property): $10$ with probability $90\%$, $40$ with $8\%$, $200$ with $2\%$.
> - Plan B (grow commercial liability): $12$ with probability $90\%$, $60$ with $9\%$, $100$ with $1\%$.
>
> Compare the mean, $\text{VaR}_{95\%}$ and $\text{TVaR}_{95\%}$.
>
> > [!answer]-
> > $$
> > \begin{align*}
> > E[L_A] &= 9 + 3.2 + 4 \\
> > &= 16.2 \\
> > E[L_B] &= 10.8 + 5.4 + 1 \\
> > &= 17.2
> > \end{align*}
> > $$
> >
> > The $95$th percentile is where the cumulative probability first reaches $95\%$: $\text{VaR}_A = 40$ (cumulative $98\%$) and $\text{VaR}_B = 60$ (cumulative $99\%$). TVaR averages the worst $5\%$:
> >
> > $$
> > \begin{align*}
> > \text{TVaR}_A &= \frac{0.02(200) + 0.03(40)}{0.05} \\
> > &= 104 \\
> > \text{TVaR}_B &= \frac{0.01(100) + 0.04(60)}{0.05} \\
> > &= 68
> > \end{align*}
> > $$
> >
> > On the mean and on VaR, plan A looks better; on TVaR, plan B is far safer. VaR does not see A's $2\%$ chance of a $200$ loss at all. A board whose appetite is written in VaR will choose A, one whose appetite is written in TVaR will choose B — the risk measure has made the strategic decision.

> [!example]- Ignoring Dependence Understates Capital {Example}
> Two lines each lose $50$ with probability $90\%$ and $150$ with probability $10\%$. Find $\text{TVaR}_{95\%}$ and capital $= \text{TVaR}_{95\%} - E[L]$ for the combined book (a) assuming independence, (b) if a common inflation driver makes both lines bad together $5\%$ of the time.
>
> > [!answer]-
> > Either way $E[L] = 2(0.9 \times 50 + 0.1 \times 150) = 120$.
> >
> > **(a) Independent:** $100$ with $81\%$, $200$ with $18\%$, $300$ with $1\%$.
> >
> > $$
> > \begin{align*}
> > \text{TVaR}_{95\%} &= \frac{0.01(300) + 0.04(200)}{0.05} \\
> > &= 220
> > \end{align*}
> > $$
> >
> > Capital $= 220 - 120 = 100$.
> >
> > **(b) Common driver:** both bad $5\%$ (loss $300$), exactly one bad $2(10\% - 5\%) = 10\%$ (loss $200$), neither $85\%$ (loss $100$). The worst $5\%$ is all $300$, so $\text{TVaR}_{95\%} = 300$ and capital $= 180$.
> >
> > Same marginal distributions, same mean — but the independent model understates capital by $80$, or $44\%$. The implied correlation between the lines' bad years is only $(0.05 - 0.01)/(0.1 \times 0.9) = 0.44$.
