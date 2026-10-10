---
target: Concepts/Types of Insurers.md
created: 2026-10-10
---

## [F-001] Guaranty-fund link and RRG guaranty claim
- entry_type: finding
- author: agent:validate-v1
- run_id: 2026-10-10T21:00Z/dv03
- date: 2026-10-10
- severity: minor
- status: open
- locus: Licensing status bullet; example answer 5
- claim: Links [[Guaranty Funds]] for U.S. state guaranty funds; states a risk retention group's insureds outside its domicile have no guaranty fund protection.
- evidence: Guaranty Funds opens with Canada's PACICC. The RRG/guaranty-fund statement is not in any source read (Rejda p.50 says RRGs are exempt from many state laws and must be licensed in at least one state; IRMI 'risk retention group' gives the LRRA basis) - no read source states the guaranty fund exclusion.
- source_rank: 3
- proposed_action: Relink to a U.S. guaranty fund page (or add a U.S. section) and cite the LRRA/NAIC RRG source for the guaranty-fund statement.
- applied: false
- fingerprint: 949afae38e19

## [C-001] Validation pass — verified
- entry_type: comment
- author: agent:validate-v1
- run_id: 2026-10-10T21:00Z/dv03
- date: 2026-10-10
- status_set: verified
- confidence: medium
- checks_run: every definition, list, rule and attribution checked against the sources listed; every worked example recomputed; all [[links]] resolve; U.S. framing reviewed
- sources_checked: Rejda & McNamara, Principles of Risk Management and Insurance, 12th ed. (Pearson 2014), Ch.5 pp.88-99 (PDF pp.107-118): stock, mutual, demutualization, mutual holding company, Lloyd's, reciprocal, agents/brokers, surplus lines, sha256:d287eea5870c8b2d7dcfd205f5c26283d5c3cb4f536965eb8c21a344c428aed0; Rejda & McNamara, Principles of Risk Management and Insurance, 12th ed. (Pearson 2014), Ch.8 p.146 (PDF p.165): domestic, foreign, alien, sha256:d287eea5870c8b2d7dcfd205f5c26283d5c3cb4f536965eb8c21a344c428aed0; Rejda & McNamara, Principles of Risk Management and Insurance, 12th ed. (Pearson 2014), Ch.3 pp.49-50: captives, RRGs, sha256:d287eea5870c8b2d7dcfd205f5c26283d5c3cb4f536965eb8c21a344c428aed0; IRMI Glossary, "risk retention group", definition, sha256:b3713c667bb71b1dd4918edaa779232f5130cebe7371cf30e878d177abbb6856 — https://www.irmi.com/term/insurance-definitions/risk-retention-group
- note: Ownership, domicile and licensing classes, Lloyd's as a market not an insurer, reciprocal with attorney-in-fact, captives, RRGs, admitted vs nonadmitted, distribution systems confirmed. Examples recomputed (2,040 dividend, 23,460 net, 540 less). Minor finding open (guaranty fund link and RRG statement).

## [F-001/R] Correction applied
- entry_type: resolution
- author: agent:validate-v1
- run_id: 2026-10-10T21:00Z/dv03
- date: 2026-10-10
- resolves: F-001
- status: resolved
- note: Dropped the [[Guaranty Funds]] link (words kept) and deleted the unsourced RRG guaranty-fund clause in example answer 5, which now reads 'It is licensed only in Vermont, its domicile.' (Rejda Ch.3 p.50: an RRG must be licensed in at least one state; IRMI: RRGs avoid multistate licensing).

## [C-002] Validation pass — verified
- entry_type: comment
- author: agent:validate-v1
- run_id: 2026-10-10T21:00Z/dv03
- date: 2026-10-10
- status_set: verified
- confidence: medium
- checks_run: re-check after this run's authorized edits: every changed sentence checked against the sources listed; links resolve; earlier checks of unchanged content carried forward
- sources_checked: Rejda & McNamara, Principles of Risk Management and Insurance, 12th ed. (Pearson 2014), Ch.5 pp.88-99; Ch.8 p.146; Ch.3 pp.49-50, sha256:d287eea5870c8b2d7dcfd205f5c26283d5c3cb4f536965eb8c21a344c428aed0; IRMI Glossary, "risk retention group", definition, sha256:b3713c667bb71b1dd4918edaa779232f5130cebe7371cf30e878d177abbb6856 — https://www.irmi.com/term/insurance-definitions/risk-retention-group
- note: Re-verified after the edits that closed F-001.
