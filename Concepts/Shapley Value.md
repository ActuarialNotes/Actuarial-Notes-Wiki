---
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:4a0086ab206b8d21ad75c1fc86a8429c5548cf821267be405f227580f7f01265
  sources: []
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Shapley Value.md
---

**Shapley Value** $\phi_j$ is a way of dividing a total payout among the players who produced it: each player receives its marginal contribution, averaged over every order in which the players could have joined. To [[Explainability|explain]] one prediction of a model, the players are the record's $p$ features and the payout is the prediction less the average prediction, so each Shapley value says how far one feature moved this prediction away from the average.

> $$\phi_j = \sum_{S \subseteq N \setminus \{j\}} \frac{|S|!\,(p - |S| - 1)!}{p!}\,\big[v(S \cup \{j\}) - v(S)\big]$$

> $$v(S) = E\big[\hat{f}(\mathbf{X}) \mid \mathbf{X}_S = \mathbf{x}_S\big]$$

> $$\hat{f}(\mathbf{x}) = \phi_0 + \sum_{j=1}^{p} \phi_j$$

- **Symbols:** $N$ is the set of all $p$ features, $S$ is a coalition of features that excludes $j$, and $v(S)$ is the payout the coalition earns. The weight on each term is the probability that, in a random ordering of the $p$ features, exactly the features in $S$ come before $j$, so $\phi_j$ is feature $j$'s marginal contribution averaged over all $p!$ orderings.
- **The four properties:** *Efficiency* means that the values add up to $v(N) - v(\varnothing)$, which is the prediction less the average prediction. *Symmetry* gives equal values to two features that add the same amount to every coalition, the *dummy* property gives zero to a feature that never changes the payout, and *additivity* means that the Shapley values of a sum of models are the sums of their Shapley values. Shapley (1953) showed that his value is the only attribution with all four properties.
- **SHAP:** Lundberg and Lee (2017) apply the Shapley value to a single prediction. The payout $v(S)$ in the second block is the model's expected prediction when only the features in $S$ are known, $\phi_0 = E[\hat{f}(\mathbf{X})]$ is the average prediction, and efficiency then gives the third block. In practice the unknown features are averaged over a background data set, usually as if they were independent of the known ones.
- **Computation:** The exact formula needs all $2^p$ coalitions, which is practical only for a handful of features. KernelSHAP estimates the values by sampling coalitions, and TreeSHAP computes them exactly for tree ensembles in polynomial time. Averaging $|\phi_j|$ over every record turns the local values into a global [[Variable Importance|variable importance]].

> [!example]- Exact Shapley Values for a Three-Feature Frequency Prediction {Example}
> A boosted frequency model predicts 15.00 claims per 100 car-years for a driver who is under 25 (feature $A$), lives in an urban territory ($T$) and drives a sports car ($V$). Averaging the model over the portfolio, while the features in $S$ are held at this driver's values, gives the payouts below. Find the Shapley value of each feature and check efficiency.
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
> > With $p = 3$ the weight is $\frac{0!\,2!}{3!} = \frac{1}{3}$ for the empty coalition, $\frac{1!\,1!}{3!} = \frac{1}{6}$ for a coalition of one and $\frac{2!\,0!}{3!} = \frac{1}{3}$ for a coalition of two. For age, the coalitions without $A$ are $\varnothing$, $\{T\}$, $\{V\}$ and $\{T, V\}$.
> > $$
> > \begin{align*}
> > \phi_A &= \tfrac{1}{3}(10.40 - 6.96) + \tfrac{1}{6}(11.40 - 7.96) \\
> > &\quad + \tfrac{1}{6}(14.00 - 8.40) + \tfrac{1}{3}(15.00 - 9.40) \\
> > &= \tfrac{1}{2}(3.44) + \tfrac{1}{2}(5.60) \\
> > &= 4.52
> > \end{align*}
> > $$
> > Adding $T$ raises the payout by exactly 1.00 in every coalition, so $\phi_T = 1.00$. For the vehicle, the coalitions without $V$ are $\varnothing$, $\{A\}$, $\{T\}$ and $\{A, T\}$.
> > $$
> > \begin{align*}
> > \phi_V &= \tfrac{1}{3}(8.40 - 6.96) + \tfrac{1}{6}(14.00 - 10.40) \\
> > &\quad + \tfrac{1}{6}(9.40 - 7.96) + \tfrac{1}{3}(15.00 - 11.40) \\
> > &= 0.48 + 0.60 + 0.24 + 1.20 \\
> > &= 2.52
> > \end{align*}
> > $$
> > The values add up to $4.52 + 1.00 + 2.52 = 8.04$, which equals $15.00 - 6.96$, so efficiency holds. Age adds 3.44 without the sports car and 5.60 with it, which is an interaction between the two features. The Shapley value shares that joint effect between age and the vehicle instead of leaving it unassigned.

