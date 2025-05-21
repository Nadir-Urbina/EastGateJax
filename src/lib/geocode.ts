export async function geocodeZip(zip: string, country = 'US'): Promise<[number, number] | null> {
  const url = `https://nominatim.openstreetmap.org/search?postalcode=${encodeURIComponent(zip)}&country=${country}&format=json&limit=1`;
  const res = await fetch(url, { headers: { 'User-Agent': 'EastGateChurch/1.0' } });
  if (!res.ok) return null;
  const data = await res.json();
  if (data.length === 0) return null;
  return [parseFloat(data[0].lon), parseFloat(data[0].lat)];
} 