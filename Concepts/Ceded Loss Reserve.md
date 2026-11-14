---
verification:
  status: stale
  confidence: null
  last_checked: 2026-10-16
  last_checked_by: agent:validate-v1
  content_hash: sha256:017b885f0ae9d537cebea0a282f57e1c4e2f1540e1e0a563d5d2c12648fc93bd
  sources:
    - "Friedland, Reserving for Reinsurance (CAS Study Note — Exam 7, (c)2023 CAS; cited by the outline as 2022), PDF pp.9-10 (gross/ceded/net, default risk), 17-21 (quota share, surplus share, excess per risk), 24 (aggregate stop-loss protects net results), 26-29 (LOD vs risks-attaching, commutation), 39 (historical terms), 45 (reporting lags and thresholds), 50-51 (two approaches; ceded credibility), 55 (higher factors, tails and trend), 73-76 (quota share by year and policy year on RA; Tables 3.13-3.15; stop-loss applies last), sha256:6da495a26206ececf40a3c3fc8fb3db04556c940242f5bcffe2b21b7e4445ceb — https://www.casact.org/sites/default/files/2022-11/Exam7_Study_Note_Friedland.pdf"
    - "CAS, Exam 7 Content Outline, Fall 2026 (Exam_7_CO_2026_F v04 2026_9_16), PDF pp.3-6 (tasks A.ii.4 = 5, A.v.1-3 = 15-17; Teng and Perkins excluding Section 5 with Feldblum Sections 1-2; Friedland A.v.1-A.v.3), sha256:be1833c4f35a9344e33b1c48336dca9724d6556890997b3d8715f9de709ca5ed — https://www.casact.org/sites/default/files/2026-03/Exam_7_CO_2026_Fall.pdf"
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Ceded Loss Reserve.md
---
A **Ceded Loss Reserve** is the part of an insurer's unpaid claims (case reserves plus IBNR, and loss adjustment expense where the treaty covers it) expected to be recovered from reinsurers under the contracts in force. It is the unpaid portion of [[Ceded Losses|ceded losses]].

Unpaid claims are ultimate minus paid, gross, ceded and net alike, and the ceded unpaid claims are

> $$\text{Ceded unpaid} = \text{Gross unpaid} - \text{Net unpaid}$$

Ceded IBNR is found the same way from the ceded ultimate and the ceded reported claims. The ceded IBNR is

> $$\text{Ceded IBNR} = \text{Ceded ultimate} - \text{Ceded reported}$$

It also equals gross IBNR minus net IBNR. The recovery carries credit risk. It can be commuted ([[Commutations]]) or lost if the reinsurer cannot pay ([[Reinsurance Credit Risk]]), and the liability then falls back on the cedant, which keeps the contract with its policyholders.

## Ceded losses by type of treaty

Each [[Types of Reinsurance|type of reinsurance]] cedes a different part of the gross losses.

- **[[Quota Share|Quota share]]** cedes a fixed percentage of ultimate, paid, case and IBNR alike. When the percentage changes, it follows the *policy* year on a risks-attaching treaty and the *accident* year on a losses-occurring-during treaty.
- **[[Surplus Share|Surplus share]]** varies the cession by risk.
- **[[Stop-Loss Reinsurance|Stop-loss]]** and **[[Aggregate Excess of Loss|aggregate excess]]** covers cap the retained total. A stop-loss limit is applied to the ultimate, reported and paid amounts alike, or the net IBNR can come out negative.

Under a per-risk or per-occurrence [[Excess of Loss|excess of loss]] layer of limit $L$ excess of a retention $R$, the ceded loss on a claim of size $X$ is

> $$\text{Ceded} = \min(\max(X - R, 0), L)$$

The layer applies $\min(\max(X - R, 0), L)$ to projected ultimates of large claims. It is applied one claim at a time, and the recoverables are summed. Alternatively, develop a ceded triangle, or run the Bornhuetter-Ferguson method with a ceded expected loss ratio.

## Inuring order

Covers inure in a stated sequence. Typically per-occurrence excess comes off first, then the quota share applies to what remains, and the stop-loss applies last to protect the final net result. Each later cover applies to the loss net of the recoveries before it.

