import fs from "fs";
import path from "path";

function getHomeBody() {
  const filePath = path.join(process.cwd(), "content", "home-body.html");
  return fs.readFileSync(filePath, "utf8");
}

export default function HomePage() {
  const html = getHomeBody();
  return <main dangerouslySetInnerHTML={{ __html: html }} />;
}
