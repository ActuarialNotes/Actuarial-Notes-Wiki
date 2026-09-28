---
verification:
  status: verified
  confidence: medium
  last_checked: 2026-09-28
  last_checked_by: agent:validate-v1
  content_hash: sha256:939d8f496a093a2dcc627cc29717490180f5ed4a8d13ba44748903339c447e9f
  sources:
    - "Grinstead & Snell, Introduction to Probability (2nd rev. ed., 2006 GNU FDL version), Def. 4.7 and Thm 4.2 (PDF p.173), Thm 6.8 (V(X+Y)=V(X)+V(Y) for independent X, Y), Ex. 6.2.23 (PDF p.275), Ex. 6.3.17 (PDF p.289), Thms 9.4 and 9.6 (PDF pp.351, 365), sha256:763eab9894983ddfd6cd7f84685548d1515a9326a2d9fd015474534460551a5e — https://math.dartmouth.edu/~prob/prob/prob.pdf"
    - "SOA Exam P Sample Solutions (Aug 2026 revision), Q248 (Cov = 0 yet dependent, PDF p.73), sha256:efade84ea0ba886e00f07be817c94eae33d3b2ec5ca378e6cad4b74d77136135 — https://www.soa.org/globalassets/assets/files/edu/2026/spring/questions-solutions/2026-05-exam-p-sample-solutions.pdf"
    - "Pishro-Nik, Introduction to Probability, Statistics, and Random Processes, §5.3.1 Covariance and Correlation (Cov = E[XY]-EX EY; independent implies uncorrelated, converse not necessarily true), web page as fetched 2026-09-28, sha256:330faf8fb05f924926ce40a5e577b79910d97ec946263f40c64bf5e1277a9f82 — https://www.probabilitycourse.com/chapter5/5_3_1_covariance_correlation.php"
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Independent Random Variables.md
---

[[Random Variable]]s $X$ and $Y$ are **Independent** if knowledge of one provides no information about the other. Formally, for all values $x$ and $y$, the joint distribution factors into the product of the marginals.

> $$F(x, y) = F_X(x) \cdot F_Y(y)$$

> $$f(x,y) = f_X(x)\cdot f_Y(y)$$

- Independence implies [[Covariance]] is zero ($\text{Cov}(X,Y) = 0$), though the converse is not always true
- For independent random variables: $E[XY] = E[X]\,E[Y]$ and $\text{Var}(X + Y) = \text{Var}(X) + \text{Var}(Y)$
- The [[Central Limit Theorem]] applies to sums of independent and identically distributed (i.i.d.) random variables

![[Media/Figures/Independent_Random_Variables.svg|340]]

> [!example]- Verifying Independence {Example}
> $X$ and $Y$ have joint density $f(x,y) = 2$ for $0 < x < y < 1$ (and 0 elsewhere). Are $X$ and $Y$ independent?
>
> > [!answer]-
> > The marginal densities are $f_X(x) = 2(1-x)$ and $f_Y(y) = 2y$. Their product is $4y(1-x)$, but $f(x,y) = 2 \neq 4y(1-x)$ in general, so **$X$ and $Y$ are not independent**.
