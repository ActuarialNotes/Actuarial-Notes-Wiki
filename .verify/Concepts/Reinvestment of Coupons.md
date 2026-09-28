---
target: Concepts/Reinvestment of Coupons.md
created: 2026-09-28
---

## [F-001] Example's realized yield rests on a price the question never gives
- entry_type: finding
- author: agent:validate-v1
- run_id: 2026-09-28T14:47Z/aa33
- date: 2026-09-28
- severity: minor
- status: open
- locus: example 'Accumulated Value with Coupon Reinvestment', question and answer
- claim: Question: '…4-year bond pays 7% annual coupons and is redeemed at par. Coupons are reinvested at 4% per year. Find the total accumulated value … and the realized annual yield.' Answer: 'The bond was priced at par so P = $1,000.'
- evidence: The question gives the redemption value (par) but no purchase price or purchase yield, and the realized yield from P(1 + r)^4 = AV cannot be found without P — in SOA S427 (solutions PDF p.111) the price is an input: P(1.0518)^18 = 420·s_18|0.057 + 7500. 'Redeemed at par' and 'priced at par' are different facts; the answer supplies the second as though it were given.
- source_rank: 1
- proposed_action: Maintainer: state the purchase price (or the 7% yield it was bought at) in the question.
- applied: false
- fingerprint: 820bcda0aa15

## [F-002] Realized yield truncated: 6.72%, not 6.71%
- entry_type: finding
- author: agent:validate-v1
- run_id: 2026-09-28T14:47Z/aa33
- date: 2026-09-28
- severity: minor
- status: open
- locus: example answer, last lines
- claim: '70 × 4.2465 = 297.26 … $1,297.26 … r = 1.29726^{1/4} − 1 ≈ 6.71%'
- evidence: Recomputed: s_4|4% = 4.246464, 70s = 297.2525 → 297.25, AV = 1297.2525; (1.2972525)^{1/4} − 1 = 0.067225 → 6.72% (from the page's own 1.29726: 0.067227 → 6.72%).
- source_rank: 5
- proposed_action: Show 297.25, AV = 1,297.25 and r ≈ 6.72%.
- applied: false
- fingerprint: ee52ce2e707d

## [C-001] Validation pass — verified
- entry_type: comment
- author: agent:validate-v1
- run_id: 2026-09-28T14:47Z/aa33
- date: 2026-09-28
- status_set: verified
- confidence: medium
- checks_run: AV = Fr·s_n at the reinvestment rate + C vs SOA S427 p.111 (image read: '420 s_18|0.057 = 12,617.50', 'P(1.0518)^18 = 12,617.50 + 7,500'); syllabus term 'accumulated value with reinvestment of coupons' (SYL 4a-b). r_i = j ⇒ AV = P(1+j)^n checked algebraically and numerically (recomputed in one python script (work/c-bonds.py): 1310.7960 both sides at 7%); r_i < j ⇒ lower AV and realized return (monotone in r_i). Example: F-001 (price not given), F-002 (6.72%). [[Yield Rate]], [[Reinvestment Risk]] resolve; figure exists. Example is the vault's own, so medium.
- sources_checked: SOA Financial Mathematics Exam syllabus, December 2026, Topic 4 Bonds (15-25%), learning outcome a)-b), PDF p.4, sha256:b4189b65d60ab3c9250a8bf5ed48a28a8365c92ab7d673aba25d50ee339edb39 — https://www.soa.org/globalassets/assets/files/edu/2026/fall/syllabi/2026-12-exam-fm-syllabus.pdf; SOA Exam FM Sample Questions (rev. Aug 2026), Q 427, questions PDF p.181, sha256:d20b5cf2b78cb4cddb3dc556e0df62c40b7d510b7941b546809cc58c4b71a069 — https://www.soa.org/globalassets/assets/files/edu/2018/2018-10-exam-fm-sample-questions.pdf; SOA Exam FM Sample Solutions (rev. Aug 2026), Q 427, solutions PDF p.111, sha256:ae4ec6082b43944a0c44cefaf02cdc24cf2e011dcd57366ea5f9cb32d3323f69 — https://www.soa.org/globalassets/assets/files/edu/2018/2018-10-exam-fm-sample-solutions.pdf
