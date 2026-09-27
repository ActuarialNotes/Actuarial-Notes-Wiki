---
Title: "R for Data Science: Import, Tidy, Transform, Visualize, and Model Data"
Authors: "Hadley Wickham and Garrett Grolemund"
Publisher: "O'Reilly Media"
Year: "2017"
date: "2017"
Edition: "1st"
Type: "Textbook"
ISBN: "978-1491910399"
Available from: "[r4ds.had.co.nz](https://r4ds.had.co.nz/)"
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:1a2d93a0e791a49d62a3f8c5931cf1a288286330345a8046b74bc9299a8065d8
  sources: []
  open_findings: 0
  open_critical: 0
  log: .verify/Resources/Books/R for Data Science (Grolemund and Wickham - 2017).md
---
![[R for Data Science (Grolemund and Wickham - 2017) - Cover.svg]]

A book that teaches how to do data science with R: getting data into R, into its most useful structure, and transforming, visualising and modelling it. It offers a practicum of skills for data science and the best practices for doing each of them with R, including the grammar of graphics, literate programming and reproducible research. The authors keep this first edition, published in January 2017, free online at r4ds.had.co.nz; the site notes that a second edition was published in June 2023.

> [!info] On the syllabus
> - [[Exam PCPA (CAS)|Exam PCPA]] — objectives A1–A4; the 1st edition (2017), with no chapters named.

## Welcome

## 1 Introduction
- The book's model of a data science project: import the data into R, tidy it (each column a variable, each row an observation), transform it, then iterate between visualisation and modelling, and finally communicate the results; tidying and transforming together are called wrangling.
- Programming is a cross-cutting tool used in every part of the project.
- 1.1 What you will learn
- 1.2 How this book is organised
- 1.3 What you won’t learn
- 1.4 Prerequisites
- 1.5 Running R code
- 1.6 Getting help and learning more
- 1.7 Acknowledgements
- 1.8 Colophon

## Explore

### 2 Introduction

### 3 Data visualisation
- Teaches [[Data Visualization|data visualisation]] with ggplot2, which implements the grammar of graphics, a coherent system for describing and building graphs.
- 3.1 Introduction
- 3.2 First steps
- 3.3 Aesthetic mappings
- 3.4 Common problems
- 3.5 Facets
- 3.6 Geometric objects
- 3.7 Statistical transformations
- 3.8 Position adjustments
- 3.9 Coordinate systems
- 3.10 The layered grammar of graphics

### 4 Workflow: basics
- 4.1 Coding basics
- 4.2 What’s in a name?
- 4.3 Calling functions
- 4.4 Exercises

### 5 Data transformation
- 5.1 Introduction
- 5.2 Filter rows with filter()
- 5.3 Arrange rows with arrange()
- 5.4 Select columns with select()
- 5.5 Add new variables with mutate()
- 5.6 Grouped summaries with summarise()
- 5.7 Grouped mutates (and filters)

### 6 Workflow: scripts
- 6.1 Running code
- 6.2 RStudio diagnostics
- 6.3 Exercises

### 7 Exploratory Data Analysis
- [[Exploratory Data Analysis]] is an iterative cycle: generate questions about the data, search for answers by visualising, transforming and modelling it, and use what is learned to refine the questions.
- Data cleaning is one application of EDA, which is always needed to investigate the quality of the data.
- [[Outlier|Outliers]] are unusual observations that don't fit the pattern: sometimes data entry errors, sometimes a sign of important new science.
- Rather than dropping a whole row with an unusual value, the chapter recommends replacing the unusual value with a [[Missing Data|missing value]].
- 7.1 Introduction
- 7.2 Questions
- 7.3 Variation
- 7.4 Missing values
- 7.5 Covariation
- 7.6 Patterns and models
- 7.7 ggplot2 calls
- 7.8 Learning more

### 8 Workflow: projects
- 8.1 What is real?
- 8.2 Where does your analysis live?
- 8.3 Paths and directories
- 8.4 RStudio projects
- 8.5 Summary

## Wrangle

### 9 Introduction

### 10 Tibbles
- 10.1 Introduction
- 10.2 Creating tibbles
- 10.3 Tibbles vs. data.frame
- 10.4 Interacting with older code
- 10.5 Exercises

### 11 Data import
- 11.1 Introduction
- 11.2 Getting started
- 11.3 Parsing a vector
- 11.4 Parsing a file
- 11.5 Writing to a file
- 11.6 Other types of data

### 12 Tidy data
- Three interrelated rules make a dataset [[Tidy Data|tidy]]: each variable must have its own column, each observation its own row, and each value its own cell.
- 12.1 Introduction
- 12.2 Tidy data
- 12.3 Pivoting
- 12.4 Separating and uniting
- 12.5 Missing values
- 12.6 Case Study
- 12.7 Non-tidy data

