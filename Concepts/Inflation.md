---
verification:
  status: in_review
  confidence: null
  last_checked: 2026-09-28
  last_checked_by: agent:validate-v1
  content_hash: sha256:92ddec233bef8fd7ede8858e5460c993ad62e22c88079e714c67280fe7c57419
  sources:
    - "Anderson & Brown, Risk and Insurance (SOA study note P-21-05, 2005), sha256:1cb44e7f9ee240a9a0597a89dbf3a055ab70d07a8739132c75440051ee655922 — https://www.soa.org/globalassets/assets/files/edu/P-21-05.pdf — §VII Inflation PDF pp.10-11"
    - "SOA, Tables for Exam C (Fall 2009), exponential entry E[X^x] = theta(1 - e^(-x/theta)), PDF p.11, sha256:cefc3286baa0150b6520455e76104589f1187622212efe05a600926d0bf14e0f — https://www.soa.org/globalassets/assets/files/edu/edu-2009-fall-exam-c-table.pdf"
    - "SOA Exam P Sample Solutions (Aug 2026 revision), Q50 (PDF pp.17-18), Q243 (PDF p.72), Q328 (PDF p.91), sha256:efade84ea0ba886e00f07be817c94eae33d3b2ec5ca378e6cad4b74d77136135 — https://www.soa.org/globalassets/assets/files/edu/2026/spring/questions-solutions/2026-05-exam-p-sample-solutions.pdf"
    - "Werner & Modlin, Basic Ratemaking (CAS), Ch.6 Leveraged Effect of Limits on Severity Trend PDF pp.129-130; Ch.11 coinsurance notation PDF pp.221-222, sha256:6b214d4db52674df2e83343920c06781e491254bd77f27e32ba312faaff3782c — https://www.casact.org/sites/default/files/old/studynotes_werner_modlin_ratemaking.pdf"
    - "Friedland, Estimating Unpaid Claims Using Basic Techniques (CAS study note, 451 pp.), claim life cycle PDF p.14, reopened claims and IBNR PDF p.20, claims-made accident date PDF p.44, reported claim count triangle PDF p.66, sha256:5e9830823346d2001d9bdcebecd0d0d399cac32a9a63d5cf021a6c7f03d50464 — https://www.casact.org/sites/default/files/2021-03/5_Friedland.pdf"
  open_findings: 4
  open_critical: 0
  log: .verify/Concepts/Inflation.md
---

**Inflation** in an insurance context is growth in the underlying loss random variable over time, $X' = (1+r)X$. Many deductibles and benefit limits are stated in **fixed dollars** that do not rise with inflation, so inflation does not scale the insurer's cost proportionally. A fixed deductible **leverages** it, raising the insurer's expected payment by more than $r$; a fixed limit **damps** it, raising the capped payment by less than $r$.

> $$X' = (1 + r)\,X$$

