---
target: Concepts/Balancing Back.md
created: 2026-10-31
---

## [F-001] Brown & Lennox balancing back is section 4.8.3, not chapter 5
- entry_type: finding
- author: agent:validate-v1
- run_id: 2026-10-31T17:40Z/e77f
- date: 2026-10-31
- severity: minor
- status: open
- locus: opening paragraph, third sentence
- claim: "Balancing back is the term used in the ASTAM ratemaking reading (Brown & Lennox, chapter 5)".
- evidence: The publisher's own printed Table of Contents (ACTEX sample pages for the 5th ed., PDF pp.6-7, sha256:186d9239…) lists "4.8 RATE CHANGES" p.117 with "4.8.2 CHANGING RATING VARIABLE DIFFERENTIALS" p.124 and "4.8.3 BALANCING BACK" p.129, all in Chapter 4 RATEMAKING; Chapter 5 INTERMEDIATE TOPICS (p.150) has no balancing-back section (5.1-5.6: individual risk rating, ILFs, deductible pricing, reinsurance, exercises). The SOA ASTAM October 2026 syllabus (p.6) assigns Brown & Lennox Chapter 4 (Section 4.8) and Chapter 5 (Sections 5.3, 5.4), so the term sits in the 4.8 assignment. A candidate following the page to Chapter 5 would not find it.
- source_rank: 2
- proposed_action: Change "chapter 5" to "section 4.8.3" (transcription of the publisher's contents page).
- applied: true
- fingerprint: b7df6adc3801

## [F-002] SOA ASTAM calls the reciprocal (new/old) the off-balance factor
- entry_type: finding
- author: agent:validate-v1
- run_id: 2026-10-31T17:40Z/e77f
- date: 2026-10-31
- severity: major
- status: open
- locus: OBF definition (Symbols bullet, second display) and Exam traps, "Factor upside down"
- claim: The page defines OBF as average relativity before / after (old over new), multiplies the base rate by it, and the trap "Factor upside down" says "The factor is old over new", while the How-it-appears callout points ASTAM candidates to this page.
- evidence: SOA Exam ASTAM Spring 2025 model solution, Q3(c)(iii), p.8 (sha256:f651a964…; rendered and read): "The off-balance factor is the ratio of the new average differential to the old average differential, weighted by exposure", computed as [18,500(1)+8000(0.8910)+2200(0.8494)] / [18,500(1)+8000(0.9520)+2200(0.9173)] = 0.9771, and Q3(d)(i), p.9, sets B = 1.1(200)/0.9771 = 225.16, i.e. it DIVIDES by its OBF. Werner & Modlin Ch. 14 p.276 (PDF p.288) define the off-balance factor as 1/(1+ΔS%), the reciprocal of one plus the change in average rate differential (old over new), and multiply (Table 14.10, col (6) = 1.0/(1.0+(Tot5)) = 0.9749, col (8) = [1+(5)] x (6) x [1+(7)] - 1). Both conventions give the same base rate (recomputed: 220/0.97710 = 225.16 = 200 x 1.1 x 1.02344), so neither source is wrong; the term means reciprocal things in the CAS and SOA readings. The page states only the CAS convention, as a universal, and its trap would tell an ASTAM candidate asked to "show that the off-balance factor is 0.98" that 0.977 is upside down. Per the agent rules this CAS/SOA difference is flagged, not reconciled.
- source_rank: 1
- proposed_action: Add a sentence (authoring, for a human) that SOA ASTAM model solutions define the off-balance factor as new over old exposure-weighted average differential and divide the base rate by it, and qualify the "Factor upside down" trap as the Werner & Modlin convention. The G8-quoted OBF display, B_new display and OBF-definition sentence can stay as they are if the note is added beside them.
- applied: false
- fingerprint: 94cb3174e833

## [F-003] Premium-weighting trap reads against W&M, who prefer premium weights
- entry_type: finding
- author: agent:validate-v1
- run_id: 2026-10-31T17:40Z/e77f
- date: 2026-10-31
- severity: minor
- status: open
- locus: Exam traps, "Weighting by premium instead of exposure"
- claim: "The sums weight relativities by exposures. Weighting the relativities by current premium counts each class's old relativity twice and gives the wrong factor."
- evidence: Werner & Modlin Ch. 14 p.276 (PDF p.288): "The change in average rate differential for each multiplicative rating variable is calculated as the change in the rate differential for each level of the rating variable weighted by the current variable premium"; p.276-277 (PDF pp.288-289): exposure weights are what actuaries "may choose" when premium is hard to get, and that "method of weighting introduces the same distributional bias"; Table 14.10 (PDF p.292) weights the relativity change (col 5) by premium (col 2). The trap's literal arithmetic is right (premium-weighting the relativities themselves, sum P_i r_i, double-counts r_old; recomputed), but its heading presents premium weighting as the error, when W&M's preferred weighting is premium on the relativity CHANGES, which equals exposures x other-variable relativities on the relativities (the page's own Weights bullet). A candidate given premium by level on an Exam 5 OBF question could be steered away from W&M's method.
- source_rank: 2
- proposed_action: Reword the trap (authoring, for a human) so it says that the relativity CHANGES r_new/r_old may be weighted by current premium (W&M's preferred weighting, Table 14.10), while the relativities themselves are weighted by exposures; the heading should not name premium weighting as the error.
- applied: false
- fingerprint: afb31bc89e8c

## [F-001/R] Correction applied
- entry_type: resolution
- author: agent:validate-v1
- run_id: 2026-10-31T17:40Z/e77f
- date: 2026-10-31
- resolves: F-001
- status: resolved
- note: Corrected in this run: "chapter 5" now reads "section 4.8.3", transcribed from the ACTEX contents page (PDF p.7). The edited sentence is quoted by no recorded answerability item (grep of simulations/answerability/*.json).

## [C-001] Validation pass — verified
- entry_type: comment
- author: agent:validate-v1
- run_id: 2026-10-31T17:40Z/e77f
- date: 2026-10-31
- status_set: verified
- confidence: medium
- checks_run: Every formula (B_new, OBF, balance condition, class rate change) against W&M Ch.14 pp.276-283 (OBF = 1/(1+ΔS%), Tables 14.8 and 14.10 col (8)); loss ratio and pure premium relativities against W&M Ch.9 pp.161-165 (formula p.165 is relative to the base class) and the SOA ASTAM Spring 2025 Q3(c) solution; adjusted-exposure weighting against W&M p.167 and p.275 (premium at base level); expected-distribution weights against W&M p.284; capping/selected relativities against W&M pp.280-283; ASTAM objective 6(e) and Brown & Lennox assignment against the October 2026 syllabus; the term and its section against the ACTEX contents page; both worked examples recomputed independently (591.30, 916.52, 443.48, 6.12M; LRs 0.600/0.660/0.750, 1.375/2.000, OBF 0.93608, 393.15, 540.58, 786.30, 4,767,000, 12.2%) - rank 5 only, the examples are the vault's own; wiki-links all resolve; LaTeX balanced.
- sources_checked: Werner & Modlin, Basic Ratemaking (CAS, 5th ed. May 2016), Ch. 9 pp.161-167 (PDF pp.173-179) and Ch. 14 pp.274-284 (PDF pp.286-296); printed = PDF - 12, sha256:6b214d4db52674df2e83343920c06781e491254bd77f27e32ba312faaff3782c — https://www.casact.org/sites/default/files/2021-03/5_Werner_Modlin.pdf; SOA Exam ASTAM syllabus, October 2026, Topic 6 outcome e (p.5) and Resources (p.6), sha256:6d462aea25c09b15cc457176ecf2d5d6143df8fb88df9f366557de17ec1ec9ba — https://www.soa.org/globalassets/assets/files/edu/2026/astam/2026-fall-exam-astam-syllabus.pdf; Brown & Lennox, Introduction to Ratemaking and Loss Reserving for P&C Insurance, 5th ed. (ACTEX 2022), publisher's sample pages, printed Table of Contents pp.v-vi (PDF pp.6-7), sha256:186d9239f5c102f1077ad1c229ec03d6dfeae209d5c4bf36728641582c4c451e — https://www.actexmadriver.com/samples/Intro_to_Ratemaking_06092022_sample.pdf; SOA Exam ASTAM Spring 2025 model solutions, Q3(c)(iii) and (d), pp.8-9, sha256:f651a9645c9b8ace921bb11d9def2e3655895a0fd6c563fe8777c43eb3f706e5 — https://www.soa.org/globalassets/assets/files/edu/2025/spring/solutions/2025-spring-astam-solutions.pdf
- note: Formulas and definitions agree with Werner & Modlin and with the SOA ASTAM syllabus and model solutions. Fixed the Brown & Lennox citation (chapter 5 -> section 4.8.3). Two open findings: the SOA ASTAM model solutions use the reciprocal (new/old) as the "off-balance factor" (major - a CAS/SOA convention difference, flagged not reconciled), and the premium-weighting trap reads against W&M's preferred premium weighting of relativity changes (minor). Brown & Lennox §4.8.3 text itself was not read (ACTEX, paywalled; only its contents pages are public), so the claim that it uses the term rests on its section heading. Confidence medium for that reason and the open major.
