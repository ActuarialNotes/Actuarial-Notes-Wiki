# Question formats

The app understands three `type`s (`quiz/src/lib/parser.ts`); every format below
is one of them. Pick the format that fits the **Bloom level** and the **fork** —
not the other way round — and vary formats across a batch.

| Format | `type` | How the app grades it | Suits |
|---|---|---|---|
| [Single best answer](#single-best-answer) | `multiple-choice` | Exact letter | Every level to Evaluate |
| [Numeric ranges (CAS style)](#numeric-ranges) | `multiple-choice` | Exact letter | Apply, Analyze |
| [Multiple true-false (I/II/III)](#multiple-true-false-iiiiii) | `multiple-choice` | Exact letter | Understand, Analyze |
| [True / false](#true--false) | `multiple-choice` | Exact letter | Remember, Understand (one-step misconceptions) |
| [Matching](#matching) | `multi-part` | Each part's letter, partial credit per part | Remember → Analyze |
| [Ordering](#ordering) | `free-entry` | Letters, case-insensitive | Understand, Analyze, Create |
| [Short answer — numeric](#short-answer--numeric) | `free-entry` | Number after stripping `$ , €` and rounding to 4 dp | Apply |
| [Short answer — one token](#short-answer--one-token) | `free-entry` | Case-insensitive text | Remember, Understand, Analyze |
| [Multi-step calculation](#multi-step-calculation) | `multi-part` | Each part, partial credit | Apply → Evaluate |
| [Written answer](#written-answer) | `multi-part` | Self-graded against the sample answer; **earns no credit** | Evaluate, Create |
| [Mixed](#mixed-compute-then-choose) | `multi-part` | Each graded part | Analyze → Create |

Every template below omits `verification:` — `verify_check.py --sync` adds it.

---

## Single best answer

Five options (A–E) for CAS banks, four or five for SOA. The stem poses a
complete question; every distractor is a named misconception.

```markdown
---
id: "masi-an-001"
exam: "Exam MAS-I"
topic: "Offset Variable"
learning_objective: "Extended Linear Models"
difficulty: medium
type: multiple-choice
bloom: understand
wiki_link:
  - Concepts/Offset+Variable
  - Concepts/Poisson+Regression
answer: "D"
points: 1
---

An insurer fits a Poisson GLM with a log link to claim counts by territory. Exposure (car-years) differs widely between territories, and the modeler enters $\ln(\text{exposure})$ as an offset. Which statement describes how the offset enters the model?

- A) It is a predictor whose coefficient is estimated along with the others
- B) It is a weight that scales each observation's contribution to the likelihood
- C) It divides the claim counts before fitting, so the response becomes a frequency
- D) It is added to the linear predictor with its coefficient fixed at 1
- E) It is a control variable held at its mean when predictions are made

## Explanation

An offset is a term in the linear predictor whose coefficient is **fixed at 1**, not estimated:

$$
\ln \mu_i = \ln(\text{exposure}_i) + \beta_0 + \beta_1 x_{i1} + \cdots
\quad\Longleftrightarrow\quad
\mu_i = \text{exposure}_i \cdot e^{\beta_0 + \beta_1 x_{i1} + \cdots}
$$

so expected counts are proportional to exposure and the $\beta$s describe frequency. The answer is **D**.

**Why not the others**

- **A** — entering log exposure as an ordinary predictor estimates its coefficient, so counts need not be proportional to exposure; that is a different (testable) model, not an offset.
- **B** — a prior weight changes each observation's variance, not its mean; weights are how exposure enters a *frequency* response, not a count.
- **C** — modelling counts ÷ exposure as the response is the weighted-frequency alternative; with an offset the response stays the count.
- **E** — a control variable is estimated and then neutralised in the rating; its coefficient is not fixed.
```

## Numeric ranges

The CAS's own shape for a calculation: five contiguous ranges, each holding the
result of a different mistake (and one holding the right value). Write the
ranges *after* computing every mistake's result, so no two land in one range.

```markdown
- A) Less than 0.10
- B) At least 0.10, but less than 0.15
- C) At least 0.15, but less than 0.20
- D) At least 0.20, but less than 0.25
- E) At least 0.25
```

In the explanation's "Why not the others", say which mistake leads to which
range ("dividing by $n$ instead of $n-1$ gives 0.137, in **B**").

## Multiple true-false (I/II/III)

Three statements, each true or false on its own; the options are CAS's fixed
key. Each statement is a fork of its own, so a reader must be right about all
three. Keep the five options exactly as below (the past papers use them), and
make sure the true set is one of A–D, or that E is genuinely the answer.

```markdown
Determine which of the following statements about the Kolmogorov-Smirnov test are true.

- I. The statistic is the largest absolute difference between the empirical and the hypothesized distribution functions.
- II. When the hypothesized distribution's parameters are estimated from the same data, the tabled critical values are too large, so the test rejects less often than its stated level.
- III. For a continuous hypothesized distribution, the difference must be checked just before and just after each data point.

- A) I only
- B) I and II only
- C) I and III only
- D) II and III only
- E) The answer is not given by (A), (B), (C), or (D)
```

All three statements above are true, so the key is **E** — the fixed key has no
"I, II and III" option, which is what makes E a live answer rather than a filler.
Note the statement list is `- I.` (not `- A)`), so the parser does not read the
statements as options. In the explanation, take each numeral in turn — true or
false, and why.

## True / false

Two options. Only worth writing when the false version is a misconception many
readers actually hold; otherwise the 50% guess rate makes the item noise. Always
make the explanation say what is true instead.

```markdown
True or false: for a Pareto severity with $\alpha = 2.5$, the variance is finite.

- A) True
- B) False
```

## Matching

A `multi-part` question: the items to match are the parts, and **each part
repeats the same option list** so the reader clicks a letter per item. Keep the
option list short (four or five, labels of a few words), one option may be used
twice or not at all (say so in the stem), and order parts so that the key isn't
A, B, C, D in sequence.

```markdown
---
id: "masi-an-002"
exam: "Exam MAS-I"
topic: "Added Variable Plot"
learning_objective: "Extended Linear Models"
difficulty: medium
type: multi-part
bloom: analyze
wiki_link:
  - Concepts/Added+Variable+Plot
  - Concepts/QQ+Plot
  - Concepts/Marginal+Model+Plot
points: 3
---

Match each finding to the diagnostic plot that would reveal it. An option may be used more than once or not at all.

## Part a (1 point)
The deviance residuals have a heavier right tail than the model assumes.

- A) QQ plot of residuals
- B) Added variable plot
- C) Marginal model plot
- D) Box plot of the response

### Answer
A

### Explanation
A QQ plot compares residual quantiles with the model's; a heavy right tail bends the upper points above the line. **B** and **C** look at one predictor's relationship with the response, not the residuals' distribution.

## Part b (1 point)
A new predictor would explain variation the current model leaves in the residuals.

- A) QQ plot of residuals
- B) Added variable plot
- C) Marginal model plot
- D) Box plot of the response

### Answer
B

### Explanation
…
```

## Ordering

`free-entry`: the reader types the letters in order. Use it to test a procedure
(the steps of a test, the stages of a model build) or a ranking. State the entry
format with an example that is **not** the answer, and keep it to four to six
items so a typo isn't the likely error.

```markdown
---
type: free-entry
bloom: analyze
answer: "CADB"
---

Put the steps of a Kolmogorov-Smirnov test of a fully specified distribution in the order they are carried out. Enter the letters with no spaces, e.g. ABCD.

- (A) Evaluate the hypothesized CDF at each data point
- (B) Compare the statistic with the critical value at the chosen level
- (C) Sort the sample and form the empirical CDF
- (D) Take the largest absolute gap, checking each side of every jump

## Explanation
…
```

List the items as `- (A)` — not `- A)` — so a `free-entry` question shows them
as text, not as clickable options.

## Short answer — numeric

`free-entry` with a number. The stem fixes the form precisely — decimal places,
percent or decimal, units — and `answer:` is that exact form. The comparison
strips `$`, `,`, `€` and rounds to four decimals, so `1,234` = `1234` and
`0.50` = `0.5`, but `0.153` ≠ `0.15`.

```markdown
---
type: free-entry
bloom: apply
answer: "0.25"
---

… Calculate the expected number of visits to state 2 before absorption, starting in state 1. Give your answer to two decimal places.

## Explanation
…

**Common wrong entries**

- **0.33** — inverting $I - P$ with the absorbing state left in $P$ …
```

## Short answer — one token

`free-entry` whose answer is a single word, symbol or letter the stem constrains
(a state label, "increase"/"decrease", a distribution named in the stem's list).
Only use it when there is **one** spelling a correct reader could type; if a
synonym is plausible, make it a single-best-answer item instead.

```markdown
Answer **increase**, **decrease**, or **unchanged**.
```

## Multi-step calculation

`multi-part`, each part graded (`### Answer` holds a letter for an option list,
or the value for a free-entry part). Later parts may use earlier results; give
the earlier result in the later part's stem when you don't want one slip to cost
every mark. `points` in frontmatter = the sum of the parts.

```markdown
---
type: multi-part
points: 2
---

<scenario shared by all parts>

## Part a (1 point)
Calculate the method-of-moments estimate of $\theta$. Give your answer to the nearest whole number.

### Answer
1200

### Explanation
…

## Part b (1 point)
Using $\theta = 1{,}200$, calculate … to three decimal places.

### Answer
0.368

### Explanation
…
```

## Written answer

A part with **no `### Answer`** is a written answer: the reader writes, then
grades themselves (Full / Partial / No credit) against the explanation, which is
the sample answer. It counts toward no score and no mastery — so use it for what
can't be selected (justify, recommend, design), and pair it with a graded part.

A single written question with no parts:

```markdown
---
type: multi-part
bloom: evaluate
points: 1
---

<scenario>

Recommend whether the insurer should model claim counts with a Poisson or a negative binomial GLM, and justify the recommendation with two pieces of evidence from the output.

### Explanation

A full-credit answer makes these points:

1. …
2. …

**Sample answer.** …
```

## Mixed: compute, then choose

The strongest Evaluate/Create shape: a graded calculation part, then a graded
choice that depends on it, then (optionally) a written justification.

```markdown
## Part a (1 point)
Calculate the AIC of Model 2. Give your answer to one decimal place.

### Answer
…

## Part b (1 point)
Which model is preferred by AIC?

- A) Model 1
- B) Model 2
- C) Model 3

### Answer
B

### Explanation
…

## Part c (1 point)
Explain why BIC might prefer a different model here.

### Explanation
A full-credit answer …
```
