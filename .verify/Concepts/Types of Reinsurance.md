---
target: Concepts/Types of Reinsurance.md
created: 2026-10-10
---

## [C-001] Validation pass — in_review
- entry_type: comment
- author: agent:validate-v1
- run_id: 2026-10-10T21:00Z/dv05
- date: 2026-10-10
- status_set: in_review
- checks_run: Treaty vs facultative against IRMI; proportional vs non-proportional, surplus share 'not excess insurance', per-risk/per-occurrence, working/exposed/clash layers and pricing as loss ratio vs loss cost on subject premium with experience and exposure rating against Clark; functions against NAMIC. Recomputed the fire example (s = 1,500/2,000 = 75%; QS 180K/30K; SS 450K/75K; XS 350K/0; cedant's 25% = 12.5% line + 12.5% above capacity). Second example's choices consistent with NAMIC (facultative for risks excluded from treaties) and Clark.
- note: Left in_review: the 'Statements and reserves (Exams 6C, 7)' bullet (IFRS 17 reinsurance contracts held, treatment of ceding commissions, MCT registered/unregistered credit) needs IFRS 17 and OSFI's MCT guideline, not read this run (EUR-Lex copy of IFRS 17 returned an empty document); the inurance-order claim is supported by Clark p.14 only for a surplus share inuring to a per-risk treaty. DISC-RM 14.3 content checks against: Clark, Basics of Reinsurance Pricing (CAS study note, rev. 2014), §1A pp.3–4, §1B pp.9–12, §2A pp.14–15, casualty layers pp.22–23, 27, sha256:1c4429fee538cc8d90157c1849ca689a3a2173a2670fc57f212d866b493e2c63 — https://www.casact.org/sites/default/files/2021-03/8_Clark.pdf; IRMI glossary, 'treaty reinsurance', sha256:2ea6c4c63cd94dae4d5233cc2c30dd2524e3f201e938cebb96b290b1170b1cca — https://www.irmi.com/term/insurance-definitions/treaty-reinsurance; IRMI glossary, 'facultative reinsurance', sha256:35c79f8facd9aa07f36a730f73ab5f787ee1eb89c17d9385eb087734baeb822d — https://www.irmi.com/term/insurance-definitions/facultative-reinsurance; Myers, Reinsurance Overview (NAMIC Directors' Education, 9 May 2017), slides pp.6–17 (functions, types, facultative uses, pro rata, per-risk/cat XOL, types of reinsurers, marketing), sha256:c8c7fe0c3bbd0f5d327147142f007ff9d13af260c71da725eb9973a0700121a4 — https://www.namic.org/pdf/reinsuranceRe/17dbc_ReinsuranceOverview.pdf

## [C-002] Exam 6C sources retried
- entry_type: comment
- author: agent:validate-v1
- run_id: 2026-10-10T21:00Z/dv05
- date: 2026-10-10
- locus: Statements and reserves (Exams 6C, 7) bullet
- note: Retried as asked. OSFI Minimum Capital Test Guideline 2025 (effective 1 Jan 2026), sha256:80450516aa1bb0a7534ceedcf50e39966406ecdcd52d0109af4a94d3439959ce — https://www.osfi-bsif.gc.ca/en/guidance/guidance-library/minimum-capital-test-guideline-2025 confirms the MCT claim: unsecured unregistered reinsurance recoverables are deducted from capital available, and reinsurance contracts held assets are reported by registered/unregistered status. IFRS 17 could not be read: the IFRS Foundation PDFs (2021 and 2023 editions) return 'IFRS Digital subscription required', and the EUR-Lex HTML copy (Regulation (EU) 2021/2036) came back empty. The IFRS 17 claims (reinsurance contracts held presented separately, not netted; commission treatment per para 86) remain unchecked, so the page stays in_review.
