---
target: Concepts/Term Life Insurance.md
created: 2026-10-10
---

## [F-001] Second-moment deferral factor off in the sixth decimal
- entry_type: finding
- author: agent:validate-v1
- run_id: 2026-10-10T21:00Z/dv07
- date: 2026-10-10
- severity: nit
- status: open
- locus: example 'Ten-Year Term on the SULT', answer, first line and the 2A line
- claim: v^10 = 0.613913, so the second-moment deferral factor is 0.613913(0.60182) = 0.369466
- evidence: Recomputed from scratch in Python before reading the answer: 0.613913 x 0.60182 = 0.36946512, and with v^10 at full precision (0.6139133) 0.3694653; either way 0.369465, not 0.369466. The next line is unchanged at six decimals: 0.05108 - 0.369465(0.10834) = 0.0110522 -> 0.011052. Inputs A50 0.18931, 2A50 0.05108, 10E50 0.60182, A60 0.29028, 2A60 0.10834 confirmed against the SOA FAM Tables SULT p.20 (sha256:430c8bab...). Rank 5 for the digit; the table values are rank 1.
- source_rank: 5
- proposed_action: Write 0.369465 in both places.
- applied: true
- fingerprint: bcf316bfee39

## [F-001/R] Correction applied
- entry_type: resolution
- author: agent:validate-v1
- run_id: 2026-10-10T21:00Z/dv07
- date: 2026-10-10
- resolves: F-001
- status: resolved
- note: Corrected in the working tree: both occurrences now read 0.369465 (0.613913 x 0.60182 = 0.36946512); the 2A line still resolves to 0.011052.

## [C-001] Validation pass — verified
- entry_type: comment
- author: agent:validate-v1
- run_id: 2026-10-10T21:00Z/dv07
- date: 2026-10-10
- status_set: verified
- confidence: medium
- checks_run: Every formula against Slud §4.1-4.2 (term A^1, decreasing term, nEx = v^n npx, (4.33) A-bar = (i/δ)A); all SULT inputs against the FAM Tables pp.20-21 (A50, 2A50, ä50, 10E50, A60, 2A60, ä60, q60-q62; ä50:10 tabulated 8.0550 vs page 8.05491). All three examples recomputed in Python before reading the answers: EPV 0.014614, 2A 0.011052, SD 10,411, P 181.43; decreasing term 1,009.77 exact (1,009.78 from the displayed rounded probabilities, internally consistent), level 1,544.28 (1,544.31 displayed chain); continuous 0.126424, 0.092745, Var 0.076762, SD 0.27706. Product sentences against the NAIC Buyer's Guide and the Illinois reprint (renewal at higher premium, loss of renewal right at an age, nonrenewable needs a new application, conversion even if not in good health, most term has no cash value); adverse selection on conversion against the SOA conversion study. FAM tip against the FAM syllabus 9(a)-(e), 10(a) and sample Q4.2. Links resolve.
- sources_checked: SOA Exam FAM Tables (2024-10), Standard Ultimate Life Table at i = 0.05, PDF pp.20-21 (age 50: ä 17.0245, A 0.18931, 2A 0.05108, ä50:10 8.0550, 10E50 0.60182; age 60: ä 14.9041, A 0.29028, 2A 0.10834, q60 0.003398; q61 0.003792; q62 0.004234), sha256:430c8babdb38ff53ae7ce7d5d1d3bd55c2890eeb9ae96db5015121d1c2f11e17 — https://www.soa.org/globalassets/assets/files/edu/2024/fall/2024-10-exam-fam-tables.pdf; SOA Exam FAM Syllabus (2026-02), Topics 9(a)-(e) and 10(a) (PV random variables for life insurance at annual, 1/m-thly and continuous frequency; future loss random variables for term life), PDF p.7, sha256:a0187852c071732f310db9e311d35cda0f59deff1b346c88cb0678be8887cba0 — https://www.soa.org/globalassets/assets/files/edu/2026/spring/syllabi/2026-02-fam-syllabus.pdf; SOA Exam FAM-L Sample Questions (2024-10), Q1.1 (underwriting/adverse selection) p.3 and Q4.2 (2-year term paid at end of half-year of death, Pr(Z > 277,000)) p.27, sha256:4aaf3469628f2b63a689c187d963857a5a6e749c5eaca9978b264d854f60a28d — https://www.soa.org/globalassets/assets/files/edu/2024/fall/questions/2024-10-exam-fam-l-sample-questions.pdf; Slud, Actuarial Mathematics and Life-Table Statistics (Univ. of Maryland, (c)2001), §4.1 pp.98-100 (term insurance A^1_{x:n}, decreasing term, nEx = v^n npx) and §4.2 p.108 eq.(4.24), p.111 eq.(4.33) (A-bar term = (i/δ)A term under fractional-age uniformity), sha256:dccaca6b0e9f58a2f472390538e901660d0a45eb816e2869657718735c2b80bb — https://www.math.umd.edu/~slud/s470/BookChaps/01Book.pdf; NAIC, Life Insurance Buyer's Guide (c)2026, p.5 (term vs cash value; renewable vs nonrenewable term; whole life set premium schedule vs universal life flexible premiums) and p.6 (most term policies have no cash value), sha256:c7439cde01522328eca7eab1a7323e5ca193ed8af7d21deb80bda6ae9f36837a — https://content.naic.org/sites/default/files/publication-lig-lp-consumer-life.pdf; NAIC Life Insurance Buyer's Guide as adopted at Ill. Admin. Code tit. 50, pt. 930, exh. B (LII), sections Term Insurance (renewal, conversion even if not in good health, largest protection per premium dollar), Cash Value Life Insurance (policy loans; unpaid loan and interest subtracted from benefits or cash value), Whole Life (lifetime if premiums paid; same premium; limited-pay to age 65 higher), Universal Life (flexible premiums and face amount; account falls, coverage ends unless more paid or benefit lowered; increases may need proof), sha256:63fd04a11145a404600bda86539dfb0b5d0ca3d26d2ccba09323a3ff7f261ab7 — https://www.law.cornell.edu/regulations/illinois/Ill-Admin-Code-tit-50-930-Exhibit-B; SOA / RGA, Report on the Conversion Experience Study for Level Premium Term Plans (2016), Background p.4 ('an element of anti-selection is present for those that elect to convert'), sha256:417801bca1d76828236eb5434597b34374398585d0985369a4e71bde51460a2f — https://www.soa.org/globalassets/assets/files/research/research-2016-06-conversion-mortality-study.pdf; The Institutes, CAS DISC IA Course Syllabus (c)2023, PDF p.3-4, sections 7 a-d, 12 a-f, 13 a-d, sha256:e9ce8e88d95d49d9154b6aac841f04fec43c68392171d59ca1fca10b058dd50b — https://www.casact.org/sites/default/files/2022-12/DISC_IA.pdf
- note: Verified medium: formulas rest on Slud (rank 3) with the exam's own tables (rank 1); F-001 nit fixed and resolved in this run. The renewal side of the adverse-selection sentence is inferred from the guides (renewable 'even if your health has changed'), the conversion side is stated by the SOA study.
