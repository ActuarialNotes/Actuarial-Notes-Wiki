---
target: Concepts/Type II Error.md
created: 2026-10-04
---

## [C-001] Validation pass — verified
- entry_type: comment
- author: agent:validate-v1
- run_id: 2026-10-04T20:47Z/8861
- date: 2026-10-04
- status_set: verified
- confidence: medium
- checks_run: Definition, false-negative synonym, beta and power formulas, the three dependence bullets checked against Siegrist ch.8 §1-2, PSU STAT 415 L10 and ISLR2 §13.1. Example recomputed in python before reading the answer: c = 100 + 1.645(4) = 106.58, z = (106.58 - 110)/4 = -0.855, power = Phi(0.855) = 0.8037, beta = 0.196; agrees with the page and with PSU's power function for the same sigma/sqrt(n) = 4 and critical value 106.58; Phi(0.855) brackets 0.8023-0.8051 in the CAS table. Links resolve exact; figure builder (H0 and H1 curves, beta region left of 1.645) matches. Exam usage: Exam MAS-I (CAS).md only.
- sources_checked: Siegrist, Random, ch.8 Hypothesis Testing §1 Introduction: type 2 error = failing to reject H0 when H1 is true; 1 - Q(theta) is the type 2 error probability for theta outside Theta0; trade-off with type 1 error, sha256:fb05a9d71b55ba113e2f71afa052bc059b35f2c5b6946012c19ecbc693faab1a — https://www.randomservices.org/random/hypothesis/Introduction.html; Siegrist, Random, ch.8 §2 Tests in the Normal Model: power function of the Z tests, 'increasing the sample size n or decreasing the standard deviation sigma results in a uniformly more powerful test', sha256:fd7bc50171fc51310f41e9132005b66cdbbd31bf507a70a0246394b05a379ab2 — https://www.randomservices.org/random/hypothesis/Normal.html; Penn State STAT 415 (2026 notes), Lesson 10 §10.3: Type II error and power definitions, power depends on the true mean, Ex 10.6 power function K(mu) = 1 - Phi((106.58 - mu)/4) for the one-sided Z test with sigma/sqrt(n) = 4 at alpha = 0.05, Ex 10.7 lower alpha -> lower power, Ex 10.8 larger n -> higher power, sha256:4277fd734c4d2b8b297124d4f9378d1fe638d9a4c4547b2689e24a9dfa1daf96 — https://online.stat.psu.edu/stat415/Lesson10.html; James, Witten, Hastie & Tibshirani, ISLR 2nd ed., Table 13.1 and §13.1.2, pp.559-560 (PDF pp.565-566): Type II errors are false negatives; power = probability of not making a Type II error given Ha holds, sha256:f708349f34d2b345a40766f7b4830d22c1bcbf90b4194ae603dcd1245b4e975f — https://www.casact.org/sites/default/files/2022-12/James-G.-et-al.-2nd-edition-Springer-2021.pdf; CAS Exam MAS-I Tables (version 01/15/2018), normal table p.3 (Phi(0.85) = 0.8023, Phi(0.86) = 0.8051; Pr(Z<1.645) = 0.950), sha256:cb5674138a67f7a498b8cc90357144fd121cbcbbc7487f214557b105611a69b4 — https://www.casact.org/sites/default/files/2021-03/masi_tables.pdf
- note: No findings. Medium: Hogg §§4.5-4.6 (the MAS-I reading) not freely available, not read; rank-3 notes and ISLR2 ch.13 (outside the MAS-I chapters) carry the definitions.
