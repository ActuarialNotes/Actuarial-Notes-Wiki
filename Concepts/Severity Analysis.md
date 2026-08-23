---
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:3cb7d9718b4b812f6af0d5037159d30c986fcd5a0ef7ab5cbe06454b51e058bc
  sources: []
  open_findings: 0
  log: .verify/Concepts/Severity Analysis.md
---

**Severity Analysis** is the study of average claim cost across accident years, maturities, classes and coverages — used both to select a [[Loss Trend|severity trend]] for pricing and to diagnose what a [[Development Triangle|triangle]] is doing.

> $$\text{Average Severity} = \frac{\text{Losses}}{\text{Claim Counts}}$$

> $$\text{Annual Trend} = \left(\frac{S_n}{S_0}\right)^{1/n} - 1$$

- The numerator and denominator must be **consistently defined**. Reported losses over reported counts, paid over closed, ultimate over ultimate — mixing them (reported losses over closed counts is the classic) produces a series that measures nothing.
- Severity triangles are read down the **column**, not across the row: comparing accident years at the *same* maturity isolates the change in cost level, while movement along a row is development.
- Three distinct forces move a severity series and the analysis must separate them:
  - **Genuine cost inflation** — medical, wage, repair, legal.
  - **[[Large Loss|Large-loss]] noise** — a shock claim in one year, which is why severity is studied on capped data.
  - **Mix and dilution** — late-reported small claims pulling averages down, or a shift in the [[Mix of Business|mix]] of coverages and limits.
- As a **reserving diagnostic**, average case outstanding per open claim is the sharpest single indicator: a jump across all accident years in one calendar year is [[Case Adequacy|case strengthening]], while a rise concentrated in one accident year is a genuine change in that year's claims.
- Severity analysis is what the [[Frequency-Severity Method]] rests on: project counts and severities separately, then multiply.

![[Media/Figures/Severity_Analysis.svg|340]]

> [!example]- Fitting a Severity Trend {Example}
> Auto bodily injury ultimate figures: AY $2021$ — $\$5{,}000{,}000$ on $1{,}000$ claims; AY $2023$ — $\$6{,}600{,}000$ on $1{,}100$ claims.
>
> Compute the annual severity trend.
>
> > [!answer]-
> > $$\begin{align*}
> > S_{2021} &= \frac{\$5{,}000{,}000}{1{,}000} = \$5{,}000 \\[4pt]
> > S_{2023} &= \frac{\$6{,}600{,}000}{1{,}100} = \$6{,}000 \\[6pt]
> > \text{Trend} &= \left(\frac{6{,}000}{5{,}000}\right)^{1/2} - 1 \\
> > &= 1.0954 - 1 \\
> > &= 9.5\%
> > \end{align*}$$
> >
> > Note what the two-point fit hides: it uses no information from AY $2022$, and it cannot distinguish a steady $9.5\%$ from a flat year followed by a $20\%$ jump. Two points give a number, not a trend — a defensible selection needs the full series and a fitted regression.

> [!example]- Diagnosing a Triangle with Average Case Outstanding {Example}
> Average case outstanding per open claim, by accident year and maturity:
>
> | AY | 12 mo | 24 mo | 36 mo |
> |---|---|---|---|
> | $2021$ | $\$9{,}000$ | $\$14{,}500$ | $\$21{,}000$ |
> | $2022$ | $\$9{,}300$ | $\$15{,}100$ | $\$27{,}500$ |
> | $2023$ | $\$9{,}500$ | $\$19{,}600$ | |
> | $2024$ | $\$12{,}400$ | | |
>
> What is happening, and how does it affect the reserving methods?
>
> > [!answer]-
> > Read down each column and the picture is clear:
> >
> > - At $12$ months: $9{,}000 \to 9{,}300 \to 9{,}500$, about $+2.7\%$ a year — then $\$12{,}400$, a $+30.5\%$ jump.
> > - At $24$ months: $14{,}500 \to 15{,}100$ ($+4.1\%$) — then $\$19{,}600$, $+29.8\%$.
> > - At $36$ months: $21{,}000$ — then $\$27{,}500$, $+31.0\%$.
> >
> > The jump sits on the **latest diagonal** at every maturity and is the same size at each. That is a [[Case Adequacy|case reserve strengthening]] during the $2024$ calendar year, not a change in any accident year's underlying cost.
> >
> > Consequences:
> >
> > - **Reported chain ladder** is now biased **high**: historical factors were built on weaker reserves and are being applied to a strengthened diagonal, developing the strengthening a second time.
> > - **Paid chain ladder** is unaffected — payments have not changed — so a divergence between paid and reported ultimates should now appear, confirming the diagnosis.
> > - The fix is [[Berquist-Sherman Method|Berquist-Sherman]]: restate the historical reported triangle to current case adequacy by trending average case outstanding at the selected severity trend, rebuild the triangle, and re-select factors from the restated history.
