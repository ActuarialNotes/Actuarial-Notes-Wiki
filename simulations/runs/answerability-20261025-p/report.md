# Answerability: Exam P-1 (SOA)

Run `answerability-20261025-p` · 54 questions checked of 54 attempted · cost $7.65

Each question's official solution was broken into the knowledge it uses (by a model that saw no study page), and each item was looked for on the pages the vault gives for the question. An item counts as taught only if a quote of the teaching passage is really on the page; the check is done in code. *Answerable* is necessary, not sufficient: a page can hold the formula and still not teach it well.

| Verdict | Questions | Share |
|---|---|---|
| **Answerable** — everything taught on a tagged page, one link away or on a prerequisite exam's page | 7 | 13% |
| **Untagged** — everything is in the vault, but some of it on a page neither tagged nor linked | 21 | 39% |
| **Gap** — something the solution uses is taught on no page | 26 | 48% |

Requirements: 212 — tagged 101 (48%), linked 27 (13%), prerequisite 1 (0%), elsewhere 49 (23%), missing 34 (16%)
Not checked: 9 off syllabus.

## By sitting

A paper whose gaps far outrun the rest may test a reading the syllabus has since dropped.

| Sitting | Questions | Answerable | Untagged | Gap |
|---|---|---|---|---|
| Undated (samples and the vault's own) | 54 | 7 | 21 | 26 (48%) |

## Gaps, by the page that should teach them

Ranked by how many questions each page's gaps cost. The page is the one named for the item's concept; "no page" means the vault has no page by that name.

### `Concepts/Binomial Distribution.md` — 4 question(s)

- `p-027` (fact): When a shipment contains a very large number of items, the number of defective items in a fixed-size sample can be modeled as binomial with the defect proportion as the success probability (independent trials).
- `p-030` (procedure): The fund is inadequate when the total payment (number of qualifying employees times C) exceeds the fund, so the inadequacy probability is P[X > fund/C].
- `p-031` (fact): When n independent trials each fall into one of several categories with fixed probabilities, the counts in each category follow a multinomial distribution (trinomial for three categories).
- `p-031` (formula): The multinomial probability of counts (n1,...,nk) in n trials is n!/(n1!...nk!) times p1^n1 ... pk^nk.
- `p-039` (procedure): When an event occurs independently in each of several groups with the same probability P, the probability that it occurs in exactly one of two groups is a binomial probability: 2P(1-P).

### `Concepts/Conditional Probability.md` — 3 question(s)

- `p-021` (procedure): Translate statements such as 'X is k times as likely as Y to die' into relations between conditional probabilities (P[D\|X] = k P[D\|Y]), and express all conditional probabilities in terms of a single unknown parameter that cancels in the final ratio.
- `p-025` (procedure): Translate a statement that one group is k times as likely to have a trait as another into a conditional probability relation, P[S\|C] = k P[S\|C^c], and let the common unknown factor cancel in the Bayes ratio.
- `p-026` (procedure): When told the outcome belongs to a restricted subset of events, restrict the partition in the Bayes denominator to only those events (exclude the other categories), so the conditioning is on accident and membership in the subset.

### `Concepts/Expected Value.md` — 2 question(s)

- `p-045` (procedure): To find a benefit amount giving a target expected payment, write the expected payment as the benefit amount times a sum of payment-fraction-weighted interval probabilities, set it equal to the target, and solve for the amount.
- `p-047` (procedure): Model a payment that is zero for the first event and a fixed amount per event thereafter as a function of the count N: payment = amount × (N−1) when N ≥ 1 and 0 when N = 0, i.e. amount × max(N−1, 0).
- `p-047` (procedure): To compute E[max(N−1,0)], extend the sum of (n−1)P(N=n) to include n=0 (equal to E[N−1]) and correct by adding back P(N=0), since E[max(N−1,0)] = E[N] − 1 + P(N=0).

### **no page for Change of Variables (u-Substitution) in Integration** — 1 question(s)

- `p-052` (procedure): To integrate a function of (1+x), use a change of variables u = 1+x, which shifts the integration limits accordingly and rewrites x as u-1 so the integrand becomes a sum of power terms.

### **no page for Complement of an Event** — 1 question(s)

- `p-009` (fact): Because every customer insures at least one car, the complement of 'insures more than one car' is 'insures exactly one car'.

### **no page for Convolution of Independent Random Variables** — 1 question(s)

- `p-015` (procedure): The distribution of a sum of two independent discrete random variables is found by convolution: P[X+Y=k] = sum over i of P[X=i]·P[Y=k−i], with the sum running over all i from 0 to k when both variables take nonnegative integer values.

### **no page for Geometric Series** — 1 question(s)

- `p-013` (formula): The sum of an infinite geometric series with first term a and common ratio \|r\| < 1 equals a/(1 − r).

### **no page for Independence of Events** — 1 question(s)

- `p-010` (definition): Two events A and B are independent if and only if P(A ∩ B) = P(A)P(B). — *the locator quoted text that isn't on the page:* “> $$P(A \cap B) = P(A) \cdot P(B)$$”
- `p-010` (fact): If events A and B are independent, then their complements are also independent, so P(A^c ∩ B^c) = P(A^c)P(B^c).

### **no page for Law of Total Expectation** — 1 question(s)

- `p-049` (procedure): When a loss occurs only with some probability and its severity has a conditional distribution given a loss, the unconditional expected payment equals the loss probability times the conditional expected payment given a loss (conditioning on whether a loss occurs).

### **no page for Linear Transformation of a Random Variable** — 1 question(s)

- `p-055` (procedure): A percentage increase of p applied to every cost is modeled as multiplying the random variable by the factor (1 + p), i.e., Y = (1 + p)X.

### **no page for Piecewise Density Functions** — 1 question(s)

- `p-043` (procedure): When the density involves an absolute value, split the integral at the point where the expression inside the absolute value changes sign and replace \|x\| with -x for x<0 and x for x>0 on the respective pieces.

### **no page for Probability of Events** — 1 question(s)

- `p-008` (procedure): Translate a verbal description of event probabilities (both, neither, one exceeds the other by a constant) into probability equations on events, then substitute into the union formula and solve for the unknown probability.

### **no page for Probability of an Event** — 1 question(s)

- `p-010` (procedure): Translate a verbal relationship such as 'X is twice as likely as Y' into the equation P(X) = 2P(Y), and combine it with the independence product equation to solve for the individual probabilities.

### **no page for Telescoping Series** — 1 question(s)

- `p-023` (fact): A rational term 1/((n+1)(n+2)) can be decomposed by partial fractions into 1/(n+1) − 1/(n+2), so partial sums telescope to a closed form such as P[N ≤ k] = 1 − 1/(k+2).

### **no page for Venn Diagrams and Disjoint Event Partitions** — 1 question(s)

- `p-012` (fact): The event that a woman has both A and B is the union of two disjoint events: having exactly A and B only, and having all three A, B and C, so P[A∩B] = P[exactly A and B] + P[A∩B∩C].

### `Concepts/Cumulative Distribution Function (CDF).md` — 1 question(s)

- `p-030` (procedure): Find the largest payment amount by computing cumulative probabilities P[X ≤ k] and finding the smallest integer k whose tail P[X > k] is below the threshold, then setting C = fund/k.

### `Concepts/Deductible.md` — 1 question(s)

- `p-051` (fact): A total loss of a vehicle means the damage equals the vehicle's full value, so the payment is the value minus the deductible.

### `Concepts/Exponential Distribution.md` — 1 question(s)

- `p-028` (procedure): Calibrate the exponential parameter by setting the CDF at a given time equal to the stated probability (proportion) and solving for lambda, then use that lambda to compute the CDF at another time.

### `Concepts/Inclusion-Exclusion Principle.md` — 1 question(s)

- `p-014` (fact): When each outcome belongs to exactly two of the listed events, summing the individual event probabilities counts each outcome twice, so the total of the individual probabilities equals twice the probability of the union of the outcomes.

### `Concepts/Independent Events.md` — 1 question(s)

- `p-016` (procedure): To find an unknown event probability, translate the verbal statements into probabilities of events (such as a union and a complement), substitute the independence product for the intersection in the union formula, and solve the resulting equation for the unknown.

### `Concepts/Independent Random Variables.md` — 1 question(s)

- `p-031` (fact): Drawing each individual at random from a large pool makes the draws independent with constant category probabilities equal to the pool proportions.

### `Concepts/Negative Binomial Distribution.md` — 1 question(s)

- `p-041` (fact): The event that at least r successes occur before the s-th failure in independent trials is equivalent to having at least r successes in the first r+s-1 trials.

### `Concepts/Poisson Distribution.md` — 1 question(s)

- `p-029` (procedure): To find an unknown distribution parameter from a stated relationship between probabilities (e.g., one probability is a multiple of another), write each probability using the pmf, set up the equation, and solve for the parameter.

### `Concepts/Probability Mass Function (PMF).md` — 1 question(s)

- `p-013` (procedure): A recursive relation p(n+1) = r·p(n) between successive probabilities can be solved by iterating it to get p(n) = r^n · p(0).

### `Concepts/The Law of Total Probability.md` — 1 question(s)

- `p-015` (fact): The event that a sum of nonnegative integer-valued random variables equals k is the disjoint union of the events {N1=i, N2=k−i} for i=0,...,k, so their probabilities can be added.

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
| `p-059` | Continuous Random Variable, Uniform Continuous Distribution |

## Taught only in a collapsed section

The passage that teaches these items sits inside a folded callout (a worked example, a table behind a toggle). A reader who skims never opens it.

| Page | Questions | Items |
|---|---|---|
| Axioms of Probability | 5 | The probability of a complement is Pr(A^c) = 1 - Pr(A).; The complement rule states P(A^c) = 1 − P(A).; The probabilities of mutually exclusive, exhaustive categories (e.g., high, low… |
| Bayes Theorem | 3 | The given renewal rates are conditional probabilities of renewing given the pol…; Treat the percentages of each group as prior probabilities P(A_i) and the group…; Translate the stated rates into conditional probabilities: the detection rate w… |
| Conditional Probability | 3 | If E is a subset of F (e.g. having none of the factors implies not having A), t…; To evaluate a conditional probability where one event is contained in the other…; To find a conditional probability such as P[X < b \| X ≥ a] for a continuous va… |
| Mutually Exclusive Events | 3 | The probabilities of a set of mutually exclusive and exhaustive events sum to 1…; Probabilities of a set of mutually exclusive, exhaustive categories sum to 1, s…; The probability of completing (not dropping out) equals the complement of the d… |
| Uniform Discrete | 2 | For a piecewise payment schedule (a rate up to a threshold and a different rate…; Model a benefit that depends on the year of failure as a random variable by ass… |
| Venn Diagram | 2 | The count of a set that is in one category and not in another equals the count …; The probability of the union of events equals the sum of the probabilities of t…; The probability of a single event A equals the sum of the probabilities of all … |
| Beta | 1 | Find the probability that a continuous loss exceeds a value t by integrating th… |
| Continuous Univariate Distributions | 1 | For a continuous random variable with density f, the probability P[a < Y < b] e… |
| Cumulative Distribution Function (CDF) | 1 | The probability that a continuous random variable falls in an interval (a, b] e… |
| Expected Value | 1 | To find the expected payment under a piecewise payment schedule, multiply each … |
| Exponential Distribution | 1 | The probability that a random event time falls within a time period equals the … |
| Mixture Distribution | 1 | A jump in the CDF at a point (F(x) greater than its left-hand limit) indicates … |
| Normal Distribution | 1 | For a standard normal variable Z, the upper tail probability P(Z > z) equals 1 … |
| Percentile | 1 | To find a percentile, set the CDF equal to p and solve for x, giving a closed-f… |
| Posterior Distribution | 1 | To find the probability of a category given an outcome, treat the category prop… |
| Probability Density Function (PDF) | 1 | A probability density function must be integrated over the specified support (h… |
| Set Operations | 1 | A marginal probability is the sum of the joint probabilities over the categorie… |

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

<details><summary><code>p-059</code> · untagged</summary>

Tagged pages: Variance and Standard Deviation, Standard Deviation, Deductible

| Item | Kind | Status | Where |
|---|---|---|---|
| With a deductible d, the insurance payment for a loss X is Y = max(0, X - d), which is zero when the loss is below the deductible and X - d… | procedure | tagged | Deductible: “If the loss $X$ is less than or equal to the deductible $d$, the insurer pays nothing; above $d$ it…” |
| The density of a uniform random variable on (a, b) is 1/(b-a) on that interval and 0 elsewhere. | formula | elsewhere | Uniform Continuous Distribution: “$$f(x) = \frac{1}{b - a}, \quad a < x < b$$” |
| The expected value of a function g(X) of a continuous random variable is E[g(X)] = ∫ g(x) f(x) dx, integrated over the support of X, and fo… | formula | elsewhere | Continuous Random Variable: “Expectations replace sums with integrals: $E[g(X)] = \int g(x)\,f(x)\,dx$” |
| The variance of a random variable is Var(Y) = E[Y^2] - (E[Y])^2, and the standard deviation is the square root of the variance. | formula | tagged | Variance and Standard Deviation: “$$\sigma^2 = \text{Var}(X) = E\left[(X - \mu)^2\right]$$” |

</details>

Nothing here edits the vault. A gap is fixed from the syllabus reading, in general form — never by copying the question's own numbers onto the page — and the edited page is fact checked again (docs/verification.md).
