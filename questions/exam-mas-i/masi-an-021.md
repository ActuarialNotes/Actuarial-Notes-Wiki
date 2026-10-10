---
id: "masi-an-021"
exam: "Exam MAS-I"
topic: "Bonus-Malus System"
learning_objective: "Probability Models (Stochastic Processes and Survival Models)"
difficulty: hard
type: multi-part
bloom: evaluate
wiki_link:
  - Concepts/Bonus-Malus+System
  - Concepts/Markov+Chain
  - Concepts/Poisson+Distribution
  - Concepts/Experience+Rating
points: 3
verification:
  status: verified
  confidence: medium
  last_checked: 2026-10-10
  last_checked_by: agent:validate-v1
  content_hash: sha256:99df937bc5b181cb134e0b83815858c2067f587a65a0ae9549f43097cc962efb
  sources:
    - "Ross, Introduction to Probability Models, Ch.4 Markov Chains (course-hosted copy, an edition earlier than the 11th-13th the outline lists), Example 4.7 Bonus Malus system: s_i(k) and P_ij = sum over k with s_i(k)=j of e^-lambda lambda^k/k!, printed pp.188-189 (PDF pp.4-5); Proposition 4.3 and Example 4.23 average annual premium = sum pi_j x premium_j, printed pp.215-217 (PDF pp.31-33), sha256:9f01ac6c0ef8a6a641de075fe6af109d7215bad8c33734807fd654d4a1ad53e1 — https://arvidn.folk.ntnu.no/TMA4265/Chap%204%20from%20Ross.pdf"
    - "Lemaire & Zi, \"A Comparative Analysis of 30 Bonus-Malus Systems\", ASTIN Bulletin 24(2), 1994, Tool #4: hunger for bonus, policyholders pay small claims themselves to avoid future premium increases; optimal retention, PDF p.9, sha256:44976cd13085959f1c41c738cc06163b0999de01beb4411b2f6d5b33859ec181 — https://www.casact.org/sites/default/files/database/astin_vol24no2_287.pdf"
    - "CAS Exam MAS-I Content Outline 2026, Domain A tasks 1-3 and readings (Daniel, Ross, Struppeck), PDF p.3, sha256:245892366dea073ff44e89b3ac2ae1401517b127d36d51c8a1198b3185faa2ed — https://www.casact.org/sites/default/files/2026-06/MASI_ContentOutline_2026.pdf"
  open_findings: 0
  open_critical: 0
  log: .verify/questions/exam-mas-i/masi-an-021.md
---

A bonus-malus system has three levels with annual premiums:

| Level | 1 | 2 | 3 |
|---|---|---|---|
| Premium | \$250 | \$350 | \$500 |

After a claim-free year a driver moves down one level (staying at level 1 if already there). After any year with a claim the driver goes to level 3. A driver's annual claim count is Poisson with mean 0.25.

A driver at level 1 has an at-fault loss on the last day of an otherwise claim-free year. If the loss is reported, the driver is at level 3 next year; if the driver pays it, the driver stays at level 1. Ignore interest.

## Part a (1 point)
Calculate the expected additional premium the driver will pay over all future years as a result of reporting the loss. Give your answer to two decimal places.

### Answer
327.88

### Explanation
Let $p = e^{-0.25} = 0.7788$ be the probability of a claim-free year.

- **Next year:** level 3 against level 1, an extra \$250 (\$500 against \$250) for certain.
- **The year after:** if next year is claim-free (probability $p$), the reporting path is at level 2 (\$350) and the other at level 1 (\$250). If next year has a claim, both paths are at level 3.
- **Later years:** after two claim-free years both paths are at level 1; a claim in either year puts both at the same level. The paths coincide from here on.

$$
\begin{align*}
E[\text{extra premium}] &= 250 + 100p \\
&= 250 + 100(0.7788) \\
&= \mathbf{327.88}
\end{align*}
$$

**Common wrong entries:** **250.00** stops after one year, forgetting that the driver needs two claim-free years to return to level 1; **350.00** assumes the second year is certainly claim-free; **272.12** uses the probability of a claim, $(1 - p)$, in place of $p$.

## Part b (1 point)
The loss is \$300. Using the criterion of lower expected total cost to the driver, what should the driver do?

- A) Report the loss
- B) Pay the loss itself
- C) Either, since the two choices cost the same

### Answer
B

### Explanation
Reporting spares the driver the \$300 loss but costs \$327.88 of expected extra premium, so paying the loss is cheaper by \$27.88. The answer is **B**. Any loss below \$327.88 goes unreported under this system, which is why an insurer's data for a bonus-malus book under-count small claims (hunger for bonus).

**Why not the others:** **A** compares the loss with the first year's surcharge of \$250 only. **C** would need a loss of exactly \$327.88.

## Part c (1 point)
A second driver at level 1, facing the same choice, believes her own claim rate is 1.0 a year rather than 0.25. Explain how this changes the largest loss she should be willing to pay herself, and why.

### Explanation
A full-credit answer makes these points:

1. The threshold is the expected extra premium, $e^{-\lambda}(100) + 250$, which falls as $\lambda$ rises. At $\lambda = 1.0$ it is $e^{-1}(100) + 250 = 286.79$, so she should report any loss above about \$287 rather than \$328.
2. The reason is that a driver who is likely to have a claim next year anyway is likely to land at level 3 whether or not she reports this loss. Once both paths reach level 3 they coincide, so reporting forfeits less of the future discount.
3. So the system's incentive to absorb small losses is strongest for the drivers with the lowest claim rates. Among the drivers it is meant to identify, the riskier ones report more of their small claims.

**Sample answer.** Her threshold falls to $e^{-1}(100) + 250$, about \$287. The only extra cost after next year arises if next year is claim-free; at a rate of 1.0 that happens with probability 0.37 rather than 0.78, because a claim next year would send her to level 3 on either path. Reporting therefore costs her less, so she should report losses above about \$287.
