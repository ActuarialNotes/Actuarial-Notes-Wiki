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
