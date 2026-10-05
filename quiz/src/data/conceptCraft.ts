import type { CraftModule } from '@/lib/conceptCraft'

/**
 * **Concept Craft's recipe book** (docs/concept-craft.md).
 *
 * Every concept named here is a page in `Concepts/` — the board opens it in
 * the same reader, menu and question browser as everywhere else — and every
 * recipe restates a relationship its result's own page already writes down,
 * usually as its formula: Bornhuetter-Ferguson *is* a credibility weighting of
 * the chain ladder and the expected-loss method (`Bornhuetter-Ferguson
 * Method.md`, "BF is a credibility weighting in disguise"). The `why` line is
 * that statement, shortened. A recipe the vault can't back is a recipe to
 * leave out, not one to invent: the game teaches whatever it rewards.
 *
 * `data/conceptCraft.test.ts` holds the book to the vault — each name a page,
 * each module's objectives named as its exam page names them — and to the
 * engine's rules (`moduleProblems`: three to five primitives, one result per
 * pair, everything reachable).
 *
 * Modules run in ladder order, Exam P to Exam 5, which is the order the
 * topic picker lists them in.
 */
export const CRAFT_MODULES: CraftModule[] = [
  {
    id: 'exam-p-general-probability',
    exam: 'P',
    examPage: 'Exam P-1 (SOA)',
    objectives: ['General Probability'],
    title: 'General probability',
    blurb: 'From a set function to Bayes’ theorem.',
    primitives: ['Set Function', 'Axioms of Probability', 'Sample Space', 'Event'],
    introduces: [{ after: 'Conditional Probability', nodes: ['Mutually Exclusive Events'] }],
    recipes: [
      {
        a: 'Set Function',
        b: 'Axioms of Probability',
        relation: 'constrained',
        result: 'Probability',
        why: 'A probability is a set function on the events of a sample space that satisfies the three axioms: $P(E) \\ge 0$, $P(S) = 1$, and additivity over disjoint events.',
      },
      {
        a: 'Event',
        b: 'Sample Space',
        relation: 'over',
        result: 'Probability',
        why: 'When every outcome is equally likely, $P(E) = |E| / |S|$ — the outcomes in the event over the outcomes in the sample space.',
      },
      {
        a: 'Probability',
        b: 'Sample Space',
        relation: 'restricted',
        result: 'Conditional Probability',
        why: '$P(A \\mid B) = P(A \\cap B) / P(B)$: the probability of $A$ re-measured once the sample space has been cut down to $B$.',
      },
      {
        a: 'Conditional Probability',
        b: 'Probability',
        relation: 'times',
        result: 'Probability Multiplication Rule',
        why: '$P(A \\cap B) = P(A) \\cdot P(B \\mid A)$ — the chance of the first event times the chance of the second given the first.',
      },
      {
        a: 'Conditional Probability',
        b: 'Event',
        relation: 'unaffected',
        result: 'Independent Events',
        why: '$A$ and $B$ are independent when $P(A \\mid B) = P(A)$: learning that $B$ happened leaves the probability of $A$ unchanged — equivalently $P(A \\cap B) = P(A)\\,P(B)$.',
      },
      {
        a: 'Mutually Exclusive Events',
        b: 'Sample Space',
        relation: 'partitioning',
        result: 'The Law of Total Probability',
        why: 'If $A_1, \\ldots, A_n$ are mutually exclusive and exhaustive — a partition of $S$ — then $P(B) = \\sum_i P(B \\mid A_i)\\,P(A_i)$.',
      },
      {
        a: 'Conditional Probability',
        b: 'The Law of Total Probability',
        relation: 'over',
        result: 'Bayes Theorem',
        why: '$P(H \\mid E) = P(E \\mid H)\\,P(H) / P(E)$, with the denominator $P(E)$ found by the law of total probability across the hypotheses.',
      },
    ],
  },
  {
    id: 'exam-fm-time-value',
    exam: 'FM',
    examPage: 'Exam FM-2 (SOA)',
    objectives: [
      'Time Value of Money',
      'Annuities/Cash Flows with Non-Contingent Payments',
      'Loans',
      'Bonds',
      'General Cash Flows, Portfolios, and Asset Liability Management',
    ],
    title: 'Interest, annuities, loans and bonds',
    blurb: 'From one rate of interest to Redington immunization.',
    primitives: ['Interest Rate', 'Number of Periods', 'Discount Factor'],
    introduces: [
      { after: 'Annuity Immediate', nodes: ['Principal'] },
      { after: 'Outstanding Balance', nodes: ['Coupon', 'Redemption Value'] },
      { after: 'Bond Price', nodes: ['Yield Rate'] },
      { after: 'Macaulay Duration', nodes: ['Convexity'] },
    ],
    recipes: [
      {
        a: 'Interest Rate',
        b: 'Number of Periods',
        relation: 'compounded',
        result: 'Accumulation Function',
        why: 'Under compound interest, 1 grows by a factor of $1 + i$ each period, so after $t$ periods $a(t) = (1 + i)^t$.',
      },
      {
        a: 'Discount Factor',
        b: 'Number of Periods',
        relation: 'compounded',
        result: 'Present Value',
        why: '$v = 1/(1+i)$ is the value today of 1 due in one period; applied over $n$ periods it gives $PV = FV \\cdot v^n$.',
      },
      {
        a: 'Present Value',
        b: 'Number of Periods',
        relation: 'summed',
        result: 'Annuity Immediate',
        why: 'Payments of 1 at the end of each of $n$ periods are worth $a_{\\overline{n}|} = v + v^2 + \\cdots + v^n = (1 - v^n)/i$.',
      },
      {
        a: 'Annuity Immediate',
        b: 'Accumulation Function',
        relation: 'scaled',
        result: 'Annuity Due',
        why: 'Each payment of an annuity-due arrives one period sooner, so it is worth one period’s accumulation more: $\\ddot{a}_{\\overline{n}|} = (1 + i)\\,a_{\\overline{n}|}$.',
      },
      {
        a: 'Annuity Immediate',
        b: 'Number of Periods',
        relation: 'limit',
        result: 'Perpetuity',
        why: 'Let the term run forever: $v^n \\to 0$, so $a_{\\overline{\\infty}|} = 1/i$.',
      },
      {
        a: 'Principal',
        b: 'Annuity Immediate',
        relation: 'over',
        result: 'Payment Amount',
        why: 'A level loan payment is the amount lent over the annuity factor: $P = L / a_{\\overline{n}|i}$.',
      },
      {
        a: 'Payment Amount',
        b: 'Annuity Immediate',
        relation: 'times',
        result: 'Outstanding Balance',
        why: 'Prospectively, the balance after $k$ payments is the value of the payments still to come: $OB_k = P \\cdot a_{\\overline{n-k}|i}$.',
      },
      {
        a: 'Outstanding Balance',
        b: 'Interest Rate',
        relation: 'times',
        result: 'Interest',
        why: 'The interest in a payment is the rate times the balance owed at the start of that period: $I_k = i\\,B_{k-1}$.',
      },
      {
        a: 'Payment Amount',
        b: 'Interest',
        relation: 'minus',
        result: 'Loan Amortization',
        why: 'Each payment first pays the interest due; what is left repays principal: $PR_k = K_k - I_k$, and the balance falls by that much.',
      },
      {
        a: 'Coupon',
        b: 'Redemption Value',
        relation: 'plus',
        result: 'Bond Price',
        why: 'A bond’s price is its coupons, valued as an annuity, plus its redemption value, discounted — both at the yield rate $j$: $P = Fr \\cdot a_{\\overline{n}|j} + C v^n$.',
      },
      {
        a: 'Bond Price',
        b: 'Yield Rate',
        relation: 'differentiated',
        result: 'Modified Duration',
        why: 'Modified duration is the percentage change in price per unit change in yield: $D_{Mod} = -\\frac{1}{P}\\frac{dP}{dj}$.',
      },
      {
        a: 'Modified Duration',
        b: 'Yield Rate',
        relation: 'scaled',
        result: 'Macaulay Duration',
        why: 'The two durations differ by one period’s growth at the yield: $D_{Mac} = D_{Mod}\\,(1 + j)$.',
      },
      {
        a: 'Macaulay Duration',
        b: 'Convexity',
        relation: 'combined',
        result: 'Redington Immunization',
        why: 'Redington immunization holds when the present values of assets and liabilities match, their durations match, and the assets’ convexity exceeds the liabilities’.',
      },
    ],
  },
  {
    id: 'exam-mas-i-poisson-processes',
    exam: 'MAS-I',
    examPage: 'Exam MAS-I (CAS)',
    objectives: ['A. Probability Models (Stochastic Processes and Survival Models)'],
    title: 'Poisson processes',
    blurb: 'Counting claims, the waits between them, and what they cost.',
    primitives: ['Counting Process', 'Poisson Distribution', 'Exponential Distribution'],
    introduces: [
      { after: 'Poisson Process', nodes: ['Severity'] },
      { after: 'Compound Poisson Process', nodes: ['Intensity Function'] },
      { after: 'Nonhomogeneous Poisson Process', nodes: ['Mixing Distribution'] },
      { after: 'Mixed Poisson Process', nodes: ['Gamma'] },
    ],
    recipes: [
      {
        a: 'Counting Process',
        b: 'Poisson Distribution',
        relation: 'distributed',
        result: 'Poisson Process',
        why: 'A Poisson process is a counting process whose counts are Poisson: $N(t) \\sim \\text{Poi}(\\lambda t)$, with independent increments.',
      },
      {
        a: 'Poisson Process',
        b: 'Exponential Distribution',
        relation: 'distributed',
        result: 'Interarrival Time',
        why: 'The waits between a Poisson process’s events are independent exponentials with mean $1/\\lambda$ — the waiting-time view of the same process.',
      },
      {
        a: 'Poisson Process',
        b: 'Severity',
        relation: 'marked',
        result: 'Compound Poisson Process',
        why: 'Give each event a random claim amount and add them up: $S(t) = \\sum_{i=1}^{N(t)} X_i$, with $E[S(t)] = \\lambda t\\,E[X]$.',
      },
      {
        a: 'Poisson Process',
        b: 'Intensity Function',
        relation: 'varying',
        result: 'Nonhomogeneous Poisson Process',
        why: 'Let the rate change with time: counts over $(a, b]$ are still Poisson, with mean $\\int_a^b \\lambda(u)\\,du$.',
      },
      {
        a: 'Poisson Process',
        b: 'Mixing Distribution',
        relation: 'drawnFrom',
        result: 'Mixed Poisson Process',
        why: 'Each risk’s rate $\\Lambda$ is drawn from a mixing distribution; given $\\Lambda = \\lambda$ the counts are Poisson, and the variance $t\\,E[\\Lambda] + t^2\\,\\text{Var}(\\Lambda)$ exceeds the mean.',
      },
      {
        a: 'Mixed Poisson Process',
        b: 'Gamma',
        relation: 'drawnFrom',
        result: 'Negative Binomial Distribution',
        why: 'With a gamma mixing distribution, the unconditional claim counts are exactly negative binomial.',
      },
    ],
  },
  {
    id: 'exam-5-rate-indication',
    exam: 'CAS-5',
    examPage: 'Exam 5 (CAS)',
    objectives: ['A. Ratemaking'],
    title: 'The overall rate indication',
    blurb: 'From frequency and severity to a rate change.',
    primitives: ['Frequency', 'Severity', 'Earned Exposure'],
    introduces: [
      { after: 'Loss and Loss Adjustment Expense', nodes: ['Earned Premium', 'Rate Level Change'] },
      { after: 'Loss Ratio', nodes: ['Permissible Loss Ratio'] },
      { after: 'Overall Rate Level Indication', nodes: ['Complement of Credibility'] },
    ],
    recipes: [
      {
        a: 'Frequency',
        b: 'Severity',
        relation: 'times',
        result: 'Pure Premium',
        why: 'Claims per exposure times cost per claim is cost per exposure: $\\text{Pure Premium} = \\text{Frequency} \\times \\text{Severity}$.',
      },
      {
        a: 'Pure Premium',
        b: 'Earned Exposure',
        relation: 'times',
        result: 'Loss and Loss Adjustment Expense',
        why: 'Pure premium is loss and LAE per earned exposure, so multiplying it back by earned exposure gives the total loss and LAE.',
      },
      {
        a: 'Earned Premium',
        b: 'Rate Level Change',
        relation: 'adjusted',
        result: 'On Level Premium',
        why: 'Historical earned premium is restated as though every policy had been written at today’s rate level, so the years’ loss ratios can be compared.',
      },
      {
        a: 'Loss and Loss Adjustment Expense',
        b: 'On Level Premium',
        relation: 'over',
        result: 'Loss Ratio',
        why: '$\\text{Loss Ratio} = (\\text{Losses} + \\text{LAE}) / \\text{Earned Premium}$, with the premium brought on level first.',
      },
      {
        a: 'Loss Ratio',
        b: 'Permissible Loss Ratio',
        relation: 'compared',
        result: 'Loss Ratio Method',
        why: 'The loss ratio method compares the projected loss and LAE ratio with the permissible loss ratio: $\\text{Indicated Change} = \\text{Projected Loss Ratio} / \\text{PLR} - 1$ when every expense is variable.',
      },
      {
        a: 'Pure Premium',
        b: 'Permissible Loss Ratio',
        relation: 'over',
        result: 'Pure Premium Method',
        why: 'The pure premium method grosses the pure premium up for variable expense and profit: $\\text{Indicated Rate} = (\\text{Pure Premium} + F) / (1 - V - Q_T)$.',
      },
      {
        a: 'Loss Ratio Method',
        b: 'Pure Premium Method',
        relation: 'equivalent',
        result: 'Overall Rate Level Indication',
        why: 'On consistent data the two methods give the same indication — the loss ratio is the pure premium over the average premium — and either answers the overall rate level question.',
      },
      {
        a: 'Overall Rate Level Indication',
        b: 'Complement of Credibility',
        relation: 'weighted',
        result: 'Rate Change',
        why: 'Where the data is thin, the indication is weighted against a complement — $Z \\times \\text{indication} + (1 - Z) \\times \\text{complement}$ — on the way to the rate change selected.',
      },
    ],
  },
  {
    id: 'exam-5-reserving-methods',
    exam: 'CAS-5',
    examPage: 'Exam 5 (CAS)',
    objectives: ['B. Estimating Claim Liabilities (Reserving)'],
    title: 'Unpaid claim estimation',
    blurb: 'From paid losses to Bornhuetter-Ferguson and Cape Cod.',
    primitives: ['Paid Losses', 'Case Reserves', 'Age to Age Factor', 'Tail Factor'],
    introduces: [
      { after: 'Incurred Losses', nodes: ['Accident Year'] },
      { after: 'Chain Ladder Method', nodes: ['Loss Ratio', 'Earned Premium'] },
    ],
    recipes: [
      {
        a: 'Paid Losses',
        b: 'Case Reserves',
        relation: 'plus',
        result: 'Incurred Losses',
        why: 'Reported (incurred) losses are payments to date plus case reserves on known claims: $\\text{Reported} = \\text{Paid} + \\text{Case}$.',
      },
      {
        a: 'Incurred Losses',
        b: 'Accident Year',
        relation: 'organized',
        result: 'Development Triangle',
        why: 'Cumulative losses laid out with accident years as rows and maturities as columns — each diagonal is one valuation date.',
      },
      {
        a: 'Age to Age Factor',
        b: 'Tail Factor',
        relation: 'times',
        result: 'Cumulative Development Factor',
        why: 'The age-to-ultimate factor is the product of every selected age-to-age factor from that age on, times the tail: $\\text{CDF}_n = \\left(\\prod_{k \\ge n} f_k\\right) \\times \\text{Tail}$.',
      },
      {
        a: 'Incurred Losses',
        b: 'Cumulative Development Factor',
        relation: 'times',
        result: 'Chain Ladder Method',
        why: 'The chain ladder projects each accident year to ultimate by scaling its latest reported amount: $U = C_n \\times \\text{CDF}_n$.',
      },
      {
        a: 'Paid Losses',
        b: 'Cumulative Development Factor',
        relation: 'times',
        result: 'Chain Ladder Method',
        why: 'The same projection on a paid triangle: paid losses to date times a paid CDF.',
      },
      {
        a: 'Chain Ladder Method',
        b: 'Incurred Losses',
        relation: 'minus',
        result: 'IBNR',
        why: 'IBNR is whatever the ultimate estimate holds beyond what has been reported: $\\text{IBNR} = U - \\text{Reported}$.',
      },
      {
        a: 'Incurred Losses',
        b: 'IBNR',
        relation: 'plus',
        result: 'Ultimate Loss',
        why: 'Every reserving method estimates the same total: $U = \\text{Reported} + \\text{IBNR}$.',
      },
      {
        a: 'IBNR',
        b: 'Case Reserves',
        relation: 'plus',
        result: 'Unpaid Claims',
        why: 'What is still to be paid splits into what is known and what is not: $\\text{Unpaid} = \\text{Case Reserves} + \\text{IBNR}$.',
      },
      {
        a: 'Loss Ratio',
        b: 'Earned Premium',
        relation: 'times',
        result: 'Expected Loss Method',
        why: 'The expected-loss method takes ultimate entirely from an a priori: an expected loss ratio times earned premium, $U = \\text{ELR} \\times \\text{EP}$.',
      },
      {
        a: 'Chain Ladder Method',
        b: 'Expected Loss Method',
        relation: 'weighted',
        result: 'Bornhuetter-Ferguson Method',
        why: 'BF is a credibility weighting of the two: $U_{BF} = Z\\,U_{CL} + (1 - Z)\\,U_0$ with $Z = 1/\\text{CDF}$, so the more of a year has emerged, the more it trusts the data.',
      },
      {
        a: 'Chain Ladder Method',
        b: 'Bornhuetter-Ferguson Method',
        relation: 'weighted',
        result: 'Benktander Method',
        why: 'Benktander runs BF again with the BF ultimate as the a priori, which is the chain ladder weighted against BF: $U_{GB} = \\tfrac{1}{\\text{CDF}}\\,U_{CL} + \\left(1 - \\tfrac{1}{\\text{CDF}}\\right) U_{BF}$.',
      },
      {
        a: 'Bornhuetter-Ferguson Method',
        b: 'Incurred Losses',
        relation: 'estimatedFrom',
        result: 'Cape Cod Method',
        why: 'Cape Cod is BF with its a priori loss ratio derived from the data itself: $\\text{ELR} = \\sum C_i \\big/ \\sum (\\text{EP}_i / \\text{CDF}_i)$.',
      },
    ],
  },
]

export function craftModuleById(id: string | undefined): CraftModule | undefined {
  return id ? CRAFT_MODULES.find(m => m.id === id) : undefined
}
