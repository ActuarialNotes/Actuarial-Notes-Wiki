[[Wiki]] / [[Concepts]] / **Inclusion-Exclusion Principle**

<div class="concept-nav"
     data-color="#2563eb"
     data-current="Inclusion-Exclusion Principle"
     data-prev="Probability Addition Rule|Concepts/Probability Addition Rule,Probability Multiplication Rules|Concepts/Probability Multiplication Rules"
     data-next="Conditional Probability|Concepts/Conditional Probability"
     data-objectives="P-1|Probability|1. General Probability|Exam P-1 (SOA)">
</div>

# Inclusion-Exclusion Principle

## Definition

An ==Inclusion–Exclusion Principle== is a counting rule used to determine the size of a union of overlapping sets by alternately adding and subtracting the sizes of their intersections.

$$ |A \cup B| = |A| + |B| - |A \cap B| $$

> [!example]- <u>For three sets (A, B, C) the principle extends to:</u>
>$$ |A \cup B \cup C| =
|A| + |B| + |C|$$
$$- |A \cap B| - |A \cap C| - |B \cap C|$$
$$+ |A \cap B \cap C|$$
>The signs alternate: *add* single sets, *subtract* pairwise overlaps, *add* triple overlaps, and so on.
