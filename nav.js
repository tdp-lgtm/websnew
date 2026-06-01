// Set footer year
document.getElementById('year').textContent = new Date().getFullYear();

// Highlight active nav link based on data-page attribute on <body>
const page = document.body.dataset.page;
if (page && page !== 'about') {
  const active = document.querySelector(`nav > a[href="${page}.html"]`);
  if (active) active.classList.add('active');
}

// Mark dropdown as active when on its page
document.querySelectorAll('.nav-dropdown').forEach(dropdown => {
  const links = dropdown.querySelectorAll('a');
  const current = window.location.pathname.split('/').pop() || 'index.html';
  links.forEach(link => {
    if (link.getAttribute('href').startsWith(current.replace('.html', ''))) {
      dropdown.classList.add('active');
    }
  });
});

// Toggle dropdowns on click; close on outside click
document.querySelectorAll('.nav-dropdown-trigger').forEach(trigger => {
  trigger.addEventListener('click', e => {
    e.stopPropagation();
    const dropdown = trigger.closest('.nav-dropdown');
    const isOpen = dropdown.classList.contains('open');
    document.querySelectorAll('.nav-dropdown.open').forEach(d => d.classList.remove('open'));
    if (!isOpen) dropdown.classList.add('open');
  });
});

document.addEventListener('click', () => {
  document.querySelectorAll('.nav-dropdown.open').forEach(d => d.classList.remove('open'));
});
