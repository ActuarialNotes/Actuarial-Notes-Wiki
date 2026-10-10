---
target: Concepts/Excess Insurance.md
created: 2026-10-10
---

## [F-001] Claim that a large deductible erodes the policy limit is unsupported
- entry_type: finding
- author: agent:validate-v1
- run_id: 2026-10-10T21:00Z/dv04
- date: 2026-10-10
- severity: minor
- status: open
- locus: bullet 'Forms', last two sentences
- claim: 'A large deductible erodes the policy limit instead: a $1M limit with a $250K deductible transfers only $250K–$1M.'
- evidence: IRMI 'deductible': 'Usually, the amount of the deductible is not subtracted from policy limits.' ISO CG 03 00 01 96 (Deductible Liability Insurance) pays damages 'in excess of any deductible amounts' and contains no provision reducing the limits. IRMI 'self-insured retention' contrasts SIR and deductible only by who pays first. Some large-deductible programs may be written within limits, but no source read supports the page's general statement.
- source_rank: 3
- proposed_action: Source the claim for the programs it means (e.g. a specific large-deductible endorsement) or delete the sentence.
- applied: false
- fingerprint: b04877eb3d71

## [C-001] Validation pass — verified
- entry_type: comment
- author: agent:validate-v1
- run_id: 2026-10-10T21:00Z/dv04
- date: 2026-10-10
- status_set: verified
- confidence: medium
- checks_run: layer formula and LEV identity (E[X^(a+l)] - E[X^a]); forms list; excess vs umbrella against IRMI; pricing via ILFs/exposure curves, ALAE treatments and reinstatements against Clark; layer development linkage against Sahasrabuddhe; both examples recomputed blind (2.6M/4.8M/2.0M, 83%; 1.481, 1.167, 2.800, 741K vs 1.4M)
- sources_checked: IRMI Glossary, 'excess liability policy', entry, sha256:8400c1a7acec64412e464cfeb44e9a19b1bd14cbc14a81d33caaee9f680e2d38 — https://www.irmi.com/term/insurance-definitions/excess-liability-policy; IRMI Glossary, 'umbrella liability policy', entry, sha256:5cce6a9bbdf4f78a8916a7a9cd477c31d14051abe9f552582a8af7b7e6e14268 — https://www.irmi.com/term/insurance-definitions/umbrella-liability-policy; IRMI Glossary, 'self-insured retention (SIR)', entry, sha256:cc734858023b47db3112cb5e4f0ff025ca8f50ad098792ee7110f802a7c5cca6 — https://www.irmi.com/term/insurance-definitions/self-insured-retention; IRMI Glossary, 'deductible', entry, sha256:95bff5ff32cde7c6a56aafa63343209ec839067f1a3ed9a75dd4dda780c17286 — https://www.irmi.com/term/insurance-definitions/deductible; ISO CG 03 00 01 96 Deductible Liability Insurance (draft specimen), A-D, sha256:2274fc25a3b7672eab8a27b35ccf9961a3edb152021253638f59534e4d9055ec — https://forms.nationwideexcessandsurplus.com/FormsExternal/ContractForm?num=CG+03+00&ed=01-96; D. R. Clark, Basics of Reinsurance Pricing (CAS study note, rev. 2014), pp.15, 23-25 (ALAE pro rata / part-of-loss), 17-19 exposure curves, 27-30 ILFs, 43 reinstatements, sha256:1c4429fee538cc8d90157c1849ca689a3a2173a2670fc57f212d866b493e2c63 — https://www.casact.org/sites/default/files/2021-03/8_Clark.pdf; R. Sahasrabuddhe, 'Claims Development by Layer' (CAS E-Forum Fall 2010, rev. 2 Jan 2013), abstract and §1, sha256:42ecb7ecc7270a462e397a1d4d5c8d42e50b4bc9719122b4c53873dfc84fd5a3 — https://www.casact.org/pubs/forum/10fforum/Sahasrabuddhe.pdf
- note: Exam 7/8 content checks against Clark and Sahasrabuddhe (rank 2); F-001 (minor) open. Medium.
