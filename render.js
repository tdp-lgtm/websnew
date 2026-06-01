// render.js — reads data arrays and builds page content
// You should never need to edit this file.

function renderPublications(id) {
  const el = document.getElementById(id);
  if (!el) return;

  const articles = PUBLICATIONS.filter(p => !p.type || p.type === 'Article');
  const reviews  = PUBLICATIONS.filter(p => p.type === 'Review');

  let html = '';
  if (articles.length) {
    html += `<h3>Articles</h3><ul class="paper-list">${articles.map(_pubItem).join('')}</ul>`;
  }
  if (reviews.length) {
    html += `<h3>Reviews</h3><ul class="paper-list">${reviews.map(_pubItem).join('')}</ul>`;
  }
  if (!html) html = '<p class="empty">No publications yet.</p>';
  el.innerHTML = html;
}

function _pubItem(p) {
  const isLabel = typeof p.year === 'string';
  const yearStr = p.year ? String(p.year) : '';

  // Chicago-style citation: Journal, vol. X, no. Y: pages.
  // For string years (Forthcoming/Online first), embed in citation instead of year column
  const volPart   = p.volume ? `vol. ${p.volume}` : '';
  const issuePart = p.issue  ? `no. ${p.issue}`   : '';
  const pagesPart = p.pages  ? (volPart || issuePart ? `: ${p.pages}` : p.pages) : '';
  const volStr    = [volPart, issuePart].filter(Boolean).join(', ') + pagesPart;
  const citation  = [
    p.journal ? `<em>${p.journal}</em>` : '',
    volStr,
    isLabel ? yearStr : '',   // string year goes inline
  ].filter(Boolean).join(', ');

  // Abstract toggle button (inline with links)
  const abstractId = `abs-${Math.random().toString(36).slice(2, 7)}`;
  const abstractBtn = p.abstract
    ? `<button onclick="var el=document.getElementById('${abstractId}');el.hidden=!el.hidden;this.textContent=el.hidden?'Abstract':'Hide abstract'">Abstract</button>`
    : '';
  const abstractDiv = p.abstract
    ? `<div class="pub-abstract" id="${abstractId}" hidden>${p.abstract}</div>`
    : '';

  const links = [
    p.pdf ? `<a href="${p.pdf}" target="_blank" rel="noopener">PDF</a>` : '',
    abstractBtn,
    p.doi ? `<a href="${p.doi}" target="_blank" rel="noopener">Publisher ↗</a>` : '',
  ].filter(Boolean);

  return `<li>
    <span class="pub-year">${isLabel ? '' : yearStr}</span>
    <div class="pub-body">
      <span class="pub-title">${p.coauthors ? `(with ${p.coauthors}) ` : ''}"${p.title}."</span>
      ${citation ? `<span class="pub-venue">${citation}.</span>` : ''}
      ${p.prize ? `<span class="pub-prize">${p.prize}</span>` : ''}
      ${links.length ? `<div class="pub-links">${links.join('')}</div>` : ''}
      ${abstractDiv}
    </div>
  </li>`;
}

function renderWIP(id) {
  const el = document.getElementById(id);
  if (!el || !WIP.length) { el && (el.innerHTML = '<p class="empty">Nothing to show yet.</p>'); return; }
  el.innerHTML = WIP.map(p => `<li>
    <span class="paper-title">"${p.title}."</span>
    <span class="paper-note">${p.status}.</span>
    ${p.abstract ? `<span class="paper-abstract">${p.abstract}</span>` : ''}
    ${p.pdf ? `<span class="paper-links"><a href="${p.pdf}">Draft PDF</a></span>` : ''}
  </li>`).join('');
}

function renderTalks(invitedId, conferenceId) {
  const invited    = TALKS.filter(t => t.type === 'Invited');
  const conference = TALKS.filter(t => t.type === 'Conference');
  _renderTalkList(invitedId,    invited);
  _renderTalkList(conferenceId, conference);
}

