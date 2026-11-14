---
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:0d0e53e69720f60c0c8b15d62e909eb2de3ae9fd0cbb2eae76147c49f5a69997
  sources: []
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/ORSA.md
---

![[Media/Figures/ORSA.svg|340]]

The **Own Risk and Solvency Assessment (ORSA)** is an insurer's own forward-looking assessment of the risks it faces and the capital it needs to support them. [[OSFI]]'s guideline requires every federally regulated insurer to conduct one at least annually, own it at the board level, and use it to set its [[Internal Target Capital Ratio|internal target capital ratio]].

The five elements OSFI expects of an ORSA are:

1. Comprehensive identification and assessment of all material risks.
2. A link between risk and capital needs.
3. The internal target derived from that link.
4. Board and senior management oversight, including challenge.
5. Monitoring and reporting through the year, not once annually.

The question an ORSA answers is whether the standardised [[MCT]] captures this insurer's risks. Where it does not, the insurer must hold capital beyond what the formula requires, and the ORSA is where that judgement is made and documented. Examples are an unusual catastrophe concentration, an unproven new line, a reinsurance programme with counterparty concentration and an aggressive growth plan.

An ORSA is forward-looking over the business planning horizon. It considers the risks of the plan the insurer intends to execute as well as the balance sheet it has now, so a growth plan, a new product or an acquisition belongs in it before it is done.

> [!example]- What should this insurer's ORSA identify beyond the MCT calculation? {Example}
> An insurer writes $\$600$ million of premium: $70\%$ personal auto in one province and $30\%$ commercial property. It buys $80\%$ of its catastrophe reinsurance from a single reinsurer and plans to enter cyber liability next year. Its MCT ratio is $172\%$ against a $150\%$ supervisory target.
>
> > [!answer]-
> > - Jurisdictional concentration: $70\%$ of the book depends on one province's [[Rate Regulation|rate regime]] and [[Automobile Insurance Reform|reform]] politics. The MCT charges for line-of-business mix, not for the book being under one legislature ([[Concentration Risk|concentration risk]]).
> > - Reinsurer concentration: $80\%$ of catastrophe protection from one counterparty fails in exactly the scenario it is for. The [[Credit Risk Margin|credit risk margin]] applies the same factor regardless of concentration, so this is an ORSA judgement, and probably a limit.
> > - A new line with no experience: cyber has no credible internal data, correlated losses and rapidly changing exposure. This is the "rapid growth into an unfamiliar line" pattern in [[PACICC]]'s failure research, and it warrants explicit capital above the formula.
> > - Correlation between them: a cyber event, a catastrophe and a rate freeze are individually modest and jointly severe. The [[Diversification Credit|diversification credit]] assumes they diversify, and the ORSA should test whether they do.
> > - An internal target that merely matches the $150\%$ supervisory target would be indefensible here. A target in the region of $190$–$200\%$, derived from scenarios covering these four risks, is what the analysis supports, and the board should be shown the derivation.

## ORSA and the FCT

The ORSA determines how much capital is needed and sets the internal target. The [[FCT]] tests whether the insurer's condition holds up under specified adverse scenarios. The ORSA is management's process and the FCT is the [[Appointed Actuary|appointed actuary]]'s report, so the two overlap in content and differ in ownership.

## ORSA as principles-based regulation

The ORSA is the clearest expression of [[Principles-Based Regulation|principles-based regulation]]. OSFI does not prescribe the risks, the methods or the target. It requires the insurer to do the work, defend it and act on it.

> [!trap] An internal target that nothing uses
> An ORSA whose internal target is not reflected in capital management, pricing, reinsurance buying and the dividend policy has failed. OSFI's reviews focus as much on use as on content.
