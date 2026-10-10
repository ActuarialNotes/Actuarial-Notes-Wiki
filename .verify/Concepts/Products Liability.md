---
target: Concepts/Products Liability.md
created: 2026-10-10
---

## [F-001] Strict products liability stated as universal
- entry_type: finding
- author: agent:validate-v1
- run_id: 2026-10-10T21:00Z/dv08
- date: 2026-10-10
- severity: minor
- status: open
- locus: Strict liability in tort bullet and 'Every seller can be liable' trap
- claim: Under Restatement (Second) s.402A a seller is strictly liable for a product sold in a defective condition unreasonably dangerous; the trap says strict liability reaches a retailer who never opened the box.
- evidence: Accurate for most states (s.402A text confirmed via Webb v. Zern, 422 Pa. 424), but not all: N.C. Gen. Stat. s.99B-1.1 reads 'There shall be no strict liability in tort in product liability actions', and Ind. Code 34-20-2-3 (quoted in The Indiana Lawyer) bars strict liability actions against a seller that is not the manufacturer.
- source_rank: 2
- proposed_action: Add 'in most states' (and note innocent-seller statutes already mentioned) where the rule is stated generally.
- applied: false
- fingerprint: f7565e174b0d

## [F-002] Links a Canadian-framed joint and several liability page
- entry_type: finding
- author: agent:validate-v1
- run_id: 2026-10-10T21:00Z/dv08
- date: 2026-10-10
- severity: minor
- status: open
- locus: Example 'Tracing a Pressure Cooker Claim', [[Joint and Several Liability|joint and several liability]]
- claim: The U.S. products example links [[Joint and Several Liability]].
- evidence: DISC-IA is a U.S. course. The linked page is written for Exam 6C: Concepts/Joint and Several Liability.md is built on the Harris reading (IBC, Ontario Trial Lawyers Association). The U.S. doctrine is on LII Wex 'joint and several liability' and on Concepts/Tort Law.md.
- source_rank: 3
- proposed_action: Link [[Tort Law]] or a U.S. treatment instead; maintainer decision.
- applied: false
- fingerprint: d06fe63ac9b1