### 13 Relational data
- 13.1 Introduction
- 13.2 nycflights13
- 13.3 Keys
- 13.4 Mutating joins
- 13.5 Filtering joins
- 13.6 Join problems
- 13.7 Set operations

### 14 Strings
- 14.1 Introduction
- 14.2 String basics
- 14.3 Matching patterns with regular expressions
- 14.4 Tools
- 14.5 Other types of pattern
- 14.6 Other uses of regular expressions
- 14.7 stringi

### 15 Factors
- In R, factors are used to work with [[Categorical Predictor|categorical variables]], variables that have a fixed and known set of possible values.
- 15.1 Introduction
- 15.2 Creating factors
- 15.3 General Social Survey
- 15.4 Modifying factor order
- 15.5 Modifying factor levels

### 16 Dates and times
- 16.1 Introduction
- 16.2 Creating date/times
- 16.3 Date-time components
- 16.4 Time spans
- 16.5 Time zones

## Program

### 17 Introduction
- 17.1 Learning more

### 18 Pipes
- 18.1 Introduction
- 18.2 Piping alternatives
- 18.3 When not to use the pipe
- 18.4 Other tools from magrittr

### 19 Functions
- 19.1 Introduction
- 19.2 When should you write a function?
- 19.3 Functions are for humans and computers
- 19.4 Conditional execution
- 19.5 Function arguments
- 19.6 Return values
- 19.7 Environment

### 20 Vectors
- 20.1 Introduction
- 20.2 Vector basics
- 20.3 Important types of atomic vector
- 20.4 Using atomic vectors
- 20.5 Recursive vectors (lists)
- 20.6 Attributes
- 20.7 Augmented vectors

### 21 Iteration
- 21.1 Introduction
- 21.2 For loops
- 21.3 For loop variations
- 21.4 For loops vs. functionals
- 21.5 The map functions
- 21.6 Dealing with failure
- 21.7 Mapping over multiple arguments
- 21.8 Walk
- 21.9 Other patterns of for loops

## Model

### 22 Introduction
- 22.1 Hypothesis generation vs. hypothesis confirmation

### 23 Model basics
- 23.1 Introduction
- 23.2 A simple model
- 23.3 Visualising models
- 23.4 Formulas and model families
- 23.5 Missing values
- 23.6 Other model families

### 24 Model building
- 24.1 Introduction
- 24.2 Why are low quality diamonds more expensive?
- 24.3 What affects the number of daily flights?
- 24.4 Learning more about models

### 25 Many models
- 25.1 Introduction
- 25.2 gapminder
- 25.3 List-columns
- 25.4 Creating list-columns
- 25.5 Simplifying list-columns
- 25.6 Making tidy data with broom

## Communicate

### 26 Introduction

### 27 R Markdown
- 27.1 Introduction
- 27.2 R Markdown basics
- 27.3 Text formatting with Markdown
- 27.4 Code chunks
- 27.5 Troubleshooting
- 27.6 YAML header
- 27.7 Learning more

### 28 Graphics for communication
- Once the data is understood, plots made for exploration are reworked to communicate that understanding to an audience that will likely not share the analyst's background knowledge.
- 28.1 Introduction
- 28.2 Label
- 28.3 Annotations
- 28.4 Scales
- 28.5 Zooming
- 28.6 Themes
- 28.7 Saving your plots
- 28.8 Learning more

### 29 R Markdown formats
- 29.1 Introduction
- 29.2 Output options
- 29.3 Documents
- 29.4 Notebooks
- 29.5 Presentations
- 29.6 Dashboards
- 29.7 Interactivity
- 29.8 Websites
- 29.9 Other formats
- 29.10 Learning more

### 30 R Markdown workflow

## Sources
- [R for Data Science, 1st edition (Hadley Wickham and Garrett Grolemund, 2017)](https://r4ds.had.co.nz/) — the authors' free online edition: the Welcome page (edition, publication date, description, authorship) and every chapter page, for the part and chapter titles and each chapter's numbered sections; the text of Chapters 1, 3, 7, 12, 15 and 28
- [R for Data Science: Import, Tidy, Transform, Visualize, and Model Data (Open Library)](https://openlibrary.org/isbn/9781491910399.json) — the print edition's catalogue record: full title, O'Reilly Media, January 2017, ISBN 978-1491910399
- [CAS PCPA Exam & Project Content Outline, v.8 (September 2026)](https://www.casact.org/sites/default/files/2024-05/Exam_PCPA_2025_F_Content_Outlines.pdf) — the citation (1st edition, 2017) and Domain A
