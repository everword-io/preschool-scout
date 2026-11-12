// Look up a nonprofit preschool's IRS Form 990 history via ProPublica Nonprofit Explorer.
// Usage:
//   bun propublica.ts search "<school name>" [STATE]   -> candidate EINs
//   bun propublica.ts filings <EIN>                     -> one JSON line per year
// Works with node --experimental-strip-types too. Needs outbound HTTPS to projects.propublica.org.
// If the sandbox blocks it, open the same URLs with your web tool instead.

export {};
const API ="https://projects.propublica.org/nonprofits/api/v2";
const [cmd, arg, state] = process.argv.slice(2);

async function get(url: string): Promise<any> {
  const r = await fetch(url, { headers: { "user-agent": "preschool-scout/0.1" } });
  if (!r.ok) throw new Error(`${r.status} ${url}`);
  return r.json();
}

if (cmd === "search" && arg) {
  const q = new URLSearchParams({ q: arg });
  if (state) q.set("state[id]", state.toUpperCase());
  const j = await get(`${API}/search.json?${q}`);
  for (const o of j.organizations ?? []) console.log(`${o.strein}\t${o.name}\t${o.city}, ${o.state}\tntee=${o.ntee_code ?? ""}`);
  if (!j.organizations?.length) console.log("no matches: try a shorter name, the legal name, or the church that runs it");
} else if (cmd === "filings" && arg) {
  const j = await get(`${API}/organizations/${arg.replace(/\D/g, "")}.json`);
  console.log(`# ${j.organization?.name} (${j.organization?.city}, ${j.organization?.state})`);
  for (const f of j.filings_with_data ?? []) {
    const net = (f.totassetsend ?? 0) - (f.totliabend ?? 0);
    console.log(JSON.stringify({
      fiscalYearEnd: String(f.tax_prd),
      revenue: f.totrevenue,
      programRevenue: f.totprgmrevnue,
      contributions: f.totcntrbgfts,
      expenses: f.totfuncexpns,
      surplus: (f.totrevenue ?? 0) - (f.totfuncexpns ?? 0),
      assets: f.totassetsend,
      liabilities: f.totliabend,
      netAssets: net,
      officerComp: f.compnsatncurrofcr,
      otherWages: f.othrsalwages,
      pdf: f.pdf_url,
    }));
  }
  for (const f of j.filings_without_data ?? []) console.log(`# no extracted data for ${f.tax_prd}: ${f.pdf_url ?? "no pdf"}`);
} else {
  console.error('usage: propublica.ts search "<name>" [STATE] | filings <EIN>');
  process.exit(2);
}
