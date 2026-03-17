/* NKS Group — main.js */

// ── Navbar scroll
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 60);
}, { passive: true });

// ── Mobile nav toggle
const navToggle = document.getElementById('navToggle');
const navLinks  = document.getElementById('navLinks');
if (navToggle && navLinks) {
  navToggle.addEventListener('click', () => {
    const open = navLinks.classList.toggle('open');
    navToggle.setAttribute('aria-expanded', open);
    navToggle.querySelectorAll('span')[0].style.transform = open ? 'rotate(45deg) translate(5px,5px)' : '';
    navToggle.querySelectorAll('span')[1].style.opacity  = open ? '0' : '';
    navToggle.querySelectorAll('span')[2].style.transform = open ? 'rotate(-45deg) translate(5px,-5px)' : '';
  });
  navLinks.querySelectorAll('a').forEach(a => a.addEventListener('click', () => {
    navLinks.classList.remove('open');
    navToggle.querySelectorAll('span').forEach(s => { s.style.transform = ''; s.style.opacity = ''; });
  }));
}

// ── Contact form (mailto)
const form = document.getElementById('contactForm');
if (form) {
  form.addEventListener('submit', e => {
    e.preventDefault();
    const g = id => (document.getElementById(id)||{}).value || '';
    const subject = encodeURIComponent(`Enquiry from ${g('fname')} ${g('lname')} — ${g('company')}`);
    const body = encodeURIComponent(
      `Name: ${g('fname')} ${g('lname')}\nCompany: ${g('company')}\nEmail: ${g('email')}\nPhone: ${g('phone')}\nService: ${g('service')}\n\nMessage:\n${g('message')}`
    );
    window.location.href = `mailto:admin@nksgroup.co.za?subject=${subject}&body=${body}`;
  });
}

// ── Scroll fade-in animations
const fadeEls = document.querySelectorAll('.fade-up');
const io = new IntersectionObserver(entries => {
  entries.forEach((en, i) => {
    if (en.isIntersecting) {
      setTimeout(() => en.target.classList.add('visible'), i * 70);
      io.unobserve(en.target);
    }
  });
}, { threshold: 0.1 });
fadeEls.forEach(el => io.observe(el));

// ── Year in footer
const yr = document.getElementById('year');
if (yr) yr.textContent = new Date().getFullYear();
