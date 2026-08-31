import fs from 'node:fs';
import path from 'node:path';
import { parse } from 'yaml';

const root = process.cwd();
const blocksDir = path.join(root, 'src/components/blocks');
const pagesDir = path.join(root, 'src/content/pages');

const structures = new Map();
for (const name of fs.readdirSync(blocksDir).filter((file) => file.endsWith('.cloudcannon.structure-value.yml'))) {
  const definition = parse(fs.readFileSync(path.join(blocksDir, name), 'utf8'));
  structures.set(definition.value._type, Object.keys(definition.value));
}

const errors = [];
for (const name of fs.readdirSync(pagesDir).filter((file) => file.endsWith('.md'))) {
  const source = fs.readFileSync(path.join(pagesDir, name), 'utf8');
  const match = source.match(/^---\r?\n([\s\S]*?)\r?\n---/);
  if (!match) {
    errors.push(`${name}: missing frontmatter`);
    continue;
  }
  const data = parse(match[1]);
  for (const [index, block] of (data.content_blocks ?? []).entries()) {
    const expected = structures.get(block._type);
    if (!expected) {
      errors.push(`${name} block ${index}: unknown _type ${block._type}`);
      continue;
    }
    const missing = expected.filter((key) => !(key in block));
    const extra = Object.keys(block).filter((key) => !expected.includes(key));
    if (missing.length) errors.push(`${name} ${block._type}: missing ${missing.join(', ')}`);
    if (extra.length) errors.push(`${name} ${block._type}: extra ${extra.join(', ')}`);
  }
}

if (errors.length) {
  console.error(errors.join('\n'));
  process.exit(1);
}
console.log(`Validated ${structures.size} block structures against all page-builder content.`);
