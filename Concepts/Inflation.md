---
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:92ddec233bef8fd7ede8858e5460c993ad62e22c88079e714c67280fe7c57419
  sources: []
  open_findings: 0
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
