// render.js — reads data arrays and builds page content
// You should never need to edit this file.

function renderFrontPage(id) {
  const el = document.getElementById(id);
  if (!el || typeof FRONT_PAGE === 'undefined') return;
  const fp = FRONT_PAGE;
  const paras = (fp.text || '').split('\n\n').filter(Boolean);
  const justify = fp.justify ? ' style="text-align:justify"' : '';
  el.innerHTML = paras.map(p => `<p${justify}>${p}</p>`).join('');
}

function renderResearchBio(id) {
  const el = document.getElementById(id);
  if (!el || typeof RESEARCH_BIO === 'undefined') return;
  const paras = RESEARCH_BIO.split('\n\n').filter(Boolean);
  const justify = window.RESEARCH_BIO_JUSTIFY ? ' style="text-align:justify"' : '';
  el.innerHTML = `<div class="research-bio">${paras.map(p => `<p${justify}>${p}</p>`).join('')}</div>`;
}

function renderPublications(id) {
  const el = document.getElementById(id);
  if (!el) return;

  // Ordered category definitions
  const categories = [
    { key: 'Article',  label: 'Articles' },
    { key: 'Book',     label: 'Books' },
    { key: 'Chapter',  label: 'Book chapters' },
    { key: 'Editor',   label: 'As editor' },
    { key: 'Review',   label: 'Reviews' },
    { key: 'Public',   label: 'Public writing' },
  ];

  let html = '';
  categories.forEach(({ key, label }) => {
    const items = PUBLICATIONS.filter(p => (p.type || 'Article') === key);
    if (items.length) {
      html += `<span class="section-label">${label}</span><ul class="pub-list">${items.map(_pubItem).join('')}</ul>`;
    }
  });
  if (!html) html = '<p style="color:var(--fg-3)">No publications yet.</p>';
  el.innerHTML = html;
}

