---
verification:
  status: stale
  confidence: null
  last_checked: 2026-10-18
  last_checked_by: agent:validate-v1
  content_hash: sha256:360e9cccd1c67ffae2aed351f85abb1efb7ae4de64464a8a00833e2c798b229c
  sources:
    - "Clark, Basics of Reinsurance Pricing (CAS Study Note, revised 2014), pp.22-23 (working layer, exposed excess, clash covers), p.29 (casualty exposure factor), pp.24-25 (ALAE pro rata vs part of loss), sha256:1c4429fee538cc8d90157c1849ca689a3a2173a2670fc57f212d866b493e2c63 — https://www.casact.org/sites/default/files/old/studynotes_clark_2014.pdf"
    - "CAS Exam 9 Content Outline, Fall 2026, pp.3, 7 (task A1-A3, readings Clark and Bernegger), sha256:be1980d41470fed30dec1b9af9412f4e936d666e65d01237684acde11f3e7fc8 — https://www.casact.org/sites/default/files/2026-03/Exam_9_CO_2026_Fall.pdf"
  open_findings: 1
  open_critical: 0
  log: .verify/Concepts/Clash Cover.md
---

A **Clash Cover** is a high casualty per-occurrence [[Excess of Loss|excess of loss]] layer, attaching above the policy limits the cedant writes. A loss on one policy normally cannot reach it. It is penetrated when several policies (or lines) are involved in the same occurrence, when extra-contractual obligations (ECO) or awards in excess of policy limits (XPL) are paid, or when ALAE added to loss pushes an occurrence over the retention.

For a layer with retention $R$ and limit $L$, the clash recovery on one occurrence is

> $$Y = \min\left(\max\left(\sum_{j \in \text{occ}} (X_j + E_j) - R,\; 0\right),\; L\right)$$

- The sum runs over every policy $j$ involved in the occurrence.
- $X_j$ is the loss paid under policy $j$, including any ECO or XPL amount the treaty covers.
- $E_j$ is the ALAE counted with the loss, with $E_j = 0$ when ALAE is shared pro rata instead.
- $R$ is set at or above the largest policy limit.

Contract wording drives the exposure: whether ALAE is added to loss, whether ECO and XPL are covered, and how an "occurrence" is defined. See [[Reinsurance Contract Provisions]] and [[Types of Reinsurance]].

> [!example]- How much does this clash cover pay in each case? {Example}
> A cedant writes general liability with limits up to $\$2\text{M}$ and buys a clash cover of $\$3\text{M}$ xs $\$2\text{M}$ per occurrence, with ALAE added to loss.
>
> - (a) One policy pays a full $\$2\text{M}$ limit plus $\$300\text{K}$ of ALAE.
> - (b) A scaffold collapse involves two insureds. The contractor's policy pays $\$2\text{M}$ plus $\$300\text{K}$ of ALAE, and the subcontractor's pays $\$800\text{K}$ plus $\$150\text{K}$ of ALAE.
> - (c) As (a), but ALAE is shared pro rata with loss rather than added to it.
>
> > [!answer]-
> > - (a) The occurrence total is $2.0 + 0.3 = \$2.3\text{M}$, so the layer pays $2.3 - 2.0 = \$0.3\text{M}$. The ALAE alone pierced the layer.
> > - (b) The occurrence total is $2.0 + 0.3 + 0.8 + 0.15 = \$3.25\text{M}$, so the layer pays $\min(3.25 - 2.0,\ 3.0) = \$1.25\text{M}$. The recovery comes from the two policies combining.
> > - (c) The limit now applies to loss only. The $\$2\text{M}$ loss does not exceed the $\$2\text{M}$ retention, so the layer pays nothing, and there is no ceded loss for the ALAE to follow.
> > - The same event costs the clash reinsurer $\$0.3\text{M}$ or nothing depending on one clause, so ALAE treatment has to be settled before pricing.

## Casualty layers

Clark divides casualty excess layers into three:

1. A **working layer**, penetrated often.
2. An **exposed excess** layer, attaching below some policy limits.
3. A **clash** layer, attaching above them.

The boundaries are soft in pricing.

## Exposure rating a clash layer

The casualty exposure factor for a policy with limit $PL$ is

> $$\frac{E[X \wedge \min(PL, R+L)] - E[X \wedge \min(PL, R)]}{E[X \wedge PL]}$$

- $E[X \wedge c]$ is the [[Limited Expected Value|limited expected value]] of the loss at $c$.

The factor vanishes when $R \geq PL$. A standard exposure rating therefore says a clash layer has no exposure, which is false. Its loss cost comes from how policies and expenses combine, not from any single policy's [[Severity Distribution|severity]].

## Pricing a clash layer

For large cedants, clash losses can be frequent enough for experience rating to guide the price. Otherwise the price is a judgment about how often one occurrence involves several of the cedant's insureds (a multi-vehicle crash, a construction accident, a product defect) or several lines (workers compensation and general liability in one explosion). It is also a judgment about ECO and XPL exposure from [[Bad Faith Damages|bad-faith]] claims. Loss frequency is low, severity is high and the rate on line is modest, so the uncertainty is large relative to the [[Loss Cost|loss cost]].

> [!example]- What are this clash layer's loss cost, premium, rate on line and payback? {Example}
> For the $\$3\text{M}$ xs $\$2\text{M}$ clash layer above, exposure rating gives zero. The cedant's own history and industry data suggest an occurrence that pierces $\$2\text{M}$ about once every 8 years, with an average of $\$1.2\text{M}$ in the layer when it does. Because of the parameter uncertainty, the reinsurer prices to a 50% loss ratio.
>
> > [!answer]-
> > - The loss cost is $1.2\text{M}/8 = \$150{,}000$.
> > - The premium is $150{,}000/0.50 = \$300{,}000$.
> > - The rate on line is the premium over the layer limit, and the payback is the limit over the premium.
> > - The rate on line is $0.3/3 = 10\%$ and the payback is $3/0.3 = 10$ years.
> > - If the frequency were one in five years, the loss cost would rise to $\$240{,}000$, and the same premium would imply an 80% loss ratio.
