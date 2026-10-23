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
verification:
  status: verified
  confidence: medium
  last_checked: 2026-10-23
  last_checked_by: agent:validate-v1
  content_hash: sha256:2b2143bdf283c00982bc1fba8d5f744ef5d4a0df1ca218d1ac8147b996e30457
  sources:
    - "SOA Exam ALTAM Sample Written-Answer Questions (January 2026), Q17, p.33, sha256:49872aa3db3e280fce82dc8c261668a20462050dd761c2995ab214ffc31dc4de — https://www.soa.org/globalassets/assets/files/edu/2026/spring/questions-solutions/2026-01-altam-questions.pdf"
    - "SOA Exam ALTAM Sample Written-Answer Solutions (January 2026), Q17, pp.30-31, sha256:3e52f41d261382185358d31d5ce2eed38ef94578f2c04dce17a3d38b50385e90 — https://www.soa.org/globalassets/assets/files/edu/2026/spring/questions-solutions/2026-01-altam-solutions.pdf"
  open_findings: 0
  open_critical: 0
  log: .verify/questions/exam-altam/altam-017.md
---

For $(x)$ and $(y)$ with independent future lifetimes, you are given that $q_x = 0.2$ and $q_y = 0.1$.

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

![Graph of sp_x against s (years), s from 0 to 1: a straight line falling from 1 at s = 0 to 0.8 at s = 1, vertical axis marked 0 to 1.](https://raw.githubusercontent.com/ActuarialNotes/Actuarial-Notes-Wiki/main/Media/Attachments/altam-017-graph.png)

### Examiner Report
**Graders' Comments:** *Most candidates did well on this part. Candidates who sketched a non-linear function for ${}_tp_x$, or who sketched a different probability, or who sketched a line from 1 to 0, received no credit for this part.*

## Part c (3 points)

Show that ${}_sq_{xy} = s\,q_{xy} + g(s)\,q_{\overline{xy}}$ for $0 \le s \le 1$, where $g(s)$ is a function of $s$ that you should specify.

(MLC, Fall 2014, Question 3)

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
