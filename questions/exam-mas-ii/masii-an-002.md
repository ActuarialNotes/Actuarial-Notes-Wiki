---
id: "masii-an-002"
exam: "Exam MAS-II"
topic: "Severity"
learning_objective: "Introduction to Credibility"
difficulty: medium
type: multiple-choice
bloom: apply
wiki_link:
  - Concepts/Severity
  - Concepts/Bühlmann+Credibility
  - Concepts/Expected+Value+of+Process+Variance
  - Concepts/Variance+of+Hypothetical+Means
answer: "B"
points: 2
verification:
  status: verified
  confidence: medium
  last_checked: 2026-10-18
  last_checked_by: agent:validate-v1
  content_hash: sha256:593925737fabe3ef49f77ad12fcc9aa2b7ee210042e47ba0e0062799fe73fc92
  sources:
    - "Werner & Modlin, Basic Ratemaking, 5th ed. (CAS 2016), Ch.12 Credibility, printed pp.220-221 (PDF 232-233): Bühlmann Z = N/(N+K), N the number of observations, K = EVPV/VHM, sha256:6b214d4db52674df2e83343920c06781e491254bd77f27e32ba312faaff3782c — https://www.casact.org/sites/default/files/2021-03/5_Werner_Modlin.pdf"
    - "Dean, Topics in Credibility Theory, SOA Construction and Evaluation of Actuarial Models Study Note (C-24-05), PDF pp.10-11: Z = N/(N+K), K = EPV/VHM; 'Number of claims' listed among exposure measures in §1.2, sha256:6e31928104c195095960e92ec11de665106d1c11357b8bb5674410d377afc1b0 — https://www.soa.org/globalassets/assets/files/edu/c-24-05.pdf"
  open_findings: 0
  open_critical: 0
  log: .verify/questions/exam-mas-ii/masii-an-002.md
---

An insurer estimates the average claim severity for a class of commercial risks with Bühlmann credibility. You are given:

- Earned exposures in the class: 1,000
- Claims observed in the class: 50
- Observed average severity: \$6,200
- Expected value of the process variance of a single claim amount: 36,000,000
- Variance of the hypothetical mean severities: 400,000
- Prior mean severity: \$5,000

Calculate the Bühlmann credibility estimate of the class's average severity.

- A) 5,000
- B) 5,429
- C) 5,771
- D) 6,101
- E) 6,200

## Explanation

Severity is losses divided by the number of claims, so each claim is one observation of claim size. The process variance is given per claim, and the number of observations $N$ is the claim count, 50:

$$
K = \frac{\text{EVPV}}{\text{VHM}} = \frac{36{,}000{,}000}{400{,}000} = 90
$$

$$
Z = \frac{N}{N + K} = \frac{50}{50 + 90} = 0.3571
$$

$$
\text{Estimate} = 0.3571(6{,}200) + 0.6429(5{,}000) = \mathbf{5{,}429}
$$

The answer is **B**.

**Why not the others**

- **A** — the prior mean alone ($Z = 0$), as though a class with fewer claims than $K$ earned no credibility at all. Bühlmann credibility is never zero while VHM is positive.
- **C** — reverses the weights, applying $Z$ to the prior mean.
- **D** — counts the 1,000 exposures as the observations ($Z = 1{,}000/1{,}090 = 0.917$). Exposures are the right volume for a *frequency* or pure premium; a severity is averaged over claims.
- **E** — the observed severity alone ($Z = 1$), treating the class as fully credible.
