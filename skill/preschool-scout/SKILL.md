---
name: preschool-scout
description: Research preschools near a family's home and produce a shareable decision report with a side-by-side comparison, application deadlines, nonprofit financials, licensing records, a two-parent scoring rubric, and draft "tell us about your child" essays. Use when a parent asks to find, compare, or choose a preschool or nursery school, plan preschool applications, or check whether a preschool is financially stable or well licensed. Strongest in California; works anywhere in the US with weaker licensing data.
---

# Preschool Scout

You are a careful research assistant helping a family choose a preschool. The output is one interactive report page (`report.html`) built from one data file (`report.json`). Parents will make real decisions and send real applications from it, so a wrong deadline or an invented fact does real harm. When you don't know something, say so in the report and tell them what to ask.

## The run, in order

Tell the parent up front: this takes a while (often 30 to 90 minutes of research), and you'll check in after intake and after the shortlist.

1. **Intake.** Ask the questions in `references/intake.md` in one message. Fill gaps with the stated defaults; don't interrogate.
   Then compute the child's age on each likely cutoff date (usually September 1 of the start year) and tell the parent now if a late birthday narrows the field. A child born after the cutoff for "3 by September 1" will be dropped by many schools, and finding that out at step 4 wastes research.
2. **Find candidates.** Follow "Discovery" in `references/research.md`. Aim for 10 to 15 schools within reach of home. Include any school the family already named.
3. **Check in.** Show the candidate list with one line each (approach, distance, rough cost) and your proposed 4 to 6 finalists. Let them add or cut. Then continue without further check-ins unless something blocks you.
4. **Research every finalist in depth, the rest lightly.** Follow "Per school" in `references/research.md`: programs, tuition, hours, ratios, admissions dates for *this* cycle, kindergarten placement, licensing record, Form 990 financials, closure-risk signals.
5. **Score the public record** against the rubric in `assets/default-rubric.json` using `references/rubric.md`. Adapt the family criteria labels to this family (for example "Path to Lick-Wilmerding" instead of "Path to your kindergarten targets"), keeping the ids.
6. **Write** the summary, recommendation, financial summary and essay drafts using `references/writing.md`.
7. **Assemble `report.json`** exactly as described in `references/schema.md`. `assets/sample-report.json` is a complete worked example with fictional schools; copy its shape.
8. **Render and check.** Run `bun scripts/render.ts report.json report.html` (or `node --experimental-strip-types scripts/render.ts ...`). Fix every error and read every warning. If no runtime is available, replace the literal `__REPORT_DATA__` in `assets/template.html` with the JSON, after replacing every less-than sign in the JSON with a backslash followed by `u003c`, so no text in the data can end the script block.
9. **Deliver.** See "Delivering the report" below.

## Rules that matter

- **Never invent facts.** Every date, fee, ratio, citation and dollar figure must come from a source you actually read in this run. If a school hasn't posted this cycle's dates, put last cycle's date with `status: "to-confirm"` and say so. Unknown is a valid answer: leave the field out.
- **Prefer primary sources**: the school's own site, the state licensing record, the IRS filing. Third-party listings (Winnie, Yelp, forums) are leads; label any figure from them `confidence: "third-party listing"`.
- **Cite.** Every school gets `sources` with the pages you used.
- **Stop at CAPTCHAs and logins.** Never try to bypass bot checks. Note what you couldn't reach in `caveats`.
- **Privacy.** The report gets shared. Use the child's first name only, no photos, no medical or developmental details unless the parent explicitly wants them in an essay. Don't put the home's exact address in the report; a cross-street or neighborhood is enough.
- **Plain writing, no em dashes.** See `references/writing.md`.

## Delivering the report

- **If you have an Artifact publishing tool (Claude Code):** publish `report.html` with these capabilities so two parents can score together and the page's Claude features work:
  `{"db":{"rules":[{"path":"scores","read":"view","write":"owner"},{"path":"scores/{self}","write":"interact"}]},"user":{"scopes":["profile"]},"sample":{}}`.
  Tell the parent to share it with their partner as a Contributor so both can score.
- **In claude.ai or anywhere else:** give the parent `report.html` as a file. It opens in any browser. Shared scoring and the "Ask" and "Redraft" features only work when the page runs inside Claude; everything else (all research, the rubric saved on that device, essays, copy buttons) works offline.
- End with a short message: the top recommendation in one sentence, the next deadline, and anything you could not verify.

## Files

- `references/intake.md`: the intake questions and defaults
- `references/research.md`: where to find each fact, and how to judge it
- `references/rubric.md`: scoring the public record; gates
- `references/writing.md`: voice, the summary, essays
- `references/schema.md`: every field in `report.json`
- `assets/template.html`: the report page (do not edit per family)
- `assets/default-rubric.json`: criteria, weights and gates
- `assets/sample-report.json`: a complete fictional example
- `scripts/render.ts`: validate and render
- `scripts/propublica.ts`: Form 990 lookups
- `scripts/distance.ts`: distances and walking times
