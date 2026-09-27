---
Title: "Python for Data Analysis: Data Wrangling with Pandas, NumPy, and Jupyter"
Authors: "Wes McKinney"
Publisher: "O'Reilly Media"
Year: "2022"
date: "2022"
Edition: "3rd"
Type: "Textbook"
ISBN: "978-1098104030"
Available from: "[wesmckinney.com](https://wesmckinney.com/book/)"
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:a24edb27e72ac3331376281c451daaa38c74c1d2ecd8b49cb31c12c27e7e89b2
  sources: []
  open_findings: 0
  open_critical: 0
  log: .verify/Resources/Books/Python for Data Analysis (McKinney - 2022).md
---
![[Python for Data Analysis (McKinney - 2022) - Cover.svg]]

A guide to the nuts and bolts of manipulating, processing, cleaning and crunching data in Python. It covers the parts of the Python language and its data-oriented library ecosystem and tools that equip a reader to become an effective data analyst, with the focus on Python programming, libraries and tools rather than on data analysis methodology. The third edition, updated for pandas 2.0.0 and Python 3.10, was first published in August 2022 and is also available free as an open-access HTML edition on the author's site.

> [!info] On the syllabus
> - [[Exam PCPA (CAS)|Exam PCPA]] — objectives A1–A4; the 3rd edition (2022), with no chapters named.

## Preface
- Conventions Used in This Book
- Using Code Examples
- O'Reilly Online Learning
- How to Contact Us
- Acknowledgments
- In Memoriam: John D. Hunter (1968–2012)
- Acknowledgments for the Third Edition (2022)
- Acknowledgments for the Second Edition (2017)
- Acknowledgments for the First Edition (2012)

## 1 Preliminaries
- The book is concerned with the nuts and bolts of manipulating, processing, cleaning and crunching data in Python; its focus is Python programming, libraries and tools as opposed to data analysis methodology.
- Its primary focus is structured data, such as tabular or spreadsheet-like data, multidimensional arrays, and multiple tables of data interrelated by key columns.
- 1.1 What Is This Book About?
- 1.2 Why Python for Data Analysis?
- 1.3 Essential Python Libraries
- 1.4 Installation and Setup
- 1.5 Community and Conferences
- 1.6 Navigating This Book

## 2 Python Language Basics, IPython, and Jupyter Notebooks
- 2.1 The Python Interpreter
- 2.2 IPython Basics
- 2.3 Python Language Basics
- 2.4 Conclusion

## 3 Built-In Data Structures, Functions, and Files
- 3.1 Data Structures and Sequences
- 3.2 Functions
- 3.3 Files and the Operating System
- 3.4 Conclusion

## 4 NumPy Basics: Arrays and Vectorized Computation
- 4.1 The NumPy ndarray: A Multidimensional Array Object
- 4.2 Pseudorandom Number Generation
- 4.3 Universal Functions: Fast Element-Wise Array Functions
- 4.4 Array-Oriented Programming with Arrays
- 4.5 File Input and Output with Arrays
- 4.6 Linear Algebra
- 4.7 Example: Random Walks
- 4.8 Conclusion

## 5 Getting Started with pandas
- 5.1 Introduction to pandas Data Structures
- 5.2 Essential Functionality
- 5.3 Summarizing and Computing Descriptive Statistics
- 5.4 Conclusion

## 6 Data Loading, Storage, and File Formats
- 6.1 Reading and Writing Data in Text Format
- 6.2 Binary Data Formats
- 6.3 Interacting with Web APIs
- 6.4 Interacting with Databases
- 6.5 Conclusion

