---
verification:
  status: in_review
  confidence: null
  last_checked: 2026-10-11
  last_checked_by: agent:validate-v1
  content_hash: sha256:da2100014da4ea8fbbea884decd51b9274c81bd6234ffd085cbb10d9086501ef
  sources:
    - "Teng and Perkins, Estimating the Premium Asset on Retrospectively Rated Policies (PCAS LXXXIII, 1996, pp.611-647), PDF pp.1-4, 13, 18, sha256:30efb7917ebbc6361393f76652a21d97e1915032f94667699904248d1bd900f1 — https://www.casact.org/sites/default/files/2021-03/7_Teng_and_Perkins.pdf"
    - "Friedland, Reserving for Reinsurance (CAS Study Note — Exam 7, (c)2023 CAS; cited by the outline as 2022), PDF p.22, sha256:6da495a26206ececf40a3c3fc8fb3db04556c940242f5bcffe2b21b7e4445ceb — https://www.casact.org/sites/default/files/2022-11/Exam7_Study_Note_Friedland.pdf"
  open_findings: 1
  open_critical: 0
  log: .verify/Concepts/Premium Reserve.md
---

**A premium reserve**, in unpaid-claim work, is the estimate of premium still to be collected or returned on loss-sensitive policies once the losses that determine it have developed: the expected ultimate premium less the premium booked so far. On retrospectively rated policies a positive balance is the **premium asset**, which many insurers call earned but not reported (EBNR) premium. It is estimated alongside the loss reserve, from the same expected future loss emergence.

> $$\text{Premium reserve} = \text{Expected ultimate premium} - \text{Premium booked to date}$$

- **Retrospectively rated policies** are the main case. Premium is a function of the insured's losses, through the basic premium, loss conversion factor and tax multiplier, between a minimum and a maximum. See [[Retrospective Rating]] and [[Retrospective Premium Reserve]].
- **Sign.** A retro rated policy returns premium for good loss experience, so the balance can be either way. A positive balance is an asset; its admitted portion is reported as the "Asset for Accrued Retrospective Premiums". Berry's and Fitzgibbon's **retro reserve** is the same quantity with the opposite sign.
- **It must move with the loss reserve.** Teng and Perkins' [[PDLD Ratio|PDLD method]] projects premium from loss. The cumulative PDLD ratio is the premium expected per dollar of loss still to emerge, so:

  > $$\text{Future premium} = \text{CPDLD} \times \text{Expected future loss emergence}$$

  A higher loss reserve on a retro book therefore means a larger premium asset. The ratio is usually above 1 at the first adjustment, because the basic premium is included and few losses are capped yet. It falls below 1 later, as a decreasing share of each further dollar of loss produces additional premium.
- **Collectability.** A secured premium asset raises little question. For the unsecured portion, a provision for bad debt is needed.
- **Outside retro plans.** Teng and Perkins note there may also be a premium asset on prospectively rated policies from changes in exposure, but they leave it aside. In reinsurance, [[Reinstatements|reinstatement premium]] also depends on losses; Friedland says to track it separately, since it may be earned immediately and can distort the premium-to-loss relationships used to select expected loss ratios.

> [!example]- Premium Asset by the CPDLD Method {Example}
> A retro book is valued at 12/31 (\$000s), using cumulative PDLD ratios of $1.492$ before the first retro adjustment and $0.556$ after it.
>
> | Policy period | Adjustments so far | Expected future loss emergence | Premium booked |
> |---|---|---|---|
> | Recent | none | $12{,}000$ | $18{,}400$ |
> | Older | one | $2{,}500$ | $14{,}200$ |
>
> For the recent periods, the future loss emergence is their whole expected loss, and the booked premium has not yet been adjusted for losses. Estimate the premium reserve.
>
> > [!answer]-
> > $$
> > \begin{align*}
> > \text{Ult premium}_{\text{recent}} &= 12{,}000 \times 1.492 \\
> > &= 17{,}904 \\
> > \text{Reserve}_{\text{recent}} &= 17{,}904 - 18{,}400 \\
> > &= -496 \\
> > \text{Ult premium}_{\text{older}} &= 14{,}200 + 2{,}500 \times 0.556 \\
> > &= 15{,}590 \\
> > \text{Reserve}_{\text{older}} &= 15{,}590 - 14{,}200 \\
> > &= 1{,}390
> > \end{align*}
> > $$
> >
> > The total is a premium asset of $894$. The recent periods carry return premium of $496$: booked premium exceeds what their expected losses will generate.
> >
> > If the loss reserve on the older periods rose by $400$, their premium asset would rise by $400 \times 0.556 = 222$. Booking the higher loss reserve without it would understate the net position. Any unsecured part of the $1{,}390$ also needs a bad-debt provision.
