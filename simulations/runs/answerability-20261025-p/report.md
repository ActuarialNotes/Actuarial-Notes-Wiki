# Answerability: Exam P-1 (SOA)

Run `answerability-20261025-p` · 454 questions checked of 626 attempted · cost $70.64

Each question's official solution was broken into the knowledge it uses (by a model that saw no study page), and each item was looked for on the pages the vault gives for the question. An item counts as taught only if a quote of the teaching passage is really on the page; the check is done in code. *Answerable* is necessary, not sufficient: a page can hold the formula and still not teach it well.

| Verdict | Questions | Share |
|---|---|---|
| **Answerable** — everything taught on a tagged page, one link away or on a prerequisite exam's page | 80 | 18% |
| **Untagged** — everything is in the vault, but some of it on a page neither tagged nor linked | 157 | 35% |
| **Gap** — something the solution uses is taught on no page | 217 | 48% |
| Error — the check itself failed (re-run to retry) | 172 | |

Requirements: 1896 — tagged 1011 (53%), linked 151 (8%), prerequisite 2 (0%), elsewhere 424 (22%), missing 308 (16%)
Not checked: 9 off syllabus.

## By sitting

A paper whose gaps far outrun the rest may test a reading the syllabus has since dropped.

| Sitting | Questions | Answerable | Untagged | Gap |
|---|---|---|---|---|
| Undated (samples and the vault's own) | 626 | 80 | 157 | 217 (35%) |

## Gaps, by the page that should teach them

Ranked by how many questions each page's gaps cost. The page is the one named for the item's concept; "no page" means the vault has no page by that name.

### `Concepts/Conditional Probability.md` — 19 question(s)

- `p-021` (procedure): Translate statements such as 'X is k times as likely as Y to die' into relations between conditional probabilities (P[D\|X] = k P[D\|Y]), and express all conditional probabilities in terms of a single unknown parameter that cancels in the final ratio.
- `p-025` (procedure): Translate a statement that one group is k times as likely to have a trait as another into a conditional probability relation, P[S\|C] = k P[S\|C^c], and let the common unknown factor cancel in the Bayes ratio.
- `p-026` (procedure): When told the outcome belongs to a restricted subset of events, restrict the partition in the Bayes denominator to only those events (exclude the other categories), so the conditioning is on accident and membership in the subset.
- `p-091` (procedure): Interpret a policy on a person aged x as conditional on survival to x: the probability of death within n years is P(T < x+n \| T > x), not P(T < x+n).
- `p-094` (fact): Given that a specified roll is the first occurrence of one outcome (e.g. the second roll is the first 6), the earlier rolls are uniform over the remaining outcomes, so each non-excluded face has conditional probability 1/(n-1) on that roll.
- `p-110` (procedure): Read a conditional probability from a two-way table by selecting the row for the given (conditioning) value and the column for the outcome of interest.
- `p-132` (procedure): Convert a group's proportion and a conditional probability into counts by multiplying the total by the proportion (e.g., females = total minus males, females over 25 = conditional probability times number of females).
- `p-135` (fact): A random guess on a true-false question is correct with probability 1/2, while a question whose answer is known is answered correctly with probability 1.
- `p-172` (procedure): To find the possible values of the conditioning variable, identify which values have nonzero conditional probability of producing the observed outcome (here, the observed K=k requires J to be k, k-1, or k-2 given the offsets 0, +1, +2).
- `p-233` (procedure): To find a distribution conditional on an event in sampling without replacement, restrict the population to the cards consistent with the condition (removing excluded categories) and treat the draw as sampling from the reduced population.
- `p-501` (fact): If independent trials share the same success probability, then conditional on the number of successes, the set of successes is equally likely to be any subset of that size, i.e. a simple random sample without replacement from the population.
- `p-528` (procedure): When two conditional probabilities P[A\|B] and P[B\|A] are related, express both with the common numerator P[A ∩ B] and cancel it (valid when it is nonzero) to get a relationship between the marginal probabilities P[A] and P[B].
- `p-533` (fact): When independent trials all share the same success probability, conditioning on exactly k successes among n makes the set of k successful trials equally likely to be any of the C(n,k) subsets, i.e. a simple random sample without replacement, and the common probability drops out.
- `p-540` (fact): Table percentages whose rows each sum to 100% are conditional distributions given the row category, so each entry is P[column \| row] and not a joint probability.
- `p-544` (procedure): To find a probability conditional on an event like N ≥ k for a discrete count, restrict to the qualifying counts and sum their probabilities to get the denominator.
- `p-546` (procedure): Translate a stated test accuracy ('correct with probability p') into conditional probabilities of a positive result: for a condition-present item a correct test is a positive, while for a condition-absent item a correct test is a negative, so P[positive \| absent] = 1 - p.
- `p-548` (procedure): After transferring chips between urns, update the receiving urn's total count and count of each color given the transfer composition, and take the white fraction as the conditional probability of drawing white.
- `p-585` (procedure): To simplify a conditional probability involving two overlapping intervals, intersect the intervals so the numerator event becomes the overlap (for example, (a,b) ∩ (c,d) = (c,b) when a < c < b < d).
- `p-641` (procedure): To find the probability of a specific event together with the condition 'exactly one occurs', note that the joint event reduces to the single case in which that event occurs alone.

### `Concepts/Binomial Distribution.md` — 12 question(s)

- `p-027` (fact): When a shipment contains a very large number of items, the number of defective items in a fixed-size sample can be modeled as binomial with the defect proportion as the success probability (independent trials).
- `p-030` (procedure): The fund is inadequate when the total payment (number of qualifying employees times C) exceeds the fund, so the inadequacy probability is P[X > fund/C].
- `p-031` (fact): When n independent trials each fall into one of several categories with fixed probabilities, the counts in each category follow a multinomial distribution (trinomial for three categories).
- `p-031` (formula): The multinomial probability of counts (n1,...,nk) in n trials is n!/(n1!...nk!) times p1^n1 ... pk^nk.
- `p-039` (procedure): When an event occurs independently in each of several groups with the same probability P, the probability that it occurs in exactly one of two groups is a binomial probability: 2P(1-P).
- `p-178` (fact): When each of n independently selected items falls into one of several categories with fixed probabilities, the items are independent and identically distributed, and the category counts follow a multinomial distribution.
- `p-190` (procedure): Convert a statement about a percentage of items with a property into a count condition on the number of items with the complementary property (e.g., at most 95% error-free out of n means at least 5% of n have errors).
- `p-472` (procedure): To solve for an unknown parameter when one probability is a multiple of another, divide the two probability expressions so common factors cancel, leaving a simple equation in the parameter.
- `p-570` (fact): If each item independently has the same probability of an event, then conditional on exactly k items having the event, the set of k affected items is equally likely to be any k-subset of the n items (a simple random sample without replacement).
- `p-608` (procedure): To find an unknown binomial probability from a stated ratio of two binomial probabilities, write the ratio of the two pmf expressions so that common factors cancel, leaving the binomial coefficients and a power of the odds (1-p)/p, then solve for the odds.
- `p-644` (fact): For independent identical trials, given exactly k successes among n, every subset of k trials is equally likely to be the set of successes, so the conditional probability does not depend on p.
- `p-645` (procedure): To find the probability that the first success occurs in a given trial together with a total success count, require all earlier trials to be failures, the given trial a success, and the remaining required successes to be distributed among the later trials using a binomial count.
- `p-645` (fact): Given exactly k successes in n independent identical trials, all C(n,k) sets of success positions are equally likely, independent of p, so conditional probabilities can be found by counting favorable sets.
- `p-650` (definition): A multinomial distribution with n trials and category probabilities p1,...,pk has joint probability function n!/(x1!...xk!) p1^x1...pk^xk, where x1+...+xk = n and each xi counts the trials resulting in category i.
- `p-650` (fact): In a multinomial distribution with n trials, the count for category i is marginally binomial, so its expected value is n times pi.

### `Concepts/Exponential Distribution.md` — 11 question(s)

- `p-028` (procedure): Calibrate the exponential parameter by setting the CDF at a given time equal to the stated probability (proportion) and solving for lambda, then use that lambda to compute the CDF at another time.
- `p-142` (procedure): To find the exponential rate parameter from a given tail probability P(X > t) = p, set e^{-λt} = p and solve for λ using the natural logarithm, giving λ = -ln(p)/t.
- `p-142` (fact): Exponent rules allow rewriting e^{-λx} as (e^{-λt})^{x/t}, so a known value of e^{-λt} = p gives e^{-λx} = p^{x/t}.
- `p-148` (fact): Calendar year k (k = 0, 1, 2, ...) after the car's purchase at the start of a year corresponds to the interval (k, k+1], so its last quarter is (k + 0.75, k + 1].
- `p-204` (procedure): To find an unknown endpoint, set the interval probabilities equal, solve for the exponential term e^{-r/θ}, and invert it with the natural logarithm to get r = θ ln(1/value).
- `p-214` (procedure): Convert an average event count over a multi-year period into an annual rate by dividing the count by the number of years.
- `p-225` (procedure): To solve an equation of the form 1 - e^{-2λ} = k(1 - e^{-λ}), factor 1 - e^{-2λ} as (1 - e^{-λ})(1 + e^{-λ}) to reduce it to a linear equation in e^{-λ}, then solve for λ.
- `p-492` (procedure): To find an exponential distribution's parameter from a given survival probability at a point, set e^{-λx} equal to the given probability at that point and solve (or substitute) for λ.
- `p-502` (fact): For an exponential distribution, the survival probability over a multiple of a length equals the survival probability over that length raised to that multiple, since e^{-kλx} = (e^{-λx})^k (memoryless property).
- `p-557` (procedure): To find an unknown exponential parameter from a given probability, set the CDF at the stated point equal to that probability and solve for the mean using the natural logarithm.
- `p-559` (procedure): To compare two exponential random variables with related means, use the given survival probability to solve for the unknown mean by taking the natural logarithm, then substitute the derived mean (scaled by the stated ratio) into the other variable's survival function.
- `p-559` (fact): For an exponential distribution, the probability of surviving past time t is the t-th power of the survival probability at time 1, so survival probabilities over k times the horizon equal the k-th power of the base survival probability (S(kt) = S(t)^k).
- `p-559` (fact): Halving the mean of an exponential distribution doubles its rate, which squares its survival probability at any fixed time.
- `p-586` (fact): The loss amounts and the deductible must be expressed in the same units (e.g., thousands) before comparing them or computing probabilities.

### `Concepts/Normal Distribution.md` — 9 question(s)

- `p-068` (fact): The standard normal cumulative probability P(Z <= 2) is approximately 0.9772.
- `p-072` (fact): For a standard normal Z, P(-z ≤ Z ≤ z) = 2Φ(z) − 1 by symmetry.
- `p-140` (procedure): When a z-value falls between table entries, linearly interpolate between the adjacent standard normal table values.
- `p-206` (procedure): Given two known cumulative probabilities of a normal distribution at two points, set up the two equations x1 = μ + z1σ and x2 = μ + z2σ and solve the system for μ and σ.
- `p-509` (fact): The probability that a normal random variable exceeds zero depends only on the ratio of its mean to its standard deviation, P[X>0] = P[Z > -mean/SD]. — *the locator quoted text that isn't on the page:* “P(X < Y) &= P(D < 0) \\ > > &= \Phi\!\left(\frac{0 - 20}{25}\right)”
- `p-556` (procedure): Find the standard normal percentile z_p for a given probability p by looking up the inverse of the standard normal CDF in the normal table.
- `p-591` (procedure): To find a symmetric interval around the mean containing probability p, set Phi(z) - Phi(-z) = p, which gives Phi(z) = (1 + p)/2 by symmetry of the standard normal (each tail holds (1 - p)/2).
- `p-596` (procedure): Two probability statements about a normal variable give two equations in mu and sigma, which can be solved simultaneously (e.g., by dividing one standardized equation by the other to eliminate sigma) to find mu and sigma.
- `p-598` (procedure): With two unknown parameters (mu and sigma), set up two equations from the given information (a moment and a probability) and solve them simultaneously by substitution.

### `Concepts/Deductible.md` — 7 question(s)

- `p-051` (fact): A total loss of a vehicle means the damage equals the vehicle's full value, so the payment is the value minus the deductible.
- `p-155` (procedure): When the deductible's location relative to the discrete loss amounts is unknown, solve piecewise: assume a range for d between consecutive loss amounts, include only the losses exceeding d, solve for d, and verify the solution lies in the assumed range (otherwise reject the case).
- `p-181` (fact): A payment variable over all losses has a point mass at 0 equal to P(X <= d), so its CDF jumps to P(X <= d) at y = 0. — *the locator quoted text that isn't on the page:* “$Y = 0$ whenever $X \le 1{,}000$, so the CDF of $Y$ jumps at zero: > > $$F_Y(0) = P(X \le 1{,}000) = 1 - e^{-0.2} = 0.1…”
- `p-194` (procedure): Translate a condition on total cost into a condition on the discrete count by finding the smallest number of events whose total cost (count times per-event cost) exceeds the deductible.
- `p-448` (fact): A payment after a deductible has a point mass at zero equal to P[X ≤ d], so its distribution is mixed, and for t ≥ 0 the event {payment ≤ t} equals {X ≤ d + t}.
- `p-465` (procedure): The probability that a loss exceeds the deductible d by at least some amount y is P[X > d + y], which is evaluated with the survival function at d + y.
- `p-597` (fact): With a deductible of 0, the expected claim payment equals the expected loss, E[X].

### `Concepts/Expected Value.md` — 7 question(s)

- `p-045` (procedure): To find a benefit amount giving a target expected payment, write the expected payment as the benefit amount times a sum of payment-fraction-weighted interval probabilities, set it equal to the target, and solve for the amount.
- `p-047` (procedure): Model a payment that is zero for the first event and a fixed amount per event thereafter as a function of the count N: payment = amount × (N−1) when N ≥ 1 and 0 when N = 0, i.e. amount × max(N−1, 0).
- `p-047` (procedure): To compute E[max(N−1,0)], extend the sum of (n−1)P(N=n) to include n=0 (equal to E[N−1]) and correct by adding back P(N=0), since E[max(N−1,0)] = E[N] − 1 + P(N=0).
- `p-115` (formula): The expected payment per loss is E[Y] = ∫ over the payment range of (payment) f(x) dx plus the cap amount times P(X > cap point), i.e. ∫_d^{d+m} (x − d) f(x) dx + m·P(X > d+m).
- `p-162` (procedure): A payment that is zero for the first claim and a fixed amount for each subsequent claim is modeled as the fixed amount times (N-1)+ = max(0, N-1), and its expectation is the fixed amount times E[(N-1)+].
- `p-216` (procedure): A payment of a fixed amount per event beyond a deductible number of events equals the amount times (N - d)_+, so its expected value is the amount times E[(N - d)_+].
- `p-216` (formula): For a nonnegative integer-valued N, E[min(N, d)] is computed as the sum over k<d of k·P(N=k) plus d·P(N≥d), or equivalently as the sum over k=0..d-1 of P(N>k).
- `p-601` (formula): The expected payout per loss with deductible d is E[(X-d)+] = the integral from d to infinity of (x-d) f(x) dx, which equals the integral from d to infinity of the survival function S(x) dx.
- `p-650` (fact): Expectation is linear, so E[aX + bY] = aE[X] + bE[Y] regardless of whether X and Y are independent.
- `p-650` (procedure): To find the expected total loss from counts of event types, express total loss as the sum of each event's loss amount times its count, then take the expectation of that expression.

### `Concepts/Poisson Distribution.md` — 7 question(s)

- `p-029` (procedure): To find an unknown distribution parameter from a stated relationship between probabilities (e.g., one probability is a multiple of another), write each probability using the pmf, set up the equation, and solve for the parameter.
- `p-107` (formula): The second raw moment of a Poisson random variable with parameter lambda is E[X^2] = lambda + lambda^2.
- `p-137` (fact): For a Poisson distribution with mean λ, if λ is an integer the distribution has two consecutive modes at λ-1 and λ; if λ is not an integer the single mode is floor(λ).
- `p-463` (procedure): To recover the Poisson mean from P[X = 0], set e^{-lambda} equal to that probability and solve lambda = -ln(P[X = 0]).
- `p-603` (procedure): To find an unknown Poisson mean from a condition on the probability of zero events, set e^{-λ} equal to the stated probability and solve for λ by taking natural logarithms.
- `p-613` (procedure): Translate a stated relation between two Poisson probabilities of zero events into an equation in the parameters (e.g. e^(-λ2) = k·e^(-λ1)) and solve for the unknown parameter by taking natural logarithms.
- `p-639` (procedure): A cumulative probability P[N ≤ k] for a discrete distribution is found by summing the pmf over all values 0 through k.
- `p-639` (procedure): A coverage limit on the number of reimbursed claims means nothing is unreimbursed exactly when the claim count is at most the limit, so the event 'no unreimbursed claims' is {N ≤ limit}.

### **no page for Complement Rule** — 5 question(s)

- `p-132` (fact): The complement rule: the count (or probability) of a category not in a set equals the total minus the count (or probability) in the set, e.g., under 25 = total minus over 25.
- `p-171` (fact): The probability of the union 'A or B' is 1 minus the probability of its complement, 'not A and not B'; here, 'X=0 or Y=0' is the complement of 'X=1 and Y≥1'.
- `p-218` (procedure): Compute the probability of 'at least k' events as the complement of the sum of the probabilities of fewer than k events, e.g. P(N ≥ 2) = 1 − P(N=0) − P(N=1).
- `p-463` (procedure): To find P[X >= 2] for a count variable, subtract the probabilities of the smaller counts from 1: P[X >= 2] = 1 - P[X=0] - P[X=1].
- `p-570` (procedure): To find the probability that at least one of each of two categories occurs, take the complement: subtract the probability that at least one category is entirely absent (the union of the 'category absent' events).

### `Concepts/Combination.md` — 5 question(s)

- `p-090` (definition): The binomial coefficient C(n,k) = n!/(k!(n−k)!) counts the number of ways to choose k items from n without regard to order.
- `p-122` (definition): The binomial coefficient C(n,k) = n!/(k!(n-k)!) counts the number of ways to choose k items from n without regard to order.
- `p-128` (definition): The binomial coefficient C(n,k) = n!/(k!(n−k)!) counts the number of ways to choose k items from n without regard to order.
- `p-570` (procedure): Count the selections that avoid a given category by choosing all k items from the remaining items outside that category, and the selections that avoid both categories by choosing all k from the items in neither category.
- `p-608` (formula): The binomial coefficient is C(n,k) = n! / (k!(n-k)!), so for example C(6,0)=1, C(6,1)=6 and C(6,3)=20.

### `Concepts/Cumulative Distribution Function (CDF).md` — 5 question(s)

- `p-030` (procedure): Find the largest payment amount by computing cumulative probabilities P[X ≤ k] and finding the smallest integer k whose tail P[X > k] is below the threshold, then setting C = fund/k.
- `p-137` (fact): The probability of exceeding K is the complement of the cumulative probability: P(X > K) = 1 - P(X ≤ K), so P(X > K) < p is equivalent to P(X ≤ K) > 1 - p.
- `p-145` (fact): The probability that a total is less than a threshold is the sum of the probabilities of the disjoint events for each admissible total value (cumulative probability).
- `p-231` (definition): An annual loss corresponds to the profit random variable being below zero, so the probability of a loss is P(X < 0).
- `p-600` (fact): For a continuous random variable, P(X < x) equals the CDF F(x), since P(X = x) = 0.

### `Concepts/Independent Events.md` — 5 question(s)

- `p-016` (procedure): To find an unknown event probability, translate the verbal statements into probabilities of events (such as a union and a complement), substitute the independence product for the intersection in the union formula, and solve the resulting equation for the unknown.
- `p-178` (procedure): To find the joint probability that item 1 is of one type and at least one item is of another type, use independence and mutual exclusivity: item 1 cannot itself supply the other type, so multiply P(item 1 of the first type) by the probability that at least one of the remaining items is of the other…
- `p-210` (fact): If events E and F are independent, then P[E ∩ F] = P[E]·P[F], and the same product rule holds for any event paired with the complement of another (e.g., P[E ∩ F^c] = P[E]·P[F^c]). — *the locator quoted text that isn't on the page:* “> $$P(A \cap B) = P(A) \cdot P(B)$$”
- `p-531` (fact): If two events A and B are independent, then P(A∩B) = P(A)P(B), and their complements are also independent. — *the locator quoted text that isn't on the page:* “> $$P(A \cap B) = P(A) \cdot P(B)$$”
- `p-646` (formula): For mutually independent events, the probability that all occur equals the product of their individual probabilities. — *the locator quoted text that isn't on the page:* “> $$P(A_{i_1} \cap A_{i_2} \cap \cdots \cap A_{i_m}) = P(A_{i_1})\,P(A_{i_2}) \cdots P(A_{i_m})$$”

### **no page for Geometric Series** — 4 question(s)

- `p-013` (formula): The sum of an infinite geometric series with first term a and common ratio \|r\| < 1 equals a/(1 − r).
- `p-106` (formula): An infinite geometric series with first term a and common ratio \|r\|<1 sums to a/(1-r).
- `p-108` (formula): The sum of a finite geometric series with first term a and ratio r is a(1 - r^N)/(1 - r), for r not equal to 1.
- `p-148` (formula): A geometric series with common ratio \|r\| < 1 sums to Σ_{k=0}^∞ r^k = 1/(1 - r).

### `Concepts/Discrete Random Variable.md` — 4 question(s)

- `p-116` (fact): For integer-valued X, P(X > N) equals P(X >= N+1).
- `p-153` (fact): For integer-valued counts, 'more than one' means at least two, 'one or more' means at least one, and 'at least k' includes k and above; these thresholds distinguish otherwise similar events.
- `p-159` (fact): For an integer-valued random variable, P(N > x) for non-integer x equals P(N >= ceil(x)), so a strict exceedance of a non-integer mean means at least the next integer.
- `p-460` (fact): The event 'at least one claim' (N > 0) with a maximum of two claims equals the union of the events N = 1 and N = 2, so the claim amount distribution is only defined for these cases.

### `Concepts/Hypergeometric Distribution.md` — 4 question(s)

- `p-122` (formula): The multivariate hypergeometric probability of drawing k1,...,km from groups of sizes N1,...,Nm in a sample of size n is the product of C(Ni,ki) over groups divided by C(N,n).
- `p-149` (procedure): The event that the k-th success occurs exactly on draw n (sampling without replacement) is equivalent to having exactly k-1 successes in the first n-1 draws and a success on draw n.
- `p-456` (procedure): When only one category matters, combine all other categories into a single 'other' group to reduce a multi-category problem to a two-category one.
- `p-594` (formula): Under the multivariate hypergeometric distribution, the probability of drawing k1, k2, ..., km items from groups of sizes K1, ..., Km in a sample of n from N without replacement is the product of C(Ki,ki) divided by C(N,n).
- `p-594` (procedure): To handle conditions like 'no aces or jacks', partition the deck into categories (kings, excluded cards, all other cards) and choose zero cards from the excluded category, with the remaining cards drawn from the other categories to fill the hand size.

### `Concepts/Independent Random Variables.md` — 4 question(s)

- `p-031` (fact): Drawing each individual at random from a large pool makes the draws independent with constant category probabilities equal to the pool proportions.
- `p-187` (procedure): For two independent, identically distributed counts, the probability they are equal is the sum over values k of the squared probability P(N=k)^2.
- `p-211` (procedure): To find the probability that the sum of two independent discrete variables exceeds a value on an event restricted to the first variable, partition on each value of the first variable and use P(N1=i)·P(N2>k−i), by independence.
- `p-211` (fact): For independent random variables, the joint probability of events factors into the product of their individual probabilities.
- `p-653` (procedure): Build the distribution of the sum of two independent discrete random variables by enumerating the outcome combinations that produce each sum and adding their probabilities.

### `Concepts/Joint Probability Function.md` — 4 question(s)

- `p-467` (procedure): To compute a joint expectation from a formula for p(x,y), evaluate the formula at every point in the support to build a table of cell probabilities, and check that they sum to 1.
- `p-467` (fact): In general the expectation of a ratio is not the ratio of expectations, so E[Y/X] must be computed directly from the joint distribution rather than as E[Y]/E[X].
- `p-514` (procedure): Total revenue from selling all available units is modeled as the product of the number of units and the price per unit, so expected revenue is the expected value of that product.
- `p-520` (definition): A joint probability mass function gives the probability of each combination of values of discrete random variables; when probabilities are proportional to a given expression, each probability equals that expression's weight divided by the total of all weights.
- `p-606` (procedure): Evaluate a joint probability function formula at each support point (x,y) to build the table of joint probabilities, using a common denominator.

### `Concepts/The Law of Total Probability.md` — 4 question(s)

- `p-015` (fact): The event that a sum of nonnegative integer-valued random variables equals k is the disjoint union of the events {N1=i, N2=k−i} for i=0,...,k, so their probabilities can be added.
- `p-154` (procedure): When conditional probabilities are related by stated multiples, express them all in terms of one unknown base conditional probability, then solve for it using the total probability equation.
- `p-199` (fact): For mutually exclusive categories, the probability of a union of categories given an event is the sum of the individual categories' conditional probabilities given that event.
- `p-647` (procedure): To find an unknown mixing probability (e.g., P[Heads]), express a given probability or CDF value as a function of that parameter via total probability and solve the resulting equation for it, then substitute it into the target probability.

### `Concepts/Uniform Continuous Distribution.md` — 4 question(s)

- `p-442` (procedure): To find the unknown endpoints of a uniform distribution, write the given tail probabilities as equations in a and b and solve the resulting system simultaneously.
- `p-473` (formula): For a uniform random variable on [0, a], the mean is a/2 and the second moment is a^2/3.
- `p-610` (fact): A solution of a quadratic equation that lies outside the support of the loss distribution (e.g., a limit above the maximum possible loss) is not valid and is discarded.
- `p-616` (formula): The sum of the first n squares 1^2 + 2^2 + ... + n^2 equals n(n+1)(2n+1)/6, and the sum of the first n integers equals n(n+1)/2.

### **no page for Bernoulli Distribution** — 3 question(s)

- `p-177` (formula): A Bernoulli random variable with success probability p has variance p(1-p).
- `p-177` (procedure): Model a payment that depends on whether each of several events occurs as a linear combination of indicator (Bernoulli) random variables, with each payment amount as the coefficient of its indicator.
- `p-466` (definition): A Bernoulli random variable (indicator) takes only the values 0 and 1, with P(X=1)=p and mean p.
- `p-466` (formula): The variance of a Bernoulli random variable with success probability p is p(1-p), so its standard deviation is sqrt(p(1-p)).
- `p-631` (fact): A Bernoulli random variable with success probability p has mean p and variance p(1−p); a 0/1-valued random variable is Bernoulli.

### **no page for Fundamental Counting Principle** — 3 question(s)

- `p-097` (fact): Multiplication rule: if a selection is made in successive stages with m1, m2, ... choices at each stage, the total number of outcomes is the product m1*m2*....
- `p-185` (fact): The multiplication principle: when a selection is made in successive stages, the total number of outcomes is the product of the number of choices at each stage.
- `p-524` (fact): When selections are made independently from disjoint categories, the total number of selections is the product of the number of ways for each category (multiplication rule).

### **no page for Piecewise Density Functions** — 3 question(s)

- `p-043` (procedure): When the density involves an absolute value, split the integral at the point where the expression inside the absolute value changes sign and replace \|x\| with -x for x<0 and x for x>0 on the respective pieces.
- `p-443` (procedure): To integrate a function against a piecewise-defined density, split the integral at every breakpoint of both the density and the integrand, and on each subinterval use the matching branch of each.
- `p-571` (procedure): For a density defined with an absolute value, split the integral at the point where the argument changes sign and replace \|x\| with -x on the negative piece and x on the positive piece.

### `Concepts/Limited Expected Value.md` — 3 question(s)

- `p-057` (formula): For a capped variable Y = min(X, u), the k-th moment is E[Y^k] = ∫_0^u x^k f(x) dx + u^k P(X > u).
- `p-219` (procedure): To find an unknown deductible, set the expression for E[min(X,d)] equal to the given expected retained amount, solve the resulting quadratic in d, and keep the root lying within the loss support [0, θ].
- `p-563` (procedure): To compute the expected value of a limited loss, split the expectation at the limit: integrate x·f(x) from 0 to d and add d times the survival probability P(X > d).

### `Concepts/Linear Combinations of Random Variables.md` — 3 question(s)

- `p-527` (procedure): When given variances of several linear combinations of X and Y, expand each with the variance formula to get a system of equations in the unknown variance and covariance, then solve the system simultaneously.
- `p-575` (definition): Overall profit being positive over a period means the total (sum) of the period's profits, with losses counted as negative values, exceeds zero.
- `p-588` (fact): The time until the nth failure when failed items are replaced immediately is the sum of the n individual lifetimes.

### `Concepts/Percentile.md` — 3 question(s)

- `p-484` (procedure): To find an unknown distribution parameter from a condition equating percentiles of two distributions, compute each percentile as a function of the parameters, set them equal, and solve for the unknown, then substitute it into dependent parameters.
- `p-523` (procedure): To match percentiles of two distributions, set the two percentile expressions equal (same loss amount), express each in terms of its own mean, standard deviation and z-value, and solve for the unknown percentile, noting that common parameters like k cancel.
- `p-593` (fact): Percentiles of a normal distribution are not proportional to the values they mark, because the normal cdf is nonlinear.

### `Concepts/Probability Density Function (PDF).md` — 3 question(s)

- `p-143` (fact): A density specified only up to proportionality has a normalizing constant that does not affect the location of its maximum, so the mode can be found by maximizing the unnormalized kernel.
- `p-144` (fact): A density given only as proportional to a function has a constant of proportionality that does not affect the location of its maximum, so the mode can be found from the unnormalized function.
- `p-601` (fact): When the density is zero below a threshold, the integral for the expected payout starts at the larger of the deductible and the threshold; here the deductible exceeds the threshold, so the integration begins at the deductible.

### `Concepts/Probability Mass Function (PMF).md` — 3 question(s)

- `p-013` (procedure): A recursive relation p(n+1) = r·p(n) between successive probabilities can be solved by iterating it to get p(n) = r^n · p(0).
- `p-569` (fact): The probability that a count is less than two equals the sum of the probabilities that it equals zero and equals one, since these outcomes are mutually exclusive.
- `p-602` (procedure): Translate verbal ratio conditions between probabilities of outcomes (e.g., 'P of A is k times P of B') into equations, and express all probabilities in terms of one unknown by chaining the ratios.

### `Concepts/Venn Diagram.md` — 3 question(s)

- `p-182` (procedure): Partition the union of several events into disjoint regions of a Venn diagram (only one set, exactly two sets, all three sets) and assign an unknown count to each region.
- `p-183` (procedure): Partition the union of three sets into seven disjoint regions (only one set, exactly two sets, all three) and express each set's total count as the sum of its regions.
- `p-183` (procedure): Translate verbal conditions (such as 'x more own only L than only A' and 'total owning exactly one type') into linear equations among the region counts and solve the resulting system.
- `p-445` (procedure): Partition the union of three events into seven disjoint Venn regions (only one, exactly two, all three) plus the region outside all events, and set up equations for each event's total as the sum of its regions.
- `p-445` (fact): The size of each event equals the sum of its 'only' region, the region common to all three events, and the two 'exactly two' regions that overlap it.

### **no page for Conditional Expectation** — 2 question(s)

- `p-208` (definition): The mean lifetime given survival less than a limit is a conditional expectation E[T \| T < c] = E[T·1(T<c)] / P(T<c).
- `p-218` (formula): The conditional expectation of N given an event A is E[N \| A] = E[N · 1_A] / P(A); for N ≥ 2 this equals (E[N] − Σ_{k<2} k·P(N=k)) / P(N ≥ 2).
- `p-218` (procedure): To find the mean of a discrete variable conditioned on N ≥ 2, subtract the contributions of the excluded values (0·P(N=0) + 1·P(N=1)) from the unconditional mean and divide by P(N ≥ 2).

### **no page for Convolution of Independent Random Variables** — 2 question(s)

- `p-015` (procedure): The distribution of a sum of two independent discrete random variables is found by convolution: P[X+Y=k] = sum over i of P[X=i]·P[Y=k−i], with the sum running over all i from 0 to k when both variables take nonnegative integer values.
- `p-569` (procedure): To find the probability that a total count across two independent groups equals a given value, enumerate the ways the count can be split between the groups (e.g., one loss total is one from group A and none from B, or none from A and one from B) and add the probabilities of these mutually exclusive…

### **no page for Discrete Uniform Distribution** — 2 question(s)

- `p-113` (fact): Rolling two fair dice gives 36 equally likely ordered outcomes (6 × 6), each with probability 1/36.
- `p-134` (fact): When each of two independent choices is made uniformly at random from n integers, all n^2 ordered pairs are equally likely, so the probability of an event is the number of favorable pairs divided by n^2.

### **no page for Independence of Events** — 2 question(s)

- `p-010` (definition): Two events A and B are independent if and only if P(A ∩ B) = P(A)P(B). — *the locator quoted text that isn't on the page:* “> $$P(A \cap B) = P(A) \cdot P(B)$$”
- `p-010` (fact): If events A and B are independent, then their complements are also independent, so P(A^c ∩ B^c) = P(A^c)P(B^c).
- `p-120` (definition): Two events A and B are independent if and only if P(A ∩ B) = P(A)P(B). — *the locator quoted text that isn't on the page:* “> $$P(A \cap B) = P(A) \cdot P(B)$$”

### **no page for Linearity of Expectation** — 2 question(s)

- `p-098` (fact): Expectation is linear: the expected total over several periods or several policyholders is the sum of the individual expected values, even without independence.
- `p-178` (fact): The expected value of a sum of indicator variables equals the sum of their expectations (linearity of expectation), and E[indicator] equals the probability of the event; this also holds for conditional expectations.

### **no page for Logarithm Properties** — 2 question(s)

- `p-161` (procedure): Solve for an unknown exponent in an equation of the form r^k = p by taking logarithms of both sides, giving k = ln(p)/ln(r).
- `p-599` (fact): The difference of logarithms equals the logarithm of the ratio: ln a - ln b = ln(a/b).

### **no page for Parity of Integers** — 2 question(s)

- `p-120` (fact): The sum of two integers is odd exactly when one is odd and the other is even; the sum is even when both are odd (or both even).
- `p-138` (fact): The sum of two integers is odd exactly when one is even and the other is odd (opposite parity).

### **no page for Pigeonhole Principle** — 2 question(s)

- `p-185` (procedure): To bound the number of trials before a repeat of a specified outcome type must occur, count the distinct possible outcome types; by the pigeonhole principle, the maximum run without a repeat equals that count.
- `p-197` (fact): With n distinct colors each having a pair, drawing socks one at a time until a match occurs requires at most n+1 draws, because after n draws of distinct colors the next sock must match one already drawn.

### **no page for Probability of Events** — 2 question(s)

- `p-008` (procedure): Translate a verbal description of event probabilities (both, neither, one exceeds the other by a constant) into probability equations on events, then substitute into the union formula and solve for the unknown probability.
- `p-643` (fact): The phrase "not more than n" means X ≤ n, so the value n itself is included in the event.

### **no page for Sums of Independent Random Variables** — 2 question(s)

- `p-241` (procedure): The ending value of a investment equals the initial value plus the sum of the periodic changes, so a probability about the final value is converted into a probability about the sum of changes.
- `p-490` (procedure): To find the probability of a total count across independent groups, enumerate the disjoint ways the group counts can sum to that total, and add the probabilities of those cases.

### **no page for Survival Function** — 2 question(s)

- `p-091` (definition): The survival function is S(t) = P(T > t) = 1 - F(t), where F is the cumulative distribution function of the lifetime T.
- `p-576` (definition): The event that a lifetime fails within t months is {X < t}, and that it is still working after a months is the survival event {X > a}, with survival probability P(X > a) = 1 − F(a).

### **no page for Symmetric Distributions** — 2 question(s)

- `p-224` (fact): If a density is symmetric about a point m, then f(m+x)=f(m-x), so the density on the far side is the reflection of the density on the near side and exactly half the probability lies on each side of m.
- `p-495` (fact): If a density is symmetric about a point c (and has finite mean), then the mean of the distribution equals c.

### **no page for Uniform Distribution** — 2 question(s)

- `p-109` (fact): Dividing a uniform random variable on [0, b] by a constant c gives a uniform random variable on [0, b/c].
- `p-237` (procedure): Translate a waiting-time condition into a range of arrival times: a vehicle arriving during a blockage waits until the blockage ends, so waiting time exceeding a threshold means arriving in the early part of the blockage window (before the end minus the threshold).

### `Concepts/Geometric Distribution.md` — 2 question(s)

- `p-503` (procedure): To find an unknown success probability from a given probability that the first success occurs on trial k, set the geometric pmf equal to the given value and solve the resulting polynomial equation for p.
- `p-538` (fact): The geometric probability mass function is strictly decreasing in n, so its mode is always the smallest support value regardless of p.

### `Concepts/Inclusion-Exclusion Principle.md` — 2 question(s)

- `p-014` (fact): When each outcome belongs to exactly two of the listed events, summing the individual event probabilities counts each outcome twice, so the total of the individual probabilities equals twice the probability of the union of the outcomes.
- `p-087` (procedure): Translate 'exactly two of the three products' into the sum of pairwise intersection probabilities when the triple intersection is empty, so that the sum of pairwise intersections equals the given percentage.

### `Concepts/Negative Binomial Distribution.md` — 2 question(s)

- `p-041` (fact): The event that at least r successes occur before the s-th failure in independent trials is equivalent to having at least r successes in the first r+s-1 trials.
- `p-558` (fact): In the negative binomial probability, the binomial coefficient counts arrangements only among the first n-1 trials because the final trial must be a success; using C(n, r) instead counts a different event (exactly r successes anywhere in n trials).

### `Concepts/Order Statistics.md` — 2 question(s)

- `p-079` (fact): The maximum of several random variables is less than or equal to a value x if and only if every one of the variables is less than or equal to x.
- `p-179` (definition): The second largest of a set of selected integers is the order statistic such that exactly one selected value lies above it and the remaining selected values lie below it.
- `p-179` (fact): The support of the second largest of four values drawn from 1..n requires at least 2 values below x and at least 1 above, so p(x)>0 only for x from 3 to n-1.

### `Concepts/Permutation.md` — 2 question(s)

- `p-097` (procedure): Count sequential choices with restrictions: for each successive column, the number of allowed rows is the total rows minus the rows already used by earlier selections.
- `p-549` (procedure): To count arrangements where certain items must be adjacent, treat them as a single block, arrange the resulting units, and multiply by the number of internal orderings of the block.

### `Concepts/Policy Limit.md` — 2 question(s)

- `p-061` (procedure): To find the median of a capped variable Y = X ∧ u, compute the median of X; if it is below u, it is also the median of Y, otherwise the median of Y equals u.
- `p-131` (procedure): To find the CDF of a capped variable X = min(Y, u), for x below u the event {X ≤ x} equals {Y ≤ x} so F_X(x) = F_Y(x), and for x ≥ u, F_X(x) = 1.

### **no page for Absolute Value** — 1 question(s)

- `p-113` (definition): The absolute value \|a − b\| is the nonnegative distance between a and b, so \|D1 − D2\| = k means the dice differ by k in either order.

### **no page for Absolute Value Function** — 1 question(s)

- `p-443` (definition): The absolute value \|x - a\| equals a - x when x < a and x - a when x ≥ a, so it is a piecewise function that changes form at x = a.

### **no page for Aggregate Loss Distribution** — 1 question(s)

- `p-544` (procedure): Given N claims, the distribution of aggregate claims is found by enumerating the possible combinations of the independent claim sizes (e.g., via a binomial count of each size) and multiplying their probabilities.

### **no page for Area of a Circle** — 1 question(s)

- `p-513` (fact): The area of a circle centered at the origin is pi times the square of its radius (A = pi r^2), so a random radius gives a random area that is a nonlinear function of the radius.

### **no page for Binomial Coefficient** — 1 question(s)

- `p-500` (formula): The binomial coefficient C(n,k) = n!/(k!(n-k)!) counts the number of ways to choose k items from n.

### **no page for Change of Variables (u-Substitution) in Integration** — 1 question(s)

- `p-052` (procedure): To integrate a function of (1+x), use a change of variables u = 1+x, which shifts the integration limits accordingly and rewrites x as u-1 so the integrand becomes a sum of power terms.

### **no page for Circular Permutations** — 1 question(s)

- `p-549` (fact): In a circular arrangement each seat has exactly two neighbouring seats (one on each side).
- `p-549` (formula): The number of distinct arrangements of n distinct objects around a circle, counted up to rotation, is (n-1)!.

### **no page for Classical Probability** — 1 question(s)

- `p-135` (procedure): If a student knows N of n questions, the probability that a randomly chosen question is one he knows is N/n.

### **no page for Complement of an Event** — 1 question(s)

- `p-009` (fact): Because every customer insures at least one car, the complement of 'insures more than one car' is 'insures exactly one car'.

### **no page for Compound Distributions** — 1 question(s)

- `p-145` (procedure): Convert a cost threshold into a condition on the total number of claims by dividing by the per-claim cost and finding the largest count whose total cost stays below the threshold.

### **no page for Conditional Distributions** — 1 question(s)

- `p-089` (procedure): To identify a conditional distribution, fix the conditioning variable in the joint pmf, drop factors that do not depend on the remaining variable (treating them as a normalizing constant), and recognize the remaining kernel as a known distribution.

### **no page for Conditional Independence** — 1 question(s)

- `p-468` (fact): If events are independent given a class, the joint probability of both events within that class is the product of their conditional probabilities, so P[A ∩ B] = Σ P[A\|class] P[B\|class] P[class].
- `p-468` (fact): Events that are independent conditional on a risk class are generally not unconditionally independent, because observing one event updates the probability of each class.

### **no page for Contingency Tables** — 1 question(s)

- `p-132` (procedure): Build a two-way contingency table (e.g., gender by age group) and fill in missing cells using row and column totals by subtraction, since categories partition the population.

### **no page for Convolution of Discrete Random Variables** — 1 question(s)

- `p-145` (procedure): To find the probability that a sum of independent discrete variables equals a value, enumerate all combinations of individual outcomes that sum to it, and count the ways to assign outcomes to specific individuals using binomial coefficients (multinomial counting).

### **no page for Counting Methods** — 1 question(s)

- `p-134` (procedure): Count pairs with \|X - Y\| <= k by fixing X and counting the valid Y values in the range, which is 2k+1 for interior X and fewer near the endpoints because the range is truncated at the boundaries.

### **no page for Counting Principles** — 1 question(s)

- `p-097` (fact): Selecting three items with no two sharing a row or column requires them to lie in three distinct columns, so one first chooses which columns are used.

### **no page for Counting Principles and Combinations** — 1 question(s)

- `p-203` (procedure): To find the probability that the second smallest of four integers drawn without replacement from 1..N equals x, count the selections by choosing 1 value from those below x and 2 values from those above x, with x included.

### **no page for Counting with Constrained Selections** — 1 question(s)

- `p-524` (procedure): When the specified category counts in a selection sum to less than the group size, the remaining members must be chosen from the leftover category (those with none of the attributes), adding a combination factor for them.

### **no page for Deductibles and Conditional Loss Distributions** — 1 question(s)

- `p-222` (procedure): To find a percentile of the conditional distribution given X > d, set P(X>k) = (1-p)·P(X>d) and solve for k, which gives P(X ≤ k) = 1 - (1-p)·P(X>d).

### **no page for Derangements** — 1 question(s)

- `p-193` (definition): A derangement is a permutation of n items in which no item remains in its original position; the number of derangements of n items is denoted D_n (e.g., D_4 = 9).
- `p-193` (formula): The number of derangements of n items is D_n = n! * sum_{k=0}^{n} (-1)^k / k!, so the probability that a random permutation of n items has no fixed point is D_n / n!.

### **no page for Differentiation Rules (Product and Chain Rule)** — 1 question(s)

- `p-144` (formula): The derivative of e^{g(x)} is g'(x) e^{g(x)} (chain rule), and the product rule gives d/dx[u v] = u'v + u v'.

### **no page for Discrete Probability Distributions** — 1 question(s)

- `p-118` (procedure): For a discrete distribution given as a probability table, obtain the probability of each payout value by summing the probabilities of all intervals that map to that same payout.

### **no page for Discretization of Continuous Random Variables** — 1 question(s)

- `p-109` (procedure): For a rounded (discretized) continuous variable, the probability of each integer value equals the probability that the original variable falls in the interval of width 1 centered at that integer, with endpoint values (0 and the maximum) getting only half-width intervals.

### **no page for Equally Likely Outcomes** — 1 question(s)

- `p-549` (fact): When people are seated randomly, every seat is equally likely for a given person, so the position of one person can be fixed by symmetry and the other person is equally likely to occupy any remaining seat.

### **no page for Equally Likely Outcomes (Discrete Sample Space)** — 1 question(s)

- `p-138` (fact): When two fair dice are tossed, the 36 ordered pairs of outcomes are equally likely, so probabilities can be found by counting favorable pairs.

### **no page for Events Defined by Intervals of a Random Variable** — 1 question(s)

- `p-607` (definition): For a continuous random variable such as call duration T, the probability that T falls in a half-open interval [a, b) is the probability mass between a and b, and adjacent intervals [a, b) and [b, c) partition [a, c).

### **no page for Events and Sample Space** — 1 question(s)

- `p-476` (definition): Inequality phrases such as 'at least k' mean values ≥ k and 'no more than k' mean values ≤ k, which determine which rows or columns of the table are included.

### **no page for Events and Sample Spaces** — 1 question(s)

- `p-134` (procedure): Translate a condition on the difference of two numbers (e.g., not differing by more than k) into the absolute-value inequality \|X - Y\| <= k, and count the integer pairs satisfying it.

### **no page for Exactly One Event Occurring** — 1 question(s)

- `p-188` (procedure): To find the probability of exactly one of several coverages or events, decompose it into mutually exclusive 'only A' and 'only B' cases and add their probabilities, computing each 'only' probability as P(A)P(not B) when independent.

### **no page for Exchangeability and Symmetry** — 1 question(s)

- `p-178` (fact): By symmetry among exchangeable identical independent items, each item has the same conditional probability of an event given a symmetric conditioning event, so the conditional expected count equals n times the conditional probability for one item.

### **no page for Expected Value of a Discrete Random Variable** — 1 question(s)

- `p-081` (formula): The expected value of a payment that is a fixed amount paid with probability p is the amount times p, and expected excess of premiums over claims equals total premiums minus expected claims.

### **no page for Expected Value of a Function of Random Variables** — 1 question(s)

- `p-651` (procedure): The unreimbursed portion of a loss is the loss times (1 minus the reimbursement percentage); a fully reimbursed loss contributes zero unreimbursed amount, so the total expected unreimbursed loss is the sum of the expected unreimbursed portions of each period's loss.

### **no page for Expected Value of a Function of a Random Variable** — 1 question(s)

- `p-086` (formula): The mean of a function g(X) of a continuous random variable is E[g(X)] = ∫ g(x) f(x) dx, and the second moment is E[g(X)^2] = ∫ g(x)^2 f(x) dx, integrated over the support of X.

### **no page for Functions of Random Variables** — 1 question(s)

- `p-169` (procedure): Express the quantity of interest as a function of the random variables (here, the number of tornadoes with losses below the threshold equals the total count minus the count at or above the threshold, Y − X).

### **no page for Gamma Distribution** — 1 question(s)

- `p-474` (fact): The sum of independent exponentials with different means is not gamma distributed; gamma applies only when the exponentials are identically distributed, so the variance must be built from the separate components.

### **no page for Geometric Mean** — 1 question(s)

- `p-485` (procedure): To solve for an unknown percentile level from an equal-ratio condition x/y = y/z, cross-multiply to get y^2 = xz (y is the geometric mean of x and z) and solve for y.

### **no page for Indicator Random Variables** — 1 question(s)

- `p-466` (fact): For two indicator variables, the product XY is itself an indicator equal to 1 only when both events occur, so E[XY] = P(X=1, Y=1), the joint probability.

### **no page for Insurance Payout Functions (Deductibles and Policy Limits)** — 1 question(s)

- `p-118` (procedure): Translate a policy payout rule (a fixed amount per full unit of loss above a threshold, subject to a policy maximum) into a payout random variable defined on each range of the underlying variable, using the floor of the excess divided by the unit and capping at the maximum.

### **no page for Integration by Substitution** — 1 question(s)

- `p-508` (procedure): To integrate a function of the form x·g(1+x²), use u-substitution with u = 1 + x² (du = 2x dx), converting it into a power-rule integral and adjusting the limits of integration.

### **no page for Interquartile Range** — 1 question(s)

- `p-464` (definition): The interquartile range is the difference between the 75th and 25th percentiles.

### **no page for Intersection of Events** — 1 question(s)

- `p-120` (procedure): To find the probability of an intersection of events, rewrite the combined condition in terms of equivalent simpler events (e.g., 'first odd and sum odd' becomes 'first odd and second even') and compute its probability, or recognize an empty intersection as probability 0.

### **no page for Joint Distribution of Discrete Random Variables** — 1 question(s)

- `p-110` (procedure): To find the probability that a sum of two discrete random variables equals a given value, enumerate all pairs of outcomes that sum to that value and add their joint probabilities.

### **no page for Joint Distributions of Discrete Random Variables** — 1 question(s)

- `p-173` (procedure): To condition on a sum of two discrete random variables taking a given value, list all joint outcome pairs whose components add to that value and sum their joint probabilities to get the probability of the conditioning event.

### **no page for Joint Probability Distribution** — 1 question(s)

- `p-627` (procedure): To find the probability of an event defined on X (such as X < k) from a joint probability table, sum the joint probabilities over all X values in the event, giving P(A) and the combined joint probabilities for each y.

### **no page for Law of Total Expectation** — 1 question(s)

- `p-049` (procedure): When a loss occurs only with some probability and its severity has a conditional distribution given a loss, the unconditional expected payment equals the loss probability times the conditional expected payment given a loss (conditioning on whether a loss occurs).

### **no page for Linear Transformation of a Random Variable** — 1 question(s)

- `p-055` (procedure): A percentage increase of p applied to every cost is modeled as multiplying the random variable by the factor (1 + p), i.e., Y = (1 + p)X.

### **no page for Logarithms** — 1 question(s)

- `p-108` (procedure): To solve an inequality of the form c·r^N < k for the smallest integer N, take logarithms of both sides (reversing the inequality when dividing by ln r < 0 for 0<r<1) and round up to the next integer.

### **no page for Moments of a Discrete Random Variable** — 1 question(s)

- `p-629` (fact): Taking a square root of a squared unknown yields two roots, and a stated sign restriction on the parameter (e.g., negative) selects the valid one, since E(Y^2) alone cannot reveal the sign.

### **no page for Multiplication Principle of Counting** — 1 question(s)

- `p-179` (procedure): To count the outcomes where a given value x is the j-th largest, fix x in the selection, choose the required number of values from those greater than x and the required number from those less than x, and multiply the counts (multiplication principle).

### **no page for Optimization Using Derivatives** — 1 question(s)

- `p-171` (procedure): To maximize a differentiable function of a parameter, set its first derivative to zero, solve for the parameter, and check that the solution lies in the feasible range (probabilities nonnegative).

### **no page for Optimization of a Single-Variable Function** — 1 question(s)

- `p-458` (procedure): To minimize a variance that is a function of an allocation variable, express the total as a function of one variable (using the budget constraint), differentiate, set the derivative to zero, and solve.

### **no page for Parity of Integer Sums** — 1 question(s)

- `p-530` (fact): The sum of even integers is always even, so an odd target sum is impossible (probability zero) when all possible values of the summands are even.

### **no page for Percentages and Counts of Subpopulations** — 1 question(s)

- `p-090` (fact): The expected number of defective items in a subpopulation equals its size times its defective proportion, and defective counts from disjoint sources add to give the total defective count in the population.

### **no page for Percentiles of a Distribution** — 1 question(s)

- `p-224` (procedure): To locate a percentile beyond the median of a symmetric distribution, determine which side of the center it lies on by comparing p to 0.5, then set the probability between the center and the percentile equal to p minus 0.5 and solve for the percentile.

### **no page for Piecewise Defined Distributions** — 1 question(s)

- `p-207` (procedure): For a piecewise-defined CDF, evaluate the piece whose domain contains the point of interest; at a boundary point, use the piece that includes that point (for a continuous variable, F is continuous so either piece gives the same value).

### **no page for Piecewise Probability Density Function** — 1 question(s)

- `p-491` (procedure): For a piecewise-defined density, compute the expected value by integrating x f(x) over each piece on its own interval and summing the results.

### **no page for Policy Limits and Coverage Limits** — 1 question(s)

- `p-551` (procedure): Translate a coverage limit into an event on the count: if only the first m events are covered, an uncovered event occurs exactly when the count exceeds m (X >= m+1).

### **no page for Power Function Distribution** — 1 question(s)

- `p-161` (formula): For a density proportional to x^a on (0, b), the CDF is F(x) = (x/b)^(a+1) for 0 < x < b.

### **no page for Prior Probability** — 1 question(s)

- `p-506` (fact): When the alternating assistants work equally often (alternate days), the prior probability that each is the one working on a given day is 1/2.

### **no page for Probability Axioms** — 1 question(s)

- `p-620` (definition): The event 'more than k' occurrences means at least k+1 occurrences, so its probability sums the probabilities of exactly k+1, k+2, ..., n occurrences.

### **no page for Probability Axioms and Complement Rule** — 1 question(s)

- `p-060` (fact): The probability of at least k events is found by the complement rule: subtract the probabilities of all outcomes below k from 1.

### **no page for Probability Axioms and Parameter Constraints** — 1 question(s)

- `p-503` (fact): When solving for a probability parameter yields multiple roots in [0,1], use any stated constraint on the parameter (such as p < 0.5) to select the valid root.

### **no page for Probability Function** — 1 question(s)

- `p-470` (procedure): Compute the probability of a tail event for a discrete variable as the complement: P(X > k) = 1 minus the sum of P(X = x) for x = 0 through k.

### **no page for Probability of Complement and Set Difference** — 1 question(s)

- `p-607` (fact): If event B is a subset of event A, then P(A \ B) = P(A) - P(B). — *the locator quoted text that isn't on the page:* “$A^c \cap B$ is the part of $B$ that does not overlap $A$: > > $$P(A^c \cap B) = P(B) - P(A \cap B) = 0.5 - 0.2 = 0.3$$”

### **no page for Probability of Events (Subset Property)** — 1 question(s)

- `p-191` (fact): If A∩C is empty, then any intersection that also includes A and C, such as A∩B∩C, is a subset of it and has probability 0.

### **no page for Probability of Events Using Set Operations** — 1 question(s)

- `p-607` (procedure): To find the probability of a target region that cannot be obtained directly, express it as a set difference of unions of the given intervals (e.g., a large union of disjoint intervals minus a nested union) rather than solving for each individual interval's probability.

### **no page for Probability of Unions of Disjoint Events** — 1 question(s)

- `p-594` (procedure): An 'at least m' event is computed by summing the probabilities of each disjoint case for the counts m up to the maximum possible (here, exactly 2, 3, and 4 kings).

### **no page for Probability of Unions of Mutually Exclusive Events** — 1 question(s)

- `p-210` (procedure): The event that exactly one of E and F occurs is the union of the two mutually exclusive events (E occurs and F does not) and (F occurs and E does not), so its probability is the sum P[E ∩ F^c] + P[E^c ∩ F].

### **no page for Probability of a Union of Events** — 1 question(s)

- `p-445` (fact): The total population equals the sum of all disjoint regions: those in exactly one set, exactly two sets, all three sets, and none of the sets.

### **no page for Probability of an Event** — 1 question(s)

- `p-010` (procedure): Translate a verbal relationship such as 'X is twice as likely as Y' into the equation P(X) = 2P(Y), and combine it with the independence product equation to solve for the individual probabilities.

### **no page for Rayleigh Distribution** — 1 question(s)

- `p-649` (procedure): To integrate a density of the form c·x·e^(-a x²), use the substitution u = a x² (or recognize the integrand as a constant multiple of the derivative of e^(-a x²)) to obtain an antiderivative proportional to e^(-a x²).

### **no page for Relative Frequency Probability** — 1 question(s)

- `p-092` (procedure): Interpret relative sales frequencies as probabilities of the next sale, and translate verbal ratio statements (such as 'one-fourth the number of X and Y combined' or 'three times as many X as Y') into equations among those probabilities.

### **no page for Rounding** — 1 question(s)

- `p-139` (procedure): Reported scores rounded to the nearest multiple of ten: round the computed raw score to the nearest ten, and use that rounded score (not the unrounded one) when computing the percentile in the other year.

### **no page for Sampling Without Replacement** — 1 question(s)

- `p-197` (fact): The maximum number of draws is required exactly when all of the first n draws are of different colors (no match appears before the last possible draw).

### **no page for Second Derivative Test** — 1 question(s)

- `p-458` (fact): A positive second derivative at a critical point confirms it is a minimum (an upward-opening quadratic has its minimum at its vertex).

### **no page for Sequential Events** — 1 question(s)

- `p-487` (procedure): In a sequential process where only those who pass one stage proceed to the next, passing a later stage implies passing all earlier stages, so the probability of passing exams 1 and 2 equals the probability of passing exam 2.

### **no page for Single Pareto Distribution** — 1 question(s)

- `p-601` (procedure): Evaluate an improper integral of a power function by finding the antiderivative of x^(-n) and applying limits at the deductible and infinity, where the term at infinity vanishes for n>1.

### **no page for Subsets of Events** — 1 question(s)

- `p-536` (fact): If one event is a subset of another, their union equals the larger event, so the probability of the union equals the probability of the larger event.

### **no page for Sum of Discrete Random Variables** — 1 question(s)

- `p-530` (procedure): To find the probability that the sum of two discrete random variables equals a target value, enumerate the value combinations that add to the target and add the probabilities of those combinations, accounting for which variable can take which value.

### **no page for Sums of Random Variables** — 1 question(s)

- `p-078` (procedure): When a second component starts operating immediately after the first fails, model the total operating time as the sum of the two component lifetimes.

### **no page for Symmetry in Probability** — 1 question(s)

- `p-138` (fact): By symmetry between two exchangeable dice, the non-tied outcomes split evenly, so exactly half of the pairs with unequal numbers have the first die larger than the second.

### **no page for Telescoping Series** — 1 question(s)

- `p-023` (fact): A rational term 1/((n+1)(n+2)) can be decomposed by partial fractions into 1/(n+1) − 1/(n+2), so partial sums telescope to a closed form such as P[N ≤ k] = 1 − 1/(k+2).

### **no page for Union of Events** — 1 question(s)

- `p-183` (fact): The number of elements in the union of three sets equals the sum of the counts of the seven disjoint regions (only-one, exactly-two, and all-three regions).

### **no page for Venn Diagrams and Disjoint Event Partitions** — 1 question(s)

- `p-012` (fact): The event that a woman has both A and B is the union of two disjoint events: having exactly A and B only, and having all three A, B and C, so P[A∩B] = P[exactly A and B] + P[A∩B∩C].

### `Concepts/Arithmetic Progression.md` — 1 question(s)

- `p-085` (formula): The sum of the first k terms of an arithmetic progression with first term a and common difference d is k*a + d*k(k-1)/2 (equivalently, the number of terms times the average of the first and last terms).

### `Concepts/Bayes Theorem.md` — 1 question(s)

- `p-150` (procedure): Restrict the sum in the denominator to the values of the conditioning variable for which the observed outcome has positive probability, since terms with zero conditional probability contribute nothing.

### `Concepts/Conditional and Marginal Probability Functions.md` — 1 question(s)

- `p-476` (procedure): The probability of the intersection of two events defined on different variables of a joint table is the sum of the joint probabilities of only the cells satisfying both conditions simultaneously.

### `Concepts/Event.md` — 1 question(s)

- `p-153` (fact): Two events are the same exactly when they contain the same outcomes; an event that requires a stricter condition is a proper subset of the broader event and is not equal to it.
- `p-153` (procedure): To compare a described event with a target event, translate each into conditions on the count of outcomes (e.g., accidents in each period) and check whether the sets of count combinations coincide, including the total across periods.

### `Concepts/Gamma.md` — 1 question(s)

- `p-507` (procedure): Identify a distribution from a density with an unknown constant by matching its kernel (the x-power and exponential term) to a known family, so the normalizing constant need not be computed.

### `Concepts/Joint Cumulative Distribution Function.md` — 1 question(s)

- `p-238` (procedure): Use a given joint probability value to solve for the unknown parameter, then substitute the parameter into the joint CDF at a different point to compute the requested probability.

### `Concepts/Mutually Exclusive Events.md` — 1 question(s)

- `p-192` (fact): Events defined by claim counts in different time periods (e.g., different years) can occur together unless dependence or other constraints rule it out, so they are generally not disjoint; only events that put contradictory conditions on the same period are disjoint.

### `Concepts/Normal Approximation.md` — 1 question(s)

- `p-116` (procedure): To find an integer threshold N where a tail probability crosses a given level, solve the normal-approximation equation for a continuous N and then choose the integer on the side where the tail probability is still above the level while N+1 gives a value below it (here, round down).

### `Concepts/Probability.md` — 1 question(s)

- `p-189` (procedure): To find the probability of a loss, set total payouts greater than total premium or revenue, and convert this inequality into a condition on the number of winners (payout per winner times W exceeds revenue).

### `Concepts/Probability Distributions.md` — 1 question(s)

- `p-169` (procedure): Identify the support of a joint discrete pmf by listing all (x,y) pairs that satisfy the stated constraints (e.g., x ≤ y within the given ranges) and evaluate the pmf only at those pairs.

### `Concepts/Sample Mean.md` — 1 question(s)

- `p-072` (fact): The difference between the mean of rounded values and the mean of true values equals the sample mean of the individual rounding errors.

### `Concepts/Standard Deviation.md` — 1 question(s)

- `p-058` (procedure): To find the proportion of outcomes within one standard deviation of the mean, form the interval [μ − σ, μ + σ] and add the probabilities of all values of the discrete distribution lying in that interval.

### `Concepts/Transformations of Random Variables.md` — 1 question(s)

- `p-240` (fact): Multiplying a random variable by a constant multiplies its percentiles by that constant, so the total benefit's percentile equals the benefit amount times the percentile of the number of deaths.

### `Concepts/Variance.md` — 1 question(s)

- `p-247` (procedure): To minimize a variance that is a function of an unknown parameter, express the variance in terms of the parameter and choose its value within the feasible range (probabilities nonnegative) that minimizes it, which for an increasing linear function is the smallest feasible value.

### `Concepts/Variance for Conditional and Marginal Distributions.md` — 1 question(s)

- `p-246` (procedure): When X+Y is fixed at a known value n, rewrite Y as n−X so that X−Y becomes 2X−n, reducing the conditional variance of X−Y to a multiple of the conditional variance of X.

## Tagging and linking gaps

The vault teaches what these questions need, but on a page the question isn't tagged with and its tagged pages don't link to. Adding the page to the question's `wiki_link` (or linking it from the tagged page) puts it in reach.

| Question | Pages that teach what it needs |
|---|---|
| `p-004` | Probability, Probability Multiplication Rule |
| `p-005` | Venn Diagram |
| `p-006` | Probability, Probability Rules |
| `p-009` | Axioms of Probability, Probability Addition Rule |
| `p-010` | Axioms of Probability |
| `p-011` | Axioms of Probability |
| `p-012` | Venn Diagram |
| `p-014` | The Law of Total Probability |
| `p-015` | Independent Random Variables |
| `p-016` | Probability Addition Rule |
| `p-017` | Linear Combinations of Random Variables |
| `p-019` | Posterior Distribution |
| `p-020` | Mutually Exclusive Events, Probability Rules |
| `p-024` | Axioms of Probability |
| `p-025` | Axioms of Probability |
| `p-027` | Binomial Distribution |
| `p-031` | Mutually Exclusive Events |
| `p-032` | Probability Density Function (PDF) |
| `p-035` | Cumulative Distribution Function (CDF), Linear Combinations of Random Variables |
| `p-036` | Cumulative Distribution Function (CDF) |
| `p-040` | Probability Rules, The Law of Total Probability |
| `p-042` | Discrete Random Variable |
| `p-044` | Mixture Distribution, Transformations of Random Variables |
| `p-046` | Probability Multiplication Rule |
| `p-048` | Continuous Random Variable, Limited Expected Value |
| `p-049` | Discrete Random Variable |
| `p-050` | Policy Limit |
| `p-051` | Continuous Random Variable, The Law of Total Probability |
| `p-053` | Mean Excess Loss |
| `p-054` | Single-Parameter Pareto Distribution |
| `p-056` | Continuous Random Variable, Mixture Distribution |
| `p-057` | Limited Expected Value, Uniform Continuous Distribution |
| `p-058` | Expected Value |
| `p-059` | Continuous Random Variable, Uniform Continuous Distribution |
| `p-060` | Policy Limit |
| `p-061` | Policy Limit |
| `p-063` | Mean Excess Loss |
| `p-064` | Continuous Random Variable, Cumulative Distribution Function (CDF), Independent and Identically Distributed |
| `p-066` | Sampling Distribution |
| `p-067` | Normal Approximation, Normal Distribution, Poisson Superposition |
| `p-069` | Central Limit Theorem (CLT), Linear Combinations of Random Variables, Normal Approximation |
| `p-070` | Linear Combinations of Random Variables, Normal Approximation |
| `p-071` | Discrete Random Variable, Normal Approximation, Normal Distribution, Probability Multiplication Rule, Variance |
| `p-072` | Normal Distribution, Sample Mean, Uniform Continuous Distribution |
| `p-075` | Transformations of Random Variables |
| `p-080` | Linear Combinations of Random Variables, Transformations of Random Variables |
| `p-082` | Conditional and Marginal Probability Functions, Discrete Random Variable |
| `p-083` | Discrete Random Variable, Marginal Probability Function |
| `p-084` | Mixture Distribution |
| `p-085` | Arithmetic Progression |
| `p-086` | Normal Approximation, Normal Distribution, Uniform Continuous Distribution, Variance |
| `p-088` | Cumulative Distribution Function (CDF), Exponential Distribution |
| `p-091` | Cumulative Distribution Function (CDF) |
| `p-093` | Uniform Continuous Distribution |
| `p-095` | Binomial Distribution, Region of Integration |
| `p-096` | Mode |
| `p-098` | Analysis of Surplus |
| `p-099` | Inclusion-Exclusion Principle |
| `p-106` | The Law of Total Probability |
| `p-112` | Continuous Random Variable, Mixture Distribution |
| `p-114` | Standard Deviation, Variance and Standard Deviation |
| `p-117` | Poisson Superposition |
| `p-118` | Discrete Random Variable |
| `p-119` | Probability Density Function (PDF) |
| `p-120` | Probability |
| `p-121` | Independent Events, Probability |
| `p-124` | Discrete Random Variable |
| `p-125` | Discrete Random Variable |
| `p-126` | Variance and Standard Deviation |
| `p-127` | Probability Multiplication Rule |
| `p-128` | Mutually Exclusive Events, Probability Multiplication Rule |
| `p-129` | Continuous Random Variable |
| `p-130` | Probability Rules |
| `p-131` | Cumulative Distribution Function (CDF), Policy Limit |
| `p-133` | Naive Bayes, Probability Multiplication Rule |
| `p-135` | Probability Rules |
| `p-136` | Normal Approximation |
| `p-139` | Standard Deviation |
| `p-143` | Mode |
| `p-144` | Mode |
| `p-145` | Frequency Distribution |
| `p-146` | Binomial Distribution, Independent Events |
| `p-148` | Axioms of Probability, Continuous Random Variable |
| `p-149` | Probability Multiplication Rule |
| `p-150` | Uniform Discrete |
| `p-151` | Axioms of Probability |
| `p-152` | Uniform Continuous Distribution |
| `p-154` | Mutually Exclusive Events |
| `p-155` | Deductible Rating |
| `p-156` | Mutually Exclusive Events |
| `p-158` | Poisson Superposition |
| `p-161` | Cumulative Distribution Function (CDF), Probability Density Function (PDF) |
| `p-162` | Limited Expected Value |
| `p-163` | Limited Expected Value |
| `p-164` | Percentile |
| `p-165` | Percentile, Variance and Standard Deviation |
| `p-168` | Sample Mean, Transformations of Random Variables |
| `p-170` | Hypergeometric Distribution |
| `p-171` | Discrete Random Variable |
| `p-172` | Binomial Distribution |
| `p-174` | Discrete Random Variable, Mixture Distribution |
| `p-176` | Mode |
| `p-178` | Probability Rules |
| `p-180` | Cumulative Distribution Function (CDF) |
| `p-181` | Percentile, Transformations of Random Variables |
| `p-182` | Inclusion-Exclusion Principle |
| `p-186` | Hypergeometric Distribution, Probability |
| `p-187` | The Law of Total Probability |
| `p-188` | Probability Rules |
| `p-190` | Normal Approximation |
| `p-193` | Probability Rules |
| `p-194` | Discrete Random Variable |
| `p-197` | Probability Multiplication Rule |
| `p-198` | Probability Multiplication Rule |
| `p-200` | Poisson Thinning |
| `p-204` | Cumulative Distribution Function (CDF) |
| `p-207` | Cumulative Distribution Function (CDF) |
| `p-208` | Continuous Random Variable |
| `p-210` | Axioms of Probability |
| `p-211` | Geometric Distribution |
| `p-214` | Median |
| `p-215` | Median, Percentile |
| `p-216` | Limited Expected Value |
| `p-217` | Stop-Loss Reinsurance |
| `p-219` | Limited Expected Value |
| `p-220` | Median, Mixture Distribution, Spliced Distribution |
| `p-221` | Median, Mixture Distribution |
| `p-222` | Percentile |
| `p-223` | Percentile |
| `p-224` | Percentile, Probability Density Function (PDF) |
| `p-225` | Cumulative Distribution Function (CDF) |
| `p-227` | Mixture Distribution, Variance |
| `p-228` | Frequency Distribution |
| `p-229` | BPP Limits of Insurance and Deductible, Continuous Random Variable |
| `p-230` | Continuous Random Variable |
| `p-231` | Variance and Standard Deviation |
| `p-232` | Standard Deviation |
| `p-233` | Hypergeometric Distribution |
| `p-237` | Probability Rules |
| `p-239` | Cumulative Distribution Function (CDF) |
| `p-240` | Normal Approximation |
| `p-241` | Expected Value, Variance and Standard Deviation |
| `p-242` | Exponential Distribution, Independent Random Variables, Variance for Conditional and Marginal Distributions |
| `p-243` | Benefit Limit, Order Statistics, Uniform Discrete |
| `p-244` | Joint Probability Function, Marginal Probability Function |
| `p-245` | Uniform Continuous Distribution, Variance |
| `p-246` | Binomial Distribution, Poisson Superposition, Variance |
| `p-247` | Discrete Random Variable |
| `p-248` | Discrete Random Variable |
| `p-439` | Normal Approximation, Probability Multiplication Rule |
| `p-447` | Continuous Random Variable |
| `p-449` | Joint Cumulative Distribution Function |
| `p-451` | Cumulative Distribution Function (CDF) |
| `p-453` | Continuous Random Variable, Mixture Distribution, Transformations of Random Variables, Uniform Continuous Distribution, Variance |
| `p-455` | Posterior Distribution |
| `p-457` | Probability Rules |
| `p-459` | Normal Approximation, Sample Mean |
| `p-460` | Cumulative Distribution Function (CDF), Mutually Exclusive Events |
| `p-461` | Probability Rules |
| `p-470` | Conditional Probability Function |
| `p-471` | Discrete Random Variable |
| `p-473` | Mixture Distribution, Variance |
| `p-475` | Future Lifetime Random Variable, Probability Mass Function (PMF) |
| `p-477` | Continuous Random Variable |
| `p-480` | Discrete Random Variable |
| `p-483` | Probability Rules |
| `p-486` | Probability Addition Rule, Probability Rules |
| `p-488` | Independent Events |
| `p-489` | Policy Limit |
| `p-491` | Continuous Random Variable, Cumulative Distribution Function (CDF) |
| `p-494` | Frequency Distribution |
| `p-496` | Cumulative Distribution Function (CDF), Independent and Identically Distributed |
| `p-498` | Mutually Exclusive Events, Probability Rules |
| `p-499` | Probability Rules |
| `p-501` | Discrete Univariate Distributions |
| `p-504` | Coinsurance |
| `p-505` | Poisson Superposition, Poisson Thinning |
| `p-506` | Independent Events, Mutually Exclusive Events, Probability Multiplication Rule |
| `p-508` | Joint Probability Density Function |
| `p-510` | Discrete Random Variable |
| `p-511` | Joint Probability Density Function, Probability Rules |
| `p-513` | Continuous Random Variable, Transformations of Random Variables |
| `p-515` | Policy Limit, Probability Density Function (PDF) |
| `p-517` | Expected Value, Variance, Variance for Conditional and Marginal Distributions |
| `p-518` | Frequency Distribution, Probability Rules |
| `p-520` | Discrete Random Variable |
| `p-521` | Variance and Standard Deviation |
| `p-526` | Linear Combinations of Random Variables |
| `p-529` | Poisson Superposition, Probability Rules |
| `p-530` | Probability Multiplication Rule |
| `p-531` | Probability Rules |
| `p-532` | Probability Multiplication Rule |
| `p-533` | Probability Rules |
| `p-535` | Coinsurance |
| `p-537` | Probability Multiplication Rule, Probability Rules |
| `p-538` | Mode |
| `p-540` | Axioms of Probability |
| `p-544` | Independent Events, Probability Rules |
| `p-546` | Naive Bayes, Probability Rules |
| `p-547` | Probability Rules |
| `p-551` | Axioms of Probability |
| `p-553` | Percentile Matching |
| `p-555` | Normal Approximation |
| `p-558` | Independent Events |
| `p-560` | Policy Limit |
| `p-564` | Mixture Distribution |
| `p-565` | Standard Deviation, Variance |
| `p-566` | Probability Rules |
| `p-567` | Variance |
| `p-568` | Normal Approximation, Probability Multiplication Rule |
| `p-570` | Inclusion-Exclusion Principle |
| `p-571` | Variance |
| `p-573` | Poisson Superposition |
| `p-574` | Discrete Random Variable |
| `p-577` | Standard Deviation |
| `p-579` | Continuous Random Variable, Scale and Shape Parameters, Survival Model |
| `p-584` | Poisson Superposition, Probability Rules |
| `p-585` | Cumulative Distribution Function (CDF), Probability Density Function (PDF) |
| `p-587` | Discrete Random Variable |
| `p-589` | Aggregate Loss Model |
| `p-590` | Mutually Exclusive Events, Probability Rules |
| `p-591` | Variance and Standard Deviation |
| `p-592` | Mode |
| `p-594` | Probability |
| `p-596` | Normal Approximation, Standard Deviation (SD) |
| `p-598` | Variance |
| `p-600` | Policy Limit |
| `p-603` | Posterior Distribution |
| `p-604` | Compound Poisson Process, Poisson Superposition |
| `p-605` | Posterior Distribution |
| `p-609` | Deductible Rating |
| `p-610` | Expected Value, Policy Limit |
| `p-612` | Cumulative Distribution Function (CDF), Median |
| `p-615` | Discrete Random Variable, Standard Deviation |
| `p-619` | Linear Combinations of Random Variables, Poisson Superposition |
| `p-620` | Axioms of Probability, Binomial Distribution, Mutually Exclusive Events, Probabilities for Linear Combinations |
| `p-621` | Cumulative Distribution Function (CDF) |
| `p-625` | Poisson Process |
| `p-627` | Conditional Probability |
| `p-628` | Method of Moments |
| `p-630` | Mean Excess Loss |
| `p-632` | Discrete Random Variable, Policy Limit |
| `p-633` | Binomial Distribution, Poisson Superposition |
| `p-634` | Standard Deviation |
| `p-636` | Normal Approximation |
| `p-637` | Normal Distribution |
| `p-638` | Variance and Standard Deviation |
| `p-639` | Independent Random Variables |
| `p-640` | Probability Rules |
| `p-641` | Mutually Exclusive Events |
| `p-642` | Variance for Conditional and Marginal Distributions |
| `p-643` | Joint Cumulative Distribution Function |
| `p-645` | Independent Events |
| `p-647` | Axioms of Probability, Probability Mass Function (PMF) |
| `p-648` | Continuous Random Variable |
| `p-652` | Joint Probability Density Function |
| `p-653` | Uniform Discrete |
| `p-654` | Continuous Random Variable, Expected Value |
| `p-655` | Poisson Process |

## Taught only in a collapsed section

The passage that teaches these items sits inside a folded callout (a worked example, a table behind a toggle). A reader who skims never opens it.

| Page | Questions | Items |
|---|---|---|
| Conditional Probability | 14 | If E is a subset of F (e.g. having none of the factors implies not having A), t…; To evaluate a conditional probability where one event is contained in the other…; To find a conditional probability such as P[X < b \| X ≥ a] for a continuous va… |
| Percentile | 14 | To find a percentile, set the CDF equal to p and solve for x, giving a closed-f…; To find a percentile of a normal distribution, look up the z-value in the stand…; To match a percentile across two normal distributions, set the two raw values e… |
| Axioms of Probability | 11 | The probability of a complement is Pr(A^c) = 1 - Pr(A).; The complement rule states P(A^c) = 1 − P(A).; The probabilities of mutually exclusive, exhaustive categories (e.g., high, low… |
| Cumulative Distribution Function (CDF) | 10 | The probability that a continuous random variable falls in an interval (a, b] e…; For a continuous random variable, P(a < X ≤ b) = F(b) − F(a), and P(X > a) = 1 …; For a continuous random variable, P(a < T < b) = F(b) - F(a), so the probabilit… |
| Mutually Exclusive Events | 9 | The probabilities of a set of mutually exclusive and exhaustive events sum to 1…; Probabilities of a set of mutually exclusive, exhaustive categories sum to 1, s…; The probability of completing (not dropping out) equals the complement of the d… |
| Variance for Conditional and Marginal Distributions | 9 | When a distribution's parameter is itself random, treat the distribution as con…; The conditional expectation of a discrete random variable given an event is the…; For a Bernoulli (0/1) random variable Z, Z² = Z, so E[Z²] = E[Z] = P(Z=1). |
| Normal Distribution | 8 | For a standard normal variable Z, the upper tail probability P(Z > z) equals 1 …; An upper-tail probability for a standard normal equals one minus the cumulative…; For a continuous random variable, P(a < X <= b) = F(b) - F(a) and P(X > a) = 1 … |
| Venn Diagram | 6 | The count of a set that is in one category and not in another equals the count …; The probability of the union of events equals the sum of the probabilities of t…; The probability of a single event A equals the sum of the probabilities of all … |
| Bayes Theorem | 5 | The given renewal rates are conditional probabilities of renewing given the pol…; Treat the percentages of each group as prior probabilities P(A_i) and the group…; Translate the stated rates into conditional probabilities: the detection rate w… |
| Expected Value | 5 | To find the expected payment under a piecewise payment schedule, multiply each …; The expected payment of a policy paying a fixed benefit B with probability p of…; The expected value of a payment that is made with probability p (and zero other… |
| Hypergeometric Distribution | 5 | To count outcomes with a specified composition across groups, choose the requir…; For drawing without replacement from a finite population with a special subset,…; To find the probability of a given composition of a sample drawn without replac… |
| Exponential Distribution | 4 | The probability that a random event time falls within a time period equals the …; The probability of an event equals one minus the probability of its complement,…; For a continuous random variable with density f, the probability P(X > d) equal… |
| Beta | 3 | Find the probability that a continuous loss exceeds a value t by integrating th…; Compute a moment of a continuous random variable by multiplying the power of x …; To find a tail probability P[X > c] for a continuous random variable, integrate… |
| Continuous Random Variable | 3 | With an ordinary deductible d, the claim payment per loss is Y = max(X - d, 0),…; When the payment is zero over part of the loss range, compute the expected paym…; A random variable that is zero with positive probability and otherwise continuo… |
| Discrete Random Variable | 3 | A random variable taking only the values 0 and 1 is a Bernoulli random variable…; To find the probability of an 'at least k' event for a discrete random variable…; A random variable taking only the values 0 and 1 is a Bernoulli random variable… |
| Normal Approximation | 3 | An expected-value premium is set at the expected claim amount plus a fixed load…; Given a normal probability, use the inverse standard normal table to find the z…; To solve for an unknown standard deviation, find the z-value from the standard … |
| Posterior Distribution | 3 | To find the probability of a category given an outcome, treat the category prop…; For a population split into risk classes with given proportions, use the class …; To compute the posterior probability of a risk class given an observed claim co… |
| Set Operations | 3 | A marginal probability is the sum of the joint probabilities over the categorie…; An event splits into disjoint parts by another event and its complement: P(H) =…; To compute a conditional probability like P(A \| not C), identify the numerator… |
| Variance and Standard Deviation | 3 | The expected value of a function of a discrete random variable is the sum of th…; Compute the moments of a transformed variable Y = g(X) by integrating g(x)^k ti…; To find the standard deviation of a sum of independent random variables, square… |
| Central Limit Theorem | 2 | To approximate a probability for a normal variable, standardize by subtracting …; To approximate P[X > x] with a normal approximation, standardize via Z = (x - m… |
| Combinatorics | 2 | When all unordered selections of k items from n are equally likely, the probabi…; When choosing a random subset of a fixed size from n distinct items, each possi… |
| Discrete Univariate Distributions | 2 | Compute the probability of an event for a discrete random variable (e.g., fewer…; The probability of 'n or fewer' events is the cumulative probability, equal to … |
| Mixture Distribution | 2 | A jump in the CDF at a point (F(x) greater than its left-hand limit) indicates …; For a mixed distribution with a point mass at 0 (no loss) and a continuous part… |
| Order Statistics | 2 | A series system that fails when any one of its independent components fails has…; The minimum of n independent exponential random variables is exponential with r… |
| Probability Density Function (PDF) | 2 | A probability density function must be integrated over the specified support (h…; For a continuous random variable, the probability that X lies in an interval (a… |
| Probability Rules | 2 | The probability of neither of two independent events occurring is the product o…; The probability of neither event occurring equals one minus the probability of …; To find the probability of at least one event over several independent trials, … |
| Random Variable | 2 | Ordered outcomes with distinct values (a, b) and (b, a) are different outcomes,…; To get the distribution of a count of categories (e.g., number of entertainment… |
| Uniform Discrete | 2 | For a piecewise payment schedule (a rate up to a threshold and a different rate…; Model a benefit that depends on the year of failure as a random variable by ass… |
| Continuous Univariate Distributions | 1 | For a continuous random variable with density f, the probability P[a < Y < b] e… |
| Future Lifetime Random Variable | 1 | To convert a discrete survival function into point probabilities, take successi… |
| Geometric Distribution | 1 | Rolls of a die are independent, so after a fixed number of rolls the remaining … |
| Independent and Identically Distributed | 1 | For independent events, the probability that all occur equals the product of th…; To find the probability that at least one of several events occurs, take the co… |
| Joint Probability Function | 1 | To find a conditional distribution of one variable given another from a joint d… |
| Linear Combinations of Random Variables | 1 | For n independent identically distributed components with a total of known stan… |
| Loss Random Variable | 1 | The expected payment of a discrete loss distribution under a deductible d is th… |
| Mean Excess Loss | 1 | To obtain the percentile of the loss (not the excess) given that it exceeds a d… |
| Mode | 1 | The binomial pmf is unimodal: it increases up to the mode and then decreases, s… |
| Percentile Matching | 1 | To find an unknown parameter from a given percentile, set the percentile formul… |
| Poisson Distribution | 1 | For a Poisson random variable, P(N≥1)=1-P(N=0)=1-e^{-λ}. |
| Probabilities for Linear Combinations | 1 | To find the probability that exactly k of n independent events with different p… |
| Probability Multiplication Rule | 1 | When drawing without replacement, the probability that the next item is a succe… |
| Scale and Shape Parameters | 1 | A gamma distribution with shape 2 and scale 1 has density t e^{-t} for t > 0, a… |
| Set Theory | 1 | Translate a verbally described event on a die roll into the set of outcomes it … |
| Spliced Distribution | 1 | To locate the median of a mixture with components on different intervals, compa… |
| The Law of Total Probability | 1 | When the distribution of a count depends on a discrete conditioning variable (i… |
| Transformations of Random Variables | 1 | A percentage surcharge applied to one component of a combined claim is modeled … |
| Uniform Continuous Distribution | 1 | For X uniform on [a,b], P[X > c] = (b - c)/(b - a) for c within the interval. |

## Every question

<details><summary><code>p-004</code> · untagged</summary>

Tagged pages: Independent Events, Probability Addition Rule

| Item | Kind | Status | Where |
|---|---|---|---|
| The event that two draws have the same color is the union of the mutually exclusive events 'both red' and 'both blue', so its probability i… | fact | linked | Mutually Exclusive Events: “For mutually exclusive events, the [[Probability Addition Rule]] simplifies to $P(A \cup B) = P(A) …” |
| For independent events (such as draws from separate urns), the probability of their intersection equals the product of their individual pro… | fact | elsewhere | Probability Multiplication Rule: “When $A$ and $B$ are [[Independent Events\\|independent]], the rule simplifies to $P(A \cap B) = P(A…” |
| The probability of drawing a ball of a given color from an urn equals the number of balls of that color divided by the total number of ball… | formula | elsewhere | Probability: “$$P(E) = \frac{\\|E\\|}{\\|S\\|}$$” |

</details>

<details><summary><code>p-005</code> · untagged</summary>

Tagged pages: Set Theory, Inclusion-Exclusion Principle

| Item | Kind | Status | Where |
|---|---|---|---|
| The count of a set that is in one category and not in another equals the count in the first category minus the count in both categories (se… | fact | elsewhere | Venn Diagram (collapsed): “The "Auto Only" region is actually $70 - 20 = 50$.” |
| To count elements with a given attribute plus the complement of other attributes (e.g. female, single), subtract counts of elements having … | procedure | tagged | Inclusion-Exclusion Principle: “The signs alternate by intersection size: add single events, subtract pairwise intersections, add t…” |
| In a two-category classification such as male/female or married/single, each member belongs to exactly one category, so 'female' is the com… | fact | tagged | Set Theory: “The empty set $\varnothing$ contains no elements; the complement $A^c = S \setminus A$ is everythin…” |

</details>

<details><summary><code>p-006</code> · untagged</summary>

Tagged pages: Conditional Probability, Bayes Theorem

| Item | Kind | Status | Where |
|---|---|---|---|
| The conditional probability of A given B is P[A \| B] = P[A ∩ B] / P[B], for P[B] > 0. | formula | tagged | Conditional Probability: “$$P(A \mid B) = \frac{P(A \cap B)}{P(B)}, \quad P(B) > 0$$” |
| The probability of the complement of an event is 1 minus the probability of the event (equivalently, the count outside the event is the tot… | fact | elsewhere | Probability Rules: “$$P(A^c) = 1 - P(A)$$” |
| To find the probability of A intersect B-complement, partition A into A∩B and A∩B^c, so P[A ∩ B^c] = P[A] - P[A ∩ B]. | procedure | linked | The Law of Total Probability: “Every term equals $P(B \mid A_i)\,P(A_i) = P(B \cap A_i)$” |
| With counts from a finite group where each member is equally likely to be selected, an event's probability equals the number of members in … | procedure | elsewhere | Probability: “$$P(E) = \frac{\\|E\\|}{\\|S\\|}$$” |

</details>

<details><summary><code>p-007</code> · answerable</summary>

Tagged pages: The Law of Total Probability, Set Theory

| Item | Kind | Status | Where |
|---|---|---|---|
| The probability of having exactly one of two events (A but not B) equals P(A) minus P(A ∩ B), since A is the disjoint union of A∩B and A∩B^… | fact | linked | Set Operations: “$A^c = S \setminus A, \qquad A \setminus B = A \cap B^c$” |
| Partition the population into mutually exclusive groups (only A, only B, both), and compute the overall probability of an outcome by summin… | procedure | tagged | The Law of Total Probability: “**The Law of Total Probability** states that if $\{A_1, \ldots, A_n\}$ is a partition of the sample…” |
| The given renewal rates are conditional probabilities of renewing given the policyholder's group (only auto, only homeowners, or both), and… | definition | linked | Bayes Theorem (collapsed): “$$P(C) = P(C \mid H)P(H) + P(C \mid L)P(L) = (0.40)(0.20) + (0.10)(0.80) = 0.08 + 0.08 = 0.16$$” |

</details>

<details><summary><code>p-008</code> · gap</summary>

Tagged pages: Set Theory, Inclusion-Exclusion Principle

| Item | Kind | Status | Where |
|---|---|---|---|
| The probability that neither of two events occurs equals 1 minus the probability of their union (complement rule, with De Morgan's law: the… | fact | linked | Set Operations: “De Morgan's laws relate them: $(A \cup B)^c = A^c \cap B^c$ and $(A \cap B)^c = A^c \cup B^c$.” |
| For any two events A and B, Pr[A ∪ B] = Pr[A] + Pr[B] − Pr[A ∩ B] (inclusion-exclusion). | formula | tagged | Inclusion-Exclusion Principle: “$$P(A \cup B) = P(A) + P(B) - P(A \cap B)$$” |
| Translate a verbal description of event probabilities (both, neither, one exceeds the other by a constant) into probability equations on ev… | procedure | missing |  |

</details>

<details><summary><code>p-009</code> · gap</summary>

Tagged pages: Conditional Probability, Set Theory

| Item | Kind | Status | Where |
|---|---|---|---|
| Because every customer insures at least one car, the complement of 'insures more than one car' is 'insures exactly one car'. | fact | missing |  |
| De Morgan's Law: the intersection of complements equals the complement of the union, so Pr(A^c ∩ B^c) = Pr((A ∪ B)^c). | fact | tagged | Set Theory: “$$A \cup B = \{2, 4, 5, 6\} \implies (A \cup B)^c = \{1, 3\}$$” |
| The probability of a complement is Pr(A^c) = 1 - Pr(A). | formula | elsewhere | Axioms of Probability (collapsed): “Therefore $P(A^c) = 1 - P(A)$. $\square$” |
| Inclusion-exclusion for two events: Pr(A ∪ B) = Pr(A) + Pr(B) - Pr(A ∩ B). | formula | elsewhere | Probability Addition Rule: “$$P(A \cup B) = P(A) + P(B) - P(A \cap B)$$” |
| Multiplication rule: Pr(A ∩ B) = Pr(B \| A) Pr(A), where the conditional probability is Pr(B \| A) = Pr(A ∩ B)/Pr(A). | formula | tagged | Conditional Probability: “$$P(A \mid B) = \frac{P(A \cap B)}{P(B)}, \quad P(B) > 0$$” |
| Translate a statement such as 'of those who satisfy A, a fraction p satisfy B' into the conditional probability Pr(B \| A) = p. | procedure | tagged | Conditional Probability: “**Conditional Probability** $P(A \mid B)$ is the probability that event $A$ occurs given that event…” |

</details>

<details><summary><code>p-010</code> · gap</summary>

Tagged pages: Independent Events, Set Theory

| Item | Kind | Status | Where |
|---|---|---|---|
| Two events A and B are independent if and only if P(A ∩ B) = P(A)P(B). | definition | missing |  |
| If events A and B are independent, then their complements are also independent, so P(A^c ∩ B^c) = P(A^c)P(B^c). | fact | missing |  |
| The complement rule states P(A^c) = 1 − P(A). | formula | elsewhere | Axioms of Probability (collapsed): “Therefore $P(A^c) = 1 - P(A)$. $\square$” |
| To find the probability of neither of two events occurring, compute P(A^c ∩ B^c), which equals 1 − P(A ∪ B) or the product of complement pr… | procedure | linked | Set Operations: “De Morgan's laws relate them: $(A \cup B)^c = A^c \cap B^c$ and $(A \cap B)^c = A^c \cup B^c$.” |
| Translate a verbal relationship such as 'X is twice as likely as Y' into the equation P(X) = 2P(Y), and combine it with the independence pr… | procedure | missing |  |

</details>

<details><summary><code>p-011</code> · untagged</summary>

Tagged pages: Conditional Probability, Set Theory

| Item | Kind | Status | Where |
|---|---|---|---|
| Conditional probability: P(A\|B) = P(A ∩ B)/P(B), so a joint probability equals the conditional probability times the probability of the co… | definition | tagged | Conditional Probability: “$$P(A \mid B) = \frac{P(A \cap B)}{P(B)}, \quad P(B) > 0$$” |
| The probabilities of mutually exclusive, exhaustive categories (e.g., high, low, normal blood pressure) sum to 1, so one category's probabi… | fact | elsewhere | Axioms of Probability (collapsed): “Therefore $P(A^c) = 1 - P(A)$.” |
| Organize two categorical variables in a joint probability table whose cells sum to the row and column totals, and fill in unknown cells by … | procedure | linked | Set Operations: “$$P(A^c \cap B) = P(B) - P(A \cap B) = 0.5 - 0.2 = 0.3$$” |
| A marginal probability is the sum of the joint probabilities over the categories of the other variable (law of total probability), so P(reg… | fact | linked | Set Operations (collapsed): “$$P(A^c \cap B) = P(B) - P(A \cap B) = 0.5 - 0.2 = 0.3$$” |

</details>

<details><summary><code>p-012</code> · gap</summary>

Tagged pages: Conditional Probability, Set Theory

| Item | Kind | Status | Where |
|---|---|---|---|
| The conditional probability of event E given event F is P[E\|F] = P[E ∩ F] / P[F], provided P[F] > 0. | formula | tagged | Conditional Probability: “$$P(A \mid B) = \frac{P(A \cap B)}{P(B)}, \quad P(B) > 0$$” |
| Decompose the probability of a union or intersection of events into disjoint Venn-diagram regions (exactly one, exactly two, all three) and… | procedure | linked | Set Operations: “On [[Mutually Exclusive Events\\|disjoint]] events $A \cap B = \varnothing$, so $P(A \cup B) = P(A) …” |
| The event that a woman has both A and B is the union of two disjoint events: having exactly A and B only, and having all three A, B and C, … | fact | missing |  |
| The probability of the union of events equals the sum of the probabilities of the disjoint regions it comprises, and the probability of non… | fact | elsewhere | Venn Diagram (collapsed): “$$P(\text{Neither}) = 1 - P(A \cup H) = 1 - 0.90 = 0.10$$” |
| The probability of a single event A equals the sum of the probabilities of all disjoint regions inside A (only A, A with each other single … | fact | elsewhere | Venn Diagram (collapsed): “The "Auto Only" region is actually $70 - 20 = 50$.” |
| If E is a subset of F (e.g. having none of the factors implies not having A), then P[E ∩ F] = P[E], so P[E\|F] = P[E]/P[F]. | fact | tagged | Conditional Probability (collapsed): “Since $A \subseteq B$, we have $A \cap B = A$.” |

</details>

<details><summary><code>p-013</code> · gap</summary>

Tagged pages: Discrete Univariate Distributions, Geometric Distribution

| Item | Kind | Status | Where |
|---|---|---|---|
| A recursive relation p(n+1) = r·p(n) between successive probabilities can be solved by iterating it to get p(n) = r^n · p(0). | procedure | missing |  |
| The probabilities of a discrete distribution over all possible values must sum to 1, which can be used to solve for an unknown probability … | fact | tagged | Discrete Univariate Distributions: “The PMF must satisfy $f(k) \geq 0$ for all $k$ and $\sum_{k} f(k) = 1$” |
| The sum of an infinite geometric series with first term a and common ratio \|r\| < 1 equals a/(1 − r). | formula | missing |  |
| The probability of more than k events equals one minus the cumulative probability of at most k events (complement rule): P(N > k) = 1 − P(N… | fact | tagged | Discrete Univariate Distributions: “For "at least one", reach for the complement $1 - P(X=0)$ rather than summing the tail.” |

</details>

<details><summary><code>p-014</code> · gap</summary>

Tagged pages: Set Theory, Inclusion-Exclusion Principle

| Item | Kind | Status | Where |
|---|---|---|---|
| The probabilities of a set of mutually exclusive and exhaustive events sum to 1, so the probability of an event's complement equals 1 minus… | fact | linked | Mutually Exclusive Events (collapsed): “The three classes are mutually exclusive and cover every claim, so "other" is the complement of $D …” |
| Partition the outcomes into disjoint categories (e.g., exactly-two-coverage combinations and no coverage), and express each marginal probab… | procedure | elsewhere | The Law of Total Probability: “$\{A_1, A_2, \ldots, A_n\}$ must be mutually exclusive and exhaustive events to partition $S$” |
| When each outcome belongs to exactly two of the listed events, summing the individual event probabilities counts each outcome twice, so the… | fact | missing |  |

</details>

<details><summary><code>p-015</code> · gap</summary>

Tagged pages: Discrete Univariate Distributions

| Item | Kind | Status | Where |
|---|---|---|---|
| The distribution of a sum of two independent discrete random variables is found by convolution: P[X+Y=k] = sum over i of P[X=i]·P[Y=k−i], w… | procedure | missing |  |
| For independent random variables, the joint probability factors into the product of the marginal probabilities, so P[N1=a, N2=b] = P[N1=a]·… | fact | elsewhere | Independent Random Variables: “Formally, for all values $x$ and $y$, the joint distribution factors into the product of the margin…” |
| The event that a sum of nonnegative integer-valued random variables equals k is the disjoint union of the events {N1=i, N2=k−i} for i=0,...… | fact | missing |  |

</details>

<details><summary><code>p-016</code> · gap</summary>

Tagged pages: Independent Events, Set Theory

| Item | Kind | Status | Where |
|---|---|---|---|
| The probability of a complement event is one minus the probability of the event: P(A^c) = 1 - P(A). | fact | linked | Set Operations: “$$A^c = S \setminus A, \qquad A \setminus B = A \cap B^c$$” |
| The probability of a union of two events is P(A ∪ B) = P(A) + P(B) - P(A ∩ B) (inclusion-exclusion). | formula | elsewhere | Probability Addition Rule: “$$P(A \cup B) = P(A) + P(B) - P(A \cap B)$$” |
| Two events A and B are independent if and only if P(A ∩ B) = P(A)P(B). | definition | tagged | Independent Events: “Two events $A$ and $B$ are **Independent** if knowing that one occurred provides no information abo…” |
| To find an unknown event probability, translate the verbal statements into probabilities of events (such as a union and a complement), subs… | procedure | missing |  |

</details>

<details><summary><code>p-017</code> · untagged</summary>

Tagged pages: Normal Distribution

| Item | Kind | Status | Where |
|---|---|---|---|
| A linear combination of independent normal random variables is normally distributed, with mean equal to the same linear combination of the … | fact | tagged | Normal Distribution: “Any **linear combination of independent normals is exactly normal**: if $X_i \sim N(\mu_i, \sigma_i…” |
| For independent random variables, Var(aX + bY) = a^2 Var(X) + b^2 Var(Y), so the variances (not standard deviations) are added, with coeffi… | formula | elsewhere | Linear Combinations of Random Variables: “Coefficients enter the variance **squared**, so $\text{Var}(X - Y) = \text{Var}(X) + \text{Var}(Y)$…” |
| Standardize a normal random variable by subtracting its mean and dividing by its standard deviation, Z = (X - mu)/sigma, to compute probabi… | procedure | tagged | Normal Distribution: “Its CDF has no closed form and is evaluated via the standard normal $Z = (X - \mu)/\sigma \sim N(0,…” |
| For a standard normal Z and c > 0, P(-c <= Z <= c) = 2*Phi(c) - 1, by the symmetry of the standard normal distribution about 0. | fact | tagged | Normal Distribution: “Symmetry gives $\Phi(-z) = 1 - \Phi(z)$ — the identity needed for every negative $z$, since standar…” |
| The normal distribution N(mu, sigma) is parameterized here by its mean and standard deviation (not variance), so the given spread values ar… | definition | tagged | Normal Distribution: “The **Normal Distribution** $X \sim N(\mu, \sigma^2)$ is a symmetric, bell-shaped continuous distri…” |

</details>

<details><summary><code>p-018</code> · answerable</summary>

Tagged pages: Bayes Theorem, Conditional Probability

| Item | Kind | Status | Where |
|---|---|---|---|
| Bayes' theorem: for a partition B_1..B_n of the sample space, P(B_i \| A) = P(A \| B_i)P(B_i) / sum_j P(A \| B_j)P(B_j). | formula | tagged | Bayes Theorem: “$$= \frac{P(E \mid H)\,P(H)}{\displaystyle\sum_{i} P(E \mid H_i)\,P(H_i)}$$” |
| The denominator of Bayes' formula is the total probability P(A) = sum_j P(A \| B_j)P(B_j), computed by the law of total probability over a … | fact | tagged | Bayes Theorem: “The denominator $P(E)$ is computed via [[The Law of Total Probability]] across a partition $\{H_i\}…” |
| Conditional probability P(A \| B) = P(A ∩ B)/P(B), so P(A ∩ B) = P(A \| B)P(B); a group's portion of the population serves as its prior pro… | definition | tagged | Conditional Probability: “$$P(A \mid B) = \frac{P(A \cap B)}{P(B)}, \quad P(B) > 0$$” |

</details>

<details><summary><code>p-019</code> · untagged</summary>

Tagged pages: Bayes Theorem, Conditional Probability

| Item | Kind | Status | Where |
|---|---|---|---|
| Bayes' theorem: P(A\|B) = P(B\|A)P(A) / P(B), which gives the posterior probability of a cause event A given an observed event B. | formula | tagged | Bayes Theorem: “$$P(H \mid E) = \frac{P(E \mid H)\,P(H)}{P(E)}$$” |
| Law of total probability: if events B1,...,Bn partition the sample space, then P(A) = sum over i of P(A\|Bi)P(Bi). | formula | linked | The Law of Total Probability: “$$P(B) = \sum_{i=1}^{n} P(B \mid A_i)\,P(A_i)$$” |
| Conditional probability P(A\|B) is the probability that A occurs given that B has occurred, equal to P(A and B)/P(B); thus P(A and B) = P(A… | definition | tagged | Conditional Probability: “$$P(A \mid B) = \frac{P(A \cap B)}{P(B)}, \quad P(B) > 0$$” |
| To find the probability of a category given an outcome, treat the category proportions as prior probabilities and the category-specific out… | procedure | elsewhere | Posterior Distribution (collapsed): “The posterior probabilities are $0.12281/0.20513 = 0.5987$ (good) and $0.08232/0.20513 = 0.4013$ (b…” |

</details>

<details><summary><code>p-020</code> · untagged</summary>

Tagged pages: Bayes Theorem, Conditional Probability

| Item | Kind | Status | Where |
|---|---|---|---|
| Bayes' theorem: P(A\|B) = P(B\|A)P(A) / P(B), which gives the posterior probability of a category after observing an event. | formula | tagged | Bayes Theorem: “$$P(H \mid E) = \frac{P(E \mid H)\,P(H)}{P(E)}$$” |
| Law of total probability: if events partition the sample space, P(B) = sum over i of P(B\|A_i)P(A_i). | formula | linked | The Law of Total Probability: “$$P(B) = \sum_{i=1}^{n} P(B \mid A_i)\,P(A_i)$$” |
| The probability of the complement event is one minus the probability of the event, so P(survive \| category) = 1 - P(die \| category). | fact | elsewhere | Probability Rules: “$$P(A^c) = 1 - P(A)$$” |
| Probabilities of a set of mutually exclusive, exhaustive categories sum to 1, so the unspecified category's probability is 1 minus the sum … | fact | elsewhere | Mutually Exclusive Events (collapsed): “The three classes are mutually exclusive and cover every claim, so "other" is the complement of $D …” |

</details>

<details><summary><code>p-021</code> · gap</summary>

Tagged pages: Bayes Theorem, Conditional Probability

| Item | Kind | Status | Where |
|---|---|---|---|
| Bayes' theorem: P[A\|B] = P[B\|A]P[A] / P[B], giving the posterior probability of a cause A given observed event B. | formula | tagged | Bayes Theorem: “$$P(H \mid E) = \frac{P(E \mid H)\,P(H)}{P(E)}$$” |
| The law of total probability: if events B_1,...,B_n partition the sample space, P[A] = sum over i of P[A\|B_i]P[B_i]. | formula | linked | The Law of Total Probability: “$$P(B) = \sum_{i=1}^{n} P(B \mid A_i)\,P(A_i)$$” |
| Translate statements such as 'X is k times as likely as Y to die' into relations between conditional probabilities (P[D\|X] = k P[D\|Y]), a… | procedure | missing |  |
| The initial group percentages (heavy, light, nonsmoker) form a partition of the population and serve as the prior probabilities P[H], P[L],… | definition | tagged | Bayes Theorem: “is a formula for reversing conditional probabilities, updating the prior probability $P(H)$ of a hy…” |

</details>

<details><summary><code>p-022</code> · answerable</summary>

Tagged pages: Bayes Theorem, Conditional Probability

| Item | Kind | Status | Where |
|---|---|---|---|
| Bayes' Theorem: P(A\|B) = P(B\|A)P(A) / P(B), which reverses a conditional probability using the prior probability of A and the likelihood … | formula | tagged | Bayes Theorem: “$$P(H \mid E) = \frac{P(E \mid H)\,P(H)}{P(E)}$$” |
| Law of Total Probability: if events partition the sample space, P(B) equals the sum over the partition of P(B\|A_i)P(A_i). | formula | linked | The Law of Total Probability: “$$P(B) = \sum_{i=1}^{n} P(B \mid A_i)\,P(A_i)$$” |
| Treat the percentages of each group as prior probabilities P(A_i) and the group-specific event rates as conditional probabilities P(B\|A_i)… | procedure | tagged | Bayes Theorem (collapsed): “20% of policyholders are high-risk ($H$) and 80% are low-risk ($L$). A high-risk policyholder files…” |
| Conditional probability P(A\|B) is the probability of A given B has occurred, defined as P(A∩B)/P(B), and P(A∩B) = P(B\|A)P(A). | definition | tagged | Conditional Probability: “$$P(A \mid B) = \frac{P(A \cap B)}{P(B)}, \quad P(B) > 0$$” |

</details>

<details><summary><code>p-023</code> · gap</summary>

Tagged pages: Conditional Probability, Discrete Univariate Distributions

| Item | Kind | Status | Where |
|---|---|---|---|
| The conditional probability of event A given event B is P[A \| B] = P[A ∩ B] / P[B]. | formula | tagged | Conditional Probability: “$$P(A \mid B) = \frac{P(A \cap B)}{P(B)}, \quad P(B) > 0$$” |
| For a discrete random variable, the probability of an event such as a range of values is the sum of the probability mass function over the … | fact | tagged | Discrete Univariate Distributions: “$$= \sum_{k \leq x} f(k)$$” |
| To evaluate a conditional probability where one event is contained in the other (e.g. N ≥ 1 and N ≤ 4), the intersection is the restricted … | procedure | tagged | Conditional Probability (collapsed): “Since $A \subseteq B$, we have $A \cap B = A$.” |
| A rational term 1/((n+1)(n+2)) can be decomposed by partial fractions into 1/(n+1) − 1/(n+2), so partial sums telescope to a closed form su… | fact | missing |  |

</details>

<details><summary><code>p-024</code> · untagged</summary>

Tagged pages: Bayes Theorem, Conditional Probability

| Item | Kind | Status | Where |
|---|---|---|---|
| Bayes' Theorem: P[A\|B] = P[B\|A]P[A] / (P[B\|A]P[A] + P[B\|A^c]P[A^c]), which gives the posterior probability of an event given an observe… | formula | tagged | Bayes Theorem: “$$P(H \mid E) = \frac{P(E \mid H)\,P(H)}{P(E)}$$” |
| Translate the stated rates into conditional probabilities: the detection rate when the condition is present is P[positive \| condition], th… | procedure | tagged | Bayes Theorem (collapsed): “20% of policyholders are high-risk ($H$) and 80% are low-risk ($L$). A high-risk policyholder files…” |
| The probability of the complement is one minus the probability of the event, so P[no condition] = 1 − P[condition]. | fact | elsewhere | Axioms of Probability (collapsed): “Therefore $P(A^c) = 1 - P(A)$. $\square$” |
| The denominator of Bayes' Theorem is the total probability of the observed outcome, found by summing P[outcome \| partition event] × P[part… | fact | tagged | Bayes Theorem: “The denominator $P(E)$ is computed via [[The Law of Total Probability]] across a partition $\{H_i\}…” |

</details>

<details><summary><code>p-025</code> · gap</summary>

Tagged pages: Bayes Theorem, Conditional Probability

| Item | Kind | Status | Where |
|---|---|---|---|
| Bayes' theorem: P[A\|B] = P[B\|A]P[A] / P[B], where P[B] is found by summing over a partition of the sample space. | formula | tagged | Bayes Theorem: “$$P(H \mid E) = \frac{P(E \mid H)\,P(H)}{P(E)}$$” |
| The law of total probability: P[B] = P[B\|A]P[A] + P[B\|A^c]P[A^c], since an event and its complement partition the sample space. | formula | tagged | Bayes Theorem: “$$P(C) = P(C \mid H)P(H) + P(C \mid L)P(L) = (0.40)(0.20) + (0.10)(0.80) = 0.08 + 0.08 = 0.16$$” |
| The complement rule: P[A^c] = 1 - P[A]. | fact | elsewhere | Axioms of Probability (collapsed): “Therefore $P(A^c) = 1 - P(A)$. $\square$” |
| Translate a statement that one group is k times as likely to have a trait as another into a conditional probability relation, P[S\|C] = k P… | procedure | missing |  |

</details>

<details><summary><code>p-026</code> · gap</summary>

Tagged pages: Bayes Theorem, Conditional Probability

| Item | Kind | Status | Where |
|---|---|---|---|
| Bayes' theorem: P(B\|A) = P(A\|B)P(B) / P(A), where P(A) is found by summing P(A\|Bi)P(Bi) over a partition of the sample space. | formula | tagged | Bayes Theorem: “$$P(H \mid E) = \frac{P(E \mid H)\,P(H)}{P(E)}$$” |
| The law of total probability: P(A) equals the sum over mutually exclusive, exhaustive events Bi of P(A\|Bi)P(Bi). | fact | linked | The Law of Total Probability: “$$P(B) = \sum_{i=1}^{n} P(B \mid A_i)\,P(A_i)$$” |
| When told the outcome belongs to a restricted subset of events, restrict the partition in the Bayes denominator to only those events (exclu… | procedure | missing |  |
| Conditional probability P(A\|B) = P(A∩B)/P(B), and the joint probability is P(A∩B) = P(A\|B)P(B). | definition | tagged | Conditional Probability: “$$P(A \mid B) = \frac{P(A \cap B)}{P(B)}, \quad P(B) > 0$$” |

</details>

<details><summary><code>p-027</code> · gap</summary>

Tagged pages: Bayes Theorem, Conditional Probability

| Item | Kind | Status | Where |
|---|---|---|---|
| Bayes' theorem: P(A\|B) = P(B\|A)P(A) / [P(B\|A)P(A) + P(B\|A^c)P(A^c)], giving the posterior probability of a hypothesis after observing a… | formula | tagged | Bayes Theorem: “$$P(H \mid E) = \frac{P(E \mid H)\,P(H)}{P(E)}$$” |
| The law of total probability: the denominator P(B) equals the sum of P(B\|partition event) times the probability of each event over a parti… | fact | tagged | Bayes Theorem: “First find $P(\text{claim})$ by the Law of Total Probability:” |
| When a shipment contains a very large number of items, the number of defective items in a fixed-size sample can be modeled as binomial with… | fact | missing |  |
| Binomial probability mass function: P(X = k) = C(n,k) p^k (1-p)^(n-k) for n trials with success probability p. | formula | elsewhere | Binomial Distribution: “$$P(X = k) = \binom{n}{k} p^k (1-p)^{n-k}$$” |

</details>

<details><summary><code>p-028</code> · gap</summary>

Tagged pages: Exponential Distribution, Continuous Univariate Distributions

| Item | Kind | Status | Where |
|---|---|---|---|
| For an exponential random variable with rate parameter lambda, the CDF is P[T <= t] = 1 - e^{-lambda t} for t >= 0. | formula | tagged | Exponential Distribution: “$E[X] = \theta$, $\text{Var}(X) = \theta^2$, and $F(x) = 1 - e^{-x/\theta}$” |
| Calibrate the exponential parameter by setting the CDF at a given time equal to the stated probability (proportion) and solving for lambda,… | procedure | missing |  |
| The probability that a random event time falls within a time period equals the expected portion of the population experiencing the event in… | fact | tagged | Exponential Distribution (collapsed): “About 54.9% of losses exceed the deductible and generate a payment.” |

</details>

<details><summary><code>p-029</code> · gap</summary>

Tagged pages: Poisson Distribution, Discrete Univariate Distributions

| Item | Kind | Status | Where |
|---|---|---|---|
| A Poisson random variable N with parameter lambda has probability mass function P(N=k) = e^{-lambda} lambda^k / k! for k = 0, 1, 2, ... | formula | tagged | Poisson Distribution: “$$P(X = k) = \frac{e^{-\lambda}\lambda^k}{k!}$$” |
| For a Poisson distribution with parameter lambda, the variance equals lambda (equal to the mean). | fact | tagged | Poisson Distribution: “A defining property is $E[X] = \text{Var}(X) = \lambda$ — the mean and variance are equal” |
| To find an unknown distribution parameter from a stated relationship between probabilities (e.g., one probability is a multiple of another)… | procedure | missing |  |

</details>

<details><summary><code>p-030</code> · gap</summary>

Tagged pages: Binomial Distribution, Discrete Univariate Distributions

| Item | Kind | Status | Where |
|---|---|---|---|
| A count of independent trials, each with the same success probability, has a binomial distribution with parameters n and p. | fact | tagged | Binomial Distribution: “The **Binomial Distribution** $X \sim \text{Bin}(n, p)$ models the number of successes in $n$ indep…” |
| For X ~ Binomial(n, p), P[X = k] = C(n,k) p^k (1-p)^(n-k). | formula | tagged | Binomial Distribution: “$$P(X = k) = \binom{n}{k} p^k (1-p)^{n-k}$$” |
| The fund is inadequate when the total payment (number of qualifying employees times C) exceeds the fund, so the inadequacy probability is P… | procedure | missing |  |
| Find the largest payment amount by computing cumulative probabilities P[X ≤ k] and finding the smallest integer k whose tail P[X > k] is be… | procedure | missing |  |
| The complement rule: P[X > k] = 1 - P[X ≤ k], and a discrete count's cumulative probability is the sum of its pmf values up to k. | fact | tagged | Discrete Univariate Distributions: “$$= \sum_{k \leq x} f(k)$$” |

</details>

<details><summary><code>p-031</code> · gap</summary>

Tagged pages: Joint Probability Function, Combinatorics, Multivariate Distribution

| Item | Kind | Status | Where |
|---|---|---|---|
| When n independent trials each fall into one of several categories with fixed probabilities, the counts in each category follow a multinomi… | fact | missing |  |
| The multinomial probability of counts (n1,...,nk) in n trials is n!/(n1!...nk!) times p1^n1 ... pk^nk. | formula | missing |  |
| To find the probability of an event defined by a condition on category counts, enumerate all count outcomes (x,y,z) summing to n that satis… | procedure | elsewhere | Mutually Exclusive Events: “The addition rule simplification extends to any finite collection: if $A_1, A_2, \ldots, A_n$ are p…” |
| Drawing each individual at random from a large pool makes the draws independent with constant category probabilities equal to the pool prop… | fact | missing |  |

</details>

<details><summary><code>p-032</code> · untagged</summary>

Tagged pages: Conditional Probability, Continuous Univariate Distributions

| Item | Kind | Status | Where |
|---|---|---|---|
| The survival function of a continuous random variable is S(x) = P(X > x), equal to the integral of the density from x to the upper end of t… | definition | tagged | Continuous Univariate Distributions: “For anything phrased as a tail probability, work from the survival function $S(x) = 1 - F(x)$ inste…” |
| The conditional probability is P(A \| B) = P(A ∩ B) / P(B). | formula | tagged | Conditional Probability: “$$P(A \mid B) = \frac{P(A \cap B)}{P(B)}, \quad P(B) > 0$$” |
| For a continuous random variable, P(X > b \| X > a) with b > a equals S(b)/S(a), because the event {X > b} is contained in {X > a}. | procedure | tagged | Conditional Probability: “Let $A = \{X > 700\}$ and $B = \{X > 400\}$. Since $A \subseteq B$, we have $A \cap B = A$.” |
| A probability density function must be integrated over the specified support (here zero outside the range), so probabilities of tail events… | fact | elsewhere | Probability Density Function (PDF) (collapsed): “$$P(X > 0.5) = \int_{0.5}^{1} 3x^2\, dx = \left[ x^3 \right]_{0.5}^{1} = 1 - 0.125 = 0.875$$” |

</details>

<details><summary><code>p-033</code> · answerable</summary>

Tagged pages: Continuous Univariate Distributions

| Item | Kind | Status | Where |
|---|---|---|---|
| A probability density function must integrate to 1 over its support, so a density specified only up to a proportionality constant is normal… | fact | tagged | Continuous Univariate Distributions: “The probability density function (PDF) $f(x)$ must satisfy $f(x) \geq 0$ and $\int_{-\infty}^{\inft…” |
| For a continuous random variable with density f, the probability P(a < X < b) equals the integral of f(x) from a to b (equivalently, P(X < … | formula | tagged | Continuous Univariate Distributions: “$$P(a \leq X \leq b) = \int_a^b f(x)\, dx$$” |

</details>

<details><summary><code>p-034</code> · answerable</summary>

Tagged pages: Conditional Probability, Continuous Univariate Distributions

| Item | Kind | Status | Where |
|---|---|---|---|
| A probability density function must integrate to 1 over its support, which determines the value of an unknown normalizing constant. | fact | tagged | Continuous Univariate Distributions: “The probability density function (PDF) $f(x)$ must satisfy $f(x) \geq 0$ and $\int_{-\infty}^{\inft…” |
| For a continuous random variable with density f, the probability P[a < Y < b] equals the integral of f(y) from a to b, so a survival probab… | formula | tagged | Continuous Univariate Distributions (collapsed): “$$P(0.5 < X < 1) = \int_{0.5}^{1} 3x^2\, dx = \left[x^3\right]_{0.5}^{1} = 1 - (0.5)^3 = 1 - 0.125 …” |
| A probability about a linearly transformed variable V = cY (c > 0) is found by rewriting the event in terms of Y, e.g. P[V > v] = P[Y > v/c… | procedure | linked | Transformations of Random Variables: “The reliable way to find its distribution is the **CDF method**: write $F_Y(y) = P(g(X) \leq y)$, r…” |
| The conditional probability is P[A \| B] = P[A ∩ B] / P[B]; when A is a subset of B (e.g., V > 40,000 implies V > 10,000), P[A \| B] = P[A]… | formula | tagged | Conditional Probability: “$$P(A \mid B) = \frac{P(A \cap B)}{P(B)}, \quad P(B) > 0$$” |

</details>

<details><summary><code>p-035</code> · untagged</summary>

Tagged pages: Expected Value, Exponential Distribution

| Item | Kind | Status | Where |
|---|---|---|---|
| An exponential distribution with mean θ has cumulative distribution function F(t) = 1 - e^{-t/θ} for t ≥ 0. | formula | tagged | Exponential Distribution: “$E[X] = \theta$, $\text{Var}(X) = \theta^2$, and $F(x) = 1 - e^{-x/\theta}$” |
| The probability that a continuous random variable falls in an interval (a, b] equals F(b) - F(a). | fact | elsewhere | Cumulative Distribution Function (CDF) (collapsed): “$$P(2 \leq X \leq 4) = F(4) - F(2) = \frac{4}{5} - \frac{2}{5} = \frac{2}{5} = 0.4$$” |
| To find the expected payment under a piecewise payment schedule, multiply each payment amount by the probability of the event that triggers… | procedure | tagged | Expected Value (collapsed): “$$E[X] = 0(0.5) + 100(0.3) + 500(0.2) = 0 + 30 + 100 = 130$$” |
| By linearity of expectation, the expected total over n identical independent items equals n times the expected amount for one item. | fact | elsewhere | Linear Combinations of Random Variables: “**Expectation is always linear** — $E[L]$ needs no independence assumption at all.” |

</details>

<details><summary><code>p-036</code> · untagged</summary>

Tagged pages: Conditional Probability, Continuous Univariate Distributions

| Item | Kind | Status | Where |
|---|---|---|---|
| The cumulative distribution function F(x) = P[X ≤ x] is obtained by integrating the density function from the lower end of the support up t… | definition | elsewhere | Cumulative Distribution Function (CDF): “For a continuous random variable, $F(x) = \int_{-\infty}^{x} f(t)\, dt$” |
| Conditional probability: P[A \| B] = P[A ∩ B] / P[B]. | formula | tagged | Conditional Probability: “$$P(A \mid B) = \frac{P(A \cap B)}{P(B)}, \quad P(B) > 0$$” |
| For a continuous random variable, P[a ≤ X < b] = F(b) − F(a), and P[X ≥ a] = 1 − F(a), since individual points have zero probability. | fact | tagged | Continuous Univariate Distributions: “For anything phrased as a tail probability, work from the survival function $S(x) = 1 - F(x)$ inste…” |
| To find a conditional probability such as P[X < b \| X ≥ a] for a continuous variable, express the numerator as the probability of the inte… | procedure | tagged | Conditional Probability (collapsed): “Let $A = \{X > 700\}$ and $B = \{X > 400\}$. Since $A \subseteq B$, we have $A \cap B = A$.” |

</details>

<details><summary><code>p-037</code> · answerable</summary>

Tagged pages: Discrete Univariate Distributions, Binomial Distribution

| Item | Kind | Status | Where |
|---|---|---|---|
| The number of successes in n independent trials, each with the same success probability p, follows a binomial distribution with parameters … | fact | tagged | Binomial Distribution: “The **Binomial Distribution** $X \sim \text{Bin}(n, p)$ models the number of successes in $n$ indep…” |
| For a binomial(n, p) random variable X, P[X = k] = C(n,k) p^k (1-p)^(n-k). | formula | tagged | Binomial Distribution: “$$P(X = k) = \binom{n}{k} p^k (1-p)^{n-k}$$” |
| For a discrete count variable, compute P[X < k] by summing the probabilities of the individual values 0 through k-1. | procedure | tagged | Discrete Univariate Distributions: “$$= \sum_{k \leq x} f(k)$$” |

</details>

<details><summary><code>p-038</code> · answerable</summary>

Tagged pages: Continuous Univariate Distributions, Deductible

| Item | Kind | Status | Where |
|---|---|---|---|
| For a policy with an ordinary deductible d, the payment per loss is Y = 0 when X ≤ d and Y = X − d when X > d. | procedure | tagged | Deductible: “If the loss $X$ is less than or equal to the deductible $d$, the insurer pays nothing; above $d$ it…” |
| To find a probability about a transformed variable (such as the payment Y = X − d), rewrite the event in terms of the original variable X, … | procedure | tagged | Continuous Univariate Distributions: “Every lognormal probability reduces to a normal one by taking logs of both sides: $P(X > c) = P(\ln…” |
| For a continuous random variable with density f, the probability P[X < b] is the integral of f(x) from the lower end of the support up to b… | formula | tagged | Continuous Univariate Distributions: “$$P(a \leq X \leq b) = \int_a^b f(x)\, dx$$” |

</details>

<details><summary><code>p-039</code> · gap</summary>

Tagged pages: Independent Random Variables, Binomial Distribution, Mutually Exclusive Events

| Item | Kind | Status | Where |
|---|---|---|---|
| The number of successes in a fixed number of independent trials, each with the same success probability, follows a binomial distribution. | fact | tagged | Binomial Distribution: “The **Binomial Distribution** $X \sim \text{Bin}(n, p)$ models the number of successes in $n$ indep…” |
| For a binomial random variable with n trials and success probability p, P(X=k) = C(n,k) p^k (1-p)^(n-k). | formula | tagged | Binomial Distribution: “$$P(X = k) = \binom{n}{k} p^k (1-p)^{n-k}$$” |
| To find the probability of an event like 'at least k' for a discrete random variable, sum the probabilities of the individual outcomes that… | procedure | tagged | Mutually Exclusive Events: “The addition rule simplification extends to any finite collection: if $A_1, A_2, \ldots, A_n$ are p…” |
| When an event occurs independently in each of several groups with the same probability P, the probability that it occurs in exactly one of … | procedure | missing |  |
| The probability of completing (not dropping out) equals the complement of the dropout probability, 1 minus the dropout probability. | fact | tagged | Mutually Exclusive Events (collapsed): “The three classes are mutually exclusive and cover every claim, so "other" is the complement of $D …” |

</details>

<details><summary><code>p-040</code> · untagged</summary>

Tagged pages: Linear Combinations of Random Variables, Normal Distribution

| Item | Kind | Status | Where |
|---|---|---|---|
| To find the probability of an event involving mixed random variables with a point mass at zero, partition the sample space into disjoint ca… | procedure | elsewhere | The Law of Total Probability: “$$P(B) = \sum_{i=1}^{n} P(B \mid A_i)\,P(A_i)$$” |
| If two random variables are independent, the probability that both events occur equals the product of their individual probabilities. | fact | elsewhere | Probability Rules: “The [[Probability Multiplication Rule\\|multiplication rule]] simplifies to $P(A)\,P(B)$ exactly whe…” |
| The probability of the complement of an event equals one minus the probability of the event (e.g., P(at least one claim) = 1 − P(no claim)). | fact | elsewhere | Probability Rules: “$$P(A^c) = 1 - P(A)$$” |
| The difference of two independent normal random variables is normal, with mean equal to the difference of the means and variance equal to t… | fact | tagged | Normal Distribution: “Any **linear combination of independent normals is exactly normal**: if $X_i \sim N(\mu_i, \sigma_i…” |
| To compute a normal probability, standardize the variable by subtracting the mean and dividing by the standard deviation, then evaluate usi… | procedure | tagged | Normal Distribution: “Its CDF has no closed form and is evaluated via the standard normal $Z = (X - \mu)/\sigma \sim N(0,…” |
| For a standard normal variable Z, the upper tail probability P(Z > z) equals 1 − Φ(z). | fact | tagged | Normal Distribution (collapsed): “$$P(S > 55{,}000) = P(Z > 0.791) = 1 - \Phi(0.791) \approx 1 - 0.7855 = 0.2145$$” |

</details>

<details><summary><code>p-041</code> · gap</summary>

Tagged pages: Discrete Univariate Distributions, Negative Binomial Distribution

| Item | Kind | Status | Where |
|---|---|---|---|
| Define a Bernoulli trial's success and failure to match the event of interest, and compute the complementary probability for a month with n… | procedure | tagged | Discrete Univariate Distributions: “For "at least one", reach for the complement $1 - P(X=0)$ rather than summing the tail.” |
| The event that at least r successes occur before the s-th failure in independent trials is equivalent to having at least r successes in the… | fact | missing |  |
| The number of successes in n independent trials, each with success probability p, follows a Binomial(n, p) distribution. | definition | linked | Binomial Distribution: “The **Binomial Distribution** $X \sim \text{Bin}(n, p)$ models the number of successes in $n$ indep…” |
| For X ~ Binomial(n, p), P(X = k) = C(n,k) p^k (1-p)^(n-k), and a tail probability P(X ≥ k) is found by summing these terms over the relevan… | formula | linked | Binomial Distribution: “$$P(X = k) = \binom{n}{k} p^k (1-p)^{n-k}$$” |
| The negative binomial distribution counts the number of failures (or successes) occurring before the r-th success (or failure) in independe… | definition | tagged | Negative Binomial Distribution: “The alternative counts *failures before the $r$-th success*, $Y = X - r \in \{0,1,2,\ldots\}$, with…” |

</details>

<details><summary><code>p-042</code> · untagged</summary>

Tagged pages: Expected Value, Discrete Univariate Distributions

| Item | Kind | Status | Where |
|---|---|---|---|
| The expected value of a function g(X) of a discrete random variable is the sum over all values k of g(k) times P[X=k]. | formula | elsewhere | Discrete Random Variable: “Expectations are sums: $E[g(X)] = \sum_x g(x)\,p(x)$.” |
| For a piecewise payment schedule (a rate up to a threshold and a different rate beyond it), compute the payment for each outcome by applyin… | procedure | linked | Uniform Discrete (collapsed): “Each outcome has probability $1/10$. Losses of 1 through 4 pay nothing; losses of 5 through 10 pay …” |
| A probability function (probability mass function) of a discrete random variable gives P[X=k] for each possible value k, and these probabil… | definition | linked | Uniform Discrete: “$$P(X = k) = \frac{1}{n}, \quad k = 1, 2, \ldots, n$$” |

</details>

<details><summary><code>p-043</code> · gap</summary>

Tagged pages: Expected Value, Continuous Univariate Distributions

| Item | Kind | Status | Where |
|---|---|---|---|
| The expected value of a continuous random variable X with density f is E[X] = the integral of x f(x) dx over the support of X. | formula | tagged | Expected Value: “\int_{-\infty}^{\infty} x\, f(x)\, dx & \text{(continuous)}” |
| When the density involves an absolute value, split the integral at the point where the expression inside the absolute value changes sign an… | procedure | missing |  |

</details>

<details><summary><code>p-044</code> · untagged</summary>

Tagged pages: Expected Value, Exponential Distribution

| Item | Kind | Status | Where |
|---|---|---|---|
| An exponential random variable with mean θ has density f(t) = (1/θ)e^{-t/θ} for t > 0, and survival function S(t) = e^{-t/θ}. | formula | tagged | Exponential Distribution: “$$f(x) = \frac{1}{\theta}\,e^{-x/\theta}, \quad x > 0$$” |
| To find the expectation of a function g(T) of a continuous random variable, integrate g(t) times the density over the support; for a piecew… | procedure | elsewhere | Transformations of Random Variables: “If $E[g(X)]$ is all that is wanted, do **not** find $f_Y$ — use $E[g(X)] = \int g(x) f_X(x)\,dx$ di…” |
| max(T, c) equals the constant c when T < c and equals T when T ≥ c, so it is a floor of c applied to T. | definition | linked | Deductible: “If the loss $X$ is less than or equal to the deductible $d$, the insurer pays nothing; above $d$ it…” |
| The exponential distribution is memoryless: given T > c, the excess T − c is exponential with the same mean, so E[T \| T > c] = c + θ. | fact | tagged | Exponential Distribution: “A direct consequence: given $X > d$, the excess $X - d$ is again $\text{Exp}(\theta)$. So $E[X \mid…” |
| Condition on whether T falls below or above a threshold (law of total expectation): E[X] = E[X \| T<c]P(T<c) + E[X \| T≥c]P(T≥c), where P(T… | procedure | elsewhere | Mixture Distribution: “Any quantity that is *linear* in the density — a probability, a mean, a second moment — can be foun…” |

</details>

<details><summary><code>p-045</code> · gap</summary>

Tagged pages: Expected Value, Exponential Distribution, Continuous Univariate Distributions

| Item | Kind | Status | Where |
|---|---|---|---|
| An exponential distribution with mean θ has rate λ = 1/θ and density f(t) = (1/θ)e^{-t/θ} for t ≥ 0. | fact | tagged | Exponential Distribution: “$$f(x) = \frac{1}{\theta}\,e^{-x/\theta}, \quad x > 0$$” |
| For an exponential distribution with mean θ, P(a < T < b) = e^{-a/θ} − e^{-b/θ}, equal to the integral of the density from a to b. | formula | tagged | Continuous Univariate Distributions: “$$P(a \leq X \leq b) = \int_a^b f(x)\, dx$$” |
| The expected value of a payment that depends on the outcome of a continuous random variable is the integral of the payment function times t… | formula | linked | Transformations of Random Variables: “If $E[g(X)]$ is all that is wanted, do **not** find $f_Y$ — use $E[g(X)] = \int g(x) f_X(x)\,dx$ di…” |
| To find a benefit amount giving a target expected payment, write the expected payment as the benefit amount times a sum of payment-fraction… | procedure | missing |  |

</details>

<details><summary><code>p-046</code> · untagged</summary>

Tagged pages: Expected Value, Discrete Univariate Distributions

| Item | Kind | Status | Where |
|---|---|---|---|
| The expected value of a discrete random variable is the sum of each possible value multiplied by its probability. | definition | tagged | Expected Value: “$$E[X] = \begin{cases} \displaystyle\sum_{k} k\, f(k) & \text{(discrete)} \\[6pt] \displaystyle\int…” |
| The probability that failure occurs in year k, given a constant conditional failure probability each year, equals the probability of surviv… | procedure | linked | Geometric Distribution: “$$P(X = k) = (1-p)^{k-1}p, \quad k = 1, 2, 3, \ldots$$” |
| The probability of surviving several consecutive years is the product of the yearly conditional survival probabilities, because each year's… | fact | elsewhere | Probability Multiplication Rule: “For a chain of events, the rule extends to $P(A_1 \cap A_2 \cap \cdots \cap A_n) = P(A_1)\,P(A_2 \m…” |
| Model a benefit that depends on the year of failure as a random variable by assigning each failure year its benefit amount, with benefit 0 … | procedure | linked | Uniform Discrete (collapsed): “Losses of 1 through 4 pay nothing; losses of 5 through 10 pay $1, 2, \ldots, 6$:” |

</details>

<details><summary><code>p-047</code> · gap</summary>

Tagged pages: Discrete Univariate Distributions, Poisson Distribution, Expected Value

| Item | Kind | Status | Where |
|---|---|---|---|
| A Poisson random variable with parameter lambda has mean lambda. | fact | tagged | Poisson Distribution: “A defining property is $E[X] = \text{Var}(X) = \lambda$ — the mean and variance are equal” |
| The Poisson probability mass function is P(N=n) = lambda^n e^{-lambda} / n! for n = 0, 1, 2, ...; in particular P(N=0) = e^{-lambda}. | formula | tagged | Poisson Distribution: “$$P(X = k) = \frac{e^{-\lambda}\lambda^k}{k!}$$” |
| Model a payment that is zero for the first event and a fixed amount per event thereafter as a function of the count N: payment = amount × (… | procedure | missing |  |
| The expected value of a function g(N) of a discrete random variable is the sum over n of g(n) P(N=n); expectation is linear, so E[N−1] = E[… | formula | tagged | Expected Value: “It is linear: $E[aX + b] = aE[X] + b$” |
| To compute E[max(N−1,0)], extend the sum of (n−1)P(N=n) to include n=0 (equal to E[N−1]) and correct by adding back P(N=0), since E[max(N−1… | procedure | missing |  |

</details>

<details><summary><code>p-048</code> · untagged</summary>

Tagged pages: Continuous Univariate Distributions, Expected Value, Deductible

| Item | Kind | Status | Where |
|---|---|---|---|
| With a deductible d, the part of a loss not paid by the insurer is min(X, d), so its mean is the limited expected value E[X ∧ d]. | fact | elsewhere | Limited Expected Value: “It equals the expected value of $\min(X, u)$.” |
| For a continuous random variable, E[X ∧ d] = ∫ from lower support to d of x f(x) dx + d·P(X > d), which equals ∫_0^d S(x) dx for a nonnegat… | formula | elsewhere | Limited Expected Value: “$$E[X \wedge u] = \int_0^u [1 - F(x)]\,dx \quad \text{(for non-negative } X\text{)}$$” |
| The expected value of a continuous random variable with density f is E[X] = ∫ x f(x) dx, and more generally E[g(X)] = ∫ g(x) f(x) dx over t… | definition | tagged | Expected Value: “\displaystyle\int_{-\infty}^{\infty} x\, f(x)\, dx & \text{(continuous)}” |
| For a continuous random variable, P(X > d) is the integral of the density from d to infinity, and the density integrates to 1 over its supp… | fact | elsewhere | Continuous Random Variable: “A valid density has $f(x) \ge 0$ and $\int_{-\infty}^{\infty} f(x)\,dx = 1$.” |

</details>

<details><summary><code>p-049</code> · gap</summary>

Tagged pages: Expected Value, Discrete Univariate Distributions, Deductible

| Item | Kind | Status | Where |
|---|---|---|---|
| The probabilities of all possible outcomes of a discrete probability mass function sum to 1, which can be used to solve for an unknown norm… | fact | tagged | Discrete Univariate Distributions: “The PMF must satisfy $f(k) \geq 0$ for all $k$ and $\sum_{k} f(k) = 1$:” |
| With an ordinary deductible d, the insurer's payment on a loss X is max(0, X - d), i.e., zero if the loss is at or below the deductible and… | definition | tagged | Deductible: “If the loss $X$ is less than or equal to the deductible $d$, the insurer pays nothing; above $d$ it…” |
| The expected value of a function g of a discrete random variable N is E[g(N)] = sum over n of g(n) P(N=n). | formula | elsewhere | Discrete Random Variable: “Expectations are sums: $E[g(X)] = \sum_x g(x)\,p(x)$.” |
| When a loss occurs only with some probability and its severity has a conditional distribution given a loss, the unconditional expected paym… | procedure | missing |  |

</details>

<details><summary><code>p-050</code> · untagged</summary>

Tagged pages: Expected Value, Continuous Univariate Distributions

| Item | Kind | Status | Where |
|---|---|---|---|
| A policy with a benefit limit pays the loss when it is at or below the limit and pays the limit when the loss exceeds it, so the benefit eq… | fact | elsewhere | Policy Limit: “the insurer pays the whole loss $X$ when it is below $u$ and pays $u$ when it is not, so the paymen…” |
| The expected value of a limited loss variable is E[X∧u] = ∫_0^u y f(y) dy + u·P(Y>u), equivalently ∫_0^u S(y) dy. | formula | elsewhere | Policy Limit: “$$E[X \wedge u] = \int_0^u S(x)\,dx$$” |
| The expected value of a function g(Y) of a continuous random variable with density f is E[g(Y)] = ∫ g(y) f(y) dy over the support. | formula | linked | Transformations of Random Variables: “use $E[g(X)] = \int g(x) f_X(x)\,dx$ directly.” |
| Find the probability that a continuous loss exceeds a value t by integrating the density from t to infinity, P(Y>t) = ∫_t^∞ f(y) dy. | procedure | linked | Beta (collapsed): “P(X > 0.8) &= \int_{0.8}^{1} 12\left(x^2 - x^3\right) dx” |

</details>

<details><summary><code>p-051</code> · gap</summary>

Tagged pages: Expected Value, Deductible

| Item | Kind | Status | Where |
|---|---|---|---|
| With an ordinary deductible d, the insurer's payment on a loss X is max(0, X - d), i.e., zero if X is below d and X - d otherwise. | definition | tagged | Deductible: “If the loss $X$ is less than or equal to the deductible $d$, the insurer pays nothing; above $d$ it…” |
| Compute the expected payment by conditioning on mutually exclusive scenarios (no damage, partial damage, total loss): weight each scenario'… | procedure | elsewhere | The Law of Total Probability: “then the probability of any event $B$ can be expressed as a weighted average of its conditional pro…” |
| The expected value of a function g(X) of a continuous random variable with density f is E[g(X)] = ∫ g(x) f(x) dx over the support; so an ex… | formula | elsewhere | Continuous Random Variable: “Expectations replace sums with integrals: $E[g(X)] = \int g(x)\,f(x)\,dx$” |
| A total loss of a vehicle means the damage equals the vehicle's full value, so the payment is the value minus the deductible. | fact | missing |  |
| Integrate a polynomial times an exponential, such as ∫(x - d)e^{-x/2}dx, using integration by parts (or the antiderivative of e^{-ax}) over… | procedure | prerequisite | Calculus: “\\| Integration by Parts \\| Product of functions \\| $\int u\,dv = uv - \int v\,du$ \\|” |

</details>

<details><summary><code>p-052</code> · gap</summary>

Tagged pages: Expected Value, Continuous Univariate Distributions

| Item | Kind | Status | Where |
|---|---|---|---|
| A valid probability density function must integrate to 1 over its support, so a density specified only up to proportionality is normalized … | fact | tagged | Continuous Univariate Distributions: “The probability density function (PDF) $f(x)$ must satisfy $f(x) \geq 0$ and $\int_{-\infty}^{\inft…” |
| The expected value of a continuous random variable X with density f is E[X] = ∫ x f(x) dx over the support of X. | formula | tagged | Expected Value: “\displaystyle\int_{-\infty}^{\infty} x\, f(x)\, dx & \text{(continuous)}” |
| To integrate a function of (1+x), use a change of variables u = 1+x, which shifts the integration limits accordingly and rewrites x as u-1 … | procedure | missing |  |

</details>

<details><summary><code>p-053</code> · untagged</summary>

Tagged pages: Expected Value, Uniform Continuous Distribution, Deductible

| Item | Kind | Status | Where |
|---|---|---|---|
| The mean of a uniform distribution on [a, b] is (a+b)/2. | fact | tagged | Uniform Continuous Distribution: “$E[X] = (a+b)/2$, $\text{Var}(X) = (b-a)^2/12$, and $F(x) = (x-a)/(b-a)$ for $a < x < b$” |
| The density of a uniform distribution on [0, c] is 1/c on that interval. | formula | tagged | Uniform Continuous Distribution: “$$f(x) = \frac{1}{b - a}, \quad a < x < b$$” |
| With an ordinary deductible d, the payment on a loss X is (X - d) if X exceeds d and 0 otherwise, i.e., (X - d)+. | definition | tagged | Deductible: “If the loss $X$ is less than or equal to the deductible $d$, the insurer pays nothing; above $d$ it…” |
| The expected payment per loss under a deductible d is E[(X-d)+] = the integral from d to infinity (upper limit of support) of (x-d) f(x) dx… | formula | elsewhere | Mean Excess Loss: “The cost per loss is $E[(X - d)_+] = e_X(d)\,S_X(d)$” |
| With no deductible (d = 0), the expected payment equals the mean of the loss, E[X]. | fact | elsewhere | Mean Excess Loss: “For a positive loss, $e_X(0) = E[X]$.” |

</details>

<details><summary><code>p-054</code> · untagged</summary>

Tagged pages: Continuous Univariate Distributions, Percentile

| Item | Kind | Status | Where |
|---|---|---|---|
| The cumulative distribution function F(x) = P(X ≤ x) is obtained by integrating the density function from the lower end of the support up t… | definition | tagged | Continuous Univariate Distributions: “The CDF and the density are two views of the same object: $F(x) = \int_{-\infty}^{x} f(t)\,dt$ and …” |
| The p-th percentile of a continuous random variable is the value x_p satisfying F(x_p) = p. | definition | tagged | Percentile: “When $F$ is continuous and strictly increasing, it is the value that solves $F(x_p) = p$, found by …” |
| To find a percentile, set the CDF equal to p and solve for x, giving a closed-form percentile function that can be evaluated at each requir… | procedure | tagged | Percentile (collapsed): “Set $F(x_{0.90}) = 0.90$ and solve:” |
| A density of the form αθ^α / x^(α+1) for x > θ is a Pareto (single-parameter) density with CDF F(x) = 1 − (θ/x)^α, whose p-th percentile is… | fact | elsewhere | Single-Parameter Pareto Distribution: “$$f(x) = \frac{\alpha\,\theta^{\alpha}}{x^{\alpha + 1}}, \quad x > \theta$$” |

</details>

<details><summary><code>p-055</code> · gap</summary>

Tagged pages: Variance and Standard Deviation, Variance

| Item | Kind | Status | Where |
|---|---|---|---|
| A percentage increase of p applied to every cost is modeled as multiplying the random variable by the factor (1 + p), i.e., Y = (1 + p)X. | procedure | missing |  |
| For a constant a and random variable X, Var(aX) = a^2 Var(X), so the variance scales by the square of the multiplying factor. | formula | tagged | Variance and Standard Deviation: “$\text{Var}(aX + b) = a^2\,\text{Var}(X)$ and $\text{SD}(aX + b) = \\|a\\|\,\text{SD}(X)$ — a shift $…” |

</details>

<details><summary><code>p-056</code> · untagged</summary>

Tagged pages: Variance and Standard Deviation, Variance

| Item | Kind | Status | Where |
|---|---|---|---|
| A jump in the CDF at a point (F(x) greater than its left-hand limit) indicates a point mass there, with probability equal to the size of th… | fact | elsewhere | Mixture Distribution (collapsed): “The CDF jumps by 0.6 at zero and rises continuously after it — neither a discrete nor a continuous …” |
| On the continuous portion of a distribution, the density function is the derivative of the CDF. | fact | elsewhere | Continuous Random Variable: “$$f(x) = F'(x)$$” |
| For a mixed distribution, E[g(X)] equals the sum of g(x) times the point-mass probability at each mass point plus the integral of g(x) f(x)… | formula | elsewhere | Mixture Distribution: “Its moments combine a sum over the mass points with an integral over the continuous part.” |
| Variance equals the second moment minus the square of the mean: Var(X) = E[X^2] - (E[X])^2. | formula | tagged | Variance and Standard Deviation: “The second form $E[X^2] - \mu^2$ is the one to use in practice — it needs only two moments and avoi…” |

</details>

<details><summary><code>p-057</code> · gap</summary>

Tagged pages: Variance and Standard Deviation, Variance

| Item | Kind | Status | Where |
|---|---|---|---|
| A variable that is capped at a limit u (such as replacement at age u or failure, whichever comes first) is modeled as Y = min(X, u), equal … | procedure | elsewhere | Limited Expected Value: “It equals the expected value of $\min(X, u)$.” |
| For a capped variable Y = min(X, u), the k-th moment is E[Y^k] = ∫_0^u x^k f(x) dx + u^k P(X > u). | formula | missing |  |
| The variance of a random variable equals its second moment minus the square of its mean: Var(Y) = E[Y^2] − (E[Y])^2. | formula | tagged | Variance and Standard Deviation: “$$= E[X^2] - \mu^2$$” |
| For a continuous uniform distribution on (0, b), the density is 1/b and P(X > c) = (b − c)/b for 0 < c < b. | fact | elsewhere | Uniform Continuous Distribution: “$$f(x) = \frac{1}{b - a}, \quad a < x < b$$” |

</details>

<details><summary><code>p-058</code> · gap</summary>

Tagged pages: Variance and Standard Deviation, Standard Deviation, Discrete Univariate Distributions

| Item | Kind | Status | Where |
|---|---|---|---|
| The mean of a discrete random variable is the sum of each value times its probability, E[X] = Σ x·P(X=x). | formula | elsewhere | Expected Value: “$$E[X] = \begin{cases} \displaystyle\sum_{k} k\, f(k) & \text{(discrete)} \\[6pt] \displaystyle\int…” |
| The second moment of a discrete random variable is E[X^2] = Σ x^2·P(X=x). | formula | tagged | Variance and Standard Deviation: “E[N^2] &= 0^2(0.6) + 1^2(0.3) + 2^2(0.1) \\” |
| Variance equals the second moment minus the square of the mean, Var(X) = E[X^2] − (E[X])^2. | formula | tagged | Variance and Standard Deviation: “The second form $E[X^2] - \mu^2$ is the one to use in practice” |
| The standard deviation is the positive square root of the variance. | definition | tagged | Standard Deviation: “**Standard Deviation** $\sigma$ is the positive square root of [[Variance]]” |
| To find the proportion of outcomes within one standard deviation of the mean, form the interval [μ − σ, μ + σ] and add the probabilities of… | procedure | missing |  |

</details>

<details><summary><code>p-059</code> · untagged</summary>

Tagged pages: Variance and Standard Deviation, Standard Deviation, Deductible

| Item | Kind | Status | Where |
|---|---|---|---|
| With a deductible d, the insurance payment for a loss X is Y = max(0, X - d), which is zero when the loss is below the deductible and X - d… | procedure | tagged | Deductible: “If the loss $X$ is less than or equal to the deductible $d$, the insurer pays nothing; above $d$ it…” |
| The density of a uniform random variable on (a, b) is 1/(b-a) on that interval and 0 elsewhere. | formula | elsewhere | Uniform Continuous Distribution: “$$f(x) = \frac{1}{b - a}, \quad a < x < b$$” |
| The expected value of a function g(X) of a continuous random variable is E[g(X)] = ∫ g(x) f(x) dx, integrated over the support of X, and fo… | formula | elsewhere | Continuous Random Variable: “Expectations replace sums with integrals: $E[g(X)] = \int g(x)\,f(x)\,dx$” |
| The variance of a random variable is Var(Y) = E[Y^2] - (E[Y])^2, and the standard deviation is the square root of the variance. | formula | tagged | Variance and Standard Deviation: “$$\sigma^2 = \text{Var}(X) = E\left[(X - \mu)^2\right]$$” |

</details>

<details><summary><code>p-060</code> · gap</summary>

Tagged pages: Variance and Standard Deviation, Standard Deviation, Poisson Distribution, Variance

| Item | Kind | Status | Where |
|---|---|---|---|
| A Poisson random variable with mean λ has probability mass function P(N=n) = e^{-λ} λ^n / n!, for n = 0, 1, 2, ... | formula | tagged | Poisson Distribution: “$$P(X = k) = \frac{e^{-\lambda}\lambda^k}{k!}$$” |
| Model a capped per-unit insurance payment as a function of the underlying count: the payment equals the per-unit amount times the count up … | procedure | elsewhere | Policy Limit: “$$X \wedge u = \begin{cases} X, & X < u \\ u, & X \ge u \end{cases}$$” |
| The probability of at least k events is found by the complement rule: subtract the probabilities of all outcomes below k from 1. | fact | missing |  |
| The expected value of a function of a discrete random variable is the sum of the function values times their probabilities: E[g(X)] = Σ g(x… | formula | tagged | Variance and Standard Deviation (collapsed): “E[N^2] &= 0^2(0.6) + 1^2(0.3) + 2^2(0.1)” |
| Variance equals the second moment minus the square of the mean, Var(Y) = E[Y^2] - (E[Y])^2, and the standard deviation is its square root. | formula | tagged | Standard Deviation: “$$= \sqrt{E[X^2] - (E[X])^2}$$” |

</details>

<details><summary><code>p-061</code> · gap</summary>

Tagged pages: Exponential Distribution, Percentile

| Item | Kind | Status | Where |
|---|---|---|---|
| A density of the form c·e^{-λx} on x ≥ 0 is an exponential distribution, and normalizing it to integrate to 1 gives c = λ. | fact | tagged | Exponential Distribution: “Some texts parameterize by **rate** $\lambda = 1/\theta$, so $f(x) = \lambda e^{-\lambda x}$ and $E…” |
| The exponential distribution with rate λ has CDF F(x) = 1 - e^{-λx} for x ≥ 0. | formula | tagged | Exponential Distribution: “$E[X] = \theta$, $\text{Var}(X) = \theta^2$, and $F(x) = 1 - e^{-x/\theta}$” |
| The median of a distribution is the value m satisfying F(m) = 0.5. | definition | linked | Median: “For a continuous distribution that is the point where $F(m) = 0.5$, splitting the probability in ha…” |
| A policy with maximum benefit u pays Y = min(X, u) = X ∧ u, so the benefit is the loss capped at the limit. | definition | elsewhere | Policy Limit: “the insurer pays the whole loss $X$ when it is below $u$ and pays $u$ when it is not, so the paymen…” |
| To find the median of a capped variable Y = X ∧ u, compute the median of X; if it is below u, it is also the median of Y, otherwise the med… | procedure | missing |  |

</details>

<details><summary><code>p-063</code> · untagged</summary>

Tagged pages: Conditional Probability, Exponential Distribution, Percentile, Deductible

| Item | Kind | Status | Where |
|---|---|---|---|
| The exponential distribution is memoryless: given X exceeds d, the excess X - d is exponential with the same mean as X. | fact | tagged | Exponential Distribution: “A direct consequence: given $X > d$, the excess $X - d$ is again $\text{Exp}(\theta)$.” |
| The exponential distribution with mean θ has CDF F(x) = 1 - e^{-x/θ}, which can be inverted to find the percentile p = -θ ln(1 - q). | formula | tagged | Exponential Distribution: “$E[X] = \theta$, $\text{Var}(X) = \theta^2$, and $F(x) = 1 - e^{-x/\theta}$” |
| A percentile of a random variable is the value x such that P(X ≤ x) equals the given probability; for a conditional distribution, the perce… | definition | tagged | Conditional Probability: “$$P(A \mid B) = \frac{P(A \cap B)}{P(B)}, \quad P(B) > 0$$” |
| To obtain the percentile of the loss (not the excess) given that it exceeds a deductible d, compute the percentile of the excess amount and… | procedure | elsewhere | Mean Excess Loss (collapsed): “so the average size of a loss that exceeds $d$ is $d + e_X(d)$” |

</details>

<details><summary><code>p-064</code> · untagged</summary>

Tagged pages: Order Statistics, Expected Value

| Item | Kind | Status | Where |
|---|---|---|---|
| The CDF of a continuous random variable is the integral of its density from the lower end of the support up to x: F(x) = ∫ f(t) dt. | formula | elsewhere | Cumulative Distribution Function (CDF): “For a continuous random variable, $F(x) = \int_{-\infty}^{x} f(t)\, dt$” |
| For independent, identically distributed random variables, the CDF of the maximum of n of them is the n-th power of the individual CDF: P[m… | fact | elsewhere | Independent and Identically Distributed: “the maximum has $P(X_{(n)} \le x) = F(x)^n$ and the minimum has $P(X_{(1)} > x) = [1 - F(x)]^n$.” |
| The density function of a continuous random variable is the derivative of its CDF. | fact | elsewhere | Continuous Random Variable: “$$f(x) = F'(x)$$” |
| The expected value of a continuous random variable is E[Y] = ∫ y g(y) dy over its support, where g is its density. | formula | tagged | Expected Value: “\displaystyle\int_{-\infty}^{\infty} x\, f(x)\, dx & \text{(continuous)}” |

</details>

<details><summary><code>p-065</code> · answerable</summary>

Tagged pages: Central Limit Theorem, Percentile, Independent and Identically Distributed

| Item | Kind | Status | Where |
|---|---|---|---|
| By the Central Limit Theorem, the sum of a large number of independent, identically distributed random variables with finite variance is ap… | fact | tagged | Central Limit Theorem: “For large $n$, $S_n$ is approximately $N(n\mu,\, n\sigma^2)$ regardless of the original distribution” |
| For a sum S of n independent identically distributed random variables with mean mu and variance sigma^2, E[S] = n*mu and Var(S) = n*sigma^2… | formula | linked | Normal Approximation: “compute $E[S_n] = n\mu$ and $\text{Var}(S_n) = n\sigma^2$” |
| To find a percentile of a normal (approximated) distribution, take mean + z*standard deviation, where z is the standard normal quantile at … | procedure | tagged | Percentile: “x_{0.95} &= \mu + z_{0.95}\,\sigma \\ &= 100 + 1.645(15) \\ &= 124.68” |
| The 90th percentile of the standard normal distribution is approximately 1.282. | fact | linked | Normal Distribution: “Useful percentiles: $z_{0.90} = 1.282$, $z_{0.95} = 1.645$, $z_{0.975} = 1.960$, $z_{0.99} = 2.326$” |

</details>

<details><summary><code>p-066</code> · untagged</summary>

Tagged pages: Linear Combinations of Random Variables, Normal Distribution

| Item | Kind | Status | Where |
|---|---|---|---|
| The sample mean of n independent observations from a normal distribution is exactly normally distributed, with mean equal to the population… | fact | elsewhere | Sampling Distribution: “$$\bar{X} \sim N\!\left(\mu,\, \frac{\sigma^2}{n}\right) \quad \text{if } X_i \stackrel{\text{iid}}…” |
| The standard deviation of the average of n independent identically distributed observations is sigma divided by the square root of n. | formula | tagged | Linear Combinations of Random Variables: “So $\text{SD}(\bar{X}) = 20$. Averaging leaves the mean alone but divides the standard deviation by…” |
| To find a probability for a normal random variable X, standardize with Z = (x - mu)/sigma and evaluate using the standard normal distributi… | procedure | tagged | Normal Distribution: “Its CDF has no closed form and is evaluated via the standard normal $Z = (X - \mu)/\sigma \sim N(0,…” |
| An upper-tail probability for a standard normal equals one minus the cumulative probability from the standard normal table: P(Z > z) = 1 - … | fact | tagged | Normal Distribution (collapsed): “$$P(S > 55{,}000) = P(Z > 0.791) = 1 - \Phi(0.791) \approx 1 - 0.7855 = 0.2145$$” |

</details>

<details><summary><code>p-067</code> · untagged</summary>

Tagged pages: Central Limit Theorem, Poisson Distribution

| Item | Kind | Status | Where |
|---|---|---|---|
| The sum of independent Poisson random variables is Poisson with mean equal to the sum of the individual means. | fact | elsewhere | Poisson Superposition: “a sum of independent Poisson counts is Poisson with the summed mean.” |
| For a Poisson random variable, the variance equals the mean. | fact | tagged | Poisson Distribution: “A defining property is $E[X] = \text{Var}(X) = \lambda$ — the mean and variance are equal” |
| Approximate a probability for a Poisson (or other sum of many independent variables) with the normal distribution having the same mean and … | procedure | elsewhere | Normal Approximation: “A binomial$(n, p)$ is approximately $N\big(np,\ np(1-p)\big)$ and a Poisson$(\lambda)$ approximatel…” |
| Compute a normal probability over an interval as P(a ≤ Z ≤ b) = Φ(b) − Φ(a), using the standard normal table and the symmetry relation Φ(−z… | procedure | elsewhere | Normal Distribution: “Symmetry gives $\Phi(-z) = 1 - \Phi(z)$ — the identity needed for every negative $z$, since standar…” |

</details>

<details><summary><code>p-068</code> · gap</summary>

Tagged pages: Linear Combinations of Random Variables, Normal Distribution, Central Limit Theorem

| Item | Kind | Status | Where |
|---|---|---|---|
| The sum of independent normal random variables is normally distributed, with mean equal to the sum of the means and variance equal to the s… | fact | tagged | Normal Distribution: “Any **linear combination of independent normals is exactly normal**: if $X_i \sim N(\mu_i, \sigma_i…” |
| To compute a probability for a normal random variable X with mean mu and standard deviation sigma, standardize via Z = (X - mu)/sigma and e… | procedure | tagged | Normal Distribution: “Its CDF has no closed form and is evaluated via the standard normal $Z = (X - \mu)/\sigma \sim N(0,…” |
| The standard normal distribution is symmetric about zero, so P(Z >= -a) = P(Z <= a). | fact | tagged | Normal Distribution: “Symmetry gives $\Phi(-z) = 1 - \Phi(z)$ — the identity needed for every negative $z$, since standar…” |
| For independent random variables, the variance of the sum is the sum of the variances, so n i.i.d. lifetimes with variance v have total var… | fact | tagged | Central Limit Theorem: “For large $n$, $S_n$ is approximately $N(n\mu,\, n\sigma^2)$ regardless of the original distribution” |
| The standard normal cumulative probability P(Z <= 2) is approximately 0.9772. | fact | missing |  |

</details>

<details><summary><code>p-069</code> · untagged</summary>

Tagged pages: Central Limit Theorem, Covariance

| Item | Kind | Status | Where |
|---|---|---|---|
| The expected value of a sum of random variables equals the sum of their expected values (linearity of expectation), whether or not they are… | fact | elsewhere | Linear Combinations of Random Variables: “**Expectation is always linear** — $E[L]$ needs no independence assumption at all.” |
| For random variables X and Y, Var(X+Y) = Var(X) + Var(Y) + 2Cov(X,Y). | formula | elsewhere | Linear Combinations of Random Variables: “$$\text{Var}(L) = \sum_{i=1}^{n} c_i^2\,\text{Var}(X_i) + 2\sum_{i < j} c_i c_j\,\text{Cov}(X_i, X_…” |
| The variance of a sum of independent random variables is the sum of their variances, and the mean of the sum is the sum of the means; for n… | fact | tagged | Central Limit Theorem: “For large $n$, $S_n$ is approximately $N(n\mu,\, n\sigma^2)$ regardless of the original distribution” |
| By the Central Limit Theorem, the sum of a large number of independent, identically distributed random variables with finite variance is ap… | fact | elsewhere | Central Limit Theorem (CLT): “The **Central Limit Theorem (CLT)** states that the sum or average of a large number of independent…” |
| To approximate a probability for a normal (or approximately normal) variable, standardize by subtracting the mean and dividing by the stand… | procedure | elsewhere | Normal Approximation: “The recipe: identify $n$, compute $E[S_n] = n\mu$ and $\text{Var}(S_n) = n\sigma^2$ ([[Moments for …” |

</details>

<details><summary><code>p-070</code> · untagged</summary>

Tagged pages: Central Limit Theorem, Exponential Distribution

| Item | Kind | Status | Where |
|---|---|---|---|
| An exponential distribution with density (1/θ)e^(-x/θ) has mean θ and variance θ². | fact | tagged | Exponential Distribution: “$E[X] = \theta$, $\text{Var}(X) = \theta^2$, and $F(x) = 1 - e^{-x/\theta}$” |
| The expected value of a sum of random variables is the sum of their expected values, and the variance of a sum of independent random variab… | fact | elsewhere | Linear Combinations of Random Variables: “$$E[L] = \sum_{i=1}^{n} c_i\,E[X_i]$$” |
| By the Central Limit Theorem, the sum of a large number of independent, identically distributed random variables is approximately normal wi… | fact | tagged | Central Limit Theorem: “For large $n$, $S_n$ is approximately $N(n\mu,\, n\sigma^2)$ regardless of the original distribution” |
| To approximate a probability for a normal variable, standardize by subtracting the mean and dividing by the standard deviation, then use th… | procedure | tagged | Central Limit Theorem (collapsed): “$$P(S_{200} > 104{,}000) = P\!\left(Z > \frac{104{,}000 - 100{,}000}{4{,}243}\right) = P(Z > 0.94) …” |
| An expected-value premium is set at the expected claim amount plus a fixed loading, and total premium collected is the per-policy premium t… | definition | elsewhere | Normal Approximation (collapsed): “The fund is \$132,900, or \$332.25 per member: a loading of \$82.25 (33%) over the expected claim, …” |

</details>

<details><summary><code>p-071</code> · untagged</summary>

Tagged pages: Central Limit Theorem, Conditional Probability

| Item | Kind | Status | Where |
|---|---|---|---|
| Build the distribution of a single trial's payoff (number of pensions) by enumerating its outcomes and computing each probability from the … | procedure | elsewhere | Probability Multiplication Rule: “$$P(A \cap B) = P(A) \cdot P(B \mid A)$$” |
| For a discrete random variable, E[Y] = sum of y*P(Y=y) and E[Y^2] = sum of y^2*P(Y=y). | formula | elsewhere | Discrete Random Variable: “Expectations are sums: $E[g(X)] = \sum_x g(x)\,p(x)$.” |
| Var(Y) = E[Y^2] - (E[Y])^2. | formula | elsewhere | Variance: “Efficient computation formula: $\text{Var}(X) = E[X^2] - \mu^2$ where $\mu = E[X]$” |
| For a sum of n independent, identically distributed random variables, the mean is n times the individual mean and the variance is n times t… | fact | elsewhere | Normal Approximation: “compute $E[S_n] = n\mu$ and $\text{Var}(S_n) = n\sigma^2$ ([[Moments for Linear Combinations]])” |
| By the Central Limit Theorem, the sum of a large number of independent identically distributed random variables is approximately normal wit… | fact | tagged | Central Limit Theorem: “For large $n$, $S_n$ is approximately $N(n\mu,\, n\sigma^2)$ regardless of the original distribution” |
| When approximating a discrete integer-valued distribution by a normal, apply the continuity correction: P(S <= k) is approximated by P(Norm… | procedure | elsewhere | Normal Approximation: “$P(S_n \le k) \approx \Phi\!\left(\frac{k + 0.5 - n\mu}{\sigma\sqrt{n}}\right)$” |
| Standardize a normal variable via Z = (x - mu)/sigma and look up the probability in the standard normal table. | procedure | elsewhere | Normal Distribution: “Its CDF has no closed form and is evaluated via the standard normal $Z = (X - \mu)/\sigma \sim N(0,…” |

</details>

<details><summary><code>p-072</code> · gap</summary>

Tagged pages: Central Limit Theorem

| Item | Kind | Status | Where |
|---|---|---|---|
| A Uniform(a, b) random variable has mean (a+b)/2 and variance (b-a)^2/12. | formula | elsewhere | Uniform Continuous Distribution: “$E[X] = (a+b)/2$, $\text{Var}(X) = (b-a)^2/12$, and $F(x) = (x-a)/(b-a)$ for $a < x < b$” |
| The difference between the mean of rounded values and the mean of true values equals the sample mean of the individual rounding errors. | fact | missing |  |
| By the Central Limit Theorem, the mean of n independent identically distributed random variables is approximately normal with mean equal to… | fact | elsewhere | Sample Mean: “By the [[Central Limit Theorem]], $\bar{X}$ is approximately $N(\mu, \sigma^2/n)$ for large $n$ wha…” |
| To approximate a probability for a normal variable, standardize by subtracting the mean and dividing by the standard deviation, then read t… | procedure | elsewhere | Normal Distribution: “Its CDF has no closed form and is evaluated via the standard normal $Z = (X - \mu)/\sigma \sim N(0,…” |
| For a standard normal Z, P(-z ≤ Z ≤ z) = 2Φ(z) − 1 by symmetry. | fact | missing |  |

</details>

<details><summary><code>p-073</code> · answerable</summary>

Tagged pages: Independent Random Variables, Exponential Distribution

| Item | Kind | Status | Where |
|---|---|---|---|
| For an exponential distribution with mean θ (rate λ = 1/θ), the CDF is P[T ≤ t] = 1 − e^{−t/θ} = 1 − e^{−λt}. | formula | tagged | Exponential Distribution: “$E[X] = \theta$, $\text{Var}(X) = \theta^2$, and $F(x) = 1 - e^{-x/\theta}$” |
| The rate parameter of an exponential distribution is the reciprocal of its mean. | fact | tagged | Exponential Distribution: “Some texts parameterize by **rate** $\lambda = 1/\theta$, so $f(x) = \lambda e^{-\lambda x}$ and $E…” |
| For independent random variables, the probability that both events occur (the joint probability of events defined by each variable) equals … | fact | tagged | Independent Random Variables: “$$F(x, y) = F_X(x) \cdot F_Y(y)$$” |

</details>

<details><summary><code>p-074</code> · answerable</summary>

Tagged pages: Expected Value, Binomial Distribution

| Item | Kind | Status | Where |
|---|---|---|---|
| A binomial random variable counts the successes in n independent trials each with the same success probability p, and has pmf P(N=k) = C(n,… | definition | tagged | Binomial Distribution: “The **Binomial Distribution** $X \sim \text{Bin}(n, p)$ models the number of successes in $n$ indep…” |
| Model the number of tourists who show up as binomial by taking the show-up probability as the complement of the no-show probability (p = 1 … | procedure | tagged | Binomial Distribution: “The **Binomial Distribution** $X \sim \text{Bin}(n, p)$ models the number of successes in $n$ indep…” |
| Identify the event that triggers a payout (here, all tickets sold equal the number who show up, exceeding capacity by one) and compute its … | procedure | tagged | Binomial Distribution: “$$P(X = k) = \binom{n}{k} p^k (1-p)^{n-k}$$” |
| Expected value of a payment that occurs only with a given probability equals the payment amount times that probability; expected net revenu… | fact | tagged | Expected Value: “It is linear: $E[aX + b] = aE[X] + b$” |

</details>

<details><summary><code>p-075</code> · untagged</summary>

Tagged pages: Linear Combinations of Random Variables, Covariance, Variance and Standard Deviation

| Item | Kind | Status | Where |
|---|---|---|---|
| The variance of a sum of two random variables is Var(X+Y) = Var(X) + Var(Y) + 2Cov(X,Y). | formula | tagged | Variance and Standard Deviation: “For a sum, $\text{Var}(X + Y) = \text{Var}(X) + \text{Var}(Y) + 2\,\text{Cov}(X,Y)$” |
| Adding a constant to a random variable does not change its variance. | fact | tagged | Variance and Standard Deviation: “$\text{Var}(aX + b) = a^2\,\text{Var}(X)$ and $\text{SD}(aX + b) = \\|a\\|\,\text{SD}(X)$ — a shift $…” |
| For constants a and b, Var(aX) = a^2 Var(X) and Cov(aX, bY) = ab Cov(X,Y). | formula | tagged | Variance and Standard Deviation: “$\text{Var}(aX + b) = a^2\,\text{Var}(X)$ and $\text{SD}(aX + b) = \\|a\\|\,\text{SD}(X)$” |
| A percentage increase of r on a random amount is modeled by multiplying the variable by (1+r), while a flat increase is modeled by adding a… | procedure | elsewhere | Transformations of Random Variables: “$X' = (1+r)X$ under [[Inflation]] all reshape the [[Loss Random Variable]] into the [[Payment Rando…” |

</details>

<details><summary><code>p-076</code> · answerable</summary>

Tagged pages: Variance for Conditional and Marginal Distributions, Marginal Probability Function, Variance and Standard Deviation

| Item | Kind | Status | Where |
|---|---|---|---|
| To obtain the marginal probability distribution of one variable from a joint probability mass function, sum the joint probabilities over al… | procedure | tagged | Marginal Probability Function: “The **marginal probability function** of $X$ is obtained from the [[Joint Probability Function]] $p…” |
| The expected value of a discrete random variable is E[X] = sum of x * P[X=x] over all values x. | formula | tagged | Variance and Standard Deviation: “E[N] &= 0(0.6) + 1(0.3) + 2(0.1) \\” |
| The second moment of a discrete random variable is E[X^2] = sum of x^2 * P[X=x] over all values x. | formula | tagged | Variance and Standard Deviation: “E[N^2] &= 0^2(0.6) + 1^2(0.3) + 2^2(0.1) \\” |
| The variance of a random variable equals the second moment minus the square of the mean: Var(X) = E[X^2] - (E[X])^2. | formula | tagged | Variance and Standard Deviation: “$$= E[X^2] - \mu^2$$” |

</details>

<details><summary><code>p-077</code> · answerable</summary>

Tagged pages: Linear Combinations of Random Variables, Independent Random Variables, Variance

| Item | Kind | Status | Where |
|---|---|---|---|
| For random variables X and Y and constants a, b, c, Var(aX + bY + c) = a^2 Var(X) + b^2 Var(Y) + 2ab Cov(X, Y). | formula | tagged | Linear Combinations of Random Variables: “$$\text{Var}(L) = \sum_{i=1}^{n} c_i^2\,\text{Var}(X_i) + 2\sum_{i < j} c_i c_j\,\text{Cov}(X_i, X_…” |
| Independent random variables have zero covariance, so the covariance term vanishes in the variance of their linear combination. | fact | tagged | Independent Random Variables: “Independence implies [[Covariance]] is zero ($\text{Cov}(X,Y) = 0$), though the converse is not alw…” |
| Adding or subtracting a constant does not change the variance of a random variable, so the constant term drops out. | fact | tagged | Variance: “$\text{Var}(aX + b) = a^2 \text{Var}(X)$ — scaling changes variance, shifts do not” |
| A coefficient enters the variance of a linear combination squared, so a negative coefficient still contributes a positive amount. | fact | tagged | Linear Combinations of Random Variables: “Coefficients enter the variance **squared**, so $\text{Var}(X - Y) = \text{Var}(X) + \text{Var}(Y)$…” |

</details>

<details><summary><code>p-078</code> · gap</summary>

Tagged pages: Independent Random Variables, Exponential Distribution, Variance

| Item | Kind | Status | Where |
|---|---|---|---|
| For an exponential distribution with mean θ, the variance equals θ squared (the square of the mean). | fact | tagged | Exponential Distribution: “$E[X] = \theta$, $\text{Var}(X) = \theta^2$, and $F(x) = 1 - e^{-x/\theta}$” |
| The variance of a sum of independent random variables equals the sum of their variances. | fact | tagged | Independent Random Variables: “For independent random variables: $E[XY] = E[X]\,E[Y]$ and $\text{Var}(X + Y) = \text{Var}(X) + \te…” |
| When a second component starts operating immediately after the first fails, model the total operating time as the sum of the two component … | procedure | missing |  |

</details>

<details><summary><code>p-079</code> · gap</summary>

Tagged pages: Order Statistics, Independent Random Variables, Exponential Distribution

| Item | Kind | Status | Where |
|---|---|---|---|
| An exponential random variable with mean θ has CDF F(x) = 1 − e^{−x/θ} for x ≥ 0 (and survival function e^{−x/θ}). | formula | tagged | Exponential Distribution: “$E[X] = \theta$, $\text{Var}(X) = \theta^2$, and $F(x) = 1 - e^{-x/\theta}$” |
| The maximum of several random variables is less than or equal to a value x if and only if every one of the variables is less than or equal … | fact | missing |  |
| For independent random variables, the probability that all events occur jointly equals the product of their individual probabilities, so P[… | fact | tagged | Order Statistics: “$$P\bigl(X_{(n)} \le x\bigr) = F_1(x)\,F_2(x)\cdots F_n(x)$$” |
| The probability of an event equals one minus the probability of its complement, so P[max > x] = 1 − P[max ≤ x]. | fact | tagged | Exponential Distribution (collapsed): “P(X > 300) = 1 - F(300)” |

</details>

<details><summary><code>p-080</code> · untagged</summary>

Tagged pages: Covariance and Correlation Coefficient, Covariance, Variance

| Item | Kind | Status | Where |
|---|---|---|---|
| The variance of a random variable equals its second moment minus the square of its mean: Var(X) = E[X^2] - (E[X])^2. | formula | tagged | Variance: “Efficient computation formula: $\text{Var}(X) = E[X^2] - \mu^2$ where $\mu = E[X]$” |
| The variance of a sum is Var(X+Y) = Var(X) + Var(Y) + 2Cov(X,Y), which can be solved for Cov(X,Y) when the other quantities are known. | formula | elsewhere | Linear Combinations of Random Variables: “\text{Var}(L) = \sum_{i=1}^{n} c_i^2\,\text{Var}(X_i) + 2\sum_{i < j} c_i c_j\,\text{Cov}(X_i, X_j)” |
| Covariance is bilinear: Cov(aX+bY, cU+dV) expands into the sum of products of coefficients times the pairwise covariances, with Cov(X,X)=Va… | fact | tagged | Covariance and Correlation Coefficient: “Covariance is bilinear: $\text{Cov}(aX + bY,\, Z) = a\,\text{Cov}(X, Z) + b\,\text{Cov}(Y, Z)$, add…” |
| A percentage surcharge applied to one component of a combined claim is modeled by multiplying that component by (1 + surcharge rate), so th… | procedure | elsewhere | Transformations of Random Variables (collapsed): “Next year losses inflate by 10%, so $Y = 1.1X$.” |

</details>

<details><summary><code>p-081</code> · gap</summary>

Tagged pages: Conditional Probability, Mutually Exclusive Events

| Item | Kind | Status | Where |
|---|---|---|---|
| The conditional probability of event A given event B is P(A\|B) = P(A and B) / P(B), provided P(B) > 0. | definition | tagged | Conditional Probability: “$$P(A \mid B) = \frac{P(A \cap B)}{P(B)}, \quad P(B) > 0$$” |
| The probability that a given person survives equals the sum of the probability that only that person survives and the probability that both… | fact | tagged | Mutually Exclusive Events: “For mutually exclusive events, the [[Probability Addition Rule]] simplifies to $P(A \cup B) = P(A) …” |
| Conditioning on an event (e.g. one person surviving) removes outcomes incompatible with it, so only the remaining uncertain payments (e.g. … | procedure | tagged | Conditional Probability: “**Conditional Probability** $P(A \mid B)$ is the probability that event $A$ occurs given that event…” |
| The expected value of a payment that is a fixed amount paid with probability p is the amount times p, and expected excess of premiums over … | formula | missing |  |

</details>

<details><summary><code>p-082</code> · untagged</summary>

Tagged pages: Conditional Probability Function, Variance for Conditional and Marginal Distributions, Discrete Univariate Distributions

| Item | Kind | Status | Where |
|---|---|---|---|
| The marginal probability of one variable is found by summing the joint probability function over all values of the other variable. | definition | elsewhere | Conditional and Marginal Probability Functions: “$$p_X(x) = \sum_y p_{X,Y}(x, y)$$” |
| The conditional probability of Y=y given X=x equals P(X=x, Y=y) divided by P(X=x). | formula | tagged | Conditional Probability Function: “$$P(X = x \mid Y = y) = \frac{P(X = x, Y = y)}{P(Y = y)}$$” |
| A random variable taking only the values 0 and 1 is a Bernoulli random variable, with success probability equal to the probability that it … | fact | elsewhere | Discrete Random Variable (collapsed): “$Y$ is Bernoulli, so $E[Y] = 0.35$ and $\text{Var}(Y) = 0.35(0.65) = 0.2275$.” |
| The variance of a Bernoulli random variable with success probability p is p(1-p). | formula | linked | Binomial Distribution: “$E[X] = np$ and $\text{Var}(X) = np(1-p)$” |
| To find a conditional variance, compute the variance of the conditional distribution of Y given X=x, using the conditional probabilities in… | procedure | tagged | Variance for Conditional and Marginal Distributions: “$$\text{Var}(X \mid Y=y) = E[X^2 \mid Y=y] - \bigl(E[X \mid Y=y]\bigr)^2$$” |

</details>

<details><summary><code>p-083</code> · untagged</summary>

Tagged pages: Conditional Probability Function, Discrete Univariate Distributions, Variance for Conditional and Marginal Distributions

| Item | Kind | Status | Where |
|---|---|---|---|
| The conditional probability of event A given event B is P(A and B) divided by P(B); for a joint pmf, P(Q=q \| P=p) = P(P=p, Q=q) / P(P=p). | definition | tagged | Conditional Probability Function: “$$P(X = x \mid Y = y) = \frac{P(X = x, Y = y)}{P(Y = y)}$$” |
| The marginal probability of one variable's value is found by summing the joint probabilities over all values of the other variable (a row o… | fact | elsewhere | Marginal Probability Function: “The **marginal probability function** of $X$ is obtained from the [[Joint Probability Function]] $p…” |
| The expected value of a discrete random variable is the sum of each value times its probability; E[g(X)] = sum g(x)p(x), which applies to c… | formula | elsewhere | Discrete Random Variable: “Expectations are sums: $E[g(X)] = \sum_x g(x)\,p(x)$.” |
| Variance equals the second moment minus the square of the mean, Var(X) = E[X^2] - (E[X])^2; the conditional variance uses the conditional m… | formula | tagged | Variance for Conditional and Marginal Distributions: “$$\text{Var}(X \mid Y=y) = E[X^2 \mid Y=y] - \bigl(E[X \mid Y=y]\bigr)^2$$” |

</details>

<details><summary><code>p-084</code> · untagged</summary>

Tagged pages: The Law of Total Probability, Conditional Probability, Exponential Distribution

| Item | Kind | Status | Where |
|---|---|---|---|
| The Law of Total Probability: the probability of an event equals the sum over a partition of conditioning events of the conditional probabi… | fact | tagged | The Law of Total Probability: “$$P(B) = \sum_{i=1}^{n} P(B \mid A_i)\,P(A_i)$$” |
| An exponential distribution with mean theta has density f(x) = (1/theta)e^{-x/theta} for x>0, with rate lambda = 1/theta. | formula | tagged | Exponential Distribution: “$$f(x) = \frac{1}{\theta}\,e^{-x/\theta}, \quad x > 0$$” |
| For an exponential random variable with mean theta, P(a < X < b) = e^{-a/theta} - e^{-b/theta}, obtained by integrating the density from a … | formula | tagged | Exponential Distribution: “Work from the survival function $S(x) = e^{-x/\theta}$ rather than the CDF; almost every exponentia…” |
| When the number of claims is zero, the total claim amount is zero with certainty, so the probability that it lies in a positive interval is… | fact | elsewhere | Mixture Distribution: “A mixture of a point mass and a continuous distribution gives a CDF with a jump, such as an annual …” |

</details>

<details><summary><code>p-085</code> · gap</summary>

Tagged pages: Discrete Univariate Distributions

| Item | Kind | Status | Where |
|---|---|---|---|
| The probabilities of a discrete distribution over its full support must sum to 1. | fact | tagged | Discrete Univariate Distributions: “The PMF must satisfy $f(k) \geq 0$ for all $k$ and $\sum_{k} f(k) = 1$” |
| A sequence with a constant difference between consecutive terms is an arithmetic progression, so the n-th term equals the first term minus … | fact | elsewhere | Arithmetic Progression: “an **arithmetic progression** is a sequence of payments that changes by a fixed amount $Q$ each per…” |
| The sum of the first k terms of an arithmetic progression with first term a and common difference d is k*a + d*k(k-1)/2 (equivalently, the … | formula | missing |  |
| Compute the probability of an event for a discrete random variable (e.g., fewer than k or more than k) by summing the probability mass func… | procedure | tagged | Discrete Univariate Distributions (collapsed): “$$P(X \leq 3) = F(3) = \frac{1}{10}(1+2+3) = \frac{6}{10} = 0.6$$” |

</details>

<details><summary><code>p-086</code> · gap</summary>

Tagged pages: Central Limit Theorem, Deductible

| Item | Kind | Status | Where |
|---|---|---|---|
| With an ordinary deductible d, the payment per loss is max(0, X - d), i.e., zero when the loss is below d and the excess X - d otherwise. | definition | tagged | Deductible: “If the loss $X$ is less than or equal to the deductible $d$, the insurer pays nothing; above $d$ it…” |
| The mean of a function g(X) of a continuous random variable is E[g(X)] = ∫ g(x) f(x) dx, and the second moment is E[g(X)^2] = ∫ g(x)^2 f(x)… | formula | missing |  |
| A uniform distribution on (0, b) has constant density 1/b on its support. | fact | elsewhere | Uniform Continuous Distribution: “$$f(x) = \frac{1}{b - a}, \quad a < x < b$$” |
| Variance equals the second moment minus the square of the mean: Var(Y) = E[Y^2] - (E[Y])^2. | formula | elsewhere | Variance: “Efficient computation formula: $\text{Var}(X) = E[X^2] - \mu^2$ where $\mu = E[X]$” |
| For a sum of n independent, identically distributed random variables, the mean of the sum is n times the individual mean and the variance o… | fact | elsewhere | Normal Approximation: “compute $E[S_n] = n\mu$ and $\text{Var}(S_n) = n\sigma^2$” |
| By the Central Limit Theorem, the sum of a large number of independent identically distributed random variables is approximately normal, wi… | fact | tagged | Central Limit Theorem: “For large $n$, $S_n$ is approximately $N(n\mu,\, n\sigma^2)$ regardless of the original distribution” |
| To find a probability for a normal variable, standardize by subtracting the mean and dividing by the standard deviation, then use the stand… | procedure | elsewhere | Normal Distribution: “Symmetry gives $\Phi(-z) = 1 - \Phi(z)$ — the identity needed for every negative $z$, since standar…” |

</details>

<details><summary><code>p-087</code> · gap</summary>

Tagged pages: Set Theory, Mutually Exclusive Events

| Item | Kind | Status | Where |
|---|---|---|---|
| Inclusion-exclusion for three events: P(A∪B∪C) = P(A)+P(B)+P(C) − P(A∩B) − P(A∩C) − P(B∩C) + P(A∩B∩C). | formula | linked | Probability Addition Rule: “$$P(A \cup B \cup C) = P(A)+P(B)+P(C) - P(A \cap B) - P(A \cap C) - P(B \cap C) + P(A \cap B \cap C…” |
| If two events are mutually exclusive, their intersection has probability zero, so any triple intersection containing both is also impossibl… | fact | tagged | Mutually Exclusive Events: “$$A \cap B = \emptyset \implies P(A \cap B) = 0$$” |
| The probability of having none of the events equals one minus the probability of the union (complement rule). | fact | tagged | Mutually Exclusive Events (collapsed): “The three classes are mutually exclusive and cover every claim, so "other" is the complement of $D …” |
| Translate 'exactly two of the three products' into the sum of pairwise intersection probabilities when the triple intersection is empty, so… | procedure | missing |  |
| An event splits into disjoint parts by another event and its complement: P(H) = P(H∩A) + P(H∩Aᶜ). | fact | linked | Set Operations (collapsed): “$A^c \cap B$ is the part of $B$ that does not overlap $A$:” |

</details>

<details><summary><code>p-088</code> · untagged</summary>

Tagged pages: Conditional Probability, Coinsurance Percentage, Deductible, Policy Information, Loss Random Variable

| Item | Kind | Status | Where |
|---|---|---|---|
| A conditional distribution function G(y) given an event A is P(Y ≤ y \| A) = P(Y ≤ y and A)/P(A), the conditional probability of the event … | definition | tagged | Conditional Probability: “$$P(A \mid B) = \frac{P(A \cap B)}{P(B)}, \quad P(B) > 0$$” |
| To find the distribution of a payment under a piecewise coinsurance/deductible schedule, map the payment threshold back to the correspondin… | procedure | linked | Benefit Limit: “Under the payment cap, losses above $d + u/\alpha$ result in the insurer paying exactly $u$ and the…” |
| With an ordinary deductible d, the reimbursement is positive exactly when the loss exceeds d, so conditioning on a positive reimbursement i… | fact | tagged | Deductible: “If the loss $X$ is less than or equal to the deductible $d$, the insurer pays nothing; above $d$ it…” |
| For a continuous random variable, P(a < X ≤ b) = F(b) − F(a), and P(X > a) = 1 − F(a). | fact | elsewhere | Cumulative Distribution Function (CDF) (collapsed): “$$P(2 \leq X \leq 4) = F(4) - F(2) = \frac{4}{5} - \frac{2}{5} = \frac{2}{5} = 0.4$$” |
| An exponential distribution with mean θ has CDF F(x) = 1 − e^{−x/θ} for x > 0, so its survival function is e^{−x/θ}. | formula | elsewhere | Exponential Distribution: “$E[X] = \theta$, $\text{Var}(X) = \theta^2$, and $F(x) = 1 - e^{-x/\theta}$” |

</details>

<details><summary><code>p-089</code> · gap</summary>

Tagged pages: Conditional Probability Function, Geometric Distribution

| Item | Kind | Status | Where |
|---|---|---|---|
| The conditional probability function of Y given X = x is the joint probability function p(x, y) divided by the marginal probability of X at… | definition | tagged | Conditional Probability Function: “$$P(X = x \mid Y = y) = \frac{P(X = x, Y = y)}{P(Y = y)}$$” |
| To identify a conditional distribution, fix the conditioning variable in the joint pmf, drop factors that do not depend on the remaining va… | procedure | missing |  |
| A geometric distribution (trials version) with success probability p has pmf (1-p)^(k-1) p for k = 1, 2, 3, ..., counting the number of tri… | definition | tagged | Geometric Distribution: “$$P(X = k) = (1-p)^{k-1}p, \quad k = 1, 2, 3, \ldots$$” |
| The mean of a geometric random variable on k = 1, 2, 3, ... with success probability p is 1/p. | formula | tagged | Geometric Distribution: “$$E[X] = \frac{1}{p}, \qquad \text{Var}(X) = \frac{1-p}{p^2}$$” |

</details>

<details><summary><code>p-090</code> · gap</summary>

Tagged pages: Discrete Univariate Distributions, Hypergeometric Distribution

| Item | Kind | Status | Where |
|---|---|---|---|
| The expected number of defective items in a subpopulation equals its size times its defective proportion, and defective counts from disjoin… | fact | missing |  |
| Sampling n items without replacement from a finite population containing two types (successes and failures) gives a hypergeometric distribu… | fact | tagged | Hypergeometric Distribution: “The **Hypergeometric Distribution** models the number of successes in a sample of size $n$ drawn **…” |
| For a hypergeometric setting with N items, K successes and sample size n, P(X=k) = C(K,k)·C(N−K,n−k)/C(N,n). | formula | tagged | Hypergeometric Distribution: “$$P(X = k) = \frac{\dbinom{K}{k}\dbinom{N-K}{n-k}}{\dbinom{N}{n}}$$” |
| The binomial coefficient C(n,k) = n!/(k!(n−k)!) counts the number of ways to choose k items from n without regard to order. | definition | missing |  |

</details>

<details><summary><code>p-091</code> · gap</summary>

Tagged pages: Expected Value, Conditional Probability

| Item | Kind | Status | Where |
|---|---|---|---|
| The survival function is S(t) = P(T > t) = 1 - F(t), where F is the cumulative distribution function of the lifetime T. | definition | missing |  |
| The conditional probability of an event A given B is P(A\|B) = P(A and B)/P(B). | formula | tagged | Conditional Probability: “$$P(A \mid B) = \frac{P(A \cap B)}{P(B)}, \quad P(B) > 0$$” |
| For a continuous random variable, P(a < T < b) = F(b) - F(a), so the probability of dying before age b given survival to age a is (F(b) - F… | formula | elsewhere | Cumulative Distribution Function (CDF) (collapsed): “$$P(2 \leq X \leq 4) = F(4) - F(2) = \frac{4}{5} - \frac{2}{5} = \frac{2}{5} = 0.4$$” |
| Interpret a policy on a person aged x as conditional on survival to x: the probability of death within n years is P(T < x+n \| T > x), not … | procedure | missing |  |
| The expected payment of a policy paying a fixed benefit B with probability p of the event is B times p (expected value of a Bernoulli-type … | formula | tagged | Expected Value (collapsed): “$$E[X] = 0(0.5) + 100(0.3) + 500(0.2) = 0 + 30 + 100 = 130$$” |

</details>

<details><summary><code>p-092</code> · gap</summary>

Tagged pages: Probability Rules, Probability

| Item | Kind | Status | Where |
|---|---|---|---|
| The probabilities of all mutually exclusive, exhaustive outcomes in a sample space sum to 1. | fact | linked | Axioms of Probability: “\\| **2. Total Probability** \\| $P(S) = 1$ \\| Something must happen. The probability of the entire s…” |
| Interpret relative sales frequencies as probabilities of the next sale, and translate verbal ratio statements (such as 'one-fourth the numb… | procedure | missing |  |
| The probability that one of two mutually exclusive events occurs is the sum of their individual probabilities. | fact | linked | Mutually Exclusive Events: “For mutually exclusive events, the [[Probability Addition Rule]] simplifies to $P(A \cup B) = P(A) …” |

</details>

<details><summary><code>p-093</code> · untagged</summary>

Tagged pages: Variance and Standard Deviation, Variance, Poisson Distribution, Variance for Conditional and Marginal Distributions

| Item | Kind | Status | Where |
|---|---|---|---|
| Law of Total Variance: Var(N) = E[Var(N \| Λ)] + Var(E[N \| Λ]). | formula | tagged | Variance for Conditional and Marginal Distributions: “$$\text{Var}(X) = E\bigl[\text{Var}(X \mid Y)\bigr] + \text{Var}\bigl(E[X \mid Y]\bigr)$$” |
| A Poisson random variable with mean λ has variance equal to its mean, λ. | fact | tagged | Poisson Distribution: “A defining property is $E[X] = \text{Var}(X) = \lambda$ — the mean and variance are equal” |
| For a Uniform distribution on [a, b], the mean is (a+b)/2. | formula | elsewhere | Uniform Continuous Distribution: “$E[X] = (a+b)/2$, $\text{Var}(X) = (b-a)^2/12$, and $F(x) = (x-a)/(b-a)$ for $a < x < b$” |
| For a Uniform distribution on [a, b], the variance is (b−a)^2/12. | formula | elsewhere | Uniform Continuous Distribution: “$E[X] = (a+b)/2$, $\text{Var}(X) = (b-a)^2/12$, and $F(x) = (x-a)/(b-a)$ for $a < x < b$” |
| When a distribution's parameter is itself random, treat the distribution as conditional on the parameter, then compute the unconditional va… | procedure | tagged | Variance for Conditional and Marginal Distributions (collapsed): “For a [[Poisson Distribution\\|Poisson]], $E[N \mid \Lambda] = \Lambda$ and $\text{Var}(N \mid \Lamb…” |

</details>

<details><summary><code>p-094</code> · gap</summary>

Tagged pages: Conditional Probability, Geometric Distribution

| Item | Kind | Status | Where |
|---|---|---|---|
| The number of independent trials needed to obtain the first success, with success probability p, follows a geometric distribution on {1,2,.… | definition | tagged | Geometric Distribution: “$$E[X] = \frac{1}{p}, \qquad \text{Var}(X) = \frac{1-p}{p^2}$$” |
| To compute a conditional expectation given an event, partition the conditioning event into disjoint cases, find each case's conditional pro… | procedure | linked | The Law of Total Probability: “$$P(B) = \sum_{i=1}^{n} P(B \mid A_i)\,P(A_i)$$” |
| Given that a specified roll is the first occurrence of one outcome (e.g. the second roll is the first 6), the earlier rolls are uniform ove… | fact | missing |  |
| Rolls of a die are independent, so after a fixed number of rolls the remaining wait for a success is a fresh geometric variable (memoryless… | fact | tagged | Geometric Distribution (collapsed): “Memorylessness discards the 8 wasted trials entirely:” |

</details>

<details><summary><code>p-095</code> · untagged</summary>

Tagged pages: Conditional Probability, Continuous Univariate Distributions

| Item | Kind | Status | Where |
|---|---|---|---|
| The number of successes in n independent trials, each with the same success probability p, follows a Binomial(n, p) distribution with P(N=k… | fact | elsewhere | Binomial Distribution: “$$P(X = k) = \binom{n}{k} p^k (1-p)^{n-k}$$” |
| The conditional probability of A given B is P(A\|B) = P(A and B)/P(B), and the conditional expectation of a discrete variable N given an ev… | formula | tagged | Conditional Probability: “P(A \mid B) = \frac{P(A \cap B)}{P(B)}, \quad P(B) > 0” |
| The law of total probability: P(B) = sum over i of P(B \| A_i) P(A_i) for a partition {A_i}, used to compute the marginal probability of an… | formula | linked | The Law of Total Probability: “$$P(B) = \sum_{i=1}^{n} P(B \mid A_i)\,P(A_i)$$” |
| For two independent Uniform[0,1] variables, the joint distribution is uniform over the unit square, so a probability such as P(X+Y<1) is fo… | procedure | elsewhere | Region of Integration: “**Constant density** (independent uniforms): no integral needed. $P(A) = \text{area}(R)/\text{area}…” |
| A Uniform[0,1] random variable takes values in [0,1], so a single loss from it is always less than 1 (probability 1), and zero losses give … | fact | linked | Uniform Continuous Distribution: “The **Continuous Uniform Distribution** $X \sim \text{Unif}(a, b)$ assigns equal probability densit…” |

</details>

<details><summary><code>p-096</code> · untagged</summary>

Tagged pages: Discrete Univariate Distributions, Negative Binomial Distribution

| Item | Kind | Status | Where |
|---|---|---|---|
| The mode of a discrete distribution is the value of the random variable with the largest probability mass. | definition | elsewhere | Mode: “The **Mode** of a [[Random Variable]] $X$ is the value at which its [[Probability Mass Function (PM…” |
| The number of independent trials needed to achieve a fixed number r of successes, each trial having the same success probability, follows a… | fact | tagged | Negative Binomial Distribution: “counts the number of independent Bernoulli trials needed to achieve exactly $r$ successes.” |
| For the number of trials N needed to get r successes with success probability p, P[N=n] = C(n-1, r-1) p^r (1-p)^(n-r) for n >= r. | formula | tagged | Negative Binomial Distribution: “$$P(X = k) = \binom{k-1}{r-1}p^r(1-p)^{k-r}$$” |
| To find the mode of a discrete distribution, compute the pmf at successive values (or compare consecutive ratios) until the probabilities b… | procedure | elsewhere | Mode: “**Discrete:** compare neighbouring probabilities.” |

</details>

<details><summary><code>p-097</code> · gap</summary>

Tagged pages: Combinatorics

| Item | Kind | Status | Where |
|---|---|---|---|
| The number of ways to choose k unordered items from n distinct items is the binomial coefficient C(n,k) = n!/(k!(n-k)!). | formula | linked | Combination: “$$\binom{n}{k} = \frac{n!}{k!\,(n-k)!}$$” |
| Selecting three items with no two sharing a row or column requires them to lie in three distinct columns, so one first chooses which column… | fact | missing |  |
| Count sequential choices with restrictions: for each successive column, the number of allowed rows is the total rows minus the rows already… | procedure | missing |  |
| Multiplication rule: if a selection is made in successive stages with m1, m2, ... choices at each stage, the total number of outcomes is th… | fact | missing |  |

</details>

<details><summary><code>p-098</code> · gap</summary>

Tagged pages: Expected Value

| Item | Kind | Status | Where |
|---|---|---|---|
| The expected value of a payment that is made with probability p (and zero otherwise) equals the payment amount times p, i.e., the expected … | fact | tagged | Expected Value (collapsed): “$$E[X] = 0(0.5) + 100(0.3) + 500(0.2) = 0 + 30 + 100 = 130$$” |
| Expectation is linear: the expected total over several periods or several policyholders is the sum of the individual expected values, even … | fact | missing |  |
| When a population is split into risk classes with different probabilities, compute the expected amount per member of each class and weight … | procedure | elsewhere | Analysis of Surplus: “Multiplying it by $N$ gives the expected profit of the block” |

</details>

<details><summary><code>p-099</code> · untagged</summary>

Tagged pages: Set Theory, Probability

| Item | Kind | Status | Where |
|---|---|---|---|
| The probability of an event equals the sum of the probabilities of its intersections with an event B and with the complement of B (law of t… | fact | linked | Set Operations: “$$P(A^c \cap B) = P(B) - P(A \cap B) = 0.5 - 0.2 = 0.3$$” |
| The probability of a union of two events is P(A ∪ B) = P(A) + P(B) − P(A ∩ B) (inclusion-exclusion). | formula | elsewhere | Inclusion-Exclusion Principle: “$$P(A \cup B) = P(A) + P(B) - P(A \cap B)$$” |
| The probability that neither of two events occurs equals one minus the probability of their union: P(A^c ∩ B^c) = 1 − P(A ∪ B) (complement … | fact | linked | Set Operations: “De Morgan's laws relate them: $(A \cup B)^c = A^c \cap B^c$ and $(A \cap B)^c = A^c \cup B^c$.” |

</details>

<details><summary><code>p-100</code> · answerable</summary>

Tagged pages: Set Theory, Inclusion-Exclusion Principle

| Item | Kind | Status | Where |
|---|---|---|---|
| For three events or sets, the inclusion-exclusion principle gives n(A∪B∪C) = n(A)+n(B)+n(C) − n(A∩B) − n(A∩C) − n(B∩C) + n(A∩B∩C). | formula | tagged | Inclusion-Exclusion Principle: “P(A \cup B \cup C) = {}& P(A) + P(B) + P(C) \\ &- P(A \cap B) - P(A \cap C) - P(B \cap C) \\ &+ P(A…” |
| For mutually exclusive (disjoint) sets, the size of the union equals the sum of the sizes, because the intersection is empty. | fact | tagged | Inclusion-Exclusion Principle: “For [[Mutually Exclusive Events\\|disjoint]] events the intersection terms are $0$, so the rule redu…” |
| The number of elements in none of several sets equals the total population size minus the size of the union of those sets (complement count… | procedure | linked | Mutually Exclusive Events (collapsed): “The three classes are mutually exclusive and cover every claim, so "other" is the complement of $D …” |

</details>

<details><summary><code>p-106</code> · gap</summary>

Tagged pages: Discrete Univariate Distributions, Geometric Distribution

| Item | Kind | Status | Where |
|---|---|---|---|
| The number of independent Bernoulli trials needed to obtain the first success is geometric on {1,2,...}, with P(N=n) = p(1-p)^(n-1). | definition | tagged | Geometric Distribution: “The **Geometric Distribution** $X \sim \text{Geom}(p)$ counts the number of independent Bernoulli t…” |
| For a geometric random variable counting trials to first success, the probability that more than n trials are needed equals (1-p)^n, since … | fact | tagged | Geometric Distribution: “The survival function is clean: $P(X > n) = (1-p)^n$ — "the first $n$ trials all failed."” |
| To find the probability that one independent discrete random variable is less than another, condition on the value of the first and sum P(N… | procedure | elsewhere | The Law of Total Probability: “$$P(B) = \sum_{i=1}^{n} P(B \mid A_i)\,P(A_i)$$” |
| An infinite geometric series with first term a and common ratio \|r\|<1 sums to a/(1-r). | formula | missing |  |

</details>

<details><summary><code>p-107</code> · gap</summary>

Tagged pages: Variance and Standard Deviation, Variance, Poisson Distribution

| Item | Kind | Status | Where |
|---|---|---|---|
| For a Poisson distribution with parameter lambda, the mean and the variance both equal lambda. | fact | tagged | Poisson Distribution: “A defining property is $E[X] = \text{Var}(X) = \lambda$ — the mean and variance are equal” |
| The second raw moment of a Poisson random variable with parameter lambda is E[X^2] = lambda + lambda^2. | formula | missing |  |
| The second raw moment equals the variance plus the square of the mean: E[X^2] = Var(X) + (E[X])^2. | formula | tagged | Variance: “Efficient computation formula: $\text{Var}(X) = E[X^2] - \mu^2$ where $\mu = E[X]$” |
| The Poisson parameter must be positive, so a root of the quadratic that gives a negative parameter is rejected as infeasible. | fact | tagged | Poisson Distribution: “$$\text{where } \lambda > 0 = \text{the rate (mean number of events)}$$” |

</details>

<details><summary><code>p-108</code> · gap</summary>

Tagged pages: Probability Rules, Probability

| Item | Kind | Status | Where |
|---|---|---|---|
| For a point chosen uniformly over a region, the probability of landing in a subregion equals the subregion's area divided by the total area… | fact | tagged | Probability: “If all outcomes in a finite sample space $S$ are equally likely, then $P$ can be calculated as:” |
| The probability of an event equals 1 minus the probability of its complement; here, winning (blue) is the complement of landing in any red … | fact | linked | Mutually Exclusive Events: “The addition rule simplification extends to any finite collection: if $A_1, A_2, \ldots, A_n$ are p…” |
| The sum of a finite geometric series with first term a and ratio r is a(1 - r^N)/(1 - r), for r not equal to 1. | formula | missing |  |
| To solve an inequality of the form c·r^N < k for the smallest integer N, take logarithms of both sides (reversing the inequality when divid… | procedure | missing |  |

</details>

<details><summary><code>p-109</code> · gap</summary>

Tagged pages: Expected Value

| Item | Kind | Status | Where |
|---|---|---|---|
| Dividing a uniform random variable on [0, b] by a constant c gives a uniform random variable on [0, b/c]. | fact | missing |  |
| The k-th raw moment of a continuous random variable is E[X^k] = ∫ x^k f(x) dx over the support; for a uniform on [0, b] the density is 1/b. | formula | linked | Moment: “$$\mu_n' = E[X^n] = \int_{-\infty}^{\infty} x^n f(x)\,dx$$” |
| For a rounded (discretized) continuous variable, the probability of each integer value equals the probability that the original variable fa… | procedure | missing |  |
| The k-th moment of a discrete random variable is E[Y^k] = Σ y^k P(Y=y), summed over all values in its support. | formula | linked | Moment: “For a discrete variable the integral becomes $\sum_x x^n\,p(x)$.” |

</details>

<details><summary><code>p-110</code> · gap</summary>

Tagged pages: Conditional Probability Function, Conditional Probability, Discrete Univariate Distributions

| Item | Kind | Status | Where |
|---|---|---|---|
| To find the probability that a sum of two discrete random variables equals a given value, enumerate all pairs of outcomes that sum to that … | procedure | missing |  |
| The joint probability of two events equals the marginal probability of the first times the conditional probability of the second given the … | formula | linked | The Law of Total Probability: “Every term equals $P(B \mid A_i)\,P(A_i) = P(B \cap A_i)$” |
| Mutually exclusive outcomes (distinct pairs of values) have probabilities that add, as in the law of total probability, so the probability … | fact | linked | The Law of Total Probability: “$$P(B) = \sum_{i=1}^{n} P(B \mid A_i)\,P(A_i)$$” |
| Read a conditional probability from a two-way table by selecting the row for the given (conditioning) value and the column for the outcome … | procedure | missing |  |

</details>

<details><summary><code>p-111</code> · answerable</summary>

Tagged pages: Expected Value, Continuous Univariate Distributions

| Item | Kind | Status | Where |
|---|---|---|---|
| For a continuous random variable with density f(x), the expected value is E[X] = ∫ x f(x) dx over the support of X. | formula | tagged | Expected Value: “\displaystyle\int_{-\infty}^{\infty} x\, f(x)\, dx & \text{(continuous)}” |
| An improper integral of x^(-k) from 1 to infinity converges only if k > 1 (the exponent after integrating is negative), so the mean of a po… | fact | tagged | Expected Value: “The sum or integral must converge absolutely ($\sum_k \\|k\\|\,f(k)$ or $\int \\|x\\|\,f(x)\,dx$ finite…” |
| The antiderivative of x^n (n ≠ -1) is x^(n+1)/(n+1), and the improper integral from a to infinity is evaluated as a limit, which is 0 at in… | fact | prerequisite | Calculus: “$\int x^n\,dx = \dfrac{x^{n+1}}{n+1} + C$, $n \neq -1$ (for $n = -1$: $\ln\lvert x \rvert + C$)” |

</details>

<details><summary><code>p-112</code> · untagged</summary>

Tagged pages: Expected Value

| Item | Kind | Status | Where |
|---|---|---|---|
| A jump discontinuity in a CDF at a point x equals the probability mass P(X=x) at that point, so a CDF with jumps and continuous increasing … | fact | elsewhere | Mixture Distribution: “A mixture of a point mass and a continuous distribution gives a CDF with a jump, such as an annual …” |
| Where the CDF is flat (constant), the random variable has no probability, and where the CDF is continuous and differentiable, the density i… | fact | elsewhere | Continuous Random Variable: “$$f(x) = F'(x)$$” |
| Read the density of a linear CDF segment as its slope, the rise in F divided by the run in x. | procedure | elsewhere | Continuous Random Variable: “$$f(x) = F'(x)$$” |
| For a mixed distribution, E[X] equals the sum over point masses of x·P(X=x) plus the integral of x·f(x) over the continuous region. | formula | elsewhere | Mixture Distribution: “Its moments combine a sum over the mass points with an integral over the continuous part.” |

</details>

<details><summary><code>p-113</code> · gap</summary>

Tagged pages: Probability Rules, Probability, Discrete Univariate Distributions

| Item | Kind | Status | Where |
|---|---|---|---|
| Rolling two fair dice gives 36 equally likely ordered outcomes (6 × 6), each with probability 1/36. | fact | missing |  |
| For a finite sample space of equally likely outcomes, P(event) equals the number of outcomes in the event divided by the total number of ou… | formula | tagged | Probability: “$$P(E) = \frac{\\|E\\|}{\\|S\\|}$$” |
| To find the probability that a function of the dice (such as the absolute difference) falls in a range, decompose the event into disjoint c… | procedure | linked | Mutually Exclusive Events: “if $A_1, A_2, \ldots, A_n$ are pairwise mutually exclusive, then $P\!\left(\bigcup_{i=1}^n A_i\righ…” |
| The absolute value \|a − b\| is the nonnegative distance between a and b, so \|D1 − D2\| = k means the dice differ by k in either order. | definition | missing |  |
| Ordered outcomes with distinct values (a, b) and (b, a) are different outcomes, so each non-tied pair counts twice while tied pairs (a, a) … | fact | linked | Random Variable (collapsed): “So the distribution is $P(X=0)=\tfrac{1}{4}$, $P(X=1)=\tfrac{1}{2}$, $P(X=2)=\tfrac{1}{4}$.” |

</details>

<details><summary><code>p-114</code> · untagged</summary>

Tagged pages: Covariance and Correlation Coefficient, Covariance, Variance

| Item | Kind | Status | Where |
|---|---|---|---|
| The correlation between two random variables equals their covariance divided by the product of their standard deviations, Corr(X,Y) = Cov(X… | definition | tagged | Covariance and Correlation Coefficient: “$$\rho_{X,Y} = \frac{\text{Cov}(X, Y)}{\sigma_X \, \sigma_Y}$$” |
| The variance of a sum of two random variables is Var(X+Y) = Var(X) + Var(Y) + 2Cov(X,Y). | formula | elsewhere | Variance and Standard Deviation: “For a sum, $\text{Var}(X + Y) = \text{Var}(X) + \text{Var}(Y) + 2\,\text{Cov}(X,Y)$” |
| The standard deviation of a random variable is the square root of its variance. | fact | elsewhere | Standard Deviation: “**Standard Deviation** $\sigma$ is the positive square root of [[Variance]]” |

</details>

<details><summary><code>p-115</code> · gap</summary>

Tagged pages: Expected Value, Exponential Distribution, Deductible

| Item | Kind | Status | Where |
|---|---|---|---|
| For a policy with ordinary deductible d and maximum covered loss/payment limit m, the payment per loss is 0 if X ≤ d, X − d if d < X ≤ d + … | procedure | tagged | Exponential Distribution: “The payment is $Y = \min\bigl((X-200)_+,\ 800\bigr)$, which pays out only for $200 < X < 1000$ and …” |
| The expected payment per loss is E[Y] = ∫ over the payment range of (payment) f(x) dx plus the cap amount times P(X > cap point), i.e. ∫_d^… | formula | missing |  |
| An exponential distribution with mean θ has density f(x) = (1/θ)e^{-x/θ} and survival function P(X > x) = e^{-x/θ}. | formula | tagged | Exponential Distribution: “$$f(x) = \frac{1}{\theta}\,e^{-x/\theta}, \quad x > 0$$” |
| Integrals of the form ∫ (x − c) λe^{-λx} dx are evaluated using integration by parts (or equivalently via the exponential's memoryless/limi… | procedure | tagged | Exponential Distribution: “A direct consequence: given $X > d$, the excess $X - d$ is again $\text{Exp}(\theta)$. So $E[X \mid…” |

</details>

<details><summary><code>p-116</code> · gap</summary>

Tagged pages: Central Limit Theorem, Binomial Distribution, Normal Approximation

| Item | Kind | Status | Where |
|---|---|---|---|
| The number of successes in n independent trials, each with the same success probability p, follows a Binomial(n, p) distribution. | fact | tagged | Binomial Distribution: “The **Binomial Distribution** $X \sim \text{Bin}(n, p)$ models the number of successes in $n$ indep…” |
| A Binomial(n, p) random variable has mean np and variance np(1-p). | formula | tagged | Binomial Distribution: “$E[X] = np$ and $\text{Var}(X) = np(1-p)$” |
| A binomial distribution can be approximated by a normal distribution with the same mean and variance (standardize with Z = (x - mu)/sigma). | fact | tagged | Normal Approximation: “A binomial$(n, p)$ is approximately $N\big(np,\ np(1-p)\big)$ and a Poisson$(\lambda)$ approximatel…” |
| Continuity correction: when approximating a discrete integer-valued variable by a normal, treat the integer k as the interval (k-0.5, k+0.5… | procedure | tagged | Normal Approximation: “$P(S_n \le k) \approx \Phi\!\left(\frac{k + 0.5 - n\mu}{\sigma\sqrt{n}}\right)$ and $P(S_n \ge k) \…” |
| For integer-valued X, P(X > N) equals P(X >= N+1). | fact | missing |  |
| The standard normal upper-tail probability P(Z > z) equals 0.10 at z of about 1.282, found from normal tables. | fact | linked | Normal Distribution: “Useful percentiles: $z_{0.90} = 1.282$, $z_{0.95} = 1.645$, $z_{0.975} = 1.960$, $z_{0.99} = 2.326$” |
| To find an integer threshold N where a tail probability crosses a given level, solve the normal-approximation equation for a continuous N a… | procedure | missing |  |

</details>

<details><summary><code>p-117</code> · untagged</summary>

Tagged pages: Discrete Univariate Distributions, Poisson Distribution

| Item | Kind | Status | Where |
|---|---|---|---|
| The sum of independent Poisson random variables is Poisson with mean equal to the sum of the individual means. | fact | elsewhere | Poisson Superposition: “The component processes must be **independent**. The merged process inherits independent increments…” |
| For a Poisson random variable with mean lambda, P(X = k) = e^(-lambda) lambda^k / k!. | formula | tagged | Poisson Distribution: “$$P(X = k) = \frac{e^{-\lambda}\lambda^k}{k!}$$” |
| To find the distribution of the total count over a time window, identify which periods fall within the window (using only those periods) an… | procedure | elsewhere | Poisson Superposition: “a sum of independent Poisson counts is Poisson with the summed mean” |

</details>

<details><summary><code>p-118</code> · gap</summary>

Tagged pages: Variance and Standard Deviation, Standard Deviation, Discrete Univariate Distributions

| Item | Kind | Status | Where |
|---|---|---|---|
| Translate a policy payout rule (a fixed amount per full unit of loss above a threshold, subject to a policy maximum) into a payout random v… | procedure | missing |  |
| For a discrete distribution given as a probability table, obtain the probability of each payout value by summing the probabilities of all i… | procedure | missing |  |
| The expected value of a discrete random variable (or function of it) is the sum of each value (or function value) times its probability: E[… | formula | elsewhere | Discrete Random Variable: “Expectations are sums: $E[g(X)] = \sum_x g(x)\,p(x)$.” |
| Variance equals the second moment minus the square of the mean, Var(Y) = E[Y²] − (E[Y])², and the standard deviation is its square root. | formula | tagged | Variance and Standard Deviation: “Variance is the expected squared deviation; standard deviation is its square root, restored to the …” |

</details>

<details><summary><code>p-119</code> · untagged</summary>

Tagged pages: Conditional Probability, Continuous Univariate Distributions

| Item | Kind | Status | Where |
|---|---|---|---|
| A valid probability density function must integrate to 1 over its support, which determines an unknown normalizing constant. | fact | elsewhere | Probability Density Function (PDF): “The PDF must satisfy $f(x) \geq 0$ and $\int_{-\infty}^{\infty} f(x)\, dx = 1$” |
| For a continuous random variable with density f, the probability P(X > d) equals the integral of f(x) from d to the upper end of the suppor… | formula | linked | Exponential Distribution (collapsed): “$$P(X > 300) = 1 - F(300) = e^{-300/500} = e^{-0.6} \approx 0.5488$$” |
| Conditional probability: P(A \| B) = P(A and B) / P(B), so for nested events P(X > b \| X > a) = P(X > b) / P(X > a) when b > a. | formula | tagged | Conditional Probability: “$$P(A \mid B) = \frac{P(A \cap B)}{P(B)}, \quad P(B) > 0$$” |
| With an ordinary deductible d, the insurer pays only when the loss exceeds d, so the condition that a claim has damages in excess of the de… | definition | linked | Deductible: “If the loss $X$ is less than or equal to the deductible $d$, the insurer pays nothing; above $d$ it…” |

</details>

<details><summary><code>p-120</code> · gap</summary>

Tagged pages: Independent Events

| Item | Kind | Status | Where |
|---|---|---|---|
| Two events A and B are independent if and only if P(A ∩ B) = P(A)P(B). | definition | missing |  |
| Events A, B, and C are mutually independent if every pair is independent and also P(A ∩ B ∩ C) = P(A)P(B)P(C) (the product rule holds for e… | definition | tagged | Independent Events: “For a collection of events $A_1, \ldots, A_n$ to be **mutually independent**, the product rule must…” |
| Pairwise independence of events does not imply mutual independence; the triple product condition must be checked separately. | fact | tagged | Independent Events: “For a collection of events $A_1, \ldots, A_n$ to be **mutually independent**, the product rule must…” |
| For equally likely outcomes of a fair die, compute the probability of an event as the number of favorable outcomes divided by the total num… | procedure | elsewhere | Probability: “If all outcomes in a finite sample space $S$ are equally likely, then $P$ can be calculated as:” |
| The sum of two integers is odd exactly when one is odd and the other is even; the sum is even when both are odd (or both even). | fact | missing |  |
| To find the probability of an intersection of events, rewrite the combined condition in terms of equivalent simpler events (e.g., 'first od… | procedure | missing |  |

</details>

<details><summary><code>p-121</code> · untagged</summary>

Tagged pages: The Law of Total Probability, Conditional Probability

| Item | Kind | Status | Where |
|---|---|---|---|
| Law of total probability: P(E) = sum over a partition of events B_i of P(E \| B_i) P(B_i). | formula | tagged | The Law of Total Probability: “$$P(B) = \sum_{i=1}^{n} P(B \mid A_i)\,P(A_i)$$” |
| Condition on which object (e.g., die) is selected, since the same one is used for repeated trials, and combine the conditional results weig… | procedure | tagged | The Law of Total Probability: “the probability of any event $B$ can be expressed as a weighted average of its conditional probabil…” |
| Given the selected die, successive rolls are independent, so the probability of a given outcome on both rolls is the square of the single-r… | fact | elsewhere | Independent Events: “$$P(A \cap B) = P(A) \cdot P(B)$$” |
| For a fair die (equally likely faces), the probability of an outcome equals the number of faces showing it divided by the total number of f… | fact | elsewhere | Probability: “If all outcomes in a finite sample space $S$ are equally likely, then $P$ can be calculated as:” |
| When one object is chosen at random from a set, each object has probability 1/n, so a type with k identical objects has probability k/n. | fact | elsewhere | Probability: “If all outcomes in a finite sample space $S$ are equally likely, then $P$ can be calculated as:” |

</details>

<details><summary><code>p-122</code> · gap</summary>

Tagged pages: Discrete Univariate Distributions, Hypergeometric Distribution

| Item | Kind | Status | Where |
|---|---|---|---|
| When a fixed number of items is drawn without replacement from a population divided into several groups, each equally likely subset is equa… | fact | tagged | Hypergeometric Distribution: “The **Hypergeometric Distribution** models the number of successes in a sample of size $n$ drawn **…” |
| The multivariate hypergeometric probability of drawing k1,...,km from groups of sizes N1,...,Nm in a sample of size n is the product of C(N… | formula | missing |  |
| The binomial coefficient C(n,k) = n!/(k!(n-k)!) counts the number of ways to choose k items from n without regard to order. | definition | missing |  |
| To count outcomes with a specified composition across groups, choose the required number from each group independently and multiply the cou… | procedure | tagged | Hypergeometric Distribution (collapsed): “$$P(X=2) = \frac{\binom{4}{2}\binom{6}{1}}{\binom{10}{3}} = \frac{6 \cdot 6}{120} = \frac{36}{120} …” |

</details>

<details><summary><code>p-124</code> · untagged</summary>

Tagged pages: Discrete Univariate Distributions, Poisson Distribution

| Item | Kind | Status | Where |
|---|---|---|---|
| The sum of independent Poisson random variables is Poisson, with mean equal to the sum of the individual means. | fact | elsewhere | Discrete Random Variable: “Some families are closed under it — independent Poissons sum to a Poisson with mean $\lambda_1 + \l…” |
| For a Poisson random variable with mean λ, P(X=k) = e^{-λ} λ^k / k! for k = 0, 1, 2, ... | formula | tagged | Poisson Distribution: “$$P(X = k) = \frac{e^{-\lambda}\lambda^k}{k!}$$” |
| To find the probability that a discrete random variable is less than a value, sum the probability mass function over all possible values be… | procedure | elsewhere | Discrete Random Variable: “**Endpoints matter.** $P(X \le 3)$ and $P(X < 3)$ differ by $p(3)$” |

</details>

<details><summary><code>p-125</code> · untagged</summary>

Tagged pages: Discrete Univariate Distributions, Binomial Distribution

| Item | Kind | Status | Where |
|---|---|---|---|
| The number of successes in a fixed number of independent trials, each with the same success probability, follows a binomial distribution. | fact | tagged | Binomial Distribution: “models the number of successes in $n$ independent Bernoulli trials, each with probability of succes…” |
| For a binomial distribution with n trials and success probability p, P(N=k) = C(n,k) p^k (1-p)^(n-k). | formula | tagged | Binomial Distribution: “$$P(X = k) = \binom{n}{k} p^k (1-p)^{n-k}$$” |
| To find the probability of an 'at least k' event for a discrete random variable, sum the probabilities of all individual outcomes at or abo… | procedure | elsewhere | Discrete Random Variable (collapsed): “$P(S \ge 2) = 0.14 + 0.04 = 0.18$” |

</details>

<details><summary><code>p-126</code> · untagged</summary>

Tagged pages: Conditional Probability, Normal Distribution

| Item | Kind | Status | Where |
|---|---|---|---|
| The conditional probability of A given B is P(A\|B) = P(A and B)/P(B), so a probability conditioned on an event is the joint probability di… | definition | tagged | Conditional Probability: “$$P(A \mid B) = \frac{P(A \cap B)}{P(B)}, \quad P(B) > 0$$” |
| To find the probability that a normal random variable with mean mu and standard deviation sigma lies in an interval, standardize the endpoi… | procedure | tagged | Normal Distribution: “Its CDF has no closed form and is evaluated via the standard normal $Z = (X - \mu)/\sigma \sim N(0,…” |
| The standard deviation of a distribution is the square root of its variance. | fact | elsewhere | Variance and Standard Deviation: “$$\sigma = \text{SD}(X) = \sqrt{\text{Var}(X)}$$” |
| For a continuous random variable, P(a < X <= b) = F(b) - F(a) and P(X > a) = 1 - F(a), where F is the CDF. | fact | tagged | Normal Distribution (collapsed): “$$P(S > 55{,}000) = P(Z > 0.791) = 1 - \Phi(0.791) \approx 1 - 0.7855 = 0.2145$$” |
| By symmetry of the standard normal distribution about 0, F(-x) = 1 - F(x) for all x. | fact | tagged | Normal Distribution: “Symmetry gives $\Phi(-z) = 1 - \Phi(z)$ — the identity needed for every negative $z$, since standar…” |

</details>

<details><summary><code>p-127</code> · untagged</summary>

Tagged pages: Bayes Theorem, Conditional Probability

| Item | Kind | Status | Where |
|---|---|---|---|
| The conditional probability of event A given event B is P(A\|B) = P(A ∩ B) / P(B), defined when P(B) > 0. | definition | tagged | Conditional Probability: “$$P(A \mid B) = \frac{P(A \cap B)}{P(B)}, \quad P(B) > 0$$” |
| Compute a joint probability from a given conditional probability by rearranging the definition: P(A ∩ B) = P(A\|B)·P(B) (multiplication rul… | procedure | elsewhere | Probability Multiplication Rule: “$$= P(B) \cdot P(A \mid B)$$” |
| Bayes' theorem reverses a conditional probability: P(B\|C) = P(C\|B)·P(B) / P(C). | formula | tagged | Bayes Theorem: “$$P(H \mid E) = \frac{P(E \mid H)\,P(H)}{P(E)}$$” |

</details>

<details><summary><code>p-128</code> · gap</summary>

Tagged pages: Discrete Univariate Distributions, Hypergeometric Distribution

| Item | Kind | Status | Where |
|---|---|---|---|
| In the hypergeometric setting (sampling n items without replacement from N containing K of one type), P(exactly k of that type) = C(K,k)·C(… | formula | tagged | Hypergeometric Distribution: “$$P(X = k) = \frac{\dbinom{K}{k}\dbinom{N-K}{n-k}}{\dbinom{N}{n}}$$” |
| The binomial coefficient C(n,k) = n!/(k!(n−k)!) counts the number of ways to choose k items from n without regard to order. | definition | missing |  |
| For sequential draws without replacement, multiply conditional probabilities, updating the counts remaining after each draw (e.g., P(A then… | procedure | elsewhere | Probability Multiplication Rule: “For a chain of events, the rule extends to $P(A_1 \cap A_2 \cap \cdots \cap A_n) = P(A_1)\,P(A_2 \m…” |
| An event that can occur in several mutually exclusive orderings has probability equal to the sum of the probabilities of each ordering (add… | fact | elsewhere | Mutually Exclusive Events: “if $A_1, A_2, \ldots, A_n$ are pairwise mutually exclusive, then $P\!\left(\bigcup_{i=1}^n A_i\righ…” |

</details>

<details><summary><code>p-129</code> · untagged</summary>

Tagged pages: Variance and Standard Deviation, Variance, Expected Value

| Item | Kind | Status | Where |
|---|---|---|---|
| For a function g of a continuous random variable X with density f, the expected value is E[g(X)] = ∫ g(x) f(x) dx over the support of X. | formula | elsewhere | Continuous Random Variable: “Expectations replace sums with integrals: $E[g(X)] = \int g(x)\,f(x)\,dx$” |
| The variance of a random variable Y equals Var(Y) = E[Y^2] − (E[Y])^2. | formula | tagged | Variance and Standard Deviation: “The second form $E[X^2] - \mu^2$ is the one to use in practice — it needs only two moments and avoi…” |
| To find the variance of a transformed variable Y = g(X), compute E[Y] and E[Y^2] separately by integrating g(x) and g(x)^2 against the dens… | procedure | tagged | Variance and Standard Deviation: “The second form $E[X^2] - \mu^2$ is the one to use in practice — it needs only two moments and avoi…” |

</details>

<details><summary><code>p-130</code> · untagged</summary>

Tagged pages: Set Theory, Inclusion-Exclusion Principle

| Item | Kind | Status | Where |
|---|---|---|---|
| The probability of an event equals one minus the probability of its complement: P(A) = 1 - P(A^c). | fact | elsewhere | Probability Rules: “$$P(A^c) = 1 - P(A)$$” |
| By De Morgan's law, the event that neither A nor B occurs is the complement of the union: A^c ∩ B^c = (A ∪ B)^c, so P(A ∪ B) = 1 - P(A^c ∩ … | fact | tagged | Set Theory: “Both sides equal $\{1, 3\}$, confirming De Morgan's Law.” |
| Inclusion-exclusion for two events: P(A ∪ B) = P(A) + P(B) - P(A ∩ B). | formula | tagged | Inclusion-Exclusion Principle: “$$P(A \cup B) = P(A) + P(B) - P(A \cap B)$$” |
| To find the probability of the intersection of two events when the marginal probabilities and the union probability are known, rearrange th… | procedure | tagged | Inclusion-Exclusion Principle: “$$P(A \cup B) = P(A) + P(B) - P(A \cap B)$$” |

</details>

<details><summary><code>p-131</code> · gap</summary>

Tagged pages: Continuous Univariate Distributions, Benefit Limit

| Item | Kind | Status | Where |
|---|---|---|---|
| The cumulative distribution function F(x) of a random variable X is F(x) = P(X ≤ x). | definition | elsewhere | Cumulative Distribution Function (CDF): “$$F(x) = P(X \leq x)$$” |
| For a Uniform(a, b) random variable Y, P(Y ≤ y) = (y − a)/(b − a) for a ≤ y ≤ b, 0 below a, and 1 above b. | formula | linked | Uniform Continuous Distribution: “$F(x) = (x-a)/(b-a)$ for $a < x < b$” |
| A benefit capped at a policy limit u is modeled as X = min(Y, u), i.e., X = Y when Y < u and X = u when Y ≥ u. | procedure | elsewhere | Policy Limit: “$$X \wedge u = \begin{cases} X, & X < u \\ u, & X \ge u \end{cases}$$” |
| To find the CDF of a capped variable X = min(Y, u), for x below u the event {X ≤ x} equals {Y ≤ x} so F_X(x) = F_Y(x), and for x ≥ u, F_X(x… | procedure | missing |  |

</details>

<details><summary><code>p-132</code> · gap</summary>

Tagged pages: Conditional Probability

| Item | Kind | Status | Where |
|---|---|---|---|
| The conditional probability of event A given event B is P(A\|B) = P(A and B)/P(B), which for equally likely individuals equals the count in… | definition | tagged | Conditional Probability: “$$P(A \mid B) = \frac{P(A \cap B)}{P(B)}, \quad P(B) > 0$$” |
| Convert a group's proportion and a conditional probability into counts by multiplying the total by the proportion (e.g., females = total mi… | procedure | missing |  |
| Build a two-way contingency table (e.g., gender by age group) and fill in missing cells using row and column totals by subtraction, since c… | procedure | missing |  |
| The complement rule: the count (or probability) of a category not in a set equals the total minus the count (or probability) in the set, e.… | fact | missing |  |

</details>

<details><summary><code>p-133</code> · untagged</summary>

Tagged pages: Bayes Theorem, Conditional Probability

| Item | Kind | Status | Where |
|---|---|---|---|
| Bayes' Theorem: P(A\|B) = P(A)P(B\|A) / sum over a partition of P(A_i)P(B\|A_i), giving the posterior probability of a group given an obser… | formula | tagged | Bayes Theorem: “$$= \frac{P(E \mid H)\,P(H)}{\displaystyle\sum_{i} P(E \mid H_i)\,P(H_i)}$$” |
| The law of total probability: the probability of an event equals the sum over a partition of the group probabilities times the conditional … | fact | linked | The Law of Total Probability: “$$P(B) = \sum_{i=1}^{n} P(B \mid A_i)\,P(A_i)$$” |
| Multiplication rule: P(A and B) = P(A)P(B\|A), so the probability of a chain of events is the product of the probability of the first and t… | formula | elsewhere | Probability Multiplication Rule: “$$P(A \cap B) = P(A) \cdot P(B \mid A)$$” |
| Convert counts in each group into prior probabilities by dividing each group's count by the total count. | procedure | elsewhere | Naive Bayes: “$\pi_k$ is the **prior** probability of class $k$, usually estimated as the share of training obser…” |
| To find the probability that a randomly selected item from a conditioned subset belongs to a given group, compute P(group \| condition) usi… | procedure | tagged | Bayes Theorem (collapsed): “A randomly selected policyholder files a claim. What is the probability they are high-risk?” |

</details>

<details><summary><code>p-134</code> · gap</summary>

Tagged pages: Probability Rules, Probability, Combinatorics, Discrete Univariate Distributions

| Item | Kind | Status | Where |
|---|---|---|---|
| When each of two independent choices is made uniformly at random from n integers, all n^2 ordered pairs are equally likely, so the probabil… | fact | missing |  |
| For equally likely outcomes, the probability of an event equals the number of outcomes in the event divided by the total number of outcomes. | formula | tagged | Probability: “$$P(E) = \frac{\\|E\\|}{\\|S\\|}$$” |
| Translate a condition on the difference of two numbers (e.g., not differing by more than k) into the absolute-value inequality \|X - Y\| <=… | procedure | missing |  |
| Count pairs with \|X - Y\| <= k by fixing X and counting the valid Y values in the range, which is 2k+1 for interior X and fewer near the e… | procedure | missing |  |

</details>

<details><summary><code>p-135</code> · gap</summary>

Tagged pages: Bayes Theorem, Conditional Probability

| Item | Kind | Status | Where |
|---|---|---|---|
| Bayes' Theorem: P(A \| B) = P(B \| A)P(A) / [P(B \| A)P(A) + P(B \| A^c)P(A^c)], where A and A^c partition the sample space. | formula | tagged | Bayes Theorem: “$$= \frac{P(E \mid H)\,P(H)}{\displaystyle\sum_{i} P(E \mid H_i)\,P(H_i)}$$” |
| The probability of the complement of an event equals one minus the probability of the event, P(A^c) = 1 - P(A). | fact | elsewhere | Probability Rules: “$$P(A^c) = 1 - P(A)$$” |
| A random guess on a true-false question is correct with probability 1/2, while a question whose answer is known is answered correctly with … | fact | missing |  |
| If a student knows N of n questions, the probability that a randomly chosen question is one he knows is N/n. | procedure | missing |  |

</details>

<details><summary><code>p-136</code> · untagged</summary>

Tagged pages: Central Limit Theorem, Normal Distribution, Binomial Distribution

| Item | Kind | Status | Where |
|---|---|---|---|
| To find the probability that a normal random variable exceeds a value, standardize by subtracting the mean and dividing by the standard dev… | procedure | tagged | Normal Distribution: “Its CDF has no closed form and is evaluated via the standard normal $Z = (X - \mu)/\sigma \sim N(0,…” |
| The standard normal distribution is symmetric about zero, so P(Z > -a) = P(Z < a). | fact | tagged | Normal Distribution: “Symmetry gives $\Phi(-z) = 1 - \Phi(z)$ — the identity needed for every negative $z$, since standar…” |
| The number of independent trials that succeed, each with the same success probability p, follows a binomial distribution with parameters n … | fact | tagged | Binomial Distribution: “The **Binomial Distribution** $X \sim \text{Bin}(n, p)$ models the number of successes in $n$ indep…” |
| A binomial random variable has mean np and variance np(1-p). | formula | tagged | Binomial Distribution: “$E[X] = np$ and $\text{Var}(X) = np(1-p)$” |
| A binomial probability with large n can be approximated by a normal distribution with the same mean and variance (normal approximation to t… | procedure | elsewhere | Normal Approximation: “A binomial$(n, p)$ is approximately $N\big(np,\ np(1-p)\big)$ and a Poisson$(\lambda)$ approximatel…” |
| When approximating a discrete integer-valued distribution by a normal, apply a continuity correction: P(N >= k) is approximated by P(Normal… | procedure | elsewhere | Normal Approximation: “$P(S_n \ge k) \approx 1 - \Phi\!\left(\frac{k - 0.5 - n\mu}{\sigma\sqrt{n}}\right)$” |

</details>

<details><summary><code>p-137</code> · gap</summary>

Tagged pages: Discrete Univariate Distributions, Poisson Distribution

| Item | Kind | Status | Where |
|---|---|---|---|
| For a Poisson distribution with mean λ, if λ is an integer the distribution has two consecutive modes at λ-1 and λ; if λ is not an integer … | fact | missing |  |
| The Poisson probability mass function is P(X=k) = e^{-λ} λ^k / k! for k = 0, 1, 2, .... | formula | tagged | Poisson Distribution: “$$P(X = k) = \frac{e^{-\lambda}\lambda^k}{k!}$$” |
| The probability of exceeding K is the complement of the cumulative probability: P(X > K) = 1 - P(X ≤ K), so P(X > K) < p is equivalent to P… | fact | missing |  |
| To find the smallest integer K with P(X ≤ K) above a threshold for a discrete distribution, compute the pmf values and sum them successivel… | procedure | tagged | Discrete Univariate Distributions: “$$= \sum_{k \leq x} f(k)$$” |

</details>

<details><summary><code>p-138</code> · gap</summary>

Tagged pages: Conditional Probability, Discrete Univariate Distributions

| Item | Kind | Status | Where |
|---|---|---|---|
| The conditional probability of event A given event B is P(A\|B) = P(A and B) / P(B), which for equally likely outcomes equals the number of… | formula | tagged | Conditional Probability: “$$P(A \mid B) = \frac{P(A \cap B)}{P(B)}, \quad P(B) > 0$$” |
| When two fair dice are tossed, the 36 ordered pairs of outcomes are equally likely, so probabilities can be found by counting favorable pai… | fact | missing |  |
| By symmetry between two exchangeable dice, the non-tied outcomes split evenly, so exactly half of the pairs with unequal numbers have the f… | fact | missing |  |
| The sum of two integers is odd exactly when one is even and the other is odd (opposite parity). | fact | missing |  |

</details>

<details><summary><code>p-139</code> · gap</summary>

Tagged pages: Percentile, Normal Distribution

| Item | Kind | Status | Where |
|---|---|---|---|
| The standard deviation of a distribution is the positive square root of its variance. | definition | elsewhere | Standard Deviation: “**Standard Deviation** $\sigma$ is the positive square root of [[Variance]], measuring the typical …” |
| The p-th percentile of a distribution is the value x such that P(X ≤ x) = p. | definition | tagged | Percentile: “When $F$ is continuous and strictly increasing, it is the value that solves $F(x_p) = p$, found by …” |
| A normal random variable X with mean μ and standard deviation σ is standardized as Z = (X − μ)/σ, so that x = μ + zσ, where Z is standard n… | formula | tagged | Normal Distribution: “Its CDF has no closed form and is evaluated via the standard normal $Z = (X - \mu)/\sigma \sim N(0,…” |
| To find a percentile of a normal distribution, look up the z-value in the standard normal table whose cumulative probability equals the per… | procedure | tagged | Percentile (collapsed): “The 95th percentile of the standard normal is $z_{0.95} = 1.645$. Transform back with $\sigma = 15$:” |
| To find the percentile of a given value under a normal distribution, compute its z-score and read the standard normal cumulative probabilit… | procedure | tagged | Normal Distribution (collapsed): “$$P(S > 55{,}000) = P(Z > 0.791) = 1 - \Phi(0.791) \approx 1 - 0.7855 = 0.2145$$” |
| Reported scores rounded to the nearest multiple of ten: round the computed raw score to the nearest ten, and use that rounded score (not th… | procedure | missing |  |

</details>

<details><summary><code>p-140</code> · gap</summary>

Tagged pages: Linear Combinations of Random Variables, Normal Distribution

| Item | Kind | Status | Where |
|---|---|---|---|
| A linear combination of independent normal random variables is itself normally distributed. | fact | tagged | Linear Combinations of Random Variables: “A linear combination of independent normals is exactly normal, which is what makes [[Probabilities …” |
| For a linear combination of random variables, E[aX + bY + cZ] = aE[X] + bE[Y] + cE[Z]. | formula | tagged | Linear Combinations of Random Variables: “$$E[L] = \sum_{i=1}^{n} c_i\,E[X_i]$$” |
| For independent random variables, Var(aX + bY + cZ) = a^2 Var(X) + b^2 Var(Y) + c^2 Var(Z), so coefficients are squared and negative signs … | formula | tagged | Linear Combinations of Random Variables: “Coefficients enter the variance **squared**, so $\text{Var}(X - Y) = \text{Var}(X) + \text{Var}(Y)$…” |
| To find the probability that one combination of random variables exceeds a multiple of another, rewrite the event as a single variable comp… | procedure | tagged | Normal Distribution (collapsed): “Recast the comparison as a single normal variable $D = X - Y$. Means subtract; **variances add**, e…” |
| Standardize a normal variable by subtracting its mean and dividing by its standard deviation, then use the standard normal table to find th… | procedure | tagged | Normal Distribution: “Its CDF has no closed form and is evaluated via the standard normal $Z = (X - \mu)/\sigma \sim N(0,…” |
| The standard normal distribution is symmetric about zero, so P(Z > -z) = P(Z < z). | fact | tagged | Normal Distribution: “Symmetry gives $\Phi(-z) = 1 - \Phi(z)$ — the identity needed for every negative $z$, since standar…” |
| When a z-value falls between table entries, linearly interpolate between the adjacent standard normal table values. | procedure | missing |  |

</details>

<details><summary><code>p-141</code> · answerable</summary>

Tagged pages: Continuous Univariate Distributions, Deductible

| Item | Kind | Status | Where |
|---|---|---|---|
| For an insurance with an ordinary deductible d, the insurer's payment per loss is Y = max(0, X - d), i.e., the loss amount in excess of the… | definition | tagged | Deductible: “If the loss $X$ is less than or equal to the deductible $d$, the insurer pays nothing; above $d$ it…” |
| If X is uniformly distributed on [a, b], then the survival function is P(X ≥ x) = (b - x)/(b - a) for x in [a, b]. | formula | linked | Uniform Continuous Distribution: “$F(x) = (x-a)/(b-a)$ for $a < x < b$” |
| To find the probability that a payment with deductible d is at least y, convert the event {X - d ≥ y} into {X ≥ y + d} and evaluate it with… | procedure | linked | Transformations of Random Variables: “write $F_Y(y) = P(g(X) \leq y)$, rearrange the inequality into an event about $X$, evaluate with $F…” |

</details>

<details><summary><code>p-142</code> · gap</summary>

Tagged pages: Continuous Univariate Distributions, Exponential Distribution, Probability Density Function (PDF)

| Item | Kind | Status | Where |
|---|---|---|---|
| The exponential distribution with rate λ has CDF F(x) = 1 - e^{-λx} for x > 0. | formula | tagged | Exponential Distribution: “$E[X] = \theta$, $\text{Var}(X) = \theta^2$, and $F(x) = 1 - e^{-x/\theta}$” |
| The exponential distribution with rate λ has density f(x) = λe^{-λx} for x > 0. | formula | tagged | Exponential Distribution: “Some texts parameterize by **rate** $\lambda = 1/\theta$, so $f(x) = \lambda e^{-\lambda x}$ and $E…” |
| The survival probability P(X > x) equals 1 - F(x), which for an exponential distribution equals e^{-λx}. | fact | tagged | Exponential Distribution: “Work from the survival function $S(x) = e^{-x/\theta}$ rather than the CDF; almost every exponentia…” |
| To find the exponential rate parameter from a given tail probability P(X > t) = p, set e^{-λt} = p and solve for λ using the natural logari… | procedure | missing |  |
| Exponent rules allow rewriting e^{-λx} as (e^{-λt})^{x/t}, so a known value of e^{-λt} = p gives e^{-λx} = p^{x/t}. | fact | missing |  |

</details>

<details><summary><code>p-143</code> · gap</summary>

Tagged pages: Continuous Univariate Distributions

| Item | Kind | Status | Where |
|---|---|---|---|
| The mode of a continuous distribution is the value of x at which the probability density function attains its maximum. | definition | elsewhere | Mode: “The **Mode** of a [[Random Variable]] $X$ is the value at which its [[Probability Mass Function (PM…” |
| To find the mode of a continuous density, set the first derivative of the density equal to zero, solve for critical points within the suppo… | procedure | elsewhere | Mode: “**Interior peak (continuous):** solve $f'(x) = 0$ and confirm it is a maximum.” |
| A density specified only up to proportionality has a normalizing constant that does not affect the location of its maximum, so the mode can… | fact | missing |  |

</details>

<details><summary><code>p-144</code> · gap</summary>

Tagged pages: Continuous Univariate Distributions

| Item | Kind | Status | Where |
|---|---|---|---|
| The mode of a continuous random variable is the value of x at which its probability density function attains its maximum. | definition | elsewhere | Mode: “The **Mode** of a [[Random Variable]] $X$ is the value at which its [[Probability Mass Function (PM…” |
| To find the mode of a continuous density, differentiate the density, set the derivative to zero, solve for x within the support, and confir… | procedure | elsewhere | Mode: “**Interior peak (continuous):** solve $f'(x) = 0$ and confirm it is a maximum.” |
| A density given only as proportional to a function has a constant of proportionality that does not affect the location of its maximum, so t… | fact | missing |  |
| The derivative of e^{g(x)} is g'(x) e^{g(x)} (chain rule), and the product rule gives d/dx[u v] = u'v + u v'. | formula | missing |  |

</details>

<details><summary><code>p-145</code> · gap</summary>

Tagged pages: Independent Random Variables, Geometric Distribution, Binomial Distribution

| Item | Kind | Status | Where |
|---|---|---|---|
| Convert a cost threshold into a condition on the total number of claims by dividing by the per-claim cost and finding the largest count who… | procedure | missing |  |
| A geometric distribution on {1,2,...} (number of trials until first success) has pmf (1-p)^(k-1) p and mean 1/p, so p is found as the recip… | definition | tagged | Geometric Distribution: “$$P(X = k) = (1-p)^{k-1}p, \quad k = 1, 2, 3, \ldots$$” |
| Build an unconditional pmf for a zero-modified count by multiplying the probability of having at least one event by the conditional pmf giv… | procedure | elsewhere | Frequency Distribution: “A zero-modified one puts an arbitrary $p_0^M$ at zero and scales the rest as in the second block” |
| For independent random variables, the probability of a specific joint outcome is the product of the individual probabilities. | fact | tagged | Independent Random Variables: “$$f(x,y) = f_X(x)\cdot f_Y(y)$$” |
| To find the probability that a sum of independent discrete variables equals a value, enumerate all combinations of individual outcomes that… | procedure | missing |  |
| The probability that a total is less than a threshold is the sum of the probabilities of the disjoint events for each admissible total valu… | fact | missing |  |

</details>

<details><summary><code>p-146</code> · untagged</summary>

Tagged pages: Conditional Probability, Negative Binomial Distribution

| Item | Kind | Status | Where |
|---|---|---|---|
| The conditional probability of A given B is P(A\|B) = P(A ∩ B) / P(B), and if A is a subset of B then P(A ∩ B) = P(A). | formula | tagged | Conditional Probability: “$$P(A \mid B) = \frac{P(A \cap B)}{P(B)}, \quad P(B) > 0$$” |
| The probability that the k-th success occurs on trial n in independent Bernoulli trials with success probability p is C(n-1, k-1) p^k (1-p)… | fact | tagged | Negative Binomial Distribution: “$$P(X = k) = \binom{k-1}{r-1}p^r(1-p)^{k-r}$$” |
| The probability of exactly k successes in n independent Bernoulli trials with success probability p is C(n,k) p^k (1-p)^(n-k). | formula | elsewhere | Binomial Distribution: “$$P(X = k) = \binom{n}{k} p^k (1-p)^{n-k}$$” |
| For independent events, the probability that all occur is the product of their individual probabilities, and the probability of the complem… | fact | elsewhere | Independent Events: “$$P(A \cap B) = P(A) \cdot P(B)$$” |

</details>

<details><summary><code>p-147</code> · answerable</summary>

Tagged pages: Probability Rules, Probability, Mutually Exclusive Events

| Item | Kind | Status | Where |
|---|---|---|---|
| For a partition of the sample space into mutually exclusive and exhaustive outcomes, the probabilities of all outcomes sum to 1. | fact | linked | Axioms of Probability: “\\| **2. Total Probability** \\| $P(S) = 1$ \\| Something must happen. The probability of the entire s…” |
| The probability of a union of mutually exclusive events equals the sum of their individual probabilities (additivity), so the probability t… | fact | tagged | Mutually Exclusive Events: “if $A_1, A_2, \ldots, A_n$ are pairwise mutually exclusive, then $P\!\left(\bigcup_{i=1}^n A_i\righ…” |
| The complement rule: P(A^c) = 1 - P(A), so the probability of the single stage not included in a set of stages equals 1 minus the probabili… | fact | tagged | Mutually Exclusive Events (collapsed): “The three classes are mutually exclusive and cover every claim, so "other" is the complement of $D …” |
| Translate verbal descriptions of event probabilities (e.g., 'stage 2 or lower', 'stage 1 or higher') into equations in the individual outco… | procedure | tagged | Probability Rules: “$$P(A^c) = 1 - P(A)$$” |

</details>

<details><summary><code>p-148</code> · gap</summary>

Tagged pages: Continuous Univariate Distributions, Exponential Distribution, The Law of Total Probability

| Item | Kind | Status | Where |
|---|---|---|---|
| An exponential distribution with mean θ has rate λ = 1/θ. | fact | tagged | Exponential Distribution: “Some texts parameterize by **rate** $\lambda = 1/\theta$, so $f(x) = \lambda e^{-\lambda x}$ and $E…” |
| The exponential distribution with rate λ has CDF F(x) = 1 - e^{-λx} for x ≥ 0. | formula | tagged | Exponential Distribution: “$E[X] = \theta$, $\text{Var}(X) = \theta^2$, and $F(x) = 1 - e^{-x/\theta}$” |
| For a continuous random variable, P(a < X ≤ b) = F(b) - F(a). | formula | elsewhere | Continuous Random Variable: “$P(X = c) = 0$ for every $c$, so $P(a < X < b) = P(a \le X \le b) = F(b) - F(a)$.” |
| To find the probability of an event that recurs in each period (such as the last quarter of every calendar year), express it as a union of … | procedure | elsewhere | Axioms of Probability: “Add if no overlap. If events are [[Concepts/Mutually Exclusive Events]], the probability of "one or…” |
| A geometric series with common ratio \|r\| < 1 sums to Σ_{k=0}^∞ r^k = 1/(1 - r). | formula | missing |  |
| Calendar year k (k = 0, 1, 2, ...) after the car's purchase at the start of a year corresponds to the interval (k, k+1], so its last quarte… | fact | missing |  |

</details>

<details><summary><code>p-149</code> · gap</summary>

Tagged pages: Discrete Univariate Distributions, Hypergeometric Distribution

| Item | Kind | Status | Where |
|---|---|---|---|
| The event that the k-th success occurs exactly on draw n (sampling without replacement) is equivalent to having exactly k-1 successes in th… | procedure | missing |  |
| In sampling n items without replacement from N items containing K successes, the probability of exactly x successes is C(K,x)C(N-K,n-x)/C(N… | formula | tagged | Hypergeometric Distribution: “$$P(X = k) = \frac{\dbinom{K}{k}\dbinom{N-K}{n-k}}{\dbinom{N}{n}}$$” |
| When drawing without replacement, the probability that the next item is a success given prior draws equals the remaining number of successe… | fact | elsewhere | Probability Multiplication Rule (collapsed): “$$P(A \cap B) = P(A) \cdot P(B \mid A) = \frac{4}{10} \times \frac{3}{9} = \frac{12}{90} = \frac{2}…” |
| The probability of the intersection of two events is the probability of the first times the conditional probability of the second given the… | formula | elsewhere | Probability Multiplication Rule: “$$P(A \cap B) = P(A) \cdot P(B \mid A)$$” |

</details>

<details><summary><code>p-150</code> · gap</summary>

Tagged pages: Conditional Probability Function, Bayes Theorem, Conditional Probability

| Item | Kind | Status | Where |
|---|---|---|---|
| Bayes' Theorem: P(A \| B) = P(B \| A)P(A) / Σ_i P(B \| A_i)P(A_i), where the A_i partition the sample space. | formula | tagged | Bayes Theorem: “$$= \frac{P(E \mid H)\,P(H)}{\displaystyle\sum_{i} P(E \mid H_i)\,P(H_i)}$$” |
| The law of total probability gives the unconditional probability of an event as the sum over a partition of the conditional probability giv… | fact | linked | The Law of Total Probability: “$$P(B) = \sum_{i=1}^{n} P(B \mid A_i)\,P(A_i)$$” |
| A discrete uniform distribution on {1, ..., m} assigns equal probability 1/m to each of the integers 1 through m, and probability 0 to valu… | definition | elsewhere | Uniform Discrete: “$$P(X = k) = \frac{1}{n}, \quad k = 1, 2, \ldots, n$$” |
| Restrict the sum in the denominator to the values of the conditioning variable for which the observed outcome has positive probability, sin… | procedure | missing |  |

</details>

<details><summary><code>p-151</code> · untagged</summary>

Tagged pages: Conditional Probability, Bayes Theorem, The Law of Total Probability

| Item | Kind | Status | Where |
|---|---|---|---|
| The conditional probability of A given B is P(A\|B) = P(A∩B)/P(B), so the joint probability can be written P(A∩B) = P(A\|B)·P(B). | definition | tagged | Conditional Probability: “$$P(A \mid B) = \frac{P(A \cap B)}{P(B)}, \quad P(B) > 0$$” |
| The probability of a complement is P(A^c) = 1 − P(A). | fact | elsewhere | Axioms of Probability (collapsed): “Therefore $P(A^c) = 1 - P(A)$. $\square$” |
| Law of Total Probability: for an event C and a partition {S, S^c}, P(C) = P(C∩S) + P(C∩S^c). | formula | tagged | The Law of Total Probability: “$$P(B) = \sum_{i=1}^{n} P(B \mid A_i)\,P(A_i)$$” |
| When a conditional probability P(S\|C) is given along with a joint probability expressed in terms of P(C), write P(S∩C) = P(S\|C)·P(C) and … | procedure | tagged | The Law of Total Probability: “Every term equals $P(B \mid A_i)\,P(A_i) = P(B \cap A_i)$” |
| Bayes' theorem: P(C\|S) = P(S∩C)/P(S) = P(S\|C)·P(C)/P(S), used to reverse the direction of conditioning. | formula | tagged | Bayes Theorem: “$$P(H \mid E) = \frac{P(E \mid H)\,P(H)}{P(E)}$$” |

</details>

<details><summary><code>p-152</code> · untagged</summary>

Tagged pages: Variance and Standard Deviation, Variance, Standard Deviation, Deductible

| Item | Kind | Status | Where |
|---|---|---|---|
| With an ordinary deductible d, the policy payout per loss is Y = (X - d)+, which equals 0 when X ≤ d and X - d when X > d. | definition | tagged | Deductible: “If the loss $X$ is less than or equal to the deductible $d$, the insurer pays nothing; above $d$ it…” |
| For X uniform on [0, b], the density is 1/b on [0, b], and the variance is b^2/12. | formula | elsewhere | Uniform Continuous Distribution: “$$f(x) = \frac{1}{b - a}, \quad a < x < b$$” |
| Compute the moments of a transformed variable Y = g(X) by integrating g(x)^k times the density of X over the range of X: E[Y^k] = ∫ g(x)^k … | procedure | tagged | Variance and Standard Deviation (collapsed): “E[X^2] &= \int_0^1 x^2 \cdot 3x^2\,dx” |
| Variance equals the second moment minus the square of the mean, Var(Y) = E[Y^2] - (E[Y])^2, and the standard deviation is its square root. | formula | tagged | Variance and Standard Deviation: “$$\sigma = \text{SD}(X) = \sqrt{\text{Var}(X)}$$” |

</details>

<details><summary><code>p-153</code> · gap</summary>

Tagged pages: Set Theory, Event, Sample Space, Set Function

| Item | Kind | Status | Where |
|---|---|---|---|
| The intersection of two events A and B is the event that both A and B occur, so an outcome belongs to A ∩ B only if it satisfies both condi… | definition | linked | Set Operations: “A \cap B = \{\, \omega : \omega \in A \text{ and } \omega \in B \,\}” |
| Two events are the same exactly when they contain the same outcomes; an event that requires a stricter condition is a proper subset of the … | fact | missing |  |
| To compare a described event with a target event, translate each into conditions on the count of outcomes (e.g., accidents in each period) … | procedure | missing |  |
| For integer-valued counts, 'more than one' means at least two, 'one or more' means at least one, and 'at least k' includes k and above; the… | fact | missing |  |

</details>

<details><summary><code>p-154</code> · gap</summary>

Tagged pages: Bayes Theorem, The Law of Total Probability, Conditional Probability

| Item | Kind | Status | Where |
|---|---|---|---|
| Probabilities of mutually exclusive, exhaustive groups sum to 1, so the probability of an unstated group equals 1 minus the sum of the stat… | fact | elsewhere | Mutually Exclusive Events (collapsed): “The three classes are mutually exclusive and cover every claim, so "other" is the complement of $D …” |
| Law of Total Probability: for a partition B_1,...,B_n, P(A) = sum over i of P(A \| B_i) P(B_i). | formula | tagged | The Law of Total Probability: “$$P(B) = \sum_{i=1}^{n} P(B \mid A_i)\,P(A_i)$$” |
| The conditional probability P(A \| B) is the probability of event A occurring given that event B has occurred, equal to P(A and B)/P(B). | definition | tagged | Conditional Probability: “$$P(A \mid B) = \frac{P(A \cap B)}{P(B)}, \quad P(B) > 0$$” |
| When conditional probabilities are related by stated multiples, express them all in terms of one unknown base conditional probability, then… | procedure | missing |  |

</details>

<details><summary><code>p-155</code> · gap</summary>

Tagged pages: Expected Value, Deductible, Payment Random Variable

| Item | Kind | Status | Where |
|---|---|---|---|
| With an ordinary deductible d, the payment on a loss X is max(X - d, 0), so losses at or below d produce no payment and larger losses are r… | definition | tagged | Deductible: “If the loss $X$ is less than or equal to the deductible $d$, the insurer pays nothing; above $d$ it…” |
| The expected payment of a discrete loss distribution under a deductible d is the sum over outcomes of probability times max(x - d, 0), i.e.… | formula | linked | Loss Random Variable (collapsed): “$$E[Y] = E[\max(X - 500,\, 0)] = \int_{500}^{\infty}(x-500)\cdot\frac{1}{1000}e^{-x/1000}\,dx = 100…” |
| When the deductible's location relative to the discrete loss amounts is unknown, solve piecewise: assume a range for d between consecutive … | procedure | missing |  |
| Expected payment under a deductible is a decreasing, piecewise linear function of d, with the slope changing at each possible loss amount; … | fact | elsewhere | Deductible Rating: “so each extra dollar of deductible eliminates $1 - F(D)$ per claim — the chance a loss exceeds $D$ …” |

</details>

<details><summary><code>p-156</code> · untagged</summary>

Tagged pages: Combinatorics, Combination, Probability

| Item | Kind | Status | Where |
|---|---|---|---|
| The number of ways to choose r items from n distinct items, ignoring order, is the binomial coefficient C(n,r) = n!/(r!(n-r)!). | formula | tagged | Combination: “$$\binom{n}{k} = \frac{n!}{k!\,(n-k)!}$$” |
| When a fixed-size subset is drawn at random without replacement from a population, every possible subset is equally likely, so a probabilit… | procedure | tagged | Combinatorics: “In probability, combinatorics determines the sizes of events and sample spaces: $P(A) = \\|A\\| / \\|S…” |
| For a sample of size n drawn without replacement from N items with K of one type, the probability of exactly x of that type is C(K,x)C(N-K,… | formula | linked | Hypergeometric Distribution: “$$P(X = k) = \frac{\dbinom{K}{k}\dbinom{N-K}{n-k}}{\dbinom{N}{n}}$$” |
| The probability of 'at most m' occurrences is the sum of the probabilities of exactly 0, 1, ..., m occurrences, since these outcomes are mu… | fact | elsewhere | Mutually Exclusive Events: “The addition rule simplification extends to any finite collection: if $A_1, A_2, \ldots, A_n$ are p…” |

</details>

<details><summary><code>p-157</code> · answerable</summary>

Tagged pages: Combinatorics, Combination, Probability

| Item | Kind | Status | Where |
|---|---|---|---|
| The binomial coefficient C(n,k) = n!/(k!(n-k)!) counts the number of ways to choose k items from n without regard to order. | definition | tagged | Combination: “A **Combination** $\binom{n}{k}$ ("$n$ choose $k$") counts the number of ways to select $k$ objects…” |
| For drawing without replacement from a finite population with a special subset, the probability that a sample contains a specified number o… | procedure | linked | Hypergeometric Distribution (collapsed): “$$P(X=2) = \frac{\binom{4}{2}\binom{6}{1}}{\binom{10}{3}} = \frac{6 \cdot 6}{120} = \frac{36}{120} …” |
| Hypergeometric probability: with N items, K special items and n drawn without replacement, P(X=k) = C(K,k)·C(N-K,n-k)/C(N,n). | formula | linked | Hypergeometric Distribution: “$$P(X = k) = \frac{\dbinom{K}{k}\dbinom{N-K}{n-k}}{\dbinom{N}{n}}$$” |
| Symmetry of combinations: C(n,k) = C(n,n-k), so choosing which items are included is equivalent to choosing which are excluded. | fact | tagged | Combination: “The identity $\binom{n}{k} = \binom{n}{n-k}$ reflects that choosing $k$ items to include is equival…” |

</details>

<details><summary><code>p-158</code> · untagged</summary>

Tagged pages: Poisson Distribution, Probability

| Item | Kind | Status | Where |
|---|---|---|---|
| The sum of independent Poisson random variables is Poisson with mean equal to the sum of the individual means. | fact | elsewhere | Poisson Superposition: “The component processes must be **independent**. The merged process inherits independent increments…” |
| For a Poisson random variable with mean λ, P(N = k) = e^{-λ} λ^k / k!. | formula | tagged | Poisson Distribution: “$$P(X = k) = \frac{e^{-\lambda}\lambda^k}{k!}$$” |
| To compute a tail probability such as P(N > k) for a discrete distribution, use the complement: 1 minus the sum of the probabilities for al… | procedure | linked | Axioms of Probability (collapsed): “Therefore $P(A^c) = 1 - P(A)$.” |

</details>

<details><summary><code>p-159</code> · gap</summary>

Tagged pages: Poisson Distribution, Probability

| Item | Kind | Status | Where |
|---|---|---|---|
| The mean of a Poisson distribution with parameter lambda equals lambda. | fact | tagged | Poisson Distribution: “A defining property is $E[X] = \text{Var}(X) = \lambda$ — the mean and variance are equal” |
| The Poisson probability mass function is P(N = k) = e^{-lambda} lambda^k / k!, for k = 0, 1, 2, ... | formula | tagged | Poisson Distribution: “$$P(X = k) = \frac{e^{-\lambda}\lambda^k}{k!}$$” |
| Compute an upper-tail probability for a discrete distribution as the complement of a finite sum of point probabilities, e.g. P(N > m) = 1 -… | procedure | linked | Axioms of Probability: “Therefore $P(A^c) = 1 - P(A)$.” |
| For an integer-valued random variable, P(N > x) for non-integer x equals P(N >= ceil(x)), so a strict exceedance of a non-integer mean mean… | fact | missing |  |

</details>

<details><summary><code>p-160</code> · answerable</summary>

Tagged pages: Exponential Distribution, Deductible, Probability

| Item | Kind | Status | Where |
|---|---|---|---|
| Under an ordinary deductible d, the insurer pays something on a loss only when the loss exceeds d, so the probability of a nonzero payment … | fact | tagged | Deductible: “If the loss $X$ is less than or equal to the deductible $d$, the insurer pays nothing; above $d$ it…” |
| For an exponential distribution with rate parameter λ (mean 1/λ), the survival function is S(x) = P(X > x) = e^{-λx}. | formula | tagged | Exponential Distribution: “Work from the survival function $S(x) = e^{-x/\theta}$ rather than the CDF; almost every exponentia…” |

</details>

<details><summary><code>p-161</code> · gap</summary>

Tagged pages: Probability, Continuous Univariate Distributions

| Item | Kind | Status | Where |
|---|---|---|---|
| A valid probability density function must integrate to 1 over its support, which determines the normalizing constant. | fact | elsewhere | Probability Density Function (PDF): “The PDF must satisfy $f(x) \geq 0$ and $\int_{-\infty}^{\infty} f(x)\, dx = 1$” |
| The cumulative distribution function of a continuous random variable is the integral of its density from the lower end of the support up to… | formula | elsewhere | Cumulative Distribution Function (CDF): “For a continuous random variable, $F(x) = \int_{-\infty}^{x} f(t)\, dt$” |
| For a density proportional to x^a on (0, b), the CDF is F(x) = (x/b)^(a+1) for 0 < x < b. | formula | missing |  |
| Solve for an unknown exponent in an equation of the form r^k = p by taking logarithms of both sides, giving k = ln(p)/ln(r). | procedure | missing |  |
| The probability that a random variable exceeds x is the survival function P(X > x) = 1 − F(x). | formula | tagged | Continuous Univariate Distributions: “For anything phrased as a tail probability, work from the survival function $S(x) = 1 - F(x)$ inste…” |
| For a continuous random variable, probabilities of intervals are given by the CDF, and P(X < x) = F(x) since single points have zero probab… | fact | tagged | Continuous Univariate Distributions: “Individual point probabilities are zero; all probabilities are computed as areas under $f$:” |

</details>

<details><summary><code>p-162</code> · gap</summary>

Tagged pages: Poisson Distribution, Expected Value, The Law of Total Probability

| Item | Kind | Status | Where |
|---|---|---|---|
| For a Poisson random variable with mean c, P(N = 0) = e^{-c}, so c can be recovered as -ln of the probability of no events. | formula | tagged | Poisson Distribution: “$$P(X = 0) = \frac{e^{-3} \cdot 3^0}{0!} = e^{-3} \approx 0.0498$$” |
| The mean of a Poisson distribution with parameter c equals c. | fact | tagged | Poisson Distribution: “A defining property is $E[X] = \text{Var}(X) = \lambda$ — the mean and variance are equal” |
| A payment that is zero for the first claim and a fixed amount for each subsequent claim is modeled as the fixed amount times (N-1)+ = max(0… | procedure | missing |  |
| For a nonnegative integer-valued N, E[(N-1)+] = E[N] - E[min(N,1)] = E[N] - P(N ≥ 1), since N = min(N,1) + (N-1)+. | formula | elsewhere | Limited Expected Value: “E[X \wedge u] = E[X] - E[\max(X - u, 0)]” |

</details>

<details><summary><code>p-163</code> · untagged</summary>

Tagged pages: Uniform Continuous Distribution, Expected Value, Deductible

| Item | Kind | Status | Where |
|---|---|---|---|
| With an ordinary deductible d, the portion of a loss X not reimbursed by the insurer (the amount the policyholder bears) is min(X, d). | definition | elsewhere | Limited Expected Value: “The **Limited Expected Value** (LEV) of a random variable $X$ at limit $u$ is the expected value of…” |
| If X is uniformly distributed on [0, b], its density is 1/b on [0, b], and P(X > d) = (b - d)/b for 0 < d < b. | fact | tagged | Uniform Continuous Distribution: “$$f(x) = \frac{1}{b - a}, \quad a < x < b$$” |
| The expected value of a loss limited at d is E[min(X,d)] = ∫_0^d x f(x) dx + d·P(X > d), equivalently ∫_0^d S(x) dx. | formula | elsewhere | Limited Expected Value: “$$E[X \wedge u] = \int_0^u [1 - F(x)]\,dx \quad \text{(for non-negative } X\text{)}$$” |

</details>

<details><summary><code>p-164</code> · untagged</summary>

Tagged pages: Normal Distribution, Probability

| Item | Kind | Status | Where |
|---|---|---|---|
| The p-th percentile of a distribution is the value x such that P(X ≤ x) = p. | definition | elsewhere | Percentile: “When $F$ is continuous and strictly increasing, it is the value that solves $F(x_p) = p$, found by …” |
| A normal distribution N(μ, σ²) is parameterized by its mean μ and variance σ², so the standard deviation is the square root of the variance. | fact | tagged | Normal Distribution: “The **Normal Distribution** $X \sim N(\mu, \sigma^2)$ is a symmetric, bell-shaped continuous distri…” |
| If X ~ N(μ, σ²), then Z = (X − μ)/σ has the standard normal distribution, so P(X ≤ x) = Φ((x − μ)/σ). | formula | tagged | Normal Distribution: “Its CDF has no closed form and is evaluated via the standard normal $Z = (X - \mu)/\sigma \sim N(0,…” |
| To find a normal percentile, look up the standard normal quantile Φ⁻¹(p) in the standard normal table (using the negative value when p < 0.… | procedure | tagged | Normal Distribution: “Symmetry gives $\Phi(-z) = 1 - \Phi(z)$ — the identity needed for every negative $z$, since standar…” |

</details>

<details><summary><code>p-165</code> · untagged</summary>

Tagged pages: Normal Distribution, Probability

| Item | Kind | Status | Where |
|---|---|---|---|
| The p-th percentile of a distribution is the value x such that P(X ≤ x) = p/100, i.e., F(x) = p/100. | definition | elsewhere | Percentile: “When $F$ is continuous and strictly increasing, it is the value that solves $F(x_p) = p$, found by …” |
| If X is normal with mean μ and standard deviation σ, then Z = (X − μ)/σ is standard normal, so X = μ + zσ and probabilities are P(X ≤ x) = … | fact | tagged | Normal Distribution: “Its CDF has no closed form and is evaluated via the standard normal $Z = (X - \mu)/\sigma \sim N(0,…” |
| Find the percentile of a standard normal by using the standard normal table, either looking up the z-value for a given probability (inverse… | procedure | tagged | Normal Distribution: “Symmetry gives $\Phi(-z) = 1 - \Phi(z)$ — the identity needed for every negative $z$, since standar…” |
| The standard deviation is the square root of the variance, so if one variance is k times another, its standard deviation is √k times as lar… | fact | elsewhere | Variance and Standard Deviation: “$$\sigma = \text{SD}(X) = \sqrt{\text{Var}(X)}$$” |
| To match a percentile across two normal distributions, set the two raw values equal (μ_A + z_A σ_A = μ_B + z_B σ_B), then solve for the sec… | procedure | elsewhere | Percentile (collapsed): “The 95th percentile of the standard normal is $z_{0.95} = 1.645$. Transform back with $\sigma = 15$:” |

</details>

<details><summary><code>p-166</code> · answerable</summary>

Tagged pages: Exponential Distribution, Variance, Conditional Probability

| Item | Kind | Status | Where |
|---|---|---|---|
| A shifted exponential density f(x) = (1/θ)e^{-(x-a)/θ} for x > a describes X = a + W, where W is exponential with mean θ. | definition | tagged | Exponential Distribution: “A direct consequence: given $X > d$, the excess $X - d$ is again $\text{Exp}(\theta)$. So $E[X \mid…” |
| An exponential random variable with mean θ has variance θ². | fact | tagged | Exponential Distribution: “$E[X] = \theta$, $\text{Var}(X) = \theta^2$, and $F(x) = 1 - e^{-x/\theta}$” |
| Memoryless property: for an exponential W, the excess W − d given W ≥ d has the same exponential distribution as W. | fact | tagged | Exponential Distribution: “A direct consequence: given $X > d$, the excess $X - d$ is again $\text{Exp}(\theta)$.” |
| Adding a constant to a random variable does not change its variance, so Var(W + c) = Var(W). | fact | tagged | Variance: “$\text{Var}(aX + b) = a^2 \text{Var}(X)$ — scaling changes variance, shifts do not” |
| To find the variance of a random variable conditional on exceeding a threshold, rewrite the conditional variable as a constant plus the con… | procedure | tagged | Exponential Distribution (collapsed): “Averaged over payments only, condition on $X > 300$ and use memorylessness — the excess is again $\…” |

</details>

<details><summary><code>p-167</code> · answerable</summary>

Tagged pages: Normal Distribution, Standard Deviation, Probability

| Item | Kind | Status | Where |
|---|---|---|---|
| To find a probability for a normal random variable X with mean mu and standard deviation sigma, standardize: P(X < x) = Phi((x - mu)/sigma)… | procedure | tagged | Normal Distribution: “Its CDF has no closed form and is evaluated via the standard normal $Z = (X - \mu)/\sigma \sim N(0,…” |
| A loss (negative profit) for a normal profit variable corresponds to the event X < 0, whose probability is Phi(-mu/sigma). | fact | tagged | Normal Distribution (collapsed): “P(X < Y) &= P(D < 0) \\” |
| Given a target normal probability, find the corresponding z-value by inverting the standard normal CDF (using the normal table), then solve… | procedure | tagged | Normal Distribution: “Useful percentiles: $z_{0.90} = 1.282$, $z_{0.95} = 1.645$, $z_{0.975} = 1.960$, $z_{0.99} = 2.326$” |
| Standard normal values are symmetric: Phi(-z) = 1 - Phi(z), so lower-tail probabilities can be read from the table for positive z. | fact | tagged | Normal Distribution: “Symmetry gives $\Phi(-z) = 1 - \Phi(z)$ — the identity needed for every negative $z$, since standar…” |

</details>

<details><summary><code>p-168</code> · untagged</summary>

Tagged pages: Normal Distribution, Central Limit Theorem, Probability

| Item | Kind | Status | Where |
|---|---|---|---|
| For a linear transformation Y = aX + b, the mean is E[Y] = aE[X] + b. | fact | elsewhere | Transformations of Random Variables: “A linear transformation $Y = aX + b$ gives $E[Y] = aE[X] + b$ and $\text{Var}(Y) = a^2\text{Var}(X)…” |
| For a linear transformation Y = aX + b, the standard deviation is SD(Y) = \|a\|·SD(X), so the shift b does not affect the spread. | fact | elsewhere | Transformations of Random Variables: “A linear transformation $Y = aX + b$ gives $E[Y] = aE[X] + b$ and $\text{Var}(Y) = a^2\text{Var}(X)…” |
| A linear transformation of a normal random variable is also normally distributed. | fact | tagged | Normal Distribution: “Any **linear combination of independent normals is exactly normal**: if $X_i \sim N(\mu_i, \sigma_i…” |
| The mean of n independent identically distributed normal random variables is normal with the same mean and variance σ²/n (standard deviatio… | fact | elsewhere | Sample Mean: “For a Normal population the result is exact: $\bar{X} \sim N(\mu, \sigma^2/n)$, and $\bar{X}$ is in…” |
| To find a probability for a normal random variable, standardize via Z = (X − μ)/σ and compute the probability from the standard normal CDF … | procedure | tagged | Normal Distribution: “Its CDF has no closed form and is evaluated via the standard normal $Z = (X - \mu)/\sigma \sim N(0,…” |

</details>

<details><summary><code>p-169</code> · gap</summary>

Tagged pages: Joint Probability Function, Moments for Joint Distributions

| Item | Kind | Status | Where |
|---|---|---|---|
| A joint probability function must sum to 1 over its entire support, which is used to solve for an unknown constant in the pmf. | fact | tagged | Joint Probability Function: “It satisfies $p(x,y) \geq 0$ for all $(x,y)$ and $\displaystyle\sum_x \sum_y p(x,y) = 1$” |
| Identify the support of a joint discrete pmf by listing all (x,y) pairs that satisfy the stated constraints (e.g., x ≤ y within the given r… | procedure | missing |  |
| Express the quantity of interest as a function of the random variables (here, the number of tornadoes with losses below the threshold equal… | procedure | missing |  |
| For a function g(X,Y) of jointly discrete random variables, E[g(X,Y)] = Σ over all (x,y) of g(x,y)·p(x,y). | formula | tagged | Moments for Joint Distributions: “$$E[g(X,Y)] = \sum_x \sum_y g(x,y)\,p(x,y)$$” |

</details>

<details><summary><code>p-170</code> · untagged</summary>

Tagged pages: Moments for Joint Distributions, Joint Probability Function

| Item | Kind | Status | Where |
|---|---|---|---|
| Counting a random selection of k items from n without replacement and without regard to order gives C(n,k) equally likely samples, where C(… | definition | elsewhere | Hypergeometric Distribution: “$$P(X = k) = \frac{\dbinom{K}{k}\dbinom{N-K}{n-k}}{\dbinom{N}{n}}$$” |
| To find the probability of a given composition of a sample drawn without replacement from groups of different types, multiply the number of… | procedure | elsewhere | Hypergeometric Distribution (collapsed): “$$P(X=2) = \frac{\binom{4}{2}\binom{6}{1}}{\binom{10}{3}} = \frac{6 \cdot 6}{120} = \frac{36}{120} …” |
| The expected value of a function g of a discrete random variable (or pair of variables) is the sum of g(outcome) times its probability over… | formula | tagged | Moments for Joint Distributions: “$$E[g(X,Y)] = \sum_x \sum_y g(x,y)\,p(x,y)$$” |
| Build a joint probability table for the counts of two categories in a sample by listing each feasible pair of counts, computing the absolut… | procedure | tagged | Moments for Joint Distributions: “$$E[g(X,Y)] = \sum_x \sum_y g(x,y)\,p(x,y)$$” |

</details>

<details><summary><code>p-171</code> · gap</summary>

Tagged pages: Joint Probability Function, Variance, Covariance

| Item | Kind | Status | Where |
|---|---|---|---|
| Find the distribution of a function of two discrete random variables (such as the product XY) by summing the joint probabilities of all (x,… | procedure | elsewhere | Discrete Random Variable: “The PMF of a sum of independent discrete variables is a **convolution**, $P(X + Y = s) = \sum_x p_X…” |
| The probabilities of all outcomes in a joint probability function sum to 1, so an unspecified remainder probability equals 1 minus the sum … | fact | tagged | Joint Probability Function: “It satisfies $p(x,y) \geq 0$ for all $(x,y)$ and $\displaystyle\sum_x \sum_y p(x,y) = 1$” |
| The expected value of a function of a discrete random variable is the sum of the function's value times the probability of each outcome, so… | formula | elsewhere | Discrete Random Variable: “Expectations are sums: $E[g(X)] = \sum_x g(x)\,p(x)$.” |
| The variance of a random variable is Var(W) = E[W²] − (E[W])². | formula | tagged | Variance: “Efficient computation formula: $\text{Var}(X) = E[X^2] - \mu^2$ where $\mu = E[X]$” |
| To maximize a differentiable function of a parameter, set its first derivative to zero, solve for the parameter, and check that the solutio… | procedure | missing |  |
| The probability of the union 'A or B' is 1 minus the probability of its complement, 'not A and not B'; here, 'X=0 or Y=0' is the complement… | fact | missing |  |

</details>

<details><summary><code>p-172</code> · gap</summary>

Tagged pages: Conditional Probability Function, Bayes Theorem, Moments for Joint Distributions

| Item | Kind | Status | Where |
|---|---|---|---|
| The binomial distribution with n trials and success probability p has pmf P(N=k)=C(n,k) p^k (1-p)^(n-k) for k=0,...,n. | formula | elsewhere | Binomial Distribution: “$$P(X = k) = \binom{n}{k} p^k (1-p)^{n-k}$$” |
| The joint probability of two events is the product of a conditional probability and the marginal probability of the conditioning event: P(J… | formula | linked | The Law of Total Probability: “Every term equals $P(B \mid A_i)\,P(A_i) = P(B \cap A_i)$” |
| The marginal probability of an event is found by summing the joint probabilities over all values of the other variable (law of total probab… | formula | linked | The Law of Total Probability: “$$P(B) = \sum_{i=1}^{n} P(B \mid A_i)\,P(A_i)$$” |
| Bayes' theorem gives the conditional distribution P(J=m \| K=k)=P(K=k \| J=m)P(J=m)/P(K=k). | formula | tagged | Bayes Theorem: “$$P(H \mid E) = \frac{P(E \mid H)\,P(H)}{P(E)}$$” |
| A conditional expectation of a discrete random variable given an event is the sum of each value times its conditional probability: E[J \| K… | formula | linked | Expected Value: “$$E[X] = \begin{cases} \displaystyle\sum_{k} k\, f(k) & \text{(discrete)} \\[6pt] \displaystyle\int…” |
| To find the possible values of the conditioning variable, identify which values have nonzero conditional probability of producing the obser… | procedure | missing |  |

</details>

<details><summary><code>p-173</code> · gap</summary>

Tagged pages: Variance for Conditional and Marginal Distributions, Conditional Probability Function

| Item | Kind | Status | Where |
|---|---|---|---|
| A conditional probability mass function given an event is the joint probability of each outcome and the event divided by the probability of… | definition | tagged | Conditional Probability Function: “$$P(X = x \mid Y = y) = \frac{P(X = x, Y = y)}{P(Y = y)}$$” |
| To condition on a sum of two discrete random variables taking a given value, list all joint outcome pairs whose components add to that valu… | procedure | missing |  |
| The conditional expectation of a discrete random variable given an event is the sum of each value times its conditional probability given t… | formula | tagged | Variance for Conditional and Marginal Distributions (collapsed): “Then $E[X \mid Y=2] = 0(0.2)+1(0.8) = 0.8$ and $E[X^2 \mid Y=2] = 0.8$.” |
| Variance equals the second moment minus the square of the mean, Var(X) = E[X^2] - (E[X])^2, and this also holds for conditional variance us… | formula | tagged | Variance for Conditional and Marginal Distributions: “$$\text{Var}(X \mid Y=y) = E[X^2 \mid Y=y] - \bigl(E[X \mid Y=y]\bigr)^2$$” |

</details>

<details><summary><code>p-174</code> · untagged</summary>

Tagged pages: Moments for Joint Distributions, Variance, Standard Deviation

| Item | Kind | Status | Where |
|---|---|---|---|
| When a random observation is drawn from a population made of equally likely subgroups, its distribution is the mixture: the unconditional p… | fact | elsewhere | Mixture Distribution: “Any quantity that is *linear* in the density — a probability, a mean, a second moment — can be foun…” |
| For a discrete random variable, E[X] = sum of x * P(X = x) over all possible values x. | formula | linked | Expected Value: “$$E[X] = \begin{cases} \displaystyle\sum_{k} k\, f(k) & \text{(discrete)} \\[6pt] \displaystyle\int…” |
| For a discrete random variable, the second moment is E[X^2] = sum of x^2 * P(X = x) over all possible values x. | formula | elsewhere | Discrete Random Variable: “Expectations are sums: $E[g(X)] = \sum_x g(x)\,p(x)$.” |
| Var(X) = E[X^2] - (E[X])^2, and the standard deviation is the square root of the variance. | formula | tagged | Standard Deviation: “$$\sigma = \sqrt{\text{Var}(X)}$$” |

</details>

<details><summary><code>p-175</code> · answerable</summary>

Tagged pages: Probabilities for Linear Combinations, Normal Distribution, Moments for Linear Combinations

| Item | Kind | Status | Where |
|---|---|---|---|
| A sum of independent normal random variables is normal, with mean equal to the sum of the means and variance equal to the sum of the varian… | fact | tagged | Probabilities for Linear Combinations: “When the $X_i$ are independent normals, $L$ is itself normal and is handled by standardization.” |
| For independent random variables, Var(X - Y) = Var(X) + Var(Y), and E[X - Y] = E[X] - E[Y]; variances add even when subtracting. | formula | tagged | Normal Distribution: “Means subtract; **variances add**, even for a difference:” |
| For n independent identically distributed variables with mean mu and variance sigma^2, the total has mean n*mu and variance n*sigma^2 (stan… | formula | linked | Normal Approximation: “compute $E[S_n] = n\mu$ and $\text{Var}(S_n) = n\sigma^2$” |
| To find a probability for a normal random variable X with mean mu and standard deviation sigma, standardize via Z = (X - mu)/sigma and eval… | procedure | tagged | Normal Distribution: “Its CDF has no closed form and is evaluated via the standard normal $Z = (X - \mu)/\sigma \sim N(0,…” |
| The standard normal distribution is symmetric, so P(Z > -z) = P(Z < z) = Phi(z). | fact | tagged | Normal Distribution: “Symmetry gives $\Phi(-z) = 1 - \Phi(z)$ — the identity needed for every negative $z$, since standar…” |

</details>

<details><summary><code>p-176</code> · untagged</summary>

Tagged pages: Probabilities for Linear Combinations, Joint Probability Function

| Item | Kind | Status | Where |
|---|---|---|---|
| The mode of a discrete distribution is the value of the random variable that has the highest probability mass. | definition | elsewhere | Mode: “The **Mode** of a [[Random Variable]] $X$ is the value at which its [[Probability Mass Function (PM…” |
| For independent discrete random variables X and Y, the probability that the sum equals k is the convolution P(X+Y=k) = sum over i of P(X=i)… | formula | tagged | Probabilities for Linear Combinations: “$$P(X + Y = s) = \sum_{x} P(X = x)\,P(Y = s - x) \qquad \text{for independent integer-valued } X, Y…” |
| For independent random variables, the joint probability of a specific pair of outcomes equals the product of their individual probabilities. | fact | linked | Multivariate Distribution: “If all variables are [[Independent Random Variables]], the joint distribution factors as the produc…” |
| To find the distribution of a total count from two independent sources, enumerate every combination of individual counts giving each total … | procedure | tagged | Probabilities for Linear Combinations: “When the $X_i$ are independent and discrete, the distribution of $L$ is built by adding up, for eac…” |

</details>

<details><summary><code>p-177</code> · gap</summary>

Tagged pages: Moments for Linear Combinations, Binomial Distribution, Covariance

| Item | Kind | Status | Where |
|---|---|---|---|
| A Bernoulli random variable with success probability p has variance p(1-p). | formula | missing |  |
| For a constant a, Var(aX) = a^2 Var(X). | formula | linked | Variance: “$\text{Var}(aX + b) = a^2 \text{Var}(X)$ — scaling changes variance, shifts do not” |
| The variance of a sum of independent random variables equals the sum of their variances. | fact | tagged | Moments for Linear Combinations: “$$\text{Var}(W) = \sum_{i=1}^n a_i^2 \,\text{Var}(X_i)$$” |
| Model a payment that depends on whether each of several events occurs as a linear combination of indicator (Bernoulli) random variables, wi… | procedure | missing |  |
| Compute the variance of the total over independent identical policyholders by multiplying the per-policyholder variance by the number of po… | procedure | tagged | Moments for Linear Combinations: “$$\text{Var}(W) = \sum_{i=1}^n a_i^2 \,\text{Var}(X_i)$$” |

</details>

<details><summary><code>p-178</code> · gap</summary>

Tagged pages: Moments for Joint Distributions, Conditional Probability, Independent Events

| Item | Kind | Status | Where |
|---|---|---|---|
| When each of n independently selected items falls into one of several categories with fixed probabilities, the items are independent and id… | fact | missing |  |
| The probability that at least one of n independent trials results in an event with probability p is 1 - (1-p)^n, the complement of no occur… | formula | elsewhere | Probability Rules: “The complement rule is the workhorse shortcut — "at least one" is almost always faster as $1 - P(\t…” |
| The conditional probability of A given B is P(A\|B) = P(A and B) / P(B). | formula | tagged | Conditional Probability: “$$P(A \mid B) = \frac{P(A \cap B)}{P(B)}, \quad P(B) > 0$$” |
| The expected value of a sum of indicator variables equals the sum of their expectations (linearity of expectation), and E[indicator] equals… | fact | missing |  |
| By symmetry among exchangeable identical independent items, each item has the same conditional probability of an event given a symmetric co… | fact | missing |  |
| To find the joint probability that item 1 is of one type and at least one item is of another type, use independence and mutual exclusivity:… | procedure | missing |  |

</details>

<details><summary><code>p-179</code> · gap</summary>

Tagged pages: Order Statistics, Combinatorics

| Item | Kind | Status | Where |
|---|---|---|---|
| The second largest of a set of selected integers is the order statistic such that exactly one selected value lies above it and the remainin… | definition | missing |  |
| The number of ways to choose k distinct items from n without regard to order is the binomial coefficient C(n,k) = n!/(k!(n-k)!). | formula | linked | Combination: “$$\binom{n}{k} = \frac{n!}{k!\,(n-k)!}$$” |
| When selecting without replacement with all subsets equally likely, the probability of an event equals the number of favorable subsets divi… | fact | tagged | Combinatorics: “In probability, combinatorics determines the sizes of events and sample spaces: $P(A) = \\|A\\| / \\|S…” |
| To count the outcomes where a given value x is the j-th largest, fix x in the selection, choose the required number of values from those gr… | procedure | missing |  |
| The support of the second largest of four values drawn from 1..n requires at least 2 values below x and at least 1 above, so p(x)>0 only fo… | fact | missing |  |

</details>

<details><summary><code>p-180</code> · untagged</summary>

Tagged pages: Normal Distribution, Conditional Probability, Deductible

| Item | Kind | Status | Where |
|---|---|---|---|
| Standardize a normal random variable by subtracting the mean and dividing by the standard deviation, so that P(X < x) = Φ((x − μ)/σ). | procedure | tagged | Normal Distribution: “Its CDF has no closed form and is evaluated via the standard normal $Z = (X - \mu)/\sigma \sim N(0,…” |
| Use the standard normal table in reverse: given a cumulative probability, find the corresponding z-value (percentile). | procedure | tagged | Normal Distribution: “Useful percentiles: $z_{0.90} = 1.282$, $z_{0.95} = 1.645$, $z_{0.975} = 1.960$, $z_{0.99} = 2.326$” |
| The conditional probability is P(A \| B) = P(A ∩ B) / P(B); for a loss conditional on exceeding a deductible d, P(X < k \| X > d) = P(d < X… | formula | tagged | Conditional Probability: “$$P(A \mid B) = \frac{P(A \cap B)}{P(B)}, \quad P(B) > 0$$” |
| For a continuous random variable, P(d < X < k) = P(X > d) − P(X > k) (equivalently F(k) − F(d)), and P(X > x) = 1 − P(X < x). | fact | elsewhere | Cumulative Distribution Function (CDF) (collapsed): “$$P(2 \leq X \leq 4) = F(4) - F(2) = \frac{4}{5} - \frac{2}{5} = \frac{2}{5} = 0.4$$” |
| By symmetry of the standard normal distribution, Φ(−z) = 1 − Φ(z), so P(X > μ − a) = Φ(a/σ). | fact | tagged | Normal Distribution: “Symmetry gives $\Phi(-z) = 1 - \Phi(z)$ — the identity needed for every negative $z$, since standar…” |

</details>

<details><summary><code>p-181</code> · gap</summary>

Tagged pages: Uniform Continuous Distribution, Deductible, Probability

| Item | Kind | Status | Where |
|---|---|---|---|
| With an ordinary deductible d, the insurer's payment per loss (over all losses) is Y = (X - d)+, equal to 0 when the loss is at most d and … | definition | tagged | Deductible: “If the loss $X$ is less than or equal to the deductible $d$, the insurer pays nothing; above $d$ it…” |
| A payment variable over all losses has a point mass at 0 equal to P(X <= d), so its CDF jumps to P(X <= d) at y = 0. | fact | missing |  |
| For X uniform on [0, b], the CDF is F(x) = x/b for 0 <= x <= b. | formula | tagged | Uniform Continuous Distribution: “$F(x) = (x-a)/(b-a)$ for $a < x < b$” |
| Derive the CDF of the payment Y = (X - d)+ for y > 0 as F_Y(y) = P(X <= y + d) = F_X(y + d). | procedure | elsewhere | Transformations of Random Variables: “write $F_Y(y) = P(g(X) \leq y)$, rearrange the inequality into an event about $X$, evaluate with $F…” |
| The p-th percentile of a random variable is the smallest value x such that F(x) >= p; the median is the 50th percentile. | definition | elsewhere | Percentile: “The 50th percentile ($p = 0.5$) is the [[Median\\|median]].” |
| If the probability mass at 0 exceeds the percentile level p, then the p-th percentile of the variable is 0; otherwise solve F(y) = p for th… | fact | elsewhere | Percentile (collapsed): “Since $F_Y(0) = 0.1813 \ge 0.10$, the 10th percentile is $y_{0.10} = 0$, even though $F_Y(y) = 0.10…” |

</details>

<details><summary><code>p-182</code> · gap</summary>

Tagged pages: Venn Diagram, Set Function, Probability

| Item | Kind | Status | Where |
|---|---|---|---|
| Partition the union of several events into disjoint regions of a Venn diagram (only one set, exactly two sets, all three sets) and assign a… | procedure | missing |  |
| The count of a pairwise intersection (e.g., A and H) includes those in all three sets, so the count in exactly those two sets equals the pa… | fact | tagged | Venn Diagram (collapsed): “If you just put "70" in the Auto circle, you've forgotten that 20 of those people also have Homeown…” |
| The total count of a single set equals the sum of the disjoint regions within it: only that set, that set with each other set exclusively, … | fact | tagged | Venn Diagram (collapsed): “If you just put "70" in the Auto circle, you've forgotten that 20 of those people also have Homeown…” |
| The number belonging to at least one of the sets is the sum of all disjoint regions: those in exactly one set, exactly two sets, and all th… | fact | elsewhere | Inclusion-Exclusion Principle: “The signs alternate by intersection size: add single events, subtract pairwise intersections, add t…” |

</details>

<details><summary><code>p-183</code> · gap</summary>

Tagged pages: Venn Diagram, Set Function, Probability

| Item | Kind | Status | Where |
|---|---|---|---|
| Partition the union of three sets into seven disjoint regions (only one set, exactly two sets, all three) and express each set's total coun… | procedure | missing |  |
| Obtain the count of the 'exactly two sets' region by subtracting the count in all three sets from the reported pairwise intersection count … | procedure | tagged | Venn Diagram (collapsed): “If you just put "70" in the Auto circle, you've forgotten that 20 of those people also have Homeown…” |
| The number of elements in the union of three sets equals the sum of the counts of the seven disjoint regions (only-one, exactly-two, and al… | fact | missing |  |
| Translate verbal conditions (such as 'x more own only L than only A' and 'total owning exactly one type') into linear equations among the r… | procedure | missing |  |

</details>

<details><summary><code>p-184</code> · answerable</summary>

Tagged pages: Probability Addition Rule, Venn Diagram

| Item | Kind | Status | Where |
|---|---|---|---|
| For three events, the probability or count of the union equals the sum of the single-event values, minus the sum of the pairwise intersecti… | formula | tagged | Probability Addition Rule: “$$P(A \cup B \cup C) = P(A)+P(B)+P(C) - P(A \cap B) - P(A \cap C) - P(B \cap C) + P(A \cap B \cap C…” |
| The number of items in none of the events equals the total number of items minus the number in the union of the events (complement rule). | fact | tagged | Venn Diagram (collapsed): “$$P(\text{Neither}) = 1 - P(A \cup H) = 1 - 0.90 = 0.10$$” |
| Counts or probabilities phrased as 'both' or 'all three' (e.g., three-bedroom and two-bath) refer to the intersection of the corresponding … | definition | tagged | Venn Diagram: “\\| "Both $A$ and $B$" \\| $A \cap B$ \\| The central overlap. \\|” |

</details>

<details><summary><code>p-185</code> · gap</summary>

Tagged pages: Combinatorics, Permutation, Combination

| Item | Kind | Status | Where |
|---|---|---|---|
| The number of ways to choose an unordered group of k items from n distinct items is the binomial coefficient C(n,k) = n!/(k!(n-k)!). | formula | tagged | Combination: “$$\binom{n}{k} = \frac{n!}{k!\,(n-k)!}$$” |
| The multiplication principle: when a selection is made in successive stages, the total number of outcomes is the product of the number of c… | fact | missing |  |
| To bound the number of trials before a repeat of a specified outcome type must occur, count the distinct possible outcome types; by the pig… | procedure | missing |  |

</details>

<details><summary><code>p-186</code> · untagged</summary>

Tagged pages: Conditional Probability, Bayes Theorem, The Law of Total Probability

| Item | Kind | Status | Where |
|---|---|---|---|
| Conditional probability of A given B is P(A and B) divided by P(B). | definition | tagged | Conditional Probability: “$$P(A \mid B) = \frac{P(A \cap B)}{P(B)}, \quad P(B) > 0$$” |
| The law of total probability gives P(B) as the sum over a partition of events A_i of P(B \| A_i) P(A_i). | fact | tagged | The Law of Total Probability: “$$P(B) = \sum_{i=1}^{n} P(B \mid A_i)\,P(A_i)$$” |
| The probability of drawing a specific number of items of each type in a sample without replacement is given by the hypergeometric formula: … | formula | elsewhere | Hypergeometric Distribution: “$$P(X = k) = \frac{\dbinom{K}{k}\dbinom{N-K}{n-k}}{\dbinom{N}{n}}$$” |
| When one item is selected at random from a set, the probability it is of a given type equals the proportion of that type in the set. | fact | elsewhere | Probability: “$$P(E) = \frac{\\|E\\|}{\\|S\\|}$$” |
| To find the posterior probability of a hidden composition given an observed outcome, compute the joint probability for each composition (pr… | procedure | tagged | Bayes Theorem: “$$= \frac{P(E \mid H)\,P(H)}{\displaystyle\sum_{i} P(E \mid H_i)\,P(H_i)}$$” |

</details>

<details><summary><code>p-187</code> · gap</summary>

Tagged pages: Probability Multiplication Rule, Independent Events, Binomial Distribution

| Item | Kind | Status | Where |
|---|---|---|---|
| For two independent, identically distributed counts, the probability they are equal is the sum over values k of the squared probability P(N… | procedure | missing |  |
| Claim counts on different cars are independent given the policy type, so the joint probability of a pair of counts equals the product of th… | fact | tagged | Independent Events: “$$P(A \cap B) = P(A) \cdot P(B)$$” |
| Law of total probability: P(A) = sum over mutually exclusive, exhaustive cases of P(A \| case) P(case), used to average over the policy typ… | formula | elsewhere | The Law of Total Probability: “$$P(B) = \sum_{i=1}^{n} P(B \mid A_i)\,P(A_i)$$” |
| When n independent policies are selected at random, each with the same probability p of an event, the number of policies with that event is… | fact | tagged | Binomial Distribution: “The **Binomial Distribution** $X \sim \text{Bin}(n, p)$ models the number of successes in $n$ indep…” |
| Binomial probability mass function: P(N=k) = C(n,k) p^k (1-p)^(n-k). | formula | tagged | Binomial Distribution: “$$P(X = k) = \binom{n}{k} p^k (1-p)^{n-k}$$” |

</details>

<details><summary><code>p-188</code> · gap</summary>

Tagged pages: Independent Events, Conditional Probability, Probability Addition Rule

| Item | Kind | Status | Where |
|---|---|---|---|
| If two events are mutually exclusive, the probability of their union equals the sum of their individual probabilities. | fact | linked | Mutually Exclusive Events: “For mutually exclusive events, the [[Probability Addition Rule]] simplifies to $P(A \cup B) = P(A) …” |
| Two events A and B are independent if P(A and B) = P(A)P(B), and in that case their complements are also independent of each other and of t… | definition | tagged | Independent Events: “$$P(A \cap B) = P(A) \cdot P(B)$$” |
| The probability of the complement of an event is 1 minus the probability of the event. | formula | elsewhere | Probability Rules: “$$P(A^c) = 1 - P(A)$$” |
| To find the probability of exactly one of several coverages or events, decompose it into mutually exclusive 'only A' and 'only B' cases and… | procedure | missing |  |

</details>

<details><summary><code>p-189</code> · gap</summary>

Tagged pages: Combinatorics, Poisson Distribution, Probability

| Item | Kind | Status | Where |
|---|---|---|---|
| The number of ways to choose k distinct items from n without regard to order is the combination C(n,k) = n!/(k!(n-k)!). | formula | linked | Combination: “$$\binom{n}{k} = \frac{n!}{k!\,(n-k)!}$$” |
| When all unordered selections of k items from n are equally likely, the probability of matching one specific set is 1/C(n,k). | fact | tagged | Combinatorics (collapsed): “There are 10 equally likely outcomes, so each has probability $1/10 = 0.10$.” |
| The number of successes in a large number of independent trials, each with a small success probability, is approximately Poisson with mean … | fact | tagged | Poisson Distribution: “It arises as the limit of $\text{Bin}(n, p)$ as $n \to \infty$ and $p \to 0$ with $np = \lambda$ fi…” |
| For a Poisson random variable with mean λ, P(N=k) = e^{-λ} λ^k / k!, so P(N≥2) = 1 - e^{-λ}(1+λ). | formula | tagged | Poisson Distribution: “$$P(X = k) = \frac{e^{-\lambda}\lambda^k}{k!}$$” |
| To find the probability of a loss, set total payouts greater than total premium or revenue, and convert this inequality into a condition on… | procedure | missing |  |

</details>

<details><summary><code>p-190</code> · gap</summary>

Tagged pages: Binomial Distribution, Poisson Distribution, Probability

| Item | Kind | Status | Where |
|---|---|---|---|
| The number of successes in n independent trials, each with the same success probability p, follows a Binomial(n, p) distribution. | fact | tagged | Binomial Distribution: “The **Binomial Distribution** $X \sim \text{Bin}(n, p)$ models the number of successes in $n$ indep…” |
| A Binomial(n, p) distribution with large n and small p can be approximated by a Poisson distribution with mean λ = np. | fact | tagged | Poisson Distribution: “It arises as the limit of $\text{Bin}(n, p)$ as $n \to \infty$ and $p \to 0$ with $np = \lambda$ fi…” |
| For X ~ Poisson(λ), P(X = k) = e^(-λ) λ^k / k! for k = 0, 1, 2, ... | formula | tagged | Poisson Distribution: “$$P(X = k) = \frac{e^{-\lambda}\lambda^k}{k!}$$” |
| Convert a statement about a percentage of items with a property into a count condition on the number of items with the complementary proper… | procedure | missing |  |
| The probability of a 'at least k' event equals one minus the cumulative probability of at most k−1 for a discrete distribution (complement … | fact | elsewhere | Normal Approximation: “$P(S_n \ge k) \approx 1 - \Phi\!\left(\frac{k - 0.5 - n\mu}{\sigma\sqrt{n}}\right)$” |

</details>

<details><summary><code>p-191</code> · gap</summary>

Tagged pages: Probability Addition Rule, Independent Events, Mutually Exclusive Events

| Item | Kind | Status | Where |
|---|---|---|---|
| For any three events, P(A∪B∪C) = P(A)+P(B)+P(C) − P(A∩B) − P(A∩C) − P(B∩C) + P(A∩B∩C) (inclusion-exclusion). | formula | tagged | Probability Addition Rule: “$$P(A \cup B \cup C) = P(A)+P(B)+P(C) - P(A \cap B) - P(A \cap C) - P(B \cap C) + P(A \cap B \cap C…” |
| Events A and B are independent if and only if P(A∩B) = P(A)P(B). | definition | tagged | Independent Events: “$$P(A \cap B) = P(A) \cdot P(B)$$” |
| Events are mutually exclusive if they cannot occur together, i.e., their intersection is empty and has probability 0. | definition | tagged | Mutually Exclusive Events: “$$A \cap B = \emptyset \implies P(A \cap B) = 0$$” |
| If A∩C is empty, then any intersection that also includes A and C, such as A∩B∩C, is a subset of it and has probability 0. | fact | missing |  |

</details>

<details><summary><code>p-192</code> · gap</summary>

Tagged pages: Mutually Exclusive Events, Axioms of Probability, Event

| Item | Kind | Status | Where |
|---|---|---|---|
| The probability of a union of events equals the sum of their individual probabilities exactly when the events are mutually exclusive (pairw… | fact | tagged | Mutually Exclusive Events: “For mutually exclusive events, the [[Probability Addition Rule]] simplifies to $P(A \cup B) = P(A) …” |
| Two events are mutually exclusive (disjoint) if they cannot both occur, i.e., their intersection is empty and has probability zero. | definition | tagged | Mutually Exclusive Events: “Two events $A$ and $B$ are **Mutually Exclusive** (disjoint) if they cannot both occur simultaneous…” |
| To test whether a set of events is mutually exclusive, check every pair by determining whether the conditions defining the two events (e.g.… | procedure | tagged | Mutually Exclusive Events: “The addition rule simplification extends to any finite collection: if $A_1, A_2, \ldots, A_n$ are p…” |
| Events defined by claim counts in different time periods (e.g., different years) can occur together unless dependence or other constraints … | fact | missing |  |

</details>

<details><summary><code>p-193</code> · gap</summary>

Tagged pages: Combinatorics, Probability Addition Rule

| Item | Kind | Status | Where |
|---|---|---|---|
| A derangement is a permutation of n items in which no item remains in its original position; the number of derangements of n items is denot… | definition | missing |  |
| The number of derangements of n items is D_n = n! * sum_{k=0}^{n} (-1)^k / k!, so the probability that a random permutation of n items has … | formula | missing |  |
| When n items are randomly assigned to n positions, all n! permutations are equally likely, so a probability equals the count of favorable p… | fact | tagged | Combinatorics: “In probability, combinatorics determines the sizes of events and sample spaces: $P(A) = \\|A\\| / \\|S…” |
| The probability of an event equals one minus the probability of its complement, so P(at least one) = 1 - P(none). | fact | elsewhere | Probability Rules: “The complement rule is the workhorse shortcut — "at least one" is almost always faster as $1 - P(\t…” |

</details>

<details><summary><code>p-194</code> · gap</summary>

Tagged pages: Conditional Probability, Bayes Theorem

| Item | Kind | Status | Where |
|---|---|---|---|
| Conditional probability of event A given event B is P(A\|B) = P(A and B) / P(B), which restricts the sample space to outcomes in B. | definition | tagged | Conditional Probability: “$$P(A \mid B) = \frac{P(A \cap B)}{P(B)}, \quad P(B) > 0$$” |
| Translate a condition on total cost into a condition on the discrete count by finding the smallest number of events whose total cost (count… | procedure | missing |  |
| The probability of a union of mutually exclusive outcomes of a discrete distribution is the sum of the individual outcome probabilities. | fact | elsewhere | Discrete Random Variable: “$$F(x) = \sum_{k \le x} p(k)$$” |
| When a specific outcome lies within the conditioning event, the conditional probability equals that outcome's probability divided by the to… | procedure | tagged | Conditional Probability (collapsed): “Since $A \subseteq B$, we have $A \cap B = A$.” |

</details>

<details><summary><code>p-195</code> · answerable</summary>

Tagged pages: Conditional Probability, Probability Addition Rule

| Item | Kind | Status | Where |
|---|---|---|---|
| The addition rule for the union of two events: P(A ∪ B) = P(A) + P(B) − P(A ∩ B). | formula | tagged | Probability Addition Rule: “$$P(A \cup B) = P(A) + P(B) - P(A \cap B)$$” |
| "At least one of two events occurs" corresponds to the union of the events, A ∪ B. | definition | tagged | Probability Addition Rule: “The **Probability Addition Rule** gives the probability that at least one of two events $A$ or $B$ …” |
| Conditional probability: P(B \| A) = P(A ∩ B) / P(A), for P(A) > 0. | formula | tagged | Conditional Probability: “$$P(A \mid B) = \frac{P(A \cap B)}{P(B)}, \quad P(B) > 0$$” |

</details>

<details><summary><code>p-196</code> · answerable</summary>

Tagged pages: Combinatorics, Combination, Probability

| Item | Kind | Status | Where |
|---|---|---|---|
| The binomial coefficient C(n,k) = n!/(k!(n-k)!) counts the number of ways to choose k items from n distinct items when order does not matte… | definition | tagged | Combination: “A **Combination** $\binom{n}{k}$ ("$n$ choose $k$") counts the number of ways to select $k$ objects…” |
| For sampling without replacement from a population divided into groups, count the favorable outcomes by multiplying the number of ways to c… | procedure | linked | Hypergeometric Distribution (collapsed): “$$P(X=2) = \frac{\binom{4}{2}\binom{6}{1}}{\binom{10}{3}} = \frac{6 \cdot 6}{120} = \frac{36}{120} …” |
| When all subsets of a given size are equally likely (random selection without replacement), the probability of an event equals the number o… | fact | tagged | Combinatorics: “In probability, combinatorics determines the sizes of events and sample spaces: $P(A) = \\|A\\| / \\|S…” |

</details>

<details><summary><code>p-197</code> · gap</summary>

Tagged pages: Combinatorics, Probability

| Item | Kind | Status | Where |
|---|---|---|---|
| With n distinct colors each having a pair, drawing socks one at a time until a match occurs requires at most n+1 draws, because after n dra… | fact | missing |  |
| The maximum number of draws is required exactly when all of the first n draws are of different colors (no match appears before the last pos… | fact | missing |  |
| To find the probability that sequential draws without replacement are all distinct in color, multiply conditional probabilities for each dr… | procedure | elsewhere | Probability Multiplication Rule: “For a chain of events, the rule extends to $P(A_1 \cap A_2 \cap \cdots \cap A_n) = P(A_1)\,P(A_2 \m…” |

</details>

<details><summary><code>p-198</code> · untagged</summary>

Tagged pages: Bayes Theorem, The Law of Total Probability, Conditional Probability

| Item | Kind | Status | Where |
|---|---|---|---|
| The Law of Total Probability: if events B_1,...,B_n partition the sample space, then P(A) = sum of P(A \| B_i) P(B_i). | fact | tagged | The Law of Total Probability: “$$P(B) = \sum_{i=1}^{n} P(B \mid A_i)\,P(A_i)$$” |
| Bayes' Theorem: P(B_j \| A) = P(A \| B_j) P(B_j) / P(A), where P(A) is found by summing over a partition. | formula | tagged | Bayes Theorem: “$$P(H \mid E) = \frac{P(E \mid H)\,P(H)}{P(E)}$$” |
| Find the probability of a multi-stage branch path by multiplying the conditional probabilities along the branches (e.g., P(B) P(C \| B) P(A… | procedure | elsewhere | Probability Multiplication Rule: “For a chain of events, the rule extends to $P(A_1 \cap A_2 \cap \cdots \cap A_n) = P(A_1)\,P(A_2 \m…” |
| Conditional probability: P(A \| B) = P(A ∩ B) / P(B), the probability of A given that B has occurred. | definition | tagged | Conditional Probability: “$$P(A \mid B) = \frac{P(A \cap B)}{P(B)}, \quad P(B) > 0$$” |

</details>

<details><summary><code>p-199</code> · gap</summary>

Tagged pages: Bayes Theorem, The Law of Total Probability, Conditional Probability

| Item | Kind | Status | Where |
|---|---|---|---|
| The Law of Total Probability: for a partition B_1,...,B_n of the sample space, P(A) = sum of P(A \| B_i) P(B_i). | fact | tagged | The Law of Total Probability: “$$P(B) = \sum_{i=1}^{n} P(B \mid A_i)\,P(A_i)$$” |
| Conditional probability: P(A \| B) = P(A ∩ B) / P(B), so P(B_i ∩ A) = P(A \| B_i) P(B_i). | formula | tagged | Conditional Probability: “$$P(A \mid B) = \frac{P(A \cap B)}{P(B)}, \quad P(B) > 0$$” |
| Bayes' theorem: P(B_i \| A) = P(A \| B_i) P(B_i) / P(A), with P(A) computed by the Law of Total Probability. | formula | tagged | Bayes Theorem: “$$= \frac{P(E \mid H)\,P(H)}{\displaystyle\sum_{i} P(E \mid H_i)\,P(H_i)}$$” |
| For mutually exclusive categories, the probability of a union of categories given an event is the sum of the individual categories' conditi… | fact | missing |  |

</details>

<details><summary><code>p-200</code> · untagged</summary>

Tagged pages: Poisson Distribution, Independent Events, Probability

| Item | Kind | Status | Where |
|---|---|---|---|
| Poisson thinning: if the number of events is Poisson with mean λ and each event independently belongs to a subtype with probability p, then… | fact | elsewhere | Poisson Thinning: “if each event of a [[Poisson Process]] with rate $\lambda$ is independently classified as type 1 wi…” |
| For a Poisson random variable with mean λ, P(N = k) = e^{-λ} λ^k / k!, so P(N = 0) = e^{-λ}. | formula | tagged | Poisson Distribution: “$$P(X = k) = \frac{e^{-\lambda}\lambda^k}{k!}$$” |

</details>

<details><summary><code>p-201</code> · answerable</summary>

Tagged pages: Probability, Independent Events, Binomial Distribution, Geometric Distribution

| Item | Kind | Status | Where |
|---|---|---|---|
| The number of successes in a fixed number of independent trials with the same success probability follows a binomial distribution, so the n… | fact | tagged | Binomial Distribution: “The **Binomial Distribution** $X \sim \text{Bin}(n, p)$ models the number of successes in $n$ indep…” |
| For a binomial distribution with m trials and success probability p, P(X = k) = C(m,k) p^k (1-p)^(m-k). | formula | tagged | Binomial Distribution: “$$P(X = k) = \binom{n}{k} p^k (1-p)^{n-k}$$” |
| To find the probability of an event such as 'more than one success', sum the probability mass function over all outcomes that satisfy the e… | procedure | linked | Axioms of Probability: “Add if no overlap. If events are [[Concepts/Mutually Exclusive Events]], the probability of "one or…” |
| When independent trials are repeated until the first success, the number of trials needed follows a geometric distribution, with P(N = n) =… | fact | tagged | Geometric Distribution: “$$P(X = k) = (1-p)^{k-1}p, \quad k = 1, 2, 3, \ldots$$” |
| For independent events, the probability that all occur is the product of their individual probabilities, so the first n-1 patients each bei… | fact | tagged | Independent Events: “$$P(A_{i_1} \cap A_{i_2} \cap \cdots \cap A_{i_m}) = P(A_{i_1})\,P(A_{i_2}) \cdots P(A_{i_m})$$” |

</details>

<details><summary><code>p-202</code> · answerable</summary>

Tagged pages: Geometric Distribution, Probability

| Item | Kind | Status | Where |
|---|---|---|---|
| The geometric distribution models the number of independent Bernoulli trials needed to obtain the first success, where each trial succeeds … | definition | tagged | Geometric Distribution: “The **Geometric Distribution** $X \sim \text{Geom}(p)$ counts the number of independent Bernoulli t…” |
| For a geometric random variable X counting trials up to and including the first success with success probability p, P(X > n) = (1 - p)^n. | formula | tagged | Geometric Distribution: “The survival function is clean: $P(X > n) = (1-p)^n$ — "the first $n$ trials all failed."” |
| The event that more than n trials are needed for the first success is the same as the event that the first n trials are all failures, and i… | fact | tagged | Geometric Distribution: “The survival function is clean: $P(X > n) = (1-p)^n$ — "the first $n$ trials all failed." Use it in…” |

</details>

<details><summary><code>p-203</code> · gap</summary>

Tagged pages: Order Statistics, Combinatorics

| Item | Kind | Status | Where |
|---|---|---|---|
| The second smallest of n selected values is the second order statistic; X = x means exactly one selected value is below x, x itself is sele… | definition | tagged | Order Statistics: “Given a sample $X_1, X_2, \ldots, X_n$, the $k$-th order statistic $X_{(k)}$ is the $k$-th smallest…” |
| To find the probability that the second smallest of four integers drawn without replacement from 1..N equals x, count the selections by cho… | procedure | missing |  |
| When selecting without replacement with all subsets equally likely, the probability of an event equals the number of favorable combinations… | fact | tagged | Combinatorics: “In probability, combinatorics determines the sizes of events and sample spaces: $P(A) = \\|A\\| / \\|S…” |
| The number of ways to choose k items from n is the binomial coefficient C(n,k) = n!/(k!(n-k)!). | formula | linked | Combination: “$$\binom{n}{k} = \frac{n!}{k!\,(n-k)!}$$” |

</details>

<details><summary><code>p-204</code> · gap</summary>

Tagged pages: Exponential Distribution, Probability

| Item | Kind | Status | Where |
|---|---|---|---|
| For an exponential distribution with mean θ, the survival function is S(x) = e^{-x/θ} and the CDF is F(x) = 1 - e^{-x/θ}. | formula | tagged | Exponential Distribution: “Work from the survival function $S(x) = e^{-x/\theta}$ rather than the CDF” |
| The probability that a continuous random variable lies in an interval (a, b) equals F(b) - F(a), which for an exponential equals S(a) - S(b… | procedure | elsewhere | Cumulative Distribution Function (CDF) (collapsed): “$$P(2 \leq X \leq 4) = F(4) - F(2) = \frac{4}{5} - \frac{2}{5} = \frac{2}{5} = 0.4$$” |
| To find an unknown endpoint, set the interval probabilities equal, solve for the exponential term e^{-r/θ}, and invert it with the natural … | procedure | missing |  |

</details>

<details><summary><code>p-205</code> · answerable</summary>

Tagged pages: Exponential Distribution, Independent Events

| Item | Kind | Status | Where |
|---|---|---|---|
| An exponential distribution with mean θ has survival function S(t) = P(T > t) = e^{-t/θ} and CDF F(t) = 1 - e^{-t/θ}. | definition | tagged | Exponential Distribution: “Work from the survival function $S(x) = e^{-x/\theta}$ rather than the CDF; almost every exponentia…” |
| The exponential distribution is memoryless, so the probability of an event in a later interval given none earlier depends only on the inter… | fact | tagged | Exponential Distribution: “Its defining property is **memorylessness**: $P(X > s + t \mid X > s) = P(X > t)$, making it the un…” |
| The probability of no event in the first interval and at least one event in the next interval equals P(T > a) times P(T ≤ b) (or equivalent… | procedure | tagged | Exponential Distribution: “$P(X > s + t \mid X > s) = P(X > t)$” |

</details>

<details><summary><code>p-206</code> · gap</summary>

Tagged pages: Normal Distribution, Probability

| Item | Kind | Status | Where |
|---|---|---|---|
| Standardize a normal random variable by z = (x - μ)/σ, so that P(X ≤ x) = Φ((x - μ)/σ). | procedure | tagged | Normal Distribution: “Its CDF has no closed form and is evaluated via the standard normal $Z = (X - \mu)/\sigma \sim N(0,…” |
| Use the standard normal table in reverse: given a cumulative probability, find the corresponding z-value (inverse of Φ). | procedure | tagged | Normal Distribution: “Useful percentiles: $z_{0.90} = 1.282$, $z_{0.95} = 1.645$, $z_{0.975} = 1.960$, $z_{0.99} = 2.326$” |
| Given two known cumulative probabilities of a normal distribution at two points, set up the two equations x1 = μ + z1σ and x2 = μ + z2σ and… | procedure | missing |  |
| To find a normal probability P(X ≤ x), compute z = (x - μ)/σ and read Φ(z) from the standard normal table. | procedure | tagged | Normal Distribution: “$$Z = \frac{55{,}000 - 50{,}000}{6{,}324.6} \approx 0.791$$” |

</details>

<details><summary><code>p-207</code> · gap</summary>

Tagged pages: Continuous Univariate Distributions, Probability

| Item | Kind | Status | Where |
|---|---|---|---|
| The cumulative distribution function F(x) gives P(X ≤ x), the probability that the random variable is at most x. | definition | elsewhere | Cumulative Distribution Function (CDF): “The **Cumulative Distribution Function (CDF)** of a random variable $X$ gives the probability that …” |
| The survival probability is the complement of the CDF: P(X > x) = 1 − F(x). | fact | tagged | Continuous Univariate Distributions: “For anything phrased as a tail probability, work from the survival function $S(x) = 1 - F(x)$ inste…” |
| For a piecewise-defined CDF, evaluate the piece whose domain contains the point of interest; at a boundary point, use the piece that includ… | procedure | missing |  |

</details>

<details><summary><code>p-208</code> · gap</summary>

Tagged pages: Exponential Distribution, Conditional Probability, Expected Value

| Item | Kind | Status | Where |
|---|---|---|---|
| The mean lifetime given survival less than a limit is a conditional expectation E[T \| T < c] = E[T·1(T<c)] / P(T<c). | definition | missing |  |
| For an exponential distribution with mean θ, the CDF is P(T<t) = 1 − e^{−t/θ}. | formula | tagged | Exponential Distribution: “$E[X] = \theta$, $\text{Var}(X) = \theta^2$, and $F(x) = 1 - e^{-x/\theta}$” |
| For an exponential distribution with mean θ, the density is f(t) = (1/θ)e^{−t/θ}, and the partial expectation is E[T·1(T<c)] = ∫_0^c t f(t)… | formula | tagged | Exponential Distribution: “$$f(x) = \frac{1}{\theta}\,e^{-x/\theta}, \quad x > 0$$” |
| To compute E[T·1(T<c)] for a continuous variable, integrate t times the density from 0 to c (using integration by parts for the exponential… | procedure | elsewhere | Continuous Random Variable: “Expectations replace sums with integrals: $E[g(X)] = \int g(x)\,f(x)\,dx$ (see [[Expected Value]] a…” |

</details>

<details><summary><code>p-209</code> · answerable</summary>

Tagged pages: Exponential Distribution, Conditional Probability, Cumulative Distribution Function (CDF)

| Item | Kind | Status | Where |
|---|---|---|---|
| The cumulative distribution function F(x) = P[X ≤ x] of a continuous random variable is obtained by integrating its density function from t… | definition | tagged | Cumulative Distribution Function (CDF): “For a continuous random variable, $F(x) = \int_{-\infty}^{x} f(t)\, dt$” |
| Conditional probability: P[A \| B] = P[A ∩ B] / P[B], provided P[B] > 0. | formula | tagged | Conditional Probability: “$$P(A \mid B) = \frac{P(A \cap B)}{P(B)}, \quad P(B) > 0$$” |
| If event A is a subset of event B, then A ∩ B = A, so P[A \| B] = P[A] / P[B]. | fact | tagged | Conditional Probability (collapsed): “Since $A \subseteq B$, we have $A \cap B = A$.” |
| For an exponential random variable with rate λ (density λe^{-λx}, x > 0), the distribution function is F(x) = 1 − e^{-λx}. | fact | tagged | Exponential Distribution: “Some texts parameterize by **rate** $\lambda = 1/\theta$, so $f(x) = \lambda e^{-\lambda x}$ and $E…” |

</details>

<details><summary><code>p-210</code> · gap</summary>

Tagged pages: Independent Events, Probability Addition Rule

| Item | Kind | Status | Where |
|---|---|---|---|
| If events E and F are independent, then P[E ∩ F] = P[E]·P[F], and the same product rule holds for any event paired with the complement of a… | fact | missing |  |
| The probability of the complement of an event is P[A^c] = 1 − P[A]. | formula | elsewhere | Axioms of Probability (collapsed): “Therefore $P(A^c) = 1 - P(A)$. $\square$” |
| The event that exactly one of E and F occurs is the union of the two mutually exclusive events (E occurs and F does not) and (F occurs and … | procedure | missing |  |

</details>

<details><summary><code>p-211</code> · gap</summary>

Tagged pages: Conditional Probability, The Law of Total Probability

| Item | Kind | Status | Where |
|---|---|---|---|
| A geometric distribution on n=0,1,2,... has pmf P[N=n]=p(1-p)^n, so P[N=n]=2/3^{n+1} is geometric with p=2/3. | definition | elsewhere | Geometric Distribution: “The other counts *failures before the first success*, $Y = X - 1 \in \{0,1,2,\ldots\}$, with $P(Y=k…” |
| For a geometric distribution with parameter p and q=1-p, the tail probability is P[N>k]=q^{k+1}, i.e. P[N≥k]=q^k. | formula | elsewhere | Geometric Distribution: “The survival function is clean: $P(X > n) = (1-p)^n$ — "the first $n$ trials all failed."” |
| Conditional probability: P(A\|B)=P(A∩B)/P(B). | formula | tagged | Conditional Probability: “$$P(A \mid B) = \frac{P(A \cap B)}{P(B)}, \quad P(B) > 0$$” |
| To find the probability that the sum of two independent discrete variables exceeds a value on an event restricted to the first variable, pa… | procedure | missing |  |
| For independent random variables, the joint probability of events factors into the product of their individual probabilities. | fact | missing |  |

</details>

<details><summary><code>p-212</code> · answerable</summary>

Tagged pages: Geometric Distribution, Conditional Probability

| Item | Kind | Status | Where |
|---|---|---|---|
| The number of independent trials needed to obtain the first success, each with the same success probability p, follows a geometric distribu… | definition | tagged | Geometric Distribution: “The **Geometric Distribution** $X \sim \text{Geom}(p)$ counts the number of independent Bernoulli t…” |
| For a geometric random variable X counting trials up to and including the first success, P(X ≥ n) = (1-p)^(n-1), because the first n-1 tria… | formula | tagged | Geometric Distribution: “The survival function is clean: $P(X > n) = (1-p)^n$ — "the first $n$ trials all failed."” |
| The conditional probability of A given B is P(A\|B) = P(A∩B)/P(B); when A is a subset of B, this equals P(A)/P(B). | formula | tagged | Conditional Probability: “$$P(A \mid B) = \frac{P(A \cap B)}{P(B)}, \quad P(B) > 0$$” |
| A geometric random variable is memoryless: P(X ≥ m+k \| X ≥ m) = P(X ≥ k+1)-type shift, so the conditional tail depends only on the additio… | fact | tagged | Geometric Distribution: “shares its **memoryless property**: $P(X > m+n \mid X > m) = P(X > n)$.” |

</details>

<details><summary><code>p-213</code> · answerable</summary>

Tagged pages: Binomial Distribution, Poisson Distribution, Conditional Probability

| Item | Kind | Status | Where |
|---|---|---|---|
| The number of successes in n independent trials, each with the same success probability p, follows a binomial distribution with parameters … | fact | tagged | Binomial Distribution: “The **Binomial Distribution** $X \sim \text{Bin}(n, p)$ models the number of successes in $n$ indep…” |
| For a binomial(n, p) random variable, P(X=k) = C(n,k) p^k (1-p)^(n-k). | formula | tagged | Binomial Distribution: “$$P(X = k) = \binom{n}{k} p^k (1-p)^{n-k}$$” |
| Conditional probability: P(A \| B) = P(A ∩ B) / P(B). | formula | tagged | Conditional Probability: “$$P(A \mid B) = \frac{P(A \cap B)}{P(B)}, \quad P(B) > 0$$” |
| To find P(X=k \| X≤m) for k≤m, divide P(X=k) by P(X≤m), where the event {X=k} is contained in {X≤m} so the intersection is just {X=k}, and … | procedure | tagged | Conditional Probability (collapsed): “Let $A = \{X > 700\}$ and $B = \{X > 400\}$. Since $A \subseteq B$, we have $A \cap B = A$.” |

</details>

<details><summary><code>p-214</code> · gap</summary>

Tagged pages: Exponential Distribution, Probability

| Item | Kind | Status | Where |
|---|---|---|---|
| For an exponential distribution with rate λ, the mean is 1/λ, so the rate equals the average number of events per unit time (the reciprocal… | fact | tagged | Exponential Distribution: “Some texts parameterize by **rate** $\lambda = 1/\theta$, so $f(x) = \lambda e^{-\lambda x}$ and $E…” |
| Convert an average event count over a multi-year period into an annual rate by dividing the count by the number of years. | procedure | missing |  |
| The median of a distribution is the value m such that the CDF at m equals 0.5. | definition | elsewhere | Median: “For a continuous distribution that is the point where $F(m) = 0.5$, splitting the probability in ha…” |
| For an exponential distribution with rate λ, the CDF is F(x) = 1 - e^{-λx}, so the median is ln(2)/λ. | formula | tagged | Exponential Distribution: “$E[X] = \theta$, $\text{Var}(X) = \theta^2$, and $F(x) = 1 - e^{-x/\theta}$” |

</details>

<details><summary><code>p-215</code> · untagged</summary>

Tagged pages: Exponential Distribution, Deductible, Probability

| Item | Kind | Status | Where |
|---|---|---|---|
| With an ordinary deductible d, the insurer's payment per loss is Y = (X - d)_+, which equals 0 when the loss is at most d and X - d otherwi… | definition | tagged | Deductible: “If the loss $X$ is less than or equal to the deductible $d$, the insurer pays nothing; above $d$ it…” |
| The median of a distribution is the value m such that the CDF at m equals 0.5. | definition | elsewhere | Median: “For a continuous distribution that is the point where $F(m) = 0.5$, splitting the probability in ha…” |
| To find a percentile of the payment per loss for a deductible d, translate the event {Y <= m} into {X <= m + d} and set the ground-up loss … | procedure | elsewhere | Percentile (collapsed): “Above the jump $F_Y$ is continuous and increasing, so the 90th percentile solves $F_Y(y) = 0.90$:” |
| An exponential distribution with mean θ has CDF F(x) = 1 - e^{-x/θ} for x ≥ 0 (survival function e^{-x/θ}). | formula | tagged | Exponential Distribution: “$E[X] = \theta$, $\text{Var}(X) = \theta^2$, and $F(x) = 1 - e^{-x/\theta}$” |

</details>

<details><summary><code>p-216</code> · gap</summary>

Tagged pages: Poisson Distribution, Expected Value

| Item | Kind | Status | Where |
|---|---|---|---|
| A payment of a fixed amount per event beyond a deductible number of events equals the amount times (N - d)_+, so its expected value is the … | procedure | missing |  |
| The expected excess over d equals E[X] minus the limited expected value: E[(X - d)_+] = E[X] - E[min(X, d)]. | formula | elsewhere | Limited Expected Value: “$$E[X \wedge u] = E[X] - E[\max(X - u, 0)] = E[X] - e(u)\cdot[1-F(u)]$$” |
| For a nonnegative integer-valued N, E[min(N, d)] is computed as the sum over k<d of k·P(N=k) plus d·P(N≥d), or equivalently as the sum over… | formula | missing |  |
| A Poisson distribution with mean λ has probability mass function P(N=k) = e^{-λ} λ^k / k!, and its mean is λ. | formula | tagged | Poisson Distribution: “$$P(X = k) = \frac{e^{-\lambda}\lambda^k}{k!}$$” |

</details>

<details><summary><code>p-217</code> · untagged</summary>

Tagged pages: Poisson Distribution, Expected Value

| Item | Kind | Status | Where |
|---|---|---|---|
| When insurance pays the portion of total losses above a retention d, the amount the company retains is the total capped at d, i.e. min(X, d… | procedure | elsewhere | Stop-Loss Reinsurance: “$I_d$ is the reinsurer's payment, and the insurer keeps $S \wedge d$, so the retention caps the ins…” |
| For a nonnegative integer-valued random variable N, E[min(N,d)] = sum_{k=0}^{d-1} P(N>k) = sum_{k=0}^{d-1} (1 - F(k)). | formula | elsewhere | Stop-Loss Reinsurance: “$$E\big[(S - (j+1)h)_+\big] = E\big[(S - jh)_+\big] - h\big[1 - F_S(jh)\big]$$” |
| A Poisson random variable with mean lambda has probability mass function P(N=k) = e^{-lambda} lambda^k / k!, used to compute the cdf and su… | formula | tagged | Poisson Distribution: “$$P(X = k) = \frac{e^{-\lambda}\lambda^k}{k!}$$” |
| Expectation is linear, so the expected value of a constant multiple c*Y equals c*E[Y]; the total benefit of a fixed amount per death is tha… | fact | tagged | Expected Value: “It is linear: $E[aX + b] = aE[X] + b$” |

</details>

<details><summary><code>p-218</code> · gap</summary>

Tagged pages: Poisson Distribution, Conditional Probability, Expected Value

| Item | Kind | Status | Where |
|---|---|---|---|
| A Poisson random variable with mean λ has probability mass function P(N=k) = e^{-λ} λ^k / k! for k = 0, 1, 2, ..., and its expected value e… | definition | tagged | Poisson Distribution: “$$P(X = k) = \frac{e^{-\lambda}\lambda^k}{k!}$$” |
| The conditional expectation of N given an event A is E[N \| A] = E[N · 1_A] / P(A); for N ≥ 2 this equals (E[N] − Σ_{k<2} k·P(N=k)) / P(N ≥… | formula | missing |  |
| Compute the probability of 'at least k' events as the complement of the sum of the probabilities of fewer than k events, e.g. P(N ≥ 2) = 1 … | procedure | missing |  |
| To find the mean of a discrete variable conditioned on N ≥ 2, subtract the contributions of the excluded values (0·P(N=0) + 1·P(N=1)) from … | procedure | missing |  |

</details>

<details><summary><code>p-219</code> · gap</summary>

Tagged pages: Uniform Continuous Distribution, Deductible, Expected Value

| Item | Kind | Status | Where |
|---|---|---|---|
| With a deductible d, the unreimbursed (retained by the insured) portion of a loss X is min(X, d), the loss limited at d. | definition | elsewhere | Limited Expected Value: “It equals the expected value of $\min(X, u)$.” |
| The limited expected value is E[min(X,d)] = ∫_0^d S(x) dx, the integral of the survival function from 0 to d. | formula | elsewhere | Limited Expected Value: “$$E[X \wedge u] = \int_0^u [1 - F(x)]\,dx \quad \text{(for non-negative } X\text{)}$$” |
| For a loss uniformly distributed on [0, θ], the survival function is S(x) = 1 - x/θ for 0 ≤ x ≤ θ, so E[min(X,d)] = d - d²/(2θ) for 0 ≤ d ≤… | fact | tagged | Uniform Continuous Distribution: “$E[X] = (a+b)/2$, $\text{Var}(X) = (b-a)^2/12$, and $F(x) = (x-a)/(b-a)$ for $a < x < b$” |
| To find an unknown deductible, set the expression for E[min(X,d)] equal to the given expected retained amount, solve the resulting quadrati… | procedure | missing |  |

</details>

<details><summary><code>p-220</code> · untagged</summary>

Tagged pages: Uniform Continuous Distribution, Probability, Expected Value

| Item | Kind | Status | Where |
|---|---|---|---|
| The median of a distribution is the value m at which the cumulative distribution function equals 0.5, i.e. F(m) = 0.5. | definition | elsewhere | Median: “For a continuous distribution that is the point where $F(m) = 0.5$, splitting the probability in ha…” |
| The CDF of a mixture distribution is the probability-weighted average of the component CDFs, so the mixture's total probability below a poi… | fact | elsewhere | Mixture Distribution: “Its density (and its [[Cumulative Distribution Function (CDF)\\|CDF]]) is the weighted average of th…” |
| For a uniform distribution on [a, c], the CDF is F(x) = (x - a)/(c - a) on the interval, and the mean is (a + c)/2. | formula | tagged | Uniform Continuous Distribution: “$E[X] = (a+b)/2$, $\text{Var}(X) = (b-a)^2/12$, and $F(x) = (x-a)/(b-a)$ for $a < x < b$” |
| To locate the median of a mixture with components on different intervals, compare the cumulative probability at the component boundary to 0… | procedure | elsewhere | Spliced Distribution (collapsed): “A percentile or a Value at Risk is found by first using the cumulative weights to decide which inte…” |
| The mean of a mixture distribution is the probability-weighted average of the component means (law of total expectation). | fact | elsewhere | Mixture Distribution: “$$E[X^m] = \sum_{i=1}^{k} a_i\, E[X_i^m] = E\big[E[X^m \mid \Theta]\big]$$” |

</details>

<details><summary><code>p-221</code> · untagged</summary>

Tagged pages: Normal Distribution, Conditional Probability

| Item | Kind | Status | Where |
|---|---|---|---|
| The median of a distribution is the value m at which the cumulative distribution function equals 0.5. | definition | elsewhere | Median: “For a continuous distribution that is the point where $F(m) = 0.5$, splitting the probability in ha…” |
| For a mixed distribution with a point mass at 0 (no loss) and a continuous part, the CDF at a positive x equals the point mass probability … | procedure | elsewhere | Mixture Distribution (collapsed): “F(200) &= 0.6 + 0.4\left(1 - e^{-200/500}\right)” |
| To find probabilities for a normal random variable X with mean mu and standard deviation sigma, standardize via Z=(X-mu)/sigma so that P(X≤… | procedure | tagged | Normal Distribution: “Its CDF has no closed form and is evaluated via the standard normal $Z = (X - \mu)/\sigma \sim N(0,…” |
| To find a normal percentile, look up z=Φ^{-1}(p) in the standard normal table (using symmetry for p<0.5) and compute x=mu+sigma*z. | procedure | tagged | Normal Distribution: “Symmetry gives $\Phi(-z) = 1 - \Phi(z)$ — the identity needed for every negative $z$, since standar…” |

</details>

<details><summary><code>p-222</code> · gap</summary>

Tagged pages: Normal Distribution, Conditional Probability

| Item | Kind | Status | Where |
|---|---|---|---|
| The distribution of losses that exceed a deductible d is the conditional distribution of X given X > d, with survival function P(X>x \| X>d… | definition | tagged | Conditional Probability: “$$P(A \mid B) = \frac{P(A \cap B)}{P(B)}, \quad P(B) > 0$$” |
| The 95th percentile of a distribution is the value k such that P(X ≤ k) = 0.95, equivalently P(X > k) = 0.05. | definition | elsewhere | Percentile: “When $F$ is continuous and strictly increasing, it is the value that solves $F(x_p) = p$, found by …” |
| To find a percentile of the conditional distribution given X > d, set P(X>k) = (1-p)·P(X>d) and solve for k, which gives P(X ≤ k) = 1 - (1-… | procedure | missing |  |
| For a normal random variable X with mean μ and standard deviation σ, standardize with Z = (X-μ)/σ and use the standard normal table to eval… | procedure | tagged | Normal Distribution: “Its CDF has no closed form and is evaluated via the standard normal $Z = (X - \mu)/\sigma \sim N(0,…” |
| To find a percentile of a normal distribution, find the standard normal quantile z from the table for the target cumulative probability and… | procedure | elsewhere | Percentile (collapsed): “The 95th percentile of the standard normal is $z_{0.95} = 1.645$. Transform back with $\sigma = 15$:” |

</details>

<details><summary><code>p-223</code> · untagged</summary>

Tagged pages: Normal Distribution, Probability

| Item | Kind | Status | Where |
|---|---|---|---|
| To find the level x such that P(X > x) equals a given probability, convert it to a cumulative probability P(X ≤ x) = 1 − that probability, … | procedure | elsewhere | Percentile: “When $F$ is continuous and strictly increasing, it is the value that solves $F(x_p) = p$, found by …” |
| A normal random variable X with mean μ and standard deviation σ has percentile x = μ + σ·z, where z is the corresponding standard normal pe… | formula | tagged | Normal Distribution: “Its CDF has no closed form and is evaluated via the standard normal $Z = (X - \mu)/\sigma \sim N(0,…” |
| Use the standard normal table (or its inverse) to find the z value whose cumulative probability equals a given level, such as Φ⁻¹(0.98) ≈ 2… | procedure | tagged | Normal Distribution: “Useful percentiles: $z_{0.90} = 1.282$, $z_{0.95} = 1.645$, $z_{0.975} = 1.960$, $z_{0.99} = 2.326$” |

</details>

<details><summary><code>p-224</code> · gap</summary>

Tagged pages: Continuous Univariate Distributions, Probability

| Item | Kind | Status | Where |
|---|---|---|---|
| The p-th percentile of a continuous distribution is the value x at which the cumulative distribution function equals p, i.e., the probabili… | definition | elsewhere | Percentile: “When $F$ is continuous and strictly increasing, it is the value that solves $F(x_p) = p$, found by …” |
| A probability density function must integrate to 1 over its support, which determines the proportionality constant when the density is spec… | fact | tagged | Continuous Univariate Distributions: “The probability density function (PDF) $f(x)$ must satisfy $f(x) \geq 0$ and $\int_{-\infty}^{\inft…” |
| If a density is symmetric about a point m, then f(m+x)=f(m-x), so the density on the far side is the reflection of the density on the near … | fact | missing |  |
| Find the probability of an interval for a continuous random variable by integrating the density over that interval, e.g., the integral of 1… | procedure | elsewhere | Probability Density Function (PDF): “The probability that $X$ falls in an interval $[a, b]$ is the area under $f$ over that interval.” |
| To locate a percentile beyond the median of a symmetric distribution, determine which side of the center it lies on by comparing p to 0.5, … | procedure | missing |  |

</details>

<details><summary><code>p-225</code> · gap</summary>

Tagged pages: Exponential Distribution, Variance

| Item | Kind | Status | Where |
|---|---|---|---|
| An exponential distribution with rate λ has CDF F(x) = 1 - e^{-λx} for x ≥ 0. | formula | tagged | Exponential Distribution: “$E[X] = \theta$, $\text{Var}(X) = \theta^2$, and $F(x) = 1 - e^{-x/\theta}$” |
| For an exponential distribution with rate λ, the variance equals 1/λ² (mean 1/λ). | formula | tagged | Exponential Distribution: “$E[X] = \theta$, $\text{Var}(X) = \theta^2$, and $F(x) = 1 - e^{-x/\theta}$” |
| A loss is fully covered under a policy with a per-loss limit u exactly when the loss is at most u, so the probability of full coverage is F… | fact | elsewhere | Cumulative Distribution Function (CDF): “$$F(x) = P(X \leq x)$$” |
| To solve an equation of the form 1 - e^{-2λ} = k(1 - e^{-λ}), factor 1 - e^{-2λ} as (1 - e^{-λ})(1 + e^{-λ}) to reduce it to a linear equat… | procedure | missing |  |

</details>

<details><summary><code>p-226</code> · answerable</summary>

Tagged pages: Exponential Distribution, Variance, Payment Random Variable

| Item | Kind | Status | Where |
|---|---|---|---|
| A claim payment with deductible d (payment per loss) is Y = (X - d)+ = max(X - d, 0), which is zero when the loss is below d. | definition | linked | Deductible: “$$Y = (X - d)_+$$” |
| An exponential random variable is memoryless: given X > d, the excess X - d is exponential with the same mean, so (X-d)+ equals zero with p… | fact | tagged | Exponential Distribution: “A direct consequence: given $X > d$, the excess $X - d$ is again $\text{Exp}(\theta)$.” |
| For an exponential loss with mean θ, the expected payment per loss with deductible d is E[(X-d)+] = θ e^{-d/θ}, and the survival probabilit… | formula | tagged | Exponential Distribution: “$E[(X-d)_+] = \theta e^{-d/\theta}$” |
| For an exponential loss with mean θ, the second moment of the payment per loss is E[((X-d)+)^2] = P(X>d)·E[(X-d)^2 \| X>d] = e^{-d/θ}·2θ^2,… | formula | tagged | Exponential Distribution: “given $X > d$, the excess $X - d$ is again $\text{Exp}(\theta)$” |
| Variance equals the second moment minus the square of the mean: Var(Y) = E[Y^2] - (E[Y])^2. | formula | tagged | Variance: “Efficient computation formula: $\text{Var}(X) = E[X^2] - \mu^2$ where $\mu = E[X]$” |

</details>

<details><summary><code>p-227</code> · untagged</summary>

Tagged pages: Variance for Conditional and Marginal Distributions, Poisson Distribution

| Item | Kind | Status | Where |
|---|---|---|---|
| The law of total variance states Var(X) = E[Var(X\|T)] + Var(E[X\|T]). | fact | tagged | Variance for Conditional and Marginal Distributions: “$$\text{Var}(X) = E\bigl[\text{Var}(X \mid Y)\bigr] + \text{Var}\bigl(E[X \mid Y]\bigr)$$” |
| For a Poisson distribution with mean λ, both the mean and the variance equal λ. | fact | tagged | Poisson Distribution: “A defining property is $E[X] = \text{Var}(X) = \lambda$ — the mean and variance are equal” |
| For a mixture over discrete types, compute the unconditional mean and the expectation of any function of the conditional parameter (such as… | procedure | elsewhere | Mixture Distribution: “$$E[X^m] = \sum_{i=1}^{k} a_i\, E[X_i^m] = E\big[E[X^m \mid \Theta]\big]$$” |
| The variance of a random variable Y equals E[Y^2] − (E[Y])^2, which is used to find the variance of the conditional mean E[X\|T]. | formula | elsewhere | Variance: “Efficient computation formula: $\text{Var}(X) = E[X^2] - \mu^2$ where $\mu = E[X]$” |

</details>

<details><summary><code>p-228</code> · untagged</summary>

Tagged pages: Poisson Distribution, Conditional Probability, Variance

| Item | Kind | Status | Where |
|---|---|---|---|
| A Poisson random variable with mean λ has probability mass function P(N=n)=e^{-λ}λ^n/n!, with E[N]=λ and Var(N)=λ, so E[N^2]=λ+λ^2. | definition | tagged | Poisson Distribution: “$$P(X = k) = \frac{e^{-\lambda}\lambda^k}{k!}$$” |
| For a Poisson random variable, P(N≥1)=1-P(N=0)=1-e^{-λ}. | fact | tagged | Poisson Distribution (collapsed): “$$P(X = 0) = \frac{e^{-3} \cdot 3^0}{0!} = e^{-3} \approx 0.0498$$” |
| A conditional moment given an event A is E[g(N)\|A]=E[g(N)·1_A]/P(A); for the event N≥1 with a nonnegative variable such as Poisson, the n=… | procedure | elsewhere | Frequency Distribution: “A zero-truncated distribution has $p_0^T = 0$ and $p_k^T = p_k/(1 - p_0)$.” |
| The variance of a random variable (including a conditional distribution) equals its second moment minus the square of its mean: Var(X)=E[X^… | formula | tagged | Variance: “Efficient computation formula: $\text{Var}(X) = E[X^2] - \mu^2$ where $\mu = E[X]$” |

</details>

<details><summary><code>p-229</code> · untagged</summary>

Tagged pages: Uniform Continuous Distribution, Variance

| Item | Kind | Status | Where |
|---|---|---|---|
| Express a layered coverage payment (primary plan pays first up to a limit, supplemental plan pays next up to its own cap) as a piecewise fu… | procedure | elsewhere | BPP Limits of Insurance and Deductible: “\text{Paid} = \begin{cases} 0 & L^{*} \leq D \\ \min\big(L^{*} - D,\ C\big) & L^{*} > D \end{cases}” |
| For a uniform distribution on (a, b), the density is constant at 1/(b-a), so the probability of any subinterval is its length divided by (b… | fact | tagged | Uniform Continuous Distribution: “$$f(x) = \frac{1}{b - a}, \quad a < x < b$$” |
| The expected value of a function of a random variable is E[g(X)] = ∫ g(x) f(x) dx, computed piecewise over the regions where g is defined d… | formula | elsewhere | Continuous Random Variable: “Expectations replace sums with integrals: $E[g(X)] = \int g(x)\,f(x)\,dx$ (see [[Expected Value]] a…” |
| The variance of a random variable is Var(Y) = E[Y^2] - (E[Y])^2. | formula | tagged | Variance: “Efficient computation formula: $\text{Var}(X) = E[X^2] - \mu^2$ where $\mu = E[X]$” |
| A payment variable that is zero with some probability, a continuous function of the loss in a middle region, and capped at a constant above… | fact | elsewhere | Continuous Random Variable: “A continuous loss passed through a [[Deductible]] or a [[Benefit Limit\\|limit]] produces a [[Paymen…” |

</details>

<details><summary><code>p-230</code> · untagged</summary>

Tagged pages: Uniform Continuous Distribution, Variance

| Item | Kind | Status | Where |
|---|---|---|---|
| With an ordinary deductible d, the claim payment per loss is Y = max(X - d, 0), which is 0 when the loss is below d and X - d otherwise (in… | definition | elsewhere | Continuous Random Variable (collapsed): “The policy pays $Y = \max(X - 200,\ 0)$.” |
| A uniform distribution on [0, b] has density 1/b on that interval, so P(X in an interval) equals the interval length divided by b. | fact | tagged | Uniform Continuous Distribution: “$$f(x) = \frac{1}{b - a}, \quad a < x < b$$” |
| The variance of a uniform distribution on [0, b] is b^2/12. | formula | tagged | Uniform Continuous Distribution: “$E[X] = (a+b)/2$, $\text{Var}(X) = (b-a)^2/12$, and $F(x) = (x-a)/(b-a)$ for $a < x < b$” |
| Variance is computed as Var(Y) = E[Y^2] - (E[Y])^2. | formula | tagged | Variance: “Efficient computation formula: $\text{Var}(X) = E[X^2] - \mu^2$ where $\mu = E[X]$” |
| For a payment variable defined piecewise in the loss (zero below the deductible, X - d above it), compute E[Y] and E[Y^2] by integrating th… | procedure | elsewhere | Continuous Random Variable: “Expectations replace sums with integrals: $E[g(X)] = \int g(x)\,f(x)\,dx$” |

</details>

<details><summary><code>p-231</code> · gap</summary>

Tagged pages: Normal Distribution, Variance

| Item | Kind | Status | Where |
|---|---|---|---|
| Standardize a normal random variable by subtracting its mean and dividing by its standard deviation (the square root of the variance) to ex… | procedure | tagged | Normal Distribution: “Its CDF has no closed form and is evaluated via the standard normal $Z = (X - \mu)/\sigma \sim N(0,…” |
| The standard deviation of a normal random variable is the square root of its variance, so a variance equal to the cube of the mean gives a … | fact | elsewhere | Variance and Standard Deviation: “$$\sigma = \text{SD}(X) = \sqrt{\text{Var}(X)}$$” |
| Find a normal quantile by setting the standard normal CDF equal to a given probability and using the standard normal table or symmetry, Φ(-… | procedure | tagged | Normal Distribution: “Symmetry gives $\Phi(-z) = 1 - \Phi(z)$ — the identity needed for every negative $z$, since standar…” |
| An annual loss corresponds to the profit random variable being below zero, so the probability of a loss is P(X < 0). | definition | missing |  |

</details>

<details><summary><code>p-232</code> · untagged</summary>

Tagged pages: Variance, Expected Value

| Item | Kind | Status | Where |
|---|---|---|---|
| Expectation is linear, so E[aX + b] = aE[X] + b, and the expectation of a sum of terms is the sum of their expectations (e.g., expanding E[… | fact | tagged | Expected Value: “It is linear: $E[aX + b] = aE[X] + b$” |
| The variance of a random variable equals its second moment minus the square of its mean: Var(X) = E[X^2] - (E[X])^2. | formula | tagged | Variance: “Efficient computation formula: $\text{Var}(X) = E[X^2] - \mu^2$ where $\mu = E[X]$” |
| The standard deviation of a random variable is the positive square root of its variance. | definition | elsewhere | Standard Deviation: “**Standard Deviation** $\sigma$ is the positive square root of [[Variance]], measuring the typical …” |

</details>

<details><summary><code>p-233</code> · gap</summary>

Tagged pages: Variance for Conditional and Marginal Distributions, Conditional Probability

| Item | Kind | Status | Where |
|---|---|---|---|
| To find a distribution conditional on an event in sampling without replacement, restrict the population to the cards consistent with the co… | procedure | missing |  |
| A hypergeometric random variable counts the number of items of a special type in n draws without replacement from a population of N items c… | definition | elsewhere | Hypergeometric Distribution: “The **Hypergeometric Distribution** models the number of successes in a sample of size $n$ drawn **…” |
| For a hypergeometric distribution with population N, K special items, and n draws, the variance is n(K/N)(1-K/N)(N-n)/(N-1). | formula | elsewhere | Hypergeometric Distribution: “$$\text{Var}(X) = \frac{nK(N-K)(N-n)}{N^2(N-1)}$$” |

</details>

<details><summary><code>p-237</code> · gap</summary>

Tagged pages: Probability, Independent Events

| Item | Kind | Status | Where |
|---|---|---|---|
| For a uniform distribution on an interval, the probability of falling in a subinterval equals the subinterval's length divided by the total… | fact | tagged | Probability: “$$P(E) = \frac{\\|E\\|}{\\|S\\|}$$” |
| Translate a waiting-time condition into a range of arrival times: a vehicle arriving during a blockage waits until the blockage ends, so wa… | procedure | missing |  |
| For independent events, the probability that all occur equals the product of their individual probabilities. | fact | tagged | Independent Events: “$$P(A \cap B) = P(A) \cdot P(B)$$” |
| The probability that at least one of several events occurs equals 1 minus the probability that none occurs (complement rule), e.g., P(A or … | formula | elsewhere | Probability Rules: “The complement rule is the workhorse shortcut — "at least one" is almost always faster as $1 - P(\t…” |

</details>

<details><summary><code>p-238</code> · gap</summary>

Tagged pages: Geometric Distribution, Joint Cumulative Distribution Function

| Item | Kind | Status | Where |
|---|---|---|---|
| The number of attempts until the first success (here, injury) with constant per-trial probability p and independent trials follows a geomet… | definition | tagged | Geometric Distribution: “The **Geometric Distribution** $X \sim \text{Geom}(p)$ counts the number of independent Bernoulli t…” |
| For a geometric random variable N (trials until first success) with success probability p, P(N ≤ n) = 1 − (1−p)^n. | formula | tagged | Geometric Distribution: “The survival function is clean: $P(X > n) = (1-p)^n$ — "the first $n$ trials all failed."” |
| If two random variables are independent, their joint CDF equals the product of the marginal CDFs: F(x,y)=F_X(x)F_Y(y). | fact | tagged | Joint Cumulative Distribution Function: “The joint CDF of [[Independent Random Variables]] factors as $F(x,y) = F_X(x)\cdot F_Y(y)$” |
| Use a given joint probability value to solve for the unknown parameter, then substitute the parameter into the joint CDF at a different poi… | procedure | missing |  |

</details>

<details><summary><code>p-239</code> · untagged</summary>

Tagged pages: Joint Cumulative Distribution Function, Independent Events

| Item | Kind | Status | Where |
|---|---|---|---|
| If the joint CDF of X and Y factors into a product of a function of x and a function of y, then X and Y are independent and each factor is … | fact | tagged | Joint Cumulative Distribution Function: “The joint CDF of [[Independent Random Variables]] factors as $F(x,y) = F_X(x)\cdot F_Y(y)$” |
| Obtain a marginal CDF from a joint CDF by letting the other variable go to infinity (or, when it factors, by taking the corresponding facto… | procedure | tagged | Joint Cumulative Distribution Function: “The joint CDF of [[Independent Random Variables]] factors as $F(x,y) = F_X(x)\cdot F_Y(y)$” |
| For a discrete random variable on nonnegative integers, P(X=k) = F(k) - F(k-1), the difference of the CDF at consecutive integers. | formula | elsewhere | Cumulative Distribution Function (CDF) (collapsed): “$$P(2 \leq X \leq 4) = F(4) - F(2) = \frac{4}{5} - \frac{2}{5} = \frac{2}{5} = 0.4$$” |
| For independent random variables, the joint probability P(X=x, Y=y) equals the product P(X=x)·P(Y=y). | formula | linked | Independent Random Variables: “$$f(x,y) = f_X(x)\cdot f_Y(y)$$” |

</details>

<details><summary><code>p-240</code> · gap</summary>

Tagged pages: Central Limit Theorem, Binomial Distribution, Normal Distribution

| Item | Kind | Status | Where |
|---|---|---|---|
| The number of deaths among independent individuals who each die with the same probability follows a binomial distribution with parameters n… | fact | tagged | Binomial Distribution: “The **Binomial Distribution** $X \sim \text{Bin}(n, p)$ models the number of successes in $n$ indep…” |
| A binomial(n, p) random variable has mean np and variance np(1-p). | formula | tagged | Binomial Distribution: “$E[X] = np$ and $\text{Var}(X) = np(1-p)$” |
| By the Central Limit Theorem, a sum of many independent identically distributed random variables is approximately normal with mean equal to… | fact | tagged | Central Limit Theorem: “For large $n$, $S_n$ is approximately $N(n\mu,\, n\sigma^2)$ regardless of the original distribution” |
| To find the amount needed so that a normally approximated total is covered with probability at least p, compute the p-th percentile as mean… | procedure | elsewhere | Normal Approximation: “Inverted, it sets a fund: the total exceeded with probability $\alpha$ is about $n\mu + z_{1-\alpha…” |
| The 99th percentile of the standard normal distribution is approximately 2.326. | fact | tagged | Normal Distribution: “Useful percentiles: $z_{0.90} = 1.282$, $z_{0.95} = 1.645$, $z_{0.975} = 1.960$, $z_{0.99} = 2.326$” |
| Multiplying a random variable by a constant multiplies its percentiles by that constant, so the total benefit's percentile equals the benef… | fact | missing |  |

</details>

<details><summary><code>p-241</code> · gap</summary>

Tagged pages: Central Limit Theorem, Normal Distribution

| Item | Kind | Status | Where |
|---|---|---|---|
| The expected value of a discrete random variable is the sum of each outcome multiplied by its probability. | formula | elsewhere | Expected Value: “$$E[X] = \begin{cases} \displaystyle\sum_{k} k\, f(k) & \text{(discrete)} \\[6pt] \displaystyle\int…” |
| The variance of a random variable is E[X^2] - (E[X])^2, equivalently the expected squared deviation from the mean. | formula | elsewhere | Variance and Standard Deviation: “Variance is the expected squared deviation; standard deviation is its square root, restored to the …” |
| For independent random variables, the mean of the sum is the sum of the means and the variance of the sum is the sum of the variances. | fact | elsewhere | Variance and Standard Deviation: “For a sum, $\text{Var}(X + Y) = \text{Var}(X) + \text{Var}(Y) + 2\,\text{Cov}(X,Y)$; the [[Covarian…” |
| By the Central Limit Theorem, the sum of a large number of independent identically distributed random variables is approximately normal wit… | fact | tagged | Central Limit Theorem: “For large $n$, $S_n$ is approximately $N(n\mu,\, n\sigma^2)$ regardless of the original distribution” |
| To find a normal probability, standardize by subtracting the mean and dividing by the standard deviation, then evaluate with the standard n… | procedure | tagged | Normal Distribution: “Its CDF has no closed form and is evaluated via the standard normal $Z = (X - \mu)/\sigma \sim N(0,…” |
| For the standard normal distribution, P(Z > -z) = Φ(z) by symmetry. | fact | tagged | Normal Distribution: “Symmetry gives $\Phi(-z) = 1 - \Phi(z)$ — the identity needed for every negative $z$, since standar…” |
| The ending value of a investment equals the initial value plus the sum of the periodic changes, so a probability about the final value is c… | procedure | missing |  |

</details>

<details><summary><code>p-242</code> · untagged</summary>

Tagged pages: Variance, Independent Events

| Item | Kind | Status | Where |
|---|---|---|---|
| For an exponential distribution with mean θ, E[X] = θ and Var(X) = θ², so the standard deviation equals the mean. | fact | elsewhere | Exponential Distribution: “$E[X] = \theta$, $\text{Var}(X) = \theta^2$, and $F(x) = 1 - e^{-x/\theta}$” |
| The second moment is obtained from the variance and mean via E[X²] = Var(X) + (E[X])². | formula | tagged | Variance: “$$= E[X^2] - \mu^2$$” |
| For a Bernoulli (0/1) random variable Z, Z² = Z, so E[Z²] = E[Z] = P(Z=1). | fact | elsewhere | Variance for Conditional and Marginal Distributions (collapsed): “Then $E[X \mid Y=2] = 0(0.2)+1(0.8) = 0.8$ and $E[X^2 \mid Y=2] = 0.8$.” |
| If X and Z are independent, then E[ZX] = E[Z]E[X] and E[(ZX)²] = E[Z²]E[X²]. | fact | elsewhere | Independent Random Variables: “For independent random variables: $E[XY] = E[X]\,E[Y]$ and $\text{Var}(X + Y) = \text{Var}(X) + \te…” |
| Var(Y) = E[Y²] − (E[Y])², applied here to Y = ZX. | formula | tagged | Variance: “Efficient computation formula: $\text{Var}(X) = E[X^2] - \mu^2$ where $\mu = E[X]$” |

</details>

<details><summary><code>p-243</code> · untagged</summary>

Tagged pages: Moments for Joint Distributions, Expected Value

| Item | Kind | Status | Where |
|---|---|---|---|
| To find the distribution of the maximum of independent random variables, use P(max ≤ k) = the product of the individual P(Xi ≤ k), then tak… | procedure | elsewhere | Order Statistics: “$$P\bigl(X_{(n)} \le x\bigr) = F_1(x)\,F_2(x)\cdots F_n(x)$$” |
| A discrete uniform distribution on a set of n values assigns probability 1/n to each value, with CDF P(X ≤ k) = (number of values ≤ k)/n. | definition | elsewhere | Uniform Discrete: “$$P(X = k) = \frac{1}{n}, \quad k = 1, 2, \ldots, n$$” |
| A benefit with a policy limit is modeled as the transformed variable min(c·M, limit), so the payment equals the capped value of the underly… | procedure | elsewhere | Benefit Limit: “$$Y = \min\!\bigl(\alpha(X - d)_+,\; u\bigr)$$” |
| The expected value of a function g of a discrete random variable is E[g(M)] = Σ g(k)·P(M=k). | formula | tagged | Moments for Joint Distributions: “$$E[g(X,Y)] = \sum_x \sum_y g(x,y)\,p(x,y)$$” |

</details>

<details><summary><code>p-244</code> · untagged</summary>

Tagged pages: Moments for Joint Distributions, Expected Value

| Item | Kind | Status | Where |
|---|---|---|---|
| A joint probability function gives the probability of each pair of values (x, y) of two discrete random variables, and the probabilities ov… | definition | elsewhere | Joint Probability Function: “$$p(x,y) = P(X = x,\; Y = y)$$” |
| The marginal probability of a value of one variable is obtained by summing the joint probabilities over all values of the other variable (e… | procedure | elsewhere | Marginal Probability Function: “Similarly $p_Y(y) = \sum_x p(x,y)$” |
| The expected value of a discrete random variable is E[X] = sum of x times P(X = x) over all values x. | formula | tagged | Expected Value: “$$E[X] = \begin{cases} \displaystyle\sum_{k} k\, f(k) & \text{(discrete)} \\[6pt] \displaystyle\int…” |

</details>

<details><summary><code>p-245</code> · untagged</summary>

Tagged pages: Variance for Conditional and Marginal Distributions, Exponential Distribution

| Item | Kind | Status | Where |
|---|---|---|---|
| The law of total variance states Var(X) = E[Var(X\|Y)] + Var(E[X\|Y]). | fact | tagged | Variance for Conditional and Marginal Distributions: “$$\text{Var}(X) = E\bigl[\text{Var}(X \mid Y)\bigr] + \text{Var}\bigl(E[X \mid Y]\bigr)$$” |
| An exponential distribution with mean θ has variance θ², so its variance equals the square of its mean. | fact | tagged | Exponential Distribution: “$E[X] = \theta$, $\text{Var}(X) = \theta^2$, and $F(x) = 1 - e^{-x/\theta}$” |
| A uniform distribution on [a, b] has mean (a+b)/2 and variance (b−a)²/12. | formula | elsewhere | Uniform Continuous Distribution: “$E[X] = (a+b)/2$, $\text{Var}(X) = (b-a)^2/12$, and $F(x) = (x-a)/(b-a)$ for $a < x < b$” |
| The second moment is computed as E[X²] = Var(X) + (E[X])². | formula | elsewhere | Variance: “Efficient computation formula: $\text{Var}(X) = E[X^2] - \mu^2$ where $\mu = E[X]$” |
| For a constant c, Var(cX) = c²Var(X) and E[cX] = cE[X]. | fact | elsewhere | Variance: “$\text{Var}(aX + b) = a^2 \text{Var}(X)$ — scaling changes variance, shifts do not” |
| To find the unconditional variance of a loss whose distribution depends on a random parameter, compute the conditional mean and conditional… | procedure | tagged | Variance for Conditional and Marginal Distributions (collapsed): “For $X \mid Y = y \sim \text{Uniform}(0,y)$: $E[X \mid Y] = Y/2$ and $\text{Var}(X \mid Y) = Y^2/12…” |

</details>

<details><summary><code>p-246</code> · gap</summary>

Tagged pages: Moments for Joint Distributions, Variance for Conditional and Marginal Distributions

| Item | Kind | Status | Where |
|---|---|---|---|
| If X and Y are independent Poisson random variables with means λ1 and λ2, then conditional on X+Y=n, X follows a Binomial distribution with… | fact | elsewhere | Poisson Superposition: “Given $N(t) = n$ merged events, the number from stream $i$ is [[Binomial Distribution\\|binomial]]$(…” |
| The variance of a Binomial(n, p) random variable is n·p·(1−p). | formula | elsewhere | Binomial Distribution: “$E[X] = np$ and $\text{Var}(X) = np(1-p)$” |
| Var(aX+b)=a²Var(X), so adding a constant does not change variance and a scale factor is squared. | fact | elsewhere | Variance: “$\text{Var}(aX + b) = a^2 \text{Var}(X)$ — scaling changes variance, shifts do not” |
| When X+Y is fixed at a known value n, rewrite Y as n−X so that X−Y becomes 2X−n, reducing the conditional variance of X−Y to a multiple of … | procedure | missing |  |

</details>

<details><summary><code>p-247</code> · gap</summary>

Tagged pages: Joint Probability Function, Variance

| Item | Kind | Status | Where |
|---|---|---|---|
| The probabilities in a joint probability table must sum to 1, which gives a constraint on any unknown cell probabilities. | fact | tagged | Joint Probability Function: “It satisfies $p(x,y) \geq 0$ for all $(x,y)$ and $\displaystyle\sum_x \sum_y p(x,y) = 1$” |
| Obtain the marginal distribution of one variable from a joint table by summing the joint probabilities over all values of the other variabl… | procedure | linked | Marginal Probability Function: “The **marginal probability function** of $X$ is obtained from the [[Joint Probability Function]] $p…” |
| For a discrete random variable, E[X] = sum of x·P(X=x) and E[X^2] = sum of x^2·P(X=x). | formula | elsewhere | Discrete Random Variable: “Expectations are sums: $E[g(X)] = \sum_x g(x)\,p(x)$.” |
| Variance of a random variable equals Var(X) = E[X^2] - (E[X])^2. | formula | tagged | Variance: “Efficient computation formula: $\text{Var}(X) = E[X^2] - \mu^2$ where $\mu = E[X]$” |
| To minimize a variance that is a function of an unknown parameter, express the variance in terms of the parameter and choose its value with… | procedure | missing |  |

</details>

<details><summary><code>p-248</code> · untagged</summary>

Tagged pages: Covariance, Correlation Coefficient, Independent Random Variables

| Item | Kind | Status | Where |
|---|---|---|---|
| Cov(X,Y) = E[XY] - E[X]E[Y]. | formula | tagged | Covariance: “$$\text{Cov}(X, Y) = E[XY] - E[X] \cdot E[Y]$$” |
| For a discrete random variable, the expected value of a function g(X) is the sum of g(x) times P(X=x) over all values x. | formula | elsewhere | Discrete Random Variable: “Expectations are sums: $E[g(X)] = \sum_x g(x)\,p(x)$.” |
| Two random variables are independent if and only if the joint probability equals the product of the marginal probabilities for all value pa… | definition | tagged | Independent Random Variables: “Formally, for all values $x$ and $y$, the joint distribution factors into the product of the margin…” |
| Zero covariance does not imply independence; random variables can be uncorrelated yet dependent (e.g., when one is a nonlinear function of … | fact | tagged | Independent Random Variables: “Independence implies [[Covariance]] is zero ($\text{Cov}(X,Y) = 0$), though the converse is not alw…” |
| To show two random variables are dependent, find one pair of values where the joint probability differs from the product of the marginal pr… | procedure | tagged | Independent Random Variables: “Formally, for all values $x$ and $y$, the joint distribution factors into the product of the margin…” |

</details>

<details><summary><code>p-249</code> · answerable</summary>

Tagged pages: Order Statistics, Exponential Distribution, Expected Value

| Item | Kind | Status | Where |
|---|---|---|---|
| The smaller of two losses is the minimum order statistic, min(X1,X2), whose survival function is P(min>z)=P(X1>z)P(X2>z) when the losses ar… | definition | tagged | Order Statistics: “$$P\bigl(X_{(1)} > x\bigr) = \bigl[1 - F_1(x)\bigr]\bigl[1 - F_2(x)\bigr]\cdots\bigl[1 - F_n(x)\big…” |
| The minimum of n independent exponential random variables with rate λ is exponential with rate nλ. | fact | tagged | Order Statistics: “That is the survival function of an exponential with mean 6, so $E[X_{(1)}] = 6$ — shorter than eit…” |
| An exponential distribution with rate λ has mean 1/λ, and the survival function is S(x)=e^{-λx}. | formula | tagged | Exponential Distribution: “Some texts parameterize by **rate** $\lambda = 1/\theta$, so $f(x) = \lambda e^{-\lambda x}$ and $E…” |

</details>

<details><summary><code>p-250</code> · error</summary>

Error: BackendError: You've hit your session limit · resets 12am (UTC)

</details>

<details><summary><code>p-251</code> · error</summary>

Error: BackendError: You've hit your session limit · resets 12am (UTC)

</details>

<details><summary><code>p-252</code> · error</summary>

Error: BackendError: You've hit your session limit · resets 12am (UTC)

</details>

<details><summary><code>p-253</code> · answerable</summary>

Tagged pages: Moments for Linear Combinations, Variance

| Item | Kind | Status | Where |
|---|---|---|---|
| For constants a and b, Var(aX + bY + c) = a^2 Var(X) + b^2 Var(Y) + 2ab Cov(X,Y). | formula | tagged | Moments for Linear Combinations: “$$\text{Var}(W) = \sum_{i=1}^n a_i^2 \,\text{Var}(X_i) + 2\sum_{i < j} a_i a_j \,\text{Cov}(X_i, X_…” |
| Independent random variables have zero covariance, so the variance of their sum (or linear combination) has no covariance term. | fact | tagged | Moments for Linear Combinations: “When the variables are [[Independent Random Variables]], all covariance terms vanish:” |
| Adding a constant to a random variable does not change its variance. | fact | tagged | Variance: “$\text{Var}(aX + b) = a^2 \text{Var}(X)$ — scaling changes variance, shifts do not” |

</details>

<details><summary><code>p-254</code> · error</summary>

Error: BackendError: You've hit your session limit · resets 12am (UTC)

</details>

<details><summary><code>p-255</code> · error</summary>

Error: BackendError: You've hit your session limit · resets 12am (UTC)

</details>

<details><summary><code>p-256</code> · error</summary>

Error: BackendError: You've hit your session limit · resets 12am (UTC)

</details>

<details><summary><code>p-257</code> · error</summary>

Error: BackendError: You've hit your session limit · resets 12am (UTC)

</details>

<details><summary><code>p-258</code> · error</summary>

Error: BackendError: You've hit your session limit · resets 12am (UTC)

</details>

<details><summary><code>p-259</code> · error</summary>

Error: BackendError: You've hit your session limit · resets 12am (UTC)

</details>

<details><summary><code>p-260</code> · error</summary>

Error: BackendError: You've hit your session limit · resets 12am (UTC)

</details>

<details><summary><code>p-261</code> · error</summary>

Error: BackendError: You've hit your session limit · resets 12am (UTC)

</details>

<details><summary><code>p-262</code> · error</summary>

Error: BackendError: You've hit your session limit · resets 12am (UTC)

</details>

<details><summary><code>p-263</code> · error</summary>

Error: BackendError: You've hit your session limit · resets 12am (UTC)

</details>

<details><summary><code>p-264</code> · error</summary>

Error: BackendError: You've hit your session limit · resets 12am (UTC)

</details>

<details><summary><code>p-265</code> · error</summary>

Error: BackendError: You've hit your session limit · resets 12am (UTC)

</details>

<details><summary><code>p-266</code> · error</summary>

Error: BackendError: You've hit your session limit · resets 12am (UTC)

</details>

<details><summary><code>p-267</code> · error</summary>

Error: BackendError: You've hit your session limit · resets 12am (UTC)

</details>

<details><summary><code>p-268</code> · error</summary>

Error: BackendError: You've hit your session limit · resets 12am (UTC)

</details>

<details><summary><code>p-269</code> · error</summary>

Error: BackendError: You've hit your session limit · resets 12am (UTC)

</details>

<details><summary><code>p-270</code> · error</summary>

Error: BackendError: You've hit your session limit · resets 12am (UTC)

</details>

<details><summary><code>p-284</code> · error</summary>

Error: BackendError: You've hit your session limit · resets 12am (UTC)

</details>

<details><summary><code>p-285</code> · error</summary>

Error: BackendError: You've hit your session limit · resets 12am (UTC)

</details>

<details><summary><code>p-286</code> · error</summary>

Error: BackendError: You've hit your session limit · resets 12am (UTC)

</details>

<details><summary><code>p-288</code> · error</summary>

Error: BackendError: You've hit your session limit · resets 12am (UTC)

</details>

<details><summary><code>p-289</code> · error</summary>

Error: BackendError: You've hit your session limit · resets 12am (UTC)

</details>

<details><summary><code>p-290</code> · error</summary>

Error: BackendError: You've hit your session limit · resets 12am (UTC)

</details>

<details><summary><code>p-291</code> · error</summary>

Error: BackendError: You've hit your session limit · resets 12am (UTC)

</details>

<details><summary><code>p-292</code> · error</summary>

Error: BackendError: You've hit your session limit · resets 12am (UTC)

</details>

<details><summary><code>p-293</code> · error</summary>

Error: BackendError: You've hit your session limit · resets 12am (UTC)

</details>

<details><summary><code>p-294</code> · error</summary>

Error: BackendError: You've hit your session limit · resets 12am (UTC)

</details>

<details><summary><code>p-295</code> · error</summary>

Error: BackendError: You've hit your session limit · resets 12am (UTC)

</details>

<details><summary><code>p-296</code> · error</summary>

Error: BackendError: You've hit your session limit · resets 12am (UTC)

</details>

<details><summary><code>p-297</code> · error</summary>

Error: BackendError: You've hit your session limit · resets 12am (UTC)

</details>

<details><summary><code>p-298</code> · error</summary>

Error: BackendError: You've hit your session limit · resets 12am (UTC)

</details>

<details><summary><code>p-299</code> · error</summary>

Error: BackendError: You've hit your session limit · resets 12am (UTC)

</details>

<details><summary><code>p-300</code> · error</summary>

Error: BackendError: You've hit your session limit · resets 12am (UTC)

</details>

<details><summary><code>p-301</code> · error</summary>

Error: BackendError: You've hit your session limit · resets 12am (UTC)

</details>

<details><summary><code>p-302</code> · error</summary>

Error: BackendError: You've hit your session limit · resets 12am (UTC)

</details>

<details><summary><code>p-303</code> · error</summary>

Error: BackendError: You've hit your session limit · resets 12am (UTC)

</details>

<details><summary><code>p-304</code> · error</summary>

Error: BackendError: You've hit your session limit · resets 12am (UTC)

</details>

<details><summary><code>p-305</code> · error</summary>

Error: BackendError: You've hit your session limit · resets 12am (UTC)

</details>

<details><summary><code>p-306</code> · error</summary>

Error: BackendError: You've hit your session limit · resets 12am (UTC)

</details>

<details><summary><code>p-307</code> · error</summary>

Error: BackendError: You've hit your session limit · resets 12am (UTC)

</details>

<details><summary><code>p-308</code> · error</summary>

Error: BackendError: You've hit your session limit · resets 12am (UTC)

</details>

<details><summary><code>p-309</code> · error</summary>

Error: BackendError: You've hit your session limit · resets 12am (UTC)

</details>

<details><summary><code>p-310</code> · error</summary>

Error: BackendError: You've hit your session limit · resets 12am (UTC)

</details>

<details><summary><code>p-311</code> · error</summary>

Error: BackendError: You've hit your session limit · resets 12am (UTC)

</details>

<details><summary><code>p-312</code> · error</summary>

Error: BackendError: You've hit your session limit · resets 12am (UTC)

</details>

<details><summary><code>p-313</code> · error</summary>

Error: BackendError: You've hit your session limit · resets 12am (UTC)

</details>

<details><summary><code>p-314</code> · error</summary>

Error: BackendError: You've hit your session limit · resets 12am (UTC)

</details>

<details><summary><code>p-315</code> · error</summary>

Error: BackendError: You've hit your session limit · resets 12am (UTC)

</details>

<details><summary><code>p-316</code> · error</summary>

Error: BackendError: You've hit your session limit · resets 12am (UTC)

</details>

<details><summary><code>p-317</code> · error</summary>

Error: BackendError: You've hit your session limit · resets 12am (UTC)

</details>

<details><summary><code>p-318</code> · error</summary>

Error: BackendError: You've hit your session limit · resets 12am (UTC)

</details>

<details><summary><code>p-319</code> · error</summary>

Error: BackendError: You've hit your session limit · resets 12am (UTC)

</details>

<details><summary><code>p-320</code> · error</summary>

Error: BackendError: You've hit your session limit · resets 12am (UTC)

</details>

<details><summary><code>p-321</code> · error</summary>

Error: BackendError: You've hit your session limit · resets 12am (UTC)

</details>

<details><summary><code>p-322</code> · error</summary>

Error: BackendError: You've hit your session limit · resets 12am (UTC)

</details>

<details><summary><code>p-323</code> · error</summary>

Error: BackendError: You've hit your session limit · resets 12am (UTC)

</details>

<details><summary><code>p-324</code> · error</summary>

Error: BackendError: You've hit your session limit · resets 12am (UTC)

</details>

<details><summary><code>p-325</code> · error</summary>

Error: BackendError: You've hit your session limit · resets 12am (UTC)

</details>

<details><summary><code>p-326</code> · error</summary>

Error: BackendError: You've hit your session limit · resets 12am (UTC)

</details>

<details><summary><code>p-327</code> · error</summary>

Error: BackendError: You've hit your session limit · resets 12am (UTC)

</details>

<details><summary><code>p-328</code> · error</summary>

Error: BackendError: You've hit your session limit · resets 12am (UTC)

</details>

<details><summary><code>p-329</code> · error</summary>

Error: BackendError: You've hit your session limit · resets 12am (UTC)

</details>

<details><summary><code>p-330</code> · error</summary>

Error: BackendError: You've hit your session limit · resets 12am (UTC)

</details>

<details><summary><code>p-331</code> · error</summary>

Error: BackendError: You've hit your session limit · resets 12am (UTC)

</details>

<details><summary><code>p-332</code> · error</summary>

Error: BackendError: You've hit your session limit · resets 12am (UTC)

</details>

<details><summary><code>p-333</code> · error</summary>

Error: BackendError: You've hit your session limit · resets 12am (UTC)

</details>

<details><summary><code>p-334</code> · error</summary>

Error: BackendError: You've hit your session limit · resets 12am (UTC)

</details>

<details><summary><code>p-335</code> · error</summary>

Error: BackendError: You've hit your session limit · resets 12am (UTC)

</details>

<details><summary><code>p-336</code> · error</summary>

Error: BackendError: You've hit your session limit · resets 12am (UTC)

</details>

<details><summary><code>p-337</code> · error</summary>

Error: BackendError: You've hit your session limit · resets 12am (UTC)

</details>

<details><summary><code>p-338</code> · error</summary>

Error: BackendError: You've hit your session limit · resets 12am (UTC)

</details>

<details><summary><code>p-339</code> · error</summary>

Error: BackendError: You've hit your session limit · resets 12am (UTC)

</details>

<details><summary><code>p-340</code> · error</summary>

Error: BackendError: You've hit your session limit · resets 12am (UTC)

</details>

<details><summary><code>p-341</code> · error</summary>

Error: BackendError: You've hit your session limit · resets 12am (UTC)

</details>

<details><summary><code>p-342</code> · error</summary>

Error: BackendError: You've hit your session limit · resets 12am (UTC)

</details>

<details><summary><code>p-343</code> · error</summary>

Error: BackendError: You've hit your session limit · resets 12am (UTC)

</details>

<details><summary><code>p-344</code> · error</summary>

Error: BackendError: You've hit your session limit · resets 12am (UTC)

</details>

<details><summary><code>p-345</code> · error</summary>

Error: BackendError: You've hit your session limit · resets 12am (UTC)

</details>

<details><summary><code>p-346</code> · error</summary>

Error: BackendError: You've hit your session limit · resets 12am (UTC)

</details>

<details><summary><code>p-347</code> · error</summary>

Error: BackendError: You've hit your session limit · resets 12am (UTC)

</details>

<details><summary><code>p-348</code> · error</summary>

Error: BackendError: You've hit your session limit · resets 12am (UTC)

</details>

<details><summary><code>p-349</code> · error</summary>

Error: BackendError: You've hit your session limit · resets 12am (UTC)

</details>

<details><summary><code>p-350</code> · error</summary>

Error: BackendError: You've hit your session limit · resets 12am (UTC)

</details>

<details><summary><code>p-351</code> · error</summary>

Error: BackendError: You've hit your session limit · resets 12am (UTC)

</details>

<details><summary><code>p-352</code> · error</summary>

Error: BackendError: You've hit your session limit · resets 12am (UTC)

</details>

<details><summary><code>p-353</code> · error</summary>

Error: BackendError: You've hit your session limit · resets 12am (UTC)

</details>

<details><summary><code>p-354</code> · error</summary>

Error: BackendError: You've hit your session limit · resets 12am (UTC)

</details>

<details><summary><code>p-355</code> · error</summary>

Error: BackendError: You've hit your session limit · resets 12am (UTC)

</details>

<details><summary><code>p-357</code> · error</summary>

Error: BackendError: You've hit your session limit · resets 12am (UTC)

</details>

<details><summary><code>p-358</code> · error</summary>

Error: BackendError: You've hit your session limit · resets 12am (UTC)

</details>

<details><summary><code>p-359</code> · error</summary>

Error: BackendError: You've hit your session limit · resets 12am (UTC)

</details>

<details><summary><code>p-360</code> · error</summary>

Error: BackendError: You've hit your session limit · resets 12am (UTC)

</details>

<details><summary><code>p-361</code> · error</summary>

Error: BackendError: You've hit your session limit · resets 12am (UTC)

</details>

<details><summary><code>p-362</code> · error</summary>

Error: BackendError: You've hit your session limit · resets 12am (UTC)

</details>

<details><summary><code>p-363</code> · error</summary>

Error: BackendError: You've hit your session limit · resets 12am (UTC)

</details>

<details><summary><code>p-364</code> · error</summary>

Error: BackendError: You've hit your session limit · resets 12am (UTC)

</details>

<details><summary><code>p-365</code> · error</summary>

Error: BackendError: You've hit your session limit · resets 12am (UTC)

</details>

<details><summary><code>p-366</code> · error</summary>

Error: BackendError: You've hit your session limit · resets 12am (UTC)

</details>

<details><summary><code>p-367</code> · error</summary>

Error: BackendError: You've hit your session limit · resets 12am (UTC)

</details>

<details><summary><code>p-368</code> · error</summary>

Error: BackendError: You've hit your session limit · resets 12am (UTC)

</details>

<details><summary><code>p-369</code> · error</summary>

Error: BackendError: You've hit your session limit · resets 12am (UTC)

</details>

<details><summary><code>p-370</code> · error</summary>

Error: BackendError: You've hit your session limit · resets 12am (UTC)

</details>

<details><summary><code>p-371</code> · error</summary>

Error: BackendError: You've hit your session limit · resets 12am (UTC)

</details>

<details><summary><code>p-372</code> · error</summary>

Error: BackendError: You've hit your session limit · resets 12am (UTC)

</details>

<details><summary><code>p-373</code> · error</summary>

Error: BackendError: You've hit your session limit · resets 12am (UTC)

</details>

<details><summary><code>p-374</code> · error</summary>

Error: BackendError: You've hit your session limit · resets 12am (UTC)

</details>

<details><summary><code>p-375</code> · error</summary>

Error: BackendError: You've hit your session limit · resets 12am (UTC)

</details>

<details><summary><code>p-376</code> · error</summary>

Error: BackendError: You've hit your session limit · resets 12am (UTC)

</details>

<details><summary><code>p-377</code> · error</summary>

Error: BackendError: You've hit your session limit · resets 12am (UTC)

</details>

<details><summary><code>p-378</code> · error</summary>

Error: BackendError: You've hit your session limit · resets 12am (UTC)

</details>

<details><summary><code>p-379</code> · error</summary>

Error: BackendError: You've hit your session limit · resets 12am (UTC)

</details>

<details><summary><code>p-380</code> · error</summary>

Error: BackendError: You've hit your session limit · resets 12am (UTC)

</details>

<details><summary><code>p-381</code> · error</summary>

Error: BackendError: You've hit your session limit · resets 12am (UTC)

</details>

<details><summary><code>p-382</code> · error</summary>

Error: BackendError: You've hit your session limit · resets 12am (UTC)

</details>

<details><summary><code>p-383</code> · error</summary>

Error: BackendError: You've hit your session limit · resets 12am (UTC)

</details>

<details><summary><code>p-384</code> · error</summary>

Error: BackendError: You've hit your session limit · resets 12am (UTC)

</details>

<details><summary><code>p-385</code> · error</summary>

Error: BackendError: You've hit your session limit · resets 12am (UTC)

</details>

<details><summary><code>p-386</code> · error</summary>

Error: BackendError: You've hit your session limit · resets 12am (UTC)

</details>

<details><summary><code>p-387</code> · error</summary>

Error: BackendError: You've hit your session limit · resets 12am (UTC)

</details>

<details><summary><code>p-388</code> · error</summary>

Error: BackendError: You've hit your session limit · resets 12am (UTC)

</details>

<details><summary><code>p-389</code> · error</summary>

Error: BackendError: You've hit your session limit · resets 12am (UTC)

</details>

<details><summary><code>p-390</code> · error</summary>

Error: BackendError: You've hit your session limit · resets 12am (UTC)

</details>

<details><summary><code>p-391</code> · error</summary>

Error: BackendError: You've hit your session limit · resets 12am (UTC)

</details>

<details><summary><code>p-392</code> · error</summary>

Error: BackendError: You've hit your session limit · resets 12am (UTC)

</details>

<details><summary><code>p-393</code> · error</summary>

Error: BackendError: You've hit your session limit · resets 12am (UTC)

</details>

<details><summary><code>p-394</code> · error</summary>

Error: BackendError: You've hit your session limit · resets 12am (UTC)

</details>

<details><summary><code>p-395</code> · error</summary>

Error: BackendError: You've hit your session limit · resets 12am (UTC)

</details>

<details><summary><code>p-396</code> · error</summary>

Error: BackendError: You've hit your session limit · resets 12am (UTC)

</details>

<details><summary><code>p-397</code> · error</summary>

Error: BackendError: You've hit your session limit · resets 12am (UTC)

</details>

<details><summary><code>p-398</code> · error</summary>

Error: BackendError: You've hit your session limit · resets 12am (UTC)

</details>

<details><summary><code>p-399</code> · error</summary>

Error: BackendError: You've hit your session limit · resets 12am (UTC)

</details>

<details><summary><code>p-400</code> · error</summary>

Error: BackendError: You've hit your session limit · resets 12am (UTC)

</details>

<details><summary><code>p-401</code> · error</summary>

Error: BackendError: You've hit your session limit · resets 12am (UTC)

</details>

<details><summary><code>p-402</code> · error</summary>

Error: BackendError: You've hit your session limit · resets 12am (UTC)

</details>

<details><summary><code>p-403</code> · error</summary>

Error: BackendError: You've hit your session limit · resets 12am (UTC)

</details>

<details><summary><code>p-404</code> · error</summary>

Error: BackendError: You've hit your session limit · resets 12am (UTC)

</details>

<details><summary><code>p-405</code> · error</summary>

Error: BackendError: You've hit your session limit · resets 12am (UTC)

</details>

<details><summary><code>p-406</code> · error</summary>

Error: BackendError: You've hit your session limit · resets 12am (UTC)

</details>

<details><summary><code>p-407</code> · error</summary>

Error: BackendError: You've hit your session limit · resets 12am (UTC)

</details>

<details><summary><code>p-408</code> · error</summary>

Error: BackendError: You've hit your session limit · resets 12am (UTC)

</details>

<details><summary><code>p-409</code> · error</summary>

Error: BackendError: You've hit your session limit · resets 12am (UTC)

</details>

<details><summary><code>p-410</code> · error</summary>

Error: BackendError: You've hit your session limit · resets 12am (UTC)

</details>

<details><summary><code>p-411</code> · error</summary>

Error: BackendError: You've hit your session limit · resets 12am (UTC)

</details>

<details><summary><code>p-412</code> · error</summary>

Error: BackendError: You've hit your session limit · resets 12am (UTC)

</details>

<details><summary><code>p-413</code> · error</summary>

Error: BackendError: You've hit your session limit · resets 12am (UTC)

</details>

<details><summary><code>p-414</code> · error</summary>

Error: BackendError: You've hit your session limit · resets 12am (UTC)

</details>

<details><summary><code>p-415</code> · error</summary>

Error: BackendError: You've hit your session limit · resets 12am (UTC)

</details>

<details><summary><code>p-416</code> · error</summary>

Error: BackendError: You've hit your session limit · resets 12am (UTC)

</details>

<details><summary><code>p-417</code> · error</summary>

Error: BackendError: You've hit your session limit · resets 12am (UTC)

</details>

<details><summary><code>p-418</code> · error</summary>

Error: BackendError: You've hit your session limit · resets 12am (UTC)

</details>

<details><summary><code>p-419</code> · error</summary>

Error: BackendError: You've hit your session limit · resets 12am (UTC)

</details>

<details><summary><code>p-420</code> · error</summary>

Error: BackendError: You've hit your session limit · resets 12am (UTC)

</details>

<details><summary><code>p-421</code> · error</summary>

Error: BackendError: You've hit your session limit · resets 12am (UTC)

</details>

<details><summary><code>p-422</code> · error</summary>

Error: BackendError: You've hit your session limit · resets 12am (UTC)

</details>

<details><summary><code>p-423</code> · error</summary>

Error: BackendError: You've hit your session limit · resets 12am (UTC)

</details>

<details><summary><code>p-424</code> · error</summary>

Error: BackendError: You've hit your session limit · resets 12am (UTC)

</details>

<details><summary><code>p-425</code> · error</summary>

Error: BackendError: You've hit your session limit · resets 12am (UTC)

</details>

<details><summary><code>p-426</code> · error</summary>

Error: BackendError: You've hit your session limit · resets 12am (UTC)

</details>

<details><summary><code>p-428</code> · error</summary>

Error: BackendError: You've hit your session limit · resets 12am (UTC)

</details>

<details><summary><code>p-429</code> · error</summary>

Error: BackendError: You've hit your session limit · resets 12am (UTC)

</details>

<details><summary><code>p-430</code> · error</summary>

Error: BackendError: You've hit your session limit · resets 12am (UTC)

</details>

<details><summary><code>p-431</code> · error</summary>

Error: BackendError: You've hit your session limit · resets 12am (UTC)

</details>

<details><summary><code>p-432</code> · error</summary>

Error: BackendError: You've hit your session limit · resets 12am (UTC)

</details>

<details><summary><code>p-433</code> · error</summary>

Error: BackendError: You've hit your session limit · resets 12am (UTC)

</details>

<details><summary><code>p-434</code> · error</summary>

Error: BackendError: You've hit your session limit · resets 12am (UTC)

</details>

<details><summary><code>p-435</code> · error</summary>

Error: BackendError: You've hit your session limit · resets 12am (UTC)

</details>

<details><summary><code>p-436</code> · error</summary>

Error: BackendError: You've hit your session limit · resets 12am (UTC)

</details>

<details><summary><code>p-437</code> · error</summary>

Error: BackendError: You've hit your session limit · resets 12am (UTC)

</details>

<details><summary><code>p-438</code> · error</summary>

Error: BackendError: You've hit your session limit · resets 12am (UTC)

</details>

<details><summary><code>p-439</code> · untagged</summary>

Tagged pages: Linear Combinations of Random Variables, Normal Distribution, Independent Random Variables

| Item | Kind | Status | Where |
|---|---|---|---|
| To find P[X > 0] for a normal random variable X, standardize by subtracting the mean and dividing by the standard deviation, then use the s… | procedure | tagged | Normal Distribution: “Its CDF has no closed form and is evaluated via the standard normal $Z = (X - \mu)/\sigma \sim N(0,…” |
| Given a normal probability, use the inverse standard normal table to find the z-value (percentile) corresponding to that probability, and s… | procedure | elsewhere | Normal Approximation (collapsed): “This is at most $0.05$ when $0.05\sqrt{n} \ge 1.645$:” |
| The expected value of a sum of random variables equals the sum of their expected values. | fact | tagged | Linear Combinations of Random Variables: “$$E[L] = \sum_{i=1}^{n} c_i\,E[X_i]$$” |
| The variance of a sum of independent random variables equals the sum of their variances. | fact | tagged | Independent Random Variables: “For independent random variables: $E[XY] = E[X]\,E[Y]$ and $\text{Var}(X + Y) = \text{Var}(X) + \te…” |
| The sum of independent normal random variables is itself normally distributed, with mean equal to the sum of the means and variance equal t… | fact | tagged | Normal Distribution: “Any **linear combination of independent normals is exactly normal**: if $X_i \sim N(\mu_i, \sigma_i…” |
| The probability that two independent events both occur is the product of their probabilities, which is not the same as the probability that… | fact | elsewhere | Probability Multiplication Rule: “When $A$ and $B$ are [[Independent Events\\|independent]], the rule simplifies to $P(A \cap B) = P(A…” |

</details>

<details><summary><code>p-440</code> · answerable</summary>

Tagged pages: Exponential Distribution, Percentile

| Item | Kind | Status | Where |
|---|---|---|---|
| An exponential distribution with mean θ has distribution function F(x) = 1 - e^{-x/θ} for x ≥ 0. | formula | tagged | Exponential Distribution: “$E[X] = \theta$, $\text{Var}(X) = \theta^2$, and $F(x) = 1 - e^{-x/\theta}$” |
| The median of a continuous distribution is the value m at which the distribution function equals 0.5, i.e., F(m) = 0.5. | definition | linked | Median: “For a continuous distribution that is the point where $F(m) = 0.5$, splitting the probability in ha…” |
| For an exponential distribution with mean θ, the median equals θ ln 2 (about 0.693θ), so the mean is about 1.44 times the median. | fact | linked | Median: “For the [[Exponential Distribution\\|exponential]], $m = \theta \ln 2 \approx 0.693\theta$ against a…” |

</details>

<details><summary><code>p-441</code> · answerable</summary>

Tagged pages: Uniform Continuous Distribution, Variance and Standard Deviation

| Item | Kind | Status | Where |
|---|---|---|---|
| A continuous uniform distribution on [0, L] has constant density 1/L over an interval of length L, with the interval length being its only … | definition | tagged | Uniform Continuous Distribution: “$$f(x) = \frac{1}{b - a}, \quad a < x < b$$” |
| The variance of a uniform distribution on an interval [a, c] is (c − a)^2/12, so its standard deviation is (c − a)/√12. | formula | tagged | Uniform Continuous Distribution: “$E[X] = (a+b)/2$, $\text{Var}(X) = (b-a)^2/12$, and $F(x) = (x-a)/(b-a)$ for $a < x < b$” |
| The standard deviation is the positive square root of the variance, so a known standard deviation can be used to solve for an unknown distr… | fact | tagged | Variance and Standard Deviation: “$$\sigma = \text{SD}(X) = \sqrt{\text{Var}(X)}$$” |

</details>

<details><summary><code>p-442</code> · gap</summary>

Tagged pages: Uniform Continuous Distribution, Variance and Standard Deviation

| Item | Kind | Status | Where |
|---|---|---|---|
| For a random variable uniform on [a, b], the upper-tail probability P[X > x] equals (b - x)/(b - a) for x within [a, b], i.e., the fraction… | fact | tagged | Uniform Continuous Distribution: “$E[X] = (a+b)/2$, $\text{Var}(X) = (b-a)^2/12$, and $F(x) = (x-a)/(b-a)$ for $a < x < b$” |
| The variance of a random variable uniform on [a, b] is (b - a)^2 / 12. | formula | tagged | Uniform Continuous Distribution: “$E[X] = (a+b)/2$, $\text{Var}(X) = (b-a)^2/12$, and $F(x) = (x-a)/(b-a)$ for $a < x < b$” |
| To find the unknown endpoints of a uniform distribution, write the given tail probabilities as equations in a and b and solve the resulting… | procedure | missing |  |

</details>

<details><summary><code>p-443</code> · gap</summary>

Tagged pages: Expected Value, Continuous Univariate Distributions

| Item | Kind | Status | Where |
|---|---|---|---|
| For a continuous random variable X with density f, the expected value of a function g(X) is E[g(X)] = ∫ g(x) f(x) dx over the support of X. | formula | linked | Transformations of Random Variables: “If $E[g(X)]$ is all that is wanted, do **not** find $f_Y$ — use $E[g(X)] = \int g(x) f_X(x)\,dx$ di…” |
| The absolute value \|x - a\| equals a - x when x < a and x - a when x ≥ a, so it is a piecewise function that changes form at x = a. | definition | missing |  |
| To integrate a function against a piecewise-defined density, split the integral at every breakpoint of both the density and the integrand, … | procedure | missing |  |

</details>

<details><summary><code>p-444</code> · answerable</summary>

Tagged pages: Moments for Joint Distributions, Joint Probability Function, Expected Value

| Item | Kind | Status | Where |
|---|---|---|---|
| For a discrete joint distribution, the expected value of a function g(X,Y) is the sum over all (x,y) cells of g(x,y) times the joint probab… | formula | tagged | Moments for Joint Distributions: “$$E[g(X,Y)] = \sum_x \sum_y g(x,y)\,p(x,y)$$” |
| To tabulate a discrete joint probability function, substitute each support point (x,y) into the given formula to get the cell probabilities… | procedure | tagged | Joint Probability Function: “It satisfies $p(x,y) \geq 0$ for all $(x,y)$ and $\displaystyle\sum_x \sum_y p(x,y) = 1$” |
| The expected value of a ratio of random variables is generally not the ratio of their expected values, so E[Y/X] ≠ E[Y]/E[X] and the ratio … | fact | tagged | Moments for Joint Distributions: “$$E[g(X,Y)] = \sum_x \sum_y g(x,y)\,p(x,y)$$” |

</details>

<details><summary><code>p-445</code> · gap</summary>

Tagged pages: Set Theory, Venn Diagram

| Item | Kind | Status | Where |
|---|---|---|---|
| Partition the union of three events into seven disjoint Venn regions (only one, exactly two, all three) plus the region outside all events,… | procedure | missing |  |
| The size of each event equals the sum of its 'only' region, the region common to all three events, and the two 'exactly two' regions that o… | fact | missing |  |
| The total population equals the sum of all disjoint regions: those in exactly one set, exactly two sets, all three sets, and none of the se… | fact | missing |  |

</details>

<details><summary><code>p-446</code> · answerable</summary>

Tagged pages: Conditional and Marginal Probability Functions, Joint Probability Function, Variance and Standard Deviation

| Item | Kind | Status | Where |
|---|---|---|---|
| To get the marginal distribution of one variable from a joint probability table, sum the joint probabilities over all values of the other v… | procedure | tagged | Conditional and Marginal Probability Functions: “The marginal is found by summing (or integrating, in the continuous case) the [[Joint Probability F…” |
| The expected value of a discrete random variable is the sum of each possible value times its probability: E[X] = Σ x·P(X = x). | formula | tagged | Variance and Standard Deviation: “E[N] &= 0(0.6) + 1(0.3) + 2(0.1) \\” |
| The probabilities of all outcomes of a probability distribution must sum to 1, which can be used to solve for unknown probability parameter… | fact | tagged | Joint Probability Function: “It satisfies $p(x,y) \geq 0$ for all $(x,y)$ and $\displaystyle\sum_x \sum_y p(x,y) = 1$” |
| The variance of a discrete random variable is Var(X) = Σ (x − μ)²·P(X = x), the probability-weighted squared deviation from the mean (equiv… | formula | tagged | Variance and Standard Deviation: “$$\sigma^2 = \text{Var}(X) = E\left[(X - \mu)^2\right]$$” |

</details>

<details><summary><code>p-447</code> · untagged</summary>

Tagged pages: Deductible, Payment Random Variable, Uniform Continuous Distribution

| Item | Kind | Status | Where |
|---|---|---|---|
| A continuous uniform random variable on [a, b] has constant density 1/(b-a) on that interval and zero elsewhere. | definition | tagged | Uniform Continuous Distribution: “$$f(x) = \frac{1}{b - a}, \quad a < x < b$$” |
| Model a payment that is a percentage of the loss in excess of a deductible as a piecewise function of the loss: zero below the deductible a… | procedure | linked | Loss Random Variable: “$$Y = \begin{cases} 0 & X \leq d \\ X - d & X > d \end{cases}$$” |
| The expected value of a function g(X) of a continuous random variable is E[g(X)] = integral of g(x) f(x) dx over the support of X. | formula | elsewhere | Continuous Random Variable: “Expectations replace sums with integrals: $E[g(X)] = \int g(x)\,f(x)\,dx$” |
| When the payment is zero over part of the loss range, compute the expected payment by integrating only over the range where the payment is … | procedure | elsewhere | Continuous Random Variable (collapsed): “E[Y] &= \int_{200}^{1{,}000} (x - 200)\,\frac{1}{1{,}000}\,dx” |

</details>

<details><summary><code>p-448</code> · gap</summary>

Tagged pages: Order Statistics, Deductible, Uniform Continuous Distribution

| Item | Kind | Status | Where |
|---|---|---|---|
| With an ordinary deductible d, the claim payment on a loss X is max(X - d, 0), which is zero whenever the loss is at most d. | definition | tagged | Deductible: “If the loss $X$ is less than or equal to the deductible $d$, the insurer pays nothing; above $d$ it…” |
| The maximum of several random variables is at most t exactly when every one of them is at most t. | fact | tagged | Order Statistics: “P\bigl(X_{(n)} \le x\bigr) = F_1(x)\,F_2(x)\cdots F_n(x)” |
| For independent random variables, the probability that all of them fall in given events is the product of the individual probabilities, so … | fact | tagged | Order Statistics: “$$P\bigl(X_{(n)} \le x\bigr) = F_1(x)\,F_2(x)\cdots F_n(x)$$” |
| A payment after a deductible has a point mass at zero equal to P[X ≤ d], so its distribution is mixed, and for t ≥ 0 the event {payment ≤ t… | fact | missing |  |
| For X uniform on [a, b], the CDF is P[X ≤ x] = (x - a)/(b - a) for a ≤ x ≤ b. | formula | tagged | Uniform Continuous Distribution: “$F(x) = (x-a)/(b-a)$ for $a < x < b$” |

</details>

<details><summary><code>p-449</code> · untagged</summary>

Tagged pages: Joint Probability Function, Conditional and Marginal Probability Functions

| Item | Kind | Status | Where |
|---|---|---|---|
| The joint cumulative distribution function F(x,y) gives P[X ≤ x, Y ≤ y], the probability that both variables are at or below the given valu… | definition | elsewhere | Joint Cumulative Distribution Function: “The **joint cumulative distribution function** (joint CDF) of random variables $X$ and $Y$ gives th…” |
| For a joint CDF, P[a < X ≤ b, c < Y ≤ d] = F(b,d) − F(a,d) − F(b,c) + F(a,c), by inclusion–exclusion over the four corners of the rectangle. | formula | elsewhere | Joint Cumulative Distribution Function: “$$p(x,y) = F(x,y) - F(x-1,y) - F(x,y-1) + F(x-1,y-1)$$” |
| For integer-valued random variables, the event a < X ≤ b consists of the integers a+1 through b, so a rectangle probability from the CDF eq… | fact | elsewhere | Joint Cumulative Distribution Function: “For integer-valued $X$ and $Y$, a single cell is recovered from $F$ by inclusion–exclusion on the r…” |

</details>

<details><summary><code>p-450</code> · answerable</summary>

Tagged pages: Linear Combinations of Random Variables, Poisson Distribution, Variance and Standard Deviation

| Item | Kind | Status | Where |
|---|---|---|---|
| A Poisson random variable has mean equal to its variance. | fact | tagged | Poisson Distribution: “A defining property is $E[X] = \text{Var}(X) = \lambda$ — the mean and variance are equal” |
| For a linear combination of random variables, E[aX + bY + cZ] = aE[X] + bE[Y] + cE[Z]. | formula | tagged | Linear Combinations of Random Variables: “$$E[L] = \sum_{i=1}^{n} c_i\,E[X_i]$$” |
| For independent random variables, Var(aX + bY + cZ) = a²Var(X) + b²Var(Y) + c²Var(Z). | formula | tagged | Linear Combinations of Random Variables: “Coefficients enter the variance **squared**, so $\text{Var}(X - Y) = \text{Var}(X) + \text{Var}(Y)$…” |
| The coefficient of variation of a random variable is its standard deviation divided by its mean. | definition | linked | Coefficient of Variation: “The **Coefficient of Variation** $CV$ is the ratio of the standard deviation to the mean, measuring…” |

</details>

<details><summary><code>p-451</code> · untagged</summary>

Tagged pages: Order Statistics, Exponential Distribution, Expected Value

| Item | Kind | Status | Where |
|---|---|---|---|
| A series system that fails when any one of its independent components fails has a lifetime equal to the minimum of the component lifetimes. | fact | tagged | Order Statistics (collapsed): “A system fails as soon as either of two independent components fails. Their lifetimes are exponenti…” |
| The distribution function of a continuous random variable is obtained by integrating its density from the lower end of the support up to y:… | formula | elsewhere | Cumulative Distribution Function (CDF): “For a continuous random variable, $F(x) = \int_{-\infty}^{x} f(t)\, dt$” |
| For n independent identically distributed continuous random variables with density f and distribution function F, the minimum has density g… | formula | tagged | Order Statistics: “$$f_{X_{(k)}}(x) = \frac{n!}{(k-1)!\,(n-k)!} [F(x)]^{k-1} [1 - F(x)]^{n-k} f(x)$$” |
| A density of the form k e^{-k(y-a)} for y > a is a shifted exponential: a plus an exponential random variable with rate k, so its mean is a… | fact | tagged | Exponential Distribution: “given $X > d$, the excess $X - d$ is again $\text{Exp}(\theta)$. So $E[X \mid X > d] = d + \theta$” |

</details>

<details><summary><code>p-452</code> · answerable</summary>

Tagged pages: Central Limit Theorem, Normal Distribution, Linear Combinations of Random Variables

| Item | Kind | Status | Where |
|---|---|---|---|
| A sum of independent normal random variables is itself normally distributed. | fact | tagged | Normal Distribution: “Any **linear combination of independent normals is exactly normal**: if $X_i \sim N(\mu_i, \sigma_i…” |
| For a sum of independent random variables, the means add and the variances add, so the standard deviation of the sum of n iid variables is … | fact | linked | Moments for Linear Combinations: “$$\text{Var}(W) = \sum_{i=1}^n a_i^2 \,\text{Var}(X_i)$$” |
| To find a normal probability, standardize the threshold with z = (x - mean)/SD and read the upper-tail or lower-tail probability from the s… | procedure | tagged | Normal Distribution: “Its CDF has no closed form and is evaluated via the standard normal $Z = (X - \mu)/\sigma \sim N(0,…” |
| No continuity correction is needed when the variable is continuous and exactly normal; it applies only when approximating a discrete (count… | fact | tagged | Normal Distribution: “When approximating a **discrete** variable (a [[Binomial Distribution\\|binomial]] or [[Poisson Dist…” |

</details>

<details><summary><code>p-453</code> · untagged</summary>

Tagged pages: Deductible, Payment Random Variable, Variance and Standard Deviation

| Item | Kind | Status | Where |
|---|---|---|---|
| A payment with a deductible and a proportional coinsurance factor equals zero when the loss is below the deductible and equals the percenta… | definition | linked | Coinsurance Percentage: “$$Y = \alpha \cdot (X - d)_+$$” |
| A random variable that is zero with positive probability and otherwise continuous has a mixed distribution, consisting of a point mass at z… | fact | elsewhere | Continuous Random Variable (collapsed): “It is mixed: a mass of $0.2$ at zero plus a density of $\tfrac{1}{1{,}000}$ on $(0, 800)$.” |
| Find the distribution of a transformed variable X = g(Y) by rewriting P[X ≤ x] as a probability on Y (inverting g) and differentiating to g… | procedure | elsewhere | Transformations of Random Variables: “The reliable way to find its distribution is the **CDF method**: write $F_Y(y) = P(g(X) \leq y)$, r…” |
| A uniform distribution on [a,b] has constant density 1/(b-a), so probabilities of sub-intervals are proportional to their length. | fact | elsewhere | Uniform Continuous Distribution: “$$f(x) = \frac{1}{b - a}, \quad a < x < b$$” |
| For a mixed random variable, E[X^k] is the sum of the discrete terms (value^k times mass) plus the integral of x^k times the continuous den… | formula | elsewhere | Mixture Distribution: “Its moments combine a sum over the mass points with an integral over the continuous part.” |
| Var(X) = E[X^2] - (E[X])^2. | formula | elsewhere | Variance: “Efficient computation formula: $\text{Var}(X) = E[X^2] - \mu^2$ where $\mu = E[X]$” |

</details>

<details><summary><code>p-454</code> · answerable</summary>

Tagged pages: Deductible, Uniform Continuous Distribution, Conditional Probability

| Item | Kind | Status | Where |
|---|---|---|---|
| For an insurance with an ordinary deductible d, the benefit (payment per loss) equals max(loss − d, 0), so losses at or below d produce a b… | definition | tagged | Deductible: “If the loss $X$ is less than or equal to the deductible $d$, the insurer pays nothing; above $d$ it…” |
| To find a probability about a deductible benefit, translate each benefit event into an equivalent event on the loss by adding the deductibl… | procedure | tagged | Deductible: “If the loss $X$ is less than or equal to the deductible $d$, the insurer pays nothing; above $d$ it…” |
| The conditional probability is P(A \| B) = P(A ∩ B) / P(B). | formula | tagged | Conditional Probability: “$$P(A \mid B) = \frac{P(A \cap B)}{P(B)}, \quad P(B) > 0$$” |
| For a uniform distribution on [a, b], the probability of an interval is its length divided by (b − a), i.e. P(c < X < d) = (d − c)/(b − a). | fact | tagged | Uniform Continuous Distribution: “$F(x) = (x-a)/(b-a)$ for $a < x < b$” |

</details>

<details><summary><code>p-455</code> · untagged</summary>

Tagged pages: Bayes Theorem, Poisson Distribution, The Law of Total Probability

| Item | Kind | Status | Where |
|---|---|---|---|
| For a Poisson random variable with mean lambda, the probability of zero events is P(N=0) = e^{-lambda}. | formula | tagged | Poisson Distribution: “$$P(X = k) = \frac{e^{-\lambda}\lambda^k}{k!}$$” |
| Bayes' theorem: P(A\|B) = P(A)P(B\|A) / sum over all partitions of P(Ai)P(B\|Ai), which gives the posterior probability of a class given ob… | formula | tagged | Bayes Theorem: “$$= \frac{P(E \mid H)\,P(H)}{\displaystyle\sum_{i} P(E \mid H_i)\,P(H_i)}$$” |
| The law of total probability: the unconditional probability of an event equals the sum over a partition of classes of the class probability… | fact | tagged | The Law of Total Probability: “$$P(B) = \sum_{i=1}^{n} P(B \mid A_i)\,P(A_i)$$” |
| For a population split into risk classes with given proportions, use the class proportions as prior probabilities and the class-specific cl… | procedure | elsewhere | Posterior Distribution (collapsed): “The posterior probabilities are $0.12281/0.20513 = 0.5987$ (good) and $0.08232/0.20513 = 0.4013$ (b…” |

</details>

<details><summary><code>p-456</code> · gap</summary>

Tagged pages: Hypergeometric Distribution, Combinatorics

| Item | Kind | Status | Where |
|---|---|---|---|
| When sampling without replacement from a finite population split into two types, the number of items of one type in the sample follows a hy… | fact | tagged | Hypergeometric Distribution: “The **Hypergeometric Distribution** models the number of successes in a sample of size $n$ drawn **…” |
| For a sample of n drawn without replacement from N items of which K are of the type of interest, P(X = k) = C(K,k)·C(N−K,n−k) / C(N,n). | formula | tagged | Hypergeometric Distribution: “$$P(X = k) = \frac{\dbinom{K}{k}\dbinom{N-K}{n-k}}{\dbinom{N}{n}}$$” |
| When only one category matters, combine all other categories into a single 'other' group to reduce a multi-category problem to a two-catego… | procedure | missing |  |
| The binomial coefficient C(n,k) = n!/(k!(n−k)!) counts the number of ways to choose k items from n without regard to order. | definition | linked | Combination: “A **Combination** $\binom{n}{k}$ ("$n$ choose $k$") counts the number of ways to select $k$ objects…” |

</details>

<details><summary><code>p-457</code> · untagged</summary>

Tagged pages: Conditional Probability Function, Poisson Distribution, The Law of Total Probability, Conditional Probability

| Item | Kind | Status | Where |
|---|---|---|---|
| The law of total probability: P(A) equals the sum over a partition of events B_i of P(A \| B_i) P(B_i), so an unconditional probability can… | fact | tagged | The Law of Total Probability: “$$P(B) = \sum_{i=1}^{n} P(B \mid A_i)\,P(A_i)$$” |
| For a Poisson random variable with mean λ, P(N = n) = e^{-λ} λ^n / n!, so P(N = 0) = e^{-λ}. | formula | tagged | Poisson Distribution: “$$P(X = k) = \frac{e^{-\lambda}\lambda^k}{k!}$$” |
| The probability of at least one event equals one minus the probability of none (complement rule). | fact | elsewhere | Probability Rules: “The complement rule is the workhorse shortcut — "at least one" is almost always faster as $1 - P(\t…” |
| When the distribution of a count depends on a discrete conditioning variable (including a case with zero counts for one value), find the co… | procedure | tagged | The Law of Total Probability (collapsed): “$$P(C) = (0.20)(0.30) + (0.10)(0.50) + (0.15)(0.20)$$” |

</details>

<details><summary><code>p-458</code> · gap</summary>

Tagged pages: Linear Combinations of Random Variables, Variance and Standard Deviation, Independent Random Variables

| Item | Kind | Status | Where |
|---|---|---|---|
| For a linear combination aX + bY, Var(aX + bY) = a^2 Var(X) + b^2 Var(Y) + 2ab Cov(X, Y); constants are squared when pulled out of a varian… | formula | tagged | Linear Combinations of Random Variables: “$$\text{Var}(L) = \sum_{i=1}^{n} c_i^2\,\text{Var}(X_i) + 2\sum_{i < j} c_i c_j\,\text{Cov}(X_i, X_…” |
| If two random variables are independent, their covariance is zero, so the variance of their sum is the sum of their variances. | fact | tagged | Independent Random Variables: “Independence implies [[Covariance]] is zero ($\text{Cov}(X,Y) = 0$), though the converse is not alw…” |
| To minimize a variance that is a function of an allocation variable, express the total as a function of one variable (using the budget cons… | procedure | missing |  |
| A positive second derivative at a critical point confirms it is a minimum (an upward-opening quadratic has its minimum at its vertex). | fact | missing |  |
| The expected value of a linear combination is the same linear combination of expected values, so equal expected payoffs make the expected t… | fact | tagged | Linear Combinations of Random Variables: “$$E[L] = \sum_{i=1}^{n} c_i\,E[X_i]$$” |

</details>

<details><summary><code>p-459</code> · untagged</summary>

Tagged pages: Central Limit Theorem, Poisson Distribution, Normal Distribution

| Item | Kind | Status | Where |
|---|---|---|---|
| A Poisson random variable has variance equal to its mean. | fact | tagged | Poisson Distribution: “A defining property is $E[X] = \text{Var}(X) = \lambda$ — the mean and variance are equal” |
| By the Central Limit Theorem, the sample mean of n independent identically distributed random variables is approximately normal with mean e… | fact | elsewhere | Sample Mean: “By the [[Central Limit Theorem]], $\bar{X}$ is approximately $N(\mu, \sigma^2/n)$ for large $n$ wha…” |
| To find a probability for a normal random variable, standardize each endpoint by subtracting the mean and dividing by the standard deviatio… | procedure | tagged | Normal Distribution: “Its CDF has no closed form and is evaluated via the standard normal $Z = (X - \mu)/\sigma \sim N(0,…” |
| A continuity correction is applied when approximating a discrete distribution by a normal, and for a sample mean of integer counts it is on… | fact | elsewhere | Normal Approximation: “When $S_n$ is integer-valued — a claim count, a [[Binomial Distribution\\|binomial]], a [[Poisson Di…” |

</details>

<details><summary><code>p-460</code> · gap</summary>

Tagged pages: Conditional Probability, Continuous Univariate Distributions, The Law of Total Probability

| Item | Kind | Status | Where |
|---|---|---|---|
| The cumulative distribution function F(x) gives P[X ≤ x], so the probability that a loss is at most a threshold is found by evaluating F at… | definition | elsewhere | Cumulative Distribution Function (CDF): “The **Cumulative Distribution Function (CDF)** of a random variable $X$ gives the probability that …” |
| A conditional probability is P[A \| B] = P[A ∩ B] / P[B], which restricts the sample space to the conditioning event B. | definition | tagged | Conditional Probability: “$$P(A \mid B) = \frac{P(A \cap B)}{P(B)}, \quad P(B) > 0$$” |
| The joint probability of a claim count and a claim-amount event is the product P[N = n] · P[X ≤ x \| N = n] (multiplication rule). | formula | tagged | The Law of Total Probability: “Every term equals $P(B \mid A_i)\,P(A_i) = P(B \cap A_i)$” |
| The probability of a union of mutually exclusive (disjoint) events is the sum of their probabilities, so the probability of the conditionin… | fact | elsewhere | Mutually Exclusive Events: “The addition rule simplification extends to any finite collection: if $A_1, A_2, \ldots, A_n$ are p…” |
| When the loss distribution depends on the number of claims, compute the conditional probability by evaluating the claim-amount distribution… | procedure | linked | Bayes Theorem: “$$= \frac{P(E \mid H)\,P(H)}{\displaystyle\sum_{i} P(E \mid H_i)\,P(H_i)}$$” |
| The event 'at least one claim' (N > 0) with a maximum of two claims equals the union of the events N = 1 and N = 2, so the claim amount dis… | fact | missing |  |

</details>

<details><summary><code>p-461</code> · untagged</summary>

Tagged pages: Poisson Distribution, Conditional Probability

| Item | Kind | Status | Where |
|---|---|---|---|
| For a Poisson random variable with mean λ, the probability mass function is P[X = k] = e^{-λ} λ^k / k! for k = 0, 1, 2, ...; in particular … | formula | tagged | Poisson Distribution: “$$P(X = k) = \frac{e^{-\lambda}\lambda^k}{k!}$$” |
| The conditional probability of A given B is P[A \| B] = P[A ∩ B] / P[B]. | formula | tagged | Conditional Probability: “$$P(A \mid B) = \frac{P(A \cap B)}{P(B)}, \quad P(B) > 0$$” |
| If event A is a subset of event B, then P[A ∩ B] = P[A], so P[A \| B] = P[A] / P[B]. | fact | tagged | Conditional Probability (collapsed): “Since $A \subseteq B$, we have $A \cap B = A$.” |
| The probability of an event equals one minus the probability of its complement, so P[X ≥ k] = 1 − P[X ≤ k−1] for a nonnegative integer-valu… | fact | elsewhere | Probability Rules: “$$P(A^c) = 1 - P(A)$$” |

</details>

<details><summary><code>p-462</code> · answerable</summary>

Tagged pages: Geometric Distribution, Conditional Probability, Discrete Univariate Distributions

| Item | Kind | Status | Where |
|---|---|---|---|
| The number of independent Bernoulli trials needed to obtain the first success is a geometric random variable on 1, 2, 3, ... with success p… | fact | tagged | Geometric Distribution: “The **Geometric Distribution** $X \sim \text{Geom}(p)$ counts the number of independent Bernoulli t…” |
| For a geometric random variable X (trials until first success) with success probability p, P[X = k] = p(1-p)^(k-1) for k = 1, 2, ... | formula | tagged | Geometric Distribution: “$$P(X = k) = (1-p)^{k-1}p, \quad k = 1, 2, 3, \ldots$$” |
| For a geometric random variable X (trials until first success), the cumulative probability is P[X ≤ j] = 1 - (1-p)^j, because X > j exactly… | formula | tagged | Geometric Distribution: “The survival function is clean: $P(X > n) = (1-p)^n$ — "the first $n$ trials all failed."” |
| The conditional probability of A given B is P[A \| B] = P[A ∩ B] / P[B]. | formula | tagged | Conditional Probability: “$$P(A \mid B) = \frac{P(A \cap B)}{P(B)}, \quad P(B) > 0$$” |
| If event A is a subset of event B, then A ∩ B = A, so P[A \| B] = P[A] / P[B]. | fact | tagged | Conditional Probability (collapsed): “Since $A \subseteq B$, we have $A \cap B = A$.” |

</details>

<details><summary><code>p-463</code> · gap</summary>

Tagged pages: Poisson Distribution, Discrete Univariate Distributions

| Item | Kind | Status | Where |
|---|---|---|---|
| For a Poisson random variable with mean lambda, P[X = k] = e^{-lambda} lambda^k / k!, so P[X = 0] = e^{-lambda} and P[X = 1] = lambda e^{-l… | formula | tagged | Poisson Distribution: “$$P(X = k) = \frac{e^{-\lambda}\lambda^k}{k!}$$” |
| The probability of at least one event equals one minus the probability of zero events (complement rule), so a given P[X >= 1] determines P[… | fact | tagged | Discrete Univariate Distributions: “For "at least one", reach for the complement $1 - P(X=0)$ rather than summing the tail.” |
| To recover the Poisson mean from P[X = 0], set e^{-lambda} equal to that probability and solve lambda = -ln(P[X = 0]). | procedure | missing |  |
| To find P[X >= 2] for a count variable, subtract the probabilities of the smaller counts from 1: P[X >= 2] = 1 - P[X=0] - P[X=1]. | procedure | missing |  |

</details>

<details><summary><code>p-464</code> · gap</summary>

Tagged pages: Uniform Continuous Distribution, Percentile, Variance and Standard Deviation

| Item | Kind | Status | Where |
|---|---|---|---|
| A uniform distribution on an interval of length L has variance L^2/12, so its standard deviation is L/sqrt(12). | formula | tagged | Uniform Continuous Distribution: “$E[X] = (a+b)/2$, $\text{Var}(X) = (b-a)^2/12$, and $F(x) = (x-a)/(b-a)$ for $a < x < b$” |
| The p-th percentile of a random variable is the value x at which the cumulative distribution function equals p. | definition | tagged | Percentile: “When $F$ is continuous and strictly increasing, it is the value that solves $F(x_p) = p$, found by …” |
| For a uniform distribution on [a, b], the p-th percentile is a + p(b - a), so the 75th and 25th percentiles are separated by half the inter… | procedure | tagged | Uniform Continuous Distribution: “$E[X] = (a+b)/2$, $\text{Var}(X) = (b-a)^2/12$, and $F(x) = (x-a)/(b-a)$ for $a < x < b$” |
| The interquartile range is the difference between the 75th and 25th percentiles. | definition | missing |  |
| Shifting a random variable leaves its standard deviation and interquartile range unchanged, and scaling it multiplies both by the same fact… | fact | tagged | Variance and Standard Deviation: “$\text{Var}(aX + b) = a^2\,\text{Var}(X)$ and $\text{SD}(aX + b) = \\|a\\|\,\text{SD}(X)$ — a shift $…” |

</details>

<details><summary><code>p-465</code> · gap</summary>

Tagged pages: Exponential Distribution, Deductible, Conditional Probability

| Item | Kind | Status | Where |
|---|---|---|---|
| For an exponential distribution, the standard deviation equals the mean. | fact | tagged | Exponential Distribution: “$E[X] = \theta$, $\text{Var}(X) = \theta^2$, and $F(x) = 1 - e^{-x/\theta}$” |
| For an exponential distribution with mean θ, the survival function is P[X > x] = e^{-x/θ}. | formula | tagged | Exponential Distribution: “Work from the survival function $S(x) = e^{-x/\theta}$ rather than the CDF; almost every exponentia…” |
| The probability that a loss exceeds the deductible d by at least some amount y is P[X > d + y], which is evaluated with the survival functi… | procedure | missing |  |
| The exponential distribution is memoryless: P[X > d + y \| X > d] = P[X > y], so the survival probability beyond the deductible depends onl… | fact | tagged | Exponential Distribution: “Its defining property is **memorylessness**: $P(X > s + t \mid X > s) = P(X > t)$, making it the un…” |

</details>

<details><summary><code>p-466</code> · gap</summary>

Tagged pages: Covariance and Correlation Coefficient, Binomial Distribution, Joint Probability Function

| Item | Kind | Status | Where |
|---|---|---|---|
| A Bernoulli random variable (indicator) takes only the values 0 and 1, with P(X=1)=p and mean p. | definition | missing |  |
| The variance of a Bernoulli random variable with success probability p is p(1-p), so its standard deviation is sqrt(p(1-p)). | formula | missing |  |
| The correlation of X and Y is rho = Cov(X,Y)/(sigma_X sigma_Y), where Cov(X,Y) = E[XY] - E[X]E[Y]. | formula | tagged | Covariance and Correlation Coefficient: “$$\text{Cov}(X, Y) = E[XY] - E[X]\,E[Y]$$” |
| For two indicator variables, the product XY is itself an indicator equal to 1 only when both events occur, so E[XY] = P(X=1, Y=1), the join… | fact | missing |  |
| To find a joint probability from a given correlation, substitute the means and standard deviations into the correlation formula and solve f… | procedure | tagged | Covariance and Correlation Coefficient: “$$\text{Cov}(X, Y) = E[XY] - E[X]\,E[Y]$$…$$\rho_{X,Y} = \frac{\text{Cov}(X, Y)}{\sigma_X \, \sigma…” |

</details>

<details><summary><code>p-467</code> · gap</summary>

Tagged pages: Moments for Joint Distributions, Joint Probability Function, Expected Value

| Item | Kind | Status | Where |
|---|---|---|---|
| For a function g of discrete random variables X and Y, E[g(X,Y)] equals the sum over all (x,y) cells of g(x,y) times the joint probability … | formula | tagged | Moments for Joint Distributions: “$$E[g(X,Y)] = \sum_x \sum_y g(x,y)\,p(x,y)$$” |
| A joint probability function p(x,y) gives the probability that X=x and Y=y simultaneously, and its values over all cells in the support mus… | definition | tagged | Joint Probability Function: “It satisfies $p(x,y) \geq 0$ for all $(x,y)$ and $\displaystyle\sum_x \sum_y p(x,y) = 1$” |
| To compute a joint expectation from a formula for p(x,y), evaluate the formula at every point in the support to build a table of cell proba… | procedure | missing |  |
| In general the expectation of a ratio is not the ratio of expectations, so E[Y/X] must be computed directly from the joint distribution rat… | fact | missing |  |

</details>

<details><summary><code>p-468</code> · gap</summary>

Tagged pages: Bayes Theorem, Conditional Probability, The Law of Total Probability

| Item | Kind | Status | Where |
|---|---|---|---|
| The conditional probability of event A given event B is P[A\|B] = P[A ∩ B] / P[B]. | definition | tagged | Conditional Probability: “$$P(A \mid B) = \frac{P(A \cap B)}{P(B)}, \quad P(B) > 0$$” |
| The law of total probability expresses P[A] as the sum over a partition of classes of P[A \| class] times P[class]. | formula | tagged | The Law of Total Probability: “$$P(B) = \sum_{i=1}^{n} P(B \mid A_i)\,P(A_i)$$” |
| If events are independent given a class, the joint probability of both events within that class is the product of their conditional probabi… | fact | missing |  |
| Events that are independent conditional on a risk class are generally not unconditionally independent, because observing one event updates … | fact | missing |  |

</details>

<details><summary><code>p-469</code> · answerable</summary>

Tagged pages: Uniform Continuous Distribution, Percentile, Variance and Standard Deviation

| Item | Kind | Status | Where |
|---|---|---|---|
| The mean of a uniform distribution on [a,b] is the midpoint (a+b)/2. | fact | tagged | Uniform Continuous Distribution: “$E[X] = (a+b)/2$, $\text{Var}(X) = (b-a)^2/12$, and $F(x) = (x-a)/(b-a)$ for $a < x < b$” |
| For a uniform distribution on [a,b], the p-th percentile is a + p(b-a), i.e. it lies fraction p of the way along the interval. | fact | tagged | Uniform Continuous Distribution: “$E[X] = (a+b)/2$, $\text{Var}(X) = (b-a)^2/12$, and $F(x) = (x-a)/(b-a)$ for $a < x < b$” |
| The variance of a uniform distribution on [a,b] is (b-a)^2/12. | formula | tagged | Uniform Continuous Distribution: “$E[X] = (a+b)/2$, $\text{Var}(X) = (b-a)^2/12$, and $F(x) = (x-a)/(b-a)$ for $a < x < b$” |
| The p-th percentile of a random variable is the value x at which the CDF equals p (the point below which fraction p of the probability lies… | definition | tagged | Percentile: “When $F$ is continuous and strictly increasing, it is the value that solves $F(x_p) = p$, found by …” |

</details>

<details><summary><code>p-470</code> · gap</summary>

Tagged pages: Geometric Distribution, Variance and Standard Deviation, Conditional Probability

| Item | Kind | Status | Where |
|---|---|---|---|
| A geometric distribution counting the number of failures before the first success has probability function p(x) = p(1-p)^x for x = 0, 1, 2,… | definition | tagged | Geometric Distribution: “The other counts *failures before the first success*, $Y = X - 1 \in \{0,1,2,\ldots\}$, with $P(Y=k…” |
| For a geometric distribution (failures before first success) with success probability p, the variance is (1-p)/p^2. | formula | tagged | Geometric Distribution: “The variance $\,(1-p)/p^2$ is the same for both.” |
| The conditional probability function of X given an event A is P(X=x)/P(A) for x in A, so the conditional distribution is the original proba… | definition | elsewhere | Conditional Probability Function: “$$P(X = x \mid Y = y) = \frac{P(X = x, Y = y)}{P(Y = y)}$$” |
| Compute the probability of a tail event for a discrete variable as the complement: P(X > k) = 1 minus the sum of P(X = x) for x = 0 through… | procedure | missing |  |
| The geometric distribution is memoryless: conditional on X > k, X - (k+1) has the same geometric distribution as X, so the conditional dist… | fact | tagged | Geometric Distribution: “$P(X > m+n \mid X > m) = P(X > n)$” |
| Adding a constant to a random variable shifts its mean by that constant but leaves its variance unchanged. | fact | tagged | Variance and Standard Deviation: “$\text{Var}(aX + b) = a^2\,\text{Var}(X)$ and $\text{SD}(aX + b) = \\|a\\|\,\text{SD}(X)$ — a shift $…” |

</details>

<details><summary><code>p-471</code> · untagged</summary>

Tagged pages: Conditional and Marginal Probability Functions, Joint Probability Function, Variance and Standard Deviation

| Item | Kind | Status | Where |
|---|---|---|---|
| The marginal probability function of one variable in a discrete joint distribution is obtained by summing the joint probability function ov… | definition | tagged | Conditional and Marginal Probability Functions: “The marginal is found by summing (or integrating, in the continuous case) the [[Joint Probability F…” |
| The expected value of a discrete random variable is E[X] = sum of x times p(x), and E[g(X)] = sum of g(x) times p(x), so E[X^2] = sum of x^… | formula | elsewhere | Discrete Random Variable: “Expectations are sums: $E[g(X)] = \sum_x g(x)\,p(x)$.” |
| The variance of a random variable equals Var(X) = E[X^2] - (E[X])^2. | formula | tagged | Variance and Standard Deviation: “The second form $E[X^2] - \mu^2$ is the one to use in practice — it needs only two moments and avoi…” |
| A valid probability function sums to 1 over its whole support, which can be used to check the marginal probabilities or the normalizing con… | fact | tagged | Joint Probability Function: “It satisfies $p(x,y) \geq 0$ for all $(x,y)$ and $\displaystyle\sum_x \sum_y p(x,y) = 1$” |

</details>

<details><summary><code>p-472</code> · gap</summary>

Tagged pages: Binomial Distribution, Discrete Univariate Distributions, Combinatorics

| Item | Kind | Status | Where |
|---|---|---|---|
| The number of successes in n independent trials, each with the same success probability p, follows a binomial distribution. | fact | tagged | Binomial Distribution: “The **Binomial Distribution** $X \sim \text{Bin}(n, p)$ models the number of successes in $n$ indep…” |
| For a binomial distribution with n trials and success probability p, P(X = k) = C(n,k) p^k (1-p)^(n-k). | formula | tagged | Binomial Distribution: “$$P(X = k) = \binom{n}{k} p^k (1-p)^{n-k}$$” |
| The binomial coefficient is C(n,k) = n!/(k!(n-k)!), so the ratio C(n,k+1)/C(n,k) = (n-k)/(k+1). | formula | linked | Combination: “$$\binom{n}{k} = \frac{n!}{k!\,(n-k)!}$$” |
| To solve for an unknown parameter when one probability is a multiple of another, divide the two probability expressions so common factors c… | procedure | missing |  |

</details>

<details><summary><code>p-473</code> · gap</summary>

Tagged pages: Deductible, Payment Random Variable, Uniform Continuous Distribution

| Item | Kind | Status | Where |
|---|---|---|---|
| With a fixed ordinary deductible d, the claim payment per loss is Y = max(0, X - d), which is zero when the loss is at or below d. | definition | tagged | Deductible: “If the loss $X$ is less than or equal to the deductible $d$, the insurer pays nothing; above $d$ it…” |
| A payment variable that equals 0 with positive probability and is continuous otherwise is a mixed random variable, with a point mass at zer… | fact | tagged | Payment Random Variable: “$Y$ has a mixed distribution: a probability mass at $Y = 0$ (when $X \leq d$) and a continuous or d…” |
| For X uniform on [0, 1], P(X <= d) = d, and conditional on X > d the excess X - d is uniform on [0, 1-d]. | fact | tagged | Uniform Continuous Distribution: “Conditional distributions on sub-intervals are also uniform: given $X > d$, $X$ is uniform on $(d, …” |
| For a uniform random variable on [0, a], the mean is a/2 and the second moment is a^2/3. | formula | missing |  |
| For a mixed random variable, compute E[Y] and E[Y^2] by the law of total expectation, weighting each component's conditional moment by its … | procedure | elsewhere | Mixture Distribution: “Any quantity that is *linear* in the density — a probability, a mean, a second moment — can be foun…” |
| Variance equals the second moment minus the square of the mean: Var(Y) = E[Y^2] - (E[Y])^2. | formula | elsewhere | Variance: “Efficient computation formula: $\text{Var}(X) = E[X^2] - \mu^2$ where $\mu = E[X]$” |

</details>

<details><summary><code>p-474</code> · gap</summary>

Tagged pages: Linear Combinations of Random Variables, Exponential Distribution, Variance and Standard Deviation

| Item | Kind | Status | Where |
|---|---|---|---|
| The variance of an exponential random variable equals the square of its mean. | fact | tagged | Exponential Distribution: “$E[X] = \theta$, $\text{Var}(X) = \theta^2$, and $F(x) = 1 - e^{-x/\theta}$” |
| For independent random variables, the variance of their sum equals the sum of their variances. | fact | linked | Independent Random Variables: “For independent random variables: $E[XY] = E[X]\,E[Y]$ and $\text{Var}(X + Y) = \text{Var}(X) + \te…” |
| Express the time until the second event as the sum of the time to the first event and the waiting time between the first and second events,… | procedure | tagged | Exponential Distribution: “$E[X] = \theta$, $\text{Var}(X) = \theta^2$, and $F(x) = 1 - e^{-x/\theta}$” |
| The sum of independent exponentials with different means is not gamma distributed; gamma applies only when the exponentials are identically… | fact | missing |  |

</details>

<details><summary><code>p-475</code> · untagged</summary>

Tagged pages: Discrete Univariate Distributions, Expected Value

| Item | Kind | Status | Where |
|---|---|---|---|
| The survival function S(x) = P[X ≥ x] (or P[X > x]) gives the probability that a random variable is at least (or exceeds) x, and is distinc… | definition | elsewhere | Future Lifetime Random Variable: “${}_tp_x = \Pr(T_x > t) = S_x(t)$$” |
| To convert a discrete survival function into point probabilities, take successive differences p(x) = P[X ≥ x] − P[X ≥ x+1], with the top va… | procedure | elsewhere | Future Lifetime Random Variable (collapsed): “The survival probabilities are $p_{97} = 0.7$, ${}_2p_{97} = 0.7(0.5) = 0.35$ and ${}_3p_{97} = 0$.…” |
| The probabilities of all possible values of a discrete random variable sum to 1, so the probability of X = 0 equals 1 − P[X ≥ 1] for a non-… | fact | elsewhere | Probability Mass Function (PMF): “It must satisfy $p(x) \geq 0$ for all $x$ and $\sum_{\text{all } x} p(x) = 1$” |
| The expected value of a discrete random variable is E(X) = Σ x·p(x), the sum of each value times its probability. | formula | tagged | Expected Value: “E[X] = \begin{cases} \displaystyle\sum_{k} k\, f(k) & \text{(discrete)} \\[6pt] \displaystyle\int_{…” |
| For a non-negative integer-valued random variable, E[X] = Σ_{x≥1} P[X ≥ x], the sum of the survival probabilities. | formula | elsewhere | Future Lifetime Random Variable: “$$e_x = E[K_x] = \sum_{k=1}^{\infty} {}_kp_x$$” |

</details>

<details><summary><code>p-476</code> · gap</summary>

Tagged pages: Conditional Probability Function, Joint Probability Function, Conditional and Marginal Probability Functions, Conditional Probability

| Item | Kind | Status | Where |
|---|---|---|---|
| The conditional probability of A given B is P[A \| B] = P[A ∩ B] / P[B], defined when P[B] > 0. | formula | tagged | Conditional Probability: “$$P(A \mid B) = \frac{P(A \cap B)}{P(B)}, \quad P(B) > 0$$” |
| To find the probability of an event defined on one variable of a joint distribution table, sum the joint probabilities over all cells (rows… | procedure | linked | Marginal Probability Function: “The **marginal probability function** of $X$ is obtained from the [[Joint Probability Function]] $p…” |
| The probability of the intersection of two events defined on different variables of a joint table is the sum of the joint probabilities of … | procedure | missing |  |
| Inequality phrases such as 'at least k' mean values ≥ k and 'no more than k' mean values ≤ k, which determine which rows or columns of the … | definition | missing |  |

</details>

<details><summary><code>p-477</code> · untagged</summary>

Tagged pages: Continuous Univariate Distributions, Conditional Probability

| Item | Kind | Status | Where |
|---|---|---|---|
| The conditional probability of event A given event B is P[A \| B] = P[A and B] / P[B]. | formula | tagged | Conditional Probability: “$$P(A \mid B) = \frac{P(A \cap B)}{P(B)}, \quad P(B) > 0$$” |
| For a continuous random variable, the probability of an interval is the integral of the density function over that interval. | fact | tagged | Continuous Univariate Distributions: “$$P(a \leq X \leq b) = \int_a^b f(x)\, dx$$” |
| Rewrite a conditional event such as 'replaced within 10 years given not replaced within 5 years' as P[T ≤ 10 \| T ≥ 5] = P[5 ≤ T ≤ 10] / P[… | procedure | tagged | Conditional Probability (collapsed): “Let $A = \{X > 700\}$ and $B = \{X > 400\}$. Since $A \subseteq B$, we have $A \cap B = A$.” |
| A constant factor in a density that is common to the numerator and denominator of a conditional probability cancels, so the normalizing con… | fact | tagged | Conditional Probability (collapsed): “$$P(A \mid B) = \frac{P(X > 700)}{P(X > 400)} = \frac{300/1000}{600/1000} = \frac{300}{600} = 0.5$$” |
| The probability that a continuous random variable takes any single value is zero, so P[T ≥ 5] and P[T > 5] (and ≤ vs <) are equal. | fact | elsewhere | Continuous Random Variable: “$P(X = c) = 0$ for every $c$, so $P(a < X < b) = P(a \le X \le b) = F(b) - F(a)$. Strict and weak i…” |

</details>

<details><summary><code>p-478</code> · answerable</summary>

Tagged pages: Linear Combinations of Random Variables, Variance and Standard Deviation, Independent Random Variables

| Item | Kind | Status | Where |
|---|---|---|---|
| The variance of a sum of independent random variables equals the sum of their variances, whereas standard deviations do not add. | fact | tagged | Variance and Standard Deviation: “Standard deviations do **not** add: $\text{SD}(X+Y) \neq \text{SD}(X) + \text{SD}(Y)$. Always add v…” |
| The standard deviation of a random variable is the positive square root of its variance, so variance equals the squared standard deviation. | definition | tagged | Variance and Standard Deviation: “$$\sigma = \text{SD}(X) = \sqrt{\text{Var}(X)}$$” |
| To find the standard deviation of a sum of independent random variables, square each standard deviation, add the variances, then take the s… | procedure | tagged | Variance and Standard Deviation (collapsed): “Add the **variances**, not the standard deviations:” |

</details>

<details><summary><code>p-479</code> · answerable</summary>

Tagged pages: Uniform Continuous Distribution, Variance and Standard Deviation

| Item | Kind | Status | Where |
|---|---|---|---|
| A uniform distribution on an interval [a, b] has variance (b - a)^2/12, so its standard deviation is (b - a)/sqrt(12). | formula | tagged | Uniform Continuous Distribution: “$E[X] = (a+b)/2$, $\text{Var}(X) = (b-a)^2/12$, and $F(x) = (x-a)/(b-a)$ for $a < x < b$” |
| The standard deviation of a random variable is the positive square root of its variance. | definition | tagged | Variance and Standard Deviation: “$$\sigma = \text{SD}(X) = \sqrt{\text{Var}(X)}$$” |

</details>

<details><summary><code>p-480</code> · untagged</summary>

Tagged pages: Linear Combinations of Random Variables, Variance and Standard Deviation, Independent Random Variables

| Item | Kind | Status | Where |
|---|---|---|---|
| The expected value of a discrete random variable is the sum of each value times its probability, and E[X^2] is the sum of each squared valu… | formula | elsewhere | Discrete Random Variable: “Expectations are sums: $E[g(X)] = \sum_x g(x)\,p(x)$.” |
| The variance of a random variable equals E[X^2] minus the square of E[X]. | formula | tagged | Variance and Standard Deviation: “$$= E[X^2] - \mu^2$$” |
| The variance of a sum of independent random variables equals the sum of their variances. | fact | tagged | Independent Random Variables: “For independent random variables: $E[XY] = E[X]\,E[Y]$ and $\text{Var}(X + Y) = \text{Var}(X) + \te…” |
| For a total over n independent identically distributed items, compute the variance of one item and multiply by n to get the variance of the… | procedure | linked | Central Limit Theorem: “For large $n$, $S_n$ is approximately $N(n\mu,\, n\sigma^2)$ regardless of the original distribution” |

</details>

<details><summary><code>p-481</code> · answerable</summary>

Tagged pages: Expected Value, Uniform Discrete, Discrete Univariate Distributions

| Item | Kind | Status | Where |
|---|---|---|---|
| Expectation is linear: E[aX + bY + c] = aE[X] + bE[Y] + c, so the expected value of a sum of terms is the sum of their expected values and … | fact | tagged | Expected Value: “It is linear: $E[aX + b] = aE[X] + b$” |
| For a discrete random variable, E[g(X)] = sum over x of g(x)·P(X = x), so E[X^2] is the probability-weighted sum of squared values. | formula | linked | Moment: “For a discrete variable the integral becomes $\sum_x x^n\,p(x)$.” |
| A discrete uniform distribution on n values assigns probability 1/n to each value. | definition | tagged | Uniform Discrete: “$$P(X = k) = \frac{1}{n}, \quad k = 1, 2, \ldots, n$$” |
| In general E[g(X)] does not equal g(E[X]); for a convex g, E[g(X)] ≥ g(E[X]) (Jensen's inequality), and for g(x)=x^2 the gap equals Var(X). | fact | linked | Moment: “The second central moment is the [[Variance]], $\mu_2 = E[X^2] - \mu^2$.” |

</details>

<details><summary><code>p-482</code> · answerable</summary>

Tagged pages: Uniform Continuous Distribution, Variance and Standard Deviation, Expected Value

| Item | Kind | Status | Where |
|---|---|---|---|
| For a continuous uniform distribution on [a, b], the mean equals the midpoint (a+b)/2. | fact | tagged | Uniform Continuous Distribution: “$E[X] = (a+b)/2$, $\text{Var}(X) = (b-a)^2/12$, and $F(x) = (x-a)/(b-a)$ for $a < x < b$” |
| For a continuous uniform distribution on [a, b], the variance is (b-a)^2/12, so the standard deviation is (b-a)/sqrt(12). | formula | tagged | Uniform Continuous Distribution: “$E[X] = (a+b)/2$, $\text{Var}(X) = (b-a)^2/12$, and $F(x) = (x-a)/(b-a)$ for $a < x < b$” |
| The smallest possible value of a continuous uniform random variable on [a, b] is its lower endpoint a, which equals the mean minus half the… | fact | tagged | Uniform Continuous Distribution: “$X \sim \text{Unif}(a, b)$ assigns equal probability density to every point in the interval $(a, b)$” |

</details>

<details><summary><code>p-483</code> · untagged</summary>

Tagged pages: Binomial Distribution, Independent Events, Variance and Standard Deviation

| Item | Kind | Status | Where |
|---|---|---|---|
| The number of successes in n independent trials, each with the same success probability p, follows a binomial distribution. | fact | tagged | Binomial Distribution: “The **Binomial Distribution** $X \sim \text{Bin}(n, p)$ models the number of successes in $n$ indep…” |
| A binomial random variable with parameters n and p has variance n p (1 - p). | formula | tagged | Binomial Distribution: “$E[X] = np$ and $\text{Var}(X) = np(1-p)$” |
| If two events are independent, the probability that both occur is the product of their individual probabilities, so the probability that ne… | fact | tagged | Independent Events: “$$P(A \cap B) = P(A) \cdot P(B)$$” |
| The probability of at least one of several events occurring equals 1 minus the probability that none of them occur (complement rule). | fact | elsewhere | Probability Rules: “The complement rule is the workhorse shortcut — "at least one" is almost always faster as $1 - P(\t…” |
| The variance of a sum of independent random variables is the sum of their variances, but this additivity does not apply to indicator events… | fact | tagged | Variance and Standard Deviation: “For a sum, $\text{Var}(X + Y) = \text{Var}(X) + \text{Var}(Y) + 2\,\text{Cov}(X,Y)$; the [[Covarian…” |

</details>

<details><summary><code>p-484</code> · gap</summary>

Tagged pages: Uniform Continuous Distribution, Percentile

| Item | Kind | Status | Where |
|---|---|---|---|
| For a uniform distribution on [a, b], the 100q-th percentile equals (1-q)a + qb, i.e., a fraction q of the way from a to b. | formula | tagged | Uniform Continuous Distribution: “$F(x) = (x-a)/(b-a)$ for $a < x < b$” |
| The median of a uniform distribution on [a, b] is the midpoint (a+b)/2, because the uniform distribution is symmetric (equivalently, the 50… | fact | tagged | Uniform Continuous Distribution: “$E[X] = (a+b)/2$, $\text{Var}(X) = (b-a)^2/12$, and $F(x) = (x-a)/(b-a)$ for $a < x < b$” |
| The 100p-th percentile of a distribution is the value below which a proportion p of the distribution's probability lies (the point where th… | definition | tagged | Percentile: “When $F$ is continuous and strictly increasing, it is the value that solves $F(x_p) = p$, found by …” |
| To find an unknown distribution parameter from a condition equating percentiles of two distributions, compute each percentile as a function… | procedure | missing |  |

</details>

<details><summary><code>p-485</code> · gap</summary>

Tagged pages: Percentile, Uniform Continuous Distribution

| Item | Kind | Status | Where |
|---|---|---|---|
| The 100q-th percentile of a distribution is the value x at which the CDF equals q, i.e. F(x) = q. | definition | tagged | Percentile: “When $F$ is continuous and strictly increasing, it is the value that solves $F(x_p) = p$, found by …” |
| For a uniform distribution on [a, b], the CDF is F(x) = (x - a)/(b - a) on the interval, so the 100q-th percentile is a + q(b - a). | formula | tagged | Uniform Continuous Distribution: “$F(x) = (x-a)/(b-a)$ for $a < x < b$” |
| To solve for an unknown percentile level from an equal-ratio condition x/y = y/z, cross-multiply to get y^2 = xz (y is the geometric mean o… | procedure | missing |  |

</details>

<details><summary><code>p-486</code> · untagged</summary>

Tagged pages: Binomial Distribution, Independent Events

| Item | Kind | Status | Where |
|---|---|---|---|
| The number of successes in n independent trials, each with the same success probability p, follows a binomial distribution with parameters … | fact | tagged | Binomial Distribution: “The **Binomial Distribution** $X \sim \text{Bin}(n, p)$ models the number of successes in $n$ indep…” |
| For a binomial random variable with parameters n and p, P[N = k] = C(n,k) p^k (1-p)^(n-k); in particular P[N = 0] = (1-p)^n. | formula | tagged | Binomial Distribution: “$$P(X = k) = \binom{n}{k} p^k (1-p)^{n-k}$$” |
| Compute the probability of 'at least one' event by the complement rule: P(at least one) = 1 - P(none). | procedure | elsewhere | Probability Rules: “The complement rule is the workhorse shortcut — "at least one" is almost always faster as $1 - P(\t…” |
| For independent events, the probability that all occur (or all fail to occur) is the product of the individual probabilities. | fact | tagged | Independent Events: “$$P(A_{i_1} \cap A_{i_2} \cap \cdots \cap A_{i_m}) = P(A_{i_1})\,P(A_{i_2}) \cdots P(A_{i_m})$$” |
| Adding the individual event probabilities overstates the probability of a union of non-mutually-exclusive events, since it double counts ov… | fact | elsewhere | Probability Addition Rule: “The **Probability Addition Rule** gives the probability that at least one of two events $A$ or $B$ …” |

</details>

<details><summary><code>p-487</code> · gap</summary>

Tagged pages: Conditional Probability, Set Theory

| Item | Kind | Status | Where |
|---|---|---|---|
| The conditional probability of A given B is P(A\|B) = P(A ∩ B) / P(B). | definition | tagged | Conditional Probability: “$$P(A \mid B) = \frac{P(A \cap B)}{P(B)}, \quad P(B) > 0$$” |
| The probability of the complement of an event equals one minus the probability of the event. | fact | linked | Set Operations: “the complement $A^c$ means "not $A$"” |
| If event B is a subset of event A, then P(A ∩ B) = P(B) and P(A and not B) = P(A) - P(B). | fact | tagged | Conditional Probability (collapsed): “Since $A \subseteq B$, we have $A \cap B = A$.” |
| In a sequential process where only those who pass one stage proceed to the next, passing a later stage implies passing all earlier stages, … | procedure | missing |  |
| To compute a conditional probability like P(A \| not C), identify the numerator as P(A and not C) by taking the portion of A outside C, and… | procedure | linked | Set Operations (collapsed): “$A^c \cap B$ is the part of $B$ that does not overlap $A$:…$$P(A^c \cap B) = P(B) - P(A \cap B) = 0…” |

</details>

<details><summary><code>p-488</code> · untagged</summary>

Tagged pages: Negative Binomial Distribution, Binomial Distribution, Discrete Univariate Distributions

| Item | Kind | Status | Where |
|---|---|---|---|
| The negative binomial distribution gives the probability that the r-th success occurs on trial n in a sequence of independent Bernoulli tri… | definition | tagged | Negative Binomial Distribution: “counts the number of independent Bernoulli trials needed to achieve exactly $r$ successes” |
| The probability that the r-th success occurs on trial n is C(n-1, r-1) p^r (1-p)^(n-r). | formula | tagged | Negative Binomial Distribution: “$$P(X = k) = \binom{k-1}{r-1}p^r(1-p)^{k-r}$$” |
| The probability of exactly k successes in m independent trials with success probability p is C(m,k) p^k (1-p)^(m-k). | formula | tagged | Binomial Distribution: “$$P(X = k) = \binom{n}{k} p^k (1-p)^{n-k}$$” |
| To find the probability that the r-th success occurs on trial n, require exactly r-1 successes in the first n-1 trials and a success on tri… | procedure | tagged | Negative Binomial Distribution: “$$P(X = k) = \binom{k-1}{r-1}p^r(1-p)^{k-r}$$” |
| Outcomes of separate trials in a Bernoulli process are independent, so the probability of a joint outcome across disjoint sets of trials is… | fact | elsewhere | Independent Events: “$$P(A \cap B) = P(A) \cdot P(B)$$” |

</details>

<details><summary><code>p-489</code> · untagged</summary>

Tagged pages: Payment Random Variable, Limited Expected Value, Uniform Continuous Distribution

| Item | Kind | Status | Where |
|---|---|---|---|
| A policy that reimburses the full loss up to a maximum benefit b pays min(X, b): the loss X when X ≤ b and b when X > b. | definition | elsewhere | Policy Limit: “Under a limit $u$ and no other modification, the insurer pays the whole loss $X$ when it is below $…” |
| The expected capped payment is E[min(X,b)] = ∫ x f(x) dx over values up to b plus b times P(X > b), which can be computed by splitting the … | formula | tagged | Limited Expected Value: “$$E[X \wedge u] = \int_0^u [1 - F(x)]\,dx \quad \text{(for non-negative } X\text{)}$$” |
| A continuous uniform distribution on [a, c] has constant density 1/(c − a) on its support and mean (a + c)/2. | fact | tagged | Uniform Continuous Distribution: “$$f(x) = \frac{1}{b - a}, \quad a < x < b$$” |
| A cap b at or above the largest possible loss has no effect, so the expected benefit then equals the uncapped mean; hence a root of the equ… | fact | tagged | Limited Expected Value: “As $u \to \infty$, $E[X \wedge u] \to E[X]$” |

</details>

<details><summary><code>p-490</code> · gap</summary>

Tagged pages: Conditional Probability, Binomial Distribution, Independent Events

| Item | Kind | Status | Where |
|---|---|---|---|
| The conditional probability of event A given event B is P(A and B) divided by P(B), provided P(B) > 0. | definition | tagged | Conditional Probability: “$$P(A \mid B) = \frac{P(A \cap B)}{P(B)}, \quad P(B) > 0$$” |
| The number of successes in n independent trials, each with the same success probability p, follows a binomial distribution with pmf C(n,k) … | fact | tagged | Binomial Distribution: “$$P(X = k) = \binom{n}{k} p^k (1-p)^{n-k}$$” |
| For independent events or random variables, the joint probability equals the product of the individual probabilities. | fact | tagged | Independent Events: “$$P(A \cap B) = P(A) \cdot P(B)$$” |
| To find the probability of a total count across independent groups, enumerate the disjoint ways the group counts can sum to that total, and… | procedure | missing |  |
| To compute a conditional probability given a total count, take the probability of the specific favorable case as the numerator and the prob… | procedure | tagged | Conditional Probability: “$$P(A \mid B) = \frac{P(A \cap B)}{P(B)}, \quad P(B) > 0$$” |

</details>

<details><summary><code>p-491</code> · gap</summary>

Tagged pages: Expected Value, Continuous Univariate Distributions

| Item | Kind | Status | Where |
|---|---|---|---|
| For a continuous random variable, the probability density function is obtained by differentiating the cumulative distribution function on e… | procedure | elsewhere | Continuous Random Variable: “$$f(x) = F'(x)$$” |
| The expected value of a continuous random variable is E(X) = ∫ x f(x) dx over its support, where f is the density. | formula | tagged | Expected Value: “\displaystyle\int_{-\infty}^{\infty} x\, f(x)\, dx & \text{(continuous)}” |
| For a piecewise-defined density, compute the expected value by integrating x f(x) over each piece on its own interval and summing the resul… | procedure | missing |  |
| A valid continuous CDF is continuous at the boundaries between pieces, equals 0 below the support, and reaches 1 at the upper end of the su… | fact | elsewhere | Cumulative Distribution Function (CDF): “$\lim_{x \to -\infty} F(x) = 0$ and $\lim_{x \to \infty} F(x) = 1$” |

</details>

<details><summary><code>p-492</code> · gap</summary>

Tagged pages: Exponential Distribution, Continuous Univariate Distributions

| Item | Kind | Status | Where |
|---|---|---|---|
| An exponential random variable with rate λ has survival function P[X > x] = e^{-λx} for x ≥ 0. | formula | tagged | Exponential Distribution: “Work from the survival function $S(x) = e^{-x/\theta}$ rather than the CDF; almost every exponentia…” |
| The survival function S(x) = P[X > x] is the probability that the random variable exceeds x, and the cumulative distribution function is it… | definition | tagged | Continuous Univariate Distributions: “For anything phrased as a tail probability, work from the survival function $S(x) = 1 - F(x)$ inste…” |
| To find an exponential distribution's parameter from a given survival probability at a point, set e^{-λx} equal to the given probability at… | procedure | missing |  |

</details>

<details><summary><code>p-493</code> · answerable</summary>

Tagged pages: Conditional Probability, Joint Probability Function, Conditional and Marginal Probability Functions

| Item | Kind | Status | Where |
|---|---|---|---|
| A joint probability table gives P(X=x, Y=y) in each cell, and the probability of an event defined on both variables is the sum of the cells… | definition | tagged | Joint Probability Function: “$$p(x,y) = P(X = x,\; Y = y)$$” |
| The conditional probability of A given B is P(A \| B) = P(A and B) / P(B). | formula | tagged | Conditional Probability: “$$P(A \mid B) = \frac{P(A \cap B)}{P(B)}, \quad P(B) > 0$$” |
| To find the probability of an event on one variable from a joint table, sum the joint probabilities over all values of the other variable (… | procedure | tagged | Conditional and Marginal Probability Functions: “Marginals of $X$: $p_X(0) = 0.3 + 0.1 = 0.4$ and $p_X(1) = 0.2 + 0.4 = 0.6$.” |
| Translate verbal inequality conditions such as 'at least k' and 'no more than k' into sets of values (X ≥ k, X ≤ k), and the intersection o… | procedure | tagged | Conditional Probability: “Let $A = \{X > 700\}$ and $B = \{X > 400\}$. Since $A \subseteq B$, we have $A \cap B = A$.” |

</details>

<details><summary><code>p-494</code> · untagged</summary>

Tagged pages: Binomial Distribution, Variance and Standard Deviation

| Item | Kind | Status | Where |
|---|---|---|---|
| The number of successes in a fixed number of independent trials, each with the same success probability, follows a binomial distribution. | fact | tagged | Binomial Distribution: “The **Binomial Distribution** $X \sim \text{Bin}(n, p)$ models the number of successes in $n$ indep…” |
| The mean of a binomial distribution with n trials and success probability p is np. | formula | tagged | Binomial Distribution: “$E[X] = np$ and $\text{Var}(X) = np(1-p)$” |
| The variance of a binomial distribution with n trials and success probability p is np(1-p). | formula | tagged | Binomial Distribution: “$E[X] = np$ and $\text{Var}(X) = np(1-p)$” |
| Given the number of trials and the mean of a binomial random variable, recover the success probability by dividing the mean by the number o… | procedure | elsewhere | Frequency Distribution: “$\hat q = \bar{x}/m$ for the binomial with $m$ known” |

</details>

<details><summary><code>p-495</code> · gap</summary>

Tagged pages: Variance and Standard Deviation, Continuous Univariate Distributions, Expected Value

| Item | Kind | Status | Where |
|---|---|---|---|
| The variance of a random variable equals its second moment minus the square of its mean: Var(X) = E[X^2] - (E[X])^2. | formula | tagged | Variance and Standard Deviation: “$$= E[X^2] - \mu^2$$” |
| For a continuous random variable with density f, the expected value of a function g(X) is E[g(X)] = the integral of g(x) f(x) dx over the s… | formula | linked | Moment: “$$\mu_n' = E[X^n] = \int_{-\infty}^{\infty} x^n f(x)\,dx$$” |
| If a density is symmetric about a point c (and has finite mean), then the mean of the distribution equals c. | fact | missing |  |
| Variance is unchanged by a shift of the variable: Var(X) = Var(X - c), so when the mean is c, Var(X) = E[(X - c)^2], the second moment of t… | fact | tagged | Variance and Standard Deviation: “$\text{Var}(aX + b) = a^2\,\text{Var}(X)$ and $\text{SD}(aX + b) = \\|a\\|\,\text{SD}(X)$ — a shift $…” |
| Compute a moment of a continuous random variable by multiplying the power of x by the density over the support, expanding the polynomial, a… | procedure | linked | Beta (collapsed): “P(X > 0.8) &= \int_{0.8}^{1} 12\left(x^2 - x^3\right) dx” |

</details>

<details><summary><code>p-496</code> · untagged</summary>

Tagged pages: Expected Value, Independent Events, Continuous Univariate Distributions

| Item | Kind | Status | Where |
|---|---|---|---|
| The cumulative distribution function F(x) gives P(X ≤ x), so the probability of failure by a given age is F evaluated at that age. | definition | elsewhere | Cumulative Distribution Function (CDF): “The **Cumulative Distribution Function (CDF)** of a random variable $X$ gives the probability that …” |
| For independent events, the probability that all occur equals the product of their individual probabilities, so the probability that all n … | fact | elsewhere | Independent and Identically Distributed (collapsed): “The maximum is at or below \$5,000 only if all five claims are, and independence with a common $F$ …” |
| To find the probability that at least one of several events occurs, take the complement of the probability that none occurs: P(at least one… | procedure | elsewhere | Independent and Identically Distributed (collapsed): “P(X_{(5)} > 5{,}000) &= 1 - F(5{,}000)^5” |
| The expected value of a payment that is a fixed amount c paid when an event occurs and zero otherwise equals c times the probability of the… | fact | tagged | Expected Value (collapsed): “$$E[X] = 0(0.5) + 100(0.3) + 500(0.2) = 0 + 30 + 100 = 130$$” |

</details>

<details><summary><code>p-497</code> · answerable</summary>

Tagged pages: Order Statistics, Exponential Distribution, Independent Random Variables

| Item | Kind | Status | Where |
|---|---|---|---|
| An exponential distribution with mean θ has density (1/θ)e^{-x/θ} for x>0, and its mean is θ (rate 1/θ). | definition | tagged | Exponential Distribution: “f(x) = \frac{1}{\theta}\,e^{-x/\theta}, \quad x > 0” |
| The exponential distribution with mean θ has CDF F(x) = 1 - e^{-x/θ} and survival function S(x) = e^{-x/θ}. | formula | tagged | Exponential Distribution: “$E[X] = \theta$, $\text{Var}(X) = \theta^2$, and $F(x) = 1 - e^{-x/\theta}$” |
| The distribution of the minimum of n independent random variables is found by noting that min > x exactly when every variable exceeds x, so… | procedure | tagged | Order Statistics: “P\bigl(X_{(1)} > x\bigr) = \bigl[1 - F_1(x)\bigr]\bigl[1 - F_2(x)\bigr]\cdots\bigl[1 - F_n(x)\bigr]” |
| The minimum of n independent exponential random variables is exponential with rate equal to the sum of the individual rates; for n iid expo… | fact | tagged | Order Statistics (collapsed): “The system lifetime is the minimum $X_{(1)}$ of two independent but **not** identically distributed…” |

</details>

<details><summary><code>p-498</code> · untagged</summary>

Tagged pages: Bayes Theorem, The Law of Total Probability, Conditional Probability

| Item | Kind | Status | Where |
|---|---|---|---|
| If events form a partition (mutually exclusive and exhaustive), their probabilities sum to 1, so a missing event's probability is 1 minus t… | fact | elsewhere | Mutually Exclusive Events (collapsed): “The three classes are mutually exclusive and cover every claim, so "other" is the complement of $D …” |
| Conditional probability P[A\|B] = P[A and B] / P[B], and a table of probabilities given a group (each row) gives conditional probabilities,… | definition | elsewhere | Probability Rules: “$$P(A \cap B) = P(A \mid B)\,P(B)$$” |
| The law of total probability: for a partition B1..Bn, P[A] = sum over i of P[A\|Bi]·P[Bi]. | formula | tagged | The Law of Total Probability: “$$P(B) = \sum_{i=1}^{n} P(B \mid A_i)\,P(A_i)$$” |
| Bayes' theorem: P[Bi\|A] = P[A\|Bi]·P[Bi] / sum over j of P[A\|Bj]·P[Bj]. | formula | tagged | Bayes Theorem: “$$= \frac{P(E \mid H)\,P(H)}{\displaystyle\sum_{i} P(E \mid H_i)\,P(H_i)}$$” |

</details>

<details><summary><code>p-499</code> · untagged</summary>

Tagged pages: Poisson Distribution, Conditional Probability

| Item | Kind | Status | Where |
|---|---|---|---|
| The Poisson probability mass function with mean lambda is P[X = k] = e^{-lambda} lambda^k / k! for k = 0, 1, 2, ... | formula | tagged | Poisson Distribution: “$$P(X = k) = \frac{e^{-\lambda}\lambda^k}{k!}$$” |
| The conditional probability of A given B is P[A \| B] = P[A ∩ B] / P[B]. | formula | tagged | Conditional Probability: “$$P(A \mid B) = \frac{P(A \cap B)}{P(B)}, \quad P(B) > 0$$” |
| If event A is a subset of event B, then A ∩ B = A, so P[A \| B] = P[A] / P[B]. | fact | tagged | Conditional Probability (collapsed): “Since $A \subseteq B$, we have $A \cap B = A$.” |
| The complement rule: P[X > n] = 1 - P[X <= n], and P[X >= 1] = 1 - P[X = 0]; for a discrete count variable, tail probabilities are obtained… | fact | elsewhere | Probability Rules: “The complement rule is the workhorse shortcut — "at least one" is almost always faster as $1 - P(\t…” |

</details>

<details><summary><code>p-500</code> · gap</summary>

Tagged pages: Binomial Distribution, Independent Events

| Item | Kind | Status | Where |
|---|---|---|---|
| A binomial setting counts successes in n independent trials, each with the same success probability p, and the count follows a binomial dis… | definition | tagged | Binomial Distribution: “The **Binomial Distribution** $X \sim \text{Bin}(n, p)$ models the number of successes in $n$ indep…” |
| For a binomial distribution with n trials and success probability p, P(exactly k successes) = C(n,k) p^k (1-p)^(n-k). | formula | tagged | Binomial Distribution: “$$P(X = k) = \binom{n}{k} p^k (1-p)^{n-k}$$” |
| The binomial coefficient C(n,k) = n!/(k!(n-k)!) counts the number of ways to choose k items from n. | formula | missing |  |

</details>

<details><summary><code>p-501</code> · gap</summary>

Tagged pages: Hypergeometric Distribution, Combinatorics

| Item | Kind | Status | Where |
|---|---|---|---|
| If independent trials share the same success probability, then conditional on the number of successes, the set of successes is equally like… | fact | missing |  |
| The hypergeometric distribution gives the number of items of a particular type in a sample drawn without replacement from a finite populati… | definition | tagged | Hypergeometric Distribution: “The **Hypergeometric Distribution** models the number of successes in a sample of size $n$ drawn **…” |
| For a sample of size n from a population of N with K items of one type, P(X=k) = C(K,k)·C(N−K,n−k) / C(N,n). | formula | tagged | Hypergeometric Distribution: “$$P(X = k) = \frac{\dbinom{K}{k}\dbinom{N-K}{n-k}}{\dbinom{N}{n}}$$” |
| To find the probability of 'at least k' for a discrete count, sum the probabilities of all outcomes from k up to the maximum (or subtract t… | procedure | elsewhere | Discrete Univariate Distributions: “For "at least one", reach for the complement $1 - P(X=0)$ rather than summing the tail.” |

</details>

<details><summary><code>p-502</code> · gap</summary>

Tagged pages: Exponential Distribution, Payment Random Variable

| Item | Kind | Status | Where |
|---|---|---|---|
| A loss is completely covered by a plan that reimburses the first d units of each loss exactly when the loss is less than or equal to d. | definition | linked | Deductible: “If the loss $X$ is less than or equal to the deductible $d$, the insurer pays nothing; above $d$ it…” |
| For an exponential random variable with rate λ, the cumulative distribution function is P[X ≤ x] = 1 - e^{-λx}, so the survival function is… | formula | tagged | Exponential Distribution: “Work from the survival function $S(x) = e^{-x/\theta}$ rather than the CDF; almost every exponentia…” |
| For an exponential distribution, the survival probability over a multiple of a length equals the survival probability over that length rais… | fact | missing |  |

</details>

<details><summary><code>p-503</code> · gap</summary>

Tagged pages: Geometric Distribution, Discrete Univariate Distributions

| Item | Kind | Status | Where |
|---|---|---|---|
| The number of independent trials up to and including the first success, with constant success probability p, follows a geometric distributi… | definition | tagged | Geometric Distribution: “The **Geometric Distribution** $X \sim \text{Geom}(p)$ counts the number of independent Bernoulli t…” |
| For a geometric random variable X with success probability p (support starting at 1), P[X = k] = p(1-p)^(k-1). | formula | tagged | Geometric Distribution: “$$P(X = k) = (1-p)^{k-1}p, \quad k = 1, 2, 3, \ldots$$” |
| To find an unknown success probability from a given probability that the first success occurs on trial k, set the geometric pmf equal to th… | procedure | missing |  |
| When solving for a probability parameter yields multiple roots in [0,1], use any stated constraint on the parameter (such as p < 0.5) to se… | fact | missing |  |

</details>

<details><summary><code>p-504</code> · untagged</summary>

Tagged pages: Percentile, Uniform Continuous Distribution, Payment Random Variable

| Item | Kind | Status | Where |
|---|---|---|---|
| When an insurer reimburses a fixed percentage of a loss, the policyholder's unreimbursed loss equals the complementary percentage (one minu… | procedure | elsewhere | Coinsurance: “**Coinsurance** is a policy provision under which the insurer pays a fixed percentage $c$ ($0 < c \…” |
| Multiplying a random variable by a positive constant multiplies each of its percentiles by that same constant. | fact | linked | Median: “The payment $(X - d)_+$ is a continuous, non-decreasing function of the loss, so its median is the …” |
| For a uniform distribution on [a, b], the 100q-th percentile is (1-q)a + qb, obtained by setting the CDF (x-a)/(b-a) equal to q. | formula | tagged | Uniform Continuous Distribution: “$E[X] = (a+b)/2$, $\text{Var}(X) = (b-a)^2/12$, and $F(x) = (x-a)/(b-a)$ for $a < x < b$” |
| The 100p-th percentile of a continuous random variable is the value x at which the cumulative distribution function equals p. | definition | tagged | Percentile: “When $F$ is continuous and strictly increasing, it is the value that solves $F(x_p) = p$, found by …” |

</details>

<details><summary><code>p-505</code> · untagged</summary>

Tagged pages: Poisson Distribution, Independent Random Variables

| Item | Kind | Status | Where |
|---|---|---|---|
| The sum of independent Poisson random variables is Poisson with mean equal to the sum of the individual means. | fact | elsewhere | Poisson Superposition: “The component processes must be **independent**. The merged process inherits independent increments…” |
| To find the count distribution over a longer period, scale the Poisson rate by the length of the period (number of days times daily mean) b… | procedure | elsewhere | Poisson Thinning: “$$N_1(t) \sim \text{Poi}(\lambda p\, t)$$” |
| For a Poisson random variable with mean lambda, P[X = k] = e^{-lambda} lambda^k / k!. | formula | tagged | Poisson Distribution: “$$P(X = k) = \frac{e^{-\lambda}\lambda^k}{k!}$$” |

</details>

<details><summary><code>p-506</code> · gap</summary>

Tagged pages: Bayes Theorem, Conditional Probability, Combinatorics

| Item | Kind | Status | Where |
|---|---|---|---|
| Bayes' theorem: P(A \| B) = P(B \| A)P(A) / [sum over all mutually exclusive, exhaustive events A_i of P(B \| A_i)P(A_i)]. | formula | tagged | Bayes Theorem: “$$= \frac{P(E \mid H)\,P(H)}{\displaystyle\sum_{i} P(E \mid H_i)\,P(H_i)}$$” |
| For sampling with replacement, the draws are independent and each draw has the same probability for a given type, so the probability of a s… | procedure | elsewhere | Independent Events: “$$P(A \cap B) = P(A) \cdot P(B)$$” |
| For sampling without replacement, compute sequential draw probabilities using conditional probabilities given the reduced pool left after e… | procedure | elsewhere | Probability Multiplication Rule: “$$P(A \cap B) = P(A) \cdot P(B \mid A)$$” |
| The probability of getting one item of each of two types in two draws is the sum over the possible orders (e.g., outdoor-then-indoor plus i… | procedure | elsewhere | Mutually Exclusive Events: “For mutually exclusive events, the [[Probability Addition Rule]] simplifies to $P(A \cup B) = P(A) …” |
| When the alternating assistants work equally often (alternate days), the prior probability that each is the one working on a given day is 1… | fact | missing |  |

</details>

<details><summary><code>p-507</code> · gap</summary>

Tagged pages: Gamma, Expected Value, Continuous Univariate Distributions

| Item | Kind | Status | Where |
|---|---|---|---|
| A gamma distribution with shape α and scale β has density proportional to x^(α-1) e^(-x/β) for x > 0. | definition | tagged | Gamma: “$$f(x) = \frac{x^{\alpha-1}\,e^{-x/\theta}}{\theta^{\alpha}\,\Gamma(\alpha)}$$” |
| Identify a distribution from a density with an unknown constant by matching its kernel (the x-power and exponential term) to a known family… | procedure | missing |  |
| The mean of a gamma distribution with shape α and scale β is αβ. | formula | tagged | Gamma: “$E[X] = \alpha\theta$, $\text{Var}(X) = \alpha\theta^2$, and coefficient of variation $CV = 1/\sqrt…” |

</details>

<details><summary><code>p-508</code> · gap</summary>

Tagged pages: Percentile, Continuous Univariate Distributions

| Item | Kind | Status | Where |
|---|---|---|---|
| The p-th percentile of a continuous distribution is the value x such that the CDF F(x) equals p, i.e., the probability of being at or below… | definition | tagged | Percentile: “When $F$ is continuous and strictly increasing, it is the value that solves $F(x_p) = p$, found by …” |
| A density specified only up to proportionality is normalized by dividing by its integral over the support, so the proportionality constant … | fact | elsewhere | Joint Probability Density Function: “A valid joint density satisfies $f(x,y) \geq 0$ and integrates to 1 over its support. Setting that …” |
| For a continuous random variable with density f supported on [0, ∞), the CDF is F(a) = ∫_0^a f(x) dx, and the total integral of f over the … | formula | linked | Cumulative Distribution Function (CDF): “For a continuous random variable, $F(x) = \int_{-\infty}^{x} f(t)\, dt$” |
| To integrate a function of the form x·g(1+x²), use u-substitution with u = 1 + x² (du = 2x dx), converting it into a power-rule integral an… | procedure | missing |  |

</details>

<details><summary><code>p-509</code> · gap</summary>

Tagged pages: Linear Combinations of Random Variables, Normal Distribution

| Item | Kind | Status | Where |
|---|---|---|---|
| The sum of independent random variables has mean equal to the sum of the means and variance equal to the sum of the variances, so for n iid… | fact | tagged | Linear Combinations of Random Variables: “Averaging leaves the mean alone but divides the standard deviation by $\sqrt{25} = 5$.” |
| A sum of independent normal random variables is itself normally distributed. | fact | tagged | Normal Distribution: “Any **linear combination of independent normals is exactly normal**: if $X_i \sim N(\mu_i, \sigma_i…” |
| To find a probability for a normal random variable X, standardize it as Z = (X - mean)/SD and evaluate using the standard normal distributi… | procedure | tagged | Normal Distribution: “Its CDF has no closed form and is evaluated via the standard normal $Z = (X - \mu)/\sigma \sim N(0,…” |
| The probability that a normal random variable exceeds zero depends only on the ratio of its mean to its standard deviation, P[X>0] = P[Z > … | fact | missing |  |
| Invert the standard normal distribution function (use percentile/quantile values) to recover the z-value from a given probability, and use … | procedure | tagged | Normal Distribution: “Symmetry gives $\Phi(-z) = 1 - \Phi(z)$ — the identity needed for every negative $z$, since standar…” |

</details>

<details><summary><code>p-510</code> · untagged</summary>

Tagged pages: Moments for Joint Distributions, Joint Probability Function, Order Statistics

| Item | Kind | Status | Where |
|---|---|---|---|
| A joint probability function gives P(X=x, Y=y) for each pair of values, and the probabilities over all cells sum to 1. | definition | tagged | Joint Probability Function: “It satisfies $p(x,y) \geq 0$ for all $(x,y)$ and $\displaystyle\sum_x \sum_y p(x,y) = 1$” |
| To find the distribution of a function of two discrete random variables such as the maximum, assign each cell of the joint table to the val… | procedure | tagged | Moments for Joint Distributions: “$$E[g(X,Y)] = \sum_x \sum_y g(x,y)\,p(x,y)$$” |
| The expected value of a discrete random variable is the sum of each possible value times its probability: E[M] = Σ m·P(M=m). | formula | linked | Expected Value: “$$E[X] = \begin{cases} \displaystyle\sum_{k} k\, f(k) & \text{(discrete)} \\[6pt] \displaystyle\int…” |
| The probabilities of all possible values of a random variable sum to 1, so one value's probability can be found as the complement of the ot… | fact | elsewhere | Discrete Random Variable: “A valid PMF has $p(x) \ge 0$ and $\sum_x p(x) = 1$.” |

</details>

<details><summary><code>p-511</code> · untagged</summary>

Tagged pages: Deductible, Continuous Univariate Distributions, Independent Events

| Item | Kind | Status | Where |
|---|---|---|---|
| A density specified only as proportional to a function on a range is normalized by dividing by its integral over the range, so the proporti… | procedure | elsewhere | Joint Probability Density Function: “A valid joint density satisfies $f(x,y) \geq 0$ and integrates to 1 over its support. Setting that …” |
| For a continuous random variable, P(a < X ≤ b) equals the integral of the density from a to b, and the CDF at d is the integral of the dens… | formula | tagged | Continuous Univariate Distributions: “$$P(a \leq X \leq b) = \int_a^b f(x)\, dx$$” |
| With a constant ordinary deductible d, the insurer pays something on a loss only if the loss exceeds d, so the probability of no payment eq… | fact | tagged | Deductible: “If the loss $X$ is less than or equal to the deductible $d$, the insurer pays nothing; above $d$ it…” |
| For independent events, the probability that all occur is the product of their individual probabilities. | fact | tagged | Independent Events: “$$P(A \cap B) = P(A) \cdot P(B)$$” |
| The probability that at least one of several events occurs equals one minus the probability that none occurs (complement rule). | fact | elsewhere | Probability Rules: “The complement rule is the workhorse shortcut — "at least one" is almost always faster as $1 - P(\t…” |

</details>

<details><summary><code>p-512</code> · answerable</summary>

Tagged pages: Poisson Distribution, Expected Value, Variance and Standard Deviation

| Item | Kind | Status | Where |
|---|---|---|---|
| For a Poisson distribution with parameter λ, the mean and the variance are both equal to λ. | fact | tagged | Poisson Distribution: “A defining property is $E[X] = \text{Var}(X) = \lambda$ — the mean and variance are equal” |
| The variance identity Var(X) = E[X^2] - (E[X])^2, so the second moment is E[X^2] = Var(X) + (E[X])^2. | formula | tagged | Variance and Standard Deviation: “$$= E[X^2] - \mu^2$$” |
| The expected value of a sum of random variables (or terms) is the sum of their expected values, so E(X^2) + E(X) can be evaluated by comput… | fact | linked | Moments for Linear Combinations: “$$E[W] = a_1 E[X_1] + a_2 E[X_2] + \cdots + a_n E[X_n]$$” |

</details>

<details><summary><code>p-513</code> · gap</summary>

Tagged pages: Variance and Standard Deviation, Uniform Continuous Distribution, Expected Value

| Item | Kind | Status | Where |
|---|---|---|---|
| The area of a circle centered at the origin is pi times the square of its radius (A = pi r^2), so a random radius gives a random area that … | fact | missing |  |
| A uniform distribution on [a, b] has constant density 1/(b-a) on that interval and zero elsewhere. | fact | tagged | Uniform Continuous Distribution: “$$f(x) = \frac{1}{b - a}, \quad a < x < b$$” |
| For a continuous random variable X with density f, the expected value of a function g(X) is E[g(X)] = integral of g(x) f(x) dx over the sup… | formula | elsewhere | Continuous Random Variable: “Expectations replace sums with integrals: $E[g(X)] = \int g(x)\,f(x)\,dx$” |
| To find moments of a transformed variable such as A = pi R^2, compute E[A] and E[A^2] by integrating powers of the transformation against t… | procedure | elsewhere | Transformations of Random Variables: “If $E[g(X)]$ is all that is wanted, do **not** find $f_Y$ — use $E[g(X)] = \int g(x) f_X(x)\,dx$ di…” |
| The variance of a random variable is Var(X) = E[X^2] - (E[X])^2. | formula | tagged | Variance and Standard Deviation: “$$= E[X^2] - \mu^2$$” |
| For a constant c, E[cX] = cE[X] and E[c X^2-type terms] scale by constants, so constants like pi and pi^2 factor out of expectations (E[cY]… | fact | tagged | Expected Value: “It is linear: $E[aX + b] = aE[X] + b$” |

</details>

<details><summary><code>p-514</code> · gap</summary>

Tagged pages: Moments for Joint Distributions, Joint Probability Function, Expected Value

| Item | Kind | Status | Where |
|---|---|---|---|
| A joint probability mass function p(x,y) gives the probability that X=x and Y=y simultaneously, must be non-negative, and sums to 1 over al… | definition | tagged | Joint Probability Function: “It satisfies $p(x,y) \geq 0$ for all $(x,y)$ and $\displaystyle\sum_x \sum_y p(x,y) = 1$” |
| For a discrete joint distribution, the expected value of a function g(X,Y) is E[g(X,Y)] = sum over all (x,y) of g(x,y)·p(x,y). | formula | tagged | Moments for Joint Distributions: “$$E[g(X,Y)] = \sum_x \sum_y g(x,y)\,p(x,y)$$” |
| E[XY] equals E[X]E[Y] only when X and Y are uncorrelated (e.g., independent); in general it must be computed from the joint distribution, a… | fact | tagged | Moments for Joint Distributions: “For [[Independent Random Variables]], $E[XY] = E[X]E[Y]$, so $\text{Cov}(X,Y) = 0$” |
| Total revenue from selling all available units is modeled as the product of the number of units and the price per unit, so expected revenue… | procedure | missing |  |

</details>

<details><summary><code>p-515</code> · untagged</summary>

Tagged pages: Percentile, Payment Random Variable, Limited Expected Value

| Item | Kind | Status | Where |
|---|---|---|---|
| A valid probability density function must integrate to 1 over its support, which determines the value of an unknown normalizing constant. | fact | elsewhere | Probability Density Function (PDF): “The PDF must satisfy $f(x) \geq 0$ and $\int_{-\infty}^{\infty} f(x)\, dx = 1$” |
| The cumulative distribution function is obtained by integrating the density from the lower end of the support up to x: F(x) = integral of f… | formula | linked | Cumulative Distribution Function (CDF): “For a continuous random variable, $F(x) = \int_{-\infty}^{x} f(t)\, dt$” |
| The median of a distribution is the value m such that F(m) = 0.5, found by solving the CDF equal to 0.5. | definition | tagged | Percentile: “When $F$ is continuous and strictly increasing, it is the value that solves $F(x_p) = p$, found by …” |
| A claim payment limited by a maximum is min(X, cap); to find its median, compare the median loss to the cap: if the median loss is below th… | procedure | elsewhere | Policy Limit: “Under a limit $u$ and no other modification, the insurer pays the whole loss $X$ when it is below $…” |

</details>

<details><summary><code>p-516</code> · answerable</summary>

Tagged pages: Beta, Continuous Univariate Distributions

| Item | Kind | Status | Where |
|---|---|---|---|
| A random variable with a beta distribution with parameters alpha and beta has density proportional to x^(alpha-1)(1-x)^(beta-1) on 0<x<1 an… | definition | tagged | Beta: “$$f(x) = \frac{x^{\alpha - 1}(1-x)^{\beta - 1}}{B(\alpha,\, \beta)}$$” |
| A valid probability density function must integrate to 1 over its support, so the normalizing constant is the reciprocal of the integral of… | fact | tagged | Continuous Univariate Distributions: “The probability density function (PDF) $f(x)$ must satisfy $f(x) \geq 0$ and $\int_{-\infty}^{\inft…” |
| To find a tail probability P[X > c] for a continuous random variable, integrate the density from c to the upper end of the support. | procedure | tagged | Beta (collapsed): “Integrate over the tail:” |

</details>

<details><summary><code>p-517</code> · untagged</summary>

Tagged pages: Conditional and Marginal Probability Functions, Joint Probability Function, Variance and Standard Deviation

| Item | Kind | Status | Where |
|---|---|---|---|
| The probabilities in a joint probability table must sum to 1, which can be used to solve for an unknown cell probability. | fact | tagged | Joint Probability Function: “It satisfies $p(x,y) \geq 0$ for all $(x,y)$ and $\displaystyle\sum_x \sum_y p(x,y) = 1$” |
| The expected value of an indicator-type random variable taking only values 0 and 1 equals the probability that it takes the value 1. | fact | elsewhere | Variance for Conditional and Marginal Distributions (collapsed): “$E[X \mid Y=2] = 0(0.2)+1(0.8) = 0.8$ and $E[X^2 \mid Y=2] = 0.8$” |
| The expected cost of a claim type equals the per-claim cost times the expected number of claims (linearity of expectation for a constant mu… | fact | elsewhere | Expected Value: “It is linear: $E[aX + b] = aE[X] + b$” |
| To find the marginal distribution of one variable from a joint probability table, sum the joint probabilities over all values of the other … | procedure | linked | Marginal Probability Function: “Similarly $p_Y(y) = \sum_x p(x,y)$” |
| For a discrete random variable, E[Y] = Σ y·P(Y=y) and E[Y²] = Σ y²·P(Y=y). | formula | elsewhere | Expected Value: “$$E[X] = \begin{cases} \displaystyle\sum_{k} k\, f(k) & \text{(discrete)} \\[6pt] \displaystyle\int…” |
| The variance of a random variable is Var(Y) = E[Y²] − (E[Y])². | formula | elsewhere | Variance: “Efficient computation formula: $\text{Var}(X) = E[X^2] - \mu^2$ where $\mu = E[X]$” |

</details>

<details><summary><code>p-518</code> · untagged</summary>

Tagged pages: Poisson Distribution, Discrete Univariate Distributions

| Item | Kind | Status | Where |
|---|---|---|---|
| A Poisson random variable with mean λ has probability mass function P[X=k] = e^{-λ} λ^k / k! for k = 0, 1, 2, ... | formula | tagged | Poisson Distribution: “$$P(X = k) = \frac{e^{-\lambda}\lambda^k}{k!}$$” |
| To find a Poisson parameter from a stated relationship between probabilities of consecutive counts, form the ratio P[X=k+1]/P[X=k] = λ/(k+1… | procedure | elsewhere | Frequency Distribution: “$$p_k = \left(a + \frac{b}{k}\right) p_{k-1}, \quad k = 1, 2, 3, \ldots$$” |
| The probability of at least n events equals one minus the sum of the probabilities of the counts 0 through n-1 (complement rule). | fact | elsewhere | Probability Rules: “$$P(A^c) = 1 - P(A)$$” |

</details>

<details><summary><code>p-519</code> · answerable</summary>

Tagged pages: Linear Combinations of Random Variables, Exponential Distribution, Variance and Standard Deviation

| Item | Kind | Status | Where |
|---|---|---|---|
| The variance of an exponential distribution equals the square of its mean (standard deviation equals the mean). | fact | tagged | Exponential Distribution: “$E[X] = \theta$, $\text{Var}(X) = \theta^2$, and $F(x) = 1 - e^{-x/\theta}$” |
| The variance of a sum of independent random variables equals the sum of their variances. | fact | linked | Independent Random Variables: “For independent random variables: $E[XY] = E[X]\,E[Y]$ and $\text{Var}(X + Y) = \text{Var}(X) + \te…” |
| For a constant c, Var(cY) = c^2 Var(Y), so a constant multiplier scales variance by its square. | formula | tagged | Variance and Standard Deviation: “$\text{Var}(aX + b) = a^2\,\text{Var}(X)$ and $\text{SD}(aX + b) = \\|a\\|\,\text{SD}(X)$” |
| Model total damage as a linear combination of the independent durations, with each city's per-minute damage rate as the coefficient, and se… | procedure | tagged | Linear Combinations of Random Variables: “Independence kills the covariance term, and the coefficients square:” |

</details>

<details><summary><code>p-520</code> · gap</summary>

Tagged pages: Variance for Conditional and Marginal Distributions, Conditional Probability Function, Joint Probability Function

| Item | Kind | Status | Where |
|---|---|---|---|
| A joint probability mass function gives the probability of each combination of values of discrete random variables; when probabilities are … | definition | missing |  |
| To find a conditional distribution of one variable given another from a joint distribution, keep only the outcomes consistent with the cond… | procedure | tagged | Joint Probability Function (collapsed): “Conditional: fixing $Y = 1$ leaves the slice $(0.20, 0.10)$, which sums to $p_Y(1) = 0.30$, so $P(X…” |
| Conditional probability is P[A \| B] = P[A and B] / P[B]. | formula | tagged | Conditional Probability Function: “$$P(X = x \mid Y = y) = \frac{P(X = x, Y = y)}{P(Y = y)}$$” |
| A random variable taking only the values 0 and 1 is a Bernoulli random variable, with the probability of 1 as its parameter p (also under a… | fact | elsewhere | Discrete Random Variable (collapsed): “$Y$ is Bernoulli, so $E[Y] = 0.35$ and $\text{Var}(Y) = 0.35(0.65) = 0.2275$.” |
| The variance of a Bernoulli random variable with parameter p is p(1 − p). | formula | elsewhere | Discrete Random Variable (collapsed): “$Y$ is Bernoulli, so $E[Y] = 0.35$ and $\text{Var}(Y) = 0.35(0.65) = 0.2275$.” |
| A conditional variance Var(W \| Y = y) is the variance of W computed using the conditional distribution of W given Y = y. | definition | tagged | Variance for Conditional and Marginal Distributions: “the conditional variance $\text{Var}(X \mid Y=y)$ measures the spread of $X$ within the subpopulati…” |

</details>

<details><summary><code>p-521</code> · untagged</summary>

Tagged pages: Linear Combinations of Random Variables, Normal Distribution, Independent Random Variables

| Item | Kind | Status | Where |
|---|---|---|---|
| The sum of independent normal random variables is itself normally distributed. | fact | tagged | Linear Combinations of Random Variables: “A linear combination of independent normals is exactly normal, which is what makes [[Probabilities …” |
| The expected value of a sum of random variables equals the sum of their expected values. | fact | tagged | Linear Combinations of Random Variables: “**Expectation is always linear** — $E[L]$ needs no independence assumption at all.” |
| For independent random variables, the variance of the sum equals the sum of the variances; standard deviations do not add. | fact | tagged | Independent Random Variables: “For independent random variables: $E[XY] = E[X]\,E[Y]$ and $\text{Var}(X + Y) = \text{Var}(X) + \te…” |
| To find a probability for a normal random variable, standardize by subtracting the mean and dividing by the standard deviation, then evalua… | procedure | tagged | Normal Distribution: “Its CDF has no closed form and is evaluated via the standard normal $Z = (X - \mu)/\sigma \sim N(0,…” |
| The standard deviation is the square root of the variance. | definition | elsewhere | Variance and Standard Deviation: “$$\sigma = \text{SD}(X) = \sqrt{\text{Var}(X)}$$” |

</details>

<details><summary><code>p-522</code> · answerable</summary>

Tagged pages: Exponential Distribution, Percentile

| Item | Kind | Status | Where |
|---|---|---|---|
| An exponential distribution with mean β has CDF F(x) = 1 - e^{-x/β} and survival function S(x) = e^{-x/β} for x ≥ 0. | formula | tagged | Exponential Distribution: “$E[X] = \theta$, $\text{Var}(X) = \theta^2$, and $F(x) = 1 - e^{-x/\theta}$” |
| The median of a continuous distribution is the value m at which the CDF equals 0.5 (equivalently, the survival function equals 0.5). | definition | linked | Median: “For a continuous distribution that is the point where $F(m) = 0.5$, splitting the probability in ha…” |
| To find an exponential parameter from a given median, set S(median) = 0.5 (or F(median) = 0.5) and solve for β, giving β = median / ln 2. | procedure | linked | Median: “For the [[Exponential Distribution\\|exponential]], $m = \theta \ln 2 \approx 0.693\theta$ against a…” |
| The mean of an exponential distribution with parameter β equals β. | fact | tagged | Exponential Distribution: “$E[X] = \theta$, $\text{Var}(X) = \theta^2$, and $F(x) = 1 - e^{-x/\theta}$” |
| For a continuous random variable, P(a < X < b) = F(b) - F(a). | procedure | linked | Cumulative Distribution Function (CDF) (collapsed): “$$P(2 \leq X \leq 4) = F(4) - F(2) = \frac{4}{5} - \frac{2}{5} = \frac{2}{5} = 0.4$$” |

</details>

<details><summary><code>p-523</code> · gap</summary>

Tagged pages: Normal Distribution, Percentile

| Item | Kind | Status | Where |
|---|---|---|---|
| The pth percentile of a continuous distribution is the value x such that the cumulative distribution function at x equals p/100. | definition | tagged | Percentile: “When $F$ is continuous and strictly increasing, it is the value that solves $F(x_p) = p$, found by …” |
| A normal random variable X with mean mu and standard deviation sigma is standardized as Z = (X - mu)/sigma, which is standard normal, so P(… | formula | tagged | Normal Distribution: “Its CDF has no closed form and is evaluated via the standard normal $Z = (X - \mu)/\sigma \sim N(0,…” |
| The pth percentile of a normal distribution is mu + z_p * sigma, where z_p is the pth percentile of the standard normal distribution. | formula | tagged | Percentile (collapsed): “The 95th percentile of the standard normal is $z_{0.95} = 1.645$. Transform back with $\sigma = 15$:” |
| Use the standard normal table to find z for a given cumulative probability (inverse lookup), and to find the cumulative probability Phi(z) … | procedure | tagged | Normal Distribution: “Symmetry gives $\Phi(-z) = 1 - \Phi(z)$ — the identity needed for every negative $z$, since standar…” |
| To match percentiles of two distributions, set the two percentile expressions equal (same loss amount), express each in terms of its own me… | procedure | missing |  |

</details>

<details><summary><code>p-524</code> · gap</summary>

Tagged pages: Combinatorics, Set Theory, Venn Diagram

| Item | Kind | Status | Where |
|---|---|---|---|
| The inclusion-exclusion (addition) rule for two sets is \|A ∪ B\| = \|A\| + \|B\| − \|A ∩ B\|, which can be rearranged to find the overlap … | formula | tagged | Venn Diagram: “$$P(A \cup B) = P(A) + P(B) - P(A \cap B)$$” |
| Partition a population with two overlapping attributes into disjoint categories (both, A only, B only, neither) by subtracting the overlap … | procedure | tagged | Venn Diagram (collapsed): “**always start from the center (the intersection) and work your way out.** If you just put "70" in …” |
| The combination C(n,k) = n!/(k!(n−k)!) counts the number of ways to choose k items from n distinct items when order does not matter. | definition | linked | Combination: “A **Combination** $\binom{n}{k}$ ("$n$ choose $k$") counts the number of ways to select $k$ objects…” |
| When selections are made independently from disjoint categories, the total number of selections is the product of the number of ways for ea… | fact | missing |  |
| When the specified category counts in a selection sum to less than the group size, the remaining members must be chosen from the leftover c… | procedure | missing |  |

</details>

<details><summary><code>p-525</code> · answerable</summary>

Tagged pages: Variance for Conditional and Marginal Distributions, Conditional Probability, Joint Probability Function, Variance and Standard Deviation

| Item | Kind | Status | Where |
|---|---|---|---|
| The conditional probability of event A given event B is P[A\|B] = P[A and B] / P[B], so conditioning on an event restricts the joint distri… | definition | tagged | Conditional Probability: “$$P(A \mid B) = \frac{P(A \cap B)}{P(B)}, \quad P(B) > 0$$” |
| To get the distribution of a count of categories (e.g., number of entertainment categories watched) from a joint table, map each cell of th… | procedure | linked | Random Variable (collapsed): “So the distribution is $P(X=0)=\tfrac{1}{4}$, $P(X=1)=\tfrac{1}{2}$, $P(X=2)=\tfrac{1}{4}$.” |
| The expected value of a discrete random variable X is E[X] = sum of x·P[X=x], and more generally E[g(X)] = sum of g(x)·P[X=x], so E[X^2] = … | formula | tagged | Variance and Standard Deviation: “E[N^2] &= 0^2(0.6) + 1^2(0.3) + 2^2(0.1) \\” |
| The variance of a random variable is Var(X) = E[X^2] - (E[X])^2. | formula | tagged | Variance and Standard Deviation: “The second form $E[X^2] - \mu^2$ is the one to use in practice” |
| The moments and variance of a conditional distribution (given an event) are computed using the conditional probabilities P[X=x \| event] in… | fact | tagged | Variance for Conditional and Marginal Distributions: “$$\text{Var}(X \mid Y=y) = E[X^2 \mid Y=y] - \bigl(E[X \mid Y=y]\bigr)^2$$” |

</details>

<details><summary><code>p-526</code> · untagged</summary>

Tagged pages: Central Limit Theorem, Exponential Distribution, Normal Distribution

| Item | Kind | Status | Where |
|---|---|---|---|
| An exponential distribution with mean θ has standard deviation equal to θ (variance θ²). | fact | tagged | Exponential Distribution: “$E[X] = \theta$, $\text{Var}(X) = \theta^2$, and $F(x) = 1 - e^{-x/\theta}$” |
| The expected value of a sum of random variables is the sum of their expected values, and the variance of a sum of independent random variab… | fact | elsewhere | Linear Combinations of Random Variables: “$$\text{Var}(L) = \sum_{i=1}^{n} c_i^2\,\text{Var}(X_i) + 2\sum_{i < j} c_i c_j\,\text{Cov}(X_i, X_…” |
| By the Central Limit Theorem, the sum of a large number of independent, identically distributed random variables with finite variance is ap… | fact | tagged | Central Limit Theorem: “For large $n$, $S_n$ is approximately $N(n\mu,\, n\sigma^2)$ regardless of the original distribution” |
| To approximate a probability with a normal distribution, standardize the threshold by subtracting the mean and dividing by the standard dev… | procedure | tagged | Central Limit Theorem: “$$P(S_{200} > 104{,}000) = P\!\left(Z > \frac{104{,}000 - 100{,}000}{4{,}243}\right) = P(Z > 0.94) …” |

</details>

<details><summary><code>p-527</code> · gap</summary>

Tagged pages: Covariance and Correlation Coefficient, Linear Combinations of Random Variables, Variance and Standard Deviation

| Item | Kind | Status | Where |
|---|---|---|---|
| For random variables X and Y and constants a and b, Var(aX + bY) = a^2 Var(X) + b^2 Var(Y) + 2ab Cov(X,Y). | formula | tagged | Linear Combinations of Random Variables: “$$\text{Var}(L) = \sum_{i=1}^{n} c_i^2\,\text{Var}(X_i) + 2\sum_{i < j} c_i c_j\,\text{Cov}(X_i, X_…” |
| Covariance Cov(X,Y) measures how two random variables vary together, and it enters the variance of a sum or difference through the cross te… | definition | tagged | Linear Combinations of Random Variables: “Positive covariance shrinks the variance of a *difference* and inflates the variance of a *sum* — t…” |
| When given variances of several linear combinations of X and Y, expand each with the variance formula to get a system of equations in the u… | procedure | missing |  |

</details>

<details><summary><code>p-528</code> · gap</summary>

Tagged pages: Conditional Probability, Probability Addition Rule, Set Theory

| Item | Kind | Status | Where |
|---|---|---|---|
| The conditional probability of event A given event B is P[A\|B] = P[A ∩ B] / P[B], defined when P[B] > 0. | definition | tagged | Conditional Probability: “$$P(A \mid B) = \frac{P(A \cap B)}{P(B)}, \quad P(B) > 0$$” |
| The addition rule (inclusion-exclusion) for two events states P[A ∪ B] = P[A] + P[B] − P[A ∩ B]. | formula | tagged | Probability Addition Rule: “$$P(A \cup B) = P(A) + P(B) - P(A \cap B)$$” |
| The probability of neither of two events occurring is the complement of their union: P[neither A nor B] = 1 − P[A ∪ B]. | fact | linked | Set Operations: “De Morgan's laws relate them: $(A \cup B)^c = A^c \cap B^c$ and $(A \cap B)^c = A^c \cup B^c$.” |
| When two conditional probabilities P[A\|B] and P[B\|A] are related, express both with the common numerator P[A ∩ B] and cancel it (valid wh… | procedure | missing |  |

</details>

<details><summary><code>p-529</code> · untagged</summary>

Tagged pages: Poisson Distribution, Independent Random Variables

| Item | Kind | Status | Where |
|---|---|---|---|
| For a Poisson random variable, the mean equals the variance, both being equal to the parameter lambda. | fact | tagged | Poisson Distribution: “A defining property is $E[X] = \text{Var}(X) = \lambda$ — the mean and variance are equal” |
| The sum of independent Poisson random variables is Poisson with mean equal to the sum of the individual means. | fact | elsewhere | Poisson Superposition: “a sum of independent Poisson counts is Poisson with the summed mean.” |
| The Poisson probability mass function is P[X = k] = e^{-lambda} lambda^k / k!, so P[X=0] = e^{-lambda} and P[X=1] = lambda e^{-lambda}. | formula | tagged | Poisson Distribution: “$$P(X = k) = \frac{e^{-\lambda}\lambda^k}{k!}$$” |
| To find the probability that a count exceeds a value, use the complement rule: subtract the probabilities of the smaller counts from 1. | procedure | elsewhere | Probability Rules: “The complement rule is the workhorse shortcut — "at least one" is almost always faster as $1 - P(\t…” |

</details>

<details><summary><code>p-530</code> · gap</summary>

Tagged pages: The Law of Total Probability, Conditional Probability, Combinatorics

| Item | Kind | Status | Where |
|---|---|---|---|
| When a random experiment can proceed in several mutually exclusive, exhaustive ways (e.g., which pair of items is selected), the probabilit… | fact | tagged | The Law of Total Probability: “$$P(B) = \sum_{i=1}^{n} P(B \mid A_i)\,P(A_i)$$” |
| When choosing a random subset of a fixed size from n distinct items, each possible subset is equally likely, so each of the C(n,k) subsets … | fact | tagged | Combinatorics (collapsed): “There are 10 equally likely outcomes, so each has probability $1/10 = 0.10$.” |
| For independent random variables (such as separate rolls of different dice), the probability that they take specified values jointly is the… | fact | elsewhere | Probability Multiplication Rule: “When $A$ and $B$ are [[Independent Events\\|independent]], the rule simplifies to $P(A \cap B) = P(A…” |
| To find the probability that the sum of two discrete random variables equals a target value, enumerate the value combinations that add to t… | procedure | missing |  |
| The probability of a face value on a fair die equals the number of faces showing that value divided by the total number of faces, so repeat… | fact | tagged | Combinatorics: “In probability, combinatorics determines the sizes of events and sample spaces: $P(A) = \\|A\\| / \\|S…” |
| The sum of even integers is always even, so an odd target sum is impossible (probability zero) when all possible values of the summands are… | fact | missing |  |

</details>

<details><summary><code>p-531</code> · gap</summary>

Tagged pages: Independent Events, Probability Addition Rule, Set Theory

| Item | Kind | Status | Where |
|---|---|---|---|
| If two events A and B are independent, then P(A∩B) = P(A)P(B), and their complements are also independent. | fact | missing |  |
| The probability of neither of two independent events occurring is the product of the complement probabilities, (1 - P(A))(1 - P(B)). | procedure | elsewhere | Probability Rules (collapsed): “1 - (0.90)^5” |
| Two events are mutually exclusive if they cannot occur together, so P(A∩B) = 0. | definition | linked | Mutually Exclusive Events: “Two events $A$ and $B$ are **Mutually Exclusive** (disjoint) if they cannot both occur simultaneous…” |
| For mutually exclusive events, P(A∪B) = P(A) + P(B). | formula | linked | Mutually Exclusive Events: “For mutually exclusive events, the [[Probability Addition Rule]] simplifies to $P(A \cup B) = P(A) …” |
| The probability of neither event occurring equals one minus the probability of their union, P((A∪B)^c) = 1 - P(A∪B). | fact | elsewhere | Probability Rules (collapsed): “By the complement rule, $P(\text{neither}) = 1 - 0.80 = 0.20$.” |

</details>

<details><summary><code>p-532</code> · untagged</summary>

Tagged pages: Bayes Theorem, Conditional Probability

| Item | Kind | Status | Where |
|---|---|---|---|
| The joint probability of two events equals the conditional probability of one given the other times the probability of the given event: P[A… | formula | elsewhere | Probability Multiplication Rule: “$$= P(B) \cdot P(A \mid B)$$” |
| The conditional probability of A given B is P[A \| B] = P[A ∩ B] / P[B], the probability of A restricted to outcomes in B. | definition | tagged | Conditional Probability: “$$P(A \mid B) = \frac{P(A \cap B)}{P(B)}, \quad P(B) > 0$$” |
| To reverse the direction of conditioning (find P[B \| A] from P[A \| B]), compute the joint probability P[A ∩ B] = P[A \| B] P[B] and divid… | procedure | tagged | Bayes Theorem: “$$P(H \mid E) = \frac{P(E \mid H)\,P(H)}{P(E)}$$” |

</details>

<details><summary><code>p-533</code> · gap</summary>

Tagged pages: Hypergeometric Distribution, Combinatorics, Conditional Probability

| Item | Kind | Status | Where |
|---|---|---|---|
| When independent trials all share the same success probability, conditioning on exactly k successes among n makes the set of k successful t… | fact | missing |  |
| Under the hypergeometric model, the probability that a sample of size k drawn without replacement from N items, of which K are of a given t… | formula | tagged | Hypergeometric Distribution: “$$P(X = k) = \frac{\dbinom{K}{k}\dbinom{N-K}{n-k}}{\dbinom{N}{n}}$$” |
| The probability of at least one event of a given type equals one minus the probability of none (the complement rule). | fact | elsewhere | Probability Rules: “The complement rule is the workhorse shortcut — "at least one" is almost always faster as $1 - P(\t…” |
| The number of ways to choose k items from n unordered is the binomial coefficient C(n,k) = n!/(k!(n-k)!). | formula | linked | Combination: “$$\binom{n}{k} = \frac{n!}{k!\,(n-k)!}$$” |

</details>

<details><summary><code>p-534</code> · answerable</summary>

Tagged pages: Poisson Distribution, Geometric Distribution, Conditional Probability

| Item | Kind | Status | Where |
|---|---|---|---|
| For a Poisson random variable N with mean λ, P[N = 0] = e^{-λ}, so the probability of at least one event is 1 - e^{-λ}. | formula | tagged | Poisson Distribution: “$$P(X = 0) = \frac{e^{-3} \cdot 3^0}{0!} = e^{-3} \approx 0.0498$$” |
| Because the yearly claim counts are independent, the probability of a specific sequence of accident/no-accident outcomes across years is th… | fact | tagged | Geometric Distribution: “The survival function is clean: $P(X > n) = (1-p)^n$ — "the first $n$ trials all failed."” |
| The probability that the first event occurs in period k is the probability of no event in each of the first k-1 periods times the probabili… | procedure | tagged | Geometric Distribution: “$$P(X = k) = (1-p)^{k-1}p, \quad k = 1, 2, 3, \ldots$$” |
| When trials are independent, conditioning on outcomes of earlier periods leaves the probabilities of later periods unchanged, so the condit… | fact | tagged | Conditional Probability: “If $A$ and $B$ are independent, then $P(A \mid B) = P(A)$” |

</details>

<details><summary><code>p-535</code> · untagged</summary>

Tagged pages: Linear Combinations of Random Variables, Variance and Standard Deviation, Payment Random Variable

| Item | Kind | Status | Where |
|---|---|---|---|
| With coinsurance (proportional reimbursement) at rate r, the insurer pays r times the loss and the policyholder retains (1 − r) times the l… | definition | elsewhere | Coinsurance: “**Coinsurance** is a policy provision under which the insurer pays a fixed percentage $c$ ($0 < c \…” |
| For a constant c, Var(cX) = c² Var(X), so a scalar multiplier enters the variance squared. | fact | tagged | Variance and Standard Deviation: “$\text{Var}(aX + b) = a^2\,\text{Var}(X)$ and $\text{SD}(aX + b) = \\|a\\|\,\text{SD}(X)$ — a shift $…” |
| If X and Y are independent, Var(aX + bY) = a² Var(X) + b² Var(Y), because the covariance term is zero. | fact | tagged | Linear Combinations of Random Variables: “Independence kills the covariance term, and the coefficients square:” |

</details>

<details><summary><code>p-536</code> · gap</summary>

Tagged pages: Probability Addition Rule, Set Theory

| Item | Kind | Status | Where |
|---|---|---|---|
| Translate a verbally described event on a die roll into the set of outcomes it contains (e.g., 'less than 5' is {1,2,3,4}). | procedure | tagged | Set Theory (collapsed): “Let $A = \{2, 4, 6\}$ (even) and $B = \{4, 5, 6\}$ (greater than 3).” |
| If one event is a subset of another, their union equals the larger event, so the probability of the union equals the probability of the lar… | fact | missing |  |
| Two events are disjoint (mutually exclusive) if they share no outcomes, so their intersection is empty. | definition | linked | Mutually Exclusive Events: “Two events $A$ and $B$ are **Mutually Exclusive** (disjoint) if they cannot both occur simultaneous…” |
| For disjoint events A and B, P[A ∪ B] = P[A] + P[B]. | formula | linked | Mutually Exclusive Events: “For mutually exclusive events, the [[Probability Addition Rule]] simplifies to $P(A \cup B) = P(A) …” |

</details>

<details><summary><code>p-537</code> · untagged</summary>

Tagged pages: Independent Events, Conditional Probability, Binomial Distribution

| Item | Kind | Status | Where |
|---|---|---|---|
| The probability of an event occurring through a two-step process is the product of the probability of the first event and the conditional p… | formula | elsewhere | Probability Multiplication Rule: “$$P(A \cap B) = P(A) \cdot P(B \mid A)$$” |
| The probability of an event is one minus the probability of its complement: P[A] = 1 − P[not A]. | fact | elsewhere | Probability Rules: “$$P(A^c) = 1 - P(A)$$” |
| For independent events, the probability that all occur equals the product of their individual probabilities, so the probability of no occur… | fact | tagged | Independent Events: “$$P(A_{i_1} \cap A_{i_2} \cap \cdots \cap A_{i_m}) = P(A_{i_1})\,P(A_{i_2}) \cdots P(A_{i_m})$$” |
| To find the probability of at least one occurrence in several independent trials, compute 1 minus the probability of no occurrences in any … | procedure | elsewhere | Probability Rules: “The complement rule is the workhorse shortcut — "at least one" is almost always faster as $1 - P(\t…” |

</details>

<details><summary><code>p-538</code> · gap</summary>

Tagged pages: Geometric Distribution, Discrete Univariate Distributions

| Item | Kind | Status | Where |
|---|---|---|---|
| The mode of a discrete distribution is the value of the random variable with the highest probability mass. | definition | elsewhere | Mode: “The **Mode** of a [[Random Variable]] $X$ is the value at which its [[Probability Mass Function (PM…” |
| The number of independent trials up to and including the first success, each with success probability p, follows a geometric distribution o… | fact | tagged | Geometric Distribution: “The **Geometric Distribution** $X \sim \text{Geom}(p)$ counts the number of independent Bernoulli t…” |
| For a geometric random variable counting trials up to the first success, P[X = n] = (1-p)^(n-1) p for n = 1, 2, 3, ... | formula | tagged | Geometric Distribution: “$$P(X = k) = (1-p)^{k-1}p, \quad k = 1, 2, 3, \ldots$$” |
| The geometric probability mass function is strictly decreasing in n, so its mode is always the smallest support value regardless of p. | fact | missing |  |

</details>

<details><summary><code>p-539</code> · answerable</summary>

Tagged pages: Linear Combinations of Random Variables, Normal Distribution, Independent Random Variables

| Item | Kind | Status | Where |
|---|---|---|---|
| A linear combination of independent normal random variables is itself normally distributed. | fact | tagged | Linear Combinations of Random Variables: “A linear combination of independent normals is exactly normal, which is what makes [[Probabilities …” |
| The expected value of a linear combination is E[aX + bY] = aE[X] + bE[Y], so the mean of an average is the average of the means. | formula | tagged | Linear Combinations of Random Variables: “$$E[L] = \sum_{i=1}^{n} c_i\,E[X_i]$$” |
| For independent random variables, Var(aX + bY) = a^2 Var(X) + b^2 Var(Y); the constant multiplier enters squared and the variances add. | formula | tagged | Linear Combinations of Random Variables: “Coefficients enter the variance **squared**, so $\text{Var}(X - Y) = \text{Var}(X) + \text{Var}(Y)$…” |
| To find a normal probability, standardize by subtracting the mean and dividing by the standard deviation: Z = (X - mu)/sigma. | procedure | tagged | Normal Distribution: “Its CDF has no closed form and is evaluated via the standard normal $Z = (X - \mu)/\sigma \sim N(0,…” |
| For a standard normal Z, the upper tail probability is P(Z > z) = 1 - Phi(z). | fact | tagged | Normal Distribution (collapsed): “$$P(S > 55{,}000) = P(Z > 0.791) = 1 - \Phi(0.791) \approx 1 - 0.7855 = 0.2145$$” |

</details>

<details><summary><code>p-540</code> · gap</summary>

Tagged pages: Bayes Theorem, The Law of Total Probability, Conditional Probability

| Item | Kind | Status | Where |
|---|---|---|---|
| Bayes' theorem: P[A\|B] = P[B\|A]P[A] / (P[B\|A]P[A] + P[B\|A']P[A']), which reverses the direction of conditioning using the prior probabi… | formula | tagged | Bayes Theorem: “$$= \frac{P(E \mid H)\,P(H)}{\displaystyle\sum_{i} P(E \mid H_i)\,P(H_i)}$$” |
| Conditional probability P[A\|B] is the probability of A given that B has occurred, equal to P[A and B] / P[B]. | definition | tagged | Conditional Probability: “$$P(A \mid B) = \frac{P(A \cap B)}{P(B)}, \quad P(B) > 0$$” |
| Table percentages whose rows each sum to 100% are conditional distributions given the row category, so each entry is P[column \| row] and n… | fact | missing |  |
| The probabilities of mutually exclusive, exhaustive categories sum to 1, so the complement rule gives P[F] = 1 - P[M]. | fact | elsewhere | Axioms of Probability (collapsed): “Therefore $P(A^c) = 1 - P(A)$. $\square$” |
| Law of total probability: P[B] = sum over a partition of P[B\|A_i]P[A_i], which gives the denominator in Bayes' theorem. | formula | tagged | The Law of Total Probability: “$$P(B) = \sum_{i=1}^{n} P(B \mid A_i)\,P(A_i)$$” |

</details>

<details><summary><code>p-541</code> · answerable</summary>

Tagged pages: Exponential Distribution, Conditional Probability

| Item | Kind | Status | Where |
|---|---|---|---|
| The exponential distribution is memoryless: P[X ≥ s + t \| X ≥ s] = P[X ≥ t], so conditioning on survival to a time only concerns the addit… | fact | tagged | Exponential Distribution: “Its defining property is **memorylessness**: $P(X > s + t \mid X > s) = P(X > t)$, making it the un…” |
| Rewrite a conditional survival probability for an exponential variable as an unconditional survival probability over the additional time (t… | procedure | tagged | Exponential Distribution: “A direct consequence: given $X > d$, the excess $X - d$ is again $\text{Exp}(\theta)$.” |
| For an exponential distribution the survival function is S(t) = e^(−λt), so S(kt) = [S(t)]^k; survival over a window k times as long equals… | fact | tagged | Exponential Distribution: “Work from the survival function $S(x) = e^{-x/\theta}$ rather than the CDF; almost every exponentia…” |

</details>

<details><summary><code>p-542</code> · answerable</summary>

Tagged pages: Linear Combinations of Random Variables, Variance and Standard Deviation, Independent Random Variables

| Item | Kind | Status | Where |
|---|---|---|---|
| The variance of a random variable is the square of its standard deviation, so a standard deviation must be squared to obtain the variance. | definition | tagged | Variance and Standard Deviation: “$$\sigma = \text{SD}(X) = \sqrt{\text{Var}(X)}$$” |
| For independent random variables, the variance of the sum equals the sum of the individual variances (standard deviations do not add). | fact | tagged | Variance and Standard Deviation: “Standard deviations do **not** add: $\text{SD}(X+Y) \neq \text{SD}(X) + \text{SD}(Y)$. Always add v…” |
| To find the group counts from a total variance, write the total variance as the sum over groups of (number in group times per-member varian… | procedure | linked | Moments for Linear Combinations: “\text{Var}(W) = \sum_{i=1}^n a_i^2 \,\text{Var}(X_i)” |

</details>

<details><summary><code>p-543</code> · answerable</summary>

Tagged pages: Variance and Standard Deviation, Deductible, Payment Random Variable

| Item | Kind | Status | Where |
|---|---|---|---|
| For a loss X with a deductible d and coinsurance percentage p, the payment on a loss exceeding the deductible is p(X - d). | formula | linked | Coinsurance Percentage: “$$Y = \alpha \cdot (X - d)_+$$” |
| Adding or subtracting a constant to a random variable does not change its variance: Var(X + c) = Var(X). | fact | tagged | Variance and Standard Deviation: “a shift $b$ moves the distribution without changing its spread.” |
| Multiplying a random variable by a constant c multiplies its variance by c^2: Var(cX) = c^2 Var(X). | fact | tagged | Variance and Standard Deviation: “$\text{Var}(aX + b) = a^2\,\text{Var}(X)$ and $\text{SD}(aX + b) = \\|a\\|\,\text{SD}(X)$” |
| When the payment is conditioned on a loss exceeding the deductible (only reported losses are considered), the payment is a simple linear fu… | fact | tagged | Deductible: “If the loss $X$ is less than or equal to the deductible $d$, the insurer pays nothing; above $d$ it…” |

</details>

<details><summary><code>p-544</code> · gap</summary>

Tagged pages: Conditional Probability, The Law of Total Probability, Binomial Distribution

| Item | Kind | Status | Where |
|---|---|---|---|
| The conditional probability of A given B is P(A\|B) = P(A and B)/P(B). | formula | tagged | Conditional Probability: “$$P(A \mid B) = \frac{P(A \cap B)}{P(B)}, \quad P(B) > 0$$” |
| To find a probability conditional on an event like N ≥ k for a discrete count, restrict to the qualifying counts and sum their probabilitie… | procedure | missing |  |
| The law of total probability: P(A) = sum over n of P(A\|N=n)P(N=n), so a total-claims probability is found by weighting the conditional pro… | fact | tagged | The Law of Total Probability: “$$P(B) = \sum_{i=1}^{n} P(B \mid A_i)\,P(A_i)$$” |
| Given N claims, the distribution of aggregate claims is found by enumerating the possible combinations of the independent claim sizes (e.g.… | procedure | missing |  |
| The probability of the complement is 1 minus the probability of the event, which can simplify computing 'at least one' probabilities. | fact | elsewhere | Probability Rules: “$$P(A^c) = 1 - P(A)$$” |
| For independent events, the probability that all occur is the product of their individual probabilities. | fact | elsewhere | Independent Events: “$$P(A \cap B) = P(A) \cdot P(B)$$” |

</details>

<details><summary><code>p-545</code> · answerable</summary>

Tagged pages: Percentile, Exponential Distribution

| Item | Kind | Status | Where |
|---|---|---|---|
| The exponential distribution with mean θ has density (1/θ)e^{-x/θ} for x > 0, and its CDF is F(x) = 1 − e^{-x/θ}. | definition | tagged | Exponential Distribution: “$$f(x) = \frac{1}{\theta}\,e^{-x/\theta}, \quad x > 0$$” |
| The 100q-th percentile of a continuous random variable is the value x_q satisfying F(x_q) = q. | definition | tagged | Percentile: “When $F$ is continuous and strictly increasing, it is the value that solves $F(x_p) = p$, found by …” |
| For an exponential distribution with mean θ, the 100q-th percentile is x_q = −θ ln(1 − q). | formula | tagged | Percentile (collapsed): “Set $F(x_{0.90}) = 0.90$ and solve:” |
| To find the difference between two percentiles, compute each percentile separately by solving F(x)=q and then subtract the lower from the h… | procedure | tagged | Percentile: “When $F$ is continuous and strictly increasing, it is the value that solves $F(x_p) = p$, found by …” |

</details>

<details><summary><code>p-546</code> · gap</summary>

Tagged pages: Bayes Theorem, Conditional Probability, The Law of Total Probability

| Item | Kind | Status | Where |
|---|---|---|---|
| Bayes' theorem: P[A\|B] = P[B\|A]P[A] / (P[B\|A]P[A] + P[B\|A^c]P[A^c]), giving the posterior probability of an event after observing evide… | formula | tagged | Bayes Theorem: “$$P(H \mid E) = \frac{P(E \mid H)\,P(H)}{P(E)}$$” |
| The law of total probability expresses the probability of an event as the sum over a partition (an event and its complement) of the conditi… | fact | tagged | The Law of Total Probability: “$$P(B) = \sum_{i=1}^{n} P(B \mid A_i)\,P(A_i)$$” |
| Translate a stated test accuracy ('correct with probability p') into conditional probabilities of a positive result: for a condition-presen… | procedure | missing |  |
| The probability of the complement of an event is 1 minus the probability of the event, also applying to conditional probabilities given a f… | fact | elsewhere | Probability Rules: “$$P(A^c) = 1 - P(A)$$” |
| The prior probability of an event is its proportion in the population before any test or evidence is observed (e.g., the fraction of defect… | definition | elsewhere | Naive Bayes: “$\pi_k$ is the **prior** probability of class $k$, usually estimated as the share of training obser…” |

</details>

<details><summary><code>p-547</code> · untagged</summary>

Tagged pages: Bayes Theorem, Conditional Probability, The Law of Total Probability

| Item | Kind | Status | Where |
|---|---|---|---|
| Bayes' theorem: P(A\|B) = P(B\|A)P(A) / [P(B\|A)P(A) + P(B\|A')P(A')], giving the posterior probability of a cause A given an observed outc… | formula | tagged | Bayes Theorem: “$$= \frac{P(E \mid H)\,P(H)}{\displaystyle\sum_{i} P(E \mid H_i)\,P(H_i)}$$” |
| The law of total probability: the probability of an event equals the sum over a partition of the conditional probabilities of the event tim… | fact | tagged | The Law of Total Probability: “$$P(B) = \sum_{i=1}^{n} P(B \mid A_i)\,P(A_i)$$” |
| Translate a channel's reliability into conditional probabilities: the probability of receiving a given symbol when the opposite symbol was … | procedure | elsewhere | Probability Rules: “$$P(A^c) = 1 - P(A)$$” |
| Conditional probability P(A\|B) is the probability that A occurs given that B has occurred, equal to P(A∩B)/P(B); the joint probability is … | definition | tagged | Conditional Probability: “$$P(A \mid B) = \frac{P(A \cap B)}{P(B)}, \quad P(B) > 0$$” |

</details>

<details><summary><code>p-548</code> · gap</summary>

Tagged pages: The Law of Total Probability, Hypergeometric Distribution, Conditional Probability

| Item | Kind | Status | Where |
|---|---|---|---|
| To find a probability that depends on an earlier random stage, condition on the possible outcomes of that stage and weight the conditional … | procedure | tagged | The Law of Total Probability: “The Law of Total Probability** states that if $\{A_1, \ldots, A_n\}$ is a partition of the sample s…” |
| The number of items of a given type in a sample drawn without replacement from a finite population with two types follows a hypergeometric … | fact | tagged | Hypergeometric Distribution: “The **Hypergeometric Distribution** models the number of successes in a sample of size $n$ drawn **…” |
| The probability of k items of one type in a sample of size n drawn without replacement from a population of N with K of that type is C(K,k)… | formula | tagged | Hypergeometric Distribution: “$$P(X = k) = \frac{\dbinom{K}{k}\dbinom{N-K}{n-k}}{\dbinom{N}{n}}$$” |
| After transferring chips between urns, update the receiving urn's total count and count of each color given the transfer composition, and t… | procedure | missing |  |

</details>

<details><summary><code>p-549</code> · gap</summary>

Tagged pages: Combinatorics

| Item | Kind | Status | Where |
|---|---|---|---|
| When people are seated randomly, every seat is equally likely for a given person, so the position of one person can be fixed by symmetry an… | fact | missing |  |
| In a circular arrangement each seat has exactly two neighbouring seats (one on each side). | fact | missing |  |
| The number of distinct arrangements of n distinct objects around a circle, counted up to rotation, is (n-1)!. | formula | missing |  |
| To count arrangements where certain items must be adjacent, treat them as a single block, arrange the resulting units, and multiply by the … | procedure | missing |  |
| With equally likely outcomes, probability equals the number of favorable outcomes divided by the total number of outcomes. | formula | tagged | Combinatorics: “In probability, combinatorics determines the sizes of events and sample spaces: $P(A) = \\|A\\| / \\|S…” |

</details>

<details><summary><code>p-550</code> · answerable</summary>

Tagged pages: Combinatorics, Hypergeometric Distribution

| Item | Kind | Status | Where |
|---|---|---|---|
| The binomial coefficient C(n,k) = n!/(k!(n-k)!) counts the number of ways to choose k items from n distinct items when order does not matte… | definition | linked | Combination: “A **Combination** $\binom{n}{k}$ ("$n$ choose $k$") counts the number of ways to select $k$ objects…” |
| To count selections with a specified number from each of two subgroups, choose from each subgroup separately using combinations and multipl… | procedure | tagged | Hypergeometric Distribution: “$$P(X = k) = \frac{\dbinom{K}{k}\dbinom{N-K}{n-k}}{\dbinom{N}{n}}$$” |
| Partition the population into the group with the property and the complement group (total minus those with the property), and determine how… | procedure | tagged | Hypergeometric Distribution: “$$\text{where } N = \text{population size},\; K = \text{successes in population},\; n = \text{sampl…” |

</details>

<details><summary><code>p-551</code> · gap</summary>

Tagged pages: Binomial Distribution, Independent Events

| Item | Kind | Status | Where |
|---|---|---|---|
| A binomial random variable counts the number of successes in n independent trials, each with the same success probability p. | definition | tagged | Binomial Distribution: “models the number of successes in $n$ independent Bernoulli trials, each with probability of succes…” |
| For a binomial(n, p) random variable, P[X = k] = C(n,k) p^k (1-p)^(n-k). | formula | tagged | Binomial Distribution: “$$P(X = k) = \binom{n}{k} p^k (1-p)^{n-k}$$” |
| Translate a coverage limit into an event on the count: if only the first m events are covered, an uncovered event occurs exactly when the c… | procedure | missing |  |
| The probability of a union of mutually exclusive (disjoint) events is the sum of their probabilities, so P[X >= k] is the sum of P[X = j] f… | fact | elsewhere | Axioms of Probability: “If events are [[Concepts/Mutually Exclusive Events]], the probability of "one or the other" is the …” |

</details>

<details><summary><code>p-552</code> · answerable</summary>

Tagged pages: Percentile, Uniform Continuous Distribution

| Item | Kind | Status | Where |
|---|---|---|---|
| For a uniform distribution on [a, b], the CDF is F(x) = (x - a)/(b - a) for a ≤ x ≤ b. | formula | tagged | Uniform Continuous Distribution: “$E[X] = (a+b)/2$, $\text{Var}(X) = (b-a)^2/12$, and $F(x) = (x-a)/(b-a)$ for $a < x < b$” |
| The 100p-th percentile of a continuous distribution is the value x such that F(x) = p. | definition | tagged | Percentile: “When $F$ is continuous and strictly increasing, it is the value that solves $F(x_p) = p$, found by …” |
| To find a percentile, set the CDF equal to the percentile level p and solve for x. | procedure | tagged | Percentile (collapsed): “Set $F(x_{0.90}) = 0.90$ and solve:” |

</details>

<details><summary><code>p-553</code> · untagged</summary>

Tagged pages: Exponential Distribution, Percentile

| Item | Kind | Status | Where |
|---|---|---|---|
| For an exponential distribution with mean β, the 100q-th percentile is x_q = -β ln(1-q), obtained by solving F(x) = 1 - e^{-x/β} = q. | formula | tagged | Percentile (collapsed): “Set $F(x_{0.90}) = 0.90$ and solve:” |
| The 100p-th percentile of a continuous random variable is the value x at which the CDF equals p, and the median is the 50th percentile (F(x… | definition | tagged | Percentile: “When $F$ is continuous and strictly increasing, it is the value that solves $F(x_p) = p$, found by …” |
| To find an unknown parameter from a given percentile, set the percentile formula equal to the given value and solve for the parameter, then… | procedure | elsewhere | Percentile Matching (collapsed): “The position is $(10 + 1)(0.5) = 5.5$, halfway between $x_{(5)} = 410$ and $x_{(6)} = 560$, so $\ha…” |
| Logarithm property: -ln(a) = ln(1/a), so -ln(0.6) = ln(5/3) and -ln(0.5) = ln 2. | fact | tagged | Percentile (collapsed): “x_{0.90} &= -10 \ln(0.10) \\ &= 10 \ln(10) \approx 23.03” |

</details>

<details><summary><code>p-554</code> · answerable</summary>

Tagged pages: Uniform Continuous Distribution, Variance and Standard Deviation, Linear Combinations of Random Variables

| Item | Kind | Status | Where |
|---|---|---|---|
| For a continuous uniform distribution on [a, b], the variance is (b - a)^2 / 12, so the standard deviation is (b - a)/sqrt(12). | formula | tagged | Uniform Continuous Distribution: “$E[X] = (a+b)/2$, $\text{Var}(X) = (b-a)^2/12$, and $F(x) = (x-a)/(b-a)$ for $a < x < b$” |
| For a random variable X and constants a and b, Var(aX + b) = a^2 Var(X), so SD(aX + b) = \|a\| SD(X). | fact | tagged | Variance and Standard Deviation: “$\text{Var}(aX + b) = a^2\,\text{Var}(X)$ and $\text{SD}(aX + b) = \\|a\\|\,\text{SD}(X)$ — a shift $…” |
| Adding a constant to a random variable shifts its distribution but does not change its variance or standard deviation. | fact | tagged | Variance and Standard Deviation: “$\text{Var}(aX + b) = a^2\,\text{Var}(X)$ and $\text{SD}(aX + b) = \\|a\\|\,\text{SD}(X)$ — a shift $…” |
| Express a total that includes a fixed fee and a percentage surcharge on a random amount as a linear function of that random variable (e.g.,… | procedure | tagged | Variance and Standard Deviation: “$\text{Var}(aX + b) = a^2\,\text{Var}(X)$ and $\text{SD}(aX + b) = \\|a\\|\,\text{SD}(X)$ — a shift $…” |

</details>

<details><summary><code>p-555</code> · untagged</summary>

Tagged pages: Linear Combinations of Random Variables, Normal Distribution

| Item | Kind | Status | Where |
|---|---|---|---|
| A sum of independent normal random variables is itself normally distributed. | fact | tagged | Linear Combinations of Random Variables: “A linear combination of independent normals is exactly normal, which is what makes [[Probabilities …” |
| For a sum of n independent random variables, the mean of the sum is the sum of the means and the variance of the sum is the sum of the vari… | formula | linked | Moments for Linear Combinations: “$$\text{Var}(W) = \sum_{i=1}^n a_i^2 \,\text{Var}(X_i)$$” |
| To find a probability or percentile for a normal random variable, standardize it with Z = (X - mu)/sigma and use the standard normal distri… | procedure | tagged | Normal Distribution: “Its CDF has no closed form and is evaluated via the standard normal $Z = (X - \mu)/\sigma \sim N(0,…” |
| A value with upper-tail probability p is the (1-p) percentile, so it corresponds to the standard normal quantile z_(1-p), e.g. a 20% upper … | fact | elsewhere | Normal Approximation: “Inverted, it sets a fund: the total exceeded with probability $\alpha$ is about $n\mu + z_{1-\alpha…” |

</details>

<details><summary><code>p-556</code> · gap</summary>

Tagged pages: Normal Distribution, Percentile

| Item | Kind | Status | Where |
|---|---|---|---|
| If X is normal with mean mu and standard deviation sigma, its p-th percentile equals mu + z_p * sigma, where z_p is the standard normal p-t… | fact | tagged | Percentile (collapsed): “The 95th percentile of the standard normal is $z_{0.95} = 1.645$. Transform back with $\sigma = 15$:” |
| Given two percentiles of a normal distribution, write each as mu + z_p*sigma and solve the two linear equations simultaneously for mu and s… | procedure | tagged | Percentile (collapsed): “x_{0.95} &= \mu + z_{0.95}\,\sigma \\ &= 100 + 1.645(15) \\ &= 124.68” |
| Find the standard normal percentile z_p for a given probability p by looking up the inverse of the standard normal CDF in the normal table. | procedure | missing |  |
| The p-th percentile of a distribution is the value x such that P(X <= x) = p. | definition | tagged | Percentile: “When $F$ is continuous and strictly increasing, it is the value that solves $F(x_p) = p$, found by …” |

</details>

<details><summary><code>p-557</code> · gap</summary>

Tagged pages: Exponential Distribution, Variance and Standard Deviation

| Item | Kind | Status | Where |
|---|---|---|---|
| The exponential distribution with mean beta has survival function S(x) = e^{-x/beta} and CDF F(x) = 1 - e^{-x/beta} for x ≥ 0. | formula | tagged | Exponential Distribution: “$E[X] = \theta$, $\text{Var}(X) = \theta^2$, and $F(x) = 1 - e^{-x/\theta}$” |
| To find an unknown exponential parameter from a given probability, set the CDF at the stated point equal to that probability and solve for … | procedure | missing |  |
| For an exponential distribution, the standard deviation equals the mean (variance equals mean squared). | fact | tagged | Exponential Distribution: “$E[X] = \theta$, $\text{Var}(X) = \theta^2$, and $F(x) = 1 - e^{-x/\theta}$” |

</details>

<details><summary><code>p-558</code> · gap</summary>

Tagged pages: Negative Binomial Distribution, Binomial Distribution, Discrete Univariate Distributions

| Item | Kind | Status | Where |
|---|---|---|---|
| A negative binomial random variable counts the number of independent Bernoulli trials needed to obtain a fixed number r of successes, so th… | definition | tagged | Negative Binomial Distribution: “The **Negative Binomial Distribution** $X \sim \text{NegBin}(r, p)$ counts the number of independen…” |
| For n independent trials each with success probability p, the probability of exactly k successes is C(n,k) p^k (1-p)^(n-k). | formula | tagged | Binomial Distribution: “$$P(X = k) = \binom{n}{k} p^k (1-p)^{n-k}$$” |
| To find the probability that the r-th success occurs on trial n, require exactly r-1 successes in the first n-1 trials and a success on tri… | procedure | tagged | Negative Binomial Distribution: “$$P(X = k) = \binom{k-1}{r-1}p^r(1-p)^{k-r}$$” |
| The probability of the intersection of independent events equals the product of their individual probabilities, so outcomes of separate tri… | fact | elsewhere | Independent Events: “$$P(A \cap B) = P(A) \cdot P(B)$$” |
| In the negative binomial probability, the binomial coefficient counts arrangements only among the first n-1 trials because the final trial … | fact | missing |  |

</details>

<details><summary><code>p-559</code> · gap</summary>

Tagged pages: Exponential Distribution

| Item | Kind | Status | Where |
|---|---|---|---|
| For an exponential distribution with mean β, the survival function is P[X > x] = e^{-x/β}. | formula | tagged | Exponential Distribution: “Work from the survival function $S(x) = e^{-x/\theta}$ rather than the CDF; almost every exponentia…” |
| The mean (expected value) of an exponential distribution equals its scale parameter β, the reciprocal of the rate λ. | definition | tagged | Exponential Distribution: “$E[X] = \theta$, $\text{Var}(X) = \theta^2$, and $F(x) = 1 - e^{-x/\theta}$” |
| To compare two exponential random variables with related means, use the given survival probability to solve for the unknown mean by taking … | procedure | missing |  |
| For an exponential distribution, the probability of surviving past time t is the t-th power of the survival probability at time 1, so survi… | fact | missing |  |
| Halving the mean of an exponential distribution doubles its rate, which squares its survival probability at any fixed time. | fact | missing |  |

</details>

<details><summary><code>p-560</code> · untagged</summary>

Tagged pages: Exponential Distribution, Payment Random Variable, Limited Expected Value

| Item | Kind | Status | Where |
|---|---|---|---|
| Under a policy with a maximum (cap) per loss, a loss is partially unreimbursed exactly when it exceeds the cap, so its probability is the u… | definition | elsewhere | Policy Limit: “Under a limit $u$ and no other modification, the insurer pays the whole loss $X$ when it is below $…” |
| For an exponential random variable with mean theta, the survival function is P[X > x] = e^{-x/theta}. | formula | tagged | Exponential Distribution: “Work from the survival function $S(x) = e^{-x/\theta}$ rather than the CDF; almost every exponentia…” |
| The exponential distribution is memoryless, so raising a threshold by a fixed amount d multiplies the exceedance probability by the constan… | fact | tagged | Exponential Distribution: “Its defining property is **memorylessness**: $P(X > s + t \mid X > s) = P(X > t)$, making it the un…” |

</details>

<details><summary><code>p-561</code> · answerable</summary>

Tagged pages: Hypergeometric Distribution, Combinatorics

| Item | Kind | Status | Where |
|---|---|---|---|
| The hypergeometric distribution gives the probability of a given number of items of one type when sampling without replacement from a finit… | definition | tagged | Hypergeometric Distribution: “The **Hypergeometric Distribution** models the number of successes in a sample of size $n$ drawn **…” |
| The probability of drawing k type-1 items in a sample of n without replacement from N items containing K type-1 items is C(K,k)·C(N−K,n−k)/… | formula | tagged | Hypergeometric Distribution: “$$P(X = k) = \frac{\dbinom{K}{k}\dbinom{N-K}{n-k}}{\dbinom{N}{n}}$$” |
| To compute a probability with equally likely unordered selections, count the favorable combinations by choosing from each group separately,… | procedure | tagged | Combinatorics: “In probability, combinatorics determines the sizes of events and sample spaces: $P(A) = \\|A\\| / \\|S…” |
| When sampling without replacement from a small finite population, draws are not independent, so the binomial distribution does not give the… | fact | tagged | Hypergeometric Distribution: “Unlike the [[Binomial Distribution\\|Binomial]], trials are not independent.” |

</details>

<details><summary><code>p-562</code> · answerable</summary>

Tagged pages: Uniform Continuous Distribution, Conditional Probability

| Item | Kind | Status | Where |
|---|---|---|---|
| For a uniform distribution on [a, b], the probability of any interval within [a, b] equals its length divided by b − a, and the density is … | fact | tagged | Uniform Continuous Distribution: “$$f(x) = \frac{1}{b - a}, \quad a < x < b$$” |
| The conditional probability of A given B is P(A \| B) = P(A ∩ B) / P(B). | formula | tagged | Conditional Probability: “$$P(A \mid B) = \frac{P(A \cap B)}{P(B)}, \quad P(B) > 0$$” |
| To evaluate a conditional probability for a uniform random variable, find the intersection of the event and the conditioning event as an in… | procedure | tagged | Conditional Probability (collapsed): “Let $A = \{X > 700\}$ and $B = \{X > 400\}$. Since $A \subseteq B$, we have $A \cap B = A$.” |
| For X uniform on [a, b] and a < t < b, P(X > t) = (b − t)/(b − a), and for t < s, P(X > t \| X < s) uses the interval (t, s) with length s … | fact | tagged | Uniform Continuous Distribution: “$E[X] = (a+b)/2$, $\text{Var}(X) = (b-a)^2/12$, and $F(x) = (x-a)/(b-a)$ for $a < x < b$” |

</details>

<details><summary><code>p-563</code> · gap</summary>

Tagged pages: Limited Expected Value, Exponential Distribution, Payment Random Variable

| Item | Kind | Status | Where |
|---|---|---|---|
| A claim payment capped at a maximum d equals min(X, d), the loss limited at d, and its expected value is the limited expected value E[X ∧ d… | definition | tagged | Limited Expected Value: “The **Limited Expected Value** (LEV) of a random variable $X$ at limit $u$ is the expected value of…” |
| For an exponential distribution with mean β, the limited expected value at d is E[min(X,d)] = β(1 − e^{−d/β}). | formula | tagged | Limited Expected Value: “\\| Exponential$(\theta)$ \\| $\theta(1 - e^{-u/\theta})$ \\|” |
| To compute the expected value of a limited loss, split the expectation at the limit: integrate x·f(x) from 0 to d and add d times the survi… | procedure | missing |  |
| The exponential distribution with mean β has survival function S(x) = P(X > x) = e^{−x/β}. | formula | tagged | Exponential Distribution: “Work from the survival function $S(x) = e^{-x/\theta}$ rather than the CDF; almost every exponentia…” |

</details>

<details><summary><code>p-564</code> · untagged</summary>

Tagged pages: The Law of Total Probability, Exponential Distribution, Conditional Probability

| Item | Kind | Status | Where |
|---|---|---|---|
| For an exponential distribution with mean θ, the survival function is P(X > x) = e^{-x/θ}, so P(a < X < b) = e^{-a/θ} - e^{-b/θ}. | formula | tagged | Exponential Distribution: “Work from the survival function $S(x) = e^{-x/\theta}$ rather than the CDF; almost every exponentia…” |
| A mixture distribution arises when the random variable is drawn from one of several component distributions chosen with given probabilities… | definition | elsewhere | Mixture Distribution: “A **Mixture Distribution** describes a variable $X$ drawn from a population made of subpopulations …” |
| To find a probability under a mixture, compute the probability under each component distribution and weight each by its component probabili… | procedure | tagged | The Law of Total Probability: “**The Law of Total Probability** states that if $\{A_1, \ldots, A_n\}$ is a partition of the sample…” |
| A mixture of exponential distributions is not itself exponential, so one cannot replace it with a single exponential using the weighted-ave… | fact | elsewhere | Mixture Distribution: “Its density (and its [[Cumulative Distribution Function (CDF)\\|CDF]]) is the weighted average of th…” |

</details>

<details><summary><code>p-565</code> · untagged</summary>

Tagged pages: Beta, Variance and Standard Deviation, Continuous Univariate Distributions

| Item | Kind | Status | Where |
|---|---|---|---|
| The expected value of a function g(X) of a continuous random variable with density f is the integral of g(x)f(x) over the support, so E[X] … | formula | tagged | Variance and Standard Deviation: “E[X] &= \int_0^1 x \cdot 3x^2\,dx \\” |
| The variance of a random variable equals E[X^2] minus the square of E[X]. | formula | elsewhere | Variance: “Efficient computation formula: $\text{Var}(X) = E[X^2] - \mu^2$ where $\mu = E[X]$” |
| The standard deviation of a random variable is the positive square root of its variance. | definition | elsewhere | Standard Deviation: “**Standard Deviation** $\sigma$ is the positive square root of [[Variance]], measuring the typical …” |
| A density proportional to x^(a-1)(1-x)^(b-1) on [0,1] is a beta distribution with parameters a and b, with mean a/(a+b) and variance ab/[(a… | fact | tagged | Beta: “$$f(x) = \frac{x^{\alpha - 1}(1-x)^{\beta - 1}}{B(\alpha,\, \beta)}$$” |

</details>

<details><summary><code>p-566</code> · untagged</summary>

Tagged pages: Poisson Distribution, Conditional Probability

| Item | Kind | Status | Where |
|---|---|---|---|
| The Poisson distribution with mean lambda has probability mass function P[N=k] = e^{-lambda} lambda^k / k! for k = 0, 1, 2, ... | formula | tagged | Poisson Distribution: “$$P(X = k) = \frac{e^{-\lambda}\lambda^k}{k!}$$” |
| The conditional probability of A given B is P[A \| B] = P[A and B] / P[B]. | formula | tagged | Conditional Probability: “$$P(A \mid B) = \frac{P(A \cap B)}{P(B)}, \quad P(B) > 0$$” |
| If event A is a subset of event B, then P[A and B] = P[A], so P[A \| B] = P[A] / P[B]. | fact | tagged | Conditional Probability (collapsed): “Since $A \subseteq B$, we have $A \cap B = A$.” |
| The probability of 'at least k' events is found with the complement rule: P[X >= k] = 1 - P[X <= k-1], i.e. 1 minus the sum of the probabil… | fact | elsewhere | Probability Rules: “$$P(A^c) = 1 - P(A)$$” |

</details>

<details><summary><code>p-567</code> · untagged</summary>

Tagged pages: Binomial Distribution, Variance and Standard Deviation

| Item | Kind | Status | Where |
|---|---|---|---|
| The number of successes in n independent trials, each with the same success probability p, follows a binomial distribution with parameters … | fact | tagged | Binomial Distribution: “The **Binomial Distribution** $X \sim \text{Bin}(n, p)$ models the number of successes in $n$ indep…” |
| For a binomial random variable with parameters n and p, the mean is np and the variance is np(1-p). | formula | tagged | Binomial Distribution: “$E[X] = np$ and $\text{Var}(X) = np(1-p)$” |
| The variance of a random variable equals its second moment minus the square of its mean: Var(X) = E[X^2] - (E[X])^2, so E[X^2] = Var(X) + (… | formula | elsewhere | Variance: “Efficient computation formula: $\text{Var}(X) = E[X^2] - \mu^2$ where $\mu = E[X]$” |
| To find an unknown probability parameter from a given second moment, express E[X^2] in terms of the parameter using the distribution's mean… | procedure | tagged | Binomial Distribution: “$E[X] = np$ and $\text{Var}(X) = np(1-p)$” |

</details>

<details><summary><code>p-568</code> · untagged</summary>

Tagged pages: Normal Distribution, The Law of Total Probability, Conditional Probability

| Item | Kind | Status | Where |
|---|---|---|---|
| The probability that a claim occurs and exceeds a threshold equals the probability a claim occurs times the conditional probability the cla… | fact | elsewhere | Probability Multiplication Rule: “$$P(A \cap B) = P(A) \cdot P(B \mid A)$$” |
| To find a normal tail probability, standardize the value as z = (x - mean)/standard deviation and use the standard normal distribution. | procedure | tagged | Normal Distribution: “Its CDF has no closed form and is evaluated via the standard normal $Z = (X - \mu)/\sigma \sim N(0,…” |
| To solve for an unknown standard deviation, find the z-value from the standard normal table that matches the given tail probability, set it… | procedure | elsewhere | Normal Approximation (collapsed): “This is at most $0.05$ when $0.05\sqrt{n} \ge 1.645$:” |

</details>

<details><summary><code>p-569</code> · gap</summary>

Tagged pages: Independent Events, Binomial Distribution

| Item | Kind | Status | Where |
|---|---|---|---|
| The probability that all of several mutually independent events occur (or all fail to occur) is the product of their individual probabiliti… | fact | tagged | Independent Events: “$$P(A_{i_1} \cap A_{i_2} \cap \cdots \cap A_{i_m}) = P(A_{i_1})\,P(A_{i_2}) \cdots P(A_{i_m})$$” |
| For n independent Bernoulli trials with success probability p, the probability of exactly k successes is C(n,k) p^k (1-p)^(n-k). | formula | tagged | Binomial Distribution: “$$P(X = k) = \binom{n}{k} p^k (1-p)^{n-k}$$” |
| A sum of independent Bernoulli trials with different success probabilities is not binomial, so groups with different probabilities must be … | fact | tagged | Binomial Distribution: “Requires trials to be independent, each trial to have exactly two outcomes, and $p$ to be constant …” |
| To find the probability that a total count across two independent groups equals a given value, enumerate the ways the count can be split be… | procedure | missing |  |
| The probability that a count is less than two equals the sum of the probabilities that it equals zero and equals one, since these outcomes … | fact | missing |  |

</details>

<details><summary><code>p-570</code> · gap</summary>

Tagged pages: Hypergeometric Distribution, Combinatorics, Set Theory

| Item | Kind | Status | Where |
|---|---|---|---|
| If each item independently has the same probability of an event, then conditional on exactly k items having the event, the set of k affecte… | fact | missing |  |
| The number of ways to choose k items from n distinct items is the binomial coefficient C(n,k) = n!/(k!(n-k)!), and the probability of an ev… | formula | tagged | Combinatorics: “In probability, combinatorics determines the sizes of events and sample spaces: $P(A) = \\|A\\| / \\|S…” |
| To find the probability that at least one of each of two categories occurs, take the complement: subtract the probability that at least one… | procedure | missing |  |
| Inclusion–exclusion for two events: P(A∪B) = P(A) + P(B) − P(A∩B), or in counting form \|A∪B\| = \|A\| + \|B\| − \|A∩B\|. | formula | elsewhere | Inclusion-Exclusion Principle: “$$P(A \cup B) = P(A) + P(B) - P(A \cap B)$$” |
| Count the selections that avoid a given category by choosing all k items from the remaining items outside that category, and the selections… | procedure | missing |  |

</details>

<details><summary><code>p-571</code> · gap</summary>

Tagged pages: Variance and Standard Deviation, Continuous Univariate Distributions, Expected Value

| Item | Kind | Status | Where |
|---|---|---|---|
| The k-th raw moment of a continuous random variable is E[X^k] = ∫ x^k f(x) dx over the support of the density. | formula | linked | Moment: “$$\mu_n' = E[X^n] = \int_{-\infty}^{\infty} x^n f(x)\,dx$$” |
| The variance equals the second raw moment minus the square of the mean: Var(X) = E[X^2] - (E[X])^2. | formula | elsewhere | Variance: “Efficient computation formula: $\text{Var}(X) = E[X^2] - \mu^2$ where $\mu = E[X]$” |
| A valid probability density function is nonnegative and integrates to 1 over its support. | fact | tagged | Continuous Univariate Distributions: “The probability density function (PDF) $f(x)$ must satisfy $f(x) \geq 0$ and $\int_{-\infty}^{\inft…” |
| For a density defined with an absolute value, split the integral at the point where the argument changes sign and replace \|x\| with -x on … | procedure | missing |  |

</details>

<details><summary><code>p-572</code> · answerable</summary>

Tagged pages: Bayes Theorem, Poisson Distribution, The Law of Total Probability

| Item | Kind | Status | Where |
|---|---|---|---|
| For a Poisson random variable with mean lambda, P(N=0) = e^{-lambda}, from the pmf P(N=n) = e^{-lambda} lambda^n / n!. | formula | tagged | Poisson Distribution: “$$P(X = k) = \frac{e^{-\lambda}\lambda^k}{k!}$$” |
| Bayes' theorem: P(A\|B) = P(B\|A)P(A) / sum over a partition of P(B\|A_i)P(A_i), giving the posterior probability of a class after observin… | formula | tagged | Bayes Theorem: “$$= \frac{P(E \mid H)\,P(H)}{\displaystyle\sum_{i} P(E \mid H_i)\,P(H_i)}$$” |
| The law of total probability: the unconditional probability of an event is the sum of its conditional probabilities given each class of a p… | fact | tagged | The Law of Total Probability: “$$P(B) = \sum_{i=1}^{n} P(B \mid A_i)\,P(A_i)$$” |
| Treat the proportions of safe and dangerous intersections as prior probabilities (complement for the second class), and the Poisson probabi… | procedure | tagged | Bayes Theorem (collapsed): “$$P(H \mid C) = \frac{P(C \mid H)\,P(H)}{P(C)} = \frac{0.40 \times 0.20}{0.16} = \frac{0.08}{0.16} …” |

</details>

<details><summary><code>p-573</code> · untagged</summary>

Tagged pages: Poisson Distribution, Variance and Standard Deviation, Independent Random Variables

| Item | Kind | Status | Where |
|---|---|---|---|
| The sum of independent Poisson random variables is Poisson with mean equal to the sum of the individual means. | fact | elsewhere | Poisson Superposition: “a sum of independent Poisson counts is Poisson with the summed mean.” |
| For a Poisson random variable the variance equals the mean. | fact | tagged | Poisson Distribution: “A defining property is $E[X] = \text{Var}(X) = \lambda$ — the mean and variance are equal” |
| The coefficient of variation of a random variable is its standard deviation divided by its mean. | definition | linked | Coefficient of Variation: “The **Coefficient of Variation** $CV$ is the ratio of the standard deviation to the mean, measuring…” |

</details>

<details><summary><code>p-574</code> · untagged</summary>

Tagged pages: Conditional and Marginal Probability Functions, Joint Probability Function, Variance and Standard Deviation

| Item | Kind | Status | Where |
|---|---|---|---|
| The marginal distribution of one variable in a joint distribution is obtained by summing the joint probabilities over all values of the oth… | definition | linked | Marginal Probability Function: “The **marginal probability function** of $X$ is obtained from the [[Joint Probability Function]] $p…” |
| The probabilities of a joint (or any) probability distribution sum to 1, so an unknown total of missing entries can be found as 1 minus the… | fact | tagged | Joint Probability Function: “It satisfies $p(x,y) \geq 0$ for all $(x,y)$ and $\displaystyle\sum_x \sum_y p(x,y) = 1$” |
| The expected value of a discrete random variable is E[X] = sum of x * P(X=x), and E[g(X)] = sum of g(x) * P(X=x), so E[X^2] = sum of x^2 * … | formula | elsewhere | Discrete Random Variable: “Expectations are sums: $E[g(X)] = \sum_x g(x)\,p(x)$.” |
| The variance of a random variable is Var(X) = E[X^2] - (E[X])^2. | formula | tagged | Variance and Standard Deviation: “The second form $E[X^2] - \mu^2$ is the one to use in practice” |
| The variance (or any moment) of one variable in a joint distribution depends only on its marginal distribution, so individual unreadable in… | fact | linked | Marginal Probability Function: “The **marginal probability function** of $X$ is obtained from the [[Joint Probability Function]] $p…” |

</details>

<details><summary><code>p-575</code> · gap</summary>

Tagged pages: Linear Combinations of Random Variables, Normal Distribution, Independent Random Variables

| Item | Kind | Status | Where |
|---|---|---|---|
| A sum of independent normal random variables is itself normally distributed. | fact | tagged | Linear Combinations of Random Variables: “A linear combination of independent normals is exactly normal, which is what makes [[Probabilities …” |
| For a sum of n independent random variables, the mean of the sum is the sum of the means and the variance of the sum is the sum of the vari… | formula | linked | Moments for Linear Combinations: “$$E[W] = a_1 E[X_1] + a_2 E[X_2] + \cdots + a_n E[X_n]$$” |
| To find a probability for a normal random variable X, standardize by subtracting the mean and dividing by the standard deviation, so P[X > … | procedure | tagged | Normal Distribution: “Its CDF has no closed form and is evaluated via the standard normal $Z = (X - \mu)/\sigma \sim N(0,…” |
| Overall profit being positive over a period means the total (sum) of the period's profits, with losses counted as negative values, exceeds … | definition | missing |  |

</details>

<details><summary><code>p-576</code> · gap</summary>

Tagged pages: Uniform Continuous Distribution, Conditional Probability

| Item | Kind | Status | Where |
|---|---|---|---|
| A continuous uniform distribution on [0, b] has constant density 1/b, so the probability of any sub-interval equals its length divided by b. | definition | tagged | Uniform Continuous Distribution: “$$f(x) = \frac{1}{b - a}, \quad a < x < b$$” |
| The conditional probability of event A given event B is P(A \| B) = P(A ∩ B) / P(B). | formula | tagged | Conditional Probability: “$$P(A \mid B) = \frac{P(A \cap B)}{P(B)}, \quad P(B) > 0$$” |
| For a uniform distribution on [0, b], conditioning on X > a gives a uniform distribution on [a, b], so a conditional probability is the rat… | fact | tagged | Uniform Continuous Distribution: “Conditional distributions on sub-intervals are also uniform: given $X > d$, $X$ is uniform on $(d, …” |
| The event that a lifetime fails within t months is {X < t}, and that it is still working after a months is the survival event {X > a}, with… | definition | missing |  |

</details>

<details><summary><code>p-577</code> · untagged</summary>

Tagged pages: Linear Combinations of Random Variables, Variance and Standard Deviation, Independent Random Variables

| Item | Kind | Status | Where |
|---|---|---|---|
| The coefficient of variation of a random variable is its standard deviation divided by its mean. | definition | linked | Coefficient of Variation: “The **Coefficient of Variation** $CV$ is the ratio of the standard deviation to the mean, measuring…” |
| The expected value of a sum of random variables equals the sum of their expected values (linearity of expectation), regardless of dependenc… | fact | tagged | Linear Combinations of Random Variables: “**Expectation is always linear** — $E[L]$ needs no independence assumption at all.” |
| For independent random variables, the variance of the sum equals the sum of the variances (covariance is zero), so standard deviations do n… | fact | tagged | Variance and Standard Deviation: “Standard deviations do **not** add: $\text{SD}(X+Y) \neq \text{SD}(X) + \text{SD}(Y)$. Always add v…” |
| The standard deviation of a random variable is the positive square root of its variance. | definition | elsewhere | Standard Deviation: “**Standard Deviation** $\sigma$ is the positive square root of [[Variance]], measuring the typical …” |

</details>

<details><summary><code>p-578</code> · answerable</summary>

Tagged pages: Linear Combinations of Random Variables, Normal Distribution, Independent Random Variables

| Item | Kind | Status | Where |
|---|---|---|---|
| A sum of independent normal random variables is itself normally distributed. | fact | tagged | Linear Combinations of Random Variables: “A linear combination of independent normals is exactly normal, which is what makes [[Probabilities …” |
| The mean of a sum of random variables is the sum of their means: E[X+Y] = E[X] + E[Y]. | formula | tagged | Linear Combinations of Random Variables: “$$E[L] = \sum_{i=1}^{n} c_i\,E[X_i]$$” |
| For independent random variables, the variance of the sum equals the sum of the variances (standard deviations do not add). | fact | tagged | Independent Random Variables: “For independent random variables: $E[XY] = E[X]\,E[Y]$ and $\text{Var}(X + Y) = \text{Var}(X) + \te…” |
| To find a probability for a normal random variable X with mean mu and standard deviation sigma, standardize via Z = (X - mu)/sigma and eval… | procedure | tagged | Normal Distribution: “Its CDF has no closed form and is evaluated via the standard normal $Z = (X - \mu)/\sigma \sim N(0,…” |

</details>

<details><summary><code>p-579</code> · untagged</summary>

Tagged pages: Gamma, Conditional Probability, Continuous Univariate Distributions

| Item | Kind | Status | Where |
|---|---|---|---|
| The conditional probability of event A given event B is P(A\|B) = P(A ∩ B) / P(B). | definition | tagged | Conditional Probability: “$$P(A \mid B) = \frac{P(A \cap B)}{P(B)}, \quad P(B) > 0$$” |
| The survival function S(t) = P(T > t) of a continuous random variable equals the integral of its density from t to infinity. | definition | elsewhere | Survival Model: “$$S(t) = P(T > t)$$” |
| Compute the integral of u*e^{-u} (a polynomial times an exponential) using integration by parts to obtain a closed-form tail probability. | procedure | tagged | Gamma: “For **integer** $\alpha$ the CDF has a closed form via the [[Poisson Distribution\\|Poisson]] link (…” |
| For a continuous random variable, the probability of an interval is P(a < T ≤ b) = S(a) − S(b), so the conditional probability of failing b… | procedure | elsewhere | Survival Model: “$_{t}p_x = \dfrac{S(x+t)}{S(x)}$ and $_{t}q_x = 1 - {_t}p_x$” |
| A gamma distribution with shape 2 and scale 1 has density t e^{-t} for t > 0, and its survival function is (1+t)e^{-t}. | fact | elsewhere | Scale and Shape Parameters (collapsed): “For $\alpha = 2$, $S(x) = e^{-x/\theta}(1 + x/\theta)$.” |
| For a continuous random variable, P(T ≥ t) = P(T > t), since a single point has probability zero. | fact | elsewhere | Continuous Random Variable: “$P(X = c) = 0$ for every $c$, so $P(a < X < b) = P(a \le X \le b) = F(b) - F(a)$. Strict and weak i…” |

</details>

<details><summary><code>p-580</code> · answerable</summary>

Tagged pages: Linear Combinations of Random Variables, Variance and Standard Deviation, Independent Random Variables

| Item | Kind | Status | Where |
|---|---|---|---|
| For independent random variables, the variance of a linear combination is Var(a1X1 + ... + anXn) = a1^2 Var(X1) + ... + an^2 Var(Xn), so ea… | formula | tagged | Linear Combinations of Random Variables: “Coefficients enter the variance **squared**, so $\text{Var}(X - Y) = \text{Var}(X) + \text{Var}(Y)$…” |
| The variance of a random variable is the square of its standard deviation. | definition | tagged | Variance and Standard Deviation: “$$\sigma = \text{SD}(X) = \sqrt{\text{Var}(X)}$$” |
| Independence implies the covariance between distinct variables is zero, so the covariance terms drop out of the variance of a sum or linear… | fact | tagged | Independent Random Variables: “Independence implies [[Covariance]] is zero ($\text{Cov}(X,Y) = 0$), though the converse is not alw…” |

</details>

<details><summary><code>p-581</code> · answerable</summary>

Tagged pages: Covariance and Correlation Coefficient, Joint Probability Function, Moments for Joint Distributions

| Item | Kind | Status | Where |
|---|---|---|---|
| The covariance of two random variables equals E[XY] minus E[X]E[Y]. | formula | tagged | Covariance and Correlation Coefficient: “$$\text{Cov}(X, Y) = E[XY] - E[X]\,E[Y]$$” |
| For a discrete joint probability table, E[g(X,Y)] is computed by summing g(x,y) times the joint probability over all cells, so cells where … | procedure | tagged | Moments for Joint Distributions: “$$E[g(X,Y)] = \sum_x \sum_y g(x,y)\,p(x,y)$$” |
| The expected value of a single variable from a joint table is found by summing its values times the joint probabilities across the table, e… | procedure | tagged | Moments for Joint Distributions: “$$E[X] = \sum_x \sum_y x\,p(x,y)$$” |
| Zero cells in a joint probability table do not imply independence; independence requires the joint probability to equal the product of marg… | fact | tagged | Covariance and Correlation Coefficient: “$\rho_{X,Y} = 0$ means no linear relationship, but not necessarily [[Independent Random Variables\\|…” |

</details>

<details><summary><code>p-582</code> · answerable</summary>

Tagged pages: Linear Combinations of Random Variables, Variance and Standard Deviation, Independent Random Variables

| Item | Kind | Status | Where |
|---|---|---|---|
| The variance of a sum of independent random variables equals the sum of their variances. | fact | tagged | Independent Random Variables: “For independent random variables: $E[XY] = E[X]\,E[Y]$ and $\text{Var}(X + Y) = \text{Var}(X) + \te…” |
| The standard deviation of a random variable is the positive square root of its variance, so variance equals standard deviation squared. | definition | tagged | Variance and Standard Deviation: “$$\sigma = \text{SD}(X) = \sqrt{\text{Var}(X)}$$” |
| For n independent identically distributed components with a total of known standard deviation, square the total's standard deviation to get… | procedure | tagged | Linear Combinations of Random Variables (collapsed): “So $\text{SD}(\bar{X}) = 20$. Averaging leaves the mean alone but divides the standard deviation by…” |

</details>

<details><summary><code>p-583</code> · answerable</summary>

Tagged pages: Uniform Continuous Distribution, Conditional Probability, Percentile

| Item | Kind | Status | Where |
|---|---|---|---|
| A continuous uniform distribution on [a,b] has constant density 1/(b-a) on the interval, and its CDF is (x-a)/(b-a) for x between a and b. | definition | tagged | Uniform Continuous Distribution: “$$f(x) = \frac{1}{b - a}, \quad a < x < b$$” |
| A uniform distribution on [a,b] is symmetric, so its median equals its mean and midpoint (a+b)/2; a probability of 0.5 below a point places… | fact | tagged | Uniform Continuous Distribution: “$E[X] = (a+b)/2$, $\text{Var}(X) = (b-a)^2/12$, and $F(x) = (x-a)/(b-a)$ for $a < x < b$” |
| For X uniform on [a,b], P[X > c] = (b - c)/(b - a) for c within the interval. | formula | tagged | Uniform Continuous Distribution (collapsed): “The probability of exceeding the deductible is $P(X > 300) = 700/1000 = 0.7$” |
| The conditional probability is P[A \| B] = P[A ∩ B] / P[B]. | formula | tagged | Conditional Probability: “$$P(A \mid B) = \frac{P(A \cap B)}{P(B)}, \quad P(B) > 0$$” |
| If X is uniform on [a,b], then conditional on X lying in a subinterval (c,b), X is uniform on that subinterval, so conditional probabilitie… | fact | tagged | Uniform Continuous Distribution: “Conditional distributions on sub-intervals are also uniform: given $X > d$, $X$ is uniform on $(d, …” |

</details>

<details><summary><code>p-584</code> · untagged</summary>

Tagged pages: Poisson Distribution, Variance and Standard Deviation, Independent Random Variables

| Item | Kind | Status | Where |
|---|---|---|---|
| For a Poisson distribution with mean lambda, the probability of zero events is P[N=0] = e^{-lambda}. | formula | tagged | Poisson Distribution: “$$P(X = k) = \frac{e^{-\lambda}\lambda^k}{k!}$$” |
| The probability of at least one event equals one minus the probability of no events (complement rule), so P[N>=1] = 1 - P[N=0]. | fact | elsewhere | Probability Rules: “$$P(A^c) = 1 - P(A)$$” |
| The sum of independent Poisson random variables is Poisson with mean equal to the sum of the individual means. | fact | elsewhere | Poisson Superposition: “a sum of independent Poisson counts is Poisson with the summed mean.” |
| For a Poisson distribution the variance equals the mean. | fact | tagged | Poisson Distribution: “A defining property is $E[X] = \text{Var}(X) = \lambda$ — the mean and variance are equal” |

</details>

<details><summary><code>p-585</code> · gap</summary>

Tagged pages: Conditional Probability, Continuous Univariate Distributions

| Item | Kind | Status | Where |
|---|---|---|---|
| The conditional probability of event A given event B is P(A\|B) = P(A ∩ B) / P(B), provided P(B) > 0. | formula | tagged | Conditional Probability: “$$P(A \mid B) = \frac{P(A \cap B)}{P(B)}, \quad P(B) > 0$$” |
| To simplify a conditional probability involving two overlapping intervals, intersect the intervals so the numerator event becomes the overl… | procedure | missing |  |
| The cumulative distribution function of a continuous random variable is obtained by integrating its density from the lower end of the suppo… | formula | tagged | Continuous Univariate Distributions: “The CDF and the density are two views of the same object: $F(x) = \int_{-\infty}^{x} f(t)\,dt$ and …” |
| For a continuous random variable, P(a < Y < b) = F(b) − F(a), and endpoints do not affect the probability. | fact | elsewhere | Cumulative Distribution Function (CDF) (collapsed): “$$P(2 \leq X \leq 4) = F(4) - F(2) = \frac{4}{5} - \frac{2}{5} = \frac{2}{5} = 0.4$$” |
| A valid density integrates to 1 over its support, so the CDF equals 1 at the upper end of the support. | fact | elsewhere | Probability Density Function (PDF): “The PDF must satisfy $f(x) \geq 0$ and $\int_{-\infty}^{\infty} f(x)\, dx = 1$” |

</details>

<details><summary><code>p-586</code> · gap</summary>

Tagged pages: Deductible, Payment Random Variable, Exponential Distribution

| Item | Kind | Status | Where |
|---|---|---|---|
| With a deductible d and coinsurance rate c, the payment per loss X above the deductible is Y = c(X - d); to find P(Y > y), solve the inequa… | procedure | tagged | Payment Random Variable: “$$Y = \alpha\,\min\!\bigl((X-d)_+,\; u\bigr) \quad \text{(limit on the covered amount)}$$” |
| A coinsurance factor c means the insurer pays the fraction c of the loss amount remaining after the deductible is applied, so the deductibl… | definition | linked | Coinsurance Percentage: “**Exam P ($\alpha$):** the fraction of the covered loss (after any deductible) that the insurer agr…” |
| For an exponential distribution with mean θ, the survival function is P(X > x) = e^{-x/θ}. | formula | tagged | Exponential Distribution: “Work from the survival function $S(x) = e^{-x/\theta}$ rather than the CDF; almost every exponentia…” |
| The loss amounts and the deductible must be expressed in the same units (e.g., thousands) before comparing them or computing probabilities. | fact | missing |  |

</details>

<details><summary><code>p-587</code> · untagged</summary>

Tagged pages: Conditional and Marginal Probability Functions, Joint Probability Function, Variance and Standard Deviation

| Item | Kind | Status | Where |
|---|---|---|---|
| To find the marginal distribution of one variable from a joint probability table, sum the joint probabilities over all values of the other … | procedure | tagged | Conditional and Marginal Probability Functions: “The marginal is found by summing (or integrating, in the continuous case) the [[Joint Probability F…” |
| The probabilities of a valid probability distribution (all outcomes of the joint table) must sum to 1, which gives an equation for unknown … | fact | tagged | Joint Probability Function: “It satisfies $p(x,y) \geq 0$ for all $(x,y)$ and $\displaystyle\sum_x \sum_y p(x,y) = 1$” |
| The mean of a discrete random variable is E[X] = sum of x times P(X = x) over all possible values x. | formula | elsewhere | Discrete Random Variable: “Expectations are sums: $E[g(X)] = \sum_x g(x)\,p(x)$.” |
| The variance of a discrete random variable is Var(X) = E[(X - μ)^2] = sum of (x - μ)^2 P(X = x) (equivalently E[X^2] - (E[X])^2). | formula | tagged | Variance and Standard Deviation: “$$\sigma^2 = \text{Var}(X) = E\left[(X - \mu)^2\right]$$” |

</details>

<details><summary><code>p-588</code> · gap</summary>

Tagged pages: Exponential Distribution, Linear Combinations of Random Variables, Variance and Standard Deviation

| Item | Kind | Status | Where |
|---|---|---|---|
| The time until the nth failure when failed items are replaced immediately is the sum of the n individual lifetimes. | fact | missing |  |
| An exponential distribution with mean θ has variance θ², so its standard deviation equals its mean. | fact | tagged | Exponential Distribution: “$E[X] = \theta$, $\text{Var}(X) = \theta^2$, and $F(x) = 1 - e^{-x/\theta}$” |
| The variance of a sum of independent random variables equals the sum of their variances. | fact | linked | Independent Random Variables: “For independent random variables: $E[XY] = E[X]\,E[Y]$ and $\text{Var}(X + Y) = \text{Var}(X) + \te…” |
| The standard deviation of a random variable is the square root of its variance. | definition | tagged | Variance and Standard Deviation: “Variance is the expected squared deviation; standard deviation is its square root, restored to the …” |

</details>

<details><summary><code>p-589</code> · untagged</summary>

Tagged pages: Deductible, Payment Random Variable, Poisson Distribution

| Item | Kind | Status | Where |
|---|---|---|---|
| For a compound (random sum) model with the number of losses independent of the iid loss amounts, the expected aggregate amount equals the e… | fact | elsewhere | Aggregate Loss Model: “$$E[S] = E[N] \cdot E[X]$$” |
| The mean of a Poisson distribution equals its parameter λ, so the expected number of claims is λ. | fact | tagged | Poisson Distribution: “A defining property is $E[X] = \text{Var}(X) = \lambda$ — the mean and variance are equal” |
| With an ordinary deductible d, the payment per loss is (X − d)+, equal to zero when the loss is below d and X − d when the loss exceeds d. | definition | tagged | Deductible: “If the loss $X$ is less than or equal to the deductible $d$, the insurer pays nothing; above $d$ it…” |
| The expected payment per loss with deductible d is E[(X−d)+] = ∫_d^∞ (x−d) f(x) dx, integrating the density only over losses above d (equiv… | formula | linked | Loss Random Variable: “$$E[Y] = E[\max(X - 500,\, 0)] = \int_{500}^{\infty}(x-500)\cdot\frac{1}{1000}e^{-x/1000}\,dx = 100…” |

</details>

<details><summary><code>p-590</code> · untagged</summary>

Tagged pages: Geometric Distribution, Independent Events, Binomial Distribution

| Item | Kind | Status | Where |
|---|---|---|---|
| For independent trials, the probability that all outcomes are the same (all successes) is the product of the individual probabilities, so f… | fact | tagged | Geometric Distribution: “The survival function is clean: $P(X > n) = (1-p)^n$ — "the first $n$ trials all failed."” |
| The probability of a union of mutually exclusive events (e.g., all heads or all tails) is the sum of their probabilities. | fact | elsewhere | Mutually Exclusive Events: “For mutually exclusive events, the [[Probability Addition Rule]] simplifies to $P(A \cup B) = P(A) …” |
| The probability of the complement of an event equals one minus the probability of the event. | fact | elsewhere | Probability Rules: “$$P(A^c) = 1 - P(A)$$” |
| The event that a process lasts exactly k rounds, with each round independently continuing with probability q, is that the first k-1 rounds … | procedure | tagged | Geometric Distribution: “$$P(X = k) = (1-p)^{k-1}p, \quad k = 1, 2, 3, \ldots$$” |

</details>

<details><summary><code>p-591</code> · gap</summary>

Tagged pages: Normal Distribution, Percentile

| Item | Kind | Status | Where |
|---|---|---|---|
| The standard deviation of a distribution is the square root of its variance. | definition | elsewhere | Variance and Standard Deviation: “$$\sigma = \text{SD}(X) = \sqrt{\text{Var}(X)}$$” |
| If X is normal with mean mu and standard deviation sigma, then Z = (X - mu)/sigma is standard normal, so an interval centered at the mean h… | fact | tagged | Normal Distribution: “Its CDF has no closed form and is evaluated via the standard normal $Z = (X - \mu)/\sigma \sim N(0,…” |
| To find a symmetric interval around the mean containing probability p, set Phi(z) - Phi(-z) = p, which gives Phi(z) = (1 + p)/2 by symmetry… | procedure | missing |  |
| Find the z-value for a given cumulative probability by looking up the inverse of the standard normal CDF (percentile) in the standard norma… | procedure | tagged | Percentile: “When $F$ is continuous and strictly increasing, it is the value that solves $F(x_p) = p$, found by …” |

</details>

<details><summary><code>p-592</code> · untagged</summary>

Tagged pages: Binomial Distribution

| Item | Kind | Status | Where |
|---|---|---|---|
| The number of successes in n independent trials, each with the same success probability p, follows a binomial distribution with parameters … | fact | tagged | Binomial Distribution: “The **Binomial Distribution** $X \sim \text{Bin}(n, p)$ models the number of successes in $n$ indep…” |
| The binomial probability mass function is P[X = i] = C(n,i) p^i (1-p)^(n-i) for i = 0, 1, ..., n. | formula | tagged | Binomial Distribution: “$$P(X = k) = \binom{n}{k} p^k (1-p)^{n-k}$$” |
| The mode of a discrete distribution is the value with the highest probability mass. | definition | elsewhere | Mode: “The **Mode** of a [[Random Variable]] $X$ is the value at which its [[Probability Mass Function (PM…” |
| The mean of a binomial distribution is np. | formula | tagged | Binomial Distribution: “$E[X] = np$ and $\text{Var}(X) = np(1-p)$” |
| To find the mode of a binomial, evaluate the pmf at integers near the mean and compare the values until the probabilities stop increasing a… | procedure | elsewhere | Mode: “compare neighbouring probabilities. For the [[Poisson Distribution\\|Poisson]], $p(k)/p(k-1) = \lamb…” |
| The binomial pmf is unimodal: it increases up to the mode and then decreases, so once it turns over no later value can be larger. | fact | elsewhere | Mode (collapsed): “Probabilities rise up to $k = 2$ and fall after, so the mode is $\lfloor 2.6 \rfloor = 2$.” |
| The mode of a binomial distribution with parameters n and p is floor((n+1)p) (when (n+1)p is not an integer). | formula | elsewhere | Mode: “For the [[Binomial Distribution\\|binomial]] the same argument gives $\lfloor (n+1)p \rfloor$ (and $…” |

</details>

<details><summary><code>p-593</code> · gap</summary>

Tagged pages: Normal Distribution, Percentile

| Item | Kind | Status | Where |
|---|---|---|---|
| The p-th percentile of a distribution is the value x such that P[X < x] = p. | definition | tagged | Percentile: “When $F$ is continuous and strictly increasing, it is the value that solves $F(x_p) = p$, found by …” |
| To compute probabilities for a normal random variable X with mean mu and standard deviation sigma, standardize via Z = (X - mu)/sigma and u… | procedure | tagged | Normal Distribution: “Its CDF has no closed form and is evaluated via the standard normal $Z = (X - \mu)/\sigma \sim N(0,…” |
| Given a known percentile of a normal distribution with known mean, find the unknown standard deviation by setting the standardized value eq… | procedure | tagged | Percentile (collapsed): “The 95th percentile of the standard normal is $z_{0.95} = 1.645$. Transform back with $\sigma = 15$:” |
| The standard normal distribution is symmetric about 0, so Phi(-z) = 1 - Phi(z) and quantiles below the median (probability under 0.5) are n… | fact | tagged | Normal Distribution: “Symmetry gives $\Phi(-z) = 1 - \Phi(z)$ — the identity needed for every negative $z$, since standar…” |
| Percentiles of a normal distribution are not proportional to the values they mark, because the normal cdf is nonlinear. | fact | missing |  |

</details>

<details><summary><code>p-594</code> · gap</summary>

Tagged pages: Hypergeometric Distribution, Combination

| Item | Kind | Status | Where |
|---|---|---|---|
| The number of ways to choose k items from n distinct items without regard to order is the binomial coefficient C(n,k) = n!/(k!(n-k)!). | formula | tagged | Combination: “$$\binom{n}{k} = \frac{n!}{k!\,(n-k)!}$$” |
| When all equally likely hands are drawn without replacement, the probability of an event equals the number of favorable hands divided by th… | fact | elsewhere | Probability: “$$P(E) = \frac{\\|E\\|}{\\|S\\|}$$” |
| Under the multivariate hypergeometric distribution, the probability of drawing k1, k2, ..., km items from groups of sizes K1, ..., Km in a … | formula | missing |  |
| To handle conditions like 'no aces or jacks', partition the deck into categories (kings, excluded cards, all other cards) and choose zero c… | procedure | missing |  |
| An 'at least m' event is computed by summing the probabilities of each disjoint case for the counts m up to the maximum possible (here, exa… | procedure | missing |  |

</details>

<details><summary><code>p-595</code> · answerable</summary>

Tagged pages: Uniform Continuous Distribution, Percentile

| Item | Kind | Status | Where |
|---|---|---|---|
| The statement 'no more than p of values exceed y' means y is at least the (1-p) percentile, so the smallest such y is the (1-p)th percentil… | fact | tagged | Percentile: “Percentiles describe tail behavior and underlie actuarial risk measures such as Value at Risk (VaR)…” |
| For a continuous uniform distribution on [a, b], the CDF is P[X < y] = (y - a)/(b - a) for a ≤ y ≤ b. | formula | tagged | Uniform Continuous Distribution: “$E[X] = (a+b)/2$, $\text{Var}(X) = (b-a)^2/12$, and $F(x) = (x-a)/(b-a)$ for $a < x < b$” |
| To find the p-th percentile of a continuous uniform distribution on [a, b], set the CDF equal to p and solve, giving y = a + p(b - a), meas… | procedure | tagged | Percentile: “When $F$ is continuous and strictly increasing, it is the value that solves $F(x_p) = p$, found by …” |

</details>

<details><summary><code>p-596</code> · gap</summary>

Tagged pages: Normal Distribution

| Item | Kind | Status | Where |
|---|---|---|---|
| A normal random variable X with mean mu and variance sigma^2 is described by the notation N(mu, sigma^2), and its standard deviation sigma … | definition | tagged | Normal Distribution: “The **Normal Distribution** $X \sim N(\mu, \sigma^2)$ is a symmetric, bell-shaped continuous distri…” |
| To compute probabilities for a normal random variable, standardize it by Z = (X - mu)/sigma, which follows the standard normal distribution. | procedure | tagged | Normal Distribution: “Its CDF has no closed form and is evaluated via the standard normal $Z = (X - \mu)/\sigma \sim N(0,…” |
| Given an upper-tail probability P[X > x] = p for a normal variable, use the standard normal table inversely to find the z-value with P[Z > … | procedure | elsewhere | Normal Approximation: “Inverted, it sets a fund: the total exceeded with probability $\alpha$ is about $n\mu + z_{1-\alpha…” |
| Two probability statements about a normal variable give two equations in mu and sigma, which can be solved simultaneously (e.g., by dividin… | procedure | missing |  |
| The variance of a normal distribution is the square of its standard deviation, so after solving for sigma it must be squared to obtain the … | fact | elsewhere | Standard Deviation (SD): “The **standard deviation** ($\sigma$) is the positive square root of the [[Variance]]” |

</details>

<details><summary><code>p-597</code> · gap</summary>

Tagged pages: Uniform Continuous Distribution, Deductible

| Item | Kind | Status | Where |
|---|---|---|---|
| The mean of a uniform distribution on [a, b] is (a + b)/2. | formula | tagged | Uniform Continuous Distribution: “$E[X] = (a+b)/2$, $\text{Var}(X) = (b-a)^2/12$, and $F(x) = (x-a)/(b-a)$ for $a < x < b$” |
| The density of a uniform distribution on [a, b] is constant and equals 1/(b - a) on the interval. | fact | tagged | Uniform Continuous Distribution: “$$f(x) = \frac{1}{b - a}, \quad a < x < b$$” |
| Under an ordinary deductible d, the claim payment for a loss X is max(X - d, 0), which is zero when the loss is below the deductible and X … | definition | tagged | Deductible: “If the loss $X$ is less than or equal to the deductible $d$, the insurer pays nothing; above $d$ it…” |
| The expected payment per loss under a deductible d is computed as the integral of (x - d) times the density over the range x > d, ignoring … | procedure | tagged | Deductible: “If the loss $X$ is less than or equal to the deductible $d$, the insurer pays nothing; above $d$ it…” |
| With a deductible of 0, the expected claim payment equals the expected loss, E[X]. | fact | missing |  |

</details>

<details><summary><code>p-598</code> · gap</summary>

Tagged pages: Normal Distribution

| Item | Kind | Status | Where |
|---|---|---|---|
| The second moment of a random variable equals its variance plus the square of its mean: E(X^2) = Var(X) + (E X)^2 = sigma^2 + mu^2. | formula | elsewhere | Variance: “Efficient computation formula: $\text{Var}(X) = E[X^2] - \mu^2$ where $\mu = E[X]$” |
| Standardize a normal random variable via Z = (X - mu)/sigma to convert a probability statement about X into one about the standard normal Z. | procedure | tagged | Normal Distribution: “Its CDF has no closed form and is evaluated via the standard normal $Z = (X - \mu)/\sigma \sim N(0,…” |
| Given a normal probability, use the standard normal table inversely to find the percentile z-value, using symmetry (P[Z > -z] = P[Z < z]) t… | procedure | tagged | Normal Distribution: “Symmetry gives $\Phi(-z) = 1 - \Phi(z)$ — the identity needed for every negative $z$, since standar…” |
| With two unknown parameters (mu and sigma), set up two equations from the given information (a moment and a probability) and solve them sim… | procedure | missing |  |

</details>

<details><summary><code>p-599</code> · gap</summary>

Tagged pages: Exponential Distribution, Percentile

| Item | Kind | Status | Where |
|---|---|---|---|
| An exponential distribution with mean mu has cdf F(x) = 1 - e^{-x/mu} for x >= 0. | formula | tagged | Exponential Distribution: “$E[X] = \theta$, $\text{Var}(X) = \theta^2$, and $F(x) = 1 - e^{-x/\theta}$” |
| The p-th percentile of a continuous distribution is the value x at which the cdf equals p, i.e. F(x) = p. | definition | tagged | Percentile: “When $F$ is continuous and strictly increasing, it is the value that solves $F(x_p) = p$, found by …” |
| To find a percentile of an exponential distribution, set F(x) = p and solve for x, giving x = -mu ln(1 - p). | procedure | tagged | Percentile: “When $F$ is continuous and strictly increasing, it is the value that solves $F(x_p) = p$, found by …” |
| The difference of logarithms equals the logarithm of the ratio: ln a - ln b = ln(a/b). | fact | missing |  |

</details>

<details><summary><code>p-600</code> · gap</summary>

Tagged pages: Geometric Distribution, Cumulative Distribution Function (CDF)

| Item | Kind | Status | Where |
|---|---|---|---|
| For a continuous random variable, P(X < x) equals the CDF F(x), since P(X = x) = 0. | fact | missing |  |
| With a maximum reimbursement limit m, a loss is fully reimbursed when it is below m, so its probability is F(m), and the complement 1 - F(m… | procedure | elsewhere | Policy Limit: “the insurer pays the whole loss $X$ when it is below $u$ and pays $u$ when it is not” |
| For independent trials with a constant success probability, the number of trials up to and including the first success follows a geometric … | fact | tagged | Geometric Distribution: “The **Geometric Distribution** $X \sim \text{Geom}(p)$ counts the number of independent Bernoulli t…” |
| The probability that the first success occurs on trial k is (1-p)^(k-1) p, where p is the success probability; equivalently, the product of… | formula | tagged | Geometric Distribution: “$$P(X = k) = (1-p)^{k-1}p, \quad k = 1, 2, 3, \ldots$$” |

</details>

<details><summary><code>p-601</code> · gap</summary>

Tagged pages: Deductible, Expected Value

| Item | Kind | Status | Where |
|---|---|---|---|
| For an ordinary deductible d, the policy payout for a loss X is max(X - d, 0), so losses at or below the deductible pay nothing. | definition | tagged | Deductible: “$$= \max(X - d,\ 0)$$” |
| The expected payout per loss with deductible d is E[(X-d)+] = the integral from d to infinity of (x-d) f(x) dx, which equals the integral f… | formula | missing |  |
| When the density is zero below a threshold, the integral for the expected payout starts at the larger of the deductible and the threshold; … | fact | missing |  |
| Evaluate an improper integral of a power function by finding the antiderivative of x^(-n) and applying limits at the deductible and infinit… | procedure | missing |  |

</details>

<details><summary><code>p-602</code> · gap</summary>

Tagged pages: Discrete Univariate Distributions, Probability Mass Function (PMF)

| Item | Kind | Status | Where |
|---|---|---|---|
| A discrete probability distribution assigns probabilities to each possible number of events (e.g., accidents), and these probabilities are … | definition | tagged | Discrete Univariate Distributions: “The PMF must satisfy $f(k) \geq 0$ for all $k$ and $\sum_{k} f(k) = 1$:” |
| Translate verbal ratio conditions between probabilities of outcomes (e.g., 'P of A is k times P of B') into equations, and express all prob… | procedure | missing |  |
| The probability of 'n or fewer' events is the cumulative probability, equal to the sum of the probabilities of the mutually exclusive outco… | fact | tagged | Discrete Univariate Distributions (collapsed): “$$P(X \leq 3) = F(3) = \frac{1}{10}(1+2+3) = \frac{6}{10} = 0.6$$” |
| A cumulative probability for a smaller set of outcomes (a subset event) cannot exceed the cumulative probability of the larger event contai… | fact | tagged | Discrete Univariate Distributions: “$$= \sum_{k \leq x} f(k)$$” |

</details>

<details><summary><code>p-603</code> · gap</summary>

Tagged pages: Bayes Theorem, Poisson Distribution

| Item | Kind | Status | Where |
|---|---|---|---|
| For a Poisson random variable with mean λ, P(N = k) = e^{-λ} λ^k / k!, so P(N = 0) = e^{-λ}. | formula | tagged | Poisson Distribution: “$$P(X = k) = \frac{e^{-\lambda}\lambda^k}{k!}$$” |
| To find an unknown Poisson mean from a condition on the probability of zero events, set e^{-λ} equal to the stated probability and solve fo… | procedure | missing |  |
| Bayes' theorem: P(A \| B) = P(B \| A)P(A) / [P(B \| A)P(A) + P(B \| A^c)P(A^c)], where A and A^c partition the population. | formula | tagged | Bayes Theorem: “$$= \frac{P(E \mid H)\,P(H)}{\displaystyle\sum_{i} P(E \mid H_i)\,P(H_i)}$$” |
| To compute the posterior probability of a risk class given an observed claim count, use the class proportions as prior probabilities and th… | procedure | elsewhere | Posterior Distribution (collapsed): “The posterior probabilities are $0.12281/0.20513 = 0.5987$ (good) and $0.08232/0.20513 = 0.4013$ (b…” |

</details>

<details><summary><code>p-604</code> · untagged</summary>

Tagged pages: Poisson Distribution, Independent Events

| Item | Kind | Status | Where |
|---|---|---|---|
| The sum of independent Poisson random variables is Poisson with mean equal to the sum of the individual means. | fact | elsewhere | Poisson Superposition: “a sum of independent Poisson counts is Poisson with the summed mean.” |
| For a Poisson random variable with mean lambda, P(N=k) = e^{-lambda} lambda^k / k!, so P(N=0) = e^{-lambda}. | formula | tagged | Poisson Distribution: “$$P(X = k) = \frac{e^{-\lambda}\lambda^k}{k!}$$” |
| Conditioning on an event that depends only on an independent variable (e.g., one month's count) does not change the probability of an event… | fact | tagged | Independent Events: “When $P(A) > 0$ and $P(B) > 0$, independence means $P(A \mid B) = P(A)$ and $P(B \mid A) = P(B)$” |
| Find the Poisson mean for a sub-period by scaling: with equal monthly means, the no-event probability for a k-month period is e^{-k*lambda}… | procedure | elsewhere | Compound Poisson Process: “$$S(t) = \sum_{i=1}^{N(t)} X_i, \qquad N(t) \sim \text{Poi}(\lambda t)$$” |

</details>

<details><summary><code>p-605</code> · untagged</summary>

Tagged pages: Bayes Theorem, Exponential Distribution

| Item | Kind | Status | Where |
|---|---|---|---|
| For an exponential distribution with mean μ, the cumulative distribution function is P[T < t] = 1 - e^{-t/μ}. | formula | tagged | Exponential Distribution: “$E[X] = \theta$, $\text{Var}(X) = \theta^2$, and $F(x) = 1 - e^{-x/\theta}$” |
| Bayes' theorem: P(A \| E) = P(E \| A)P(A) / Σ_i P(E \| B_i)P(B_i), where the B_i partition the sample space. | formula | tagged | Bayes Theorem: “$$= \frac{P(E \mid H)\,P(H)}{\displaystyle\sum_{i} P(E \mid H_i)\,P(H_i)}$$” |
| The law of total probability gives the unconditional probability of an event as the sum over a partition of the conditional probability of … | formula | linked | The Law of Total Probability: “$$P(B) = \sum_{i=1}^{n} P(B \mid A_i)\,P(A_i)$$” |
| Treat the sales mix (e.g., 10%/90% by brand) as prior probabilities of each category, and use each category's conditional probability of th… | procedure | elsewhere | Posterior Distribution: “With a discrete prior (risk classes) the integral is a sum.” |

</details>

<details><summary><code>p-606</code> · gap</summary>

Tagged pages: Variance for Conditional and Marginal Distributions, Conditional and Marginal Probability Functions

| Item | Kind | Status | Where |
|---|---|---|---|
| The conditional probability function of X given Y=y is the joint probability p(x,y) divided by the marginal probability P(Y=y). | definition | tagged | Conditional and Marginal Probability Functions: “$$p_{X \mid Y}(x \mid y) = \frac{p_{X,Y}(x, y)}{p_Y(y)}$$” |
| Obtain the marginal probability of Y=y from a joint probability table by summing p(x,y) over all values of x in that column. | procedure | linked | Marginal Probability Function: “Similarly $p_Y(y) = \sum_x p(x,y)$” |
| The conditional expectation of a function of X given Y=y is the sum of that function of x times the conditional probability p(x\|y), e.g. E… | formula | tagged | Variance for Conditional and Marginal Distributions (collapsed): “Then $E[X \mid Y=2] = 0(0.2)+1(0.8) = 0.8$ and $E[X^2 \mid Y=2] = 0.8$.” |
| The conditional variance is Var(X\|Y=y) = E[X²\|Y=y] − (E[X\|Y=y])². | formula | tagged | Variance for Conditional and Marginal Distributions: “$$\text{Var}(X \mid Y=y) = E[X^2 \mid Y=y] - \bigl(E[X \mid Y=y]\bigr)^2$$” |
| Evaluate a joint probability function formula at each support point (x,y) to build the table of joint probabilities, using a common denomin… | procedure | missing |  |

</details>

<details><summary><code>p-607</code> · gap</summary>

Tagged pages: Probability Addition Rule, Mutually Exclusive Events

| Item | Kind | Status | Where |
|---|---|---|---|
| The probability of a union of mutually exclusive (disjoint) events equals the sum of their individual probabilities, so probabilities of ad… | fact | tagged | Mutually Exclusive Events: “The addition rule simplification extends to any finite collection: if $A_1, A_2, \ldots, A_n$ are p…” |
| If event B is a subset of event A, then P(A \ B) = P(A) - P(B). | fact | missing |  |
| To find the probability of a target region that cannot be obtained directly, express it as a set difference of unions of the given interval… | procedure | missing |  |
| For a continuous random variable such as call duration T, the probability that T falls in a half-open interval [a, b) is the probability ma… | definition | missing |  |

</details>

<details><summary><code>p-608</code> · gap</summary>

Tagged pages: Binomial Distribution

| Item | Kind | Status | Where |
|---|---|---|---|
| The number of successes among n independent trials, each with the same success probability p, follows a binomial distribution with paramete… | fact | tagged | Binomial Distribution: “The **Binomial Distribution** $X \sim \text{Bin}(n, p)$ models the number of successes in $n$ indep…” |
| For a binomial distribution with parameters n and p, P(N = k) = C(n,k) p^k (1-p)^(n-k). | formula | tagged | Binomial Distribution: “$$P(X = k) = \binom{n}{k} p^k (1-p)^{n-k}$$” |
| To find an unknown binomial probability from a stated ratio of two binomial probabilities, write the ratio of the two pmf expressions so th… | procedure | missing |  |
| The binomial coefficient is C(n,k) = n! / (k!(n-k)!), so for example C(6,0)=1, C(6,1)=6 and C(6,3)=20. | formula | missing |  |

</details>

<details><summary><code>p-609</code> · untagged</summary>

Tagged pages: Deductible, Cumulative Distribution Function (CDF)

| Item | Kind | Status | Where |
|---|---|---|---|
| A valid cumulative distribution function of a random variable bounded above by a maximum value equals 1 at that maximum, which can be used … | fact | tagged | Cumulative Distribution Function (CDF): “$\lim_{x \to -\infty} F(x) = 0$ and $\lim_{x \to \infty} F(x) = 1$” |
| With an ordinary per-loss deductible d, the insurer pays something on a loss only when the loss X exceeds d, so the probability of a paymen… | fact | tagged | Deductible: “If the loss $X$ is less than or equal to the deductible $d$, the insurer pays nothing; above $d$ it…” |
| The survival probability is the complement of the CDF: P(X > x) = 1 - F(x). | formula | elsewhere | Deductible Rating: “so each extra dollar of deductible eliminates $1 - F(D)$ per claim — the chance a loss exceeds $D$” |

</details>

<details><summary><code>p-610</code> · gap</summary>

Tagged pages: Uniform Continuous Distribution, Limited Expected Value

| Item | Kind | Status | Where |
|---|---|---|---|
| A policy with a maximum (policy limit) m pays min(X, m): the full loss when the loss is below m, and m when the loss exceeds m. | definition | elsewhere | Policy Limit: “Under a limit $u$ and no other modification, the insurer pays the whole loss $X$ when it is below $…” |
| The expected value of a function g(X) of a continuous random variable with density f is the integral of g(x)f(x) over the support; for a ca… | formula | elsewhere | Expected Value: “\int_{-\infty}^{\infty} x\, f(x)\, dx & \text{(continuous)}” |
| A uniform distribution on [a, b] has constant density 1/(b−a) on the interval and zero elsewhere, so P(X>m) = (b−m)/(b−a). | definition | tagged | Uniform Continuous Distribution: “$$f(x) = \frac{1}{b - a}, \quad a < x < b$$” |
| A solution of a quadratic equation that lies outside the support of the loss distribution (e.g., a limit above the maximum possible loss) i… | fact | missing |  |

</details>

<details><summary><code>p-611</code> · answerable</summary>

Tagged pages: Percentile, Probability Density Function (PDF)

| Item | Kind | Status | Where |
|---|---|---|---|
| A probability density function must integrate to 1 over its support, which is used to solve for an unknown constant in the density. | fact | tagged | Probability Density Function (PDF): “The PDF must satisfy $f(x) \geq 0$ and $\int_{-\infty}^{\infty} f(x)\, dx = 1$” |
| The cdf of a continuous random variable is the integral of its density from the lower end of the support up to x: F(x) = ∫ f(y) dy from the… | formula | linked | Cumulative Distribution Function (CDF): “For a continuous random variable, $F(x) = \int_{-\infty}^{x} f(t)\, dt$” |
| The p-th percentile of a distribution is the value m satisfying F(m) = p. | definition | tagged | Percentile: “When $F$ is continuous and strictly increasing, it is the value that solves $F(x_p) = p$, found by …” |
| For a piecewise density, evaluate the cdf at the breakpoint to determine which piece contains the target percentile, then solve F(m) = p us… | procedure | tagged | Percentile (collapsed): “Since $F_Y(0) = 0.1813 \ge 0.10$, the 10th percentile is $y_{0.10} = 0$, even though $F_Y(y) = 0.10…” |

</details>

<details><summary><code>p-612</code> · untagged</summary>

Tagged pages: Exponential Distribution, Expected Value

| Item | Kind | Status | Where |
|---|---|---|---|
| The density f(x)=c e^{-cx} for x>0 is the exponential distribution with rate c (mean 1/c), with CDF F(x)=1-e^{-cx}. | definition | tagged | Exponential Distribution: “Some texts parameterize by **rate** $\lambda = 1/\theta$, so $f(x) = \lambda e^{-\lambda x}$ and $E…” |
| The median of a continuous distribution is the value m satisfying F(m)=0.5. | definition | elsewhere | Median: “For a continuous distribution that is the point where $F(m) = 0.5$, splitting the probability in ha…” |
| Solve for the exponential rate parameter by setting the CDF at the given median equal to 0.5, giving c = ln 2 / median. | procedure | elsewhere | Median: “For the [[Exponential Distribution\\|exponential]], $m = \theta \ln 2 \approx 0.693\theta$ against a…” |
| The expected value of a discrete-valued payment is the sum of each payment amount times the probability of that amount occurring; zero paym… | formula | tagged | Expected Value (collapsed): “$$E[X] = 0(0.5) + 100(0.3) + 500(0.2) = 0 + 30 + 100 = 130$$” |
| The probability that a continuous random variable falls in an interval (a, b] equals F(b) - F(a). | formula | elsewhere | Cumulative Distribution Function (CDF) (collapsed): “$$P(2 \leq X \leq 4) = F(4) - F(2) = \frac{4}{5} - \frac{2}{5} = \frac{2}{5} = 0.4$$” |

</details>

<details><summary><code>p-613</code> · gap</summary>

Tagged pages: Poisson Distribution, Variance and Standard Deviation

| Item | Kind | Status | Where |
|---|---|---|---|
| For a Poisson distribution the mean equals the variance, so the standard deviation is the square root of the Poisson parameter. | fact | tagged | Poisson Distribution: “A defining property is $E[X] = \text{Var}(X) = \lambda$ — the mean and variance are equal” |
| The Poisson probability mass function is P(N=k) = e^(-λ) λ^k / k!, so P(N=0) = e^(-λ). | formula | tagged | Poisson Distribution: “$$P(X = k) = \frac{e^{-\lambda}\lambda^k}{k!}$$” |
| Translate a stated relation between two Poisson probabilities of zero events into an equation in the parameters (e.g. e^(-λ2) = k·e^(-λ1)) … | procedure | missing |  |

</details>

<details><summary><code>p-614</code> · answerable</summary>

Tagged pages: Linear Combinations of Random Variables, Normal Distribution

| Item | Kind | Status | Where |
|---|---|---|---|
| The sum of independent normal random variables is normal, with mean equal to the sum of the means. | fact | tagged | Normal Distribution: “Any **linear combination of independent normals is exactly normal**: if $X_i \sim N(\mu_i, \sigma_i…” |
| For independent random variables the variances add (standard deviations do not), so the standard deviation of a sum is the square root of t… | fact | linked | Probabilities for Linear Combinations: “$$\mu_L = 100+200 = 300, \qquad \sigma_L = \sqrt{10^2+15^2} = \sqrt{325} \approx 18.03$$” |
| To find a probability for a normal random variable X, standardize via Z = (x - mean)/standard deviation and evaluate using the standard nor… | procedure | tagged | Normal Distribution: “Its CDF has no closed form and is evaluated via the standard normal $Z = (X - \mu)/\sigma \sim N(0,…” |
| By symmetry of the standard normal distribution, P[Z > z] = P[Z < -z] = 1 - Φ(z), which converts an upper-tail probability into a lower-tai… | fact | tagged | Normal Distribution: “Symmetry gives $\Phi(-z) = 1 - \Phi(z)$ — the identity needed for every negative $z$, since standar…” |
| Given a probability for a standard normal variable, use the standard normal table inversely (percentile/quantile lookup, with interpolation… | procedure | tagged | Normal Distribution: “Useful percentiles: $z_{0.90} = 1.282$, $z_{0.95} = 1.645$, $z_{0.975} = 1.960$, $z_{0.99} = 2.326$” |

</details>

<details><summary><code>p-615</code> · untagged</summary>

Tagged pages: Poisson Distribution, Variance and Standard Deviation

| Item | Kind | Status | Where |
|---|---|---|---|
| The expected value of a sum of random variables equals the sum of their expected values, so with identical daily means the weekly expected … | fact | linked | Moments for Linear Combinations: “$$E[W] = a_1 E[X_1] + a_2 E[X_2] + \cdots + a_n E[X_n]$$” |
| For a Poisson distribution the variance equals the mean, so the standard deviation is the square root of the mean. | fact | tagged | Poisson Distribution: “A defining property is $E[X] = \text{Var}(X) = \lambda$ — the mean and variance are equal” |
| The standard deviation is the square root of the variance, and a value k standard deviations below the mean is mean minus k times the stand… | definition | elsewhere | Standard Deviation: “**Standard Deviation** $\sigma$ is the positive square root of [[Variance]], measuring the typical …” |
| The Poisson probability mass function is P(N = n) = e^(-λ) λ^n / n!, for n = 0, 1, 2, ... | formula | tagged | Poisson Distribution: “$$P(X = k) = \frac{e^{-\lambda}\lambda^k}{k!}$$” |
| For a discrete random variable, the probability of being at or below a value is the sum of the probability mass function over all possible … | procedure | elsewhere | Discrete Random Variable: “$$F(x) = \sum_{k \le x} p(k)$$” |

</details>

<details><summary><code>p-616</code> · gap</summary>

Tagged pages: Variance and Standard Deviation, Uniform Continuous Distribution, Uniform Discrete

| Item | Kind | Status | Where |
|---|---|---|---|
| The variance of a continuous uniform distribution on [a, b] is (b - a)^2 / 12. | formula | tagged | Uniform Continuous Distribution: “$E[X] = (a+b)/2$, $\text{Var}(X) = (b-a)^2/12$, and $F(x) = (x-a)/(b-a)$ for $a < x < b$” |
| A discrete uniform distribution on a set of n integers assigns probability 1/n to each integer, so its mean is the average of the values. | definition | tagged | Uniform Discrete: “$$P(X = k) = \frac{1}{n}, \quad k = 1, 2, \ldots, n$$” |
| The variance of a random variable equals E[X^2] minus (E[X])^2, and the standard deviation is its square root. | formula | tagged | Variance and Standard Deviation: “Variance is the expected squared deviation; standard deviation is its square root, restored to the …” |
| The sum of the first n squares 1^2 + 2^2 + ... + n^2 equals n(n+1)(2n+1)/6, and the sum of the first n integers equals n(n+1)/2. | formula | missing |  |
| A discrete uniform distribution on n consecutive integers has variance (n^2 - 1)/12. | formula | tagged | Uniform Discrete: “$E[X] = (n+1)/2$ and $\text{Var}(X) = (n^2 - 1)/12$” |

</details>

<details><summary><code>p-617</code> · answerable</summary>

Tagged pages: Variance for Conditional and Marginal Distributions, Conditional and Marginal Probability Functions

| Item | Kind | Status | Where |
|---|---|---|---|
| The conditional probability function of X given Y = y equals the joint probability p(x, y) divided by the marginal probability P(Y = y). | definition | tagged | Conditional and Marginal Probability Functions: “$$p_{X \mid Y}(x \mid y) = \frac{p_{X,Y}(x, y)}{p_Y(y)}$$” |
| Obtain a marginal probability P(Y = y) from a joint probability table by summing the joint probabilities over all values of the other varia… | procedure | tagged | Conditional and Marginal Probability Functions: “Marginal of $Y$ at 2: $p_Y(2) = 0.1 + 0.4 = 0.5$.” |
| The conditional expectation of a discrete variable given an event is E(X \| Y = y) = sum of x times P(X = x \| Y = y), and E(X^2 \| Y = y) … | formula | tagged | Variance for Conditional and Marginal Distributions (collapsed): “Then $E[X \mid Y=2] = 0(0.2)+1(0.8) = 0.8$ and $E[X^2 \mid Y=2] = 0.8$.” |
| The conditional variance is Var(X \| Y = y) = E(X^2 \| Y = y) - [E(X \| Y = y)]^2, the variance computed using the conditional distribution. | formula | tagged | Variance for Conditional and Marginal Distributions: “$$\text{Var}(X \mid Y=y) = E[X^2 \mid Y=y] - \bigl(E[X \mid Y=y]\bigr)^2$$” |

</details>

<details><summary><code>p-618</code> · answerable</summary>

Tagged pages: Uniform Continuous Distribution, Conditional Probability

| Item | Kind | Status | Where |
|---|---|---|---|
| For a continuous uniform distribution on [a, b], the mean is (a+b)/2. | formula | tagged | Uniform Continuous Distribution: “$E[X] = (a+b)/2$, $\text{Var}(X) = (b-a)^2/12$, and $F(x) = (x-a)/(b-a)$ for $a < x < b$” |
| For a continuous uniform distribution on [a, b], the variance is (b-a)^2/12. | formula | tagged | Uniform Continuous Distribution: “$E[X] = (a+b)/2$, $\text{Var}(X) = (b-a)^2/12$, and $F(x) = (x-a)/(b-a)$ for $a < x < b$” |
| Solve for the endpoints of a uniform distribution by using the given mean to get a+b and the given variance to get b-a, then solving the tw… | procedure | tagged | Uniform Continuous Distribution: “$E[X] = (a+b)/2$, $\text{Var}(X) = (b-a)^2/12$” |
| Conditional probability P[A \| B] = P[A and B] / P[B], so P[X > x \| X > y] with x > y equals P[X > x] / P[X > y]. | formula | tagged | Conditional Probability: “$$P(A \mid B) = \frac{P(A \cap B)}{P(B)}, \quad P(B) > 0$$” |
| For a uniform distribution, the probability of an interval within the support is its length divided by the total support length (b-a), so P… | fact | tagged | Uniform Continuous Distribution: “$E[X] = (a+b)/2$, $\text{Var}(X) = (b-a)^2/12$, and $F(x) = (x-a)/(b-a)$ for $a < x < b$” |
| The uniform distribution is not memoryless: given X > y, the conditional distribution is uniform on [y, b], so the remaining-time probabili… | fact | tagged | Uniform Continuous Distribution: “The uniform is **not** memoryless — the exponential is the only continuous density that is. For $\t…” |

</details>

<details><summary><code>p-619</code> · untagged</summary>

Tagged pages: Poisson Distribution

| Item | Kind | Status | Where |
|---|---|---|---|
| A Poisson random variable with mean λ has probability mass function P(N=k) = e^{-λ} λ^k / k! for k = 0, 1, 2, ... | formula | tagged | Poisson Distribution: “$$P(X = k) = \frac{e^{-\lambda}\lambda^k}{k!}$$” |
| The mean of a Poisson random variable equals its parameter λ. | fact | tagged | Poisson Distribution: “A defining property is $E[X] = \text{Var}(X) = \lambda$ — the mean and variance are equal” |
| The sum of independent Poisson random variables is Poisson with mean equal to the sum of the individual means, so the expected count over s… | fact | elsewhere | Poisson Superposition: “The merged process inherits independent increments, and a sum of independent Poisson counts is Pois…” |
| The expected value of a sum of random variables is the sum of their expected values (linearity of expectation). | fact | elsewhere | Linear Combinations of Random Variables: “$$E[L] = \sum_{i=1}^{n} c_i\,E[X_i]$$” |

</details>

<details><summary><code>p-620</code> · gap</summary>

Tagged pages: Independent Events

| Item | Kind | Status | Where |
|---|---|---|---|
| Two or more events are mutually independent when the probability of any combination of them occurring equals the product of their individua… | definition | tagged | Independent Events: “For a collection of events $A_1, \ldots, A_n$ to be **mutually independent**, the product rule must…” |
| To find the probability that exactly k of n independent events with different probabilities occur, sum over every subset of size k the prod… | procedure | elsewhere | Probabilities for Linear Combinations (collapsed): “Add the products over the pairs of values that give each total:” |
| The binomial distribution applies only when trials are independent with the same success probability, so it cannot be used when the success… | fact | elsewhere | Binomial Distribution: “Requires trials to be independent, each trial to have exactly two outcomes, and $p$ to be constant …” |
| The probability of a union of mutually exclusive events (such as exactly three and exactly four occurrences) is the sum of their individual… | fact | elsewhere | Mutually Exclusive Events: “The addition rule simplification extends to any finite collection: if $A_1, A_2, \ldots, A_n$ are p…” |
| The event 'more than k' occurrences means at least k+1 occurrences, so its probability sums the probabilities of exactly k+1, k+2, ..., n o… | definition | missing |  |
| The probability that an event does not occur equals one minus the probability that it occurs (complement rule). | fact | elsewhere | Axioms of Probability (collapsed): “Therefore $P(A^c) = 1 - P(A)$. $\square$” |

</details>

<details><summary><code>p-621</code> · untagged</summary>

Tagged pages: Exponential Distribution, Conditional Probability

| Item | Kind | Status | Where |
|---|---|---|---|
| The exponential distribution is memoryless: P(X > s + t \| X > s) = P(X > t), so given survival to time s the remaining waiting time is aga… | fact | tagged | Exponential Distribution: “Its defining property is **memorylessness**: $P(X > s + t \mid X > s) = P(X > t)$, making it the un…” |
| To find a conditional probability of an interval given X > s for a memoryless variable, shift the interval back by s, i.e. P(a < X < b \| X… | procedure | tagged | Exponential Distribution: “given $X > d$, the excess $X - d$ is again $\text{Exp}(\theta)$” |
| For an exponential distribution with mean θ, the CDF is F(x) = 1 - e^{-x/θ} and the survival function is S(x) = e^{-x/θ}. | formula | tagged | Exponential Distribution: “$E[X] = \theta$, $\text{Var}(X) = \theta^2$, and $F(x) = 1 - e^{-x/\theta}$” |
| The probability that a continuous random variable falls in an interval is P(a < X < b) = F(b) - F(a) = S(a) - S(b). | procedure | elsewhere | Cumulative Distribution Function (CDF) (collapsed): “$$P(2 \leq X \leq 4) = F(4) - F(2) = \frac{4}{5} - \frac{2}{5} = \frac{2}{5} = 0.4$$” |

</details>

<details><summary><code>p-622</code> · answerable</summary>

Tagged pages: Uniform Continuous Distribution, Variance and Standard Deviation

| Item | Kind | Status | Where |
|---|---|---|---|
| For a uniform distribution on [a, b], the median (50th percentile) equals the midpoint (a+b)/2. | fact | tagged | Uniform Continuous Distribution: “$E[X] = (a+b)/2$, $\text{Var}(X) = (b-a)^2/12$, and $F(x) = (x-a)/(b-a)$ for $a < x < b$” |
| The variance of a uniform distribution on [a, b] is (b-a)^2/12, so its standard deviation is (b-a)/sqrt(12). | formula | tagged | Uniform Continuous Distribution: “$E[X] = (a+b)/2$, $\text{Var}(X) = (b-a)^2/12$, and $F(x) = (x-a)/(b-a)$ for $a < x < b$” |
| The standard deviation of a random variable is the positive square root of its variance. | definition | tagged | Variance and Standard Deviation: “$$\sigma = \text{SD}(X) = \sqrt{\text{Var}(X)}$$” |
| To find the endpoints of a uniform distribution, set up two equations from the given median (midpoint) and standard deviation (width) and s… | procedure | tagged | Uniform Continuous Distribution: “$E[X] = (a+b)/2$, $\text{Var}(X) = (b-a)^2/12$, and $F(x) = (x-a)/(b-a)$ for $a < x < b$” |

</details>

<details><summary><code>p-623</code> · answerable</summary>

Tagged pages: Normal Distribution, Percentile

| Item | Kind | Status | Where |
|---|---|---|---|
| The normal distribution is symmetric and unimodal, so its mode, median and mean coincide at the parameter mu. | fact | linked | Median: “For a [[Normal Distribution\\|normal]] distribution the median equals the [[Expected Value\\|mean]]” |
| To find a normal probability or percentile, standardize with Z = (X - mu)/sigma and use the standard normal table/CDF. | procedure | tagged | Normal Distribution: “Its CDF has no closed form and is evaluated via the standard normal $Z = (X - \mu)/\sigma \sim N(0,…” |
| To find an unknown sigma from a given percentile, look up the standard normal quantile z for that percentile (negative if below 50%) and so… | procedure | tagged | Normal Distribution: “Symmetry gives $\Phi(-z) = 1 - \Phi(z)$ — the identity needed for every negative $z$, since standar…” |
| The p-th percentile of a distribution is the value x such that P[X < x] = p; a score's percentile is its cumulative probability. | definition | tagged | Percentile: “When $F$ is continuous and strictly increasing, it is the value that solves $F(x_p) = p$, found by …” |

</details>

<details><summary><code>p-624</code> · answerable</summary>

Tagged pages: Linear Combinations of Random Variables, Normal Distribution

| Item | Kind | Status | Where |
|---|---|---|---|
| The expected value of a sum of random variables equals the sum of their expected values (linearity of expectation), regardless of independe… | fact | tagged | Linear Combinations of Random Variables: “**Expectation is always linear** — $E[L]$ needs no independence assumption at all.” |
| For independent random variables, the variance of the sum equals the sum of the variances (standard deviations do not add). | fact | linked | Independent Random Variables: “For independent random variables: $E[XY] = E[X]\,E[Y]$ and $\text{Var}(X + Y) = \text{Var}(X) + \te…” |
| The sum of independent normal random variables is itself normally distributed, with mean equal to the sum of the means and variance equal t… | fact | tagged | Normal Distribution: “Any **linear combination of independent normals is exactly normal**: if $X_i \sim N(\mu_i, \sigma_i…” |
| To find a probability for a normal random variable X with mean mu and standard deviation sigma, standardize via Z = (X - mu)/sigma and eval… | procedure | tagged | Normal Distribution: “Its CDF has no closed form and is evaluated via the standard normal $Z = (X - \mu)/\sigma \sim N(0,…” |
| For the standard normal distribution, P[Z > -z] = P[Z < z] by symmetry, so the upper-tail probability beyond a negative value exceeds 0.5. | fact | tagged | Normal Distribution: “Symmetry gives $\Phi(-z) = 1 - \Phi(z)$ — the identity needed for every negative $z$, since standar…” |

</details>

<details><summary><code>p-625</code> · untagged</summary>

Tagged pages: Poisson Distribution, Conditional Probability

| Item | Kind | Status | Where |
|---|---|---|---|
| Counts of events in disjoint, non-overlapping time periods of a Poisson process (or of independent years) are independent, so conditioning … | fact | elsewhere | Poisson Process: “The number of events in non-overlapping intervals are **independent**” |
| The number of events over t periods of independent Poisson counts with mean lambda per period is Poisson with mean t times lambda (sums of … | fact | elsewhere | Poisson Process: “The number of events in any interval of length $t$ has distribution $\text{Poi}(\lambda t)$” |
| For a Poisson random variable N with mean lambda, P(N = k) = e^(-lambda) lambda^k / k!. | formula | tagged | Poisson Distribution: “$$P(X = k) = \frac{e^{-\lambda}\lambda^k}{k!}$$” |
| To find the probability of a total count given a partial count already observed, compute the probability that the remaining period produces… | procedure | tagged | Conditional Probability: “If $A$ and $B$ are independent, then $P(A \mid B) = P(A)$” |

</details>

<details><summary><code>p-626</code> · answerable</summary>

Tagged pages: Poisson Distribution, Variance and Standard Deviation

| Item | Kind | Status | Where |
|---|---|---|---|
| For a Poisson distribution with mean lambda, the probability of exactly k events is e^{-lambda} lambda^k / k!, so the probability of zero e… | formula | tagged | Poisson Distribution: “$$P(X = k) = \frac{e^{-\lambda}\lambda^k}{k!}$$” |
| For a Poisson distribution the variance equals the mean. | fact | tagged | Poisson Distribution: “A defining property is $E[X] = \text{Var}(X) = \lambda$ — the mean and variance are equal” |

</details>

<details><summary><code>p-627</code> · gap</summary>

Tagged pages: Conditional and Marginal Probability Functions, Expected Value

| Item | Kind | Status | Where |
|---|---|---|---|
| The conditional probability function of Y given an event A is P(Y=y \| A) = P(Y=y and A) / P(A). | definition | elsewhere | Conditional Probability: “P(A \mid B) = \frac{P(A \cap B)}{P(B)}, \quad P(B) > 0” |
| To find the probability of an event defined on X (such as X < k) from a joint probability table, sum the joint probabilities over all X val… | procedure | missing |  |
| The conditional expectation of a discrete random variable Y given an event A is E(Y \| A) = sum over y of y * P(Y=y \| A). | formula | tagged | Expected Value: “E[X] = \begin{cases} \displaystyle\sum_{k} k\, f(k) & \text{(discrete)} \\[6pt] \displaystyle\int_{…” |

</details>

<details><summary><code>p-628</code> · untagged</summary>

Tagged pages: Continuous Univariate Distributions, Expected Value, Probability Density Function (PDF)

| Item | Kind | Status | Where |
|---|---|---|---|
| The expected value of a continuous random variable X with density f is E[X] = ∫ x f(x) dx taken over its support. | formula | tagged | Expected Value: “\int_{-\infty}^{\infty} x\, f(x)\, dx & \text{(continuous)}” |
| For a continuous random variable, the probability that X lies in an interval (a, b) equals the integral of its density over that interval, … | formula | tagged | Probability Density Function (PDF) (collapsed): “$$P(X > 0.5) = \int_{0.5}^{1} 3x^2\, dx = \left[ x^3 \right]_{0.5}^{1} = 1 - 0.125 = 0.875$$” |
| To find an unknown density parameter, set the expression for the mean computed from the density equal to the given mean value and solve for… | procedure | elsewhere | Method of Moments: “The **Method of Moments** (MoM) estimates parameters by setting the sample moments equal to the the…” |
| A valid probability density function integrates to 1 over its support, so a density on (0,1) of the form (α+1)r^α is a properly normalized … | fact | tagged | Probability Density Function (PDF): “The PDF must satisfy $f(x) \geq 0$ and $\int_{-\infty}^{\infty} f(x)\, dx = 1$” |

</details>

<details><summary><code>p-629</code> · gap</summary>

Tagged pages: Variance and Standard Deviation, Expected Value

| Item | Kind | Status | Where |
|---|---|---|---|
| For a discrete random variable, the k-th moment E(Y^k) is the sum over all support points of y^k times p(y); in particular E(Y^2) = sum y^2… | formula | linked | Moment: “For a discrete variable the integral becomes $\sum_x x^n\,p(x)$.” |
| The mean of a discrete random variable is E(Y) = sum of y times p(y) over the support. | formula | tagged | Expected Value: “$$E[X] = \begin{cases} \displaystyle\sum_{k} k\, f(k) & \text{(discrete)} \\[6pt] \displaystyle\int…” |
| The variance of a random variable equals the second moment minus the square of the mean: Var(Y) = E(Y^2) - [E(Y)]^2. | formula | tagged | Variance and Standard Deviation: “$$= E[X^2] - \mu^2$$” |
| Taking a square root of a squared unknown yields two roots, and a stated sign restriction on the parameter (e.g., negative) selects the val… | fact | missing |  |

</details>

<details><summary><code>p-630</code> · untagged</summary>

Tagged pages: Deductible, Exponential Distribution

| Item | Kind | Status | Where |
|---|---|---|---|
| With an ordinary deductible d, the claim payment for a loss X is max(X - d, 0), i.e., zero if the loss is below d and X - d otherwise. | definition | tagged | Deductible: “$$Y = (X - d)_+$$” |
| The expected payment per loss with deductible d is E[(X - d)+] = the integral from d to infinity of (x - d) f(x) dx, equivalently the integ… | formula | elsewhere | Mean Excess Loss: “e_X(d) = \frac{\int_d^{\infty} S_X(x)\,dx}{S_X(d)}…The cost per loss is $E[(X - d)_+] = e_X(d)\,S_X…” |
| An exponential distribution with mean θ has density f(x) = (1/θ)e^{-x/θ} and survival function S(x) = e^{-x/θ} for x > 0. | fact | tagged | Exponential Distribution: “$$f(x) = \frac{1}{\theta}\,e^{-x/\theta}, \quad x > 0$$” |
| The exponential distribution is memoryless: given X > d, the excess X - d is exponential with the same mean as X. | fact | tagged | Exponential Distribution: “A direct consequence: given $X > d$, the excess $X - d$ is again $\text{Exp}(\theta)$.” |
| The expected payment per loss equals P(X > d) times the expected excess given X > d (mean excess loss), by conditioning on whether the loss… | procedure | tagged | Exponential Distribution: “The two differ by the factor $P(X > 300) = e^{-0.6} \approx 0.5488$, since $274.4 = 0.5488 \times 5…” |

</details>

<details><summary><code>p-631</code> · gap</summary>

Tagged pages: Variance for Conditional and Marginal Distributions, Conditional and Marginal Probability Functions

| Item | Kind | Status | Where |
|---|---|---|---|
| The conditional probability of an event given another is the joint probability divided by the probability of the conditioning event, so P[Y… | definition | tagged | Conditional and Marginal Probability Functions: “$$p_{X \mid Y}(x \mid y) = \frac{p_{X,Y}(x, y)}{p_Y(y)}$$” |
| To obtain the conditional distribution of Y given X = x from a joint probability table, take the joint probabilities in the X = x row and r… | procedure | linked | Joint Probability Function: “[[Conditional Probability Function]]s are obtained by fixing one variable and dividing by its margi…” |
| The conditional expectation of a function of Y given X = x is the sum of that function of y times the conditional probability P[Y=y \| X=x]… | formula | tagged | Variance for Conditional and Marginal Distributions (collapsed): “Then $E[X \mid Y=2] = 0(0.2)+1(0.8) = 0.8$ and $E[X^2 \mid Y=2] = 0.8$.” |
| The conditional variance is Var(Y \| X=x) = E[Y² \| X=x] − (E[Y \| X=x])². | formula | tagged | Variance for Conditional and Marginal Distributions: “$$\text{Var}(X \mid Y=y) = E[X^2 \mid Y=y] - \bigl(E[X \mid Y=y]\bigr)^2$$” |
| A Bernoulli random variable with success probability p has mean p and variance p(1−p); a 0/1-valued random variable is Bernoulli. | fact | missing |  |

</details>

<details><summary><code>p-632</code> · untagged</summary>

Tagged pages: Binomial Distribution, Expected Value

| Item | Kind | Status | Where |
|---|---|---|---|
| The number of successes in n independent trials, each with the same success probability p, follows a binomial distribution with parameters … | fact | tagged | Binomial Distribution: “The **Binomial Distribution** $X \sim \text{Bin}(n, p)$ models the number of successes in $n$ indep…” |
| For a binomial random variable with parameters n and p, P(X = k) = C(n,k) p^k (1-p)^(n-k). | formula | tagged | Binomial Distribution: “$$P(X = k) = \binom{n}{k} p^k (1-p)^{n-k}$$” |
| A benefit paid per occurrence subject to a maximum number of payments is modeled as a per-payment amount times min(X, cap), where X is the … | procedure | elsewhere | Policy Limit: “the insurer pays the whole loss $X$ when it is below $u$ and pays $u$ when it is not, so the paymen…” |
| The expected value of a function g(X) of a discrete random variable is E[g(X)] = sum over x of g(x) P(X = x). | formula | elsewhere | Discrete Random Variable: “Expectations are sums: $E[g(X)] = \sum_x g(x)\,p(x)$.” |
| The probability that a random variable is at least a cap value is the sum of the probabilities of all outcomes at or above the cap, and thi… | fact | elsewhere | Policy Limit: “The variable $X \wedge u$ has a point mass of $S(u)$ at $u$” |

</details>

<details><summary><code>p-633</code> · untagged</summary>

Tagged pages: Poisson Distribution, Conditional Probability

| Item | Kind | Status | Where |
|---|---|---|---|
| For a Poisson random variable the mean equals the variance, so the variance gives the Poisson parameter. | fact | tagged | Poisson Distribution: “A defining property is $E[X] = \text{Var}(X) = \lambda$ — the mean and variance are equal” |
| The Poisson probability mass function is P[N = n] = λ^n e^(-λ) / n!. | formula | tagged | Poisson Distribution: “$$P(X = k) = \frac{e^{-\lambda}\lambda^k}{k!}$$” |
| The sum of independent Poisson random variables is Poisson with mean equal to the sum of the individual means. | fact | elsewhere | Poisson Superposition: “The merged process inherits independent increments, and a sum of independent Poisson counts is Pois…” |
| To find a conditional probability P[A \| B], use P[A ∩ B] / P[B], and for a conditional on a total, write the joint event as a product of i… | procedure | tagged | Conditional Probability: “$$P(A \mid B) = \frac{P(A \cap B)}{P(B)}, \quad P(B) > 0$$” |
| Given that the total of two independent Poisson counts equals n, the count from one component is binomial with n trials and success probabi… | fact | elsewhere | Poisson Superposition: “Given $N(t) = n$ merged events, the number from stream $i$ is [[Binomial Distribution\\|binomial]]$(…” |
| The binomial probability mass function is P[X = k] = C(n,k) p^k (1−p)^(n−k). | formula | elsewhere | Binomial Distribution: “$$P(X = k) = \binom{n}{k} p^k (1-p)^{n-k}$$” |

</details>

<details><summary><code>p-634</code> · untagged</summary>

Tagged pages: Linear Combinations of Random Variables, Variance and Standard Deviation

| Item | Kind | Status | Where |
|---|---|---|---|
| The expected value of a sum of random variables equals the sum of their expected values. | fact | tagged | Linear Combinations of Random Variables: “$$E[L] = \sum_{i=1}^{n} c_i\,E[X_i]$$” |
| The variance of a sum of independent random variables equals the sum of their variances. | fact | linked | Independent Random Variables: “For independent random variables: $E[XY] = E[X]\,E[Y]$ and $\text{Var}(X + Y) = \text{Var}(X) + \te…” |
| The coefficient of variation of a random variable is its standard deviation divided by its mean. | definition | linked | Coefficient of Variation: “The **Coefficient of Variation** $CV$ is the ratio of the standard deviation to the mean, measuring…” |
| The standard deviation of a random variable is the positive square root of its variance. | definition | elsewhere | Standard Deviation: “**Standard Deviation** $\sigma$ is the positive square root of [[Variance]], measuring the typical …” |

</details>

<details><summary><code>p-635</code> · answerable</summary>

Tagged pages: Linear Combinations of Random Variables, Exponential Distribution

| Item | Kind | Status | Where |
|---|---|---|---|
| An exponential random variable with mean μ has variance μ². | fact | tagged | Exponential Distribution: “$E[X] = \theta$, $\text{Var}(X) = \theta^2$, and $F(x) = 1 - e^{-x/\theta}$” |
| The expected value of a linear combination of random variables is the same linear combination of their expected values (means add, differen… | fact | tagged | Linear Combinations of Random Variables: “$$E[L] = \sum_{i=1}^{n} c_i\,E[X_i]$$” |
| For independent random variables, Var(aX + bY) = a²Var(X) + b²Var(Y), so the variance of a difference is the sum of the variances. | fact | tagged | Linear Combinations of Random Variables: “Coefficients enter the variance **squared**, so $\text{Var}(X - Y) = \text{Var}(X) + \text{Var}(Y)$…” |
| The mean of an exponential distribution must be positive, so a negative root of a parameter equation is rejected. | fact | tagged | Exponential Distribution: “$$\text{where } \theta > 0 = \text{mean (scale parameter)}$$” |

</details>

<details><summary><code>p-636</code> · untagged</summary>

Tagged pages: Central Limit Theorem, Exponential Distribution

| Item | Kind | Status | Where |
|---|---|---|---|
| For an exponential distribution with mean θ, the variance is θ^2, so the standard deviation equals the mean. | fact | tagged | Exponential Distribution: “$E[X] = \theta$, $\text{Var}(X) = \theta^2$, and $F(x) = 1 - e^{-x/\theta}$” |
| The mean of a sum of random variables is the sum of their means, and the variance of a sum of independent random variables is the sum of th… | fact | elsewhere | Normal Approximation: “compute $E[S_n] = n\mu$ and $\text{Var}(S_n) = n\sigma^2$ ([[Moments for Linear Combinations]])” |
| The Central Limit Theorem states that the sum of many independent, identically distributed random variables is approximately normal with th… | fact | tagged | Central Limit Theorem: “For large $n$, $S_n$ is approximately $N(n\mu,\, n\sigma^2)$ regardless of the original distribution” |
| To approximate P[X > x] with a normal approximation, standardize via Z = (x - mean)/SD and read the upper-tail probability 1 - Φ(z) from th… | procedure | tagged | Central Limit Theorem (collapsed): “$$P(S_{200} > 104{,}000) = P\!\left(Z > \frac{104{,}000 - 100{,}000}{4{,}243}\right) = P(Z > 0.94) …” |

</details>

<details><summary><code>p-637</code> · untagged</summary>

Tagged pages: Central Limit Theorem

| Item | Kind | Status | Where |
|---|---|---|---|
| The Central Limit Theorem states that the sum of a large number of independent, identically distributed random variables is approximately n… | fact | tagged | Central Limit Theorem: “For large $n$, $S_n$ is approximately $N(n\mu,\, n\sigma^2)$ regardless of the original distribution” |
| For a sum S of n independent identically distributed variables with mean mu and standard deviation sigma, E(S) = n*mu and SD(S) = sigma*sqr… | formula | tagged | Central Limit Theorem: “$$\mu_S = 200 \times 500 = 100{,}000, \qquad \sigma_S = \sqrt{200 \times 300^2} = 300\sqrt{200} \ap…” |
| To approximate a probability for a normally distributed quantity, standardize by subtracting the mean and dividing by the standard deviatio… | procedure | elsewhere | Normal Distribution: “Its CDF has no closed form and is evaluated via the standard normal $Z = (X - \mu)/\sigma \sim N(0,…” |
| An upper-tail probability for the standard normal is found as P(Z > z) = 1 - Φ(z), and for a z near 0 it is just below 0.5. | fact | elsewhere | Normal Distribution (collapsed): “$$P(S > 55{,}000) = P(Z > 0.791) = 1 - \Phi(0.791) \approx 1 - 0.7855 = 0.2145$$” |

</details>

<details><summary><code>p-638</code> · untagged</summary>

Tagged pages: Variance for Conditional and Marginal Distributions, Conditional and Marginal Probability Functions

| Item | Kind | Status | Where |
|---|---|---|---|
| The conditional distribution of Y given X = x is the joint probability P(X = x, Y = y) divided by the marginal probability P(X = x). | definition | tagged | Conditional and Marginal Probability Functions: “p_{X \mid Y}(x \mid y) = \frac{p_{X,Y}(x, y)}{p_Y(y)}” |
| To condition on X = x in a joint probability table, take the row (or column) for X = x, sum it to get the marginal probability P(X = x), an… | procedure | tagged | Variance for Conditional and Marginal Distributions (collapsed): “Since $p_Y(2)=0.5$: $p_{X\\|Y}(0\mid 2)=0.2$ and $p_{X\\|Y}(1\mid 2)=0.8$.” |
| The conditional expectation of a discrete Y given X = x is E[Y \| X = x] = sum over y of y * P(Y = y \| X = x), and similarly E[Y^2 \| X = … | formula | tagged | Variance for Conditional and Marginal Distributions (collapsed): “Then $E[X \mid Y=2] = 0(0.2)+1(0.8) = 0.8$ and $E[X^2 \mid Y=2] = 0.8$.” |
| The conditional variance is Var(Y \| X = x) = E[Y^2 \| X = x] − (E[Y \| X = x])^2, computed from the conditional distribution. | formula | tagged | Variance for Conditional and Marginal Distributions: “\text{Var}(X \mid Y=y) = E[X^2 \mid Y=y] - \bigl(E[X \mid Y=y]\bigr)^2” |
| Variance is the square of the standard deviation, so the standard deviation is the square root of the variance and the two should not be co… | fact | elsewhere | Variance and Standard Deviation: “Variance is the expected squared deviation; standard deviation is its square root, restored to the …” |

</details>

<details><summary><code>p-639</code> · gap</summary>

Tagged pages: Poisson Distribution, Independent Events

| Item | Kind | Status | Where |
|---|---|---|---|
| For a Poisson random variable with mean λ, P[N = k] = e^{-λ} λ^k / k!. | formula | tagged | Poisson Distribution: “$$P(X = k) = \frac{e^{-\lambda}\lambda^k}{k!}$$” |
| A cumulative probability P[N ≤ k] for a discrete distribution is found by summing the pmf over all values 0 through k. | procedure | missing |  |
| A coverage limit on the number of reimbursed claims means nothing is unreimbursed exactly when the claim count is at most the limit, so the… | procedure | missing |  |
| For independent random variables X and Y, P[X ∈ A and Y ∈ B] = P[X ∈ A] · P[Y ∈ B], so the joint probability is the product of the marginal… | fact | elsewhere | Independent Random Variables: “Formally, for all values $x$ and $y$, the joint distribution factors into the product of the margin…” |

</details>

<details><summary><code>p-640</code> · untagged</summary>

Tagged pages: Conditional Probability, Binomial Distribution

| Item | Kind | Status | Where |
|---|---|---|---|
| Conditional probability of A given B is P(A\|B) = P(A ∩ B) / P(B). | definition | tagged | Conditional Probability: “$$P(A \mid B) = \frac{P(A \cap B)}{P(B)}, \quad P(B) > 0$$” |
| The number of successes in n independent trials, each with the same success probability p, follows a binomial distribution with P(X=k) = C(… | fact | tagged | Binomial Distribution: “$$P(X = k) = \binom{n}{k} p^k (1-p)^{n-k}$$” |
| The complement rule: P(at least one event) = 1 - P(none), and for independent events P(none) is the product of the individual non-occurrenc… | fact | elsewhere | Probability Rules: “The complement rule is the workhorse shortcut — "at least one" is almost always faster as $1 - P(\t…” |
| If event A is a subset of event B, then P(A ∩ B) = P(A), so the numerator of the conditional probability reduces to P(A). | fact | tagged | Conditional Probability (collapsed): “Since $A \subseteq B$, we have $A \cap B = A$.” |

</details>

<details><summary><code>p-641</code> · gap</summary>

Tagged pages: Conditional Probability, Independent Events

| Item | Kind | Status | Where |
|---|---|---|---|
| The conditional probability of A given B is P[A\|B] = P[A ∩ B] / P[B], provided P[B] > 0. | definition | tagged | Conditional Probability: “$$P(A \mid B) = \frac{P(A \cap B)}{P(B)}, \quad P(B) > 0$$” |
| For independent events, the probability that all of them occur (or that a specified combination of occurrences and non-occurrences happens)… | fact | tagged | Independent Events: “$$P(A \cap B) = P(A) \cdot P(B)$$” |
| The probability of the complement of an event is one minus its probability, so a probability of no loss of p means a loss probability of 1 … | fact | elsewhere | Mutually Exclusive Events (collapsed): “$$P(\text{other}) = 1 - 0.95 = 0.05$$” |
| To find the probability that exactly one of several events occurs, split it into mutually exclusive cases (one case per event occurring whi… | procedure | elsewhere | Mutually Exclusive Events: “if $A_1, A_2, \ldots, A_n$ are pairwise mutually exclusive, then $P\!\left(\bigcup_{i=1}^n A_i\righ…” |
| To find the probability of a specific event together with the condition 'exactly one occurs', note that the joint event reduces to the sing… | procedure | missing |  |

</details>

<details><summary><code>p-642</code> · untagged</summary>

Tagged pages: Exponential Distribution, Variance and Standard Deviation

| Item | Kind | Status | Where |
|---|---|---|---|
| The exponential distribution is memoryless: given survival past age t, the remaining lifetime X - t has the same exponential distribution a… | fact | tagged | Exponential Distribution: “A direct consequence: given $X > d$, the excess $X - d$ is again $\text{Exp}(\theta)$.” |
| Adding or subtracting a constant shifts a distribution without changing its variance: Var[Y + c] = Var[Y]. | fact | tagged | Variance and Standard Deviation: “$\text{Var}(aX + b) = a^2\,\text{Var}(X)$ and $\text{SD}(aX + b) = \\|a\\|\,\text{SD}(X)$ — a shift $…” |
| An exponential random variable with mean θ has variance θ². | formula | tagged | Exponential Distribution: “$E[X] = \theta$, $\text{Var}(X) = \theta^2$, and $F(x) = 1 - e^{-x/\theta}$” |
| The conditional variance Var[X \| X ≥ t] is the variance of X computed under the distribution of X restricted to the event X ≥ t. | definition | elsewhere | Variance for Conditional and Marginal Distributions: “the conditional variance $\text{Var}(X \mid Y=y)$ measures the spread of $X$ within the subpopulati…” |

</details>

<details><summary><code>p-643</code> · gap</summary>

Tagged pages: Poisson Distribution

| Item | Kind | Status | Where |
|---|---|---|---|
| A Poisson random variable with mean λ has probability mass function P(X = k) = e^{-λ} λ^k / k! for k = 0, 1, 2, ... | formula | tagged | Poisson Distribution: “$$P(X = k) = \frac{e^{-\lambda}\lambda^k}{k!}$$” |
| To find a cumulative probability P(X ≤ n) for a discrete count variable, sum the pmf over all values from 0 through n inclusive. | procedure | elsewhere | Joint Cumulative Distribution Function: “For discrete variables, $F$ adds up the joint probability function over every cell at or below $x$ …” |
| The phrase "not more than n" means X ≤ n, so the value n itself is included in the event. | fact | missing |  |

</details>

<details><summary><code>p-644</code> · gap</summary>

Tagged pages: Hypergeometric Distribution, Conditional Probability

| Item | Kind | Status | Where |
|---|---|---|---|
| The conditional probability of A given B is P(A and B) divided by P(B), provided P(B) > 0. | definition | tagged | Conditional Probability: “$$P(A \mid B) = \frac{P(A \cap B)}{P(B)}, \quad P(B) > 0$$” |
| For n independent trials each with success probability p, the probability of exactly k successes is C(n,k) p^k (1-p)^(n-k). | formula | linked | Binomial Distribution: “$$P(X = k) = \binom{n}{k} p^k (1-p)^{n-k}$$” |
| For independent identical trials, given exactly k successes among n, every subset of k trials is equally likely to be the set of successes,… | fact | missing |  |
| Hypergeometric probability: when choosing n items without replacement from N items containing K of one type, the probability of exactly k o… | formula | tagged | Hypergeometric Distribution: “$$P(X = k) = \frac{\dbinom{K}{k}\dbinom{N-K}{n-k}}{\dbinom{N}{n}}$$” |
| To find a probability by counting equally likely outcomes, divide the number of favorable combinations by the total number of combinations,… | procedure | tagged | Hypergeometric Distribution (collapsed): “$$P(X=2) = \frac{\binom{4}{2}\binom{6}{1}}{\binom{10}{3}} = \frac{6 \cdot 6}{120} = \frac{36}{120} …” |

</details>

<details><summary><code>p-645</code> · gap</summary>

Tagged pages: Binomial Distribution, Conditional Probability

| Item | Kind | Status | Where |
|---|---|---|---|
| Conditional probability of A given B is P(A and B) divided by P(B), used to compute the probability of an event given a conditioning event. | definition | tagged | Conditional Probability: “$$P(A \mid B) = \frac{P(A \cap B)}{P(B)}, \quad P(B) > 0$$” |
| For independent events, the probability of a joint outcome is the product of the individual probabilities, so a specific sequence of theft/… | fact | elsewhere | Independent Events: “$$P(A \cap B) = P(A) \cdot P(B)$$” |
| The number of successes in n independent trials with success probability p is binomial, with P(X=k) = C(n,k) p^k (1-p)^(n-k). | formula | tagged | Binomial Distribution: “$$P(X = k) = \binom{n}{k} p^k (1-p)^{n-k}$$” |
| To find the probability that the first success occurs in a given trial together with a total success count, require all earlier trials to b… | procedure | missing |  |
| Given exactly k successes in n independent identical trials, all C(n,k) sets of success positions are equally likely, independent of p, so … | fact | missing |  |

</details>

<details><summary><code>p-646</code> · gap</summary>

Tagged pages: Independent Events, Probability Rules

| Item | Kind | Status | Where |
|---|---|---|---|
| The probability of an event equals one minus the probability of its complement, so P(at least one occurrence) = 1 - P(no occurrences). | fact | tagged | Probability Rules: “$$P(A^c) = 1 - P(A)$$” |
| For mutually independent events, the probability that all occur equals the product of their individual probabilities. | formula | missing |  |
| To find the probability of at least one event over several independent trials, compute the probability that none occur by raising the singl… | procedure | tagged | Probability Rules (collapsed): “Enumerating one, two, three... claims is slow. Complement instead:” |

</details>

<details><summary><code>p-647</code> · gap</summary>

Tagged pages: The Law of Total Probability, Cumulative Distribution Function (CDF)

| Item | Kind | Status | Where |
|---|---|---|---|
| The cumulative distribution function F(x) = P[X ≤ x], so for a discrete random variable F(k) is the sum of the probabilities of all values … | definition | tagged | Cumulative Distribution Function (CDF): “$$F(x) = P(X \leq x)$$” |
| The probabilities of all outcomes of a discrete probability distribution (e.g., the six faces of a die) must sum to 1, which can be used to… | fact | elsewhere | Probability Mass Function (PMF): “It must satisfy $p(x) \geq 0$ for all $x$ and $\sum_{\text{all } x} p(x) = 1$” |
| Law of total probability: P[A] = Σ P[A \| B_i] P[B_i] over a partition {B_i}, so the probability of a die outcome equals the probability-we… | formula | tagged | The Law of Total Probability: “$$P(B) = \sum_{i=1}^{n} P(B \mid A_i)\,P(A_i)$$” |
| To find an unknown mixing probability (e.g., P[Heads]), express a given probability or CDF value as a function of that parameter via total … | procedure | missing |  |
| A fair six-sided die gives each face probability 1/6, and the two outcomes of a coin toss (heads and tails) are complementary, so P[Tails] … | fact | elsewhere | Axioms of Probability (collapsed): “Therefore $P(A^c) = 1 - P(A)$.” |

</details>

<details><summary><code>p-648</code> · untagged</summary>

Tagged pages: Expected Value, Cumulative Distribution Function (CDF)

| Item | Kind | Status | Where |
|---|---|---|---|
| For a continuous random variable, the probability density function is obtained by differentiating the cumulative distribution function over… | procedure | elsewhere | Continuous Random Variable: “$$f(x) = F'(x)$$” |
| The k-th raw moment of a continuous random variable X with density f is E[X^k] = ∫ x^k f(x) dx over the support; the second moment is E[X^2… | formula | linked | Moment: “$$\mu_n' = E[X^n] = \int_{-\infty}^{\infty} x^n f(x)\,dx$$” |
| The second moment of a random variable, without qualification, is the raw moment E[X^2] about the origin, whereas the variance is the secon… | definition | linked | Moment: “The second central moment is the [[Variance]], $\mu_2 = E[X^2] - \mu^2$.” |

</details>

<details><summary><code>p-649</code> · gap</summary>

Tagged pages: Percentile, Probability Density Function (PDF)

| Item | Kind | Status | Where |
|---|---|---|---|
| The median m of a continuous random variable is the value at which the cumulative distribution function equals 0.5, i.e., the integral of t… | definition | linked | Median: “For a continuous distribution that is the point where $F(m) = 0.5$, splitting the probability in ha…” |
| The CDF of a continuous random variable is obtained by integrating its density from the lower end of its support up to x: F(x) = ∫ f(t) dt. | formula | linked | Cumulative Distribution Function (CDF): “For a continuous random variable, $F(x) = \int_{-\infty}^{x} f(t)\, dt$” |
| To integrate a density of the form c·x·e^(-a x²), use the substitution u = a x² (or recognize the integrand as a constant multiple of the d… | procedure | missing |  |
| To find the median, set the CDF equal to 0.5 and solve for the variable, using logarithms to undo an exponential and a square root to undo … | procedure | tagged | Percentile (collapsed): “1 - e^{-x_{0.90}/10} &= 0.90 \\ e^{-x_{0.90}/10} &= 0.10 \\ x_{0.90} &= -10 \ln(0.10) \\ &= 10 \ln(…” |

</details>

<details><summary><code>p-650</code> · gap</summary>

Tagged pages: Moments for Joint Distributions, Expected Value

| Item | Kind | Status | Where |
|---|---|---|---|
| The expected value of a function g(X,Y) of two discrete random variables is the sum of g(x,y) times the joint probability p(x,y) over all (… | formula | tagged | Moments for Joint Distributions: “$$E[g(X,Y)] = \sum_x \sum_y g(x,y)\,p(x,y)$$” |
| A multinomial distribution with n trials and category probabilities p1,...,pk has joint probability function n!/(x1!...xk!) p1^x1...pk^xk, … | definition | missing |  |
| In a multinomial distribution with n trials, the count for category i is marginally binomial, so its expected value is n times pi. | fact | missing |  |
| Expectation is linear, so E[aX + bY] = aE[X] + bE[Y] regardless of whether X and Y are independent. | fact | missing |  |
| To find the expected total loss from counts of event types, express total loss as the sum of each event's loss amount times its count, then… | procedure | missing |  |

</details>

<details><summary><code>p-651</code> · gap</summary>

Tagged pages: Moments for Joint Distributions, Conditional and Marginal Probability Functions

| Item | Kind | Status | Where |
|---|---|---|---|
| The marginal probability function of one variable in a joint discrete distribution is obtained by summing the joint probabilities over all … | definition | tagged | Conditional and Marginal Probability Functions: “The marginal is found by summing (or integrating, in the continuous case) the [[Joint Probability F…” |
| The expected value of a discrete random variable is the sum of each value times its probability, E[Y] = sum of y*p(y). | formula | linked | Expected Value: “\sum_{k} k\, f(k) & \text{(discrete)}” |
| Expectation is linear: E[aY + b] = aE[Y] + b, so a constant multiplier can be pulled outside the expectation, and the expectation of a sum … | fact | linked | Expected Value: “It is linear: $E[aX + b] = aE[X] + b$” |
| The unreimbursed portion of a loss is the loss times (1 minus the reimbursement percentage); a fully reimbursed loss contributes zero unrei… | procedure | missing |  |

</details>

<details><summary><code>p-652</code> · untagged</summary>

Tagged pages: Conditional and Marginal Probability Functions, Variance and Standard Deviation

| Item | Kind | Status | Where |
|---|---|---|---|
| The marginal probability function of X from a joint probability function is obtained by summing the joint probabilities over all admissible… | definition | tagged | Conditional and Marginal Probability Functions: “The marginal is found by summing (or integrating, in the continuous case) the [[Joint Probability F…” |
| The support of a joint probability function (e.g., y limited to 0 through x) determines which terms are included when summing to get a marg… | fact | elsewhere | Joint Probability Density Function: “The [[Marginal Probability Function\\|marginal]] $f_X(x)$ integrates $y$ **out** — the limits on tha…” |
| For a discrete random variable, E[X] = sum of x·p(x) and E[X^2] = sum of x^2·p(x) over the support. | formula | tagged | Variance and Standard Deviation: “E[N^2] &= 0^2(0.6) + 1^2(0.3) + 2^2(0.1) \\” |
| The variance of a random variable is Var(X) = E[X^2] - (E[X])^2. | formula | tagged | Variance and Standard Deviation: “The second form $E[X^2] - \mu^2$ is the one to use in practice — it needs only two moments and avoi…” |

</details>

<details><summary><code>p-653</code> · gap</summary>

Tagged pages: Independent Events, Probability Rules

| Item | Kind | Status | Where |
|---|---|---|---|
| Build the distribution of the sum of two independent discrete random variables by enumerating the outcome combinations that produce each su… | procedure | missing |  |
| For independent trials, the probability of a joint event is the product of the individual probabilities, so the probability that two indepe… | fact | tagged | Independent Events: “$$P(A \cap B) = P(A) \cdot P(B)$$” |
| The probability of an event equals one minus the probability of its complement, which is useful when the complement is easier to compute. | fact | tagged | Probability Rules: “The complement rule is the workhorse shortcut — "at least one" is almost always faster as $1 - P(\t…” |
| For a fair die with equally likely faces, the probability of a given value is the number of faces showing that value divided by the total n… | definition | elsewhere | Uniform Discrete: “$$P(X = k) = \frac{1}{n}, \quad k = 1, 2, \ldots, n$$” |

</details>

<details><summary><code>p-654</code> · untagged</summary>

Tagged pages: Order Statistics, Uniform Continuous Distribution

| Item | Kind | Status | Where |
|---|---|---|---|
| The CDF of the maximum of n independent random variables is the product of their individual CDFs, since the maximum is at most x exactly wh… | procedure | tagged | Order Statistics: “$$P\bigl(X_{(n)} \le x\bigr) = F_1(x)\,F_2(x)\cdots F_n(x)$$” |
| The CDF of a uniform random variable on [0, b] is F(x) = x/b for 0 ≤ x ≤ b. | fact | tagged | Uniform Continuous Distribution: “$E[X] = (a+b)/2$, $\text{Var}(X) = (b-a)^2/12$, and $F(x) = (x-a)/(b-a)$ for $a < x < b$” |
| The density of a continuous random variable is obtained by differentiating its CDF. | procedure | elsewhere | Continuous Random Variable: “$$f(x) = F'(x)$$” |
| The expected value of a continuous random variable is E[X] = ∫ x f(x) dx over its support. | formula | elsewhere | Expected Value: “\displaystyle\int_{-\infty}^{\infty} x\, f(x)\, dx & \text{(continuous)}” |
| For n independent uniform random variables on [0, b], the maximum has expected value n/(n+1) times b. | fact | tagged | Order Statistics: “For the $\text{Uniform}(0,1)$ distribution: $E[X_{(k)}] = \dfrac{k}{n+1}$” |

</details>

<details><summary><code>p-655</code> · untagged</summary>

Tagged pages: Poisson Distribution, Variance and Standard Deviation

| Item | Kind | Status | Where |
|---|---|---|---|
| A Poisson rate is proportional to the length of the exposure period, so the rate for a new period equals the given rate per unit time multi… | procedure | elsewhere | Poisson Process: “The number of events in any interval of length $t$ has distribution $\text{Poi}(\lambda t)$” |
| For a Poisson distribution with parameter lambda, the mean and the variance both equal lambda. | fact | tagged | Poisson Distribution: “A defining property is $E[X] = \text{Var}(X) = \lambda$ — the mean and variance are equal” |
| The standard deviation of a random variable is the positive square root of its variance. | definition | tagged | Variance and Standard Deviation: “$$\sigma = \text{SD}(X) = \sqrt{\text{Var}(X)}$$” |

</details>

Nothing here edits the vault. A gap is fixed from the syllabus reading, in general form — never by copying the question's own numbers onto the page — and the edited page is fact checked again (docs/verification.md).
