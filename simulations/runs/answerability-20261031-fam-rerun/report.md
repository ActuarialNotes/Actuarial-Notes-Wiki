# Answerability: Exam FAM (SOA)

Run `answerability-20261031-fam-rerun` · 4 questions checked of 5 attempted · cost $0.46

Each question's official solution was broken into the knowledge it uses (by a model that saw no study page), and each item was looked for on the pages the vault gives for the question. An item counts as taught only if a quote of the teaching passage is really on the page; the check is done in code. *Answerable* is necessary, not sufficient: a page can hold the formula and still not teach it well.

| Verdict | Questions | Share |
|---|---|---|
| **Answerable** — everything taught on a tagged page, one link away, on the exam's syllabus or on a prerequisite exam's page | 2 | 50% |
| **Untagged** — everything is in the vault, but some of it on a page neither tagged nor linked | 0 | 0% |
| **Gap** — something the solution uses is taught on no page | 2 | 50% |
| Error — the check itself failed (re-run to retry) | 1 | |

Requirements: 19 — tagged 13 (68%), linked 2 (11%), syllabus 1 (5%), prerequisite 0 (0%), elsewhere 0 (0%), missing 3 (16%)

## By sitting

A paper whose gaps far outrun the rest may test a reading the syllabus has since dropped.

