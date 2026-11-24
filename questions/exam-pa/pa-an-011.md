---
id: "pa-an-011"
exam: "Exam PA"
topic: "Data Visualization"
learning_objective: "Data Exploration and Visualization"
difficulty: easy
type: free-entry
bloom: apply
wiki_link:
  - Concepts/Data+Visualization
answer: "6.0"
points: 1
---

A draft exhibit for a rate filing shows each territory's relativity as a bar. To make the differences easier to see, the analyst started the vertical axis at 0.90. Territory 4's relativity is 1.20 and territory 7's is 0.95.

How many times as tall as territory 7's bar does territory 4's bar appear? Give your answer to one decimal place.

## Explanation

A bar encodes its value by its length. When the axis starts at $a$, the bars are drawn from $a$, so a bar of value $v_1$ looks as many times as long as a bar of value $v_2$ as

$$
\frac{v_1 - a}{v_2 - a} = \frac{1.20 - 0.90}{0.95 - 0.90} = \frac{0.30}{0.05} = 6.0
$$

The answer is **6.0**. The actual ratio is 1.20/0.95 = 1.26, so the chart makes territory 4 look six times as costly when it is about 26% more costly. A bar chart's axis should start at zero; to show small differences, plot points or the differences from 1.00 instead.

**Common wrong entries**

- **1.3**: the actual ratio of the relativities, which is what the chart should show but not what it shows.
- **0.3**: subtracting the axis start from the taller bar only, $0.30/0.95$, which mixes a drawn length with a true value.
