---
verification:
  status: stale
  confidence: null
  last_checked: 2026-10-31
  last_checked_by: agent:validate-v1
  content_hash: sha256:b642a4e06a6d290a4cf1f0003eeb4cb5b8736e0e39161af9fdf31a478eea5a85
  sources:
    - "SOA Exam FAM syllabus, October 2026, Topic 10 learning outcomes a-e, p.7; readings p.8, sha256:90172025d8bd9d69e18e974fdee447963e54258e5f0e419aa3ef5b7d3e55a00e — https://www.soa.org/globalassets/assets/files/edu/2026/fall/syllabi/2026-10-fam-syllabus.pdf"
    - "E. Valdez, STT 456 Premium Calculation lecture slides (Michigan State, Spring 2015), after Dickson et al. ch.6, slides 4-8, 16, 18, sha256:7b4af6694606f8ee6a4ad037032100e510c0f7d382d2f47d6f85044cff02cc98 — https://users.math.msu.edu/users/valdezea/stt456s15/STT456Weeks1to2-S2015.pdf"
    - "B. Hartman, Stat 344 Life Contingencies I, Chapter 6: Premiums (BYU lecture notes), slides 3-6, 23-33, sha256:da3f77bfcd709a519f2c4982b1969fa3d62c4ec4b410117ad00dedf510dee5e8 — https://hartman.byu.edu/docs/344Files/Stat344_Chapter6.pdf"
    - "SOA Exam FAM Sample Questions, Topics 7-10 (version Aug 18, 2026), Q6.4, Q6.6, Q6.17, Q7.13, Q7.17, Q7.40 (pp.52-53, 63, 103, 106, 125), sha256:4aaf3469628f2b63a689c187d963857a5a6e749c5eaca9978b264d854f60a28d — https://www.soa.org/globalassets/assets/files/edu/2024/fall/questions/2024-10-exam-fam-l-sample-questions.pdf"
    - "SOA Exam FAM Sample Solutions, Topics 7-10, Q5.5 p.29; Q6.4 p.35; Q6.6 p.36; Q7.13 p.71; Q7.16-7.17 p.73; Q7.40 p.82, sha256:9e7f7b03e0252ccb8f69e4f453d443d8d7cb43ef3945d05c935fdf234cae72ab — https://www.soa.org/globalassets/assets/files/edu/2024/fall/solutions/2024-10-exam-fam-l-sample-solutions.pdf"
    - "SOA Tables for Exam FAM, Standard Ultimate Life Table pp.20-21, sha256:430c8babdb38ff53ae7ce7d5d1d3bd55c2890eeb9ae96db5015121d1c2f11e17 — https://www.soa.org/globalassets/assets/files/edu/2024/fall/2024-10-exam-fam-tables.pdf"
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Portfolio Percentile Principle.md
---

The **Portfolio Percentile Principle** sets the premium for a portfolio of $N$ independent and identical policies so that the probability that the portfolio's aggregate [[Future Loss Random Variable|future loss]] $L$ is negative, meaning that the portfolio makes a profit, equals a chosen level $\alpha$ such as $95\%$. The aggregate loss is

> $$L = \sum_{i=1}^{N} L_{0,i}$$

- $L_{0,i}$ is the future loss at issue on policy $i$, net or gross.

The losses are independent and identically distributed, so $E[L] = N\,E[L_0]$ and $\text{SD}(L) = \sqrt{N}\,\text{SD}(L_0)$. For large $N$ the aggregate loss is approximately [[Normal Distribution|normal]] by the [[Central Limit Theorem|central limit theorem]], so $\Pr(L < 0) = \Phi\left(-E[L]/\text{SD}(L)\right)$. Setting this equal to $\alpha$, the premium $P$ solves

> $$N\,E[L_0] + z_{\alpha}\sqrt{N}\,\text{SD}(L_0) = 0$$

