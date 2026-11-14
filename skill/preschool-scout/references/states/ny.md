# New York

Last checked: 2026-11-13.

New York has two regulators. In New York City, the city Health Department (DOHMH) licenses child care centers. Everywhere else, and for family and group family programs in the city too, the state Office of Children and Family Services (OCFS) does.

## Licensing record: outside New York City

- **Agency:** OCFS, which runs a public child care program search on its website.
- **Open data:** "Child Care Regulated Programs" on data.ny.gov.

| What | Query |
| --- | --- |
| Programs in a zip | `https://data.ny.gov/resource/cb42-qumz.json?zip_code=12203&program_type=DCC` (DCC = day care center). Run it again with `SDCC` (small day care center), and with `GFDC` and `FDC` (group family and family programs) if the family is open to home-based care. |
| One program's inspections | `https://hs.ocfs.ny.gov/dcfs/Search/GetInspectionHistory/<facility_id>` |

The registry gives capacity by age group (`infant_capacity`, `toddler_capacity`, `preschool_capacity`), license dates and status. The inspection history page lists each visit with its date, type (for example Annual Unannounced) and "Violations found: Yes or No", with a link to the inspection checklist. The program profile pages at `hs.ocfs.ny.gov/dcfs/Profile/Index/<id>` often fail for automated clients; use the inspection history URL.

OCFS posts violations only after the report has been mailed to the provider, so the newest visit may be missing. State the date range of the inspections you actually see.

### Violation categories

OCFS lists violations by regulation without a severity tier. Read each cited regulation on the checklist and classify it yourself:

| What the citation is about | Report field |
| --- | --- |
| Supervision, ratios, child abuse or maltreatment reporting, background checks, fire and life safety, medication | `serious` |
| Paperwork, postings, training hours, minor physical-plant items | `minor` |

Set `licensing.basis: "researcher"` and say in the summary that the classification is yours, for example "2 violations in visits since 2024, one on supervision (our classification)". A researcher-classified serious finding is a g2 question for the tour, not an automatic fail.

## Licensing record: New York City

- **Agency:** NYC Health Department.
- **Open data:** "Active NYC Health Code Regulated Child Care Programs", `https://data.cityofnewyork.us/resource/gy3q-4tzp.json?zipcode=11205`, gives every active program with its `permit_number`, `program_type`, `age_range` and `capacity`. It has no inspections.
- **Inspections:** the city's inspection dataset (`dsg6-ifza`) stopped updating in April 2023. For a center, search the OCFS program search; many city programs appear there with recent inspections. Use an OCFS record only when the address and program type match the city's registry entry, never on the name alone. If you can't find a matching current record, set `licensing.unavailable: true`, say so in `caveats`, add a tour question asking for the most recent DOHMH inspection report, and use `licensing.summary` to say what you could and couldn't see. `dsg6-ifza` is history only (its categories were Public Health Hazard and Critical, which map to `serious`, and General, `minor`); never use it to say a center has no recent violations.

## Quality ratings

QUALITYstarsNY rates participating programs; participation is voluntary.

## Public programs

| Program | Who is eligible | How to find sites and enroll |
| --- | --- | --- |
| NYC 3-K and Pre-K for All | Free school-day seats for New York City children in the year they turn three (3-K) and four (pre-K). Extended-day and year-round seats have income or other rules. Check the current cycle's offer policy before saying anything about getting a seat. | Apply through MySchools: <https://www.myschools.nyc>. Use the dates NYC Public Schools posts for the start year; if they aren't posted yet, add a "to confirm" deadline rather than reusing last year's. |
| Universal Pre-K (outside NYC) | Free for four-year-olds in participating districts; seats and hours vary by district | The school district's website |
| Head Start | Income, homelessness, foster care, some public benefits | <https://headstart.gov/center-locator> |

Public school pre-K classrooms are not licensed as child care. Set `licensing.exempt: true` and say so. Pre-K for All seats at licensed centers do have licensing records.

## Sources

- <https://data.ny.gov/Human-Services/Child-Care-Regulated-Programs/cb42-qumz>
- <https://hs.ocfs.ny.gov/dcfs/Search/GetInspectionHistory/42407> (example inspection history)
- <https://data.cityofnewyork.us/resource/gy3q-4tzp.json> (Active NYC Health Code Regulated Child Care Programs)
- <https://data.cityofnewyork.us/Health/DOHMH-Childcare-Center-Inspections-Historical-/dsg6-ifza>
- <https://www.myschools.nyc>
- <https://www.schools.nyc.gov/enrollment/enroll-grade-by-grade/pre-k>
