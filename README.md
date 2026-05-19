# NateFixesTech

Static marketing website for NateFixesTech.

## Run locally

From the project root:

```bash
python3 -m http.server 5500
```

Open http://localhost:5500 in your browser.

## Contact form setup (Formspree)

1. Create a form at Formspree and copy your endpoint URL (example: `https://formspree.io/f/abcde123`).
2. Update the `action` on the form in `contact.html`:

```html
<form id="contact-form" action="https://formspree.io/f/abcde123" method="POST" novalidate>
```

3. Submit a test message from the Contact page.

## Before deploying

Replace `https://natefixestech.com` with your real domain in:

- `index.html`
- `about.html`
- `services.html`
- `contact.html`
- `sitemap.xml`
- `robots.txt`

These files contain canonical, Open Graph, and sitemap URLs that should match your live domain.