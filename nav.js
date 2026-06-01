// nav.js — builds the nav dropdowns from data/nav-items.js and marks active page.
// You should never need to edit this file.

function buildNav() {
  // Populate dropdowns
  _fillDropdown('workshops-menu', NAV_WORKSHOPS, 'workshops.html');
  _fillDropdown('teaching-menu',  NAV_TEACHING,  'teaching.html');

  // Mark active page
  const page    = document.body.dataset.page;
  const current = window.location.pathname.split('/').pop() || 'index.html';

  document.querySelectorAll('nav > a').forEach(a => {
    if (a.getAttribute('href') === `${page}.html`) a.classList.add('active');
  });

  document.querySelectorAll('.nav-dropdown').forEach(dropdown => {
    const base = dropdown.querySelector('.nav-dropdown-trigger').dataset.page;
    if (base && current.startsWith(base)) dropdown.classList.add('active');
  });

  // Toggle dropdowns on click; close on outside click
  document.querySelectorAll('.nav-dropdown-trigger').forEach(trigger => {
    trigger.addEventListener('click', e => {
      e.stopPropagation();
      const dropdown = trigger.closest('.nav-dropdown');
      const isOpen   = dropdown.classList.contains('open');
      document.querySelectorAll('.nav-dropdown.open').forEach(d => d.classList.remove('open'));
      if (!isOpen) dropdown.classList.add('open');
    });
  });

  document.addEventListener('click', () => {
    document.querySelectorAll('.nav-dropdown.open').forEach(d => d.classList.remove('open'));
  });
}

function _fillDropdown(menuId, items, basePage) {
  const menu = document.getElementById(menuId);
  if (!menu) return;
  menu.innerHTML = items.map(item => {
    const href = item.href ? item.href : `${basePage}#${item.anchor}`;
    return `<li><a href="${href}">${item.label}</a></li>`;
  }).join('');
}

buildNav();
