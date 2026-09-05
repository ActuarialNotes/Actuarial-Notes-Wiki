---
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:9bae463cbf992f5e85578e90108a54e8b9a6733abc3ca5568e59391a14aad5ba
  sources: []
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Concentration Risk.md
---

**Concentration Risk** is the risk that exposures which appear separate turn out to be a single exposure — many policies struck by one event, many recoverables owed by one reinsurer, many risks depending on one regulator's decision. It is the failure of the diversification that insurance depends on, and it is largely **invisible to the standardised [[MCT]] formula**, which applies factors exposure by exposure.

- **The forms it takes in a P&C insurer:**
  - **Geographic** — property exposure concentrated where a single [[Earthquake Exposure Risk Margin|earthquake]], hurricane, wildfire or [[Flood Insurance|flood]] would strike it all at once.
  - **Counterparty** — [[Reinsurance Contracts Held|reinsurance recoverables]] concentrated with one reinsurer, or investments with one issuer.
  - **Line or product** — a book dominated by one class, so a single reserving error or reform affects everything.
  - **Regulatory or jurisdictional** — most of the book subject to one province's [[Rate Regulation|rate regime]] and reform politics.
  - **Distribution** — reliance on one broker or one channel for most of the premium.
- **Why the formula misses it.** The [[Credit Risk Margin]] charges the same total whether recoverables are spread over eight reinsurers or held with one; the [[Insurance Risk Margin]] charges by line, not by whether all the business is in one legislature. Concentration is therefore an **[[ORSA]] and [[Risk Appetite]] matter**, and it is one of the clearest cases where the insurer must hold capital beyond the formula.
- **It correlates with everything.** The reinsurer most likely to fail is the one exposed to the same catastrophe as its cedants; the province most likely to suppress rates is the one where costs are rising fastest. Concentration and correlation are the same problem seen from two directions.
- **[[OSFI]] addresses it** through exposure limits in its guidance, the earthquake requirements, reinsurance concentration expectations, and supervisory challenge of an insurer's own limits — and it is exactly the exposure that [[Reverse Stress Testing]] is best at finding.
- **The management tools:** exposure limits by zone, counterparty and line; reinsurance (which itself creates counterparty concentration); geographic diversification; and, where concentration is inherent to the business model, higher capital.

> [!example]- Finding the Real Concentration {Example}
> An insurer's board is reassured that no single policy exceeds $2\%$ of capital and no single investment exceeds $3\%$. The book comprises: $65\%$ personal auto in one province; $25\%$ commercial property, of which $40\%$ is in one metropolitan area; $10\%$ other. Catastrophe reinsurance is placed $70\%$ with one reinsurer.
>
> Identify the concentrations that matter.
>
> > [!answer]-
> > The board is measuring the wrong thing. Individual policy and investment limits control **idiosyncratic** risk, which is not what threatens an insurer. Four real concentrations:
> >
> > 1. **Jurisdictional — the largest.** Sixty-five per cent of the book depends on one province's rate approvals, one province's [[Automobile Insurance Reform|reform]] decisions and one province's courts. A rate freeze or an adverse [[Court Case]] hits it all simultaneously, and no reinsurance protects against it. This is the exposure most likely to actually impair the insurer, and it carries no MCT charge at all.
> > 2. **Reinsurer — the most dangerous.** Seventy per cent of catastrophe protection from one counterparty, who will be under stress from the same event that triggers the claim. The [[Credit Risk Margin]] is identical whether this is one reinsurer or five, so the formula is silent.
> > 3. **Geographic property.** Ten per cent of the whole book ($40\%$ of $25\%$) in one metropolitan area is a single-event exposure — and if that area is also the province in item 1, the two concentrations compound.
> > 4. **The correlation across them.** A major earthquake in that metropolitan area damages property, disrupts auto claims handling, stresses the reinsurer, and prompts political intervention in rates. The [[Diversification Credit]] assumes these are independent.
> >
> > **What the board should be shown instead of policy limits:** net [[Probable Maximum Loss|PML]] by zone as a percentage of capital; recoverables by reinsurer as a percentage of the total and of capital; premium by jurisdiction; and a [[Reverse Stress Testing|reverse stress test]] naming the combination that would be fatal. Those four measures describe the risks that actually threaten the company.
