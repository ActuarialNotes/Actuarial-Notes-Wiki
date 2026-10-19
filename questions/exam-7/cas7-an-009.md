---
id: "cas7-an-009"
exam: "Exam 7"
topic: "Chain Ladder Assumptions"
learning_objective: "Estimation of Claims Liabilities"
difficulty: medium
type: multi-part
bloom: analyze
wiki_link:
  - Concepts/Chain+Ladder+Assumptions
  - Concepts/Mack+Chain+Ladder+Model
  - Concepts/Calendar+Year+Effect
  - Concepts/Development+Factor+Correlation+Test
points: 5
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:579d449e14e0f1e59f1c0765eea50dae9b55f2445148bfb46c4bce30248a2199
  sources: []
  open_findings: 0
  open_critical: 0
  log: .verify/questions/exam-7/cas7-an-009.md
---

Mack (1994) shows that the chain ladder implicitly assumes three things about the cumulative losses $C_{ik}$ of accident year $i$ at age $k$ (numbered here 1 to 3; the paper numbers them (3), (4) and (5)):

- **(1)** $E(C_{i,k+1} \mid C_{i1}, \dots, C_{ik}) = C_{ik}\,f_k$
- **(2)** $\{C_{i1}, \dots, C_{iI}\}$ and $\{C_{j1}, \dots, C_{jI}\}$ are independent for $i \ne j$
- **(3)** $\text{Var}(C_{i,k+1} \mid C_{i1}, \dots, C_{ik}) = C_{ik}\,\alpha_k^2$

An actuary reviewing a paid triangle finds each of the following. Match each finding to the assumption it calls into question. An option may be used more than once or not at all.

## Part a (1 point)
In every development column, the factors whose numerator is the 2023 valuation are below the column's median, and the factors whose denominator is the 2023 valuation are above it. Mack's test statistic is $Z = 0$, outside the 95% range $(1.155,\ 5.845)$.

- A) Assumption (1), expected losses proportional to losses to date
- B) Assumption (2), independence of accident years
- C) Assumption (3), variance proportional to losses to date
- D) None of the three: the finding is consistent with all of them

### Answer
B

### Explanation
A diagonal that is low in every accident year (for instance a payment backlog in 2023 that was cleared in 2024) is a **calendar year effect**. Development factors into that diagonal run small and factors out of it run large. One influence acting on every accident year at once means the accident years are not independent, which is **assumption (2)**. Mack tests for it by counting large and small factors on each diagonal, and $Z = 0$ outside $E(Z) \pm 2\sqrt{\text{Var}(Z)} = (1.155,\ 5.845)$ rejects "no calendar year effects" at the 5% level.

- **A** is tempting because the effect shows up in the development factors. But each accident year can still follow $C_{ik}f_k$ on average. What breaks is the link *across* accident years along a diagonal.
- **C** concerns the spread of each year's next value around its own mean, which a diagonal shift does not test.
- **D** would hold only if the effect were steady across calendar years. A single low diagonal is a change, and it distorts every average factor that includes it.

## Part b (1 point)
Mack's rank-correlation test of adjacent development factors gives $T = -0.30$, against a 50% critical value of 0.274 ($= 0.67\sqrt{\text{Var}(T)}$). Years with a high 12–24 factor tend to have a low 24–36 factor.

- A) Assumption (1), expected losses proportional to losses to date
- B) Assumption (2), independence of accident years
- C) Assumption (3), variance proportional to losses to date
- D) None of the three: the finding is consistent with all of them

### Answer
A

### Explanation
Under **assumption (1)** the expected next factor is $f_k$ whatever the earlier factors were, because the conditional mean depends on the history only through $C_{ik}$. That makes subsequent factors uncorrelated. Here $|T| = 0.30 > 0.274$, so Mack's test rejects uncorrelated factors: a high factor is followed by a low one. The chain ladder ignores this, so it should be applied with reluctance to such business.

