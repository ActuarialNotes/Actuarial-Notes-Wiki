---
verification:
  status: stale
  confidence: null
  last_checked: 2026-11-06
  last_checked_by: agent:validate-v1
  content_hash: sha256:e608f7d8a77ee59cc9a438ff60bda83895c9a08ee9fb883eb46621a6d4677e35
  sources:
    - "Grinstead & Snell, Introduction to Probability (2nd rev. ed., 2006 GNU FDL version), §3.1 Counting Technique (stages, multiply, PDF pp.83-84), Thm 3.1 n!, Def 3.2 and Thm 3.2 k-permutations n(n−1)…(n−k+1) (PDF p.88); §3.2 binomial coefficients C(n,j) = number of j-subsets, Thm 3.4 Pascal recurrence, Thm 3.5 C(n,j)=(n)_j/j! (pp.93-94, PDF pp.101-102), read 2026-11-06, sha256:763eab9894983ddfd6cd7f84685548d1515a9326a2d9fd015474534460551a5e — https://math.dartmouth.edu/~prob/prob/prob.pdf"
    - "Pishro-Nik, Introduction to Probability, Statistics, and Random Processes (probabilitycourse.com), §2.1.3 Unordered Sampling without Replacement (P^n_k=C(n,k)k!; C(n,k)=n!/(k!(n−k)!), 0≤k≤n; C(n,k)=C(n,n−k); Σ C(n,k)=2^n; multinomial coefficients n!/(n1!…nr!)), read 2026-11-06, sha256:ad36b1a87daa3fd5d6a5e94a71c1a118182c7fd38a04af4a9cbf7b71e3ca62ae — https://www.probabilitycourse.com/chapter2/2_1_3_unordered_without_replacement.php"
    - "Siegrist, Probability, Mathematical Statistics, and Stochastic Processes (randomservices.org), Foundations > Combinatorial Structures (multiplication principle; n^(k)=C(n,k)k!; Pascal's rule C(n,k)=C(n−1,k−1)+C(n−1,k) with committee proof; sum_{j=n}^m C(j,n)=C(m+1,n+1) and sum j = C(m+1,2); round table (n−1)!; permutations with indistinguishable objects n!/(n1!…nk!); committee with officers), read 2026-11-06, sha256:63ef90fd651593defb33d7772ecbe92f6198b6b655219a5cb726c76cdc393ccb — https://www.randomservices.org/random/foundations/Structures.html"
    - "Siegrist, Probability, Mathematical Statistics, and Stochastic Processes (randomservices.org), Finite Sampling Models > The Multivariate Hypergeometric Distribution (joint PMF ∏C(m_i,y_i)/C(m,n)), read 2026-11-06, sha256:ce429ccb0682c9be25603fb52bab837daa32b2910c2aeba0603daf193a8cf978 — https://www.randomservices.org/random/urn/MultiHypergeometric.html"
    - "James, Witten, Hastie & Tibshirani, An Introduction to Statistical Learning (2nd ed., corrected June 2023 PDF from statlearning.com), §6.1.1 Best Subset Selection (PDF pp.238-239): fit a separate least squares regression for each possible combination of the p predictors; 'there are 2^p models that involve subsets of p predictors', read 2026-11-06, sha256:7ed447d1a513c5dd95240a829603310f1d319a14a8079ddfb180c6a3d9d9a6ff — https://drive.google.com/uc?export=download&id=1--811-yIIvjT3dvnyFJM20rj_-tbB3bg"
    - "CAS, Exam MAS-I Content Outline 2026, PDF p.3 (Domain A tasks, readings Daniel/Ross/Struppeck) and p.6 (Ross §§9.1-9.6; James et al. Chapters 1-7), read 2026-11-06, sha256:245892366dea073ff44e89b3ac2ae1401517b127d36d51c8a1198b3185faa2ed — https://www.casact.org/sites/default/files/2026-06/MASI_ContentOutline_2026.pdf"
    - "SOA, Probability Exam (Exam P) syllabus, November 2026, Topic 1 General Probability learning outcomes a-g (PDF p.2), Topic 2 outcome b (PDF p.3), read 2026-11-06, sha256:bed27462961aa988fc66c90fefa34af47ea324e2ab9109889c4e4f8f78d97397 — https://www.soa.org/globalassets/assets/files/edu/2026/fall/syllabi/2026-11-exam-p-syllabus.pdf"
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Combination.md
---

