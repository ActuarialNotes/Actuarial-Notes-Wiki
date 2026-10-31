---
verification:
  status: verified
  confidence: high
  last_checked: 2026-10-31
  last_checked_by: agent:validate-v1
  content_hash: sha256:bc11b8abab3ef37652e208f01776740748519507cc0a0a1384b4d8e864f55a67
  sources:
    - "Friedland, Estimating Unpaid Claims Using Basic Techniques (CAS, 2010), Ch.15 Evaluation of Techniques, PDF pp.357-359 (printed 351-353): A/E purpose and expected-claims formula, quarterly/monthly interpolation, Bornhuetter-Ferguson quarterly distribution, Hugh White's three options, sha256:5e9830823346d2001d9bdcebecd0d0d399cac32a9a63d5cf021a6c7f03d50464 — https://www.casact.org/sites/default/files/2021-03/5_Friedland.pdf"
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Actual vs Expected Analysis.md
---

**Actual vs. Expected Analysis** (A/E) compares the emergence that actually occurred in a period against what the previous valuation's assumptions implied should occur. It is the primary monitoring tool between full reserve reviews, and the fastest way to detect that an estimate is drifting.

> $$\text{Expected emergence} = \frac{U_{\text{prior}} - \text{Reported}_{n}}{1 - 1/\text{CDF}_{n}} \times \left(\frac{1}{\text{CDF}_{n+1}} - \frac{1}{\text{CDF}_{n}}\right)$$

> $$\text{A/E} = \frac{\text{Actual emergence}}{\text{Expected emergence}}$$

- The **expected** figure comes from the prior ultimate and the emergence pattern: the share of ultimate the pattern says should report (or be paid) between the two valuations. It is not last year's reported losses grown by a factor — it is a forecast made in advance and then scored.
- A/E is run **by accident year and by maturity**, on paid and reported separately. Where the deviation sits is as informative as its size: concentrated in recent years points at the current diagonal; spread across all years points at a calendar-year effect; concentrated at old maturities points at the [[Tail Factor|tail]].
- Paid and reported A/E together diagnose the cause. Reported running high with paid on track suggests [[Case Adequacy|case strengthening]]; paid running high with reported on track suggests faster [[Settlement Rate|settlement]].
- **One period's deviation is noise; a run of them is a signal.** Emergence is volatile, so a single A/E of $1.15$ means little. Four consecutive quarters above $1.0$, in the same direction, is evidence the assumptions are wrong.
- Comparing actual with expected claims lets the actuary judge whether prior selections were appropriate and revise them where claims do not emerge as expected (Friedland, Ch. 15). When the excess is real additional claim dollars, such as a large claim reported in the period, those dollars stay in that accident year's ultimate, which therefore rises: this is Hugh White's second option as Friedland quotes it, leaving the IBNR at the same level of expected claims because the excess is a random fluctuation such as a large loss. Friedland adds that none of White's three responses is satisfactory without investigating what drove the difference.
- **Between evaluation points.** For a valuation that falls between two ages of the pattern (a monthly or quarterly check against an annual or quarterly pattern), the expected percentage reported or paid is found by interpolating the pattern at the accident period's age in months at the valuation date. Linear interpolation assumes the change between the two known ages happens evenly over the interval: the percentage at the earlier age plus the fraction of the interval elapsed times the change over the whole interval. For example, with 60% reported at 24 months and 80% at 36 months, linear interpolation gives 60% + (3/12)(20%) = 65% at 27 months.
- Linear interpolation between quarterly points is likely sufficient for monthly monitoring, but linear interpolation of annual development patterns is usually not appropriate, particularly for the most immature accident years, because claims do not emerge evenly within a year (Friedland, Ch. 15). Bornhuetter and Ferguson suggest that the most recent accident year's development by quarter is skewed toward the early quarters, for instance 40%, 70%, 85% and 100% of the year's development at three, six, nine and twelve months, rather than the uniform 25%, 50%, 75%, 100% a straight line assumes.
- A/E is the mechanism that would have caught the drifting ultimates on [[Ultimate Loss]] in year one instead of year four, and it feeds directly into whether factors, the tail or the a priori ELR need re-selection.

![[Media/Figures/Actual_vs_Expected_Analysis.svg|340]]

> [!example]- Scoring a Quarter's Emergence {Example}
> At $12/31/2023$, AY 2022 was estimated at ultimate $\$10{,}000{,}000$ with $60\%$ reported at $24$ months and $75\%$ at $36$ months. Reported losses at $12/31/2023$ were $\$6{,}000{,}000$; at $12/31/2024$ they are $\$8{,}100{,}000$.
>
> Compute the A/E ratio and interpret.
>
> > [!answer]-
> > $$\begin{align*}
> > \text{Expected emergence} &= \$10{,}000{,}000 \times (0.75 - 0.60) \\
> > &= \$1{,}500{,}000 \\[4pt]
> > \text{Actual emergence} &= \$8{,}100{,}000 - \$6{,}000{,}000 \\
> > &= \$2{,}100{,}000 \\[6pt]
> > \text{A/E} &= \frac{\$2{,}100{,}000}{\$1{,}500{,}000} = 1.40
> > \end{align*}$$
> >
> > Emergence ran $40\%$ above expectation. Re-estimating from the new diagonal at the same pattern:
> >
> > $$\frac{\$8{,}100{,}000}{0.75} = \$10{,}800{,}000$$
> >
> > an $8\%$ increase in the indicated ultimate.
> >
> > Before booking that, two questions: is the $40\%$ overage confined to AY 2022 or visible across all accident years on this diagonal (calendar-year effect), and is it in paid, in case reserves, or both? The answers determine whether this is one year's adverse experience or a systematic issue affecting the whole reserve.

> [!example]- Reading a Full A/E Table {Example}
> A/E ratios on reported losses for the year ending $12/31/2024$:
>
> | AY | Maturity | A/E (reported) | A/E (paid) |
> |---|---|---|---|
> | $2020$ | $48$–$60$ | $1.32$ | $1.04$ |
> | $2021$ | $36$–$48$ | $1.28$ | $0.99$ |
> | $2022$ | $24$–$36$ | $1.35$ | $1.02$ |
> | $2023$ | $12$–$24$ | $1.30$ | $1.01$ |
>
> Diagnose.
>
> > [!answer]-
> > Reported emergence exceeded expectation by about $30\%$ in **every accident year at every maturity**, while paid emergence was on expectation throughout.
> >
> > That pattern rules out most explanations:
> >
> > - Not a single bad accident year — it is uniform across years.
> > - Not increased loss payments — paid A/E is $\approx 1.0$.
> > - Not a reporting-speed change — that would show in paid as well, and would not be uniform across mature years where reporting is complete.
> >
> > What is left is **case reserve strengthening during calendar $2024$**: reserves on already-known claims were raised across the board, with no corresponding change in payments.
> >
> > The reserving consequence is that reported development factors are now biased high, and applying them unadjusted would develop the strengthening a second time — the [[Berquist-Sherman Method|Berquist-Sherman]] situation. The strengthened reserves themselves are not the error; the factors are.
> >
> > The wider consequence: paid A/E at $1.0$ means the ultimate cost of these claims may not have changed at all. Whether the strengthening was warranted is a question for the claims department, and the answer determines whether the ultimate estimate should move.