## 7 Data Cleaning and Preparation
- Data preparation (loading, cleaning, transforming and rearranging) is often reported to take up 80% or more of an analyst's time; pandas and the built-in Python language features provide the tools to manipulate data into the right form.
- 7.1 Handling Missing Data
    - pandas represents [[Missing Data|missing data]] as NA (NaN for floating-point data, and Python's None too), and its descriptive statistics exclude it by default.
    - Analysing the missing data itself can identify data collection problems or potential biases caused by the missing data; `dropna` filters missing data out and `fillna` fills it in.
- 7.2 Data Transformation
    - Covers removing duplicates, mapping and replacing values, discretization and binning with `pandas.cut`, detecting and filtering (or capping) [[Outlier|outliers]] with array operations, random sampling, and converting a categorical variable with k distinct values into a k-column indicator (dummy) matrix with `pandas.get_dummies`.
- 7.3 Extension Data Types
- 7.4 String Manipulation
- 7.5 Categorical Data
- 7.6 Conclusion

## 8 Data Wrangling: Join, Combine, and Reshape
- Tools to combine, join and rearrange data that is spread across files or databases or arranged in a form not convenient to analyze, starting from hierarchical indexing in pandas.
- 8.1 Hierarchical Indexing
- 8.2 Combining and Merging Datasets
- 8.3 Reshaping and Pivoting
- 8.4 Conclusion

## 9 Plotting and Visualization
- Making informative [[Data Visualization|visualizations]] is one of the most important tasks in data analysis, whether as part of exploration (to help identify outliers or needed data transformations, or to generate ideas for models) or as the end goal; the chapter focuses on matplotlib and libraries built on it.
- 9.1 A Brief matplotlib API Primer
- 9.2 Plotting with pandas and seaborn
- 9.3 Other Python Visualization Tools
- 9.4 Conclusion

## 10 Data Aggregation and Group Operations
- 10.1 How to Think About Group Operations
- 10.2 Data Aggregation
- 10.3 Apply: General split-apply-combine
- 10.4 Group Transforms and "Unwrapped" GroupBys
- 10.5 Pivot Tables and Cross-Tabulation
- 10.6 Conclusion

## 11 Time Series
- 11.1 Date and Time Data Types and Tools
- 11.2 Time Series Basics
- 11.3 Date Ranges, Frequencies, and Shifting
- 11.4 Time Zone Handling
- 11.5 Periods and Period Arithmetic
- 11.6 Resampling and Frequency Conversion
- 11.7 Moving Window Functions
- 11.8 Conclusion

## 12 Introduction to Modeling Libraries in Python
- 12.1 Interfacing Between pandas and Model Code
- 12.2 Creating Model Descriptions with Patsy
- 12.3 Introduction to statsmodels
- 12.4 Introduction to scikit-learn
- 12.5 Conclusion

## 13 Data Analysis Examples
- 13.1 Bitly Data from 1.USA.gov
- 13.2 MovieLens 1M Dataset
- 13.3 US Baby Names 1880–2010
- 13.4 USDA Food Database
- 13.5 2012 Federal Election Commission Database
- 13.6 Conclusion

## Appendix A Advanced NumPy
- A.1 ndarray Object Internals
- A.2 Advanced Array Manipulation
- A.3 Broadcasting
- A.4 Advanced ufunc Usage
- A.5 Structured and Record Arrays
- A.6 More About Sorting
- A.7 Writing Fast NumPy Functions with Numba
- A.8 Advanced Array Input and Output
- A.9 Performance Tips

## Appendix B More on the IPython System
- B.1 Terminal Keyboard Shortcuts
- B.2 About Magic Commands
- B.3 Using the Command History
- B.4 Interacting with the Operating System
- B.5 Software Development Tools
- B.6 Tips for Productive Code Development Using IPython
- B.7 Advanced IPython Features
- B.8 Conclusion

## Sources
- [Python for Data Analysis, 3rd edition, Open Access edition (Wes McKinney, 2022)](https://wesmckinney.com/book/) — the author's open edition: About the Open Edition (first publication August 2022, the pandas 2.0.0 and Python 3.10 update) and every chapter and appendix page, for the titles and numbered sections; the text of 1.1 and of the openings of Chapters 7, 8 and 9 and Sections 7.1 and 7.2
- [Python for Data Analysis: Data Wrangling with Pandas, NumPy, and Jupyter (Open Library)](https://openlibrary.org/isbn/9781098104030.json) — the print edition's catalogue record: full title, O'Reilly Media, October 2022, ISBN 978-1098104030
- [CAS PCPA Exam & Project Content Outline, v.8 (September 2026)](https://www.casact.org/sites/default/files/2024-05/Exam_PCPA_2025_F_Content_Outlines.pdf) — the citation (3rd edition, O'Reilly Media, 2022) and Domain A
