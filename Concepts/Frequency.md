---
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:4277cc980e9520dedf0584062a7932d64714393c9d252db47f171146634af491
  sources: []
  open_findings: 0
  log: .verify/Concepts/Frequency.md
---

**Frequency** is the number of claims per unit of exposure — how often losses happen, as distinct from [[Severity|how much they cost]].

> $$\text{Frequency} = \frac{\text{Number of Claims}}{\text{Earned Exposures}}$$

> $$\text{Pure Premium} = \text{Frequency} \times \text{Severity}$$

- Frequency is only meaningful **relative to its exposure base** and its claim definition. Claims per car-year, per $\$100$ of payroll and per house-year are different quantities, and counting *reported* claims, *closed* claims or claims *with payment* gives three different frequencies from the same data.
- Frequency is usually the **more stable and more credible** of the two components: claim counts are less skewed than claim dollars, so a modest volume of exposure supports a credible frequency estimate long before it supports a credible severity estimate.
- Frequency is also **less inflation-sensitive**. Severity tracks medical, wage and repair-cost inflation; frequency responds to behaviour, exposure quality, weather and coverage terms. This is why the two are trended separately (see [[Loss Trend]]).
- **Claims-only frequency understates true development.** Frequency computed on reported counts at an immature age is biased low, since claims are still being reported — the counts must be developed to ultimate with their own [[Claim Count Triangle|count triangle]].
- Frequency is the diagnostic that separates a **coverage or exposure** problem from a **cost** problem: rising frequency at flat severity points at underwriting, mix or the claim environment; flat frequency with rising severity points at inflation or the legal environment.

![[Media/Figures/Frequency.svg|340]]

> [!example]- Computing Frequency and the Pure Premium {Example}
> A workers compensation book has $25{,}000$ employee-years of exposure in accident year $2023$ and $1{,}750$ ultimate reported claims. Ultimate average [[Severity|severity]] is projected at $\$18{,}000$.
>
> Compute frequency and pure premium.
>
> > [!answer]-
> > $$\begin{align*}
> > \text{Frequency} &= \frac{1{,}750}{25{,}000} \\
> > &= 0.070 \text{ claims per employee-year} \\[6pt]
> > \text{Pure premium} &= 0.070 \times \$18{,}000 \\
> > &= \$1{,}260 \text{ per employee-year}
> > \end{align*}$$
> >
> > Both figures must be on an **ultimate** basis. Using reported counts at $24$ months instead of developed counts would understate frequency, and — because severity is losses over counts — would simultaneously *overstate* severity, partially masking the error in the pure premium. Checking frequency and severity separately against expectation is what catches it.

> [!example]- Decomposing a Deteriorating Loss Ratio {Example}
> A personal auto book's accident year results, all at ultimate:
>
> | AY | Exposures | Claims | Losses |
> |---|---|---|---|
> | $2022$ | $50{,}000$ | $3{,}000$ | $\$12{,}000{,}000$ |
> | $2024$ | $52{,}000$ | $3{,}744$ | $\$17{,}160{,}000$ |
>
> The pure premium rose from $\$240$ to $\$330$ per exposure. Which component drove it, and what does that imply?
>
> > [!answer]-
> > $$\begin{align*}
> > \text{Freq}_{2022} &= \frac{3{,}000}{50{,}000} = 0.0600 \\
> > \text{Freq}_{2024} &= \frac{3{,}744}{52{,}000} = 0.0720 \\[6pt]
> > \text{Sev}_{2022} &= \frac{\$12{,}000{,}000}{3{,}000} = \$4{,}000 \\
> > \text{Sev}_{2024} &= \frac{\$17{,}160{,}000}{3{,}744} = \$4{,}583
> > \end{align*}$$
> >
> > Over two years:
> >
> > $$\begin{align*}
> > \text{Frequency change} &= \frac{0.0720}{0.0600} - 1 = +20.0\% \\
> > \text{Severity change} &= \frac{4{,}583}{4{,}000} - 1 = +14.6\%
> > \end{align*}$$
> >
> > Check: $1.200 \times 1.146 = 1.375$, which reproduces the $+37.5\%$ move in pure premium ($\$240 \to \$330$) exactly — the decomposition is multiplicative, not additive.
> >
> > Both components moved, but **frequency moved more**, and that points somewhere different from inflation: more accidents per car-year suggests a mix shift toward higher-risk drivers or territories, a relaxation in underwriting, or a change in what is being reported as a claim. The corrective actions differ — a severity problem is fixed with rate and limits, a frequency problem with underwriting and classification.
