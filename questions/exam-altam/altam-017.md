---
id: "altam-017"
exam: "Exam ALTAM"
topic: "Joint Life"
learning_objective: "Joint Life Insurance and Annuities"
difficulty: medium
type: multi-part
wiki_link:
  - Concepts/Joint+Life
  - Concepts/Fractional+Age+Assumption
  - Concepts/Future+Lifetime+Random+Variable
  - Concepts/Independent+Random+Variables
points: 6
---

For $(x)$ and $(y)$ with independent future lifetimes, you are given that $q_x = 0.2$ and $q_y = 0.1$.

(MLC, Fall 2014, Question 3)

## Part a (1 point)

Explain in words the meaning of the probability described by the symbol $q_{xy}$.

### Explanation
The symbol $q_{xy}$ is the probability that at least one of two lives, currently age $x$ and $y$, dies within one year.

### Examiner Report
**Graders' Comments:** *Part (a) was well done by almost all candidates. For full credit, candidates were required to specify the 1-year time period for the mortality probability.*

## Part b (2 points)

You are also given that mortality within integral ages follows a uniform distribution of deaths assumption for each of $(x)$ and $(y)$ individually.

Sketch the graph of ${}_sp_x$ as a function of $s$ for $0 \le s \le 1$. You should mark numerical values on each axis.

### Explanation
The function is

*(Figure: graph of ${}_sp_x$ against $s$ (years), $0 \le s \le 1$)*

### Examiner Report
**Graders' Comments:** *Most candidates did well on this part. Candidates who sketched a non-linear function for ${}_tp_x$, or who sketched a different probability, or who sketched a line from 1 to 0, received no credit for this part.*

## Part c (3 points)

Show that ${}_sq_{xy} = s\,q_{xy} + g(s)\,q_{\overline{xy}}$ for $0 \le s \le 1$, where $g(s)$ is a function of $s$ that you should specify.

### Explanation
$$\begin{align*}
{}_sq_{xy} &= 1 - {}_sp_x \cdot {}_sp_y && \text{(independence)} \\
&= 1 - (1 - {}_sq_x)(1 - {}_sq_y) \\
&= 1 - (1 - s \cdot q_x)(1 - s \cdot q_y) && \text{(UDD)} \\
&= s(q_x + q_y) - s^2 q_x q_y
\end{align*}$$

Also $q_x + q_y = q_{xy} + q_{\overline{xy}}$ and $q_{\overline{xy}} = q_x q_y$

$$\begin{align*}
\Rightarrow {}_sq_{xy} &= s(q_{xy} + q_{\overline{xy}}) - s^2 q_{\overline{xy}} \\
{}_sq_{xy} &= s(q_{xy}) + (s - s^2)\,q_{\overline{xy}}
\end{align*}$$

$$\Rightarrow g(s) = s - s^2$$

### Examiner Report
**Graders' Comments:** *Performance on this part was mixed. Many candidates received full credit. A number of candidates made a reasonable start but could not derive the final result. Partial credit was awarded in these cases. The most common error was assuming that UDD applied to the joint life status.*
