---
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:36f127a4ba8f868b2d633a0e2e31b1084ba90a237c12b79fe81a8dca0485abb4
  sources: []
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Adverse Development Cover.md
---

**An adverse development cover** (ADC, or adverse loss development cover) is a form of [[Finite Reinsurance|finite risk reinsurance]] under which the reinsurer reimburses the ceding company for losses in excess of a pre-agreed retention. The retention is set at the level of the reserves the cedant holds, or at a higher level, often expressed as a multiple of them. Unlike a [[Loss Portfolio Transfer|loss portfolio transfer]], no reserves are transferred to the reinsurer.

> $$\text{Recovery} = \min\big(\max(U - A,\ 0),\ L\big)$$
>
> $$A = k \times R_{\text{held}}, \text{ with } k \geq 1$$

- $U$ is the covered losses from the cover's effective date (paid since then plus still unpaid), $R_{\text{held}}$ the reserves held at that date, $A$ the retention and $L$ the limit. A limit reflects the limited assumption of risk that [[Reserving for Reinsurance (Friedland - 2022)|Friedland]] lists among the features of finite reinsurance.
- **No transfer of reserves.** The ceding company keeps its reserves and keeps paying claims, and the cover responds only once losses exceed the retention. An LPT instead transfers the liability for future loss payments to the reinsurer, for a premium.
- **A key use is mergers and acquisitions**, where the ceding company can transfer the risks of both timing and adverse reserve development (Friedland).
- **Reserving.** The cedant's [[Ceded Loss Reserve|ceded reserve]] for the cover is its expected recovery less what the reinsurer has already paid. Nothing is ceded while the estimate of $U$ stays at or below $A$, and above it every unit of adverse development is ceded until $L$ is used up. The recovery has the shape of an [[Aggregate Excess of Loss|aggregate excess of loss]] cover on the development of the held reserves, and a large reinsurer may segment aggregate stop-loss and finite risk covers apart from its other business ([[Reinsurance Reserving]]).

> [!example]- The Ceded Reserve at Two Valuations {Example}
> At 12/31/2025 an insurer holds reserves of 200 (millions) on its general liability accident years 2015–2024 and buys an adverse development cover of 100 excess of 200 on them. Find the ceded and net unpaid losses (a) at 12/31/2026, when 60 has been paid since the cover began and the unpaid estimate is 170, and (b) at 12/31/2029, when 210 has been paid since the cover began and the unpaid estimate is 110.
>
> > [!answer]-
> > **(a)**
> >
> > $$
> > \begin{align*}
> > U &= 60 + 170 \\
> > &= 230 \\
> > \text{Recovery} &= \min(230 - 200,\ 100) \\
> > &= 30
> > \end{align*}
> > $$
> >
> > Paid losses of 60 have not reached the retention, so the reinsurer has paid nothing. The ceded unpaid is 30 and the net unpaid is $170 - 30 = 140$.
> >
> > **(b)**
> >
> > $$
> > \begin{align*}
> > U &= 210 + 110 \\
> > &= 320 \\
> > \text{Recovery} &= \min(320 - 200,\ 100) \\
> > &= 100
> > \end{align*}
> > $$
> >
> > The reinsurer has paid $210 - 200 = 10$, so the ceded unpaid is $100 - 10 = 90$ and the net unpaid is $110 - 90 = 20$. The net ultimate is $320 - 100 = 220$: the limit is used up, and the 20 of development above $A + L = 300$ is back with the cedant.

> [!example]- An Adverse Development Cover in an Acquisition {Example}
> An insurer being acquired holds reserves of 80 (millions) and buys an adverse development cover attaching at $110\%$ of its held reserves, with a limit of 40. The buyer's actuary estimates the ultimate unpaid on those reserves at 75 (low), 95 (central) and 140 (high). Find the net cost of the reserves in each scenario.
>
> > [!answer]-
> > $$
> > \begin{align*}
> > A &= 1.10 \times 80 \\
> > &= 88
> > \end{align*}
> > $$
> >
> > - Low: $U = 75$ is below $A$, so the recovery is 0 and the net is 75.
> > - Central: the recovery is $95 - 88 = 7$, so the net is $95 - 7 = 88$.
> > - High: the recovery is $\min(140 - 88,\ 40) = 40$, so the net is $140 - 40 = 100$.
> >
> > The cover holds the net cost at 88 for any outcome between 88 and $A + L = 128$. Above 128 the buyer bears the development again, which is why the multiple and the limit are negotiated together.
