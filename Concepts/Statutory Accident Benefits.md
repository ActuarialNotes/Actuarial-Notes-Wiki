---
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:ff3ea9e96c972e34ae680b43ea824f85d5e8b720cb290bf31d5add2aa58f6ebc
  sources: []
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Statutory Accident Benefits.md
---

**Statutory Accident Benefits** (SABs, or "accident benefits" / Section B coverage) are the first-party, no-fault benefits every Canadian auto policy must provide to an injured insured regardless of fault: medical and rehabilitation expense, attendant care, income replacement, and death and funeral benefits. The amounts and eligibility rules are set by **regulation**, not by the insurer, and change with each [[Automobile Insurance Reform|reform]].

- **The standard benefit heads:**
  - *Medical and rehabilitation* — treatment, assistive devices, and rehabilitation, subject to a limit that varies by injury category ([[Minor Injury Guideline|minor injury]], non-catastrophic, [[Catastrophic Impairment|catastrophic]]).
  - *Attendant care* — for those who cannot care for themselves; the largest driver of cost in severe claims.
  - *Income replacement* — a percentage of pre-accident gross income up to a weekly cap, after an elimination period.
  - *Non-earner, caregiver, housekeeping* benefits, and *death and funeral* benefits.
- **Injury tiers drive the cost.** A tiered limit structure means the reserving question on a serious file is often not "how much treatment?" but "which tier?" — which is why the [[Catastrophic Impairment]] definition is litigated so heavily and why a definitional change is a large reserve event.
- SABs are **long-tailed**: attendant care and medical benefits on a catastrophic claim can run for the claimant's lifetime, so the liability behaves like a structured annuity and is sensitive to discount rate, mortality and care-cost inflation. See [[IFRS 17 Discount Rates]].
- **Optional increased limits** are available in most provinces; take-up is low, which is itself a consumer-information issue regulators track.
- SABs interact with [[Tort Litigation|tort]]: benefits received are generally deducted from a tort award for the same head of damage ([[Collateral Benefits]]), so the two systems are coordinated rather than cumulative.
- Disputes are resolved through a **provincially prescribed process** — in Ontario, the Licence Appeal Tribunal rather than the courts — and the cost and speed of that process is itself a reform target.

> [!example]- Reserving a Tiered Accident Benefit Claim {Example}
> A claimant has been designated non-catastrophic, with a medical/rehabilitation limit of $\$65{,}000$ and an attendant care limit of $\$36{,}000$. Paid to date: $\$41{,}000$ medical, $\$22{,}000$ attendant care. Counsel has applied for a [[Catastrophic Impairment|catastrophic]] designation, which would raise the combined limit to $\$1{,}000{,}000$. The actuary assesses a $30\%$ probability the application succeeds.
>
> How should the case be reserved?
>
> > [!answer]-
> > The reserve is a probability-weighted estimate over two very different outcomes, not a point estimate of "current treatment plan."
> >
> > **If the designation fails**, the exposure is bounded by the remaining limits:
> >
> > $$\begin{align*}
> > \text{Remaining} &= (\$65{,}000 - \$41{,}000) + (\$36{,}000 - \$22{,}000) \\
> > &= \$24{,}000 + \$14{,}000 \\
> > &= \$38{,}000
> > \end{align*}$$
> >
> > **If it succeeds**, the limit ceases to bind and the claim becomes a lifetime care exposure — plausibly several hundred thousand dollars on a present-value basis. Take $\$600{,}000$ as the assessed amount.
> >
> > $$\begin{align*}
> > \text{Reserve} &= 0.70(\$38{,}000) + 0.30(\$600{,}000) \\
> > &= \$26{,}600 + \$180{,}000 \\
> > &= \$206{,}600
> > \end{align*}$$
> >
> > Two observations that matter more than the arithmetic:
> >
> > - The reserve is **five times** the bounded outcome, driven entirely by the tail. Reserving such a file at its current limit is the single most common source of adverse development in accident benefits.
> > - This distribution is severely skewed, so the [[Risk Adjustment for Non-Financial Risk|risk adjustment]] on a book of such claims should be larger than a symmetric-error assumption would suggest.
