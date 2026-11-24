---
id: "pa-an-017"
exam: "Exam PA"
topic: "Principal Components Analysis"
learning_objective: "Data Transformations and Unsupervised Learning Techniques"
difficulty: medium
type: multi-part
bloom: analyze
wiki_link:
  - Concepts/Principal+Components+Analysis
  - Concepts/Scree+Plot
points: 3
---

An insurer wants a few features summarizing its territories for a frequency model. An actuary runs principal components analysis on five territory-level variables, each standardized: population density, traffic accidents per 1,000 residents, share of drivers under 25, average vehicle value and average commute distance. The eigenvalues of the correlation matrix are 2.6, 1.3, 0.6, 0.3 and 0.2.

## Part a (1 point)
Calculate the proportion of variance explained by the first two principal components together. Give your answer to two decimal places.

### Answer
0.78

### Explanation
The proportion of variance explained by a component is its eigenvalue divided by the sum of all the eigenvalues, which is the total variance. Five standardized variables have total variance 5:

$$
\frac{2.6 + 1.3}{2.6 + 1.3 + 0.6 + 0.3 + 0.2} = \frac{3.9}{5.0} = 0.78
$$

The answer is **0.78**. Entering **0.52** gives the first component's share alone; entering **3.90** reports the eigenvalues' sum without dividing by the total variance.

## Part b (1 point)
Using the rule that keeps the components whose eigenvalue is greater than 1, how many components does the actuary keep?

- A) 1
- B) 2
- C) 3
- D) 4
- E) 5

### Answer
B

### Explanation
On standardized data each variable has variance 1, so a component worth keeping carries more than one variable's variance. Two eigenvalues, 2.6 and 1.3, exceed 1, so the rule keeps **two** components. The scree plot agrees: the large drops (1.3 and 0.7) stop after the second component, and the last three eigenvalues form a flat tail.

- **A** keeps only the dominant component, ignoring that 1.3 also exceeds 1.
- **C**, **D** and **E** keep components whose eigenvalue is below 1, each carrying less variance than one original variable.

## Part c (1 point)
A colleague reruns the analysis on the same five variables centred but not standardized. Average vehicle value is in dollars, with a standard deviation of about 9,000; the other variables are rates, shares and distances with standard deviations below 50. What is the main effect on the result?

- A) Nothing changes, because principal components do not depend on the scale of the variables
- B) The loadings of the first component all change sign, and nothing else changes
- C) The proportions of variance explained are unchanged, but the loadings change
- D) Average vehicle value dominates the first principal component

### Answer
D

### Explanation
The principal components depend on the scale of the variables. When the variables are only centred, the ones with the largest variances dominate the first components. Average vehicle value has by far the largest variance, so the first component lies almost along it and explains nearly all the total variance. This is why variables measured in different units are standardized.

- **A** is the opposite of the rule: scaling changes the loadings.
- **B** confuses scaling with the sign of a loading vector, which is arbitrary in any analysis: changing every sign gives the same component.
- **C** misses that the total variance and its split change too, since the dollar variable's variance swamps the others.
