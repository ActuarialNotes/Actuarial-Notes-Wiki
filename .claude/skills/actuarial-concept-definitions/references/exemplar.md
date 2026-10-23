# Exemplar: a concept page in the full shape

`Concepts/Bornhuetter-Ferguson Method.md`, rewritten to the skill's shape. The
substance is the existing page's; what changed is where the explanation sits
and how the examples are written. Notes on each part follow the page.

Every number below was recomputed in code. (The vault page rounds BF for AY A to
$9,256,000; the exact figure is $9,256,250.)

````markdown
**Bornhuetter-Ferguson Method** (BF) estimates ultimate losses by adding to what has actually been reported an estimate of what has *not* — computed from an a priori expectation and the percentage still unreported.

> $$U_{\text{BF}} = C + \left(1 - \tfrac{1}{\text{CDF}}\right) \times U_{0}$$

> $$\text{IBNR} = \left(1 - \tfrac{1}{\text{CDF}}\right) \times \text{ELR} \times \text{EP}$$

- where $C$ is reported (or paid) losses to date, $U_0 = \text{ELR} \times \text{EP}$ the a priori expected losses, and $1 - 1/\text{CDF}$ the percentage unreported from the [[Development Triangle|development pattern]].
- Compared with the [[Chain Ladder Method|chain ladder]]: the chain ladder multiplies the whole diagonal by the CDF; BF leaves the diagonal alone and estimates only the gap.
- BF is a [[Credibility|credibility]] weighting in disguise: $U_{\text{BF}} = Z\,U_{\text{CL}} + (1-Z)\,U_0$ with $Z = 1/\text{CDF}$, so it leans on the data more as the year matures, and converges to the chain ladder.
- Its assumption is a sound a priori. An ELR not brought to current [[Rate Level Change|rate level]] and [[Loss Trend|trend]] biases the reserve every year without ever looking unstable; the [[Cape Cod Method|Cape Cod]] method derives the ELR from the data instead.
- The [[Benktander Method]] iterates BF, feeding BF's ultimate back in as the a priori.

> [!idea] The idea
> Trust what has already been reported, and only *estimate* what hasn't. BF fills the gap with expected losses, so the IBNR doesn't depend on what has been reported at all — and one large early claim moves the ultimate by exactly that claim, not by the CDF times it.

> [!trap] Reported is not unreported
> The IBNR factor is $1 - 1/\text{CDF}$, the share *still to come*. Multiplying the a priori by $1/\text{CDF}$ instead gives the losses expected to have been reported by now — not the ones still to come.

![[Media/Figures/Bornhuetter-Ferguson_Method.svg|340]]

> [!example]- BF Ultimate at 12 Months {Example}
> AY 2023: earned premium $\$2{,}000{,}000$, a priori ELR $65\%$, reported losses $\$600{,}000$, reported $\text{CDF}_{12} = 1.896$.
>
> Find the BF IBNR and ultimate.
>
> > [!answer]-
> > BF ultimate is what's reported plus the unreported share of the a priori, so find the a priori and the unreported share first.
> >
> > $$
> > \begin{align*}
> > U_0 &= 0.65 \times \$2{,}000{,}000 \\
> > &= \$1{,}300{,}000 \\[4pt]
> > \% \text{ unreported} &= 1 - \frac{1}{1.896} \\
> > &= 0.4726 \\[4pt]
> > \text{IBNR} &= 0.4726 \times \$1{,}300{,}000 \\
> > &= \$614{,}346 \\[4pt]
> > U_{\text{BF}} &= \$600{,}000 + \$614{,}346 \\
> > &= \$1{,}214{,}346
> > \end{align*}
> > $$
> >
> > The BF ultimate is $\$1{,}214{,}346$, of which $\$614{,}346$ is IBNR.
> >
> > *Why didn't the $\$600{,}000$ enter the IBNR?* BF estimates the unreported part from expected losses alone, so the IBNR would be $\$614{,}346$ whatever had been reported by 12 months.

