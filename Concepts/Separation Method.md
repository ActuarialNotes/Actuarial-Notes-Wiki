---
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:8c629cf7a5c3a53291ebc8ae75b976b9db27f55da426569555ba306bc9f9407e
  sources: []
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Separation Method.md
---

**Separation Method** models each incremental cell of a [[Development Triangle|development triangle]] as a development-age effect times a calendar-year (diagonal) effect, separating claims [[Inflation|inflation]] from the pattern of delays. [[Testing the Assumptions of Age-to-Age Factors (Venter - 1998)|Venter (1998)]] presents it as the way to build [[Calendar Year Effect|diagonal effects]] into the emergence model itself, citing Taylor's "Separation of Inflation and Other Effects from the Distribution of Non-Life Insurance Claim Delays" (1977):

> $$E[q(w,d)] = f(d)\,g(w+d)$$

- **The parameters.** $q(w,d)$ is the incremental loss of accident year $w$ at age $d$, and $f(d)$ is the age term. $g(w+d)$ is the diagonal term, and every diagonal has one. Its usual reading is the cumulative claims inflation that applies to diagonal $w + d$ since the first accident year. A constant rate $j$ leaves a single inflation parameter:

> $$g(w+d) = (1+j)^{w+d}$$

- **Adding accident years.** Accident-year levels can be added, $E[q(w,d)] = f(d)h(w)g(w+d)$. That is too many parameters unless many are set equal, or written as trends: $f(d) = (1+i)^d$ and $h(w) = h(1+k)^w$. With all three trends constant, $j$ cannot be separated, because the model collapses to $h(1+i+j+ij)^d(1+k+j+jk)^w$. Venter suggests keeping the calendar-year trend and dropping the accident-year one, especially once the triangle has been normalized for accident-year changes.
- **Fitting.** Start from reasonable values, fix all but one set of parameters and fit that set by least squares, then rotate until the estimates converge. A non-linear search does the same job.
- **Forecasting.** Future cells lie on diagonals the data has not reached, so $g$ must be projected. The latest diagonal effects can be carried forward as the estimate of future inflation, informed by what drives them in company operations. [[Measuring the Variability of Chain Ladder Reserve Estimates (Mack - 1994)|Mack (1994)]] notes that the [[Chain Ladder Method|chain ladder]] already extrapolates a constant inflation rate left in the data. The separation model makes that rate explicit, and changeable.

> [!example]- Separating Inflation, and Projecting It {Example}
> Incremental paid losses (\$000), already adjusted for differences in exposure between accident years:
>
> | AY | Age 0 | Age 1 | Age 2 |
> |---|---|---|---|
> | $2022$ | $1{,}000.0$ | $630.0$ | $220.5$ |
> | $2023$ | $1{,}050.0$ | $661.5$ | |
> | $2024$ | $1{,}102.5$ | | |
>
> (a) Fit $q(w,d) = f(d)g(w+d)$, taking $g = 1$ on the 2022 diagonal. (b) Estimate the unpaid claims if inflation continues at the rate the diagonals show, and compare the chain ladder. (c) Re-estimate them if inflation runs at $10\%$ from 2025.
>
> > [!answer]-
> > **(a)** The three age-0 cells lie on the three diagonals, so they give $f(0)$ and the diagonal terms directly, and the 2022 row then gives the other age terms:
> >
> > $$
> > \begin{align*}
> > f(0) &= 1{,}000 \\
> > g(2023) &= 1{,}050/1{,}000 \\
> > &= 1.05 \\
> > g(2024) &= 1{,}102.5/1{,}000 \\
> > &= 1.1025 \\
> > f(1) &= 630/1.05 \\
> > &= 600 \\
> > f(2) &= 220.5/1.1025 \\
> > &= 200
> > \end{align*}
> > $$
> >
> > Check the one remaining cell: $600 \times 1.1025 = 661.5$, as observed. The triangle fits the model exactly, with inflation of $5\%$ a year.
> >
> > **(b)** At $5\%$, $g(2025) = 1.157625$ and $g(2026) = 1.215506$:
> >
> > $$
> > \begin{align*}
> > \text{AY 2023, age 2} &= 200 \times 1.157625 \\
> > &= 231.5 \\
> > \text{AY 2024, age 1} &= 600 \times 1.157625 \\
> > &= 694.6 \\
> > \text{AY 2024, age 2} &= 200 \times 1.215506 \\
> > &= 243.1 \\
> > \text{Unpaid} &= 231.5 + 694.6 + 243.1 \\
> > &= 1{,}169.2
> > \end{align*}
> > $$
> >
> > The chain ladder factors on the cumulative triangle are $3{,}341.5/2{,}050 = 1.63000$ and $1{,}850.5/1{,}630 = 1.13528$. They give $1{,}711.5 \times 0.13528 = 231.5$ for 2023 and $1{,}102.5 \times (1.63000 \times 1.13528 - 1) = 937.7$ for 2024, the same $1{,}169.2$. A steady $5\%$ inflation in the data is simply carried forward by the chain ladder.
> >
> > **(c)** At $10\%$ from 2025, $g(2025) = 1.1025 \times 1.10 = 1.21275$ and $g(2026) = 1.334025$:
> >
> > $$
> > \begin{align*}
> > \text{Unpaid} &= 200(1.21275) + 600(1.21275) \\
> > &\quad + 200(1.334025) \\
> > &= 242.6 + 727.7 + 266.8 \\
> > &= 1{,}237.0
> > \end{align*}
> > $$
> >
> > That is $67.8$ more than the chain ladder, which cannot respond to a change in the inflation rate because it has no separate inflation parameter to change.
