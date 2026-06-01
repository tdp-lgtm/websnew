// render.js — reads data arrays and builds page content
// You should never need to edit this file.

function renderResearchBio(id) {
  const el = document.getElementById(id);
  if (!el || typeof RESEARCH_BIO === 'undefined') return;
  const paras = RESEARCH_BIO.split('\n\n').filter(Boolean);
  el.innerHTML = `<div class="research-bio">${paras.map(p => `<p>${p}</p>`).join('')}</div>`;
}

function renderPublications(id) {
  const el = document.getElementById(id);
  if (!el) return;

  const articles = PUBLICATIONS.filter(p => !p.type || p.type === 'Article');
  const reviews  = PUBLICATIONS.filter(p => p.type === 'Review');

  let html = '';
  if (articles.length) {
    html += `<span class="section-label">Articles</span><ul class="pub-list">${articles.map(_pubItem).join('')}</ul>`;
  }
  if (reviews.length) {
    html += `<span class="section-label">Reviews</span><ul class="pub-list">${reviews.map(_pubItem).join('')}</ul>`;
  }
  if (!html) html = '<p style="color:var(--fg-3)">No publications yet.</p>';
  el.innerHTML = html;
}

function _pubItem(p) {
  const rawYear = p.year ? String(p.year) : '';
  const displayYear = rawYear === 'Forthcoming'  ? 'Forthc.'
                    : rawYear === 'Online first' ? 'Online'
                    : rawYear;

  const volPart   = p.volume ? `vol. ${p.volume}` : '';
  const issuePart = p.issue  ? `no. ${p.issue}`   : '';
  const pagesPart = p.pages  ? (volPart || issuePart ? `: ${p.pages}` : p.pages) : '';
  const volStr    = [volPart, issuePart].filter(Boolean).join(', ') + pagesPart;
  const citation  = [
    p.journal ? `<em>${p.journal}</em>` : '',
    volStr,
  ].filter(Boolean).join(', ');

  const abstractId = `abs-${Math.random().toString(36).slice(2, 7)}`;
  const abstractBtn = p.abstract
    ? `<button onclick="_toggleAbstract('${abstractId}',this)">&#8801; Abstract</button>`
    : '';
  const abstractDiv = p.abstract
    ? `<div class="pub-abstract" id="${abstractId}"><div class="pub-abstract-inner">${p.abstract}</div></div>`
    : '';

  const links = [
    abstractBtn,
    p.pdf ? `<a href="${p.pdf}" target="_blank" rel="noopener">&#8595; PDF</a>` : '',
    p.doi ? `<a href="${p.doi}" target="_blank" rel="noopener">Publisher &#8599;</a>` : '',
    p.prize ? `<span class="award-inline">${p.prize}</span>` : '',
  ].filter(Boolean);

  return `<li class="pub">
    <div class="yr">${displayYear}</div>
    <div>
      <h3>${p.coauthors ? `(with ${p.coauthors}) ` : ''}${p.title}.</h3>
      ${citation ? `<p class="venue">${citation}.</p>` : ''}
      ${links.length ? `<div class="pub-links">${links.join('')}</div>` : ''}
      ${abstractDiv}
    </div>
  </li>`;
}

function _toggleAbstract(id, btn) {
  const el = document.getElementById(id);
  const isOpen = el.classList.contains('open');
  el.classList.toggle('open', !isOpen);
  btn.textContent = isOpen ? '≡ Abstract' : '≡ Hide';
}

