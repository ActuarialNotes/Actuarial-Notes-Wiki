---
target: Concepts/Consistency.md
created: 2026-10-04
---

## [F-001] Unbiasedness described as holding "for every n"
- entry_type: finding
- author: agent:validate-v1
- run_id: 2026-10-04T20:47Z/8861
- date: 2026-10-04
- severity: nit
- status: open
- locus: bullet 2, line 21
- claim: "Consistency is a large-sample (asymptotic) property ... unlike [[Unbiasedness]], which must hold for every n".
- evidence: Siegrist, Random §6.1 defines U as unbiased when E(U) = theta for all theta in T - the quantifier is over the parameter, at the sample size in use; only asymptotic unbiasedness is a statement about n -> infinity. The vault Unbiasedness page also says "for all theta". The contrast the bullet means - unbiasedness is a finite-sample property, consistency an asymptotic one - is right; "for every n" swaps the quantifier.
- source_rank: 3
- proposed_action: Reword to "which is a property at the sample size actually used (for every theta)".
- applied: false
- fingerprint: 0df5a29c2c95