function _pubItem(p) {
  const rawYear = p.year ? String(p.year) : '';
  const displayYear = rawYear === 'Forthcoming'  ? 'Forthc.'
                    : rawYear === 'Online first'  ? 'Online'
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

  const groups = {};
  const order  = [];
  WIP.forEach(p => {
    const key = p.status || 'Other';
    if (!groups[key]) { groups[key] = []; order.push(key); }
    groups[key].push(p);
  });

  el.innerHTML = order.map(status => {
    const items = groups[status].map(p => {
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
        <div class="yr"></div>
        <div>
          <h3 class="wip-title">${p.title}.</h3>
          ${links.length ? `<div class="pub-links">${links.join('')}</div>` : ''}
          ${abstractDiv}
        </div>
      </li>`;
    }).join('');
    return `<span class="section-label wip-group-label">${status}</span><ul class="pub-list">${items}</ul>`;
  }).join('');
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
        <div class="talk-yr">${date}</div>
        <div class="talk-row-detail">${where}${tag}.${comment}</div>
      </div>`;
    }).join('');
    return `<li class="talk-item">
      <div class="talk-row">
        <div class="talk-yr"></div>
        <h3>${talk.title}.</h3>
      </div>
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
  el.innerHTML = `<ul class="pub-list">${WORKSHOPS.map(w => {
    const date = [w.month, w.year].filter(Boolean).join(' ');
    const meta = [w.institution, date, w.coorganisers ? `Organised with ${w.coorganisers}` : ''].filter(Boolean).join(' · ');
    return `<li class="pub">
      <div class="yr">${w.year || ''}</div>
      <div>
        <h3><a href="${w.id}.html">${w.title}</a></h3>
        <p class="venue">${meta}.</p>
      </div>
    </li>`;
  }).join('')}</ul>`;
}

function renderWorkshopPage(workshopId, containerId) {
  const el = document.getElementById(containerId);
  if (!el) return;
  const w = WORKSHOPS.find(x => x.id === workshopId);
  if (!w) { el.innerHTML = '<p>Workshop not found.</p>'; return; }
  const date = [w.month, w.year].filter(Boolean).join(' ');
  const meta = [w.institution, date, w.coorganisers ? `Organised with ${w.coorganisers}` : ''].filter(Boolean).join(' · ');

  const speakers = (w.programme || []).filter(e => e.name);
  const programme = speakers.length
    ? `<ul class="ws-speaker-list">${speakers.map(e => {
        const names = e.name.split('\n');
        const affiliations = (e.affiliation || '').split('\n');
        const speakerHtml = names.map((n, i) => {
          const aff = affiliations[i] ? ` <span class="ws-affiliation">(${affiliations[i]})</span>` : '';
          return `${n}${aff}`;
        }).join('<br>');
        const titleHtml = e.title && e.title !== 'TBA'
          ? `<em class="ws-paper-title">${e.title}</em>`
          : '';
        return `<li class="ws-speaker-item">
          <div class="ws-speaker">${speakerHtml}</div>
          ${titleHtml ? `<div class="ws-paper">${titleHtml}</div>` : ''}
        </li>`;
      }).join('')}</ul>`
    : '';

  const descHtml = w.description
    ? w.description.split('\n\n').filter(Boolean).map(p => `<p class="workshop-description">${p}</p>`).join('')
    : '';
  const regHtml = w.registration ? `<p class="ws-registration">${w.registration}</p>` : '';
  el.innerHTML = `
    <p class="section-subtitle">${meta}</p>
    ${descHtml}
    ${programme}
    ${regHtml}`;
  document.title = `${w.title} — Jonas Haeg`;
  const heading = document.getElementById('ws-title');
  if (heading) heading.textContent = w.title;
}

// ---- CV ----

function renderCV() {
  const cv = window.CV_DATA || {};

  // AOS / AOC
  _renderCVAreas(cv);

  // Employment from data
  _renderCVSection('cv-employment', (cv.employment || []).map(e => ({
    year: e.year, detail: e.title, sub: e.institution,
  })));

  // Education from data
  _renderCVSection('cv-education', (cv.education || []).map(e => {
    const parts = [e.note, e.thesis ? `Thesis: ${e.thesis}` : '', e.supervisors ? `Supervisors: ${e.supervisors}` : '', e.examiners ? `Examiners: ${e.examiners}` : ''].filter(Boolean);
    return { year: e.year, detail: `${e.degree}, ${e.institution}`, sub: parts.join(' · ') || '' };
  }));

  // Publications — grouped by type
  const pubGroups = [
    { types: ['Article', undefined, null, ''], label: 'Articles' },
    { types: ['Book'],    label: 'Books' },
    { types: ['Chapter'], label: 'Book chapters' },
    { types: ['Editor'],  label: 'As editor' },
    { types: ['Review'],  label: 'Reviews' },
    { types: ['Public'],  label: 'Public writing' },
  ];
  const pubEl = document.getElementById('cv-publications');
  if (pubEl && PUBLICATIONS) {
    let html = '';
    pubGroups.forEach(({ types, label }) => {
      const items = (PUBLICATIONS || []).filter(p => types.indexOf(p.type || 'Article') > -1);
      if (!items.length) return;
      const rendered = items.map(p => {
        const volPart = p.volume ? `vol. ${p.volume}` : '';
        const issPart = p.issue  ? `no. ${p.issue}`   : '';
        const pgPart  = p.pages  ? `: ${p.pages}` : '';
        const vol = [volPart, issPart].filter(Boolean).join(', ') + pgPart;
        const citation = [p.journal ? `<em>${p.journal}</em>` : '', vol].filter(Boolean).join(', ');
        return `<div class="cv-item">
          <span class="cv-year">${p.year || ''}</span>
          <span class="cv-detail">
            ${p.coauthors ? `(with ${p.coauthors}) ` : ''}${p.title}.
            ${citation ? `<span class="cv-detail-sub">${citation}.</span>` : ''}
          </span>
        </div>`;
      }).join('');
      html += `<div class="cv-subsection-label">${label}</div>${rendered}`;
    });
    pubEl.innerHTML = html || '<p class="empty">Nothing to show yet.</p>';
  }

  // Talks
  const allPresFlat = [];
  (TALKS || []).forEach(talk => {
    (talk.presentations || []).forEach(p => allPresFlat.push({ pres: p, talk }));
  });
  _renderCVSection('cv-talks-invited', allPresFlat.filter(x => x.pres.type === 'Invited').map(x => ({
    year: String(x.pres.year),
    detail: `${x.talk.title}. ${[x.pres.venue, x.pres.institution].filter(Boolean).join(', ')}.`,
  })));
  _renderCVSection('cv-talks-conference', allPresFlat.filter(x => x.pres.type === 'Peer-Review').map(x => ({
    year: String(x.pres.year),
    detail: `${x.talk.title}. ${[x.pres.venue, x.pres.institution].filter(Boolean).join(', ')}.`,
  })));

  // Teaching
  const teachItems = [];
  (TEACHING || []).forEach(inst => {
    (inst.entries || []).forEach(e => {
      teachItems.push({ year: e.year, detail: e.course, sub: `${e.role} · ${inst.institution}` });
    });
  });
  _renderCVSection('cv-teaching', teachItems);

  // Awards
  _renderCVSection('cv-awards', (cv.awards || []).map(a => ({ year: a.year, detail: a.description })));

  // Event organising
  _renderCVSection('cv-events', (cv.events || []).map(e => ({
    year: e.year, detail: e.title, sub: `${e.institution}${e.note ? ' · ' + e.note : ''}`,
  })));

  // Service
  const serviceItems = (cv.service || []).map(s => ({ year: s.year, detail: s.description }));
  if (cv.reviewer) {
    serviceItems.push({ year: '', detail: `Reviewer: ${cv.reviewer}` });
  }
  _renderCVSection('cv-service', serviceItems);

  // References
  _renderCVReferences(cv.references || []);
}

function _renderCVAreas(cv) {
  const el = document.getElementById('cv-areas');
  if (!el) return;
  const rows = [
    cv.aos ? `<div class="cv-item"><span class="cv-year cv-area-label">AOS</span><span class="cv-detail">${cv.aos}</span></div>` : '',
    cv.aoc ? `<div class="cv-item"><span class="cv-year cv-area-label">AOC</span><span class="cv-detail">${cv.aoc}</span></div>` : '',
  ].filter(Boolean);
  el.innerHTML = rows.join('') || '';
}

function _renderCVReferences(refs) {
  const el = document.getElementById('cv-references');
  if (!el || !refs.length) return;
  el.innerHTML = refs.map(r => `
    <div class="cv-ref">
      <div class="cv-ref-name">${r.name}</div>
      <div class="cv-ref-detail">${r.title}</div>
      <div class="cv-ref-detail">${r.institution}</div>
      ${r.email ? `<div class="cv-ref-detail"><a href="mailto:${r.email}">${r.email}</a></div>` : ''}
    </div>`).join('');
}

function _renderCVSection(id, items) {
  const el = document.getElementById(id);
  if (!el) return;
  if (!items || !items.length) { el.innerHTML = '<p class="empty">Nothing to show yet.</p>'; return; }
  el.innerHTML = items.map(item => `
    <div class="cv-item">
      <span class="cv-year">${item.year || ''}</span>
      <span class="cv-detail">
        ${item.link ? `<a href="${item.link}" target="_blank" rel="noopener">${item.detail}</a>` : item.detail}
        ${item.sub ? `<span class="cv-detail-sub">${item.sub}</span>` : ''}
      </span>
    </div>`).join('');
}
