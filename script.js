// Navbar scroll shadow
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
    navbar.classList.toggle('scrolled', window.scrollY > 20);
}, { passive: true });

// Reveal on scroll
const revealEls = document.querySelectorAll('.reveal');
new IntersectionObserver((entries) => {
    entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('in-view'); });
}, { threshold: 0.1, rootMargin: '0px 0px -60px 0px' }).observe
    ? (() => {
        const obs = new IntersectionObserver((entries) => {
            entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('in-view'); });
        }, { threshold: 0.1, rootMargin: '0px 0px -60px 0px' });
        revealEls.forEach(el => obs.observe(el));
    })()
    : revealEls.forEach(el => el.classList.add('in-view'));

// Active nav on scroll
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-link');
new IntersectionObserver((entries) => {
    entries.forEach(e => {
        if (e.isIntersecting) {
            navLinks.forEach(l => l.classList.remove('active'));
            const a = document.querySelector(`.nav-link[href="#${e.target.id}"]`);
            if (a) a.classList.add('active');
        }
    });
}, { threshold: 0.4 }).observe
    ? (() => {
        const obs = new IntersectionObserver((entries) => {
            entries.forEach(e => {
                if (e.isIntersecting) {
                    navLinks.forEach(l => l.classList.remove('active'));
                    const a = document.querySelector(`.nav-link[href="#${e.target.id}"]`);
                    if (a) a.classList.add('active');
                }
            });
        }, { threshold: 0.4 });
        sections.forEach(s => obs.observe(s));
    })()
    : null;

// Smooth scroll
document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', e => {
        const target = document.querySelector(a.getAttribute('href'));
        if (target) { e.preventDefault(); target.scrollIntoView({ behavior: 'smooth' }); }
    });
});
