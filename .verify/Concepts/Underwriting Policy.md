---
target: Concepts/Underwriting Policy.md
created: 2026-10-10
---

## [F-001] Personnel constraint and bulletin details rest on no source read
- entry_type: finding
- author: agent:validate-v1
- run_id: 2026-10-10T21:00Z/dv04
- date: 2026-10-10
- severity: minor
- status: open
- locus: bullets 'Personnel', 'Underwriting guides', 'Bulletins and audits'
- claim: Personnel is a constraint ('Entering a specialized line ... needs underwriters with that expertise'); the guide 'lists acceptable, borderline and prohibited classes'; bulletins announce changes such as a new form, a withdrawn class, a rate change or a response to a court decision.
- evidence: Capacity (IRMI 'capacity', 'underwriting capacity': determined by surplus), the 300% premium-to-surplus threshold (NAIC IRIS 2025: Net Premium to Surplus unusual if >= 300), statutory expensing of acquisition costs (SSAP No. 71 ¶2 'expensed as incurred'), surplus relief from reinsurance (IRMI) and audits by staff underwriters (IRMI 'staff underwriter') all check. No source read this run lists personnel as a constraint on underwriting policy or describes the content of underwriting guides and bulletins; that framing is The Institutes' course text, not read.
- source_rank: 3
- proposed_action: Cite The Institutes' DISC-RM text (or another reference) for the personnel constraint and the guide/bulletin contents, or trim them to what a cited source says.
- applied: false
- fingerprint: 0ef52742e13c

## [C-001] Validation pass — verified
- entry_type: comment
- author: agent:validate-v1
- run_id: 2026-10-10T21:00Z/dv04
- date: 2026-10-10
- status_set: verified
- confidence: medium
- checks_run: capacity, IRIS threshold, statutory acquisition-cost strain and surplus relief against sources; both examples recomputed blind (N <= 150/1.75 = 85.7, surplus 378.6 vs premium 1,135.7 at 3:1, G <= 85.7/0.70 = 122.4, +43%; LR 14.4/18 = 80%, 18 points over 62%); links resolved
- sources_checked: IRMI Glossary, 'capacity', entry, sha256:a21b8c9f170b484498d12e8c2f5152feb16596960b298365c36d227ee54b91bd — https://www.irmi.com/term/insurance-definitions/capacity; IRMI Glossary, 'underwriting capacity', entry, sha256:2ebab1745fa85c796d55db07af95f952f3954ba6d1539cede8f126bd6feab02e — https://www.irmi.com/term/insurance-definitions/underwriting-capacity; IRMI Glossary, 'surplus relief', entry, sha256:a566036b62b517dad05c5eb731c16cdeb11a341f9d702ad7aecaa373fe995610 — https://www.irmi.com/term/insurance-definitions/surplus-relief; IRMI Glossary, 'staff underwriter', entry, sha256:b2d2b0aacfead61f6ee5debe5c8f13fdd6475253d2bba76b5ee7a148cf45b632 — https://www.irmi.com/term/insurance-definitions/staff-underwriter; NAIC, IRIS Ratios Means and Medians (2025), P&C ratio 2 Net Premium to Surplus, 'Unusual if Equal to or Over' 300, P&C ratio 2 threshold, sha256:0cb14c7a1f73bee94056296833cce0b70659e23b43842df033819fb962fde0ba — https://content.naic.org/sites/default/files/publication-iris-means-median-2025.pdf; NAIC Accounting Practices and Procedures Manual (Mar 2025, Indiana DOI copy), SSAP No. 71 ¶2, SSAP No. 71 ¶2, PDF p.525, sha256:a29e7223b53854eff1beb79c3fd6a969c54529d2dacc74510ea122a5c7b4ad13 — https://www.in.gov/idoi/files/INDAP25-Pt-1.pdf
- note: The formulas and both worked examples check against the NAIC sources and recompute. Medium: rank-3 references for the capacity framing; F-001 (minor) for the personnel/guide/bulletin details.

## [F-001/R] Correction applied
- entry_type: resolution
- author: agent:validate-v1
- run_id: 2026-10-10T21:00Z/dv04
- date: 2026-10-10
- resolves: F-001
- status: resolved
- note: Applied (lead-authorised): personnel constraint restated to SOA GIINT Feb 2014 Q12 (answer D: treaty exclusions and personnel lacking marketing and underwriting expertise are constraints that cause classes to be avoided); 'underwriting guides' and 'bulletins' content, unsourced, restated to IRMI underwriting guidelines and staff underwriter entries (guidelines and audits); bulletin wording removed from lead, example title/answer, tip and trap.

## [C-002] Validation pass — verified
- entry_type: comment
- author: agent:validate-v1
- run_id: 2026-10-10T21:00Z/dv04
- date: 2026-10-10
- status_set: verified
- confidence: medium
- checks_run: re-verify after F-001 edits: restated bullets diffed against IRMI and GIINT Q12; both examples recompute (85.7, 122.4; 80%, 18 points)
- sources_checked: IRMI Glossary, 'capacity', entry, sha256:a21b8c9f170b484498d12e8c2f5152feb16596960b298365c36d227ee54b91bd — https://www.irmi.com/term/insurance-definitions/capacity; IRMI Glossary, 'underwriting capacity', entry, sha256:2ebab1745fa85c796d55db07af95f952f3954ba6d1539cede8f126bd6feab02e — https://www.irmi.com/term/insurance-definitions/underwriting-capacity; IRMI Glossary, 'surplus relief', entry, sha256:a566036b62b517dad05c5eb731c16cdeb11a341f9d702ad7aecaa373fe995610 — https://www.irmi.com/term/insurance-definitions/surplus-relief; IRMI Glossary, 'underwriting guidelines', entry, sha256:0ebdd2f245496dfc1f32b8a478a7daf0a89ee1494cda4ffa445471b5d33ac113 — https://www.irmi.com/term/insurance-definitions/underwriting-guidelines; IRMI Glossary, 'staff underwriter', entry, sha256:b2d2b0aacfead61f6ee5debe5c8f13fdd6475253d2bba76b5ee7a148cf45b632 — https://www.irmi.com/term/insurance-definitions/staff-underwriter; NAIC, IRIS Ratios Means and Medians (2025), P&C ratio 2 Net Premium to Surplus, 'Unusual if Equal to or Over' 300, P&C ratio 2 threshold, sha256:0cb14c7a1f73bee94056296833cce0b70659e23b43842df033819fb962fde0ba — https://content.naic.org/sites/default/files/publication-iris-means-median-2025.pdf; NAIC Accounting Practices and Procedures Manual (Mar 2025, Indiana DOI copy), SSAP No. 71 ¶2, SSAP No. 71 ¶2, PDF p.525, sha256:a29e7223b53854eff1beb79c3fd6a969c54529d2dacc74510ea122a5c7b4ad13 — https://www.in.gov/idoi/files/INDAP25-Pt-1.pdf; SOA Exam GIINT Introduction to General Insurance, February 10, 2014, with answers (NAIC-hosted copy), Q11 and Q12 (p.7), answer key p.32: Q11 A, Q12 D, sha256:7e0e508af4eb9322d2b05593cb8c1eca3e43a8838e3ea10fdb51b923bdfde7f3 — https://content.naic.org/sites/default/files/inline-files/committees_c_catf_related_five.pdf
- note: F-001 resolved. Medium.
