---
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:7c15986a0022fd6d3e7ea590277fb17751fe0f55fb0ceb1f1e8c24816b8a0413
  sources: []
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Events Not in Data.md
---

![[Media/Figures/Events_Not_in_Data.svg|340]]

**Events Not in Data** (ENID, also called binary events) are the future outcomes a best estimate of claim liabilities must allow for but that the historical data behind it does not contain. They are typically high-severity, low-probability events, sometimes unforeseeable. Under [[Solvency II]] the best estimate is a probability-weighted average over all possible outcomes, so the working party of the Institute and Faculty of Actuaries ([[IFOA]]) defines the ENID loading as the balancing amount, which is

> $$\text{ENID loading} = \text{BE}_{\text{all possible outcomes}} - \text{BE}_{\text{before ENID}}$$

- $\text{BE}$ is the best estimate of the claim liabilities, the claims and premium provisions.

Because the definition starts from the insurer's own best estimate, the loading varies with its reserving policy as well as its risks. It can be negative, since it must also allow for favourable outcomes not yet reflected, such as a successful new claims process, a court award or a change in legislation in the insurer's favour.

## Why a loading is needed

Article 77(2) of the Solvency II Directive makes the best estimate the probability-weighted average of future cash flows, discounted at the risk-free rate. Statutory reserving had generally used a best estimate of the reasonably foreseeable outcomes instead. The CEIOPS advice the paper quotes adds that deterministic and simulation methods both reproduce the history they are fitted to, so judgement has to add what is not in it. Neither the Directive nor the draft Level 2 text names an "ENID loading" as such. IFRS 17's estimate of future cash flows is also probability-weighted (see [[Fulfilment Cash Flows]]).

## Starting from the existing best estimate

Under §6.5.1, the loading starts from what the best estimate already holds. Where an insurer books an actuarial best estimate plus a management adjustment, specific events behind the adjustment move into the ENID bucket without being counted twice. An adjustment tied to no specific event is margin and comes out of the Solvency II figure.

## Identifying events not in data

Under §6.5.2, underwriters, claims managers, reserving and pricing actuaries and reinsurance managers brainstorm events affecting future settlements on past claims, reported or not, and on the exposure remaining at the valuation date. Only business the insurer is already obligated to counts, so an insurer writing annual policies and accepting business within a month of cover starting looks 13 months ahead.

Candidates include catastrophes, large one-off claims, legislative change, court awards, accumulations and changes in policy terms or claims processing. They are checked for consistency with [[Reverse Stress Testing|reverse stress testing]], the risk register, pricing models, [[Catastrophe Modelling|catastrophe modelling]] and the internal capital model, and documented in minutes.

Under §6.5.3, identifying events is not required to calculate a loading. It gives the basis for a probability/severity approach and a check on another method such as a truncated distribution method. It is "blue sky thinking" that makes participants from different disciplines challenge their view of risk, and for that insight it is likely to be viewed favourably by regulators.

> [!example]- Which of these belong in the ENID loading? {Example}
> A Canadian insurer writes annual auto and property policies and accepts new and renewal business up to one month before cover starts. Valuing its liabilities at 31 December 2025, it considers:
>
> 1. A severe earthquake striking a region where it writes a large share of its property business.
> 2. An appeal which, if it succeeds, would apply a [[Cap on Non-Pecuniary Damages|cap on non-pecuniary damages]] for minor injuries to its open claims.
> 3. A new claims-handling process whose savings the actuarial best estimate already reflects.
> 4. A hailstorm in summer 2027.
> 5. A management adjustment of $3\%$ described only as "a margin for uncertainty".
>
> > [!answer]-
> > - The earthquake belongs, as an adverse event of low probability and high severity that is not in the claims history, on the unexpired exposure.
> > - The appeal belongs, as a favourable court award on past claims that reduces the loading. The 2019 sample answer used this example.
> > - The claims process does not belong, because it is already in the best estimate and adding it again would double count.
> > - The 2027 hailstorm does not belong, because the exposure horizon ends in January 2027 and the storm falls on policies not yet written.
> > - The $3\%$ adjustment does not belong, because an adjustment tied to no specific event is margin and comes out of the best estimate.
> > - Events 1 and 2 belong in the loading.

## Methods for the loading

Section 6.6 lists the methods, although the Fall 2026 outline assigns only §§6.4–6.5, under objective C4. They are truncated statistical distributions, the frequency and severity of representative scenarios, a percentage load from benchmarks and judgement, adjusted reserve parameters, a return-period approach, or no load where existing methods already allow for ENID. In the truncated-distribution approach, the fitted distribution is extended by a judged missing proportion of claims (say $0.5\%$), and the uplift factor is the new mean divided by the old.

> [!example]- What is this insurer's ENID loading by the probability/severity method? {Example}
> The insurer's best estimate before ENID is $\$400$ million. Its workshop identifies three separate events not in its data, with the probability of each over the remaining exposure and its present-value effect on the claims cash flows:
>
> | Event | Probability | Effect |
> | :--- | ---: | ---: |
> | Major earthquake on unexpired exposure | $0.4\%$ | +\$200M |
> | Adverse appellate ruling on open bodily injury claims | $10\%$ | +\$15M |
> | Favourable legislative change on open claims | $20\%$ | −\$5M |
>
> > [!answer]-
> > - Each event adds its probability-weighted effect: $0.004(200) = 0.8$, $0.10(15) = 1.5$ and $0.20(-5) = -1.0$.
> > - The favourable event enters with a negative sign, and omitting it would overstate the loading by $\$1$ million.
> > - The earthquake contributes least of the adverse pair, because a best estimate is a mean and a remote catastrophe enters at its probability-weighted cost.
> > - The paper suggests using a figure like this as a check on a truncated-distribution loading.
> > - The loading is $0.8 + 1.5 - 1.0 = \$1.3$ million, about $0.33\%$ of the best estimate.

> [!trap] Counting only adverse events
> The loading is a balancing amount to a probability-weighted mean, so favourable events not yet in the best estimate enter with a negative sign. Leaving them out overstates the loading.
