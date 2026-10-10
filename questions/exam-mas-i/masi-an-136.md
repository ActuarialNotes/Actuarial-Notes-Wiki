---
id: "masi-an-136"
exam: "Exam MAS-I"
topic: "Histogram"
learning_objective: "Extended Linear Models"
difficulty: medium
type: multiple-choice
bloom: analyze
wiki_link:
  - Concepts/Histogram
  - Concepts/Tweedie+Distribution
  - Concepts/Generalized+Linear+Model
  - Concepts/Response+Variable
answer: "D"
points: 1
verification:
  status: verified
  confidence: medium
  last_checked: 2026-10-10
  last_checked_by: agent:validate-v1
  content_hash: sha256:f5c6cca42ec681db6c62195d999d04989947ceec663b00813a961f4b91757184
  sources:
    - "Goldburd, Khare, Tevet & Guller, Generalized Linear Models for Insurance Rating, CAS Monograph 5, 2nd ed. (rank 3 for MAS-I), §2.7.1-2.7.3, PDF pp.29-33 (gamma V(mu)=mu^2; inverse Gaussian V(mu)=mu^3, sharper peak and wider tail; Poisson V(mu)=mu, phi=1, overdispersion and ODP with the same coefficients; Tweedie 1<p<2 a compound Poisson-gamma with mass at zero, for pure premium), sha256:89b203ea55208911c4d8f6ef1ede4dd6c0206d47999b5e8aff96fe233c0ff757 — https://www.casact.org/sites/default/files/2021-01/05-Goldburd-Khare-Tevet.pdf"
    - "Larsen, Generalized Linear Models, CAS Study Note (rev. 6/29/2016; MAS-I reading), 'Tweedie Distributions' PDF p.2 (Var[Y] = a E(Y)^p; Poisson p=1, compound Poisson-gamma 1<p<2, gamma p=2, inverse Gaussian p=3; zeros plus continuous non-zero values), sha256:5c4ed4e8eacf72624f38c5313eb6903f57d627b6ac81ce52e0a5a69404af90bd — https://www.casact.org/sites/default/files/2021-03/MAS-I_Larsen.pdf"
    - "CAS Exam MAS-I Content Outline 2026 (MASI_CO_2026_F v06), Domain C 'Extended Linear Models' tasks 1-9 (PDF p.5); Complete Text References: Dobson & Barnett Ch 1-9, Hogg 9.1-9.6, James et al. Ch 1-7 as limited, Larsen (PDF p.6), sha256:245892366dea073ff44e89b3ac2ae1401517b127d36d51c8a1198b3185faa2ed — https://www.casact.org/sites/default/files/2026-06/MASI_ContentOutline_2026.pdf"
  open_findings: 0
  open_critical: 0
  log: .verify/questions/exam-mas-i/masi-an-136.md
---

An actuary will model annual pure premium (incurred loss per policy-year, in dollars and cents) for 20,000 small commercial policies with a single GLM. Two histograms are drawn:

- Of all policies: one bar at exactly zero holds 91% of the policies; the rest are spread thinly over positive values out to several hundred thousand dollars.
- Of the positive values only, on a log scale: a single, roughly symmetric hump.

Which GLM specification has a response distribution most consistent with what the histograms show?

- A) Normal with an identity link
- B) Poisson with a log link
- C) Gamma with a log link
- D) Tweedie with power 1.5, log link
- E) Inverse Gaussian with a log link

## Explanation

The first histogram shows a **point mass at zero** (91% of policies with no loss) and the second shows that the non-zero amounts are **continuous, positive and right-skewed** (symmetric on the log scale means strongly skewed on the original scale).

A Tweedie distribution with power $p$ between 1 and 2, such as $p = 1.5$, is a compound Poisson–gamma: a Poisson number of gamma-distributed claims. It puts positive probability on exactly zero (no claims) and a continuous right-skewed density on positive values — the shape of both histograms at once — which is why it is the standard single-model choice for pure premium. The answer is **D**.

**Why not the others**

- **A** — a normal response is symmetric, continuous everywhere and allows negative values; it cannot produce a spike at zero next to a long right tail.
- **B** — the Poisson is for counts: it takes only whole-number values. Pure premium is a dollar amount.
- **C** — the gamma is defined only on positive values, so 91% of the observations (the zeros) are impossible under it. It fits the second histogram alone — the positive amounts — which is the severity half of a frequency–severity approach, not a single model of pure premium.
- **E** — like the gamma, the inverse Gaussian has no mass at zero, so it too could model only the positive amounts.
