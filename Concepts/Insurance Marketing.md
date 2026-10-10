---
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:8e6415fd998cd6e3ba7acdcdc6fe6b46d76e5630e7db52b94fac0ac7f3f6fd34
  sources: []
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Insurance Marketing.md
---

**Insurance Marketing** is the set of activities by which an [[Insurer|insurer]] learns what customers need, decides which customers to serve, and develops, promotes and keeps selling the products that meet those needs at a profit. An insurer's main marketing activities are market research, target marketing, advertising and promotion, customer relationship management and product development. Marketing decides who the customers are, and [[Insurance Distribution Systems|distribution]] decides how they are reached.

> $$\text{CLV} = \sum_{t=1}^{\infty} \frac{m\, r^{t-1}}{(1+i)^t} - A$$

> $$\text{CLV} = \frac{m}{1 + i - r} - A$$

> $$\text{CPA} = \frac{\text{Campaign cost}}{\text{New policies}}$$

- **Symbols:** Customer lifetime value (CLV) is the [[Present Value|present value]] of the margin a customer brings over the life of the relationship, less the cost of acquiring them. $m$ is the annual margin per customer after losses and expenses, received at the end of each policy year, $r$ is the retention rate at each renewal, $i$ is the discount rate and $A$ is the acquisition cost. The second form is the sum of the geometric series, valid when $r < 1 + i$. CPA is the cost per acquired policy of a campaign.
- **Market research:** The insurer gathers information about customers, competitors and the market to find unmet needs and judge whether a product will sell. Sources include its own policy and claims data, surveys and focus groups, producers' reports from the field, and industry and government statistics.
- **Target marketing:** Rather than selling everything to everyone, the insurer divides the market into segments with similar needs, such as by geography, demographics, life stage, type of business or buying behaviour, and chooses the segments it can serve profitably. It then positions its products and prices for those segments. Segmentation for marketing chooses whom to pursue, while [[Classification Ratemaking|risk classification]] in rating decides what each risk pays.
- **Advertising and promotion:** Advertising builds awareness of the insurer's brand and products, and promotion supports sales through producers, sponsorships, and digital and social media campaigns. Direct response insurers rely on it most, because advertising is how their customers find them.
- **Customer relationship management:** CRM uses data on each customer's policies, contacts and claims to serve them well, keep them at renewal and offer them other products they need. Retention is valuable because, as the CLV formula shows, a customer kept for longer spreads the acquisition cost over more years of margin.
- **Product development:** Marketing identifies the needs a new or revised product should meet, and it works with underwriting, actuarial, claims, legal and compliance to design, price, file and launch it. The [[Product Development Process|product development process]] describes the steps.
- **Constraints:** Insurance marketing works within [[Market Conduct Regulation|market conduct regulation]], which prohibits misrepresenting policies, unfair discrimination and unfair inducements, and within [[Risk Classification Restrictions|limits on rating variables]] that some jurisdictions apply to targeting and pricing.

> [!example]- Choosing a Target Segment by Lifetime Value {Example}
> A personal lines insurer is choosing between two segments for a new marketing campaign. With illustrative figures, young renters buying online bring an annual margin of \$60, renew at 70% and cost \$120 to acquire. Homeowners who bundle auto and home bring a margin of \$150, renew at 88% and cost \$350 to acquire, much of it in producer commission and advertising. Using a 5% discount rate, find the CLV of a customer in each segment.
>
> > [!answer]-
> > $$
> > \begin{align*}
> > \text{CLV}_{\text{renters}} &= \frac{60}{1.05 - 0.70} - 120 \\
> > &= 171.43 - 120 \\
> > &= 51.43 \\
> > \text{CLV}_{\text{bundled}} &= \frac{150}{1.05 - 0.88} - 350 \\
> > &= 882.35 - 350 \\
> > &= 532.35
> > \end{align*}
> > $$
> > A bundled homeowner is worth about ten times as much as a young renter, even though it costs nearly three times as much to acquire. Retention drives the difference: at 88%, the margin is earned for many more years. The insurer might still market to renters as a way to win them as future homeowners, but that is a bet on retention that the research should check.

> [!example]- Judging a Campaign by Cost per Acquisition {Example}
> The insurer spends \$400,000 on a digital campaign aimed at the bundled segment. It produces 2,500 quotes, of which 20% become policies. Using the CLV from the previous example before acquisition cost (\$882.35), and supposing the campaign is the only acquisition cost, is the campaign worth running?
>
> > [!answer]-
> > $$
> > \begin{align*}
> > \text{New policies} &= 0.20 \times 2{,}500 \\
> > &= 500 \\
> > \text{CPA} &= \frac{400{,}000}{500} \\
> > &= 800
> > \end{align*}
> > $$
> > Each new customer costs \$800 and is worth \$882.35 before acquisition cost, so the campaign adds about \$82 of value per customer, or about \$41,000 in total. The margin is thin: a retention rate a few points lower, or a lower quote-to-policy rate, would make it unprofitable, so the insurer should track both against the assumptions.

> [!tip]- How it appears on the exam
> - **DISC-RM:** The marketing and distribution section covers insurer marketing activities. Questions describe an activity, such as a survey of small business owners, a campaign aimed at new homeowners or a loyalty program, and ask which marketing activity it is.
> - **DISC-RM:** Application questions ask how an insurer should identify a target market or respond to a change in customer needs, and how marketing relates to distribution, underwriting and product development.

> [!warning]- Exam traps
> - **Marketing is not selling:** Selling is one part of marketing. Market research, targeting, CRM and product development all come before or after the sale, and an answer that equates marketing with producers selling policies is incomplete.
> - **Targeting is not rating:** Choosing which segments to market to is a marketing decision. Charging each risk the right rate is an underwriting and pricing decision, governed by rating rules and regulation.
> - **Acquisition is not the whole cost:** Comparing segments on acquisition cost alone ignores how long the customer stays. A cheaper customer who leaves after a year can be worth less than an expensive one who stays for ten.
> - **Retention in the formula:** In the CLV formula, the retention rate multiplies the margin for each additional year, so $r$ enters the denominator as $1 + i - r$. Using $1 - r$ ignores discounting and overstates the value.
