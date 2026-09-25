document.getElementById('year').textContent = new Date().getFullYear();

const toggle = document.getElementById('theme-toggle');
const root = document.documentElement;
const stored = localStorage.getItem('theme');

if (stored === 'light') {
  root.setAttribute('data-theme', 'light');
  toggle.setAttribute('aria-pressed', 'true');
}

toggle.addEventListener('click', () => {
  const isLight = root.getAttribute('data-theme') === 'light';
  if (isLight) {
    root.removeAttribute('data-theme');
    localStorage.setItem('theme', 'dark');
    toggle.setAttribute('aria-pressed', 'false');
    toggle.setAttribute('aria-label', 'Switch to light mode');
  } else {
    root.setAttribute('data-theme', 'light');
    localStorage.setItem('theme', 'light');
    toggle.setAttribute('aria-pressed', 'true');
    toggle.setAttribute('aria-label', 'Switch to dark mode');
  }
});
