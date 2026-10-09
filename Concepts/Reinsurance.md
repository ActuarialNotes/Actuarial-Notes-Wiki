---
verification:
  status: verified
  confidence: medium
  last_checked: 2026-10-09
  last_checked_by: agent:validate-v1
  content_hash: sha256:0446cfc5f30369c0efdf8466e15a8dfeaa10ff4567dc8967410add2bf9be6956
  sources:
    - "Friedland, Reserving for Reinsurance (CAS Exam 7 study note), Ch.1 printed pp.6-22 (PDF pp.8-24), Ch.3 printed pp.48-49, 53 (PDF pp.50-51, 55), sha256:6da495a26206ececf40a3c3fc8fb3db04556c940242f5bcffe2b21b7e4445ceb — https://www.casact.org/sites/default/files/2022-11/Exam7_Study_Note_Friedland.pdf"
    - "Friedland, Estimating Unpaid Claims Using Basic Techniques (CAS, 3rd ed. 2010), Ch.14 pp.330-332 (PDF pp.336-338), sha256:5e9830823346d2001d9bdcebecd0d0d399cac32a9a63d5cf021a6c7f03d50464 — https://www.casact.org/sites/default/files/2021-03/5_Friedland.pdf"
    - "Werner & Modlin, Basic Ratemaking (CAS, 5th ed. May 2016), Ch.6 p.99 (PDF p.111), Ch.7 p.137 (PDF p.149), sha256:6b214d4db52674df2e83343920c06781e491254bd77f27e32ba312faaff3782c — https://www.casact.org/sites/default/files/2021-03/5_Werner_Modlin.pdf"
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Reinsurance.md
---

**Reinsurance** is insurance bought by an insurer. The **cedant** transfers part of its exposure to a **reinsurer** for a ceded premium, reducing net retained loss, buying protection against large or accumulated losses, and freeing surplus to support more writings.

> $$\text{Net} = \text{Gross} - \text{Ceded}$$

> $$\text{Ceded}_{\text{XOL}} = \min\!\left(\max(X - R,\, 0),\, L\right)$$

**Proportional** — the reinsurer takes a share of premium and losses alike:

- **Quota share** — a flat percentage of every policy. Ceded losses are a scalar multiple of gross, so the ceded triangle has the same shape as the gross one. Provides capacity and surplus relief, and protects against frequency and severity alike — but only in proportion: the cedant keeps its share of every large loss.
- **Surplus share** — cedes the portion of each policy's limit above the cedant's retention, so the cession percentage varies by policy. Retains small policies fully and shares large ones.

**Non-proportional (excess of loss)** — the reinsurer pays only above an attachment point:

- **Per-risk XOL** — responds to a single large claim above retention $R$, up to limit $L$.
- **Per-occurrence / catastrophe XOL** — responds to the accumulation from one event, which is how [[Catastrophe Loss|catastrophe]] exposure is managed.
- **Aggregate stop loss** — responds when the whole year's losses exceed a threshold.

Further points:

- **Gross and ceded develop differently.** Excess cessions attach only to large claims, which report late and settle slowly, so the ceded pattern is longer-tailed and far more volatile than gross. Friedland's basic text prescribes no single route: some actuaries analyze gross and ceded and derive net, others gross and net, depending on data availability, the reinsurance programme and preference, with gross, ceded and net kept consistent throughout (net IBNR generally no greater than gross). Her reinsurance study note adds that ceded data often have limited credibility — low volume, large-loss and catastrophe volatility, frequent changes in terms — so actuaries typically select patterns and expected loss ratios gross and net, and take ceded as the difference.
- Net experience is **smoother than gross**, because reinsurance caps exactly the large losses that drive volatility; net development patterns are frequently at or below gross ones.
- In **ratemaking**, Werner reduces projected losses by the expected non-proportional recoveries and premium by the amount ceded — or, alternatively, includes the **net cost of reinsurance** (the cost of the reinsurance minus the expected recoveries) as an expense item in the indication. Proportional reinsurance may need no explicit treatment. See [[Net of Reinsurance]].
- **Collectability** is a real exposure: reinsurance recoverables are an asset subject to dispute, commutation and reinsurer insolvency, and the cedant remains liable to its policyholders regardless.

