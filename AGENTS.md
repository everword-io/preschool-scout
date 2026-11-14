# AGENTS.md

This repo is Preschool Scout, an agent skill.

- **To run it for a family:** read `skill/preschool-scout/SKILL.md` and follow it. All paths in it are relative to `skill/preschool-scout/`.
- **To work on the skill itself:** the page template is `skill/preschool-scout/assets/template.html`, and reports render with `node skill/preschool-scout/scripts/render.mjs <report.json> [out.html]`. Run `bun run check` after any template or renderer change; it re-renders `docs/index.html`, the public sample.
- Never put a real family's details in this repo. `assets/sample-report.json` is fictional.
