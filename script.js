const year = document.getElementById('year');
if (year) year.textContent = new Date().getFullYear();

const toggle = document.getElementById('theme-toggle');
const root = document.documentElement;

function setTheme(theme) {
  const isDark = theme === 'dark';
  if (isDark) {
    root.setAttribute('data-theme', 'dark');
  } else {
    root.removeAttribute('data-theme');
  }
  toggle.setAttribute('aria-pressed', String(isDark));
  toggle.setAttribute('aria-label', isDark ? 'Switch to light mode' : 'Switch to dark mode');
}

let stored = null;
try { stored = localStorage.getItem('theme'); } catch (e) {}
setTheme(stored || (matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'));

toggle.addEventListener('click', () => {
  const next = root.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
  setTheme(next);
  try { localStorage.setItem('theme', next); } catch (e) {}
});

const menuToggle = document.getElementById('menu-toggle');
const menu = document.getElementById('site-menu');

function setMenu(open) {
  menu.hidden = !open;
  menuToggle.setAttribute('aria-expanded', String(open));
  menuToggle.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
}

menuToggle.addEventListener('click', () => setMenu(menu.hidden));

document.addEventListener('click', (e) => {
  if (!menu.hidden && !e.target.closest('.site-nav')) setMenu(false);
});

document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && !menu.hidden) {
    setMenu(false);
    menuToggle.focus();
  }
});
