// nav.js — builds the entire nav from data/nav.json loaded by boot.js.

function buildNav() {
  const nav = document.querySelector('header nav');
  if (!nav) return;

  const items  = window.NAV_ITEMS || [];
  const current = window.location.pathname.split('/').pop() || 'index.html';

  nav.innerHTML = items.map(item => {
    const subitems = item.subitems || [];
    if (subitems.length) {
      const dropKey  = item.label.toLowerCase();
      const isActive = subitems.some(s => s.href === current) || current.startsWith(dropKey);
      return `<div class="nav-dropdown${isActive ? ' active' : ''}">
        <button class="nav-dropdown-trigger" data-dropdown="${dropKey}">${item.label}</button>
        <ul class="nav-dropdown-menu">
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
