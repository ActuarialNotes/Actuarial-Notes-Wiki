---
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:8b454b0b2f51bf8a3ce1329a9b63d1c74ddaac0de122e6ba40842d1e952b9308
  sources: []
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Shapley Value.md
---

A **Shapley Value** is one player's share of a total payout: its marginal contribution to the payout, averaged over every order in which the players could have joined. To [[Explainability|explain]] one prediction of a model, the players are the record's $p$ features and the payout is the prediction less the average prediction, so each Shapley value says how far one feature moved this prediction away from the average.

For a set $N$ of $p$ features, the Shapley value of feature $j$ is

> $$\phi_j = \sum_{S \subseteq N \setminus \{j\}} \frac{|S|!\,(p - |S| - 1)!}{p!}\,\big[v(S \cup \{j\}) - v(S)\big]$$

- $S$ is a coalition of features that excludes $j$, and $|S|$ is the number of features in it.
- $v(S)$ is the payout the coalition $S$ earns.
- The weight on each term is the probability that, in a random ordering of the $p$ features, exactly the features in $S$ come before $j$.

So $\phi_j$ is feature $j$'s marginal contribution averaged over all $p!$ orderings. For three features the weights are $\tfrac{1}{3}$ for the empty coalition, $\tfrac{1}{6}$ for a coalition of one and $\tfrac{1}{3}$ for a coalition of two.

> [!example]- What are the Shapley values of this driver's three features? {Example}
> A boosted frequency model predicts 15.00 claims per 100 car-years for a driver who is under 25 (feature $A$), lives in an urban territory ($T$) and drives a sports car ($V$). Averaging the model over the portfolio, while the features in $S$ are held at this driver's values, gives these payouts:
>
> | Coalition $S$ | $v(S)$ |
> | :--- | ---: |
> | $\varnothing$ | 6.96 |
> | $\{A\}$ | 10.40 |
> | $\{T\}$ | 7.96 |
> | $\{V\}$ | 8.40 |
> | $\{A, T\}$ | 11.40 |
> | $\{A, V\}$ | 14.00 |
> | $\{T, V\}$ | 9.40 |
> | $\{A, T, V\}$ | 15.00 |
>
> > [!answer]-
> > - Adding $A$ to $\varnothing$, $\{T\}$, $\{V\}$ and $\{T, V\}$ adds 3.44, 3.44, 5.60 and 5.60.
> > - With weights $\tfrac{1}{3}$, $\tfrac{1}{6}$, $\tfrac{1}{6}$ and $\tfrac{1}{3}$, $\phi_A = \tfrac{1}{2}(3.44) + \tfrac{1}{2}(5.60) = 4.52$.
> > - Adding $T$ raises the payout by exactly 1.00 in every coalition, so $\phi_T = 1.00$.
> > - Adding $V$ to $\varnothing$, $\{A\}$, $\{T\}$ and $\{A, T\}$ adds 1.44, 3.60, 1.44 and 3.60.
> > - So $\phi_V = 0.48 + 0.60 + 0.24 + 1.20 = 2.52$.
> > - The values add up to $4.52 + 1.00 + 2.52 = 8.04$, which equals $15.00 - 6.96$.
> > - Age adds 3.44 without the sports car and 5.60 with it, an interaction that the Shapley values share between age and the vehicle.
> > - **The Shapley values are 4.52 for age, 1.00 for territory and 2.52 for the vehicle.**

## Properties of the Shapley value

The Shapley value has four properties, and Shapley (1953) showed that it is the only attribution with all four:

1. *Efficiency*: the values add up to $v(N) - v(\varnothing)$, which is the prediction less the average prediction.
2. *Symmetry*: two features that add the same amount to every coalition get equal values.
3. *Dummy*: a feature that never changes the payout gets zero.
4. *Additivity*: the Shapley values of a sum of models are the sums of their Shapley values.

## SHAP

SHAP (Lundberg and Lee, 2017) applies the Shapley value to a single prediction of a model $\hat{f}$ for a record $\mathbf{x}$. The payout of a coalition is the model's expected prediction when only the features in $S$ are known, which is

> $$v(S) = E\big[\hat{f}(\mathbf{X}) \mid \mathbf{X}_S = \mathbf{x}_S\big]$$

- $\mathbf{X}_S$ and $\mathbf{x}_S$ are the features in $S$ and this record's values of them.

With the average prediction $\phi_0 = E[\hat{f}(\mathbf{X})]$, efficiency gives the prediction as

> $$\hat{f}(\mathbf{x}) = \phi_0 + \sum_{j=1}^{p} \phi_j$$

In practice the unknown features are averaged over a background data set, usually as if they were independent of the known ones. That evaluates the model at combinations that may never occur, such as an 18-year-old with 20 years of driving experience. Averaging them conditionally instead can give credit to a feature the model never uses through its correlation with one it does, so the method is stated with the values. A model with a log link is usually explained on the log scale, where the values add up to the log of the prediction.

In a linear model, each coalition's payout replaces every unknown $x_k$ by its mean $\bar{x}_k$, so adding feature $j$ always changes the payout by the same amount. The Shapley value of feature $j$ is then

> $$\phi_j = \beta_j(x_j - \bar{x}_j)$$

- $\beta_j$ is the coefficient of feature $j$.

> [!example]- What are the Shapley values of this linear model for a young rural driver with prior insurance? {Example}
> A linear pure premium model is $\hat{y} = 200 + 120\,x_Y + 60\,x_U + 0\,x_P$. Here $x_Y = 1$ for a driver under 25, $x_U = 1$ for an urban territory and $x_P = 1$ for a driver with prior insurance. In the portfolio, 25% of drivers are under 25 and 40% are urban. The unknown features are averaged independently.
>
> > [!answer]-
> > - The average prediction is $\phi_0 = 200 + 120(0.25) + 60(0.40) = 254$.
> > - For age, $\phi_Y = 120(1 - 0.25) = 90$.
> > - For territory, $\phi_U = 60(0 - 0.40) = -24$.
> > - The dummy property gives $\phi_P = 0$.
> > - The total $254 + 90 - 24 + 0 = 320$ equals the prediction $200 + 120$.
> > - **The values are 90 for age, $-24$ for territory and 0 for prior insurance.** The negative value says that the rural territory lowers this driver's premium below the average, even though the rural level carries no coefficient.

## Computing Shapley values

The exact formula needs all $2^p$ coalitions, which is practical only for a handful of features. KernelSHAP estimates the values by sampling coalitions, and TreeSHAP computes them exactly for tree ensembles in polynomial time. Averaging $|\phi_j|$ over every record turns the local values into a global [[Variable Importance|variable importance]].

> [!trap] Giving every coalition the same weight
> The weight depends on the size of $S$, so for three features it is $\tfrac{1}{3}$, $\tfrac{1}{6}$, $\tfrac{1}{6}$ and $\tfrac{1}{3}$. Equal weights produce values that in general no longer add up to the prediction less the average.
