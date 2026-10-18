---
target: Concepts/Operational Risk.md
created: 2026-10-18
---

## [F-001] Operational risk is not a Solvency II risk module
- entry_type: finding
- author: agent:validate-v1
- run_id: 2026-10-18T15:01Z/0103
- date: 2026-10-18
- severity: minor
- status: open
- locus: bullet 'Determining operational risks', last sentence
- claim: Capital regimes charge for it too: ... a module in Solvency II ...
- evidence: Directive 2009/138/EC Art.104(1): the Basic SCR 'shall consist of at least the following risk modules: (a) non-life underwriting risk; (b) life underwriting risk; (c) health underwriting risk; (d) market risk; (e) counterparty default risk.' Art.107(1): 'The capital requirement for operational risk shall reflect operational risks to the extent they are not already reflected in the risk modules referred to in Article 104.' So operational risk carries a capital requirement of its own beside the modules; the Directive does not make it a module. Art.101(4) does list operational risk among the risks the SCR must cover.
- source_rank: 3
- proposed_action: Replace 'a module in Solvency II' with 'a separate capital requirement in Solvency II (Art. 107)'.
- applied: false
- fingerprint: e34680e32547

## [C-001] Validation pass — in_review
- entry_type: comment
- author: agent:validate-v1
- run_id: 2026-10-18T15:01Z/0103
- date: 2026-10-18
- status_set: in_review
- checks_run: worked examples recomputed (E[X^2]=312,500; SD 1,118 -> 968, a 13% cut; saving 250k vs cost 200k); classification example read for consistency; Solvency II definition (Art.13(33)) and scope (Art.101(4): includes legal risk, excludes strategic and reputation risk) checked; operational-vs-strategic definition compared with the CAS 2015 Q28 sample answer; links resolve; $$ balance
- sources_checked: CAS Exam 9 Content Outline, Fall 2026 (v01, 2026-03-18), PDF pp.3-7: Domains B and D tasks, readings, and complete text references (Brehm et al.: tasks D1-D6; Chapters 1, 2 excl. 2.6, 3 excl. 3.4, 4, and 5 (5.4 only); source SK), sha256:be1980d41470fed30dec1b9af9412f4e936d666e65d01237684acde11f3e7fc8 — https://www.casact.org/sites/default/files/2026-03/Exam_9_CO_2026_Fall.pdf; CAS Exam 7 Spring 2015 — sample answers and examiner's report, Q26 PDF pp.93-95 (efficient frontier on three risk measures; cost of capital plus net cost of reinsurance), Q28 PDF p.97 (operational vs strategic risk; strategic risks), sha256:b3ff9352d93b7aeaa7ffe531de52bc928e635bd72fae89247fb310580c99a568 — https://www.casact.org/sites/default/files/2021-03/15-7.pdf; Directive 2009/138/EC (Solvency II), Art.13(33), Art.101(4), Art.104(1), Art.107(1), sha256:cbd309f6304c5234f38013c0d1752bd4fbd3241a18ae22841d4825ddadeeaab6 — https://eur-lex.europa.eu/legal-content/EN/TXT/HTML/?uri=CELEX:32009L0138
- note: Brehm et al. could not be read: the CAS supplies it only in the Exam 9 study kit (outline p.8, source key SK); no authorized free copy was found (web search; Guy Carpenter's ermbook.guycarp.com no longer resolves; the Wayback Machine was unreachable from this session, connection reset). D7 default applies. The Basel definition and seven event types were not read: bis.org returned an HTML page in place of the Sound Practices PDF. The MCT operational risk margin and the NAIC RBC operational risk component were not checked. Also linked from SOA CFE-101, CP-321, GH-101 and INV-201 (in development), whose readings were not read. Solvency II wording: F-001.

## [C-002] Run-id correction for this run's entries
- entry_type: comment
- author: agent:validate-v1
- run_id: 2026-10-18T14:56Z/8a71
- date: 2026-10-18
- note: Run-id correction. The entries dated 2026-10-18 that carry run_id 2026-10-18T15:01Z/0103 were written by the Brehm et al. reading packet, run 2026-10-18T14:56Z/8a71, not by the Clark/Bernegger packet that owns 0103. This file has nothing to do with the Clark/Bernegger packet. The run id was read from a scratch file that a concurrent agent overwrote. The entries' content is unchanged; their run summary is .verify/_runs/2026-10-18T14-56Z-8a71.md.
