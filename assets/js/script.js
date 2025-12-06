// Mobile Navigation Toggle
const navToggle = document.querySelector('.nav-toggle');
const navMenu = document.querySelector('#nav-menu');

if (navToggle && navMenu) {
    navToggle.addEventListener('click', () => {
        const expanded = navToggle.getAttribute('aria-expanded') === 'true';
        navToggle.setAttribute('aria-expanded', String(!expanded));
        navMenu.classList.toggle('open');
    });
}

// Smooth Scrolling
const navLinks = document.querySelectorAll('a[href^="#"]');
navLinks.forEach(link => {
    link.addEventListener('click', event => {
        const targetId = link.getAttribute('href');
        if (targetId && targetId.startsWith('#')) {
            const target = document.querySelector(targetId);
            if (target) {
                event.preventDefault();
                target.scrollIntoView({ behavior: 'smooth' });
                if (navMenu.classList.contains('open')) {
                    navMenu.classList.remove('open');
                    navToggle.setAttribute('aria-expanded', 'false');
                }
            }
        }
    });
});

// Gallery Tabs
const tabs = document.querySelectorAll('.tab');
const galleries = document.querySelectorAll('[data-gallery]');

tabs.forEach(tab => {
    tab.addEventListener('click', () => {
        const target = tab.dataset.target;
        tabs.forEach(t => t.classList.remove('active'));
        tab.classList.add('active');

        galleries.forEach(gallery => {
            gallery.classList.toggle('hidden', gallery.dataset.gallery !== target);
        });
    });
});

// Kontaktformular Validierung
const form = document.querySelector('#contact-form');

if (form) {
    form.addEventListener('submit', event => {
        event.preventDefault();
        const name = form.querySelector('#name');
        const email = form.querySelector('#email');
        const message = form.querySelector('#message');
        const success = form.querySelector('.form-success');
        let valid = true;

        [name, email, message].forEach(field => {
            const errorEl = field.parentElement.querySelector('.error-message');
            if (!field.value.trim()) {
                errorEl.textContent = 'Dieses Feld ist erforderlich.';
                valid = false;
            } else if (field.type === 'email' && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(field.value.trim())) {
                errorEl.textContent = 'Bitte geben Sie eine gültige E-Mail-Adresse ein.';
                valid = false;
            } else {
                errorEl.textContent = '';
            }
        });

        if (valid) {
            success.textContent = 'Vielen Dank für Ihre Nachricht. Wir melden uns in Kürze.';
            form.reset();
        } else {
            success.textContent = '';
        }
    });
}

// Dynamisches Jahr im Footer
const yearEl = document.querySelector('#year');
if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
}
