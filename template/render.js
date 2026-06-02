// render.js — reads data arrays and builds page content
// You should never need to edit this file.

// An item is shown on the site unless explicitly hidden (published === false).
function _isPublished(item) { return !item || item.published !== false; }
// An item appears on the CV unless explicitly excluded (cv === false).
function _isOnCV(item) { return !item || item.cv !== false; }

// Accepts HTML (from the rich-text editor) or plain text; ensures external
// links open in a new tab.
function _prepHtml(text) {
  let html = text || '';
  if (!/<\w+/.test(html)) {
    // Plain text — wrap paragraphs split on blank lines.
    html = html.split('\n\n').filter(Boolean).map(p => `<p>${p}</p>`).join('');
  }
  // Add target/rel to external links that don't already have a target.
  html = html.replace(/<a (?![^>]*\btarget=)([^>]*href=["']https?:\/\/[^"']*["'][^>]*)>/g,
    '<a target="_blank" rel="noopener" $1>');
  return html;
}

function renderFrontPage(id) {
  const el = document.getElementById(id);
  if (!el || typeof FRONT_PAGE === 'undefined') return;
  el.innerHTML = _prepHtml(FRONT_PAGE.text);
  el.style.textAlign = FRONT_PAGE.justify ? 'justify' : '';
  const img = document.getElementById('portrait-img');
  if (img && FRONT_PAGE.portrait) img.src = FRONT_PAGE.portrait.replace(/^\//, '');
}

function renderResearchBio(id) {
  const el = document.getElementById(id);
  if (!el || typeof RESEARCH_BIO === 'undefined') return;
  const justify = window.RESEARCH_BIO_JUSTIFY ? ' style="text-align:justify"' : '';
  el.innerHTML = `<div class="research-bio"${justify}>${_prepHtml(RESEARCH_BIO)}</div>`;
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
    const items = PUBLICATIONS.filter(p => _isPublished(p) && (p.type || 'Article') === key);
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

  const volStr    = (p.volume || p.issue)
    ? (p.volume ? (p.issue ? `${p.volume}(${p.issue})` : p.volume) : `(${p.issue})`)
        + (p.pages ? `: ${p.pages}` : '')
    : (p.pages || '');
  const citation  = [
    p.journal ? `<em>${p.journal}</em>` : '',
    volStr,
  ].filter(Boolean).join(' ');

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
      <h3>${p.coauthors ? `(with ${p.coauthors}) ` : ''}${p.title}</h3>
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
  if (!WIP || !WIP.length) { el.innerHTML = '<p style="color:var(--fg-3)">Nothing to show yet.</p>'; return; }

  const groups = {};
  const order  = [];
  WIP.filter(_isPublished).forEach(p => {
    const key = p.status || 'In preparation';
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

function _talkPresRow(p) {
  const tag = p.type === 'Invited' ? '<sup class="talk-tag">*</sup>'
            : p.type === 'Peer-Review' ? '<sup class="talk-tag">†</sup>' : '';
  const date = p.month ? `${p.month} ${p.year}` : String(p.year || '');
  const where = [p.venue, p.institution].filter(Boolean).join(', ');
  const comment = p.comment ? ` <em class="talk-comment">${p.comment}</em>` : '';
  return `<div class="talk-row">
    <div class="talk-yr">${date}</div>
    <div class="talk-row-detail">${where}${tag}${comment}</div>
  </div>`;
}

function _talkItem(talk) {
  const rows = (talk.presentations || []).filter(_isPublished).map(_talkPresRow).join('');
  return `<li class="talk-item">
    <div class="talk-row"><div class="talk-yr"></div><h3>${talk.title}</h3></div>
    <div class="talk-pres-list">${rows}</div>
  </li>`;
}

function renderTalks(containerId) {
  const el = document.getElementById(containerId);
  if (!el) return;
  if (!TALKS || !TALKS.length) {
    el.innerHTML = '<p style="color:var(--fg-3)">Nothing to show yet.</p>';
    return;
  }
  el.innerHTML = `<ul class="pub-list">${TALKS.filter(_isPublished).map(_talkItem).join('')}</ul>`;
}

function renderTeaching(id) {
  const el = document.getElementById(id);
  if (!el) return;

  // Flatten all entries across institutions, group by role (like the CV).
  const roleOrder = ['Lecturer', 'Seminar Convenor', 'Teaching Assistant', 'Supervisor'];
  const groups = {};
  TEACHING.filter(_isPublished).forEach(inst => {
    (inst.entries || []).forEach(e => {
      (groups[e.role] = groups[e.role] || []).push({ ...e, institution: inst.institution });
    });
  });
  const roles = roleOrder.filter(r => groups[r])
    .concat(Object.keys(groups).filter(r => roleOrder.indexOf(r) === -1));

  el.innerHTML = roles.map((role, i) => {
    const rows = groups[role].map(e => {
      const note = e.note ? ` <span class="talk-comment">${e.note}</span>` : '';
      const levels = (e.levels && e.levels.length)
        ? ` <span class="teaching-levels">${[].concat(e.levels).join(', ')}</span>` : '';
      return `<div class="talk-row">
        <div class="talk-yr">${e.year || ''}</div>
        <div class="talk-row-detail">${e.course}${levels}${note}</div>
      </div>`;
    }).join('');
    return `<span class="section-label${i === 0 ? ' section-label--first' : ''}">${role}</span>
      <div class="talk-pres-list">${rows}</div>`;
  }).join('');
}

function renderWorkshops(id) {
  const el = document.getElementById(id);
  if (!el) return;
  el.innerHTML = `<ul class="pub-list">${WORKSHOPS.filter(_isPublished).map(w => {
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
    ? `<span class="section-label ws-speakers-label">Speakers</span>
       <ul class="pub-list ws-speaker-list">${speakers.map(e => {
        // Support up to two presenters per entry (name/affiliation + name2/affiliation2),
        // with newline-separated names also accepted for backwards compatibility.
        const pairs = [];
        const addPair = (n, a) => { (n || '').split('\n').forEach((nm, i) => {
          if (nm.trim()) pairs.push({ name: nm.trim(), aff: ((a || '').split('\n')[i] || '').trim() });
        }); };
        addPair(e.name, e.affiliation);
        addPair(e.name2, e.affiliation2);
        const speakerHtml = pairs.map(p => {
          const aff = p.aff ? ` <span class="ws-affiliation">${p.aff}</span>` : '';
          return `${p.name}${aff}`;
        }).join(' &middot; ');
        const titleHtml = e.title && e.title !== 'TBA'
          ? `<p class="venue ws-paper-title">${e.title}</p>`
          : '';
        return `<li class="ws-speaker-item">
          <h3 class="ws-speaker">${speakerHtml}</h3>
          ${titleHtml}
        </li>`;
      }).join('')}</ul>`
    : '';

  const descHtml = w.description
    ? `<div class="workshop-description"${w.justify ? ' style="text-align:justify"' : ''}>${_prepHtml(w.description)}</div>`
    : '';
  const regHtml = w.registration ? `<p class="ws-registration">${w.registration}</p>` : '';
  el.innerHTML = `
    <p class="section-subtitle">${meta}</p>
    ${descHtml}
    ${programme}
    ${regHtml}`;
  document.title = `${w.title} — Your Name`;
  const heading = document.getElementById('ws-title');
  if (heading) heading.textContent = w.title;
}

// ---- CV ----

function renderCV() {
  const cv = window.CV_DATA || {};

  // Contact line (website / email / address) under the name
  _renderCVContact(cv.contact || {});

  // AOS / AOC
  _renderCVAreas(cv);

  // Employment from data
  _renderCVSection('cv-employment', (cv.employment || []).map(e => ({
    year: e.year, detail: e.title, sub: e.institution,
  })));

  // Education from data
  _renderCVSection('cv-education', (cv.education || []).map(e => {
    const supLabel = e.supervisors && e.supervisors.split(',').filter(s => s.trim()).length > 1 ? 'Supervisors' : 'Supervisor';
    const exLabel  = e.examiners && e.examiners.split(',').filter(s => s.trim()).length > 1 ? 'Examiners' : 'Examiner';
    const parts = [e.note, e.thesis ? `Thesis: ${e.thesis}` : '', e.supervisors ? `${supLabel}: ${e.supervisors}` : '', e.examiners ? `${exLabel}: ${e.examiners}` : ''].filter(Boolean);
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
      const items = (PUBLICATIONS || []).filter(p => _isPublished(p) && _isOnCV(p) && types.indexOf(p.type || 'Article') > -1);
      if (!items.length) return;
      const rendered = items.map(p => {
        const vol = (p.volume || p.issue)
          ? (p.volume ? (p.issue ? `${p.volume}(${p.issue})` : p.volume) : `(${p.issue})`)
              + (p.pages ? `: ${p.pages}` : '')
          : (p.pages || '');
        const journalPart = p.journal ? `<span class="cv-detail-inline"><em>${p.journal}</em></span>` : '';
        const volPart2 = vol ? `<span class="cv-detail-vol">${vol}.</span>` : '';
        const prize = p.prize ? `<span class="cv-prize">${p.prize}</span>` : '';
        return `<div class="cv-item">
          <span class="cv-year">${p.year || ''}</span>
          <span class="cv-detail">
            <span class="cv-pub-title">${p.coauthors ? `(with ${p.coauthors}) ` : ''}${p.title}${/[.?!]$/.test(p.title) ? '' : '.'}</span>${journalPart ? ` ${journalPart}` : ''}${volPart2 ? ` ${volPart2}` : ''}${prize}
          </span>
        </div>`;
      }).join('');
      html += `<div class="cv-subsection-label">${label}</div>${rendered}`;
    });
    pubEl.innerHTML = html || '<p class="empty">Nothing to show yet.</p>';
  }

  // Work in progress
  _renderCVWIP('cv-wip', WIP || []);

  // Talks — grouped by paper title, like the Talks page, with * / † symbols
  _renderCVTalks('cv-talks', TALKS || []);

  // Teaching — grouped by role (Lecturer, Seminar Convenor, …)
  _renderCVTeaching('cv-teaching', TEACHING || []);

  // Awards (with optional monetary amount)
  _renderCVAwards('cv-awards', cv.awards || []);

  // Event organising
  _renderCVSection('cv-events', (cv.events || []).map(e => ({
    year: e.year, detail: e.title, sub: `${e.institution}${e.note ? ' · ' + e.note : ''}`,
  })));

  // Service — plain items, with Reviewer aligned as its own row
  const serviceItems = (cv.service || []).map(s => ({ year: s.year, detail: s.description }));
  if (cv.reviewer) {
    serviceItems.push({ year: 'Reviewer', detail: `<em>${cv.reviewer}</em>` });
  }
  _renderCVSection('cv-service', serviceItems);

  // References
  _renderCVReferences(cv.references || []);

  // Reorder sections per cv-order.json, if provided
  _reorderCVSections(window.CV_ORDER || []);
}

function _reorderCVSections(order) {
  if (!order || !order.length) return;
  const main = document.querySelector('main .narrow');
  if (!main) return;
  order.forEach(o => {
    const key = (o && o.key) ? o.key : (o && o.section) ? o.section : o;
    const sec = main.querySelector(`[data-cv-section="${key}"]`);
    if (sec) main.appendChild(sec);
  });
}

function _renderCVContact(c) {
  const el = document.getElementById('cv-contact');
  if (!el) return;
  const inline = [
    c.website ? `<a href="https://${c.website.replace(/^https?:\/\//,'')}" target="_blank" rel="noopener">${c.website}</a>` : '',
    c.email   ? `<a href="mailto:${c.email}">${c.email}</a>` : '',
  ].filter(Boolean).join('<span class="cv-contact-sep">·</span>');
  const addr = c.address ? `<span class="cv-contact-addr">${c.address}</span>` : '';
  el.innerHTML = inline + addr;
}

function _renderCVTalks(id, talks) {
  const el = document.getElementById(id);
  if (!el) return;
  const withPres = talks.filter(t => _isPublished(t) && _isOnCV(t) && (t.presentations || []).filter(_isPublished).length);
  if (!withPres.length) { el.innerHTML = '<p class="empty">Nothing to show yet.</p>'; return; }
  el.innerHTML = `<ul class="pub-list">${withPres.map(_talkItem).join('')}</ul>`;
}

function _renderCVTeaching(id, teaching) {
  const el = document.getElementById(id);
  if (!el) return;
  // Flatten all entries, then group by role in a fixed order.
  const all = [];
  teaching.forEach(inst => (inst.entries || []).forEach(e => all.push(e)));
  if (!all.length) { el.innerHTML = '<p class="empty">Nothing to show yet.</p>'; return; }

  const roleOrder = ['Lecturer', 'Seminar Convenor', 'Teaching Assistant', 'Supervisor'];
  const groups = {};
  all.forEach(e => { (groups[e.role] = groups[e.role] || []).push(e); });
  const roles = roleOrder.filter(r => groups[r]).concat(Object.keys(groups).filter(r => roleOrder.indexOf(r) === -1));

  el.innerHTML = roles.map(role => {
    const rows = groups[role].map(e => {
      const note = e.note ? ` <span class="cv-detail-sub" style="display:inline">${e.note}</span>` : '';
      return `<div class="cv-item">
        <span class="cv-year">${e.year || ''}</span>
        <span class="cv-detail">${e.course}${note}</span>
      </div>`;
    }).join('');
    return `<div class="cv-subsection-label">${role}</div>${rows}`;
  }).join('');
}

function _renderCVWIP(id, wip) {
  const el = document.getElementById(id);
  if (!el) return;
  const items = wip.filter(p => _isPublished(p) && _isOnCV(p));
  if (!items.length) { el.innerHTML = ''; return; }

  const groups = {};
  const order = [];
  items.forEach(p => {
    const key = p.status || 'In preparation';
    if (!groups[key]) { groups[key] = []; order.push(key); }
    groups[key].push(p);
  });

  el.innerHTML = order.map(status => {
    const rows = groups[status].map(p => `<div class="cv-item">
      <span class="cv-year"></span>
      <span class="cv-detail">${p.title}.</span>
    </div>`).join('');
    return `<div class="cv-subsection-label">${status}</div>${rows}`;
  }).join('');
}

function _renderCVAwards(id, awards) {
  const el = document.getElementById(id);
  if (!el) return;
  if (!awards.length) { el.innerHTML = '<p class="empty">Nothing to show yet.</p>'; return; }
  el.innerHTML = awards.map(a => `
    <div class="cv-item">
      <span class="cv-year">${a.year || ''}</span>
      <span class="cv-detail">${a.description}${a.amount ? ` <span class="cv-award-amount">${a.amount}</span>` : ''}</span>
    </div>`).join('');
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


function renderTeachingResources(id) {
  const el = document.getElementById(id);
  if (!el) return;
  const data = window.TEACHING_RESOURCES || {};
  const groups = data.groups || [];

  // Optional intro text above the groups.
  const intro = data.intro ? `<div class="resource-intro">${_prepHtml(data.intro)}</div>` : '';

  if (!groups.length) {
    el.innerHTML = intro || '<p style="color:var(--fg-3)">Resources coming soon.</p>';
    return;
  }

  const html = groups.map(g => {
    const items = (g.items || []).map(it => {
      const label = it.url
        ? `<a href="${it.url}" target="_blank" rel="noopener">${it.title}</a>`
        : it.title;
      const by = it.author ? ` <span class="resource-author">by ${it.author}</span>` : '';
      const note = it.note ? `<p class="resource-author">${it.note}</p>` : '';
      return `<li class="pub resource-item">
        <div class="yr"></div>
        <div>
          <p class="resource-item-title">${label}${by}</p>
          ${note}
        </div>
      </li>`;
    }).join('');
    return `<h3 class="resource-group-heading">${g.heading}</h3>
      <ul class="pub-list">${items}</ul>`;
  }).join('');

  el.innerHTML = intro + html;
}
