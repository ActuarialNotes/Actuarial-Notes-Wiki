---
id: "pa-an-031"
exam: "Exam PA"
topic: "Classification Tree"
learning_objective: "Tree-Based Models"
difficulty: medium
type: multiple-choice
bloom: apply
wiki_link:
  - Concepts/Classification+Tree
  - Concepts/Tree+Pruning
  - Concepts/Cross-Validation
answer: "B"
points: 1
---

An actuary grows a large classification tree to flag auto claims for review, then prunes it by cost-complexity pruning, with the number of misclassified training claims as the error term. The candidate subtrees are:

| Terminal nodes | Misclassified training claims |
| ---: | ---: |
| 1 | 300 |
| 3 | 240 |
| 6 | 205 |
| 10 | 190 |
| 16 | 184 |

Cross-validation selects the complexity parameter $\alpha = 25$. Which subtree is used?

- A) 1 terminal node
- B) 3 terminal nodes
- C) 6 terminal nodes
- D) 10 terminal nodes
- E) 16 terminal nodes

## Explanation

Each subtree's criterion is its error plus $\alpha$ times its number of terminal nodes:

| Terminal nodes | Criterion at $\alpha = 25$ |
| ---: | ---: |
| 1 | 300 + 25 × 1 = 325 |
| 3 | 240 + 25 × 3 = 315 |
| 6 | 205 + 25 × 6 = 355 |
| 10 | 190 + 25 × 10 = 440 |
| 16 | 184 + 25 × 16 = 584 |

The smallest criterion is 315, so the tree is pruned to the **3-node** subtree. The answer is **B**.

**Why not the others**

- **A** is the tree that results as $\alpha$ grows very large; at $\alpha = 25$ the first two splits remove 60 errors, more than the 50 their extra nodes cost.
- **C** is the choice at a smaller penalty, such as $\alpha = 10$ (criteria 310, 270, 265, 290 and 344).
- **D** is neither the smallest criterion nor the fewest errors.
- **E** has the fewest training errors, which is how the full tree always looks at $\alpha = 0$; the size is chosen by the penalized criterion with $\alpha$ from cross-validation, not by training error.
