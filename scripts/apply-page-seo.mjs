import { readFileSync, writeFileSync } from 'node:fs';

const root = new URL('../', import.meta.url);
const brand = 'Japanese Training Lab';

const pages = {
  'dist/index.html': {
    title: 'Learn Japanese Free – Lessons & JLPT Practice',
    description: 'Learn Japanese online free with interactive Hiragana, Katakana, kanji, vocabulary, grammar and reading lessons from beginner through JLPT N1. No signup required.'
  },
  'dist/courses/index.html': {
    title: 'Free Japanese Courses – Hiragana to JLPT N1',
    description: 'Choose a free Japanese course from Hiragana and Katakana through JLPT N5, N4, N3, N2 and N1 kanji, vocabulary, grammar and reading practice.'
  },
  'dist/assessment/index.html': {
    title: 'Free Japanese Level Test – Find Where to Start',
    description: 'Take a free Japanese level test and get a personal study route from Hiragana through JLPT N1. Eight questions, instant results and no signup.'
  },
  'dist/roadmap/index.html': {
    title: 'Learn Japanese Roadmap – Beginner to JLPT N1',
    description: 'Follow a clear Japanese learning roadmap from Hiragana and Katakana through vocabulary, kanji, grammar, reading and JLPT N1.'
  },
  'dist/review/index.html': {
    title: 'Japanese Review Practice – Kanji, Words & Grammar',
    description: 'Review Japanese kanji, vocabulary, grammar and reading at the right time with a personal practice queue saved on your device.'
  },
  'dist/progress/index.html': {
    title: 'Japanese Study Tracker – Continue Your Free Course',
    description: 'See your Japanese learning progress, continue your recommended course and keep moving from beginner lessons toward JLPT N1.'
  },
  'dist/share/index.html': {
    title: 'Share Free Japanese Lessons – Hiragana to JLPT N1',
    description: 'Share one free Japanese lesson for Hiragana, Katakana, vocabulary, kanji, grammar or JLPT N5 through N1. No signup required.'
  },
  'dist/learn/hiragana/index.html': {
    title: 'Free Hiragana Practice – Learn All 46 Characters',
    description: 'Practice all 46 basic Hiragana online free with sounds, character recognition, reading recall, contrast exercises and guided writing.'
  },
  'dist/learn/katakana/index.html': {
    title: 'Free Katakana Practice – Learn All 46 Characters',
    description: 'Practice all 46 basic Katakana online free with sounds, character recognition, reading recall, contrast exercises and guided writing.'
  },
  'dist/learn/basic-words/index.html': {
    title: 'Free Basic Japanese Vocabulary Practice – 345 Words',
    description: 'Learn 345 essential Japanese words online free through sound, images, meaning and recall practice. Build the vocabulary needed for beginner lessons.'
  },
  'dist/learn/grammar-reading/index.html': {
    title: 'Free Basic Japanese Grammar Practice – 64 Patterns',
    description: 'Practice 64 essential Japanese grammar patterns online free with guided examples, sentence building, listening and beginner reading exercises.'
  },
  'dist/learn/n5/vocabulary/index.html': {
    title: 'Free JLPT N5 Vocabulary Practice – 372 Words',
    description: 'Practice 372 JLPT N5 vocabulary words online free with sound, images, meanings and recall exercises. No signup required.'
  },
  'dist/learn/n5/kanji/index.html': {
    title: 'Free JLPT N5 Kanji Practice – 103 Essential Kanji',
    description: 'Practice 103 essential JLPT N5 kanji online free with meanings, readings, example words and guided recall exercises.'
  },
  'dist/learn/n5/grammar-reading/index.html': {
    title: 'JLPT N5 Grammar Practice – 37 Patterns',
    description: 'Practice 37 JLPT N5 grammar patterns online free with guided examples, sentence building and Japanese reading exercises.'
  },
  'dist/learn/n5/manga/index.html': {
    title: 'Free N5 Japanese Reading – Kawaii Character Manga',
    description: 'Practice beginner N5 Japanese reading free with an original manga about Japan’s kawaii character culture, optional English support and comprehension questions.'
  },
  'dist/learn/n4/vocabulary/index.html': {
    title: 'Free JLPT N4 Vocabulary Practice – 850 Words',
    description: 'Practice 850 JLPT N4 vocabulary words online free with sound, images, meanings and recall exercises. No signup required.'
  },
  'dist/learn/n4/kanji/index.html': {
    title: 'Free JLPT N4 Kanji Practice – 144 Essential Kanji',
    description: 'Practice 144 essential JLPT N4 kanji online free with meanings, readings, example words and guided recall exercises.'
  },
  'dist/learn/n4/grammar-reading/index.html': {
    title: 'JLPT N4 Grammar Practice – 88 Patterns',
    description: 'Practice 88 JLPT N4 grammar patterns online free with guided examples, sentence building and Japanese reading exercises.'
  },
  'dist/learn/n4/manga/index.html': {
    title: 'Free N4 Japanese Reading Practice – Original Manga',
    description: 'Practice JLPT N4 Japanese reading free with an original manga about Japan, optional English support and comprehension questions.'
  },
  'dist/learn/n3/vocabulary/index.html': {
    title: 'Free JLPT N3 Vocabulary Practice – 2,135 Words',
    description: 'Practice 2,135 JLPT N3 vocabulary words online free with sound, images, meanings and recall exercises. No signup required.'
  },
  'dist/learn/n3/kanji/index.html': {
    title: 'Free JLPT N3 Kanji Practice – 403 Essential Kanji',
    description: 'Practice 403 essential JLPT N3 kanji online free with meanings, readings, example words and guided recall exercises.'
  },
  'dist/learn/n3/grammar-reading/index.html': {
    title: 'JLPT N3 Grammar Practice – 60 Patterns',
    description: 'Practice 60 JLPT N3 grammar patterns online free with guided examples, sentence building and Japanese reading exercises.'
  },
  'dist/learn/n3/manga/index.html': {
    title: 'Free N3 Japanese Reading Practice – Original Manga',
    description: 'Practice JLPT N3 Japanese reading free with an original manga, optional English support and comprehension questions. No signup required.'
  },
  'dist/learn/n2/vocabulary/index.html': {
    title: 'Free JLPT N2 Vocabulary Practice – 1,804 Words',
    description: 'Practice 1,804 JLPT N2 vocabulary words online free with sound, images, meanings and recall exercises. No signup required.'
  },
  'dist/learn/n2/kanji/index.html': {
    title: 'Free JLPT N2 Kanji Practice – 350 Essential Kanji',
    description: 'Practice 350 essential JLPT N2 kanji online free with meanings, readings, example words and guided recall exercises.'
  },
  'dist/learn/n2/grammar-reading/index.html': {
    title: 'JLPT N2 Grammar Practice – 70 Patterns',
    description: 'Practice 70 JLPT N2 grammar patterns online free with guided examples, sentence building and Japanese reading exercises.'
  },
  'dist/learn/n1/vocabulary/index.html': {
    title: 'Free JLPT N1 Vocabulary Practice – 2,699 Words',
    description: 'Practice 2,699 JLPT N1 vocabulary words online free with sound, images, meanings and recall exercises. No signup required.'
  },
  'dist/learn/n1/kanji/index.html': {
    title: 'Free JLPT N1 Kanji Practice – 1,136 Essential Kanji',
    description: 'Practice 1,136 essential JLPT N1 kanji online free with meanings, readings, example words and guided recall exercises.'
  },
  'dist/learn/n1/grammar-reading/index.html': {
    title: 'JLPT N1 Grammar Practice – 70 Patterns',
    description: 'Practice 70 JLPT N1 grammar patterns online free with guided examples, sentence building and advanced Japanese reading exercises.'
  }
};