- **B** confuses correlation *within* an accident year (between its successive factors) with dependence *between* accident years. The test compares each year's factors only with its own earlier ones.
- **C** is about how widely the next value scatters, not about whether its mean depends on the earlier factors.
- **D** treats the correlation as noise, but the test was designed to catch exactly this departure.

## Part c (1 point)
Claims inflation has run at a steady 4% a year in every calendar year covered by the triangle, and is expected to continue at that rate.

- A) Assumption (1), expected losses proportional to losses to date
- B) Assumption (2), independence of accident years
- C) Assumption (3), variance proportional to losses to date
- D) None of the three: the finding is consistent with all of them

### Answer
D

### Explanation
A **constant** rate of inflation is built into every historical development factor in the same way, so the chain ladder simply extrapolates it into the future. What Mack names as affecting several accident years in the same way is *changes*: in claims handling, in case reserving, or in the inflation rate. A single high or low diagonal distorts the projection; a steady trend does not. A steady trend that is expected to continue calls none of the assumptions into question.

- **B** is the reflex answer, because inflation acts along diagonals. But a uniform effect on every diagonal does not make one accident year's development informative about another's beyond what the shared factors already capture.
- **A** and **C** are not touched: the factors are stable, and nothing is said about the scatter around them.

## Part d (1 point)
For $k = 3$, the weighted residuals $(C_{i,4} - C_{i3}\hat f_3)/\sqrt{C_{i3}}$, plotted against $C_{i3}$, fan out: they are small for small $C_{i3}$ and grow steadily larger for larger $C_{i3}$. The residuals of the simple-average factor $f_{30}$, which assumes variance proportional to $C_{i3}^2$, show no pattern.

- A) Assumption (1), expected losses proportional to losses to date
- B) Assumption (2), independence of accident years
- C) Assumption (3), variance proportional to losses to date
- D) None of the three: the finding is consistent with all of them

### Answer
C

### Explanation
Dividing by $\sqrt{C_{i3}}$ standardizes the residuals only if $\text{Var}(C_{i4}) \propto C_{i3}$, which is **assumption (3)**. If that holds, the weighted residuals have the same variance at every size and look random. A fan shape means the variance grows faster than $C_{i3}$. Mack's procedure compares the three residual plots; when the volume-weighted one is nonrandom and the $f_{k0}$ one is random, replacing $\hat f_k$ by $f_{k0}$ should be seriously considered. That is because the variance assumption decides which average of the individual factors has minimum variance.

- **A** would show as residuals with a trend in their *level* (all positive at one end, negative at the other), or as points off a line through the origin. A fan shape is a pattern in their *spread*.
- **B** concerns diagonals, and nothing here is arranged by calendar year.
- **D** would apply only if the weighted residuals looked random.

## Part e (1 point)
A plot of $C_{i2}$ against $C_{i1}$ is close to a straight line, but the line has a clear positive intercept and a flatter slope than $\hat f_1$. The amounts emerging from 12 to 24 months are roughly the same in every accident year.

- A) Assumption (1), expected losses proportional to losses to date
- B) Assumption (2), independence of accident years
- C) Assumption (3), variance proportional to losses to date
- D) None of the three: the finding is consistent with all of them

### Answer
A

### Explanation
**Assumption (1)** says $E(C_{i2}) = C_{i1}f_1$: a straight line *through the origin*. A positive intercept means part of the next period's losses arrives regardless of the amount reported so far, which Venter writes as the alternative $f(d)c(w,d) + g(d)$. Mack's own example finds this at $k = 1$: the line through the origin "does not capture the data well", and the forecast for the latest accident year is highly uncertain. When emergence is a roughly constant amount, a Bornhuetter-Ferguson or Cape Cod pattern is the better candidate.

- **C** is a reasonable guess because the points sit off the fitted line. But the problem is the line's *shape* (an intercept), not the scatter around it.
- **B** and **D** don't apply: nothing points to a diagonal, and a fitted line that misses the data is not consistent with the chain ladder's mean assumption.
