---
target: Concepts/Risk Identification.md
created: 2026-10-10
---

## [F-001] Several technique and team claims rest on no source read
- entry_type: finding
- author: agent:validate-v1
- run_id: 2026-10-10T21:00Z/dv03
- date: 2026-10-10
- severity: minor
- status: open
- locus: Structured techniques and Identification as a team bullets
- claim: Stress testing and reverse stress testing are identification techniques; a team needs a facilitator to keep a senior voice or groupthink from narrowing the list; each identified risk is assigned an owner; identification produces a risk register.
- evidence: Sources read this run support the methods (Rejda Ch.3 p.46: questionnaires, physical inspection, flowcharts, financial statements, loss data; RIEA Risk Identification pp.1-5: checklists, policy and contract reviews, compliance reviews, procedures/org charts, internal and external experts, financial statements, loss data, use more than one method; CAS-ERM p.112: committee across functions, surveys, workshops, brainstorming). None of them mentions stress testing as an identification method, facilitators/groupthink, risk owners or a risk register. Uncontroversial practice, but unsourced.
- source_rank: 3
- proposed_action: Add a citable source (e.g. ISO 31000 or COSO principle text) for these sentences or trim them.
- applied: false
- fingerprint: f95cb165a9d3

## [C-001] Validation pass — verified
- entry_type: comment
- author: agent:validate-v1
- run_id: 2026-10-10T21:00Z/dv03
- date: 2026-10-10
- status_set: verified
- confidence: medium
- checks_run: every definition, list, rule and attribution checked against the sources listed; every worked example recomputed; all [[links]] resolve; U.S. framing reviewed
- sources_checked: Rejda & McNamara, Principles of Risk Management and Insurance, 12th ed. (Pearson 2014), Ch.3 pp.46, 54 (PDF pp.65, 73): identification sources; cooperation with other departments, sha256:d287eea5870c8b2d7dcfd205f5c26283d5c3cb4f536965eb8c21a344c428aed0; Risk & Insurance Education Alliance, Risk Identification (ELR course reading), pp.1-5, sha256:1592f41132ab2c9854a94b3de7c237a84442678d065a545621991fda4d6148cc — https://riskeducation.org/pub/media/elr/Risk-Identification.pdf; CAS Enterprise Risk Management Committee, Overview of Enterprise Risk Management (CAS Forum, Summer 2003), pp.111-112 (PDF pp.13-14): four risk types; identification by committee, surveys, workshops, brainstorming, sha256:f433c8300785640b2f4fd168d3b38878d1bfbc9b9f8f74c08e43de8e98982efd — https://www.casact.org/sites/default/files/database/forum_03sforum_03sf099.pdf
- note: Four categories, document analysis (financial statements, contracts, policies, loss histories, flowcharts, org charts), compliance review, inspections and internal/external expertise, holistic and cross-functional identification all confirmed. The P(found) formula is the page's own illustration (independence rule per OpenStax 3.1-3.2); example recomputed (0.832, 0.79). Minor finding open for unsourced stress-test/facilitator/owner sentences.
