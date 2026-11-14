---
verification:
  status: stale
  confidence: null
  last_checked: 2026-10-18
  last_checked_by: agent:validate-v1
  content_hash: sha256:e5c14e7a33643651aaeb6cdd4b84b9efe9c9fef56f8eedb453bdc49c97300105
  sources:
    - "Clark, Basics of Reinsurance Pricing (CAS Study Note, revised 2014), pp.33-34 (AAD, phi_AAD, Table M analogy), pp.36 and 41-43 (aggregate models, collective risk cautions), p.42 (stop loss), p.43 (aggregate limit with reinstatements), sha256:1c4429fee538cc8d90157c1849ca689a3a2173a2670fc57f212d866b493e2c63 — https://www.casact.org/sites/default/files/old/studynotes_clark_2014.pdf"
    - "CAS Exam 9 Content Outline, Fall 2026, pp.3, 7 (task A1-A3, readings Clark and Bernegger), sha256:be1980d41470fed30dec1b9af9412f4e936d666e65d01237684acde11f3e7fc8 — https://www.casact.org/sites/default/files/2026-03/Exam_9_CO_2026_Fall.pdf"
  open_findings: 1
  open_critical: 0
  log: .verify/Concepts/Aggregate Excess of Loss.md
---

**Aggregate Excess of Loss** reinsurance responds to the **total** of the cedant's losses over a period, usually a year, rather than to any single loss. It is also called **aggregate stop-loss** reinsurance, and it is one of the [[Types of Reinsurance|types of reinsurance]].

The reinsurer pays the aggregate in excess of an aggregate retention $A$, up to an aggregate limit $L_A$. If $S$ is the aggregate loss for the period, the reinsurer's payment is

> $$Y = \min\left(\max(S - A,\, 0),\; L_A\right)$$

- $S$ is the total of all subject losses for the period.

The retention can be a fixed amount or a loss ratio applied to subject premium. Per-risk and per-occurrence covers miss a year of many medium-sized losses, and an aggregate cover protects the year's result against that accumulation.

The reinsurer's expected loss is

> $$E[Y] = E[S \wedge (A + L_A)] - E[S \wedge A]$$

- $E[S \wedge x]$ is the [[Limited Expected Value|limited expected value]] of $S$ at $x$.

$E[Y]$ depends on the whole distribution of $S$, not only on its mean. A stop loss usually attaches above the expected loss ratio, so the expected loss ratio plugged into $Y$ gives zero.

> [!example]- What is the reinsurer's expected loss on this stop loss? {Example}
> A stop loss covers 25 points of loss ratio in excess of a 75% loss ratio on $\$100$ million of subject premium. The cedant's loss ratio has this distribution:
>
> | Loss ratio | Probability |
> | ---: | ---: |
> | 60% | 0.30 |
> | 70% | 0.35 |
> | 80% | 0.20 |
> | 95% | 0.10 |
> | 115% | 0.05 |
>
> > [!answer]-
> > - Each loss ratio times its probability gives 18, 24.5, 16, 9.5 and 5.75 points.
> > - Their sum, the expected loss ratio, is 73.75%, below the 75% attachment.
> > - The points ceded in each outcome are $\min(\max(\text{LR} - 75, 0), 25)$, which are 0, 0, 5, 20 and 25.
> > - The expected points ceded are $0.20(5) + 0.10(20) + 0.05(25)$, which is 4.25.
> > - The reinsurer's expected loss is $0.0425 \times \$100$ million $= \$4.25$ million.
> > - In the 115% year the cover exhausts, and the cedant's net loss ratio is $115 - 25 = 90\%$.

## Annual aggregate deductible

Applied to the losses in an excess layer, the retention is an **annual aggregate deductible** (AAD). The cedant keeps the first layer losses each year but stays protected if there are more than expected. Here $S$ is the annual total of the per-occurrence layer losses. Clark's **excess charge factor**, the share of expected aggregate loss above $A$, is

> $$\phi(A) = \frac{E\left[(S - A)_+\right]}{E[S]}$$

- $(S - A)_+$ is $\max(S - A,\, 0)$.

It is the reinsurance analogue of the [[Table M]] insurance charge in [[Retrospective Rating|retrospective rating]]. For a discrete distribution of $S$, $E[(S - A)_+]$ is the probability-weighted sum of the amounts by which each outcome exceeds $A$. The net loss cost of the layer is

> $$\text{Net Loss Cost} = \phi_{\text{AAD}} \times \text{Layer Loss Cost}$$

- $\phi_{\text{AAD}}$ is the excess charge factor at the AAD.
- $\text{Layer Loss Cost}$ is the layer's loss cost gross of the AAD.

> [!example]- What are $\phi_{\text{AAD}}$ and the net loss cost of this layer? {Example}
> A $\$500$K xs $\$500$K per-occurrence layer has $\$10$M of subject premium, and the cedant proposes an AAD of $\$750$K. The layer's annual aggregate losses are:
>
> | Layer losses | Probability |
> | ---: | ---: |
> | $\$0$ | 0.20 |
> | $\$500$K | 0.30 |
> | $\$1{,}000$K | 0.25 |
> | $\$1{,}500$K | 0.15 |
> | $\$2{,}500$K | 0.10 |
>
> > [!answer]-
> > - Each outcome times its probability gives $\$0$, $\$150$K, $\$250$K, $\$225$K and $\$250$K, so the expected layer loss is $E[S] = \$875$K.
> > - The outcomes above the AAD exceed it by $\$250$K, $\$750$K and $\$1{,}750$K.
> > - The expected excess is $0.25(250) + 0.15(750) + 0.10(1{,}750)$, which is $E[(S - 750)_+] = \$350$K.
> > - The excess charge factor is $\phi_{\text{AAD}} = 350/875 = 0.40$.
> > - The layer's loss cost gross of the AAD is $875/10{,}000 = 8.75\%$ of subject premium.
> > - The net loss cost is $0.40 \times 8.75\% = 3.50\%$ of subject premium.
> > - The cedant expects to retain $875 - 350 = \$525$K, less than the AAD, because in some years the layer losses fall short of it.

## Aggregate limits in other contracts

Aggregate limits appear inside other contracts too. A catastrophe layer with occurrence limit $L$ and $n$ [[Reinstatements|reinstatements]] has an aggregate limit of $(1+n)L$. Aggregate structures are also the building blocks of [[Finite Reinsurance|finite reinsurance]], and an attachment far above the expected loss ratio or a thin limit invites [[Risk Transfer|risk transfer]] scrutiny.

## Pricing with an aggregate loss model

Clark regards the collective risk model, an [[Aggregate Loss Model|aggregate loss model]] of frequency and severity, as generally the best tool for pricing aggregate covers. He gives four cautions:

1. The model is not a black box. Check its CV and percentiles against the data.
2. Occurrences are assumed independent, and so are frequency and severity.
3. Numerical methods can err at low frequencies.
4. The model captures process variance but not parameter variance or model risk.

> [!trap] Pricing at the expected loss ratio
> Putting the expected loss ratio into $Y$ prices most stop losses at zero, because they attach above it. In the stop loss example the expected loss ratio is 73.75%, below the 75% attachment, yet the reinsurer's expected loss is $\$4.25$ million. Price from the whole distribution of $S$.
