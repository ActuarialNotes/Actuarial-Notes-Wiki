---
aliases:
  - Data Lake
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:975b688474d7b1078bd7d8efd1acf55f92af4ecb124d5492c717019c8ca770a4
  sources: []
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Data Warehouse.md
---
A **Data Warehouse** is a store of data curated for analysis, in which data from several operational systems are cleaned, integrated under consistent definitions and kept with their history. Its structure is fixed before the data are loaded, which is called schema-on-write.

It is one of three kinds of data store an analyst works with:

| | Database | Data lake | Data warehouse |
| :--- | :--- | :--- | :--- |
| Purpose | Run transactions | Keep raw data for later use | Analysis and reporting |
| Data | Current, structured | Raw, of any structure | Cleaned, integrated, historical |
| Schema | On write | On read | On write |
| Insurance example | Policy administration system | Telematics trips, adjuster notes, photos | Monthly premium and losses by territory and class |

A warehouse loads its data after transforming them, in the order extract, transform, load of a [[Data Pipeline|data pipeline]]. It integrates the policy, billing and claims systems under one set of definitions, with one meaning of earned premium and one territory map, and it keeps history so that any past month can be reproduced as it stood. Its tables are often arranged as a star schema, a central fact table of measures such as premium and losses linked to dimension tables such as time, territory and class. A data mart is a subset of the warehouse built for one department.

> [!example]- Which store should serve each of these three requests? {Example}
> A customer service representative needs to update a policyholder's address. An actuary needs five years of earned premium and incurred losses by territory and month, reconciled to the financial statements, for a rate review. A data scientist wants raw telematics trip records and adjusters' notes to look for new predictors.
>
> > [!answer]-
> > - The operational database serves the address change, because it is a transaction on a current record. The warehouse picks up the change at its next load.
> > - The warehouse serves the rate review, because it already holds integrated, historical figures under one set of definitions, reconciled to the financial statements. Pulling the data from the operational systems instead would mean redoing that integration and could lose history.
> > - The lake serves the search for new predictors, because the warehouse holds only structured fields that have already been defined. The data scientist reads the raw files and notes and decides their structure on reading.
> > - A feature that proves useful can then be added to the warehouse's regular loads.

## Operational database

An operational database, usually a [[Relational Database|relational database]], records the day-to-day transactions of the business. It is designed for many small reads and writes, such as issuing a policy or recording a payment. It holds the current state of each record, so a change such as a new address can overwrite the old value. An extract from it shows each record as it is today.

> [!example]- What goes wrong when this territory experience is built from the policy system, and how does a warehouse prevent it? {Example}
> A policyholder lived in territory 1 from 2021 to 2023, had two claims there, and moved to territory 3 in 2024. The policy system overwrote the address. An analyst builds 2021–2025 territory experience from the policy system.
>
> > [!answer]-
> > - The policy system now shows territory 3 for the whole history, so the 2021–2023 exposure and both claims are credited to territory 3, where the risk was never located.
> > - Territory 3's experience is overstated and territory 1's understated, and many such moves bias the territory relativities.
> > - A warehouse keeps a row for each policy period, or keeps the address history, so each claim and each car-year is matched to the territory in force on its own date.

## Data lake

A data lake holds raw data of any kind in their native formats at low cost, including [[Unstructured Data|unstructured data]] that do not fit a warehouse table. It imposes a structure only when the data are read, which is called schema-on-read. A lake loads what it extracts and leaves the transformation to whoever reads the data later, so its order is ELT.

A lake is flexible, but without documentation of what each file holds it becomes hard to use, and each analyst has to clean the same raw data again. Reading lake data still requires deciding each field's meaning and type, and that work falls on the analyst. Two analysts can read the same raw file differently and arrive at different numbers.

> [!trap] Treating a data lake as an unorganized warehouse
> A data lake is a different design that defers structure until the data are read. Saying that it holds only unstructured data is also wrong, because it holds structured tables as well.
