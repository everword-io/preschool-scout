// Straight-line distance and a rough walking time from home to each school.
// Usage: bun distance.ts "<home address>" "<school 1 address>" "<school 2 address>" ...
// Geocodes with OpenStreetMap Nominatim (one request per second, per its usage policy).
// If geocoding is blocked, look up coordinates another way and use haversine() below.

export function haversineMi(a: [number, number], b: [number, number]): number {
  const R = 3958.8, rad = (d: number) => (d * Math.PI) / 180;
  const dLat = rad(b[0] - a[0]), dLon = rad(b[1] - a[1]);
  const h = Math.sin(dLat / 2) ** 2 + Math.cos(rad(a[0])) * Math.cos(rad(b[0])) * Math.sin(dLon / 2) ** 2;
  return 2 * R * Math.asin(Math.sqrt(h));
}
// City streets add roughly 30% to a straight line; 3 mph walking pace.
export const walkMinutes = (mi: number) => Math.round(mi * 1.3 * 20);

async function geocode(q: string): Promise<[number, number] | null> {
  const url = `https://nominatim.openstreetmap.org/search?format=json&limit=1&q=${encodeURIComponent(q)}`;
  const r = await fetch(url, { headers: { "user-agent": "preschool-scout/0.1 (family research tool)" } });
  if (!r.ok) return null;
  const j: any[] = await r.json();
  return j[0] ? [+j[0].lat, +j[0].lon] : null;
}
const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));

if (import.meta.url === `file://${process.argv[1]}` || process.argv[1]?.endsWith("distance.ts")) {
  const [home, ...schools] = process.argv.slice(2);
  if (!home || !schools.length) {
    console.error('usage: distance.ts "<home>" "<school address>" ...');
    process.exit(2);
  }
  const h = await geocode(home);
  if (!h) throw new Error(`could not geocode home: ${home}`);
  for (const s of schools) {
    await sleep(1100);
    const p = await geocode(s);
    if (!p) { console.log(`${s}\tnot found`); continue; }
    const mi = haversineMi(h, p);
    console.log(`${s}\t${mi.toFixed(2)} mi\t~${walkMinutes(mi)} min walk`);
  }
}
