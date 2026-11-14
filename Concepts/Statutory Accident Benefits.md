---
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:dd148bf02aa986949c36b3069398e0d9e8419519d25a4be6f52a6adabd102549
  sources: []
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Statutory Accident Benefits.md
---
![[Media/Figures/Statutory_Accident_Benefits.svg|340]]

**Statutory Accident Benefits** (SABs, also called accident benefits or Section B coverage) are the first-party, no-fault benefits every Canadian auto policy must provide to an injured insured regardless of fault. The amounts and eligibility rules are set by regulation, not by the insurer, and change with each [[Automobile Insurance Reform|reform]].

The standard benefit heads are:

1. **Medical and rehabilitation**: treatment, assistive devices and rehabilitation, subject to a limit that varies by injury category.
2. **Attendant care**: care for those who cannot care for themselves, the largest driver of cost in severe claims.
3. **Income replacement**: a percentage of pre-accident gross income, up to a weekly cap, after an elimination period.
4. **Non-earner, caregiver and housekeeping** benefits.
5. **Death and funeral** benefits.

Optional increased limits are available in most provinces. Take-up is low, which is itself a consumer-information issue regulators track.

## Injury tiers

The medical, rehabilitation and attendant care limits depend on the injury category: [[Minor Injury Guideline|minor injury]], non-catastrophic or [[Catastrophic Impairment|catastrophic]]. Because of these tiers, the reserving question on a serious file is often which tier applies rather than how much treatment is needed. That is why the [[Catastrophic Impairment|catastrophic impairment]] definition is litigated so heavily, and why a change to the definition is a large reserve event.

SABs are long-tailed. Attendant care and medical benefits on a catastrophic claim can run for the claimant's lifetime, so the liability behaves like a structured annuity and is sensitive to the [[IFRS 17 Discount Rates|discount rate]], mortality and care-cost inflation.

> [!example]- How should this accident benefits claim be reserved? {Example}
> A claimant is designated non-catastrophic, with a medical and rehabilitation limit of $\$65{,}000$ and an attendant care limit of $\$36{,}000$. Paid to date are $\$41{,}000$ medical and $\$22{,}000$ attendant care. Counsel has applied for a catastrophic designation, which would raise the combined limit to $\$1{,}000{,}000$. The actuary assesses a $30\%$ probability that the application succeeds, and a lifetime care exposure of $\$600{,}000$ on a present-value basis if it does.
>
> > [!answer]-
> > - The reserve is a probability-weighted estimate over two very different outcomes.
> > - If the designation fails, the exposure is the remaining limits, $(65{,}000 - 41{,}000) + (36{,}000 - 22{,}000) = \$38{,}000$.
> > - If it succeeds, the limit ceases to bind and the exposure is $\$600{,}000$.
> > - The reserve is $0.70 \times 38{,}000 + 0.30 \times 600{,}000 = 26{,}600 + 180{,}000 = \$206{,}600$.
> > - That is more than five times the bounded outcome, driven by the tail. The skewed outcome also calls for a larger [[Risk Adjustment for Non-Financial Risk|risk adjustment]] on a book of such claims than a symmetric-error assumption would give.

> [!trap] Reserving a file at its current limit
> A file that could move to the catastrophic tier is not bounded by its current limits. Reserving it at the remaining limit, $\$38{,}000$ in the example, ignores the tail, and it is the single most common source of adverse development in accident benefits.

## Interaction with tort

SABs interact with [[Tort Litigation|tort]]. Benefits received are generally deducted from a tort award for the same head of damage ([[Collateral Benefits|collateral benefits]]), so the two systems are coordinated rather than cumulative.

## Dispute resolution

Disputes are resolved through a provincially prescribed process. In Ontario this is the Licence Appeal Tribunal rather than the courts, and the cost and speed of the process is itself a reform target.
