---
verification:
  status: verified
  confidence: high
  last_checked: 2026-11-06
  last_checked_by: agent:validate-v1
  content_hash: sha256:405f3057d0f76d7466b2b7bfd85a32c02c184ba27f037bcd65de1471331396d3
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

A **Combination** $\binom{n}{k}$, read "$n$ choose $k$", counts the ways to select $k$ objects from $n$ distinct objects when order does not matter.

> $$\binom{n}{k} = \frac{n!}{k!\,(n-k)!}$$

- $n$ is the number of objects and $k$ the number selected.
- A combination assumes no replacement, so the same object cannot be selected twice.
- A combination differs from a [[Permutation|permutation]] by a factor of $k!$, the number of ways to order the selected objects.
- Combinations appear in the [[Binomial Distribution|binomial]] and [[Hypergeometric Distribution|hypergeometric]] distributions and in [[Inclusion-Exclusion Principle|inclusion-exclusion]] counts.

> [!idea] The idea
> Ordered picks are easy to count, but a committee has no order. A combination counts the ordered picks, then divides out the $k!$ orderings of each group, because every unordered group appears among the ordered picks once per ordering.

![[Media/Figures/Combination.svg|340]]

## Picks without order

An insurer forms a committee of 3 adjusters from 8. Picking in order, there are $8 \times 7 \times 6 = 336$ ways. But the committee $\{A, B, C\}$ appears in all of its $3! = 6$ orderings: $ABC$, $ACB$, $BAC$, $BCA$, $CAB$ and $CBA$.

> $$\binom{8}{3} = \frac{336}{6} = 56$$

## Choosing who is in is choosing who is out

Choosing the 3 adjusters on the committee is the same as choosing the 5 who are left off.

> $$\binom{n}{k} = \binom{n}{n-k}$$

On the example, $\binom{8}{3} = \binom{8}{5} = 56$. Use whichever side is smaller.

## Selections from several categories

Of the 8 adjusters, 3 are senior and 5 are junior. How many committees have exactly 1 senior adjuster? Choose the senior one from 3 and the two juniors from 5, separately, and multiply.

> $$\binom{3}{1}\binom{5}{2} = 3 \times 10 = 30$$

If the committee is chosen at random, it has exactly 1 senior adjuster with probability $30/56 \approx 0.536$.

When a population is split into disjoint categories of sizes $N_1, \ldots, N_r$, a selection with exactly $k_i$ from category $i$ can be made in this many ways:

> $$\binom{N_1}{k_1}\binom{N_2}{k_2}\cdots\binom{N_r}{k_r}$$

- The categories must cover everyone. When the counts asked for add to less than the selection size, the rest come from the leftover category, which adds a factor for it.
- Dividing by $\binom{N}{n}$, the number of all selections of size $n$, gives the probability of that mix under the multivariate [[Hypergeometric Distribution|hypergeometric distribution]].

## When the picks get roles

If one of the 3 committee members is named chair, each committee gives 3 different outcomes, so there are $56 \times 3 = 168$. If a chair and a secretary are both named, there are $56 \times 3 \times 2 = 336$, which is the ordered count $P(8, 3)$ again. Once every selected object has a distinct role, the count is a permutation.

## Pascal's rule and the hockey-stick identity

Fix one adjuster. Every committee of 3 from 8 either leaves that adjuster out, choosing 3 from the other 7, or includes them, choosing 2 more from the other 7. So $56 = 35 + 21$. That is Pascal's rule.

> $$\binom{n+1}{k} = \binom{n}{k} + \binom{n}{k-1}, \quad 1 \le k \le n$$

Pascal's rule written as $\binom{m}{k} = \binom{m+1}{k+1} - \binom{m}{k+1}$ makes a sum of combinations telescope, with $\binom{k}{k+1} = 0$. That gives the hockey-stick identity.

> $$\sum_{m=k}^{n}\binom{m}{k} = \binom{n+1}{k+1}, \quad k \le n$$

- For example, $1 + 3 + 6 + 10 + 15 = \binom{7}{3} = 35$.
- It evaluates sums of falling-factorial terms, since $m(m-1)\cdots(m-k+1) = k!\binom{m}{k}$. The simplest case is $\sum_{m=1}^{n} m = \binom{n+1}{2}$.

## On other exams

**MAS-I** counts the models fit by best subset selection. With $p$ predictors there is one model for every subset, and adding $\binom{p}{k}$ over every size $k$ gives $2^p$ models.

## Try it

> [!example]- A mix of claim types {Example}
> Five claims are drawn at random from 12: 3 workers compensation, 4 homeowners and 5 auto. Find the probability of 1 workers compensation, 2 homeowners and 2 auto claims.
>
> > [!answer]-
> > **Plan:** one combination per type, over all selections of 5.
> > $$
> > \begin{align*}
> > P &= \frac{\binom{3}{1}\binom{4}{2}\binom{5}{2}}{\binom{12}{5}} \\
> > &= \frac{3 \times 6 \times 10}{792} \\
> > &\approx 0.227
> > \end{align*}
> > $$

> [!example]- Without replacement, not binomial {Example}
> Four policies are drawn without replacement from 20, of which 5 are high-risk. Find the probability that exactly one is high-risk.
>
> > [!answer]-
> > **Plan:** a draw without replacement from a finite group is a ratio of combinations.
> > $$
> > \begin{align*}
> > P &= \frac{\binom{5}{1}\binom{15}{3}}{\binom{20}{4}} \\
> > &= \frac{5 \times 455}{4845} \\
> > &\approx 0.470
> > \end{align*}
> > $$
> > The binomial $4(0.25)(0.75)^3 \approx 0.422$ assumes the high-risk share stays at 25% after each draw. In a group of 20 it doesn't.

> [!example]- An unknown count {Example}
> Of 12 houses, $k$ are uninsured. A storm damages 2 at random. The probability that both damaged houses are uninsured is $1/22$. Find the probability that at most one damaged house is insured.
>
> > [!answer]-
> > **Plan:** solve for $k$ from the given probability, then count the two cases.
> >
> > $\binom{k}{2} / \binom{12}{2} = 1/22$, and $\binom{12}{2} = 66$, so $\binom{k}{2} = 3$ and $k = 3$.
> > $$
> > \begin{align*}
> > P(\text{at most one insured}) &= \frac{\binom{3}{2} + \binom{3}{1}\binom{9}{1}}{66} \\
> > &= \frac{3 + 27}{66} \\
> > &\approx 0.455
> > \end{align*}
> > $$

> [!warning]- Exam traps
> - **A combination where order matters.** When the selected objects get distinct roles, such as chair and secretary, the count is $\binom{n}{k}\,k!$, a permutation.
> - **A binomial where the draw is without replacement.** The probability of a mix from a finite group is a ratio of combinations, not $\binom{n}{k}p^k(1-p)^{n-k}$. The binomial answer is close for a large group, which is what makes it tempting.
> - **A missing leftover category.** "Two non-smokers among six" leaves four chosen from the smokers, which needs its own factor.
