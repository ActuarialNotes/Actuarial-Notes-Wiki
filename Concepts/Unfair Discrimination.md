---
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:03aa359d2835e7492b83c59770486d3b11fc429081361a980204bfb22c1dec14
  sources: []
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Unfair Discrimination.md
---
![[Media/Figures/Unfair_Discrimination.svg|340]]

**Unfair Discrimination** in insurance rating is charging different premiums to risks that present the **same expected cost**, or charging on a basis that is legally or socially prohibited. Insurance is discriminatory in the neutral sense, since its purpose is to separate risks, so the regulatory standard is no discrimination unsupported by expected cost and permitted by law.

On a permitted basis, the premiums of two risks $A$ and $B$ are fair when their ratio is

> $$\frac{\text{Premium}_A}{\text{Premium}_B} = \frac{E[\text{Loss}_A]}{E[\text{Loss}_B]}$$

- $\text{Premium}_A$ is the premium charged to risk $A$.
- $E[\text{Loss}_A]$ is the expected loss of risk $A$.

## Two kinds of failure

Two distinct failures are often confused:

| Failure | Example | What is wrong |
| :--- | :--- | :--- |
| Rate differences with no cost basis | Price optimisation by elasticity, or a relativity kept because it is profitable rather than indicated | Unfair discrimination in the classical sense |
| Cost-based differences on a prohibited basis | Sex, race or another characteristic the law excludes, even where the loss data supports the difference | The rate is actuarially sound and still unlawful |

The second is a policy override, not an actuarial error. The actuary's job is to say so plainly: the variable is predictive, its use is prohibited, and the consequence of prohibition is the cross-subsidy quantified in [[Risk Classification Restrictions]].

Human rights legislation supplies the outer boundary, and insurance statutes and rate filings supply the operational one. The two are not the same list in every province.

> [!example]- Is each of these rate differences fair, unfairly discriminatory, or prohibited though cost-based? {Example}
> 1. A driver with two at-fault accidents pays $60\%$ more than an otherwise identical driver with none.
> 2. Two identical risks pay different premiums because the model identified one as unlikely to shop at renewal.
> 3. Male drivers aged $18$ to $21$ show materially higher pure premiums than female drivers of the same age, and the insurer wishes to reflect it.
>
> > [!answer]-
> > - Difference 1 is fair. Accident history is causally related to expected loss, objective, verifiable, within the driver's control, and permitted everywhere in Canada.
> > - Difference 2 is unfairly discriminatory. The premium difference tracks elasticity, not expected cost, so identical risks are charged differently for the same coverage. Canadian regulators do not accept it in a filing.
> > - Difference 3 is prohibited though cost-based, in provinces that ban sex as a rating variable. The data supports the difference, but the law forbids using it. The consequence is a cross-subsidy from young women to young men, and the honest filing states that rather than concealing it in a "years licensed" proxy.

## Proxy discrimination

A model that omits a prohibited variable can still reproduce its effect through correlated permitted variables, especially in high-dimensional models. Testing for it means measuring the model's output across the protected groups, not only checking that the variable is absent from the input ([[Bias in Actuarial Practice]]).

## Explaining a rate difference

Under the [[Standards of Practice]] and the [[Market Conduct Regulation|fair treatment of customers]] framework, the actuary is expected to be able to **explain** a rate difference in cost terms. A relativity that cannot be explained is a conduct exposure whatever its lift.

## Unfair discrimination in the United States

State rating laws require rates that are not excessive, inadequate or unfairly discriminatory, and the CAS *Statement of Principles* calls a rate that meets all three an actuarially sound estimate of expected future costs.

The NAIC Unfair Trade Practices Act (§4H) lists, among unfair discrimination, refusing or limiting coverage because of sex, marital status, race, religion or national origin. It also lists refusing or limiting a property or casualty risk solely for its geographic location unless sound underwriting and actuarial principles support it. States adopt their own versions.

Colorado's SB21-169 extends the prohibition to external consumer data and predictive models whose use unfairly discriminates by protected class, which reaches the proxy problem directly ([[Insurance Data Regulation]]). [[Credit-Based Insurance Scoring|Credit-based insurance scores]] are the leading U.S. case.

> [!trap] Arguing the statistics for a prohibited variable
> A rate difference can be fully supported by losses and still be unlawful because the variable is prohibited. For a prohibited variable the statistics are not in dispute. The question is whether the variable is permitted.
