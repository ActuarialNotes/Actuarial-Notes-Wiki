---
target: Concepts/Strict Liability.md
created: 2026-10-10
---

## [F-001] Dram shop acts presented as strict liability
- entry_type: finding
- author: agent:validate-v1
- run_id: 2026-10-10T21:00Z/dv08
- date: 2026-10-10
- severity: major
- status: open
- locus: Statutory strict liability bullet; 'A Dram Shop Claim' example; tip callout
- claim: Dram shop acts are listed as statutory strict liability, and the example says the bar's liability 'requires no proof of negligence'.
- evidence: Cornell LII Wex 'dram shop rule' (reviewed July 2025): dram shop laws hold sellers liable for serving visibly intoxicated or underage patrons, and 'These laws are usually based on negligence and not strict liability.' Some states' acts do impose liability without fault, so the page's general statement and the example's 'no proof of negligence' are not true as a general U.S. rule. The DISC-IA reading (The Institutes) could not be read, so whether the course classes dram shop liability as statutory strict liability is unknown; this is a conflict between the page and the only source read, not a confirmed error.
- source_rank: 3
- proposed_action: Reword to say dram shop liability varies by state (strict in some, negligence-based in most per LII), or confirm against the Institutes text; the same claim is in discia-an-229's explanation of option B. Maintainer or course-text decision.
- applied: false
- fingerprint: 2a532b955505

## [F-002] Livestock trespass rule not found in a source
- entry_type: finding
- author: agent:validate-v1
- run_id: 2026-10-10T21:00Z/dv08
- date: 2026-10-10
- severity: minor
- status: open
- locus: Animals bullet, last sentence
- claim: Owners of livestock are traditionally strictly liable when their animals trespass on others' land.
- evidence: Not stated in any source read this run (LII 'strict liability', 'one-bite rule', 'abnormally dangerous activity', 'ultrahazardous activity'). It is the traditional Restatement (Second) s.504 rule, but that text was not read.
- source_rank: 5
- proposed_action: Cite a source for the livestock rule or drop the sentence.
- applied: false
- fingerprint: 1ba4d89712ed

## [F-003] Links Canadian-framed workers compensation and vicarious liability pages
- entry_type: finding
- author: agent:validate-v1
- run_id: 2026-10-10T21:00Z/dv08
- date: 2026-10-10
- severity: minor
- status: open
- locus: Statutory strict liability and vicarious liability bullets
- claim: The U.S. statements about workers compensation and respondeat superior link [[Workers Compensation Insurance]] and [[Vicarious Liability]].
- evidence: DISC-IA is a U.S. course. The linked page is written for Exam 6C: Concepts/Workers Compensation Insurance.md is 'in Canada ... a provincially administered social insurance program' and Concepts/Vicarious Liability.md is framed on Canadian auto owner liability ('the version that matters on 6C'). The U.S. rules the bullets state are on LII Wex 'workers compensation' and 'respondeat superior'.
- source_rank: 3
- proposed_action: Point the links at U.S. treatments (Workers Compensation Underwriting exists for DISC-RM; Tort Law carries the U.S. respondeat superior bullet).
- applied: false
- fingerprint: 1d4df8192737

## [C-001] Validation pass — in_review
- entry_type: comment
- author: agent:validate-v1
- run_id: 2026-10-10T21:00Z/dv08
- date: 2026-10-10
- status_set: in_review
- checks_run: every definition, rule and list against the sources cited; worked examples recomputed; every [[link]] resolves; U.S. framing of links
- note: Checked against LII Wex (strict liability, abnormally dangerous activity, ultrahazardous activity, one-bite rule, dram shop rule, workers compensation, vicarious liability, respondeat superior), 42 U.S.C. s.9607 via LII (sha256:44d4821fc4607bf9e56abf0eb70b7b5966b58fa03e5e2e4b081c321b7fe4e1f0), Webb v. Zern (402A) and CG 00 01 04 13 exclusions c (liquor) and f (pollution). Rylands 1868, s.520 factors, wild/domestic animal rules, workers compensation, CERCLA and 402A agree. Examples recomputed (0.4*90,000=36,000; 100,000+150,000=250,000). Held in_review on the open major finding: the dram shop classification contradicts the one source read, and the course text that might support it could not be reached.

## [F-001/R] Correction applied
- entry_type: resolution
- author: agent:validate-v1
- run_id: 2026-10-10T21:00Z/dv08
- date: 2026-10-10
- resolves: F-001
- status: resolved
- note: Restated per LII Wex 'dram shop rule': dram shop laws make a seller liable for serving a visibly intoxicated or underage customer who causes harm, usually on a negligence basis, with some states imposing liability without proof of fault. The example now assumes a no-fault state and notes the negligence requirement elsewhere (arithmetic unchanged, 250,000 / 250,000); tip callout amended to match.

