---
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:a218dc481e190069fc09a9131beca78fc457a30c099bbca89d2550b15799a857
  sources: []
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Transition to IFRS 17.md
---

**Transition to IFRS 17** is the restatement of existing insurance contracts onto the new measurement basis at the date of initial application. Three approaches are permitted, in a strict hierarchy: **full retrospective** by default, and only where that is impracticable, a choice between the **modified retrospective** and **fair value** approaches.

- **Full retrospective application (FRA)** — measure every group as if IFRS 17 had always applied: reconstruct the [[Contractual Service Margin|CSM]] at original inception, roll it forward through every period, and restate comparatives. Required unless **impracticable**, which under IAS 8 means the entity cannot apply it after making every reasonable effort.
- **Modified retrospective approach (MRA)** — permitted only where FRA is impracticable, and only to the extent reasonable and supportable information exists. It uses specified simplifications to approximate what FRA would have produced, and the objective is to get as close to FRA as the available information allows.
- **Fair value approach (FVA)** — the CSM at transition is the difference between the **fair value** of the group and its fulfilment cash flows. It requires far less historical data, and it may be chosen freely wherever FRA is impracticable.
- **Why it matters for P&C insurers less than for life insurers.** Most Canadian P&C business is short-duration and [[Premium Allocation Approach|PAA]]-measured, so there is little or no CSM to reconstruct and transition is comparatively simple. The complexity lands on long-duration contracts and on multi-year [[Reinsurance Contracts Held|reinsurance held]].
- **The choice changes reported equity and future profit.** A higher CSM at transition means more profit deferred into future periods and lower opening equity; a lower CSM means the reverse. Because two insurers with identical books can choose differently, IFRS 17 requires **disclosure of the transition approach and a reconciliation** of the CSM by approach.
- **The Canadian layer:** [[OSFI]] set transitional arrangements for the [[MCT]] so that the capital effect of transition was phased rather than landing in a single quarter.

> [!example]- Which Transition Approach? {Example}
> An insurer holds three books at transition.
>
> 1. Annual personal lines contracts, all written within the last twelve months.
> 2. A book of ten-year commercial contracts written since 2009, with complete historical pricing and cash flow data.
> 3. A book of long-duration contracts acquired in a 2011 business combination, for which the original inception assumptions were never retained.
>
> Determine the approach for each.
>
> > [!answer]-
> > 1. **Full retrospective — and trivially so.** These are PAA-measured with no CSM, and the [[Liability for Remaining Coverage|LRC]] is essentially unearned premium less acquisition cash flows. There is nothing to reconstruct. The [[Liability for Incurred Claims|LIC]] is remeasured at current [[IFRS 17 Discount Rates|discount rates]] with a [[Risk Adjustment for Non-Financial Risk|risk adjustment]] replacing the previous margins.
> > 2. **Full retrospective, and it is mandatory.** The data exist, so FRA is not impracticable and the insurer has no choice — it may not elect a simpler approach merely because FRA is expensive. Cost alone does not establish impracticability.
> > 3. **Fair value or modified retrospective.** Without original inception assumptions, FRA is genuinely impracticable. The MRA requires reasonable and supportable information for its specified modifications, which may also be missing; where it is, the **fair value approach** is the practical answer, since it needs only a current fair value and current fulfilment cash flows.
> >
> > **The judgement to document** is impracticability for book 3, because it is the gateway to the simpler approaches. An insurer asserting impracticability must show what it tried. And because the FVA CSM can differ substantially from what FRA would have produced, the disclosure must let a reader see how much of the reported CSM rests on it.
