# Research

## Discovery

Build the candidate list from several sources, then dedupe by name and address.

1. **State licensing search by zip.** In California: <https://www.ccld.dss.ca.gov/carefacilitysearch/>, facility type "Child Care Center", search the home zip and neighboring zips. This list is complete for licensed centers and gives the facility number you'll need later. Other states: search "<state> child care licensing search".
2. **Web search** for "preschool near <neighborhood>", "<approach> preschool <city>", and "nursery school <zip>".
3. **Local directories and listings**: city early-education departments, Winnie, parent-forum threads. Treat these as leads only.
4. **Schools the family named.** Always include them.

Drop home daycares unless the family wants them, and drop programs that don't serve the child's age at the start date. Compute distances with `node scripts/distance.mjs` or any geocoder; report straight-line miles and a rough walk time, and say they're estimates.

## Per school

Visit the school's own site first. Most have pages named Admissions, Apply, Tuition, Programs, FAQ, Our Team or Faculty, and a kindergarten or "where our graduates go" page. Read them all for finalists.

| Field | Where | Watch for |
| --- | --- | --- |
| Programs, ages, hours | Programs, FAQ | Age cutoffs ("must be 2.9 by Sept 1"), toilet-training rules, half vs full day, extended care |
| Tuition | Tuition page; sometimes only an image or PDF | Year it applies to; fees, deposits, giving expectations. Label third-party figures |
| Ratio, group size | FAQ, About | "1:4" claims vs licensed capacity; ask how many adults are on the floor at pickup |
| Admissions | Admissions, Apply | Rolling vs annual cycle, tour required, application fee, essay prompts and word limits, sibling/alumni priority, notification date |
| Dates | Admissions | Only this cycle's dates are "confirmed". Last year's dates are "to-confirm" |
| K placement | "Kindergarten", "Where graduates go" | Published counts beat named lists; named lists beat "our families go to many great schools" |
| Teachers | Faculty or Team page | Tenure, degrees; many long-tenured teachers is a strong signal |
| Leadership | About, Team | Director's start year; three directors in four years is a flag |

## Licensing record (California)

The search page <https://www.ccld.dss.ca.gov/carefacilitysearch/> is often down (503). Its JSON API behind it is more reliable; use it directly (send a browser-like user-agent):

| What | URL |
| --- | --- |
| Centers in a zip | `https://www.ccld.dss.ca.gov/transparencyapi/api/FacilitySearch?facType=850&facility=&Street=&city=&zip=94110&county=&facnum=` (850 = child care centers; all the empty parameters are required) |
| One facility | `https://www.ccld.dss.ca.gov/transparencyapi/api/FacilityDetail/<facility number>` |
| One visit report | `https://www.ccld.dss.ca.gov/transparencyapi/api/FacilityReports?facNum=<facility number>&inx=<n>` (HTML; n counts from 1; some visits have no report) |

`FacilityDetail` gives capacity, licensed ages and hours (`COMMENTS`), the last visit, and citation counts split three ways: `NBRINSPTYPA`/`B` (inspections), `NBRCMPLTTYPA`/`B` (complaints) and `NBROTHERTYPA`/`B` (other visits). For the report, `typeA` is the sum of the three A counts and `typeB` the sum of the three B counts. Read the visit reports for every finalist to learn what each citation was about.

- **Type A** citations are immediate risk to health or safety (for example a child left unsupervised). Any Type A in the record fails gate g2 unless the parents are satisfied with the school's answer.
- **Type B** citations are lower risk (paperwork, a missing outlet cover). Several on supervision or ratios is still a pattern worth asking about.
- **Window:** use whatever the state publishes, which is usually the last three to five years. Say the window in the summary, for example "no citations in visits since 2021".
- Summarize in one plain sentence, and put the facility number and the `FacilityDetail` URL in `licensing`.

If the state is unreachable, mirrors such as readyrule.com or schoolscope.co republish the same records; cite the mirror and say so.

Licensing records are also a quick check of a school's own claims: capacity versus stated class sizes, and licensed hours versus advertised hours.

Outside California, use the state's licensing lookup and map its categories to "serious" and "minor" in the summary.

## Finances (nonprofits)

Most independent preschools are 501(c)(3) nonprofits and file IRS Form 990, which is public.

1. Find the EIN: `node scripts/propublica.mjs search "<name>" CA`. Try the legal name, shorter names, and "nursery school". Church-run schools often file under the church and won't appear; set `status: "church"` and `tier: "unknown"`.
2. Pull the history: `node scripts/propublica.mjs filings <EIN>`.
3. Judge, using the newest year with figures (the script prints it first and warns if newer filings lack figures):
   - **fragile**: negative net assets, two or more deficit years in the last three, or prepaid tuition exceeding cash
   - **strong**: net assets above a year of expenses and no deficit in the newest year
   - **steady**: anything in between
   - **unknown**: for-profit, church-run or no filings. Say "no visibility", not "weak"

   Check fragile first; if any fragile condition holds, the tier is fragile however large the assets. Large liabilities on their own are not fragile: a mortgage on a building the school owns usually comes with matching assets. When liabilities jump (for example from $150K to $6M), find out why (a building purchase, a loan, deferred revenue), say so in `flags`, and if you can't tell, flag it as a tour question.
4. Cash months: if the filing PDF or XML shows cash plus savings (Part X lines 1 and 2), divide by monthly expenses. Otherwise estimate from net assets and say so.
5. Useful signals for longevity: falling program revenue, falling payroll or headcount (Part I line 5), officer pay that jumped, related-party transactions (Schedule L), PPP or SBA loans.

For-profit schools (LLCs, franchises) file nothing public. Ask on the tour how long they've been operating, whether they own or lease, and when the lease ends.

## Closure risk

Set `longevity.risk` to low, medium, high or unknown with one sentence of why. High means two or more of: fragile finances, shrinking enrollment or payroll, leadership churn, an expiring lease, a substantiated serious complaint. Many small schools close quietly; parents care most about whether the school survives until their child moves on.

## Optional deep dives (finalists only, if time allows)

- **Who owns the building**: county assessor or recorder records by address. A school that owns its building is more durable than one on a short lease.
- **Kindergarten admissions to the family's named targets**: ask the target schools' admissions pages which preschools they draw from; some publish feeder lists.
