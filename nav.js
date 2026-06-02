// nav.js — builds the entire nav from data/nav.json loaded by boot.js.
// You should never need to edit this file.

function buildNav() {
  const nav   = document.querySelector('header nav');
  if (!nav) return;

  const items = (window.NAV_ITEMS || []);
  const current = window.location.pathname.split('/').pop() || 'index.html';

  nav.innerHTML = items.map(item => {
    if (item.dropdown) {
      const subitems = window['NAV_' + item.dropdown.toUpperCase()] || [];
      const isActive = subitems.some(s => s.href === current) || current.startsWith(item.dropdown);
      const menuId   = item.dropdown + '-menu';
      return `<div class="nav-dropdown${isActive ? ' active' : ''}">
        <button class="nav-dropdown-trigger" data-dropdown="${item.dropdown}">${item.label}</button>
        <ul class="nav-dropdown-menu" id="${menuId}">
          ${subitems.map(s => `<li><a href="${s.href}">${s.label}</a></li>`).join('')}
        </ul>
      </div>`;
    }
    const active = item.href === current;
    return `<a href="${item.href}"${active ? ' class="active"' : ''}>${item.label}</a>`;
  }).join('');

  // Toggle dropdowns on click; close on outside click
  nav.querySelectorAll('.nav-dropdown-trigger').forEach(trigger => {
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
// buildNav() is invoked by boot.js once nav data has loaded.
