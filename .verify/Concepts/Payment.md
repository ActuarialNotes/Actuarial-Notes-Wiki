---
target: Concepts/Payment.md
created: 2026-10-31
---

## [C-001] Validation pass — verified
- entry_type: comment
- author: agent:validate-v1
- run_id: 2026-10-31T18:57Z/3d3b
- date: 2026-10-31
- status_set: verified
- confidence: medium
- checks_run: Formula against LDA 3.4.1-3.4.3; example recomputed independently (E[Y]=320). Notation: LDA writes alpha[(X^u)-(X^d)] with u the maximum covered loss; the page writes min(c(X-d)_+, u) with u defined as the maximum payment, which is the same variable with u_page = alpha(u_LDA - d). Noted, not corrected.
- sources_checked: Frees et al., Loss Data Analytics (open text, openacttexts.github.io), ch.3, 3.4.1 payment per loss Y^L=(X-d)_+; 3.4.2-3.4.3 Y^L=alpha[(X^u)-(X^d)] with coinsurance alpha, sha256:263021bf543b04b2881284b38b7dcbd0586b78daec371b88a1eefcd362dff732 — https://openacttexts.github.io/Loss-Data-Analytics/ChapSeverity.html; SOA Exam FAM Syllabus, February 2027, Topic 1 outcomes a-b (coverage modifications), p.2, sha256:da98474b74b0a9e9153b8ce198f30195dfbe394b3e300e785e58f12663b447e4 — https://www.soa.org/globalassets/assets/files/edu/2027/spring/syllabi/2027-2-fam-syllabus.pdf
- note: No findings.
