# report.json

One JSON object. `assets/sample-report.json` is a complete example. Leave out any field you don't have; the page skips empty fields. Strings are plain text (no HTML, no Markdown). Dates are `YYYY-MM-DD`.

```text
meta
  title            "Nia's Preschool Plan"
  cycle            "Fall 2027 entry"
  generated        date of this run
  sample           true only for fictional demo data
  home             { label: "Near 24th and Guerrero", zip: "94110" }   no street numbers

family
  child            { name, birthdate, startTerm }
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
  licensing        { facilityNumber, typeA: n, typeB: n, summary, url }   counts for the last five years
  finances         { status: "nonprofit" | "forprofit" | "church" | "unknown", ein, tier: "strong" | "steady" | "fragile" | "unknown", fy, revenue, expenses, netAssets, cashMonths, summary, flags[] }
  longevity        { risk: "low" | "medium" | "high" | "unknown", why }
  pros[], cons[], askOnTour[]
  sources[]        { label, url }

deadlines[]        { date, schoolId, what, status: "confirmed" | "to-confirm" }

rubric             optional; render.ts starts from assets/default-rubric.json
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
