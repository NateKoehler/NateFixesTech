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

const form = document.querySelector('#contact-form');
const formStatus = document.querySelector('#form-status');

if (form && formStatus) {
  form.addEventListener('submit', (event) => {
    event.preventDefault();
    formStatus.className = 'form-status';

    const name = form.querySelector('#name')?.value.trim() ?? '';
    const email = form.querySelector('#email')?.value.trim() ?? '';
    const message = form.querySelector('#message')?.value.trim() ?? '';

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!name || !email || !message) {
      formStatus.textContent = 'Please complete all fields before sending.';
      formStatus.classList.add('error');
      return;
    }

    if (!emailPattern.test(email)) {
      formStatus.textContent = 'Please enter a valid email address.';
      formStatus.classList.add('error');
      return;
    }

    formStatus.textContent = 'Thanks! Your message is ready to send.';
    formStatus.classList.add('success');
    form.reset();
  });
}

const yearElement = document.querySelector('#year');
if (yearElement) {
  yearElement.textContent = String(new Date().getFullYear());
}
