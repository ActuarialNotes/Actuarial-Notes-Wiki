[[Actuarial Notes Wiki|Wiki]] / [[Actuarial Math]] / ==Credibility Theory==

> ==Credibility Theory== is used to determine the appropriate weight to give to different sources of data.

Credibility methods are used when calculating premiums, reserves, and risk. In insurance, actuaries need to balance historical data from a specific policyholder (or group) with broader industry or external data to improve the accuracy of predictions.

## Models

There are two main models of credibility, [[Classical Credibility]] and [[Bayesian Credibility]]. Both methods assign a credibility factor "Z" to a set of data, a number between 0 and 1 which weights credible data higher.

==Classical credibility== is founded on frequentist statistical theory. It calculates estimates that are within a specified margin of error with high probability. The credibility factor Z is calculated as:

$$
Z = \sqrt{\frac{n}{n_o}}
$$
Where n is the number of observations in the dataset and $n_0$ is the "standard for full credibility". This standard is based on assumptions about the data's underlying distribution.

==Bayesian credibility== is founded on Bayesian statistical theory, in which prior beliefs (parameters) are updated with observed data to form a posterior distribution. A common Bayesian credibility model is the [[Bühlmann Model]], which defines the credibility factor Z as:
$$
Z = \frac{v}{v+\sigma^2}
$$

Where $v$ is the variance in group means, and $\sigma^2$ is the process variance (within-group variance).



