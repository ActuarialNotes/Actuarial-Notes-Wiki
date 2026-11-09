---
verification:
  status: stale
  confidence: null
  last_checked: 2026-10-31
  last_checked_by: agent:validate-v1
  content_hash: sha256:a6d4240544fa38577169e17d1c120e46db0297d656a1dd8d1ea5e5f61eed032e
  sources:
    - "Werner & Modlin, Basic Ratemaking (CAS, 5th ed. May 2016), Ch. 14 pp. 263-264, 287-288 (PDF pp. 275-276, 299-300); App. D p. D-5 (PDF p. 398), sha256:6b214d4db52674df2e83343920c06781e491254bd77f27e32ba312faaff3782c — https://www.casact.org/sites/default/files/2021-03/5_Werner_Modlin.pdf"
  open_findings: 1
  open_critical: 0
  log: .verify/Concepts/Non-Pricing Solutions.md
---

A **Non-Pricing Solution** is an action that brings the fundamental insurance equation back into balance by **reducing costs**, either expenses or expected losses, rather than by raising rates. Non-pricing solutions are the alternative, or the supplement, to a rate change when current rates do not produce the indicated average premium, which is

> $$\text{Indicated Average Premium} = \frac{\text{Pure Premium} + F}{1 - V - Q_T}$$

- $\text{Pure Premium}$ is the expected loss and LAE per exposure.
- $F$ is the [[Fixed Expenses|fixed expense]] per exposure.
- $V$ is the [[Variable Expenses|variable expense]] provision and $Q_T$ the target [[Profit and Contingency Provision|profit provision]], as shares of premium.

A pricing solution raises the current average premium toward the indicated one. A non-pricing solution lowers the indicated average premium toward the current one.

> [!example]- Expected loss and LAE are $\$180$ per exposure, fixed expenses $\$20$, variable expenses 15% and the target profit 5%. Current rates produce an average premium of $\$235$. What expense or loss reduction would balance the equation without a rate change? {Example}
> - The indicated average premium is $(180 + 20)/(1 - 0.15 - 0.05) = \$250$, above the current $\$235$.
> - Fixed expenses of $\$8$ would balance it, since $(180 + 8)/0.80 = \$235$.
> - Variable expenses of 10% would also balance it, since $(180 + 20)/(1 - 0.10 - 0.05) = \$235$.
> - Expected loss and LAE of $\$168$ would balance it, since $(168 + 20)/0.80 = \$235$.
> - With none of these and no rate change, the company accepts an underwriting profit of $(235 - 180 - 20 - 0.15 \times 235)/235 = -0.1\%$ until rates can be raised.

## Types of non-pricing solutions

1. **Reduce expenses.** Underwriting or LAE expenses are cut, for example with a smaller marketing budget or lower staffing levels. This lowers $F$ or $V$.
2. **Change the portfolio.** The insurer tightens underwriting criteria, or non-renews policies whose premium is grossly inadequate relative to expected costs. Premium leaves along with the losses, so the action helps only if the loss reduction is greater than the premium reduction.
3. **Reduce coverage.** A coverage level change, such as excluding mold from homeowners, removes previously covered losses. Without a matching rate decrease it is equivalent to a rate increase.
4. **Improve loss control.** A workers compensation insurer may reduce average severity with proactive medical management and return-to-work programs for disability claims that are likely to escalate.
5. **Improve [[Claims Handling|claims handling]].** Better claims handling lowers the losses paid without a change in rate.

After any such action, the actuary adjusts the loss, expense and premium projections and recalculates the [[Overall Rate Level Indication|overall rate level indication]]. Underwriting and coverage changes act only as policies renew, so they take a full policy term to earn in.

Non-pricing solutions are used where rates are promulgated or increases are hard to obtain, and to supplement a partial increase where a full one would damage retention and new business ([[Considerations for Implementing Rates]]).

> [!example]- A book has 10,000 policies averaging $\$580$ of premium and $\$420$ of expected loss and LAE, with fixed expenses of $\$35$, variable expenses of 22% and a target profit of 5%. A segment of 800 policies averages $\$700$ of premium and $\$900$ of expected loss. What is the indication before and after the segment is non-renewed? {Example}
> - Before, the indicated average premium is $(420 + 35)/0.73 = \$623.29$, which is 7.5% above the current $\$580$.
> - After, the expected loss per policy is $(4{,}200{,}000 - 720{,}000)/9{,}200 = \$378.26$.
> - The average premium is $(5{,}800{,}000 - 560{,}000)/9{,}200 = \$569.57$.
> - The indicated average premium is $(378.26 + 35)/0.73 = \$566.11$, so **the indication falls from +7.5% to −0.6%**.
> - If total fixed expenses of $\$350{,}000$ stay with the smaller book, they rise to $350{,}000/9{,}200 = \$38.04$ per policy, and the indication is $(378.26 + 38.04)/0.73 = \$570.28$, which is +0.1%.

> [!trap] Counting only the losses that leave
> A portfolio change removes premium as well as losses. Non-renewing a segment improves the indication only by the amount its losses exceed its premium, and fixed expenses that stay with the book raise the per-policy load on what remains.
