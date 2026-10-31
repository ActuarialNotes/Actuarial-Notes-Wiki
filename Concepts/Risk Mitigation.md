---
verification:
  status: stale
  confidence: null
  last_checked: 2026-10-18
  last_checked_by: agent:validate-v1
  content_hash: sha256:aa262742f42cbb16ed8e71a3ba0f304792c4063b62829b5abb0dbf71922bce9a
  sources:
    - "CAS Exam 9 Content Outline, Fall 2026 (v01, 2026-03-18), PDF pp.3-7: Domains B, C and D tasks and readings; complete text references (Brehm et al.: D1-D6, Chapters 1, 2 excl. 2.6, 3 excl. 3.4, 4, 5.4; source SK), sha256:be1980d41470fed30dec1b9af9412f4e936d666e65d01237684acde11f3e7fc8 — https://www.casact.org/sites/default/files/2026-03/Exam_9_CO_2026_Fall.pdf"
    - "CAS Enterprise Risk Management Committee, Overview of Enterprise Risk Management (CAS Forum, Summer 2003), pp.109-114 (PDF pp.11-16: definition, four risk types and lists, process steps, treat/exploit: avoid, retain, reduce, transfer, exploit); pp.117-118 (PDF pp.19-20: solvency- and performance-related measures); PDF pp.23, 25 (DFA as structural simulation model; ESG linking interest rates and inflation; natural hedge), sha256:f433c8300785640b2f4fd168d3b38878d1bfbc9b9f8f74c08e43de8e98982efd — https://www.casact.org/sites/default/files/database/forum_03sforum_03sf099.pdf"
    - "COSO, Enterprise Risk Management: Integrating with Strategy and Performance, Executive Summary (June 2017), p.10 (performance component: prioritize against risk appetite, select responses, develop portfolio view), sha256:2d4809dd09687d701944987f65ca6ddc39074a00236abebfd436d79f4563abd1 — https://www.coso.org/_files/ugd/3059fc_61ea5985b03c4293960642fdce408eaa.pdf"
    - "CAS Exam 7 Spring 2013 - exam and sample answers/examiner's report, Q15 PDF p.68 (cat models, ESGs, copulas); Q19 PDF pp.75-76 (TVaR, EPD, subadditivity); Q20 PDF pp.77-78 (efficient frontier, cost allocation); Q21 PDF pp.25, 79-80 (Basel II basic indicator and standardized approaches); Q22 PDF pp.26, 81-82 (pricing risk, claim variability, market risk, correlation; inflation raises liabilities and lowers bond values), sha256:b10657555e3da0116f715810c94b20afbcb50b86a4ba6b2fa3b9f771f2ab9d99 — https://www.casact.org/sites/default/files/2021-03/13-7.pdf"
    - "CAS Exam 7 Spring 2015 - exam and sample answers/examiner's report, Q22 PDF pp.84-85 (key elements of parameter uncertainty); Q26 PDF pp.30, 93-95 (efficient frontier on three risk measures; capital = 1-in-100 TVaR; cost of capital plus net reinsurance cost; report: commonest mistake was examining only one risk measure); Q28 PDF pp.97-98 (operational vs strategic risk; strategic risk types); Q29 PDF p.99 (currency, concentration, catastrophe, liquidity risk), sha256:b3ff9352d93b7aeaa7ffe531de52bc928e635bd72fae89247fb310580c99a568 — https://www.casact.org/sites/default/files/2021-03/15-7.pdf"
    - "CAS Exam 7 Spring 2018 - exam and sample answers/examiner's report, Q1 PDF pp.6, 34-37 (strategic risk types; deficient loss reserves a primary cause of insolvency, impairment causes 'as mentioned in Brehm'; process vs parameter risk); Q20 PDF p.25 (reduce insurance hazard risk by reinsurance; capital set by 1-in-100 TVaR), sha256:b5f6e6454919cfb04da8295ac4a70c89af58e770707daa4faf575bdca8a4fa6b — https://www.casact.org/sites/default/files/2021-03/18-7_0.pdf"
    - "Directive 2009/138/EC (Solvency II), consolidated HTML, Art.13(30)-(34) definitions (underwriting, market, credit, operational, liquidity risk); Art.45(1) ORSA; Art.101(3) 99.5% one-year VaR; Art.104(1) risk modules; Art.105(2), (5), (6) non-life premium/reserve and catastrophe, market sub-modules, counterparty default (reinsurance, derivatives, receivables from intermediaries); Art.107(1), (3) operational risk capital requirement, sha256:ad77288b3961fb0425f2e8db221ecc9706975bf72c37d7d3adcf8f0df62f702e — https://eur-lex.europa.eu/legal-content/EN/TXT/HTML/?uri=CELEX:32009L0138"
    - "Odomirok et al., Financial Reporting Through the Lens of a Property/Casualty Actuary v4 (CAS), PDF p.121 (surplus relief: ceded premium lowers premium-to-surplus, IRIS Ratio 2; quota share ceding commission); PDF pp.230-231 (RBC R0-R5), sha256:eee4cf26c25cc24d4802029ecc44bbc9b419f2bfa9d1859e6e808884a0ec04e6 — https://www.casact.org/sites/default/files/database/studynotes_odomirok-etal_financial-reportingv4.pdf"
    - "Panning, Managing Interest Rate Risk: ALM, Franchise Value, and Strategy (CAS Exam 9 reading), PDF pp.2-4 (ALM measures economic value of assets and liabilities against interest-rate changes; component of ERM), PDF p.8 (duration D = -(dF/dy)/F), sha256:9f569b0edf7a677b08716b2c06103c0c7826007d00c5a17c5f4d32f129e32278 — https://www.casact.org/sites/default/files/2021-03/9_Panning.pdf"
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Risk Mitigation.md
---

