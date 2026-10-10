---
target: Concepts/Web Scraping.md
created: 2026-10-10
---

## [F-001] robots.txt described as setting crawl speed
- entry_type: finding
- author: agent:validate-v1
- run_id: 2026-10-10T21:00Z/dv01
- date: 2026-10-10
- severity: minor
- status: open
- locus: Terms of use bullet ("which pages crawlers may visit and how fast") and Example 1 stem
- claim: 'its `robots.txt` file states which pages crawlers may visit and how fast'
- evidence: RFC 9309, Robots Exclusion Protocol (IETF, 2022; sha256:bbaa280636d3e38f0a1a130a5ce40e9753db1ed18c860945b0bf795ff8dc1a87 — https://www.rfc-editor.org/rfc/rfc9309.html): the protocol's rules are allow/disallow lines for paths (§2.2); records that are not part of the protocol MAY be interpreted by crawlers (§2.2.4); the rules 'are not a form of access authorization'. A crawl-delay line is not part of the standard, so robots.txt states which paths, and only by an optional extension how fast. r4ds §24.2 recommends waiting between requests as courtesy, not because robots.txt sets a rate.
- source_rank: 3
- proposed_action: Reword: robots.txt states which pages crawlers may visit; some sites add a non-standard crawl-delay line, and good practice is to wait between requests either way. The example's '5-second delay' can stay as a site's request.
- applied: false
- fingerprint: 2e63c248c940

## [F-002] Legal limits omit the U.S. position the open textbook gives
- entry_type: finding
- author: agent:validate-v1
- run_id: 2026-10-10T21:00Z/dv01
- date: 2026-10-10
- severity: minor
- status: open
- locus: Terms of use and legal limits bullet; trap "Public is not free to use"
- claim: 'A site's terms of use may forbid automated collection ... Copyright, contract, computer misuse and privacy laws can all apply' and 'Data visible on a public page can still be protected by the site's terms of use, copyright or privacy law.'
- evidence: Wickham et al., R for Data Science (2e) §24.2 (sha256:460c5ef7b2c93b577eb9edf35c23ac336e97c997fbaf552e08e9df004ec5c817 — https://r4ds.hadley.nz/webscraping.html): 'as a general principle, if the data is public, non-personal, and factual, you're likely to be ok'; U.S. courts have generally found terms of service in a footer not binding without explicit assent (hiQ v. LinkedIn), unlike Europe; U.S. copyright does not protect data/facts (Europe has a sui generis database right); personally identifiable information is the serious risk. The page's statements are hedged ('may', 'can') and not false, but for a U.S. course they omit the distinction (public, non-personal, factual vs personal or behind an account) that the source draws, and the trap reads as if public facts were generally protected.
- source_rank: 3
- proposed_action: Add the U.S. distinction from r4ds §24.2 (public, non-personal, factual data generally lower risk; terms of service bind mainly with explicit assent; facts are not copyrightable in the U.S.; PII is the main legal and ethical risk). Author's call; keep the compliance-review advice.
- applied: false
- fingerprint: 7ce7231fe38e

## [C-001] Validation pass
- entry_type: comment
- author: agent:validate-v1
- run_id: 2026-10-10T21:00Z/dv01
- date: 2026-10-10
- status_set: verified
- confidence: medium
- checks_run: Scraping = requesting pages, parsing HTML by elements/classes/CSS selectors into a table = r4ds §24.3-24.4; prefer an API, which gives more reliable data = §24.1; scrapers break when the site's structure changes = §24.6; terms of service, PII and copyright = §24.2; wait between requests = §24.2; robots.txt = RFC 9309 (see F-001); proxy discrimination and third-party data governance = NAIC model bulletin via Vermont 229. Examples recomputed first: 0.65 x 0.92 = 0.598 -> 7,176 of 12,000; 0.65 x 0.85 = 0.5525 -> 6,630; 24,000 requests x 5 s = 120,000 s = 33.3 h; 1 ft2 = 0.09290304 m2 so 1 m2 = 10.7639 ft2 (NIST SP 811 B.9), 172 x 10.7639 = 1,851.4 -> 1,851 — all match. Tip: DISC-DA 3.e 'Extracting Data from Online Sources and Data Marts' = syllabus. Links resolve.
- sources_checked: Wickham, Çetinkaya-Rundel & Grolemund, R for Data Science (2e), Ch.24 'Web scraping', §24.1 (use an API where possible: more reliable data), §24.2 ethics and legalities (terms of service, PII, copyright; public, non-personal, factual data; wait between requests), §24.3-24.4 (HTML elements, id/class attributes, CSS selectors), §24.6 (if the structure of the site changes, the scraping code must change), sha256:460c5ef7b2c93b577eb9edf35c23ac336e97c997fbaf552e08e9df004ec5c817 — https://r4ds.hadley.nz/webscraping.html; IETF RFC 9309, Robots Exclusion Protocol (Sept. 2022), §2.2 the protocol defines allow/disallow rules for paths; §2.2.4 records that are not part of the protocol (e.g. Sitemaps) MAY be interpreted by crawlers; §2.1 rules are not a form of access authorization, sha256:bbaa280636d3e38f0a1a130a5ce40e9753db1ed18c860945b0bf795ff8dc1a87 — https://www.rfc-editor.org/rfc/rfc9309.html; NIST SP 811, Guide for the Use of the SI, Appendix B.9, B.9 conversion factors: square foot (ft2) to square meter (m2) 9.290 304E-02, sha256:64d01ada3f09299eeaa3eab7fbb6a6fa78438aa35813cafdbb6b7f2b829371c9 — https://www.nist.gov/pml/special-publication-811/nist-guide-si-appendix-b-conversion-factors/nist-guide-si-appendix-b9; Vermont DFR Insurance Bulletin No. 229 (Mar. 12, 2024), adopting the NAIC Model Bulletin on Use of AI Systems by Insurers: unfair discrimination, bias analysis, data lineage/currency, third-party data and AI systems (§§3-4), sha256:0fa2eb6c77c4fad493df0b53612e9fd4cb815834300d37433713caaa70c215a5 — https://dfr.vermont.gov/sites/finreg/files/regbul/dfr-insurance-bulletin-229-ai.pdf; The Institutes, CAS DISC DA – Introduction to Data and Analytics Course Syllabus (© 2023), Course Syllabus, PDF pp.2-3 (topics 1-10 and their lettered sections), sha256:d4d823238bd55da3339a9a1ad682029c9a7aa9d4bcb0c18b319d499a00f6ba16 — https://www.casact.org/sites/default/files/2022-12/DISC_DA.pdf
- note: Medium: r4ds and RFC 9309 (rank 3); two minor findings open (robots.txt rate; U.S. legal framing). The tip's description of DISC-DA question shapes is study guidance (the only public statement of question form is CAS's 'application-based multiple-choice'); its topic placement was checked against the DISC DA syllabus.
