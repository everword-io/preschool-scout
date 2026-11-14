# Texas

Last checked: 2026-11-13.

## Licensing record

- **Agency:** Texas Health and Human Services Commission (HHSC), Child Care Regulation. Search: <https://childcare.hhs.texas.gov/Public/ChildCareSearch>
- **Open data:** two public tables on data.texas.gov, no key needed. They are the most complete licensing data of any state guide here.

| What | Query |
| --- | --- |
| Centers in a zip | `https://data.texas.gov/resource/bc5r-88dy.json?$where=starts_with(zipcode,'78704') AND operation_type='Licensed Center'&$select=operation_id,operation_number,operation_name,location_address,total_capacity,licensed_to_serve_ages,hours_of_operation,deficiency_high,deficiency_medium_high,deficiency_medium,deficiency_medium_low,deficiency_low,total_inspections,corrective_action,adverse_action,operation_status` (URL-encode the `$where`; zip codes may carry a +4 suffix, hence `starts_with`. The table holds active operations only.) |
| Every deficiency for one program | `https://data.texas.gov/resource/tqgd-mf4x.json?operation_id=<operation_id>&$order=corrected_date DESC` |

The deficiency table gives `standard_number_description` (the rule), `standard_risk_level`, `narrative` (what the inspector saw), `corrected_at_inspection` and `corrected_date`. It has no inspection date, and the program table's deficiency counts don't state their window. Report the counts "as published by HHSC", don't call a deficiency recent based on `corrected_date` (it can come long after the visit), and if recency matters, check the program's page on the HHSC search site, which lists inspections by date.

The program table's `corrective_action` and `adverse_action` flag formal enforcement. Say so in `licensing.summary`, add a tour question, and treat it as a gate g2 question.

### Violation categories

HHSC weights every minimum standard by the risk a violation poses to children, in five levels: High, Medium High, Medium, Medium Low and Low.

| State term | Report field |
| --- | --- |
| High | `serious` |
| Medium High, Medium, Medium Low, Low | `minor` |

Read every High and Medium High narrative for finalists. Several Medium High deficiencies on supervision is a pattern worth asking about even with no High.

## Quality ratings

Texas Rising Star rates programs in the state's subsidized Child Care Services program: Entry Level, then Two-Star to Four-Star. Search "Texas Rising Star <program name>"; a program outside the subsidy system has no rating, which says nothing about quality.

## Public programs

| Program | Who is eligible | How to find sites and enroll |
| --- | --- | --- |
| Public school pre-K | Free for four-year-olds (four on or before September 1) who meet at least one criterion, such as English learner, educationally disadvantaged, homeless, child of military personnel, in foster care, or a Star of Texas award family. A district with at least 15 eligible four-year-olds must offer it. Three-year-olds qualify only where the district runs a three-year-old program. | Through the school district. TEA FAQ: <https://tea.texas.gov/educators/early-childhood-education/early-childhood-education-faqs> |
| Head Start | Income, homelessness, foster care, some public benefits | <https://headstart.gov/center-locator> |

A district pre-K classroom in a public school is not licensed by HHSC, so it has no record in these tables. Set `licensing.exempt: true` and say so. Many districts partner with licensed centers for pre-K; those centers do have records.

## Sources

- <https://childcare.hhs.texas.gov/Public/ChildCareSearch>
- <https://data.texas.gov/resource/bc5r-88dy.json> (HHSC CCL Daycare and Residential Operations Data)
- <https://data.texas.gov/resource/tqgd-mf4x.json> (HHSC CCL non-compliance)
- <https://www.hhs.texas.gov/node/207646> (HHSC: weighted standards)
- <https://tea.texas.gov/educators/early-childhood-education/early-childhood-education-faqs>
- <https://www.childcare.texas.gov/texas-rising-star/about-texas-rising-star/certification-levels>
