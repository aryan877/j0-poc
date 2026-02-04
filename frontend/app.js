const API_URL = 'http://localhost:3000';

let editor;
let currentProblem = null;
let activeTab = 'testcases';
let activeTestCase = 0;
let testResults = null;

// save/load code from localStorage
function getCodeKey(problemId, lang) {
  return `code_${problemId}_${lang}`;
}

function saveCode() {
  if (!currentProblem || !editor) return;
  const lang = document.getElementById('lang-select').value;
  const key = getCodeKey(currentProblem.id, lang);
  localStorage.setItem(key, editor.getValue());
}

function loadSavedCode(problemId, lang) {
  const key = getCodeKey(problemId, lang);
  return localStorage.getItem(key);
}

function resetCode() {
  if (!currentProblem) return;
  const lang = document.getElementById('lang-select').value;
  const key = getCodeKey(currentProblem.id, lang);
  localStorage.removeItem(key);
  if (currentProblem.starterCode[lang]) {
    editor.setValue(currentProblem.starterCode[lang]);
  }
}

// init monaco editor
require.config({ paths: { vs: 'https://cdn.jsdelivr.net/npm/monaco-editor@0.45.0/min/vs' } });

require(['vs/editor/editor.main'], function () {
  monaco.editor.defineTheme('custom-dark', {
    base: 'vs-dark',
    inherit: true,
    rules: [],
    colors: {
      'editor.background': '#1a1a1a',
      'editor.lineHighlightBackground': '#242424',
    }
  });

  editor = monaco.editor.create(document.getElementById('editor-container'), {
    value: '',
    language: 'python',
    theme: 'custom-dark',
    fontSize: 14,
    fontFamily: "'JetBrains Mono', monospace",
    minimap: { enabled: false },
    padding: { top: 16 },
    scrollBeyondLastLine: false,
    automaticLayout: true,
  });

  editor.addCommand(monaco.KeyMod.CtrlCmd | monaco.KeyCode.Enter, runTests);

  // auto-save code on every change
  editor.onDidChangeModelContent(() => {
    saveCode();
  });

  init();
});

function init() {
  // load saved preferences
  const savedLang = localStorage.getItem('selectedLang') || 'python';
  const savedProblem = parseInt(localStorage.getItem('selectedProblem')) || 1;

  // problem select
  const problemSelect = document.getElementById('problem-select');
  PROBLEMS.forEach(p => {
    const opt = document.createElement('option');
    opt.value = p.id;
    opt.textContent = `${p.id}. ${p.title}`;
    problemSelect.appendChild(opt);
  });
  problemSelect.value = savedProblem;
  problemSelect.addEventListener('change', (e) => {
    localStorage.setItem('selectedProblem', e.target.value);
    loadProblem(parseInt(e.target.value));
  });

  // language select
  const langSelect = document.getElementById('lang-select');
  Object.entries(LANG_MAP).forEach(([key, val]) => {
    const opt = document.createElement('option');
    opt.value = key;
    opt.textContent = val.name;
    langSelect.appendChild(opt);
  });
  langSelect.value = savedLang;
  langSelect.addEventListener('change', (e) => {
    localStorage.setItem('selectedLang', e.target.value);
    changeLanguage(e.target.value);
  });

  // buttons
  document.getElementById('reset-btn').addEventListener('click', resetCode);
  document.getElementById('run-btn').addEventListener('click', runTests);
  document.getElementById('submit-btn').addEventListener('click', submitTests);

  // tabs
  document.querySelectorAll('.results-tab').forEach(tab => {
    tab.addEventListener('click', () => switchTab(tab.dataset.tab));
  });

  loadProblem(savedProblem);
}