- $z_\alpha$ is the $\alpha$-[[Percentile|percentile]] of the standard normal distribution, 1.645 for $95\%$.

## Premium for a whole life insurance

For a fully discrete [[Whole Life Insurance|whole life]] insurance with sum insured $S$, the expected loss at issue is

> $$E[L_0] = S A_x - P\ddot{a}_x$$

- $A_x$ is the expected present value of 1 paid at the end of the year of death, and $\ddot{a}_x$ that of a whole life annuity-due of 1.

Its standard deviation is

> $$\text{SD}(L_0) = \left(S + \frac{P}{d}\right)\sigma$$

- $d$ is the discount rate.
- $\sigma = \sqrt{{}^2A_x - A_x^2}$, with ${}^2A_x$ the second moment of the whole life present value.

Both are linear in $P$. Dividing the condition by $N$ and solving for $P$, the premium is

> $$P = \frac{S\left(A_x + z_\alpha\sigma/\sqrt{N}\right)}{\ddot{a}_x - z_\alpha\sigma/(d\sqrt{N})}$$

For term insurance the $(S + P/d)$ shortcut does not apply, and the standard deviation comes from the loss distribution.

> [!example]- What net premium gives this portfolio a $95\%$ probability of an aggregate profit? {Example}
> An insurer sells fully discrete whole life insurances of $\$100{,}000$ to $N = 1{,}000$ independent lives aged 60. On the SULT at $5\%$, $A_{60} = 0.29028$, ${}^2A_{60} = 0.10834$ and $\ddot{a}_{60} = 14.9041$.
>
> > [!answer]-
> > - $\sigma = \sqrt{0.10834 - 0.29028^2} = 0.155169$, and $1/d = 21$.
> > - $z_{0.95}\,\sigma/\sqrt{1{,}000} = 1.645(0.155169)/31.6228 = 0.0080718$.
> > - Dividing the condition by $N$ gives $29{,}028 - 14.9041P + 0.0080718(100{,}000 + 21P) = 0$.
> > - So $P(14.9041 - 0.169508) = 29{,}028 + 807.18$, and $P = 29{,}835.18/14.734592 = \$2{,}024.84$.
> > - The equivalence premium is $29{,}028/14.9041 = \$1{,}947.65$, so the percentile premium is $4.0\%$ higher.

## Size of the portfolio

The condition requires $E[L_0] = -z_\alpha\,\text{SD}(L_0)/\sqrt{N}$, so the margin per policy shrinks like $1/\sqrt{N}$. The premium falls towards the [[Equivalence Principle|equivalence principle]] premium as the portfolio grows. In the example above, 100 policies need $\$2{,}197.97$, a margin of $12.9\%$, and 10,000 policies need $\$1{,}971.87$, a margin of $1.2\%$.

The principle allows only for the diversifiable risk of individual deaths. Risks that hit every policy together, such as a fall in interest rates or a general change in mortality, break the independence assumption and are not covered by it.

> [!example]- At a net premium of $\$2{,}000$, how many of these whole life policies must the insurer sell for a $95\%$ probability of profit? {Example}
> - $E[L_0] = 29{,}028 - 2{,}000(14.9041) = -780.20$.
> - $\text{SD}(L_0) = (100{,}000 + 21 \times 2{,}000)(0.155169) = 22{,}034.00$.
> - The condition needs $\sqrt{N} \ge 1.645(22{,}034.00)/780.20 = 46.457$, so $N \ge 2{,}158.3$.
> - The number of policies is rounded up, so the insurer needs at least 2,159 policies.

> [!trap] Subtracting $z_\alpha$ instead of adding it
> The condition is $E[L] + z_\alpha\,\text{SD}(L) = 0$ with $z_\alpha = 1.645$. Writing $E[L] - z_\alpha\,\text{SD}(L) = 0$ gives $\$1{,}872.20$ in the first example, a premium below the equivalence premium that makes a loss likely.
