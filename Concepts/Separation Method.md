---
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:1dd12e44c7ecf58455ebaf61051d4a428d3a7b9d077b0f37bbf143fc009f76d1
  sources: []
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Separation Method.md
---
The **Separation Method** models each incremental cell of a [[Development Triangle|development triangle]] as a development-age effect times a calendar-year (diagonal) effect, separating claims [[Inflation|inflation]] from the pattern of delays. [[Testing the Assumptions of Age-to-Age Factors (Venter - 1998)|Venter (1998)]] uses it to build [[Calendar Year Effect|diagonal effects]] into the emergence model itself. The expected incremental loss of accident year $w$ at age $d$ is

> $$E[q(w,d)] = f(d)\,g(w+d)$$

- $q(w,d)$ is the incremental loss of accident year $w$ at age $d$.
- $f(d)$ is the age term.
- $g(w+d)$ is the diagonal term, one for each diagonal.

The usual reading of $g(w+d)$ is the cumulative claims inflation that applies to diagonal $w + d$ since the first accident year. A constant inflation rate leaves a single inflation parameter, with

> $$g(w+d) = (1+j)^{w+d}$$

- $j$ is the annual inflation rate.

To fit the model, start from reasonable values, fix all but one set of parameters and fit that set by least squares, then rotate until the estimates converge. A non-linear search does the same job.

> [!example]- What are the age and diagonal terms of this triangle? {Example}
> Incremental paid losses ($\$000$), already adjusted for differences in exposure between accident years, are below. Take $g = 1$ on the 2022 diagonal.
>
> | AY | Age 0 | Age 1 | Age 2 |
> | :--- | ---: | ---: | ---: |
> | 2022 | 1,000.0 | 630.0 | 220.5 |
> | 2023 | 1,050.0 | 661.5 | |
> | 2024 | 1,102.5 | | |
>
> > [!answer]-
> > - The three age-0 cells lie on the three diagonals, so $f(0) = 1{,}000$, $g(2023) = 1{,}050/1{,}000 = 1.05$ and $g(2024) = 1{,}102.5/1{,}000 = 1.1025$.
> > - The 2022 row then gives the other age terms: $f(1) = 630/1.05 = 600$ and $f(2) = 220.5/1.1025 = 200$.
> > - The one remaining cell checks: $600 \times 1.1025 = 661.5$, as observed.
> > - The triangle fits the model exactly, with inflation of 5% a year.

## Accident-year effects

Accident-year levels can be added, so the expected incremental loss is

> $$E[q(w,d)] = f(d)\,h(w)\,g(w+d)$$

- $h(w)$ is the accident-year term.

That is too many parameters unless many are set equal or written as trends, $f(d) = (1+i)^d$ and $h(w) = h(1+k)^w$. With all three trends constant, the expected incremental loss is

> $$h(1+i+j+ij)^d\,(1+k+j+jk)^w$$

The inflation rate $j$ appears only inside the other two trends, so it cannot be separated.

Venter suggests keeping the calendar-year trend and dropping the accident-year one, especially once the triangle has been normalized for accident-year changes.

## Forecasting the diagonal effects

Future cells lie on diagonals the data has not reached, so $g$ must be projected. The latest diagonal effects can be carried forward as the estimate of future inflation, informed by what drives them in company operations. [[Measuring the Variability of Chain Ladder Reserve Estimates (Mack - 1994)|Mack (1994)]] notes that the [[Chain Ladder Method|chain ladder]] already extrapolates a constant inflation rate left in the data. The separation model makes that rate explicit, and so it can be changed.

> [!example]- For the triangle above, what are the unpaid claims if inflation stays at 5%, and if it runs at 10% from 2025? {Example}
> - At 5%, $g(2025) = 1.05^3 = 1.157625$ and $g(2026) = 1.05^4 = 1.215506$.
> - The future cells are $200 \times 1.157625 = 231.5$ (AY 2023, age 2), $600 \times 1.157625 = 694.6$ (AY 2024, age 1) and $200 \times 1.215506 = 243.1$ (AY 2024, age 2).
> - The unpaid claims at 5% are $231.5 + 694.6 + 243.1 = 1{,}169.2$.
> - The chain ladder factors on the cumulative triangle are $3{,}341.5/2{,}050 = 1.63000$ and $1{,}850.5/1{,}630 = 1.13528$.
> - They give $1{,}711.5 \times 0.13528 = 231.5$ for 2023 and $1{,}102.5 \times (1.63000 \times 1.13528 - 1) = 937.7$ for 2024, the same $1{,}169.2$.
> - At 10% from 2025, $g(2025) = 1.1025 \times 1.10 = 1.21275$ and $g(2026) = 1.334025$.
> - The future cells are $200(1.21275) = 242.6$, $600(1.21275) = 727.7$ and $200(1.334025) = 266.8$, so the unpaid claims are $1{,}237.0$.
> - That is $67.8$ more than the chain ladder, which has no separate inflation parameter to change.
