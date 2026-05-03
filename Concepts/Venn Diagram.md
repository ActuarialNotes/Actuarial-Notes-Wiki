$$ P(A \cup B) = P(A) + P(B) - P(A \cap B) $$

A ==Venn Diagram== is a graphical representation of sets as overlapping regions in the plane, used to illustrate set operations such as union, intersection, and complement. Each circle represents an event, and the overlap between circles represents the intersection. Venn diagrams make the Inclusion-Exclusion Principle intuitive: adding the areas of both circles double-counts the overlap, so it must be subtracted once.

<div style="display: flex; justify-content: center; margin: 20px 0;">
<svg width="300" height="200" viewBox="0 0 300 200">
  <!-- Circle A -->
  <circle cx="120" cy="100" r="60"
          fill="blue" fill-opacity="0.4" stroke="black"/>
  
  <!-- Circle B -->
  <circle cx="180" cy="100" r="60"
          fill="red" fill-opacity="0.4" stroke="black"/>
  
  <!-- Labels -->
  <text x="85" y="40" font-size="16">A</text>
  <text x="205" y="40" font-size="16">B</text>
</svg>
</div>

> [!example]- Using a Venn Diagram to Find $P(A \cup B)$ {💡 Example}
> Two events $A$ and $B$ satisfy $P(A) = 0.6$, $P(B) = 0.5$, and $P(A \cap B) = 0.3$. Use the Inclusion-Exclusion Principle to find $P(A \cup B)$.
>
> > [!answer]- Answer
> > In a Venn diagram, $A \cup B$ covers all area in either circle. The overlap $A \cap B$ is counted once in $P(A)$ and once in $P(B)$, so it must be subtracted:
> > $$ P(A \cup B) = P(A) + P(B) - P(A \cap B) = 0.6 + 0.5 - 0.3 = 0.8 $$