function escapeAttribute(value) {
  return value.replaceAll('&', '&amp;').replaceAll('"', '&quot;');
}

for (const [relative, metadata] of Object.entries(pages)) {
  const url = new URL(relative, root);
  let html = readFileSync(url, 'utf8');
  const displayTitle = `${metadata.title} | ${brand}`;
  const title = escapeAttribute(displayTitle);
  const description = escapeAttribute(metadata.description);

  if (!/<title>.*?<\/title>/s.test(html)) throw new Error(`Missing title: ${relative}`);
  if (!/<meta name="description" content="[^"]*">/.test(html)) throw new Error(`Missing description: ${relative}`);

  html = html.replace(/<title>.*?<\/title>/s, `<title>${title}</title>`);
  html = html.replace(/<meta name="description" content="[^"]*">/, `<meta name="description" content="${description}">`);

  if (/<meta property="og:title" content="[^"]*">/.test(html)) {
    html = html.replace(/<meta property="og:title" content="[^"]*">/, `<meta property="og:title" content="${title}">`);
  }
  if (/<meta property="og:description" content="[^"]*">/.test(html)) {
    html = html.replace(/<meta property="og:description" content="[^"]*">/, `<meta property="og:description" content="${description}">`);
  }
  if (/<meta name="twitter:title" content="[^"]*">/.test(html)) {
    html = html.replace(/<meta name="twitter:title" content="[^"]*">/, `<meta name="twitter:title" content="${title}">`);
  }
  if (/<meta name="twitter:description" content="[^"]*">/.test(html)) {
    html = html.replace(/<meta name="twitter:description" content="[^"]*">/, `<meta name="twitter:description" content="${description}">`);
  }

  writeFileSync(url, html);
}

console.log(`Applied unique SEO titles and descriptions to ${Object.keys(pages).length} pages.`);
