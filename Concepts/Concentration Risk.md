---
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:7aa51832f52a56cc49a63e2ce81b223667adb87d57f2febb0c98a3c6a62c0f8c
  sources: []
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Concentration Risk.md
---

![[Media/Figures/Concentration_Risk.svg|340]]

**Concentration Risk** is the risk that exposures which appear separate turn out to be a single exposure: many policies struck by one event, many recoverables owed by one reinsurer, many risks depending on one regulator's decision. It is the failure of the diversification that insurance depends on.

In a P&C insurer it takes five forms:

1. **Geographic.** Property exposure concentrated where a single [[Earthquake Exposure Risk Margin|earthquake]], hurricane, wildfire or [[Flood Insurance|flood]] would strike it all at once.
2. **Counterparty.** [[Reinsurance Contracts Held|Reinsurance recoverables]] concentrated with one reinsurer, or investments with one issuer.
3. **Line or product.** A book dominated by one class, so a single reserving error or reform affects everything.
4. **Regulatory or jurisdictional.** Most of the book subject to one province's [[Rate Regulation|rate regime]] and reform politics.
5. **Distribution.** Reliance on one broker or one channel for most of the premium.

## Concentration and correlation

Concentration and correlation are the same problem seen from two directions. The reinsurer most likely to fail is the one exposed to the same catastrophe as its cedants. The province most likely to suppress rates is the one where costs are rising fastest.

## Concentration and the MCT

Concentration risk is largely invisible to the standardised [[MCT]] formula, which applies factors exposure by exposure. The [[Credit Risk Margin]] charges the same total whether recoverables are spread over eight reinsurers or held with one. The [[Insurance Risk Margin]] charges by line, not by whether all the business is in one jurisdiction. Concentration is therefore an [[ORSA]] and [[Risk Appetite]] matter, and one of the clearest cases where the insurer must hold capital beyond the formula.

[[OSFI]] addresses it through exposure limits in its guidance, the earthquake requirements, reinsurance concentration expectations and supervisory challenge of an insurer's own limits. [[Reverse Stress Testing]] is the tool best at finding it.

> [!example]- Which concentrations in this insurer's book matter? {Example}
> The board is reassured that no single policy exceeds $2\%$ of capital and no single investment exceeds $3\%$. The book is:
>
> | Line | Share of book |
> | :--- | ---: |
> | Personal auto, all in one province | $65\%$ |
> | Commercial property, $40\%$ of it in one metropolitan area | $25\%$ |
> | Other | $10\%$ |
>
> Catastrophe reinsurance is placed $70\%$ with one reinsurer.
>
> > [!answer]-
> > - Individual policy and investment limits control idiosyncratic risk, which is not what threatens an insurer.
> > - The largest concentration is jurisdictional. $65\%$ of the book depends on one province's rate approvals, reforms and courts, carries no MCT charge, and no reinsurance protects it.
> > - The most dangerous is the reinsurer. $70\%$ of catastrophe protection comes from one counterparty, which will be under stress from the same event, and the [[Credit Risk Margin]] is the same as if it were spread over five.
> > - Geographic property is $0.40 \times 25\% = 10\%$ of the book in one metropolitan area, a single-event exposure that compounds the first if the area is in the same province.
> > - A major earthquake there would damage property, disrupt auto claims handling, stress the reinsurer and prompt political intervention in rates, while the [[Diversification Credit]] assumes these are independent.
> > - The board should be shown net [[Probable Maximum Loss|PML]] by zone as a percentage of capital, recoverables by reinsurer, premium by jurisdiction, and a [[Reverse Stress Testing|reverse stress test]] naming the combination that would be fatal.

## Managing concentration

The management tools are exposure limits by zone, counterparty and line, reinsurance (which itself creates counterparty concentration), geographic diversification and, where concentration is inherent to the business model, higher capital.
