---
verification:
  status: stale
  confidence: null
  last_checked: 2026-10-16
  last_checked_by: agent:validate-v1
  content_hash: sha256:18bb7449c55f33990f2558c8a8fa877eee6f14260245af0f54959ddc95b0559c
  sources:
    - "Teng and Perkins, Estimating the Premium Asset on Retrospectively Rated Policies (PCAS LXXXIII, 1996, pp.611-647), PDF pp.1-4, 11-13, 18, sha256:30efb7917ebbc6361393f76652a21d97e1915032f94667699904248d1bd900f1 — https://www.casact.org/sites/default/files/2021-03/7_Teng_and_Perkins.pdf"
    - "Friedland, Reserving for Reinsurance (CAS Study Note — Exam 7, (c)2023 CAS; cited by the outline as 2022), PDF pp.22, sha256:6da495a26206ececf40a3c3fc8fb3db04556c940242f5bcffe2b21b7e4445ceb — https://www.casact.org/sites/default/files/2022-11/Exam7_Study_Note_Friedland.pdf"
    - "CAS, Exam 7 Content Outline, Fall 2026 (Exam_7_CO_2026_F v04 2026_9_16), PDF pp.3-6 (tasks A.ii.4 = 5, A.v.1-3 = 15-17; Teng and Perkins excluding Section 5 with Feldblum Sections 1-2; Friedland A.v.1-A.v.3), sha256:be1833c4f35a9344e33b1c48336dca9724d6556890997b3d8715f9de709ca5ed — https://www.casact.org/sites/default/files/2026-03/Exam_7_CO_2026_Fall.pdf"
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Premium Reserve.md
---
A **Premium Reserve**, in unpaid-claim work, is the estimate of premium still to be collected or returned on loss-sensitive policies once the losses that determine it have developed. It is the expected ultimate premium less the premium booked so far. The premium reserve is

> $$\text{Premium reserve} = \text{Expected ultimate premium} - \text{Premium booked to date}$$

It is estimated alongside the loss reserve, from the same expected future loss emergence.

## Retrospectively rated policies

Policies written under [[Retrospective Rating|retrospective rating]] are the main case. Premium is a function of the insured's losses, through the basic premium, loss conversion factor and tax multiplier, between a minimum and a maximum. The premium reserve on these policies is the [[Retrospective Premium Reserve|retrospective premium reserve]].

A retro rated policy returns premium for good loss experience, so the balance can be either way. A positive balance is the **premium asset**, which many insurers call earned but not reported (EBNR) premium. Its admitted portion is reported as the "Asset for Accrued Retrospective Premiums". Berry's and Fitzgibbon's **retro reserve** is the same quantity with the opposite sign.

A secured premium asset raises little question. For the unsecured portion, a provision for bad debt is needed.

## The premium asset by the PDLD method

Teng and Perkins' [[PDLD Ratio|PDLD method]] projects premium from loss, so the premium asset moves with the loss reserve. The cumulative PDLD ratio is the premium expected per dollar of loss still to emerge, so:

> $$\text{Future premium} = \text{CPDLD} \times \text{Expected future loss emergence}$$

- $\text{CPDLD}$ is the cumulative PDLD ratio for the next retro adjustment the policy period will undergo.

The expected ultimate premium is the premium booked at the latest retro adjustment plus the future premium. A higher loss reserve on a retro book therefore means a larger premium asset. The ratio is usually above 1 at the first adjustment, because the basic premium is included and few losses are capped yet. It falls below 1 later, as a decreasing share of each further dollar of loss produces additional premium.

> [!example]- What is the premium reserve on this retro book? {Example}
> A retro book is valued at 12/31 ($000s), using cumulative PDLD ratios of $1.492$ before the first retro adjustment and $0.556$ after it.
>
> | Policy period | Adjustments so far | Expected future loss emergence | Premium booked |
> | :--- | :--- | ---: | ---: |
> | Recent | none | 12,000 | 18,400 |
> | Older | one | 2,500 | 14,200 |
>
> For the recent periods, the future loss emergence is their whole expected loss, and the booked premium has not yet been adjusted for losses.
>
> > [!answer]-
> > - The recent periods' ultimate premium is $12{,}000 \times 1.492 = 17{,}904$, so their reserve is $17{,}904 - 18{,}400 = -496$, a return premium.
> > - The older periods' ultimate premium is $14{,}200 + 2{,}500 \times 0.556 = 15{,}590$, so their reserve is $15{,}590 - 14{,}200 = 1{,}390$.
> > - The total is a premium asset of $1{,}390 - 496 = 894$.

## Premium reserves outside retro plans

Teng and Perkins note there may also be a premium asset on prospectively rated policies from changes in exposure, but they leave it aside. In reinsurance, [[Reinstatements|reinstatement premium]] also depends on losses. Friedland says to track it separately, since it may be earned immediately and can distort the premium-to-loss relationships used to select expected loss ratios.

> [!trap] Raising the loss reserve without the premium asset
> On a retro book, more expected loss means more premium. If the loss reserve on the older periods above rose by $400$, their premium asset would rise by $400 \times 0.556 = 222$, and booking the loss alone would understate the net position.
