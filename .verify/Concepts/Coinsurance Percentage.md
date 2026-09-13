---
target: Concepts/Coinsurance Percentage.md
created: 2026-09-13
---

## [F-001] Defines the coinsurance percentage only in the SOA loss-models sense; Exam 5 links it for Werner's required-ITV percentage
- entry_type: finding
- author: agent:validate-v1
- run_id: 2026-09-13T04:49Z/03f2
- date: 2026-09-13
- severity: major
- status: open
- locus: Whole page - opening definition and the Y = alpha(X-d)+ formula
- claim: 'A Coinsurance Percentage (alpha) is the fraction of the covered loss (after any deductible) that the insurer agrees to pay, with the insured retaining the remaining fraction 1 - alpha.'
- evidence: Two exam pages link this concept and they mean different quantities. 'Exam P-1 (SOA).md' line 44 links it under 'Calculate the amount that an insurance company pays to a policyholder for a claim given Policy Information, including Deductibles, Coinsurance Percentages, and Benefit Limits' - the loss-models sense the page gives. 'Exam 5 (CAS).md' line 42 links it as '[[Coinsurance Rating|coinsurance]] and the [[Coinsurance Percentage]]' inside the alternative-ratemaking objective, i.e. Werner & Modlin Ch. 11, where the notation list on p.209 (PDF p.221) defines 'c = required coinsurance percentage' and the mechanism is the property coinsurance clause: apportionment ratio a = min(F/cV, 1.0), indemnity I = L x F/(cV) subject to I <= F and I <= L (p.210, PDF p.222). Under Werner an 80% coinsurance percentage is the minimum insurance-to-value the insured must carry, NOT the insurer's share of each loss; an Exam 5 candidate arriving from that objective and reading this page learns the wrong object. The sibling page Concepts/Coinsurance Rating.md already distinguishes the two provisions correctly. Per P2 the divergence is a legitimate CAS/SOA context difference to flag, not to reconcile. sha256:6b214d4db52674df2e83343920c06781e491254bd77f27e32ba312faaff3782c — https://www.casact.org/sites/default/files/old/studynotes_werner_modlin_ratemaking.pdf
- source_rank: 2
- proposed_action: State both usages at the top - Werner's c (required insurance-to-value percentage, Exam 5) and the loss-models alpha (insurer's share, Exam P) - and cross-link Coinsurance Rating for the clause mechanics. Do not silently replace one with the other.
- applied: false
- fingerprint: edb98d2791d5
