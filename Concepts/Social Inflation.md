---
aliases:
  - Tort Trend
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:180a3208a51b11b178fbceb63931b634dbe121e15c97cbe6c5280106f6e4fcf2
  sources: []
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Social Inflation.md
---
**Social Inflation** is the growth in liability claim costs beyond what economic inflation explains, driven by changes in litigation, in the law and in society's attitude to who should pay for harm. The Geneva Association's 2020 report treats it as the part of claims trend that comes from the claims environment rather than from prices and wages, and the SOA's tort law note discusses the same effect as a tort trend. Actuaries usually measure it as a residual: the observed [[Loss Trend|severity trend]] with general inflation divided out.

> $$1 + s = \frac{1 + t}{1 + e}$$

> $$\text{Trend}_{\text{layer}} = (1 + t)^{\alpha} - 1$$

> $$\Delta R = \sum_{k \ge 1} P_k \left[(1 + s)^{k} - 1\right]$$

- **Symbols:** $t$ is the observed annual severity trend, $e$ is the economic inflation that applies to the line (a blend of medical, wage and price indices), and $s$ is the social-inflation component. In the second line, $\alpha$ is the shape of a single-parameter [[Pareto Distribution|Pareto]] severity, for which a uniform trend $t$ raises the cost of any layer above the Pareto's threshold by the factor $(1 + t)^{\alpha}$. In the third, $P_k$ is the payment on open claims expected $k$ years after the valuation date at the inflation already in the reserve, and $\Delta R$ is what social inflation adds to the [[Unpaid Claims|unpaid claims]].
- **Drivers:** The commonly cited drivers are third-party litigation funding, which finances more cases through to trial, heavy attorney advertising, which recruits claimants, and anchoring, where plaintiff's counsel suggests very large figures for non-economic damages. Others are the erosion of earlier [[Tort Reform|tort reform]] by courts and legislatures, wider theories of liability, falling public trust in large companies, and the jury awards of \$10 million or more known as [[Nuclear Verdicts|nuclear verdicts]].
- **Lines affected:** Commercial auto (especially trucking), [[Products Liability|products liability]], [[Premises Liability|premises liability]], medical [[Professional Liability Insurance|professional liability]], [[Directors and Officers Liability Insurance|D&O]] and the [[Umbrella Liability Insurance|umbrella and excess]] layers above them are most exposed. Short-tail property lines are barely affected, because they involve little litigation.
- **Effect on reserving:** Social inflation acts on every claim settled in a calendar period, whatever its accident year, so it is a [[Calendar Year Effect|calendar-year effect]] on a [[Development Triangle|development triangle]]. Development factors fitted to a period of lower trend understate emergence, and the shortfall shows up later as adverse development on old accident years.
- **Effect on pricing:** A severity trend selected from economic indices alone understates future costs, so rates fall behind. Because trend is leveraged in excess layers, [[Increased Limits|increased limits factors]] drift upward over time, and excess insurers and reinsurers see the effect first and most strongly.
- **Relation to superimposed inflation:** [[Superimposed Inflation|Superimposed inflation]] is the reserving term used in Australia and in the reserving literature for any calendar-period cost growth beyond economic inflation. Social inflation is the part of it that comes from the legal and social environment.
- **Measurement is hard:** $s$ is a residual, so it also absorbs changes in mix, in claims handling and in reporting, and it is volatile from year to year. A sound analysis checks the residual against direct evidence, such as attorney involvement rates, verdict sizes and time to settlement, before attributing it to the legal environment.

