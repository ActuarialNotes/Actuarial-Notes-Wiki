---
target: Concepts/Equivalence Principle.md
created: 2026-10-31
---

## [C-001] Validation pass — verified
- entry_type: comment
- author: agent:validate-v1
- run_id: 2026-10-31T18:53Z/182f
- date: 2026-10-31
- status_set: verified
- confidence: medium
- checks_run: definition and net/gross loss vs open texts; Var(L0) shortcut vs SOA solutions; every SULT input diffed against the FAM tables; all three examples recomputed from scratch before reading the stated answers; exam-use bullets vs FAM and ALTAM syllabi; wiki-links resolve
- sources_checked: SOA Exam FAM syllabus, October 2026, Topic 10 learning outcomes a-e, p.7; readings p.8, sha256:90172025d8bd9d69e18e974fdee447963e54258e5f0e419aa3ef5b7d3e55a00e — https://www.soa.org/globalassets/assets/files/edu/2026/fall/syllabi/2026-10-fam-syllabus.pdf; E. Valdez, STT 456 Premium Calculation lecture slides (Michigan State, Spring 2015), after Dickson et al. ch.6, slides 4-8, 16, 18, sha256:7b4af6694606f8ee6a4ad037032100e510c0f7d382d2f47d6f85044cff02cc98 — https://users.math.msu.edu/users/valdezea/stt456s15/STT456Weeks1to2-S2015.pdf; B. Hartman, Stat 344 Life Contingencies I, Chapter 6: Premiums (BYU lecture notes), slides 3-6, 23-33, sha256:da3f77bfcd709a519f2c4982b1969fa3d62c4ec4b410117ad00dedf510dee5e8 — https://hartman.byu.edu/docs/344Files/Stat344_Chapter6.pdf; SOA Exam FAM Sample Solutions, Topics 7-10, Q5.5 p.29; Q6.4 p.35; Q6.6 p.36; Q7.13 p.71; Q7.16-7.17 p.73; Q7.40 p.82, sha256:9e7f7b03e0252ccb8f69e4f453d443d8d7cb43ef3945d05c935fdf234cae72ab — https://www.soa.org/globalassets/assets/files/edu/2024/fall/solutions/2024-10-exam-fam-l-sample-solutions.pdf; SOA Tables for Exam FAM, Standard Ultimate Life Table pp.20-21, sha256:430c8babdb38ff53ae7ce7d5d1d3bd55c2890eeb9ae96db5015121d1c2f11e17 — https://www.soa.org/globalassets/assets/files/edu/2024/fall/2024-10-exam-fam-tables.pdf; SOA ALTAM Sample Written-Answer Solutions (Jan 2026), Q19 pp.35-36 (last-survivor premium payable while both alive; policy values by state), sha256:3e52f41d261382185358d31d5ce2eed38ef94578f2c04dce17a3d38b50385e90 — https://www.soa.org/globalassets/assets/files/edu/2026/spring/questions-solutions/2026-01-altam-solutions.pdf; SOA Exam ALTAM syllabus, October 2026, Topics 2-3 learning outcomes, pp.2-3, sha256:44b64a78219337f43387cb52837c7c2ce590ae2b97321d6e8e4e29ab2cd38c5e — https://www.soa.org/globalassets/assets/files/edu/2026/fall/syllabi/2026-10-altam-syllabus.pdf; T. Lim, Solving Actuarial Math with Python — Constant Force of Mortality, constant force formulas, sha256:5df98081b0c9fbaea4f8740f723f168fc5af81d3d5f8b39812b287d9201e8760 — https://actuarialmath-guide.readthedocs.io/en/latest/constantforce.html
- note: No FAM-L/ALTAM log existed. AMLCR 3rd ed. is commercial and was not read (D7/D22/D27): checked against open texts at medium. Definition (E[L0]=0, EPV premiums = EPV benefits [+ expenses] for gross) matches Valdez STT456 slides 4-6 and Hartman Stat344 ch.6 slides 4-6; Var(L0)=(S+P/d)^2(2A-A^2) matches Valdez Weeks2-4 slide 12 and SOA FAM sample solutions Q6.6 (p.36) and Q7.17 (p.73); portfolio percentile summary matches Hartman ch.6 slides 29-30. SULT inputs A50=0.18931, 2A50=0.05108, a50=17.0245, A45=0.15161, a45:20=12.9391 all read off FAM tables p.20. Blind recomputation: P=1,111.99, SD(L0)=15,229; G=1,351.78 (net 1,171.72); last-survivor P=1,607.14 and 957.45 with the last-survivor annuity 16.786 (constant-force Abar=mu/(mu+delta), abar=1/(mu+delta) per Lim). The last-survivor structure (benefit on second death, premium annuity on the joint life) is the one SOA ALTAM sample Q19(a) p.35 uses, A_last = 2A_40 - A_40:40. ALTAM bullet matches ALTAM syllabus Topics 2c and 3c. The lead's phrase attributing joint-life and multiple-state contracts to 'AMLCR Chapter 6' could not be checked against the book's contents; it is read as describing where the principle applies, not a chapter map.

