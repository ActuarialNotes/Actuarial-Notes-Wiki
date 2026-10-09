---
aliases:
  - Stop Loss Reinsurance
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:6acd9b3ad5cb3c8065ce5be230d63761b5d4a5ad4c1991b1ffdf31a82b997b70
  sources: []
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Stop-Loss Reinsurance.md
---

**Stop-Loss Reinsurance** covers an insurer's aggregate losses rather than its individual claims. Over a stated period, the reinsurer pays the amount by which the total losses $S$ exceed a retention $d$, and the expected value of that payment, $E[(S - d)_+]$, is the **net stop-loss premium**. It is the aggregate counterpart of [[Excess of Loss|excess of loss]] cover, which applies a retention to each loss, and its treaty form with an aggregate limit is [[Aggregate Excess of Loss|aggregate excess of loss]].

> $$I_d = (S - d)_+ = \max(S - d,\ 0)$$

> $$E[(S - d)_+] = E[S] - E[S \wedge d]$$

> $$E[S \wedge d] = \sum_{s < d} s\,f_S(s) + d\,\Pr(S \ge d)$$

> $$E\big[(S - (j+1)h)_+\big] = E\big[(S - jh)_+\big] - h\big[1 - F_S(jh)\big]$$

> $$E[(S - d)_+] = \frac{b - d}{b - a}\,E[(S - a)_+] + \frac{d - a}{b - a}\,E[(S - b)_+]$$

- **Symbols:** Following Klugman, Panjer & Willmot (*Loss Models*, chapter 9), $S = X_1 + \cdots + X_N$ is the aggregate loss of the [[Aggregate Loss Model|aggregate loss model]], with $E[S] = E[N]\,E[X]$. $I_d$ is the reinsurer's payment, and the insurer keeps $S \wedge d$, so the retention caps the insurer's total cost for the period. The third block is for a discrete $S$, and the fourth holds when $S$ takes values only at multiples of a span $h$.
- **Interpolation:** The last block holds for any $a \le d \le b$ with $\Pr(a < S < b) = 0$. Between two possible values of $S$ the distribution function is flat, so the net stop-loss premium is linear in $d$ there. An arithmetic $S$, built from a discrete or [[Severity Discretization|discretized]] severity by [[Panjer Recursion|Panjer recursion]] or convolution, has such gaps between every pair of span points.
- **Why the whole distribution matters:** The net stop-loss premium depends on the distribution of $S$ and not only on its mean. Retentions are usually set above $E[S]$, where $(E[S] - d)_+$ is 0, but the reinsurer still pays in every year whose losses exceed $d$.
- **Premium and protection:** The net stop-loss premium is a pure premium, and the reinsurer's charge adds expense and risk loadings to it. A per-claim retention cannot protect a year with many moderate claims, and a stop-loss retention can, because it applies to their total.

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

> [!example]- A Retention Between Span Points {Example}
> For the same portfolio, the insurer considers a retention of 2.4 units (\$24,000). Find the net stop-loss premium by stepping the recursion from $d = 0$ and interpolating.
>
> > [!answer]-
> > $S$ is arithmetic with span $h = 1$, and $E[(S - 0)_+] = E[S] = 2.1$. Each step subtracts $1 - F_S(j)$, using $F_S(0) = 0.22313$, $F_S(1) = 0.42395$ and $F_S(2) = 0.64820$.
> > $$
> > \begin{align*}
> > E[(S - 1)_+] &= 2.1 - 0.77687 \\
> > &= 1.32313 \\
> > E[(S - 2)_+] &= 1.32313 - 0.57605 \\
> > &= 0.74708 \\
> > E[(S - 3)_+] &= 0.74708 - 0.35180 \\
> > &= 0.39528
> > \end{align*}
> > $$
> > No value of $S$ lies strictly between 2 and 3, so the premium at 2.4 is the weighted average with weights $0.6$ and $0.4$.
> > $$
> > \begin{align*}
> > E[(S - 2.4)_+] &= 0.6(0.74708) + 0.4(0.39528) \\
> > &= 0.44825 + 0.15811 \\
> > &= 0.60636
> > \end{align*}
> > $$
> > Lowering the retention from 3 to 2.4 units raises the net premium from about \$3,953 to about \$6,064. The recursion reproduces the first example's answer at $d = 3$, which checks the arithmetic.

> [!tip]- How it appears on the exam
> - **ASTAM** lists stop loss reinsurance among the coverage modifications whose effects candidates must evaluate. A question gives a frequency distribution and a discrete severity, or the aggregate probabilities directly, and asks for the net stop-loss premium at a stated retention.
> - **Aggregate probabilities first:** When only the frequency and severity are given, the aggregate probabilities have to be built by convolution or by recursion before the stop-loss premium can be found, so the question joins this page to the aggregate models objective.
> - **FAM** has the same calculation in its aggregate models objective, which asks candidates to calculate the expected payment for stop-loss insurance.
> - **Retention between span points:** When the retention falls between two possible values of $S$, the intended route is the linear interpolation rather than a sum over the whole distribution.

> [!warning]- Exam traps
> - **Mean against retention:** $(E[S] - d)_+$ is not the net stop-loss premium. It is 0 in the first example, where the true value is 0.395, because it ignores every year whose losses exceed $d$.
> - **The last term of the limited mean:** $E[S \wedge d]$ includes $d\,\Pr(S \ge d)$. Summing only $s\,f_S(s)$ for $s < d$ leaves out the years in which the insurer pays the full retention, and makes the stop-loss premium far too large.
> - **Which tail probability:** The recursion subtracts $h\big[1 - F_S(jh)\big] = h\Pr(S > jh)$. Using $\Pr(S \ge jh)$ subtracts the mass at $jh$ as well and understates each later premium.
> - **Aggregate or per claim:** A stop-loss retention applies to the total for the period. Applying $d$ to each claim computes an excess of loss cost, $E[N]\,E[(X - d)_+]$, which answers a different question.
> - **Where interpolation fails:** Linear interpolation needs $\Pr(a < S < b) = 0$. It does not hold for a continuous $S$, or across a point where $S$ has positive probability.
