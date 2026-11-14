---
verification:
  status: stale
  confidence: null
  last_checked: 2026-10-30
  last_checked_by: agent:validate-v1
  content_hash: sha256:ba5fe117626ecfc19755e261b956bfcce4f5aa962b78e21be1c7852c28f807f6
  sources:
    - "Teng and Perkins, Estimating the Premium Asset on Retrospectively Rated Policies (PCAS LXXXIII, 1996), printed pp.613-623 (PDF pp.3-13): formulas 2.1-2.4, formula example 1.426/0.717, empirical lags 27/18, 39/30, 51/42, selected 1.750 vs 1.460, negative historical ratios, sixth-adjustment PDLD selected at zero (p.618), CPDLD weights incl. 0.4% emerging after the last adjustment (p.622), sha256:30efb7917ebbc6361393f76652a21d97e1915032f94667699904248d1bd900f1 — https://www.casact.org/sites/default/files/2021-03/7_Teng_and_Perkins.pdf"
    - "Feldblum, Discussion of Estimating the Premium Asset on Retrospectively Rated Policies (PCAS LXXXV, 1998), printed pp.274-277 (PDF pp.1-4: three advantages incl. 'may prove particularly useful when changes in the retrospective rating plan parameters distort the indications of other methods'; why not a premium chain ladder, rationale a/b, nine months and annual updates vs quarterly), pp.287-295 (PDF pp.14-22: line segments of decreasing slope, Assumptions A and B, Y-intercept enhancement, basic premium charge / expected loss ratio), sha256:1c572191d2239553f306dc29ba1186f3c3477e06b1652562ab55acd4c8bc04ed — https://www.casact.org/sites/default/files/2021-03/7_Teng_and_Perkins_Discussion_of_Paper.pdf"
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/PDLD Ratio.md
---

A **PDLD Ratio** (premium development to loss development ratio) is Teng and Perkins's measure of how [[Retrospective Rating|retrospective premium]] responds to loss on a book of retro rated policies. For each retro adjustment it is the premium developed in that adjustment divided by the loss developed over the matching loss valuations. Accumulated into CPDLD ratios and applied to expected future loss emergence, it gives the future premium whose sum is the premium asset ([[Retrospective Premium Reserve]]).

With $P_n$ the retro premium at the $n$th adjustment and $L_n$ the loss it is computed on, the PDLD ratio for the $n$th adjustment is

> $$\text{PDLD}_n = \frac{P_n - P_{n-1}}{L_n - L_{n-1}}$$

- $P_0 = L_0 = 0$, so the first ratio is $P_1/L_1$.

## The formula ratios

Teng and Perkins compute the ratios from the retro rating formula. At the first adjustment the ratio is

> $$\text{PDLD}_1 = \frac{\text{BP} \times \text{TM}}{L_1} + \frac{CL_1}{L_1} \, \text{LCF} \times \text{TM}$$

- $\text{BP}$ is the basic premium.
- $\text{TM}$ is the tax multiplier.
- $CL_1$ is the loss $L_1$ capped by the retro maximum and minimum and any per-accident limit.
- $\text{LCF}$ is the loss conversion factor.

$\text{BP}/L_1$ is approximated by $\text{BPF}/(\text{ELR} \times \%L_1)$, the basic premium factor over the expected loss ratio emerged at the first adjustment. $\text{PDLD}_1$ is usually **above 1**. It carries the whole basic premium, and little loss is capped by the first adjustment.

At a later adjustment the basic premium is not charged again, so the ratio is

> $$\text{PDLD}_n = \frac{CL_n - CL_{n-1}}{L_n - L_{n-1}} \, \text{LCF} \times \text{TM}$$

- $CL_n$ is the capped loss at the $n$th adjustment.

Later ratios are the incremental loss capping ratio times $\text{LCF} \times \text{TM}$. They are usually **well below 1**, as more new loss lands above the caps. An individual policy quarter's historical ratio can even be negative. That happens when upward development above the limits coincides with downward development within them.

## Cumulative PDLD ratios

The cumulative ratio at the $k$th adjustment is the average of the PDLD ratios for that and all later adjustments, weighted by the loss still to emerge:

> $$\text{CPDLD}_k = \frac{\sum_{n \ge k} \text{PDLD}_n \, \Delta\%L_n}{\sum_{n \ge k} \Delta\%L_n}$$

- $\Delta\%L_n$ is the share of ultimate loss emerging in period $n$.

## Formula and empirical ratios

The formula ratios respond to changes in the plan parameters sold. They should be tested against actual emergence for bias from averaged parameters. Empirical ratios divide booked premium by reported loss with the booking lag: premium to 27 months over loss to 18, then 39 over 30, then 51 over 42. A single negative point is noise to be averaged over as many quarters as possible, or replaced by the formula ratio. It is not a sign that premium falls as losses rise.

Teng and Perkins selected the first ratio at $1.750$, against a historical $1.460$ and a formula $1.426$. Recent quarters had trended up, which they attribute more likely to improved loss experience.

