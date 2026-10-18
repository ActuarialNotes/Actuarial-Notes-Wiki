---
target: Concepts/Reinstatements.md
created: 2026-10-18
---

## [F-001] Expected-reinstatement-premium formula and market claims not in the reading
- entry_type: finding
- author: agent:validate-v1
- run_id: 2026-10-18T15:01Z/0103
- date: 2026-10-18
- severity: minor
- status: open
- locus: third display formula; bullets on $r$ ('100% is common'), 'Effect on loss cost' and 'Who bears what'
- claim: P(1 + r·E[min(S, nL)]/L) = Required total premium; r ... (100% is common ...); the net PML must include it; for the reinsurer, premium that arrives with the losses makes the result less volatile.
- evidence: Clark pp.43-44 (sha256:1c4429fee538cc8d90157c1849ca689a3a2173a2670fc57f212d866b493e2c63) gives the pro-rata-as-to-amount premium ($2,000,000 x 1.10 x 4.5/10 = $990,000), the (1 + n) x limit aggregate, the pro-rata-as-to-time variant and its rarity, and the payback approach. It gives no formula for the expected reinstatement premium in pricing, no statement that 100% is a common rate, and nothing on net PML or the reinsurer's volatility. Recomputing the page's formula against its own second example (E[min(S,10)] = 1.5, P = 3.1667/1.15 = $2.754M) is internally consistent, but a recomputation can only falsify, not confirm (P2 rank 5).
- source_rank: 2
- proposed_action: Cite a source for the expected-reinstatement-premium formula (or present it explicitly as a derivation) and for the '100% is common' and PML/volatility claims, or cut them back to Clark.
- applied: false
- fingerprint: 4e0d52cf81cc

## [C-001] Validation pass — verified
- entry_type: comment
- author: agent:validate-v1
- run_id: 2026-10-18T15:01Z/0103
- date: 2026-10-18
- status_set: verified
- confidence: medium
- checks_run: RP formula and aggregate limit against Clark p.43 example; pro-rata-as-to-time rarity and seasonality; four-half-limit = two-full-limit statement; payback approach p.44; both examples recomputed ($1.8M / $0.6M RP, $31.8M net, $28M remaining aggregate; $2.754M up-front premium, 27.5% ROL, $2.5M with no reinstatement)
- sources_checked: Clark, Basics of Reinsurance Pricing (CAS Study Note, revised 2014), pp.43-44 (reinstatement premium, pro rata as to amount/time, aggregate limit, payback approach), sha256:1c4429fee538cc8d90157c1849ca689a3a2173a2670fc57f212d866b493e2c63 — https://www.casact.org/sites/default/files/old/studynotes_clark_2014.pdf; CAS Exam 9 Content Outline, Fall 2026, pp.3, 7 (task A1-A3, readings Clark and Bernegger), sha256:be1980d41470fed30dec1b9af9412f4e936d666e65d01237684acde11f3e7fc8 — https://www.casact.org/sites/default/files/2026-03/Exam_9_CO_2026_Fall.pdf; SOA GI 301 syllabus, Mar 2027/Jul 2027, p.9, Topic 7 (Clark, outcomes 7e-h), sha256:491e74c9baec0e9f74552e9c589f0738d914c4d340827727b0d78bea4e23d72e — https://www.soa.org/globalassets/assets/files/edu/2026/gi-301/2027-03-gi-301-syllabus.pdf
- note: Clark's statements are transcribed correctly and the examples resolve. The pricing formula for expected reinstatement premium and three market/PML claims are unsourced and left open (F-001). The page is also linked from Exam GI-301 (SOA), whose reading for 7h is the same Clark note, so both exams' halves were checked.
