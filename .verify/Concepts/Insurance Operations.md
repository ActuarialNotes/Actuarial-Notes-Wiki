---
target: Concepts/Insurance Operations.md
created: 2026-10-10
---

## [F-001] Function-cooperation details not in sources read
- entry_type: finding
- author: agent:validate-v1
- run_id: 2026-10-10T21:00Z/dv03
- date: 2026-10-10
- severity: minor
- status: open
- locus: How the functions cooperate bullet; Risk control and premium auditing bullet
- claim: Risk control helps marketing; claims data shows risk control where losses occur; premium auditors and risk control share observations; premium auditors verify exposures after the policy period.
- evidence: Rejda Ch.6 p.118 (PDF p.137) says only that loss-control specialists provide services and 'can also assist underwriters'. No source read describes the marketing/claims/premium-audit cooperation or premium auditing (DISC-RM 12.c-12.f, The Institutes' text not available).
- source_rank: 3
- proposed_action: Cite a source for the cooperation and premium-audit sentences (e.g. a premium audit reference such as IRMI or AICPCU material).
- applied: false
- fingerprint: 0ef840eec41f

## [C-001] Validation pass — verified
- entry_type: comment
- author: agent:validate-v1
- run_id: 2026-10-10T21:00Z/dv03
- date: 2026-10-10
- status_set: verified
- confidence: medium
- checks_run: every definition, list, rule and attribution checked against the sources listed; every worked example recomputed; all [[links]] resolve; U.S. framing reviewed
- sources_checked: Rejda & McNamara, Principles of Risk Management and Insurance, 12th ed. (Pearson 2014), Ch.6 pp.104-118 (PDF pp.123-137): ratemaking, underwriting, production, claims, reinsurance, investments, other functions incl. loss control, sha256:d287eea5870c8b2d7dcfd205f5c26283d5c3cb4f536965eb8c21a344c428aed0; Rejda & McNamara, Principles of Risk Management and Insurance, 12th ed. (Pearson 2014), Ch.7 p.129: operating ratio, sha256:d287eea5870c8b2d7dcfd205f5c26283d5c3cb4f536965eb8c21a344c428aed0; Werner & Modlin, Basic Ratemaking, 5th ed. (CAS 2016), Ch.1, Ch.8 (permissible loss ratio), sha256:6b214d4db52674df2e83343920c06781e491254bd77f27e32ba312faaff3782c — https://www.casact.org/sites/default/files/2021-03/5_Werner_Modlin.pdf
- note: Functional list, LAE in the loss side, trade-basis combined ratio and operating ratio confirmed. Examples recomputed (97.9%, 88.9%, UW profit 5, pre-tax 50; ELR 75% -> 60%, 69,231). Minor finding open on cooperation details.

## [F-001/R] Correction applied
- entry_type: resolution
- author: agent:validate-v1
- run_id: 2026-10-10T21:00Z/dv03
- date: 2026-10-10
- resolves: F-001
- status: resolved
- note: Restated the cooperation bullet to Rejda 12th ed. Ch.6 p.118 (loss-control services; specialists assist underwriters) and deleted the marketing/claims/premium-audit cooperation claims. The premium-audit sentence stays: Werner & Modlin Ch.4-5 (PDF pp.63, 81) - exposures change during the term and premium for lines subject to premium audits develops after the policy period.

## [C-002] Validation pass — verified
- entry_type: comment
- author: agent:validate-v1
- run_id: 2026-10-10T21:00Z/dv03
- date: 2026-10-10
- status_set: verified
- confidence: medium
- checks_run: re-check after this run's authorized edits: every changed sentence checked against the sources listed; links resolve; earlier checks of unchanged content carried forward
- sources_checked: Rejda & McNamara, Principles of Risk Management and Insurance, 12th ed. (Pearson 2014), Ch.6 pp.104-118; Ch.7 p.129, sha256:d287eea5870c8b2d7dcfd205f5c26283d5c3cb4f536965eb8c21a344c428aed0; Werner & Modlin, Basic Ratemaking, 5th ed. (CAS 2016), Ch.1; Ch.4-5 (PDF pp.63, 81) premium audits; Ch.8, sha256:6b214d4db52674df2e83343920c06781e491254bd77f27e32ba312faaff3782c — https://www.casact.org/sites/default/files/2021-03/5_Werner_Modlin.pdf
- note: Re-verified after the edit that closed F-001.
