---
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:c3cb9510935391fc3c8f4fc5a1792beecd8f81dc807614404258fa51edff7def
  sources: []
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Claim Count Triangle.md
---

**Claim Count Triangle** is a [[Development Triangle|development triangle]] of claim *counts* rather than dollars. Counts are what make the dollar triangles interpretable: they separate "more claims" from "costlier claims", and they are the denominator of every severity diagnostic.

> $$\text{Ultimate Counts} = N_n \times \text{CDF}^{\text{count}}_{n \to \text{ult}}$$

> $$\text{Severity} = \frac{\text{Ultimate Losses}}{\text{Ultimate Counts}}$$

Four count triangles are built, and each answers a different question:

- **Reported counts** — how fast claims come in. Develops to ultimate; the basis for pure [[IBNR]] counts.
- **Closed counts** — how fast claims settle. The [[Settlement Rate|disposal rate]] is closed counts over ultimate (or reported) counts.
- **Open counts** — the inventory. Divided into case reserves it gives **average case outstanding**, the sharpest [[Case Adequacy|case adequacy]] diagnostic.
- **Counts closed with payment** (vs. closed without) — a shift in the CWP proportion changes average paid severity without any change in claim cost.

Further points:

- Count factors are **smaller** than dollar factors at the same age, because a claim is counted as soon as it is reported while its dollars accrue for years afterward.
- Counts must be **defined consistently**: per claim or per claimant, counting claims closed without payment or not, treating reopened claims as new or as continuing. A definition change mid-triangle looks exactly like a frequency trend.
- Counts split broad IBNR into its two parts: **pure IBNR** (unreported claims, valued at an expected severity) and **IBNER** (development on known claims). Dollar triangles alone cannot separate them.
- Counts are the input to the [[Frequency-Severity Method]] and the disposal-rate variant of [[Berquist-Sherman Method|Berquist-Sherman]].

![[Media/Figures/Claim_Count_Triangle.svg|340]]

> [!example]- Developing Counts and Deriving Severity {Example}
> Cumulative reported claim counts:
>
> | AY | 12 mo | 24 mo | 36 mo |
> |---|---|---|---|
> | $2021$ | $450$ | $520$ | $545$ |
> | $2022$ | $475$ | $550$ | |
> | $2023$ | $500$ | | |
>
> The tail beyond $36$ months is $1.010$. Ultimate losses for AY 2023 are projected at $\$612{,}000$.
>
> Project ultimate counts and severity.
>
> > [!answer]-
> > $$\begin{align*}
> > f_{12\text{–}24} &= \frac{520 + 550}{450 + 475} = \frac{1{,}070}{925} = 1.157 \\[4pt]
> > f_{24\text{–}36} &= \frac{545}{520} = 1.048
> > \end{align*}$$
> >
> > $$\text{CDF}^{\text{count}}_{12} = 1.157 \times 1.048 \times 1.010 = 1.225$$
> >
> > $$\begin{align*}
> > \text{Ultimate counts (AY 2023)} &= 500 \times 1.225 = 612 \\[4pt]
> > \text{Ultimate severity} &= \frac{\$612{,}000}{612} = \$1{,}000
> > \end{align*}$$
> >
> > Note the count CDF of $1.225$ against a dollar CDF that would typically be well above $1.5$ at $12$ months for the same line: counts are $82\%$ complete while dollars are much less so, because the claims already reported have years of payment ahead of them.

> [!example]- Counts Reveal What Dollars Hide {Example}
> Two accident years at $24$ months:
>
> | | AY 2022 | AY 2023 |
> |---|---|---|
> | Reported losses | $\$5{,}000{,}000$ | $\$6{,}000{,}000$ |
> | Reported counts | $1{,}000$ | $1{,}500$ |
> | Closed counts | $600$ | $900$ |
> | Open counts | $400$ | $600$ |
> | Case reserves | $\$2{,}000{,}000$ | $\$2{,}100{,}000$ |
>
> Reported losses rose $20\%$. What actually happened?
>
> > [!answer]-
> > $$\begin{align*}
> > \text{Severity: } \frac{5{,}000{,}000}{1{,}000} = \$5{,}000 &\to \frac{6{,}000{,}000}{1{,}500} = \$4{,}000 \\[6pt]
> > \text{Disposal rate: } \frac{600}{1{,}000} = 60\% &\to \frac{900}{1{,}500} = 60\% \\[6pt]
> > \text{Avg case O/S: } \frac{2{,}000{,}000}{400} = \$5{,}000 &\to \frac{2{,}100{,}000}{600} = \$3{,}500
> > \end{align*}$$
> >
> > Losses rose $20\%$ but **counts rose $50\%$ while average severity fell $20\%$**. The book has grown, and it has grown into smaller claims — a mix shift toward a lower-severity segment, not an increase in claim cost.
> >
> > The average case outstanding falling from $\$5{,}000$ to $\$3{,}500$ is consistent with that story (smaller claims), but it is *also* what a case reserve weakening would look like. The disposal rate holding at $60\%$ rules out a settlement-speed change. Distinguishing mix from adequacy requires looking at the claims themselves — which is exactly the conversation with claims management that Friedland's Chapter 4 prescribes.
> >
> > Without the count triangles, the dollar triangle shows only "$+20\%$" and none of this is visible.
