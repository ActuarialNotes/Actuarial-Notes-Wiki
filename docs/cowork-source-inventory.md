# Cowork source inventory

The **backlog** behind `quiz/src/data/coworkSources.ts`. The catalogue file says what Cowork
carries today; this file says what it should carry next, in what order, and what each entry
costs to add. It is maintained over time: a publisher moves from a table here into the
catalogue, and its row is struck through rather than deleted, so the reasoning survives.

Read `docs/cowork.md` for the design and `.claude/skills/cowork-sources/SKILL.md` for the
operating procedure. This file adds nothing to either — it is a queue.

---

## 1. What decides the order

A row's priority is the product of three things, in this order:

1. **How often a deliverable needs it.** A source behind an assumption *every* reserving or
   pricing deliverable carries (a discount curve, an inflation index) outranks one behind a
   specialty line.
2. **Whether anything else can answer for it.** Bank of Canada curves have no substitute in
   the catalogue; a second listed insurer's annual report is a third data point on something
   two sources already cover.
3. **What it costs.** A publisher whose documents are *already vault pages* is nearly free
   and strictly better than a sample — it opens offline, it carries a fact-check record, and
   nothing about it is invented. See §2.

Jurisdiction and function coverage break ties. The catalogue is a Canadian P&C corpus with
life, pensions and ERM at its edges, so a gap in a *province* or in a *function*
(`pricing`, `underwriting`, `reserving`, `capital`, `financial-reporting`, `advisory`)
counts against every source that would fill it.

## 2. The two costs a row can have

Every candidate is one of three costs, and the cheapest is not the fastest to type — it is
the one that invents least:

| Cost | Means | When |
|---|---|---|
| **Free** | The vault already has the page. Add an entity and a `wikiRef` resource. | §4 lists 51 such pages. |
| **Sample** | No vault page. Add a `sample: true` resource naming a *class* of document, with a body in `coworkDocs.ts` — **no date, no link**. | The publisher's corpus isn't carried yet. |
| **Vault first** | The document is one specific, citable work that deserves a real page. Author `Resources/Books/<name>.md` first, then point a `wikiRef` at it. | IFRS 17, a named ASOP, a textbook. |

**A real document can only enter Cowork as a vault page.** The tests enforce it both ways, and
the reason is the rule the whole product rests on: a `sample` carries no date and no link
because it names no particular document, and a dated, linked entry that *isn't* a vault page
would be a citation nothing supports. Never work around a "vault first" row by giving a sample
a date.

---

## 3. The queue

### P1 — added, or next

The ten highest-priority publishers are **in the catalogue** as of this file's first version.
They are kept here because the inventory is the record of why.

| Publisher | Jur. | Category | Why it is P1 | Cost |
|---|---|---|---|---|
| ~~Bank of Canada~~ | CA | industry-data | The Government of Canada curve behind every discounted liability, and the inflation outlook every trend selection is argued against. Nothing else in the catalogue answers for it. | sample ×2 |
| ~~Statistics Canada~~ | CA | industry-data | CPI is the input to almost every trend assumption; the life tables are the only population mortality basis in the corpus. | sample ×2 |
| ~~Canadian Council of Insurance Regulators~~ | CA | regulator | The P&C annual return instructions and the Annual Statement on Market Conduct — the harmonised reporting most Canadian insurers actually file. Vault page already present. | free + sample |
| ~~Autorité des marchés financiers~~ | QC | regulator | Québec is the largest market with no regulator in the catalogue; its capital guideline is a second capital basis beside the MCT. | sample ×2 |
| ~~Automobile Insurance Rate Board~~ | AB | regulator | Alberta auto rate filings are approved here. With FSRA, it closes the two largest private-auto filing regimes. | sample ×2 |
| ~~MSA Research~~ | CA | industry-data | The Canadian insurer financial database peer comparisons are built from. Vault page already present. | free + sample |
| ~~CatIQ~~ | CA | industry-data | The authoritative insured-catastrophe loss aggregator — the basis a cat load is argued from rather than assumed. | sample ×2 |
| ~~Facility Association~~ | CA | industry-data | The residual market. Auto pricing that ignores the FARM has a hole in its exposure picture. | sample ×2 |
| ~~Society of Actuaries~~ | NA | standards | Experience studies and mortality tables — the only life/pensions research source in the corpus. Vault page already present. | free + sample |
| ~~Government of Canada~~ | CA | regulator | The Insurance Companies Act itself, plus federal policy work (flood). Two vault pages already present. | free ×2 |

### P2 — the next pass

