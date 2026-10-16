---
verification:
  status: verified
  confidence: medium
  last_checked: 2026-10-16
  last_checked_by: agent:validate-v1
  content_hash: sha256:c98e4354b8f19ac8a9935a2d11a3ac98bf903b81a4c97ad0492123e2c6bd419b
  sources:
    - "CREDIBLE CLAIMS RESERVES: THE BENKTANDER METHOD, Section 2, p.335 (credibility mixture U_c = cU_CL + (1-c)U_0), sha256:8e9e86f6dd4ed6a402d5380dd446ebeba5e2c3d921f90828ad485a8cfb508086 — https://www.casact.org/sites/default/files/2021-03/7_Mack_2000.pdf"
    - "https://www.casact.org/sites/default/files/2021-03/7_Brosius.pdf, Development Formula 2, p.13, sha256:de06a701db8825c8a6384bf92f577a5fe6ccfab627379f21199df35396a2a690 — https://www.casact.org/sites/default/files/2021-03/7_Brosius.pdf"
    - "https://www.casact.org/sites/default/files/2021-03/7_Shapland.pdf, s.5.5.1, pp.41-43 (PDF 49-51): SE rises oldest to most recent; CoV generally decreases, may rise again in most recent years; min/max plausibility, sha256:51b072243c0fe839cd776d9dc77532c544e2d52e025a29610e1aaea2cff07abf — https://www.casact.org/sites/default/files/2021-03/7_Shapland.pdf"
    - "https://www.casact.org/sites/default/files/2021-02/08-Meyers.pdf, s.3, pp.7-11 (PDF 17-21): uniformity of predicted percentiles, p-p plot, KS critical value 136/sqrt(n) at 5%, slanted S = light tails, Figure 3.2 Mack incurred, critical values 19.2 and 9.6, sha256:3c01999f6c8a170dc412968658d4f7d673d637e74cb27d84b4173ea60532d2d1 — https://www.casact.org/sites/default/files/2021-02/08-Meyers.pdf"
    - "Estimating Unpaid Claims Using Basic Techniques, ch.3 p.37; ch.9 p.154; ch.14 pp.331-332 incl. fn 80-81; ch.15 pp.345-346, 350-351, sha256:5e9830823346d2001d9bdcebecd0d0d399cac32a9a63d5cf021a6c7f03d50464 — https://www.casact.org/sites/default/files/2021-03/5_Friedland.pdf"
    - "Werner & Modlin, Basic Ratemaking (5th ed. 2016), ch.3 p.37; ch.6 p.106, sha256:6b214d4db52674df2e83343920c06781e491254bd77f27e32ba312faaff3782c — https://www.casact.org/sites/default/files/2021-03/5_Werner_Modlin.pdf"
    - "ASOP No. 23, Data Quality (2016), s.3.3 Review of Data, pp.3-4, sha256:784c57a1379b189b234452dc7fe18d391ae86e7f5fb8815d14d35400eb3e7bdf — https://www.actuarialstandardsboard.org/wp-content/uploads/2017/01/asop023_185.pdf"
    - "Friedland, Reserving for Reinsurance (CAS Exam 7 study note), ch.3 pp.61-62: longer reporting/payment patterns for reinsurance vs primary and non-proportional vs proportional, sha256:6da495a26206ececf40a3c3fc8fb3db04556c940242f5bcffe2b21b7e4445ceb — https://www.casact.org/sites/default/files/2022-11/Exam7_Study_Note_Friedland.pdf"
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Reasonableness Testing.md
---

**Reasonableness testing** is the set of checks an actuary applies to data, intermediate results and final estimates before relying on them. It covers ratemaking indications, unpaid claim estimates and stochastic output alike. The questions are whether they are free of errors, consistent with each other, and consistent with history and with what is known about the business.

> $$\frac{A}{E} = \frac{\text{Actual emergence}}{\text{Expected emergence}}$$

> $$\text{Expected emergence} = \text{IBNR} \times \frac{p_{t+\Delta} - p_t}{1 - p_t}$$

- $p_t = 1/\text{CDF}_t$ is the expected percentage reported (or paid) at age $t$. The second block is what the prior valuation implied would emerge by the next one. It holds for both chain ladder and BF IBNR: chain ladder IBNR is its ultimate times $1 - p_t$, and BF IBNR is the expected claims times $1 - p_t$.
- **Ratemaking data and analyses (Exam 5).**
  - Review the data for appropriateness for its intended purpose, and for the reasonableness and comprehensiveness of its elements ([[Data Quality]], ASOP 23).
  - Check that the data are internally consistent, and compare them with the data used in the prior analysis where that consistency can be expected.
  - Check that losses at the first development age are generally consistent from year to year, allowing for loss trend and changes in the portfolio. If they are dramatically different, examine the claim count triangle.
- **Reserving data and analyses (Exam 5).** Run the triangle diagnostics ([[Data Diagnostic Analysis]]). Then test the *selected* ultimates by the ratios they imply: ultimate claim ratios, severities, frequencies and pure premiums by year, and the implied average case outstanding and unreported claim on open and unreported claims. See [[Reserve Adequacy]].
- **Monitoring (Exam 5).** Interim valuations hold the prior ultimates and score them with [[Actual vs Expected Analysis|actual versus expected]] emergence and a [[Roll Forward Analysis|roll-forward]].
- **Unpaid claim estimates (Exam 7).** Compare paid against reported, and chain ladder against BF, Cape Cod and Benktander. A credibility-weighted estimate should lie between the chain ladder and the a priori. Reinsurance should show longer reporting and payment patterns than primary insurance, and excess (non-proportional) cover longer than proportional. Net claims and premium should not exceed gross, and net IBNR is generally no greater than gross IBNR.
- **Distribution output (Exam 7).** Apply Shapland's patterns to the [[Unpaid Claim Distribution|unpaid claim distribution]]: standard errors rising toward recent years, CoVs generally falling, and plausible extremes. Then use Meyers' retrospective test: across many triangles, the predicted percentiles of the actual outcomes should be **uniform**. Uniformity is judged with a p-p plot and a Kolmogorov-Smirnov band of $\pm 136/\sqrt{n}$ percentage points at the $5\%$ level.

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
