---
target: Concepts/Call Price.md
created: 2026-09-28
---

## [F-001] Example price two cents off (v^3 rounded to four places)
- entry_type: finding
- author: agent:validate-v1
- run_id: 2026-09-28T14:47Z/aa33
- date: 2026-09-28
- severity: minor
- status: open
- locus: example 'Bond Priced to a Call', answer
- claim: 'P = 80·a_3|6% + 1050(1.06)^{-3} = 80(2.6730) + 1050(0.8396) = 213.84 + 881.58 = 1095.42'
- evidence: Recomputed: v^3 at 6% = 0.839619, 1050v^3 = 881.60 (881.6002), 80a_3 = 213.84, P = 1095.4412 → 1,095.44. The page multiplies 1050 by the rounded 0.8396 (= 881.58). The method (call price replaces C, n = periods to the call date) matches SOA S40 p.12 and S136 p.37.
- source_rank: 5
- proposed_action: Show 1050(0.839619) = 881.60 and P = 1,095.44.
- applied: false
- fingerprint: 78610afc4e5c

## [C-001] Validation pass — verified
- entry_type: comment
- author: agent:validate-v1
- run_id: 2026-09-28T14:47Z/aa33
- date: 2026-09-28
- status_set: verified
- confidence: medium
- checks_run: Definition vs FIN §47 p.420 and Investor.gov ('pays investors the call price (usually the face value of the bonds)'); call premium = call price − face (see Call Premium page sources); pricing to the call with C_call and n_c vs SOA S40 p.12 and S136 p.37. 'Typically set at or above Face Value' is hedged — SOA Q139 p.59 has call prices 2900/2960 on a 3000 face bond — not filed. Example recomputed in one python script (work/c-bonds.py): 1095.4412 vs page 1095.42 (F-001). Links and figure resolve. Example is the vault's own, so medium.
- sources_checked: SOA Financial Mathematics Exam syllabus, December 2026, Topic 4 Bonds (15-25%), learning outcome a), c), PDF p.4, sha256:b4189b65d60ab3c9250a8bf5ed48a28a8365c92ab7d673aba25d50ee339edb39 — https://www.soa.org/globalassets/assets/files/edu/2026/fall/syllabi/2026-12-exam-fm-syllabus.pdf; SOA Exam FM Sample Solutions (rev. Aug 2026), Q 40, solutions PDF p.12, sha256:ae4ec6082b43944a0c44cefaf02cdc24cf2e011dcd57366ea5f9cb32d3323f69 — https://www.soa.org/globalassets/assets/files/edu/2018/2018-10-exam-fm-sample-solutions.pdf; SOA Exam FM Sample Solutions (rev. Aug 2026), Q 136, solutions PDF p.37, sha256:ae4ec6082b43944a0c44cefaf02cdc24cf2e011dcd57366ea5f9cb32d3323f69 — https://www.soa.org/globalassets/assets/files/edu/2018/2018-10-exam-fm-sample-solutions.pdf; SOA Exam FM Sample Questions (rev. Aug 2026), Q 139, questions PDF p.59, sha256:d20b5cf2b78cb4cddb3dc556e0df62c40b7d510b7941b546809cc58c4b71a069 — https://www.soa.org/globalassets/assets/files/edu/2018/2018-10-exam-fm-sample-questions.pdf; Finan, A Basic Course in the Theory of Interest and Derivatives Markets (Arkansas Tech, 2009), §47 Callable Bonds and Serial Bonds, PDF p.420, sha256:41664968f8b6dcf60e4af92ed71bad63eda94dded40bc63e619fd3c2755efa93 — https://departments.central.edu/actsci/files/2011/08/Exam_FM_Study_GuideFinan.pdf; U.S. SEC Investor.gov glossary, Callable or Redeemable Bonds (web page read 2026-09-28), sha256:db86cee96b21a36c190fcf34f474a1cbc56064484f608c5262ab6b487ad6fe5b — https://www.investor.gov/introduction-investing/investing-basics/glossary/callable-or-redeemable-bonds