## [C-001] Validation pass — verified
- entry_type: comment
- author: agent:validate-v1
- run_id: 2026-10-10T21:00Z/dv08
- date: 2026-10-10
- status_set: verified
- confidence: medium
- checks_run: every definition, rule and list against the sources cited; worked examples recomputed; every [[link]] resolves; U.S. framing of links; UCC warranty sections and CGL exclusions read
- sources_checked: Cornell LII Wex, "products liability", whole entry, sha256:3932a61c3a07202fd010d53a48a95868ba5ce8965c19b11890b41f59b224daf5 — https://www.law.cornell.edu/wex/products_liability; Cornell LII Wex, "design defect", whole entry, sha256:dee38ea306d1221efb1fac89e21c6345201c8417decb960b10b1cf17942f5579 — https://www.law.cornell.edu/wex/design_defect; Cornell LII Wex, "manufacturing defect", whole entry, sha256:878c81fb8dfae85a22dc3f7c93878eaaa703b14ab471183f5fb05d87b0697fb1 — https://www.law.cornell.edu/wex/manufacturing_defect; Cornell LII Wex, "warranty of merchantability", whole entry, sha256:f8f2ecfbb71064114586928fbe1f5f182b33233e8fbd0271246fd467f9e97d23 — https://www.law.cornell.edu/wex/warranty_of_merchantability; UCC s.2-313 (express warranties), via LII, section text, sha256:d46f2186b152678f968e7b8aa9c91538768cd1998c14e2fb0c97a819ad071a87 — https://www.law.cornell.edu/ucc/2/2-313; UCC s.2-314 (merchantability), via LII, section text, sha256:e01e96d60caf78222cc3459bb8f17147247b090ee11eafc74b0f6126551e9046 — https://www.law.cornell.edu/ucc/2/2-314; UCC s.2-315 (fitness for particular purpose), via LII, section text, sha256:fbc7416bd26d5141b672d967f4169b59eff4da02b3047f54ec6a08993bedb378 — https://www.law.cornell.edu/ucc/2/2-315; UCC s.2-316 (exclusion of warranties), via LII, section text, sha256:d804acc380ff4af0e8efd06bda35b657c57e6c3e93e88b883942959da30a884b — https://www.law.cornell.edu/ucc/2/2-316; Webb v. Zern, 422 Pa. 424 (1966) (Caselaw Access Project), quotation of Restatement (Second) s.402A, sha256:eac448a0817d7253681fb5fd8506c8b786db8c6c360e2609148f256d0947c5f0 — https://static.case.law/pa/422/cases/0424-01.json; MacPherson v. Buick Motor Co., 217 N.Y. 382 (1916) (Caselaw Access Project), opinion text, sha256:11d9b06149d105cc11a92409ff8c46dc5bcec02a1d26e3754b81144ee561a471 — https://static.case.law/ny/217/cases/0382-01.json; N.C. Gen. Stat. ch. 99B (Products Liability), ss.99B-1.1, 99B-2, 99B-3, 99B-4, 99B-6, sha256:77f19d9ffee208e103cf242770e09eb5c654562e107a8849b46e389dc5341d65 — https://www.ncleg.gov/EnactedLegislation/Statutes/HTML/ByChapter/Chapter_99B.html; The Indiana Lawyer (DTCI), "Are sellers safe from strict liability under the IPLA?" (rank 3), quotation of Ind. Code 34-20-2-3, read via WebFetch 2026-10-10 (host refuses scripted fetch, no hash) — https://theindianalawyer.com/?p=138294; IRMI Glossary, "vendors endorsement", whole entry, sha256:74b815c93094a19b5557fdbb7832aef01914bde7af83cb952b0467fdba111fdc — https://www.irmi.com/term/insurance-definitions/vendors-endorsement; ISO CGL Coverage Form CG 00 01 04 13 (specimen copy), s.V def. 16 products-completed operations hazard; exclusions k and n, sha256:78739f04c6b7b183d1c2e5cd1dd34411cc7f6585760096a2eddb63d0ea904869 — https://cooperscully.com/uploads/file/Commercial%20General%20Liability%20Coverage%20Form.pdf
- note: Theories, defect types, s.402A elements, UCC warranties and disclaimers, alteration and misuse (N.C. ss.99B-3, 99B-4), innocent-seller statutes (Ind. Code 34-20-2-3), PCOH, own-product and recall exclusions and vendors endorsement CG 20 15 all agree. The state-of-the-art defence was not located in a source read (left as unchecked, not a finding: N.C. s.99B-6 frames design defect by knowledge at the time of manufacture). Examples recomputed: 280,000/120,000; dP=0.0004, dP*L=16>6. Open: two minor findings. The syllabus reading (The Institutes, Insurance Accounting, Coverage Analysis, Insurance Law, and Insurance Regulation, 2023) is sold, not published, and was not read; confidence is held at medium for that reason.

## [F-001/R] Correction applied
- entry_type: resolution
- author: agent:validate-v1
- run_id: 2026-10-10T21:00Z/dv08
- date: 2026-10-10
- resolves: F-001
- status: resolved
- note: Restated: 'In most states, following Restatement (Second) s.402A ...' with 'Not every state follows the rule: North Carolina's statute provides that there shall be no strict liability in tort in product liability actions' (N.C. Gen. Stat. 99B-1.1); trap now 'Where the state applies strict liability ...'.

## [F-002/R] Correction applied
- entry_type: resolution
- author: agent:validate-v1
- run_id: 2026-10-10T21:00Z/dv08
- date: 2026-10-10
- resolves: F-002
- status: resolved
- note: Link to [[Joint and Several Liability]] dropped; words kept.

