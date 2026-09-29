---
Title: "Using Duration and Convexity to Approximate Change in Present Value"
Authors: "Robert Alps"
Publisher: "Society of Actuaries"
Year: "2017"
date: "2017"
Type: "Study Note"
Code: "FM-24-17"
Available from: "[soa.org](https://www.soa.org/globalassets/assets/Files/Edu/2017/fm-duration-convexity-present-value.pdf)"
verification:
  status: verified
  confidence: medium
  last_checked: 2026-09-29
  last_checked_by: agent:validate-v1
  content_hash: sha256:27f514bb5945e935ad278670a365840e3ab8bca6f44bd73b5f426e0fc4eb0585
  sources:
    - "SOA study note FM-24-17, Alps, Using Duration and Convexity to Approximate Change in Present Value (2017), PDF pp.1-19 (title page, contents, Sections 1-6, Appendices A-D, Acknowledgements, References; page images read for every formula), sha256:530436d4707ecadba3a7bef6e1a9661b8d9e9bb173486edfb6924bc4a4992040 — https://www.soa.org/globalassets/assets/Files/Edu/2017/fm-duration-convexity-present-value.pdf"
    - "SOA Financial Mathematics Exam syllabus, December 2026, p.7 (Additional References), sha256:b4189b65d60ab3c9250a8bf5ed48a28a8365c92ab7d673aba25d50ee339edb39 — https://www.soa.org/globalassets/assets/files/edu/2026/fall/syllabi/2026-12-exam-fm-syllabus.pdf"
  open_findings: 0
  open_critical: 0
  log: .verify/Resources/Books/Using Duration and Convexity to Approximate Change in Present Value (Alps - 2017).md
---
![[Using Duration and Convexity to Approximate Change in Present Value (Alps - 2017) - Cover.svg]]

An SOA study note on approximating the change in the present value of a cash flow series that results from a small change in interest rate. Written by Robert Alps and issued by the Education and Examination Committee as Financial Mathematics study note FM-24-17 (dated February 1, 2017), it demonstrates that a first-order approximation using Macaulay duration is more accurate than the linear approximation using modified duration, and that a second-order approximation using Macaulay duration and convexity is more accurate than the usual one using modified duration and convexity.

> [!info] On the syllabus
> - [[Exam FM-2 (SOA)|Exam FM]] — required reading: Sections 1–4, the one study note the syllabus requires (Additional References).

## 1 Introduction
- The note's purpose is to demonstrate a non-linear approximation using [[Macaulay Duration|Macaulay duration]] that is more accurate than the linear approximation using [[Modified Duration|modified duration]], and a corresponding second-order approximation using Macaulay duration and [[Convexity|convexity]] that is more accurate than the usual second-order approximation using modified duration and convexity.
- The formula most textbooks give, which the note calls the **first-order modified approximation**, uses only the difference in interest rates, the present value at the initial rate $i_0$ and the modified duration at $i_0$; the approximate change in present value is directly proportional to the change in rate:

> $$P(i) \approx P(i_0)\,\bigl(1-(i-i_0)\,D_{\text{mod}}(i_0)\bigr)$$

- The **first-order Macaulay approximation** is, under very general conditions, at least as accurate as the first-order modified approximation:

> $$P(i) \approx P(i_0)\left(\frac{1+i_0}{1+i}\right)^{D_{\text{mac}}(i_0)}$$

- The methods assume that the timings and amounts of the cash flows are unaffected by a small change in interest rate. The assumption is not always valid — a rate change may trigger the call of a [[Callable Bond|callable bond]] — but is usually valid for [[Non-Callable Bond|non-callable bonds]] or payments to retirees in a pension plan.
- The developments also assume a flat [[Yield Curve|yield curve]]: cash flows at all future times are discounted at the same interest rate.

## 2 Cash Flow Series and Present Value
- A [[Cash Flow|cash flow]] is a pair $(a, t)$ of an amount $a$, a real number that may be negative, and a time $t \ge 0$; a cash flow series is a finite or infinite sequence of cash flows $(a_k, t_k)$ for $k \in N$, where $N$ is a subset of the non-negative integers.
- With $i$ a periodic effective interest rate for the same time unit as the cash flow times, the [[Present Value|present value]] of the series as a function of the interest rate is (2.1):

> $$P(i) = \sum_{k \in N} a_k\,(1+i)^{-t_k}$$

- The example used throughout the note is a 10-year [[Annuity Immediate|annuity immediate]], $(a_k, t_k) = (1000, k)$ for $N = \{1, \dots, 10\}$: $P(0.07) = 1000\,a_{\overline{10}|0.07} = 7023.5815$ (2.2) and $P(0.065) = 7188.8302$ (2.3).
- Reasons given for approximating the change: an actuary should understand how the present value changes when the amounts, the times and the interest rate change; a bond portfolio's value at a higher rate can be approximated with nothing more than a handheld calculator; and approximations make multi-year Monte Carlo projections, which may need thousands of present value calculations, feasible.

