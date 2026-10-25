import { readFileSync } from 'node:fs';
import { globSync } from 'node:fs';

const root = new URL('../', import.meta.url);
const pages = globSync('dist/**/index.html', { cwd: root });
const seenTitles = new Map();
const seenCanonicals = new Map();
const errors = [];

function value(html, pattern) {
  return html.match(pattern)?.[1]?.replaceAll('&amp;', '&').trim();
}

for (const relative of pages) {
  const html = readFileSync(new URL(relative, root), 'utf8');
  const title = value(html, /<title>(.*?)<\/title>/s);
  const description = value(html, /<meta name="description" content="([^"]*)">/);
  const canonical = value(html, /<link rel="canonical" href="([^"]*)">/);

  if (!title) errors.push(`${relative}: missing title`);
  if (!description) errors.push(`${relative}: missing meta description`);
  if (!canonical) errors.push(`${relative}: missing canonical`);
  if (title && title.length > 75) errors.push(`${relative}: title is ${title.length} characters`);
  if (description && (description.length < 70 || description.length > 165)) {
    errors.push(`${relative}: description is ${description.length} characters`);
  }
  if (title && seenTitles.has(title)) errors.push(`${relative}: duplicate title with ${seenTitles.get(title)}`);
  if (canonical && seenCanonicals.has(canonical)) errors.push(`${relative}: duplicate canonical with ${seenCanonicals.get(canonical)}`);
  if (title) seenTitles.set(title, relative);
  if (canonical) seenCanonicals.set(canonical, relative);

  const ogTitle = value(html, /<meta property="og:title" content="([^"]*)">/);
  const twitterTitle = value(html, /<meta name="twitter:title" content="([^"]*)">/);
  if (ogTitle && ogTitle !== title) errors.push(`${relative}: og:title does not match title`);
  if (twitterTitle && twitterTitle !== title) errors.push(`${relative}: twitter:title does not match title`);
}

if (errors.length) {
  console.error(errors.join('\n'));
  process.exitCode = 1;
} else {
  console.log(`SEO audit passed for ${pages.length} indexable pages: unique titles, descriptions and canonicals.`);
}
