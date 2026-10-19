---
id: "altam-2024s-q2"
exam: "Exam ALTAM"
topic: "Joint Life"
learning_objective: "Joint Life Insurance and Annuities"
difficulty: medium
type: multi-part
year: 2024
session: Spring
wiki_link:
  - Concepts/Joint+Life
  - Concepts/Multiple+State+Model
  - Concepts/Annuities
  - Concepts/Policy+Value
  - Concepts/Fractional+Age+Assumption
  - Concepts/Adverse+Selection
points: 9
---

An insurer models the mortality of couples, denoted $(x)$ and $(y)$, using the Markov multiple-state model described in the following diagram:

*(Figure: four states — State 0: $(x)$ alive, $(y)$ alive; State 1: $(x)$ dead, $(y)$ alive; State 2: $(x)$ alive, $(y)$ dead; State 3: $(x)$ dead, $(y)$ dead — with arrows from State 0 to State 1, State 0 to State 2, State 1 to State 3 and State 2 to State 3.)*

## Part a (1 point)

Your colleague states that this model assumes that the future lifetimes of $(x)$ and $(y)$ are independent. State with reasons whether or not your colleague is correct.

### Explanation
The colleague is incorrect.

The future lifetimes will be independent if and only if $\mu^{01}_{x:y} = \mu^{23}_{x}$ and $\mu^{02}_{x:y} = \mu^{13}_{y}$.

If $\mu^{01}_{x:y} \ne \mu^{23}_{x}$ and/or $\mu^{02}_{x:y} \ne \mu^{13}_{y}$ then the force of mortality for each life depends on the status of the other life, creating dependent future lifetimes.

### Examiner Report
There were several common errors on this part. Many candidates assumed that they had information they didn't in terms of independence, eg that we knew something about the forces of mortality to determine independence. Other candidates incorrectly assumed that the lack of a common shock implied independence. Lastly, some candidates either failed to mention whether the hypothetical colleague in the question was correct/incorrect, or stated both sides of the argument without definitively choosing independence or dependence.

## Part b (3 points)

(i) Write down an integral expression for ${}_tp^{01}_{x:y}$ using multiple state model notation.

(ii) Write down an integral expression for ${}_tq_{\overset{1}{x}:y}$ using multiple state model notation.

(iii) Describe in words the event which has probability ${}_tq_{\overset{1}{x}:y} - {}_tp^{01}_{x:y}$.

### Explanation
**(i)**

$${}_tp^{01}_{x:y} = \int_0^t {}_rp^{00}_{x:y}\,\mu^{01}_{x+r:y+r}\,{}_{t-r}p^{11}_{y+r}\,dr$$

**(ii)**

$${}_tq_{\overset{1}{x}:y} = \int_0^t {}_rp^{00}_{x:y}\,\mu^{01}_{x+r:y+r}\,dr$$

**(iii)** The difference is the probability that $(y)$ dies after $(x)$, but before the end of $t$ years, i.e. $\Pr\left[T_x < T_y \le t\right]$.

### Examiner Report
Parts i and ii were generally of the "you know it or you don't" type. Some candidates struggled with demonstrating the correct calculus, either missing the differential entirely or integrating over incorrect variables, eg x instead of time. For part iii, the most common error was simply stating what each probability meant and not what they meant together.

## Part c (2 points)

A couple, (50) and (60), purchase an annuity that pays 10,000 per year continuously while (60) is alive and (50) is dead. The insurer will refund 50% of the net single premium without interest at the moment of death of (60) if (60) dies before (50).

The insurer uses the following assumptions for premiums and policy values:

- The future lifetimes are independent.
- Mortality follows the Standard Ultimate Mortality Model.
- Deaths of (50) and (60) are uniformly distributed over each year of age.
- $i = 0.05$
- $\bar{A}_{x:y} \approx \dfrac{i}{\delta}A_{x:y}$; $\quad \bar{A}_{50:\overset{1}{60}} = 0.24898$; $\quad \bar{A}_{55:\overset{2}{65}} = 0.06091$

Show that the net single premium is 7250 to the nearest 25. You should calculate the value to the nearest 1.

### Explanation
$$P = 10{,}000\,\bar{a}_{50|60} + \tfrac{1}{2}P\bar{A}_{50:\overset{1}{60}}$$

$$\bar{a}_{50|60} = \left(\bar{a}_{60} - \bar{a}_{50:60}\right)$$

$$\bar{a}_{60} = \alpha(\infty)\ddot{a}_{60} - \beta(\infty) = (1.00020)(14.9041) - 0.50823 = 14.39885$$

Or

$$\bar{a}_{60} = \frac{1-\bar{A}_{60}}{\delta} = \frac{1-\frac{i}{\delta}\bar{A}_{60}}{\delta} = \frac{1-(1.02480)(0.29028)}{0.04879} = 14.39887$$

$$\bar{a}_{50:60} = \frac{1-\bar{A}_{50:60}}{\delta} = \frac{1-\frac{i}{\delta}A_{50:60}}{\delta} = \frac{1-(1.02480)(0.32048)}{0.04879} = 13.76454$$

Or

$$\bar{a}_{50:60} = \alpha(\infty)\ddot{a}_{50:60} - \beta(\infty) = (1.00020)(14.2699) - 0.50823 = 13.76452$$

$$\Rightarrow P = \frac{6343}{1-0.5(0.24898)} = 7245$$

Maybe slightly different due to rounding.

### Examiner Report
The most common errors here were either struggling with notation, eg calculating the wrong annuity or insurance, or incorrectly converting the reversionary annuity into single and joint annuities and from there converting from continuous to due annuities.

## Part d (2 points)

Calculate the net premium policy value at the end of 5 years if both lives are still alive.

### Explanation
$${}_5V^{(0)} = 10{,}000\left(\bar{a}_{65} - \bar{a}_{55:65}\right) + 0.5P\bar{A}_{55:\overset{1}{65}}$$

$$\bar{a}_{65} = \alpha(\infty)\ddot{a}_{65} - \beta(\infty) = (1.00020)(13.5498) - 0.50823 = 13.0442$$

$$\bar{a}_{55:65} = \frac{1-(1.02480)(0.38891)}{0.04879} = 12.3272$$

$$\bar{A}_{55:\overset{1}{65}} = \bar{A}_{65} - \bar{A}_{55:\overset{2}{65}} = (1.02480)(0.35477) - 0.06091 = 0.30266$$

$$\Rightarrow {}_5V^{(0)} = 7171.0 + 1096.3 = 8267.3$$

### Examiner Report
Generally, if candidates did well in part C they did well here. The most common error was using the wrong formula to find the value of the insurance.

## Part e (1 point)

At the end of 10 years only the older life, now age 70, is alive and decides to remarry. The survivor requests to apply the policy value as the net single premium for a continuous last survivor life annuity with the new spouse, commencing immediately. State with reasons whether the company would be likely to approve the request.

### Explanation
Annuities are not typically commutable (i.e. convertible into cash), because the adverse selection problem is too severe.

In this case, if the survivor were in very poor health, the value of the new last survivor annuity would be very much greater than the value of the existing single life annuity.

### Examiner Report
Very few candidates pointed out the adverse selection situation on the part of the surviving spouse, and very few commented on the surviving spouse at all which is what we were primarily looking for. Credit was given for coherent responses regarding the new spouse.
