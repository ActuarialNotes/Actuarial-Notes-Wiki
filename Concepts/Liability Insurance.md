---
aliases:
  - Liability Coverage
verification:
  status: stale
  confidence: null
  last_checked: 2026-10-10
  last_checked_by: agent:validate-v1
  content_hash: sha256:da95001e5a4375854f54a4174676f05278e07e116afd56bcb65427f7ef32a24c
  sources:
    - "ISO CA 00 01 10 13 Business Auto Coverage Form, II.A insuring agreement and duty to defend; supplementary payments 'will not reduce the Limit of Insurance', sha256:b8e36d4e31f05a7eaad97cba8b091f8a45cf1ea302e616bad96b4c132c1457e8 — https://assets.touchpointmarkets.com/80/d7/be854d714678be5fefc9d17cc365/ca-00-01-10-13-business-auto-coverage-form.pdf"
    - "CAS MAS-I tables (Pareto limited expected value), Pareto E[X^x], sha256:cb5674138a67f7a498b8cc90357144fd121cbcbbc7487f214557b105611a69b4 — https://www.casact.org/sites/default/files/2021-03/masi_tables.pdf"
    - "LII Wex, 'independent contractor', entry, sha256:dc17e9075951c353b9492692ee72547cc0cbbe07870a3733fb30938519d41dc6 — https://www.law.cornell.edu/wex/independent_contractor"
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Liability Insurance.md
---

**Liability insurance** pays, on the insured's behalf, the sums the insured becomes legally obligated to pay as damages to a third party for bodily injury or property damage caused by a covered activity, such as owning or using an auto, up to the policy limit, and provides the insured's legal defence. It is third-party cover: the claimant is not the policyholder, and the amount is set by [[Tort Law|tort law]] and the courts rather than by an inspection of the insured's own loss.

The insurer's indemnity on a claim is

> $$\text{Indemnity} = \min(D, L)$$

- $D$ is the damages for which the insured is legally liable.
- $L$ is the limit of insurance.

When defence is paid in addition to the limit, the insurer's cost of a claim is

> $$\text{Insurer cost} = \min(D, L) + \text{Defence costs}$$

Under the business auto liability coverage, defence and other supplementary payments are paid in addition to the limit, and the [[Duty to Defend|duty to defend]] ends once the limit is used up in judgments or settlements. Some professional liability forms put defence inside the limit instead, so that defence payments use up the limit.

## Combined single and split limits

A combined single limit applies one $L$ per accident to all bodily injury and property damage together. Split limits apply separate caps per person, per accident and for property damage. The per-accident cap binds after the per-person caps.

> [!example]- How much does the insurer pay in damages under each limit structure? {Example}
> A delivery van hits a car. Three occupants are injured, with damages of \$450,000, \$380,000 and \$300,000, and the other driver's \$120,000 car is destroyed. Defence costs are \$90,000. The policy has either (a) a \$1,000,000 combined single limit or (b) split limits of \$250,000 / \$500,000 / \$100,000.
>
> > [!answer]-
> > - Total damages are \$1,250,000.
> > - (a) One limit covers the whole accident, so the insurer pays $\min(1{,}250{,}000,\ 1{,}000{,}000) = 1{,}000{,}000$ and the insured retains \$250,000.
> > - (b) Each injured person is capped at \$250,000, so bodily injury is $3 \times 250{,}000 = 750{,}000$, cut to the \$500,000 per-accident cap.
> > - (b) Property damage is $\min(120{,}000,\ 100{,}000) = 100{,}000$, so the insurer pays \$600,000 and the insured retains $1{,}250{,}000 - 600{,}000 = 650{,}000$.
> > - In both cases the \$90,000 of defence is paid on top of the damages. The combined single limit leaves the insured with \$400,000 less exposure for the same accident.

## Increased limits

Higher limits are priced with [[Increased Limits|increased limits factors]]. The factor for a limit $u$ over a basic limit $b$ is

> $$\text{ILF}(u) = \frac{E[X \wedge u]}{E[X \wedge b]}$$

- $E[X \wedge u]$ is the limited expected value of the claim size $X$ at $u$.

> [!example]- What is the increased limits factor for a \$1,000,000 limit over a \$100,000 basic limit? {Example}
> Liability claims per vehicle are Poisson with mean $0.05$, and claim size is Pareto with $\alpha = 2$ and $\theta = 200{,}000$, so that
>
> $$E[X \wedge u] = 200{,}000\left[1 - \frac{200{,}000}{200{,}000 + u}\right]$$
>
> > [!answer]-
> > - $E[X \wedge 100{,}000] = 200{,}000\left(1 - \tfrac{2}{3}\right) = 66{,}667$.
> > - $E[X \wedge 1{,}000{,}000] = 200{,}000\left(1 - \tfrac{1}{6}\right) = 166{,}667$.
> > - The loss cost per vehicle is $0.05 \times 66{,}667 = 3{,}333$ at the basic limit and $0.05 \times 166{,}667 = 8{,}333$ at \$1,000,000.
> > - The increased limits factor is $166{,}667 / 66{,}667 = 2.50$. Ten times the limit costs two and a half times the loss cost.

## Who is liable

Liability can attach without fault of the insured's own, through [[Vicarious Liability|vicarious liability]] for an employee driver, and several defendants may share it ([[Joint and Several Liability]]). Under an auto policy the insured is typically anyone using a covered auto with permission, not only the named insured.

## Reserving

Liability is the classic [[Long Tail Lines|long-tail]] line. Injuries are litigated and settled over years, so [[IBNR]] and development dominate its reserves, unlike first-party physical damage ([[Short Tail Insurance]]).

> [!trap] Subtracting defence from the business auto limit
> Under the business auto liability coverage, defence is paid on top of the limit. An answer that subtracts defence from the \$1,000,000 limit has applied a professional-liability-style form.
