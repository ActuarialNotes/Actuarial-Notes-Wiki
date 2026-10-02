---
target: Concepts/Perpetuity.md
created: 2026-09-28
---

## [F-001] Perpetuity-due introduced as 'one period's interest charge earlier'
- entry_type: finding
- author: agent:validate-v1
- run_id: 2026-09-28T14:47Z/aa33
- date: 2026-09-28
- severity: minor
- status: open
- locus: second bullet
- claim: 'For a perpetuity-due (payments at start of each period), the present value is one period's interest charge earlier:'
- evidence: FIN §18 p.177: the perpetuity-due's payments are each made one period earlier than the perpetuity-immediate's (ä_∞ = 1 + v + v^2 + … = 1/d = 1 + a_∞). It is the payments that are one period earlier — the value is (1+i) times a_∞, or larger by one payment of 1 — not 'the present value … one period's interest charge earlier', which states no relationship. The formulas that follow are right.
- source_rank: 3
- proposed_action: Maintainer: reword, e.g. 'each payment is one period earlier, so ä_∞ = (1+i)a_∞ = 1/d'.
- applied: false
- fingerprint: 28562bdfbf11

## [C-001] Validation pass — verified
- entry_type: comment
- author: agent:validate-v1
- run_id: 2026-09-28T14:47Z/aa33
- date: 2026-09-28
- status_set: verified
- confidence: medium
- checks_run: Definition (payments forever) vs FIN §18 p.176; a_∞ = 1/i as the limit of (1-v^n)/i vs FIN p.176 and SOA-S Q4 p.4 (image); ä_∞ = 1/d = (1+i)/i and ä_∞ = 1 + a_∞ vs FIN p.177 (26.0 both ways at 4%); 'perpetuity' syllabus term vs SYL p.3. Example recomputed: 50,000/0.04 = 1,250,000 (matches). Wording issue F-001 (minor). 'Consols, preferred stock, endowments' generic, not filed. Links, figure, LaTeX resolve. Medium: example is the vault's own; formulas rank 3.
- sources_checked: Finan, A Basic Course in the Theory of Interest and Derivatives Markets (Arkansas Tech, 2009), §18 Annuities with Infinite Payments: Perpetuities, PDF p.176-177, sha256:41664968f8b6dcf60e4af92ed71bad63eda94dded40bc63e619fd3c2755efa93 — https://departments.central.edu/actsci/files/2011/08/Exam_FM_Study_GuideFinan.pdf; SOA Exam FM Sample Solutions (rev. Aug 2026), Q 4, solutions PDF p.4, sha256:ae4ec6082b43944a0c44cefaf02cdc24cf2e011dcd57366ea5f9cb32d3323f69 — https://www.soa.org/globalassets/assets/files/edu/2018/2018-10-exam-fm-sample-solutions.pdf; SOA Financial Mathematics Exam syllabus, December 2026, Topic 2 Annuities/cash flows with non-contingent payments (20-30%), learning outcomes a)-b), PDF p.3, sha256:b4189b65d60ab3c9250a8bf5ed48a28a8365c92ab7d673aba25d50ee339edb39 — https://www.soa.org/globalassets/assets/files/edu/2026/fall/syllabi/2026-12-exam-fm-syllabus.pdf

## [F-001/R] Correction applied
- entry_type: resolution
- author: agent:validate-v1
- run_id: 2026-09-29T19:42Z/d7d3
- date: 2026-09-29
- resolves: F-001
- status: resolved
- note: Bullet reworded per Finan §18 p.177: 'each payment comes one period earlier than under the perpetuity-immediate, so its value is (1+i)a_∞', followed by the unchanged ä_∞ = 1/d = (1+i)/i and ä_∞ = 1 + a_∞ (26.0 all three ways at 4%, python).

## [C-002] Validation pass — verified
- entry_type: comment
- author: agent:validate-v1
- run_id: 2026-09-29T19:42Z/d7d3
- date: 2026-09-29
- status_set: verified
- confidence: medium
- checks_run: Re-checked on the new bytes: perpetuity as an annuity paying forever, a_∞ = lim(1-v^n)/i = 1/i vs Finan p.176 and SOA solution Q4 p.4 ('present value one period before the start of each perpetuity is 1/i'); ä_∞ = 1/d = (1+i)/i = 1 + a_∞ and the one-period-earlier reading vs Finan p.177; 'perpetuity' vs syllabus p.3. The 'models …' bullet trimmed to what Finan's examples support (a stock's indefinite dividend, Ex. 18.1 p.176) plus the page's own endowment example; consols and preferred stock, not in any source read, removed. Example recomputed: 50,000/0.04 = 1,250,000. 11 math nodes typeset in KaTeX; links and figure resolve.
- sources_checked: Finan, A Basic Course in the Theory of Interest and Derivatives Markets, p.176-177, sha256:41664968f8b6dcf60e4af92ed71bad63eda94dded40bc63e619fd3c2755efa93 — https://departments.central.edu/actsci/files/2011/08/Exam_FM_Study_GuideFinan.pdf; SOA Exam FM Sample Solutions (rev. Aug 2026), Q 4, solutions PDF p.4, sha256:ae4ec6082b43944a0c44cefaf02cdc24cf2e011dcd57366ea5f9cb32d3323f69 — https://www.soa.org/globalassets/assets/files/edu/2018/2018-10-exam-fm-sample-solutions.pdf; SOA Financial Mathematics Exam syllabus, December 2026, p.3, sha256:b4189b65d60ab3c9250a8bf5ed48a28a8365c92ab7d673aba25d50ee339edb39 — https://www.soa.org/globalassets/assets/files/edu/2026/fall/syllabi/2026-12-exam-fm-syllabus.pdf
