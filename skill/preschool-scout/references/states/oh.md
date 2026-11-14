# Ohio

Last checked: 2026-11-13.

## Licensing record

- **Agency:** Ohio Department of Children and Youth. Search: <https://childcaresearch.ohio.gov/>
- **Open data:** none found. The site's export needs a login, so search the site instead.

| What | How |
| --- | --- |
| Programs near a zip | On the search page, enter the zip code and choose a program type: "Licensed Child Care Center" or "Licensed School-Based Preschool". The form needs a real browser. With only a page fetcher you can't list every program near a zip: say so in `caveats`, gather names from other discovery sources, and confirm each one on its provider page (search the web for `site:childcaresearch.ohio.gov <program name>`). |
| One program | `https://childcaresearch.ohio.gov/provider/<program number>/` (license number without leading zeros, for example `2190019834`). It shows the license, hours, accreditations and the SUTQ rating. |
| Its inspections | `https://childcaresearch.ohio.gov/inspections/<program number>`: plain text for each visit (date, type such as ANNUAL or COMPLAINT, "Original Inspection Compliance Status" such as Partially Compliant, and "Inspection Corrective Action Status" such as Non-Compliance - Fully Addressed), with a link to the full report. |
| One inspection report | PDFs at `https://childcaresearch.ohio.gov/pdf/<12-digit license number>_<YYYY-MM-DD>_<TYPE>.pdf`, where TYPE is ANNUAL, COMPLAINT, COMPLIANCE, PROVISIONAL and so on. Older reports are removed, so take the links from the inspections page rather than guessing dates. |

The full reports are scanned images with no text layer (checked 2026-11-13), so reading them needs a tool that reads PDF pages as images. Without one, report each visit's compliance and corrective-action status from the inspections page, set `licensing.unavailable: true` for the risk counts, and say so. Each inspection report has a summary: rules verified, rules with noncompliance, and how many findings were serious, moderate and low risk. Count over the reports the inspections page actually lists, and give their date range. (Separately, Ohio reviews noncompliance over a rolling 12 months for ratings, and serious or moderate findings can lower a rating.)

### Violation categories

| State term | Report field |
| --- | --- |
| Serious risk | `serious` |
| Moderate risk, Low risk | `minor` |

Read every serious finding for finalists, and look for repeated moderate findings on supervision or ratios.

## Quality ratings

Step Up To Quality (SUTQ) rates licensed programs Bronze, Silver or Gold, shown on each provider page. A program must be rated to provide publicly funded child care (with some exemptions), so a missing rating usually means a program outside that system.

## Public programs

| Program | Who is eligible | How to find sites and enroll |
| --- | --- | --- |
| Public school preschool | District preschools serve children with disabilities and often enroll typically developing peers, sometimes for tuition | The school district. These appear in the search as "Licensed School-Based Preschool" and have inspection records. |
| Early Childhood Education (ECE) grant slots | Free state-funded preschool slots for income-eligible three- and four-year-olds at participating schools and centers | The Ohio Department of Children and Youth's current ECE materials for eligibility, then the district or provider for seats. Treat web search results as leads. |
| Head Start | Income, homelessness, foster care, some public benefits | <https://headstart.gov/center-locator> |

Unlike some states, Ohio licenses school-based preschools, so public programs here usually do have a licensing record.

## Sources

- <https://childcaresearch.ohio.gov/>
- <https://childcaresearch.ohio.gov/provider/2190019834/> (example provider page)
- <https://childcaresearch.ohio.gov/inspections/2190019834> (example inspections list)
- <https://childcaresearch.ohio.gov/pdf/002190019834_2026-09-15_ANNUAL.pdf> (example inspection report)
- <https://codes.ohio.gov/ohio-administrative-code/rule-5180%3A2-12-03> (risk levels and points)
- <https://headstart.gov/center-locator>
