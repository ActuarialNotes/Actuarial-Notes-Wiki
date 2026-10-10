---
target: Concepts/Commercial Crime Insurance.md
created: 2026-10-10
---

## [F-001] Inventory-shortage exception narrowed to an identified employee
- entry_type: finding
- author: agent:validate-v1
- run_id: 2026-10-10T21:00Z/dv04
- date: 2026-10-10
- severity: nit
- status: open
- locus: bullet 'Exclusions', last sentence
- claim: 'Inventory records can still prove the amount once a theft by an identified employee has been established.'
- evidence: CR 00 21 11 15 D.2.a (Inventory Shortages): 'However, where you establish wholly apart from such computations that you have sustained a loss, then you may offer your inventory records and actual physical count of inventory in support of the amount of loss claimed.' No identified employee is required; Employee Theft itself covers theft 'by an "employee", whether identified or not'.
- source_rank: 1
- proposed_action: Delete 'by an identified employee'.
- applied: true
- fingerprint: e419b82bd99e

## [F-001/R] Correction applied
- entry_type: resolution
- author: agent:validate-v1
- run_id: 2026-10-10T21:00Z/dv04
- date: 2026-10-10
- resolves: F-001
- status: resolved
- note: Applied: 'once a theft has been established', matching CR 00 21 D.2.a.

## [C-001] Validation pass — verified
- entry_type: comment
- author: agent:validate-v1
- run_id: 2026-10-10T21:00Z/dv04
- date: 2026-10-10
- status_set: verified
- confidence: medium
- checks_run: insuring agreements, 'whether identified or not', termination as to any employee, exclusions, loss-sustained trigger with one-year discovery and prior-insurance conditions against CR 00 21 11 15; discovery form against FC&S (CR 00 20 11 15 not obtainable; 60-day extended period); social-engineering gap against the voluntary-parting exclusion; separation of duties against two references; example recomputed blind (162,000 -> 100,000; 76,000; 22,000)
- sources_checked: ISO CR 00 21 11 15 Commercial Crime Coverage Form (Loss Sustained Form), A.1-6 insuring agreements; D.1 Acts Committed By You, Indirect Loss; D.2.a Inventory Shortages; E.1.g extended period (one year); E.1.k-l prior insurance; E.2.a termination as to any employee; F 'occurrence', sha256:6d33044bc7a0ef1cb11e32f01b65c5f712091d24aad8fb459d085141fdb5f803 — https://forms.nationwideexcessandsurplus.com/FormsExternal/ContractForm?num=CR+00+21&ed=11-15; FC&S (PropertyCasualty360), 'Commercial Crime Coverage Form' (CR 00 20 / CR 00 21 11 15), 2018, discovery vs loss sustained; 60-day extended period; voluntary parting exclusion; occurrence, sha256:d520566b166dd312a68ed13a51865c385dc63bf00f8149fe62c2ada084366efe — https://propertycasualty360.com/fcs/2018/07/09/commercial-crime-coverage-form; Case IQ, 'Combatting Workplace Fraud Through Internal Controls', entry, sha256:7bf97d2dd417d551eed40fd9a1818dde76af26ec2e6d8d297e6b9d48daae2200 — https://www.caseiq.com/resources/combatting-workplace-fraud-through-internal-controls; GRF CPAs & Advisors, 'Steps for Preventing Employee Fraud in Your Organization', entry, sha256:0729972031647ead412cb975486b5ffd76df5d093fe8e727c2a66d3e64b49be7 — https://www.grfcpa.com/resource/steps-for-preventing-employee-fraud-in-your-organization/
- note: Loss-sustained form rank 1; the discovery form was read only through FC&S, and the optional retroactive date (CR 20 05) rests on no source read. One nit fixed. Medium.
