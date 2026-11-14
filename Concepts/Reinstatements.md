---
verification:
  status: stale
  confidence: null
  last_checked: 2026-10-18
  last_checked_by: agent:validate-v1
  content_hash: sha256:b572a0d70c7296215dbdec67ec70cf5a26009fbbd21bc1922b32cd9a89cab805
  sources:
    - "Clark, Basics of Reinsurance Pricing (CAS Study Note, revised 2014), pp.43-44 (reinstatement premium, pro rata as to amount/time, aggregate limit, payback approach), sha256:1c4429fee538cc8d90157c1849ca689a3a2173a2670fc57f212d866b493e2c63 — https://www.casact.org/sites/default/files/old/studynotes_clark_2014.pdf"
    - "CAS Exam 9 Content Outline, Fall 2026, pp.3, 7 (task A1-A3, readings Clark and Bernegger), sha256:be1980d41470fed30dec1b9af9412f4e936d666e65d01237684acde11f3e7fc8 — https://www.casact.org/sites/default/files/2026-03/Exam_9_CO_2026_Fall.pdf"
    - "SOA GI 301 syllabus, Mar 2027/Jul 2027, p.9, Topic 7 (Clark, outcomes 7e-h), sha256:491e74c9baec0e9f74552e9c589f0738d914c4d340827727b0d78bea4e23d72e — https://www.soa.org/globalassets/assets/files/edu/2026/gi-301/2027-03-gi-301-syllabus.pdf"
  open_findings: 1
  open_critical: 0
  log: .verify/Concepts/Reinstatements.md
---

A **Reinstatement** restores the limit of an [[Excess of Loss|excess of loss]] layer, typically a property catastrophe cover, after a loss has used it up, so the layer is available again for a later event in the same period. A reinstatement is usually paid for with a **reinstatement premium**, most often *pro rata as to amount* and less often also *pro rata as to time*.

## Reinstatement premium

Pro rata as to amount, the reinstatement premium is

> $$\text{RP} = P \times r \times \frac{\text{Limit reinstated}}{L}$$

- $P$ is the annual (up-front) premium.
- $r$ is the reinstatement rate, such as $100\%$, or the $110\%$ in Clark's illustration.
- $L$ is the occurrence limit.

*Pro rata as to time* multiplies RP by the fraction of the term left at the loss date. Clark notes few contracts do this, because catastrophes such as hurricanes are seasonal.

> [!example]- What are the recovery and the reinstatement premium on this cover, and what cover remains? {Example}
> A calendar-year catastrophe cover is $\$20$M xs $\$30$M with an annual premium of $\$3$M and one reinstatement at $100\%$. A hurricane on September 1 causes a gross loss of $\$42$M.
>
> > [!answer]-
> > - The layer loss is $\min(\max(42 - 30, 0), 20) = \$12$M, which is the recovery.
> > - Pro rata as to amount, $\text{RP} = \$3\text{M} \times 1.00 \times 12/20 = \$1.8$M.
> > - Also pro rata as to time, with four of twelve months left, $\text{RP} = \$1.8\text{M} \times 4/12 = \$0.6$M.
> > - As to amount only, the cedant's net cost of the event is its $\$30$M retention plus the $\$1.8$M RP, or $\$31.8$M.
> > - The full $\$20$M occurrence limit is available again for the next event.
> > - Of the $\$40$M aggregate limit, $\$28$M remains, and $\$8$M of reinstatement capacity is left after the $\$12$M reinstated.

## Aggregate limit

With $n$ reinstatements the most the reinsurer pays in a year is $(1+n)L$. The aggregate limit is

> $$\text{Aggregate limit} = (1 + n)\,L$$

- $n$ is the number of reinstatements.

Pro rata as to amount means that, with one reinstatement, four half-limit losses produce the same result as two full-limit losses. Once the aggregate limit is used up, the cedant keeps every further loss. Its net cost of an event is its retention, plus any loss above the limit, plus the RP.

## Pricing a layer with reinstatements

A layer is priced from [[Catastrophe Modelling|catastrophe model]] output, the annual loss to the layer ([[Catastrophe Expected Loss Cost]]). Limiting reinstatements caps the expected ceded loss at $E[\min(S, (1+n)L)]$. Expected reinstatement premium is additional premium, so the expected total premium is

> $$P\left(1 + r\,\frac{E[\min(S,\, nL)]}{L}\right)$$

- $S$ is the year's total loss to the layer before any aggregate cap.

Setting this equal to the required total premium gives $P$. *Free* reinstatements ($r = 0$) must be paid for in $P$ instead. Before models, the *payback* approach set $P$ so that $L$ would be repaid over a chosen number of years. See [[Reinsurance Contract Provisions]].

> [!example]- What up-front premium meets this reinsurer's target? {Example}
> A $\$10$M xs $\$10$M catastrophe layer has one reinstatement at $100\%$, pro rata as to amount. The reinsurer targets a $60\%$ loss ratio on total premium. The annual loss to the layer, before any cap, is:
>
> | Layer loss | Probability | Events |
> | ---: | ---: | :--- |
> | \$0 | 0.80 | none |
> | \$5M | 0.10 | one partial |
> | \$10M | 0.06 | one full |
> | \$20M | 0.03 | two full |
> | \$30M | 0.01 | three full |
>
> > [!answer]-
> > - The aggregate limit is $\$20$M, so ceded loss is $0, 5, 10, 20, 20$ and $E[\text{Ceded}] = 0.10(5) + 0.06(10) + 0.03(20) + 0.01(20) = 1.9$.
> > - Limit reinstated, $\min(S, 10)$, is $0, 5, 10, 10, 10$, so $E[\min(S, 10)] = 1.5$.
> > - The required total premium is $1.9/0.60 = \$3.167$M.
> > - $P(1 + 1.5/10) = 3.167$, so $P = 3.167/1.15 = \$2.754$M, a rate on line of $27.5\%$.
> > - With a free reinstatement the whole $\$3.167$M must be charged up front.
> > - With no reinstatement expected loss falls to $\$1.5$M and $P = 1.5/0.60 = \$2.5$M.

> [!trap] Leaving the reinstatement premium out of the price
> Expected reinstatement premium is premium the reinsurer will collect, so the up-front premium needed to hit a target is lower by the factor $1 + r\,E[\min(S, nL)]/L$. A reinsurer that ignored it would overprice the cover, charging $\$3.167$M up front in the example instead of $\$2.754$M.
