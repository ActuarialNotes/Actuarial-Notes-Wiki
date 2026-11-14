---
verification:
  status: stale
  confidence: null
  last_checked: 2026-10-18
  last_checked_by: agent:validate-v1
  content_hash: sha256:aebd36993d28087f08f3d16c567e04e37fc56585eb9d4a42ce8fa3b0a3f7f67a
  sources: []
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Solvency.md
---

![[Media/Figures/Solvency.svg|340]]

**Solvency** is an insurer's ability to meet its obligations to policyholders as they fall due. An insurer is solvent when its assets exceed its liabilities by at least the capital its risk profile requires, so solvency is positive equity with a **sufficient margin**, which [[Solvency Regulation|solvency regulation]] enforces.

In Canada the margin is measured by the [[MCT]], whose ratio is

> $$\text{MCT Ratio} = \frac{\text{Capital Available}}{\text{Minimum Capital Required}}$$

- $\text{Capital Available}$ is the insurer's [[Capital Available|capital available]], its equity after regulatory adjustments.
- $\text{Minimum Capital Required}$ is the capital the MCT requires for the insurer's risks.

> [!example]- Is this insurer solvent? {Example}
> An insurer reports assets of $\$820$ million, liabilities of $\$690$ million and minimum capital required under the MCT of $\$92$ million. Its supervisory target ratio is $150\%$ and its internal target is $175\%$. Its MCT ratio was $181\%$ two years ago and $168\%$ one year ago.
>
> > [!answer]-
> > - Capital available, before regulatory adjustments, is $\$820 - \$690 = \$130$ million.
> > - The MCT ratio is $\$130\text{M} / \$92\text{M} = 141\%$.
> > - The insurer is solvent on its balance sheet, with $\$130$ million of equity.
> > - At $141\%$ it is below both its $175\%$ internal target and the $150\%$ supervisory target.
> > - The ratio fell $13$ points, then $27$. At that pace it would near the $100\%$ minimum within two years.
> > - The [[Appointed Actuary]] must establish whether the fall comes from capital available (losses, dividends, unrealised investment declines) or from minimum capital required (growth in premium and reserves), because the responses differ.
> > - [[OSFI]] will require a capital restoration plan, restrict dividends and increase reporting frequency.

## Three levels of solvency

Solvency is used at three levels, which are kept distinct:

1. **Balance-sheet solvency**: assets exceed liabilities.
2. **Regulatory solvency**: capital exceeds the required amount, so the insurer may keep operating without intervention.
3. **Liquidity**: cash is available when claims are paid, even if the balance sheet is sound.

## Why insurers fail

[[PACICC]]'s research is consistent: **inadequate pricing and deficient reserves** dominate, followed by rapid growth into unfamiliar lines, reinsurance failure or dispute, catastrophe exposure, and fraud. Asset losses are a less frequent primary cause. Solvency also depends on pricing, because suppressed rates lead to eventual insolvency pressure, and a solvency regulator that cannot set rates can only observe the consequence.

## Assessing solvency

Solvency is forward-looking. A ratio measured at a point in time says little on its own. The questions are whether it is rising or falling, what would happen under adverse scenarios, and whether the business plan consumes or generates capital. The tools are the [[MCT]] ratio and its trend, [[FCT|financial condition testing]] under adverse scenarios, [[ORSA]]'s own view of required capital, [[Stress Testing|stress testing]] and reverse stress testing, key financial ratios from the [[Canadian Annual Return]] (the [[MSA Ratios]]), and [[Rating Agency|rating agency]] assessments.

The regulator does not promise zero failures. [[OSFI]]'s mandate is explicitly to allow reasonable risk-taking, and [[Guaranty Funds|guaranty funds]] handle the residual.

> [!trap] Reading the ratio without its trend
> A single ratio says little about where the insurer is heading. In the example the ratio fell $13$ points and then $27$, and that accelerating decline, more than the $141\%$ itself, is what puts the insurer near the $100\%$ minimum.
