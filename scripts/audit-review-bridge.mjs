import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';

const levels = ['n5', 'n4', 'n3', 'n2', 'n1'];
const kinds = [
  ['kanji', /data-kanji=/],
  ['vocabulary', /data-word-id=/],
  ['grammar-reading', /data-grammar-id=/],
];

const failures = [];
for (const level of levels) {
  for (const [kind, targetPattern] of kinds) {
    const relative = `dist/learn/${level}/${kind}/index.html`;
    const source = readFileSync(resolve(relative), 'utf8');
    if (!source.includes('lesson-coach.js')) {
      failures.push(`${relative}: lesson coach is missing`);
    }
    if (!targetPattern.test(source)) {
      failures.push(`${relative}: stable review target is missing`);
    }
    if (!source.includes('app.js')) {
      failures.push(`${relative}: shared Web–DraMap bridge is missing`);
    }
  }
}

const coach = readFileSync(resolve('dist/assets/lesson-coach.js'), 'utf8');
for (const selector of ['data-word-id', 'data-grammar-id', 'data-kanji', 'data-kana']) {
  if (!coach.includes(selector)) failures.push(`lesson-coach.js: ${selector} lookup is missing`);
}
for (const parameter of ['eventMissedRefs', 'eventResolvedRefs', 'item']) {
  if (!coach.includes(parameter)) failures.push(`lesson-coach.js: ${parameter} handoff is missing`);
}

if (failures.length) {
  console.error(failures.join('\n'));
  process.exitCode = 1;
} else {
  console.log('Review bridge audit passed for N5–N1 kanji, vocabulary, and grammar/reading.');
}
