---
aliases:
  - Stop Loss Reinsurance
verification:
  status: stale
  confidence: null
  last_checked: 2026-10-31
  last_checked_by: agent:validate-v1
  content_hash: sha256:fb92c3b0f5b30093c3aeca6eafd85edf99ff2afbf1c179f03d2e35db4dee85be
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

**Stop-Loss Reinsurance** is reinsurance that covers an insurer's aggregate losses rather than its individual claims. Over a stated period, the reinsurer pays the amount by which the total losses $S$ exceed a retention $d$, so its payment is

> $$I_d = (S - d)_+ = \max(S - d,\ 0)$$

- $I_d$ is the reinsurer's payment.

The insurer keeps $S \wedge d$, so the retention caps the insurer's total cost for the period. A stop-loss retention applies to the total for the period. A per-claim retention cannot protect a year with many moderate claims, and a stop-loss retention can. Stop-loss is the aggregate counterpart of [[Excess of Loss|excess of loss]] cover, which applies a retention to each loss, and its treaty form with an aggregate limit is [[Aggregate Excess of Loss|aggregate excess of loss]].

## Net stop-loss premium

The expected value of the reinsurer's payment, $E[(S - d)_+]$, is the **net stop-loss premium**. It is a pure premium, and it is

> $$E[(S - d)_+] = E[S] - E[S \wedge d]$$

- $S = X_1 + \cdots + X_N$ is the aggregate loss of the [[Aggregate Loss Model|aggregate loss model]], with $E[S] = E[N]\,E[X]$.
- $E[S \wedge d]$ is the limited expected value of $S$ at $d$.

For a discrete $S$, the limited expected value is

> $$E[S \wedge d] = \sum_{s < d} s\,f_S(s) + d\,\Pr(S \ge d)$$

- $f_S(s)$ is the probability that $S = s$.

The last term counts the years in which the insurer pays the full retention. Summing only $s\,f_S(s)$ for $s < d$ leaves those years out and makes the stop-loss premium far too large. The net stop-loss premium depends on the distribution of $S$ and not only on its mean, so when only the frequency and severity are given, the aggregate probabilities are built first.

> [!example]- What is the net stop-loss premium for this compound Poisson portfolio? {Example}
> The number of claims on a portfolio in a year is Poisson with mean 1.5. Each claim is 1 or 2, in units of $\$10{,}000$, with probabilities 0.6 and 0.4. A stop-loss treaty pays aggregate claims in excess of 3 units.
>
> > [!answer]-
> > - The mean claim is $1(0.6) + 2(0.4) = 1.4$, so $E[S] = 1.5(1.4) = 2.1$.
> > - No claims gives $f_S(0) = e^{-1.5} = 0.22313$.
> > - One claim of 1 gives $f_S(1) = 1.5e^{-1.5}(0.6) = 0.20082$.
> > - Aggregate losses of 2 arise from one claim of 2 or from two claims of 1, so $f_S(2) = 0.13388 + 0.09037 = 0.22425$.
> > - These give $F_S(2) = 0.64820$, so $\Pr(S \ge 3) = 0.35180$.
> > - $E[S \wedge 3] = 1(0.20082) + 2(0.22425) + 3(0.35180) = 1.7047$.
> > - $E[(S - 3)_+] = 2.1 - 1.7047 = 0.3953$, so the net stop-loss premium is about $\$3{,}953$ a year.

## Recursion on a span

When $S$ takes values only at multiples of a span $h$, the net stop-loss premium at the next retention is

> $$E\big[(S - (j+1)h)_+\big] = E\big[(S - jh)_+\big] - h\big[1 - F_S(jh)\big]$$

- $F_S$ is the distribution function of $S$, and $j = 0, 1, 2, \ldots$.

The term subtracted is $h\Pr(S > jh)$. Using $\Pr(S \ge jh)$ subtracts the mass at $jh$ as well and understates each later premium. The recursion starts from $E[(S - 0)_+] = E[S]$.

> [!example]- For the compound Poisson portfolio above, with $E[S] = 2.1$, what does the recursion give for $E[(S - 3)_+]$? {Example}
> - The span is $h = 1$, and $F_S(0) = 0.22313$, $F_S(1) = 0.42395$, $F_S(2) = 0.64820$.
> - $E[(S - 1)_+] = 2.1 - (1 - 0.22313) = 1.32313$.
> - $E[(S - 2)_+] = 1.32313 - (1 - 0.42395) = 0.74708$.
> - $E[(S - 3)_+] = 0.74708 - (1 - 0.64820) = 0.3953$, the same net stop-loss premium.

> [!trap] Comparing the mean with the retention
> $(E[S] - d)_+$ is not the net stop-loss premium. In the portfolio above it is 0, because $E[S] = 2.1$ is below 3, but $S$ exceeds 3 with probability 0.35 and the true value is 0.395. Applying $d$ to each claim instead computes an excess of loss cost, $E[N]\,E[(X - d)_+]$, which answers a different question.
