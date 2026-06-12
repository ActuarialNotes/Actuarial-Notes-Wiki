---
id: reg-global-2023-ifrs17
title: "IFRS 17: International Financial Reporting Standards for Insurance Contracts"
type: regulation
status: effective
date: 2023-01-01
jurisdiction: "Global"
lob: ["Life", "Health", "P&C"]
issuing_body: "International Accounting Standards Board (IASB) / OSFI"
impact_level: high
impacted_agents: ["Finance", "Actuarial", "IT", "Business Intelligence"]
tags: ["Accounting-Standards", "Financial-Reporting", "Discount-Rates", "CSM"]
aliases: ["IFRS 17 Effective Date", "Insurance Contracts Accounting"]
---

# IFRS 17 Implementation (January 1, 2023)

## Regulation Overview
Replaced the legacy IFRS 4 accounting standard completely. It fundamentally changed how insurance liabilities are valued on corporate balance sheets, requiring premium revenue to be recognized as services are delivered rather than when cash is received.

## Key Technical Constructs
- **Contractual Service Margin (CSM):** Represents the unearned profit of a group of insurance contracts that the insurer will recognize as it provides services in the future.
- **Discount Rates:** Liability valuations must explicitly utilize current market-consistent discount curves rather than historical pricing assumptions.

## Downstream Operational Impact
- **Finance & Actuarial Alignment:** Actuarial cash flow engines had to be directly integrated with accounting ledger software to enable dynamic monthly valuation updates.
- **IT & Core Data Systems:** Required systemic upgrades to data extraction layers to compile information into granular contract groups (profitability portfolios) rather than aggregated lines of business.