| Publisher | Jur. | Category | Why | Cost |
|---|---|---|---|---|
| IFRS Foundation / IASB | Global | standards | IFRS 17 is the measurement standard the four CIA notes in the catalogue *interpret*. The catalogue currently has the interpretations and not the standard. | **vault first** — `Resources/Books/IFRS 17.md` |
| Government of Alberta | AB | regulator | `Alberta Auto Reform` (2020) and `CFAI` are already vault pages; Alberta's reform programme is live and drives filings. | free ×2 |
| International Actuarial Association | Global | standards | `IAA Climate` is already a vault page; the IAA's climate and ERM papers are the international layer above the CIA's. | free |
| Actuarial Standards Board (Canada) | CA | standards | `CIA CSOP` is *published* by the Canadian ASB, not the CIA — the catalogue currently attributes it to the CIA. Splitting it fixes an attribution, not just a gap. | free (re-attribution) |
| Insurance Corporation of British Columbia | BC | insurer | A public auto insurer's revenue-requirements evidence filed with the BCUC is the most detailed public actuarial work in the country. | sample ×2 |
| Groupement des assureurs automobiles | QC | industry-data | Québec auto statistics. GISA does not cover Québec, so the catalogue's auto data stops at the border. | sample |
| CPA Canada | CA | standards | The accounting and assurance handbook an insurer's statements are audited against, beside IFRS. | sample |
| Department of Finance Canada | CA | regulator | Federal financial-sector legislative review — where changes to the ICA start. | sample |
| Guy Carpenter / Aon (reinsurance broker) | Global | consulting | Renewal conditions and rate-on-line. The catalogue has a reinsurance *guideline* and no reinsurance *price*. | sample |
| Financial Services Commission of Ontario | ON | regulator | `FSCO Coverages`, `FSCO Private Auto`, `FSCO Tech Notes` are vault pages. FSCO is FSRA's predecessor — worth listing as its own entity so a pre-2019 citation is attributed correctly. | free ×3 |

### P3 — worth having, no urgency

| Publisher | Jur. | Category | Why |
|---|---|---|---|
| BC Financial Services Authority | BC | regulator | BC prudential and market conduct. |
| Nova Scotia Utility and Review Board | NS | regulator | Atlantic auto rate approvals. |
| NL Board of Commissioners of Public Utilities | NL | regulator | Atlantic auto rate approvals. |
| PEI Island Regulatory and Appeals Commission | PE | regulator | Atlantic auto rate approvals. |
| Financial and Consumer Services Commission | NB | regulator | Atlantic auto rate approvals. |
| Financial and Consumer Affairs Authority | SK | regulator | Saskatchewan supervision. |
| Manitoba Public Insurance / SGI / SAAQ | MB, SK, QC | insurer | The public auto insurers; their rate applications are public actuarial evidence. |
| Fairfax Financial Holdings | CA | insurer | A third listed Canadian carrier beside Intact and Definity. |
| Co-operators, Wawanesa, Aviva Canada, Desjardins | CA | insurer | Mutual and private carriers — annual reports, no filings. |
| Trisura Group | CA | insurer | Specialty lines, where the listed carriers give no read. |
| American Academy of Actuaries | US | standards | The US professional layer above the ASB. |
| Institute and Faculty of Actuaries | UK | standards | `IFOA` is a vault page. |
| NAIC | US | regulator | RBC and US statutory reporting, for comparison. |
| IAIS | Global | regulator | ICS and ComFrame — where group capital is heading. |
| A.M. Best | Global | industry-data | Ratings and benchmark ratios. |
| Swiss Re Institute | Global | industry-data | `sigma` — global premium and catastrophe aggregates. |
| Munich Re | Global | industry-data | NatCatSERVICE loss data. |
| Verisk / ISO | US | industry-data | Loss costs and catastrophe models. |
| NCCI | US | industry-data | US workers-compensation experience. |
| Environment and Climate Change Canada | CA | industry-data | The weather record behind a climate scenario. |
| Canada Mortgage and Housing Corporation | CA | industry-data | Property values and construction cost — the exposure base for property. |
| KPMG / Deloitte / EY / PwC | Global | consulting | `KPMG Regulatory Oversight` and `KPMG PACICC` are vault pages. |
| Milliman / WTW / Mercer / Eckler | Global | consulting | Benchmark and pensions research. |
| Insurance Business Canada | CA | media | A second trade paper for dating events. |
| CanLII | CA | media | Decided cases — how a coverage question actually resolved. |

### Out of scope

Exam-preparation textbook publishers (ACTEX, ActuarialBrew, Pearson, Springer, Cambridge,
Chapman & Hall, World Scientific, AMS, Thomson, Prentice Hall) publish most of
`Resources/Books/`, but Cowork is professional practice rather than exam study: a deliverable
does not cite a probability text. The CAS and SOA syllabus texts that *are* cited in practice
(Werner, Friedland, Goldburd) are already listed under their actuarial-body publishers, which
is where a reader looks for them.

---

## 4. The cheapest work available: vault pages with no Cowork row

