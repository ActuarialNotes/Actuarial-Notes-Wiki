---
aliases:
  - Property Catastrophe Risk Load
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:8751ecc61483a31ea24cb40c9841e843633133d13ca193ff1af2fe774bfd6a4a
  sources: []
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Catastrophe Risk Load.md
---
A **catastrophe risk load** is the part of a property account's premium that pays for the [[Catastrophe Risk|catastrophe risk]] it adds to the insurer's portfolio, over and above its expected catastrophe loss. Mango (1998) computes it from [[Catastrophe Modelling|catastrophe model]] output as a multiple of the account's share of portfolio [[Variance|variance]]. The paper shows that the marginal methods depend on the order in which accounts are written, and that an allocation from game theory, the [[Shapley Value|Shapley value]], removes that dependence on renewal.

> $$\text{Var}(L) = \sum_i L_i^2\, p_i (1 - p_i)$$

> $$\text{Cov}(L, n) = \sum_i L_i\, n_i\, p_i (1 - p_i)$$

> $$R_{\text{MV}}(n) = \lambda \big[\text{Var}(n) + 2\,\text{Cov}(L, n)\big]$$

> $$R_{\text{SV}}(n) = \lambda \big[\text{Var}(n) + \text{Cov}(L, n)\big]$$

> $$R_{\text{MS}}(n) = \frac{yz}{1 + y}\,(S_1 - S_0)$$

- **Symbols:** Event $i$ occurs with probability $p_i$, and $L_i$ and $n_i$ are the modeled losses from it to the existing portfolio $L$ and to account $n$. $\lambda$ is the variance multiplier. In the marginal surplus formula, $S_0$ and $S_1$ are the portfolio's standard deviation before and after the account is added, $z$ is the number of standard deviations of surplus held, and $y$ is the required return on that surplus.
- **The event table:** Catastrophe software lists each simulated event with its probability and modeled loss. Mango treats each event as occurring at most once with probability $p_i$, a binomial approximation to a Poisson rate that is close for small $p_i$, and ignores uncertainty in each event's modeled loss.
- **Marginal variance (MV):** Following Meyers (1996), an account is charged $\lambda$ times the increase in portfolio variance it causes. The increase includes the full covariance with the rest of the portfolio, counted twice, because $\text{Var}(L + n) = \text{Var}(L) + \text{Var}(n) + 2\,\text{Cov}(L, n)$.
- **Marginal surplus (MS):** Following Kreps (1990), surplus is $z$ standard deviations of loss less the expected return, and the account is charged the return $y$ on the extra surplus it requires. Mango's illustration uses $y = 20\%$ and $z = 2$, so the multiplier is $0.20 \times 2 / 1.20 = 0.33$.
- **Order dependence:** At build-up, each new account is charged its marginal impact on what is already there, and the loads add up. On renewal, each account is treated as the last one in, and they no longer do. Under MV the covariance is double counted, so the sum exceeds $\lambda\,\text{Var}(\text{portfolio})$ and every account is overcharged. Under MS the square root is sub-additive, so the sum falls short and every account is undercharged.
- **Renewal additivity:** Mango calls a method renewal additive if the renewal loads of all the accounts add up to the load on the portfolio treated as a single account. Neither marginal method is unless an entry order is assumed, and that order could decide whether an account is written.
- **The Shapley value:** Game theory allocates a coalition's total among its players by averaging each player's marginal impact over every order of entry. For variance, the average reduces to the account's own variance plus one times its covariance with the rest, so accounts split their mutual covariance evenly. The method is additive and order independent, and it is as easy to compute as the marginal variance.
- **Covariance share (CS):** Mango generalizes the Shapley value by giving each account a weight on each event's mutual covariance. The CS method uses weights proportional to the accounts' losses in that event, $W_i^X = X_i / (X_i + Y_i)$, so a small account sharing events with a large one takes a small share of the covariance. It is also renewal additive. Mango suggests a marginal method for new accounts and a renewal additive method for renewals.

