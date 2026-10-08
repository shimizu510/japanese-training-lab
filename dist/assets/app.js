const menuButton = document.querySelector('.mobile-toggle');

if (menuButton) {
  menuButton.addEventListener('click', () => {
    const links = document.querySelector('.nav-links');
    const open = links.style.display === 'flex';
    links.style.display = open ? 'none' : 'flex';
    if (!open) {
      Object.assign(links.style, {
        position: 'absolute',
        top: '64px',
        left: '0',
        right: '0',
        padding: '20px',
        background: '#f7f5ef',
        flexDirection: 'column',
        borderBottom: '1px solid #c9c7be'
      });
    }
  });
}

const questions = [
  { q: 'Can you read ひらがな without romaji?', a: ['Not yet', 'Some characters', 'Yes, comfortably'] },
  { q: 'What is your main goal?', a: ['Start from the beginning', 'Travel and daily life', 'Pass the JLPT'] },
  { q: 'How well can you understand simple Japanese sentences?', a: ['Not yet', 'Slowly, with help', 'Comfortably'] },
  { q: 'Which training feels hardest?', a: ['Reading characters', 'Remembering words', 'Grammar and reading'] }
];

const progressKey = 'japanese-training-lab-progress';
let step = 0;
const answers = [];
const assessment = document.querySelector('[data-assessment]');

function saveRecommendation(recommendation) {
  try {
    localStorage.setItem(progressKey, JSON.stringify({
      ...recommendation,
      completedAt: new Date().toISOString()
    }));
  } catch (error) {
    console.info('Progress could not be saved in this browser.', error);
  }
}

function showSavedRecommendation() {
  if (!document.querySelector('.hero')) return;

  try {
    const saved = JSON.parse(localStorage.getItem(progressKey));
    if (!saved?.title || !saved?.href) return;

    const strip = document.querySelector('.principle-strip');
    const panel = document.createElement('section');
    panel.className = 'section';
    panel.innerHTML = `<div class="wrap"><div class="prescription"><article class="focus-card"><div class="eyebrow">Continue your plan</div><h3>${saved.title}</h3><p>${saved.body}</p><a class="button red" href="${saved.href}">Resume recommended course</a></article><div class="session-list"><div class="session"><b>01</b><div><strong>Your result is saved</strong><span>No account is required. Progress stays in this browser.</span></div><span class="tag">LOCAL</span></div></div></div></div>`;
    strip.insertAdjacentElement('afterend', panel);
  } catch (error) {
    localStorage.removeItem(progressKey);
  }
}

if (assessment) {
  const questionElement = assessment.querySelector('.question');
  const resultElement = assessment.querySelector('.result');
  const progressElement = assessment.querySelector('.assessment-progress span');

  function renderQuestion() {
    const item = questions[step];
    questionElement.innerHTML = `<div class="eyebrow">Question ${step + 1} of ${questions.length}</div><h2>${item.q}</h2><div class="choices">${item.a.map((answer, index) => `<button class="choice" data-value="${index}">${answer}</button>`).join('')}</div>`;
    progressElement.style.width = `${(step / questions.length) * 100}%`;
    questionElement.querySelectorAll('.choice').forEach(button => {
      button.addEventListener('click', () => {
        answers.push(Number(button.dataset.value));
        step += 1;
        step < questions.length ? renderQuestion() : showResult();
      });
    });
  }

  function showResult() {
    questionElement.style.display = 'none';
    progressElement.style.width = '100%';
    const score = answers.reduce((total, answer) => total + answer, 0);
    let recommendation = {
      title: 'Begin with Hiragana',
      body: 'Build fast sound-to-character recognition before adding vocabulary and grammar.',
      href: '../learn/hiragana/'
    };

    if (score >= 5) {
      recommendation = {
        title: 'Begin with Foundation Training',
        body: 'Strengthen vocabulary retrieval and basic sentence processing, then reassess.',
        href: '../courses/#foundation'
      };
    }
    if (score >= 7) {
      recommendation = {
        title: 'Start with a JLPT skills check',
        body: 'Your next step should isolate vocabulary, kanji, grammar and reading speed instead of guessing a level.',
        href: '../courses/#jlpt'
      };
    }

    saveRecommendation(recommendation);
    resultElement.innerHTML = `<div class="eyebrow">Your first prescription</div><h2>${recommendation.title}</h2><p>${recommendation.body}</p><div class="actions"><a class="button gold" href="${recommendation.href}">Open recommended course</a><a class="button" href="../courses/">Browse all courses</a></div>`;
    resultElement.classList.add('visible');
  }

  renderQuestion();
}

showSavedRecommendation();

function addGlobalPromotionDock() {
  if (document.querySelector('.global-promo-dock')) return;

  const scriptUrl = document.currentScript?.src || new URL('assets/app.js', document.baseURI).href;
  const portraitUrl = new URL('yuji-shimizu.jpg', scriptUrl).href;
  const promoStyles = document.createElement('link');
  promoStyles.rel = 'stylesheet';
  promoStyles.href = new URL('promo.css', scriptUrl).href;
  document.head.appendChild(promoStyles);
  const dock = document.createElement('aside');
  dock.className = 'global-promo-dock';
  dock.setAttribute('aria-label', 'Follow Yuji on TikTok and download DraMap');
  dock.innerHTML = `
    <div class="promo-person">
      <img src="${portraitUrl}" alt="Yuji Shimizu">
      <span><strong>YUJI @ Japan</strong><small>Live Japan & learn Japanese</small></span>
    </div>
    <div class="promo-actions">
      <a class="promo-tiktok" href="https://www.tiktok.com/@yuji.shimizu2?_r=1&_t=ZP-9AGyG1gwLnz" target="_blank" rel="noopener noreferrer"><span>TikTok</span><strong>Watch LIVE Japan ↗</strong></a>
      <a class="promo-dramap" href="https://apps.apple.com/us/app/dramap/id6761260013" target="_blank" rel="noopener noreferrer"><span>DraMap for iOS</span><strong>Learn Japanese ↗</strong></a>
    </div>`;
  document.body.appendChild(dock);
}

addGlobalPromotionDock();
