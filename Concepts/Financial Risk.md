---
verification:
  status: verified
  confidence: medium
  last_checked: 2026-10-18
  last_checked_by: agent:validate-v1
  content_hash: sha256:e8f56e6c35a46d36f1517ac2dc5d95baaa64308de95d024a199de3c9651031df
  sources:
    - "CAS Exam 9 Content Outline, Fall 2026 (v01, 2026-03-18), PDF pp.3-7: Domains B, C and D tasks and readings; complete text references (Brehm et al.: D1-D6, Chapters 1, 2 excl. 2.6, 3 excl. 3.4, 4, 5.4; source SK), sha256:be1980d41470fed30dec1b9af9412f4e936d666e65d01237684acde11f3e7fc8 — https://www.casact.org/sites/default/files/2026-03/Exam_9_CO_2026_Fall.pdf"
    - "Directive 2009/138/EC (Solvency II), consolidated HTML, Art.13(30)-(34) definitions (underwriting, market, credit, operational, liquidity risk); Art.45(1) ORSA; Art.101(3) 99.5% one-year VaR; Art.104(1) risk modules; Art.105(2), (5), (6) non-life premium/reserve and catastrophe, market sub-modules, counterparty default (reinsurance, derivatives, receivables from intermediaries); Art.107(1), (3) operational risk capital requirement, sha256:ad77288b3961fb0425f2e8db221ecc9706975bf72c37d7d3adcf8f0df62f702e — https://eur-lex.europa.eu/legal-content/EN/TXT/HTML/?uri=CELEX:32009L0138"
    - "CAS Enterprise Risk Management Committee, Overview of Enterprise Risk Management (CAS Forum, Summer 2003), pp.109-114 (PDF pp.11-16: definition, four risk types and lists, process steps, treat/exploit: avoid, retain, reduce, transfer, exploit); pp.117-118 (PDF pp.19-20: solvency- and performance-related measures); PDF pp.23, 25 (DFA as structural simulation model; ESG linking interest rates and inflation; natural hedge), sha256:f433c8300785640b2f4fd168d3b38878d1bfbc9b9f8f74c08e43de8e98982efd — https://www.casact.org/sites/default/files/database/forum_03sforum_03sf099.pdf"
    - "Panning, Managing Interest Rate Risk: ALM, Franchise Value, and Strategy (CAS Exam 9 reading), PDF pp.2-4 (ALM measures economic value of assets and liabilities against interest-rate changes; component of ERM), PDF p.8 (duration D = -(dF/dy)/F), sha256:9f569b0edf7a677b08716b2c06103c0c7826007d00c5a17c5f4d32f129e32278 — https://www.casact.org/sites/default/files/2021-03/9_Panning.pdf"
    - "CAS Exam 7 Spring 2013 - exam and sample answers/examiner's report, Q15 PDF p.68 (cat models, ESGs, copulas); Q19 PDF pp.75-76 (TVaR, EPD, subadditivity); Q20 PDF pp.77-78 (efficient frontier, cost allocation); Q21 PDF pp.25, 79-80 (Basel II basic indicator and standardized approaches); Q22 PDF pp.26, 81-82 (pricing risk, claim variability, market risk, correlation; inflation raises liabilities and lowers bond values), sha256:b10657555e3da0116f715810c94b20afbcb50b86a4ba6b2fa3b9f771f2ab9d99 — https://www.casact.org/sites/default/files/2021-03/13-7.pdf"
    - "CAS Exam 7 Spring 2015 - exam and sample answers/examiner's report, Q22 PDF pp.84-85 (key elements of parameter uncertainty); Q26 PDF pp.30, 93-95 (efficient frontier on three risk measures; capital = 1-in-100 TVaR; cost of capital plus net reinsurance cost; report: commonest mistake was examining only one risk measure); Q28 PDF pp.97-98 (operational vs strategic risk; strategic risk types); Q29 PDF p.99 (currency, concentration, catastrophe, liquidity risk), sha256:b3ff9352d93b7aeaa7ffe531de52bc928e635bd72fae89247fb310580c99a568 — https://www.casact.org/sites/default/files/2021-03/15-7.pdf"
    - "CAS Exam 7 Spring 2016 - exam and sample answers/examiner's report, Q21 PDF pp.25, 88-89 (ERM program: monitoring, operational and strategic risk, materiality per 'the Brehm text', upside, dependencies); Q22 PDF pp.90-92 (cycle and asset strategy; reinsurance reduces volatility); Q23 PDF p.92 (capital reference points); Q26 PDF pp.99-100 (operational vs underwriting risk); Q27 PDF pp.101-103 (agency theory, cycle management); Q28 PDF pp.104-105 (soft and technical cycle models), sha256:e07f38dd81edc9715ef2528c1861e75c609c85b598b51b723d665cf63b745b84 — https://www.casact.org/sites/default/files/2021-03/16-7.pdf"
    - "Froot, The Market for Catastrophe Risk: A Clinical Examination (NBER WP 7286), PDF p.30 (Modigliani-Miller accommodates any risk management policy at fair prices; capital market imperfections), sha256:acfb53778c0377792e10790026d6c2fd715d765ffcdcd93ba463497462761cfd — https://www.nber.org/system/files/working_papers/w7286/w7286.pdf"
    - "Hardy, An Introduction to Risk Measures for Actuarial Applications (SOA/CAS study note C-25-07, 2006), PDF pp.3 (expected value, standard deviation, variance premium principles), 8-11 (quantile, CTE = TVaR = TCE = expected shortfall; probability-mass adjustment; CTE robust to sampling error, easy with simulation), 15-18 (distortion risk measures: g increasing, g(0)=0, g(1)=1; quantile and CTE distortions; PH, dual power, Wang), 20-23 (coherence axioms; quantile not subadditive; SD principle fails monotonicity, variance principle fails subadditivity; semi-variance), sha256:9d0c40a0b4cb1e1e68e68744c096dd36e7422560e9eabe4ee89e539443bcddc7 — https://www.soa.org/globalassets/assets/files/edu/c-25-07.pdf"
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Financial Risk.md
---

