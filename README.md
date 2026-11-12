# Preschool Scout

A Claude skill that researches preschools near a family's home and builds an interactive decision report: side-by-side comparison, this cycle's deadlines, nonprofit financials, licensing records, a two-parent scoring rubric, and draft "tell us about your child" essays.

Give it your zip code and what you want in a school. Claude does the research with real lookups (school sites, state licensing records, IRS Form 990 filings) and fills one data file. A fixed page template draws the report from that file.

**Sample report (fictional family and schools):** https://claude.ai/artifact/Go9heWFBvcFKakUFmr73ta (private; ask for access)

## Use it

### In claude.ai

1. Download `preschool-scout.zip` from the latest release, or build it: `bun run zip` writes `dist/preschool-scout.zip`.
2. In claude.ai, open Settings, then Capabilities, turn on code execution, and upload the zip under Skills.
3. Make sure web search is on, then start a chat: "Find preschools for my daughter near 94110."

You get `report.html`. It opens in any browser. Research, the rubric (saved on that device), essays and copy buttons all work offline.

### In Claude Code

```sh
mkdir -p ~/.claude/skills && cp -R skill/preschool-scout ~/.claude/skills/
```

Then ask: "Use preschool-scout to find preschools near 94110." Claude Code can publish the report as a claude.ai Artifact, which turns on shared scoring between parents plus two Claude features inside the page:

- **Adjust the weights in plain words**: "we care most about art and outdoor time" becomes proposed rubric weights you can apply or discard.
- **Redraft with Claude** on each essay, from your own paragraph about your child. It never invents anecdotes; it leaves `[BRACKETED SLOTS]` instead.
- **Ask**: questions answered only from the report's research.

These call Claude on the viewer's own account and only run inside claude.ai.

## How it works

```text
intake ─▶ discover candidates ─▶ check in ─▶ research each school ─▶ score evidence ─▶ write ─▶ report.json ─▶ render ─▶ report.html
```

| Path | What |
| --- | --- |
| `skill/preschool-scout/SKILL.md` | The procedure Claude follows |
| `skill/preschool-scout/references/` | Intake questions, research sources, rubric, writing rules, data format |
| `skill/preschool-scout/assets/template.html` | The report page; draws everything from embedded JSON |
| `skill/preschool-scout/assets/default-rubric.json` | Criteria drawn from licensing, Quality Counts California, NAEYC, ECERS-3 and CLASS |
| `skill/preschool-scout/assets/sample-report.json` | A complete fictional example |
| `skill/preschool-scout/scripts/render.ts` | Validates `report.json` and writes `report.html` |
| `skill/preschool-scout/scripts/propublica.ts` | Form 990 lookups |
| `skill/preschool-scout/scripts/distance.ts` | Distances and walk times |

## Develop

```sh
bun run check   # render the sample to dist/ and syntax-check the page script
bun run zip     # package the skill
```

Edit the template once; every report picks it up on the next render.

## Limits

- Licensing research is built around California's database. Other states work, with the state's own lookup and less detail.
- Financials exist only for nonprofits. For-profit and church-run schools show "no visibility".
- It's only as current as the schools' own websites. Dates not yet posted for this cycle are marked "to confirm".
- An AI agent did the research. Confirm dates and fees with each school before relying on them.
