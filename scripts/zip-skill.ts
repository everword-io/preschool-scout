// Package the skill as dist/preschool-scout.zip: upload to claude.ai (Settings > Capabilities > Skills),
// or unzip into any agent's skills folder (~/.claude/skills, ~/.codex/skills, .agents/skills).
import { $ } from "bun";
await $`mkdir -p dist && rm -f dist/preschool-scout.zip`;
await $`cd skill && zip -rq ../dist/preschool-scout.zip preschool-scout -x '*.DS_Store'`;
const { size } = Bun.file("dist/preschool-scout.zip");
console.log(`dist/preschool-scout.zip (${Math.round(size / 1024)} KB)`);
