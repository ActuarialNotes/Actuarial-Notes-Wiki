---
target: Concepts/Risk Treatment.md
created: 2026-10-10
---

## [C-001] Validation pass — verified
- entry_type: comment
- author: agent:validate-v1
- run_id: 2026-10-10T21:00Z/dv03
- date: 2026-10-10
- status_set: verified
- confidence: medium
- checks_run: every definition, list, rule and attribution checked against the sources listed; every worked example recomputed; all [[links]] resolve; U.S. framing reviewed
- sources_checked: Rejda & McNamara, Principles of Risk Management and Insurance, 12th ed. (Pearson 2014), Ch.3 pp.47-54 (PDF pp.66-73): risk control and financing, retention, captives, RRGs, noninsurance transfers, insurance, matrix, market conditions, sha256:d287eea5870c8b2d7dcfd205f5c26283d5c3cb4f536965eb8c21a344c428aed0; Baranoff et al., Risk Management for Enterprises and Individuals v1.0 (Saylor Academy 2012), s08-04 matrix Table 4.4; incorporation incl. courts caveat; warranties; hold-harmless; surety, sha256:5da3c20b87e2a72ff64a492c44f23e70c966629c990a5dfd9739b0ec09c59eb8 — https://saylordotorg.github.io/text_risk-management-for-enterprises-and-individuals/s08-04-risk-management-alternatives-t.html; Baranoff et al., Risk Management for Enterprises and Individuals v1.0 (Saylor Academy 2012), s08-05 overlaying maps; residual $140M vs $100M, sha256:dce7d26c3b00af3545e85a525938f4313aa3e7063eae4e71c8d2bc616fa2edf2 — https://saylordotorg.github.io/text_risk-management-for-enterprises-and-individuals/s08-05-comparisons-to-current-risk-ha.html; Baranoff et al., Risk Management for Enterprises and Individuals v1.0 (Saylor Academy 2012), s08-01 treasurer, CRO, sha256:d4360b972503a96e37389598cccade396a0e3625ed78dad905726181812db468 — https://saylordotorg.github.io/text_risk-management-for-enterprises-and-individuals/s08-01-the-risk-management-function.html; CAS Enterprise Risk Management Committee, Overview of Enterprise Risk Management (CAS Forum, Summer 2003), pp.105, 114 (PDF pp.7, 16), sha256:f433c8300785640b2f4fd168d3b38878d1bfbc9b9f8f74c08e43de8e98982efd — https://www.casact.org/sites/default/files/database/forum_03sforum_03sf099.pdf; Nebraska DAS State Accounting, Risk Assessment (rev. 11/01/2014), "Segregate Losses" (separation, duplication), sha256:b464a63ed39a0d3fe31011f621eb1b191595c6f52c207d25ffe7c2733b2cb093 — https://das.nebraska.gov/accounting/risk-assesment.html
- note: Techniques, retention/captive/RRG, noninsurance transfers, evolution (insurance prevalent for hazard, ART, capital markets for financial, operational/strategic only avoided or retained), matrix and modifying factors (hard market -> retain more; financially strong firms retain more), holistic mapping and natural hedge all confirmed. Examples recomputed (60,000; 250,000; 4,000,000 retained; net EUR 2M). Minor finding open on diversification.

## [F-001] Diversification listed as a risk control technique without a source
- entry_type: finding
- author: agent:validate-v1
- run_id: 2026-10-10T21:00Z/dv03
- date: 2026-10-10
- severity: minor
- status: open
- locus: Lead and Risk control techniques bullet
- claim: Diversification spreads activity across products, customers or regions whose losses are not perfectly correlated (listed among risk control techniques).
- evidence: Rejda 12th ed. p.47 lists risk control as avoidance, loss prevention and loss reduction; Nebraska DAS adds separation and duplication; Saylor s08-04 does not list diversification as a control technique. The classification may come from The Institutes' text, which was not available.
- source_rank: 3
- proposed_action: Cite a source that lists diversification as a risk control technique, or drop it from the list.
- applied: false
- fingerprint: 0d6415296b78

## [F-001/R] Correction applied
- entry_type: resolution
- author: agent:validate-v1
- run_id: 2026-10-10T21:00Z/dv03
- date: 2026-10-10
- resolves: F-001
- status: resolved
- note: Deleted diversification from the risk-control list and its sentence; restated risk control as reducing the frequency or severity of losses (Rejda 12th ed. Ch.3 p.47), with separation and duplication per Nebraska DAS.

## [C-002] Validation pass — verified
- entry_type: comment
- author: agent:validate-v1
- run_id: 2026-10-10T21:00Z/dv03
- date: 2026-10-10
- status_set: verified
- confidence: medium
- checks_run: re-check after this run's authorized edits: every changed sentence checked against the sources listed; links resolve; earlier checks of unchanged content carried forward
- sources_checked: Rejda & McNamara, Principles of Risk Management and Insurance, 12th ed. (Pearson 2014), Ch.3 pp.47-54, sha256:d287eea5870c8b2d7dcfd205f5c26283d5c3cb4f536965eb8c21a344c428aed0; Baranoff et al., Risk Management for Enterprises and Individuals v1.0 (Saylor Academy 2012), s08-04 matrix; incorporation; warranties; hold-harmless; surety, sha256:5da3c20b87e2a72ff64a492c44f23e70c966629c990a5dfd9739b0ec09c59eb8 — https://saylordotorg.github.io/text_risk-management-for-enterprises-and-individuals/s08-04-risk-management-alternatives-t.html; Baranoff et al., Risk Management for Enterprises and Individuals v1.0 (Saylor Academy 2012), s08-05 overlaying maps, sha256:dce7d26c3b00af3545e85a525938f4313aa3e7063eae4e71c8d2bc616fa2edf2 — https://saylordotorg.github.io/text_risk-management-for-enterprises-and-individuals/s08-05-comparisons-to-current-risk-ha.html; Baranoff et al., Risk Management for Enterprises and Individuals v1.0 (Saylor Academy 2012), s08-01 treasurer, CRO, sha256:d4360b972503a96e37389598cccade396a0e3625ed78dad905726181812db468 — https://saylordotorg.github.io/text_risk-management-for-enterprises-and-individuals/s08-01-the-risk-management-function.html; CAS Enterprise Risk Management Committee, Overview of Enterprise Risk Management (CAS Forum, Summer 2003), pp.105, 114, sha256:f433c8300785640b2f4fd168d3b38878d1bfbc9b9f8f74c08e43de8e98982efd — https://www.casact.org/sites/default/files/database/forum_03sforum_03sf099.pdf; Nebraska DAS State Accounting, Risk Assessment (rev. 11/01/2014), "Segregate Losses" (separation, duplication), sha256:b464a63ed39a0d3fe31011f621eb1b191595c6f52c207d25ffe7c2733b2cb093 — https://das.nebraska.gov/accounting/risk-assesment.html
- note: Re-verified after the edit that closed F-001.
