---
verification:
  status: stale
  confidence: null
  last_checked: 2026-10-31
  last_checked_by: agent:validate-v1
  content_hash: sha256:dbf6015c4cd138cde26bae52b1f3acf60314d8bf685258258047ad2576132f30
  sources:
    - "Friedland, Estimating Unpaid Claims Using Basic Techniques (CAS, 2010), Ch.7 Step 5-6, PDF pp.95-97 (printed 89-91): tail factor approaches, Thorne on tail leverage, CDF at the last age = tail, sha256:5e9830823346d2001d9bdcebecd0d0d399cac32a9a63d5cf021a6c7f03d50464 — https://www.casact.org/sites/default/files/2021-03/5_Friedland.pdf"
  open_findings: 1
  open_critical: 0
  log: .verify/Concepts/Tail Factor.md
---

![[Media/Figures/Tail_Factor.svg|340]]

A **Tail Factor** is the development factor from the last age observed in a [[Development Triangle|development triangle]] to ultimate. It is needed when the [[Age to Age Factor|age-to-age factors]] at the oldest ages are still above 1.000. For an accident year at the last age $N$ of the triangle, it is

> $$\text{Tail} = \frac{\text{Ultimate Claims}}{C_{\text{AY},\,N}}$$

- $C_{\text{AY},N}$ is the accident year's claims at age $N$.

The tail factor is the [[Cumulative Development Factor|cumulative development factor]] at the last age. When no development is expected after the last age, the tail factor is 1.000. The cumulative factor at an earlier age then includes only the remaining age-to-age factors, and an accident year at the last age is fully developed, with no IBNR. A triangle whose data have stopped developing, such as a report year triangle with no claims reported after its last age, needs no tail.

> [!example]- The oldest accident year has $\$2{,}000{,}000$ of reported claims at 120 months, the last age of the triangle. Two tail factors are considered, 1.030 and 1.050. How much IBNR does each give the year? {Example}
> - With a tail of 1.030, the ultimate claims are $2{,}000{,}000 \times 1.030 = \$2{,}060{,}000$, so the IBNR is $\$60{,}000$.
> - With a tail of 1.050, the ultimate claims are $\$2{,}100{,}000$, so the IBNR is $\$100{,}000$.
> - Two points of tail change this year's IBNR by two-thirds.

The tail factor enters the CDF of every accident year, so it can have a disproportionate leverage on the whole estimate. For [[Long Tail Lines|long-tail lines]], such as U.S. workers compensation and medical professional liability, some claims take more than fifteen years to settle, and the tail is often the largest single judgment.

## Selecting a tail factor

Friedland gives three common approaches:

1. **Industry benchmarks.** Development factors from the industry or from similar lines of the insurer, used with caution about differences in limits, mix and case reserving.
2. **Curve fitting.** A curve, commonly an exponential decay, is fitted to the selected or observed age-to-age factors and extrapolated beyond the last age.
3. **Ratio of reported to paid claims.** For a paid triangle whose reported claims are already at ultimate, the ratio of reported to paid claims at the last paid age is the paid tail factor.

When the insurer's history is short, its own data are too thin to show the tail of a long-tailed coverage, which must then be extrapolated or taken from external data.

> [!example]- The excesses over 1.000 of the last four age-to-age factors of a workers compensation triangle are 0.040, 0.028, 0.020 and 0.014, ending at 108-120 months. What tail factor does an exponential decay give beyond 120 months? {Example}
> - The ratios of successive excesses are $0.028/0.040 = 0.70$, $0.020/0.028 = 0.71$ and $0.014/0.020 = 0.70$, so the excesses decay by about 0.70 a period.
> - The future excesses are $0.014 \times 0.70 = 0.0098$, then $0.0069$, and so on.
> - Their product, $1.0098 \times 1.0069 \times \cdots$, is a tail factor of $1.033$.

> [!example]- A paid triangle runs to 108 months. At that age the reported claims of the oldest accident years are at ultimate, and they are 1.002 times their paid claims. What is the paid tail factor? {Example}
> - The paid claims must still grow to the reported claims, which are ultimate.
> - The paid tail factor is the ratio of reported to paid claims, $1.002$.

> [!trap] Assuming a tail of 1.000 when development has not stopped
> A tail of 1.000 is itself an assumption, that development is complete at the last age. When the oldest age-to-age factors are still well above 1.000, a tail of 1.000 understates every accident year's ultimate claims.
