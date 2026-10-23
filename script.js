/*
 * CursosHub — lógica do questionário e das recomendações.
 * Os textos, perguntas e cursos ficam em data.js.
 */
(function () {
  'use strict';

  const { questions: baseQuestions, courses, focusByInterest, weights } = CURSOSHUB;

  const STORAGE_KEY = 'cursoshub:progress:v1';
  const MAX_PICKS = 2;      // opções por pergunta de múltipla escolha
  const PAGE_SIZE = 3;      // cursos mostrados por vez
  const MAX_RESULTS = 9;    // máximo de cursos listados
  const MAX_COMPARE = 3;    // máximo de cursos na comparação
  const EMEC_URL = 'https://emec.mec.gov.br/';
  const MAX_INSTITUTIONS = 4; // faculdades mostradas por curso
  const GOV_URL = 'https://acessounico.mec.gov.br/';

  const $ = (id) => document.getElementById(id);
  const quiz = $('quiz');
  const results = $('results');
  const progress = $('progress');
  const progressbar = $('progressbar');
  const stepLabel = $('stepLabel');
  const live = $('live');

  let questions = baseQuestions;
  let step = 0;
  let answers = {};
  let focusNotice = false;   // aviso quando as opções do funil mudam
  let resumed = false;       // aviso de progresso restaurado
  let candidates = [];       // cursos do resultado atual
  let visible = PAGE_SIZE;   // quantos cursos estão visíveis
  let compare = [];          // nomes dos cursos marcados para comparar
  let compareMsg = '';

  /* ---------- utilidades ---------- */

  function announce(msg) {
    live.textContent = '';
    setTimeout(() => { live.textContent = msg; }, 60);
  }

  function setProgress(pct) {
    progress.style.width = pct + '%';
    progressbar.setAttribute('aria-valuenow', String(Math.round(pct)));
  }

  function plural(n, one, many) { return n === 1 ? one : many; }
  function capitalize(s) { return s.charAt(0).toUpperCase() + s.slice(1); }

  async function copyText(text) {
    try {
      await navigator.clipboard.writeText(text);
      return true;
    } catch (e) {
      try {
        const ta = document.createElement('textarea');
        ta.value = text;
        ta.setAttribute('readonly', '');
        ta.style.cssText = 'position:fixed;opacity:0';
        document.body.appendChild(ta);
        ta.select();
        const ok = document.execCommand('copy');
        ta.remove();
        return ok;
      } catch (e2) {
        return false;
      }
    }
  }

  function esc(s) {
    return String(s).replace(/[&<>"']/g, (ch) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[ch]));
  }

  function formatDate(iso) {
    const [y, m, d] = iso.split('-');
    return `${d}/${m}/${y}`;
  }

  function flashButton(btn, text, original) {
    btn.textContent = text;
    setTimeout(() => { btn.textContent = original; }, 2500);
  }

  /* ---------- progresso salvo e link compartilhável ---------- */

  function save() {
    try { localStorage.setItem(STORAGE_KEY, JSON.stringify({ step, answers })); } catch (e) { /* sem armazenamento */ }
  }
  function loadSaved() {
    try { return JSON.parse(localStorage.getItem(STORAGE_KEY) || 'null'); } catch (e) { return null; }
  }
  function clearSaved() {
    try { localStorage.removeItem(STORAGE_KEY); } catch (e) { /* sem armazenamento */ }
  }

  function hashString() {
    return Object.entries(answers).map(([k, v]) => `${k}=${v.join('.')}`).join('&');
  }
  function syncHash() {
    try { history.replaceState(null, '', '#' + hashString()); } catch (e) { /* ignorado */ }
  }
  function clearHash() {
    try { history.replaceState(null, '', location.pathname + location.search); } catch (e) { /* ignorado */ }
  }
  function shareUrl() {
    return location.href.split('#')[0] + '#' + hashString();
  }

  // Mantém só valores que existem de verdade nas opções da pergunta.
  function cleanValues(q, vals) {
    const arr = Array.isArray(vals) ? vals : [];
    return [...new Set(arr)]
      .filter((v) => q.options.some((o) => o.v === v))
      .slice(0, q.multi ? MAX_PICKS : 1);
  }

  function sanitizeAnswers(raw, requireAll) {
    if (!raw || typeof raw !== 'object') return null;
    const out = {};
    const interest = cleanValues(baseQuestions[0], raw.interest);
    if (!interest.length) return null;
    out.interest = interest;
    const rest = [buildFocusQuestion(interest), ...baseQuestions.slice(1)];
    rest.forEach((q) => {
      const v = cleanValues(q, raw[q.id]);
      if (v.length) out[q.id] = v;
    });
    if (requireAll && !rest.every((q) => out[q.id])) return null;
    return out;
  }

  function answersFromHash() {
    const params = new URLSearchParams(location.hash.slice(1));
    if (!params.has('interest')) return null;
    const raw = {};
    params.forEach((value, key) => { raw[key] = value.split('.'); });
    return sanitizeAnswers(raw, true);
  }

  /* ---------- perguntas ---------- */

  function buildFocusQuestion(selected) {
    const seen = new Set();
    const options = [];
    selected.forEach((key) => (focusByInterest[key] || []).forEach((o) => {
      if (!seen.has(o.v)) { seen.add(o.v); options.push(o); }
    }));
    return {
      id: 'focus',
      label: 'Vamos afunilar',
      title: 'Dentro desses interesses, o que você teria mais vontade de explorar?',
      desc: 'Esta pergunta muda conforme o que você escolheu. Marque até duas opções para deixar as sugestões mais específicas.',
      multi: true,
      options
    };
  }

  // Remonta a lista de perguntas conforme os interesses. As respostas do funil
  // que continuam válidas são mantidas; só as que deixaram de existir saem.
  function rebuildQuestions() {
    const selected = answers.interest || [];
    if (!selected.length) {
      questions = baseQuestions;
      delete answers.focus;
      return;
    }
    const focusQ = buildFocusQuestion(selected);
    questions = [baseQuestions[0], focusQ, ...baseQuestions.slice(1)];
    const valid = new Set(focusQ.options.map((o) => o.v));
    const previous = answers.focus || [];
    const kept = previous.filter((v) => valid.has(v));
    if (kept.length) answers.focus = kept; else delete answers.focus;
    if (kept.length !== previous.length) focusNotice = true;
  }

  function updateStepUi() {
    stepLabel.textContent = `Etapa ${step + 1} de ${questions.length}`;
    setProgress((step / questions.length) * 100);
  }

  function optionHtml(q, o, on) {
    const type = q.multi ? 'checkbox' : 'radio';
    return `<label class="option${on ? ' selected' : ''}">
      <input class="sr-only" type="${type}" name="${q.id}" value="${o.v}"${on ? ' checked' : ''}>
      <span class="emoji" aria-hidden="true">${o.e}</span>
      <span><strong>${o.t}</strong><small>${o.d}</small></span>
      <span class="check" aria-hidden="true">${on ? '✓' : ''}</span>
    </label>`;
  }

  function selectHtml(q, chosen) {
    const current = chosen[0] || '';
    return `<div class="select-wrap">
      <label for="q-select">${q.selectLabel || 'Escolha'}</label>
      <select id="q-select" name="${q.id}">
        <option value=""${current ? '' : ' selected'}>Selecione…</option>
        ${q.options.map((o) => `<option value="${o.v}"${o.v === current ? ' selected' : ''}>${o.t}</option>`).join('')}
      </select>
    </div>`;
  }

  function renderQuestion(moveFocus) {
    const q = questions[step];
    const chosen = answers[q.id] || [];
    results.classList.add('hidden');
    quiz.classList.remove('hidden');
    updateStepUi();

    const resumeNotice = resumed
      ? '<p class="notice" id="resumeNotice">Retomamos de onde você parou. <button type="button" class="link-btn" id="reset">Recomeçar do zero</button></p>'
      : '';
    const funnelNotice = q.id === 'focus' && focusNotice
      ? '<p class="notice" id="focusNotice" role="status">Você mudou seus interesses, então as opções desta etapa foram atualizadas. Mantivemos as escolhas que ainda fazem sentido.</p>'
      : '';

    quiz.innerHTML = `
      <div class="question-head">
        <div class="mini">${String(step + 1).padStart(2, '0')} · ${q.label}</div>
        <h2 id="q-title" tabindex="-1">${q.title}</h2>
        <p id="q-desc">${q.desc}</p>
      </div>
      ${resumeNotice}${funnelNotice}
      <fieldset class="options${q.kind === 'select' ? ' options-select' : ''}" aria-labelledby="q-title" aria-describedby="q-desc">
        ${q.kind === 'select' ? selectHtml(q, chosen) : q.options.map((o) => optionHtml(q, o, chosen.includes(o.v))).join('')}
      </fieldset>
      <p class="limit-msg" id="limitMsg" role="status"></p>
      <div class="actions">
        <span class="hint" id="hint"></span>
        <div class="right-actions">
          ${step > 0 ? '<button type="button" class="btn btn-ghost" id="back">Voltar</button>' : ''}
          <button type="button" class="btn btn-primary" id="next">${step === questions.length - 1 ? 'Ver meus caminhos' : 'Continuar →'}</button>
        </div>
      </div>`;

    quiz.querySelectorAll('input').forEach((input) => {
      input.addEventListener('change', () => onChoose(q, input));
    });
    const sel = $('q-select');
    if (sel) sel.addEventListener('change', () => onChoose(q, { value: sel.value, checked: Boolean(sel.value) }));

    $('next').addEventListener('click', () => {
      if (!(answers[q.id] || []).length) return;
      resumed = false;
      if (q.id === 'focus') focusNotice = false;
      if (step < questions.length - 1) {
        step++;
        save();
        renderQuestion(true);
      } else {
        renderResults(true);
      }
    });

    const back = $('back');
    if (back) back.addEventListener('click', () => {
      resumed = false;
      if (q.id === 'focus') focusNotice = false;
      step--;
      save();
      renderQuestion(true);
    });

    const reset = $('reset');
    if (reset) reset.addEventListener('click', restart);

    updateControls(q);

    if (moveFocus) {
      $('q-title').focus();
      announce(`Etapa ${step + 1} de ${questions.length}`);
    }
  }

  // Atualiza a tela sem recriar os botões, para o foco não se perder.
  function updateControls(q) {
    const chosen = answers[q.id] || [];
    quiz.querySelectorAll('.option').forEach((label) => {
      const input = label.querySelector('input');
      const on = chosen.includes(input.value);
      input.checked = on;
      label.classList.toggle('selected', on);
      label.querySelector('.check').textContent = on ? '✓' : '';
    });
    const sel = $('q-select');
    if (sel) sel.value = chosen[0] || '';
    $('next').disabled = chosen.length === 0;
    $('hint').textContent = q.multi
      ? `Selecione até duas opções (${chosen.length}/${MAX_PICKS})`
      : 'Escolha uma opção';
  }

  function showLimitMessage() {
    const msg = $('limitMsg');
    msg.textContent = '';
    setTimeout(() => { msg.textContent = 'Você já escolheu duas opções. Desmarque uma para trocar.'; }, 60);
  }

  function onChoose(q, input) {
    $('limitMsg').textContent = '';
    let arr = [...(answers[q.id] || [])];

    if (q.multi) {
      if (input.checked) {
        if (arr.length >= MAX_PICKS) {
          input.checked = false;
          showLimitMessage();
          return;
        }
        arr.push(input.value);
      } else {
        arr = arr.filter((x) => x !== input.value);
      }
    } else {
      arr = input.value ? [input.value] : [];
    }

    if (arr.length) answers[q.id] = arr; else delete answers[q.id];

    resumed = false;
    const resumeEl = $('resumeNotice');
    if (resumeEl) resumeEl.remove();

    if (q.id === 'focus' && focusNotice) {
      focusNotice = false;
      const n = $('focusNotice');
      if (n) n.remove();
    }

    if (q.id === 'interest') {
      rebuildQuestions();
      updateStepUi();
    }

    updateControls(q);
    save();
  }

  /* ---------- pontuação ---------- */

  // Cada valor escolhido conta uma vez, com o peso da pergunta mais importante
  // em que apareceu. Assim, o mesmo tag nunca é somado duas vezes sem querer.
  function collectSignals() {
    const signals = new Map();
    Object.entries(answers).forEach(([qid, vals]) => {
      const w = qid in weights ? weights[qid] : 1;
      if (w <= 0) return; // perguntas sobre a faculdade não entram na escolha do curso
      vals.forEach((v) => signals.set(v, Math.max(signals.get(v) || 0, w)));
    });
    return signals;
  }

  /* ---------- faculdades ---------- */

  function preferences() {
    return {
      type: (answers.inst_type || [])[0] || 'type_any',
      method: (answers.method || [])[0] || 'm_any',
      state: (answers.state || [])[0] || 'any'
    };
  }

  // Ordena as faculdades que oferecem o curso. As preferências só mudam a ordem:
  // nenhuma faculdade é escondida por causa do tipo, do método ou do estado.
  function rankInstitutions(courseName) {
    const pref = preferences();
    return INSTITUTIONS
      .filter((inst) => inst.courses.includes(courseName))
      .map((inst) => {
        let score = 0;
        const reasons = [];
        const notes = [];

        if (pref.type === 'type_public' || pref.type === 'type_private') {
          const wantPublic = pref.type === 'type_public';
          if ((inst.type === 'public') === wantPublic) {
            score += 3;
            reasons.push(wantPublic ? 'É pública, como você prefere' : 'É privada, como você prefere');
          } else {
            score -= 4;
            notes.push(wantPublic ? 'Você prefere pública, mas esta é privada.' : 'Você prefere privada, mas esta é pública.');
          }
        }

        if (pref.state !== 'any' && inst.states.includes(pref.state)) {
          score += 2;
          reasons.push(`Fica no seu estado (${pref.state})`);
        }

        if (pref.method !== 'm_any') {
          if (inst.method.tags.includes(pref.method)) {
            score += inst.method.verified ? 2 : 1;
            reasons.push(inst.method.verified ? 'Método de ensino que você prefere (confirmado)' : 'Método de ensino que você prefere (a confirmar)');
          } else if (!inst.method.tags.length) {
            notes.push('Método de ensino não confirmado nas fontes.');
          }
        }

        if (inst.quality.igc === 5) {
          score += 3;
          reasons.push(`Nota máxima (IGC 5) do MEC em ${inst.quality.year}`);
        }

        return { ...inst, score, reasons, notes };
      })
      .sort((a, b) =>
        b.score - a.score ||
        (b.quality.value || 0) - (a.quality.value || 0) ||
        a.name.localeCompare(b.name, 'pt-BR')
      );
  }

  function scholarshipBlock(inst) {
    const items = inst.scholarships.items.map((i) => `<li>${esc(i)}</li>`).join('');
    if (inst.type === 'public') {
      return `<div class="aid aid-public"><b>${esc(inst.scholarships.headline)}</b><ul>${items}</ul></div>`;
    }
    const has = inst.scholarships.own !== false;
    return `<div class="aid ${has ? 'aid-yes' : 'aid-no'}"><b>${has ? 'Tem programa de bolsas' : 'Sem programa próprio de bolsas confirmado'}</b>
      <ul>${items}</ul>
      <p>Também vale conferir <a href="${GOV_URL}" target="_blank" rel="noopener noreferrer">ProUni e Fies no portal do MEC<span class="sr-only"> (abre em nova aba)</span></a>. Valores e regras mudam a cada semestre.</p></div>`;
  }

  function institutionCard(inst) {
    const typeLabel = inst.type === 'public' ? 'Pública' : 'Privada';
    const quality = inst.quality.text;
    const methodLabel = inst.method.verified ? 'confirmado' : (inst.method.tags.length ? 'a confirmar' : 'não confirmado');
    return `<article class="inst">
      <header class="inst-head">
        <h4>${esc(inst.name)}</h4>
        <span class="badge badge-${inst.type}">${typeLabel}</span>
      </header>
      <p class="inst-city">${esc(inst.city)}</p>
      ${inst.reasons.length || inst.notes.length ? `<p class="inst-why"><b>Por que aparece aqui:</b> ${[...inst.reasons, ...inst.notes].map((s) => esc(s.replace(/\.$/, ''))).join('. ')}.</p>` : ''}
      ${scholarshipBlock(inst)}
      <div class="pc">
        <div><b>Pontos fortes</b><ul>${inst.strengths.map((s) => `<li>${esc(s)}</li>`).join('')}</ul></div>
        <div><b>Pontos de atenção</b><ul>${inst.cautions.map((s) => `<li>${esc(s)}</li>`).join('')}</ul></div>
      </div>
      <p class="inst-meta"><b>Nota do MEC:</b> ${esc(quality)}</p>
      <p class="inst-meta"><b>Método de ensino (${methodLabel}):</b> ${esc(inst.method.text)}</p>
      <p class="inst-src"><b>Fontes:</b> ${inst.sources.map((s) => `<a href="${s.url}" target="_blank" rel="noopener noreferrer">${esc(s.t)}<span class="sr-only"> (abre em nova aba)</span></a>`).join(' · ')}<br>Dados reunidos em ${formatDate(INSTITUTIONS_VERIFIED_AT)}. Confirme o curso, o edital e os valores no site da instituição e no <a href="${EMEC_URL}" target="_blank" rel="noopener noreferrer">e-MEC<span class="sr-only"> (abre em nova aba)</span></a>.</p>
    </article>`;
  }

  function institutionsBlock(c) {
    const list = c.institutions;
    if (!list.length) {
      return `<div class="why"><b>Faculdades que combinam</b><br>Ainda não temos faculdades verificadas para este curso. Busque no <a href="${EMEC_URL}" target="_blank" rel="noopener noreferrer">e-MEC<span class="sr-only"> (abre em nova aba)</span></a> as instituições que o oferecem e compare notas, grade e bolsas.</div>`;
    }
    const shown = list.slice(0, MAX_INSTITUTIONS);
    const rest = list.slice(MAX_INSTITUTIONS);
    const more = rest.length
      ? `<details class="inst-more"><summary>Ver mais ${rest.length} ${plural(rest.length, 'faculdade', 'faculdades')}</summary>${rest.map(institutionCard).join('')}</details>`
      : '';
    return `<details class="inst-details">
      <summary>Faculdades que combinam (${list.length})</summary>
      <p class="inst-intro">Seleção limitada de instituições, não uma lista de todas as que oferecem o curso. Ordenadas pelas suas preferências e pela nota do MEC quando existe.</p>
      ${shown.map(institutionCard).join('')}${more}
    </details>`;
  }

  function scoreCourses() {
    const signals = collectSignals();
    return courses.map((c) => {
      let score = 0;
      const matched = [];
      signals.forEach((weight, value) => {
        if (c.tags.includes(value)) { score += weight; matched.push(value); }
      });
      const reasons = matched
        .filter((k) => c.why[k])
        .sort((a, b) => signals.get(b) - signals.get(a))
        .slice(0, 3)
        .map((k) => c.why[k]);
      return {
        ...c, score, signals: matched.length, specificity: matched.length / c.tags.length, reasons,
        institutions: rankInstitutions(c.name)
      };
    }).sort((a, b) =>
      b.score - a.score ||                 // 1) mais peso nas respostas
      b.specificity - a.specificity ||     // 2) curso mais específico para o perfil
      b.signals - a.signals ||             // 3) mais sinais em comum
      a.name.localeCompare(b.name, 'pt-BR')
    );
  }

  /* ---------- resultados ---------- */

  function courseCard(c, i) {
    const n = c.signals;
    const label = i === 0 ? 'Mais sinais em comum' : `${n} ${plural(n, 'sinal', 'sinais')} em comum`;
    const reasons = c.reasons.length
      ? c.reasons.map(capitalize).join('. ') + '.'
      : `Este curso teve ${n} característica(s) em comum com suas respostas. Investigue a grade curricular e converse com alguém da área para entender se a rotina combina com o que você procura.`;
    const search = encodeURIComponent('grade curricular ' + c.name);
    const pressed = compare.includes(c.name);

    return `<article class="course">
      <div class="course-top"><div class="course-icon" aria-hidden="true">${c.icon}</div><span class="match">${label}</span></div>
      <h3 tabindex="-1">${c.name}</h3>
      <p>${c.desc}</p>
      <div class="why"><b>Por que apareceu?</b><br>${reasons}</div>
      <div class="why"><b>Onde pode atuar</b><br>${c.areas}</div>
      <div class="why"><b>O que pesquisar</b><br>${c.research}<br>
        <a href="https://www.google.com/search?q=${search}" target="_blank" rel="noopener noreferrer">Ver grades curriculares<span class="sr-only"> de ${c.name} (abre em nova aba)</span></a>
        <a href="${EMEC_URL}" target="_blank" rel="noopener noreferrer">Buscar no e-MEC<span class="sr-only"> (abre em nova aba)</span></a>
      </div>
      <div class="why"><b>Pergunte a quem atua na área</b>
        <ul>${c.ask.map((a) => `<li>${a}</li>`).join('')}</ul>
      </div>
      ${institutionsBlock(c)}
      <button type="button" class="btn btn-ghost btn-small compare-btn" data-name="${c.name}" aria-pressed="${pressed}">Comparar<span class="sr-only"> ${c.name}</span></button>
    </article>`;
  }

  function drawList(focusIndex) {
    const list = $('resultList');
    list.innerHTML = candidates.slice(0, visible).map(courseCard).join('');
    list.querySelectorAll('.compare-btn').forEach((b) => {
      b.addEventListener('click', () => toggleCompare(b.dataset.name));
    });

    const remaining = candidates.length - visible;
    const more = $('moreWrap');
    if (remaining > 0) {
      const next = Math.min(PAGE_SIZE, remaining);
      more.innerHTML = `<button type="button" class="btn btn-ghost" id="more">Ver mais ${next} ${plural(next, 'curso', 'cursos')}</button>`;
      $('more').addEventListener('click', showMore);
    } else {
      more.innerHTML = '';
    }

    if (typeof focusIndex === 'number') {
      const heading = list.querySelectorAll('.course h3')[focusIndex];
      if (heading) heading.focus();
    }
  }

  function showMore() {
    const firstNew = visible;
    visible = Math.min(visible + PAGE_SIZE, candidates.length);
    drawList(firstNew);
    announce(`${visible} cursos exibidos.`);
  }

  function toggleCompare(name) {
    const i = compare.indexOf(name);
    compareMsg = '';
    if (i >= 0) {
      compare.splice(i, 1);
    } else if (compare.length >= MAX_COMPARE) {
      compareMsg = `Você pode comparar até ${MAX_COMPARE} cursos. Desmarque um para incluir outro.`;
    } else {
      compare.push(name);
    }
    document.querySelectorAll('.compare-btn').forEach((b) => {
      b.setAttribute('aria-pressed', String(compare.includes(b.dataset.name)));
    });
    drawCompare();
    announce(compareMsg || (compare.length >= 2
      ? `Comparação de ${compare.length} cursos exibida abaixo da lista.`
      : `${compare.length} ${plural(compare.length, 'curso marcado', 'cursos marcados')} para comparar.`));
  }

  function drawCompare() {
    const panel = $('comparePanel');
    const selected = compare.map((n) => candidates.find((c) => c.name === n)).filter(Boolean);
    const msg = compareMsg ? `<p class="compare-hint">${compareMsg}</p>` : '';

    if (!selected.length) { panel.innerHTML = msg; return; }
    if (selected.length < 2) {
      panel.innerHTML = `<h3>Comparar cursos</h3>
        <p class="compare-hint">${selected[0].name} marcado. Marque mais um curso em “Comparar” para ver os cursos lado a lado.</p>${msg}`;
      return;
    }

    const rows = [
      ['Sinais em comum', (c) => String(c.signals)],
      ['Resumo', (c) => c.desc],
      ['Onde pode atuar', (c) => c.areas],
      ['O que pesquisar', (c) => c.research],
      ['Pergunte a quem atua na área', (c) => c.ask[0]],
      ['Faculdades que combinam', (c) => (c.institutions.length ? c.institutions.slice(0, 3).map((i) => i.short).join(', ') : 'Nenhuma verificada ainda')]
    ];
    panel.innerHTML = `<h3>Comparar cursos</h3>
      <div class="table-wrap" role="region" aria-label="Tabela de comparação de cursos" tabindex="0">
        <table>
          <caption class="sr-only">Comparação entre ${selected.map((c) => c.name).join(', ')}</caption>
          <thead><tr><th scope="col"><span class="sr-only">Critério</span></th>${selected.map((c) => `<th scope="col">${c.name}</th>`).join('')}</tr></thead>
          <tbody>${rows.map(([label, fn]) => `<tr><th scope="row">${label}</th>${selected.map((c) => `<td>${fn(c)}</td>`).join('')}</tr>`).join('')}</tbody>
        </table>
      </div>${msg}`;
  }

  function renderResults(moveFocus) {
    quiz.classList.add('hidden');
    results.classList.remove('hidden');
    setProgress(100);
    stepLabel.textContent = 'Sua exploração começa aqui';

    const ranked = scoreCourses();
    candidates = ranked.filter((c, i) => i < PAGE_SIZE || c.score > 0).slice(0, MAX_RESULTS);
    visible = PAGE_SIZE;
    compare = [];
    compareMsg = '';
    const total = collectSignals().size;

    results.innerHTML = `
      <div class="results-intro">
        <div>
          <div class="eyebrow">Resultado do questionário</div>
          <h2 id="results-title" tabindex="-1">Três cursos para investigar</h2>
          <p>As sugestões abaixo tiveram mais características em comum com suas respostas. Leia os motivos e use as dicas e perguntas de cada curso para decidir o que pesquisar a seguir.</p>
        </div>
        <div class="result-pill">${total} ${plural(total, 'pista considerada', 'pistas consideradas')}</div>
      </div>
      <div class="result-list" id="resultList"></div>
      <div class="more-wrap" id="moreWrap"></div>
      <section class="compare" id="comparePanel" aria-label="Comparação de cursos"></section>
      <div class="results-note"><strong>Importante:</strong> isto não é um teste psicológico nem uma avaliação científica. Este guia usa regras simples de compatibilidade entre suas escolhas e características associadas a cursos. Ele cobre ${courses.length} áreas e ${INSTITUTIONS.length} instituições, uma seleção limitada que não inclui todas as que existem. As faculdades mostradas não são um ranking de “melhores”: reúnem dados públicos de fontes e datas diferentes (cada uma está citada no cartão), que podem estar desatualizados. O guia não considera grades curriculares, sua situação financeira ou o mercado da sua região. Use os resultados como ponto de partida para pesquisar, conversar com profissionais e comparar cursos.</div>
      <div class="result-actions">
        <button type="button" class="btn btn-primary" id="restart">Refazer questionário ↻</button>
        <button type="button" class="btn btn-ghost" id="edit">Alterar respostas</button>
        <button type="button" class="btn btn-ghost" id="copy">Copiar meu resumo</button>
        <button type="button" class="btn btn-ghost" id="share">Copiar link do resultado</button>
      </div>`;

    drawList();
    drawCompare();

    $('restart').addEventListener('click', restart);
    $('edit').addEventListener('click', () => {
      clearHash();
      step = questions.length - 1;
      renderQuestion(true);
    });
    $('copy').addEventListener('click', async (e) => {
      const text = 'Meu mapa de possibilidades — CursosHub\n'
        + candidates.slice(0, PAGE_SIZE).map((c, i) => {
          const where = c.institutions.slice(0, 3).map((x) => x.short).join(', ');
          return `${i + 1}. ${c.name}: ${c.desc}${where ? `\n   Faculdades para pesquisar: ${where}` : ''}`;
        }).join('\n\n')
        + '\n\nResultado exploratório; não define minha escolha.';
      const ok = await copyText(text);
      flashButton(e.currentTarget, ok ? 'Resumo copiado ✓' : 'Não foi possível copiar', 'Copiar meu resumo');
      announce(ok ? 'Resumo copiado.' : 'Não foi possível copiar o resumo.');
    });
    $('share').addEventListener('click', async (e) => {
      const ok = await copyText(shareUrl());
      flashButton(e.currentTarget, ok ? 'Link copiado ✓' : 'Não foi possível copiar', 'Copiar link do resultado');
      announce(ok ? 'Link do resultado copiado.' : 'Não foi possível copiar o link.');
    });

    save();
    syncHash();
    if (moveFocus) {
      $('results-title').focus();
      announce('Resultado do questionário pronto.');
    }
  }

  /* ---------- reiniciar e iniciar ---------- */

  function restart() {
    step = 0;
    answers = {};
    questions = baseQuestions;
    focusNotice = false;
    resumed = false;
    clearSaved();
    clearHash();
    renderQuestion(true);
  }

  function init() {
    $('courseCount').textContent = String(courses.length);
    $('institutionCount').textContent = String(INSTITUTIONS.length);

    const shared = answersFromHash();
    if (shared) {
      answers = shared;
      rebuildQuestions();
      focusNotice = false;
      step = questions.length - 1;
      renderResults(false);
      return;
    }

    const saved = loadSaved();
    const restored = saved && sanitizeAnswers(saved.answers, false);
    if (restored) {
      answers = restored;
      rebuildQuestions();
      focusNotice = false;
      const firstOpen = questions.findIndex((q) => !(answers[q.id] || []).length);
      const savedStep = Number(saved.step) || 0;
      step = firstOpen === -1 ? questions.length - 1 : Math.min(savedStep, firstOpen);
      resumed = true;
    }
    renderQuestion(false);
  }

  // Colar um link de resultado na mesma aba também abre o resultado.
  window.addEventListener('hashchange', () => {
    const shared = answersFromHash();
    if (shared && hashString() !== Object.entries(shared).map(([k, v]) => `${k}=${v.join('.')}`).join('&')) {
      answers = shared;
      rebuildQuestions();
      focusNotice = false;
      step = questions.length - 1;
      renderResults(true);
    }
  });

  init();
})();
