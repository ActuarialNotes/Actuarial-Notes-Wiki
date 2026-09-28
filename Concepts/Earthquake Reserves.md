---
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:ef8daa450486b5cdb8e51acbcf28731d4922941239b47c1dbb3d997901921807
  sources: []
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Earthquake Reserves.md
---

**Earthquake Reserves** are the reserves in equity that [[OSFI]]'s [[MCT]] ties to an insurer's earthquake exposure: the **earthquake premium reserve** (EPR), a voluntary accumulation of earthquake premiums, plus the **earthquake reserve component** (ERC), the part of the country-wide 1-in-500-year [[Probable Maximum Loss|PML]] that the insurer's other financial resources do not cover. The MCT grosses the sum up by 1.25 and adds it to capital required at the target level; the [[OSFI Core Return|core return]] reports the two components on page 20.45.

> $$\text{Earthquake reserves} = 1.25 \times (\text{EPR} + \text{ERC})$$
>
> $$\begin{aligned} \text{ERC} = \max\big(0,\ &\text{PML}_{500}^{\,\text{CW}} - \text{C\&S} - \text{Reins.} \\ &- \text{CMF} - \text{EPR}\big) \end{aligned}$$
>
> $$\text{PML}_{500}^{\,\text{CW}} = \left(\text{PML}_{500,\text{East}}^{\,1.5} + \text{PML}_{500,\text{West}}^{\,1.5}\right)^{1/1.5}$$

- **The financial resources** (MCT §4.5.1.2): capital and surplus (C&S), counted up to at most $10\%$ — for a Canadian insurer, $10\%$ of total equity, a limit OSFI may lower; the EPR; reinsurance coverage (Reins.), the amount collectable for a loss the size of the PML, net of retention, under reinsurance in force the day after the reporting date; and capital market financing (CMF), which needs OSFI's prior approval. [[OSFI Earthquake|Guideline B-9]] adds that a parent's letters of credit or guarantees cannot support the gross PML.
- **The PML** is **gross** — after policyholder deductibles, before reinsurance — and includes the [[OSFI Earthquake|B-9]] adjustments for data quality, non-modelled exposures and model uncertainty. Each regional PML500 is the 99.8th percentile of that region's exceedance probability curve, on worldwide exposure for a Canadian insurer and Canadian exposure for a branch. B-9 explains why the regions are combined: a PML based on the larger of the British Columbia and Quebec figures understates it for an insurer exposed in both. An insurer without an acceptable model uses the larger of East and West property total insured value less policyholder deductibles.
- **Rules on the EPR:** it may not exceed the country-wide PML500 (the Income Tax Act sets the annual contribution limit), premium put in stays in unless the exposure falls materially, and an EPR not needed as a financial resource can be **deducted from [[Capital Available|capital available]]** instead of being added to capital required. After an earthquake the EPR, and then the ERC, is reduced by the claims reserves established, and any reduction goes straight back to unappropriated surplus.
- **Where they sit in the MCT.** Earthquake reserves are category A [[Capital Available|capital available]] (with the nuclear and general contingency reserves), while the $1.25 \times (\text{EPR} + \text{ERC})$ is part of the insurance-risk [[Capital Required|capital required]] — so it also enters the [[Diversification Credit|diversification credit]] and the base for the [[Operational Risk Margin|operational risk margin]]. On page 10.60, adjusted equity excludes the capital required for catastrophe reserves ([[CCIR Instructions]]).
- **The phase-in is history.** The 2019 MCT let insurers move to the country-wide PML500 by fiscal 2022, blending it in eighths from 2014 with the larger of the two regional 1-in-420 year PMLs (worked below), each interpolated as $\text{PML}_{420} = 0.68\,\text{PML}_{500} + 0.32\,\text{PML}_{250}$. The 2024 MCT on the Fall 2026 syllabus has no phase-in, but the earthquake-reserve questions of 2015–2019 use it (the 2015 answers were marked with or without it).
- The management side — policy, data, models, PML estimates, financial resources and contingency plans — is Guideline B-9's five principles; the capital side is also described on [[Earthquake Exposure Risk Margin]].

![[Media/Figures/Earthquake_Reserves.svg|340]]

