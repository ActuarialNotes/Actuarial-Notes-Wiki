---
verification:
  status: stale
  confidence: null
  last_checked: 2026-10-10
  last_checked_by: agent:validate-v1
  content_hash: sha256:21ba0315156bfbdff8a3c683d9cf00fdd126edb950606e4ec6a58bc93af2119e
  sources:
    - "NAIC, Accounting Practices and Procedures Manual, as of March 2025, Part 1 (Indiana DOI copy), SSAP No. 55 ¶4, 6.c.i-ii incl. footnote 1 (PDF pp.362-363), sha256:a29e7223b53854eff1beb79c3fd6a969c54529d2dacc74510ea122a5c7b4ad13 — https://www.in.gov/idoi/files/INDAP25-Pt-1.pdf"
    - "Werner & Modlin, Basic Ratemaking (CAS, 5th ed. May 2016), Ch.1 p.9, Ch.3 p.42, Ch.6 pp.94-97, 121-123 (PDF pp.21, 54, 106-109, 133-135) — prior-pass source, re-fetched this run, hash unchanged, sha256:6b214d4db52674df2e83343920c06781e491254bd77f27e32ba312faaff3782c — https://www.casact.org/sites/default/files/2021-03/5_Werner_Modlin.pdf"
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Loss and Loss Adjustment Expense.md
---

![[Media/Figures/Loss_and_Loss_Adjustment_Expense.svg|340]]

**Loss and Loss Adjustment Expense** (loss and LAE) is the total cost of claims: the indemnity paid to claimants plus everything spent investigating, defending and settling those claims. It is the numerator of both the [[Pure Premium Method|pure premium]] and the [[Loss Ratio Method|loss ratio]] indication. It has three parts:

> $$\text{Loss \& LAE} = \text{Loss} + \text{ALAE} + \text{ULAE}$$

- $\text{Loss}$ is the indemnity paid or payable to claimants.
- $\text{ALAE}$ is the [[Allocated Loss Adjustment Expense|allocated loss adjustment expense]], the expense of a particular claim, such as defense counsel, expert witnesses, independent adjusters and court costs.
- $\text{ULAE}$ is the [[Unallocated Loss Adjustment Expenses ULAE|unallocated loss adjustment expense]], the claims department's overhead, such as staff salaries, systems and occupancy.

ALAE is claim-specific. Because it attaches to a claim, it can be carried inside the loss triangle and developed with the losses. ULAE cannot be traced to a claim, so it is estimated in aggregate. A rate indication includes ULAE as well as ALAE, since both are costs of settling the claims the rates pay for.

## Loading ULAE

The classical method measures ULAE as the ratio of calendar-year paid ULAE to calendar-year paid loss plus ALAE:

> $$\text{ULAE Ratio} = \frac{\text{Calendar Year Paid ULAE}}{\text{Calendar Year Paid Loss and ALAE}}$$

- Both are paid in the same calendar years, so the ratio is a share of loss and ALAE.

The ratio is applied to loss plus ALAE that has been adjusted for extraordinary events, development and trend. Loss and ALAE is loaded by multiplying it by one plus the ULAE ratio. In the same way, an LAE provision stated as a share of losses is a load, multiplying the losses. An LAE provision stated as a share of premium is added to the loss ratio instead.

> [!example]- An accident year has ultimate losses of $\$650{,}000$ and ultimate ALAE of $\$78{,}000$, with ULAE loaded at $4\%$ of loss and ALAE. Earned premium is $\$1{,}200{,}000$, and the permissible loss ratio is 65%. What are the loss and LAE ratio and the indicated change? {Example}
> - The ULAE is $0.04 \times (650{,}000 + 78{,}000) = \$29{,}120$.
> - The loss and LAE is $728{,}000 \times 1.04 = \$757{,}120$.
> - The loss and LAE ratio is $757{,}120/1{,}200{,}000 = 63.1\%$.
> - The indicated change is $0.631/0.65 - 1 = -2.9\%$.

## Adjusting losses for ratemaking

The ratemaking adjustments on the loss side are:

1. Start with reported losses.
2. Remove extraordinary [[Large Loss|shock]] and [[Catastrophe Loss|catastrophe]] losses.
3. **Develop** to ultimate ([[Loss Development]]).
4. **Trend** to the forecast period ([[Loss Trend]]).
5. Restate for benefit or coverage changes.
6. Add back a long-term large-loss and catastrophe provision.
7. Load ULAE.

Werner & Modlin prescribe no single order. A catastrophe provision is added to losses that have already been trended and developed, since trending and developing it again would over-adjust it, and the ULAE ratio is applied to losses already adjusted.

> [!example]- Accident Year 2023 reported losses at 24 months are $\$5{,}000{,}000$, including a $\$2{,}000{,}000$ shock loss. The reported CDF is 1.28, loss trend is 5% a year over a 2.5-year trend period, and the long-run large-loss load is 6% of non-shock losses. What are the projected losses before LAE? {Example}
> - The shock loss is removed first, because a [[Large Loss|large loss]] does not develop like ordinary claims and would be multiplied by the CDF, leaving $\$3{,}000{,}000$.
> - Developed to ultimate, the losses are $3{,}000{,}000 \times 1.28 = \$3{,}840{,}000$.
> - Trended, they are $3{,}840{,}000 \times 1.05^{2.5} = \$4{,}338{,}149$.
> - The large-loss provision is the long-run expected load, not this year's actual shock loss, so the projected losses are $4{,}338{,}149 \times 1.06 = \$4{,}598{,}438$.
> - LAE is loaded next, and only then are the losses divided by exposures or premium.

## Statutory classification of LAE

The statutory Annual Statement calls the two kinds of LAE **Defense and Cost Containment (DCC)** and **Adjusting and Other (AO)**. They do not match ALAE and ULAE exactly, which matters when using industry data. Statutory accounting follows SSAP No. 55. Losses and LAE are recognized as expenses when a covered event occurs, with a liability for the unpaid amount ([[Unpaid Claims]]). Defense and cost containment (DCC) covers defense, litigation and medical cost containment expenses, internal or external, including attorney fees incurred under a duty to defend, surveillance, litigation management and the cost of experts. Adjusting and other (AO) covers the rest, such as fees and expenses of adjusters and settling agents and attorney fees incurred to determine coverage, including litigation between the insurer and the policyholder. Extra-contractual and bad-faith losses are included in losses.

> [!example]- An insurer pays one attorney to defend its insured against a liability suit and another to decide whether the policy covers the suit at all. How is each fee classified under SSAP No. 55? {Example}
> - The defense attorney's fee is incurred under the duty to defend, so it is DCC.
> - The coverage attorney's fee is incurred to determine coverage, so it is AO.
> - Both are LAE, recognized when the covered event occurs, not when they are paid.

> [!trap] Developing the shock loss
> A shock loss left in the data is multiplied by the CDF with the ordinary losses. In the example, developing the $\$2{,}000{,}000$ shock loss at 1.28 adds $\$560{,}000$ of development it will not have, before trend makes it larger. Remove it first and replace it with the long-run provision.
