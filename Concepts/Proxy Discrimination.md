---
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:ec091c6984829a0750dfc69a3e772fad65c65bac79381122fe922af91e2a2e8a
  sources: []
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Proxy Discrimination.md
---

**Proxy Discrimination** occurs when a facially neutral variable predicts the outcome partly because it is correlated with a protected characteristic, so that a model which leaves the protected characteristic out still charges or treats people differently according to it. Prince and Schwarcz (2020) describe it in these terms: the neutral variable's predictive power comes at least in part from its correlation with the protected one. It is one route to [[Unfair Discrimination|unfair discrimination]], and it is hard to see because the protected characteristic never appears among the model's inputs.

> $$E[Y \mid x, z] = \beta_0 + \beta_x x + \beta_z z$$

> $$\hat{\beta}_x \to \beta_x + \beta_z\,\delta$$

> $$\delta = \frac{\text{Cov}(x, z)}{\text{Var}(x)}$$

- **Symbols:** $Y$ is the outcome, such as a loss cost, $x$ is a permitted rating variable, and $z$ is a protected characteristic that the model omits. When $z$ is left out, the fitted coefficient on $x$ converges to $\beta_x + \beta_z\delta$, where $\delta$ is the slope from regressing $z$ on $x$, so $\beta_z\delta$ is the part of $x$'s effect that is borrowed from $z$. This is the omitted-variable bias of regression, read as discrimination.
- **Detection:** The first test is on outputs rather than inputs: compare predicted premiums, decline rates and loss ratios across the protected groups, because a premium difference with no matching loss difference is the signal ([[Bias in Actuarial Practice]] works one such case). Where group membership can be obtained or inferred for testing only, refit the model with $z$ included and see how far each variable's coefficient moves, since a variable whose effect shrinks a lot was acting partly as a proxy. A third test asks how well the model's inputs or its score predict $z$.
- **Mitigation:** A variable whose predictive power is mostly borrowed from $z$ can be dropped or replaced by one closer to the cause of loss. Pope and Sydnor (2011) propose fitting the model with $z$ included, so that every other variable keeps only its own effect, and then setting $z$ to its portfolio average for every record when pricing. Whatever is done, the tests, the choice and its cost in accuracy belong in the model's documentation.
- **Law and judgment:** Which characteristics are protected, and whether testing is required, differ by jurisdiction and line of business, so the rules that apply must be checked in each case. The actuarial question is whether a variable predicts loss in its own right or only through what it is correlated with.

> [!example]- Splitting a Territory Effect into Its Own Effect and a Proxy {Example}
> In a book of policies, the true pure premium is $E[Y \mid x, z] = 400 + 50x + 100z$, where $x = 1$ for territory 2 (25% of policies) and $z = 1$ for membership of a protected group. In territory 2, 60% of policyholders belong to the group, against 20% elsewhere. Find the premiums a model without $z$ would charge, the part of the territory difference that is a proxy effect, and the premiums under the Pope–Sydnor approach.
>
> > [!answer]-
> > Without $z$, each territory is charged its average loss cost.
> > $$
> > \begin{align*}
> > E[Y \mid x = 1] &= 400 + 50 + 100(0.60) \\
> > &= 510 \\
> > E[Y \mid x = 0] &= 400 + 100(0.20) \\
> > &= 420
> > \end{align*}
> > $$
> > For a 0/1 variable, the slope of $z$ on $x$ is the difference in group shares, so $\delta = 0.60 - 0.20 = 0.40$.
> > $$
> > \begin{align*}
> > \beta_x + \beta_z\delta &= 50 + 100(0.40) \\
> > &= 90
> > \end{align*}
> > $$
> > Of the 90 difference, 50 is the territory's own effect and 40 is borrowed from $z$. Under the Pope–Sydnor approach, every record is priced at the portfolio share $\bar{z}$.
> > $$
> > \begin{align*}
> > \bar{z} &= 0.25(0.60) + 0.75(0.20) \\
> > &= 0.30 \\
> > \text{Premium}_{x=1} &= 400 + 50 + 100(0.30) \\
> > &= 480 \\
> > \text{Premium}_{x=0} &= 400 + 100(0.30) \\
> > &= 430
> > \end{align*}
> > $$
> > The territory difference falls to 50, its own effect. Both sets of premiums collect the same average, since $0.25(510) + 0.75(420) = 442.5$ and $0.25(480) + 0.75(430) = 442.5$, so the overall rate level is unchanged: territory 2's premium falls by 30 and the rest of the book's rises by 10.

> [!example]- Is It Risk or a Proxy? {Example}
> An auto model has three candidate variables, each correlated with a protected characteristic in the insurer's data: annual distance driven, the policyholder's preferred language for correspondence, and the number of at-fault accidents in the past five years. For each, say whether proxy discrimination is the likely concern and what would settle it.
>
> > [!answer]-
> > 1. **Annual distance:** Distance has a direct link to loss, since more driving means more exposure to accidents, so it most likely predicts in its own right. Its coefficient should barely move when the protected characteristic is controlled for in testing.
> > 2. **Preferred language:** Language has no plausible direct link to accident frequency, so whatever predictive power it shows is likely borrowed from its correlation with national origin or ethnicity. It should be left out unless testing shows otherwise, and the effect it was capturing should be traced to a variable that does affect loss.
> > 3. **Accident history:** Accident history is a direct measure of driving risk, so its effect is unlikely to be mostly proxy. The model's outputs should still be tested across groups, because correlation with a group calls for checking even when the variable is sound.

> [!tip]- How it appears on the exam
> - **ATPA** asks candidates to recognize and mitigate model bias, including fairness concepts and proxy discrimination, in its Advanced Predictive Analytics Models section, and to detect biases introduced when preparing data. A task can ask which variables in the assessment data could act as proxies, how to test for it and what to do about it, using the ethical framework from the Ethical Foundations section.
> - **Written answers:** A strong answer separates the statistical question, whether the variable predicts loss through its own effect, from the ethical and legal one, whether any remaining effect may be used. It also names the test that answers the first question.

> [!warning]- Exam traps
> - **Omitting the variable is not enough:** Leaving the protected characteristic out of the model does not prevent proxy discrimination, and it can hide it. The test has to be on the model's outputs across the groups.
> - **Correlation alone is not proxy discrimination:** A variable is a proxy only if part of its predictive power comes from its correlation with the protected characteristic. Accident history can be correlated with a group and still predict loss in its own right.
> - **The data needed to test:** The coefficient test and the Pope–Sydnor approach need the protected characteristic for fitting or testing, which the insurer may not hold. Using it to test or correct a model is not the same as rating on it, but the rules on collecting and using it still apply.
> - **Flexible models find proxies:** A tree ensemble or a neural network can rebuild a protected characteristic from several variables that are each harmless on their own. Checking the variables one at a time can therefore miss a proxy that only the combination creates.
