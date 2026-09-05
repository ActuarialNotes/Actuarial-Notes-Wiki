---
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:24efd199c81dc3d35a52445d3a116282aeac1c2cffb3caae7bc7afbc8be7d88d
  sources: []
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Solvency.md
---

**Solvency** is an insurer's ability to meet its obligations to policyholders as they fall due. An insurer is solvent when its assets exceed its liabilities by at least the capital its risk profile requires — so solvency is not merely positive equity, but positive equity of a **sufficient margin**, which is what [[MCT]] measures and what [[Solvency Regulation]] enforces.

> $$\text{MCT Ratio} = \frac{\text{Capital Available}}{\text{Base Solvency Buffer}}$$

- **Three levels** of the same idea, and candidates should keep them distinct: *balance-sheet solvency* (assets exceed liabilities); *regulatory solvency* (capital exceeds the required amount, so the insurer may keep operating without intervention); and *liquidity* (cash is available when claims are paid, even if the balance sheet is sound).
- **Why insurers fail.** [[PACICC]]'s research is consistent: **inadequate pricing and deficient reserves** dominate, followed by rapid growth into unfamiliar lines, reinsurance failure or dispute, catastrophe exposure, and fraud. Asset losses are a less frequent primary cause than intuition suggests — the liability side is where Canadian insurers fail.
- **Assessment tools:** the [[MCT]] ratio and its trend; [[FCT|financial condition testing]] under adverse scenarios; [[ORSA]]'s own view of required capital; [[Stress Testing]] and reverse stress testing; key financial ratios from the [[Canadian Annual Return]] (the [[MSA Ratios]] set); and [[Rating Agency]] assessments.
- **Solvency is forward-looking.** A ratio measured at a point in time says little; the questions are whether it is rising or falling, what would happen under adverse scenarios, and whether the business plan consumes or generates capital. This is precisely why [[FCT]] and [[ORSA]] exist alongside the [[MCT]].
- **The regulator does not promise zero failures.** [[OSFI]]'s mandate is explicitly to allow reasonable risk-taking; [[Guaranty Funds|guaranty funds]] handle the residual. A regime with no failures would be one in which capital requirements had made insurance unaffordable.
- Solvency interacts with pricing: suppressed rates guarantee eventual insolvency pressure, and a solvency regulator that cannot set rates can only observe the consequence.

> [!example]- Is This Insurer Solvent? {Example}
> An insurer reports: assets $\$820$ million, liabilities $\$690$ million, [[Base Solvency Buffer]] $\$92$ million. Its supervisory target ratio is $150\%$ and its internal target is $175\%$. One year ago the ratio was $168\%$. Two years ago, $181\%$.
>
> Assess.
>
> > [!answer]-
> > **Capital available** (before regulatory adjustments) is $\$820 - \$690 = \$130$ million.
> >
> > $$\begin{align*}
> > \text{MCT ratio} &= \frac{\$130\text{M}}{\$92\text{M}} \\
> > &= 141\%
> > \end{align*}$$
> >
> > **Balance-sheet solvent** — comfortably, with $\$130$ million of equity. **Not regulatorily solvent in the operating sense**: $141\%$ is below both the $175\%$ internal target and the $150\%$ supervisory target.
> >
> > **The trend is the story.** $181\% \to 168\% \to 141\%$ is a decline of $13$ then $27$ points — accelerating. Straight-line extrapolation puts the insurer near the $100\%$ minimum within two years, and by then it would have no capacity to recover.
> >
> > **What the [[Appointed Actuary]] must establish:** whether the fall is coming from capital available (losses, dividends, unrealised investment declines) or from the buffer (growth in premium and reserves), because the responses differ. The [[FCT]] report must model whether plausible adverse scenarios — a reserve strengthening, a catastrophe, a market decline — breach the $100\%$ minimum, and that report goes to the board.
> >
> > **What [[OSFI]] will do:** require a capital restoration plan, restrict dividends, and increase reporting frequency. The single most important observation for an exam answer is that **a declining ratio above target is a more serious signal than a stable ratio below it** — direction dominates level.
