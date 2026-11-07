---
verification:
  status: stale
  confidence: null
  last_checked: 2026-10-31
  last_checked_by: agent:validate-v1
  content_hash: sha256:be06e2f37940d44184a28402997fd7b110880bc6caaba831dff03326e1e2f452
  sources:
    - "Werner & Modlin, Basic Ratemaking (CAS, 5th ed. May 2016), Ch. 12 pp.217-220 (PDF pp.229-232), sha256:6b214d4db52674df2e83343920c06781e491254bd77f27e32ba312faaff3782c — https://www.casact.org/sites/default/files/2021-03/5_Werner_Modlin.pdf"
    - "Frees et al., Loss Data Analytics (open text), Ch. 9 Experience Rating Using Credibility Theory, §§9.2.1–9.2.2, sha256:35a840449990c8fda61687ebde4646508b6296ffac3daba18f0181eb2511fa36 — https://openacttexts.github.io/Loss-Data-Analytics/ChapCredibility.html"
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Limited Fluctuation Credibility.md
---

![[Media/Figures/Limited_Fluctuation_Credibility.svg|340]]

**Limited Fluctuation Credibility**, also called **classical credibility**, is a [[Credibility|credibility]] method that gives observed experience full weight once its volume reaches the [[Full Credibility Standard|full credibility standard]], and partial weight below it. The credibility-weighted estimate is

> $$U = Z D + (1 - Z) M$$

- $D$ is the observed experience.
- $M$ is the [[Complement of Credibility|complement of credibility]], such as the manual rate.
- $Z$ is the credibility, between 0 and 1.

$Z = 1$ when the volume of experience meets the full credibility standard. Below it, $Z$ is given by the [[Partial Credibility|square-root rule]].

> [!example]- A territory has credibility $Z = 0.70$. Its observed loss ratio is 0.85, and the complement is 0.75. What is the credibility-weighted loss ratio? {Example}
> - The estimate is $0.70(0.85) + 0.30(0.75) = 0.595 + 0.225 = 0.820$.

> [!idea] The idea
> Limited fluctuation credibility asks only whether the experience is stable enough, never how good the complement is.

## Steps of the method

1. Choose the probability level $p$ and the range parameter $k$.
2. Compute the [[Full Credibility Standard|full credibility standard]] $n_F$ for the quantity being estimated: frequency, severity or aggregate loss.
3. Compute the credibility $Z = \min(\sqrt{n/n_F}, 1)$, with the observed volume $n$ in the same unit as $n_F$.
4. Compute the estimate $U = Z D + (1 - Z) M$.

> [!example]- Claim counts are Poisson, and claim sizes have mean 2,000 and standard deviation 4,000. A class has 1,800 claims and an observed pure premium of 250, and the manual pure premium is 220. At $p = 0.90$ and $k = 0.05$, what is the credibility-weighted pure premium? {Example}
> - $z_{0.95} = 1.645$, so $\lambda_0 = (1.645/0.05)^2 = 1{,}082.4$ claims.
> - $\mathrm{CV}_X^2 = (4{,}000/2{,}000)^2 = 4$, so the standard for pure premium is $n_F = 1{,}082.4 \times (1 + 4) = 5{,}412$ claims.
> - $Z = \sqrt{1{,}800/5{,}412} = 0.577$.
> - The estimate is $0.577(250) + 0.423(220) = 237.3$.

## Assumptions of the basic standard

The basic claim-count standard of $1{,}082$ claims ($p = 0.90$, $k = 0.05$) is derived under three simplifying assumptions:

1. The exposures are homogeneous.
2. Claim occurrence follows a [[Poisson Distribution|Poisson distribution]].
3. There is no variation in the size of loss.

## Advantages and disadvantages

Advantages:

1. It is the most commonly used approach, so it is generally accepted.
2. The data it needs is readily available.
3. The computations are straightforward.

Disadvantages:

1. Its derivation makes simplifying assumptions that may not hold in practice, such as no variation in the size of losses.
2. It does not take into account the quality of the complement compared with the observed experience, so judgment is required.
3. The probability level $p$ and the range $k$ that define full credibility are arbitrary choices.
