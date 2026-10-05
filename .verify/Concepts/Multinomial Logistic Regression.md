---
target: Concepts/Multinomial Logistic Regression.md
created: 2026-10-05
---

## [C-001] Validation pass — verified
- entry_type: comment
- author: agent:validate-v1
- run_id: 2026-10-04T20:47Z/8861
- date: 2026-10-05
- status_set: verified
- confidence: high
- checks_run: baseline-category formulas, pi_J, (J-1)(p+1) count, interpretation of e^beta vs baseline, baseline-invariance of fitted values and pairwise log-odds, softmax coding (ISLR 4.13) all checked against ISLR 4.3.5; MLE/deviance/J=2 reduction against Rodriguez 6.2; D&B name 'nominal logistic regression' against D&B contents; both worked examples recomputed in python before reading the answers (0.536/0.266/0.197, e^0.10=1.105; -0.8+0.05x, 0.741, 4 coefficients) - all agree; 6 wiki-links resolve to Concepts/; LaTeX OK; actuarial-use bullet is illustrative, not checked; no exam page links this page
- sources_checked: James, Witten, Hastie & Tibshirani, An Introduction to Statistical Learning, 2nd ed. (Springer 2021; MAS-I reading), sha256:f708349f34d2b345a40766f7b4830d22c1bcbf90b4194ae603dcd1245b4e975f — https://www.casact.org/sites/default/files/2022-12/James-G.-et-al.-2nd-edition-Springer-2021.pdf, sec.4.3.5 Multinomial Logistic Regression, eqs 4.10-4.13 (printed pp.140-141, PDF pp.150-151); Rodriguez, GLM lecture notes (Princeton), ch.6 Multinomial Response Models, sha256:f559d07ae73bdf381de5c19a9f0621419c635e5c6495c0135af940ae36807cbb — https://grodri.github.io/glms/notes/c6.pdf, secs.6.2.1-6.2.4 (baseline category, J-1 equations, reduces to logistic for J=2, log(pi1/pi2) as difference, probabilities form eq.6.5, ML by Fisher scoring/Newton-Raphson, deviance and LR chi-square) (PDF pp.3-6); Dobson & Barnett, An Introduction to Generalized Linear Models, 4th ed. (CRC 2018; MAS-I reading) — publisher eBook preview, sha256:40ed0b2549113ee0bea29e41786886ce992ffa29251ad26fb1037385bb51611a — https://api.pageplace.de/preview/DT0400.9781351726221_A37406780/preview-9781351726221_A37406780.pdf, printed contents Ch.8 (sec.8.3 'Nominal logistic regression') (PDF p.11)
- note: Clean pass. Every formula and named property matches ISLR 4.3.5 (rank 2) and Rodriguez ch.6 (rank 3).
