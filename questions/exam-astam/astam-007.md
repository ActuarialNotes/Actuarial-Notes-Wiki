---
id: "astam-007"
exam: "Exam ASTAM"
topic: "Excess of Loss"
learning_objective: "Aggregate Models"
difficulty: hard
type: multi-part
wiki_link:
  - Concepts/Aggregate+Loss+Model
  - Concepts/Lognormal+Distribution
  - Concepts/Limited+Expected+Value
  - Concepts/Excess+of+Loss
  - Concepts/Pro+Rata+Reinsurance
  - Concepts/Coverage+Modifications
points: 6
verification:
  status: verified
  confidence: high
  last_checked: 2026-10-23
  last_checked_by: agent:validate-v1
  content_hash: sha256:f79f50cbd9e37606188bf37437e0a67d19e43e761cd97b2a887de04d33c43505
  sources:
    - "SOA ASTAM Sample Questions (version of Feb. 23, 2026), Q7, p.12, sha256:0294cf4e8717191cda2747e7a6bb49fbb5e2d08f2d281ec979e670621de74ab4 — https://www.soa.org/globalassets/assets/files/edu/2024/spring/questions/february-2024-astam-questions.pdf"
    - "SOA ASTAM Solutions to Sample Questions, Q7, pp.16-17, sha256:c4206394603cf205da0668d40333bee5aaa6e3dadcaa241fdb03e5488a1ba4e1 — https://www.soa.org/globalassets/assets/files/edu/2024/spring/solutions/february-2024-astam-solutions.pdf"
  open_findings: 0
  open_critical: 0
  log: .verify/questions/exam-astam/astam-007.md
---

Aggregate claims for a portfolio are assumed to follow a compound Poisson distribution, with Poisson parameter $\lambda = 50$. The individual claims distribution is lognormal, with parameters $\mu = 6.0, \quad \sigma^2 = 1.5$.

## Part a

Show that, if $f(x)$ is the density function for the lognormal$(\mu, \sigma)$ distribution, then

$$\int_d^\infty x^k f(x)\,dx = e^{k\mu + k^2\sigma^2/2}\left\{1 - \Phi\left(\frac{\log d - \mu - k\sigma^2}{\sigma}\right)\right\}$$

### Explanation

From the formula sheet

$$E\left[(X \wedge x)^k\right] = e^{k\mu + k^2\sigma^2/2}\left\{\Phi\left(\frac{\log x - \mu - k\sigma^2}{\sigma}\right)\right\} + x^k\big(1 - F(x)\big)$$

$$\Rightarrow \int_0^d x^k f(x)\,dx + d^k\big(1 - F(d)\big) = e^{k\mu + k^2\sigma^2/2}\left\{\Phi\left(\frac{\log d - \mu - k\sigma^2}{\sigma}\right)\right\} + d^k\big(1 - F(d)\big)$$

$$\Rightarrow \int_0^d x^k f(x)\,dx = e^{k\mu + k^2\sigma^2/2}\left\{\Phi\left(\frac{\log d - \mu - k\sigma^2}{\sigma}\right)\right\}$$

Also, we have

$$\int_0^\infty x^k f(x)\,dx = E\left[X^k\right] = e^{k\mu + k^2\sigma^2/2}$$

$$\Rightarrow \int_d^\infty x^k f(x)\,dx = e^{k\mu + k^2\sigma^2/2}\left\{1 - \Phi\left(\frac{\log d - \mu - k\sigma^2}{\sigma}\right)\right\}$$

## Part b

The insurer shares the risk with a reinsurer under an excess of loss agreement with retention 3000.

- (i) Calculate the expected number of claims involving the reinsurer.
- (ii) Show that the expected value of an individual reinsurance payment, given that the loss involves the reinsurer, is 2722.
- (iii) Show that the reinsurer's expected aggregate claim cost is 6,900 to the nearest 10.
- (iv) Calculate the direct insurer's expected aggregate claims cost after reinsurance.

### Explanation

The expected number of claims involving the reinsurer is

$$\lambda\big(1 - F(3000)\big) = 50\left(1 - \Phi\left(\frac{\log 3000 - 6}{1.22475}\right)\right) = 2.53$$

The expected value of an individual reinsurer claim is

