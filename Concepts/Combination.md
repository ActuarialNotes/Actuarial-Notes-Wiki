---
verification:
  status: verified
  confidence: high
  last_checked: 2026-10-30
  last_checked_by: agent:validate-v1
  content_hash: sha256:eb854aa18c57a60e4a12e40cd21a554bfb8fd5ad3eaea041ad87424f8a7408aa
  sources:
    - "Grinstead & Snell, Introduction to Probability (2nd rev. ed., 2006 GNU FDL version), §3.2 Thm 3.5 p.94 and p.95 (PDF pp.102-103); Thm 3.8 Inclusion-Exclusion p.104 (PDF p.112); §5.1 hypergeometric p.193 (PDF p.201); binomial distribution uses C(n,j) (PDF p.105), sha256:763eab9894983ddfd6cd7f84685548d1515a9326a2d9fd015474534460551a5e — https://math.dartmouth.edu/~prob/prob/prob.pdf"
    - "SOA, Probability Exam (Exam P) syllabus, November 2026, p.1 learning outcome 1b, sha256:bed27462961aa988fc66c90fefa34af47ea324e2ab9109889c4e4f8f78d97397 — https://www.soa.org/globalassets/assets/files/edu/2026/fall/syllabi/2026-11-exam-p-syllabus.pdf"
    - "Grinstead & Snell, Introduction to Probability (2nd rev. ed., 2006 GNU FDL version), §3.2 Theorem 3.4 (Pascal's rule, include/exclude proof) and Theorem 3.5 pp.93-94 (PDF pp.101-102), sha256:763eab9894983ddfd6cd7f84685548d1515a9326a2d9fd015474534460551a5e — https://math.dartmouth.edu/~prob/prob/prob.pdf"
    - "K. Siegrist, Probability, Mathematical Statistics, and Stochastic Processes (Random Services), fetched 2026-10-30, Foundations §1.8 Combinatorial Structures (committee counts by multiplication principle; Σ_{j=n}^{m} C(j,n) = C(m+1,n+1)) sha256:63ef90fd651593defb33d7772ecbe92f6198b6b655219a5cb726c76cdc393ccb — https://www.randomservices.org/random/foundations/Structures.html; Finite Sampling Models §3 The Multivariate Hypergeometric Distribution (joint pdf Π C(m_i,y_i)/C(m,n) 'from the multiplication principle') sha256:ce429ccb0682c9be25603fb52bab837daa32b2910c2aeba0603daf193a8cf978 — https://www.randomservices.org/random/urn/MultiHypergeometric.html"
    - "H. Pishro-Nik, Introduction to Probability, Statistics, and Random Processes (probabilitycourse.com), fetched 2026-10-30, §2.1.3 Unordered Sampling without Replacement (Pascal identity) sha256:79bf0f32ecb9598045e409b9da0c99549342938e45c43ee75fbea7fc47c52911 — https://www.probabilitycourse.com/chapter2/2_1_3_unordered_without_replacement.php"
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Combination.md
---

A **Combination** $\binom{n}{k}$ ("$n$ choose $k$") counts the number of ways to select $k$ objects from $n$ distinct objects when order does not matter.
- Combinations assume no replacement: you cannot select the same object twice:

> $$\binom{n}{k} = \frac{n!}{k!\,(n-k)!}$$

- $n$ is the total number of objects and $k$ is the number of objects selected
- The identity $\binom{n}{k} = \binom{n}{n-k}$ reflects that choosing $k$ items to include is equivalent to choosing $n-k$ to exclude
- Combinations appear in the [[Binomial Distribution|Binomial]] distribution, [[Hypergeometric Distribution|Hypergeometric]] distribution, and the [[Inclusion-Exclusion Principle]] for counting

![[Media/Figures/Combination.svg|340]]

### Selections from several categories

- When a population is split into disjoint categories of sizes $N_1, \ldots, N_r$, a selection with exactly $k_i$ members from category $i$ is made by choosing from each category separately, so by the multiplication principle the number of such selections is the product of the number of ways for each category:

> $$\binom{N_1}{k_1}\binom{N_2}{k_2}\cdots\binom{N_r}{k_r}$$

- The categories must cover everyone: when the counts asked for sum to less than the selection size, the remaining members are chosen from the leftover category (those with none of the attributes), which adds a combination factor for them.
- Dividing the product by $\binom{N}{n}$, the number of all selections of size $n$, gives the probability of that composition under the multivariate [[Hypergeometric Distribution|hypergeometric]] distribution.

### Pascal's rule and the hockey-stick identity

- **Pascal's rule:** for $1 \le k \le n$, choosing $k$ objects from $n+1$ either leaves out a fixed object or includes it, so

> $$\binom{n+1}{k} = \binom{n}{k} + \binom{n}{k-1}$$

- **Hockey-stick identity:** for $k \le n$,

> $$\sum_{m=k}^{n}\binom{m}{k} = \binom{n+1}{k+1}$$

- It follows from Pascal's rule written as $\binom{m}{k} = \binom{m+1}{k+1} - \binom{m}{k+1}$, which makes the sum telescope (with $\binom{k}{k+1} = 0$). For example, $1 + 3 + 6 + 10 + 15 = \binom{7}{3} = 35$.
- It evaluates sums of falling-factorial terms, since $m(m-1)\cdots(m-k+1) = k!\binom{m}{k}$; the simplest case is $\sum_{m=1}^{n} m = \binom{n+1}{2}$.

> [!example]- Selecting a Claims Committee {Example}
> An insurer needs to form a committee of 3 adjusters from a pool of 8. How many different committees are possible?
>
> > [!answer]-
> > Order does not matter (a committee $\{A, B, C\}$ is the same regardless of selection order), so:
> > $$\binom{8}{3} = \frac{8!}{3!\,5!} = \frac{8 \times 7 \times 6}{3 \times 2 \times 1} = \frac{336}{6} = 56$$
> > There are 56 possible committees.
