---
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:7842fe1ff5e7cff656731227962a9d52144beee7bf4d81300f7b29f6102e1db5
  sources: []
  open_findings: 0
  log: .verify/Concepts/Bornhuetter-Ferguson Method.md
---

**Bornhuetter-Ferguson Method** (BF) estimates ultimate losses by adding to what has actually been reported an estimate of what has *not* — computed from an a priori expectation and the percentage still unreported.

> $$U_{\text{BF}} = C + \left(1 - \tfrac{1}{\text{CDF}}\right) \times U_{0}$$

> $$\text{IBNR} = \left(1 - \tfrac{1}{\text{CDF}}\right) \times \text{ELR} \times \text{EP}$$

- $C$ is reported (or paid) losses to date, $U_0 = \text{ELR} \times \text{EP}$ the a priori expectation, and $1 - 1/\text{CDF}$ the percentage unreported from the [[Development Triangle|development pattern]].
- The key structural property: **actual emergence is taken at face value and only the unemerged portion is estimated**. The chain ladder instead scales the whole diagonal, so a distorted diagonal is multiplied by the full CDF. BF's answer moves dollar-for-dollar with a reporting anomaly; the chain ladder's moves by CDF-times.
- BF is a **credibility weighting** in disguise: it equals $Z \, U_{\text{CL}} + (1-Z)\,U_0$ with $Z = 1/\text{CDF}$. The more of the year that has emerged, the more the answer relies on the data — automatically, without a separate credibility judgment.
- It is therefore the method of choice at **immature maturities** and for [[Long Tail Lines|long-tail lines]], converging to the chain ladder as the cohort matures.
- The a priori is the weak point. A stale ELR that ignores [[Rate Level Change|rate changes]] and [[Loss Trend|trend]] produces a systematically biased reserve — and the bias persists year after year without ever showing up as instability. Where no reliable external ELR exists, the [[Cape Cod Method|Cape Cod]] technique derives one from the data instead.
- BF does not respond to bad news. If emergence runs far ahead of the a priori, BF holds most of its estimate anchored — which is exactly right when the emergence is noise and exactly wrong when it is signal. Comparing BF against chain ladder each year, and investigating the gap, is how that is managed.

![[Media/Figures/Bornhuetter-Ferguson_Method.svg|340]]

> [!example]- BF Against Chain Ladder {Example}
> AY 2023: earned premium $\$2{,}000{,}000$, ELR $65\%$, reported losses $\$600{,}000$, $\text{CDF}_{12} = 1.896$.
>
> Compute the BF ultimate and compare with the chain ladder.
>
> > [!answer]-
> > $$\begin{align*}
> > U_0 &= 0.65 \times \$2{,}000{,}000 = \$1{,}300{,}000 \\[4pt]
> > \% \text{ unreported} &= 1 - \frac{1}{1.896} = 47.3\% \\[4pt]
> > \text{IBNR} &= 0.473 \times \$1{,}300{,}000 = \$614{,}900 \\[4pt]
> > U_{\text{BF}} &= \$600{,}000 + \$614{,}900 = \$1{,}214{,}900
> > \end{align*}$$
> >
> > Chain ladder for comparison:
> >
> > $$\$600{,}000 \times 1.896 = \$1{,}137{,}600$$
> >
> > BF is $\$77{,}300$ higher, because emergence so far ($\$600$K against an expected $\$1{,}300{,}000 \times 0.527 = \$685{,}000$) is running *behind* the a priori and BF does not extrapolate the shortfall.
> >
> > Verifying the credibility form, with $Z = 1/1.896 = 0.527$:
> >
> > $$0.527(\$1{,}137{,}600) + 0.473(\$1{,}300{,}000) = \$1{,}214{,}900 \;\checkmark$$

> [!example]- Why BF Is Safer at an Immature Age {Example}
> Two accident years, both with $\$14{,}000{,}000$ of earned premium and a $65\%$ a priori. At $12$ months ($\text{CDF} = 3.20$, so $31.25\%$ reported):
>
> - **AY A** reported $\$3{,}000{,}000$ — right on expectation.
> - **AY B** reported $\$4{,}500{,}000$ — inflated by one $\$1.5$M shock claim.
>
> Compare the methods' responses.
>
> > [!answer]-
> > $$\begin{align*}
> > \text{CL}_A &= \$3{,}000{,}000 \times 3.20 = \$9{,}600{,}000 \\
> > \text{CL}_B &= \$4{,}500{,}000 \times 3.20 = \$14{,}400{,}000 \\[6pt]
> > \text{BF}_A &= \$3{,}000{,}000 + 0.6875(\$9{,}100{,}000) = \$9{,}256{,}000 \\
> > \text{BF}_B &= \$4{,}500{,}000 + 0.6875(\$9{,}100{,}000) = \$10{,}756{,}000
> > \end{align*}$$
> >
> > The $\$1.5$M reporting anomaly moves the **chain ladder by $\$4{,}800{,}000$** and **BF by exactly $\$1{,}500{,}000$** — the amount of the claim itself.
> >
> > That is the whole argument for BF at immature ages. The chain ladder's proportionality assumption says a year that reports more early will report more throughout; when the extra reporting is one large claim rather than a faster pattern, that assumption manufactures three extra dollars of reserve for every real one.
> >
> > (Neither answer is complete for AY B: the shock claim should be removed and reserved separately, with a provision for further large claims added back — see [[Large Loss]].)
