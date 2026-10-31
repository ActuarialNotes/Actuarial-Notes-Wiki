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

## [F-002] Loss-ratio cap passage rests on a question's contract term, not a reading
- entry_type: finding
- author: agent:validate-v1
- run_id: 2026-10-31T13:54Z/2103
- date: 2026-10-31
- severity: minor
- status: open
- locus: 'A loss-ratio cap' bullet (added by the Exam 9 G8 writer)
- claim: A quota share may limit the reinsurer's recovery to a maximum ceded loss ratio ... Capital held against a tail return-period loss therefore falls by at most the cap ... CAS's examiners count missing this effect ... as a common mistake.
- evidence: Clark §1A-1B pp.3-13 (re-read this run) names a loss occurrence limit (p.9), sliding scale, profit commission and loss corridors; it never discusses a maximum ceded loss ratio, nor capital held against a return-period loss. The only support is the Fall 2016 Q19 sample answers and report (PDF p.75), where the 150% maximum is a term the question itself states (the 2018 Q1(c) report likewise treats a 'loss ratio cap' as a given term). The arithmetic is right, but it is the question's own term applied, not course content (content plan §1.2 rule 11).
- source_rank: 2
- proposed_action: Cut the bullet; the item it was written for is not-required.
- applied: true
- fingerprint: d97eb1ef0e65

## [F-002/R] Correction applied
- entry_type: resolution
- author: agent:validate-v1
- run_id: 2026-10-31T13:54Z/2103
- date: 2026-10-31
- resolves: F-002
- status: resolved
- note: Cut the 'A loss-ratio cap' bullet whole (rule 2, deletion). The item cas8-2016-q19:r7 goes back to the coordinator as not-required.

## [C-002] Validation pass — verified
- entry_type: comment
- author: agent:validate-v1
- run_id: 2026-10-31T13:54Z/2103
- date: 2026-10-31
- status_set: verified
- confidence: medium
- checks_run: whole page against Clark pp.3-13; both examples recomputed (non-cat ELR 56.0%, cat load 11.2%, combined 98.7%, break-even commission 24.3%; capped cat 1.60, load 8.0%, combined 95.5%, cedant net 52M vs 36M); net CV equal to gross follows from (1-a)X
- sources_checked: Clark, Basics of Reinsurance Pricing (CAS Study Note, revised 2014), §1A pp.3-8 (quota share takes a flat percent of premium and losses including ALAE; ceding commission; pricing steps 1-6: five or more years, exclude cat and shock, develop, trend, parallelogram for losses-occurring, non-cat ELR, cat load from an engineering-based model, commission, brokerage, general expenses, target return), §1B p.9 (loss occurrence limit; adjustable features) and pp.9-13 (sliding scale, profit commission, loss corridors), sha256:1c4429fee538cc8d90157c1849ca689a3a2173a2670fc57f212d866b493e2c63 — https://www.casact.org/sites/default/files/old/studynotes_clark_2014.pdf; CAS Exam 9 Content Outline, Fall 2026, pp.3, 7 (tasks A1-A5, readings Clark, Bernegger, Grossi & Kunreuther), sha256:be1980d41470fed30dec1b9af9412f4e936d666e65d01237684acde11f3e7fc8 — https://www.casact.org/sites/default/files/2026-03/Exam_9_CO_2026_Fall.pdf
- note: Whole-page check after the writer's Exam 9 G8 passage; that passage cut (F-002). F-001 (surplus relief and reserving clauses) stays open, minor. Exam 9 only. Source hashes: every CAS and USGS PDF re-fetched from its URL this run and hashed; each matches the hash the writer cited.