![[Media/Figures/Reinsurance.svg|340]]

> [!example]- Net Losses Under Quota Share and Excess of Loss {Example}
> A cedant has gross ultimate losses of $\$5{,}000{,}000$ across five claims: $\$2{,}600{,}000$, $\$900{,}000$, $\$800{,}000$, $\$500{,}000$ and $\$200{,}000$.
>
> Compute net losses under (a) a $40\%$ quota share and (b) a $\$1{,}000{,}000$ excess of $\$500{,}000$ per-risk treaty.
>
> > [!answer]-
> > **(a) Quota share $40\%$:**
> >
> > $$\begin{align*}
> > \text{Ceded} &= 0.40 \times \$5{,}000{,}000 = \$2{,}000{,}000 \\
> > \text{Net} &= \$3{,}000{,}000
> > \end{align*}$$
> >
> > **(b) $\$1$M xs $\$500$K per risk** — cede $\min(\max(X - 500\text{K},0),\, 1\text{M})$ on each claim:
> >
> > | Claim | Gross | Ceded | Net |
> > |---|---|---|---|
> > | 1 | $\$2{,}600$K | $\$1{,}000$K | $\$1{,}600$K |
> > | 2 | $\$900$K | $\$400$K | $\$500$K |
> > | 3 | $\$800$K | $\$300$K | $\$500$K |
> > | 4 | $\$500$K | $\$0$ | $\$500$K |
> > | 5 | $\$200$K | $\$0$ | $\$200$K |
> > | **Total** | $\$5{,}000$K | $\$1{,}700$K | $\$3{,}300$K |
> >
> > The two structures cede similar amounts on this year's experience but do completely different things. Quota share cedes $40\%$ of *every* claim including the $\$200$K one; the excess treaty cedes nothing below $\$500$K and holds the cedant to $\$500$K on any claim up to $\$1.5$M — claim 1 pierces the top of the layer, so the cedant retains $\$1.6$M of it.
> >
> > Note also what the excess treaty does **not** cover: a second $\$2.6$M claim would again leave $\$1.6$M net. Only an aggregate cover limits the total.

> [!example]- Why the Ceded Triangle Cannot Be Scaled from Gross {Example}
> Under the same $\$1$M xs $\$500$K treaty, gross and ceded reported losses for one accident year:
>
> | Maturity | Gross | Ceded | Ceded ÷ gross |
> |---|---|---|---|
> | $12$ mo | $\$3{,}000$K | $\$150$K | $5.0\%$ |
> | $24$ mo | $\$4{,}200$K | $\$700$K | $16.7\%$ |
> | $36$ mo | $\$4{,}800$K | $\$1{,}400$K | $29.2\%$ |
> | $48$ mo | $\$5{,}000$K | $\$1{,}700$K | $34.0\%$ |
>
> What do the patterns show?
>
> > [!answer]-
> > $$\begin{align*}
> > \text{Gross CDF}_{12 \to 48} &= \frac{5{,}000}{3{,}000} = 1.667 \\[4pt]
> > \text{Ceded CDF}_{12 \to 48} &= \frac{1{,}700}{150} = 11.333
> > \end{align*}$$
> >
> > The ceded layer develops nearly **seven times** as much as gross. The reason is structural: a claim only enters the layer once its reserve passes $\$500{,}000$, so at $12$ months almost nothing has attached, while by $48$ months the large claims have matured into the layer.
> >
> > Two consequences:
> >
> > - Applying the gross CDF to ceded losses would project a ceded ultimate of $\$150\text{K} \times 1.667 = \$250$K against an actual $\$1{,}700$K — understating ceded recoveries by $85\%$ and correspondingly overstating net reserves.
> > - A change in the attachment point changes both the **ceded** and the **net** triangle: every prior year then reflects different terms. Friedland's reinsurance study note counts frequent changes in attachment points, limits and participation among the reasons ceded data are not homogeneous.