function loadProblem(id) {
  currentProblem = PROBLEMS.find(p => p.id === id);
  if (!currentProblem) return;

  // update header
  document.getElementById('problem-title').textContent = `${currentProblem.id}. ${currentProblem.title}`;
  const diffEl = document.getElementById('problem-difficulty');
  diffEl.textContent = currentProblem.difficulty.charAt(0).toUpperCase() + currentProblem.difficulty.slice(1);
  diffEl.className = `difficulty ${currentProblem.difficulty}`;

  // build problem content
  let html = currentProblem.description;

  html += '<h4>Examples</h4>';
  currentProblem.examples.forEach((ex, i) => {
    html += `<div class="example">
      <div class="example-label">Example ${i + 1}</div>
      <div><strong>Input:</strong> ${ex.input}</div>
      <div><strong>Output:</strong> ${ex.output}</div>
      ${ex.explanation ? `<div><strong>Explanation:</strong> ${ex.explanation}</div>` : ''}
    </div>`;
  });

  html += '<h4>Constraints</h4><div class="constraints"><ul style="margin-left: 20px;">';
  currentProblem.constraints.forEach(c => {
    html += `<li><code>${c}</code></li>`;
  });
  html += '</ul></div>';

  document.getElementById('problem-content').innerHTML = html;

  // set starter code and language mode
  const lang = document.getElementById('lang-select').value;
  monaco.editor.setModelLanguage(editor.getModel(), LANG_MAP[lang].monaco);

  // load saved code or fall back to starter code
  const savedCode = loadSavedCode(currentProblem.id, lang);
  if (savedCode) {
    editor.setValue(savedCode);
  } else if (currentProblem.starterCode[lang]) {
    editor.setValue(currentProblem.starterCode[lang]);
  }

  // reset state
  testResults = null;
  activeTestCase = 0;
  activeTab = 'testcases';
  document.querySelectorAll('.results-tab').forEach(t => t.classList.remove('active'));
  document.querySelector('[data-tab="testcases"]').classList.add('active');

  renderTestCases();
}

function changeLanguage(lang) {
  monaco.editor.setModelLanguage(editor.getModel(), LANG_MAP[lang].monaco);
  if (!currentProblem) return;

  // load saved code or fall back to starter code
  const savedCode = loadSavedCode(currentProblem.id, lang);
  if (savedCode) {
    editor.setValue(savedCode);
  } else if (currentProblem.starterCode[lang]) {
    editor.setValue(currentProblem.starterCode[lang]);
  }
}

function switchTab(tab) {
  activeTab = tab;
  document.querySelectorAll('.results-tab').forEach(t => t.classList.remove('active'));
  document.querySelector(`[data-tab="${tab}"]`).classList.add('active');

  if (tab === 'testcases') {
    renderTestCases();
  } else {
    renderResults();
  }
}

function renderTestCases() {
  if (!currentProblem) return;

  const testCases = currentProblem.testCases;

  // tabs for each test case
  let html = '<div class="testcase-tabs">';
  testCases.forEach((tc, i) => {
    html += `<button class="testcase-tab ${i === activeTestCase ? 'active' : ''}" onclick="selectTestCase(${i})">Case ${i + 1}</button>`;
  });
  html += '</div>';

  // content for each test case
  testCases.forEach((tc, i) => {
    const inputLines = tc.input.split('\n');
    html += `<div class="testcase-content ${i === activeTestCase ? 'active' : ''}" id="tc-${i}">`;

    inputLines.forEach((line, j) => {
      html += `<div class="input-group">
        <label class="input-label">Input ${inputLines.length > 1 ? j + 1 : ''}</label>
        <textarea class="input-value" data-tc="${i}" data-line="${j}" rows="1">${escapeHtml(line)}</textarea>
      </div>`;
    });

    html += `<div class="input-group">
      <label class="input-label">Expected Output</label>
      <div class="result-value">${escapeHtml(tc.expected)}</div>
    </div>`;

    html += '</div>';
  });

  document.getElementById('results-content').innerHTML = html;

  // handle input changes
  document.querySelectorAll('.input-value').forEach(el => {
    el.addEventListener('input', (e) => {
      const tcIdx = parseInt(e.target.dataset.tc);
      const lineIdx = parseInt(e.target.dataset.line);
      const lines = currentProblem.testCases[tcIdx].input.split('\n');
      lines[lineIdx] = e.target.value;
      currentProblem.testCases[tcIdx].input = lines.join('\n');
    });
  });
}

function selectTestCase(idx) {
  activeTestCase = idx;
  document.querySelectorAll('.testcase-tab').forEach((t, i) => {
    t.classList.toggle('active', i === idx);
  });
  document.querySelectorAll('.testcase-content').forEach((c, i) => {
    c.classList.toggle('active', i === idx);
  });
}

