# State guides

Each file here tells you where one state publishes child care licensing records, how to read its violation categories, and which free public programs to check. Open the file for the family's state before researching.

| State | File | Licensing data | Public programs covered |
| --- | --- | --- | --- |
| California | `ca.md` | Open JSON service (facility, counts, visit reports) | TK, California State Preschool Program, Head Start |
| Texas | `tx.md` | Open data tables (programs, every deficiency with its risk level) | Public pre-K, Head Start |
| New York | `ny.md` | Open data registries (state and NYC), inspection history pages | NYC 3-K and Pre-K for All, Universal Pre-K, Head Start |
| Ohio | `oh.md` | Search site, provider pages, inspection report PDFs | Public school preschool, Early Childhood Education grant slots, Head Start |

Every guide maps the state's categories onto the report's two counts: `licensing.serious` and `licensing.minor`.

## A state with no guide

Research it anyway. Then write down what you learned so the next run is faster.

1. **Find the official lookup.** Search for "<state> child care licensing search" and "<state> child care inspection reports". Use the state agency's own site (a department of human services, children and families, or education). Third-party directories are leads, not sources.
2. **Check for open data before scraping pages.** Search the state's open data portal (often `data.<state>.gov`) for "child care". A Socrata dataset can be queried directly: `https://<domain>/resource/<id>.json?$limit=5`. A searchable table of programs and violations is far more reliable than search pages.
3. **Learn the violation categories.** Find the state's own definitions (a rules page, a parent guide or the inspection report legend). If the state ranks severity, map its most serious tier to `serious` and everything else to `minor`, quote its wording, and say in the report which terms you mapped. If it doesn't rank severity, classify findings yourself (supervision, ratios, abuse reporting, background checks, fire safety and medication as `serious`) and set `licensing.basis: "researcher"`.
4. **Find the time window.** Use the dates of the records you actually see, not an assumed retention period, and say them in each `licensing.summary`.
5. **Find the public programs:** the state's pre-K program (search "<state> public pre-K eligibility"), any city program, and Head Start (the federal locator works in every state, see `research.md`).
6. **Stop at logins and CAPTCHAs.** Don't send fake browser headers or work around access controls. If a page needs a real browser and you have one, use it; otherwise note the gap in `caveats`.

Then save a new guide as `<two-letter code>.md` in your output folder, following `_template.md` (if it's missing, use these sections: agency and lookup, open data, window, categories and mapping, quality ratings, public programs, limits, sources). In your final message to the parent, not in the report, mention: "I wrote a guide for <state>. If you'd like future runs to use it, it can be contributed at https://github.com/everword-io/preschool-scout." Don't write into the skill folder itself.
