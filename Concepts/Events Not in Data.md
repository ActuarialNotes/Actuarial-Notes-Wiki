---
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:6c3f1611298d15b46b5821fa64df8aa8312ca8b7e19a0ce61c19487de5a8409f
  sources: []
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Events Not in Data.md
---

**Events Not in Data** (ENID, also called *binary events*) are the future outcomes a best estimate of claim liabilities must allow for but that the historical data behind it does not contain — typically high-severity, low-probability events, sometimes unforeseeable. Under [[Solvency II]] the best estimate is a probability-weighted average over **all possible** outcomes, so the working party of the Institute and Faculty of Actuaries ([[IFOA]]) defines the ENID loading as the balancing amount between the two.

> $$\text{ENID loading} = \text{BE}_{\text{all possible outcomes}} - \text{BE}_{\text{before ENID}}$$

- $\text{BE}$ is the best estimate of the claim liabilities — the claims and premium provisions.
- **Why a loading is needed.** Article 77(2) of the Solvency II Directive makes the best estimate the probability-weighted average of future cash flows, discounted at the risk-free rate — not the best estimate of the *reasonably foreseeable* outcomes that statutory reserving had generally used. The CEIOPS advice the paper quotes adds that deterministic and simulation methods both reproduce the history they are fitted to, so judgement has to add what is not in it. Neither the Directive nor the draft Level 2 text names an "ENID loading" as such.
- **It depends on the insurer, and it can be negative.** Because the definition starts from the insurer's own best estimate, the loading varies with its reserving policy as well as its risks. It must allow for favourable outcomes not yet reflected too: a successful new claims process, a court award or a change in legislation in the insurer's favour.
- **Start from what the best estimate already holds** (§6.5.1). Where an insurer books an actuarial best estimate plus a management adjustment, specific events behind the adjustment move into the ENID bucket without being counted twice; an adjustment tied to no specific event is margin and comes out of the Solvency II figure.
- **Identifying ENID** (§6.5.2): underwriters, claims managers, reserving and pricing actuaries and reinsurance managers brainstorm events affecting future settlements on **past claims**, reported or not, and on the **exposure remaining** at the valuation date — only business the insurer is already obligated to, so an insurer writing annual policies and accepting business within a month of cover starting looks 13 months ahead. Candidates include catastrophes, large one-off claims, legislative change, court awards, accumulations and changes in policy terms or claims processing, checked for consistency with [[Reverse Stress Testing|reverse stress testing]], the risk register, pricing models, [[Catastrophe Modelling|catastrophe modelling]] and the internal capital model, and documented in minutes.
- **Identifying events is not required to calculate a loading** (§6.5.3), but it gives the basis for a **probability/severity** approach, a check on another method such as a **truncated distribution** method, "blue sky thinking" that makes participants from different disciplines challenge their view of risk, and — for that insight — is likely to be viewed favourably by regulators.
- **Methods** (§6.6 — the Fall 2026 outline assigns only §§6.4–6.5, under objective C4): truncated statistical distributions, frequency/severity of representative scenarios, a percentage load from benchmarks and judgement, adjusted reserve parameters, a return-period approach, or no load where existing methods already allow for ENID. In the truncated-distribution approach the fitted distribution is extended by a judged missing proportion of claims (say $0.5\%$) and the uplift factor is the new mean divided by the old. IFRS 17's estimate of future cash flows is also probability-weighted — see [[Fulfilment Cash Flows]].

![[Media/Figures/Events_Not_in_Data.svg|340]]

> [!example]- In the Loading or Not? {Example}
> A Canadian insurer writes annual auto and property policies and accepts new and renewal business up to one month before cover starts. Valuing its liabilities at 31 December 2025, it considers:
>
> 1. A severe earthquake striking a region where it writes a large share of its property business.
> 2. An appeal which, if it succeeds, would apply a [[Cap on Non-Pecuniary Damages|cap on non-pecuniary damages]] for minor injuries to its open claims.
> 3. A new claims-handling process whose savings the actuarial best estimate already reflects.
> 4. A hailstorm in summer 2027.
> 5. A management adjustment of $3\%$ described only as "a margin for uncertainty".
>
> Which belong in the ENID loading?
>
> > [!answer]-
> > 1. **Yes, adverse.** Low probability, high severity and not in the claims history — the textbook ENID, on the unexpired exposure.
> > 2. **Yes, favourable.** A court award in the insurer's favour on past claims is one of the paper's own examples; it *reduces* the loading. (The 2019 sample answer used exactly this example.)
> > 3. **No.** It is already in the best estimate, and adding it again would double count.
> > 4. **No.** The exposure horizon is 13 months — to the end of January 2027 — because only business the insurer is obligated to at the valuation date counts. A 2027 summer storm falls on policies not yet written.
> > 5. **No.** An adjustment tied to no specific event is margin, which comes out of the Solvency II best estimate rather than into the ENID bucket.

> [!example]- A Probability/Severity Loading {Example}
> The insurer's best estimate before ENID is \$400 million. Its workshop identifies three events not in its data, with the probability of each over the remaining exposure and its present-value effect on the claims cash flows:
>
> | Event | Probability | Effect |
> |---|---|---|
> | Major earthquake on unexpired exposure | $0.4\%$ | +\$200M |
> | Adverse appellate ruling on open bodily injury claims | $10\%$ | +\$15M |
> | Favourable legislative change on open claims | $20\%$ | −\$5M |
>
> Estimate the ENID loading, treating the events as separate.
>
> > [!answer]-
> > Each event adds its probability-weighted effect:
> >
> > $$
> > \begin{align*}
> > \text{Loading} &= 0.004(200) + 0.10(15) + 0.20(-5) \\
> > &= 0.8 + 1.5 - 1.0 \\
> > &= \$1.3\text{M}
> > \end{align*}
> > $$
> >
> > That is about $0.33\%$ of the \$400 million best estimate. Two points carry the method. The **favourable** event enters with a negative sign — omit it and the loading is overstated by \$1 million. And the earthquake, the most dramatic event, contributes least of the adverse pair: a best estimate is a mean, so a remote catastrophe enters at its probability-weighted cost, not its full severity. The paper suggests using a figure like this as a check on a truncated-distribution loading.
