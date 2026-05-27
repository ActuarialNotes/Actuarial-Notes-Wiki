**Benktander Method** (GB, or iterated BF) is a loss reserving technique that uses the BF ultimate as the new "expected losses" for one additional BF iteration, producing an estimate that lies between the [[Bornhuetter Ferguson Method]] and the [[Chain Ladder Method]].

> $$\text{Ultimate}_{\text{GB}} = \text{Reported} + \underbrace{\left(\text{Ultimate}_{\text{BF}} - \text{Reported}\right)}_{\text{BF IBNR}} \times \left(1 - \tfrac{1}{\text{CDF}}\right)$$

- Iterating the BF formula to convergence yields the chain ladder; the Benktander is the result after exactly **two total iterations** (one BF + one refinement)
- GB gives **more weight to actual emergence** than BF while remaining more stable than the chain ladder — most useful for moderately mature accident years (roughly 24–48 months)
- The method requires no additional data beyond what BF needs: reported losses, CDF, and an a priori ELR
- When actual emergence exceeds a priori expectations, the ordering of ultimates is: BF $<$ GB $<$ Chain Ladder

> [!example]- Benktander Reserve {Example}
> AY with reported $= \$600$, a priori expected losses $= \$1{,}000$, CDF $= 2.000$ (% unreported $= 50\%$).
>
> > [!answer]-
> > BF Ultimate: $600 + 1{,}000 \times 0.50 = \$1{,}100$; BF IBNR $= \$500$
> >
> > GB Ultimate: $600 + 500 \times 0.50 = 600 + 250 = \$850$
> >
> > Chain Ladder: $600 \times 2.000 = \$1{,}200$
> >
> > Here the a priori is higher than actual emergence implies, so GB $(\$850) <$ BF $(\$1{,}100) <$ CL $(\$1{,}200)$; GB pulls closer to the reported losses by discounting the BF IBNR a second time
