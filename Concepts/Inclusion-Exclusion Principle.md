---
verification:
  status: stale
  confidence: null
  last_checked: 2026-11-06
  last_checked_by: agent:validate-v1
  content_hash: sha256:364eff80e40c0eaad0389293d667d906a25c433e020d2cea898dda4e5aec90e8
  sources:
    - "Grinstead & Snell, Introduction to Probability (2nd rev. ed., 2006 GNU FDL version), §3.2 Thm 3.8 Inclusion-Exclusion Principle and proof: an outcome in k sets counted C(k,1)−C(k,2)+…=1 times (pp.104-105, PDF pp.112-113), read 2026-11-06, sha256:763eab9894983ddfd6cd7f84685548d1515a9326a2d9fd015474534460551a5e — https://math.dartmouth.edu/~prob/prob/prob.pdf"
    - "Grinstead & Snell, Introduction to Probability (2nd rev. ed., 2006 GNU FDL version), §1.2 Thm 1.1 property 4, Thm 1.2 (pairwise disjoint), Thm 1.3 (P(E)=Σ P(E∩A_i) over a partition), Thm 1.4 with proof 'added twice … subtracted once' (pp.22-24, PDF pp.30-32), read 2026-11-06, sha256:763eab9894983ddfd6cd7f84685548d1515a9326a2d9fd015474534460551a5e — https://math.dartmouth.edu/~prob/prob/prob.pdf"
    - "Grinstead & Snell, Introduction to Probability (2nd rev. ed., 2006 GNU FDL version), §3.1 Fixed Points and hat check problem, derangements (PDF pp.90, 93); Example 3.12: P(A_i)=(n−1)!/n!, P(no fixed point)=1/2!−1/3!+…+(−1)^n/n!, table n=4: .375 (pp.105-106, PDF pp.113-114), read 2026-11-06, sha256:763eab9894983ddfd6cd7f84685548d1515a9326a2d9fd015474534460551a5e — https://math.dartmouth.edu/~prob/prob/prob.pdf"
    - "Siegrist, Probability, Mathematical Statistics, and Stochastic Processes (randomservices.org), Probability Spaces > Probability Measures (Boole's inequality; Bonferroni two-event bounds P(A)+P(B)−1 ≤ P(A∩B) ≤ P(B); general Bonferroni inequalities: truncated inclusion-exclusion sum is an upper bound if it ends on a positive term (m odd), lower bound if negative), read 2026-11-06, sha256:381bc53d4a8e0bf0259a5ce1093eb2d759a56e205c38c362ddb3b1a03879c7e6 — https://www.randomservices.org/random/prob/Probability.html"
    - "Pishro-Nik, Introduction to Probability, Statistics, and Random Processes (probabilitycourse.com), §1.3.3 Finding Probabilities (P(A−B)=P(A)−P(A∩B); inclusion-exclusion for two and three events; complement), read 2026-11-06, sha256:256f9c0f56e043d695aa7631cad51a37c5fcffc82a2c24ff9ab5519641f8025b — https://www.probabilitycourse.com/chapter1/1_3_3_finding_probabilities.php"
    - "CAS, Exam MAS-I Content Outline 2026, PDF p.3 (Domain A tasks, readings Daniel/Ross/Struppeck) and p.6 (Ross §§9.1-9.6; James et al. Chapters 1-7), read 2026-11-06, sha256:245892366dea073ff44e89b3ac2ae1401517b127d36d51c8a1198b3185faa2ed — https://www.casact.org/sites/default/files/2026-06/MASI_ContentOutline_2026.pdf"
    - "Ross, Introduction to Probability Models, 12th ed., printed Contents (library scan, TU Ilmenau via GBV), PDF p.6: Ch 9 Reliability Theory, 9.2.1 Minimal Path and Minimal Cut Sets, 9.3 Reliability of Systems of Independent Components, 9.4 Bounds on the Reliability Function, 9.4.1 Method of Inclusion and Exclusion, read 2026-11-06, sha256:0c754803d244fd8e3d9343742c99e98ded9a331894a833711e17b018622023dc — https://www.gbv.de/dms/ilmenau/toc/1665053453.PDF"
    - "Xing, ECE544 Lecture 11 Reliability Block Diagrams (UMass Dartmouth, Fall 2022), PDF pp.4-5 (series: functioning iff each component functions; parallel: at least one), p.9 (path sets, cut sets, minimal cut set: a set of components whose failure causes the system to fail), p.11 (system failure = all events in one or more mincuts; inclusion/exclusion), read 2026-11-06, sha256:725a5930f8439e9627f9139b86e6a48341b4f0b0b56f6b4330ad3e3d801f1c97 — https://xingteaching.sites.umassd.edu/files/2022/10/Lecture11-s.pdf"
    - "SOA, Probability Exam (Exam P) syllabus, November 2026, Topic 1 General Probability learning outcomes a-g (PDF p.2), Topic 2 outcome b (PDF p.3), read 2026-11-06, sha256:bed27462961aa988fc66c90fefa34af47ea324e2ab9109889c4e4f8f78d97397 — https://www.soa.org/globalassets/assets/files/edu/2026/fall/syllabi/2026-11-exam-p-syllabus.pdf"
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Inclusion-Exclusion Principle.md
---

