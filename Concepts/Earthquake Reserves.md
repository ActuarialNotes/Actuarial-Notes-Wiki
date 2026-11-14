---
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:926ce54cf0b48dbf00e2217e6db172f0c4e52e12efa1022a8938476ca20ba808
  sources: []
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Earthquake Reserves.md
---

![[Media/Figures/Earthquake_Reserves.svg|340]]

**Earthquake Reserves** are the reserves in equity that [[OSFI]]'s [[MCT]] ties to an insurer's earthquake exposure. They are the earthquake premium reserve (EPR), a voluntary accumulation of earthquake premiums, plus the earthquake reserve component (ERC), the part of the country-wide 1-in-500-year [[Probable Maximum Loss|PML]] that the insurer's other financial resources do not cover. The amount the MCT adds to capital required at the target level is

> $$\text{Earthquake reserves} = 1.25 \times (\text{EPR} + \text{ERC})$$

The [[OSFI Core Return|core return]] reports the two components on page 20.45.

## The earthquake reserve component

The ERC is what the country-wide PML leaves after the financial resources of MCT §4.5.1.2, which is

> $$\begin{aligned} \text{ERC} = \max\big(0,\ &\text{PML}_{500}^{\,\text{CW}} - \text{C\&S} - \text{Reins.} \\ &- \text{CMF} - \text{EPR}\big) \end{aligned}$$

- $\text{PML}_{500}^{\,\text{CW}}$ is the country-wide 1-in-500-year PML.
- $\text{C\&S}$ is capital and surplus, counted up to at most $10\%$. For a Canadian insurer that is $10\%$ of total equity, a limit OSFI may lower.
- $\text{Reins.}$ is the reinsurance collectable for a loss the size of the PML, net of retention, under reinsurance in force the day after the reporting date.
- $\text{CMF}$ is capital market financing, which needs OSFI's prior approval.

[[OSFI Earthquake|Guideline B-9]] adds that a parent's letters of credit or guarantees cannot support the gross PML.

The country-wide PML combines the two regions' PMLs, and is

> $$\text{PML}_{500}^{\,\text{CW}} = \left(\text{PML}_{500,\text{East}}^{\,1.5} + \text{PML}_{500,\text{West}}^{\,1.5}\right)^{1/1.5}$$

- $\text{PML}_{500,\text{East}}$ and $\text{PML}_{500,\text{West}}$ are the 99.8th percentiles of the East and West Canada exceedance probability curves, on worldwide exposure for a Canadian insurer and on Canadian exposure for a branch.

The PML is gross, after policyholder deductibles and before reinsurance, and includes the B-9 adjustments for data quality, non-modelled exposures and model uncertainty. B-9 combines the regions because a PML based on the larger of the British Columbia and Quebec figures understates it for an insurer exposed in both. An insurer without an acceptable model uses the larger of East and West property total insured value less policyholder deductibles.

> [!example]- What are this insurer's earthquake reserves under the current MCT? {Example}
> A Canadian insurer reports, in \$000s, an East Canada PML500 of $120{,}000$ and a West Canada PML500 of $380{,}000$. Its total equity is $900{,}000$, its earthquake premium reserve is $15{,}000$, and it has no capital market financing. Its per-occurrence earthquake reinsurance is $50{,}000$ xs $25{,}000$, $80\%$ placed, and $200{,}000$ xs $75{,}000$, $100\%$ placed.
>
> > [!answer]-
> > - The country-wide PML500 is $\left(120{,}000^{1.5} + 380{,}000^{1.5}\right)^{1/1.5} = 423{,}722$.
> > - A $423{,}722$ loss exhausts both layers, so the collectable reinsurance is $0.80 \times 50{,}000 + 200{,}000 = 240{,}000$.
> > - Capital and surplus count at $10\% \times 900{,}000 = 90{,}000$.
> > - The ERC is $423{,}722 - 90{,}000 - 240{,}000 - 0 - 15{,}000 = 78{,}722$.
> > - The EPR reduces the ERC as a resource and is still part of the reserve grossed up by $1.25$.
> > - The earthquake reserves are $1.25 \times (15{,}000 + 78{,}722) = 117{,}152$, added to capital required at the target level.

