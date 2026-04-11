import fs from "fs";
import path from "path";

export const dynamic = 'force-dynamic';

function getHomeBody() {
  const filePath = path.join(process.cwd(), "content", "home-body.html");
  return fs.readFileSync(filePath, "utf8");
}

let cachedLocations = null;
function getLocations() {
  if (cachedLocations) return cachedLocations;
  try {
    const csvPath = path.join(process.cwd(), "public", "UK Locations.csv");
    const content = fs.readFileSync(csvPath, "utf8");
    const map = new Map();
    content.split('\n').forEach(line => {
      if (!line) return;
      const firstCommaIdx = line.indexOf(',');
      if (firstCommaIdx === -1) return;
      const code = line.substring(0, firstCommaIdx).trim();
      let locName = line.substring(firstCommaIdx + 1).trim();
      if (locName.startsWith('"') && locName.endsWith('"')) {
        locName = locName.substring(1, locName.length - 1);
      }
      map.set(code, locName);
    });
    cachedLocations = map;
    return map;
  } catch(e) {
    console.error("Error reading CSV", e);
    return new Map();
  }
}

function formatKeyword(str) {
  return str.split(/[-_ ]+/).map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()).join(' ');
}

export default async function HomePage({ searchParams }) {
  const params = await searchParams;
  let html = getHomeBody();
  
  if (params?.kwd) {
     const formattedKwd = formatKeyword(params.kwd);
     const lowerKwd = params.kwd.replace(/[-_]+/g, ' ').toLowerCase();
     
     html = html.split('Mobile Tyre Fitting').join(formattedKwd);
     html = html.split('Mobile tyre fitting').join(formattedKwd);
     html = html.split('mobile tyre fitting').join(lowerKwd);
  }
  
  if (params?.loc) {
     const locMap = getLocations();
     const locName = locMap.get(params.loc);
     if (locName) {
        html = html.split('United Kingdom').join(locName);
     }
  }

  return <main dangerouslySetInnerHTML={{ __html: html }} />;
}