function _renderTalkList(id, items) {
  const el = document.getElementById(id);
  if (!el) return;
  if (!items.length) { el.innerHTML = '<li class="empty">Nothing to show yet.</li>'; return; }
  el.innerHTML = items.map(t => {
    const date = [t.month, t.year].filter(Boolean).join(' ');
    return `<li>
      <span class="event-title">"${t.title}."</span>
      <span class="event-details">${t.venue}, ${t.institution}${date ? `, ${date}` : ''}.${t.comment ? ` <em>${t.comment}</em>` : ''}</span>
    </li>`;
  }).join('');
}

function renderTeaching(id) {
  const el = document.getElementById(id);
  if (!el) return;
  // Group by anchor/institution
  const groups = {};
  const order  = [];
  TEACHING.forEach(c => {
    if (!groups[c.anchor]) { groups[c.anchor] = { institution: c.institution, anchor: c.anchor, courses: [] }; order.push(c.anchor); }
    groups[c.anchor].courses.push(c);
  });
  el.innerHTML = order.map((anchor, i) => {
    const g = groups[anchor];
    const courses = g.courses.map(c => `<li>
      <span class="teaching-course">${c.course}</span>
      <span class="teaching-meta">${[c.role, c.level, c.year].filter(Boolean).join(' &middot; ')}${c.description ? ` — ${c.description}` : ''}</span>
    </li>`).join('');
    return `<div class="page-section${i === 0 ? ' page-section--first' : ''}" id="${anchor}">
      <p class="section-title">${g.institution}</p>
      <ul class="teaching-list">${courses}</ul>
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
      ? `<h3>Programme</h3><ul class="event-list">${w.programme.map(e =>
          `<li><span class="event-title">"${e.title}."</span><span class="event-details">${e.speaker}</span></li>`
        ).join('')}</ul>`
      : '';
    return `<div class="page-section${i === 0 ? ' page-section--first' : ''}" id="${w.id}">
      <p class="section-title">${w.title}</p>
      <p class="section-subtitle">${meta}</p>
      ${w.description ? `<p class="workshop-description">${w.description}</p>` : ''}
      ${programme}
    </div>`;
  }).join('');
}

function renderCV() {
  _renderCVSection('cv-employment', [
    { year: '2023–', detail: 'Postdoctoral Researcher, Stockholm Centre for the Ethics of War and Peace, Department of Philosophy, Stockholm University' },
  ]);

  const edu = [
    { year: '2023', detail: 'PhD in Philosophy, King\'s College London', sub: 'Supervised by David Owens, Massimo Renzo, and Sarah Fine' },
    { year: '',     detail: 'MPhil in Philosophy, University of Oxford' },
    { year: '',     detail: 'BA in Philosophy, King\'s College London' },
  ];
  _renderCVSection('cv-education', edu);

  // Publications from data
  const pubItems = PUBLICATIONS.map(p => ({
    year: p.year ? String(p.year) : '',
    detail: `${p.coauthors ? `(with ${p.coauthors}) ` : ''}"${p.title}."`,
    sub: (() => { const v = p.volume ? `vol. ${p.volume}` : ''; const i = p.issue ? `no. ${p.issue}` : ''; const pg = p.pages ? `: ${p.pages}` : ''; const vol = [v,i].filter(Boolean).join(', ')+pg; return [p.journal ? `<em>${p.journal}</em>` : '', vol].filter(Boolean).join(', '); })(),
    link: p.doi || p.pdf || '',
  }));
  _renderCVSection('cv-publications', pubItems);

  // Talks from data
  const invitedItems = TALKS.filter(t => t.type === 'Invited').map(t => ({
    year: String(t.year),
    detail: `"${t.title}." ${t.venue}, ${t.institution}.`,
  }));
  _renderCVSection('cv-talks-invited', invitedItems);

  const confItems = TALKS.filter(t => t.type === 'Conference').map(t => ({
    year: String(t.year),
    detail: `"${t.title}." ${t.venue}, ${t.institution}.`,
  }));
  _renderCVSection('cv-talks-conference', confItems);

  // Teaching from data
  const teachItems = TEACHING.map(c => ({
    year: c.year,
    detail: c.course,
    sub: `${c.role} · ${c.institution}`,
  }));
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

// Set footer year
document.getElementById('year').textContent = new Date().getFullYear();
