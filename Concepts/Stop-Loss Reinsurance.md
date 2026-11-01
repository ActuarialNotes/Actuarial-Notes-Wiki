---
aliases:
  - Stop Loss Reinsurance
verification:
  status: verified
  confidence: medium
  last_checked: 2026-10-31
  last_checked_by: agent:validate-v1
  content_hash: sha256:5fafeb614bce6fc438b25c833f9de30d9072a2f9954b6fd188bd92e93c00bb62
  sources:
    - "Frees et al., Loss Data Analytics (open text, openacttexts.github.io), ch.5, 5.3.2 Stop-loss Insurance: net stop-loss premium E[(S-d)_+]=E(S)-E(S^d), E(S^j)=sum_{x<j} x f(x)+j Pr(S>=j), recursion E[(S-(j+1)h)_+]=E[(S-jh)_+]-h(1-F_S(jh)); 5.3 E(S)=E(N)E(X), sha256:09489050a45e6eb2ee0d96804458eb22c936a61716227e08ad0398b9cba870d4 — https://openacttexts.github.io/Loss-Data-Analytics/ChapAggLossModels.html"
    - "SOA Exam FAM-S Sample Questions, Q29 stop-loss on a three-person group, p.24, sha256:ef535e2198444052082114642e5884d8fe279975ebe7059abb363c5ecfcfd4de — https://www.soa.org/globalassets/assets/files/edu/2024/fall/questions/2024-10-exam-fam-s-sample-questions.pdf"
    - "SOA Exam FAM-S Sample Solutions, Q29 solution, E(S)-E(S^1)=3-0.936=2.064, p.14, sha256:7b3f61d8c385f486f3dbc586cdaab035fe9c45a055710e8327d213c4d3e71b48 — https://www.soa.org/globalassets/assets/files/edu/2024/fall/solutions/2024-10-exam-fam-s-sample-solutions.pdf"
    - "SOA Exam C Sample Solutions, Q280 aggregate stop-loss with deductible 5, p.97, sha256:de58b71716cce5fbbe82cd3b31d1533db67686a86cabe407844ae403534a9a4a — https://www.soa.org/globalassets/assets/files/edu/edu-exam-c-sample-sol.pdf"
    - "SOA ASTAM Spring 2024 Model Solutions, stop-loss part (e): E[(S-2)_+]=E[S]-E[S^2], E[S^2]=1f_S(1)+2Pr(S>1), p.7, sha256:4f33d5c7e1aa38fd23684a24eb5e1c6535973fa01492638db9ecc94b87ace259 — https://www.soa.org/globalassets/assets/files/edu/2024/spring/solutions/spring-2024-astam-solutions.pdf"
    - "SOA Exam ASTAM Syllabus, October 2026, Topic 3 outcome a (stop loss reinsurance among coverage modifications), p.3, sha256:6d462aea25c09b15cc457176ecf2d5d6143df8fb88df9f366557de17ec1ec9ba — https://www.soa.org/globalassets/assets/files/edu/2026/astam/2026-fall-exam-astam-syllabus.pdf"
    - "SOA Exam FAM Syllabus, February 2027, Topic 2 outcome l, p.3, sha256:da98474b74b0a9e9153b8ce198f30195dfbe394b3e300e785e58f12663b447e4 — https://www.soa.org/globalassets/assets/files/edu/2027/spring/syllabi/2027-2-fam-syllabus.pdf"
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Stop-Loss Reinsurance.md
---

**Stop-Loss Reinsurance** covers an insurer's aggregate losses rather than its individual claims. Over a stated period, the reinsurer pays the amount by which the total losses $S$ exceed a retention $d$, and the expected value of that payment, $E[(S - d)_+]$, is the **net stop-loss premium**. It is the aggregate counterpart of [[Excess of Loss|excess of loss]] cover, which applies a retention to each loss, and its treaty form with an aggregate limit is [[Aggregate Excess of Loss|aggregate excess of loss]].

> $$I_d = (S - d)_+ = \max(S - d,\ 0)$$

> $$E[(S - d)_+] = E[S] - E[S \wedge d]$$

> $$E[S \wedge d] = \sum_{s < d} s\,f_S(s) + d\,\Pr(S \ge d)$$

