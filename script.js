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
// Dark is the default; light only if the visitor chose it
setTheme(stored || 'dark');

toggle.addEventListener('click', () => {
  const next = root.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
  setTheme(next);
  try { localStorage.setItem('theme', next); } catch (e) {}
});

// Highlight the nav link for the section currently in view
const navLinks = document.querySelectorAll('.site-menu a[href^="#"]');
const sections = [...navLinks].map((a) => document.querySelector(a.getAttribute('href'))).filter(Boolean);

if ('IntersectionObserver' in window && sections.length) {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      navLinks.forEach((a) => {
        if (a.getAttribute('href') === '#' + entry.target.id) {
          a.setAttribute('aria-current', 'location');
        } else {
          a.removeAttribute('aria-current');
        }
      });
    });
  }, { rootMargin: '-40% 0px -55% 0px' });
  // The hero has no nav link, so scrolling back to it clears the highlight
  [document.querySelector('.hero'), ...sections].filter(Boolean).forEach((s) => observer.observe(s));
}
