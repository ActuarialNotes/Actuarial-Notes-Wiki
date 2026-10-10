---
target: Concepts/Risk Assessment.md
created: 2026-10-10
---

## [C-001] Pass incomplete: two parts unsourced
- entry_type: comment
- author: agent:validate-v1
- run_id: 2026-10-10T21:00Z/dv03
- date: 2026-10-10
- note: Checked and consistent with sources: risk maps by frequency and severity (CAS-ERM p.114; Saylor s08-02), probability analysis with expected value and standard deviation (Saylor s06-02), root cause analysis back to underlying causes and close calls (OSHA Incident Investigation Guide 2015 pp.1-4), matrix-based treatment (Rejda Exhibit 3.2). Examples recomputed (scores 12/10/8/8/5; E[N]=1.1, sd 0.943, 9,734.40, 10,707.84). Not verified: (1) the likelihood x impact 1-5 scoring convention and the claim that scores are ordinal, which no source read states; (2) the GH-101 group-underwriting bullet (manual/experience blend by credibility, funding arrangements), which needs the SOA GH-101 readings, not read this run. Page left in_review.

## [C-002] Validation pass — in_review
- entry_type: comment
- author: agent:validate-v1
- run_id: 2026-10-10T21:00Z/dv03
- date: 2026-10-10
- status_set: in_review
- checks_run: every definition, list, rule and attribution checked against the sources listed; every worked example recomputed; all [[links]] resolve; U.S. framing reviewed; GH-101 bullet not checked
- sources_checked: CAS Enterprise Risk Management Committee, Overview of Enterprise Risk Management (CAS Forum, Summer 2003), p.114 (PDF p.16) risk map, sha256:f433c8300785640b2f4fd168d3b38878d1bfbc9b9f8f74c08e43de8e98982efd — https://www.casact.org/sites/default/files/database/forum_03sforum_03sf099.pdf; Baranoff et al., Risk Management for Enterprises and Individuals v1.0 (Saylor Academy 2012), s06-02 probability measures, sha256:2cd18f66c1d1d9bc8162fb93bce73ddf75b766f3363ac06e3ec20e165d473773 — https://saylordotorg.github.io/text_risk-management-for-enterprises-and-individuals/s06-02-measures-of-risk-putting-it-to.html; OSHA, Incident [Accident] Investigations: A Guide for Employers (Dec 2015), pp.1-4 (root causes, close calls), sha256:828756cf17298e2da0eac2235d32c10a5c98973b55cd54a84e6ffcf4acbbe659 — https://www.osha.gov/sites/default/files/IncInvGuide4Empl_Dec2015.pdf
- note: Left in_review: scoring convention and the GH-101 group underwriting bullet were not checked against any source this run (see comment).

## [F-001] GH-101 group underwriting bullet not checked
- entry_type: finding
- author: agent:validate-v1
- run_id: 2026-10-10T21:00Z/dv03
- date: 2026-10-10
- severity: minor
- status: open
- locus: Group underwriting (GH-101) bullet
- claim: In group health and life, risk assessment sets the rate through a blend of the manual rate and the group's experience weighted by credibility, and guides the funding arrangement.
- evidence: Other-exam (SOA GH-101) content; the GH-101 readings were not read this run, so the bullet has no source in this log. The DISC-RM content of the page is now sourced (NIST SP 800-30 for likelihood x impact scales; CAS-ERM and Saylor for risk maps; OSHA for root cause; Saylor s06-02 for probability analysis).
- proposed_action: Check the bullet in a GH-101 verification pass against the SOA readings.
- applied: false
- fingerprint: ca02981dbd88

## [C-003] Validation pass — verified
- entry_type: comment
- author: agent:validate-v1
- run_id: 2026-10-10T21:00Z/dv03
- date: 2026-10-10
- status_set: verified
- confidence: medium
- checks_run: every DISC-RM definition and technique checked against the sources listed; examples recomputed; GH-101 bullet not checked (finding)
- sources_checked: NIST SP 800-30 Rev. 1, Guide for Conducting Risk Assessments (2012), §2.3.1 pp.11-14 (risk as a function of likelihood and impact; qualitative and semi-quantitative scales), sha256:f214087f0bdb35932a28c16eb93932a33c67a6edfb5e6f1638866bd201c98e04 — https://nvlpubs.nist.gov/nistpubs/Legacy/SP/nistspecialpublication800-30r1.pdf; CAS Enterprise Risk Management Committee, Overview of Enterprise Risk Management (CAS Forum, Summer 2003), p.114 (PDF p.16) risk map, sha256:f433c8300785640b2f4fd168d3b38878d1bfbc9b9f8f74c08e43de8e98982efd — https://www.casact.org/sites/default/files/database/forum_03sforum_03sf099.pdf; Baranoff et al., Risk Management for Enterprises and Individuals v1.0 (Saylor Academy 2012), s06-02 probability measures, sha256:2cd18f66c1d1d9bc8162fb93bce73ddf75b766f3363ac06e3ec20e165d473773 — https://saylordotorg.github.io/text_risk-management-for-enterprises-and-individuals/s06-02-measures-of-risk-putting-it-to.html; Baranoff et al., Risk Management for Enterprises and Individuals v1.0 (Saylor Academy 2012), s08-02 risk map on a severity and frequency grid, sha256:dec6416a8007b65db78c8e3f276df42752fe416836dc8624db763169180cc31c — https://saylordotorg.github.io/text_risk-management-for-enterprises-and-individuals/s08-02-beginning-steps-communication-.html; OSHA, Incident [Accident] Investigations: A Guide for Employers (Dec 2015), pp.1-4 (root causes, close calls), sha256:828756cf17298e2da0eac2235d32c10a5c98973b55cd54a84e6ffcf4acbbe659 — https://www.osha.gov/sites/default/files/IncInvGuide4Empl_Dec2015.pdf; Rejda & McNamara, Principles of Risk Management and Insurance, 12th ed. (Pearson 2014), Ch.3 p.53 Exhibit 3.2, sha256:d287eea5870c8b2d7dcfd205f5c26283d5c3cb4f536965eb8c21a344c428aed0
- note: Likelihood x impact convention now sourced: NIST SP 800-30r1 defines risk as a function of likelihood and impact and describes qualitative (very low-very high) and semi-quantitative (1-10 scale) assessments whose values and meanings are not maintained outside the assessment context, which supports the page's 'a score ranks, it is not an expected loss'. Verified medium for the DISC-RM content; the GH-101 bullet is left to a GH-101 pass (minor finding F-001).
