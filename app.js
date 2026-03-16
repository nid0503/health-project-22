import { sections, exercises, schedule } from './questions.js';

// ── State ─────────────────────────────────────────────────────────────────────
const state = {
  currentScreen: 0,   // 0 = welcome, 1–3 = sections, 4 = results
  answers: {},        // { questionId: numericValue }
};

// Screen order: welcome, section[0], section[1], section[2], results
const TOTAL_STEPS = sections.length; // 3

// ── Bootstrap ─────────────────────────────────────────────────────────────────
const root = document.getElementById('root');
root.innerHTML = buildShell();
renderCurrentScreen();

// ── Shell (permanent chrome) ───────────────────────────────────────────────────
function buildShell() {
  const stepDots = sections.map((s, i) => `
    <div class="progress-step" id="step${i + 1}">
      <div class="step-dot"></div>${s.title.split(' ')[0]}
    </div>`).join('') + `
    <div class="progress-step" id="step${sections.length + 1}">
      <div class="step-dot"></div>Results
    </div>`;

  return `
    <div class="app">
      <header class="site-header">
        <div class="leaf-icon">🌿</div>
        <h1 class="site-title">Memory &amp; Wellness<br>Questionnaire</h1>
        <p class="site-subtitle">A gentle guide to understanding your mind and mood</p>
      </header>

      <div class="progress-container" id="progressBar" style="display:none">
        <div class="progress-labels">
          <span id="progressText">Step 1 of ${TOTAL_STEPS}</span>
          <span id="progressPct">0%</span>
        </div>
        <div class="progress-track">
          <div class="progress-fill" id="progressFill" style="width:0%"></div>
        </div>
        <div class="progress-steps">${stepDots}</div>
      </div>

      <div id="screenContainer"></div>
    </div>`;
}

// ── Screen router ─────────────────────────────────────────────────────────────
function renderCurrentScreen() {
  const container = document.getElementById('screenContainer');
  const s = state.currentScreen;

  if (s === 0) {
    container.innerHTML = renderWelcome();
  } else if (s >= 1 && s <= sections.length) {
    container.innerHTML = renderSection(sections[s - 1], s);
  } else {
    container.innerHTML = renderResults();
  }

  // Restore previously selected answers (so back-navigation keeps choices)
  if (s >= 1 && s <= sections.length) {
    restoreAnswers(sections[s - 1]);
  }
}

// ── Welcome screen ─────────────────────────────────────────────────────────────
function renderWelcome() {
  const tiles = sections.map(sec => `
    <div class="info-tile">
      <div class="icon">${sec.icon}</div>
      <div class="label">${sec.title}</div>
      <div class="desc">${sec.questions.length} questions about ${sec.description.toLowerCase()}</div>
    </div>`).join('');

  return `
    <div class="screen active" id="screen-welcome">
      <div class="welcome-card">
        <h2>Welcome, Friend</h2>
        <p>This questionnaire is designed to help you reflect on your memory, mood, and daily habits — and to offer gentle, personalised suggestions for a brighter, clearer mind.</p>

        <div class="info-grid">${tiles}</div>

        <div class="note-box">
          <strong>Please note:</strong> This is not a medical test. It is a friendly self-reflection tool. If you have concerns about your health, please speak with your doctor or a healthcare professional.
        </div>

        <button class="btn-start" id="btnStart">Begin the Questionnaire</button>
      </div>
    </div>`;
}

// ── Section screen ─────────────────────────────────────────────────────────────
function renderSection(section, screenIndex) {
  const questions = section.questions.map((q, i) =>
    renderQuestion(q, i + 1, section.questions.length, section)
  ).join('');

  const isFirst = screenIndex === 1;
  const isLast  = screenIndex === sections.length;

  const backLabel  = isFirst ? null : '&larr; Back';
  const nextLabel  = isLast  ? 'See My Results &rarr;' : 'Next &rarr;';

  const backBtn = isFirst ? `<span></span>` :
    `<button class="btn btn-secondary" id="btnBack">${backLabel}</button>`;

  return `
    <div class="screen active" id="screen-${section.id}">
      <div class="section-card">
        <div class="section-header">
          <div class="section-icon ${section.iconClass}">${section.icon}</div>
          <div>
            <div class="section-title">${section.title}</div>
            <div class="section-desc">${section.description}</div>
          </div>
        </div>

        ${questions}

        <div class="unanswered-msg" id="section-error">
          Please answer all questions before continuing.
        </div>

        <div class="nav-buttons">
          ${backBtn}
          <button class="btn btn-primary" id="btnNext">${nextLabel}</button>
        </div>
      </div>
    </div>`;
}

