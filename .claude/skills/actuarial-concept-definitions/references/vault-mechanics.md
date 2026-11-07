# Vault mechanics for concept pages

The rules that keep a concept page reachable and rendering in the built app.
None of them is about teaching; all of them fail silently.

## The filename *is* the API

A page's filename is its link target, and the build is unforgiving about it.
These failures are invisible in the markdown and in Obsidian, but break the
built app:

- **The `.md` extension is mandatory.** Every collector in `quiz/vite.config.ts`
  filters on `.endsWith('.md')`. A file saved without it is dropped from the
  bundle — the page vanishes from the wiki and search, and every `[[link]]` to
  it dead-ends. This has happened to core pages (`Concepts/Ratemaking`,
  `Concepts/Loss Reserving`) and is undetectable by reading the file.
- **Filenames use spaces, never underscores or hyphens-for-spaces.**
  `Retrospective_Rating.md` does not answer `[[Retrospective Rating]]`. Keep
  genuine hyphens that belong to the term (`Bornhuetter-Ferguson Method`,
  `On-Leveling`, `Self-Insured Retention`) — but then every inbound link must
  spell them the same way. Hyphen/space drift is the most common broken link in
  this vault.
- **`conceptMatch.ts` resolves display aliases, not filename variants.**
  `[[Bond Price|Price]]` works because the *target* is exact. `[[Bond-Price]]`
  does not. Never rely on fuzzy matching.

`validate_links.py` catches all three.

## Aliases

When a study guide links the page under a different spelling
(`[[Black-Schole]]` for `Black-Scholes Model`), write the spelling as a YAML list
in a frontmatter block of its own; `verify_check.py --sync` appends
`verification:` after it:

```markdown
---
aliases:
  - Black-Schole
  - Black-Scholes
---
**The Black-Scholes Model** …
```