> [!example]- Shapley Values of a Linear Pure Premium Model {Example}
> A linear pure premium model is $\hat{y} = 200 + 120\,x_Y + 60\,x_U + 0\,x_P$, where $x_Y = 1$ for a driver under 25, $x_U = 1$ for an urban territory and $x_P = 1$ for a driver with prior insurance, which the model gives no weight. In the portfolio, 25% of drivers are under 25 and 40% are urban. Find the Shapley values for a young rural driver with prior insurance, averaging the unknown features independently.
>
> > [!answer]-
> > In a linear model, each coalition's payout replaces every unknown $x_k$ by its mean, so adding feature $j$ always changes the payout by $\beta_j(x_j - \bar{x}_j)$. All its marginal contributions are equal and the weights sum to 1, so $\phi_j = \beta_j(x_j - \bar{x}_j)$.
> > $$
> > \begin{align*}
> > \phi_0 &= 200 + 120(0.25) + 60(0.40) \\
> > &= 254 \\
> > \phi_Y &= 120(1 - 0.25) \\
> > &= 90 \\
> > \phi_U &= 60(0 - 0.40) \\
> > &= -24
> > \end{align*}
> > $$
> > The dummy property gives $\phi_P = 0$. The total $254 + 90 - 24 + 0 = 320$ equals the prediction $200 + 120$, so efficiency holds. The negative value says that living in a rural territory lowers this driver's premium below the average, even though the rural level itself carries no coefficient.

> [!tip]- How it appears on the exam
> - **ATPA** lists Shapley values among the tools for communicating and justifying a recommended model, and it asks candidates to explain why a model predicts certain values for certain records. Shapley values answer that second question one record at a time.
> - **Calculation:** The ATPA assessment is a take-home analysis of a data set, so Shapley values there would come from software. Working the formula by hand for two or three features, as in the first example, is how to understand what that software reports and to check its output against efficiency.
> - **Communication:** A task can show Shapley values for one record and ask for a plain-language explanation, or show them for many records and ask what they say about the model as a whole.

> [!warning]- Exam traps
> - **Weights by coalition size:** The weight depends on the size of $S$, so for three features it is 1/3, 1/6, 1/6 and 1/3. Giving every coalition the same weight produces values that in general no longer add up to the prediction less the average.
> - **Relative to the average:** The values add up to the prediction less the average prediction $\phi_0$, not to the prediction itself. A record with a below-average prediction must have negative values that outweigh its positive ones.
> - **Link scale:** A model with a log link is usually explained on the log scale, where the values add up to the log of the prediction. Exponentiating each value gives a multiplicative factor, but those factors are not the Shapley values of the prediction itself, and the two should not be mixed in one explanation.
> - **Correlated features:** Averaging the unknown features independently evaluates the model at combinations that may never occur, such as an 18-year-old with 20 years of driving experience. Averaging them conditionally instead can give credit to a feature the model never uses through its correlation with one it does, so the method should be stated with the values.
