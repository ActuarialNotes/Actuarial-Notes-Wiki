---
target: Concepts/Fault Determination Rules.md
created: 2026-10-18
---

## [F-001] Numbered fault scenarios are in Regulation 668, not 664
- entry_type: finding
- author: agent:validate-v1
- run_id: 2026-10-18T14:08Z/g6c6
- date: 2026-10-18
- severity: major
- status: open
- locus: first bullet ('The rules are diagrammatic')
- claim: Ontario's Regulation 664 sets out numbered scenarios — rear-end, left turn across traffic, lane change, parking lot, uncontrolled intersection — each with a fixed apportionment.
- evidence: R.R.O. 1990, Reg. 664 (CAS 6C reading, sha256:6982cbc772530787a622ef78a51595686ec2af17f11b20be28ca50ea699a38c9), contents p.1 and ss. 6-8 p.4: it covers DC-PD indemnification and only refers to 'the fault determination rules'; it has no scenarios or diagrams. The scenarios are R.R.O. 1990, Reg. 668, 'Fault Determination Rules' (ontario.ca e-Laws Word copy, sha256:6b14dac31b80d370e2219d1a49eb84219d1d5106c8f3a0205835bf846dfeb57d, https://www.ontario.ca/laws/docs/900668_e.doc): it has the rear-end and turning diagrams, 'The diagrams in this Regulation are merely illustrative', and the 'without reference to' rule.
- source_rank: 1
- proposed_action: Replace 'Regulation 664' with 'Regulation 668 (Fault Determination Rules)' in that bullet, keeping Reg. 664 as the regulation that applies the rules to DC-PD indemnification.
- applied: false
- fingerprint: 364eb02a93be

## [F-001/R] Correction applied
- entry_type: resolution
- author: agent:validate-v1
- run_id: 2026-10-18T14:11Z/g6c6r
- date: 2026-10-18
- resolves: F-001
- status: resolved
- note: Restated to the finding's source: the numbered scenarios are in R.R.O. 1990, Reg. 668 (Fault Determination Rules), not O. Reg. 664. One sentence changed; the page stays unverified.
