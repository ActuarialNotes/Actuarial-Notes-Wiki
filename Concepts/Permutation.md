---
verification:
  status: stale
  confidence: null
  last_checked: 2026-11-06
  last_checked_by: agent:validate-v1
  content_hash: sha256:a0793a427ea8d82cd91c729786ebee715728537496f74eced840c21018353579
  sources:
    - "Grinstead & Snell, Introduction to Probability (2nd rev. ed., 2006 GNU FDL version), §3.1 Counting Technique (stages, multiply, PDF pp.83-84), Thm 3.1 n!, Def 3.2 and Thm 3.2 k-permutations n(n−1)…(n−k+1) (PDF p.88); §3.2 binomial coefficients C(n,j) = number of j-subsets, Thm 3.4 Pascal recurrence, Thm 3.5 C(n,j)=(n)_j/j! (pp.93-94, PDF pp.101-102), read 2026-11-06, sha256:763eab9894983ddfd6cd7f84685548d1515a9326a2d9fd015474534460551a5e — https://math.dartmouth.edu/~prob/prob/prob.pdf"
    - "Grinstead & Snell, Introduction to Probability (2nd rev. ed., 2006 GNU FDL version), §3.1 Fixed Points and hat check problem, derangements (PDF pp.90, 93); Example 3.12: P(A_i)=(n−1)!/n!, P(no fixed point)=1/2!−1/3!+…+(−1)^n/n!, table n=4: .375 (pp.105-106, PDF pp.113-114), read 2026-11-06, sha256:763eab9894983ddfd6cd7f84685548d1515a9326a2d9fd015474534460551a5e — https://math.dartmouth.edu/~prob/prob/prob.pdf"
    - "Pishro-Nik, Introduction to Probability, Statistics, and Random Processes (probabilitycourse.com), §2.1.2 Ordered Sampling without Replacement (k-permutations P^n_k=n!/(n−k)!), read 2026-11-06, sha256:94bbffcd92f0a2250a3d2df2a11b3347b31df476c48aa30db7cedddeb5578f51 — https://www.probabilitycourse.com/chapter2/2_1_2_ordered_without_replacement.php"
    - "Pishro-Nik, Introduction to Probability, Statistics, and Random Processes (probabilitycourse.com), §2.1.3 Unordered Sampling without Replacement (P^n_k=C(n,k)k!; C(n,k)=n!/(k!(n−k)!), 0≤k≤n; C(n,k)=C(n,n−k); Σ C(n,k)=2^n; multinomial coefficients n!/(n1!…nr!)), read 2026-11-06, sha256:ad36b1a87daa3fd5d6a5e94a71c1a118182c7fd38a04af4a9cbf7b71e3ca62ae — https://www.probabilitycourse.com/chapter2/2_1_3_unordered_without_replacement.php"
    - "Siegrist, Probability, Mathematical Statistics, and Stochastic Processes (randomservices.org), Foundations > Combinatorial Structures (multiplication principle; n^(k)=C(n,k)k!; Pascal's rule C(n,k)=C(n−1,k−1)+C(n−1,k) with committee proof; sum_{j=n}^m C(j,n)=C(m+1,n+1) and sum j = C(m+1,2); round table (n−1)!; permutations with indistinguishable objects n!/(n1!…nk!); committee with officers), read 2026-11-06, sha256:63ef90fd651593defb33d7772ecbe92f6198b6b655219a5cb726c76cdc393ccb — https://www.randomservices.org/random/foundations/Structures.html"
    - "SOA, Probability Exam (Exam P) syllabus, November 2026, Topic 1 General Probability learning outcomes a-g (PDF p.2), Topic 2 outcome b (PDF p.3), read 2026-11-06, sha256:bed27462961aa988fc66c90fefa34af47ea324e2ab9109889c4e4f8f78d97397 — https://www.soa.org/globalassets/assets/files/edu/2026/fall/syllabi/2026-11-exam-p-syllabus.pdf"
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Permutation.md
---

![[Media/Figures/Permutation.svg|340]]

A **Permutation** is an ordered arrangement of distinct objects. The number of permutations of $k$ objects chosen from $n$ distinct objects, ${}_{n}P_{k}$, is

> $${}_{n}P_{k} = n \times (n-1) \times \cdots \times (n-k+1)$$

> $${}_{n}P_{k} = \frac{n!}{(n-k)!}$$

- $n!$, read "$n$ factorial", is $n \times (n-1) \times \cdots \times 2 \times 1$, with $0! = 1$.
- $k \le n$.

> [!example]- In a race with 10 runners, how many ways are there to award gold, silver and bronze medals? {Example}
> - Any of the 10 runners could win gold. Once gold is awarded, there are 9 remaining runners who could win silver, then 8 who could win bronze.
> - ${}_{10}P_{3} = 10 \times 9 \times 8 = 720$.

## Arranging all $n$ objects

When all $n$ objects are arranged, $k = n$ and the number of permutations is

> $${}_{n}P_{n} = n!$$

> [!example]- A 4-digit PIN is chosen at random, each digit from 0 to 9. What is the probability that its 4 digits are all different? {Example}
> - The sample space is every 4-digit PIN. Digits may repeat, so $|S| = 10^4 = 10{,}000$.
> - A PIN with all digits different is an ordered arrangement of 4 of the 10 digits, so $|E| = {}_{10}P_{4} = 10 \times 9 \times 8 \times 7 = 5{,}040$.
> - The [[Probability|probability]] is $P(E) = \frac{5{,}040}{10{,}000} = 0.504$.

## Arrangements with repeated objects

When the $n$ objects are not all distinct, arranging identical objects among themselves produces no new arrangement. If there are $r$ types of object, the number of distinct arrangements of all $n$ is

> $$\frac{n!}{n_1!\, n_2! \cdots n_r!}$$

- $n_i$ is the number of identical objects of type $i$, with $n_1 + n_2 + \cdots + n_r = n$.

> [!example]- How many distinct arrangements are there of the letters in LOSS? {Example}
> - There are $n = 4$ letters: one L, one O and two S's.
> - Swapping the two S's gives the same arrangement, so divide the $4!$ arrangements by $2!$.
> - There are $\frac{4!}{1!\,1!\,2!} = \frac{24}{2} = 12$ distinct arrangements.