**Risk Mitigation** is the set of actions — the **ERM tools** — that move an organisation's risk profile toward its [[Risk Appetite|risk appetite]]: **avoid** a risk, **reduce** its frequency or severity, **transfer** it to another party, or **retain** it and hold capital against it. A strategy's effectiveness is judged by how far it lowers a chosen [[Risk Measure|risk measure]], and the capital that measure implies, per unit of cost.

> $$\text{Net cost} = \text{Premium paid} - E[\text{Recoveries}]$$

> $$\text{Value added} = r_{\text{CoC}}\,\Delta C - \text{Net cost}$$

- $\Delta C$ is the capital released, $C_{\text{before}} - C_{\text{after}}$, where required capital is set by the risk measure (for example $C = \text{TVaR}_{99\%}(L) - E[L]$), and $r_{\text{CoC}}$ is the [[Cost of Capital|cost of capital]]. Transfer pays when the capital it frees is worth more than the margin it hands over.
- **The tools:**
  - *Avoid* — decline a class, exit a territory, turn down an account outside appetite.
  - *Reduce* — underwriting standards, loss control, exposure and aggregate limits, diversification, and internal controls for [[Operational Risk|operational risk]].
  - *Transfer* — [[Reinsurance]] ([[Quota Share]], [[Excess of Loss]]), [[CAT Bonds|cat bonds]] and other [[Insurance-Linked Securities|ILS]]; for financial risk, hedging with derivatives (interest-rate swaps, equity puts, credit default swaps) and asset–liability matching ([[Immunization]]).
  - *Retain* — keep the risk and hold [[Risk Capital|capital]]: right when the risk is the business the firm is paid for, or when transfer costs more than the capital it saves.
- **Assessing effectiveness** means checking the change in the risk measure against the net cost; the **residual** risk against appetite; **basis risk**, where the hedge pays on something other than the actual loss; **counterparty risk**, since transfer swaps the original risk for [[Reinsurance Credit Risk|credit risk]], concentrated in the scenario the cover exists for; changed behaviour ([[Moral Hazard|moral hazard]]); and whether the answer survives a different risk measure or model.
- **Mitigation shapes strategy.** Capital released can support growth or be returned. Brehm puts reinsurance programmes on an **efficient frontier** of expected return against risk: a programme below the frontier is dominated, and the choice along it is a question of appetite. See [[Reinsurance Strategy]] and [[Business Risk]].

