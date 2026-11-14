---
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:a19077432e29df5d9086e6d04edf89692e13efac3e796e31e11bf4f2c9308131
  sources: []
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Proxy Discrimination.md
---

**Proxy Discrimination** occurs when a facially neutral variable predicts the outcome partly because it is correlated with a protected characteristic, so that a model which leaves the protected characteristic out still charges or treats people differently according to it. It is one route to [[Unfair Discrimination|unfair discrimination]], and it is hard to see because the protected characteristic never appears among the model's inputs.

Suppose an outcome $Y$, such as a loss cost, depends on a permitted rating variable $x$ and a protected characteristic $z$. Its expected value is

> $$E[Y \mid x, z] = \beta_0 + \beta_x x + \beta_z z$$

- $\beta_0$ is the intercept.
- $\beta_x$ and $\beta_z$ are the effects of $x$ and $z$ on the expected outcome.

When $z$ is left out of the model, the fitted coefficient on $x$ converges to

> $$\beta_x + \beta_z\,\delta$$

- $\delta$ is the slope from regressing $z$ on $x$, $\text{Cov}(x, z)/\text{Var}(x)$.

The term $\beta_z\delta$ is the part of the effect of $x$ that is borrowed from $z$. This is the omitted-variable bias of regression, read as discrimination. Correlation with $z$ alone does not make $x$ a proxy: $x$ is a proxy only to the extent that part of its predictive power comes from that correlation.

> [!example]- How much of this territory difference is a proxy effect? {Example}
> In a book of policies, the true pure premium is $E[Y \mid x, z] = 400 + 50x + 100z$. Here $x = 1$ for territory 2, which holds 25% of policies, and $z = 1$ for membership of a protected group. In territory 2, 60% of policyholders belong to the group, against 20% elsewhere.
>
> > [!answer]-
> > - A model without $z$ charges each territory its average loss cost.
> > - Territory 2 is charged $400 + 50 + 100(0.60) = 510$.
> > - The other territories are charged $400 + 100(0.20) = 420$.
> > - For a 0/1 variable, the slope of $z$ on $x$ is the difference in group shares, so $\delta = 0.60 - 0.20 = 0.40$.
> > - The fitted territory effect is $50 + 100(0.40) = 90$, which matches $510 - 420$.
> > - Of the 90, 50 is the territory's own effect and **40 is borrowed from $z$**.

## Testing for proxy discrimination

Three tests are used, in this order:

1. **Outputs across groups.** The first test is on outputs rather than inputs: compare predicted premiums, decline rates and loss ratios across the protected groups, because a premium difference with no matching loss difference is the signal. Fitting a model to loss data does not by itself make premiums match loss costs for every group. [[Bias in Actuarial Practice]] works one such case.
2. **Coefficient movement.** Where group membership can be obtained or inferred for testing only, refit the model with $z$ included and see how far each variable's coefficient moves. A variable whose effect shrinks a lot was acting partly as a proxy.
3. **Predicting the characteristic.** Ask how well the model's inputs or its score predict $z$.

The second and third tests need the protected characteristic, which the insurer may not hold. Using it to test or correct a model is not the same as rating on it, but the rules on collecting and using it still apply. Checking variables one at a time can also miss a proxy, because a tree ensemble or a neural network can rebuild a protected characteristic from several variables that are each harmless on their own.

> [!example]- Which of these three rating variables is likely to act as a proxy? {Example}
> An auto model has three candidate variables, each correlated with a protected characteristic in the insurer's data: annual distance driven, the policyholder's preferred language for correspondence, and the number of at-fault accidents in the past five years.
>
> > [!answer]-
> > - Annual distance has a direct link to loss, since more driving means more exposure to accidents. It most likely predicts in its own right, and its coefficient should barely move when the protected characteristic is controlled for in testing.
> > - Preferred language has no plausible direct link to accident frequency, so its predictive power is likely borrowed from its correlation with national origin or ethnicity.
> > - Accident history is a direct measure of driving risk, so its effect is unlikely to be mostly proxy. The model's outputs should still be tested across groups.
> > - **Preferred language** is the likely proxy. It should be left out unless testing shows otherwise, and the effect it was capturing should be traced to a variable that does affect loss.

## Mitigating proxy discrimination

When testing shows a premium gap for a protected group, the tests above identify the variables driving it. A variable whose predictive power is mostly borrowed from $z$ can be dropped or replaced by one closer to the cause of loss.

Pope and Sydnor (2011) propose fitting the model with $z$ included, so that every other variable keeps only its own effect, and then setting $z$ to its portfolio average $\bar{z}$ for every record when pricing. The premium for a record is then

> $$\beta_0 + \beta_x x + \beta_z \bar{z}$$

Whatever is done, the tests, the choice and its cost in accuracy belong in the model's documentation. Which characteristics are protected, and whether testing is required, differ by jurisdiction and line of business, so the rules that apply must be checked in each case.

> [!example]- What premiums does the Pope–Sydnor approach charge in this territory book? {Example}
> The true pure premium is $E[Y \mid x, z] = 400 + 50x + 100z$. Territory 2 ($x = 1$) holds 25% of policies, and 60% of its policyholders belong to the protected group ($z = 1$), against 20% elsewhere. A model without $z$ charges 510 in territory 2 and 420 elsewhere.
>
> > [!answer]-
> > - The portfolio share of the group is $\bar{z} = 0.25(0.60) + 0.75(0.20) = 0.30$.
> > - Territory 2 is charged $400 + 50 + 100(0.30) = 480$.
> > - The other territories are charged $400 + 100(0.30) = 430$.
> > - The territory difference falls from 90 to 50, the territory's own effect.
> > - Both sets of premiums average $0.25(510) + 0.75(420) = 0.25(480) + 0.75(430) = 442.5$, so the overall rate level is unchanged.
> > - **Territory 2's premium falls by 30 and the rest of the book's rises by 10.**

> [!trap] Leaving the protected characteristic out of the model
> Omitting $z$ does not prevent proxy discrimination, and it can hide it, because the correlated variables carry its effect. The test has to be on the model's outputs across the groups.
