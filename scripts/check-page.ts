// Syntax-check the inline script of a rendered report and confirm the data slot was filled.
import { $ } from "bun";
const path = process.argv[2] ?? "dist/sample-report.html";
const html = await Bun.file(path).text();
if (html.includes("__REPORT_DATA__")) throw new Error("data slot not filled");
const m = html.match(/<script>\n([\s\S]*)<\/script>/);
if (!m) throw new Error("page script not found");
await Bun.write("dist/.page.js", m[1]);
await $`node --check dist/.page.js`;
console.log(`ok: ${path} (${Math.round(html.length / 1024)} KB), script parses`);
