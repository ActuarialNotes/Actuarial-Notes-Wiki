---
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:fd67dad74d6aaec5e2e7a6025ebf554a3cf73a309d709caabfbbe5209d4f878b
  sources: []
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/PDLD Ratio.md
---

**PDLD Ratio** (premium development to loss development ratio) is Teng and Perkins's measure of how [[Retrospective Rating|retrospective premium]] responds to loss on a book of retro rated policies. For each retro adjustment it is the premium developed in that adjustment divided by the loss developed over the matching loss valuations. Accumulated into **CPDLD** ratios and applied to expected future loss emergence, it gives the future premium whose sum is the premium asset ([[Retrospective Premium Reserve]]).

> $$\text{PDLD}_1 = \frac{\text{BP} \times \text{TM}}{L_1} + \frac{CL_1}{L_1} \, \text{LCF} \times \text{TM}$$

> $$\text{PDLD}_n = \frac{P_n - P_{n-1}}{L_n - L_{n-1}}$$

> $$\text{PDLD}_n = \frac{CL_n - CL_{n-1}}{L_n - L_{n-1}} \, \text{LCF} \times \text{TM}$$

> $$\text{CPDLD}_k = \frac{\sum_{n \ge k} \text{PDLD}_n \, \Delta\%L_n}{\sum_{n \ge k} \Delta\%L_n}$$

- **Symbols.** $P_n$ is the retro premium at the $n$th adjustment, and $L_n$ the loss it is computed on. $CL_n$ is that loss capped by the retro maximum and minimum and any per-accident limit. BP is the basic premium, LCF the loss conversion factor, TM the tax multiplier, and $\Delta\%L_n$ the share of ultimate loss emerging in period $n$. $\text{BP}/L_1$ is approximated by $\text{BPF}/(\text{ELR} \times \%L_1)$, the basic premium factor over the expected loss ratio emerged at the first adjustment.
- **First versus subsequent.**
  - $\text{PDLD}_1$ is usually **above 1**. It carries the whole basic premium, and little loss is capped by the first adjustment.
  - Later ratios are the incremental loss capping ratio times $\text{LCF} \times \text{TM}$. They are usually **well below 1**, as more new loss lands above the caps.
  - An individual policy quarter's historical ratio can even be negative. That happens when upward development above the limits coincides with downward development within them.
- **Formula versus empirical.**
  - The formula ratios respond to changes in the plan parameters sold. They should be tested against actual emergence for bias from averaged parameters.
  - Empirical ratios divide booked premium by reported loss with the booking lag: premium to 27 months over loss to 18, then 39 over 30, then 51 over 42.
  - Teng and Perkins selected the first ratio at $1.750$, against a historical $1.460$ and a formula $1.426$. Recent quarters had trended up, which they attribute more likely to improved loss experience.
- **Feldblum's refinements** (his Sections 1–2).
  - Plotted against the reported loss ratio, retro premium is a chain of line segments of decreasing slope, one per adjustment. Responsiveness falls as a book matures and as its loss ratio rises.
  - Each segment starts from the **actual** point reached (his Assumptions A and B). That is what lets the method track emerging experience where Fitzgibbon's single regression line cannot.
  - The first segment should not pass through the origin: $\text{PDLD}_1$ blends the basic premium ratio with the true first slope. To separate them, subtract the average basic premium charge divided by the expected loss ratio from $\text{CPDLD}_1$.
  - A premium [[Chain Ladder Method|chain ladder]] would wait until at least nine months after expiry and update only annually. The loss-based method updates every quarter.
- See [[Estimating the Premium Asset on Retrospectively Rated Policies (Teng and Perkins - 1996)|Teng and Perkins (1996)]] and [[Loss Sensitive Rating]].