// ── Question renderer ──────────────────────────────────────────────────────────
function renderQuestion(q, num, total, section) {
  const controls = section.type === 'likert'
    ? renderLikert(q, section.scaleLabels)
    : renderChoice(q);

  return `
    <div class="question-block">
      <div class="question-number">Question ${num} of ${total}</div>
      <div class="question-text">${q.text}</div>
      ${controls}
    </div>`;
}

function renderLikert(q, scaleLabels) {
  const options = q.labels.map((label, i) => `
    <div class="likert-option">
      <input type="radio" name="${q.id}" id="${q.id}-${i + 1}" value="${i + 1}">
      <label for="${q.id}-${i + 1}">
        <div class="likert-dot"></div>
        <div class="likert-word">${label}</div>
      </label>
    </div>`).join('');

  return `
    <div class="likert-scale">${options}</div>
    <div class="scale-legend">
      <span>${scaleLabels[0]}</span>
      <span>${scaleLabels[1]}</span>
    </div>`;
}

function renderChoice(q) {
  const options = q.options.map((opt, i) => `
    <div class="choice-option">
      <input type="radio" name="${q.id}" id="${q.id}-${i + 1}" value="${i + 1}">
      <label for="${q.id}-${i + 1}">${opt}</label>
    </div>`).join('');

  return `<div class="choice-group">${options}</div>`;
}

// ── Results screen ─────────────────────────────────────────────────────────────
function renderResults() {
  const scores  = calcScores();
  const levels  = classifyScores(scores);
  const pcts    = calcPcts(scores);
  const greeting = calcGreeting(pcts);
  const memTips  = pickTips('memory',  levels.memory);
  const anxTips  = pickTips('anxiety', levels.anxiety);

  // Habit penalty tips
  if (levels.habits === 'poor') {
    anxTips.push({ icon: '→', color: 'terra', text: 'Even a 10-minute daily walk can improve both memory and mood significantly. Start with a short, enjoyable route near home.' });
    memTips.push({ icon: '→', color: 'terra', text: 'A diet rich in colourful vegetables, berries, nuts, and plenty of water supports brain health. Try adding one extra fruit or vegetable per day.' });
  }

  const scoreTiles = [
    { label: 'Memory Score',    value: pcts.memory,  status: statusLabel(levels.memory) },
    { label: 'Mood Score',      value: pcts.anxiety, status: statusLabel(levels.anxiety) },
    { label: 'Lifestyle Score', value: pcts.habits,  status: statusLabel(levels.habits) },
  ].map(t => `
    <div class="score-tile">
      <div class="score-label">${t.label}</div>
      <div class="score-value">${t.value}%</div>
      <div class="score-status">${t.status}</div>
    </div>`).join('');

  const exerciseCards = exercises.map(e => `
    <div class="exercise-card ${e.theme}">
      <div class="ex-icon">${e.icon}</div>
      <div class="ex-title">${e.title}</div>
      <div class="ex-desc">${e.desc}</div>
    </div>`).join('');

  const scheduleRows = schedule.map(r => `
    <div class="schedule-row">
      <div class="schedule-time">${r.time}</div>
      <div class="schedule-activity">${r.activity}</div>
    </div>`).join('');

  return `
    <div class="screen active" id="screen-results">
      <div class="results-hero">
        <h2>${greeting.heading}</h2>
        <p class="subtitle">${greeting.sub}</p>
        <div class="score-grid">${scoreTiles}</div>
      </div>

      <div class="professional-note">
        <strong>A gentle reminder:</strong> These results are not a diagnosis. They are a personal reflection tool to help guide your wellbeing. If you have significant concerns, please talk to your doctor or a trusted healthcare professional.
      </div>

      <div class="result-section">
        <h3>🧠 Your Memory Tips</h3>
        <ul class="tip-list">${renderTipItems(memTips)}</ul>
      </div>

      <div class="result-section">
        <h3>🌸 Your Mood &amp; Calm Tips</h3>
        <ul class="tip-list">${renderTipItems(anxTips)}</ul>
      </div>

      <div class="result-section">
        <h3>🌳 Recommended Daily Activities</h3>
        <div class="exercise-grid">${exerciseCards}</div>
      </div>

      <div class="result-section">
        <h3>☀️ Suggested Daily Routine</h3>
        <div class="daily-schedule">${scheduleRows}</div>
      </div>

      <div class="result-footer">
        <button class="print-btn" id="btnPrint">Print My Results</button>
        <button class="restart-btn" id="btnRestart">Start Over</button>
      </div>
    </div>`;
}

