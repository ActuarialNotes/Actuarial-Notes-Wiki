---
Title: "Metamodeling for Variable Annuities"
Authors: "Guojun Gan and Emiliano A. Valdez"
Publisher: "Chapman and Hall/CRC"
Year: "2019"
date: "2019"
Edition: "1st"
Type: "Textbook"
ISBN: "978-0-8153-4858-0"
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:beef2f845b01711aa1c888556fe256c1264996b57ffd65d9c018949182678171
  sources: []
  open_findings: 0
  open_critical: 0
  log: .verify/Resources/Books/Metamodeling for Variable Annuities (Valdez).md
---
![[Metamodeling for Variable Annuities (Valdez) - Cover.svg]]

A monograph on the metamodeling approaches that speed up the valuation of large portfolios of variable annuities, which carry financial guarantees whose fair market values are usually calculated by time-consuming Monte Carlo simulation. It describes the computational problems, reviews existing approaches and presents experimental design methods and metamodels in detail, each implemented in R on a synthetic dataset. It is written primarily for undergraduate students of actuarial science, statistics, risk management and financial mathematics, and is equally useful for practitioners.

> [!info] On the syllabus
> - [[Exam CP-312 (SOA)|Exam CP-312]] — Chapters 1-3 and 6, for outcomes 1d (Topic 1) and 2c (Topic 2).

## Preface
- The monograph is devoted to metamodeling approaches, proposed in the academic literature to address the computational problems of valuing large variable annuity portfolios, where Monte Carlo simulation of every contract over many scenarios is time-consuming.
- A typical metamodeling approach selects a small number of representative contracts (experimental design), values them by Monte Carlo simulation, builds a metamodel (a predictive model) on those values, and uses the metamodel to estimate the fair market value of every contract in the portfolio.
- The book has three parts: Chapters 1 to 3 introduce the computational problems, existing approaches and the metamodeling approach; Chapters 4 to 6 introduce experimental design methods; Chapters 7 to 12 introduce six metamodels. The methods are implemented in R on a synthetic dataset.

## Part I Preliminaries

### 1 Computational Problems in Variable Annuities
- 1.1 Variable Annuities
- 1.2 Computational Problems Related to Daily Hedging
- 1.3 Computational Problems Related to Financial Reporting
- 1.4 Summary

### 2 Existing Approaches
- 2.1 Scenario Reduction
    - 2.1.1 Scenario Ranking
    - 2.1.2 Representative Scenarios
    - 2.1.3 Importance Sampling
    - 2.1.4 Curve Fitting
    - 2.1.5 Random Sampling
- 2.2 Inforce Compression
    - 2.2.1 Cluster Modeling
    - 2.2.2 Replicating Liabilities
    - 2.2.3 Replicated Stratified Sampling
- 2.3 Summary

### 3 Metamodeling Approaches
- 3.1 A General Framework
- 3.2 Literature Review
- 3.3 Summary

## Part II Experimental Design Methods

### 4 Latin Hypercube Sampling
- 4.1 Description of the Method
- 4.2 Implementation
- 4.3 Examples
- 4.4 Summary

### 5 Conditional Latin Hypercube Sampling
- 5.1 Description of the Method
- 5.2 Implementation
- 5.3 Examples
- 5.4 Summary

### 6 Hierarchical k-Means
- 6.1 Description of the Method
- 6.2 Implementation
- 6.3 Examples
- 6.4 Summary

## Part III Metamodels

### 7 Ordinary Kriging
- 7.1 Description of the Model
- 7.2 Implementation
- 7.3 Applications
    - 7.3.1 Ordinary Kriging with Latin Hypercube Sampling
    - 7.3.2 Ordinary Kriging with Conditional Latin Hypercube Sampling
    - 7.3.3 Ordinary Kriging with Hierarchical k-Means
- 7.4 Summary

### 8 Universal Kriging
- 8.1 Description of the Model
- 8.2 Implementation
- 8.3 Applications
    - 8.3.1 Universal Kriging with Latin Hypercube Sampling
    - 8.3.2 Universal Kriging with Conditional Latin Hypercube Sampling
    - 8.3.3 Universal Kriging with Hierarchical k-Means
- 8.4 Summary

### 9 GB2 Regression Model
- 9.1 Description of the Model
- 9.2 Implementation
- 9.3 Applications
    - 9.3.1 GB2 with Latin Hypercube Sampling
    - 9.3.2 GB2 with Conditional Latin Hypercube Sampling
    - 9.3.3 GB2 with Hierarchical k-Means
- 9.4 Summary

### 10 Rank Order Kriging
- 10.1 Description of the Model
- 10.2 Implementation
- 10.3 Applications
    - 10.3.1 Rank Order Kriging with Latin Hypercube Sampling .
    - 10.3.2 Rank Order Kriging with Conditional Latin Hypercube Sampling
    - 10.3.3 Rank Order Kriging with Hierarchical k-Means
- 10.4 Summary

### 11 Linear Model with Interactions
- 11.1 Description of the Model
- 11.2 Implementation
- 11.3 Applications
    - 11.3.1 Linear Model with Latin Hypercube Sampling
    - 11.3.2 Linear Model with Conditional Latin Hypercube Sampling
    - 11.3.3 Linear Model with Hierarchical k-Means
- 11.4 Summary

### 12 Tree-Based Models
- 12.1 Description of the Model
- 12.2 Implementation
- 12.3 Applications
    - 12.3.1 Regression Trees with Latin Hypercube Sampling
    - 12.3.2 Regression Trees with Conditional Latin Hypercube Sampling
    - 12.3.3 Regression Trees with Hierarchical k-Means
- 12.4 Summary

## Appendix A Synthetic Datasets
- A.1 The Synthetic Inforce
- A.2 The Greeks

## Bibliography

## Index

## Sources
- [Metamodeling for Variable Annuities: Contents and Preface (Gan and Valdez, University of Connecticut copy of the book's front matter)](https://www2.math.uconn.edu/~gan/ggpaper/gan2019toc.pdf) — the book's printed contents (parts, chapters, sections, appendix, bibliography and index) and its preface, for the lead
- [Metamodeling for Variable Annuities (Routledge/Chapman & Hall)](https://www.routledge.com/Metamodeling-for-Variable-Annuities/Gan-Valdez/p/book/9780367779559) — the publisher's listing: 208 pages, Chapman & Hall; its web table of contents lists Part 2 chapters under different titles ("Hierarchical Clustering", "Partitional Clustering") than the printed contents used here
- [Crossref record, doi 10.1201/9781351166607](https://api.crossref.org/works/10.1201/9781351166607) — Chapman and Hall/CRC, first edition, published 5 July 2019
- [Metamodeling for Variable Annuities (Amazon.co.uk listing)](https://www.amazon.co.uk/Metamodeling-Variable-Annuities-Financial-Mathematics/dp/0815348584) — the hardback's ISBN-13, 978-0-8153-4858-0 (read from the search listing; the page itself was not opened)
- [CP 312 Syllabus, Nov 2026/Mar 2027 (SOA)](https://www.soa.org/globalassets/assets/files/edu/2026/cp-312/2026-2027-cp-312-syllabus.pdf) — the citation, the chapters assigned and the learning outcomes
