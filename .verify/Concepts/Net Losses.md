---
target: Concepts/Net Losses.md
created: 2026-10-31
---

## [F-001] 'Derived, not developed' contradicts Friedland
- entry_type: finding
- author: agent:validate-v1
- run_id: 2026-10-31T13:28Z/eaf1
- date: 2026-10-31
- severity: major
- status: open
- locus: bullets, second bullet
- claim: Page says net 'should be derived, not developed': each component projected separately and net falls out of the subtraction.
- evidence: Friedland Ch. 14 p.330 (PDF 336): 'When required to estimate unpaid claims on a net of reinsurance basis, actuaries vary in their approach. Some actuaries analyze gross (i.e., direct and assumed) and ceded experience separately; others analyze gross and net experience separately. The choice ... may depend on data availability, characteristics of the gross versus ceded program, and also personal preferences of the actuary.' Ch. 3 p.34 (PDF 40) says the same and requires the implied net or ceded estimate to be reviewed for reasonableness.
- source_rank: 2
- proposed_action: Replace the rule with Friedland's two approaches and the reasonableness review; keep the caveat that a net triangle embeds historical reinsurance structures.
- applied: true
- fingerprint: c33968923463

## [F-001/R] Correction applied
- entry_type: resolution
- author: agent:validate-v1
- run_id: 2026-10-31T13:28Z/eaf1
- date: 2026-10-31
- resolves: F-001
- status: resolved
- note: Applied in this run: bullet now transcribes Friedland's two approaches (gross+ceded → net, or gross+net → ceded) and the reasonableness review.

## [F-002] Example says ceded and recoveries develop 'faster' than gross
- entry_type: finding
- author: agent:validate-v1
- run_id: 2026-10-31T13:28Z/eaf1
- date: 2026-10-31
- severity: minor
- status: open
- locus: example 'Deriving Net Rather Than Developing It', closing paragraphs
- claim: Page says 'both the ceded layer and the recoveries develop faster than gross', and that the component approach is 'the difference between an 11% error and none'.
- evidence: The example's own CDFs (ceded 1.90, S&S 1.45, gross 1.35) mean ceded and S&S have MORE development to come, i.e. emerge more slowly than gross (rank 5, recomputed: the arithmetic 7,602,000 vs 8,451,000 is right). The 11% error comes from applying gross factors to net data, not from developing net per se: Friedland Ch. 14 pp.331-332 (PDF 337-338) treats a gross-and-net analysis with its own net factors as legitimate.
- source_rank: 5
- proposed_action: Change 'faster' to 'more slowly (larger CDFs)', and reframe the conclusion as the error of applying gross factors to net data rather than of developing net.
- applied: false
- fingerprint: 0bb107d368a6

## [C-001] Validation pass — verified
- entry_type: comment
- author: agent:validate-v1
- run_id: 2026-10-31T13:28Z/eaf1
- date: 2026-10-31
- status_set: verified
- confidence: medium
- checks_run: definition and identities vs Friedland Ch. 3 Recoveries/Reinsurance and Ch. 14; net-vs-gross premium/claims checks vs Ch. 14 p.331; both examples recomputed (800,000; 7,602,000 vs 8,451,000)
- sources_checked: Friedland, Estimating Unpaid Claims Using Basic Techniques (CAS, 2010), Ch. 3 pp.33-34 (PDF pp.39-40); Ch. 14 pp.329-332 (PDF pp.335-338), sha256:5e9830823346d2001d9bdcebecd0d0d399cac32a9a63d5cf021a6c7f03d50464 — https://www.casact.org/sites/default/files/2021-03/5_Friedland.pdf
- note: Major contradiction (derive-only rule) corrected to Friedland's wording. One minor wording finding in the second example left open: it needs rewording, which is authoring.