> $$E\big[(S - (j+1)h)_+\big] = E\big[(S - jh)_+\big] - h\big[1 - F_S(jh)\big]$$

- **Symbols:** Following Klugman, Panjer & Willmot (*Loss Models*, chapter 9), $S = X_1 + \cdots + X_N$ is the aggregate loss of the [[Aggregate Loss Model|aggregate loss model]], with $E[S] = E[N]\,E[X]$. $I_d$ is the reinsurer's payment, and the insurer keeps $S \wedge d$, so the retention caps the insurer's total cost for the period. The third block is for a discrete $S$, and the fourth holds when $S$ takes values only at multiples of a span $h$.
- **Why the whole distribution matters:** The net stop-loss premium depends on the distribution of $S$ and not only on its mean.
- **Premium and protection:** The net stop-loss premium is a pure premium. A per-claim retention cannot protect a year with many moderate claims, and a stop-loss retention can, because it applies to their total.

> [!example]- Net Stop-Loss Premium for a Compound Poisson Portfolio {Example}
> The number of claims on a portfolio in a year is Poisson with mean 1.5. Each claim is 1 or 2, in units of \$10,000, with probabilities 0.6 and 0.4. A stop-loss treaty pays aggregate claims in excess of 3 units. Find the net stop-loss premium.
>
> > [!answer]-
> > The mean claim is $1(0.6) + 2(0.4) = 1.4$, so $E[S] = 1.5(1.4) = 2.1$. Aggregate losses of 2 arise from one claim of 2 or from two claims of 1.
> > $$
> > \begin{align*}
> > f_S(0) &= e^{-1.5} \\
> > &= 0.22313 \\
> > f_S(1) &= 1.5e^{-1.5}(0.6) \\
> > &= 0.20082 \\
> > f_S(2) &= 1.5e^{-1.5}(0.4) + \tfrac{1.5^2}{2}e^{-1.5}(0.6^2) \\
> > &= 0.13388 + 0.09037 \\
> > &= 0.22425
> > \end{align*}
> > $$
> > These give $F_S(2) = 0.64820$, so $\Pr(S \ge 3) = 0.35180$.
> > $$
> > \begin{align*}
> > E[S \wedge 3] &= 1(0.20082) + 2(0.22425) + 3(0.35180) \\
> > &= 0.20082 + 0.44850 + 1.05540 \\
> > &= 1.70472 \\
> > E[(S - 3)_+] &= 2.1 - 1.70472 \\
> > &= 0.39528
> > \end{align*}
> > $$
> > The net stop-loss premium is about \$3,953 a year. Comparing the mean with the retention would suggest that nothing is owed, because $E[S] = 2.1$ is below 3, but $S$ exceeds 3 with probability 0.35.

> [!tip]- How it appears on the exam
> - **ASTAM** lists stop loss reinsurance among the coverage modifications whose effects candidates must evaluate. A question gives a frequency distribution and a discrete severity, or the aggregate probabilities directly, and asks for the net stop-loss premium at a stated retention.
> - **Aggregate probabilities first:** When only the frequency and severity are given, the aggregate probabilities have to be built by convolution or by recursion before the stop-loss premium can be found, so the question joins this page to the aggregate models objective.
> - **FAM** has the same calculation in its aggregate models objective, which asks candidates to calculate the expected payment for stop-loss insurance.

> [!warning]- Exam traps
> - **Mean against retention:** $(E[S] - d)_+$ is not the net stop-loss premium. It is 0 in the first example, where the true value is 0.395, because it ignores every year whose losses exceed $d$.
> - **The last term of the limited mean:** $E[S \wedge d]$ includes $d\,\Pr(S \ge d)$. Summing only $s\,f_S(s)$ for $s < d$ leaves out the years in which the insurer pays the full retention, and makes the stop-loss premium far too large.
> - **Which tail probability:** The recursion subtracts $h\big[1 - F_S(jh)\big] = h\Pr(S > jh)$. Using $\Pr(S \ge jh)$ subtracts the mass at $jh$ as well and understates each later premium.
> - **Aggregate or per claim:** A stop-loss retention applies to the total for the period. Applying $d$ to each claim computes an excess of loss cost, $E[N]\,E[(X - d)_+]$, which answers a different question.