> $$E[(X' - d)_+] = (1+r)\,E\!\left[\left(X - \tfrac{d}{1+r}\right)_+\right]$$

- The second identity is the whole mechanism: inflating losses against a fixed deductible $d$ is equivalent to holding losses fixed and **lowering the deductible** to $d/(1+r)$. A lower deductible means more claims pierce it and each pierces it by more.
- P-21-05's car policy shows both. At $10\%$ inflation a year, expected losses rise $46\%$ from year 1 to year 5. Under a fixed $500$ deductible, expected claim payments rise $54\%$ ($650$ to $998$); add a fixed maximum claim payment of $12{,}500$ and they rise only $34\%$ ($610$ to $819$).
- The losses **above** a fixed limit take the leverage instead. With a constant positive trend in total losses, basic limits trend $\le$ total limits trend $\le$ increased limits trend (Werner & Modlin), and their example dampens a $10\%$ total-limits severity trend to $3.5\%$ in basic-limits losses. Deductibles have the same leveraging effect, with the censoring below the deductible rather than above the limit.
- In **ratemaking**, monetary inflation is one of the factors that drive [[Loss Trend|loss trends]], alongside rising medical costs and advances in safety technology, and historical losses are trended to the cost level of the period the rates will cover.
- In **reserving**, an increase in the inflation rate is one of the changes in the economic environment that can alter claims experience. For an insurer in a stable environment, average claim values should rise down each column of a triangle only at the relevant inflation rate, so averages rising faster are a warning sign. Development techniques assume that past development patterns will account for inflationary forces; frequency-severity techniques reflect inflation explicitly instead, at the price of being highly sensitive to the inflation assumption.
- **Social inflation** is a significant rise in the propensity for lawsuits and the size of jury awards. Like general inflation, it has a disproportionate impact on increased-limits losses.
- On **Exam FM** the word belongs to interest theory instead: the syllabus lists *inflation and real rate of interest* together among the terms to define (see [[Real Rate of Interest]]).

![[Media/Figures/Inflation.svg|340]]

> [!example]- Leveraged Effect of Inflation on a Deductible {Example}
> Ground-up losses are $X \sim \text{Exponential}(\theta = 1000)$ with an ordinary deductible $d = 500$. Losses then inflate $10\%$.
>
> Compare the insurer's expected payment before and after.
>
> > [!answer]-
> > For an exponential, $E[(X-d)_+] = \theta e^{-d/\theta}$. After $10\%$ inflation $X' \sim \text{Exponential}(\theta' = 1100)$.
> >
> > $$\begin{align*}
> > E[(X - 500)_+] &= 1000\,e^{-0.5} \\
> > &= 606.5 \\[6pt]
> > E[(X' - 500)_+] &= 1100\,e^{-500/1100} \\
> > &= 1100\,e^{-0.4545} \\
> > &= 698.2
> > \end{align*}$$
> >
> > $$\frac{698.2}{606.5} - 1 = +15.1\%$$
> >
> > Ground-up losses rose $10\%$; the insurer's expected payment rose $15.1\%$. The deductible has effectively fallen to $500/1.1 = \$454.55$ in real terms, and the insurer picks up both the extra severity and the claims that newly exceed the threshold.

> [!example]- Inflation as a Calendar Year Effect in Reserving {Example}
> A liability insurer's reported age-to-age factors, with the latest diagonal (year ending $12/31/2024$) in bold:
>
> | AY | 12–24 | 24–36 | 36–48 | 48–60 |
> |---|---|---|---|---|
> | $2020$ | $1.42$ | $1.18$ | $1.09$ | **$1.11$** |
> | $2021$ | $1.44$ | $1.17$ | **$1.16$** | |
> | $2022$ | $1.41$ | **$1.28$** | | |
> | $2023$ | **$1.58$** | | | |
>
> Historical column averages excluding the latest diagonal: $1.42$, $1.18$, $1.09$, $1.04$. Average paid severity on closed claims rose $14\%$ during $2024$ against a $6\%$ historical trend.
>
> Diagnose and respond.
>
> > [!answer]-
> > Every factor on the latest diagonal exceeds its column average: $1.58$ against $1.42$, $1.28$ against $1.18$, $1.16$ against $1.09$ and $1.11$ against $1.04$. Measured against the development each column expects, the excess grows with maturity:
> >
> > $$
> > \begin{align*}
> > \text{12--24:} \quad \frac{0.58 - 0.42}{0.42} &= 38\% \\
> > \text{24--36:} \quad \frac{0.28 - 0.18}{0.18} &= 56\% \\
> > \text{36--48:} \quad \frac{0.16 - 0.09}{0.09} &= 78\% \\
> > \text{48--60:} \quad \frac{0.11 - 0.04}{0.04} &= 175\%
> > \end{align*}
> > $$
> >
> > Each diagonal of the triangle is one valuation date, so a rise along the latest diagonal, rather than down one accident-year row, points to something that happened during $2024$ itself. Paid severity on closed claims rose too ($14\%$ against a $6\%$ trend), so the payments themselves went up, not only the case reserves: the pattern of an inflation shift.
> >
> > Development factors averaged from the history assume that past development patterns will account for inflationary forces, and this diagonal says they no longer do. A frequency-severity method reflects inflation explicitly instead, but its estimate is highly sensitive to the inflation assumption, so test the rate selected. If the higher inflation is expected to persist, the severity [[Loss Trend|trend]] used in pricing needs re-selecting as well.
