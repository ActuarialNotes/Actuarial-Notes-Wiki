---
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:e4e307ec438983e6f031d983cfbc88c80541ff16c7bbca946195ae52ea80f65a
  sources: []
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Cap on Non-Pecuniary Damages.md
---

![[Media/Figures/Cap_on_Non-Pecuniary_Damages.svg|340]]

The **Cap on Non-Pecuniary Damages** is the ceiling Canadian courts place on general damages for non-pecuniary loss, the non-economic loss from physical or psychological pain and suffering, in personal injury cases. The Supreme Court of Canada's 1978 trilogy of [[Court Case|decisions]] (*Andrews v. Grand & Toy Alberta Ltd.*, *Teno v. Arnold* and *Thornton v. Prince George School District No. 57*) set it as a *rough upper limit* of $\$100{,}000$, indexed for inflation.

The cap limits only the non-pecuniary head of a [[Tort Litigation|tort]] award. With pecuniary damages $D_P$ and non-pecuniary damages assessed at $D_N$, the award is

> $$A = D_P + \min(D_N, C_t)$$

- $D_P$ covers loss of income and future care, which are compensated in full.
- $C_t$ is the cap at the date of the award.

The cap at time $t$ is

> $$C_t = \$100{,}000 \times \frac{P_t}{P_{1978}}$$

- $P_t / P_{1978}$ is the rise in prices since the trilogy.

[[Davidson]] puts the indexed cap at $\$311{,}483$ as of December 2006. Where a jury's award exceeds the cap, the court substitutes an award at the cap.

> [!example]- What does the court award this plaintiff? {Example}
> A young plaintiff suffers a catastrophic brain injury in a car accident. The jury assesses:
>
> | Head of damages | Assessed ($) |
> | :--- | ---: |
> | Pain, suffering and loss of amenities | 1,500,000 |
> | Future loss of income | 2,000,000 |
> | Future care | 3,200,000 |
>
> Prices have risen $20\%$ between December 2006, when the indexed cap stood at $\$311{,}483$, and the date of the award.
>
> > [!answer]-
> > - The cap at the date of the award is $C_t = \$311{,}483 \times 1.20 = \$373{,}780$.
> > - The pecuniary damages are $D_P = \$2{,}000{,}000 + \$3{,}200{,}000 = \$5{,}200{,}000$, paid in full.
> > - The non-pecuniary damages are $\min(\$1{,}500{,}000, \$373{,}780) = \$373{,}780$.
> > - The award is $\$5{,}200{,}000 + \$373{,}780 = \$5{,}573{,}780$.
> > - The cap removes $\$1{,}126{,}220$, all of it from pain and suffering. A second plaintiff assessed at $\$90{,}000$ non-pecuniary would receive it in full.

## Reasons for the cap

Dickson J. gave four reasons for the cap in *Andrews*:

1. The claim of a severely injured person is virtually limitless, and with no objective yardstick, awards are inconsistent and widely extravagant.
2. Non-pecuniary damages are not really compensatory, since no money can provide true restitution. They provide additional money to make life more endurable.
3. The plaintiff is fully compensated for future loss of income and future care, which are arguably more important to ensuring the injured person is well cared for.
4. Exorbitant awards lead to an excessive social burden: unaffordable increases in insurance and social costs. In *Teno*, Spence J. feared a world where "none but the wealthy could own or drive automobiles".

Davidson draws from the third reason the assumption behind the cap: pecuniary loss is fully compensated, "a co-ordinated and interlocking basis for compensation".

## Cases that confirmed the cap

- *Fenn v. City of Peterborough* (Ont. C.A., 1979) awarded $\$125{,}000$, citing the erosion in the value of money since the trilogy trials and the plaintiff's more substantial pain. It was never appealed, and it remains the only appellate award above the cap.
- *Lindal v. Lindal* (SCC, 1981) held that injuries are not to be compared between plaintiffs. $\$100{,}000$ is the limit for all such cases, and it is the $\$100{,}000$, not the award, that is raised for inflation.
- *ter Neuzen v. Korn* (SCC, 1995) said the trilogy had imposed the limit as a "rule of law".
- *Lee v. Dawson* (B.C.C.A.) cut a jury's $\$2{,}000{,}000$ to $\$294{,}600$, the indexed cap at the time. The plaintiff argued that the cap offends the Charter's section 15 equality values, since it denies full compensation only to the most seriously injured. The court rejected that, because general damages were never meant to give full compensation. It found some arguments against the cap compelling but held that it could not overturn the trilogy. On October 19, 2006 the Supreme Court dismissed leave to appeal without reasons, so the cap remains the law.

## Exceptions to the cap

The cap does not apply to:

1. Sexual assault (*S.Y. v. F.G.C.*, B.C.C.A.).
2. Defamation (*Hill v. Church of Scientology*, $\$300{,}000$ general damages).
3. Negligence causing economic loss (*Young v. Bella*, where the Supreme Court refused to cap a jury's $\$430{,}000$). Some published answers file this case under defamation, but Davidson treats it as negligence causing economic loss.

In each case the policy concern behind the cap, social cost, was not made out. In *Young v. Bella* the Supreme Court quoted *S.Y.*: there was "no evidence" that such cases have "any impact on the public purse". The cap stays with catastrophic personal injury from accidents and medical malpractice.

> [!example]- A university's negligent handling of a student's file destroys her career prospects, with no physical injury. Does the trilogy cap limit her non-pecuniary award? {Example}
> - Her claim is negligence causing economic loss, not personal injury from an accident or malpractice.
> - In *Young v. Bella* the Supreme Court held that the case for capping such claims was not made out.
> - The cap does not apply, and in that case the jury's $\$430{,}000$ stood.

## Statutory caps

A province can legislate its own cap for a class of injury. It is a [[Tort Reform|tort reform]] tool, alongside the [[Tort Threshold and Deductible|threshold and deductible]], and it is distinct from the trilogy, which caps every injury. A challenge to a statutory cap is a Charter question about that legislation. In *Morrow v. Zhang* (a case in the [[Landmark Legal]] reading), Alberta's cap on non-pecuniary damages for minor injuries was struck down at trial on Charter grounds, and the Court of Appeal reversed that ruling and upheld the cap.

> [!trap] Confusing the cap with punitive damages
> The trilogy caps non-pecuniary general damages for pain and suffering. It does not cap [[Punitive Damages|punitive damages]], and the examiner's reports single out confusing the two.
