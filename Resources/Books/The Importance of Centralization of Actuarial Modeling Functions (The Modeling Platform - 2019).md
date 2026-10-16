---
Title: "The Importance of Centralization of Actuarial Modeling Functions, Part 1: Focus on Modularization and Reuse"
Authors: "Bryon Robidoux"
Publisher: "Society of Actuaries"
Year: "2019"
date: "2019"
Type: "Paper"
Available from: "[soa.org](https://www.soa.org/globalassets/assets/library/newsletters/the-modeling-platform/2019/november/mp-2019-is10-robidoux.pdf)"
---
![[The Importance of Centralization of Actuarial Modeling Functions (The Modeling Platform - 2019) - Cover.svg]]

An article from The Modeling Platform, Issue 10 (November 2019), written in response to the April 2019 issue's discussions of the pros and cons of centralizing and decentralizing modeling departments. It looks at these activities from a software engineering perspective, gives insight into why large corporations would find it critical to centralize their modeling departments, and explains how to get the most out of centralization. It is the first of a series.

> [!info] On the syllabus
> - [[Exam CP-312 (SOA)|Exam CP-312]] — Outcomes 3a, 3b.

## Introduction
- Uses a fictitious insurance corporation, ZZZ, that adds indexed universal life and variable universal life products to its fixed indexed annuity, variable annuity and universal life lines.
- Three options are open to ZZZ when modeling the new products: start from scratch, copy existing code, or build reusable libraries that can be shared.

## Option 1: Starting from Scratch
- A very expensive and risky endeavor, since the new model is likely to acquire the same blemishes as the other models in the organization, and projects are subject to a bias toward underestimating the time and effort needed.

## Option 2: Copying Existing Code
- Copying either follows the original with periodic synchronization or copies and modifies it; copying and decentralization are one and the same activity.
- Copying appears cheap because of the divide-and-conquer fallacy, but each copy takes on a life of its own and must be developed, tested, run, audited, controlled and managed separately, and the copies diverge.

## Decentralization: An Expensive Choice
- With starting from scratch or copying, multiple groups maintain the same functionality and solve similar problems, increasing work, headcount or both.

## Applying Software Engineering Concepts
- Roles in the modeling department map to roles in a software development department: actuarial modeler to developer, model steward to application technology lead, model governance to development operations, stakeholder sign-off to user acceptance testing, and setting up runs and their switches to configuration management.
- Good software engineering focuses on modularization, tests each unit before it is merged into the main production branch, keeps units as simple reusable components, and divides each component into abstractions that semantically map to the problem at hand.

## Option 3: Building Reusable Libraries
- The group deemed the subject matter expert builds a library for common calculations and shares it with the rest of the corporation, so the company is organized by common services rather than product lines.
- The monolithic-system problem: modeling platforms encourage actuaries to put all their work products directly into the model, where they are locked away from other projects, forcing modelers to copy logic and making unit testing difficult.

## Conclusion
- The expense of decentralized models stems from three problems: the perceived difference between actuarial modeling and software engineering, the divide-and-conquer fallacy and the monolithic-system issue.
- Centralization is a good start, but modeling departments need to go further and focus on modularization so that logic and work products are reused as much as possible.

## Sources
- [The Importance of Centralization of Actuarial Modeling Functions, Part 1: Focus on Modularization and Reuse (The Modeling Platform, Issue 10, November 2019, pp. 8-11)](https://www.soa.org/globalassets/assets/library/newsletters/the-modeling-platform/2019/november/mp-2019-is10-robidoux.pdf) — the document: title, author, section headings and the points under them (read in full text)
- [SOA CP-312 syllabus, Nov 2026/Mar 2027](https://www.soa.org/globalassets/assets/files/edu/2026/cp-312/2026-2027-cp-312-syllabus.pdf) — the citation and the assigned outcomes (3a, 3b)
