---
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:db7b0cb0622430c1d93d296e616f6c29eb74d9ccea759bc93dbf7f53015467b9
  sources: []
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Reasonableness Testing.md
---

**Reasonableness testing** is the set of checks an actuary applies to data, intermediate results and final estimates before relying on them. It covers ratemaking indications, unpaid claim estimates and stochastic output alike. The questions are whether they are free of errors, consistent with each other, and consistent with history and with what is known about the business.

> $$\frac{A}{E} = \frac{\text{Actual emergence}}{\text{Expected emergence}}$$

> $$\text{Expected emergence} = \text{IBNR} \times \frac{p_{t+\Delta} - p_t}{1 - p_t}$$

- $p_t = 1/\text{CDF}_t$ is the expected percentage reported (or paid) at age $t$. The second block is what the prior valuation implied would emerge by the next one. It holds for both chain ladder and BF IBNR, because each equals its own ultimate times $1 - p_t$.
- **Ratemaking data and analyses (Exam 5).**
  - Reconcile premium and losses to the financial records ([[Data Quality]], ASOP 23).
  - Compare the extract with the prior one.
  - Check average premium, severity, frequency and loss ratio by year for jumps that rate changes and trend do not explain.
  - Confirm that exposure definitions and coding have not changed.
- **Reserving data and analyses (Exam 5).** Run the triangle diagnostics ([[Data Diagnostic Analysis]]). Then test the *selected* ultimates by the ratios they imply: ultimate claim ratios, severities, frequencies and pure premiums by year, IBNR-to-case, and paid-to-ultimate. See [[Reserve Adequacy]].
- **Monitoring (Exam 5).** Interim valuations hold the prior ultimates and score them with [[Actual vs Expected Analysis|actual versus expected]] emergence and a [[Roll Forward Analysis|roll-forward]].
- **Unpaid claim estimates (Exam 7).** Compare paid against reported, and chain ladder against BF, Cape Cod and Benktander. A credibility-weighted estimate should lie between the chain ladder and the a priori. Excess layers and ceded amounts should develop more slowly than ground-up losses, and net should never exceed gross.
- **Distribution output (Exam 7).** Apply Shapland's patterns to the [[Unpaid Claim Distribution|unpaid claim distribution]]: standard errors rising toward recent years, CoVs falling, and plausible extremes. Then use Meyers' retrospective test: across many triangles, the predicted percentiles of the actual outcomes should be **uniform**. Uniformity is judged with a p-p plot and a Kolmogorov-Smirnov band of $\pm 136/\sqrt{n}$ percentage points at the $5\%$ level.

> [!example]- A Jump in Average Premium {Example}
> A ratemaking extract shows earned premium per earned exposure of $\$820$, $\$845$ and $\$1{,}030$ for 2022–2024. The only rate changes were $+3\%$ in mid-2023 and $+2\%$ in 2024, and premium trend runs about $2\%$ a year.
>
> Is the data reasonable?
>
> > [!answer]-
> > $$
> > \begin{align*}
> > 845 / 820 &= 1.030 \\
> > 1{,}030 / 845 &= 1.219
> > \end{align*}
> > $$
> >
> > A $22\%$ jump is not credible without a cause. The rate changes and trend explain at most about $7\%$ (a $3\%$ and a $2\%$ rate change plus $2\%$ trend). The likely candidates are:
> >
> > - **exposures missing or mis-counted** in 2024, such as a system conversion or a change from car-years to policies;
> > - **premium duplicated**, for example endorsements double-counted;
> > - **a genuine mix shift**, such as a new high-premium program.
> >
> > The first two are errors and must be corrected before any indication is run, since they would flow straight into the loss ratio. The third is real, but it changes the comparability of years and needs its own adjustment. The test does not say which it is. It says the data cannot be used until someone finds out.

> [!example]- Actual Versus Expected at an Interim Valuation {Example}
> At the prior year-end, AY 2024 had reported losses of $6{,}000$, $\text{CDF}_{12} = 2.000$ and $\text{CDF}_{24} = 1.250$, giving a chain ladder IBNR of $6{,}000$. Twelve months later reported losses are $10{,}500$.
>
> Compute A/E and the implied updates.
>
> > [!answer]-
> > $$
> > \begin{align*}
> > E &= 6{,}000 \times \frac{0.80 - 0.50}{1 - 0.50} \\
> > &= 3{,}600 \\
> > A &= 10{,}500 - 6{,}000 \\
> > &= 4{,}500 \\
> > A/E &= 1.25
> > \end{align*}
> > $$
> >
> > Emergence ran $900$ above expectation. Re-running the chain ladder moves the ultimate from $12{,}000$ to $10{,}500 \times 1.25 = 13{,}125$, which is $+1{,}125$. Keeping the prior ultimate as an a priori (BF) gives $10{,}500 + 0.20 \times 12{,}000 = 12{,}900$, which is $+900$.
> >
> > One period's A/E is not yet a trend. Before choosing, check whether the excess came from one large claim (then a BF-type response is right) or from broad-based emergence (then the pattern may have changed). Paid A/E and counts will tell which.

> [!example]- Validating a Model on Outcomes {Example}
> A reserving model is run on $200$ historical triangles whose outcomes are now known. For each, the percentile of the actual outcome within the predicted distribution is recorded. The largest gap between the sorted percentiles and a uniform is $D = 11.3$ points, and the p-p plot is a slanted "S".
>
> Does the model validate?
>
> > [!answer]-
> > $$
> > \begin{align*}
> > \text{Critical value} &= \frac{136}{\sqrt{200}} \\
> > &= 9.6
> > \end{align*}
> > $$
> >
> > $D = 11.3 > 9.6$, so uniformity is rejected at $5\%$. A slanted "S" means too many outcomes fell in the extreme low and high percentiles, so the predicted distribution is **too light in the tails**. Meyers found exactly this for Mack on incurred data.
> >
> > On any single line of $50$ triangles the critical value would be $136/\sqrt{50} = 19.2$, and the same $D$ would pass. That is why the test must be pooled across many triangles to detect a bias of this size.
