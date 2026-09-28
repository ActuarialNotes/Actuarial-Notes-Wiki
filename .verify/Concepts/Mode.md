---
target: Concepts/Mode.md
created: 2026-09-28
---

## [C-001] Validation pass — verified
- entry_type: comment
- author: agent:validate-v1
- run_id: 2026-09-27T19:59Z/bfa2
- date: 2026-09-28
- status_set: verified
- confidence: high
- checks_run: argmax f vs NIST 1.3.5.1 (most frequent value / histogram peak, not necessarily unique); Poisson ratio p_k/p_(k-1) = lambda/k from (a,b,0) a = 0, b = lambda, mode floor(lambda) with a tie at lambda - 1 and lambda for integer lambda vs SOA solution 137; binomial floor((n+1)p) from a = -q/(1-q), b = (m+1)q/(1-q) (page writes n, p for m, q); gamma mode theta(alpha - 1), alpha > 1, else 0 (page writes alpha >= 1, same value at 1), hence exponential mode 0; lognormal mode exp(mu - sigma^2), median exp(mu) from F = Phi(z), mean exp(mu + sigma^2/2); normal mode = mean = median and right-skew ordering vs NIST 1.3.5.1; pricing on the mean vs P-21-05. Examples recomputed before reading answers: gamma(2, 2000) log-density maximum at 2000, mean 4000, median 2000 x 1.67835 = 3356.7; Poisson 2.6: ratios 2.6, 1.3, 0.867, mode 2, p(2) = 0.25105, p(1) = 0.19311, p(3) = 0.21757; all agree. Links resolve; LaTeX well formed.
- sources_checked: SOA, Tables for Exam C (Fall 2009; Loss Models 3rd ed. Appendices A-B excerpts), Gamma A.3.2.1 (PDF p.9), Exponential A.3.3.1 and Lognormal (PDF p.11), Poisson B.2.1.1 (PDF p.14), Binomial (PDF p.15), sha256:cefc3286baa0150b6520455e76104589f1187622212efe05a600926d0bf14e0f — https://www.soa.org/globalassets/assets/files/edu/edu-2009-fall-exam-c-table.pdf; SOA Exam P Sample Solutions (Aug 2026 revision), Q137 (PDF p.40), sha256:efade84ea0ba886e00f07be817c94eae33d3b2ec5ca378e6cad4b74d77136135 — https://www.soa.org/globalassets/assets/files/edu/2026/spring/questions-solutions/2026-05-exam-p-sample-solutions.pdf; NIST/SEMATECH e-Handbook of Statistical Methods, sec. 1.3.5.1 Measures of Location (fetched 2026-09-27), sha256:0a089979887b22d95c06e33973825f6222d73b60f1cde964df479a13bbd7d1d3 — https://www.itl.nist.gov/div898/handbook/eda/section3/eda351.htm; Anderson & Brown, Risk and Insurance (SOA study note P-21-05, 2005), pooling section (CV = SD/mean; sqrt(n) sigma less than n sigma) and benefit-limit section (premium based primarily on expected claim payments), sha256:1cb44e7f9ee240a9a0597a89dbf3a055ab70d07a8739132c75440051ee655922 — https://www.soa.org/globalassets/assets/files/edu/P-21-05.pdf; SOA Probability Exam syllabus, November 2026, univariate random variables learning objectives c) (expected values incl. moments, mode, median, percentiles) and d) (variance, standard deviation, coefficient of variation), sha256:bed27462961aa988fc66c90fefa34af47ea324e2ab9109889c4e4f8f78d97397 — https://www.soa.org/globalassets/assets/files/edu/2026/fall/syllabi/2026-11-exam-p-syllabus.pdf
- note: Clean pass.