| Sitting | Questions | Answerable | Untagged | Gap |
|---|---|---|---|---|
| Undated (samples and the vault's own) | 5 | 2 | 0 | 2 (40%) |

## Gaps, by the page that should teach them

Ranked by how many questions each page's gaps cost. The page is the one named for the item's concept; "no page" means the vault has no page by that name.

### **no page for Annuity-Certain** — 1 question(s)

- `faml-6-03` (fact): The annuity-certain ä_{n\|} is increasing in n, so the event that ä_{K+1\|} is below a threshold corresponds to K+1 being at or below a cutoff number of years, found by comparing the threshold with annuity-certain values.

### **no page for Complete Expectation of Life** — 1 question(s)

- `faml-3-02` (procedure): Expand select curtate/complete expectation of life across the select period by splitting into the first-year integral, plus the one-year survival probability times the next-year integral, plus the product of survival probabilities times the ultimate expectation at the later age: e_[x] = ∫0^1 tp_[x]…
- `faml-3-02` (formula): The complete expectation of life satisfies the one-year recursion e_x = ∫0^1 tp_x dt + p_x e_{x+1}, and for a select life e_[x] = ∫0^1 tp_[x] dt + p_[x] e_{x+1}.

## Tagging and linking gaps

The vault teaches what these questions need, but on a page the question isn't tagged with and its tagged pages don't link to. Adding the page to the question's `wiki_link` (or linking it from the tagged page) puts it in reach.

None.

## Taught only in a collapsed section

The passage that teaches these items sits inside a folded callout (a worked example, a table behind a toggle). A reader who skims never opens it.

None.

## Every question

<details><summary><code>faml-3-02</code> · gap</summary>

Tagged pages: Life Table, Fractional Age Assumption, Future Lifetime Random Variable

| Item | Kind | Status | Where |
|---|---|---|---|
| In a select mortality table with a one-year select period, l_[x] is the number of lives at select age x, and after the select period the ta… | definition | tagged | Life Table: “$d_x = \ell_x - \ell_{x+1}$, the number dying between ages $x$ and $x+1$” |
| Expand select curtate/complete expectation of life across the select period by splitting into the first-year integral, plus the one-year su… | procedure | missing |  |
| Under the uniform distribution of deaths assumption over each year of age, ∫0^1 tp_x dt = 1 - 0.5 q_x. | fact | tagged | Life Table: “**UDD** gives $_{s}q_x = s\,q_x$” |
| The complete expectation of life satisfies the one-year recursion e_x = ∫0^1 tp_x dt + p_x e_{x+1}, and for a select life e_[x] = ∫0^1 tp_[… | formula | missing |  |
| The one-year survival probability from a life table is p = l_{x+1}/l_x (for select, p_[x] = l_{x+1}/l_[x]) and q = d/l. | formula | tagged | Life Table: “_{t}p_x = \frac{\ell_{x+t}}{\ell_x}, \qquad _{t}q_x = 1 - {}_{t}p_x = \frac{\ell_x - \ell_{x+t}}{\e…” |

</details>

<details><summary><code>faml-4-12</code> · error</summary>

Error: ValueError: no usable 'found' list in the reply

</details>

<details><summary><code>faml-6-03</code> · gap</summary>

Tagged pages: Equivalence Principle, Deferred Annuity, Future Lifetime Random Variable, Life Table

| Item | Kind | Status | Where |
|---|---|---|---|
| The equivalence principle sets the expected present value of premiums equal to the expected present value of benefits; for a deferred whole… | formula | tagged | Equivalence Principle: “**The Equivalence Principle** sets a [[Insurance Premium\\|premium]] so that the expected present va…” |
| The actuarial accumulated value at the end of the deferral period of premiums paid for n years is the premium times ä_{x:n\|} divided by nE… | definition | syllabus | Pure Endowment: “Dividing by ${}_nE_x$ accumulates instead, so the actuarial accumulated value of an annuity is $\dd…” |
| The present value of a whole life annuity-due for a life (x) is the random variable Y = ä_{K_x+1\|} (annuity-certain over K_x+1 years), whe… | formula | linked | Life Annuity: “A **life-annuity-due** pays 1 at the start of each year while $(x)$ is alive; its actuarial present…” |
| The annuity-certain ä_{n\|} is increasing in n, so the event that ä_{K+1\|} is below a threshold corresponds to K+1 being at or below a cut… | fact | missing |  |
| The probability that a life aged x survives k years is kp_x = l_{x+k}/l_x, and the probability of dying within k years (K_x ≤ k−1) is 1 − k… | formula | tagged | Future Lifetime Random Variable: “${}_tq_x = 1 - {}_tp_x$ is the probability that $(x)$ dies within $t$ years” |

</details>

<details><summary><code>faml-6-40</code> · answerable</summary>

Tagged pages: Equivalence Principle, Whole Life Insurance, Recursion

| Item | Kind | Status | Where |
|---|---|---|---|
| In a fully discrete insurance, the net premium is set by the equivalence principle: premium times the life annuity-due equals the expected … | fact | tagged | Equivalence Principle: “Setting $E[L_0]=0$ gives $P = S\,A_x/\ddot{a}_x$.” |
| The expected present value of a discrete insurance paying b_{k+1} at the end of year k+1 for death in that year is the sum over k of b_{k+1… | formula | tagged | Whole Life Insurance: “$$A_x = \sum_{k=0}^{\infty} v^{k+1}\,{_k}p_x\,q_{x+k}$$” |
| The life annuity-due satisfies the one-year recursion ä_x = 1 + v p_x ä_{x+1}. | formula | linked | Life Annuity: “$$\ddot{a}_x = 1 + v\,p_x\,\ddot{a}_{x+1}$$” |
| The insurance EPV at age x can be decomposed by conditioning on the first year: pay the first-year benefit discounted if death occurs in ye… | procedure | tagged | Whole Life Insurance: “**Recursion:** either $(x)$ dies in the first year and 1 is paid in a year, or $(x)$ survives and h…” |

</details>

<details><summary><code>fams-084</code> · answerable</summary>

Tagged pages: Frequency Distribution, Poisson Distribution

| Item | Kind | Status | Where |
|---|---|---|---|
| The (a, b, 1) class consists of claim count distributions whose probabilities satisfy p_k/p_{k-1} = a + b/k for k = 2, 3, 4, ..., with p_0 … | definition | tagged | Frequency Distribution: “Its members follow the same relation only from $k = 2$, so $p_0$ is free.” |
| A recursion ratio p_n/p_m = m!/n! (equivalently p_k/p_{k-1} = 1/k) corresponds to a = 0 and b = λ, the Poisson recursion with λ = 1, so for… | fact | tagged | Frequency Distribution: “\\| Poisson $(\lambda)$ \\| $e^{-\lambda}$ \\| $0$ \\| $\lambda$ \\|” |
| A zero-modified distribution has an arbitrary specified probability p_0^M at zero, with the remaining probabilities equal to the base distr… | definition | tagged | Frequency Distribution: “A zero-modified one puts an arbitrary $p_0^M$ at zero and scales the rest as in the second block” |
| For a zero-modified distribution, p_k^M = (1 - p_0^M)/(1 - p_0) × p_k for k ≥ 1, where p_k and p_0 are the base distribution's probabilitie… | formula | tagged | Frequency Distribution: “$$p_k^M = \frac{1 - p_0^M}{1 - p_0}\,p_k, \quad k = 1, 2, 3, \ldots$$” |
| The Poisson probability mass function is P(L = k) = e^{-λ} λ^k / k!, so P(L = 0) = e^{-λ} and P(L = 1) = λ e^{-λ}. | formula | tagged | Poisson Distribution: “$$P(X = k) = \frac{e^{-\lambda}\lambda^k}{k!}$$” |

</details>

Nothing here edits the vault. A gap is fixed from the syllabus reading, in general form — never by copying the question's own numbers onto the page — and the edited page is fact checked again (docs/verification.md).
