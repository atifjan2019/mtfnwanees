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
     
     // Preserve Step Section Headings
     html = html.split('Mobile Tyre Fitting - We Come to You').join('__PRESERVE_1__');
     html = html.split('<h4 class="text-22 highlight-text text-uppercase">Mobile Tyre Fitting</h4>').join('__PRESERVE_2__');
     
     html = html.split('Mobile Tyre Fitting').join(formattedKwd);
     html = html.split('Mobile tyre fitting').join(formattedKwd);
     html = html.split('mobile tyre fitting').join(lowerKwd);

     // Restore Preserved Sections
     html = html.split('__PRESERVE_1__').join('Mobile Tyre Fitting - We Come to You');
     html = html.split('__PRESERVE_2__').join('<h4 class="text-22 highlight-text text-uppercase">Mobile Tyre Fitting</h4>');
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
