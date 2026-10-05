---
verification:
  status: verified
  confidence: medium
  last_checked: 2026-10-05
  last_checked_by: agent:validate-v1
  content_hash: sha256:dd349c309ca95e78c44aa2c22e0ed836c0b6de084961e719d341ea76d2feea84
  sources:
    - "Siegrist, Random, ch.8 §5 Likelihood Ratio Tests: L = f0/f1, reject iff L <= l, with discrete data only certain alpha attainable; Neyman-Pearson Lemma (P0(R) >= P0(A) implies P1(R) >= P1(A)); random-sample product form; exponential scale example (b1 > b0 gives Y = sum X_i >= gamma quantile, UMP for the one-sided test); Bernoulli p one-sided UMP; normal-model one-sided tests UMP, none of the two-sided tests UMP; composite LR = sup over Theta_0 / sup over T, sha256:60b047835a3f644cd2317c8ab984b8d41ae7669f53c1d32a79705942670b9b04 — https://www.randomservices.org/random/hypothesis/Likelihood.html"
    - "CAS Exam MAS-I Tables (version 01/15/2018), p.3 normal table: Phi(1.64) = 0.9495, Phi(1.65) = 0.9505, Phi(0.35) = 0.6368, Phi(0.36) = 0.6406, sha256:cb5674138a67f7a498b8cc90357144fd121cbcbbc7487f214557b105611a69b4 — https://www.casact.org/sites/default/files/2021-03/masi_tables.pdf"
    - "CAS Exam MAS-I Content Outline 2026 (MASI_CO_2026_F v06, 2026-06-29), reading list PDF p.6: Hogg Domain B §§8.1, 8.2, sha256:245892366dea073ff44e89b3ac2ae1401517b127d36d51c8a1198b3185faa2ed — https://www.casact.org/sites/default/files/2026-06/MASI_ContentOutline_2026.pdf"
    - "Hogg, McKean & Craig, Introduction to Mathematical Statistics 8th ed. (Global Ed.), publisher preview, contents PDF pp.6-8: §8.1 'Most Powerful Tests' (p.483), §8.2 'Uniformly Most Powerful Tests' (p.493) (contents only), sha256:7fd80607a820477e03ff2c8f3469f5cfa57d095d766cbc29d39d723ef5a69a99 — https://api.pageplace.de/preview/DT0400.9781292264783_A39514650/preview-9781292264783_A39514650.pdf"
  open_findings: 1
  open_critical: 0
  log: .verify/Concepts/Neyman-Pearson Lemma.md
---

The **Neyman-Pearson Lemma** says how to build the **most powerful test** of a simple null hypothesis $H_0: f = f_0$ against a simple alternative $H_1: f = f_1$: reject $H_0$ where the likelihood ratio $L(\mathbf{x}) = f_0(\mathbf{x})/f_1(\mathbf{x})$ is small. Among all tests whose [[Type I Error|Type I error]] probability is at most $\alpha$, this **best critical region** has the greatest [[Power of a Test|power]].

> $$C = \left\{\mathbf{x} : \frac{f_0(\mathbf{x})}{f_1(\mathbf{x})} \le k\right\}$$

> $$P(\mathbf{X} \in C \mid H_0) = \alpha$$

- $f_0$ and $f_1$ are the joint densities (or PMFs) of the sample under each hypothesis; for a [[Random Sample|random sample]] they are products, $f_j(\mathbf{x}) = \prod_i f_j(x_i)$. The constant $k > 0$ is whatever makes the size equal $\alpha$.
- **The guarantee:** if any other critical region $A$ has $P_0(A) \le P_0(C)$, then $P_1(A) \le P_1(C)$. A region where $f_1 = 0$ never belongs in $C$; a region where $f_0 = 0$ always does.
- **In practice** the inequality $L \le k$ simplifies to a condition on a [[Sufficient Statistic|sufficient statistic]], such as $\sum X_i \ge c$, and $c$ is set from that statistic's distribution under $H_0$. With discrete data only certain sizes $\alpha$ can be attained exactly.
- **Uniformly most powerful (UMP) tests.** If the best critical region for $\theta_0$ against $\theta_1$ is the *same* for every $\theta_1$ in a composite alternative, it is most powerful against each of them, and so is UMP. The one-sided tests for an exponential mean, a binomial $p$, or a normal mean or variance are UMP; the two-sided tests are not, because the best region for $\theta_1 > \theta_0$ is the opposite tail from the best region for $\theta_1 < \theta_0$.
- The [[Likelihood Ratio Test]] generalizes the ratio to composite hypotheses by maximizing each likelihood over its parameter set.

> [!example]- Most Powerful Test for an Exponential Claim Size {Example}
> A single claim $X$ is exponential. Test $H_0$: mean $100$ against $H_1$: mean $200$ with $\alpha = 0.05$. Find the best critical region and its power.
>
> > [!answer]-
> > The likelihood ratio is
> >
> > $$
> > \begin{align*}
> > \frac{f_0(x)}{f_1(x)} &= \frac{\tfrac{1}{100}e^{-x/100}}{\tfrac{1}{200}e^{-x/200}} \\
> >   &= 2\,e^{-x/200}
> > \end{align*}
> > $$
> >
> > which decreases in $x$, so $L \le k$ is the same as $X \ge c$. Set the size:
> >
> > $$
> > \begin{align*}
> > P(X \ge c \mid H_0) &= e^{-c/100} \\
> >   &= 0.05 \\
> > c &= 100 \ln 20 \\
> >   &= 299.57
> > \end{align*}
> > $$
> >
> > The power is $P(X \ge 299.57 \mid H_1) = e^{-299.57/200} = 0.224$. No other test with a 5% Type I error rate detects the larger mean more often.

> [!example]- A Uniformly Most Powerful Test for Mean Severity {Example}
> Claim sizes are normal with $\sigma = 250$. From $n = 25$ claims, test $H_0: \mu = 1{,}000$ against $H_1: \mu = 1{,}100$ at $\alpha = 0.05$. Find the best critical region and its power, and explain why the same test is UMP for $H_1: \mu > 1{,}000$.
>
> > [!answer]-
> > For normal data the ratio $f_0/f_1$ is a decreasing function of $\bar{x}$ when $\mu_1 > \mu_0$, so the best region is $\bar{X} \ge c$. Under $H_0$, $\bar{X}$ is normal with standard deviation $250/\sqrt{25} = 50$:
> >
> > $$
> > \begin{align*}
> > c &= 1{,}000 + 1.645(50) \\
> >   &= 1{,}082.25
> > \end{align*}
> > $$
> >
> > Power at $\mu = 1{,}100$:
> >
> > $$
> > \begin{align*}
> > P(\bar{X} \ge 1{,}082.25 \mid \mu = 1{,}100) &= P\left(Z \ge \frac{1{,}082.25 - 1{,}100}{50}\right) \\
> >   &= P(Z \ge -0.355) \\
> >   &= 0.639
> > \end{align*}
> > $$
> >
> > The cutoff $1{,}082.25$ was fixed by $H_0$ alone and never used the value $1{,}100$, so the same region is most powerful against every $\mu_1 > 1{,}000$ — it is the UMP test of $H_0: \mu = 1{,}000$ against $H_1: \mu > 1{,}000$.
