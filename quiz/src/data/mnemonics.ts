import type { AnimalType } from '@/components/AvatarDisplay'

export type AnimalMnemonics = Record<AnimalType, string>

export const MNEMONICS: Record<string, AnimalMnemonics> = {
  'Axioms of Probability': {
    fox: "Three non-negotiables: stay non-negative, certainty scores exactly 1, and disjoint events just add. Simple.",
    koala: "...basically three chill rules. Stay positive, total to 1, and add 'em when separate. Done. Napping now.",
    frog: "LEAP to remember three axioms: Non-negative! Sums to one! Disjoint events ADD! Three pillars, locked in!",
    owl: "Non-negativity, normalization P(Ω)=1, and countable additivity for disjoint events — the three foundations.",
    wolf: "Pack law has three rules: no negative odds, total territory always equals one, separate hunts just stack.",
    octopus: "Arm 1: P(E)≥0. Arm 2: P(Ω)=1. Arm 3: disjoint events add. Five arms still free for other problems.",
  },

  'Sample Space': {
    fox: "Every possible outcome, catalogued in one place. That's the sample space — the full menu before the game starts.",
    koala: "The sample space is... all the outcomes. Every last one. The whole universe of possibilities. That's it.",
    frog: "EVERY possible outcome LIVES in the sample space! It's the complete jump zone — everything you can land on!",
    owl: "The sample space Ω is the exhaustive set of all elementary outcomes. Events are merely subsets of Ω.",
    wolf: "Before the hunt, map every possible route and result. That full map is the sample space.",
    octopus: "Every arm holds a possible outcome. The collection of all arms together? That's your sample space.",
  },

  'Event': {
    fox: "An event is just a subset of the sample space — one outcome, some, or all of them. Assign it a probability.",
    koala: "Events are subsets of the sample space. Big or small, they're just a piece of the whole picture.",
    frog: "An event is a SUBSET of the sample space — any collection of outcomes that can jump together!",
    owl: "An event E ⊆ Ω is a measurable subset of the sample space to which we assign a probability P(E).",
    wolf: "An event is the specific territory we're watching — a defined piece of the full hunting ground.",
    octopus: "Pick any combo of outcomes from the sample space. That combo is an event. Could be one arm's worth or all eight.",
  },

  'Conditional Probability': {
    fox: "New info narrows the field. P(A|B) = P(A∩B)/P(B). Shrink the sample space down to B, then measure A in it.",
    koala: "Oh, you got new information? P(A|B) = P(A and B) divided by P(B). Just rescale what you already know.",
    frog: "NEW INFO NARROWS THE JUMP! P(A|B) = P(A∩B)÷P(B) — restrict to the world where B happened, then look for A!",
    owl: "Conditional probability: P(A|B) = P(A∩B)/P(B). We restrict the sample space to event B, then renormalize.",
    wolf: "Given B already happened, your territory shrinks to B's ground. P(A|B) = P(A∩B)/P(B) — hunt in the new space.",
    octopus: "Condition on B: shrink the world to only B-outcomes, then see how much of that world is A. Divide to normalize.",
  },

  'Independent Events': {
    fox: "Independent means knowing one tells you nothing about the other. P(A∩B) = P(A)·P(B). They don't interact.",
    koala: "If A and B are independent... they just don't care about each other. Multiply their probabilities. Peace.",
    frog: "INDEPENDENT means P(A∩B) = P(A) × P(B)! Knowing B changed nothing for A's leap — zero influence!",
    owl: "Events A and B are independent iff P(A∩B)=P(A)P(B), equivalently iff P(A|B)=P(A). No information transfer.",
    wolf: "Two wolves hunting completely separate territories — one's success doesn't affect the other. Independence.",
    octopus: "Each arm acts independently. One grabbing something doesn't change any other arm's chances. P(A∩B)=P(A)P(B).",
  },

  'Mutually Exclusive Events': {
    fox: "Can't happen together. P(A∩B)=0. So P(A∪B) = P(A)+P(B). No overlap, no subtraction needed.",
    koala: "Mutually exclusive means zero overlap. They can't both happen. Just add the probabilities straight up.",
    frog: "MUTUALLY EXCLUSIVE — they CAN'T BOTH JUMP AT ONCE! P(A∩B)=0, so P(A∪B) = P(A) + P(B). Clean addition!",
    owl: "Mutually exclusive: A∩B=∅, so P(A∩B)=0. The addition rule simplifies to P(A∪B)=P(A)+P(B).",
    wolf: "Two wolves chasing different prey — they can't catch the same one simultaneously. Mutually exclusive hunts.",
    octopus: "No overlap at all. Zero intersection. P(A∪B) = P(A)+P(B) — straight addition, no double-count correction.",
  },

  'Bayes Theorem': {
    fox: "Flip the conditional: P(A|B) = P(B|A)·P(A)/P(B). You have the pieces — just rearrange them.",
    koala: "Known P(B|A) but need P(A|B)? Flip it, multiply by the prior, divide by total P(B). Then rest.",
    frog: "FLIP THE CONDITIONAL LEAP! P(A|B) = P(B|A) × P(A) ÷ P(B) — update your prior with the evidence!",
    owl: "Bayes: P(A|B)=P(B|A)P(A)/P(B). The posterior is proportional to likelihood times prior, normalized by evidence.",
    wolf: "From the prey's tracks, find where the wolf came from. Reverse-engineer the origin using evidence.",
    octopus: "Three arms in action: prior × likelihood ÷ total evidence. That's your posterior. Bayes in three moves.",
  },

  'The Law of Total Probability': {
    fox: "Partition the sample space into exhaustive, mutually exclusive pieces. P(B) = Σᵢ P(B|Aᵢ)·P(Aᵢ). Bridge to Bayes.",
    koala: "Total probability: break up the sample space into known pieces, compute P(B) weighted through each piece.",
    frog: "PARTITION and CONQUER! P(B) = Σ P(B|Aᵢ)·P(Aᵢ) — add up probability through each pathway to B!",
    owl: "For a partition {Aᵢ}: P(B)=Σᵢ P(B|Aᵢ)P(Aᵢ). This bridges conditional information to marginal probability.",
    wolf: "Divide the territory into sectors. Probability of finding prey in each sector, weighted by sector size, sums to total.",
    octopus: "Each arm represents one pathway. P(B) = sum over all arms of (B given that arm's path) × (arm's weight).",
  },

  'Probability Addition Rule': {
    fox: "P(A∪B) = P(A)+P(B)−P(A∩B). You'd double-count the overlap if you didn't subtract it once.",
    koala: "Add both, then take away the overlap you counted twice. Inclusion-exclusion. Simple subtraction.",
    frog: "ADD them, then SUBTRACT the overlap! P(A∪B) = P(A)+P(B)−P(A∩B)! No double-jumping the intersection!",
    owl: "Inclusion-exclusion principle: P(A∪B)=P(A)+P(B)−P(A∩B) corrects for double-counting the intersection.",
    wolf: "Two hunting grounds overlap — add both, then cut the shared zone once so it's not double-counted.",
    octopus: "Arm 1 adds A. Arm 2 adds B. Arm 3 removes the overlap once. Net result: P(A∪B)=P(A)+P(B)−P(A∩B).",
  },

  'Probability Multiplication Rule': {
    fox: "P(A∩B) = P(A)·P(B|A). Want both? Start with one happening, then condition on it for the next.",
    koala: "P(A and B) = P(A) times P(B given A). Think step by step: first A, then B given A happened.",
    frog: "CHAIN the events! P(A∩B) = P(A) × P(B|A) — first A happens, THEN B given A! Sequential multiplication!",
    owl: "The chain rule: P(A∩B)=P(A)P(B|A). Extends to P(A∩B∩C)=P(A)P(B|A)P(C|A∩B) for more events.",
    wolf: "Scout finds the trail first (P(A)), then the pack moves given that lead (P(B|A)). Chain the probabilities.",
    octopus: "First arm grabs A, second arm grabs B given A is held. Multiply along the chain for the joint probability.",
  },

  'Random Variable': {
    fox: "It's a function: outcomes → numbers. Discrete counts distinct values; continuous fills an interval. That's it.",
    koala: "Random variable = a number that depends on a random outcome. Maps the sample space to the real line.",
    frog: "A random variable MAPS outcomes to NUMBERS! Function from Ω to ℝ — discrete or continuous, it's a map!",
    owl: "A random variable X: Ω→ℝ is a measurable function. Discrete RVs have countable support; continuous do not.",
    wolf: "Every hunt outcome gets scored — distance, prey caught. The scoring rule is your random variable.",
    octopus: "Each outcome gets tagged with a number. The tagging rule is the random variable. One function, endless outcomes.",
  },

  'Probability Mass Function (PMF)': {
    fox: "For discrete RVs: p(x) = P(X=x). Lists each value with its probability. Must be non-negative and sum to 1.",
    koala: "PMF: for discrete variables, each possible value gets a probability. They must total 1. Very simple.",
    frog: "PMF for DISCRETE RVs: P(X=x) = p(x)! Each point gets its own probability! Sum = 1! Non-negative!",
    owl: "PMF p(x)=P(X=x) for discrete X: p(x)≥0 and Σₓp(x)=1. Uniquely characterizes the discrete distribution.",
    wolf: "Count outcomes for the pack — assign each count a probability. All probabilities together sum to 1.",
    octopus: "Each discrete value gets its own arm of probability. All arms must sum to exactly 1. That's the PMF.",
  },

  'Probability Density Function (PDF)': {
    fox: "f(x) for continuous RVs. P(a≤X≤b) = ∫f(x)dx. Individual points have zero probability — only ranges matter.",
    koala: "PDF: no point probability for continuous things, just integrate over a range. Area under the curve.",
    frog: "CONTINUOUS RVs use PDFs! Integrate f(x) over a range for probability! Area = probability! ∫f(x)dx!",
    owl: "PDF f(x)≥0 with ∫f(x)dx=1. P(a≤X≤b)=∫ₐᵇf(x)dx. Point probabilities are identically zero for continuous RVs.",
    wolf: "The terrain density map — higher density means more likely to find prey there. Total area always equals 1.",
    octopus: "For continuous RVs, probability lives in areas, not points. Integrate f(x) over any region to find probability.",
  },

  'Cumulative Distribution Function (CDF)': {
    fox: "F(x) = P(X≤x). Monotone non-decreasing, right-continuous, runs from 0 to 1. Works for any distribution.",
    koala: "CDF: F(x) = P(X ≤ x). Just tells you what fraction of outcomes land at or below x. Climbs from 0 to 1.",
    frog: "CDF ACCUMULATES! F(x) = P(X ≤ x)! Starts at 0, ends at 1, always NON-DECREASING! Right-continuous!",
    owl: "F(x)=P(X≤x) is right-continuous, non-decreasing, with lim_{x→-∞}F(x)=0 and lim_{x→∞}F(x)=1.",
    wolf: "Track how much territory has been covered up to point x. F(x) tells you the cumulative fraction done.",
    octopus: "Each arm from left to right scoops up probability. F(x) is all the probability accumulated through x.",
  },

  'Expected Value': {
    fox: "E[X] = Σxp(x) or ∫xf(x)dx. Weighted average. The center of gravity of the distribution.",
    koala: "Expected value is just the probability-weighted average. The long-run mean. What you'd expect on average.",
    frog: "E[X] is the WEIGHTED AVERAGE — each value times its probability, then SUM! The distribution's center of mass!",
    owl: "E[X]=Σxp(x) for discrete or ∫xf(x)dx for continuous — the first moment μ. Linearity: E[aX+b]=aE[X]+b.",
    wolf: "Expected value is what the pack expects to catch per hunt, averaged over many hunts. The long-run mean.",
    octopus: "Weight each value by how likely it is, sum them all. Eight arms each contributing: that's E[X].",
  },

  'Variance': {
    fox: "Var(X) = E[X²]−(E[X])². Computational shortcut. Measures spread. Always non-negative.",
    koala: "Variance = E[X²] minus (E[X])². Or E[(X−μ)²]. Both are the same — just the squared average deviation.",
    frog: "Var(X) = E[X²] − (E[X])²! E-of-square MINUS square-of-E! Spread around the mean! Always ≥ 0!",
    owl: "Var(X)=E[(X−μ)²]=E[X²]−(E[X])². The computational formula is almost always faster to apply in practice.",
    wolf: "Variance measures how spread the pack is from their mean position. Use E[X²]−(E[X])² to compute it fast.",
    octopus: "Square the deviation from the mean, weight by probability, sum everything. Or shortcut: E[X²]−(E[X])².",
  },

  'Standard Deviation': {
    fox: "SD = √Var(X). Same units as X. One SD from the mean covers ~68% of a Normal distribution.",
    koala: "Standard deviation is just the square root of variance. Back in the original units. Easier to interpret.",
    frog: "SQRT of VARIANCE! σ = √Var(X)! Back in the original units! 68% of Normal is within one σ!",
    owl: "σ(X) = √Var(X). The standard deviation preserves the units of X, making it directly interpretable as spread.",
    wolf: "Variance squared the units. Take the square root to get back to the pack's actual scale of spread.",
    octopus: "Square root of variance. Undoes the squaring. Now spread is in the same units as the original variable.",
  },

  'Binomial Distribution': {
    fox: "n independent trials, prob p each. X~Bin(n,p). P(X=k)=C(n,k)pᵏ(1−p)^(n−k). E=np, Var=np(1−p).",
    koala: "Binomial: n flips, each with prob p. Count successes. P(X=k) = nCk·pᵏ·(1-p)^(n-k). Mean=np, Var=np(1-p).",
    frog: "n TRIALS, p SUCCESS EACH! Count them! P(X=k)=nCk·pᵏ·(1-p)^(n-k)! E[X]=np, Var=np(1-p)! Binomial!",
    owl: "X~Bin(n,p): P(X=k)=C(n,k)pᵏ(1-p)^(n-k); E[X]=np, Var=np(1-p). Sum of n independent Bernoulli(p) trials.",
    wolf: "n separate hunts, each with probability p of success. Count total catches. Classic Binomial.",
    octopus: "Run n independent trials. Each arm either catches (prob p) or misses. Count total catches: Binomial(n,p).",
  },

  'Poisson Distribution': {
    fox: "X~Pois(λ). P(X=k)=e^(-λ)λᵏ/k!. Mean = Variance = λ. Rare events over time or space.",
    koala: "Poisson: rare events arriving at rate λ. P(X=k) = e^(-λ)·λᵏ/k!. Mean equals variance equals λ. Neat.",
    frog: "POISSON counts RARE events at rate λ! P(X=k)=e^(-λ)λᵏ/k! Mean=Variance=λ! Memorize that symmetry!",
    owl: "X~Pois(λ): P(X=k)=e^{-λ}λᵏ/k!, k=0,1,2,…; E[X]=Var[X]=λ. Models arrival counts in fixed intervals.",
    wolf: "Rare prey sightings per hour at rate λ. Poisson tells you how many sightings you'll likely count.",
    octopus: "Rare events arrive at rate λ. Count arrivals: Poisson. Formula: e^(-λ)λᵏ/k! — and mean equals variance.",
  },

  'Geometric Distribution': {
    fox: "Trials until first success. P(X=k)=(1−p)^(k−1)·p. E[X]=1/p. Discrete memoryless property.",
    koala: "Geometric: keep trying until you first succeed. P(X=k)=(1-p)^(k-1)·p. Expected wait = 1/p. Simple.",
    frog: "KEEP JUMPING until success! P(X=k)=(1-p)^(k-1)·p! First success on trial k! E[X]=1/p! Don't give up!",
    owl: "X~Geom(p): P(X=k)=(1-p)^(k-1)p for k=1,2,…; E[X]=1/p, Var=(1-p)/p². Discrete memoryless distribution.",
    wolf: "Hunt until first catch — each attempt has prob p of success. Geometric counts the wait for that first win.",
    octopus: "Fail, fail, fail… until one arm succeeds. On trial k: (1-p)^(k-1)·p. Expected wait = 1/p.",
  },

  'Negative Binomial Distribution': {
    fox: "Trials until rth success. P(X=k)=C(k−1,r−1)·pʳ·(1−p)^(k−r). E[X]=r/p. Generalizes geometric.",
    koala: "Negative Binomial: wait for r successes instead of just one. Like geometric but stacked r times. E[X]=r/p.",
    frog: "Count trials until the RTH SUCCESS! P(X=k)=C(k-1,r-1)·pʳ·(1-p)^(k-r)! Geometric to the power of r!",
    owl: "X~NegBin(r,p): P(X=k)=C(k-1,r-1)pʳ(1-p)^{k-r}; E[X]=r/p, Var=r(1-p)/p². Geometric is r=1 special case.",
    wolf: "Need r total successful hunts. Keep hunting until you've bagged r prey. That's Negative Binomial.",
    octopus: "I need r catches total. Geometric waited for 1; Negative Binomial waits for r. Stack the geometry r times.",
  },

  'Hypergeometric Distribution': {
    fox: "Sampling without replacement. N total, K successes, pick n. No replacement changes each draw's probability.",
    koala: "Hypergeometric: like Binomial but without replacement. N items total, K are successes. Pick n of them.",
    frog: "WITHOUT REPLACEMENT! N total, K successes, draw n! Hypergeometric counts successes pulled! No replacing!",
    owl: "X~Hyper(N,K,n): P(X=k)=C(K,k)C(N-K,n-k)/C(N,n). Each draw alters the remaining composition.",
    wolf: "Pull from the pack without putting them back — each selection changes the remaining pool. Hypergeometric.",
    octopus: "Eight items in a bag — grab some without replacing. Each grab changes what's left. Count the special ones.",
  },

  'Exponential Distribution': {
    fox: "X~Exp(λ). f(x)=λe^(-λx). Memoryless: P(X>s+t|X>s)=P(X>t). E[X]=1/λ, Var=1/λ².",
    koala: "Exponential: time until the next event. Memoryless — past waiting time is irrelevant. E[X]=1/λ. Relaxing.",
    frog: "MEMORYLESS TIME TO EVENT! f(x)=λe^(-λx)! Past wait doesn't matter — start fresh! E[X]=1/λ!",
    owl: "X~Exp(λ): f(x)=λe^{-λx}, F(x)=1−e^{-λx}; E[X]=1/λ, Var=1/λ². Unique continuous memoryless distribution.",
    wolf: "Waiting time between prey sightings. However long you've waited, the future wait is the same. Memoryless.",
    octopus: "One arm waits for an event. However long it's waited, remaining wait follows the same distribution. Exponential.",
  },

  'Normal Distribution': {
    fox: "X~N(μ,σ²). Bell curve, symmetric at μ. 68/95/99.7% within 1/2/3 standard deviations. CLT's favorite.",
    koala: "Normal distribution — the bell curve. Mean μ, variance σ². 68-95-99.7 rule. Symmetric. Classic.",
    frog: "THE BELL CURVE! N(μ,σ²)! Symmetric around μ! 68-95-99.7 rule! CLT makes everything Normal! So elegant!",
    owl: "X~N(μ,σ²): f(x)=(2πσ²)^(-½)exp{-(x-μ)²/(2σ²)}. Symmetric; characterized entirely by μ and σ².",
    wolf: "Pack sizes cluster around the leader, tailing off symmetrically in both directions. Bell-shaped territory.",
    octopus: "Symmetric bell centered at μ. Four arms stretch left, four stretch right, perfectly balanced. N(μ,σ²).",
  },

  'Lognormal Distribution': {
    fox: "If ln(X)~N(μ,σ²), X is Lognormal. Strictly positive, right-skewed. E[X]=e^(μ+σ²/2). Used for loss sizes.",
    koala: "Lognormal: take the log and it's normal. Only positive values. Right-skewed. Natural for insurance losses.",
    frog: "LOG of X is NORMAL! X>0 always! Right-skewed outliers! E[X]=e^(μ+σ²/2)! Perfect for loss modeling!",
    owl: "X~LogN(μ,σ²) iff ln(X)~N(μ,σ²); E[X]=e^{μ+σ²/2}, Var=e^{2μ+σ²}(e^{σ²}-1). Right-skewed, positive support.",
    wolf: "Wolf territory sizes: usually modest, occasionally a massive outlier. Lognormal captures that right skew.",
    octopus: "Multiply many small positive factors together — their product is Lognormal. Multiplicative processes love it.",
  },

  'Gamma': {
    fox: "Sum of α independent Exp(1/θ) variables ~ Gamma(α,θ). E[X]=αθ, Var=αθ². Flexible shape for positive data.",
    koala: "Gamma: flexible positive distribution. Shape α, scale θ. Exponential is a special case with α=1.",
    frog: "GAMMA = sum of exponentials! Shape α, scale θ! E[X]=αθ, Var=αθ²! Generalize the exponential! Go!",
    owl: "X~Gamma(α,θ): f∝x^{α-1}e^{-x/θ}; E[X]=αθ, Var=αθ². Special cases: Exp(θ) when α=1, χ² when θ=2.",
    wolf: "Wait for α prey in sequence, each arrival Exp(λ). The total wait is Gamma — built from stacked exponentials.",
    octopus: "Stack α independent exponential waiting times. The total is Gamma(α,θ). More shape = higher α.",
  },

  'Beta': {
    fox: "X~Beta(α,β), lives on (0,1). Models probabilities or proportions. E[X]=α/(α+β). Flexible on [0,1].",
    koala: "Beta distribution: bounded between 0 and 1. Perfect for modeling probabilities. E[X]=α/(α+β). Neat.",
    frog: "BETA lives on (0,1)! Model PROBABILITIES directly! E[X]=α/(α+β)! Alpha and beta shape the whole curve!",
    owl: "X~Beta(α,β): f∝x^{α-1}(1-x)^{β-1} on (0,1); E[X]=α/(α+β). Uniform(0,1) is the α=β=1 special case.",
    wolf: "What fraction of the territory belongs to each pack? Always between 0 and 1 — Beta models that proportion.",
    octopus: "Something between 0 and 1, shaped by two parameters α and β. Flexible and bounded. That's Beta.",
  },

  'Uniform Continuous Distribution': {
    fox: "X~Uniform(a,b). Constant density 1/(b−a) over [a,b]. E[X]=(a+b)/2, Var=(b−a)²/12. Equal likelihood.",
    koala: "Uniform: every value in [a,b] is equally likely. Flat density. E=(a+b)/2. The simplest continuous distribution.",
    frog: "EQUALLY LIKELY everywhere on [a,b]! Flat density 1/(b-a)! E=(a+b)/2, Var=(b-a)²/12! Perfect symmetry!",
    owl: "X~U(a,b): f(x)=1/(b-a) on [a,b]; E[X]=(a+b)/2, Var=(b-a)²/12. Maximum entropy on a bounded interval.",
    wolf: "Every spot in the territory is equally likely. Flat distribution — no preferred location. Uniform spread.",
    octopus: "Eight equally spaced positions, all equally likely. That's the spirit of Uniform — equal probability everywhere.",
  },

  'Joint Probability Function': {
    fox: "P(X=x,Y=y) — probabilities for two RVs simultaneously. Sum over y to get marginal of X.",
    koala: "Joint PMF/PDF: probabilities for two variables at once. Sum out one variable to collapse to the marginal.",
    frog: "TWO VARIABLES AT ONCE! P(X=x,Y=y) is the joint PMF! Sum over Y for X's marginal! Sum over X for Y's!",
    owl: "The joint PMF p(x,y)=P(X=x,Y=y) captures dependence. Marginalization: p_X(x)=Σᵧp(x,y).",
    wolf: "Two wolves, two territories — the joint distribution describes where both roam simultaneously.",
    octopus: "Two arms working at once — one grabs X, one grabs Y. The joint probability governs them together.",
  },

  'Marginal Probability Function': {
    fox: "Sum (or integrate) out the other variable. pX(x) = Σᵧ p(x,y). Collapses the joint to one variable.",
    koala: "Marginal: just sum away the variable you don't care about. What's left is the marginal. Very relaxed.",
    frog: "SUM OUT one variable to get the MARGINAL! pX(x) = Σᵧ p(x,y)! Collapse the joint into one dimension!",
    owl: "Marginal PMF p_X(x)=Σᵧp(x,y). Marginalization integrates out the nuisance variable to recover the solo dist.",
    wolf: "Focus on just one wolf — sum over all positions of the other wolf to get the first wolf's solo distribution.",
    octopus: "Hold X fixed. Sum over all Y positions. You've collapsed the joint to X's marginal. One variable remains.",
  },

  'Conditional Probability Function': {
    fox: "p(x|y) = p(x,y)/pY(y). Fix Y, rescale the joint slice. What does X look like given Y's value?",
    koala: "Conditional distribution: fix y, then look at X. p(x|y) = p(x,y)/p(y). Rescale the joint. Simple.",
    frog: "FIX Y and LOOK AT X's distribution! p(x|y) = p(x,y) ÷ p(y)! Normalize the slice of the joint!",
    owl: "p(x|y)=p(x,y)/p_Y(y) for p_Y(y)>0. The conditional PMF is the normalized joint slice at a fixed y.",
    wolf: "Know where the second wolf is? Condition on that — the first wolf's distribution changes accordingly.",
    octopus: "Pin one arm at Y=y, examine the other arm's distribution. That slice, normalized, is the conditional dist.",
  },

  'Covariance': {
    fox: "Cov(X,Y) = E[XY]−E[X]E[Y]. Positive = move together, negative = move apart, zero = uncorrelated.",
    koala: "Covariance = E[XY] minus E[X] times E[Y]. Positive means together, negative means opposite. Pretty chill.",
    frog: "Cov(X,Y) = E[XY] − E[X]·E[Y]! Positive=TOGETHER, negative=OPPOSITE! Measure of joint movement!",
    owl: "Cov(X,Y)=E[(X-μX)(Y-μY)]=E[XY]-E[X]E[Y]. Independent ⟹ Cov=0, but Cov=0 does not imply independence.",
    wolf: "Two wolves: do they tend to move in the same direction? Covariance measures their coordinated tendency.",
    octopus: "Two arms — do they sync or oppose? E[XY]−E[X]E[Y] measures their coordination. Sign tells direction.",
  },

  'Covariance and Correlation Coefficient': {
    fox: "ρ = Cov(X,Y)/(σX·σY). Scaled covariance: always in [−1,1]. Unitless, comparable across distributions.",
    koala: "Correlation ρ = covariance divided by both standard deviations. Always between -1 and 1. Scale-free.",
    frog: "SCALE the covariance! ρ = Cov(X,Y)/(σX·σY)! Always [-1,1]! ±1 means perfect linear relationship!",
    owl: "Pearson's ρ=Cov(X,Y)/(σXσY)∈[-1,1] is scale-invariant. |ρ|=1 iff Y=aX+b for some constants a,b.",
    wolf: "Correlation scales how tightly two wolves move together, regardless of how large they are. [-1,1] range.",
    octopus: "Cov divided by both standard deviations. Unit-free correlation ρ ∈ [-1, 1]. Easy to compare and interpret.",
  },

  'Central Limit Theorem': {
    fox: "Average of n iid RVs → N(μ, σ²/n) as n→∞. Doesn't matter what the original distribution is.",
    koala: "CLT: add up enough random things and the sum is approximately normal. Regardless of original shape. Magic.",
    frog: "ADD ENOUGH IID RANDOM VARIABLES and THEY BECOME NORMAL! CLT! (X̄-μ)/(σ/√n) → N(0,1)! Go theorem!",
    owl: "CLT: (X̄-μ)/(σ/√n) →ᵈ N(0,1) as n→∞. The sample mean converges in distribution to Normal regardless of the parent.",
    wolf: "The whole pack's average always trends Normal, no matter how each wolf is individually distributed. Pack law.",
    octopus: "Eight hundred independent things added together? Regardless of their shapes, the sum is approximately Normal.",
  },

  'Linear Combinations of Random Variables': {
    fox: "E[aX+bY]=aE[X]+bE[Y]. Var(aX+bY)=a²Var(X)+b²Var(Y)+2ab·Cov(X,Y). Expectation is linear, variance isn't.",
    koala: "Linear combo: expected value distributes cleanly. Variance adds if independent, plus cross term if correlated.",
    frog: "E IS LINEAR! E[aX+bY]=aE[X]+bE[Y]! Var needs the 2ab·Cov term! Expectation = easy, Variance = careful!",
    owl: "E[aX+bY]=aE[X]+bE[Y]; Var(aX+bY)=a²Var(X)+b²Var(Y)+2ab·Cov(X,Y). If independent, cross term vanishes.",
    wolf: "Two wolves contribute jointly — add expected values directly, but variance needs the inter-wolf correlation.",
    octopus: "Arm a times X plus arm b times Y. E sums cleanly. Var needs the 2ab·Cov cross-arm correction term.",
  },

  'Moments for Linear Combinations': {
    fox: "E[ΣaᵢXᵢ]=ΣaᵢE[Xᵢ]. Var(ΣaᵢXᵢ)=ΣᵢΣⱼaᵢaⱼCov(Xᵢ,Xⱼ). Independent: just Σaᵢ²Var(Xᵢ).",
    koala: "Linear combo moments: expected value scales and adds directly. Variance has all the cross-covariance terms.",
    frog: "MOMENTS OF LINEAR COMBOS! E is linear — scales and adds! Var expands with ALL cross-covariance pairs!",
    owl: "E[Σaᵢ Xᵢ]=Σaᵢ E[Xᵢ]; Var(Σaᵢ Xᵢ)=Σᵢ Σⱼaᵢaⱼ Cov(Xᵢ,Xⱼ). Independent special case: Σaᵢ²Var(Xᵢ).",
    wolf: "Combine the pack's contributions — add means directly, but variance needs all the inter-wolf correlations.",
    octopus: "Each arm contributes aᵢXᵢ. Expected value sums linearly. Variance needs the full covariance between all arms.",
  },

  'Moments for Joint Distributions': {
    fox: "E[g(X,Y)] = ΣΣg(x,y)p(x,y) or ∬g(x,y)f(x,y)dxdy. Plug the joint distribution into the moment formula.",
    koala: "Joint moments: weight g(x,y) by the joint probability and sum or integrate. Same idea as a single variable.",
    frog: "JOINT MOMENT = weighted average of g(X,Y) over the JOINT distribution! Double sum or double integral!",
    owl: "E[g(X,Y)]=Σx,y g(x,y)p(x,y) discrete or ∬g(x,y)f(x,y)dxdy continuous. LOTUS extends to two dimensions.",
    wolf: "To find any joint statistic, weight the function g over both wolves' joint territory and sum up.",
    octopus: "Two variables, two arms — compute g(x,y), weight by joint probability, sum over all combinations.",
  },

  'Joint Cumulative Distribution Function': {
    fox: "F(x,y) = P(X≤x, Y≤y). Both variables simultaneously bounded. Recover marginals with limits to ±∞.",
    koala: "Joint CDF: F(x,y) = P(X≤x and Y≤y). Let y→∞ to get X's marginal CDF. Standard CDF, just two-dimensional.",
    frog: "P(X≤x AND Y≤y) at the same time! Joint CDF accumulates in BOTH dimensions simultaneously!",
    owl: "F(x,y)=P(X≤x,Y≤y). Marginals: F_X(x)=F(x,∞), F_Y(y)=F(∞,y). Joint PDF: f(x,y)=∂²F/∂x∂y.",
    wolf: "Both wolves must be within their respective zones. Joint CDF — both constraints active simultaneously.",
    octopus: "Two arms both constrained to be below their limits. That joint constraint defines the joint CDF.",
  },

  'Independent Random Variables': {
    fox: "X and Y are independent iff f(x,y)=fX(x)·fY(y) for all x,y. Joint = product of marginals.",
    koala: "Independent RVs: the joint distribution is just the product of the marginals. They don't interact at all.",
    frog: "INDEPENDENT if joint = PRODUCT of marginals! f(x,y) = fX(x)·fY(y)! No interaction between variables!",
    owl: "X⊥Y iff f(x,y)=f_X(x)f_Y(y). Equivalently P(X∈A,Y∈B)=P(X∈A)P(Y∈B) for all measurable A,B.",
    wolf: "Two wolves hunting completely separate territories. Their positions multiply — no dependency, no communication.",
    octopus: "Two arms operating in total isolation. Their joint probability is just the product of each arm's probability.",
  },
}