// ── Score engine ───────────────────────────────────────────────────────────────
function calcScores() {
  const sum = ids => ids.reduce((acc, id) => acc + (state.answers[id] ?? 3), 0);
  return {
    memory:  sum(sections[0].questions.map(q => q.id)),
    anxiety: sum(sections[1].questions.map(q => q.id)),
    habits:  sum(sections[2].questions.map(q => q.id)),
  };
}

function classifyScores({ memory, anxiety, habits }) {
  return {
    memory:  memory  <= 18 ? 'low' : memory  <= 30 ? 'moderate' : 'high',
    anxiety: anxiety <= 18 ? 'low' : anxiety <= 30 ? 'moderate' : 'high',
    habits:  habits  <= 8  ? 'good' : habits <= 12 ? 'moderate' : 'poor',
  };
}

function calcPcts({ memory, anxiety, habits }) {
  return {
    memory:  Math.round(100 - ((memory  - 10) / 40) * 100),
    anxiety: Math.round(100 - ((anxiety - 10) / 40) * 100),
    habits:  Math.round(100 - ((habits  -  5) / 15) * 100),
  };
}

function calcGreeting(pcts) {
  const total = pcts.memory + pcts.anxiety + pcts.habits;
  if (total >= 210) return { heading: 'You are doing wonderfully!',    sub: 'Your results show a healthy mind and good habits — keep it up!' };
  if (total >= 150) return { heading: 'You have a good foundation!',   sub: 'A few gentle adjustments could help you feel even better.' };
  return              { heading: 'Thank you for your honesty.',        sub: 'Your results highlight some areas where gentle support could make a real difference.' };
}

function statusLabel(level) {
  return { low: 'Doing Well', moderate: 'Some Challenges', high: 'Needs Attention', good: 'Excellent', poor: 'Needs Attention' }[level] ?? 'Moderate';
}

function pickTips(domain, level) {
  const map = {
    memory: {
      low: [
        { icon: '✓', color: 'sage', text: 'Your memory is in great shape! Keep engaging in activities you enjoy — this is the best way to maintain it.' },
        { icon: '✓', color: 'sage', text: 'Try learning something new occasionally — a recipe, a song, or a language phrase — to build new neural connections.' },
        { icon: '✓', color: 'sage', text: 'Daily crosswords or word puzzles can help maintain your strong recall skills.' },
      ],
      moderate: [
        { icon: '→', color: 'terra', text: 'Use a daily planner or notepad to write down appointments, tasks, and names. Externalising memory reduces mental load.' },
        { icon: '→', color: 'terra', text: 'Try the "name + face" technique: when meeting someone, silently repeat their name 3 times and link it to a feature of their face.' },
        { icon: '→', color: 'terra', text: 'Keep a consistent routine — doing things at the same time each day reduces the chance of forgetting.' },
        { icon: '→', color: 'terra', text: 'Puzzles, reading, and mentally stimulating hobbies for even 15 minutes a day make a measurable difference over time.' },
      ],
      high: [
        { icon: '!', color: 'rose', text: 'Consider speaking with your doctor about your memory concerns — many memory issues are very treatable.' },
        { icon: '!', color: 'rose', text: 'Keep a memory diary: writing down what you notice is very helpful information for a healthcare professional.' },
        { icon: '→', color: 'terra', text: 'Use reminder apps, sticky notes, or pill organisers to help with daily tasks. There is no shame in using helpful tools.' },
        { icon: '→', color: 'terra', text: 'Ensure you are getting enough sleep — poor sleep is one of the biggest contributors to memory difficulties at any age.' },
      ],
    },
    anxiety: {
      low: [
        { icon: '✓', color: 'sage', text: 'Your emotional wellbeing looks positive! Continue doing whatever brings you joy and connection.' },
        { icon: '✓', color: 'sage', text: 'Maintaining social connections is one of the strongest protectors of mental health — keep nurturing your relationships.' },
        { icon: '✓', color: 'sage', text: 'A brief daily gratitude practice (writing 3 good things) helps maintain a positive outlook over time.' },
      ],
      moderate: [
        { icon: '→', color: 'terra', text: "Try the 4-7-8 breathing technique daily: inhale for 4 counts, hold for 7, exhale for 8. This activates your body's natural calm response." },
        { icon: '→', color: 'terra', text: 'When worried thoughts arise, write them down and ask yourself: "Is this likely? What could I do?" Writing externalises worry.' },
        { icon: '→', color: 'terra', text: 'Limit news to a set time each day. Constant updates can amplify anxiety without adding useful information.' },
        { icon: '→', color: 'terra', text: 'Connect with someone you trust once a day, even briefly. A short phone call can significantly reduce feelings of loneliness.' },
      ],
      high: [
        { icon: '!', color: 'rose', text: 'You are not alone — anxiety and low mood are very common and very treatable. Please speak with your doctor or a counsellor.' },
        { icon: '!', color: 'rose', text: 'If you are feeling very low, consider contacting a helpline or support service in your area. Asking for help is a sign of strength.' },
        { icon: '→', color: 'terra', text: 'Start very small: a 5-minute walk outside, one phone call, or one cup of tea with someone. Small steps create momentum.' },
        { icon: '→', color: 'terra', text: 'A body scan relaxation before sleep can significantly improve sleep quality and reduce nighttime anxiety.' },
      ],
    },
  };
  return [...(map[domain][level] ?? [])];
}

