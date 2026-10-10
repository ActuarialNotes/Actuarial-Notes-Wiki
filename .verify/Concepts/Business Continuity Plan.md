---
target: Concepts/Business Continuity Plan.md
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
- sources_checked: NIST SP 800-34 Rev. 1, Contingency Planning Guide for Federal Information Systems (2010), §3.2.1 p.17 (PDF p.31) MTD/RTO/RPO; §3.4.2 pp.21-22 site types; §3.5.3 exercises; §3.6 maintenance, sha256:476f04d4c60b0770c1ac8b2720551972074ce78e936a3e7a535048416111d0df — https://nvlpubs.nist.gov/nistpubs/Legacy/SP/nistspecialpublication800-34r1.pdf; Ready.gov (FEMA), Ready Business Business Continuity Plan template, pp.1-3 plan sections, sha256:9945e3bb8bb0d45507e97de3d6f31a1b5a9bc90d454e95b8b8731b975bef259b — https://www.ready.gov/sites/default/files/2020-03/business-continuity-plan.pdf; Ready.gov (FEMA), Business Impact Analysis page, read via WebFetch 2026-10-10 (direct fetch 403; no hash) — https://www.ready.gov/business-impact-analysis; Ready.gov (FEMA), Business Continuity Planning page (six planning steps), read via WebFetch 2026-10-10 (direct fetch 403; no hash) — https://www.ready.gov/business/emergency-plans/continuity-planning
- note: MTD/RTO/RPO definitions, 'RTO must normally be shorter than the MTD' because of reprocessing, RPO not part of MTD, cold/warm/hot/mirrored sites and their cost/readiness, tabletop/functional/full-scale exercises, organization-defined review frequency with contact lists more often (NIST); BIA scenarios, impacts, timing, questionnaire, prioritised report (Ready.gov BIA); six planning steps (Ready.gov); plan sections incl. succession/delegation, RTO/RPO, manual workarounds, incident management, orientation/tabletop/full-scale exercises, corrective action, copies if servers down (Ready template, sha matches writer's). Examples recomputed (38 h; 30 h).