![[Media/Figures/Inclusion-Exclusion_Principle.svg|340]]

The **Inclusion-Exclusion Principle** gives the [[Probability|probability]] of a union of overlapping [[Event|events]]. It adds the probabilities of the single events, subtracts those of the intersections of two, adds those of the intersections of three, and so on. For two events, it is the [[Probability Addition Rule|addition rule]]. For three events $E$, $F$ and $G$, the probability that at least one occurs is

> $$
> \begin{aligned}
> & P(E \cup F \cup G) \\
> &= P(E) + P(F) + P(G) \\
> &\quad - P(E \cap F) \\
> &\quad - P(E \cap G) \\
> &\quad - P(F \cap G) \\
> &\quad + P(E \cap F \cap G)
> \end{aligned}
> $$

The same formula counts the elements of a union of sets, with $|E|$ in place of $P(E)$.

> [!idea] The idea
> An outcome in all three events is added three times by the single events, subtracted three times by the pairs and added back once by the triple, so it is counted exactly once.

> [!example]- An insurer has 1,000 customers. 500 hold auto, 350 hold home and 200 hold life. 150 hold auto and home, 80 hold auto and life, 60 hold home and life, and 30 hold all three. How many hold none of the three? {Example}
> - The single counts add to $500 + 350 + 200 = 1{,}050$.
> - The pairwise counts add to $150 + 80 + 60 = 290$.
> - The customers holding at least one policy number $1{,}050 - 290 + 30 = 790$.
> - The customers holding none number $1{,}000 - 790 = 210$.

## Any number of events

For events $E_1, E_2, \ldots, E_n$, the probability that at least one occurs is

> $$
> \begin{aligned}
> & P\Big(\bigcup_{i=1}^{n} E_i\Big) \\
> &= \sum_{i} P(E_i) \\
> &\quad - \sum_{i<j} P(E_i \cap E_j) \\
> &\quad + \sum_{i<j<k} P(E_i \cap E_j \cap E_k) \\
> &\quad - \cdots \\
> &\quad + (-1)^{n+1}\, P(E_1 \cap \cdots \cap E_n)
> \end{aligned}
> $$

- The sum over $i<j$ runs over every pair of events, the sum over $i<j<k$ over every triple, and so on.

> [!example]- Four policyholders each file a claim with probability 0.1, independently. What is the probability that at least one files a claim? {Example}
> - Each single event has probability 0.1, and there are 4 of them: $4(0.1) = 0.4$.
> - Each of the $\binom{4}{2} = 6$ pairs has probability $0.1^2$, each of the 4 triples $0.1^3$, and all four $0.1^4$.
> - Adding the singles and triples and subtracting the pairs and the quadruple gives $0.4 - 0.06 + 0.004 - 0.0001$.
> - So $P(\text{at least one}) = 0.3439$.
> - This agrees with the [[Independent Events#At least one of several independent events|complement]], $1 - 0.9^4 = 0.3439$.

## Bounds on the probability of a union

When the higher intersections are unknown, stopping the sum early still bounds the union. Stopping after the single events gives an upper bound:

> $$P\Big(\bigcup_{i} E_i\Big) \le \sum_{i} P(E_i)$$

Stopping after the pairs gives a lower bound:

> $$P\Big(\bigcup_{i} E_i\Big) \ge \sum_{i} P(E_i) - \sum_{i<j} P(E_i \cap E_j)$$

Exam MAS-I uses these bounds for the probability that a system of components fails, where failure is a union of events, one for each minimal cut set.

> [!example]- For the 1,000 customers above, what bounds do the single and pairwise counts give for the probability that a customer chosen at random holds at least one policy? {Example}
> - The single events give the upper bound $\frac{1{,}050}{1{,}000} = 1.05$, which says nothing here.
> - The singles less the pairs give the lower bound $\frac{1{,}050 - 290}{1{,}000} = 0.76$.
> - The exact probability, with the triple added back, is $0.79$.

> [!trap] The triple term left off
> Stopping after the pairwise subtractions undercounts the union by $P(E \cap F \cap G)$. On the customer example, it gives 760 customers with at least one policy instead of 790.