After the P1 pass, **73** of the vault's 97 `Resources/Books/` pages have no Cowork resource
pointing at them. 22 of those are out of scope or need fixing first — 18 exam-preparation
texts from academic publishers, and 4 pages carrying no `Publisher:` front matter at all
(`Agricultural Programs`, `Davidson`, `Landmark Legal`, `Probability Distributions
Reference`; fix the front matter before listing them, not after).

That leaves **51** pages that are a `wikiRef` entry and nothing else — no body to write, no
date to transcribe, nothing to invent. This is the highest-yield item in this file, and most
of it is **documents for entities the catalogue already has**:

| Entity | Unlisted pages | |
|---|---:|---|
| CIA | 16 | `CIA Bias`, `CIA Duration`, `CIA FCT 1`, `CIA FCT 2`, `CIA IFRS 1`, `CIA IFRS 2`, `CIA IFRS 17 - Comparison`, `CIA Materiality`, `CIA Models`, `CIA PAA`, `CIA Reinsurance Treatment`, `CIA Reliance`, `CIA Runoff`, `CIA Subsequent Events`, `CIA Territories`, `CIA Valuation` |
| CAS | 9 | `CAS Financial Reporting`, `Dutil`, `Feldblum`, `Freihaut and Vendetti`, `Generalized Linear Models (Larsen - 2015)`, `Generalized Linear Models for Insurance Rating (Goldburd et al. - 2020)`, `Government Insurers Study Note`, `Life Contingencies (Struppeck - 2014)`, `Poisson Processes and Mixture Distributions (Daniel - 2008)` |
| OSFI | 9 | `OSFI AA`, `OSFI Concentration`, `OSFI Core Return`, `OSFI Corporate Governance`, `OSFI Earthquake`, `OSFI Memorandum`, `OSFI Minimum Capital`, `OSFI Quarterly Return`, `OSFI Target Capital` |
| IBC | 1 | `IBC IFRS 17 Metrics Discussion` |
| PACICC | 1 | `KPMG PACICC` |
| Canadian Underwriter | 1 | `Harris` |

The remaining 14 need a new entity first, which is what the P2/P3 rows above are for:

| New entity | Pages |
|---|---|
| Financial Services Commission of Ontario | `FSCO Coverages`, `FSCO Private Auto`, `FSCO Tech Notes` |
| Government of Alberta | `Alberta Auto Reform`, `CFAI` |
| International Actuarial Association | `IAA Climate` |
| KPMG | `KPMG Regulatory Oversight` |
| Institute and Faculty of Actuaries | `IFOA` |
| Ministry of Finance (Ontario) | `Marshall` |
| King's Printer for Ontario | `Ontario Reg. 664` |
| U.S. Government Accountability Office | `GAO` |
| Carswell | `Baer and Rendall` |
| LexisNexis Canada | `Morneau Shepell` |
| Life Underwriters Association of Canada | `McDonald` |

Two cautions before working the list. A page's Cowork `wikiRef` `name` is its **filename**,
not its authored `Title:` — `CIA PAA` is the ref, "Application of IFRS 17 … premium allocation
approach" is the title. And several CAS entries are syllabus texts rather than practice
documents; list the ones an actual deliverable cites (Goldburd, `CAS Financial Reporting`,
`Government Insurers Study Note`) and leave the exam texts.

Counts here are current as of this file's revision. Recompute rather than trusting them:

```bash
python3 - <<'EOF'
import re, os, collections
src = open('quiz/src/data/coworkSources.ts').read()
used = {n for b in re.findall(r"wikiRef: \{.*?\}", src, re.S)
          for n in re.findall(r"name: '([^']+)'", b)}
by = collections.defaultdict(list)
for f in sorted(os.listdir('Resources/Books')):
    name = f[:-3]
    if name in used: continue
    pub = next((l.split(':',1)[1].strip().strip('"')
                for l in open(f'Resources/Books/{f}') if l.startswith('Publisher:')), '')
    by[pub].append(name)
for pub in sorted(by, key=lambda p: -len(by[p])):
    print(f'{len(by[pub]):3d}  {pub or "(no Publisher: front matter)"}')
EOF
```

---

## 5. Maintaining this file

When a row moves into the catalogue:

1. Follow `.claude/skills/cowork-sources/SKILL.md` — it is the procedure, and its checklist is
   what the tests check.
2. Strike the row through here (`~~Publisher~~`) and leave it in place, with its cost column
   updated to what it actually cost. A struck row is the record of a decision; deleting it
   loses why that publisher was picked over the one below it.
3. If the row turned out to be **vault first**, say so rather than downgrading it to a sample.
   A blocked row is information; a sample with a date is a defect.

When a row is added to the backlog, give it the same four things every row here has: the
jurisdiction, the category it would take, one sentence on *what assumption it supplies*, and
its cost. A candidate that cannot be described by the assumption it supplies does not belong
in a corpus whose whole purpose is naming what supports a number.