> [!example]- Building Up and Renewing Two Property Accounts {Example}
> Losses are in \$000s. A catastrophe model produces this illustrative event table for two accounts, and the insurer uses a variance multiplier of $\lambda = 0.0005$ per \$1,000.
>
> | Event | $p_i$ | Account $X$ | Account $Y$ |
> |---|---|---|---|
> | 1 | 0.01 | 400 | 100 |
> | 2 | 0.02 | 200 | 150 |
> | 3 | 0.05 | 50 | 0 |
>
> $X$ is written first and $Y$ second. Find each account's marginal variance risk load at build-up and on renewal, and compare the totals with the portfolio's load.
>
> > [!answer]-
> > With $p_i(1 - p_i)$ equal to $0.0099$, $0.0196$ and $0.0475$:
> > $$
> > \begin{align*}
> > \text{Var}(X) &= 1{,}584.00 + 784.00 + 118.75 \\
> > &= 2{,}486.75 \\
> > \text{Var}(Y) &= 99.00 + 441.00 + 0 \\
> > &= 540.00 \\
> > \text{Cov}(X, Y) &= 396.00 + 588.00 + 0 \\
> > &= 984.00 \\
> > \text{Var}(X + Y) &= 2{,}486.75 + 540.00 + 2(984.00) \\
> > &= 4{,}994.75
> > \end{align*}
> > $$
> > The portfolio load is $0.0005 \times 4{,}994.75 = 2.497$, or \$2,497. At build-up, $X$ is charged its own variance and $Y$ its marginal variance.
> > $$
> > \begin{align*}
> > R_X &= 0.0005 \times 2{,}486.75 \\
> > &= 1.243 \\
> > R_Y &= 0.0005 \times (540.00 + 1{,}968.00) \\
> > &= 1.254
> > \end{align*}
> > $$
> > The two add up to \$2,497, but $Y$, with the smaller expected loss, pays the larger load because it was written second. On renewal, each account is added to a portfolio of the other.
> > $$
> > \begin{align*}
> > R_X &= 0.0005 \times (2{,}486.75 + 1{,}968.00) \\
> > &= 2.227 \\
> > R_X + R_Y &= 2.227 + 1.254 \\
> > &= 3.481
> > \end{align*}
> > $$
> > The renewal loads total \$3,481, which overcharges the portfolio by $0.0005 \times 2 \times 984.00 = 0.984$, or \$984, because the covariance is charged in full to both accounts.

> [!example]- Allocating the Same Load by Shapley Value and Covariance Share {Example}
> For the portfolio in the previous example, allocate the \$2,497 load between $X$ and $Y$ by the Shapley value and by the covariance share method.
>
> > [!answer]-
> > The Shapley value gives each account half of the mutual covariance of $2 \times 984.00 = 1{,}968.00$.
> > $$
> > \begin{align*}
> > R_X &= 0.0005 \times (2{,}486.75 + 984.00) \\
> > &= 1.735 \\
> > R_Y &= 0.0005 \times (540.00 + 984.00) \\
> > &= 0.762
> > \end{align*}
> > $$
> > Under covariance share, $X$ takes $400/500$ of event 1's mutual covariance of $792.00$ and $200/350$ of event 2's mutual covariance of $1{,}176.00$.
> > $$
> > \begin{align*}
> > \text{Share}_X &= 0.8 \times 792.00 + \tfrac{4}{7} \times 1{,}176.00 \\
> > &= 633.60 + 672.00 \\
> > &= 1{,}305.60 \\
> > R_X &= 0.0005 \times (2{,}486.75 + 1{,}305.60) \\
> > &= 1.896 \\
> > R_Y &= 0.0005 \times (540.00 + 662.40) \\
> > &= 0.601
> > \end{align*}
> > $$
> > Both allocations add up to exactly \$2,497 and assume no entry order. Covariance share moves more of the load to $X$, which causes most of the loss in the events the two accounts share. At build-up, $X$ was charged its own variance alone, and its share of the covariance with $Y$ is the extra it carries on renewal, which could not be known before $Y$ was written.

> [!tip]- How it appears on the exam
> - **GI-301:** The objective asks candidates to allocate a property catastrophe risk load among accounts. Expect a small event table of probabilities and modeled losses, from which the candidate computes variances and covariances and then the loads under marginal variance, marginal surplus, the Shapley value or covariance share. Written parts ask why the marginal methods fail renewal additivity, and how build-up and renewal loads differ. The same section covers catastrophe model output and its uses, which supply the event table.

> [!warning]- Exam traps
> - **One covariance or two:** Marginal variance adds $2\,\text{Cov}(L, n)$, and the Shapley value adds $\text{Cov}(L, n)$ once. Using the Shapley formula for a new-account quote, or the marginal formula for an allocation, gives the other method's answer.
> - **The wrong direction of error:** On renewal, marginal variance overcharges the portfolio, because the covariance is double counted, and marginal surplus undercharges it, because the square root is sub-additive. Mixing these up reverses the explanation of renewal additivity.
> - **Using $p_i^2$ in place of $p_i(1 - p_i)$:** Each event contributes $L_i^2\,p_i(1 - p_i)$ to the variance. Writing $L_i^2\,p_i^2$, which squares the event's expected loss, or dropping the $(1 - p_i)$ factor gives the wrong variance.
> - **Covariance share weights by event:** The weights are each account's share of the loss in that event, not its share of expected loss or of variance across all events. An event that hits only one account carries no mutual covariance to share.
