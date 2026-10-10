---
target: questions/exam-disc-rm/discrm-an-217.md
created: 2026-10-10
---

## [F-001] Key rests on a PML definition that two sources contradict
- entry_type: finding
- author: agent:validate-v1
- run_id: 2026-10-10T21:00Z/dv04
- date: 2026-10-10
- severity: critical
- status: open
- locus: stem item (III) and the keyed answer C; explanation bullet 'Probable maximum loss'
- claim: (III) '$6 million, the largest loss expected from a fire with the building's protection working as intended' is keyed as the probable maximum loss, and (II) '$22 million, the worst loss likely ... if the sprinklers were impaired' as the maximum foreseeable loss; the explanation states 'The PML is the loss expected with protection working as intended; the impaired case is the MFL.'
- evidence: Risk & Insurance Education Alliance glossary: a PML estimate 'includes adverse conditions, such as the impairment or failure of a sprinkler system, a delayed fire alarm, insufficient water supply or delayed firefighting response'. Korn (Risk & Insurance): NLE = 'all fire protection in place and operating as expected'; PML = 'loss amount expected with some impairment to normally only one sprinkler system'; MFL = 'sprinkler systems don't work; the fire department doesn't arrive'. On those definitions (III) is the normal loss expectancy, not the PML, and (II) is closer to the PML than the MFL; no option is then correct. IRMI's PML/MFL/MPL entries give no protection assumption, so they neither confirm nor refute the key. The question's answer depends on a definition the sources dispute.
- source_rank: 3
- proposed_action: Rewrite the stem so it does not turn on protection assumptions (e.g. define PML/MFL/MPL by IRMI's wording: worst likely from a fire at the location vs worst likely from a single event vs worst possible), or recast the options around NLE/PML/MFL/MPL per the National Alliance definitions. Lead/author decision; not auto-fixed.
- applied: false
- fingerprint: db1536d2d092

## [C-001] Validation pass — disputed
- entry_type: comment
- author: agent:validate-v1
- run_id: 2026-10-10T21:00Z/dv04
- date: 2026-10-10
- status_set: disputed
- checks_run: blind recomputation from the stem with key and explanation stripped (agrees with the key); every distractor's rationale checked; wiki_link tags and learning_objective checked against the exam page; blind C (I MPL, II MFL, III PML) matches the key under IRMI's bare definitions; see F-001
- sources_checked: IRMI Glossary, 'probable maximum loss (PML)', entry, sha256:f5a52026910edc505ad6eca7e31f08994d2ab6ffd9b55e16685b3e6d2cd4e8ee — https://www.irmi.com/term/insurance-definitions/probable-maximum-loss; IRMI Glossary, 'maximum foreseeable loss (MFL)', entry, sha256:ac6a852f104fe279e0909ec10a83934963490673519be7caa5ceef6192b7151c — https://www.irmi.com/term/insurance-definitions/maximum-foreseeable-loss; IRMI Glossary, 'maximum possible loss (MPL)', entry, sha256:5216b2a4bb6e2fd2293be9003732c8549708b87e7e3be408b39de7a8a93e50e9 — https://www.irmi.com/term/insurance-definitions/maximum-possible-loss; Risk & Insurance Education Alliance, Insurance Glossary, 'Probable Maximum Loss (PML)', entry, sha256:5afb6a900dd760a9c0b0b5488990f7f36ec8779ac2ff1b18bf67d4918d6e9b14 — https://www.riskeducation.org/insurance-glossary/probable-maximum-loss-pml/; M. Korn, '6 Fire Loss Scenarios to Review Before It's Too Late', Risk & Insurance (NLE/PML/MFL/EML/MPL definitions), entry, sha256:63e30fa759800ffc8283e3d82f56542677192cac9820af605fb5fbcc8a88319c — https://riskandinsurance.com/6-fire-loss-scenarios-to-review-before-its-too-late/
- note: Blind answer C matches the key on IRMI's bare definitions, but two references define PML with sprinkler impairment and call the protection-working figure the normal loss expectancy; the keyed mapping of (II) and (III) then fails. F-001 (critical) open: the answer itself is in question, so not fixed here. Disputed until the stem is rewritten.