> [!example]- What are the ceded unpaid claims by cover, and the net unpaid, under these three inuring covers? {Example}
> For one accident year the gross ultimate is $5{,}000$ and gross paid is $3{,}000$ (\$000s). One large claim has an ultimate of $600$ and paid of $100$. The covers inure in this order:
>
> 1. a per-occurrence excess of $400$ xs $200$;
> 2. a $30\%$ quota share;
> 3. a stop-loss capping retained losses after the quota share at $3{,}000$.
>
> > [!answer]-
> > - On the large claim the excess cover cedes an ultimate of $\min(600 - 200, 400) = 400$ and nothing on paid, because $100 < 200$. Its ceded unpaid is $400$.
> > - That leaves an ultimate of $4{,}600$ and paid of $3{,}000$ for the quota share.
> > - The quota share cedes $30\%$: an ultimate of $1{,}380$ and paid of $900$, so its ceded unpaid is $480$.
> > - The retained ultimate is $3{,}220$ and the retained paid $2{,}100$.
> > - **Stop-loss:** the ceded ultimate is $3{,}220 - 3{,}000 = 220$, and nothing is ceded on paid because $2{,}100 < 3{,}000$.
> > - The ceded unpaid is $400 + 480 + 220 = 1{,}100$, and the net unpaid is $3{,}000 - 2{,}100 = 900$.
> > - Check: the gross unpaid is $5{,}000 - 3{,}000 = 2{,}000 = 1{,}100 + 900$.

## Estimating gross, ceded and net

[[Reserving for Reinsurance (Friedland - 2022)|Friedland]] describes two approaches: project gross and net and take ceded as the difference, or project gross and ceded and take net as the difference. Actuaries typically use the first, selecting development patterns and expected loss ratios gross and net. Ceded data often have limited credibility, from a lower volume of losses, volatility from large claims and catastrophes, and frequent changes in attachment points, limits, participation and ALAE treatment.

The three estimates are then checked against each other:

1. ceded is non-negative and net never exceeds gross;
2. on excess of loss cessions, ceded IBNR is a *larger* share of ceded ultimate than gross IBNR is of gross, because excess cessions develop late;
3. on excess of loss cessions, implied ceded development factors exceed gross ones. On a quota share the gross, ceded and net factors are identical.

Trend is leveraged into excess layers, reporting thresholds delay notice, and a change in retention makes prior ceded years non-comparable. The treaty history must be kept alongside the data.

> [!example]- Are the ceded reserves implied by these gross and net chain-ladder estimates reasonable? {Example}
> A cedant with a $\$1$M xs $\$500$K per-risk treaty estimates gross and net separately by chain ladder (\$000s):
>
> | AY | Gross ult | Gross rep | Net ult | Net rep |
> | --- | ---: | ---: | ---: | ---: |
> | 2023 | 10,000 | 7,000 | 8,600 | 6,200 |
> | 2024 | 11,000 | 5,000 | 10,300 | 4,300 |
>
> > [!answer]-
> > - The 2023 ceded IBNR is $(10{,}000 - 8{,}600) - (7{,}000 - 6{,}200) = 600$.
> > - The 2024 ceded IBNR is $(11{,}000 - 10{,}300) - (5{,}000 - 4{,}300) = 0$, so the whole gross IBNR of $6{,}000$ is retained.
> > - Claims pierce an excess retention late, so ceded IBNR should be the largest part of ceded ultimate for the youngest year. A ceded IBNR of zero at 12 months is implausible.
> > - The net chain ladder has applied net factors to a diagonal with too few large claims yet, so the 2024 net projection needs replacing.
> > - If pricing expects $12\%$ of gross ultimate to be ceded, the expected claims method gives a net ultimate of $11{,}000 \times 0.88 = 9{,}680$.
> > - The ceded ultimate is then $1{,}320$ and the ceded IBNR $1{,}320 - 700 = 620$.

> [!trap] Applying the covers in the wrong order
> Applying the quota share before the excess cover in the example above would cede $30\%$ of the large claim to the quota share and change every figure. The treaty wording on inuring decides the order.
