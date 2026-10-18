---
target: Concepts/Quota Share.md
created: 2026-10-18
---

## [F-001] Unsourced claims on surplus relief and reserving
- entry_type: finding
- author: agent:validate-v1
- run_id: 2026-10-18T15:01Z/0103
- date: 2026-10-18
- severity: minor
- status: open
- locus: bullets 'What it does, and doesn't do' and the closing bullet on reserving
- claim: It provides capacity and surplus relief: the ceding commission recovers acquisition cost on the ceded unearned premium. ... For reserving, ceded losses are a scalar multiple of gross and develop on the gross pattern, unlike Excess of Loss cessions.
- evidence: Clark pp.3-9 (sha256:1c4429fee538cc8d90157c1849ca689a3a2173a2670fc57f212d866b493e2c63) defines the quota share, the ceding commission ('designed to reflect the differences in underwriting expenses incurred', p.3) and the pricing steps, but says nothing about surplus relief, recovery of acquisition cost on ceded unearned premium, or reserving/development of ceded quota share losses. The net CV = gross CV statement is pure algebra from Ceded loss = a·X and is fine. No Exam 9 reading covers the unsourced points.
- source_rank: 2
- proposed_action: Either cite a source for surplus relief and ceded development (e.g. a reinsurance primer) or cut those clauses back to Clark's description.
- applied: false
- fingerprint: 3f63a619b74e

## [C-001] Validation pass — verified
- entry_type: comment
- author: agent:validate-v1
- run_id: 2026-10-18T15:01Z/0103
- date: 2026-10-18
- status_set: verified
- confidence: medium
- checks_run: definition and ceding commission against p.3; reinsurer's ratio = ELR + commission + brokerage + expenses against p.9 table; Clark's six steps against pp.4-6; adjustable features list against p.9; both examples recomputed
- sources_checked: Clark, Basics of Reinsurance Pricing (CAS Study Note, revised 2014), pp.3-9 (§1A quota share definition, pricing steps 1-6, worked example; §1B adjustable features), sha256:1c4429fee538cc8d90157c1849ca689a3a2173a2670fc57f212d866b493e2c63 — https://www.casact.org/sites/default/files/old/studynotes_clark_2014.pdf; CAS Exam 9 Content Outline, Fall 2026, pp.3, 7 (task A1-A3, readings Clark and Bernegger), sha256:be1980d41470fed30dec1b9af9412f4e936d666e65d01237684acde11f3e7fc8 — https://www.casact.org/sites/default/files/2026-03/Exam_9_CO_2026_Fall.pdf
- note: Formulas and pricing steps match Clark. Example 1: non-cat ELR 56.0%, cat load 11.2%, combined 98.7%, break-even commission 24.3% all resolve; example 2: capped cat load 8.0%, combined 95.5%, cedant net $52M vs $36M resolve. Unsourced surplus-relief and reserving clauses left open (F-001). Exam 9 only.