> [!example]- One Shock Claim: BF Against the Chain Ladder {Example}
> Two accident years, each with $\$14{,}000{,}000$ of earned premium and a $65\%$ a priori ELR. At $12$ months, $\text{CDF} = 3.20$ ($31.25\%$ reported).
>
> - **AY A** reported $\$3{,}000{,}000$ — on expectation.
> - **AY B** reported $\$4{,}500{,}000$ — the same, plus one $\$1{,}500{,}000$ shock claim.
>
> Compare how the chain ladder and BF respond to the shock claim.
>
> > [!answer]-
> > Compute both methods for both years, then compare the change from A to B with the size of the claim.
> >
> > Chain ladder, reported losses times the CDF:
> >
> > $$
> > \begin{align*}
> > \text{CL}_A &= \$3{,}000{,}000 \times 3.20 \\
> > &= \$9{,}600{,}000 \\
> > \text{CL}_B &= \$4{,}500{,}000 \times 3.20 \\
> > &= \$14{,}400{,}000
> > \end{align*}
> > $$
> >
> > BF, reported losses plus $68.75\%$ of the $\$9{,}100{,}000$ a priori ($\$6{,}256{,}250$):
> >
> > $$
> > \begin{align*}
> > \text{BF}_A &= \$3{,}000{,}000 + \$6{,}256{,}250 \\
> > &= \$9{,}256{,}250 \\
> > \text{BF}_B &= \$4{,}500{,}000 + \$6{,}256{,}250 \\
> > &= \$10{,}756{,}250
> > \end{align*}
> > $$
> >
> > The $\$1.5$M claim moves the **chain ladder by $\$4{,}800{,}000$** and **BF by exactly $\$1{,}500{,}000$**.
> >
> > *Why does the chain ladder overreact?* It assumes a year that reports more early will report proportionally more throughout. When the extra reporting is one large claim rather than a faster pattern, that assumption manufactures $\$2.20$ of extra reserve for every real dollar.
> >
> > (Neither answer is final for AY B: the shock claim should be removed and reserved on its own, with a provision for further large claims — see [[Large Loss]].)

> [!tip]- How it appears on the exam
> - **Exam 5** (Friedland ch. 9): given a triangle or CDFs, earned premium and an a priori ELR, calculate BF IBNR, ultimate or unpaid — often beside the chain ladder and expected claims methods on the same data.
> - **Exam 5** written parts: explain when BF is preferred to the chain ladder (an immature year, a long-tail line, a distorted diagonal) or why the methods' answers differ.
> - **Exam 7**: BF is the starting point for Mack's [[Benktander Method]] and for credibility weightings of the chain ladder and the a priori.

> [!warning]- Exam traps
> - **Mixing bases.** Reported losses with paid CDFs (or the reverse) gives a number with no meaning. Match the losses to the triangle the CDF came from.
> - **IBNR is not unpaid.** On the reported basis, BF ultimate less reported losses is IBNR; the total unpaid estimate is ultimate less *paid*, which adds the case reserves back.
> - **A stale a priori.** Using a historical loss ratio without bringing it to the current rate level and trend. The question usually signals this with a rate change between the experience and the year being reserved.
````

## Notes on each part

- **Definition** — unchanged: one sentence, what it is and what it does.
- **Formulas** — two stacked blocks, each one statement, narrow.
- **Bullets** — the first is the *where*. Then the **contrast** with the chain
  ladder in one line, the credibility relationship, the **assumption** and what
  breaks it, and a pointer to the method built on it. The old page's longest
  reasoning ("actual emergence is taken at face value …") moved into the idea
  card instead of being said twice.
- **The idea** — three sentences, no new symbols, and it passes the test: from
  it alone a reader can predict that the IBNR ignores reported losses, and that
  a shock claim moves BF one-for-one. It sits after the bullets, so the opening
  that Concept Craft and the SEO description read is untouched.
- **Inline trap** — the one slip made while reading *this* formula, so it sits
  next to it. It is not repeated in *Exam traps*.
- **Figure** — after the idea it illustrates.
- **Examples as a set** — the first is the direct calculation; the second is the
  contrast with the neighbour, on data built to show the boundary between them.
- **Each answer** — a one-sentence plan before any arithmetic; the `align*`
  left-hand sides label the steps; the result in words; one italic *why* line
  that models the question a good student asks.
- **How it appears** — names the exam and the reading, the question shapes and
  what they are paired with, and the written-answer task. No frequencies.
- **Exam traps** — three specific slips, each saying what the wrong answer looks
  like and how the question signals it.
