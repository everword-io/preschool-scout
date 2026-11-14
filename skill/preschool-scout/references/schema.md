# report.json

One JSON object. `assets/sample-report.json` is a complete example. Leave out any field you don't have; the page skips empty fields. Strings are plain text (no HTML, no Markdown). Dates are `YYYY-MM-DD`.

```text
meta
  title            "Nia's Preschool Plan"
  cycle            "Fall 2027 entry"
  generated        date of this run
  sample           true only for fictional demo data
  home             { label: "Near 24th and Guerrero", zip: "94110", state: "CA" }   no street numbers

family
  child            { name, birthMonth: "2024-08", startTerm }   month and year only; the report is shared
  approach[]       teaching styles wanted
  priorities[]     what matters most
  languages[]
  budget, schedule, notes   strings
  kTargets[]       kindergarten / K-8 targets

summary            { headline, body[], recommendation[{ schoolId, why }] }
financesSummary    { headline, body[] }

schools[]
  id               short stable slug, unique ("jl")
  name, shortName  shortName is used in narrow table headers
  tier             "finalist" | "consider" | "dropped"
  sector           "independent" (default) | "public" (TK, district or state pre-K, city programs) | "head-start"
  public           for public and Head Start programs:
                   { program: "Transitional kindergarten", eligibility, enrollment, cost: "Free", eligible: "age-eligible" | "may qualify" | "not eligible" }
                   eligibility in the program's own terms. "age-eligible" only when age and residency are the whole test;
                   never the family's income or which private criterion they meet
  dropReason       required when dropped
  address          street address of the school (public)
  distanceMi       number, straight line from home
  walkMin          number, estimate
  website
  approach, ages, ratio, hours   strings
  tuition          { amount: "$31,800 full day", year: "2026-27", confidence: "confirmed" | "third-party listing" | "estimate" }
                   or { unknown: true } when the school doesn't publish it (add a tour question)
  admissions       { type: "cycle" | "rolling", tourRequired: bool, applicationFee, notes }
  programs[]       { name, ages, schedule, notes }
  fit              { score: 1-5, why }    fit with THIS family's stated wants
  kPlacement       { published: bool, summary }
  licensing        { facilityNumber, serious: n, minor: n, summary, url }   counts cover the whole window the state
                   publishes; name the window in summary ("no serious violations in visits since 2021").
                   The state guide in references/states/ maps its categories to serious and minor.
                   (typeA/typeB are still accepted and read as serious/minor.)
                   { exempt: true, summary } for a program not licensed as child care, such as TK in a public school
                   unavailable: true when the record couldn't be reached or is incomplete (leave counts out)
                   basis: "state" (default) | "researcher" when the state has no severity tiers and you classified findings
  finances         { status: "nonprofit" | "forprofit" | "church" | "public" | "unknown", ein, tier: "strong" | "steady" | "fragile" | "unknown", fy, revenue, expenses, netAssets, cashMonths, summary, flags[] }
  longevity        { risk: "low" | "medium" | "high" | "unknown", why }
  pros[], cons[], askOnTour[]
  sources[]        { label, url }

deadlines[]        { date, schoolId, what, status: "confirmed" | "to-confirm" }

rubric             optional; render.mjs starts from assets/default-rubric.json
  institutional[], family[]   { id, w, label, src, ask, a: [one, three, five] }
                   List only what you change. An entry with a default's id overrides just the
                   fields you give ({ "id": "f1", "label": "Path to Town School" }); a new id is
                   appended; { "id": "f8", "omit": true } removes one. Keep weights summing to 100.
  gates[]          { id, label }, merged the same way
  evidence         { [schoolId]: { [criterionId]: [1-5 | null, "evidence sentence"] } }

essays[]           { schoolId, prompt, wordLimit, draft }   draft uses \n\n between paragraphs
                   prompt: the school's exact wording if published; otherwise "Tell us about your child."
                   and add "essay prompt not yet published" to caveats
caveats[]          what you couldn't verify, blocked sources, estimates
sources[]          sources that aren't about one school: the state licensing API, city directories,
                   the 990 search, research you relied on { label, url }
```

The rubric scores only `tier: "finalist"` schools (or the first six non-dropped schools if there are no finalists). Keep finalists to six or fewer so the scoring grid fits on a phone.
