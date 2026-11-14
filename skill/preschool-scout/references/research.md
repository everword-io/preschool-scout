# Research

## Discovery

Build the candidate list from several sources, then dedupe by name and address.

1. **State licensing search by zip.** The state guide in `states/` gives the query. Search the home zip and its neighbors. This list is complete for licensed centers and gives the license numbers you'll need later.
2. **Public programs.** See "Public programs" below.
3. **Web search** for "preschool near <neighborhood>", "<approach> preschool <city>", and "nursery school <zip>".
4. **Local directories and listings**: city early-education departments, Winnie, parent-forum threads. Treat these as leads only.
5. **Schools the family named.** Always include them.

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

## Licensing record

Open `states/<two-letter code>.md` for the family's state (`states/README.md` lists them). It gives the data source, the exact queries, and how the state's violation categories map to the report's `licensing.serious` and `licensing.minor` counts. For a state with no guide, follow "A state with no guide" in `states/README.md`.

For every finalist:

- Find the program's record by its license or facility number, and confirm the license is active at the same address.
- Count serious and minor violations over the window the state publishes, and say the window in `licensing.summary`, for example "no serious violations in visits since 2021".
- Read the report behind every serious violation, and any minor ones about supervision, ratios or safety, so the summary can say what happened.
- A violation the state itself ranks as serious fails gate g2 unless the parents are satisfied with the school's answer. Where the state has no severity tiers and you classified a finding yourself, set `licensing.basis: "researcher"`, say so in the summary, and treat it as a g2 question for the tour, not an automatic fail.
- Put the facility number and a link to the record in `licensing`.
- If you couldn't reach the record, or it only covers part of the window, set `licensing.unavailable: true`, leave the counts out and say what's missing. A missing count must never read as zero.

Licensing records are also a quick check of a school's own claims: capacity versus stated class sizes, and licensed hours versus advertised hours.

Public school programs (TK, district pre-K) are often not licensed as child care. Set `licensing.exempt: true` with a one-line summary instead of leaving the record blank, so parents can tell "exempt" from "not found".

## Public programs

Include free and public options alongside independent schools unless the family says not to. They are often what a family most needs to know about, and a report that leaves them out steers people toward tuition.

1. **The state's pre-K and TK programs.** The state guide lists them with eligibility. Otherwise search for the state's universal or public preschool program by name (for example "<state> universal preschool", "<state> public pre-K eligibility") on the state education or early childhood department's site. Many states also have tuition credits or subsidies; keep those separate from free seats. Find which nearby schools or centers offer seats.
   Zip codes cross school district lines. Ask the family which district they live in, or use the district's official boundary lookup, before naming district programs. The street address stays out of the report.
2. **City programs**, where they exist (New York City's 3-K and Pre-K for All, for example).
3. **Head Start.** Search the [Head Start Center Locator](https://headstart.gov/center-locator) by zip code. It may block non-browser clients; if so, search the web for "Head Start <city>" and the grantee's own site.

For each public program, record in `public`: the program type, who is eligible (age cutoff, income or other criteria, in the program's own terms), how enrollment works (district lottery, application window, first come), the enrollment dates for the start year, and the cost (usually free; note any fee for extended hours). Add enrollment dates to `deadlines`.

Set `public.eligible` to "age-eligible" only when age and residency are the whole test and the child meets them. Anything that depends on income, benefits, housing, foster care, disability, military service or language is "may qualify", with the program's criteria listed generically. Never say which of those the family meets, and never put their income in the report. Eligibility is not a seat: don't promise a seat, a site or a schedule unless the program itself guarantees it for this cycle.

Public programs don't file Form 990s: set `finances.status: "public"`. A Head Start grantee may be a nonprofit with its own filing, but that filing covers many sites; mention it only as context.

## Finances (nonprofits)

Most independent preschools are 501(c)(3) nonprofits and file IRS Form 990, which is public.

1. Find the EIN: `node scripts/propublica.mjs search "<name>" <STATE>`. Try the legal name, shorter names, and "nursery school". Church-run schools often file under the church and won't appear; set `status: "church"` and `tier: "unknown"`.
2. Pull the history: `node scripts/propublica.mjs filings <EIN>`.
3. Judge, using the newest year with figures (the script prints it first and warns if newer filings lack figures):
   - **fragile**: negative net assets, two or more deficit years in the last three, or prepaid tuition exceeding cash
   - **strong**: net assets above a year of expenses and no deficit in the newest year
   - **steady**: anything in between
   - **unknown**: for-profit, church-run or no filings. Say "no visibility", not "weak"
   - Public programs (TK, district pre-K): `status: "public"`, `tier: "unknown"`; the summary says they are publicly funded

   Check fragile first; if any fragile condition holds, the tier is fragile however large the assets. Large liabilities on their own are not fragile: a mortgage on a building the school owns usually comes with matching assets. When liabilities jump (for example from $150K to $6M), find out why (a building purchase, a loan, deferred revenue), say so in `flags`, and if you can't tell, flag it as a tour question.
4. Cash months: if the filing PDF or XML shows cash plus savings (Part X lines 1 and 2), divide by monthly expenses. Otherwise estimate from net assets and say so.
5. Useful signals for longevity: falling program revenue, falling payroll or headcount (Part I line 5), officer pay that jumped, related-party transactions (Schedule L), PPP or SBA loans.

For-profit schools (LLCs, franchises) file nothing public. Ask on the tour how long they've been operating, whether they own or lease, and when the lease ends.

## Closure risk

Set `longevity.risk` to low, medium, high or unknown with one sentence of why. High means two or more of: fragile finances, shrinking enrollment or payroll, leadership churn, an expiring lease, a substantiated serious complaint. Many small schools close quietly; parents care most about whether the school survives until their child moves on.

## Optional deep dives (finalists only, if time allows)

- **Who owns the building**: county assessor or recorder records by address. A school that owns its building is more durable than one on a short lease.
- **Kindergarten admissions to the family's named targets**: ask the target schools' admissions pages which preschools they draw from; some publish feeder lists.
