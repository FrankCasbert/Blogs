import { readFileSync, readdirSync, existsSync, statSync } from 'node:fs';
import { resolve, relative, sep } from 'node:path';

// Check the actual generated HTML, including images resolved from nested posts.
const root = resolve(process.argv[2] || '_site');
const base = process.argv[3] ?? '/Blogs';
if (!existsSync(root)) throw new Error(`Build directory missing: ${root}`);
function walk(dir) {
  return readdirSync(dir, { withFileTypes: true }).flatMap(entry => {
    const path = resolve(dir, entry.name);
    return entry.isDirectory() ? walk(path) : [path];
  });
}
const files = walk(root);
const errors = [];
let checked = 0;
for (const file of files.filter(file => file.endsWith('.html'))) {
  const page = relative(root, file).split(sep).join('/');
  const html = readFileSync(file, 'utf8');
  if (/\{%|\{\{/.test(html.replace(/<pre\b[^>]*>[\s\S]*?<\/pre>/g, ''))) {
    errors.push(`${page}: unrendered Liquid template`);
  }
  for (const match of html.matchAll(/<(?:a|img|link|script)\b[^>]*?\b(?:href|src)\s*=\s*(["'])(.*?)\1/gi)) {
    const raw = match[2].replaceAll('&amp;', '&');
    if (!raw || raw.startsWith('#') || /^(?:[a-z][a-z0-9+.-]*:|\/\/)/i.test(raw)) continue;
    const url = new URL(raw, `https://example.test${base}/${page}`);
    let path;
    try { path = decodeURIComponent(url.pathname); } catch { errors.push(`${page}: invalid URL ${raw}`); continue; }
    if (!path.startsWith(`${base}/`)) { errors.push(`${page}: outside blog base path: ${raw}`); continue; }
    let target = resolve(root, `.${path.slice(base.length)}`);
    if (target !== root && !target.startsWith(root + sep)) { errors.push(`${page}: path outside build directory`); continue; }
    if (existsSync(target) && statSync(target).isDirectory()) target = resolve(target, 'index.html');
    checked++;
    if (!existsSync(target)) errors.push(`${page}: missing ${raw}`);
  }
}
if (errors.length) { console.error(errors.join('\n')); process.exit(1); }
console.log(`Checked ${files.filter(file => file.endsWith('.html')).length} pages and ${checked} local links/images: OK`);
