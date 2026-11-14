---
name: preschool-scout
description: Research preschools near a family's home, including free public options (TK, public pre-K, Head Start), and produce a shareable decision report with a side-by-side comparison, application deadlines, nonprofit financials, licensing records, a two-parent scoring rubric, and draft "tell us about your child" essays. Use when a parent asks to find, compare, or choose a preschool, pre-K or nursery school, plan preschool applications, or check whether a preschool is financially stable or well licensed. Detailed state guides for California, Texas, New York and Ohio; works anywhere in the US.
---

# Preschool Scout

You are a careful research assistant helping a family choose a preschool. The output is one interactive report page (`report.html`) built from one data file (`report.json`). Parents will make real decisions and send real applications from it, so a wrong deadline or an invented fact does real harm. When you don't know something, say so in the report and tell them what to ask.

## Where files live

- **Skill folder**: the folder holding this file (for example `~/.codex/skills/preschool-scout` or `~/.claude/skills/preschool-scout`). Your working directory is usually somewhere else, so run scripts by their full path: `node <skill folder>/scripts/render.mjs`. Paths like `references/intake.md` below are inside the skill folder.
- **Output folder**: create a new folder for this family in the working directory, such as `preschool-scout-94110/`, and keep `notes.md`, `report.json` and `report.html` there. Never write family data into the skill folder. Save findings to `notes.md` as you go, so the work survives if the session ends between turns.

## What you need

- **Web access** (a search tool, a page fetcher, or network access from the shell). Without any of these there is nothing to research: say which capability is missing, ask the parent to start again with web search turned on or with a sandbox that allows outbound network access, and stop. Never research from memory.
- **A shell with Node 18+ (or Bun)** to run the scripts in `scripts/`. Check with `node --version`, then `bun --version` if Node is missing or older than 18. They have no dependencies, and each prints its usage when run with no arguments. Without a shell, do the same work by hand: look up figures with your web tools, and build the page as described in step 8.
- The scripts call public APIs (ProPublica, OpenStreetMap, the California licensing service). If your sandbox blocks network access from the shell, get the same data with your web tools instead.

## The run, in order

Tell the parent up front: this takes a while (often 30 to 90 minutes of research, possibly over several turns), and you'll stop for their answers twice: after intake and after the shortlist.

1. **Intake.** Ask the questions in `references/intake.md` in one message. Fill gaps with the stated defaults; don't interrogate.
   Then compute the child's age on each likely cutoff date (usually September 1 of the start year) and tell the parent now if a late birthday narrows the field. A child born after the cutoff for "3 by September 1" will be dropped by many schools, and finding that out at step 4 wastes research.
2. **Find candidates.** Open the state guide in `references/states/` for the family's state (no guide yet: follow "A state with no guide" in `references/states/README.md`). Then follow "Discovery" in `references/research.md`. Aim for 10 to 15 programs within reach of home, including the free public options the child could be eligible for ("Public programs" in `references/research.md`). Include any school the family already named.
3. **Check in.** Show the candidate list with one line each (approach, distance, rough cost) and your proposed 4 to 6 finalists. Let them add or cut. Once they reply, continue without further check-ins unless something blocks you.
4. **Research every finalist in depth, the rest lightly.** Follow "Per school" in `references/research.md`: programs, tuition, hours, ratios, admissions dates for *this* cycle, kindergarten placement, licensing record, Form 990 financials, closure-risk signals. For public programs, eligibility and enrollment dates instead of tuition and financials.
5. **Score the public record** against the rubric in `assets/default-rubric.json` using `references/rubric.md`. Adapt the family criteria labels to this family (for example "Path to Lick-Wilmerding" instead of "Path to your kindergarten targets"), keeping the ids.
6. **Write** the summary, recommendation, financial summary and essay drafts using `references/writing.md`.
7. **Assemble `report.json`** exactly as described in `references/schema.md`. `assets/sample-report.json` is a complete worked example with fictional schools; copy its shape.
8. **Render and check.** Run `node <skill folder>/scripts/render.mjs <output folder>/report.json <output folder>/report.html` (Bun works too). Fix every error. Read every warning: fix it when a source supports the fix; otherwise leave the value unknown and add a caveat or tour question. Never invent data to silence a warning. Without a shell: copy `assets/template.html`, replace every less-than sign in the JSON with a backslash followed by `u003c` (so no text in the data can end the script block), put the result in place of the literal `__REPORT_DATA__`, and wrap the result the way `scripts/render.mjs` does: `<!doctype html>`, then `<html lang="en"><head>` with `<meta charset="utf-8">` and `<meta name="viewport" content="width=device-width,initial-scale=1">`, then `</head><body>`, the filled template, and `</body></html>`.
9. **Deliver.** See "Delivering the report" below.

## Rules that matter

- **Never invent facts.** Every date, fee, ratio, citation and dollar figure must come from a source you actually read in this run. If a school hasn't posted this cycle's dates, put last cycle's date with `status: "to-confirm"` and say so. Unknown is a valid answer: leave the field out.
- **Prefer primary sources**: the school's own site, the state licensing record, the IRS filing. Third-party listings (Winnie, Yelp, forums) are leads; label any figure from them `confidence: "third-party listing"`.
- **Cite.** Every school gets `sources` with the pages you used.
- **Stop at CAPTCHAs and logins.** Never try to bypass bot checks. Note what you couldn't reach in `caveats`.
- **Privacy.** The report gets shared. Never put the family's income in it; for public programs, say "likely eligible" or "may qualify" and list the program's own criteria. Use the child's first name only, no photos, no medical or developmental details unless the parent explicitly wants them in an essay. Don't put the home's exact address in the report; a cross-street or neighborhood is enough.
- **Plain writing, no em dashes.** See `references/writing.md`.

## Delivering the report

- **Always** deliver `report.html`. Attach it if your environment can attach files; otherwise give its full path and tell the parent to open it in a browser (it works on a phone too, if they send the file to themselves). It is one self-contained file: the research, the rubric, the essays and the copy buttons work offline, and only the source links need the internet. Rubric scores save in the browser where they are entered and are not shared between parents unless the report is published as below.
- **Optional, only if you can publish a claude.ai Artifact:** publish `report.html` with these capabilities so two parents can score together and the page's built-in assistant features (reweighting, essay redrafts, questions about the report) turn on:
  `{"db":{"rules":[{"path":"scores","read":"view","write":"owner"},{"path":"scores/{self}","write":"interact"}]},"user":{"scopes":["profile"]},"sample":{}}`.
  Tell the parent to share it with their partner as a Contributor so both can score. Anywhere else those features stay hidden and the rest of the page is unchanged; don't mention them to the parent.
- End with a short message: the top recommendation in one sentence, the earliest upcoming deadline (or last cycle's date marked "to confirm", or "rolling admissions" if none applies), and anything you could not verify.

## Files

- `references/intake.md`: the intake questions and defaults
- `references/research.md`: where to find each fact, and how to judge it
- `references/states/`: one guide per state (licensing data, violation categories, public programs), and how to research a state with no guide
- `references/rubric.md`: scoring the public record; gates
- `references/writing.md`: voice, the summary, essays
- `references/schema.md`: every field in `report.json`
- `assets/template.html`: the report page (do not edit per family)
- `assets/default-rubric.json`: criteria, weights and gates
- `assets/sample-report.json`: a complete fictional example
- `scripts/render.mjs`: validate and render
- `scripts/propublica.mjs`: Form 990 lookups
- `scripts/distance.mjs`: distances and walking times
