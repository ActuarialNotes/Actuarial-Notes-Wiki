---
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:6f6b838118f885635ba3272e692de7b5abe2172d00d3c9dd555538bbd54662f4
  sources: []
  open_findings: 0
  log: .verify/Concepts/Roll Forward Analysis.md
---

**Roll Forward Analysis** reconciles the reserve balance from one valuation date to the next, decomposing the change into its components so that genuine re-estimation is separated from the ordinary mechanics of new claims and payments.

> $$R_{\text{end}} = R_{\text{begin}} + \text{Incurred on new AY} - \text{Paid} \pm \text{Prior-year development}$$

> $$\text{Prior-year development} = \sum_{\text{prior AYs}} \left(U_{\text{current}} - U_{\text{prior}}\right)$$

- The **prior-year development** term is the only one that reflects a change of view. The other terms are arithmetic: a new accident year arrives, and payments run off the balance. Isolating the development term is the point of the exercise.
- **Adverse** development (positive) means the prior estimate was deficient; **favourable** (negative) means it was redundant. Statutory reporting requires this to be disclosed by accident year — Schedule P Part 2 is a one-year and two-year development table across the whole industry.
- Roll forward is also the **interim valuation** tool: between full reviews, ultimates for prior years are held and the balance is rolled forward on the expected pattern, with [[Actual vs Expected Analysis|A/E]] used to decide when the held ultimates must be revisited.
- A run of adverse development in the same direction across several roll-forwards is systematic deficiency, not bad luck, and calls for the assumptions to be re-selected rather than for the current estimate to be topped up again.
- Favourable development is not automatically good news: consistent redundancy overstates the current year's loss ratio, which feeds an over-stated rate indication into pricing, exactly as deficiency feeds an under-stated one.

![[Media/Figures/Roll_Forward_Analysis.svg|340]]

> [!example]- Rolling the Balance Forward {Example}
> Reserves at $12/31/2023$ were $\$10{,}000{,}000$. During $2024$: losses incurred on the new accident year $\$2{,}500{,}000$; payments (all years) $\$3{,}200{,}000$; adverse development on prior accident years $\$400{,}000$.
>
> Compute the closing reserve and comment.
>
> > [!answer]-
> > $$\begin{align*}
> > R_{\text{end}} &= \$10{,}000{,}000 + \$2{,}500{,}000 \\
> > &\quad - \$3{,}200{,}000 + \$400{,}000 \\
> > &= \$9{,}700{,}000
> > \end{align*}$$
> >
> > The balance fell $\$300{,}000$, which on its own reads as a book running off comfortably. The decomposition says otherwise: the fall is entirely payments outrunning new incurred, and *inside* that movement is $\$400{,}000$ of adverse development — a $4\%$ miss on the opening reserve.
> >
> > The headline number and the diagnostic number point in opposite directions, which is precisely why the roll forward is done component by component.

> [!example]- A Run of Adverse Development {Example}
> One-year development on prior-year reserves, from successive Schedule P filings:
>
> | Calendar year | Opening reserve | Adverse (favourable) development |
> |---|---|---|
> | $2021$ | $\$38{,}000$K | $\$900$K |
> | $2022$ | $\$41{,}000$K | $\$1{,}300$K |
> | $2023$ | $\$44{,}000$K | $\$1{,}800$K |
> | $2024$ | $\$47{,}000$K | $\$2{,}400$K |
>
> What does the pattern say?
>
> > [!answer]-
> > Development as a percentage of the opening reserve: $2.4\%$, $3.2\%$, $4.1\%$, $5.1\%$. Adverse in every year, and the **percentage is accelerating** — this is not random variation around an unbiased estimate.
> >
> > Two distinct readings, with different implications:
> >
> > 1. **The reserving process is systematically low.** Factors selected too gently, a [[Tail Factor|tail]] set too short, or an a priori ELR that has not kept up with [[Rate Level Change|rate level]] and trend. The fix is in the method, and the correction is a one-time catch-up plus a change in selections.
> > 2. **The environment is deteriorating faster than the estimates can follow.** [[Inflation|Social inflation]] or a legal change raising the cost of all open claims each year. The fix is a calendar-year adjustment, and — critically — the same finding applies to **pricing**, because the trend selection in the rate indication is stale by the same amount.
> >
> > Distinguishing them requires the [[Actual vs Expected Analysis|A/E]] detail: deficiency concentrated at particular maturities points to the method, deficiency spread uniformly across every open year on each diagonal points to the environment.
> >
> > What is not defensible is a fifth year of topping the reserve up by whatever emerged. Four consecutive misses in the same direction is a demonstrated bias, and the standards expect the assumptions behind it to be revisited.