![[Media/Figures/Combination.svg|340]]

A **Combination** is an unordered selection of distinct objects. The number of combinations of $k$ objects chosen from $n$ distinct objects, $\binom{n}{k}$, read "$n$ choose $k$", is

> $$\binom{n}{k} = \frac{n!}{k!\,(n-k)!}$$

- $n!$, read "$n$ factorial", is $n \times (n-1) \times \cdots \times 2 \times 1$, with $0! = 1$.
- $k \le n$.

> [!idea] The idea
> There are $k!$ times as many [[Permutation|permutations]] as combinations.

Each combination of $k$ objects can be put in order in $k!$ ways, so $\binom{n}{k} = \frac{{}_{n}P_{k}}{k!}$.

> [!example]- A club of 8 people chooses a committee of 3. How many different committees are there? {Example}
> - A committee has no order, so each committee is a combination of 3 people from 8.
> - $\binom{8}{3} = \frac{8!}{3!\,5!} = \frac{8 \times 7 \times 6}{3 \times 2 \times 1} = 56$.

## Symmetry of combinations

Choosing the $k$ objects that are selected is the same as choosing the $n - k$ objects that are left out, so

> $$\binom{n}{k} = \binom{n}{n-k}$$

> [!example]- How many ways are there to choose 18 of 20 students for a team? {Example}
> - Choosing the 18 students on the team is the same as choosing the 2 students left off it.
> - $\binom{20}{18} = \binom{20}{2} = \frac{20 \times 19}{2 \times 1} = 190$.

## Selections from several categories

When $n$ objects are split into $r$ categories, the number of selections with exactly $k_i$ objects from category $i$ is

> $$\binom{n_1}{k_1}\binom{n_2}{k_2}\cdots\binom{n_r}{k_r}$$

- $n_i$ is the number of objects in category $i$, with $n_1 + n_2 + \cdots + n_r = n$.

> [!example]- A bag holds 3 red, 4 blue and 5 green marbles. Five are drawn at random. What is the probability of drawing 1 red, 2 blue and 2 green marbles? {Example}
> - The sample space is every selection of 5 marbles from 12, so $|S| = \binom{12}{5} = 792$.
> - The event chooses 1 of the 3 red, 2 of the 4 blue and 2 of the 5 green marbles, so $|E| = \binom{3}{1}\binom{4}{2}\binom{5}{2} = 3 \times 6 \times 10 = 180$.
> - The [[Probability|probability]] is $P(E) = \frac{180}{792} \approx 0.227$.

## Number of subsets of a set

Adding $\binom{n}{k}$ over every size $k$ counts every subset of $n$ objects, because each object is either in a subset or not:

> $$\sum_{k=0}^{n} \binom{n}{k} = 2^n$$

> [!example]- Best subset selection fits one regression model for every subset of the $p$ predictors. How many models does it fit when $p = 10$? {Example}
> - Each subset of the 10 predictors is one model, including the model with none of them.
> - There are $2^{10} = 1{,}024$ models.

## Pascal's rule

Choosing $k$ objects from $n + 1$ either leaves out one fixed object or includes it. For $1 \le k \le n$, the number of combinations is therefore

> $$\binom{n+1}{k} = \binom{n}{k} + \binom{n}{k-1}$$

## The hockey-stick identity

Pascal's rule written as $\binom{m}{k} = \binom{m+1}{k+1} - \binom{m}{k+1}$ makes a sum of combinations with the same $k$ telescope, since $\binom{k}{k+1} = 0$. For $k \le n$, the sum is

> $$\sum_{m=k}^{n}\binom{m}{k} = \binom{n+1}{k+1}$$

> [!example]- What is $\binom{2}{2} + \binom{3}{2} + \binom{4}{2} + \binom{5}{2} + \binom{6}{2}$? {Example}
> - The terms are $1 + 3 + 6 + 10 + 15 = 35$.
> - By the identity with $k = 2$ and $n = 6$, the sum is $\binom{7}{3} = 35$.

> [!trap] Roles make it a permutation
> When the selected objects get distinct roles, the order matters. Choosing a president, a secretary and a treasurer from 8 people is ${}_{8}P_{3} = 336$, not $\binom{8}{3} = 56$.
