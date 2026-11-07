---
verification:
  status: stale
  confidence: null
  last_checked: 2026-11-06
  last_checked_by: agent:validate-v1
  content_hash: sha256:efd0cdf8159e8ac4112911769f3433c2423065007f13811a9de7e7cae8f4e2bb
  sources:
    - "Anderson & Brown, Risk and Insurance (SOA study note P-21-05), §VII Inflation: fixed deductibles and limits; deductible 500 table 650 -> 998 (+54%) vs losses 750 -> 1098 (+46%) PDF p.10; maximum 12,500 table 610 -> 819 (+34%) PDF p.11, sha256:1cb44e7f9ee240a9a0597a89dbf3a055ab70d07a8739132c75440051ee655922 — https://www.soa.org/globalassets/assets/files/edu/P-21-05.pdf"
    - "Frees et al., Loss Data Analytics (open text), Ch.3 Modeling Loss Severity, §3.3.1 scale distributions and inflation (lognormal mu + log 1.3, sigma unchanged); §3.4.3 inflated loss (1 + r)X with d and u unchanged, E(Y^L) = alpha(1 + r)[E(X^(u/(1+r))) - E(X^(d/(1+r)))], sha256:263021bf543b04b2881284b38b7dcbd0586b78daec371b88a1eefcd362dff732 — https://openacttexts.github.io/Loss-Data-Analytics/ChapSeverity.html"
    - "Bahnemann, Distributions for Actuaries (CAS Monograph 2), §2.8 Inflation Effects: uniform trend Y = tX, lognormal (mu + log t, sigma), monetary vs social/judicial inflation PDF p.80; censored severity E[tX; l] and the leveraging effect of an upper limit, which disappears when the limit is trended too PDF p.81; §5.5 Inflation Effects PDF p.165, sha256:d4d172f9646852ab018ae3f0df95e5fbdbfabda4db55d6d4596977ed2eaa3ef8 — https://www.casact.org/sites/default/files/2021-03/8_Bahnemann.pdf"
    - "Werner & Modlin, Basic Ratemaking (CAS, 5th ed. 2016), Ch.6 trend drivers (monetary inflation, medical costs, safety technology) PDF p.122; Leveraged Effect of Limits on Severity Trend, 10% -> 3.5%, basic <= total <= excess, deductibles leverage with censoring below the deductible PDF pp.129-130; Ch.11 social inflation, disproportionate impact on increased limits PDF p.204, sha256:6b214d4db52674df2e83343920c06781e491254bd77f27e32ba312faaff3782c — https://www.casact.org/sites/default/files/2021-03/5_Werner_Modlin.pdf"
    - "Friedland, Estimating Unpaid Claims Using Basic Techniques (CAS), economic environment, increase in the inflation rate PDF p.50; diagonals as valuation dates PDF p.59; average values down columns limited to inflationary forces PDF p.80; frequency-severity reflects inflation explicitly, highly sensitive to the inflation assumption PDF p.218, sha256:5e9830823346d2001d9bdcebecd0d0d399cac32a9a63d5cf021a6c7f03d50464 — https://www.casact.org/sites/default/files/2021-03/5_Friedland.pdf"
    - "SOA Exam FM Sample Questions, Q402 interest rate i, real rate i', inflation r (PDF p.170), sha256:d20b5cf2b78cb4cddb3dc556e0df62c40b7d510b7941b546809cc58c4b71a069 — https://www.soa.org/globalassets/assets/files/edu/2018/2018-10-exam-fm-sample-questions.pdf"
    - "SOA Exam FM Sample Solutions, Q402 solution (1 + i')(1 + r) = 1 + i (PDF p.106), sha256:ae4ec6082b43944a0c44cefaf02cdc24cf2e011dcd57366ea5f9cb32d3323f69 — https://www.soa.org/globalassets/assets/files/edu/2018/2018-10-exam-fm-sample-solutions.pdf"
    - "SOA Exam FM syllabus, December 2026, Topic 1 outcome a: inflation and real rate of interest, PDF p.2, sha256:b4189b65d60ab3c9250a8bf5ed48a28a8365c92ab7d673aba25d50ee339edb39 — https://www.soa.org/globalassets/assets/files/edu/2026/fall/syllabi/2026-12-exam-fm-syllabus.pdf"
    - "SOA Exam P Sample Questions (2026-05 edition), Q328: 3% inflation and fixed maintenance cost 2.5 (PDF p.134), sha256:24980e6de9cc0a68f13ac33b0ab4b18ad8ebb54d42d1afe08eed8bebb212cf06 — https://www.soa.org/globalassets/assets/files/edu/2026/spring/questions-solutions/2026-05-exam-p-sample-questions.pdf"
    - "SOA Exam P Sample Solutions (2026-05 edition), Q328 solution Var(1.03X + 2.5) = 1.03^2 Var X (PDF p.90), sha256:e10d2649bdf708541f87849c85ef6cde195019cfc8a46ee9647f6733d74d04b2 — https://www.soa.org/globalassets/assets/files/edu/2026/spring/questions-solutions/2026-05-exam-p-sample-solutions.pdf"
    - "SOA, Tables for Exam C (Fall 2009), A.3.3.1 exponential E[X^x] = theta(1 - e^(-x/theta)) PDF p.11, sha256:cefc3286baa0150b6520455e76104589f1187622212efe05a600926d0bf14e0f — https://www.soa.org/globalassets/assets/files/edu/edu-2009-fall-exam-c-table.pdf"
    - "SOA Probability Exam (Exam P) syllabus, November 2026, Topic 2 outcome: as well as other factors, such as inflation, PDF p.3, sha256:bed27462961aa988fc66c90fefa34af47ea324e2ab9109889c4e4f8f78d97397 — https://www.soa.org/globalassets/assets/files/edu/2026/fall/syllabi/2026-11-exam-p-syllabus.pdf"
  open_findings: 2
  open_critical: 0
  log: .verify/Concepts/Inflation.md