## [F-001] Worked example's answer is unpublished
- entry_type: finding
- author: agent:validate-v1
- run_id: 2026-10-31T19:44Z/cd9b
- date: 2026-10-31
- severity: minor
- status: open
- locus: example 'Whole Life with a Return of Premiums', answer
- claim: The example states ä40 = 18.516 and A40 = 0.2879 from Valdez's slide 14 data.
- evidence: Valdez STT 456 Premium Calculation slide 14 (sha256:7b4af669...) prints the data (10,000 plus return of premiums without interest, P = 290.84, (IA)40 = 8.6179, i = 4%) and asks for ä40, but prints no answer; no other source read this session states it (web search for the figures found none). Independent recomputation with slide 11's equation P(ä - (IA)) = B A and A = 1 - d ä: ä40 = (10,000 + 290.84 x 8.6179)/(290.84 + 10,000 x 0.04/1.04) = 12,506.43/675.455 = 18.5156; A40 = 0.28786; premium without refund 155.47. The arithmetic is right, but it rests on rank-5 recomputation only, so the number has one source, not two.
- source_rank: 5
- proposed_action: Keep if the maintainer accepts a recomputation on published data for a vault example; otherwise replace the data with a published worked example (e.g. FAM-L Q6.1, whose P = 35.36 is printed) or cite a source that prints ä40 = 18.516.
- applied: false
- fingerprint: d9c2b9994fab

## [C-002] Validation pass — verified
- entry_type: comment
- author: agent:validate-v1
- run_id: 2026-10-31T19:44Z/cd9b
- date: 2026-10-31
- status_set: verified
- confidence: medium
- checks_run: New bullets matched: return of premiums without interest to Valdez slide 11 and FAM-L Q6.1/Q6.2; the (IA) identity to FAM-L Q6.51 (n = 10) together with Slud's general (DA) = (n+1)A - (IA) (the 'stack of term insurances' step is the page's own reasoning, consistent with both); return with interest to FAM-L Q6.7 and Valdez slide 12 (j = i, j > i). New example recomputed before reading: 18.5156, 0.28786, 155.47. Existing examples recomputed: 1,111.99, 123,351.7, 15,228.7; 1,351.78, 1,171.72; 0.160714, 1,607.14, 16.786, 957.4. SULT values read off p.20.
- sources_checked: Valdez, STT 456 Premium Calculation slides (MSU, Spring 2015), slides 11-14 (return of premium: j = 0 gives P = B A_x/(ä_x - (IA)_x); j = i gives L0 = B v^(K+1), no possible premium; j > i loss always positive; slide 14 example data: 10,000 + ROP, 290.84, (IA)40 = 8.6179, i = 4%, no answer printed), sha256:7b4af6694606f8ee6a4ad037032100e510c0f7d382d2f47d6f85044cff02cc98 — https://users.math.msu.edu/users/valdezea/stt456s15/STT456Weeks1to2-S2015.pdf; SOA Exam FAM-L Sample Solutions (2024-10, rev. Aug 2026), Q6.1 p.34 (death benefit 1000 + (k+1)P: P = 1000A^1/(ä - (IA)^1)), Q6.2 p.34 (G(IA)^1 with expenses), Q6.7 p.37 (pi s̈_(K+1) v^(K+1) = pi ä_(K+1); pi s̈_20 = 100,000), Q6.51 p.60 ((IA)^1_62:10 = 11A^1_62:10 - sum_(k=1..10) A^1_62:k), Q6.35 p.52 (gross premium by the equivalence principle), sha256:9e7f7b03e0252ccb8f69e4f453d443d8d7cb43ef3945d05c935fdf234cae72ab — https://www.soa.org/globalassets/assets/files/edu/2024/fall/solutions/2024-10-exam-fam-l-sample-solutions.pdf; Slud, Actuarial Mathematics and Life-Table Statistics (Univ. of Maryland, 2001, author's posted text), §6.1.1 p.151 (PDF 161: (DA)^1_x:n = (n+1)A^1_x:n - (IA)^1_x:n, DA paying n - k on death in year k+1), sha256:dccaca6b0e9f58a2f472390538e901660d0a45eb816e2869657718735c2b80bb — https://www.math.umd.edu/~slud/s470/BookChaps/01Book.pdf; SOA Tables for Exam FAM (2024-10), Standard Ultimate Life Table p.20 (A45 = 0.15161, ä45:20 = 12.9391, ä50 = 17.0245, A50 = 0.18931, 2A50 = 0.05108), sha256:430c8babdb38ff53ae7ce7d5d1d3bd55c2890eeb9ae96db5015121d1c2f11e17 — https://www.soa.org/globalassets/assets/files/edu/2024/fall/2024-10-exam-fam-tables.pdf
- note: Re-check after the FAM-L writer's edit. Checked by a different agent from the writer (G8 checker, FAM-L). One minor finding left open: the new example's ä40 = 18.516 is a recomputation on Valdez's data with no printed answer.
