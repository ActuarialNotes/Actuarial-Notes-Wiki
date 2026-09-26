---
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:d6cc48fab828fa516a95703c89eb714eccf8dc9f2ab2246d74f48d4a37d24630
  sources: []
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Ceded Loss Reserve.md
---

**Ceded loss reserves** are the part of an insurer's unpaid claims (case reserves plus IBNR, and loss adjustment expense where the treaty covers it) expected to be recovered from reinsurers under the contracts in force. From the cedant's side they are the unpaid portion of [[Ceded Losses|ceded losses]], carried as a reinsurance recoverable asset.

> $$\text{Ceded unpaid} = \text{Gross unpaid} - \text{Net unpaid}$$

> $$\text{Ceded IBNR} = \text{Ceded ultimate} - \text{Ceded reported}$$

- **By treaty type** (see [[Types of Reinsurance]]):
  - **[[Quota Share|Quota share]]** cedes a fixed percentage of ultimate, paid, case and IBNR alike. When the percentage changes, it follows the *policy* year on a risks-attaching treaty and the *accident* year on a losses-occurring-during treaty.
  - **[[Surplus Share|Surplus share]]** varies the cession by risk.
  - **Per-risk or per-occurrence [[Excess of Loss|excess of loss]]** applies $\min(\max(X - R, 0), L)$ to projected ultimates of large claims. Alternatively, develop a ceded triangle, or run BF with a ceded expected loss ratio.
  - **Stop-loss and [[Aggregate Excess of Loss|aggregate]]** covers cap the retained total.
- **Order matters.** Covers inure in a stated sequence. Typically per-occurrence excess comes off first, then the quota share applies to what remains, and the stop-loss applies last to protect the final net result.
- **Estimate two, derive the third.** Friedland's advice is to estimate gross and ceded (or gross and net) separately and consistently. A net triangle breaks every time the treaty terms change. Then check:
  - ceded is non-negative and net never exceeds gross;
  - ceded IBNR is a *larger* share of ceded ultimate than gross IBNR is of gross, because excess cessions develop late;
  - implied ceded development factors exceed gross ones.
- **Why ceded data is harder.** Trend is leveraged into excess layers, reporting thresholds delay notice, and a change in retention makes prior ceded years non-comparable. The treaty history must be kept alongside the data.
- **It is an asset with credit risk.** Recoverables can be disputed, commuted ([[Commutations]]) or lost to a reinsurer's insolvency ([[Reinsurance Credit Risk]]), and the cedant stays liable to its policyholders. See [[Reinsurance Recovery]] and, for the reinsurer's side of the same liability, [[Reinsurance Reserving]].

> [!example]- Inuring Order Across Three Covers {Example}
> For one accident year the gross ultimate is $5{,}000$ and gross paid is $3{,}000$ (\$000s). One large claim has an ultimate of $600$ and paid of $100$. The cedant has three covers, inuring in this order:
>
> 1. a per-occurrence excess of $400$ xs $200$;
> 2. a $30\%$ quota share;
> 3. a stop-loss capping retained losses after the quota share at $3{,}000$.
>
> Compute the ceded unpaid by cover and the net unpaid.
>
> > [!answer]-
> > **Excess of loss**, on the large claim:
> >
> > $$
> > \begin{align*}
> > \text{Ceded ult} &= \min(600 - 200,\ 400) \\
> > &= 400 \\
> > \text{Ceded paid} &= \max(100 - 200,\ 0) \\
> > &= 0
> > \end{align*}
> > $$
> >
> > The remainder is an ultimate of $4{,}600$ and paid of $3{,}000$.
> >
> > **Quota share** at $30\%$ cedes an ultimate of $1{,}380$ and paid of $900$, so its ceded unpaid is $480$. That leaves a retained ultimate of $3{,}220$ and paid of $2{,}100$.
> >
> > **Stop-loss:** the ceded ultimate is $3{,}220 - 3{,}000 = 220$, and nothing is ceded on paid because $2{,}100 < 3{,}000$. Its ceded unpaid is $220$.
> >
> > $$
> > \begin{align*}
> > \text{Ceded unpaid} &= 400 + 480 + 220 \\
> > &= 1{,}100 \\
> > \text{Net unpaid} &= 3{,}000 - 2{,}100 \\
> > &= 900
> > \end{align*}
> > $$
> >
> > Check: gross unpaid $2{,}000 = 1{,}100 + 900$. ✓ Applying the quota share *before* the excess cover would have ceded $30\%$ of the large claim to the quota share and changed every figure. The treaty wording on inuring decides which is right.

> [!example]- An Inconsistent Net Estimate {Example}
> A cedant with a $\$1$M xs $\$500$K per-risk treaty estimates gross and net separately by chain ladder (\$000s):
>
> | AY | Gross ult | Gross rep | Net ult | Net rep |
> |---|---|---|---|---|
> | 2023 | $10{,}000$ | $7{,}000$ | $8{,}600$ | $6{,}200$ |
> | 2024 | $11{,}000$ | $5{,}000$ | $10{,}300$ | $4{,}300$ |
>
> Are the implied ceded reserves reasonable?
>
> > [!answer]-
> > $$
> > \begin{align*}
> > \text{Ceded IBNR}_{2023} &= (10{,}000 - 8{,}600) - (7{,}000 - 6{,}200) \\
> > &= 600 \\
> > \text{Ceded IBNR}_{2024} &= (11{,}000 - 10{,}300) - (5{,}000 - 4{,}300) \\
> > &= 0
> > \end{align*}
> > $$
> >
> > For 2024, the whole gross IBNR of $6{,}000$ is retained, and the ceded ultimate equals what has already been ceded. For an excess treaty at $12$ months that is implausible. Claims pierce the retention *late*, so ceded IBNR should be the largest part of ceded ultimate for the youngest year. The net chain ladder has applied net factors to a diagonal with too few large claims yet.
> >
> > A better approach is to estimate ceded directly, for example with the expected claims or BF method using a ceded expected ratio from pricing or exposure rating. If that ratio is $12\%$ of gross ultimate, ceded ultimate is $1{,}320$ and ceded IBNR is $620$. Net then follows as $11{,}000 - 1{,}320 = 9{,}680$, which is $620$ below the separate net projection.
