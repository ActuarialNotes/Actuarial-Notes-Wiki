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

**Inflation** in an insurance context is growth in the underlying loss random variable over time, $X' = (1+r)X$. Because policy provisions — deductibles, limits, retentions — are stated in **fixed dollars**, inflation does not scale the insurer's cost proportionally: it is **leveraged**, raising the insurer's payment by more than $r$.

> $$X' = (1 + r)\,X$$

> $$E[(X' - d)_+] = (1+r)\,E\!\left[\left(X - \tfrac{d}{1+r}\right)_+\right]$$

- The second identity is the whole mechanism: inflating losses against a fixed deductible $d$ is equivalent to holding losses fixed and **lowering the deductible** to $d/(1+r)$. A lower deductible means more claims pierce it and each pierces it by more.
- The leverage runs the other way in an **excess layer**: a fixed limit caps the insurer's payment, so a ground-up inflation of $r$ produces less than $r$ growth for the primary insurer and more than $r$ for the excess or reinsurance layer. This is why excess and reinsurance rates move so violently with modest changes in ground-up severity.
- In **ratemaking** inflation is the main driver of [[Loss Trend|severity trend]], and its leveraged effect is why a $5\%$ economic trend can produce an $8\%$ trend in the insurer's costs on a book with fixed deductibles.
- In **reserving** inflation is a **calendar year** effect: a shift in the inflationary or legal environment raises payments and case reserves on *every open accident year at once*, appearing as an elevated diagonal in the triangle rather than a change in one row. Accident-year development factors, which are estimated down columns, do not anticipate it.
- **Social inflation** — rising jury awards, litigation funding, broadened liability theories — behaves the same way in the triangle and is the reason long-tail reserve estimates can prove inadequate across an entire book simultaneously.

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
> > &= 698.1
> > \end{align*}$$
> >
> > $$\frac{698.1}{606.5} - 1 = +15.1\%$$
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
> > Every factor on the latest diagonal exceeds its column history, and the excess grows with maturity — $+11\%$ at $12$–$24$ but $+7$ points at $48$–$60$ where development had been nearly complete. Combined with the severity jump, this is an **inflation shock**, not a change in the reporting pattern.
> >
> > The distinction matters for the response:
> >
> > - Selecting factors that average the elevated diagonal into the history would **spread a one-time level shift across all future development**, over-stating young years and under-stating old ones.
> > - Excluding the diagonal understates the reserves, because the higher payments are real and on the books.
> >
> > The standard treatment is to recognize the shift explicitly: estimate the level change (here roughly $8\%$ above trend), apply it to the *unpaid* portion of every open accident year, and select development factors from the pre-shock history. Where the shock is expected to persist, the severity [[Loss Trend|trend]] used for both reserving and pricing must also be re-selected — an inflation shock that changes the run rate is a pricing event as much as a reserving one.