---

![[Media/Figures/Inflation.svg|340]]

**Inflation** is the growth in the size of losses over time. Under uniform inflation at a rate $r$, every loss is multiplied by $1 + r$, so a loss $X$ becomes

> $$X' = (1 + r)X$$

The mean of the loss rises by the factor $1 + r$ and its variance by $(1 + r)^2$. Over $n$ years at a compound rate $r$, every loss is multiplied by $(1 + r)^n$.

> [!idea] The idea
> Inflation scales the losses but not a policy's fixed dollar terms, so the insurer's payment does not rise at the rate $r$.

> [!example]- This year's losses are uniform on $(0, 1000)$. Every loss rises 10% next year. What are next year's mean and variance? {Example}
> - Each loss $x$ becomes $1.1x$, so next year's loss is uniform on $(0, 1100)$.
> - The mean rises from 500 to $1.1 \times 500 = 550$.
> - The variance rises by $1.1^2 = 1.21$, from 83,333 to 100,833.

## The distribution of an inflated loss

The inflated loss is at most $x$ exactly when the original loss is at most $x/(1 + r)$, so its CDF is

> $$F_{X'}(x) = F_X\!\left(\frac{x}{1 + r}\right)$$

Each cumulative probability stays the same, and the loss amount it belongs to is scaled up by $1 + r$. A family with a scale parameter $\theta$ stays in the family, with $\theta$ replaced by $(1 + r)\theta$:

- an [[Exponential Distribution|exponential]] with mean $\theta$ becomes an exponential with mean $(1 + r)\theta$,
- a [[Pareto Distribution|Pareto]] or a [[Gamma|gamma]] keeps its shape $\alpha$, and its $\theta$ becomes $(1 + r)\theta$,
- a lognormal keeps its $\sigma$, and its $\mu$ becomes $\mu + \ln(1 + r)$.

> [!example]- Losses are exponential with mean 1,000. Every loss rises 10%. What is the probability that a loss next year exceeds 2,000? {Example}
> - Next year's loss is exponential with mean 1,100.
> - The probability is $e^{-2000/1100}$, which is $0.1623$.

## Inflation with a fixed deductible

When the [[Deductible|deductible]] $d$ stays at the same dollar amount, inflating the loss is the same as lowering the deductible to $d/(1 + r)$ and scaling up. The expected payment per loss is

> $$E[(X' - d)_+] = (1 + r)\,E\!\left[\left(X - \tfrac{d}{1 + r}\right)_+\right]$$

The payment rises by more than $r$. Losses above the deductible grow by $rX$, but the payment $X - d$ is smaller than $X$, and losses just under the deductible are pushed over it. This is the leveraged effect of a fixed deductible.

The expected payment per payment rises by less than the payment per loss, because the losses newly pushed over the deductible are small. For an exponential loss it rises by exactly $r$, because the exponential is memoryless.

If the deductible is raised in step with the losses, to $(1 + r)d$, the payment rises by exactly $r$.

> [!example]- Losses are exponential with mean 1,000, with a deductible of 500. Every loss rises 10% and the deductible stays at 500. By what percentage does the expected payment per loss rise? {Example}
> - For an exponential loss with mean $\theta$, $E[(X - d)_+]$ is $\theta e^{-d/\theta}$.
> - This year, $1000\,e^{-0.5} = 606.53$.
> - Next year, $1100\,e^{-500/1100} = 698.21$.
> - The expected payment per loss rises $698.21 / 606.53 - 1$, which is 15.1%.

> [!trap] Multiplying the payment by $1 + r$
> With the deductible fixed, $1.1 \times 606.53 = 667.18$ is too low. Inflate the loss first, then apply the deductible.

## Inflation with a fixed limit

When a [[Benefit Limit|benefit limit]] $u$ stays fixed, the [[Limited Expected Value|limited expected value]] follows the same rule, with the limit divided by $1 + r$:

> $$E[X' \wedge u] = (1 + r)\,E\!\left[X \wedge \tfrac{u}{1 + r}\right]$$

The payment rises by less than $r$, because every loss above the limit still pays $u$. The losses above the limit rise by more than $r$. A layer from $d$ to $u$ with a coinsurance percentage $\alpha$ divides both terms by $1 + r$:

> $$
> \begin{aligned}
> E[Y'] = \alpha(1 + r)\Big(&E\big[X \wedge \tfrac{u}{1+r}\big] \\
> &- E\big[X \wedge \tfrac{d}{1+r}\big]\Big)
> \end{aligned}
> $$

> [!example]- Losses are exponential with mean 2,000, and a policy pays each loss up to 3,000. Every loss rises 10% and the limit stays at 3,000. By what percentage does the expected payment rise? {Example}
> - For an exponential loss with mean $\theta$, $E[X \wedge u]$ is $\theta(1 - e^{-u/\theta})$.
> - This year, $2000(1 - e^{-1.5}) = 1553.74$.
> - Next year, $2200(1 - e^{-3000/2200})$ is $1637.40$.
> - The expected payment rises 5.4%, less than 10%. The expected loss above the limit rises from 446.26 to 562.60, which is 26.1%.

## Inflation on other exams

- **Exam 5 and Exam 8** treat inflation as a driver of [[Loss Trend|loss trend]]. Limits leverage it: the basic limits trend is at most the total limits trend, which is at most the excess losses trend. A deductible leverages it the other way, so the losses above a fixed deductible rise faster than the ground-up trend.
- **Exam 8** finds the excess ratio of an inflated loss $mX$ at a limit $L$ by evaluating the original loss's excess ratio at $L/m$. The implied trend in a layer is the ratio of the trended to the untrended expected loss in the layer, less 1.
- **Exam 5 reserving** measures severity trend by the ratios of incremental severities between adjacent accident years at the same age. A shift along the latest diagonal points to a [[Calendar Year Effect|calendar year effect]], such as an inflation shift. Development techniques assume that past development patterns already reflect inflation. The [[Frequency-Severity Method|frequency-severity method]] trends severities explicitly, so it addresses inflation directly but depends heavily on the selected trend.
- **Exam FM** uses the word for prices in general: the [[Real Rate of Interest|real rate of interest]] $i'$ satisfies $1 + i' = (1 + i)/(1 + r)$.
