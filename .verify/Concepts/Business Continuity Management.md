---
target: Concepts/Business Continuity Management.md
created: 2026-10-10
---

## [F-001] Hot site described as running in parallel
- entry_type: finding
- author: agent:validate-v1
- run_id: 2026-10-10T21:00Z/dv03
- date: 2026-10-10
- severity: minor
- status: open
- locus: Strategy bullet, alternate site list
- claim: backup data centres (a hot site running in parallel, a warm site with equipment ready, a cold site with space only)
- evidence: NIST SP 800-34 Rev.1 §3.4.2 (PDF p.36) and Appendix (PDF p.61): a hot site is a facility with fully operational equipment, current software and staff able to take over quickly; the facility with real-time mirroring (running in parallel) is the mirrored site, 'fully redundant ... with automated real-time information mirroring'. The page's wording conflated the two.
- source_rank: 1
- proposed_action: Delete 'running in parallel' (transcription-level deletion of the contradicted clause).
- applied: true
- fingerprint: 76e7f292eddc

## [F-001/R] Correction applied
- entry_type: resolution
- author: agent:validate-v1
- run_id: 2026-10-10T21:00Z/dv03
- date: 2026-10-10
- resolves: F-001
- status: resolved
- note: Deleted 'running in parallel' in this run; the alternate-site list now matches NIST SP 800-34 §3.4.2 (hot site ready to take over; mirrored site is the real-time parallel one).

## [C-001] Validation pass — verified
- entry_type: comment
- author: agent:validate-v1
- run_id: 2026-10-10T21:00Z/dv03
- date: 2026-10-10
- status_set: verified
- confidence: medium
- checks_run: every definition, list, rule and attribution checked against the sources listed; every worked example recomputed; all [[links]] resolve; U.S. framing reviewed
- sources_checked: NIST SP 800-34 Rev. 1, Contingency Planning Guide for Federal Information Systems (2010), ES-1 (policy), §3.2 BIA, §3.2.1 RTO/MTD, §3.4.2 sites, §3.5.3 exercises, §3.6 maintenance, sha256:476f04d4c60b0770c1ac8b2720551972074ce78e936a3e7a535048416111d0df — https://nvlpubs.nist.gov/nistpubs/Legacy/SP/nistspecialpublication800-34r1.pdf; Mid Sussex District Council, Business Continuity Policy Appendix A: Terms & Definitions (2019, citing ISO 22301), p.2, sha256:3550ebea9d87cf22770286c01a673a36a75c26d93818bfb7dfbac85a7ccb9315 — https://www.midsussex.gov.uk/media/4134/business-continuity-policy-appendix-a.pdf; Ready.gov (FEMA), Business Impact Analysis page, read via WebFetch 2026-10-10 (direct fetch 403; no hash) — https://www.ready.gov/business-impact-analysis
- note: ISO 22301 terms (BCM, BCMS, BIA, MTPD, RTO less than MTPD, RPO) confirmed via Mid Sussex's ISO 22301 definitions (rank 3); BIA content, policy, site types, exercises and maintenance via NIST SP 800-34 and Ready.gov. One minor finding found and fixed in this run (hot site wording). Examples recomputed (MTPD 2, 3.83, 12 days; expected costs 183,750 / 82,500 / 90,000).