function renderWIP(id) {
  const el = document.getElementById(id);
  if (!el) return;
  if (!WIP.length) { el.innerHTML = '<p style="color:var(--fg-3)">Nothing to show yet.</p>'; return; }
  el.innerHTML = `<ul class="pub-list">${WIP.map(p => {
    const abstractId = `abs-${Math.random().toString(36).slice(2,7)}`;
    const abstractBtn = p.abstract
      ? `<button onclick="_toggleAbstract('${abstractId}',this)">&#8801; Abstract</button>`
      : '';
    const abstractDiv = p.abstract
      ? `<div class="pub-abstract" id="${abstractId}"><div class="pub-abstract-inner">${p.abstract}</div></div>` : '';
    const links = [
      abstractBtn,
      p.pdf ? `<a href="${p.pdf}" target="_blank" rel="noopener">&#8595; Draft PDF</a>` : '',
    ].filter(Boolean);
    return `<li class="pub pub--wip">
      <div>
        <p class="wip-title">${p.title}. <span class="wip-status">${p.status}.</span></p>
        ${links.length ? `<div class="pub-links">${links.join('')}</div>` : ''}
        ${abstractDiv}
      </div>
    </li>`;
  }).join('')}</ul>`;
}

function renderTalks(containerId) {
  const el = document.getElementById(containerId);
  if (!el) return;
  if (!TALKS || !TALKS.length) {
    el.innerHTML = '<p style="color:var(--fg-3)">Nothing to show yet.</p>';
    return;
  }
  el.innerHTML = `<ul class="pub-list">${TALKS.map(talk => {
    const rows = (talk.presentations || []).map(p => {
      const tag = p.type === 'Invited'
        ? '<sup class="talk-tag">*</sup>'
        : p.type === 'Peer-Review'
        ? '<sup class="talk-tag">†</sup>'
        : '';
      const date = p.month ? `${p.month} ${p.year}` : String(p.year);
      const where = [p.venue, p.institution].filter(Boolean).join(', ');
      const comment = p.comment ? ` <em class="talk-comment">${p.comment}</em>` : '';
      return `<div class="talk-row">
        <div class="yr">${date}</div>
        <div class="talk-row-detail">${where}${tag}.${comment}</div>
      </div>`;
    }).join('');
    return `<li class="talk-item">
      <h3>${talk.title}.</h3>
      <div class="talk-pres-list">${rows}</div>
    </li>`;
  }).join('')}</ul>`;
}

function renderTeaching(id) {
  const el = document.getElementById(id);
  if (!el) return;

  el.innerHTML = TEACHING.map((inst, i) => {
    const roleMap = {};
    const roleOrder = [];
    (inst.entries || []).forEach(e => {
      if (!roleMap[e.role]) { roleMap[e.role] = []; roleOrder.push(e.role); }
      roleMap[e.role].push(e);
    });

    const rolesHtml = roleOrder.map(role => {
      const courses = roleMap[role].map(e => {
        const yr = e.year ? `(${e.year}) ` : '';
        const note = e.note ? ` <span class="teaching-note">${e.note}</span>` : '';
        return `<div class="teaching-entry">
          <span class="teaching-course">${yr}${e.course}${note}</span>
        </div>`;
      }).join('');
      return `<div class="teaching-role-group">
        <div class="teaching-role">${role}</div>
        <div class="teaching-courses">${courses}</div>
      </div>`;
    }).join('');

    return `<div class="page-section${i === 0 ? ' page-section--first' : ''}" id="${inst.anchor}">
      <p class="section-title">${inst.institution}</p>
      ${rolesHtml}
    </div>`;
  }).join('');
}

function renderWorkshops(id) {
  const el = document.getElementById(id);
  if (!el) return;
  el.innerHTML = WORKSHOPS.map((w, i) => {
    const date = [w.month, w.year].filter(Boolean).join(' ');
    const meta = [w.institution, date, w.coorganisers ? `Co-organised with ${w.coorganisers}` : ''].filter(Boolean).join(' · ');
    const programme = w.programme && w.programme.length
      ? `<div class="ws-programme">${w.programme.map(e => {
          const speakerHtml = e.speaker.split('\n').join('<br>');
          const titleHtml = e.title && e.title !== 'TBA'
            ? `<em class="ws-paper-title">${e.title}</em>`
            : `<span class="ws-tba">TBA</span>`;
          return `<div class="ws-entry">
            <div class="ws-speaker">${speakerHtml}:</div>
            <div class="ws-paper">${titleHtml}</div>
          </div>`;
        }).join('')}</div>`
      : '';
    const regHtml = w.registration ? `<p class="ws-registration">${w.registration}</p>` : '';
    return `<div class="page-section${i === 0 ? ' page-section--first' : ''}" id="${w.id}">
      <p class="section-title">${w.title}</p>
      <p class="section-subtitle">${meta}</p>
      ${w.description ? `<p class="workshop-description">${w.description}</p>` : ''}
      ${programme}
      ${regHtml}
    </div>`;
  }).join('');
}

function renderCV() {
  _renderCVSection('cv-employment', [
    { year: '2023–', detail: 'Postdoctoral Researcher, Stockholm Centre for the Ethics of War and Peace, Department of Philosophy, Stockholm University' },
  ]);

  const edu = [
    { year: '2023', detail: "PhD in Philosophy, King's College London", sub: 'Supervised by David Owens, Massimo Renzo, and Sarah Fine' },
    { year: '',     detail: 'MPhil in Philosophy, University of Oxford' },
    { year: '',     detail: "BA in Philosophy, King's College London" },
  ];
  _renderCVSection('cv-education', edu);

  const pubItems = PUBLICATIONS.map(p => ({
    year: p.year ? String(p.year) : '',
    detail: `${p.coauthors ? `(with ${p.coauthors}) ` : ''}${p.title}.`,
    sub: (() => { const v = p.volume ? `vol. ${p.volume}` : ''; const iss = p.issue ? `no. ${p.issue}` : ''; const pg = p.pages ? `: ${p.pages}` : ''; const vol = [v,iss].filter(Boolean).join(', ')+pg; return [p.journal ? `<em>${p.journal}</em>` : '', vol].filter(Boolean).join(', '); })(),
    link: p.doi || p.pdf || '',
  }));
  _renderCVSection('cv-publications', pubItems);

  const allPresFlat = [];
  (TALKS || []).forEach(talk => {
    (talk.presentations || []).forEach(p => {
      allPresFlat.push({ pres: p, talk });
    });
  });
  _renderCVSection('cv-talks-invited', allPresFlat.filter(x => x.pres.type === 'Invited').map(x => ({
    year: String(x.pres.year),
    detail: `${x.talk.title}. ${[x.pres.venue, x.pres.institution].filter(Boolean).join(', ')}.`,
  })));
  _renderCVSection('cv-talks-conference', allPresFlat.filter(x => x.pres.type === 'Peer-Review').map(x => ({
    year: String(x.pres.year),
    detail: `${x.talk.title}. ${[x.pres.venue, x.pres.institution].filter(Boolean).join(', ')}.`,
  })));

  const teachItems = [];
  (TEACHING || []).forEach(inst => {
    (inst.entries || []).forEach(e => {
      teachItems.push({ year: e.year, detail: e.course, sub: `${e.role} · ${inst.institution}` });
    });
  });
  _renderCVSection('cv-teaching', teachItems);
}

function _renderCVSection(id, items) {
  const el = document.getElementById(id);
  if (!el) return;
  if (!items.length) { el.innerHTML = '<p class="empty">Nothing to show yet.</p>'; return; }
  el.innerHTML = items.map(item => `
    <div class="cv-item">
      <span class="cv-year">${item.year || ''}</span>
      <span class="cv-detail">
        ${item.link ? `<a href="${item.link}" target="_blank" rel="noopener">${item.detail}</a>` : item.detail}
        ${item.sub ? `<span class="cv-detail-sub">${item.sub}</span>` : ''}
      </span>
    </div>`).join('');
}

document.getElementById('year').textContent = new Date().getFullYear();
