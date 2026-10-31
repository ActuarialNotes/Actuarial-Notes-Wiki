---
verification:
  status: verified
  confidence: medium
  last_checked: 2026-10-31
  last_checked_by: agent:validate-v1
  content_hash: sha256:485eadc98a02b91fd794f6856c63ca61de6075085dd8006373e82b15e87f261a
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

**The Portfolio Percentile Principle** sets the premium for a portfolio of $N$ independent and identical policies so that the probability that the portfolio's aggregate [[Future Loss Random Variable|future loss]] is negative, meaning that the portfolio makes a profit, equals a chosen level $\alpha$ such as $95\%$. For large $N$ the aggregate loss is approximately [[Normal Distribution|normal]] by the [[Central Limit Theorem|central limit theorem]], so the premium solves a single equation in $P$ (Dickson, Hardy & Waters, chapter 6).

> $$L = \sum_{i=1}^{N} L_{0,i}$$

> $$\Pr(L < 0) = \alpha$$

> $$N\,E[L_0] + z_{\alpha}\sqrt{N}\,\text{SD}(L_0) = 0$$

- **Symbols:** $L_{0,i}$ is the future loss at issue on policy $i$, net or gross, and the losses are independent and identically distributed, so $E[L] = N\,E[L_0]$ and $\text{SD}(L) = \sqrt{N}\,\text{SD}(L_0)$. $z_\alpha$ is the $\alpha$-[[Percentile|percentile]] of the standard normal distribution, 1.645 for $95\%$. The third block follows from $\Pr(L < 0) = \Phi\left(-E[L]/\text{SD}(L)\right) = \alpha$.
- **Solving for $P$:** For a fully discrete [[Whole Life Insurance|whole life]] insurance, $E[L_0] = S A_x - P\ddot{a}_x$ and $\text{SD}(L_0) = (S + P/d)\,\sigma$, with $\sigma = \sqrt{{}^2A_x - A_x^2}$. Both are linear in $P$, so dividing the third block by $N$ gives $P = S\left(A_x + z_\alpha\sigma/\sqrt{N}\right)/\left(\ddot{a}_x - z_\alpha\sigma/(d\sqrt{N})\right)$.
- **Size of the margin:** The condition requires $E[L_0] = -z_\alpha\,\text{SD}(L_0)/\sqrt{N}$, so the margin per policy shrinks like $1/\sqrt{N}$, and the premium falls towards the [[Equivalence Principle|equivalence principle]] premium as the portfolio grows. The principle allows only for the diversifiable risk of individual deaths. Risks that hit every policy together, such as a fall in interest rates or a general change in mortality, break the independence assumption and are not covered by it.

> [!example]- Whole Life Premium for 1,000 Policies {Example}
> An insurer sells fully discrete whole life insurances of \$100,000 to $N = 1{,}000$ independent lives aged 60. On the SULT at $5\%$, $A_{60} = 0.29028$, ${}^2A_{60} = 0.10834$ and $\ddot{a}_{60} = 14.9041$. Find the net premium for which the probability of an aggregate profit is $95\%$, and compare it with the equivalence premium.
>
> > [!answer]-
> > Here $\sigma = \sqrt{0.10834 - 0.29028^2} = 0.155169$ and $z_{0.95}\,\sigma/\sqrt{1{,}000} = 1.645(0.155169)/31.6228 = 0.0080718$. Dividing the condition by $N$ gives $29{,}028 - 14.9041P + 0.0080718(100{,}000 + 21P) = 0$.
> > $$
> > \begin{align*}
> > P\left(14.9041 - 0.169508\right) &= 29{,}028 + 807.18 \\
> > P &= \frac{29{,}835.18}{14.734592} \\
> > &= 2{,}024.84 \\
> > P_{\text{EP}} &= \frac{29{,}028}{14.9041} \\
> > &= 1{,}947.65
> > \end{align*}
> > $$
> > The percentile premium is $4.0\%$ above the equivalence premium. With the same method, 100 policies need \$2,197.97, a margin of $12.9\%$, and 10,000 policies need \$1,971.87, a margin of $1.2\%$.

> [!example]- Portfolio Size for a Given Premium {Example}
> For the policy in the first example, the insurer charges a net premium of \$2,000. How many policies must it sell for the probability of an aggregate profit to be at least $95\%$?
>
> > [!answer]-
> > $$
> > \begin{align*}
> > E[L_0] &= 29{,}028 - 2{,}000(14.9041) \\
> > &= -780.20 \\
> > \text{SD}(L_0) &= \left(100{,}000 + 21(2{,}000)\right)(0.155169) \\
> > &= 22{,}034.00 \\
> > \sqrt{N} &\ge \frac{1.645(22{,}034.00)}{780.20} \\
> > &= 46.457 \\
> > N &\ge 2{,}158.3
> > \end{align*}
> > $$
> > The insurer needs at least 2,159 policies. With fewer, the expected profit of \$780 a policy is too small, relative to the spread of the aggregate loss, to give a $95\%$ chance of a profit.

> [!tip]- How it appears on the exam
> - **FAM** asks for a premium by the portfolio percentile principle, alongside the equivalence principle and the premium for a given EPV of profit, for whole life, term and endowment insurance and for annuities. The question gives $N$, $\alpha$ and a table or survival model.
> - **Reverse questions:** A question can instead give the premium and ask for the smallest $N$, as in the second example, or give $P$ and $N$ and ask for the probability of a profit.
> - **The loss moments:** Every such question first needs $E[L_0]$ and $\text{SD}(L_0)$ as functions of $P$. For whole life and endowment insurance the $(S + P/d)$ shortcut gives the standard deviation, while for term insurance it must come from the loss distribution.

> [!warning]- Exam traps
> - **The sign of $z$:** The condition is $E[L] + z_\alpha\,\text{SD}(L) = 0$ with $z_\alpha = 1.645$. Writing $E[L] - z_\alpha\,\text{SD}(L) = 0$ gives \$1,872.20 in the first example, a premium below the equivalence premium that would make a loss likely.
> - **$\sqrt{N}$, not $N$:** The standard deviation of the aggregate loss is $\sqrt{N}\,\text{SD}(L_0)$ for independent policies. Using $N\,\text{SD}(L_0)$ treats the policies as perfectly dependent and gives a premium that does not fall as the portfolio grows.
> - **$P$ inside the standard deviation:** $\text{SD}(L_0)$ depends on $P$ through $S + P/d$. Fixing it at the equivalence premium's value gives \$2,023.96 instead of \$2,024.84 in the first example, a small gap that still changes the answer at the precision a question asks for.
> - **Rounding $N$:** The number of policies must be rounded up, because any smaller portfolio leaves the probability of a profit below $\alpha$.
