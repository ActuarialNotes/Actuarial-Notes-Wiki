---
target: Concepts/Callable Bond.md
created: 2026-09-28
---

## [F-001] Earliest/latest call-date rule stated without its condition
- entry_type: finding
- author: agent:validate-v1
- run_id: 2026-09-28T14:47Z/aa33
- date: 2026-09-28
- severity: major
- status: open
- locus: bullets under the minimum-yield sentence, lines 17-18
- claim: 'If bond is at premium (price > redemption value): assume the earliest call date (worst case for investor)' / 'If bond is at discount (price < redemption value): assume the latest call date (worst case for investor)'
- evidence: FIN §47 p.420 states this rule only 'If the redemption value is the same at any call date, including the maturity date'; p.421: otherwise 'one needs to examine all call dates. The most unfavorable date will not necessarily be either the earliest or the latest'. FIN Ex 47.2(2) p.421 (premium bond callable at 109 / 104.50 / 100): prices 112.37 at the earliest date, 111.93, 112.01 (recomputed) — the correct price is 111.93, not the earliest-date price the page's rule gives. SOA Q43 (questions PDF p.20; solution p.13): call at 1200 before maturity vs 1100 at maturity — SOA prices both ('We also must check the yield if the bond is redeemed at maturity') and takes the smaller yield, 4.92% (recomputed 5.718% vs 4.912%). SOA S136 p.37 gives the general rule: 'the maximum a buyer will pay is the smallest price over the various call dates'.
- source_rank: 1
- proposed_action: Maintainer: add the condition (the shortcut holds when the call price equals the redemption value at every call date); otherwise price the bond at each call date where the call price changes and at maturity, and take the smallest price.
- applied: false
- fingerprint: 491e3286a640

## [F-002] Inline math `$> $` has a space before its closing dollar
- entry_type: finding
- author: agent:validate-v1
- run_id: 2026-09-28T14:47Z/aa33
- date: 2026-09-28
- severity: nit
- status: open
- locus: line 17
- claim: '(price $> $ redemption value)'
- evidence: Dollar-delimited inline math in Obsidian/pandoc does not close on a `$` preceded by whitespace, so the span can show as literal text in the vault; line 18 writes the same construct as `$<$`. Delimiter-only change.
- proposed_action: Change `$> $` to `$>$`.
- applied: true
- fingerprint: 3d752219fe29

## [F-002/R] Correction applied
- entry_type: resolution
- author: agent:validate-v1
- run_id: 2026-09-28T14:47Z/aa33
- date: 2026-09-28
- resolves: F-002
- status: resolved
- note: Changed `$> $` to `$>$` on line 17. No other text changed.

## [C-001] Validation pass — verified
- entry_type: comment
- author: agent:validate-v1
- run_id: 2026-09-28T14:47Z/aa33
- date: 2026-09-28
- status_set: verified
- confidence: low
- checks_run: Definition (issuer's right to redeem early at the call price; issuers call when rates fall; investor bears reinvestment risk) vs FIN §47 p.420 and Investor.gov; minimum-yield pricing (smallest price over call dates) vs SOA S136 p.37; premium → earliest / discount → latest vs SOA S40 p.12, S42 p.13, S292 p.77 and FIN p.420 — condition missing (F-001, major). Example recomputed in one python script (work/c-bonds.py): prices for a call at years 5-10 = 1084.25, 1098.35, 1111.65, 1124.20, 1136.03, 1147.20; minimum at year 5 = 1084.25 matches the page (callable at par throughout, so the shortcut is valid for this example). LaTeX nit F-002 fixed. Links and figure resolve. Low because a major is open.
- sources_checked: SOA Financial Mathematics Exam syllabus, December 2026, Topic 4 Bonds (15-25%), learning outcome a), c), PDF p.4, sha256:b4189b65d60ab3c9250a8bf5ed48a28a8365c92ab7d673aba25d50ee339edb39 — https://www.soa.org/globalassets/assets/files/edu/2026/fall/syllabi/2026-12-exam-fm-syllabus.pdf; SOA Exam FM Sample Solutions (rev. Aug 2026), Q 136, solutions PDF p.37, sha256:ae4ec6082b43944a0c44cefaf02cdc24cf2e011dcd57366ea5f9cb32d3323f69 — https://www.soa.org/globalassets/assets/files/edu/2018/2018-10-exam-fm-sample-solutions.pdf; SOA Exam FM Sample Questions (rev. Aug 2026), Q 40, questions PDF p.19, sha256:d20b5cf2b78cb4cddb3dc556e0df62c40b7d510b7941b546809cc58c4b71a069 — https://www.soa.org/globalassets/assets/files/edu/2018/2018-10-exam-fm-sample-questions.pdf; SOA Exam FM Sample Solutions (rev. Aug 2026), Q 40, solutions PDF p.12, sha256:ae4ec6082b43944a0c44cefaf02cdc24cf2e011dcd57366ea5f9cb32d3323f69 — https://www.soa.org/globalassets/assets/files/edu/2018/2018-10-exam-fm-sample-solutions.pdf; SOA Exam FM Sample Solutions (rev. Aug 2026), Q 42, solutions PDF p.13, sha256:ae4ec6082b43944a0c44cefaf02cdc24cf2e011dcd57366ea5f9cb32d3323f69 — https://www.soa.org/globalassets/assets/files/edu/2018/2018-10-exam-fm-sample-solutions.pdf; SOA Exam FM Sample Questions (rev. Aug 2026), Q 43, questions PDF p.20, sha256:d20b5cf2b78cb4cddb3dc556e0df62c40b7d510b7941b546809cc58c4b71a069 — https://www.soa.org/globalassets/assets/files/edu/2018/2018-10-exam-fm-sample-questions.pdf; SOA Exam FM Sample Solutions (rev. Aug 2026), Q 43, solutions PDF p.13, sha256:ae4ec6082b43944a0c44cefaf02cdc24cf2e011dcd57366ea5f9cb32d3323f69 — https://www.soa.org/globalassets/assets/files/edu/2018/2018-10-exam-fm-sample-solutions.pdf; SOA Exam FM Sample Solutions (rev. Aug 2026), Q 292, solutions PDF p.77, sha256:ae4ec6082b43944a0c44cefaf02cdc24cf2e011dcd57366ea5f9cb32d3323f69 — https://www.soa.org/globalassets/assets/files/edu/2018/2018-10-exam-fm-sample-solutions.pdf; Finan, A Basic Course in the Theory of Interest and Derivatives Markets (Arkansas Tech, 2009), §47 Callable Bonds and Serial Bonds, PDF p.420-421, sha256:41664968f8b6dcf60e4af92ed71bad63eda94dded40bc63e619fd3c2755efa93 — https://departments.central.edu/actsci/files/2011/08/Exam_FM_Study_GuideFinan.pdf; U.S. SEC Investor.gov glossary, Callable or Redeemable Bonds (web page read 2026-09-28), sha256:db86cee96b21a36c190fcf34f474a1cbc56064484f608c5262ab6b487ad6fe5b — https://www.investor.gov/introduction-investing/investing-basics/glossary/callable-or-redeemable-bonds
