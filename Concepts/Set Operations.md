$$ A \cup B, \quad A \cap B, \quad A^c = S \setminus A, \quad A \setminus B = A \cap B^c $$

==Set Operations== are the fundamental ways of combining or modifying sets: union ($A \cup B$, elements in $A$ or $B$ or both), intersection ($A \cap B$, elements in both $A$ and $B$), complement ($A^c$, elements not in $A$), and difference ($A \setminus B$, elements in $A$ but not in $B$). These operations translate directly into logical statements about events in probability, and obey De Morgan's laws: $(A \cup B)^c = A^c \cap B^c$ and $(A \cap B)^c = A^c \cup B^c$.

> [!example]- Finding $P(A^c \cap B)$ from Given Probabilities {💡 Example}
> If $P(A) = 0.4$, $P(B) = 0.5$, and $P(A \cap B) = 0.2$, what is $P(A^c \cap B)$?
>
> > [!answer]- Answer
> > $A^c \cap B$ represents the part of $B$ that does not overlap with $A$.
> > $$ P(A^c \cap B) = P(B) - P(A \cap B) = 0.5 - 0.2 = 0.3 $$
