---
id: "masi-an-040"
exam: "Exam MAS-I"
topic: "Random Variable"
learning_objective: "Statistics"
difficulty: hard
type: free-entry
bloom: analyze
wiki_link:
  - Concepts/Random+Variable
  - Concepts/Cumulative+Distribution+Function+(CDF)
  - Concepts/Expected+Value
answer: "550"
points: 1
verification:
  status: verified
  confidence: medium
  last_checked: 2026-10-10
  last_checked_by: agent:validate-v1
  content_hash: sha256:7a58e2d356998e21990ff268f152182f19ae22d7b9ce3c5377c5c1b55dfade1a
  sources:
    - "Frees et al., Loss Data Analytics (open text), ch.3 Modeling Loss Severity, 3.4.1 E(Y^L) = integral of the survival function, sha256:263021bf543b04b2881284b38b7dcbd0586b78daec371b88a1eefcd362dff732 — https://openacttexts.github.io/Loss-Data-Analytics/ChapSeverity.html"
    - "Siegrist, randomservices.org, ch.3 Mixed Distributions, mixed distributions, sha256:f19d040000526541dd0d61b1e33827f8c81d7cf638ec9ff87e76af9dc8dcc566 — https://www.randomservices.org/random/dist/Mixed.html"
    - "CAS Exam MAS-I Content Outline 2026, Domain B tasks 1-9 and readings (Hogg, Tse), PDF p.4; text references (Hogg B sections incl. 2.8; Tse 2.2-2.5, 10.1, 10.2, 11.1, 12.1, 12.3, 13.2), PDF p.6, sha256:245892366dea073ff44e89b3ac2ae1401517b127d36d51c8a1198b3185faa2ed — https://www.casact.org/sites/default/files/2026-06/MASI_ContentOutline_2026.pdf"
  open_findings: 0
  open_critical: 0
  log: .verify/questions/exam-mas-i/masi-an-040.md
---

The annual payment $Y$ on a policy has the cumulative distribution function

$$
F_Y(y) = \begin{cases}
0, & y < 0 \\
0.2 + 0.0005\,y, & 0 \le y < 1{,}000 \\
1, & y \ge 1{,}000
\end{cases}
$$

Calculate $E[Y]$. Give your answer as a whole number.

## Explanation

Read the structure off the CDF before integrating. It jumps at two points and rises linearly in between:

- at $y = 0$: a point mass $F_Y(0) = 0.2$ — no payment;
- on the open interval from 0 to 1,000: a density $f_Y(y) = 0.0005$, carrying probability 0.0005 times 1,000, or 0.5;
- at $y = 1{,}000$: a point mass $P(Y = 1{,}000) = 1 - F_Y(1{,}000^-) = 1 - 0.7 = 0.3$ — the payment is capped at a limit of 1,000.

$Y$ is a mixed random variable, so its mean adds the point masses to the integral over the continuous part:

$$
E[Y] = 0(0.2) + \int_0^{1{,}000} y\,(0.0005)\,dy + 1{,}000(0.3) = 250 + 300 = 550
$$

As a check, $E[Y] = \int_0^{\infty} \big(1 - F_Y(y)\big)\,dy = \int_0^{1{,}000} (0.8 - 0.0005\,y)\,dy = 800 - 250 = 550$, which handles both masses automatically. The answer is **550**.

**Common wrong entries**

- **250** — integrating $y f_Y(y)$ over the continuous part only and missing the mass of 0.3 sitting at the limit.
- **500** — treating $Y$ as uniform on $(0, 1{,}000)$ because the CDF is linear there, ignoring both jumps.
- **450** — integrating $F_Y(y)$ instead of the survival function $S_Y(y) = 1 - F_Y(y)$ from 0 to 1,000.
