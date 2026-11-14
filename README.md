# Preschool Scout

An AI agent skill that researches preschools near a family's home, independent and public alike, and builds an interactive decision report: side-by-side comparison, this cycle's deadlines, licensing records, nonprofit financials, eligibility for free public programs, a two-parent scoring rubric, and draft "tell us about your child" essays.

Give it your zip code and what you want in a school. Your agent does the research with real lookups (school sites, state licensing records, IRS Form 990 filings, public pre-K and Head Start programs) and fills one data file. A fixed page template draws the report from that file.

It uses the open [Agent Skills](https://agentskills.io) format, so it works with Claude, Codex, Gemini CLI and other agents that read `SKILL.md` folders. The scripts are plain JavaScript with no dependencies and run on Node 18+ or Bun.

**Sample report (fictional family and schools):** https://scout-demo.ourwhole.family

The sample is a plain web page, deployed to Vercel from `docs/` by `.github/workflows/deploy-demo.yml`. Everything works there except the claude.ai-only features listed below.

## Use it

Every agent needs two things turned on: **web search** (or page fetching) and a **shell that can run Node**. Without web access there is nothing to research. Download `preschool-scout.zip` from the latest release, or build it with `bun run zip`.

| Agent | Install | Notes |
| --- | --- | --- |
| claude.ai | Settings, then Capabilities: turn on code execution, upload the zip under Skills | Turn on web search in the chat |
| Claude Code | Unzip into `~/.claude/skills/` (or `cp -R skill/preschool-scout ~/.claude/skills/` from a clone) | Can publish the report as a claude.ai Artifact (see below) |
| Codex | Unzip into `~/.codex/skills/` (or `cp -R skill/preschool-scout ~/.codex/skills/` from a clone), then restart Codex | Turn on web search and network access ([skills docs](https://developers.openai.com/codex/skills)) |
| Gemini CLI, Cursor, others | Unzip into the skills folder your agent reads (many read `.agents/skills/`) | Check your agent's docs for the folder and for web access |

Then ask: "Use preschool-scout to find preschools for my daughter near 94110."

You get `report.html`: attached in claude.ai, or in a new folder such as `preschool-scout-94110/` in your working directory for terminal agents. It opens in any browser, phones included. Research, the rubric (saved in that browser), essays and copy buttons all work offline.

Opening a clone of this repo in an agent works too: `AGENTS.md` points it at the skill.

Tested end to end in Claude Code. Other agents follow the same standard but haven't had a full run yet; reports of how it goes are welcome.

### Extras when published as a claude.ai Artifact

An agent that can publish claude.ai Artifacts (Claude Code) can turn on shared scoring between parents and three assistant features inside the page:

- **Adjust the weights in plain words**: "we care most about art and outdoor time" becomes proposed rubric weights you can apply or discard.
- **Redraft** each essay from your own paragraph about your child. It never invents anecdotes; it leaves `[BRACKETED SLOTS]` instead.
- **Ask**: questions answered only from the report's research.

These call Claude on the viewer's own account. Anywhere else they stay hidden.

## Where it works

It works anywhere in the US. Four states have detailed guides that tell the agent exactly where the licensing data is and how to read it:

| State | Licensing data | Free public programs it checks |
| --- | --- | --- |
| California | State licensing service: every center, citation counts, visit reports | Transitional kindergarten, California State Preschool Program, Head Start |
| Texas | State open data: every center and every deficiency with its risk level | Public school pre-K, Head Start |
| New York | State and New York City open data registries, state inspection histories | NYC 3-K and Pre-K for All, Universal Pre-K, Head Start |
| Ohio | State search site, provider pages, inspection reports with risk levels | Public school preschool, Early Childhood Education grant slots, Head Start |

In any other state, the agent finds the state's licensing lookup and public programs itself, following the steps in `skill/preschool-scout/references/states/README.md`. It then writes a guide for that state in the same format, which you're welcome to contribute back as a pull request (copy `references/states/_template.md`).

### Public programs

Public options are included by default: TK or public pre-K, city programs and Head Start, with who is eligible and when enrollment opens. If a program depends on household income, the agent asks for a rough range only if you want it to check, and never puts income in the report. It says "likely eligible" or "may qualify" and lists the program's own rules.

## How it works

```text
intake ─▶ discover candidates ─▶ check in ─▶ research each school ─▶ score evidence ─▶ write ─▶ report.json ─▶ render ─▶ report.html
```

| Path | What |
| --- | --- |
| `skill/preschool-scout/SKILL.md` | The procedure the agent follows |
| `skill/preschool-scout/references/` | Intake questions, research sources, rubric, writing rules, data format |
| `skill/preschool-scout/references/states/` | One guide per state, a template, and how to research a state with no guide |
| `skill/preschool-scout/assets/template.html` | The report page; draws everything from embedded JSON |
| `skill/preschool-scout/assets/default-rubric.json` | Criteria drawn from licensing, Quality Counts California, NAEYC, ECERS-3 and CLASS |
| `skill/preschool-scout/assets/sample-report.json` | A complete fictional example |
| `skill/preschool-scout/scripts/render.mjs` | Validates `report.json` and writes `report.html` |
| `skill/preschool-scout/scripts/propublica.mjs` | Form 990 lookups |
| `skill/preschool-scout/scripts/distance.mjs` | Distances and walk times |

## Develop

```sh
bun run check   # render the sample to docs/index.html and syntax-check the page script
bun run zip     # package the skill
```

Edit the template once; every report picks it up on the next render.

Push a `v*` tag and the release workflow builds the zip and publishes it.

## Limits

- Licensing detail depends on the state. California, Texas, New York and Ohio have guides; other states rely on the agent finding the state's lookup. New York City center inspections have no current open dataset, so they come from the state search where available.
- Financials exist only for nonprofits. For-profit, church-run and public programs show "no visibility".
- It's only as current as the schools' own websites. Dates not yet posted for this cycle are marked "to confirm".
- Shared scoring between parents and the in-page assistant features need the report published as a claude.ai Artifact. Elsewhere, scores stay in the browser where they were entered.
- An AI agent did the research. Confirm dates and fees with each school before relying on them.