## Measuring the value of reinsurance

- **Cost is not ceded premium.** Venter's point: adding up ceded premium and setting it against recoveries over the years almost always shows reinsurance "losing", because reinsurers have expenses and must make money. The cost of a programme is the expected income foregone by buying it — ceded premium less expected recoveries, including expense recoveries such as ceding commission — and its benefit is the **stability** gained: protection of surplus against adverse fluctuations, more predictable earnings, and assurance to customers that their losses will be paid.
- **Three paradigms for its value** (CAS's examiners credit these three): reinsurance (1) **stabilizes results**; (2) **frees up or replaces capital** — the surplus no longer needed, valued at the cost of capital, together with cheaper financing of the rest through better ratings; and (3) **adds value to the firm** — market valuation, ratings, access to customers and the ability to get adequate premiums. Venter treats the second and third as the two directions in which stability turns into earnings and value.
- **Compare distributions, not differences.** Simulate the net result — net premium less net loss — under the bare position (no reinsurance) and under each programme. The benefit of a programme at a probability level is its percentile of that distribution minus the bare position's percentile at the same level. That is the difference between the percentiles of two distributions, not the percentile of the difference between programmes, and it is the right comparison because the company ends up with the distribution of the one programme it buys.
- **The cost/benefit diagram** plots each programme's cost (horizontal axis) against its net result at a selected probability level (vertical axis), one line per level — say 1-in-10, 1-in-100 and 1-in-250. The bare position, with no cost, sits at the origin of the cost axis. A more expensive programme is efficient at a level only if it gives a better (less adverse) result there than the cheaper ones. Standard deviation is a poor benefit measure, since a programme can lower it by giving up the good years, and combined-ratio measures distort the comparison because ceded premium sits in the denominator.
- **Reinsurance against the cost of capital.** One way to price the benefit is the capital a loss at a chosen level would absorb with and without the programme: the capital saved, times the cost of capital, against the programme's net cost. The same arithmetic compares reinsurance with raising capital outright:
  - The annual cost of a **quota share** is the margin ceded on it: ceded premium (cession percentage times subject premium) times the contract's economic margin — ceded premium less expected recoveries and commission.
  - A **surplus note** is an unsecured note an insurer issues that statutory accounting treats as surplus, and whose interest and principal can be paid only with the domiciliary regulator's approval. Its proceeds are invested, so its annual cost is the coupon paid less the investment income earned on the proceeds: principal times (coupon rate minus investment yield). Returning the principal at maturity is not a cost of the strategy — it is the borrowed money going back — so only the net financing cost counts.
  - Over several years, compare the present values of each strategy's annual costs.
- **Reinsurance in a risk model.** Assessing what a programme does to the risk profile has its own difficulties. Contracts are complex. An excess-of-loss recovery is a non-linear function of the underlying loss — nothing below the retention, dollar for dollar within the layer, nothing more above the limit — unlike a quota share's fixed percentage, so its effect on a tail measure has to be modelled loss by loss rather than scaled. And some contracts do not warrant full risk credit: finite risk covers, with multi-year and loss-sensitive features that can greatly reduce the reinsurer's downside, count as reinsurance only if the reinsurer assumes significant insurance risk and may reasonably realize a significant loss, and a contract bought for tax reasons may transfer little risk at all.

> [!example]- A Cost/Benefit Comparison {Example}
> Simulated net results (net premium less net loss, $\$$M) for a bare position and two programmes, with each programme's cost (ceded premium less expected recoveries):
>
> | | Cost | 1-in-10 | 1-in-100 |
> |---|---|---|---|
> | Bare | 0.0 | $-4.0$ | $-30.0$ |
> | Programme A | 0.6 | $-4.5$ | $-18.0$ |
> | Programme B | 1.4 | $-3.0$ | $-19.0$ |
>
> Which programmes are efficient at each level?
>
> > [!answer]-
> > Benefit is each programme's result less the bare result at the same level: at 1-in-10, A $-0.5$ and B $+1.0$; at 1-in-100, A $+12.0$ and B $+11.0$.
> >
> > At 1-in-100, B costs more than A and protects less, so B is **not efficient** there; A is. At 1-in-10 the order flips: A costs more than the bare position and does worse, so A is not efficient there, while B, dearer still, gives the best result and is. Neither programme wins at every level, so the choice turns on which level management manages to — and if that is the tail, A is better and cheaper.

> [!example]- Before and After an Excess-of-Loss Treaty {Example}
> Annual gross loss (in $\$$M): $100$ with probability $70\%$, $150$ with $20\%$, $250$ with $8\%$, $400$ with $1.5\%$, $700$ with $0.5\%$. The insurer can buy $250$ xs $250$ for a premium of $7.0$. Capital is $\text{TVaR}_{99\%} - E[L]$ and the cost of capital is $10\%$. Does the treaty add value?
>
> > [!answer]-
> > **Gross.** The worst $1\%$ is $0.5\%$ at $700$ and $0.5\%$ at $400$.
> >
> > $$
> > \begin{align*}
> > E[L] &= 70 + 30 + 20 + 6 + 3.5 \\
> > &= 129.5 \\
> > \text{TVaR}_{99\%} &= \frac{0.005(700) + 0.005(400)}{0.01} \\
> > &= 550 \\
> > C_{\text{gross}} &= 550 - 129.5 \\
> > &= 420.5
> > \end{align*}
> > $$
> >
> > **Ceded.** The layer pays $150$ on a $400$ loss and $250$ on a $700$ loss:
> >
> > $$
> > \begin{align*}
> > E[\text{Ceded}] &= 0.015(150) + 0.005(250) \\
> > &= 3.5 \\
> > \text{Net cost} &= 7.0 - 3.5 \\
> > &= 3.5
> > \end{align*}
> > $$
> >
> > **Net.** Losses become $100$ ($70\%$), $150$ ($20\%$), $250$ ($9.5\%$), $450$ ($0.5\%$).
> >
> > $$
> > \begin{align*}
> > E[L_{\text{net}}] &= 129.5 - 3.5 \\
> > &= 126.0 \\
> > \text{TVaR}_{99\%} &= \frac{0.005(450) + 0.005(250)}{0.01} \\
> > &= 350 \\
> > C_{\text{net}} &= 350 - 126.0 \\
> > &= 224.0 \\[4pt]
> > \text{Value added} &= 0.10(420.5 - 224.0) - 3.5 \\
> > &= 16.15
> > \end{align*}
> > $$
> >
> > The treaty frees $\$196.5$M of capital, worth $\$19.65$M a year, for a net cost of $\$3.5$M: it adds about $\$16$M of value a year. $\text{VaR}_{99\%}$ falls from $400$ to $250$ as well.

> [!example]- Quota Share or Excess of Loss? {Example}
> For the same insurer, the alternative is a $20\%$ quota share whose net cost — margin ceded, net of ceding commission — is $\$3.0$M. Which strategy is more effective?
>
> > [!answer]-
> > A quota share scales every outcome by $0.8$, so capital falls by $20\%$:
> >
> > $$
> > \begin{align*}
> > \Delta C_{\text{QS}} &= 0.20 \times 420.5 \\
> > &= 84.1 \\
> > \text{Value added}_{\text{QS}} &= 0.10(84.1) - 3.0 \\
> > &= 5.41
> > \end{align*}
> > $$
> >
> > Capital freed per dollar of net cost is $196.5 / 3.5 = 56$ for the excess of loss against $84.1 / 3.0 = 28$ for the quota share. The excess of loss is **twice as effective** because it cedes only the tail that drives the capital measure; the quota share also gives away profitable attritional business.
> >
> > The quota share still has a place: it cuts premium leverage and its ceding commission gives a growing insurer surplus relief, so a company constrained by premium-to-surplus rather than by tail risk might prefer it. And the excess-of-loss recoveries arrive in catastrophe years, when reinsurers are most stressed — the reinsurer's credit quality is part of the assessment.
