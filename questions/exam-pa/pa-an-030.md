---
id: "pa-an-030"
exam: "Exam PA"
topic: "Classification Tree"
learning_objective: "Tree-Based Models"
difficulty: medium
type: multi-part
bloom: analyze
wiki_link:
  - Concepts/Classification+Tree
  - Concepts/Gini+Index
  - Concepts/Node+Impurity
  - Concepts/Tree+Pruning
points: 2
---

A life insurer grows a classification tree to predict which of 2,000 term policies will lapse at renewal. In the training data, 400 policies lapsed. A candidate first split on premium mode sends 500 policies to the left node, of which 200 lapsed, and 1,500 to the right node, of which 200 lapsed.

## Part a (1 point)
Calculate the observation-weighted Gini index of the two child nodes of this split. Give your answer to four decimal places.

### Answer
0.2933

### Explanation
For two classes, $G = 2\hat{p}(1 - \hat{p})$, where $\hat{p}$ is the node's lapse share.

$$
G_L = 2(0.40)(0.60) = 0.48, \qquad G_R = 2\left(\tfrac{200}{1500}\right)\left(\tfrac{1300}{1500}\right) = 0.2311
$$

The split's impurity weights each child by its share of the observations:

$$
\frac{500}{2000}(0.48) + \frac{1500}{2000}(0.2311) = 0.12 + 0.1733 = 0.2933
$$

The answer is **0.2933**, down from the parent's $G = 2(0.20)(0.80) = 0.32$.

**Common wrong entries**

- **0.3556**: the plain average of 0.48 and 0.2311, which counts the 500-policy node as much as the 1,500-policy node.
- **0.32**: the parent node's Gini index, not the children's.

## Part b (1 point)
Both child nodes predict "renew", as the parent does, so the split leaves the classification error rate at 0.20. Which statement best explains why the tree is still grown with this split?

- A) The split makes the nodes purer, which sharpens their class probabilities even though the predicted class does not change.
- B) The classification error rate is the measure used to grow trees, and it is only reported as 0.20 because of rounding.
- C) A split is kept only if it changes the predicted class of at least one node, so this split must change one later.
- D) Cost-complexity pruning will remove the split anyway, so it makes no difference whether it is grown.

### Answer
A

### Explanation
The classification error rate is not sensitive enough for growing a tree: a split that makes a node much purer without changing its majority class leaves the error rate unchanged. The Gini index falls from 0.32 to 0.2933, because the left node now has a 40% lapse share against 13% on the right. The two leaves' class proportions are the estimated lapse probabilities, so the split separates higher-risk policies from lower-risk ones even though both still predict "renew". The answer is **A**.

**Why not the others**

- **B** has the measures reversed. The tree is grown with the Gini index or entropy, and the error rate here is exactly 0.20 before and after.
- **C** states a rule that does not exist. A split that gives two leaves predicting the same class can still raise node purity, and such splits are kept.
- **D** assumes pruning removes every split that leaves the error rate unchanged. Pruning compares each subtree's error with the penalty $\alpha$ per terminal node, chosen by cross-validation, and a weak split can lead to a strong split below it.
