---
aliases:
  - Data Lake
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:a71ad41e17a3aab03606640005498fd48c04d588f6c562cbe327445b6cdbe90a
  sources: []
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Data Warehouse.md
---
A **Data Warehouse** is a store of data curated for analysis: data from several operational systems are cleaned, integrated under consistent definitions and kept with their history, in a structure that is fixed before the data are loaded (schema-on-write). It is one of three kinds of data store an analyst works with. The others are the operational **database**, which records the day-to-day transactions of the business, and the **data lake**, which holds raw data of any kind in their original form and imposes a structure only when the data are read (schema-on-read).

> $$\text{Warehouse} = L\big(T(E(\text{sources}))\big)$$

> $$\text{Lake} = L\big(E(\text{sources})\big)$$

| | Database | Data lake | Data warehouse |
| :--- | :--- | :--- | :--- |
| Purpose | Run transactions | Keep raw data for later use | Analysis and reporting |
| Data | Current, structured | Raw, of any structure | Cleaned, integrated, historical |
| Schema | On write | On read | On write |
| Insurance example | Policy administration system | Telematics trips, adjuster notes, photos | Monthly premium and losses by territory and class |

- **Symbols:** $E$, $T$ and $L$ are the extract, transform and load steps of a [[Data Pipeline|data pipeline]]. A warehouse loads its data after transforming them, while a lake loads what it extracts and leaves the transformation to whoever reads the data later.
- **Database:** An operational database, usually a [[Relational Database|relational database]], is designed for many small reads and writes, such as issuing a policy or recording a payment. It holds the current state of each record, so a change such as a new address can overwrite the old value.
- **Data warehouse:** A warehouse integrates the policy, billing and claims systems under one set of definitions, with one meaning of earned premium and one territory map, and it keeps history so that any past month can be reproduced as it stood. Its tables are often arranged as a star schema, a central fact table of measures such as premium and losses linked to dimension tables such as time, territory and class, and a data mart is a subset built for one department.
- **Data lake:** A lake stores data in their native formats at low cost, including [[Unstructured Data|unstructured data]] that do not fit a warehouse table. It is flexible, but without documentation of what each file holds it becomes hard to use, and each analyst has to clean the same raw data again.

> [!example]- Where Should Each Request Go? {Example}
> An insurer has three requests. A customer service representative needs to update a policyholder's address. An actuary needs five years of earned premium and incurred losses by territory and month, reconciled to the financial statements, for a rate review. A data scientist wants raw telematics trip records and adjusters' notes to look for new predictors. Which store should serve each request?
>
> > [!answer]-
> > 1. **Address change:** The operational database serves it, because it is a transaction on a current record. The warehouse picks up the change at its next load.
> > 2. **Rate review:** The warehouse serves it, because it already holds integrated, historical figures under one set of definitions, reconciled to the financial statements. Pulling the data from the operational systems instead would mean redoing that integration and could lose history.
> > 3. **New predictors:** The lake serves it, because the warehouse holds only structured fields that have already been defined. The data scientist reads the raw trip files and notes and decides their structure on reading, and a feature that proves useful can then be added to the warehouse's regular loads.

> [!example]- History Lost in an Operational Database {Example}
> A policyholder lived in territory 1 from 2021 to 2023, had two claims there, and moved to territory 3 in 2024. The policy system overwrote the address. An analyst builds 2021–2025 territory experience from the policy system. What goes wrong, and how does a warehouse prevent it?
>
> > [!answer]-
> > The policy system now shows territory 3 for the whole history, so the 2021–2023 exposure and both claims are credited to territory 3, where the risk was never located. Territory 3's experience is overstated and territory 1's understated, and many such moves bias the territory relativities. A warehouse keeps a row for each policy period, or keeps the address history, so each claim and each car-year is matched to the territory in force on its own date. A warehouse can say what was true at the time, not only what is true now.

> [!tip]- How it appears on the exam
> - **ATPA** asks candidates, as part of understanding the structure of a data pipeline, to explain the difference between a database, a data lake and a data warehouse, and to describe how different data structures can be used in different analytical tasks. A task can describe a data request and ask which store should serve it and why.

> [!warning]- Exam traps
> - **A lake is not a messy warehouse:** A data lake is a different design that defers structure until the data are read. Saying that it holds only unstructured data is also wrong, because it holds structured tables as well.
> - **Schema-on-read still needs a schema:** Reading lake data still requires deciding each field's meaning and type, and that work falls on the analyst. Two analysts can read the same raw file differently and arrive at different numbers.
> - **Current is not historical:** An extract from an operational database shows each record as it is today. Using it for past experience assigns old claims and exposure to today's attributes, as the second example shows.
