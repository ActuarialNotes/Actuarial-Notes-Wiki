---
target: Concepts/Coinsurance.md
created: 2026-10-10
---

## [F-001] Ratemaking bullet says coinsurance reduces the loss elimination ratio
- entry_type: finding
- author: agent:validate-v1
- run_id: 2026-10-10T21:00Z/dv06
- date: 2026-10-10
- severity: minor
- status: open
- locus: third bullet ('In ratemaking, the coinsurance percentage reduces the loss elimination ratio ...')
- claim: 'In ratemaking, the coinsurance percentage reduces the loss elimination ratio, since more of each loss is borne by the insured — rates are scaled by c relative to a full-coverage rate'
- evidence: Werner & Modlin Ch.11 (PDF pp.211-213) defines the loss elimination ratio for deductibles only — the share of losses eliminated by the deductible — and treats the coinsurance clause separately (PDF p.221: an apportionment ratio applied to the loss payment). Recomputing the page's own model (rank 5, falsifies): with payment c(X - d)+, the share of losses the insurer does not pay is 1 - c(1 - LER_d), which rises as c falls; so if coinsurance is folded into an LER at all, more borne by the insured raises the ratio, the opposite of the bullet's 'reduces'. The bullet is self-contradictory.
- source_rank: 2
- proposed_action: Rewrite or delete the bullet (e.g. the insurer's expected payment is c times the deductible-limited expected loss).
- applied: false
- fingerprint: f52b62b12954

## [C-001] Validation pass — verified
- entry_type: comment
- author: agent:validate-v1
- run_id: 2026-10-10T21:00Z/dv06
- date: 2026-10-10
- status_set: verified
- confidence: medium
- checks_run: Property coinsurance clause against CP 00 10 10 12 F.1: the trigger (value at time of loss x coinsurance % > limit), the four steps, payment the Step-4 amount or the limit, whichever is less, the remainder borne by the insured, and F.1.b (one limit over several items tested on the total value) — all match. Werner p.221: coinsurance as a minimum insurance-to-value requirement with proportional reduction. P-21-05 (PDF p.7): policyholder covering part of the loss 'is often referred to as coinsurance'. Examples recomputed before reading: 0.70 x (1,200 - 200) = 700, insured 500; 0.9 x 500,000 = 450,000; 360/450 = 0.80; 0.80 x 80,000 - 1,000 = 63,000; full 79,000; penalty 16,000. All agree. One open minor (F-001) on the ratemaking bullet.
- sources_checked: ISO CP 00 10 10 12, Building and Personal Property Coverage Form, F.1.a-b with Examples 1-3 (pp.13-14), D (p.10), sha256:b46b0929e7effc6cfcfde0493f5a363dc32053b3afd56632776432f596a1e106 — https://www.propertyinsurancecoveragelaw.com/wp-content/uploads/2017/05/CP00101012-1.pdf; Werner & Modlin, Basic Ratemaking (CAS, 5th ed. May 2016), Ch.11 PDF pp.211-213, 221-222 — LER and coinsurance clause, sha256:6b214d4db52674df2e83343920c06781e491254bd77f27e32ba312faaff3782c — https://www.casact.org/sites/default/files/2021-03/5_Werner_Modlin.pdf; Anderson & Brown, Risk and Insurance (SOA study note P-21-05, 2005), §IV limits on policy benefits, PDF p.7, sha256:1cb44e7f9ee240a9a0597a89dbf3a055ab70d07a8739132c75440051ee655922 — https://www.soa.org/globalassets/assets/files/edu/P-21-05.pdf
- note: The DISC objective (applying the property coinsurance clause) checks against the ISO form; the unrelated ratemaking bullet is wrong and left open for a rewrite.
