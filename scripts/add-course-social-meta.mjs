import { readFileSync, writeFileSync } from 'node:fs';
import { globSync } from 'node:fs';

const root = new URL('../', import.meta.url);
const pages = globSync('dist/learn/**/index.html', { cwd: root });
const defaultImage = 'https://shimizu510.github.io/japanese-training-lab/assets/outcomes/japanese-for-friends.jpg';

for (const relative of pages) {
  if (relative.includes('/n3/manga/')) continue;
  const url = new URL(relative, root);
  let html = readFileSync(url, 'utf8');
  if (html.includes('property="og:title"')) continue;
  const title = html.match(/<title>(.*?)<\/title>/s)?.[1]?.replace(/&amp;/g, '&');
  const description = html.match(/<meta name="description" content="([^"]+)"/)?.[1];
  const canonical = html.match(/<link rel="canonical" href="([^"]+)"/)?.[1];
  if (!title || !description || !canonical) throw new Error(`Missing metadata in ${relative}`);
  const escapedTitle = title.replaceAll('&', '&amp;').replaceAll('"', '&quot;');
  const meta = [
    `<meta property="og:type" content="website">`,
    `<meta property="og:title" content="${escapedTitle}">`,
    `<meta property="og:description" content="${description}">`,
    `<meta property="og:url" content="${canonical}">`,
    `<meta property="og:image" content="${defaultImage}">`,
    `<meta property="og:image:alt" content="Learn Japanese for the life you want with Japanese Training Lab">`,
    `<meta name="twitter:card" content="summary_large_image">`,
    `<meta name="twitter:title" content="${escapedTitle}">`,
    `<meta name="twitter:description" content="${description}">`,
    `<meta name="twitter:image" content="${defaultImage}">`
  ].join('\n');
  html = html.replace(/(<link rel="canonical" href="[^"]+">)/, `$1\n${meta}`);
  writeFileSync(url, html);
}

console.log(`Social metadata checked for ${pages.length} course pages.`);
