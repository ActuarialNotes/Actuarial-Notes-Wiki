---
target: Concepts/Insurance Data Regulation.md
created: 2026-10-10
---

## [F-001] NAIC #880 cited at the superseded section letter
- entry_type: finding
- author: agent:validate-v1
- run_id: 2026-10-10T21:00Z/dv02
- date: 2026-10-10
- severity: minor
- status: open
- locus: Unfair trade practices bullet
- claim: The NAIC Unfair Trade Practices Act (#880, §4G) defines unfair discrimination to include ...
- evidence: The NAIC #880 PDF (sha256:e27f5324468298edb8af55d6166ac73a928c7fcd2571340a51bb342a1bf7367e, https://content.naic.org/sites/default/files/model-law-880.pdf) prints the current Spring 2024 text first: 'H. Unfair Discrimination.' with (3) refusing/limiting a property or casualty risk solely because of geographic location unless sound underwriting and actuarial principles, and (5) refusing or limiting coverage because of sex, marital status, race, religion or national origin (PDF pp.4-5). 'G. Unfair Discrimination.' is the lettering of the Summer 2008 text appended later in the same PDF (PDF pp.23-24). The substance of the bullet matches both; only the section letter is out of date.
- source_rank: 1
- proposed_action: Change '§4G' to '§4H'.
- applied: true
- fingerprint: 98cf4708c0d3

## [F-001/R] Correction applied
- entry_type: resolution
- author: agent:validate-v1
- run_id: 2026-10-10T21:00Z/dv02
- date: 2026-10-10
- resolves: F-001
- status: resolved
- note: Changed '(#880, §4G)' to '(#880, §4H)' in this run, per the Spring 2024 model text (PDF pp.4-5).

## [C-001] Validation pass — verified
- entry_type: comment
- author: agent:validate-v1
- run_id: 2026-10-10T21:00Z/dv02
- date: 2026-10-10
- status_set: verified
- confidence: high
- checks_run: every statutory element against the statute or model text: #668 §6A test, §4 program items, Feb 15 certification, ten-employee exemption, 5-year records; #880 unfair discrimination items; FCRA permissible purpose, adverse action definition and §1681m(a) notice contents; GLBA §6801-6802, 6805(a)(6); NAIC AI bulletin read in the NAIC's own adopted text; Colorado protected classes, insurer duties, exclusions; examples (domicile/250-resident test; Monday 9 a.m. + 72 h); links resolve
- sources_checked: NAIC Insurance Data Security Model Law (#668, 4th Qtr 2017), §4B-I, §5D, §6A, §9A(1), sha256:761e268abebbe55d4612b406d1ea1cfcba23b86264da2255ef15134da601e45f — https://content.naic.org/sites/default/files/model-law-668.pdf; NAIC Unfair Trade Practices Act (#880), PDF with Spring 2024 text and appended Summer 2008 text, Spring 2024 §4H(3),(5) PDF pp.4-5; Summer 2008 §4G PDF pp.23-24, sha256:e27f5324468298edb8af55d6166ac73a928c7fcd2571340a51bb342a1bf7367e — https://content.naic.org/sites/default/files/model-law-880.pdf; NAIC Model Bulletin: Use of Artificial Intelligence Systems by Insurers (adopted Dec 4, 2023), PDF pp.1-9, sha256:d260c950d67fa0cc60cfcabf7df9f8de1dcff0ba84b32b6a711bd5c0b76d28f8 — https://content.naic.org/sites/default/files/cmte-h-big-data-artificial-intelligence-wg-ai-model-bulletin.pdf.pdf; Vermont DFR Insurance Bulletin No. 229 (Mar 12, 2024), PDF pp.1-11, sha256:0fa2eb6c77c4fad493df0b53612e9fd4cb815834300d37433713caaa70c215a5 — https://dfr.vermont.gov/sites/finreg/files/regbul/dfr-insurance-bulletin-229-ai.pdf; Colorado SB21-169 as signed (C.R.S. 10-3-1104.9), (1), (3)(b), (6), (7)(a), (8)(b), PDF pp.2-8, sha256:7fda1f5b30f27b3908e2f2f35e008babcf71235bbfcb905fb7d4627174a5942b — https://leg.colorado.gov/sites/default/files/2021a_169_signed.pdf; CAS Statement of Principles Regarding P&C Insurance Ratemaking (1988; reinstated May 2021 for U.S. reference), Principle 4, sha256:f240ea62dd033aac827c2073e56c0a4061d5c84531e5cf6be02d333a8f9f2140 — https://www.casact.org/sites/default/files/2021-05/Statement-Of-Principles-Ratemaking.pdf; 15 U.S.C. §1681b (Cornell LII), (a)(3)(C), sha256:6a76f86911643b4584aa96bbce68bbfcf097b5295d6c90e236c8256d16a02c1f — https://www.law.cornell.edu/uscode/text/15/1681b; 15 U.S.C. §1681a (Cornell LII), (k)(1)(B)(i), sha256:d9b556114b94811875c7ebf82b608df90cf08a16f1d78eb8fc5f5bf50c4b7843 — https://www.law.cornell.edu/uscode/text/15/1681a; 15 U.S.C. §1681m (Cornell LII), (a), sha256:328c82a65f0c1484276bdcc5f8ef2e0175a70a94491a87aa4a01abe456c03f06 — https://www.law.cornell.edu/uscode/text/15/1681m; 15 U.S.C. §6801 (Cornell LII), (a), sha256:6d20f4d14fd1556205e6328722784d5ee0f923f49ceb29a586d241f7865144bc — https://www.law.cornell.edu/uscode/text/15/6801; 15 U.S.C. §6802 (Cornell LII), (a)-(b), sha256:3fca2e8411b1bad536f5fe8ef6f197c521f95a16ecc96af2419d6af0a039dc51 — https://www.law.cornell.edu/uscode/text/15/6802; 15 U.S.C. §6805 (Cornell LII), (a)(6), sha256:d3e91ba88c61fc329bf0157643eb24fbc458c0e1087beef5a86c28bf6ece1b05 — https://www.law.cornell.edu/uscode/text/15/6805
- note: F-001 (section letter) applied and resolved. The NAIC AI bulletin, which the writer could only read via Vermont, was read in the NAIC's adopted text this run.
