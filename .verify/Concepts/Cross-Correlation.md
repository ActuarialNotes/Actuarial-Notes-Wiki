---
target: Concepts/Cross-Correlation.md
created: 2026-10-05
---

## [F-001] Significance-bound condition drops 'independent' from white noise
- entry_type: finding
- author: agent:validate-v1
- run_id: 2026-10-04T20:47Z/8861
- date: 2026-10-05
- severity: minor
- status: open
- locus: body, bullet 'Significance bounds' (line 29)
- claim: If x_t and y_t are independent and at least one of them is [[White Noise|white noise]], the sample ccf is approximately normal with mean 0 and standard deviation 1/sqrt(n).
- evidence: Shumway & Stoffer, Time Series Analysis and Applications Using R, EZ ed. (2016.12.30), Property 1.3 (PDF p.25): 'If xt and yt are independent processes, then under mild conditions, the large sample distribution of rho-hat_xy(h) is normal with mean zero and standard deviation 1/sqrt(n) if at least one of the processes is independent white noise.' S&S Example 1.6 (PDF p.10) distinguishes 'white noise' (uncorrelated, wn(0,sigma^2)) from 'white independent noise' (iid), so the source's hypothesis is the iid one. The page states the result for 'white noise' and links it to Concepts/White Noise.md, which defines white noise as merely uncorrelated (Cov(e_t,e_s)=0) and says 'uncorrelated does not imply independent' - so a reader following the link gets a weaker hypothesis than the theorem has. Low consequence for MAS-II: the syllabus reading, Cowpertwait & Metcalfe §4.2.2 p.68 (Springer Ch 4 preview), defines discrete white noise as iid with mean zero, under which the page's wording is exactly right. sha256 S&S EZ a0fd39387167c0c6b618f4bd853e99782e418ba4679b42542a4fb664b4aa463d; Cowpertwait Ch 4 preview d8e42f4527e38bf7ba4354ff4d0198fd31e7afd4680564195dbc6b38b8bacc6b.
- source_rank: 2
- proposed_action: Say 'independent (iid) white noise' in the significance-bound condition, matching S&S Property 1.3 and Cowpertwait's DWN definition (§4.2.2).
- applied: false
- fingerprint: 35e3b06a4899