## [C-002] Validation pass — verified
- entry_type: comment
- author: agent:validate-v1
- run_id: 2026-10-10T21:00Z/dv08
- date: 2026-10-10
- status_set: verified
- confidence: medium
- checks_run: re-read the edited passages against the sources cited; links resolve; question_lint clean
- sources_checked: Cornell LII Wex, "products liability", whole entry, sha256:3932a61c3a07202fd010d53a48a95868ba5ce8965c19b11890b41f59b224daf5 — https://www.law.cornell.edu/wex/products_liability; Cornell LII Wex, "design defect", whole entry, sha256:dee38ea306d1221efb1fac89e21c6345201c8417decb960b10b1cf17942f5579 — https://www.law.cornell.edu/wex/design_defect; Cornell LII Wex, "manufacturing defect", whole entry, sha256:878c81fb8dfae85a22dc3f7c93878eaaa703b14ab471183f5fb05d87b0697fb1 — https://www.law.cornell.edu/wex/manufacturing_defect; Cornell LII Wex, "warranty of merchantability", whole entry, sha256:f8f2ecfbb71064114586928fbe1f5f182b33233e8fbd0271246fd467f9e97d23 — https://www.law.cornell.edu/wex/warranty_of_merchantability; UCC s.2-313 (express warranties), via LII, section text, sha256:d46f2186b152678f968e7b8aa9c91538768cd1998c14e2fb0c97a819ad071a87 — https://www.law.cornell.edu/ucc/2/2-313; UCC s.2-314 (merchantability), via LII, section text, sha256:e01e96d60caf78222cc3459bb8f17147247b090ee11eafc74b0f6126551e9046 — https://www.law.cornell.edu/ucc/2/2-314; UCC s.2-315 (fitness for particular purpose), via LII, section text, sha256:fbc7416bd26d5141b672d967f4169b59eff4da02b3047f54ec6a08993bedb378 — https://www.law.cornell.edu/ucc/2/2-315; UCC s.2-316 (exclusion of warranties), via LII, section text, sha256:d804acc380ff4af0e8efd06bda35b657c57e6c3e93e88b883942959da30a884b — https://www.law.cornell.edu/ucc/2/2-316; Webb v. Zern, 422 Pa. 424 (1966) (Caselaw Access Project), quotation of Restatement (Second) s.402A, sha256:eac448a0817d7253681fb5fd8506c8b786db8c6c360e2609148f256d0947c5f0 — https://static.case.law/pa/422/cases/0424-01.json; MacPherson v. Buick Motor Co., 217 N.Y. 382 (1916) (Caselaw Access Project), opinion text, sha256:11d9b06149d105cc11a92409ff8c46dc5bcec02a1d26e3754b81144ee561a471 — https://static.case.law/ny/217/cases/0382-01.json; N.C. Gen. Stat. ch. 99B (Products Liability), ss.99B-1.1, 99B-2, 99B-3, 99B-4, 99B-6, sha256:77f19d9ffee208e103cf242770e09eb5c654562e107a8849b46e389dc5341d65 — https://www.ncleg.gov/EnactedLegislation/Statutes/HTML/ByChapter/Chapter_99B.html; The Indiana Lawyer (DTCI), "Are sellers safe from strict liability under the IPLA?" (rank 3), quotation of Ind. Code 34-20-2-3, read via WebFetch 2026-10-10 (host refuses scripted fetch, no hash) — https://theindianalawyer.com/?p=138294; IRMI Glossary, "vendors endorsement", whole entry, sha256:74b815c93094a19b5557fdbb7832aef01914bde7af83cb952b0467fdba111fdc — https://www.irmi.com/term/insurance-definitions/vendors-endorsement; ISO CGL Coverage Form CG 00 01 04 13 (specimen copy), s.V def. 16 products-completed operations hazard; exclusions k and n, sha256:78739f04c6b7b183d1c2e5cd1dd34411cc7f6585760096a2eddb63d0ea904869 — https://cooperscully.com/uploads/file/Commercial%20General%20Liability%20Coverage%20Form.pdf
- note: Re-verified after the clean-up edits (all open findings resolved in this run). Theories, defect types, s.402A elements, UCC warranties and disclaimers, alteration and misuse (N.C. ss.99B-3, 99B-4), innocent-seller statutes (Ind. Code 34-20-2-3), PCOH, own-product and recall exclusions and vendors endorsement CG 20 15 all agree. The state-of-the-art defence was not located in a source read (left as unchecked, not a finding: N.C. s.99B-6 frames design defect by knowledge at the time of manufacture). Examples recomputed: 280,000/120,000; dP=0.0004, dP*L=16>6.