**Financial Risk** is the risk that an [[Insurer|insurer's]] economic value or earnings fall because of movements in financial markets or the failure of a financial counterparty — [[Interest Rate Risk|interest rates]], equity prices, credit spreads and exchange rates, [[Credit Risk|defaults]], and the inability to sell assets or raise cash when it is needed (liquidity). It sits beside [[Insurance Risk|insurance risk]] and [[Operational Risk|operational risk]] in an insurer's [[Risk Taxonomies|risk taxonomy]].

> $$\frac{\Delta S}{S} = \frac{A}{S}\cdot\frac{\Delta A}{A} - \frac{L}{S}\cdot\frac{\Delta L}{L}$$

- $A$, $L$ and $S = A - L$ are the market values of assets, liabilities and surplus. The identity is why financial risk matters so much to an insurer: a small percentage move in assets or liabilities becomes a large percentage move in surplus, magnified by the leverage ratios $A/S$ and $L/S$ that its [[Capital Structure]] sets.
- **Components.** *Market risk* — [[Interest Rate Risk|interest rate]], equity, spread and currency risk; *credit risk* — bond issuers, [[Reinsurance Credit Risk|reinsurers]], agents and brokers, derivative counterparties; *liquidity risk* — being forced to sell assets at a loss to pay claims.
- **Both sides of the balance sheet.** Financial risk is measured on surplus, not on assets alone. A bond portfolio that loses value when rates rise is partly offset by loss reserves whose present value also falls, and claim inflation moves the liabilities themselves.
- **Measuring it.** A [[Risk Measure]] — standard deviation, VaR, TVaR, expected policyholder deficit — is applied to the distribution of surplus change, usually produced by an economic scenario generator run jointly with insurance risk inside the insurer's [[Risk Modeling|risk model]]. The two interact: a catastrophe can force asset sales into a falling market, and inflation raises claim costs and interest rates together.
- **Why it is managed.** In a frictionless market shareholders could diversify financial risk themselves; [[Insurance Market Imperfections]] make it costly for the insurer to bear, which is the case for [[Financial Risk Management]] and for charging a [[Cost of Capital]] on the capital it consumes.

> [!example]- Leverage Turns an Asset Shock into a Surplus Shock {Example}
> An insurer has assets of $\$1{,}000$M, liabilities of $\$800$M and surplus of $\$200$M. The assets have modified duration $5$ and the liabilities $3$.
>
> Find the percentage change in surplus if (a) assets fall $5\%$ in an equity and credit sell-off with liabilities unchanged, and (b) all yields rise by $1\%$.
>
> > [!answer]-
> > **(a)** $\Delta A = -0.05 \times \$1{,}000\text{M} = -\$50\text{M}$, so $\Delta S / S = -50/200 = -25\%$.
> >
> > **(b)** Using $\Delta X \approx -D \cdot \Delta y \cdot X$ on each side:
> >
> > $$
> > \begin{align*}
> > \Delta A &\approx -(5)(0.01)(\$1{,}000\text{M}) \\
> > &= -\$50\text{M} \\
> > \Delta L &\approx -(3)(0.01)(\$800\text{M}) \\
> > &= -\$24\text{M} \\
> > \Delta S &= -50 - (-24) \\
> > &= -\$26\text{M}
> > \end{align*}
> > $$
> >
> > $\Delta S / S = -26/200 = -13\%$. A $5\%$ fall in assets costs a quarter of surplus, and even a partly matched book loses $13\%$ on a one-point rate move because the asset dollar duration ($5{,}000$) exceeds the liability dollar duration ($2{,}400$).

> [!example]- Same VaR, Different Tails {Example}
> One-year losses ($\$$M) on two investment portfolios:
>
> - **X** (high yield): $0$ w.p. $0.90$; $5$ w.p. $0.06$; $20$ w.p. $0.03$; $60$ w.p. $0.01$.
> - **Y** (investment grade): $0$ w.p. $0.90$; $5$ w.p. $0.06$; $8$ w.p. $0.04$.
>
> Compare the expected loss, $\text{VaR}_{0.95}$ and $\text{TVaR}_{0.95}$.
>
> > [!answer]-
> > **VaR.** For both, $F(0) = 0.90 < 0.95$ and $F(5) = 0.96 \geq 0.95$, so $\text{VaR}_{0.95} = 5$.
> >
> > **TVaR** averages the worst $5\%$ of outcomes. The mass at $5$ extends $0.96 - 0.95 = 0.01$ beyond the $95$th percentile, so $0.01$ of the tail sits at $5$:
> >
> > $$
> > \begin{align*}
> > \text{TVaR}_X &= \frac{0.01(5) + 0.03(20) + 0.01(60)}{0.05} \\
> > &= \frac{1.25}{0.05} \\
> > &= 25 \\
> > \text{TVaR}_Y &= \frac{0.01(5) + 0.04(8)}{0.05} \\
> > &= \frac{0.37}{0.05} \\
> > &= 7.4
> > \end{align*}
> > $$
> >
> > Expected losses are $E[X] = 0.3 + 0.6 + 0.6 = 1.5$ and $E[Y] = 0.3 + 0.32 = 0.62$.
> >
> > VaR calls the two portfolios equally risky; TVaR shows X's tail is more than three times as severe. A capital model built on VaR would let the insurer swap Y for X without holding any more capital.
