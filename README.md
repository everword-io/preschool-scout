# Preschool Scout

An AI agent skill that researches preschools near a family's home and builds an interactive decision report: side-by-side comparison, this cycle's deadlines, nonprofit financials, licensing records, a two-parent scoring rubric, and draft "tell us about your child" essays.

Give it your zip code and what you want in a school. Your agent does the research with real lookups (school sites, state licensing records, IRS Form 990 filings) and fills one data file. A fixed page template draws the report from that file.

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

## How it works

```text
intake ─▶ discover candidates ─▶ check in ─▶ research each school ─▶ score evidence ─▶ write ─▶ report.json ─▶ render ─▶ report.html
```

| Path | What |
| --- | --- |
| `skill/preschool-scout/SKILL.md` | The procedure the agent follows |
| `skill/preschool-scout/references/` | Intake questions, research sources, rubric, writing rules, data format |
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

- Licensing research is built around California's database. Other states work, with the state's own lookup and less detail.
- Financials exist only for nonprofits. For-profit and church-run schools show "no visibility".
- It's only as current as the schools' own websites. Dates not yet posted for this cycle are marked "to confirm".
- Shared scoring between parents and the in-page assistant features need the report published as a claude.ai Artifact. Elsewhere, scores stay in the browser where they were entered.
- An AI agent did the research. Confirm dates and fees with each school before relying on them.
