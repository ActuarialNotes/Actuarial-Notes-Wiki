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

## [F-001] Exam 6C/7 statements bullet and inurance sentence restated to the sources
- entry_type: finding
- author: agent:validate-v1
- run_id: 2026-10-10T21:00Z/dv05
- date: 2026-10-10
- severity: minor
- status: open
- locus: 'The two axes cross' and 'Statements and reserves (Exams 6C, 7)' bullets
- claim: 'surplus share, facultative and per-risk covers normally inure to the catastrophe cover'; 'estimate gross and ceded separately'; reinsurance contract held 'a separate asset never netted against gross'; claims-varying commission 'part of expected recoveries'.
- evidence: Clark pp.14, 21, 45 shows a surplus share inuring to the per-risk and to the catastrophe treaty, nothing about facultative or per-risk covers inuring to the cat cover. Friedland Ch.3 pp.48-49: actuaries typically select patterns and ELRs gross and net, ceded as the difference. CIA EN 225060: reinsurance contracts held are recognized and presented separately from the underlying contracts (IFRS 17.78, 17.82), and a portfolio may be in an asset or a liability position. IFRS 17 para 86 (quoted in TRG AP03): claims-contingent cash flows, including ceding commissions, are part of the claims expected to be reimbursed; non-contingent commissions reduce the premium paid.
- source_rank: 2
- proposed_action: Restate the four phrases to what the sources say (done on the lead's authorization).
- applied: true
- fingerprint: 1dc30d8068e3

## [F-001/R] Correction applied
- entry_type: resolution
- author: agent:validate-v1
- run_id: 2026-10-10T21:00Z/dv05
- date: 2026-10-10
- resolves: F-001
- status: resolved
- note: Restated in this run: surplus share 'may inure' to a per-risk or catastrophe cover (Clark); gross and net selected, ceded as the difference (Friedland); reinsurance contracts held recognized and presented separately from the underlying contracts (CIA EN, IFRS 17.78/82); claims-contingent commission treated as part of claims expected to be recovered (IFRS 17.86 via TRG AP03).

## [C-003] Validation pass — verified
- entry_type: comment
- author: agent:validate-v1
- run_id: 2026-10-10T21:00Z/dv05
- date: 2026-10-10
- status_set: verified
- confidence: medium
- checks_run: Re-verify after the restatement. DISC content (treaty vs facultative, proportional vs non-proportional, surplus share not excess, layers, pricing) against Clark, IRMI and NAMIC; reserving sentence against Friedland; IFRS 17 claims against IFRS 17 para 86 as quoted in the IFRS Foundation's TRG paper and the CIA educational note (separate recognition and presentation, IFRS 17.78/82); MCT registered/unregistered against OSFI MCT 2025; fire example recomputed (75%; 180/450/350K; 30/75/0K). EUR-Lex copies of Regulation 2021/2036 and 2023/1803 are behind an AWS WAF challenge (empty to both the fetcher and WebFetch), so IFRS 17 itself was read only through the TRG paper's quotation.
- sources_checked: Clark, Basics of Reinsurance Pricing (CAS study note, rev. 2014), §1A pp.3–4, §1B pp.9–12, §2A pp.14–15, casualty layers pp.22–23, 27, sha256:1c4429fee538cc8d90157c1849ca689a3a2173a2670fc57f212d866b493e2c63 — https://www.casact.org/sites/default/files/2021-03/8_Clark.pdf; IRMI glossary, 'treaty reinsurance', sha256:2ea6c4c63cd94dae4d5233cc2c30dd2524e3f201e938cebb96b290b1170b1cca — https://www.irmi.com/term/insurance-definitions/treaty-reinsurance; IRMI glossary, 'facultative reinsurance', sha256:35c79f8facd9aa07f36a730f73ab5f787ee1eb89c17d9385eb087734baeb822d — https://www.irmi.com/term/insurance-definitions/facultative-reinsurance; Myers, Reinsurance Overview (NAMIC Directors' Education, 9 May 2017), slides pp.6–17 (functions, types, facultative uses, pro rata, per-risk/cat XOL, types of reinsurers, marketing), sha256:c8c7fe0c3bbd0f5d327147142f007ff9d13af260c71da725eb9973a0700121a4 — https://www.namic.org/pdf/reinsuranceRe/17dbc_ReinsuranceOverview.pdf; Friedland, Reserving for Reinsurance (CAS Exam 7 study note), Ch.3 printed pp.48-49: unpaid losses estimated gross, ceded and net; patterns and ELRs typically selected gross and net, sha256:6da495a26206ececf40a3c3fc8fb3db04556c940242f5bcffe2b21b7e4445ceb — https://www.casact.org/sites/default/files/2022-11/Exam7_Study_Note_Friedland.pdf; IFRS Foundation, TRG for IFRS 17 Agenda Paper 03 (Sept 2018), 'Commissions and reinstatement premiums in reinsurance contracts issued', pp.4-5 quoting IFRS 17 para 86(a)-(c), sha256:995b2ccc6c0855f9517951014794a83aa3ae689be96a3541af7ad140ba58e914 — https://www.ifrs.org/-/media/feature/meetings/2018/september/trg-insurance/ap03.pdf; CIA Educational Note 225060, IFRS 17 – Actuarial Considerations Related to Reinsurance Contracts Issued and Held (17 Jun 2025), intro (reinsurance contracts held recognized and presented separately from underlying contracts, IFRS 17.78 and 17.82) and commission/offset discussion pp.15-17, sha256:ce688039c5e2007481b5c2a36788b7b3ff885423c8798ddd8f93e66ae1a08a19 — https://www.cia-ica.ca/app/themes/wicket/custom/dl_file.php?p=610928&fid=610931; OSFI, Minimum Capital Test Guideline 2025 (effective 1 Jan 2026): unsecured unregistered reinsurance recoverables deducted from capital available; reinsurance contracts held assets by registered/unregistered status, sha256:80450516aa1bb0a7534ceedcf50e39966406ecdcd52d0109af4a94d3439959ce — https://www.osfi-bsif.gc.ca/en/guidance/guidance-library/minimum-capital-test-guideline-2025
- note: Medium: the standard's text was read as quoted by the IFRS Foundation staff paper and the CIA note, not from the standard itself; the deposit-accounting/risk-transfer sentence rests on the vault's verified Deposit Accounting page (rank 4) and NAMIC's finite-reinsurance slide.
