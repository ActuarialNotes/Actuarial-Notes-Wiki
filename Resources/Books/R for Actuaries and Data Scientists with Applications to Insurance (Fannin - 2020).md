---
Title: "R for Actuaries and Data Scientists with Applications to Insurance"
Author: Brian A. Fannin
Year: "2020"
date: "2020"
Publisher: ACTEX Learning
ISBN: 978-1647563165
Find at your local library at: "[actexlearning.com](https://www.actexlearning.com/exams/srm/r-for-actuaries-and-data-scientists)"
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:f142229966baadb5329927fbde169dcc0ac26cb7f140d70b1f1fbc26e9f3e596
  sources: []
  open_findings: 0
  open_critical: 0
  log: .verify/Resources/Books/R for Actuaries and Data Scientists with Applications to Insurance (Fannin - 2020).md
---
![[R for Actuaries and Data Scientists with Applications to Insurance (Fannin - 2020) - Cover.svg]]

An introduction to R written for actuaries, running from the language itself through data wrangling to GLMs, credibility and tree-based models, all on insurance data. It is a Domain B reading for [[Exam PCPA (CAS)|PCPA]]. The content outline assigns Chapter 6 (Basic Visualization), Chapter 15 (GLMs), Chapter 18 (Data pre-processing) and Chapter 19 (Model Selection).

## Introduction

## I Foundations

- 1 Getting Started
  - 1.1 What the heck is R?
  - 1.2 Install R
  - 1.3 Exploring R
  - 1.4 RStudio
  - 1.5 RStudio projects
  - 1.6 Packages
  - 1.7 Dealing with IT
- 2 Probability functions
  - 2.1 Exploring the exponential distribution
  - 2.2 Writing your first function
  - 2.3 More probability functions
  - 2.4 A more complicated simulation
- 3 Data types
  - 3.1 Primitive data types
  - 3.2 Data conversion
  - 3.3 NA, NaN, NULL
  - 3.4 Metadata
  - 3.5 Classes
  - 3.6 Dates and times
  - 3.7 Factors
- 4 Elements of the Language
  - 4.1 Objects
  - 4.2 Operators
  - 4.3 Flow control
  - 4.4 Functions
  - 4.5 Comments
  - 4.6 Coding style
  - 4.7 Working with the file system
  - 4.8 Potpourri

## II Homogenous Data

- 5 Vectors
  - 5.1 Properties
  - 5.2 Construction
  - 5.3 Access
  - 5.4 Multidimensional vectors
  - 5.5 Factors again
- 6 Basic Visualization — *assigned for PCPA* (see [[Data Visualization]])
  - 6.1 Basics
  - 6.2 Points
  - 6.3 par()
  - 6.4 Lines
  - 6.5 Polygons
  - 6.6 Special purpose plots
  - 6.7 Visualizing Probability Functions
  - 6.8 Design elements
- 7 Fitting Loss Distributions
  - 7.1 Method of moments and visual assessment of fit
  - 7.2 The $\chi^2$ test
  - 7.3 Testing the empirical distribution
  - 7.4 Maximum likelihood
  - 7.5 Visualizing the likelihood function
  - 7.6 optimize()
  - 7.7 optim()

## III Heterogeneous Data

- 8 Lists
  - 8.1 List properties
  - 8.2 Access and assignment
  - 8.3 Recursive storage
  - 8.4 Summary functions in base R
  - 8.5 List functions in the tidyverse
  - 8.6 Structural choices
- 9 Data Frames
  - 9.1 What is a data frame?
  - 9.2 Access and Assignment
  - 9.3 Combining data frames
  - 9.4 What is a tibble?
  - 9.5 A couple more tricks
- 10 Data Wrangling
  - 10.1 From SQL to R
  - 10.2 Columnar filtering and mutation
  - 10.3 Row subsetting
  - 10.4 Summarization
  - 10.5 Combining data frames
  - 10.6 Extending dplyr
  - 10.7 tidyr
  - 10.8 A final example
- 11 ggplot2
  - 11.1 Creating a plot
  - 11.2 Data
  - 11.3 Mapping
  - 11.4 Layers
  - 11.5 Loss distributions revisited
  - 11.6 Scales
  - 11.7 Non-data elements
- 12 Data Access
  - 12.1 Spreadsheets
  - 12.2 Text files
  - 12.3 Binary compression
  - 12.4 Databases
  - 12.5 Data from the Web

## IV Models

- 13 Example data
  - 13.1 CASdatasets
  - 13.2 French motor
  - 13.3 Term Life
  - 13.4 Loss reserves
  - 13.5 Hachemeister data
- 14 Linear models
  - 14.1 Turning noise into signal
  - 14.2 Introducing lm()
  - 14.3 Prediction
  - 14.4 Multivariate Regression
  - 14.5 Estimation
  - 14.6 Diagnostics
  - 14.7 Examples
- 15 GLMs — *assigned for PCPA* (see [[Generalized Linear Model]])
  - 15.1 Beyond the normal
  - 15.2 The glm() function
  - 15.3 Diagnostics — see [[Residual Plot]], [[Deviance]]
  - 15.4 Logistic regression — see [[Logistic Regression]]
  - 15.5 Tweedie — see [[Tweedie Distribution]]
  - 15.6 Actual example
- 16 Credibility
  - 16.1 Limited fluctuation credibility
  - 16.2 Bayesian credibility
  - 16.3 Simulated claim counts
  - 16.4 Bühlmann
  - 16.5 Simulating Bühlmann
  - 16.6 Bühlmann-Straub
  - 16.7 Hachemeister and trend
- 17 Tree-based models
  - 17.1 Continuous response
  - 17.2 Categorical responses
  - 17.3 Bagging
  - 17.4 Random Forests
  - 17.5 Boosting

## V Practical considerations

- 18 Data pre-processing — *assigned for PCPA*
  - 18.1 Data QA — see [[Data Quality]]
  - 18.2 Data types
  - 18.3 Identifying missing data — see [[Missing Data]]
  - 18.4 Replacing missing data
  - 18.5 Standardization — see [[Variable Transformation]]
  - 18.6 Categorical data — see [[Categorical Predictor]]
  - 18.7 Imbalanced data
  - 18.8 Wrapping up
- 19 Model Selection — *assigned for PCPA*
  - 19.1 Data splitting — see [[Holdout Sample]], [[Cross-Validation]]
  - 19.2 Model training
  - 19.3 Continuous response metrics
  - 19.4 Categorical response metrics
  - 19.5 Variable importance — see [[Variable Selection]]
- 20 Communication and Workflow
  - 20.1 Literate programming
  - 20.2 Workflow
  - 20.3 git
  - 20.4 ASOP 41

## Glossary

## Bibliography

## Index

## Links
- [R for Actuaries and Data Scientists — sample pages with full table of contents (ACTEX, PDF)](https://www.actexmadriver.com/samples/R-for-Actuaries-&-Data-Scientists.pdf)
- [Product page (ACTEX Learning)](https://www.actexlearning.com/exams/srm/r-for-actuaries-and-data-scientists)