## 3 Macaulay and Modified Duration
- The definitions of Macaulay duration (3.1) and modified duration (3.2):

> $$D_{\text{mac}}(i) = \frac{\sum_{k \in N} t_k\,a_k\,(1+i)^{-t_k}}{P(i)}, \qquad D_{\text{mod}}(i) = \frac{-P'(i)}{P(i)} = \frac{\sum_{k \in N} t_k\,a_k\,(1+i)^{-t_k-1}}{P(i)}$$

- Macaulay duration is the weighted average of the times of the cash flows, the weights being their present values; modified duration is the negative derivative of the present-value function with respect to the effective interest rate, expressed as a fraction of the present value. The two are related by $D_{\text{mod}}(i) = D_{\text{mac}}(i)/(1+i)$ (3.3), and the note assumes $P(i) \neq 0$ (3.4).
- For a single cash flow $(a_1, t_1)$, $D_{\text{mac}}(i) = t_1$ and $D_{\text{mod}}(i) = t_1/(1+i)$ (3.5).
- For the 10-year annuity, $D_{\text{mac}}(0.07) = 34739.1332/7023.5815 = 4.9460710$ (3.6), equivalently $(Ia)_{\overline{10}|0.07}/a_{\overline{10}|0.07}$ (3.7), and $D_{\text{mod}}(0.07) = 4.9460710/1.07 = 4.6224963$ (3.8).

## 4 First-Order Approximations of Present Value
- The first-order modified approximation (4.1) is derived using the first-order Taylor approximation for $P(i)$ about $i_0$; the note cites it in the four textbooks of its References. The [[1st-Order Macaulay Approximation|first-order Macaulay approximation]] (4.2) is derived in Appendix A.
- For the 10-year annuity at $i_0 = 0.07$, the first-order modified approximation gives $P(0.065) \approx 7023.5815\,(1 + 0.005 \cdot 4.6224963) = 7185.9139$, a percent error of $-0.0406\%$ (4.3); the first-order Macaulay approximation gives $7023.5815\,(1.07/1.065)^{4.9460710} = 7188.1938$, a percent error of $-0.0089\%$ (4.4) — about 22% of the modified approximation's error.
- For a series of a single cash flow, the first-order Macaulay approximation gives the exact present value; the first-order modified approximation does not.
- Over 180 scenarios (Appendix B), the first-order Macaulay error is at worst 39% and at best 14% of the first-order modified error. Appendix C shows the Macaulay approximation is more accurate whenever the cash flow amounts are positive; otherwise the modified approximation can be the more accurate.

## 5 Modified and Macaulay Convexity
- The definitions of modified convexity (5.1) and Macaulay convexity (5.2):

> $$C_{\text{mod}}(i) = \frac{P''(i)}{P(i)} = \frac{\sum_{k \in N} t_k(t_k+1)\,a_k\,(1+i)^{-t_k-2}}{P(i)}, \qquad C_{\text{mac}}(i) = \frac{\sum_{k \in N} t_k^2\,a_k\,(1+i)^{-t_k}}{P(i)}$$

- Macaulay convexity is the weighted average of the squares of the times of the cash flows, the weights being their present values, and $C_{\text{mod}}(i) = \bigl(C_{\text{mac}}(i) + D_{\text{mac}}(i)\bigr)/(1+i)^2$ (5.3).
- For a single cash flow, $C_{\text{mac}}(i) = t_1^2$ and $C_{\text{mod}}(i) = t_1(t_1+1)/(1+i)^2$ (5.4); for the 10-year annuity, $C_{\text{mac}}(0.07) = 228{,}451.20/7{,}023.5815 = 32.526311$ (5.5) and $C_{\text{mod}}(0.07) = 32.729830$ (5.6).

## 6 Second-Order Approximations of Present Value
- The second-order modified approximation (6.1), which the note says can be found in most of the texts:

> $$P(i) \approx P(i_0)\left(1-(i-i_0)\,D_{\text{mod}}(i_0)+\frac{(i-i_0)^2}{2}\,C_{\text{mod}}(i_0)\right)$$

- With $T = D_{\text{mac}}(i_0)$ and $Q = C_{\text{mac}}(i_0) - T^2$, the second-order Macaulay approximation (6.2), derived in Appendix D:

> $$P(i) \approx P(i_0)\left(\frac{1+i_0}{1+i}\right)^{T}\left(1+\left(\frac{i-i_0}{1+i_0}\right)^2\frac{Q}{2}\right)$$

- For the 10-year annuity, the second-order modified approximation gives $P(0.065) \approx 7188.7874$, a percent error of $-0.00060\%$ (6.3), and the second-order Macaulay approximation $7188.8266$, a percent error of $-0.00005\%$ (6.4) — less than 10% of the modified error. Over Appendix B's 180 scenarios the second-order Macaulay error is less than 20% of the second-order modified error.
- For a single cash flow $Q = t_1^2 - t_1^2 = 0$, so the second-order Macaulay approximation gives the exact present value at the new interest rate.

## Appendix A: Derivation of First-Order Macaulay Approximation
- The [[Current Value|current value]] of the series at time $T$ is $V_T(i) = P(i)\,(1+i)^T$ (A.1). A small increase in the interest rate decreases it when $T$ is small (before the first payment, say) and increases it when $T$ is large, and $V_T'(i_0) = 0$ exactly when $T = D_{\text{mac}}(i_0)$.
- Applying the first-order Taylor approximation about $i_0$ to $V(i) = P(i)\,(1+i)^{D_{\text{mac}}(i_0)}$, whose derivative at $i_0$ is zero, gives $V(i) \approx V(i_0)$, which rearranges to the first-order Macaulay approximation (A.2).

## Appendix B: Comparisons of Approximations
- Nine cash flow series, each with up to 25 cash flows at times 1 through 25 (Table B.1): level payments of 1,000 for 5, 10, 15, 20 and 25 years; an increasing series (1,000 rising by 1,000 to 25,000); a decreasing series (26,000 falling by 1,000 to 2,000); and two that rise to 13,000 at time 13 and fall back to 1,000, or fall to 14,000 and rise back to 26,000.
- Each series was valued at 20 interest rates differing from an initial 7.0% by multiples of 0.2% between 5.0% and 9.0%, and the percent errors averaged with a subjectively selected weighting of $e^{-|i-i_0|}$.
- First order (Table B.2): the Macaulay error is about 1/3 or less of the modified error — from 15.24% of it for the 5-year level series to 34.93% for the decreasing-then-increasing one. Second order (Table B.3): about 1/5 or less — from 1.68% for the increasing series to 17.53% for the decreasing one.
- For the 5-year level series the first-order Macaulay approximation takes 87% of the way from the first-order modified to the second-order modified approximation; over the nine series, between 72% and 94%.

## Appendix C: Demonstration that the First-Order Macaulay Approximation is More Accurate than the First-Order Modified Approximation
- Assuming positive cash flow amounts, with $F_1$ the first-order modified approximation and $F_2$ the first-order Macaulay approximation, Theorem (C.5) shows $F_1(i) \le F_2(i) \le P(i)$, so the first-order Macaulay approximation is always a better approximation.
- (C.1) $F_1(i) \le F_2(i)$ follows from Taylor's theorem with remainder, since $F_2''(i) > 0$.
- (C.2) to (C.4), stated in terms of the continuously compounded rate $\delta$ with $\delta_0 = \ln(1+i_0)$: Macaulay convexity is at least the square of Macaulay duration; Macaulay duration decreases as the interest rate increases; and the first-order Macaulay approximation is at most the present value.

## Appendix D: Derivation of Second-Order Macaulay Approximation
- With $V(i) = P(i)\,(1+i)^T$, $T = D_{\text{mac}}(i_0)$ and $V'(i_0) = 0$, the second derivative at $i_0$ is $V''(i_0) = P(i_0)\,(1+i_0)^{T-2}\bigl(C_{\text{mac}}(i_0) - T^2\bigr)$ (D.3).
- The second-order Taylor approximation for $V(i)$ about $i_0$ then gives the second-order Macaulay approximation (D.4).

## Acknowledgements
- The author thanks Steve Kossman, David Cummings and Stephen Meskin for their suggestions during the preparation of the note and their review of drafts.

## References
- Broverman, *Mathematics of Investment and Credit*, Sixth Edition (Actex, 2015); Vaaler and Daniel, *Mathematical Interest Theory*, Second Edition (Pearson Prentice Hall, 2009); Kellison, *The Theory of Interest*, Third Edition (McGraw Hill Irwin, 2009); Ruckman and Francis, *Financial Mathematics*, Second Edition (BPP Professional Education, 2005).

## Sources
- [Using Duration and Convexity to Approximate Change in Present Value (Society of Actuaries, 2017)](https://www.soa.org/globalassets/assets/Files/Edu/2017/fm-duration-convexity-present-value.pdf) — the study note (FM-24-17; copyright 2017 by the Society of Actuaries; dated February 1, 2017), 19 PDF pages: title page, contents, Sections 1–6, Appendices A–D, Acknowledgements and References, read from the page images
- [SOA Exam FM Syllabus, December 2026](https://www.soa.org/globalassets/assets/files/edu/2026/fall/syllabi/2026-12-exam-fm-syllabus.pdf) — the citation and the assignment: "Sections 1-4 are required reading for this examination" (Additional References, p. 7)
