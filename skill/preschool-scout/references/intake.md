# Intake

Ask these in one message, numbered, so the parent can answer in a few lines. Say which ones are optional. If they skip something, use the default and note the assumption in `family.notes`.

1. **Where is home?** A cross-street or neighborhood plus zip code. (Required. Never put a full street address in the report.)
2. **Your child's first name and birth date.** (Required for age cutoffs. The first name appears in the report; skip it if you'd rather not.)
3. **When do you want them to start?** Default: the fall after they turn 3 if they're under 3 now, otherwise next fall.
4. **What teaching style do you want?** Examples: play-based, Montessori, Reggio Emilia, Waldorf, Vygotsky-style scaffolding (teachers build on what a child can almost do), arts-led, nature-based, language immersion, academic, faith-based. "Not sure" is fine; then describe what a great day looks like.
5. **What matters most?** Pick a few: walkable, full day, outdoor time, small ratios, bilingual staff, diversity, low parent-volunteer demands, kindergarten placement, cost, privacy of photos.
6. **Languages at home.**
7. **Budget per year**, and whether need-based aid matters.
8. **Schedule you need**: hours, days per week, year-round or school-year, summer.
9. **Kindergarten plans**: public, specific independent or parochial K-8 schools, or undecided.
10. **Schools already on your list**, already toured, or already applied to (and where you stand at each).
11. **Optional: tell me about your child in a few sentences**, the way you'd describe them to a friend. This seeds the essay drafts. Skip it and the drafts will have bracketed slots instead.
12. **Optional: anything that rules a school out** (a religious framework, a co-op requirement, a drive).

## Defaults

- Search radius: 1.5 miles in a dense city, 5 miles in a suburb; widen if fewer than 8 candidates.
- Finalists: 4 to 6.
- Essay word limit: 250 unless the school states one.
- Rubric weights: as in `assets/default-rubric.json`, with these adjustments (keep each group summing to 100; take or give the difference from f2 "Teaching style match"):
  - A non-English home language matters: raise f8 "Home language and culture" to 10.
  - Going public only: lower f1 "Path to your kindergarten targets" to 5.
  - Undecided between public and independent, or no named targets: leave f1 at 15 and relabel it "Kindergarten guidance".
  - Named independent targets: relabel f1 "Path to <their schools>".

## Age check

Compute the child's age on September 1 of the start year (and on any other cutoff a school states). Write it into `family.child.startTerm`, for example "Aug-Sep 2027, age 2 years 11 months on Sept 1". A school whose stated minimum the child misses is a gate g1 fail: put it in `tier: "dropped"` with the reason, unless the school admits mid-year when the child reaches the age.