## [F-002/R] Correction applied
- entry_type: resolution
- author: agent:validate-v1
- run_id: 2026-10-10T21:00Z/dv08
- date: 2026-10-10
- resolves: F-002
- status: resolved
- note: Unsourced livestock-trespass sentence deleted.

## [F-003/R] Correction applied
- entry_type: resolution
- author: agent:validate-v1
- run_id: 2026-10-10T21:00Z/dv08
- date: 2026-10-10
- resolves: F-003
- status: resolved
- note: [[Workers Compensation Insurance]] retargeted to [[Workers Compensation Underwriting]]; [[Vicarious Liability]] link dropped (words kept).

## [C-002] Validation pass — verified
- entry_type: comment
- author: agent:validate-v1
- run_id: 2026-10-10T21:00Z/dv08
- date: 2026-10-10
- status_set: verified
- confidence: medium
- checks_run: re-read the edited passages against the sources cited; links resolve; question_lint clean
- sources_checked: Cornell LII Wex, "strict liability", whole entry, sha256:d45534046effd9edd7fcb7e68b0aaaef40a26a3ae15af3dd8ab480d5ad557a06 — https://www.law.cornell.edu/wex/strict_liability; Cornell LII Wex, "abnormally dangerous activity", whole entry, sha256:ebfe3cfce29c1f965f9ce4d508c731258c0a87db6b6117d516da3277fbae14ba — https://www.law.cornell.edu/wex/abnormally_dangerous_activity; Cornell LII Wex, "ultrahazardous activity", whole entry, sha256:086f2b99ee5e944f2c3823938b5caf0a021fb147b60fd99ea5b5b5e689fa10ef — https://www.law.cornell.edu/wex/ultrahazardous_activity; Cornell LII Wex, "one-bite rule", whole entry, sha256:83c3e494197219e1a5fe968f1117bf9880ccf680744f0c0d879135ac1feaef61 — https://www.law.cornell.edu/wex/one-bite_rule; Cornell LII Wex, "dram shop rule", whole entry, sha256:702e3e7b3943a2c88ebb6dad17f2967257cdedeeabfbc765a87cdb4fb22a54bf — https://www.law.cornell.edu/wex/dram_shop_rule; Cornell LII Wex, "workers compensation", whole entry, sha256:8195d152ed7e85da8dc69b09e5ec3f1ed7bf35c4ef9ba7571a60a3b87cb33718 — https://www.law.cornell.edu/wex/workers_compensation; Cornell LII Wex, "vicarious liability", whole entry, sha256:57fcdf516d60286d1e2944aa84388f6fc92233e4e3400316d9881acafbc27856 — https://www.law.cornell.edu/wex/vicarious_liability; Cornell LII Wex, "respondeat superior", whole entry, sha256:fd77a3983e2353c2f15adffd48d82d032d09d3a1ab40c5c752bfb4140e2baf02 — https://www.law.cornell.edu/wex/respondeat_superior; 42 U.S.C. s.9607 (CERCLA liability), via LII, section text, sha256:44d4821fc4607bf9e56abf0eb70b7b5966b58fa03e5e2e4b081c321b7fe4e1f0 — https://www.law.cornell.edu/uscode/text/42/9607; Webb v. Zern, 422 Pa. 424 (1966) (Caselaw Access Project), quotation of Restatement (Second) s.402A, sha256:eac448a0817d7253681fb5fd8506c8b786db8c6c360e2609148f256d0947c5f0 — https://static.case.law/pa/422/cases/0424-01.json; ISO CGL Coverage Form CG 00 01 04 13 (specimen copy), exclusions c (liquor liability) and f (pollution), sha256:78739f04c6b7b183d1c2e5cd1dd34411cc7f6585760096a2eddb63d0ea904869 — https://cooperscully.com/uploads/file/Commercial%20General%20Liability%20Coverage%20Form.pdf
- note: Re-verified after the clean-up edits. Rylands 1868, s.520 factors, wild/domestic animal and one-bite rules, workers compensation, CERCLA, s.402A and the CGL liquor and pollution exclusions agree with the sources; dram shop liability now stated as LII has it. Examples recomputed (0.4*90,000=36,000; 100,000+150,000=250,000). No open findings. The syllabus reading (The Institutes, 2023) was not read; confidence held at medium.
