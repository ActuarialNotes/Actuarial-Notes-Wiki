---
concept: "Entropy"
exam: exam-mas-ii
topic: "C. Statistical Learning"
correct: B
---
A node holds an even 50/50 mix of two classes, and a candidate split sends it into two perfectly pure children. What is the information gain from that split?

- A) Zero — the split moves observations around but does not change how many there are
- B) The parent's impurity in full, because both children contribute none
- C) Negative, since adding a split increases the tree's complexity
- D) Indeterminate without knowing the class proportions inside each child

<!-- rationale: 0: confuses conservation of observations with reduction in impurity · 2: folds the cost-complexity pruning penalty into a quantity that does not include it · 3: overlooks that "perfectly pure" already fixes each child's impurity at zero -->
