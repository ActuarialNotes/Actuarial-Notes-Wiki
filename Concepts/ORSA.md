---
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:ace32827e5c00ccff9f36efadce92a58f9fe9755188441cc520a2c5e6572a4b6
  sources: []
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/ORSA.md
---

**The Own Risk and Solvency Assessment** (ORSA) is an insurer's **own** forward-looking assessment of the risks it faces and the capital it needs to support them. It is the insurer's view, not the regulator's formula: [[OSFI]]'s guideline requires every federally regulated insurer to conduct one at least annually, own it at the board level, and use it to set the **[[Internal Target Capital Ratio|internal target capital ratio]]**.

- **The core question ORSA answers** is whether the standardised [[MCT]] captures *this* insurer's risks. Where it does not — an unusual catastrophe concentration, an unproven new line, a reinsurance programme with counterparty concentration, an aggressive growth plan — the insurer must hold capital beyond what the formula requires, and ORSA is where that judgement is made and documented.
- **The five elements** OSFI expects: comprehensive **identification and assessment** of all material risks; a link between risk and **capital needs**; the **internal target** derived from that link; **board and senior management oversight**, including challenge; and **monitoring and reporting** through the year, not once annually.
- **Forward-looking, over the business planning horizon.** ORSA considers the risks of the plan the insurer intends to execute, not only the balance sheet it currently has — so a growth plan, a new product, or an acquisition belongs in it before it is done.
- **The distinction from [[FCT]]** is worth stating precisely: **ORSA determines how much capital is needed** and sets the internal target; **FCT tests whether the insurer's condition holds up** under specified adverse scenarios. ORSA is management's process; FCT is the [[Appointed Actuary]]'s report. They overlap in content and differ in ownership.
- **It is the clearest expression of [[Principles-Based Regulation]].** OSFI does not prescribe the risks, the methods or the target — it prescribes that the insurer must do the work, defend it, and act on it.
- **The output is used.** An ORSA whose internal target is not reflected in capital management, pricing, reinsurance buying and the dividend policy has failed, and OSFI's reviews focus as much on use as on content.

> [!example]- What Belongs in an ORSA That the MCT Misses {Example}
> An insurer writes $\$600$ million of premium: $70\%$ personal auto in one province, $30\%$ commercial property. It buys $80\%$ of its catastrophe reinsurance from a single reinsurer. It plans to enter cyber liability next year. Its MCT ratio is $172\%$ against a $150\%$ supervisory target.
>
> What should the ORSA identify beyond the MCT calculation?
>
> > [!answer]-
> > Four risks the standardised formula does not see, each requiring capital or action beyond it:
> >
> > 1. **Jurisdictional concentration.** Seventy per cent of the book depends on one province's [[Rate Regulation|rate regime]] and one province's [[Automobile Insurance Reform|reform]] politics. A rate freeze or an adverse court decision hits the whole book at once. The MCT charges for line-of-business mix, not for the fact that it is all in one legislature. See [[Concentration Risk]].
> > 2. **Reinsurer concentration.** Eighty per cent of catastrophe protection from one counterparty is a single point of failure, and it fails in exactly the scenario the protection is for. The [[Credit Risk Margin]] applies the same factor regardless of concentration, so this must be an ORSA judgement — and probably a limit.
> > 3. **A new line with no experience.** Cyber has no credible internal data, correlated losses (one vulnerability hits many insureds at once), and rapidly changing exposure. This is precisely the "rapid growth into an unfamiliar line" pattern in [[PACICC]]'s failure research, and it warrants an explicit capital allocation above formula.
> > 4. **Correlation between them.** A cyber event, a catastrophe and a rate freeze are individually modest and jointly severe. The [[Diversification Credit]] assumes they diversify; ORSA should test whether they do.
> >
> > **The conclusion.** An internal target of $150\%$ — merely matching the supervisory target — would be indefensible here. A target in the region of $190$–$200\%$, derived from scenarios covering the four risks above, is what the analysis supports, and the board should be shown the derivation rather than the number.
