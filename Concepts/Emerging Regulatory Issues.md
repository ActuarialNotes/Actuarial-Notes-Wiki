---
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:70dd8683f95e06736707da3c5d1a6c308f5076f7aaa1779824e47ebc45c3f5b3
  sources: []
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Emerging Regulatory Issues.md
---
**Emerging Regulatory Issues** are the questions U.S. insurance regulators are working through with laws written for an earlier market, chiefly [[Price Optimization|price optimization]], [[Predictive Analytics|predictive models]], artificial intelligence and third-party "big data", climate risk and cyber risk. The long-standing rating and solvency tests are applied to the new tool first, and new guidance follows where those tests prove hard to administer.

The rating test applied to each new tool is that a filed rate must be:

1. Not excessive.
2. Not inadequate.
3. Not unfairly discriminatory.

## Price optimization

Price optimization adjusts cost-based rates for customers' demand. The NAIC Casualty Actuarial and Statistical Task Force's 2015 white paper held that rates should be cost-based and that adjustments for price elasticity, propensity to shop, individual retention or a propensity to complain are unfairly discriminatory. Maryland (2014) was the first of many states to issue a prohibiting bulletin.

## Predictive models in rate filings

[[Generalized Linear Model|GLMs]] are now routine in personal lines. The Task Force's *Regulatory Review of Predictive Models* white paper (2020) sets out what a reviewer should obtain: the data and its adjustments, why each variable was selected and how it relates to loss, how the model was validated, and how its output became the filed rates. A variable with no intuitive link to loss needs stronger support. The actuary's side is governed by the ASOPs on risk classification (No. 12), data quality (No. 23) and modeling (No. 56).

## Artificial intelligence, big data and unfair discrimination

The NAIC adopted AI principles in 2020: fair and ethical, accountable, compliant, transparent and secure. In December 2023 it adopted a **model bulletin** on insurers' use of AI systems, since adopted by many states. It calls for a written AI program with board oversight, testing for errors, bias and unfair discrimination, and responsibility for third-party models and data. Colorado's 2021 statute goes further, requiring insurers to show that external consumer data and algorithms do not unfairly discriminate by protected class, with rules phased in by line.

The open question is **proxy discrimination**: whether an outcome correlated with a protected class is unlawful when the class is not an input ([[Unfair Discrimination]]).

> [!example]- What will a regulator ask about a new third-party score in a homeowners GLM? {Example}
> An insurer files a homeowners GLM that adds a vendor's "household purchasing behaviour" score. It improves the model's lift noticeably.
>
> > [!answer]-
> > - The legal test is still the statutory one: is the resulting rate unfairly discriminatory?
> > - **What is the data?** The regulator asks for its source, vendor documentation and how it was obtained, and whether it is a consumer report, which would bring in the Fair Credit Reporting Act and its notice duties.
> > - **Why does it predict loss?** The 2020 white paper expects a rationale, and a variable with no intuitive relationship to loss needs strong statistical support, so a regulator may reject lift alone.
> > - **Is it a proxy?** Its correlation with protected characteristics and with income is tested, quantitatively in a state with Colorado-style rules, and under the NAIC AI bulletin the insurer must show it tested for unfair discrimination.
> > - **Is it a demand variable in disguise?** Purchasing behaviour can measure willingness to pay rather than risk, and then it is price optimization under another name.
> > - **Who is responsible?** The insurer, not the vendor, because the AI bulletin makes third-party models the insurer's governance problem.
> > - A plausible outcome is a request for more support and a proxy analysis before approval, or approval without the variable.

## Climate risk

Rising weather losses press on solvency and availability together. The NAIC's Climate Risk Disclosure Survey was aligned with the TCFD framework in 2022, and catastrophe risk entered the RBC formula ([[Risk-Based Capital]]). Ratemaking is being revisited too. Florida's public commission has long reviewed hurricane models for residential rate filings, and California in 2024–25 moved to allow catastrophe models and net reinsurance cost in rates, tied to commitments to write in distressed areas.

> [!example]- How much does a catastrophe model change this homeowners indication? {Example}
> A homeowners filing has a non-catastrophe loss cost of $\$900$ per policy. Wildfire loss cost is $\$80$ on a 20-year historical average but $\$200$ from a catastrophe model. The permissible loss ratio is $0.65$.
>
> > [!answer]-
> > - On the historical basis, the indicated rate is $(900 + 80)/0.65 = \$1{,}507.69$.
> > - On the modelled basis, it is $(900 + 200)/0.65 = \$1{,}692.31$.
> > - The modelled rate is $1{,}692.31/1{,}507.69 - 1 = 12.2\%$ higher.
> > - If the hazard is changing, a historical average is a biased estimate of future cost, so a regulator that allows only the historical basis approves a rate about $12\%$ short.
> > - Insurers tend to answer persistent inadequacy by writing less, which is why states facing an availability crisis have traded model-based rates for commitments to keep writing.

## Cyber risk

Insurers as **holders** of data are subject to the NAIC Insurance Data Security Model Law (2017), adopted in many states, which requires an information security program and prompt notice of cybersecurity events. As **writers** of cyber coverage they face scrutiny of accumulation risk and of "silent" cyber exposure in traditional policies, with market data collected through an annual statement supplement.

> [!trap] Treating predictive lift as justification
> A variable that improves a model's fit can still be a proxy for a protected class or a measure of willingness to pay. A regulator asks why it relates to loss, not only how much it improves the model.
