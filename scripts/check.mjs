import assert from 'node:assert/strict';
import { readFile, readdir, stat } from 'node:fs/promises';
import path from 'node:path';
const root = path.resolve('public');
let checked = 0;
async function exists(url) {
  const pathname = decodeURIComponent(url.split(/[?#]/)[0]);
  let target = path.join(root, pathname);
  const info = await stat(target);
  if (info.isDirectory()) target = path.join(target, 'index.html');
  await stat(target);
}
async function scan(dir) {
  for (const item of await readdir(dir, { withFileTypes: true })) {
    const file = path.join(dir, item.name);
    if (item.isDirectory()) { await scan(file); continue; }
    if (!/\.(html|css|js|xml|txt)$/.test(item.name)) continue;
    const text = await readFile(file, 'utf8');
    // Confidential pricing must never enter public text, including comments.
    assert(!/2[.,]5\s*%/.test(text), `Private pricing found: ${file}`);
    if (item.name.endsWith('.html')) {
      const ids = [...text.matchAll(/\bid="([^"]+)"/g)].map(x => x[1]);
      assert.equal(ids.length, new Set(ids).size, `Duplicate ids: ${file}`);
      for (const match of text.matchAll(/(?:src|href)="([^"#]+)"/g)) {
        if (match[1].startsWith('/')) await exists(match[1]);
      }
      for (const match of text.matchAll(/href="#([^"]+)"/g)) assert(ids.includes(match[1]), `Broken anchor: ${match[1]}`);
      for (const match of text.matchAll(/<img\b[^>]*>/g)) assert(/\balt="/.test(match[0]), `Missing image alt: ${file}`);
      for (const match of text.matchAll(/<a\b[^>]*target="_blank"[^>]*>/g)) assert(/rel="[^"]*noopener/.test(match[0]), 'Missing safe link rel');
    }
    if (item.name.endsWith('.css')) for (const match of text.matchAll(/url\(['"]?(\/[^)'"\s]+)['"]?\)/g)) await exists(match[1]);
    checked++;
  }
}
await scan(root);
const home = await readFile(path.join(root, 'index.html'), 'utf8');
assert.equal([...home.matchAll(/<h1>/g)].length, 1, 'Expected one H1');
assert(home.includes('https://rentwalleet.com/'), 'Missing canonical domain');
assert(home.includes('드림페이'), 'Temporary app destination must be disclosed');
JSON.parse(home.match(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/)[1]);
assert((await stat(path.join(root, 'assets/PretendardVariable.woff2'))).size > 100000, 'Missing local font');
assert(!(await readFile(path.join(root, '_headers'), 'utf8')).includes('PLACEHOLDER'), 'Unresolved CSP hash');
console.log(`PASS: ${checked} text files; local assets, anchors, SEO JSON, images, private pricing and download disclosure.`);
