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
