# California

Last checked: 2026-11-13.

## Licensing record

- **Agency:** California Department of Social Services, Community Care Licensing Division. Search page: <https://www.ccld.dss.ca.gov/carefacilitysearch/>
- **Open data:** the search page is often down (503), but the JSON service behind it answers reliably. Use it directly with a plain, honest user-agent such as `preschool-scout/0.3`.
- **Window:** the state shows recent years of visits, usually three to five. Say the window in each summary, for example "no citations in visits since 2021".

| What | URL |
| --- | --- |
| Centers in a zip | `https://www.ccld.dss.ca.gov/transparencyapi/api/FacilitySearch?facType=850&facility=&Street=&city=&zip=94110&county=&facnum=` (850 = child care centers; every empty parameter is required) |
| One facility | `https://www.ccld.dss.ca.gov/transparencyapi/api/FacilityDetail/<facility number>` |
| One visit report | `https://www.ccld.dss.ca.gov/transparencyapi/api/FacilityReports?facNum=<facility number>&inx=<n>` (HTML; n counts from 1; some visits have no report) |

`FacilityDetail` gives capacity, licensed ages and hours (`COMMENTS`), the last visit, and citation counts split three ways: `NBRINSPTYPA`/`B` (inspections), `NBRCMPLTTYPA`/`B` (complaints) and `NBROTHERTYPA`/`B` (other visits). `serious` is the sum of the three A counts and `minor` the sum of the three B counts. Read the visit reports for every finalist to learn what each citation was about.

### Violation categories

| State term | Meaning (the facility search's own wording) | Report field |
| --- | --- | --- |
| Type A | "the most serious type of violations in which there is an immediate risk to the health, safety or personal rights of those in care" | `serious` |
| Type B | a violation that, if not corrected, may become an immediate risk; examples include faulty record keeping and inadequate staff training | `minor` |

Any Type A fails gate g2 unless the parents are satisfied with the school's answer. Several Type B citations on supervision or ratios is still a pattern worth asking about. If the state is unreachable, mirrors such as readyrule.com republish the same records; cite the mirror and say so.

## Quality ratings

Quality Counts California is the state's rating system; participation is voluntary and ratings are published by county. Treat a rating as one input, not a verdict.

## Public programs

| Program | Who is eligible | How to find sites and enroll |
| --- | --- | --- |
| Transitional kindergarten (TK) | Children who turn four on or before September 1 (from the 2025-26 school year). Free and optional. | Through the school district, or a charter school that offers TK. <https://www.cde.ca.gov/ci/gs/em/kinderfaq.asp> |
| California State Preschool Program (CSPP) | Mostly income-based, for three- and four-year-olds; free or low cost | Contractors list sites; search "<county> California State Preschool Program" or ask the county child care resource and referral agency |
| Head Start | Income, homelessness, foster care, some public benefits | <https://headstart.gov/center-locator> |

TK in a public school is not licensed as child care, so it has no CCLD record. Set `licensing.exempt: true` with a summary saying so. A CSPP or Head Start site in a licensed center does have one.

## Sources

- <https://www.ccld.dss.ca.gov/carefacilitysearch/>
- <https://www.cde.ca.gov/ci/gs/em/kinderfaq.asp>
- <https://headstart.gov/center-locator>
