---
verification:
  status: verified
  confidence: medium
  last_checked: 2026-10-05
  last_checked_by: agent:validate-v1
  content_hash: sha256:13915ca16b968475d0fdb6dce011601ff5ec1e935d559c5398c363a21fce8823
  sources:
    - "NIST/SEMATECH e-Handbook §1.3.5.16 Kolmogorov-Smirnov Goodness-of-Fit Test (fetched 2026-10-05): D = max_i (F(Y_i) - (i-1)/N, i/N - F(Y_i)); distribution of D does not depend on the F tested; only continuous distributions; more sensitive near the centre than the tails; F fully specified, otherwise critical region invalid and determined by simulation; Technical Note: 5% critical value 0.294 at N = 20; example: 0.04301 at N = 1000, sha256:e5965a380db82d214fd2b4d8a6da5d8932c6ee91374c6e8b78a84d3bc90fb907 — https://www.itl.nist.gov/div898/handbook/eda/section3/eda35g.htm"
    - "NIST/SEMATECH e-Handbook §1.3.5.14 Anderson-Darling Test (fetched 2026-10-05): A^2 = -N - S, S = sum (2i-1)/N [ln F(Y_i) + ln(1 - F(Y_(N+1-i)))]; gives more weight to the tails than K-S; critical values depend on the distribution tested, tabulated for normal, lognormal, exponential, Weibull, logistic, extreme value type 1 and others, sha256:93676dee9c9f3f8236b95bbd8f47558c15e16aba78e6f96a389c49f342148f80 — https://www.itl.nist.gov/div898/handbook/eda/section3/eda35e.htm"
    - "Frees et al., Loss Data Analytics (open text), Ch 4 Model Selection and Estimation, Table 4.2 (K-S max|F_n - F|, D+ at i/n and D- at (i-1)/n; A-D n integral (F_n - F)^2/(F(1-F)) f dx) and the paragraph after it (A-D places greater emphasis on the tails), sha256:c5fe1ff26cec4dee6f8bcc285b75c840202c947246f7b5d5598f9b837ccad021 — https://openacttexts.github.io/Loss-Data-Analytics/ChapModelSelection.html"
    - "SOA Exam C Sample Questions, Question #172(iii), PDF p.111: K-S critical values 1.22/sqrt(n), 1.36/sqrt(n), 1.48/sqrt(n), 1.63/sqrt(n) at 0.10/0.05/0.025/0.01, sha256:2e44cec57f895a09b66bd11d32297b3d776d306d4a26b6146c30c1022b9130ed — https://www.soa.org/globalassets/assets/files/edu/edu-exam-c-sample-quest.pdf"
    - "SOA Exam C Sample Solutions, Question #172, PDF p.62: n = 5 critical values 0.546, 0.608, 0.662, 0.729, sha256:de58b71716cce5fbbe82cd3b31d1533db67686a86cabe407844ae403534a9a4a — https://www.soa.org/globalassets/assets/files/edu/edu-exam-c-sample-sol.pdf"
    - "CAS Exam MAS-I Tables (version 01/15/2018), all 20 pages checked: normal, life table, interest, Loss Models appendices, t, F and chi-square tables; no K-S table, sha256:cb5674138a67f7a498b8cc90357144fd121cbcbbc7487f214557b105611a69b4 — https://www.casact.org/sites/default/files/2021-03/masi_tables.pdf"
    - "CAS Exam MAS-I Content Outline 2026 (MASI_CO_2026_F v06), reading list PDF p.6: Tse §13.2 assigned, sha256:245892366dea073ff44e89b3ac2ae1401517b127d36d51c8a1198b3185faa2ed — https://www.casact.org/sites/default/files/2026-06/MASI_ContentOutline_2026.pdf"
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Kolmogorov-Smirnov Test.md
---

The **Kolmogorov-Smirnov Test** (K–S) checks whether individual data came from a hypothesized continuous distribution $F^*$ by measuring the largest vertical gap $D$ between $F^*$ and the [[Empirical Distribution|empirical distribution function]] $F_n$. A large gap is evidence against the model, so $H_0$ is rejected when $D$ exceeds its [[Critical Value|critical value]].

> $$D = \max_{x}\,\big|F_n(x) - F^*(x)\big|$$

> $$D = \max_{1 \le i \le n}\left\{F^*(x_{(i)}) - \frac{i-1}{n},\ \ \frac{i}{n} - F^*(x_{(i)})\right\}$$

