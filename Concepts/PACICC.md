---
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:2bded463f0eb58afeb2fc4110ecbd14d74292b1f8a365adb3bebd529cde84787
  sources: []
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/PACICC.md
---

**The Property and Casualty Insurance Compensation Corporation** (PACICC) is Canada's [[Guaranty Funds|guaranty fund]] for property and casualty insurers. Membership is compulsory for insurers licensed in participating jurisdictions, and when a member fails PACICC pays covered policyholder claims up to defined limits, funded by **assessments on surviving members** after the failure.

- **Mandate:** to respond to the claims of policyholders of an insolvent member insurer, and — the second half, often overlooked — to minimise the cost of insurer failures by contributing to a well-regulated industry. PACICC publishes research on solvency, capital and insurer failure that appears directly on the syllabus.
- **Coverage:** claims of individuals and small businesses up to a per-claim maximum, plus a refund of a portion of unearned premium, subject to a cap. Excluded or limited: reinsurance recoverables, claims above the cap, and certain commercial exposures.
- **Funding.** Assessments are levied *after* a failure, allocated by market share in the affected jurisdiction and line, and subject to an annual cap on how much a member can be assessed — which spreads a large failure over several years rather than removing the constraint.
- **Why insurers fail**, from PACICC's own research: **inadequate pricing and deficient reserves** dominate, with rapid growth into unfamiliar lines, reinsurance failure, catastrophe exposure and fraud following. Notably, investment losses are a *less* common primary cause than candidates expect.
- **PACICC's own solvency work** — capital adequacy research, the "cost of failure" analysis, and studies on the [[MCT]] framework — argues that early intervention by [[OSFI]] is far cheaper than resolution, because an insurer's asset value deteriorates fast once failure is public.
- The recurring exam question is the **framework's limits**: post-assessment funding creates a pro-cyclical burden, market-share assessment creates [[Moral Hazard]], and capacity is insufficient for the failure of a very large member. PACICC is the last line of defence, not the primary one.

> [!example]- Why Insurers Fail, and What It Implies {Example}
> An insurer grows written premium $45\%$ in two years by entering commercial trucking, a line it has not written before, at rates $15\%$ below the market. Its reserves are set by applying its personal auto development factors. Two years later it reports a $\$60$ million reserve strengthening and its [[MCT]] ratio falls to $118\%$.
>
> Diagnose the failure pattern and say what should have caught it.
>
> > [!answer]-
> > This is the textbook Canadian insolvency profile, and every element of PACICC's research on failure causes is present:
> >
> > 1. **Rapid growth into an unfamiliar line.** Growth of $45\%$ means the book is dominated by business written without relevant experience.
> > 2. **Underpricing as the growth mechanism.** Winning share at $15\%$ below market on a long-tail line means the business was bought, not selected.
> > 3. **Deficient reserves, and worse, deficient *method*.** Commercial trucking develops far more slowly and severely than personal auto. Using personal auto factors does not merely understate the reserve — it conceals the underpricing, because reported loss ratios look fine while the claims are still immature.
> > 4. **Delayed recognition.** The strengthening arrives two years in, by which time two full years of underpriced business is on the books and cannot be repriced retroactively.
> >
> > **What should have caught it:**
> >
> > - The **[[Appointed Actuary]]**, at the first valuation after entering the line: development assumptions for a new line cannot be borrowed from an unrelated one, and where no own experience exists, industry benchmarks or an exposure method are required.
> > - **[[FCT]]**, whose scenarios must include reserve deterioration in a new line — precisely the risk a growth strategy creates.
> > - **[[ORSA]]**, which should have identified entry into an unfamiliar long-tail line as a material risk requiring capital above the ordinary target.
> > - **[[OSFI]]** supervision, for which rapid growth in a new line is a standard escalation trigger.
> >
> > If all four fail, PACICC pays — and its assessment falls on the competitors who declined to write the business at $15\%$ below market. That is the moral hazard argument in one paragraph.
