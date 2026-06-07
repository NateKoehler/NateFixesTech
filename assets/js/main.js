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
  form.addEventListener('submit', async (event) => {
    event.preventDefault();
    formStatus.className = 'form-status';

    const name = form.querySelector('#name')?.value.trim() ?? '';
    const email = form.querySelector('#email')?.value.trim() ?? '';
    const message = form.querySelector('#message')?.value.trim() ?? '';
    const action = form.getAttribute('action') ?? '';

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!name || !email || !message) {
      event.preventDefault();
      formStatus.textContent = 'Please complete all fields before sending.';
      formStatus.classList.add('error');
      return;
    }

    if (!emailPattern.test(email)) {
      event.preventDefault();
      formStatus.textContent = 'Please enter a valid email address.';
      formStatus.classList.add('error');
      return;
    }

    if (action.includes('/your-form-id')) {
      formStatus.textContent = 'Form is not connected yet. Replace the form action URL in contact.html with your real Formspree endpoint.';
      formStatus.classList.add('error');
      return;
    }

    formStatus.textContent = 'Sending your message...';
    formStatus.classList.add('success');

    try {
      const response = await fetch(action, {
        method: 'POST',
        body: new FormData(form),
        headers: {
          Accept: 'application/json',
        },
      });

      if (response.ok) {
        formStatus.textContent = 'Thanks! Your message was sent successfully.';
        form.reset();
        return;
      }

      const data = await response.json().catch(() => ({}));
      const firstError = data?.errors?.[0]?.message;
      formStatus.className = 'form-status error';
      formStatus.textContent = firstError || 'Sorry, there was a problem sending your message. Please try again.';
    } catch (_error) {
      formStatus.className = 'form-status error';
      formStatus.textContent = 'Network error while sending. Please check your connection and try again.';
    }
  });
}

const yearElement = document.querySelector('#year');
if (yearElement) {
  yearElement.textContent = String(new Date().getFullYear());
}