Frontmatter aliases are read by Obsidian and the AI connector — **not by the
app**, which fetches `Concepts/<exact link target>.md`. So an alias also goes in
`scripts/concept_aliases.json` (below), which is what makes the link land in the
app. (A handful of older pages carry other frontmatter keys; don't copy them.)

### Variant spellings on a generated study guide

The in-development exam pages (the SOA's FAM onward, the DISCs, 6U) are
*generated* by `scripts/syllabus_write.py`, which links every noun phrase of an
objective to the page that names it — or to the page that *should* exist, named
by its own rule (Title Case, singular). That rule produces targets that are poor
titles (`[[Black-Schole]]`, `[[Joint Live]]`, `[[Delta]]` for *delta method*) and
cuts terms short (`[[Generalized Linear]] model`). Don't hand-edit those pages
(`syllabus_lint.py` holds them to the extracted syllabus) and don't name a page
after a bad target. Instead:

1. Write the page under its proper title, with the linked spelling in its
   frontmatter `aliases:`.
2. Map the spelling in `scripts/concept_aliases.json` → `aliases` (key written
   lower-case, hyphens as spaces: `"black schole": "Black-Scholes Model"`). When
   the spelling means different pages on different exams, use `namesakes`
   instead, keyed by wiki id (`"governance": {"default": "Corporate Governance",
   "cp-312": "Model Governance"}`). `quiz/src/lib/examCatalog.test.ts` fails if
   a target page doesn't exist, so commit the page before or with the entry.
3. Re-render the affected exam pages — `python3 scripts/syllabus_write.py <wiki
   ids>` then `python3 scripts/verify_check.py --sync` — which re-points the
   links through the alias table and changes nothing else. A target that is
   already a good title needs none of this: name the page exactly as linked.

## Namesake pages — link the one for the right exam

Several terms exist twice with different meanings per exam. Linking the wrong
one is silent: the link resolves, so no validator catches it, but the reader
lands on an unrelated page.

| Term | Exam P/FM page (severity math) | Exam 5 page (pricing procedure) |
|---|---|---|
| Deductible | `Deductible` | `Deductible Rating` |
| Coinsurance | `Coinsurance`, `Coinsurance Percentage` | `Coinsurance Rating` |
| Case reserves | `Case Reserves` (the liability) | `Case Outstanding Development Method` (the technique) |
| Trend | `Trend` (generic) | `Loss Trend`, `Premium Trend`, `Exposure Trend` |

When a syllabus objective says "calculate deductible relativities," it wants the
*rating* page. Check both candidates before linking.

## LaTeX rules (phone readability — same as the question converters)

The app renders with `remark-math` + `rehype-katex`; pages are read on phones.

1. **`align*` for any multi-step derivation.** Never chain evaluation steps as
   separate `$$` blocks, or as several `=` on one line. Each step on its own
   `&=` line:

   ```markdown
   > > $$
   > > \begin{align*}
   > > P[H \mid C] &= \frac{P[C \mid H]\,P[H]}{P[C]} \\
   > >            &= \frac{(0.40)(0.20)}{0.16} \\
   > >            &= 0.50
   > > \end{align*}
   > > $$
   ```

   (Inside an answer callout each line is also prefixed with `> > `.)
2. **`$$` delimiters on their own lines.** Never
   `$$\begin{align*}...\end{align*}$$` on one line — it renders as raw text.
3. **One `=` per line in derivations.** Not `X &= formula = result`; split the
   result onto its own `&=` line. Short decimal→percent pairs
   (`= 0.05127 = 5.127\%`) may stay together.
4. **Clean notation:** `$…$` inline, `$$…$$` display. No smart quotes, no OCR
   dashes (`−` → `-`), no Unicode fractions (`½` → `\frac{1}{2}`) or Greek
   letters typed as Unicode. Use `\times`, `\leq`, `\geq`, `\cdot`. Money goes
   *inside* the math with the dollar escaped — `$\$1{,}000$` — never an escaped
   dollar before the math (`\$$1{,}000$`), which starts with `$$` and can open a
   display block.

5. **No long inline math.** KaTeX can't break a line inside braces or
   parentheses, or after a comma, so one `$…$` holding a whole set
   (`$S = \{(H, 1), \ldots, (T, 6)\}$`) or a long chain of fractions is as wide
   as it is long. Inside an example card that width becomes the card's minimum,
   and on a phone every line of the card is cut off on the right. Keep each
   inline span short (roughly 25 characters of rendered math): write a list as
   separate spans (`$\{A, B\}$, $\{A, C\}$`) and move a long expression into a
   boxed `> $$…$$`, one step per `aligned` row if it is still wide.

`quiz/src/lib/vaultMath.ts` repairs some Obsidian-isms at render time; write
the vault the Obsidian way and these rules on top.

## Notation by exam

Match the neighbouring pages.

**Exam P** — one symbol per thing, on every page (set 2026-11-06; the pages
still in the older shape use $A$, $B$ for events and are brought to this table
as they are rewritten):

| Thing | Written | Not |
| --- | --- | --- |
| sample space | $S$ | $\Omega$ |
| outcome | $s$ (several: $s_1, s_2, \ldots$) | $\omega$ |
| event; a second, third event | $E$; $F$, $G$ | $A$, $B$ |
| complement, intersection, union | $E^c$, $E \cap F$, $E \cup F$ | $\bar{E}$, $E'$, $EF$ |
| probability of an event | $P(E)$; an outcome $P(\{s\})$ | $\Pr$, $P[E]$, $P(s)$ |
| conditional probability | $P(E \mid F)$ | |
| number of outcomes in a set | $\lvert E \rvert$, $\lvert S \rvert$ | $n(E)$, $\#E$ |
| factorial | $n!$, with $0! = 1$ | |
| permutations of $k$ from $n$ | ${}_{n}P_{k}$ | $P(n, k)$, $P^n_k$ |
| combinations of $k$ from $n$ | $\binom{n}{k}$, read "$n$ choose $k$" | $C(n, k)$, ${}_{n}C_{k}$ |
| random variable; pmf/pdf; cdf | $X$, $Y$; $f(x)$; $F(x)$ | |
| mean, variance | $E[X]$, $\text{Var}(X)$ | |

$F$ is both the second event and the cdf. A page that needs both writes the
events $E_1, E_2$ instead.

**Exam MAS-I** — stochastic processes (set 2026-11-07, from the Poisson
process pages; Ross's notation, with Loss Models' $S$ and $X$ for aggregate
losses):

| Thing | Written | Not |
| --- | --- | --- |
| counting process | $\{N(t), t \ge 0\}$, $N(t)$ the number of events by time $t$ | |
| rate of a Poisson process | $\lambda$; of two processes $\lambda_1$, $\lambda_2$ | $\Lambda$ for a constant rate |
| intensity function; mean value function | $\lambda(t)$; $m(t) = \int_0^t \lambda(u)\,du$ | $\Lambda(t)$ |
| interarrival time; time of the $n$th event | $T_n$; $S_n = T_1 + \cdots + T_n$ | $W_n$, $\tau_n$ |
| thinning probability | $p$, or $p(t)$ when it changes over time | |
| aggregate loss by time $t$; claim size | $S(t) = \sum_{i=1}^{N(t)} X_i$; $X_i$, $X$ | $Y_i$, $W$ |
| ordinary deductible | $d$ | |
| exponential mean | $\theta$ | $\beta$ |

**Exam MAS-I** — the rest of the exam (set 2026-11-07):

| Area | Thing | Written | Not |
| --- | --- | --- | --- |
| Markov chains | states; transition probability; matrix | $i$, $j$; $P_{ij}$; $\mathbf{P}$ | $p_{ij}$, $\mathbf{T}$ |
| | $n$-step transition probability | $P_{ij}^{n}$ | $P_{ij}^{(n)}$ |
| | stationary (limiting) probability | $\pi_j$ | |
| | mean time in transient state $j$ from $i$ | $s_{ij}$ | |
| | gambler's ruin | win probability $p$, $q = 1 - p$, target $N$, start $i$, $P_i$ | |
| Reliability | state vector; structure function; reliability function | $\mathbf{x}$; $\phi(\mathbf{x})$; $r(\mathbf{p})$ | |
| Simulation | uniform random number; target cdf; proposal density | $U$; $F$, $F^{-1}(U)$; $g(x)$, constant $c$ | |
| Survival | survival function; hazard rate | $S(x)$; $h(x)$ (force of mortality $\mu_x$ on life-contingency pages) | $\lambda(x)$ |
| | life-table functions | $l_x$, $d_x$, ${}_{t}p_{x}$, ${}_{t}q_{x}$, $e_x$ | $\Lambda$ |
| | insurance and annuity | $A_x$, $\ddot{a}_x$, $v$, $i$ | |
| Severity | limited expected value; deductible; limit | $E[X \wedge u]$; $d$; $u$ | $E[\min(X,u)]$ in a formula |
| Estimation | sample; sample mean; sample variance | $X_1, \ldots, X_n$; $\bar{X}$; $S^2$ (divisor $n - 1$) | $s^2$ for the estimator |
| | parameter; estimator | $\theta$; $\hat{\theta}$ | $T$ |
| | likelihood; log-likelihood; Fisher information | $L(\theta)$; $l(\theta)$; $I(\theta)$ | $\ell$, $\mathcal{L}$ |
| | order statistics | $X_{(1)} \le \cdots \le X_{(n)}$ | $Y_1, \ldots, Y_n$ |
| | bias; mean square error | $\text{Bias}(\hat{\theta})$; $\text{MSE}(\hat{\theta})$ | |
| Testing | hypotheses; significance level; Type II probability; power | $H_0$, $H_1$; $\alpha$; $\beta$; $1 - \beta$ | $H_a$ |
| Regression | observations; predictors | $n$; $p$, written $x_1, \ldots, x_p$ (observation $i$: $x_{i1}, \ldots, x_{ip}$) | $k$ |
| | response; fitted value; residual | $y_i$ (random $Y$); $\hat{y}_i$; $e_i = y_i - \hat{y}_i$ | $r_i$ |
| | coefficients; estimates; error | $\beta_0, \ldots, \beta_p$; $\hat{\beta}_j$; $\varepsilon_i$ with variance $\sigma^2$ | $b_j$ |
| | design matrix; hat matrix | $\mathbf{X}$; $\mathbf{H} = \mathbf{X}(\mathbf{X}^T\mathbf{X})^{-1}\mathbf{X}^T$ | |
| | sums of squares | $\text{RSS}$, $\text{TSS}$, $R^2 = 1 - \text{RSS}/\text{TSS}$ | SSE, SST |
| GLM | mean; linear predictor; link | $\mu_i = E[Y_i]$; $\eta_i = \beta_0 + \beta_1 x_{i1} + \cdots$; $g(\mu_i) = \eta_i$ | |
| | dispersion; deviance | $\phi$; $D$ (scaled $D^*$) | |
| | information criteria | $\text{AIC} = -2l + 2k$, $\text{BIC} = -2l + k \ln n$, $k$ the number of parameters | |

$S_n$ (an arrival time) and $S(t)$ (an aggregate loss) never appear on the same
page. Keep the Exam P table for events and probabilities ($E$, $P(E)$,
$E[X]$, $\text{Var}(X)$).

Other exams:
- **Exam FM:** `i`, `v`, `d`, `\delta`, `a_{\overline{n}|}`, `s_{\overline{n}|}`,
  `\ddot{a}_{\overline{n}|}`.
- **Exam 5** — ratemaking (set 2026-11-07, from the Pure Premium, Loss Ratio
  and Exposure Base pages; Werner & Modlin's ratios, written out in words as on
  the Frequency and Severity pages):

  | Thing | Written | Not |
  | --- | --- | --- |
  | basic ratios | $\text{Frequency}$, $\text{Severity}$, $\text{Pure Premium}$, $\text{Loss Ratio}$, $\text{Average Premium}$ in `\text{}` | $PP$, $LR$ in a formula |
  | the ratios' inputs | $\text{Losses}$, $\text{LAE}$, $\text{Earned Exposures}$, $\text{Earned Premium}$ | $L$, $E_L$, $X$ |
  | LAE ratio; loss and LAE ratio | $\text{LAE}/\text{Losses}$; $\text{Loss Ratio} \times (1 + \text{LAE Ratio})$ | LAE over premium |
  | development to ultimate | $\text{CDF}$; age-to-age $f_{n \to n+1}$ | LDF for an age-to-ultimate factor |
  | trend | annual trend $t$ over $n$ years, factor $(1 + t)^n$ | |
  | expense and profit provisions | fixed per exposure $F$ (as a share of premium $F\%$), variable $V$, target profit $Q_T$ | |
  | permissible loss ratio | $\text{PLR} = 1 - V - Q_T$ (all-variable); with fixed expenses as a ratio, $1 - F\% - V - Q_T$ | |
  | trend on a page whose time variable is $t$ | fitted trend $\hat{T}$; components $T_F$, $T_S$, $T_{PP}$ (Exponential Trend, Linear Trend) | $t$ for both |
  | losses by report year and lag (claims-made) | $L(Y, i)$, Werner & Modlin Ch. 16 | |

  **Exam 5** — reserving (set 2026-11-07, from the reserving pages; Friedland's
  word *claims*, in `\text{}`):

  | Thing | Written | Not |
  | --- | --- | --- |
  | claims | $\text{Paid Claims}$, $\text{Reported Claims}$, $\text{Case Outstanding}$, $\text{Ultimate Claims}$, $\text{IBNR}$, $\text{Unpaid Claims}$ | $C$, $U$ as bare letters; *losses* in a reserving formula |
  | a cell of a cumulative triangle | $C_{\text{AY},\,n}$, accident year AY at age $n$ | |
  | development | age-to-age $f_{n \to n+1}$; $\text{CDF}_{n \to \text{ult}}$ or $\text{CDF}_n$; $\text{Tail}$ | LDF for an age-to-ultimate factor |
  | share reported (paid) | $1/\text{CDF}$ in a method's formula; $p_t$, or $p_{\text{start}}$, $p_{\text{end}}$, where an actual-versus-expected formula needs a symbol | |
  | a priori | $\text{Expected Claims}$, $\text{Expected Claim Ratio}$; Cape Cod's $\text{Used-Up Premium}$ | ELR, $U$ |
  | credibility weight | $Z$ (Benktander: $q$, the share unreported) | |

  Ratemaking is **prospective**, reserving **retrospective** — say which, and
  keep the vocabularies distinct (development *to* ultimate vs trend *forward
  to* the policy period; conflating them double-counts).

## Topic reference

- **Exam P objectives:** General Probability · Univariate Random Variables ·
  Multivariate Random Variables.
- **Exam FM objectives:** Time Value of Money · Annuities/Cash Flows · Loans ·
  Bonds · General Cash Flows, Portfolios & ALM.
- **Exam 5 objectives:** Ratemaking (45–55%) · Estimating Claim Liabilities
  (45–55%). Readings: Werner & Modlin, Friedland, ASOP 12/13/43, CAS Statement
  of Principles.
- The richer topic→concept mapping lives in
  `.claude/skills/soa-exam-converter/SKILL.md`,
  `.claude/skills/cas-exam-converter/SKILL.md` and `scripts/ontology_map.py` —
  consult them to pick canonical concept names consistent with how questions are
  tagged.
