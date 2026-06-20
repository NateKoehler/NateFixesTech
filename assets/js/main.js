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
  const submitButton = contactForm.querySelector('button[type="submit"]');

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

  contactForm.addEventListener('submit', async (event) => {
    event.preventDefault();

    if (!contactForm.checkValidity()) {
      contactForm.reportValidity();
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

    const originalLabel =
      submitButton instanceof HTMLButtonElement ? submitButton.textContent : null;

    if (submitButton instanceof HTMLButtonElement) {
      submitButton.disabled = true;
      submitButton.textContent = 'Sending...';
    }

    setFormStatus('Submitting your request...', 'success');

    const controller = new AbortController();
    const timeoutId = window.setTimeout(() => controller.abort(), 15000);

    try {
      const response = await fetch(contactForm.action, {
        method: 'POST',
        body: new FormData(contactForm),
        headers: {
          Accept: 'application/json',
        },
        signal: controller.signal,
      });

      if (!response.ok) {
        let errorMessage = 'Unable to submit right now. Please try again in a moment.';
        try {
          const result = await response.json();
          if (result && Array.isArray(result.errors) && result.errors[0]?.message) {
            errorMessage = result.errors[0].message;
          }
        } catch {
          // Keep fallback message when parsing fails.
        }

        throw new Error(errorMessage);
      }

      window.location.href = 'inquiry-confirmation.html';
    } catch (error) {
      if (error instanceof DOMException && error.name === 'AbortError') {
        // Fallback to native submit if fetch hangs, so inquiries are still sent.
        HTMLFormElement.prototype.submit.call(contactForm);
        return;
      }

      const message = error instanceof Error ? error.message : 'Something went wrong.';
      setFormStatus(message, 'error');
    } finally {
      window.clearTimeout(timeoutId);
      if (submitButton instanceof HTMLButtonElement) {
        submitButton.disabled = false;
        if (originalLabel) {
          submitButton.textContent = originalLabel;
        }
      }
    }
  });
}
