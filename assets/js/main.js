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
    const endpoint = form.getAttribute('action') ?? '';

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

    if (!endpoint || endpoint.includes('your-form-id')) {
      formStatus.textContent = 'Form is not configured yet. Add your Formspree form ID in contact.html.';
      formStatus.classList.add('error');
      return;
    }

    try {
      formStatus.textContent = 'Sending your message...';
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: {
          Accept: 'application/json'
        },
        body: new FormData(form)
      });

      if (!response.ok) {
        throw new Error('Failed to send form submission');
      }

      formStatus.textContent = 'Thanks! Your message was sent successfully.';
      formStatus.classList.add('success');
      form.reset();
    } catch {
      formStatus.textContent = 'Sorry, there was a problem sending your message. Please try again.';
      formStatus.classList.add('error');
    }
  });
}

const yearElement = document.querySelector('#year');
if (yearElement) {
  yearElement.textContent = String(new Date().getFullYear());
}
