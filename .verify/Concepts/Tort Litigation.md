---
target: Concepts/Tort Litigation.md
created: 2026-10-31
---

## [F-001] Annuity-immediate formula labelled annuity-due
- entry_type: finding
- author: agent:validate-v1
- run_id: 2026-10-31T13:31Z/75be
- date: 2026-10-31
- severity: major
- status: open
- locus: example 'Building a Bodily Injury Award', first line of answer
- claim: Future income loss, as an annuity-due-style present value ... = $70,000 x (1 - 1.02^-25)/0.02
- evidence: (1 - v^n)/i is the annuity-immediate present value; an annuity-due is (1 - v^n)/d = that times 1.02 (19.914, giving 1,393,942). The arithmetic shown (19.523 x 70,000 = 1,366,610) is the annuity-immediate value, so the label is what is wrong. Standard interest theory (rank 3/5).
- source_rank: 5
- proposed_action: Drop 'annuity-due-style' (done); the numbers stand.
- applied: true
- fingerprint: b2974187c036

## [F-001/R] Correction applied
- entry_type: resolution
- author: agent:validate-v1
- run_id: 2026-10-31T13:31Z/75be
- date: 2026-10-31
- resolves: F-001
- status: resolved
- note: Removed the 'annuity-due-style' label; the formula and arithmetic are unchanged and correct as an annuity-immediate.

## [F-002] Unsourced claim about discount-rate sensitivity
- entry_type: finding
- author: agent:validate-v1
- run_id: 2026-10-31T13:31Z/75be
- date: 2026-10-31
- severity: minor
- status: open
- locus: example answer, last paragraph
- claim: a 1% change in [the prescribed discount rate] moves liability reserves far more than a change in claim frequency does
- evidence: Not stated in the SOA tort-law study note or Davidson; it is a comparison with no stated magnitude for 'a change in claim frequency'. No source read this session supports it.
- source_rank: 5
- proposed_action: Source it or soften to what the example shows (74% of this award is the discounted income stream).
- applied: false
- fingerprint: 6290bc041976

## [C-001] Validation pass — in_review
- entry_type: comment
- author: agent:validate-v1
- run_id: 2026-10-31T13:31Z/75be
- date: 2026-10-31
- status_set: in_review
- checks_run: trilogy and $100,000 cap (1978 dollars, inflation-indexed) vs SOA note p. 64 and Davidson; costs-follow-the-event vs SOA note p. 61 (Canada uses loser pays, a significant fraction at the judge's discretion); U.S./Canada comparison vs SOA note p. 64; example arithmetic recomputed (a_25 at 2% = 19.523; 1,846,610; 1,477,288; 1,382,288; 74%)
- sources_checked: Davidson, The Cap on Non-Pecuniary General Damages (CAS Exam 6C reading), pp. 1-5 (the 1978 trilogy and the non-pecuniary cap), sha256:9b544951d4a031e08f3c40a9a30b552764f705bc09a7a6ea2af3d57e5907149f — https://www.casact.org/sites/default/files/2021-03/6C_Davidson.pdf; Cappelletti, Tort Law: Topics for General Insurance Actuaries (SOA study note, rev. May 2025), §3 p. 8 fn 11; §6 pp. 53-64 (loser pays in Canada, $100,000 trilogy cap indexed to inflation, U.S. noneconomic awards much greater), sha256:5316698581bb73d51dbcfb9a74ea92254fed6fc2b018253e2b26abc346ca2a6f — https://www.soa.org/globalassets/assets/files/edu/2025/fall/study-note/2025-11-gi-201-study-note-tort-law.pdf
- note: Left in_review: the Canadian points the trilogy sources do not cover — contributory-negligence apportionment, deduction of collateral (accident) benefits from tort awards, court-prescribed discount rates, and the elements a plaintiff must prove — need an Exam 6C reading on Ontario/Canadian tort (e.g. the Exam 6C auto-insurance readings) that was not read this session. One major label error fixed (F-001); one minor open (F-002).
