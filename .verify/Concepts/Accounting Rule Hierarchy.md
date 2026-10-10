---
target: Concepts/Accounting Rule Hierarchy.md
created: 2026-10-10
---

## [F-001] Tip said a GAAP standard enters SAP when the NAIC rejects it
- entry_type: finding
- author: agent:validate-v1
- run_id: 2026-10-10T21:00Z/dv06
- date: 2026-10-10
- severity: nit
- status: open
- locus: How it appears on the exam, 'SAP and GAAP together'
- claim: 'how a new GAAP standard enters statutory accounting, which happens only when the NAIC adopts it, adopts it with modification, or rejects it.'
- evidence: NAIC AP&P Manual (March 2025) Preamble ¶27 (P-6, PDF p.37): 'GAAP Pronouncements do not become part of SAP until and unless adopted by the NAIC'; ¶54 (P-10/11): SAP pronouncements identify any FASB Codification element included 'in whole, in part, or with modification as well as any rejected GAAP guidance'. A rejected standard does not enter SAP; rejection is one of the NAIC's three decisions, not a route in.
- source_rank: 1
- proposed_action: Delete ', or rejects it' (leaving 'adopts it or adopts it with modification').
- applied: true
- fingerprint: ee1d57e5d08e

## [F-001/R] Correction applied
- entry_type: resolution
- author: agent:validate-v1
- run_id: 2026-10-10T21:00Z/dv06
- date: 2026-10-10
- resolves: F-001
- status: resolved
- note: Applied in the working tree: the tip now reads 'which happens only when the NAIC adopts it or adopts it with modification', per Preamble ¶27 and ¶54.

## [C-001] Validation pass — verified
- entry_type: comment
- author: agent:validate-v1
- run_id: 2026-10-10T21:00Z/dv06
- date: 2026-10-10
- status_set: verified
- confidence: high
- checks_run: GAAP: Codification the source of authoritative GAAP for nongovernmental entities, periods ending after September 15, 2009; SEC rules authoritative for registrants; all content equal authority, two levels, replaces Statement 162; ASUs not authoritative in their own right — FAS 168 Summary, ¶3, ¶6, ¶11. Order when silent (similar transactions in authoritative GAAP first, unless they prohibit analogy, then nonauthoritative) — ¶9. Nonauthoritative list and the four weighing factors — ¶10, matched item by item (practices, Concepts Statements, AICPA Issues Papers, IFRS, professional associations/regulators, TIS Technical Practice Aids, textbooks). Topic 105 — PDF p.21. SAP: Manual does not preempt state authority, applies where not in conflict or silent — Preamble ¶12, ¶24; prescribed vs permitted definitions — Q&A Q2; Levels 1-5 — ¶42, matched level by level; Level 2 over 3, analogy, other literature with the Statement of Concepts most authoritative — ¶43-44; GAAP enters only when adopted — ¶27. Disclosure of departures (description, statement of difference, monetary effect on net income and surplus, RBC event) in Note 1 — SSAP No. 1 ¶7. Both examples' rankings follow ¶43 and FAS 168 ¶9-10. One nit (F-001) fixed.
- sources_checked: FASB Statement No. 168, The FASB Accounting Standards Codification and the Hierarchy of GAAP (June 2009), Summary, ¶1-11 (PDF pp.3, 9-11); Topic 105 (PDF p.21), sha256:b0e4014d4ff284e082ac858fc585d9e39a364b30fa53354c472542105f5e6360 — https://storage.fasb.org/fas168.pdf; NAIC, Accounting Practices and Procedures Manual, as of March 2025, Part 1 (Indiana DOI copy), Preamble ¶12, ¶24, ¶27, ¶42-44 and footnotes 3-4 (PDF pp.34, 36-40); Preamble Q&A Q2-Q3 (PDF p.44); SSAP No. 1 ¶7 (PDF p.48), sha256:a29e7223b53854eff1beb79c3fd6a969c54529d2dacc74510ea122a5c7b4ad13 — https://www.in.gov/idoi/files/INDAP25-Pt-1.pdf
- note: One nit opened and fixed.

## [F-002] 'Note 1' link lands on an IFRS 17-only notes page
- entry_type: finding
- author: agent:validate-v1
- run_id: 2026-10-10T21:00Z/dv06
- date: 2026-10-10
- severity: minor
- status: open
- locus: bullet 'Disclosure of departures', link '[[Notes to Financial Statements|notes]]'
- claim: 'These disclosures are in Note 1 of the [[Notes to Financial Statements|notes]]'
- evidence: The sentence is right (SSAP No. 1 ¶7, AP&P March 2025 PDF p.48: 'These disclosures shall be disclosed in Note 1 as illustrated in Appendix A-205'), but Concepts/Notes to Financial Statements.md (rank 4) opens 'Under IFRS 17 ...' and contains no mention of statutory notes, SSAP No. 1, Note 1 or prescribed and permitted practices, so a DISC-IA reader following the link finds Canadian IFRS content only.
- source_rank: 1
- proposed_action: Add the U.S. statutory notes (Note 1, SSAP No. 1) to the Notes page or link a U.S. page; the lead decides.
- applied: false
- fingerprint: ea84d8028ed0

## [F-002/R] Correction applied
- entry_type: resolution
- author: agent:validate-v1
- run_id: 2026-10-10T21:00Z/dv06
- date: 2026-10-10
- resolves: F-002
- status: resolved
- note: Lead-authorized, applied: link to the IFRS-only Notes page dropped; the sentence keeps 'Note 1 of the notes' (SSAP No. 1 ¶7).

## [C-002] Validation pass — verified
- entry_type: comment
- author: agent:validate-v1
- run_id: 2026-10-10T21:00Z/dv06
- date: 2026-10-10
- status_set: verified
- confidence: high
- checks_run: Re-verify after dropping one link; content otherwise as verified earlier in dv06 (FAS 168, AP&P Preamble, SSAP 1 ¶7).
- sources_checked: FASB Statement No. 168, The FASB Accounting Standards Codification and the Hierarchy of GAAP (June 2009), Summary, ¶1-11 (PDF pp.3, 9-11); Topic 105 (PDF p.21), sha256:b0e4014d4ff284e082ac858fc585d9e39a364b30fa53354c472542105f5e6360 — https://storage.fasb.org/fas168.pdf; NAIC, Accounting Practices and Procedures Manual, as of March 2025, Part 1 (Indiana DOI copy), Preamble ¶12, ¶24, ¶27, ¶42-44 and footnotes 3-4 (PDF pp.34, 36-40); Preamble Q&A Q2-Q3 (PDF p.44); SSAP No. 1 ¶7 (PDF p.48), sha256:a29e7223b53854eff1beb79c3fd6a969c54529d2dacc74510ea122a5c7b4ad13 — https://www.in.gov/idoi/files/INDAP25-Pt-1.pdf
- note: No open findings.