function renderTipItems(tips) {
  return tips.map(t => `
    <li class="tip-item">
      <div class="tip-bullet ${t.color}">${t.icon}</div>
      <div>${t.text}</div>
    </li>`).join('');
}

// ── Answer persistence ─────────────────────────────────────────────────────────
function saveAnswers(section) {
  section.questions.forEach(q => {
    const checked = document.querySelector(`input[name="${q.id}"]:checked`);
    if (checked) state.answers[q.id] = parseInt(checked.value);
  });
}

function restoreAnswers(section) {
  section.questions.forEach(q => {
    const val = state.answers[q.id];
    if (val !== undefined) {
      const input = document.querySelector(`input[name="${q.id}"][value="${val}"]`);
      if (input) input.checked = true;
    }
  });
}

// ── Validation ─────────────────────────────────────────────────────────────────
function allAnswered(section) {
  return section.questions.every(q =>
    document.querySelector(`input[name="${q.id}"]:checked`)
  );
}

// ── Navigation ─────────────────────────────────────────────────────────────────
function goTo(n) {
  state.currentScreen = n;
  renderCurrentScreen();
  updateProgress(n);
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

function updateProgress(n) {
  const bar = document.getElementById('progressBar');
  if (!bar) return;

  bar.style.display = n === 0 ? 'none' : 'block';
  if (n === 0) return;

  const pct = Math.round((n / (TOTAL_STEPS + 1)) * 100);
  document.getElementById('progressFill').style.width = pct + '%';
  document.getElementById('progressPct').textContent = pct + '%';

  const labels = ['', ...sections.map(s => s.title), 'Results'];
  document.getElementById('progressText').textContent =
    n <= TOTAL_STEPS ? `Step ${n} of ${TOTAL_STEPS}: ${labels[n]}` : 'Your Results';

  for (let i = 1; i <= TOTAL_STEPS + 1; i++) {
    const el = document.getElementById(`step${i}`);
    if (!el) continue;
    el.classList.remove('active', 'done');
    if (i === n) el.classList.add('active');
    else if (i < n) el.classList.add('done');
  }
}

// ── Event delegation ───────────────────────────────────────────────────────────
document.addEventListener('click', e => {
  const t = e.target;

  if (t.id === 'btnStart') {
    goTo(1);
    return;
  }

  if (t.id === 'btnNext') {
    const s = state.currentScreen;
    const section = sections[s - 1];

    if (!allAnswered(section)) {
      const err = document.getElementById('section-error');
      err.style.display = 'block';
      err.scrollIntoView({ behavior: 'smooth', block: 'center' });
      return;
    }

    saveAnswers(section);

    const next = s + 1;
    if (next > sections.length) {
      goTo(sections.length + 1); // results
    } else {
      goTo(next);
    }
    return;
  }

  if (t.id === 'btnBack') {
    const s = state.currentScreen;
    saveAnswers(sections[s - 1]);
    goTo(s - 1);
    return;
  }

  if (t.id === 'btnPrint') {
    window.print();
    return;
  }

  if (t.id === 'btnRestart') {
    state.answers = {};
    goTo(0);
    return;
  }
});
