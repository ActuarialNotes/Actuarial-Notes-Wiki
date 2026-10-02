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

## [F-001/R] Correction applied
- entry_type: resolution
- author: agent:validate-v1
- run_id: 2026-09-29T19:42Z/d7d3
- date: 2026-09-29
- resolves: F-001
- status: resolved
- note: Stated the condition and the general rule. General rule (new formula block): P = min over every possible call date m, maturity included, of Fr a_m|j + C_m v^m — SOA S136 p.37 ('the maximum a buyer will pay is the smallest price over the various call dates'); for a given price the yield is the smallest over the call dates, as SOA S43 p.13 does (5.72% at the 1200 call vs 4.92% at the 1100 maturity; takes the smaller). The earliest/latest shortcut is now stated only 'when the call price is the same on every call date, maturity included' (FIN §47 p.420); with differing call prices the page says the worst date need not be the earliest or latest, to price at each call date and take the minimum, and that within a stretch of equal call price K the price is monotone (K + (Fr − Kj)a_m), so only each stretch's ends need checking. Added FIN Ex 47.2(2) p.421 as a second example (109 / 104.50 / 100 call schedule at 1.5% per half-year): recomputed 112.3661, 111.9254, 112.0079 → pays 111.93, the 10-year call. The existing example now says it is callable at par on every date from year 5, so the shortcut's condition visibly holds (prices at years 5–10: 1084.25 … 1147.20, minimum 1084.25 as printed).

## [C-002] Validation pass — verified
- entry_type: comment
- author: agent:validate-v1
- run_id: 2026-09-29T19:42Z/d7d3
- date: 2026-09-29
- status_set: verified
- confidence: medium
- checks_run: New version re-read. Definition, issuer's motive and investor's reinvestment risk vs FIN p.420. Formula P = min_m (Fr a_m|j + C_m v^m) vs SOA S136 p.37 (smallest price over the call dates) and FIN p.421 (the most unfavorable date is the one giving the smallest price); yield-given-price rule vs SOA S43 p.13. Shortcut with its condition (equal redemption value at every call date including maturity; premium → earliest, discount → latest) vs FIN p.420 (and S42 p.13, S136 p.37, which apply it to par-callable bonds). Differing-call-price rule vs FIN p.421; monotonicity within a band from P = K + (Fr − Kj)a_m. Example 1 recomputed in python: call at years 5..10 = 1084.2473, 1098.3465, 1111.6476, 1124.1959, 1136.0338, 1147.2017; 80a_5|6% = 336.9891, 1000v^5 = 747.2582 → 1084.25 as printed. Example 2 (FIN Ex 47.2(2)) recomputed: a_10 = 9.222185, v^10 = 0.861667 → 112.3661; a_20 = 17.168639, v^20 = 0.742470 → 111.9254; a_30 = 24.015838, v^30 = 0.639762 → 112.0079; every date n = 10..30 checked, minimum 111.9254 at n = 20 → 111.93 as printed. Links resolve (Call Price, Redemption Value); figure exists; validate_links.py --studiable clean. Example 1 is the vault's own, so medium.
- sources_checked: SOA Exam FM Sample Solutions (rev. Aug 2026), Q 136, solutions PDF p.37, sha256:ae4ec6082b43944a0c44cefaf02cdc24cf2e011dcd57366ea5f9cb32d3323f69 — https://www.soa.org/globalassets/assets/files/edu/2018/2018-10-exam-fm-sample-solutions.pdf; SOA Exam FM Sample Questions (rev. Aug 2026), Q 43, questions PDF pp.20-21, sha256:d20b5cf2b78cb4cddb3dc556e0df62c40b7d510b7941b546809cc58c4b71a069 — https://www.soa.org/globalassets/assets/files/edu/2018/2018-10-exam-fm-sample-questions.pdf; SOA Exam FM Sample Solutions (rev. Aug 2026), Q 43, solutions PDF p.13, sha256:ae4ec6082b43944a0c44cefaf02cdc24cf2e011dcd57366ea5f9cb32d3323f69 — https://www.soa.org/globalassets/assets/files/edu/2018/2018-10-exam-fm-sample-solutions.pdf; SOA Exam FM Sample Solutions (rev. Aug 2026), Q 42, solutions PDF p.13, sha256:ae4ec6082b43944a0c44cefaf02cdc24cf2e011dcd57366ea5f9cb32d3323f69 — https://www.soa.org/globalassets/assets/files/edu/2018/2018-10-exam-fm-sample-solutions.pdf; Finan, A Basic Course in the Theory of Interest and Derivatives Markets, p.420-421, sha256:41664968f8b6dcf60e4af92ed71bad63eda94dded40bc63e619fd3c2755efa93 — https://departments.central.edu/actsci/files/2011/08/Exam_FM_Study_GuideFinan.pdf