function renderResults() {
  if (!testResults) {
    document.getElementById('results-content').innerHTML = '<div style="color: var(--text-secondary); padding: 20px;">Run your code to see results</div>';
    return;
  }

  const passedCount = testResults.filter(r => r.passed).length;
  const totalCount = testResults.length;
  const allPassed = passedCount === totalCount;

  let html = `
    <div class="result-summary">
      <div class="result-status ${allPassed ? 'accepted' : 'wrong'}">
        ${allPassed ? 'Accepted' : 'Wrong Answer'}
      </div>
      <div class="result-stats">
        ${passedCount}/${totalCount} test cases passed
        ${testResults[0]?.time ? ` · ${testResults[0].time}s` : ''}
        ${testResults[0]?.memory ? ` · ${(testResults[0].memory / 1024).toFixed(1)} MB` : ''}
      </div>
    </div>
  `;

  testResults.forEach((r, i) => {
    html += `
      <div class="result-case ${i === 0 ? 'expanded' : ''}" onclick="this.classList.toggle('expanded')">
        <div class="result-case-header">
          <span class="case-icon ${r.passed ? 'pass' : 'fail'}">${r.passed ? '✓' : '✗'}</span>
          Case ${r.index}
        </div>
        <div class="result-case-body">
          <div class="result-row">
            <div class="result-label">Input</div>
            <div class="result-value">${escapeHtml(r.input)}</div>
          </div>
          <div class="result-row">
            <div class="result-label">Expected</div>
            <div class="result-value">${escapeHtml(r.expected)}</div>
          </div>
          <div class="result-row">
            <div class="result-label">Output</div>
            <div class="result-value ${r.passed ? '' : 'wrong'}">${escapeHtml(r.output)}</div>
          </div>
        </div>
      </div>
    `;
  });

  document.getElementById('results-content').innerHTML = html;
}

async function runTests() {
  await executeTests(false);
}

async function submitTests() {
  await executeTests(true);
}

async function executeTests(isSubmit) {
  if (!currentProblem) return;

  const runBtn = document.getElementById('run-btn');
  const submitBtn = document.getElementById('submit-btn');
  runBtn.disabled = true;
  submitBtn.disabled = true;
  runBtn.innerHTML = '<span class="loading"></span> Running';

  const code = editor.getValue();
  const lang = document.getElementById('lang-select').value;
  const langId = LANG_MAP[lang].id;

  const testCases = currentProblem.testCases;
  const results = [];

  for (let i = 0; i < testCases.length; i++) {
    const tc = testCases[i];

    try {
      const res = await fetch(`${API_URL}/submit`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          source_code: code,
          language_id: langId,
          stdin: tc.input
        })
      });

      const data = await res.json();
      const result = await pollResult(data.submissionId);

      const output = (result.stdout || '').trim();
      const expected = tc.expected.trim();

      results.push({
        index: i + 1,
        input: tc.input,
        expected: expected,
        output: output,
        passed: output === expected,
        time: result.time,
        memory: result.memory,
        stderr: result.stderr,
        compile_output: result.compile_output
      });

    } catch (err) {
      results.push({
        index: i + 1,
        input: tc.input,
        expected: tc.expected,
        output: 'Error: ' + err.message,
        passed: false
      });
    }
  }

  testResults = results;

  // switch to results tab
  switchTab('result');

  runBtn.disabled = false;
  submitBtn.disabled = false;
  runBtn.innerHTML = 'Run';
}

async function pollResult(submissionId) {
  for (let i = 0; i < 60; i++) {
    await new Promise(r => setTimeout(r, 500));
    const res = await fetch(`${API_URL}/submission/${submissionId}`);
    const data = await res.json();
    if (data.status === 'completed' || data.status === 'failed') {
      return data;
    }
  }
  throw new Error('Timeout');
}

function escapeHtml(str) {
  if (!str) return '';
  return str.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}

// resize panel drag
document.addEventListener('DOMContentLoaded', function() {
  const handle = document.querySelector('.resize-handle');
  const panel = document.querySelector('.results-panel');
  const editorContainer = document.getElementById('editor-container');

  if (!handle || !panel) return;

  let isDragging = false;
  let startY, startPanelHeight, startEditorHeight;

  handle.addEventListener('mousedown', (e) => {
    e.preventDefault();
    isDragging = true;
    startY = e.clientY;
    startPanelHeight = panel.offsetHeight;
    startEditorHeight = editorContainer.offsetHeight;
    document.body.style.cursor = 'ns-resize';
    document.body.style.userSelect = 'none';
  });

  document.addEventListener('mousemove', (e) => {
    if (!isDragging) return;
    e.preventDefault();
    const diff = startY - e.clientY;
    const newPanelHeight = Math.min(Math.max(startPanelHeight + diff, 150), 500);
    const newEditorHeight = Math.max(startEditorHeight - diff, 150);
    panel.style.height = newPanelHeight + 'px';
    editorContainer.style.height = newEditorHeight + 'px';
    editorContainer.style.flex = 'none';
    // tell monaco to recalculate its size
    if (editor) editor.layout();
  });

  document.addEventListener('mouseup', () => {
    if (isDragging) {
      isDragging = false;
      document.body.style.cursor = '';
      document.body.style.userSelect = '';
    }
  });
});
