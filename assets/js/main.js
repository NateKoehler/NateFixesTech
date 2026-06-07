const menuButton = document.querySelector('.menu-toggle');
const navLinks = document.querySelector('#nav-links');

if (menuButton && navLinks) {
  menuButton.addEventListener('click', () => {
    const isOpen = navLinks.classList.toggle('open');
    menuButton.setAttribute('aria-expanded', String(isOpen));
  });
}

for (const link of document.querySelectorAll('a[href^="#"]')) {
  link.addEventListener('click', (event) => {
    const id = link.getAttribute('href');
    const target = id ? document.querySelector(id) : null;
    if (!target) {
      return;
    }

    event.preventDefault();
    target.scrollIntoView({ behavior: 'smooth' });
  });
}

const yearElement = document.querySelector('#year');
if (yearElement) {
  yearElement.textContent = String(new Date().getFullYear());
}
