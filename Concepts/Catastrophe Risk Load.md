---
aliases:
  - Property Catastrophe Risk Load
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:462e2ae3c7001045b5eb33fe952d5b08498363c512de2e6ba2d68e844349e77c
  sources: []
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Catastrophe Risk Load.md
---
A **Catastrophe Risk Load** is the part of a property account's premium that pays for the [[Catastrophe Risk|catastrophe risk]] it adds to the insurer's portfolio, over and above its expected catastrophe loss. Mango (1998) computes it from [[Catastrophe Modelling|catastrophe model]] output as a multiple of the account's share of portfolio [[Variance|variance]].

Catastrophe software lists each simulated event with its probability and modeled loss. Mango treats each event as occurring at most once with probability $p_i$, a binomial approximation to a Poisson rate that is close for small $p_i$, and ignores uncertainty in each event's modeled loss. If event $i$ causes loss $L_i$ to the existing portfolio $L$, the variance of $L$ is

> $$\text{Var}(L) = \sum_i L_i^2\, p_i (1 - p_i)$$

If the same event causes loss $n_i$ to account $n$, the covariance of the portfolio and the account is

> $$\text{Cov}(L, n) = \sum_i L_i\, n_i\, p_i (1 - p_i)$$

## Marginal variance method

Following Meyers (1996), the marginal variance (MV) method charges an account $\lambda$ times the increase in portfolio variance it causes. The load is

> $$R_{\text{MV}}(n) = \lambda \big[\text{Var}(n) + 2\,\text{Cov}(L, n)\big]$$

- $\lambda$ is the variance multiplier.

The increase includes the full covariance with the rest of the portfolio, counted twice, because $\text{Var}(L + n) = \text{Var}(L) + \text{Var}(n) + 2\,\text{Cov}(L, n)$.

> [!example]- What are each account's marginal variance loads at build-up and on renewal, and how do their totals compare with the portfolio's load? {Example}
> Losses are in $\$000$s, and the insurer uses $\lambda = 0.0005$ per $\$1{,}000$. Account $X$ is written first and $Y$ second. A catastrophe model produces this event table:
>
> | Event | $p_i$ | Account $X$ | Account $Y$ |
> | :--- | ---: | ---: | ---: |
> | 1 | 0.01 | 400 | 100 |
> | 2 | 0.02 | 200 | 150 |
> | 3 | 0.05 | 50 | 0 |
>
> > [!answer]-
> > - The factors $p_i(1 - p_i)$ are $0.0099$, $0.0196$ and $0.0475$.
> > - $\text{Var}(X) = 1{,}584.00 + 784.00 + 118.75 = 2{,}486.75$.
> > - $\text{Var}(Y) = 99.00 + 441.00 + 0 = 540.00$.
> > - $\text{Cov}(X, Y) = 396.00 + 588.00 + 0 = 984.00$.
> > - $\text{Var}(X + Y) = 2{,}486.75 + 540.00 + 2(984.00) = 4{,}994.75$, so the portfolio load is $0.0005 \times 4{,}994.75 = 2.497$, or $\$2{,}497$.
> > - At build-up, $X$ is charged $0.0005 \times 2{,}486.75 = 1.243$ and $Y$ is charged $0.0005 \times (540.00 + 1{,}968.00) = 1.254$.
> > - These add up to $\$2{,}497$, but $Y$, with the smaller expected loss, pays the larger load because it was written second.
> > - On renewal, each account is added to a portfolio of the other, so $X$ is charged $0.0005 \times (2{,}486.75 + 1{,}968.00) = 2.227$.
> > - The renewal loads total $2.227 + 1.254 = 3.481$, or $\$3{,}481$. That overcharges the portfolio by $0.0005 \times 2 \times 984.00 = \$984$, because the covariance is charged in full to both accounts.

## Marginal surplus method

