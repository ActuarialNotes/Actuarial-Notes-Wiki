---
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:ce645119f28712f1c8d6e7d34aa87ec2eb6da95452e250e4b3a4739831390d31
  sources: []
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/PACICC.md
---

![[Media/Figures/PACICC.svg|340]]

The **Property and Casualty Insurance Compensation Corporation** (PACICC) is Canada's [[Guaranty Funds|guaranty fund]] for property and casualty insurers. Membership is compulsory for insurers licensed in participating jurisdictions, and when a member fails, PACICC pays covered policyholder claims up to defined limits, funded by assessments on the surviving members.

PACICC's mandate has two parts:

1. To respond to the claims of policyholders of an insolvent member insurer.
2. To minimise the cost of insurer failures by contributing to a well-regulated industry.

Under the second part, PACICC publishes research on solvency, capital and insurer failure that is on the syllabus. Its solvency work, including its "cost of failure" analysis and studies of the [[MCT]] framework, argues that early intervention by [[OSFI]] is far cheaper than resolution, because an insurer's asset value deteriorates fast once its failure is public.

## Coverage and funding

PACICC covers the claims of individuals and small businesses up to a per-claim maximum, and refunds a portion of unearned premium, subject to a cap. Reinsurance recoverables, claims above the cap and certain commercial exposures are excluded or limited.

Assessments are levied after a failure, allocated by market share in the affected jurisdiction and line. An annual cap limits how much a member can be assessed, which spreads a large failure over several years rather than removing the cost.

## Why insurers fail

PACICC's research finds that inadequate pricing and deficient reserves are the dominant causes of insurer failure. Rapid growth into unfamiliar lines, reinsurance failure, catastrophe exposure and fraud follow. Investment losses are a less common primary cause than candidates expect.

> [!example]- What failure pattern does this insurer show, and what should have caught it? {Example}
> An insurer grows written premium $45\%$ in two years by entering commercial trucking, a line it has not written before, at rates $15\%$ below the market. It sets reserves by applying its personal auto development factors. Two years later it reports a $\$60$ million reserve strengthening, and its [[MCT]] ratio falls to $118\%$.
>
> > [!answer]-
> > - Growth of $45\%$ into an unfamiliar line means the book is dominated by business written without relevant experience.
> > - Winning share at $15\%$ below market on a long-tail line is underpricing as the growth mechanism.
> > - Commercial trucking develops more slowly and severely than personal auto, so personal auto factors understate the reserve and hide the underpricing while the claims are immature.
> > - The strengthening arrives after two years of underpriced business are already on the books.
> > - The [[Appointed Actuary]] should have caught it at the first valuation, because a new line's development assumptions cannot be borrowed from an unrelated line.
> > - [[FCT]] scenarios and the [[ORSA]] should have flagged reserve deterioration in a new long-tail line, and rapid growth in a new line is a standard escalation trigger for [[OSFI]].
> > - If all of these fail, PACICC pays, and its assessment falls on the competitors who declined the business at $15\%$ below market.

## Limits of the framework

Post-failure assessment funding is pro-cyclical: surviving members pay when the market is under strain. Assessment by market share creates [[Moral Hazard|moral hazard]], since a member that writes cautiously pays for the failure of one that did not. Capacity is insufficient for the failure of a very large member. PACICC is the last line of defence, not the primary one.

> [!trap] Naming investment losses as the main cause of failure
> PACICC's research puts inadequate pricing and deficient reserves first. Investment losses are a less common primary cause.
