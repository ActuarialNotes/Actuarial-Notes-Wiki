---
target: questions/exam-fam/fams-109.md
created: 2026-10-23
---

## [F-001] SOA notation slip Φ for Φ⁻¹ kept without the as-printed marker
- entry_type: finding
- author: agent:validate-v1
- run_id: 2026-10-23T18:31Z/f642
- date: 2026-10-23
- severity: minor
- status: open
- locus: explanation, y_p line
- claim: y_p = Φ[(1+p)/2] = Φ[0.975] = 1.95996, unmarked.
- evidence: SOA FAM-S sample solutions p.43, Q109, prints 'y_p = Φ[(1+p)/2] = Φ[0.975] = 1.95996'; the 97.5th percentile is Φ⁻¹(0.975). Kept as printed; marker added after the first expression. The figure 1.95996 is right.
- source_rank: 1
- proposed_action: Mark the slip in place with '(as printed)', the vault's convention for a publisher's slip.
- applied: true
- fingerprint: aef2e886aec4

## [F-001/R] Correction applied
- entry_type: resolution
- author: agent:validate-v1
- run_id: 2026-10-23T18:31Z/f642
- date: 2026-10-23
- resolves: F-001
- status: resolved
- note: '(as printed)' marker added in this run; the explanation now reads as the SOA printed it, marked.

## [F-002] Recompute disagrees with the SOA key on which mean sets the full-credibility standard
- entry_type: finding
- author: agent:validate-v1
- run_id: 2026-10-23T18:31Z/f642
- date: 2026-10-23
- severity: major
- status: open
- locus: answer key / explanation, standard for full credibility
- claim: Key C (760.945): n_F = λ0 (300/750)^2 = 245.85, using Company Z's observed mean 750 with the class standard deviation 300; Z = 0.7811.
- evidence: Rank 1: SOA FAM-S sample solutions p.43, Q109, keys C and says 'n ≥ λ0(standard deviation/sample mean)^2 = 1536.5773(300/750)^2 = 245.85'. Rank 5 (this run's blind recompute): the standard is n_F = λ0(σ/ξ)^2 with ξ the true mean; the stem gives the class's mean 800 and standard deviation 300 together as the distribution of annual loss per insured, so pairing σ=300 with ξ=800 gives n_F = 1536.64(0.375)^2 = 216.09, Z = (150/216.09)^0.5 = 0.8332, premium 0.8332(750)+0.1668(800) = 758.3, which is option B. The two readings land on different options (B 758, C 761). Logged as a conflict; rank 1 stands and the key is unchanged.
- source_rank: 1
- proposed_action: Maintainer to decide: keep the SOA's key C (rank 1) and consider a one-line editorial note that the SOA's solution divides by the company's sample mean, since 300/800 gives option B. No change made.
- applied: false
- fingerprint: 94f55d79683d

## [C-001] Validation pass — in_review
- entry_type: comment
- author: agent:validate-v1
- run_id: 2026-10-23T18:31Z/f642
- date: 2026-10-23
- status_set: in_review
- checks_run: blind recompute before the key; stem, every formula, table cell and option diffed against the rendered booklet page; explanation diffed line by line against the rendered SOA solution page; answer = SOA key; wiki_link targets and topic page exist; validate_content.py clean
- sources_checked: SOA Exam FAM Sample Questions, Syllabus Topics 1-6 (June 15, 2026), Q109, p.91, sha256:ef535e2198444052082114642e5884d8fe279975ebe7059abb363c5ecfcfd4de — https://www.soa.org/globalassets/assets/files/edu/2024/fall/questions/2024-10-exam-fam-s-sample-questions.pdf; SOA Exam FAM Sample Solutions, Syllabus Topics 1-6 (July 17, 2026), Q109, p.43, sha256:7b3f61d8c385f486f3dbc586cdaab035fe9c45a055710e8327d213c4d3e71b48 — https://www.soa.org/globalassets/assets/files/edu/2024/fall/solutions/2024-10-exam-fam-s-sample-solutions.pdf
- note: Stem and options match booklet p.91; explanation matches solutions p.43 (Φ slip now marked). Left in_review: the blind recompute (B, 758) disagrees with the SOA key (C, 761) on whether the full-credibility CV uses the class mean 800 or the sample mean 750 — open major finding F-002 for the maintainer. Recompute with the class mean: n_F=1536.64(300/800)²=216.1, Z=0.8332, premium 758.3 (B). The SOA's key C (761) uses the company's sample mean, 1536.58(300/750)²=245.85, Z=0.7811 → 760.9. See the open finding.

## [F-002/R] Maintainer's decision: SOA key kept as published
- entry_type: resolution
- author: agent:validate-v1
- run_id: 2026-10-25T14:23Z/505d
- date: 2026-10-25
- resolves: F-002
- status: wontfix
- note: Maintainer's decision: the vault keeps the SOA's key C as published (rank 1). The SOA's solution (FAM-S sample solutions p.43, Q109) divides sigma by the sample mean 750: n >= lambda0(300/750)^2 = 245.85, Z = 0.7811, premium 760.945 (C). The recompute's reading - the class mean 800 sets the standard, n_F = 1536.6(300/800)^2 = 216.1, Z = 0.8332, premium 758.3 (B) - stays recorded in F-002 above. No change to the file.

## [C-002] Validation pass — verified
- entry_type: comment
- author: agent:validate-v1
- run_id: 2026-10-25T14:23Z/505d
- date: 2026-10-25
- status_set: verified
- confidence: medium
- checks_run: re-read booklet p.91 (stem, figures 800/300/150/750, 5%/0.95, options 753/758/761/769/789) and solutions p.43 (Key: C; lambda0 = 1536.5773; n >= lambda0(standard deviation/sample mean)^2 = 1536.5773(300/750)^2 = 245.85) in the cached PDFs; answer C = SOA key; F-002 closed wontfix by the maintainer's decision; file unchanged since the 2026-10-23 pass (verify_check clean)
- sources_checked: SOA Exam FAM Sample Questions, Syllabus Topics 1-6 (June 15, 2026), Q109, p.91, sha256:ef535e2198444052082114642e5884d8fe279975ebe7059abb363c5ecfcfd4de — https://www.soa.org/globalassets/assets/files/edu/2024/fall/questions/2024-10-exam-fam-s-sample-questions.pdf; SOA Exam FAM Sample Solutions, Syllabus Topics 1-6 (July 17, 2026), Q109, p.43, sha256:7b3f61d8c385f486f3dbc586cdaab035fe9c45a055710e8327d213c4d3e71b48 — https://www.soa.org/globalassets/assets/files/edu/2024/fall/solutions/2024-10-exam-fam-s-sample-solutions.pdf
- note: Verified at medium against the SOA's published key and solution, by the maintainer's decision on F-002 (keep the SOA's key, rank 1). Medium because the recompute's reading of which mean sets the standard (class mean 800, giving B) disagrees with the SOA's; that conflict stays on record in F-002.