Following Kreps (1990), the marginal surplus (MS) method holds surplus of $z$ standard deviations of loss less the expected return, and charges the account the return $y$ on the extra surplus it requires. The load is

> $$R_{\text{MS}}(n) = \frac{yz}{1 + y}\,(S_1 - S_0)$$

- $S_0$ and $S_1$ are the portfolio's standard deviation before and after the account is added.
- $z$ is the number of standard deviations of surplus held.
- $y$ is the required return on that surplus.

Mango's illustration uses $y = 20\%$ and $z = 2$, so the multiplier is $0.20 \times 2 / 1.20 = 0.33$.

## Order dependence and renewal additivity

At build-up, each new account is charged its marginal impact on what is already there, and the loads add up. On renewal, each account is treated as the last one in, and they no longer do. Under MV the covariance is double counted, so the sum exceeds $\lambda\,\text{Var}(\text{portfolio})$ and every account is overcharged. Under MS the square root is sub-additive, so the sum falls short and every account is undercharged.

Mango calls a method renewal additive if the renewal loads of all the accounts add up to the load on the portfolio treated as a single account. Neither marginal method is unless an entry order is assumed, and that order could decide whether an account is written. Mango suggests a marginal method for new accounts and a renewal additive method for renewals.

## The Shapley value

Game theory allocates a coalition's total among its players by averaging each player's marginal impact over every order of entry. This is the [[Shapley Value|Shapley value]]. For variance, the average reduces to the account's own variance plus one times its covariance with the rest, so the load is

> $$R_{\text{SV}}(n) = \lambda \big[\text{Var}(n) + \text{Cov}(L, n)\big]$$

The accounts split their mutual covariance evenly. The method is additive and order independent, and it is as easy to compute as the marginal variance.

> [!example]- For the two accounts above, how does the Shapley value allocate the $\$2{,}497$ portfolio load? {Example}
> - The mutual covariance is $2 \times 984.00 = 1{,}968.00$, and each account takes half of it.
> - $R_X = 0.0005 \times (2{,}486.75 + 984.00) = 1.735$, or $\$1{,}735$.
> - $R_Y = 0.0005 \times (540.00 + 984.00) = 0.762$, or $\$762$.
> - The two add up to exactly $\$2{,}497$ with no entry order assumed.

## Covariance share method

Mango generalizes the Shapley value by giving each account a weight on each event's mutual covariance. The covariance share (CS) method weights by the accounts' losses in that event, so account $X$'s weight in event $i$ is

> $$W_i^X = \frac{X_i}{X_i + Y_i}$$

- $X_i$ and $Y_i$ are the losses to accounts $X$ and $Y$ in event $i$.

A small account sharing events with a large one takes a small share of the covariance, and an event that hits only one account carries no mutual covariance to share. The method is also renewal additive.

> [!example]- For the two accounts above, how does the covariance share method allocate the $\$2{,}497$ portfolio load? {Example}
> - The mutual covariance is $2 \times 400 \times 100 \times 0.0099 = 792.00$ in event 1 and $2 \times 200 \times 150 \times 0.0196 = 1{,}176.00$ in event 2.
> - $X$ takes $400/500 = 0.8$ of event 1's and $200/350 = 4/7$ of event 2's, which is $633.60 + 672.00 = 1{,}305.60$.
> - $Y$ takes the remaining $1{,}968.00 - 1{,}305.60 = 662.40$.
> - $R_X = 0.0005 \times (2{,}486.75 + 1{,}305.60) = 1.896$ and $R_Y = 0.0005 \times (540.00 + 662.40) = 0.601$.
> - Both add up to $\$2{,}497$. Covariance share moves more of the load to $X$, which causes most of the loss in the events the two accounts share.

> [!trap] Counting the covariance once or twice
> Marginal variance adds $2\,\text{Cov}(L, n)$, and the Shapley value adds $\text{Cov}(L, n)$ once. Using the Shapley formula for a new-account quote, or the marginal formula for an allocation, gives the other method's answer.