> [!example]- Earthquake Reserves Under the Current MCT {Example}
> A Canadian insurer reports (\$000s): East Canada PML500 $120{,}000$, West Canada PML500 $380{,}000$; total equity $900{,}000$; an earthquake premium reserve of $15{,}000$; no capital market financing. Its earthquake reinsurance, per occurrence, is $50{,}000$ xs $25{,}000$, $80\%$ placed, and $200{,}000$ xs $75{,}000$, $100\%$ placed.
>
> Calculate its earthquake reserves.
>
> > [!answer]-
> > **Country-wide PML500:**
> >
> > $$
> > \begin{align*}
> > \text{PML}_{500}^{\,\text{CW}} &= \left(120{,}000^{1.5} + 380{,}000^{1.5}\right)^{1/1.5} \\
> > &= 423{,}722
> > \end{align*}
> > $$
> >
> > **Financial resources.** A $423{,}722$ loss exhausts both layers, so the collectable reinsurance is $0.80 \times 50{,}000 + 200{,}000 = 240{,}000$; capital and surplus count at $10\% \times 900{,}000 = 90{,}000$.
> >
> > $$
> > \begin{align*}
> > \text{ERC} &= 423{,}722 - 90{,}000 - 240{,}000 - 0 - 15{,}000 \\
> > &= 78{,}722 \\
> > \text{Earthquake reserves} &= 1.25 \times (15{,}000 + 78{,}722) \\
> > &= 117{,}152
> > \end{align*}
> > $$
> >
> > The EPR appears twice: as a resource it reduces the ERC, and it is still part of the reserve grossed up by $1.25$ — forgetting to deduct it among the resources is a common error in both 2019 examiners' reports. The $117{,}152$ is added to capital required at the target level. Note the country-wide figure exceeds the larger regional PML ($380{,}000$) by almost $44{,}000$ — the understatement Guideline B-9 describes for an insurer exposed in both regions.

> [!example]- The 2014–2022 Phase-In, as the Past Papers Use It {Example}
> For reporting year 2019 an insurer has (\$000s): East Canada PML250 $40{,}000$ and PML500 $110{,}000$; West Canada PML250 $150{,}000$ and PML500 $320{,}000$. Total equity is $350{,}000$, it has no EPR and no capital market financing, and it buys $150{,}000$ xs $50{,}000$ of earthquake reinsurance, $100\%$ placed. It is phasing in to the country-wide PML500.
>
> Calculate its earthquake reserves under the 2019 MCT.
>
> > [!answer]-
> > **Regional PML420s** by linear interpolation:
> >
> > $$
> > \begin{align*}
> > \text{PML}_{420,\text{East}} &= 0.68(110{,}000) + 0.32(40{,}000) \\
> > &= 87{,}600 \\
> > \text{PML}_{420,\text{West}} &= 0.68(320{,}000) + 0.32(150{,}000) \\
> > &= 265{,}600
> > \end{align*}
> > $$
> >
> > **Country-wide PML500 and the 2019 blend** — five-eighths of the way from the larger PML420 to the country-wide PML500:
> >
> > $$
> > \begin{align*}
> > \text{PML}_{500}^{\,\text{CW}} &= \left(110{,}000^{1.5} + 320{,}000^{1.5}\right)^{1/1.5} \\
> > &= 361{,}667 \\
> > \text{PML}_{2019} &= \text{PML}_{500}^{\,\text{CW}} \times \tfrac{2019 - 2014}{8} \\
> > &\quad + \max(87{,}600,\ 265{,}600) \times \tfrac{2022 - 2019}{8} \\
> > &= 361{,}667 \times \tfrac{5}{8} + 265{,}600 \times \tfrac{3}{8} \\
> > &= 325{,}642
> > \end{align*}
> > $$
> >
> > **ERC and reserves.** The layer is exhausted, so reinsurance covers $150{,}000$; capital and surplus count at $35{,}000$.
> >
> > $$
> > \begin{align*}
> > \text{ERC} &= 325{,}642 - 35{,}000 - 150{,}000 \\
> > &= 140{,}642 \\
> > \text{Earthquake reserves} &= 1.25 \times (0 + 140{,}642) \\
> > &= 175{,}802
> > \end{align*}
> > $$
> >
> > The mistakes the examiners' reports list are the ones this layout guards against: forgetting to deduct the financial resources, interpolating the PML420 wrongly, and combining the regional PML420s with the $1.5$ power instead of taking the larger. The Spring 2017 report also accepted answers with and without the $1.25$, because the guideline did not then adequately explain how the reserves were to be accounted for on pages 20.45 and 20.20 of the return.
