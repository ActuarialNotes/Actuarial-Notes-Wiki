---
Title: "Use of Models"
Author: "Canadian Institute of Actuaries"
Year: "2017"
date: "2017"
Publisher: "Canadian Institute of Actuaries"
Type: "Educational Note"
Available from: "[casact.org](https://www.casact.org/sites/default/files/2021-03/6C_CIA_Models.pdf)"
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:334688c460f661a83711a6a3a41e57e56d6f846c6ac6a79ca77e1da68239adfe
  sources: []
  open_findings: 0
  open_critical: 0
  log: .verify/Resources/Books/CIA Models.md
---
![[CIA Models - Cover.svg]]

The CIA's January 2017 educational note on the **use of models** and on **[[Model Risk|model risk]]**. Read for [[Exam 6C (CAS)|Exam 6C]] objective C5.

## Contents

| Section | Subject |
|---|---|
| **1** | **Background** — 1.1 reference to the exposure draft · 1.2 examples of models · 1.3 use or development · 1.4 **model risk and risk-rating a model** |
| **2** | **Choice of model** — 2.1 a new or substantially changed model · 2.2 an existing model used in a new way · 2.3 models approved for use by others · 2.4 models outside an actuary's area of expertise · 2.5 sensitivity testing · 2.6 preparing to use the model |
| **3** | **Minor changes to a model** |
| **4** | **Use of models** — 4.1 validation of data input · 4.2 validation of assumptions · 4.3 validation of results · 4.4 documentation · 4.5 periodic validation · 4.6 stochastic models |
| **5** | **Reporting** — 5.1 when modelling is incidental to the engagement · 5.2 when the engagement involves modelling · 5.3 limitations |
| **6** | **Hypothetical examples** — life valuation using AXIS; pension valuation using third-party software; **P&C valuation using the chain ladder method**; lost wages in a personal injury suit; forecasting capital requirements using a spreadsheet model; a new economic scenario generator in an internal capital model |
| App. | 1 risk-rating schemes · 2 bibliography |

## The organising idea

**Risk-rate the model, then scale the work to the rating.** §1.4 asks how much could go wrong: how material the output is, how complex the model, how novel its use, how well understood its limitations, and how much reliance is placed on it. A spreadsheet chain ladder used for a small line and a stochastic capital model driving the [[Internal Target Capital Ratio|internal target]] do not warrant the same validation.

The other recurring distinction is **use versus development**. An actuary who did not build the model still owns its output; §2.3 and §2.4 cover models approved by others and models outside the actuary's expertise, where the obligation becomes understanding the model's behaviour and limitations rather than its internals (see [[CIA Reliance]]).

## Validation

§4 is the operational core: validate the **data input**, the **assumptions**, and the **results** — and validate **periodically**, not once. Results validation includes back-testing, reasonableness against an independent estimate, and sensitivity testing (§2.5). §4.6 adds the specific hazards of stochastic models: too few scenarios, an unvalidated scenario generator, and treating simulation output as more precise than the assumptions behind it.

§5.3 requires the actuary to **report limitations** — a model's output presented without its limitations is the failure mode the note exists to prevent.

## Related readings
- [[CIA Reliance]] — relying on a model built by someone else
- [[FSRA Risk Management]] — the regulator's model-risk expectations for rating and underwriting models
- [[CIA IFRS 2]] — where a stochastic model produces the risk adjustment

## Links
- [Use of Models Educational Note (CAS)](https://www.casact.org/sites/default/files/2021-03/6C_CIA_Models.pdf)
