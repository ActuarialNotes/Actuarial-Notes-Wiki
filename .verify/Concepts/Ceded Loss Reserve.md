---
target: Concepts/Ceded Loss Reserve.md
created: 2026-10-11
---

## [F-001] Accounting characterisation not in the Exam 7 reading
- entry_type: finding
- author: agent:validate-v1
- run_id: 2026-10-11T02:10Z/e7rda
- date: 2026-10-11
- severity: minor
- status: open
- locus: lead, second sentence ('carried as a reinsurance recoverable asset'); last bullet ('It is an asset with credit risk')
- claim: Ceded loss reserves are 'carried as a reinsurance recoverable asset'.
- evidence: Friedland (2022) never describes how ceded reserves are carried: it defines gross/ceded/net (PDF p.9), names ceded contracts 'reinsurance contracts held' under IFRS 17 (p.9) and says that on reinsurer default 'the assumed liability falls back to the ceding company' (p.10). Whether ceded unpaid losses are a separate asset or are netted against the loss reserve depends on the accounting regime (U.S. statutory reports losses net), which no source read here addresses. The credit-risk half of the last bullet (default, commutation, cedant stays liable) is supported by pp.10 and 28-29.
- source_rank: 2
- proposed_action: A writer should either cite an accounting source for the asset treatment or drop the clause 'carried as a reinsurance recoverable asset' and retitle the last bullet to the credit risk alone.
- applied: false
- fingerprint: 750da6b7f847

## [C-001] Validation pass — verified
- entry_type: comment
- author: agent:validate-v1
- run_id: 2026-10-11T02:10Z/e7rda
- date: 2026-10-11
- status_set: verified
- confidence: medium
- checks_run: definition, formulas and every bullet against Friedland; both examples recomputed blind before reading the page's working (Ex.1: XS 400/0, QS 1,380/900, SL 220/0, ceded unpaid 1,100, net unpaid 900, gross 2,000; Ex.2: ceded IBNR 600 and 0, 12% ceded -> net ult 9,680, ceded IBNR 620); links resolve
- sources_checked: Friedland, Reserving for Reinsurance (CAS Study Note — Exam 7, (c)2023 CAS; cited by the outline as 2022), PDF pp.9-10 (gross/ceded/net, default risk), 16-18 (quota share, surplus share), 19-20 (excess per risk), 24 (aggregate stop-loss nets), 25-28 (LOD vs risks-attaching, commutation), 37 (terms history), 39-41, 43, 50-51 (two approaches; ceded credibility), 53 (higher factors and trend for XOL), 73-76 (quota share by year and policy year on RA; Tables 3.13-3.15; stop-loss applies last), sha256:6da495a26206ececf40a3c3fc8fb3db04556c940242f5bcffe2b21b7e4445ceb — https://www.casact.org/sites/default/files/2022-11/Exam7_Study_Note_Friedland.pdf; CAS, Exam 7 Content Outline, Fall 2026 (Exam_7_CO_2026_F v04 2026_9_16), PDF pp.4-5 (task A.v.16), sha256:be1833c4f35a9344e33b1c48336dca9724d6556890997b3d8715f9de709ca5ed — https://www.casact.org/sites/default/files/2026-03/Exam_7_CO_2026_Fall.pdf
- note: Confidence medium because of F-001 (the asset characterisation is unsourced). The LOD half of the quota-share bullet follows from the LOD definition on PDF p.25; the min(max(X-R,0),L) layer formula matches the per-risk example on p.19.

## [C-002] Page locators in the sweep pass corrected
- entry_type: comment
- author: agent:validate-v1
- run_id: 2026-10-11T02:10Z/e7rdb
- date: 2026-10-11
- locus: verification sources
- note: The sweep pass cited some Friedland pages by printed page number while labelling them PDF pages (excess per risk is PDF p.21, terms history PDF p.39, higher reinsurance factors and trend PDF p.55). This pass re-cites them as PDF pages; the checks are unchanged.

## [C-003] Validation pass — verified
- entry_type: comment
- author: agent:validate-v1
- run_id: 2026-10-11T02:10Z/e7rdb
- date: 2026-10-11
- status_set: verified
- confidence: medium
- checks_run: as in the sweep pass; locators corrected
- sources_checked: Friedland, Reserving for Reinsurance (CAS Study Note — Exam 7, (c)2023 CAS; cited by the outline as 2022), PDF pp.9-10 (gross/ceded/net, default risk), 17-19 (quota share, surplus share), 21 (excess per risk), 24 (aggregate stop-loss protects net results), 26-29 (LOD vs risks-attaching, commutation), 39 (documenting historical terms), 50-51 (two approaches; ceded credibility), 55 (higher factors, tails and trend for reinsurance), 73-76 (quota share by year and by policy year on RA; Tables 3.13-3.15; stop-loss applies last), sha256:6da495a26206ececf40a3c3fc8fb3db04556c940242f5bcffe2b21b7e4445ceb — https://www.casact.org/sites/default/files/2022-11/Exam7_Study_Note_Friedland.pdf; CAS, Exam 7 Content Outline, Fall 2026 (Exam_7_CO_2026_F v04 2026_9_16), PDF pp.4-5 (task A.v.16), sha256:be1833c4f35a9344e33b1c48336dca9724d6556890997b3d8715f9de709ca5ed — https://www.casact.org/sites/default/files/2026-03/Exam_7_CO_2026_Fall.pdf
- note: F-001 (minor, unsourced asset characterisation) stays open for a writer.
