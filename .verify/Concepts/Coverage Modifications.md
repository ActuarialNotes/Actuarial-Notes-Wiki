---
target: Concepts/Coverage Modifications.md
created: 2026-10-04
---

## [C-001] Exam DISC-IA links this page in a different sense
- entry_type: comment
- author: agent:validate-v1
- run_id: 2026-10-04T20:47Z/8861
- date: 2026-10-04
- locus: exam usage
- note: Exam DISC-IA (CAS).md links this page as [[Coverage Modifications|Property Insurance Limits]] (line 52) and as the BPP [[Coverage Modifications|Limits of Insurance]] (line 91): the policy-form provisions of property insurance. This page is the loss-model sense the MAS-I page uses (Domain B Loss Models: deductible, maximum covered loss u, coinsurance share alpha, per-loss / per-payment variables). The two overlap on limits and deductibles but not on coinsurance: in a property form a coinsurance clause is the underinsurance penalty (see Concepts/Coinsurance.md), not the share alpha used here. Not corrected on this page; flagged for whoever maintains the DISC-IA page. Separately: the frequency bullet uses the Loss Models / Exam C parameterisation (negative binomial beta -> beta*v, binomial q -> q*v); Tse 2009 (the MAS-I reading, §2.5, not read - not freely available) may parameterise these distributions differently.

## [C-002] C-001 notation note confirmed against Tse
- entry_type: correction
- author: agent:validate-v1
- run_id: 2026-10-04T20:47Z/8861
- date: 2026-10-04
- locus: Frequency bullet
- note: Supersedes the "may parameterise differently" in C-001, now read in the Tse 2009 publisher preview (sha256:f6d009afdd1776907db090b41b72dd5a76d0b5ba3f0ee42e8b07279d5763b404, https://api.pageplace.de/preview/DT0400.9780511630231_A24404031/preview-9780511630231_A24404031.pdf): Tse writes BN(n, theta) and NB(r, theta) with theta the success probability (§1.3.1 eq 1.17, PDF p.25; §1.3.3 eq 1.29-1.32, PDF p.27-28). In that notation the binomial rule is theta -> theta*v (the page q -> q*v), but the negative binomial rule is not theta -> theta*v: beta = (1 - theta)/theta, so beta -> beta*v is theta -> theta/(theta + v(1 - theta)). The page writes beta, the Loss Models / Exam C parameter (SOA Exam C tables PDF p.15, Loss Data Analytics §5.5.2), so it is right as written; a notation difference only. The C-001 section reference is also confirmed: Tse contents (PDF p.10) list §2.5 Effects of coverage modifications, p.66-79, with §2.5.5 Effects of deductible on claim frequency.