## Rules on the earthquake premium reserve

The EPR may not exceed the country-wide PML500, and the Income Tax Act sets the annual contribution limit. Premium put in stays in unless the exposure falls materially. An EPR not needed as a financial resource can be deducted from [[Capital Available|capital available]] instead of being added to capital required. After an earthquake the EPR, and then the ERC, is reduced by the claims reserves established, and any reduction goes straight back to unappropriated surplus.

## Earthquake reserves in the MCT

Earthquake reserves are category A [[Capital Available|capital available]], with the nuclear and general contingency reserves. The $1.25 \times (\text{EPR} + \text{ERC})$ is part of the insurance-risk [[Capital Required|capital required]], so it also enters the [[Diversification Credit|diversification credit]] and the base for the [[Operational Risk Margin|operational risk margin]]. On page 10.60, adjusted equity excludes the capital required for catastrophe reserves ([[CCIR Instructions]]).

The management side (policy, data, models, PML estimates, financial resources and contingency plans) is Guideline B-9's five principles. The capital side is also described on [[Earthquake Exposure Risk Margin]].

## The 2014–2022 phase-in

The 2019 MCT let insurers move to the country-wide PML500 by fiscal 2022, blending it in eighths from 2014 with the larger of the two regional 1-in-420 year PMLs. The 2024 MCT on the Fall 2026 syllabus has no phase-in, but the earthquake-reserve questions of 2015–2019 use it, and the 2015 answers were marked with or without it. Each regional PML420 is interpolated as

> $$\text{PML}_{420} = 0.68\,\text{PML}_{500} + 0.32\,\text{PML}_{250}$$

- $\text{PML}_{250}$ is the region's 1-in-250-year PML.

For reporting year $t$, the PML used in place of the country-wide PML500 is

> $$\text{PML}_{t} = \tfrac{t - 2014}{8}\,\text{PML}_{500}^{\,\text{CW}} + \tfrac{2022 - t}{8}\,\max\big(\text{PML}_{420,\text{East}},\ \text{PML}_{420,\text{West}}\big)$$

> [!example]- What are this insurer's earthquake reserves for 2019 under the phase-in? {Example}
> For reporting year 2019 an insurer has, in \$000s:
>
> | Region | PML250 | PML500 |
> | :--- | ---: | ---: |
> | East Canada | 40,000 | 110,000 |
> | West Canada | 150,000 | 320,000 |
>
> Total equity is $350{,}000$. It has no EPR and no capital market financing, and it buys $150{,}000$ xs $50{,}000$ of earthquake reinsurance, $100\%$ placed.
>
> > [!answer]-
> > - The East PML420 is $0.68(110{,}000) + 0.32(40{,}000) = 87{,}600$.
> > - The West PML420 is $0.68(320{,}000) + 0.32(150{,}000) = 265{,}600$.
> > - The country-wide PML500 is $\left(110{,}000^{1.5} + 320{,}000^{1.5}\right)^{1/1.5} = 361{,}667$.
> > - The 2019 blend is $\tfrac{5}{8}(361{,}667) + \tfrac{3}{8}(265{,}600) = 325{,}642$.
> > - The layer is exhausted, so reinsurance covers $150{,}000$, and capital and surplus count at $10\% \times 350{,}000 = 35{,}000$.
> > - The ERC is $325{,}642 - 35{,}000 - 150{,}000 = 140{,}642$.
> > - The earthquake reserves are $1.25 \times (0 + 140{,}642) = 175{,}802$.

The Spring 2017 report accepted answers with and without the $1.25$, because the guideline did not then adequately explain how the reserves were to be accounted for on pages 20.45 and 20.20 of the return.

> [!trap] Forgetting to deduct the financial resources
> The examiners' reports list leaving resources out of the ERC as a common error, the EPR in particular. Deduct capital and surplus, reinsurance, capital market financing and the EPR, then add the EPR back inside $1.25 \times (\text{EPR} + \text{ERC})$. Under the phase-in, the other slips are interpolating the PML420 wrongly and combining the regional PML420s with the $1.5$ power instead of taking the larger.