> [!example]- Empirical PDLD Ratios from Booked Premium and Reported Loss {Example}
> Two policy quarters of retro rated workers compensation (\$000). Losses are valued for the first three adjustments at 18, 30 and 42 months. The premium they produce is booked by 27, 39 and 51 months.
>
> | Quarter | Loss 18 | Loss 30 | Loss 42 | Prem 27 | Prem 39 | Prem 51 |
> |---|---|---|---|---|---|---|
> | Q1 | $4{,}000$ | $4{,}500$ | $4{,}700$ | $5{,}800$ | $6{,}150$ | $6{,}110$ |
> | Q2 | $3{,}000$ | $3{,}400$ | | $4{,}410$ | $4{,}650$ | |
>
> Compute each quarter's PDLD ratios and the pooled first and second ratios. Compare them with formula ratios for BPF $0.20$, TM $1.03$, ELR $0.70$, $78.4\%$ of loss emerged at the first adjustment, LCF $1.20$, and loss capping ratios of $0.85$ (first) and $0.55$ (second, incremental).
>
> > [!answer]-
> > **By quarter:**
> >
> > $$
> > \begin{align*}
> > \text{Q1: } \text{PDLD}_1 &= 5{,}800 / 4{,}000 \\
> > &= 1.450 \\
> > \text{PDLD}_2 &= 350 / 500 \\
> > &= 0.700 \\
> > \text{PDLD}_3 &= -40 / 200 \\
> > &= -0.200 \\
> > \text{Q2: } \text{PDLD}_1 &= 4{,}410 / 3{,}000 \\
> > &= 1.470 \\
> > \text{PDLD}_2 &= 240 / 400 \\
> > &= 0.600
> > \end{align*}
> > $$
> >
> > **Pooled:**
> >
> > $$
> > \begin{align*}
> > \text{PDLD}_1 &= \frac{5{,}800 + 4{,}410}{4{,}000 + 3{,}000} \\
> > &= 1.459 \\
> > \text{PDLD}_2 &= \frac{350 + 240}{500 + 400} \\
> > &= 0.656
> > \end{align*}
> > $$
> >
> > **Formula:**
> >
> > $$
> > \begin{align*}
> > \text{PDLD}_1 &= \frac{0.20(1.03)}{0.70(0.784)} + 0.85(1.20)(1.03) \\
> > &= 0.375 + 1.051 \\
> > &= 1.426 \\
> > \text{PDLD}_2 &= 0.55(1.20)(1.03) \\
> > &= 0.680
> > \end{align*}
> > $$
> >
> > The first ratios agree well. The third-period ratio for Q1 is negative: its loss rose by $200$ while its premium fell by $40$. That happens when losses develop upward above the loss limits, earning no premium, while developing downward within them, returning premium.
> >
> > A single negative point is noise to be averaged over as many quarters as possible, or replaced by the formula ratio. It is not a sign that premium falls as losses rise.

> [!example]- Separating the Basic Premium from the Slope {Example}
> A book's retro plans have a basic premium ratio including tax of $0.20$ of standard premium and an expected loss ratio of $0.75$. The slopes of premium against loss are $1.10$ to the first adjustment, $0.60$ in the second period and $0.40$ in the third (the last). Losses emerge $80\%$, $15\%$ and $5\%$.
>
> (a) Compute $\text{PDLD}_1$ and $\text{CPDLD}_1$ as Teng and Perkins would, and split $\text{CPDLD}_1$ as Feldblum suggests.
>
> (b) Reporting slows to $70\%$, $25\%$ and $5\%$, with nothing else changed. Recompute.
>
> > [!answer]-
> > **(a)** The first ratio adds the basic premium, spread over the loss emerged at the first adjustment, to the first slope:
> >
> > $$
> > \begin{align*}
> > \text{PDLD}_1 &= \frac{0.20}{0.75(0.80)} + 1.10 \\
> > &= 0.3333 + 1.10 \\
> > &= 1.4333
> > \end{align*}
> > $$
> >
> > $$
> > \begin{align*}
> > \text{CPDLD}_1 &= 1.4333(0.80) + 0.60(0.15) + 0.40(0.05) \\
> > &= 1.1467 + 0.0900 + 0.0200 \\
> > &= 1.2567
> > \end{align*}
> > $$
> >
> > Feldblum's split takes the basic premium over the expected loss ratio, $0.20/0.75 = 0.2667$. The rest, $1.2567 - 0.2667 = 0.9900$, is the loss-weighted premium responsiveness.
> >
> > **(b)** With $70\%$ emerged by the first adjustment:
> >
> > $$
> > \begin{align*}
> > \text{PDLD}_1 &= \frac{0.20}{0.75(0.70)} + 1.10 \\
> > &= 1.4810 \\
> > \text{CPDLD}_1 &= 1.4810(0.70) + 0.60(0.25) + 0.40(0.05) \\
> > &= 1.2067
> > \end{align*}
> > $$
> >
> > The first PDLD **rose** from $1.433$ to $1.481$ although no plan parameter and no slope changed. The same basic premium is simply spread over less emerged loss.
> >
> > Split Feldblum's way, the basic premium component stays $0.2667$ and responsiveness falls to $0.9400$. More loss now emerges in the flatter later periods.
> >
> > Blended into one first ratio, this looks like more responsive plans. Separated, it is visibly a slower reporting pattern. That is the ambiguity Feldblum's enhancement removes.
