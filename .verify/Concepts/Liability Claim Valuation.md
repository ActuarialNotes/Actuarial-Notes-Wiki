---
target: Concepts/Liability Claim Valuation.md
created: 2026-10-10
---

## [F-001] 'Triples' for a 600,000 / 180,000 ratio
- entry_type: finding
- author: agent:validate-v1
- run_id: 2026-10-10T21:00Z/dv06
- date: 2026-10-10
- severity: nit
- status: open
- locus: example 'An Insolvent Co-Defendant', last sentence
- claim: 'the jurisdiction's rule triples what the claim is worth against it.'
- evidence: Recomputed: 600,000 / 180,000 = 3.33. LII 'joint and several liability' confirms the 600,000 collectible from one defendant; the arithmetic is the vault's.
- source_rank: 5
- proposed_action: 'more than triples'.
- applied: true
- fingerprint: 2e0c855adbee

## [F-001/R] Correction applied
- entry_type: resolution
- author: agent:validate-v1
- run_id: 2026-10-10T21:00Z/dv06
- date: 2026-10-10
- resolves: F-001
- status: resolved
- note: Applied in the working tree: 'more than triples'.

## [C-001] Validation pass — verified
- entry_type: comment
- author: agent:validate-v1
- run_id: 2026-10-10T21:00Z/dv06
- date: 2026-10-10
- status_set: verified
- confidence: medium
- checks_run: Comparative negligence (pure: 'almost one-third of states ... including California, Florida, and New York', plaintiff 99% at fault recovers 1%; modified 50% and 51% bar rules, followed by the majority; contributory in Alabama, Maryland, North Carolina, Virginia and DC): LII comparative negligence, word for word in substance (LII's contributory page itself contains a slip calling these comparative states; the comparative page is unambiguous). Joint and several (collect the whole from one, seek contribution, bears insolvency) and several liability: LII. Special/general damages, pain and suffering as noneconomic, compensatory damages (market value, lost wages, necessary expenses; emotional distress applied inconsistently), punitive damages (in addition to actual damages; intentional tort or wanton and willful misconduct), mitigation, collateral source rule (health insurance, workers compensation; jury not told; exceptions), venue set by statute: LII pages. Jury pools, distrust of corporations, social media and legal marketing; nuclear verdicts above $10 million; TPLF: NAIC (WebFetch). CGL supplementary payments do not reduce the limits; duty to defend ends when the limit is used up: CG 00 01 04 13. Examples recomputed before reading: 0.5 x 200,000 = 100,000 / 0 / 100,000 / 0; 0.90 x 800,000 = 720,000; min(800,000, 500,000) + 120,000 = 620,000, store 300,000; 600,000 vs 0.30 x 600,000 = 180,000. One nit fixed. The V and W(p) notation is the vault's model, consistent with the LII rules it encodes.
- sources_checked: Cornell LII Wex, 'comparative negligence' (fetched 2026-10-10), sha256:2f19566fa7f19db3c57ce3d0147aeaeebb7535d5e7d45ea9e111281973b8a240 — https://www.law.cornell.edu/wex/comparative_negligence; Cornell LII Wex, 'contributory negligence' (fetched 2026-10-10), sha256:43c1fd0c3cba3b96f36050e083387b1fef7a79d117cc943b600de65e130958b6 — https://www.law.cornell.edu/wex/contributory_negligence; Cornell LII Wex, 'joint and several liability' (fetched 2026-10-10), sha256:907bf1f785eab437a0b3da0331f065d205461aad65c49955408c9687146bdf55 — https://www.law.cornell.edu/wex/joint_and_several_liability; Cornell LII Wex, 'liability' (fetched 2026-10-10), sha256:5e5133629e30514829c097894862e195692f293ec1d6328976c8c51f9299084b — https://www.law.cornell.edu/wex/liability; Cornell LII Wex, 'special damages' (fetched 2026-10-10), sha256:50a0d567faf8e938120a8709acd04442ee0437f98dc5e175332ffb6f96c4f848 — https://www.law.cornell.edu/wex/special_damages; Cornell LII Wex, 'general damages' (fetched 2026-10-10), sha256:73b3dfcd9c5034fa1de640407d282759b73b3c8dd99c158ba6bee25aec98467d — https://www.law.cornell.edu/wex/general_damages; Cornell LII Wex, 'pain and suffering' (fetched 2026-10-10), sha256:8bebda58f72744ca76736c295defa015303743f52b27e54eb56af05443504a8f — https://www.law.cornell.edu/wex/pain_and_suffering; Cornell LII Wex, 'compensatory damages' (fetched 2026-10-10), sha256:92774229ad1d9384ec8fcb5661d421edc88df5736e2e901f042c3cf93c07a4d5 — https://www.law.cornell.edu/wex/compensatory_damages; Cornell LII Wex, 'punitive damages' (fetched 2026-10-10), sha256:d7d3c177c6bb8aff7989985bdb69ed4452bf7457888735cde1ebf97b7586b7ec — https://www.law.cornell.edu/wex/punitive_damages; Cornell LII Wex, 'collateral source rule' (fetched 2026-10-10), sha256:68039d6a72a6692b38df2497943d4749ae907b17351045a558d3eb2577fc71c6 — https://www.law.cornell.edu/wex/collateral_source_rule; Cornell LII Wex, 'mitigation of damages' (fetched 2026-10-10), sha256:bbeb6c3bbe7435cfc3bdde7b4b9c37374d4021ec944f3544c3213d37b070ce4e — https://www.law.cornell.edu/wex/mitigation_of_damages; Cornell LII Wex, 'venue' (fetched 2026-10-10), sha256:e5b2203bc173822a183dbf32b045ef06fad619404c8cbf8f6e99b9e033e92881 — https://www.law.cornell.edu/wex/venue; NAIC, Insurance Topics: Social Inflation (Last Updated 12/19/2025), read via WebFetch 2026-10-10 (host refuses scripted fetch, no digest) — https://content.naic.org/insurance-topics/social-inflation; ISO CG 00 01 04 13, Commercial General Liability Coverage Form (Cooper & Scully copy), Coverage A 1.a(2); Supplementary Payments 1.a-g (pp.1, 8-9), sha256:78739f04c6b7b183d1c2e5cd1dd34411cc7f6585760096a2eddb63d0ea904869 — https://cooperscully.com/uploads/file/Commercial%20General%20Liability%20Coverage%20Form.pdf
- note: One nit opened and fixed. Medium: tort-law statements rest on LII Wex (rank 3) and the NAIC topic page; the policy-coverage-of-punitives sentence is a hedge no source contradicts.

## [F-002] Collateral source rule linked to a Canadian page that teaches deduction
- entry_type: finding
- author: agent:validate-v1
- run_id: 2026-10-10T21:00Z/dv06
- date: 2026-10-10
- severity: minor
- status: open
- locus: bullet 'Rules that adjust the award', link '([[Collateral Benefits]])'
- claim: Under the collateral source rule, damages are generally not reduced by compensation from others ... though there are exceptions ([[Collateral Benefits]]).
- evidence: Concepts/Collateral Benefits.md (rank 4, read this run) is Canadian-framed: it defines collateral benefits as Statutory Accident Benefits, Employment Insurance and public health care 'that may be deducted from a tort award to prevent double recovery'. LII Wex 'collateral source rule' (sha256:68039d6a72a6692b38df2497943d4749ae907b17351045a558d3eb2577fc71c6) gives the U.S. rule the bullet states: damages 'cannot be diminished by any compensation received from other sources, including health insurance and workers' compensation'. The link sends a DISC-IA reader to the opposite rule.
- source_rank: 3
- proposed_action: Remove the link (or point it to a U.S. collateral source rule page if one is written).
- applied: true
- fingerprint: 771a2fe11adb

## [F-002/R] Correction applied
- entry_type: resolution
- author: agent:validate-v1
- run_id: 2026-10-10T21:00Z/dv06
- date: 2026-10-10
- resolves: F-002
- status: resolved
- note: Applied in the working tree: link removed; the sentence now ends 'though there are exceptions.'

## [C-002] Validation pass — verified
- entry_type: comment
- author: agent:validate-v1
- run_id: 2026-10-10T21:00Z/dv06
- date: 2026-10-10
- status_set: verified
- confidence: medium
- checks_run: Re-pass after removing the Collateral Benefits link (F-002) the same day: the only change since the earlier dv06 pass is that link; the bullet's text is LII's U.S. collateral source rule. All other checks of the earlier pass stand (LII tort pages, NAIC, CG 00 01 04 13).
- sources_checked: Cornell LII Wex, 'comparative negligence' (fetched 2026-10-10), sha256:2f19566fa7f19db3c57ce3d0147aeaeebb7535d5e7d45ea9e111281973b8a240 — https://www.law.cornell.edu/wex/comparative_negligence; Cornell LII Wex, 'contributory negligence' (fetched 2026-10-10), sha256:43c1fd0c3cba3b96f36050e083387b1fef7a79d117cc943b600de65e130958b6 — https://www.law.cornell.edu/wex/contributory_negligence; Cornell LII Wex, 'joint and several liability' (fetched 2026-10-10), sha256:907bf1f785eab437a0b3da0331f065d205461aad65c49955408c9687146bdf55 — https://www.law.cornell.edu/wex/joint_and_several_liability; Cornell LII Wex, 'liability' (fetched 2026-10-10), sha256:5e5133629e30514829c097894862e195692f293ec1d6328976c8c51f9299084b — https://www.law.cornell.edu/wex/liability; Cornell LII Wex, 'special damages' (fetched 2026-10-10), sha256:50a0d567faf8e938120a8709acd04442ee0437f98dc5e175332ffb6f96c4f848 — https://www.law.cornell.edu/wex/special_damages; Cornell LII Wex, 'general damages' (fetched 2026-10-10), sha256:73b3dfcd9c5034fa1de640407d282759b73b3c8dd99c158ba6bee25aec98467d — https://www.law.cornell.edu/wex/general_damages; Cornell LII Wex, 'pain and suffering' (fetched 2026-10-10), sha256:8bebda58f72744ca76736c295defa015303743f52b27e54eb56af05443504a8f — https://www.law.cornell.edu/wex/pain_and_suffering; Cornell LII Wex, 'compensatory damages' (fetched 2026-10-10), sha256:92774229ad1d9384ec8fcb5661d421edc88df5736e2e901f042c3cf93c07a4d5 — https://www.law.cornell.edu/wex/compensatory_damages; Cornell LII Wex, 'punitive damages' (fetched 2026-10-10), sha256:d7d3c177c6bb8aff7989985bdb69ed4452bf7457888735cde1ebf97b7586b7ec — https://www.law.cornell.edu/wex/punitive_damages; Cornell LII Wex, 'collateral source rule' (fetched 2026-10-10), sha256:68039d6a72a6692b38df2497943d4749ae907b17351045a558d3eb2577fc71c6 — https://www.law.cornell.edu/wex/collateral_source_rule; Cornell LII Wex, 'mitigation of damages' (fetched 2026-10-10), sha256:bbeb6c3bbe7435cfc3bdde7b4b9c37374d4021ec944f3544c3213d37b070ce4e — https://www.law.cornell.edu/wex/mitigation_of_damages; Cornell LII Wex, 'venue' (fetched 2026-10-10), sha256:e5b2203bc173822a183dbf32b045ef06fad619404c8cbf8f6e99b9e033e92881 — https://www.law.cornell.edu/wex/venue; NAIC, Insurance Topics: Social Inflation (Last Updated 12/19/2025), read via WebFetch 2026-10-10 (host refuses scripted fetch, no digest) — https://content.naic.org/insurance-topics/social-inflation; ISO CG 00 01 04 13, Commercial General Liability Coverage Form (Cooper & Scully copy), Coverage A 1.a(2); Supplementary Payments 1.a-g (pp.1, 8-9), sha256:78739f04c6b7b183d1c2e5cd1dd34411cc7f6585760096a2eddb63d0ea904869 — https://cooperscully.com/uploads/file/Commercial%20General%20Liability%20Coverage%20Form.pdf
- note: F-002 fixed; page otherwise as verified earlier in this run.
