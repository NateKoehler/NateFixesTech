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

const contactForm = document.querySelector('#contact-form');
if (contactForm instanceof HTMLFormElement) {
  const nameField = contactForm.querySelector('input[name="name"]');
  const emailField = contactForm.querySelector('input[name="email"]');
  const subjectField = contactForm.querySelector('input[name="_subject"]');
  const replyToField = contactForm.querySelector('input[name="_replyto"]');
  const customerReferenceField = contactForm.querySelector('input[name="customer_reference"]');
  const formStatus = contactForm.parentElement?.querySelector('[data-form-status]');

  const setFormStatus = (message, type = '') => {
    if (!(formStatus instanceof HTMLElement)) {
      return;
    }

    formStatus.textContent = message;
    formStatus.classList.remove('error', 'success');
    if (type) {
      formStatus.classList.add(type);
    }
  };

  contactForm.addEventListener(
    'submit',
    (event) => {
      if (!contactForm.reportValidity()) {
        event.preventDefault();
        return;
      }



      const nameValue =
        nameField instanceof HTMLInputElement ? nameField.value.trim().replace(/\s+/g, ' ') : '';
      const emailValue = emailField instanceof HTMLInputElement ? emailField.value.trim() : '';
      const customerLabel = nameValue || emailValue || 'Unknown customer';

      if (subjectField instanceof HTMLInputElement) {
        subjectField.value = `NateFixesTech inquiry from ${customerLabel}`;
      }

      if (replyToField instanceof HTMLInputElement) {
        replyToField.value = emailValue;
      }

      if (customerReferenceField instanceof HTMLInputElement) {
        customerReferenceField.value =
          nameValue && emailValue ? `${nameValue} <${emailValue}>` : customerLabel;
      }
      setFormStatus('Submitting your request...', 'success');
    },
    true
  );
}