> [!example]- Splitting a Severity Trend and Applying It to an Excess Layer {Example}
> A commercial auto liability insurer's average closed-claim severity rose from \$50,000 to \$73,466 over five years. A blend of medical and wage inflation suitable for the line ran at $3.5\%$ a year. Ground-up severity follows a single-parameter Pareto with $\theta = \$200{,}000$ and $\alpha = 2$, and a reinsurer writes the layer \$1,000,000 xs \$1,000,000.
>
> (a) Estimate the annual social-inflation component. (b) Find one year's trend in the layer's expected cost, and split it into its economic and social parts.
>
> > [!answer]-
> > **(a)** Fit the annual severity trend, then divide out the economic part.
> > $$
> > \begin{align*}
> > 1 + t &= \left(\frac{73{,}466}{50{,}000}\right)^{1/5} \\
> > &= 1.0800 \\
> > 1 + s &= \frac{1.0800}{1.035} \\
> > &= 1.0435
> > \end{align*}
> > $$
> > About $4.3\%$ a year of the $8\%$ severity trend is social inflation.
> >
> > **(b)** For a single-parameter Pareto, the layer's expected cost per claim is $\frac{\theta^{\alpha}}{\alpha - 1}\left(a^{1-\alpha} - b^{1-\alpha}\right)$, and trend multiplies $\theta$ by $1 + t$.
> > $$
> > \begin{align*}
> > E[\text{Layer}] &= \frac{200{,}000^2}{1}\left(\frac{1}{1{,}000{,}000} - \frac{1}{2{,}000{,}000}\right) \\
> > &= 20{,}000 \\
> > E[\text{Layer}]_{\text{trended}} &= 20{,}000 \times 1.08^2 \\
> > &= 23{,}328 \\
> > \text{Layer trend} &= 1.1664 - 1 \\
> > &= 16.6\%
> > \end{align*}
> > $$
> > Economic inflation alone would raise the layer by $1.035^2 - 1 = 7.1\%$, so the social part of the layer's trend is $1.1664 / 1.0712 - 1 = 8.9\%$. The ground-up mean, $\alpha\theta/(\alpha - 1)$, rises only $8\%$, from \$400,000 to \$432,000. The leverage roughly doubles both components in the layer, which is why reinsurers price social inflation more heavily than primary insurers do.

> [!example]- Social Inflation Missed in a Reserve {Example}
> A general liability reserve for open claims was set using economic inflation only. At that inflation, the expected payments are \$40 million, \$30 million, \$20 million and \$10 million in the next four calendar years. If social inflation of $4\%$ a year continues on top, how much is the reserve short?
>
> > [!answer]-
> > Each future payment picks up one more year of the $4\%$ for each year it lies beyond the valuation date.
> > $$
> > \begin{align*}
> > \Delta R &= 40(1.04 - 1) + 30(1.04^2 - 1) + 20(1.04^3 - 1) + 10(1.04^4 - 1) \\
> > &= 1.600 + 2.448 + 2.497 + 1.699 \\
> > &= 8.244
> > \end{align*}
> > $$
> > The reserve is short by about \$8.2 million, or $8.2\%$ of the \$100 million carried. The longer the payout, the larger the effect, and the shortfall emerges year by year as adverse development on every open accident year at once.

> [!tip]- How it appears on the exam
> - **GI-201:** Objective 8 asks candidates to discuss social inflation and its effect on general insurance. Expect a written question listing the drivers named in the Geneva Association report and explaining which lines are hit hardest and why.
> - **GI-201:** Objective 2 pairs tort trends with [[Tort Reform|tort reform]]. A question may ask how reform measures, such as caps on non-economic damages, disclosure of litigation funding or limits on anchoring, are meant to slow social inflation, and why their effect tends to fade.
> - **Calculations:** A short calculation may separate a social component from an observed trend, or show why the trend in an excess layer is larger than the ground-up trend. Another may show how a calendar-year trend left out of a reserve becomes adverse development.

> [!warning]- Exam traps
> - **Subtracting instead of dividing:** The social component is $(1 + t)/(1 + e) - 1$, not $t - e$. With $t = 8\%$ and $e = 3.5\%$, subtracting gives $4.5\%$ instead of $4.3\%$, and the gap widens at higher trends.
> - **Applying ground-up trend to a layer:** An excess layer's trend is larger than the ground-up trend because claims that were below the attachment cross into it. Pricing an excess layer with the ground-up $8\%$ understates the trend, here by half.
> - **Treating it as an accident-year effect:** Social inflation lands on the payments of a calendar period, including those on old accident years. An answer that only raises the latest accident year's ultimate misses the adverse development on every open year.
> - **Calling every residual social inflation:** A rise in severity after removing economic inflation can also come from a change in mix, in claims handling or in case reserving. Say what evidence would link the residual to litigation before attributing it.
