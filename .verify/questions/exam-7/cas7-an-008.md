---
target: questions/exam-7/cas7-an-008.md
created: 2026-10-11
---

## [F-001] No tagged page teaches statement III
- entry_type: finding
- author: agent:validate-v1
- run_id: 2026-10-11T02:10Z/e7rda
- date: 2026-10-11
- severity: minor
- status: open
- locus: frontmatter wiki_link
- claim: wiki_link: Types of Reinsurance, Treaty Reinsurance, Surplus Share, Aggregate Excess of Loss.
- evidence: Statement III (aggregate excess applies to the net retention, other reinsurance inures to it) is Friedland PDF p.24. Of the tagged pages, Aggregate Excess of Loss and Types of Reinsurance describe the cover and its pricing but never say it applies to the net retention or that other covers inure to it (searched both for 'net retention', 'inure', 'after'); Ceded Loss Reserve does ('Stop-loss and aggregate covers cap the retained total'; 'the stop-loss applies last to protect the final net result').
- source_rank: 4
- proposed_action: Add Concepts/Ceded+Loss+Reserve to wiki_link.
- applied: false
- fingerprint: 4da886b2f2d3

## [C-001] Validation pass — in_review
- entry_type: comment
- author: agent:validate-v1
- run_id: 2026-10-11T02:10Z/e7rda
- date: 2026-10-11
- status_set: in_review
- checks_run: answered blind: I false, II true, III true -> D; key D matches; 1M loss on a 10M policy with a 2.5M line cedes 0.75M checked; options and explanation checked
- sources_checked: Friedland, Reserving for Reinsurance (CAS Study Note — Exam 7, (c)2023 CAS; cited by the outline as 2022), PDF pp.14-15 (treaty: absence of individual underwriting; facultative underwriting mitigates adverse selection), 19 (proportion ceded = (limit - line)/limit, Table 1.3), 24 (aggregate excess applies to net retention, other reinsurance inures), sha256:6da495a26206ececf40a3c3fc8fb3db04556c940242f5bcffe2b21b7e4445ceb — https://www.casact.org/sites/default/files/2022-11/Exam7_Study_Note_Friedland.pdf
- note: Content correct; tagging fixed in the clean-up round (F-001).

## [F-001/R] Correction applied
- entry_type: resolution
- author: agent:validate-v1
- run_id: 2026-10-11T02:10Z/e7rdb
- date: 2026-10-11
- resolves: F-001
- status: resolved
- note: Added Concepts/Ceded+Loss+Reserve to wiki_link; that page teaches statement III (stop-loss and aggregate covers cap the retained total and apply last, to the net result).

## [C-002] Validation pass — verified
- entry_type: comment
- author: agent:validate-v1
- run_id: 2026-10-11T02:10Z/e7rdb
- date: 2026-10-11
- status_set: verified
- confidence: high
- checks_run: retag checked with validate_content.py; content checks from the sweep stand (blind answer D = key; statements against the text; options distinct)
- sources_checked: Friedland, Reserving for Reinsurance (CAS Study Note — Exam 7, (c)2023 CAS; cited by the outline as 2022), PDF pp.14-15 (treaty: absence of individual underwriting; facultative underwriting mitigates adverse selection), 19 (proportion ceded = (limit - line)/limit, Table 1.3), 24 (aggregate excess applies to net retention, other reinsurance inures), sha256:6da495a26206ececf40a3c3fc8fb3db04556c940242f5bcffe2b21b7e4445ceb — https://www.casact.org/sites/default/files/2022-11/Exam7_Study_Note_Friedland.pdf
