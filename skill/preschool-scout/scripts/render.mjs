// Render a Preschool Scout report: report.json + template.html -> report.html
// Usage: node render.mjs <report.json> [out.html]   (Node 18+, or bun; no dependencies)
// Exits 1 if the report has errors; prints warnings for gaps worth fixing.
import { readFileSync, writeFileSync } from "node:fs";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const here = dirname(fileURLToPath(import.meta.url));
const assets = join(here, "..", "assets");

const [inPath, outArg] = process.argv.slice(2);
if (!inPath) {
  console.error("usage: render.mjs <report.json> [out.html]");
  process.exit(2);
}
const report = JSON.parse(readFileSync(resolve(inPath), "utf8"));
const outPath = resolve(outArg ?? inPath.replace(/\.json$/i, "") + ".html");

const errors = [];
const warnings = [];

// Fill the rubric from the defaults wherever the report leaves it out.
const defaults = JSON.parse(readFileSync(join(assets, "default-rubric.json"), "utf8"));
report.rubric = report.rubric ?? {};
// Entries in the report override the default with the same id, field by field.
// New ids are appended; { "id": "f8", "omit": true } removes a default.
for (const k of ["institutional", "family", "gates"]) {
  const given = Array.isArray(report.rubric[k]) ? report.rubric[k] : [];
  const byId = new Map(given.map((c) => [c.id, c]));
  const merged = defaults[k].map((d) => ({ ...d, ...(byId.get(d.id) ?? {}) }));
  const known = new Set(defaults[k].map((d) => d.id));
  for (const c of given) if (!known.has(c.id)) merged.push(c);
  for (const c of merged) {
    if (c.omit) continue;
    if (!c.id || !c.label) errors.push(`rubric.${k}: entry needs id and label: ${JSON.stringify(c).slice(0, 80)}`);
    if (k !== "gates" && (!Array.isArray(c.a) || c.a.length !== 3)) errors.push(`rubric.${k}.${c.id}: "a" must list what 1, 3 and 5 look like`);
  }
  report.rubric[k] = merged.filter((c) => !c.omit);
}
report.rubric.evidence = report.rubric.evidence ?? {};

const schools = Array.isArray(report.schools) ? report.schools : [];
if (!schools.length) errors.push("schools: the report has no schools");
const ids = new Set();
for (const s of schools) {
  if (!s.id || !s.name) errors.push(`school missing id or name: ${JSON.stringify(s).slice(0, 80)}`);
  if (ids.has(s.id)) errors.push(`duplicate school id: ${s.id}`);
  ids.add(s.id);
  if (!["finalist", "consider", "dropped"].includes(s.tier)) warnings.push(`${s.id}: tier should be finalist, consider or dropped`);
  if (!s.sources?.length) warnings.push(`${s.id}: no sources`);
  if (s.tier === "finalist" && !s.tuition?.amount && !s.tuition?.unknown)
    warnings.push(`${s.id}: finalist with no tuition (find it, or set tuition.unknown: true and add a tour question)`);
  if (s.tier === "dropped" && !s.dropReason) warnings.push(`${s.id}: dropped without a dropReason`);
}
const finalists = schools.filter((s) => s.tier === "finalist").length;
if (finalists === 0) warnings.push("no finalists: the rubric will use the first six schools");
if (finalists > 7) warnings.push(`${finalists} finalists: the rubric matrix gets wide past 6`);

const refCheck = (where, id) => {
  if (!ids.has(id)) errors.push(`${where}: unknown schoolId "${id}"`);
};
for (const r of report.summary?.recommendation ?? []) refCheck("summary.recommendation", r.schoolId);
for (const d of report.deadlines ?? []) {
  refCheck("deadlines", d.schoolId);
  if (!/^\d{4}-\d{2}-\d{2}$/.test(d.date ?? "")) errors.push(`deadlines: date must be YYYY-MM-DD, got "${d.date}"`);
}
for (const e of report.essays ?? []) refCheck("essays", e.schoolId);

const critIds = new Set([...report.rubric.institutional, ...report.rubric.family].map((c) => c.id));
for (const [sid, m] of Object.entries(report.rubric.evidence)) {
  refCheck("rubric.evidence", sid);
  for (const [cid, v] of Object.entries(m)) {
    if (!critIds.has(cid)) errors.push(`rubric.evidence.${sid}: unknown criterion "${cid}"`);
    if (!Array.isArray(v) || v.length !== 2 || !(v[0] === null || (v[0] >= 1 && v[0] <= 5)))
      errors.push(`rubric.evidence.${sid}.${cid}: must be [1-5 or null, "text"]`);
  }
}
for (const k of ["institutional", "family"]) {
  const sum = report.rubric[k].reduce((a, c) => a + (c.w || 0), 0);
  if (sum !== 100) warnings.push(`rubric.${k}: weights sum to ${sum}, expected 100`);
}

// Catch template leftovers and placeholder text that would render as junk.
const raw = JSON.stringify(report);
for (const bad of ["undefined", "NaN", "TODO", "lorem ipsum"]) {
  if (raw.toLowerCase().includes(`"${bad.toLowerCase()}"`)) warnings.push(`a field holds the literal value "${bad}"`);
}
if (/\u2014/.test(raw)) warnings.push("em dashes found: the style guide asks for none");

for (const w of warnings) console.warn("warn:", w);
if (errors.length) {
  for (const e of errors) console.error("error:", e);
  process.exit(1);
}

const template = readFileSync(join(assets, "template.html"), "utf8");
if (!template.includes("__REPORT_DATA__")) throw new Error("template is missing the __REPORT_DATA__ slot");
// Escape "<" so no string in the data can close the <script> block.
const json = JSON.stringify(report).replace(/</g, "\\u003c");
// A full document so the file renders correctly on its own (standards mode, phone viewport).
const page = template.replace("__REPORT_DATA__", () => json);
writeFileSync(
  outPath,
  `<!doctype html>\n<html lang="en">\n<head>\n<meta charset="utf-8">\n<meta name="viewport" content="width=device-width,initial-scale=1">\n</head>\n<body>\n${page}\n</body>\n</html>\n`,
);
console.log(`wrote ${outPath} (${schools.length} schools, ${finalists} finalists, ${warnings.length} warnings)`);
