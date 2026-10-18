---
target: Concepts/Intraclass Correlation.md
created: 2026-10-18
---

## [C-001] Validation pass — verified
- entry_type: comment
- author: agent:validate-v1
- run_id: 2026-10-18T16:03Z/765d
- date: 2026-10-18
- status_set: verified
- confidence: medium
- checks_run: concept checked claim by claim against open texts; every worked example recomputed before reading its answer; wiki-links resolved
- sources_checked: SAS/STAT 13.1 User's Guide, Chapter 63: The MIXED Procedure (SAS Institute), Notation for the Mixed Model p.5236; Mixed Models Theory pp.5315-5322 (CS vs random intercept, ML/REML log-likelihoods, mixed model equations, BLUP/EBLUP, boundary mixture of chi-squares); Table 63.17 p.5303-5304, sha256:bbde853def15e236149d167e1b35f191c5b2d002efd59792b75f5d22449a72a1 — https://support.sas.com/documentation/onlinedoc/stat/131/mixed.pdf; Killip, Mahfoud & Pearce, What Is an Intracluster Correlation Coefficient?, Ann. Fam. Med. 2(3), 2004 (open access), equations 1-2, effective sample size and design effect, sha256:515a0e983ed61c862dbd6609f458c9116598d84ce7a17a4f807e5357cbaa4f53 — https://pmc.ncbi.nlm.nih.gov/articles/PMC1466680/
- note: ICC = sb2/(sb2+s2) and its role as the CS off-diagonal correlation match SAS pp.5315 and 5369 (ICC = 3.0306/(3.0306+1.8746)); design effect 1+(m-1)rho, effective sample size and understated SEs match Killip et al. eqs. 1-2. Example recomputed: rho = 0.20, DE = 4.8, n_eff = 104.2, sqrt(4.8) = 2.19; matches. Confidence capped at medium (decision D7): the assigned reading, West, Welch & Galecki 3rd ed., is commercial and was not read; the page was checked against open texts covering the same ground and West's own author-hosted shrinkage note. Notation: the page writes the random effects b (Laird-Ware/lme4); SAS writes gamma and G for D; West's Chapter 2 notation could not be checked.
