// The Community tab's events — meetings coming up, transcribed from each
// organiser's own page (docs/community.md): title, dates, venue and city as
// the page states them, and nothing it doesn't (a page naming no venue leaves
// `venue` null). `hybrid` is true only where the page offers a way to attend
// online. Where a page lists a meeting by date and venue alone — SEAC's
// conferences, the Chicago Actuarial Association's spring workshop — the title
// is the organiser's own name for it. `host` is a place id, or the organiser's
// name. Re-read the sources and prune what has passed when refreshing; past
// events are dropped from every list on their own (`upcomingEvents`).

import type { CommunityEvent } from '@/lib/community/places'

export const COMMUNITY_EVENTS: readonly CommunityEvent[] = [
  {
    "id": "soa-impact-2026",
    "title": "2026 SOA ImpACT Conference",
    "host": "Society of Actuaries",
    "start": "2026-10-25",
    "end": "2026-10-28",
    "venue": "David L. Lawrence Convention Center",
    "location": {
      "city": "Pittsburgh",
      "region": "PA",
      "country": "US",
      "lat": 40.4406,
      "lng": -79.9959
    },
    "virtual": false,
    "hybrid": false,
    "url": "https://www.soa.org/prof-dev/events/2026-annual-meeting/",
    "summary": "The SOA's annual conference for actuaries of every specialty and career stage, with sessions, networking and receptions.",
    "source": "https://www.soa.org/prof-dev/events/2026-annual-meeting/",
    "checked": "2026-10-19"
  },
  {
    "id": "cia-pension-investment-seminar-2026",
    "title": "2026 Pension and Investment Seminar",
    "host": "cia",
    "start": "2026-11-04",
    "end": "2026-11-05",
    "venue": null,
    "location": null,
    "virtual": true,
    "hybrid": false,
    "url": "https://www.cia-ica.ca/events/",
    "summary": "An annual CIA seminar on trends and emerging issues for pension and investment professionals across Canada, held virtually.",
    "source": "https://www.cia-ica.ca/events/",
    "checked": "2026-10-19"
  },
  {
    "id": "cas-annual-2026",
    "title": "2026 CAS Annual Meeting",
    "host": "Casualty Actuarial Society",
    "start": "2026-11-08",
    "end": "2026-11-11",
    "venue": "Hilton Hawaiian Village Waikiki Beach Resort",
    "location": {
      "city": "Honolulu",
      "region": "HI",
      "country": "US",
      "lat": 21.3069,
      "lng": -157.8583
    },
    "virtual": false,
    "hybrid": true,
    "url": "https://annual.casact.org",
    "summary": "The CAS's annual meeting; in-person registration is sold out and a livestream is offered.",
    "source": "https://www.casact.org/article/plan-ahead-cas-2026-event-schedule-announced",
    "checked": "2026-10-19"
  },
  {
    "id": "seac-fall-2026",
    "title": "Southeastern Actuaries Conference",
    "host": "seac",
    "start": "2026-11-18",
    "end": "2026-11-20",
    "venue": "The Westin",
    "location": {
      "city": "Chattanooga",
      "region": "TN",
      "country": "US",
      "lat": 35.0456,
      "lng": -85.3097
    },
    "virtual": false,
    "hybrid": false,
    "url": "https://www.seactuary.com/i4a/pages/index.cfm?pageid=1",
    "summary": "SEAC's next twice-yearly conference of education, discussion and networking.",
    "source": "https://www.seactuary.com/i4a/pages/index.cfm?pageid=1",
    "checked": "2026-10-19"
  },
  {
    "id": "achs-fall-2026",
    "title": "Fall 2026 ACHS Meeting",
    "host": "achs",
    "start": "2026-11-19",
    "end": null,
    "venue": "Connecticut Convention Center",
    "location": {
      "city": "Hartford",
      "region": "CT",
      "country": "US",
      "lat": 41.7658,
      "lng": -72.6734
    },
    "virtual": false,
    "hybrid": false,
    "url": "https://www.achsmembers.com/fall-2026-meeting.html",
    "summary": "The Actuaries' Club of Hartford & Springfield's fall meeting, with a published agenda of sessions.",
    "source": "https://www.achsmembers.com/fall-2026-meeting.html",
    "checked": "2026-10-19"
  },
  {
    "id": "canw-fall-2026",
    "title": "2026 Casualty Actuaries of the Northwest (CANW) Fall Meeting",
    "host": "canw",
    "start": "2026-11-20",
    "end": null,
    "venue": null,
    "location": {
      "city": "Vancouver",
      "region": "BC",
      "country": "CA",
      "lat": 49.2827,
      "lng": -123.1207
    },
    "virtual": false,
    "hybrid": false,
    "url": "https://www.casact.org/event/2026-casualty-actuaries-northwest-canw-fall-meeting",
    "summary": "CANW's fall meeting in Vancouver; the page gives the location as TBD.",
    "source": "https://www.casact.org/event/2026-casualty-actuaries-northwest-canw-fall-meeting",
    "checked": "2026-10-19"
  },
  {
    "id": "bace-fall-2026",
    "title": "2026 Buckeye Actuarial Continuing Education (BACE) Fall Meeting",
    "host": "bace",
    "start": "2026-11-20",
    "end": null,
    "venue": "Encova Insurance",
    "location": {
      "city": "Columbus",
      "region": "OH",
      "country": "US",
      "lat": 39.9612,
      "lng": -82.9988
    },
    "virtual": false,
    "hybrid": false,
    "url": "https://www.casact.org/event/2026-buckeye-actuarial-continuing-education-bace-fall-meeting",
    "summary": "BACE's fall meeting, with registration through the CAS portal.",
    "source": "https://www.casact.org/event/2026-buckeye-actuarial-continuing-education-bace-fall-meeting",
    "checked": "2026-10-19"
  },
  {
    "id": "wac-winter-2026",
    "title": "Winter 2026 Semi-Annual Meeting",
    "host": "winnipeg-actuaries-club",
    "start": "2026-11-30",
    "end": null,
    "venue": "Winnipeg Art Gallery",
    "location": {
      "city": "Winnipeg",
      "region": "MB",
      "country": "CA",
      "lat": 49.8951,
      "lng": -97.1384
    },
    "virtual": false,
    "hybrid": false,
    "url": "https://www.wpgactclub.com/",
    "summary": "The Winnipeg Actuaries Club's semi-annual meeting, 11:30 AM to 1:30 PM.",
    "source": "https://www.wpgactclub.com/",
    "checked": "2026-10-19"
  },
  {
    "id": "cas-ai-in-action-2026",
    "title": "2026 CAS AI in Action: Practical Innovations Transforming Actuarial Practice Seminar",
    "host": "Casualty Actuarial Society",
    "start": "2026-12-01",
    "end": null,
    "venue": null,
    "location": null,
    "virtual": true,
    "hybrid": false,
    "url": "https://www.casact.org/event/2026-cas-ai-action-practical-innovations-transforming-actuarial-practice-seminar",
    "summary": "A one-day virtual seminar on GoToWebinar about how artificial intelligence is reshaping actuarial practice.",
    "source": "https://www.casact.org/event/2026-cas-ai-action-practical-innovations-transforming-actuarial-practice-seminar",
    "checked": "2026-10-19"
  },
  {
    "id": "camar-fall-2026",
    "title": "2026 Casualty Actuaries of the Mid-Atlantic Region (CAMAR) Virtual Fall Meeting",
    "host": "camar",
    "start": "2026-12-02",
    "end": null,
    "venue": null,
    "location": null,
    "virtual": true,
    "hybrid": false,
    "url": "https://www.casact.org/event/2026-casualty-actuaries-mid-atlantic-region-camar-virtual-fall-meeting",
    "summary": "CAMAR's fall meeting, held virtually.",
    "source": "https://www.casact.org/event/2026-casualty-actuaries-mid-atlantic-region-camar-virtual-fall-meeting",
    "checked": "2026-10-19"
  },
  {
    "id": "soa-virtual-cpd-roundup-2026",
    "title": "2026 SOA Virtual CPD Roundup",
    "host": "Society of Actuaries",
    "start": "2026-12-02",
    "end": "2026-12-03",
    "venue": null,
    "location": null,
    "virtual": true,
    "hybrid": false,
    "url": "https://www.soa.org/prof-dev/events/2026-cpd-virtual/",
    "summary": "Two half-days of virtual sessions to help actuaries complete their learning before year end.",
    "source": "https://www.soa.org/prof-dev/events/2026-cpd-virtual/",
    "checked": "2026-10-19"
  },
  {
    "id": "cas-canada-connection-2026",
    "title": "2026 CAS Canada Connection",
    "host": "Casualty Actuarial Society",
    "start": "2026-12-03",
    "end": null,
    "venue": "Vogue Hotel Montreal Downtown, Curio Collection by Hilton",
    "location": {
      "city": "Montréal",
      "region": "QC",
      "country": "CA",
      "lat": 45.5019,
      "lng": -73.5674
    },
    "virtual": false,
    "hybrid": false,
    "url": "https://www.casact.org/event/2026-cas-canada-connection",
    "summary": "A one-day in-person event celebrating new Canadian CAS members, with continuing education on Canada's P&C insurance landscape.",
    "source": "https://www.casact.org/event/2026-cas-canada-connection",
    "checked": "2026-10-19"
  },
  {
    "id": "soa-china-symposium-2026",
    "title": "2026 SOA China Symposium",
    "host": "Society of Actuaries",
    "start": "2026-12-11",
    "end": null,
    "venue": null,
    "location": {
      "city": "Beijing",
      "region": null,
      "country": "CN",
      "lat": 39.9042,
      "lng": 116.4074
    },
    "virtual": false,
    "hybrid": false,
    "url": "https://www.soa.org/prof-dev/events/2026-china-symposium/",
    "summary": "Listed in the SOA's professional development calendar for Beijing, China.",
    "source": "https://www.soa.org/pdopportunities",
    "checked": "2026-10-19"
  },
  {
    "id": "asna-2027",
    "title": "ANÉA-ASNA 2027",
    "host": "asna",
    "start": "2027-01-15",
    "end": "2027-01-17",
    "venue": "Le Centre Sheraton Montreal Hotel",
    "location": {
      "city": "Montréal",
      "region": "QC",
      "country": "CA",
      "lat": 45.5019,
      "lng": -73.5674
    },
    "virtual": false,
    "hybrid": false,
    "url": "https://anea-asna.ca/registration2027/",
    "summary": "The Actuarial Students' National Association's annual convention, with registration open.",
    "source": "https://anea-asna.ca/registration2027/",
    "checked": "2026-10-19"
  },
  {
    "id": "refocus-2027",
    "title": "2027 ReFocus Conference",
    "host": "Society of Actuaries",
    "start": "2027-03-07",
    "end": "2027-03-10",
    "venue": null,
    "location": {
      "city": "Las Vegas",
      "region": "NV",
      "country": "US",
      "lat": 36.1699,
      "lng": -115.1398
    },
    "virtual": false,
    "hybrid": false,
    "url": "https://www.soa.org/prof-dev/events/2027-refocus/",
    "summary": "An annual global conference for senior life insurance and reinsurance executives, hosted jointly by ACLI and the SOA.",
    "source": "https://www.soa.org/prof-dev/events/2027-refocus/",
    "checked": "2026-10-19"
  },
  {
    "id": "cas-rpm-2027",
    "title": "Ratemaking, Product and Modeling Seminar",
    "host": "Casualty Actuarial Society",
    "start": "2027-03-15",
    "end": "2027-03-17",
    "venue": "Signia by Hilton Indianapolis",
    "location": {
      "city": "Indianapolis",
      "region": "IN",
      "country": "US",
      "lat": 39.7684,
      "lng": -86.1581
    },
    "virtual": false,
    "hybrid": false,
    "url": "https://rpm.casact.org",
    "summary": "The CAS's ratemaking, product and modeling seminar; workshops begin March 14.",
    "source": "https://rpm.casact.org/program",
    "checked": "2026-10-19"
  },
  {
    "id": "caa-spring-workshop-2027",
    "title": "Spring Workshop",
    "host": "chicago-actuarial-association",
    "start": "2027-05-11",
    "end": null,
    "venue": null,
    "location": {
      "city": "Chicago",
      "region": "IL",
      "country": "US",
      "lat": 41.8781,
      "lng": -87.6298
    },
    "virtual": false,
    "hybrid": false,
    "url": "https://www.chicagoactuarialassociation.org/",
    "summary": "The Chicago Actuarial Association's spring workshop in downtown Chicago, for meeting local actuaries and earning continuing education credits.",
    "source": "https://www.chicagoactuarialassociation.org/",
    "checked": "2026-10-19"
  },
  {
    "id": "cas-spring-2027",
    "title": "2027 CAS Spring Meeting",
    "host": "Casualty Actuarial Society",
    "start": "2027-05-16",
    "end": "2027-05-19",
    "venue": "Sheraton Grand Chicago Riverwalk",
    "location": {
      "city": "Chicago",
      "region": "IL",
      "country": "US",
      "lat": 41.8781,
      "lng": -87.6298
    },
    "virtual": false,
    "hybrid": false,
    "url": "https://www.casact.org/event/2027-cas-spring-meeting",
    "summary": "The CAS's spring meeting.",
    "source": "https://www.casact.org/event/2027-cas-spring-meeting",
    "checked": "2026-10-19"
  },
  {
    "id": "cas-reinsurance-2027",
    "title": "Seminar on Reinsurance",
    "host": "Casualty Actuarial Society",
    "start": "2027-06-01",
    "end": "2027-06-03",
    "venue": "Fairmont Washington D.C. Georgetown",
    "location": {
      "city": "Washington",
      "region": "DC",
      "country": "US",
      "lat": 38.9072,
      "lng": -77.0369
    },
    "virtual": false,
    "hybrid": false,
    "url": "https://www.casact.org/event/seminar-reinsurance-0",
    "summary": "The CAS's seminar on reinsurance.",
    "source": "https://www.casact.org/event/seminar-reinsurance-0",
    "checked": "2026-10-19"
  },
  {
    "id": "cia-annual-2027",
    "title": "2027 CIA Annual Conference",
    "host": "cia",
    "start": "2027-06-16",
    "end": "2027-06-18",
    "venue": null,
    "location": {
      "city": "Charlottetown",
      "region": "PE",
      "country": "CA",
      "lat": 46.2382,
      "lng": -63.1311
    },
    "virtual": false,
    "hybrid": false,
    "url": "https://www.cia-ica.ca/events/",
    "summary": "The CIA's premier professional development event, a two-and-a-half-day program; registration opens in February 2027.",
    "source": "https://www.cia-ica.ca/events/",
    "checked": "2026-10-19"
  },
  {
    "id": "seac-spring-2027",
    "title": "Southeastern Actuaries Conference",
    "host": "seac",
    "start": "2027-06-23",
    "end": "2027-06-25",
    "venue": "Sunseeker Resort",
    "location": {
      "city": "Punta Gorda",
      "region": "FL",
      "country": "US",
      "lat": 26.9298,
      "lng": -82.0454
    },
    "virtual": false,
    "hybrid": false,
    "url": "http://www.seactuary.com/i4a/pages/index.cfm?pageid=3294",
    "summary": "Listed among SEAC's future meetings.",
    "source": "http://www.seactuary.com/i4a/pages/index.cfm?pageid=3294",
    "checked": "2026-10-19"
  },
  {
    "id": "soa-health-2027",
    "title": "2027 SOA Health Meeting",
    "host": "Society of Actuaries",
    "start": "2027-06-27",
    "end": "2027-06-30",
    "venue": "JW Marriott Desert Ridge Resort & Spa",
    "location": {
      "city": "Phoenix",
      "region": "AZ",
      "country": "US",
      "lat": 33.4484,
      "lng": -112.074
    },
    "virtual": false,
    "hybrid": false,
    "url": "https://www.soa.org/prof-dev/events/2027-health/",
    "summary": "The SOA's annual meeting where health actuaries gather on industry trends and exchange ideas.",
    "source": "https://www.soa.org/prof-dev/events/2027-health/",
    "checked": "2026-10-19"
  },
  {
    "id": "soa-valact-2027",
    "title": "2027 SOA Valuation Actuary Meeting",
    "host": "Society of Actuaries",
    "start": "2027-08-22",
    "end": "2027-08-25",
    "venue": "Marriott Marquis Washington, DC",
    "location": {
      "city": "Washington",
      "region": "DC",
      "country": "US",
      "lat": 38.9072,
      "lng": -77.0369
    },
    "virtual": false,
    "hybrid": false,
    "url": "https://www.soa.org/prof-dev/events/2027-valact/",
    "summary": "The SOA's annual meeting for valuation actuaries on developments in valuation and financial reporting practice.",
    "source": "https://www.soa.org/prof-dev/events/2027-valact/",
    "checked": "2026-10-19"
  },
  {
    "id": "cas-annual-2027",
    "title": "2027 CAS Annual Meeting",
    "host": "Casualty Actuarial Society",
    "start": "2027-11-07",
    "end": "2027-11-10",
    "venue": "Hilton Orlando",
    "location": {
      "city": "Orlando",
      "region": "FL",
      "country": "US",
      "lat": 28.5384,
      "lng": -81.3789
    },
    "virtual": false,
    "hybrid": false,
    "url": "https://www.casact.org/event/2027-cas-annual-meeting",
    "summary": "The CAS's annual meeting.",
    "source": "https://www.casact.org/event/2027-cas-annual-meeting",
    "checked": "2026-10-19"
  },
  {
    "id": "soa-impact-2027",
    "title": "2027 SOA ImpACT Conference",
    "host": "Society of Actuaries",
    "start": "2027-11-07",
    "end": "2027-11-10",
    "venue": null,
    "location": {
      "city": "Toronto",
      "region": "ON",
      "country": "CA",
      "lat": 43.6532,
      "lng": -79.3832
    },
    "virtual": false,
    "hybrid": false,
    "url": "https://www.soa.org/prof-dev/events/2027-annual-meeting-exhibit/",
    "summary": "Listed in the SOA's professional development calendar for Toronto, Canada.",
    "source": "https://www.soa.org/pdopportunities",
    "checked": "2026-10-19"
  },
  {
    "id": "seac-fall-2027",
    "title": "Southeastern Actuaries Conference",
    "host": "seac",
    "start": "2027-11-17",
    "end": "2027-11-19",
    "venue": "The Battle House Renaissance",
    "location": {
      "city": "Mobile",
      "region": "AL",
      "country": "US",
      "lat": 30.6954,
      "lng": -88.0399
    },
    "virtual": false,
    "hybrid": false,
    "url": "http://www.seactuary.com/i4a/pages/index.cfm?pageid=3294",
    "summary": "Listed among SEAC's future meetings.",
    "source": "http://www.seactuary.com/i4a/pages/index.cfm?pageid=3294",
    "checked": "2026-10-19"
  }
]
