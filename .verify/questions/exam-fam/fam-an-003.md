---
target: questions/exam-fam/fam-an-003.md
created: 2026-10-19
---

## [F-001] Option C was a second defensible answer, and its explanation stated a rule the sources contradict
- entry_type: finding
- author: agent:validate-v1
- run_id: 2026-10-19T00:06Z/7017
- date: 2026-10-19
- severity: major
- status: open
- locus: option C and its 'Why not the others' bullet
- claim: Option C: 'A company insures a warehouse it has agreed to buy next month; the warehouse burns down before the purchase closes', explained as no insurable interest because 'Until the sale closes the company does not own the warehouse and suffers no loss from the fire.'
- evidence: FC&S Editors (PropertyCasualty360, 13 Nov 2009), answering a buyer's pre-closing claim: 'Even though your insured had not yet closed on his new home, he still had an insurable interest in it, assuming he was still bound by the contract', citing Whitten v. Cincinnati Ins. Co., 544 N.E.2d 1169 (1989), where the buyers' policy paid for a house that burned during a delayed closing. IRMI's glossary: insurable interest 'usually results from property rights, contract rights, and potential legal liability'. Lucena v Craufurd (as quoted in Wikipedia, Insurable interest): 'a right in property, or a right derivable out of some contract about the property'. A company that 'has agreed to buy' holds such a contract right, so C was arguably correct alongside the key A, and the explanation taught that a pre-closing buyer can have no interest. The key A itself stands: Kramer v. Phoenix, 15 N.Y.3d 539, reads Ins. Law 3205(b)(2) to require the interest only 'at the time when such contract is made' and holds a policy 'valid in its inception' needs none later.
- source_rank: 3
- proposed_action: Reword option C so the company has no contract (only considering a purchase), and restate the C bullet to what the sources say: no right and no contract means no interest, while a buyer bound by a contract of sale can have one before closing.
- applied: true
- fingerprint: 0ea962cea626

## [F-001/R] Correction applied
- entry_type: resolution
- author: agent:validate-v1
- run_id: 2026-10-19T00:06Z/7017
- date: 2026-10-19
- resolves: F-001
- status: resolved
- note: Option C reworded (the clean-up round's limit: a question the finding proposed changing) to a company only thinking of buying, with no offer and no contract, and the C bullet restated to the sources: no right and no contract means no interest; a buyer bound by a contract of sale can have one before closing (FC&S; Whitten). Re-checked: A is now the only option with an interest at the time the law requires it.

## [C-001] Validation pass — verified
- entry_type: comment
- author: agent:validate-v1
- run_id: 2026-10-19T00:06Z/7017
- date: 2026-10-19
- status_set: verified
- confidence: medium
- checks_run: each option judged from the sources before reading the key; key A (life policy valid at inception survives divorce) matches; B property interest at time of loss (HO-3 Condition A); C reworded this run, now no right and no contract; D wager, no interest at inception (Kramer, quoting Ruse); E mere expectancy in a neighbour's house (Wikipedia lead, Lucena definition); re-check after the fix; wiki link resolves; syllabus Topic 7(a) alignment
- sources_checked: Kramer v. Phoenix Life Ins. Co., 15 N.Y.3d 539 (2010), Ins. Law 3205(a)(1), (b)(2) as quoted: insurable interest required 'at the time when such contract is made'; policy 'valid in its inception'; Ruse: no-interest policy is a wager, sha256:d52bfe82c039259c0eebfcf0832297aa38278641291441e701ce71692e6921f9 — https://nycourts.gov/reporter/3dseries/2010/2010_08376.htm; FC&S Editors, Insurable Interest in Contract to Purchase Home (PropertyCasualty360, 13 Nov 2009), buyer bound by a purchase contract has an insurable interest before closing; Whitten v. Cincinnati Ins. Co., 544 N.E.2d 1169 (1989), sha256:603594445e937dff5f46b740106bf54a2e6b48d175dd0c8bc1fe0edd45939ff1 — https://propertycasualty360.com/fcs/2009/11/13/insurable-interest-in-contract-to-purchase-home-422-6636; ISO HO 00 03 05 11 Homeowners 3 (Maine Bureau of Insurance copy), Section I Conditions A, Insurable Interest And Limit Of Liability: insured's interest at the time of loss, p.13, sha256:ac539e500a5767946452d1e6ad4c4b7dcc395c6c65c48fc3a8ac92a7c330a1d4 — https://www.maine.gov/pfr/insurance/sites/maine.gov.pfr.insurance/files/inline-files/ho00-03-05-11-homeowners3-special-form.pdf; IRMI Insurance Glossary, insurable interest, definition: results from property rights, contract rights and potential legal liability, sha256:361080a9319f5f1b2ec4c011a706f9976415c32f8be590e83f78355e4cb1bf41 — https://www.irmi.com/term/insurance-definitions/insurable-interest; Wikipedia, Insurable interest (fetched 2026-10-19), lead (no interest in neighbours' homes); Lucena v Craufurd definition ('a right derivable out of some contract about the property'); spouse's interest in a spouse's life, sha256:988f0b63ead884dfb0662ce706b8cc2ffc4c8d664e02bea8df2300e23c09e13a — https://en.wikipedia.org/wiki/Insurable_interest; SOA Exam FAM Syllabus, October 2026, Topic 6 (a), (c) p.5; Topic 7 (a), (b) p.6; Topic 2 (m) p.3, sha256:90172025d8bd9d69e18e974fdee447963e54258e5f0e419aa3ef5b7d3e55a00e — https://www.soa.org/globalassets/assets/files/edu/2026/fall/syllabi/2026-10-fam-syllabus.pdf
- note: F-001 (major) found option C defensible as written and fixed it in this run. Insurable-interest law varies by jurisdiction; sources are U.S. statute/case law, an industry Q&A, the ISO form and glossaries, none of them a FAM reading, so medium.
