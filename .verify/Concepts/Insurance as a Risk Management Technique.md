---
target: Concepts/Insurance as a Risk Management Technique.md
created: 2026-10-10
---

## [F-001] Essential/desirable/available split has no independent source (D6)
- entry_type: finding
- author: agent:validate-v1
- run_id: 2026-10-10T21:00Z/dv13
- date: 2026-10-10
- severity: minor
- status: open
- locus: Using insurance in a program bullet; Dental practice example; tip and trap
- claim: Coverages are ranked as essential (required by law or contract, or protecting survival), desirable (financial difficulty but not bankruptcy) and available (slight losses).
- evidence: The writer sourced the split only to Bonga University lecture notes (Ch.2 p.10). Rejda & McNamara 12th ed. Ch.3 pp.51-53 lists selection of coverages, insurer, negotiation, dissemination and periodic review without it; the Baranoff open text does not have it; no other source was found (decision D6).
- source_rank: 3
- proposed_action: Per lead decision D6: delete the split, the dental-practice example, and the tip/trap that test it.
- applied: true
- fingerprint: e08065c9e074

## [F-001/R] Correction applied
- entry_type: resolution
- author: agent:validate-v1
- run_id: 2026-10-10T21:00Z/dv13
- date: 2026-10-10
- resolves: F-001
- status: resolved
- note: Deleted in this run: the essential/desirable/available sentence (with its Workers Compensation Insurance link), the 'Ranking a Dental Practice's Coverages' example, the tip clause and the 'Essential is not the same as most likely' trap. The five-area program, insurer-selection criteria and advantages/disadvantages now rest on Rejda 12th ed. Ch.3 pp.51-53 instead of the Bonga notes.

## [C-001] Validation pass — verified
- entry_type: comment
- author: agent:validate-v1
- run_id: 2026-10-10T21:00Z/dv13
- date: 2026-10-10
- status_set: verified
- confidence: medium
- checks_run: every definition, list, rule and attribution checked against the sources listed; every worked example recomputed; all [[links]] resolve; U.S. framing reviewed
- sources_checked: Baranoff et al., Risk Management for Enterprises and Individuals v1.0 (Saylor Academy 2012), s10 pooling + transfer to a third party; steps; sentimental value; reduces risk and anxiety; objective/subjective estimates, sha256:a643d7b54dd325ce18405f2c482ebef89986853c6894651046d3f112a552cc04 — https://saylordotorg.github.io/text_risk-management-for-enterprises-and-individuals/s10-02-nature-of-insurance.html; Baranoff et al., Risk Management for Enterprises and Individuals v1.0 (Saylor Academy 2012), s10 six requisites; economic feasibility; deductibles, sha256:a313b603e25c423326a69258356cf6a570917a4d41924c731e91cd3fe3c061f3 — https://saylordotorg.github.io/text_risk-management-for-enterprises-and-individuals/s10-03-ideal-requisites-for-insurabil.html; Baranoff et al., Risk Management for Enterprises and Individuals v1.0 (Saylor Academy 2012), s08 Table 4.4 matrix; incorporation; warranties; leases; hold-harmless; surety, sha256:5da3c20b87e2a72ff64a492c44f23e70c966629c990a5dfd9739b0ec09c59eb8 — https://saylordotorg.github.io/text_risk-management-for-enterprises-and-individuals/s08-04-risk-management-alternatives-t.html; Baranoff et al., Risk Management for Enterprises and Individuals v1.0 (Saylor Academy 2012), s10 binomial CV, sha256:0fb4dd0d04812eb4f4ceaf8bc2e059ae323809659ce7945309682a998ee487fd — https://saylordotorg.github.io/text_risk-management-for-enterprises-and-individuals/s10-05-appendix-more-exposures-less-r.html; Rejda & McNamara, Principles of Risk Management and Insurance, 12th ed. (Pearson 2014), Ch.3 pp.51-53 (PDF pp.70-72): noninsurance transfers and their advantages/disadvantages; five areas when using insurance; insurer selection; advantages/disadvantages of insurance, sha256:d287eea5870c8b2d7dcfd205f5c26283d5c3cb4f536965eb8c21a344c428aed0
- note: Bonga-only claims re-sourced to Rejda 12th ed. (cited bibliographically) or deleted (D6 split, see F-001). Pooling/transfer, steps, limits, matrix, requisites and noninsurance transfer forms confirmed in Baranoff. Examples recomputed (1,500 per house; CV 9.95 vs 0.0995; caterer case).