> [!example]- How do these empirical PDLD ratios compare with the formula ratios? {Example}
> Two policy quarters of retro rated workers compensation ($\$000$). Losses are valued for the first three adjustments at 18, 30 and 42 months. The premium they produce is booked by 27, 39 and 51 months.
>
> | Quarter | Loss 18 | Loss 30 | Loss 42 | Prem 27 | Prem 39 | Prem 51 |
> | :--- | ---: | ---: | ---: | ---: | ---: | ---: |
> | Q1 | 4,000 | 4,500 | 4,700 | 5,800 | 6,150 | 6,110 |
> | Q2 | 3,000 | 3,400 | | 4,410 | 4,650 | |
>
> The formula ratios use a BPF of 0.20, a TM of 1.03, an ELR of 0.70, 78.4% of loss emerged at the first adjustment, an LCF of 1.20, and loss capping ratios of 0.85 (first) and 0.55 (second, incremental).
>
> > [!answer]-
> > - Q1's ratios are $5{,}800/4{,}000 = 1.450$, $350/500 = 0.700$ and $-40/200 = -0.200$.
> > - Q2's ratios are $4{,}410/3{,}000 = 1.470$ and $240/400 = 0.600$.
> > - Pooled, the first ratio is $10{,}210/7{,}000 = 1.459$ and the second is $590/900 = 0.656$.
> > - The formula's first ratio is $0.20 \times 1.03/(0.70 \times 0.784) + 0.85 \times 1.20 \times 1.03 = 0.375 + 1.051 = 1.426$.
> > - The formula's second ratio is $0.55 \times 1.20 \times 1.03 = 0.680$.
> > - The first ratios agree well.
> > - Q1's third ratio is negative because its loss rose by 200 while its premium fell by 40. That happens when losses develop upward above the loss limits, earning no premium, while developing downward within them, returning premium.

## Feldblum's refinements

Plotted against the reported loss ratio, retro premium is a chain of line segments of decreasing slope, one per adjustment. Responsiveness falls as a book matures and as its loss ratio rises. Each segment starts from the **actual** point reached (his Assumptions A and B). That is what lets the method track emerging experience where Fitzgibbon's single regression line cannot.

The first segment should not pass through the origin, because $\text{PDLD}_1$ blends the basic premium ratio with the true first slope. To separate them, subtract the average basic premium charge divided by the expected loss ratio from $\text{CPDLD}_1$.

Premium is not developed by a [[Chain Ladder Method|chain ladder]], as losses are, because ultimate losses can be estimated sooner than retro premium, and retro premium depends on losses. A premium chain ladder would wait until at least nine months after expiry and update only annually, while the loss-based method updates every quarter. The PDLD method is modelled directly on the retro rating formula, and it may prove particularly useful when changes in the retro rating plan parameters distort the indications of other methods.

> [!example]- What does slower reporting do to $\text{PDLD}_1$ and $\text{CPDLD}_1$, blended and split Feldblum's way? {Example}
> A book's retro plans have a basic premium ratio including tax of 0.20 of standard premium and an expected loss ratio of 0.75. The slopes of premium against loss are 1.10 to the first adjustment, 0.60 in the second period and 0.40 in the third (the last). Losses emerge 80%, 15% and 5%. Then reporting slows to 70%, 25% and 5%, with nothing else changed.
>
> > [!answer]-
> > - At first, $\text{PDLD}_1 = 0.20/(0.75 \times 0.80) + 1.10 = 1.4333$.
> > - $\text{CPDLD}_1 = 1.4333 \times 0.80 + 0.60 \times 0.15 + 0.40 \times 0.05 = 1.2567$.
> > - Feldblum's split takes the basic premium over the expected loss ratio, $0.20/0.75 = 0.2667$, leaving $1.2567 - 0.2667 = 0.9900$ of loss-weighted premium responsiveness.
> > - With slower reporting, $\text{PDLD}_1 = 0.20/(0.75 \times 0.70) + 1.10 = 1.4810$.
> > - $\text{CPDLD}_1 = 1.4810 \times 0.70 + 0.60 \times 0.25 + 0.40 \times 0.05 = 1.2067$.
> > - The first PDLD rose although no plan parameter and no slope changed, because the same basic premium is spread over less emerged loss.
> > - Split Feldblum's way, the basic premium component stays 0.2667 and responsiveness falls to 0.9400, as more loss emerges in the flatter later periods.
> > - Blended into one first ratio, this looks like more responsive plans, and separated it is a slower reporting pattern.

See [[Estimating the Premium Asset on Retrospectively Rated Policies (Teng and Perkins - 1996)|Teng and Perkins (1996)]] and [[Loss Sensitive Rating]].

> [!trap] Including the basic premium in later ratios
> The basic premium is charged once, at the first adjustment. A later ratio is only the incremental loss capping ratio times $\text{LCF} \times \text{TM}$, with no basic premium term.
