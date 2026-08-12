**Actual vs. Expected Analysis** (A/E) compares the emergence that actually occurred in a period against what the previous valuation's assumptions implied should occur. It is the primary monitoring tool between full reserve reviews, and the fastest way to detect that an estimate is drifting.

> $$\text{Expected emergence} = U_{\text{prior}} \times \left(\frac{1}{\text{CDF}_{n+1}} - \frac{1}{\text{CDF}_{n}}\right)$$

> $$\text{A/E} = \frac{\text{Actual emergence}}{\text{Expected emergence}}$$

- The **expected** figure comes from the prior ultimate and the emergence pattern: the share of ultimate the pattern says should report (or be paid) between the two valuations. It is not last year's reported losses grown by a factor — it is a forecast made in advance and then scored.
- A/E is run **by accident year and by maturity**, on paid and reported separately. Where the deviation sits is as informative as its size: concentrated in recent years points at the current diagonal; spread across all years points at a calendar-year effect; concentrated at old maturities points at the [[Tail Factor|tail]].
- Paid and reported A/E together diagnose the cause. Reported running high with paid on track suggests [[Case Adequacy|case strengthening]]; paid running high with reported on track suggests faster [[Settlement Rate|settlement]].
- **One period's deviation is noise; a run of them is a signal.** Emergence is volatile, so a single A/E of $1.15$ means little. Four consecutive quarters above $1.0$, in the same direction, is evidence the assumptions are wrong.
- A/E is the mechanism that would have caught the drifting ultimates on [[Ultimate Loss]] in year one instead of year four, and it feeds directly into whether factors, the tail or the a priori ELR need re-selection.

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