- $x_{(1)} \le \cdots \le x_{(n)}$ are the [[Order Statistics|ordered]] observations. $F_n$ jumps at each data point, so the gap must be checked on **both sides** of every jump: against the step's height before it, $(i-1)/n$, and after it, $i/n$. With tied values, compare $F^*(x)$ with $F_n(x^-)$ and $F_n(x)$.
- **Critical values.** The distribution of $D$ does not depend on $F^*$ when $F^*$ is fully specified, so one table serves every model. The SOA's Exam C sample questions supply $1.22/\sqrt{n}$, $1.36/\sqrt{n}$, $1.48/\sqrt{n}$ and $1.63/\sqrt{n}$ at the 10%, 5%, 2.5% and 1% levels (for $n = 5$: $0.546, 0.608, 0.662, 0.729$). These are **large-sample** values: for small $n$ an exact table gives a slightly smaller critical value — at $n = 20$ the exact 5% value is $0.294$, against $1.36/\sqrt{20} = 0.304$. The CAS MAS-I tables do not include them.
- **Limitations.** It applies only to continuous distributions and is most sensitive near the centre of the distribution, less so in the tails. If parameters are estimated from the same data, the tabled critical values are no longer valid (they must be found by simulation). For grouped data or a discrete model, use the [[Chi-Square Goodness-of-Fit Test]].
- **Anderson–Darling test.** A refinement that weights squared differences by $1/[F^*(1-F^*)]$, so it puts more emphasis on the **tails** — where large losses live. With $u_i = F^*(x_{(i)})$:

> $$A^2 = -n - \frac{1}{n}\sum_{i=1}^{n}(2i-1)\left[\ln u_i + \ln\big(1 - u_{n+1-i}\big)\right]$$

- Unlike $D$, the critical values of $A^2$ depend on which distribution is being tested, so they are tabulated separately for the normal, lognormal, exponential, Weibull and a few others.

> [!example]- K–S Test of an Exponential Severity Model {Example}
> Eight claims are observed: $45, 110, 180, 260, 390, 520, 800, 1{,}350$. Test at the 5% level whether they come from an exponential distribution with mean $400$.
>
> > [!answer]-
> > With $F^*(x) = 1 - e^{-x/400}$, compare $F^*$ with the empirical step just below and just at each point:
> >
> > | $x_{(i)}$ | $F^*(x_{(i)})$ | $\frac{i-1}{8}$ | $\frac{i}{8}$ | larger gap |
> > | :---: | :---: | :---: | :---: | :---: |
> > | 45 | 0.1064 | 0.000 | 0.125 | 0.1064 |
> > | 110 | 0.2404 | 0.125 | 0.250 | 0.1154 |
> > | 180 | 0.3624 | 0.250 | 0.375 | 0.1124 |
> > | 260 | 0.4780 | 0.375 | 0.500 | 0.1030 |
> > | 390 | 0.6228 | 0.500 | 0.625 | 0.1228 |
> > | 520 | 0.7275 | 0.625 | 0.750 | 0.1025 |
> > | 800 | 0.8647 | 0.750 | 0.875 | 0.1147 |
> > | 1,350 | 0.9658 | 0.875 | 1.000 | 0.0908 |
> >
> > So $D = 0.1228$, at $x = 390$. The large-sample 5% critical value is $1.36/\sqrt{8} = 0.481$; since $0.123 < 0.481$, **do not reject** the exponential model.

> [!example]- Anderson–Darling Statistic for a Small Sample {Example}
> Four losses, $20, 70, 130, 260$, are tested against an exponential distribution with mean $100$. Compute $A^2$.
>
> > [!answer]-
> > The fitted CDF values are $u = (0.1813,\ 0.5034,\ 0.7275,\ 0.9257)$, so $\ln u_i = (-1.7078, -0.6863, -0.3182, -0.0772)$ and $\ln(1 - u_{5-i}) = (-2.6, -1.3, -0.7, -0.2)$, i.e. $-x_{(5-i)}/100$. The weighted terms $(2i-1)[\ln u_i + \ln(1 - u_{5-i})]$ are $-4.3078, -5.9590, -5.0909, -1.9402$, which sum to $-17.2979$:
> >
> > $$
> > \begin{align*}
> > A^2 &= -4 - \frac{1}{4}(-17.2979) \\
> >   &= -4 + 4.3245 \\
> >   &= 0.3245
> > \end{align*}
> > $$
> >
> > A small $A^2$ means the fitted CDF tracks the data closely, including at the extremes.
