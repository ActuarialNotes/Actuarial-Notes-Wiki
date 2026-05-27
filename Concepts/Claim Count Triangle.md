**Claim Count Triangle** is a development triangle that organizes cumulative reported claim counts (rather than dollar losses) by accident year and development age, used to analyze claim frequency development separately from severity and to validate or supplement dollar loss triangles.

> $$\text{Ultimate Claim Count} = \text{Reported Count at age }n \times \text{CDF}_{\text{count}, n \to \text{ult}}$$

> $$\text{Ultimate Severity} = \frac{\text{Ultimate Losses}}{\text{Ultimate Claim Count}}$$

- Count CDFs are developed exactly like loss CDFs using age-to-age factors; count factors are typically smaller than loss factors because counts mature faster (claims are reported before all payments are made)
- The frequency-severity approach projects counts and average severity independently, then multiplies: Ultimate Losses $=$ Ultimate Count $\times$ Ultimate Severity; useful when severity trends differ from frequency trends
- Claim count triangles also serve as diagnostics: a diagonal shift in count factors signals a change in reporting speed or claims department processing practices
- Closed claim count triangles (rather than reported) are used to monitor settlement rates and detect changes in closure patterns that would distort paid loss development

> [!example]- Count Triangle Development {Example}
> Cumulative reported claim counts:
>
> | AY | 12 mo | 24 mo | 36 mo |
> |----|-------|-------|-------|
> | 2021 | 450 | 520 | 545 |
> | 2022 | 475 | 550 | — |
> | 2023 | 500 | — | — |
>
> > [!answer]-
> > 12-to-24 factors: $520/450 = 1.156$; $550/475 = 1.158$; selected $= 1.157$
> >
> > 24-to-36 factor: $545/520 = 1.048$; selected $= 1.048$; tail $= 1.010$
> >
> > Count CDF at 12 mo $= 1.157 \times 1.048 \times 1.010 = 1.224$
> >
> > AY 2023 ultimate count $= 500 \times 1.224 = 612$ claims; if ultimate losses $= \$612{,}000$, ultimate severity $= \$1{,}000$ per claim