$$\begin{aligned}
\frac{1}{S(d)}\int_d^\infty (x - d)f(x)\,dx &= \frac{1}{S(d)}\int_d^\infty (x)f(x)\,dx - d \\
&= \frac{1}{\left(1 - \Phi\left(\frac{\log d - \mu}{\sigma}\right)\right)}\,e^{\mu + \sigma^2/2}\left\{1 - \Phi\left(\frac{\log d - \mu - \sigma^2}{\sigma}\right)\right\} - d \\
&= \frac{854.06 \times 0.66036}{0.05069} - 3000 \\
&= 2722.4
\end{aligned}$$

Let $S$ denote the aggregate claim cost before reinsurance and let $S^*$ denote the reinsurer's aggregate claims cost. Let $Y$ and $Y^*$ denote the gross and reinsurer's claim severity random variables, respectively.

Then the aggregate cost of claims paid by the reinsurer is

$$E\left[S^*\right] = \lambda S(d)E\left[Y^*\right] = 2.5345 \times 2722.38 = 6{,}899.98$$

The aggregate cost of claims paid before reinsurance is

$$E\left[S\right] = \lambda E\left[Y\right] = 50 \times 854.06 = 42{,}702.94$$

Hence, the average cost of claims to the direct insurer, net of reinsurance, is $E\left[S - S^*\right] = 35{,}803.0$

## Part c

Calculate the standard deviation of the reinsurer's aggregate claims under the excess of loss contract.

### Explanation

$$Var\left[S^*\right] = \lambda S(d)E\left[\left(Y^*\right)^2\right] = 2.5345 \times E\left[\left(Y^*\right)^2\right]$$

$$\begin{aligned}
E\left[\left(Y^*\right)^2\right] &= \frac{1}{S(d)}\int_d^\infty (x - d)^2 f(x)\,dx \\
&= \frac{1}{S(d)}\int_d^\infty x^2 f(x)\,dx - 2d\,\frac{1}{S(d)}\int_d^\infty x f(x)\,dx + d^2 \\
&= \frac{1}{S(d)}\left(e^{2\mu + 2\sigma^2}\left(1 - \Phi\left(\frac{\log d - \mu - 2\sigma^2}{\sigma}\right)\right)\right) - 2d\big(2722.8 + 3000\big) + d^2 \text{ (as printed)} \\
&= 51{,}037{,}050 - 34{,}334{,}283 + 9{,}000{,}000 \\
&= 25{,}702{,}767 \\
&= 5{,}069.79^2
\end{aligned}$$

$$\Rightarrow Var\left[S^*\right] = 8{,}071.2^2$$

## Part d

The insurer is considering changing to a proportional reinsurance arrangement, under which the reinsurer pays $(1 - \alpha)$ of every claim. You are given that the expected cost of claims under the new contract is the same as under the excess of loss contract. Show that the proportion retained by the insurer is $\alpha = 0.84$ to the nearest 0.01.

### Explanation

Now we have

$$Y^* = (1 - \alpha)Y; \quad S = \sum_1^N Y; \quad S^* = \sum_1^N Y^*$$

So $E\left[S^*\right] = (1 - \alpha)E\left[S\right]$ i.e. $6899.94 = (1 - \alpha)42{,}702.94$ (as printed)

$$\Rightarrow \alpha = 0.8384$$

## Part e

Calculate the standard deviation of the reinsurer's claims under the proportional reinsurance contract.

### Explanation

The variance of reinsurer claims is

$$\begin{aligned}
Var\left[S^*\right] &= Var\left[(1 - \alpha)S\right] \\
&= (1 - \alpha)^2 Var\left[S\right] \\
&= (1 - \alpha)^2\lambda E\left[Y^2\right] \\
\Rightarrow SD\left[S^*\right] &= (1 - \alpha)SD\left[S\right] \\
E\left[Y^2\right] &= e^{2\mu + 2\sigma^2} \\
&= 3{,}269{,}017 \\
\Rightarrow SD[S] &= 12{,}784.7 \text{ (as printed)} \\
\Rightarrow SD\left[S^*\right] &= 2065.8
\end{aligned}$$

## Part f

Comment briefly on the implications of the different standard deviations on the pricing of the two reinsurance contracts.

### Explanation

The two reinsurance contracts have the same expected cost, but the standard deviation of costs under the excess loss policy is significantly larger than under the proportional reinsurance contract. As the reinsurance premium will reflect risk, we would expect a higher premium loading for the excess loss policy than for the proportional policy.
