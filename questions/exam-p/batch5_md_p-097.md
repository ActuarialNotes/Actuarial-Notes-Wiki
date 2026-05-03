---
id: p-097
topic: General Probability
subtopic: Combinatorics
difficulty: medium
type: multiple-choice
tags:
  - exam-p
  - combinatorics
wiki_link: Concepts/Combinatorics
answer: C
points: 1
---

Thirty items are arranged in a 6-by-5 array.

Calculate the number of ways to form a set of three distinct items such that no two of the selected items are in the same row or same column.

- A) 200
- B) 760
- C) 1200
- D) 4560
- E) 7200

## Explanation

To form a set of three items such that no two are in the same row or column:

1.  First, select the three columns from the 5 available columns. There are $\binom{5}{3} = 10$ ways to do this.
2.  Next, from the first selected column (which has 6 rows), select an item. There are 6 choices.
3.  From the second selected column, select an item. To avoid the row used by the first item, there are $6-1=5$ choices.
4.  From the third selected column, select an item. To avoid the rows used by the first two items, there are $6-2=4$ choices.

The total number of sets is $10 \times 6 \times 5 \times 4 = 1200$.
