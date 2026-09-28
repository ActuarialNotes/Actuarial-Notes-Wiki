---
target: Concepts/Real Rate of Interest.md
created: 2026-09-28
---

## [C-001] Validation pass — verified
- entry_type: comment
- author: agent:validate-v1
- run_id: 2026-09-28T14:47Z/aa33
- date: 2026-09-28
- status_set: verified
- confidence: medium
- checks_run: 1 + i_r = (1+i)/(1+r) vs SOA-S Q402 p.106 (image: (1+i')(1+r) = (1+i), 'all rates annual effective' per SOA-Q Q402 p.170) and SOA-S Q406 p.107 (image: 1.09/1.05 - 1 = 0.038) and FIN (52.1) p.455; i_r ≈ i - r (Fisher approximation) vs FIN §52 p.455 (rank 3); sign bullets follow from the formula. Notation: page i_r, SOA and FIN i' - notation only; the page's 'nominal' is FIN §52's before-inflation sense, not i^(m) (FIN p.454 warns of the two senses). Worked example (vault's own) recomputed: 1.08/1.03 - 1 = 4.854% - correct. Figure (7% money, 4% prices, real 2.88%) recomputed 1.07/1.04 - 1 = 2.885% - consistent. Syllabus term 'inflation and real rate of interest' (SYL p.2). Links resolve; LaTeX fine.
- sources_checked: SOA Exam FM Sample Questions (rev. Aug 2026), Q 402, questions PDF p.170, sha256:d20b5cf2b78cb4cddb3dc556e0df62c40b7d510b7941b546809cc58c4b71a069 — https://www.soa.org/globalassets/assets/files/edu/2018/2018-10-exam-fm-sample-questions.pdf; SOA Exam FM Sample Solutions (rev. Aug 2026), Q 402, solutions PDF p.106, sha256:ae4ec6082b43944a0c44cefaf02cdc24cf2e011dcd57366ea5f9cb32d3323f69 — https://www.soa.org/globalassets/assets/files/edu/2018/2018-10-exam-fm-sample-solutions.pdf; SOA Exam FM Sample Questions (rev. Aug 2026), Q 406, questions PDF p.172, sha256:d20b5cf2b78cb4cddb3dc556e0df62c40b7d510b7941b546809cc58c4b71a069 — https://www.soa.org/globalassets/assets/files/edu/2018/2018-10-exam-fm-sample-questions.pdf; SOA Exam FM Sample Solutions (rev. Aug 2026), Q 406, solutions PDF p.107, sha256:ae4ec6082b43944a0c44cefaf02cdc24cf2e011dcd57366ea5f9cb32d3323f69 — https://www.soa.org/globalassets/assets/files/edu/2018/2018-10-exam-fm-sample-solutions.pdf; SOA Financial Mathematics Exam syllabus, December 2026, Topic 1 Time Value of Money, learning outcomes a)-c), PDF p.2, sha256:b4189b65d60ab3c9250a8bf5ed48a28a8365c92ab7d673aba25d50ee339edb39 — https://www.soa.org/globalassets/assets/files/edu/2026/fall/syllabi/2026-12-exam-fm-syllabus.pdf; Finan, A Basic Course in the Theory of Interest and Derivatives Markets (Arkansas Tech, 2009), §52, PDF p.454-455, sha256:41664968f8b6dcf60e4af92ed71bad63eda94dded40bc63e619fd3c2755efa93 — https://departments.central.edu/actsci/files/2011/08/Exam_FM_Study_GuideFinan.pdf
