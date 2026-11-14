// Look up a nonprofit preschool's IRS Form 990 history via ProPublica Nonprofit Explorer.
// Usage:
//   node propublica.mjs search "<school name>" [STATE]   -> candidate EINs
//   node propublica.mjs filings <EIN>                  -> newest year first, one JSON line per year
// Node 18+ or bun, no dependencies. Needs outbound HTTPS to projects.propublica.org.
// Filing PDFs sit behind a bot check; don't try to get past it. The extracted figures here are enough.
const API = "https://projects.propublica.org/nonprofits/api/v2";
const [cmd, arg, state] = process.argv.slice(2);

async function get(url) {
  const r = await fetch(url, { headers: { "user-agent": "preschool-scout/0.1" } });
  if (r.status === 404) return null; // ProPublica answers "no results" with a 404
  if (!r.ok) throw new Error(`${r.status} ${url}`);
  return r.json();
}

if (cmd === "search" && arg) {
  const q = new URLSearchParams({ q: arg });
  if (state) q.set("state[id]", state.toUpperCase());
  const j = await get(`${API}/search.json?${q}`);
  const orgs = j?.organizations ?? [];
  for (const o of orgs) console.log(`${o.strein}\t${o.name}\t${o.city}, ${o.state}\tntee=${o.ntee_code ?? ""}`);
  if (!orgs.length) console.log("no matches: try the legal name, a shorter name, the state code, or the church that runs it");
} else if (cmd === "filings" && arg) {
  const j = await get(`${API}/organizations/${arg.replace(/\D/g, "")}.json`);
  if (!j) {
    console.log("no organization with that EIN");
    process.exit(0);
  }
  console.log(`# ${j.organization?.name} (${j.organization?.city}, ${j.organization?.state})`);
  const rows = (j.filings_with_data ?? []).map((f) => ({
    fiscalYearEnd: String(f.tax_prd),
    revenue: f.totrevenue,
    programRevenue: f.totprgmrevnue,
    contributions: f.totcntrbgfts,
    expenses: f.totfuncexpns,
    surplus: (f.totrevenue ?? 0) - (f.totfuncexpns ?? 0),
    assets: f.totassetsend,
    liabilities: f.totliabend,
    netAssets: (f.totassetsend ?? 0) - (f.totliabend ?? 0),
    officerComp: f.compnsatncurrofcr,
    otherWages: f.othrsalwages,
  }));
  rows.sort((a, b) => b.fiscalYearEnd.localeCompare(a.fiscalYearEnd));
  const newestData = rows[0]?.fiscalYearEnd ?? "";
  const newer = (j.filings_without_data ?? []).filter((f) => String(f.tax_prd) > newestData);
  if (newer.length)
    console.log(`# NOTE: ${newer.length} newer filing(s) have no extracted figures (${newer.map((f) => f.tax_prd).join(", ")}). Say the numbers below are from FY${newestData.slice(0, 4)} and may be stale.`);
  for (const r of rows) console.log(JSON.stringify(r));
  if (!rows.length) console.log("# no extracted figures for any year");
} else {
  console.error('usage: propublica.mjs search "<name>" [STATE] | filings <EIN>');
  process.exit(2);
}
