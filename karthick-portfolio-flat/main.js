/*==================== NAV MENU SHOW / HIDDEN ====================*/
const navMenu = document.getElementById('nav-menu'),
      navToggle = document.getElementById('nav-toggle'),
      navClose = document.getElementById('nav-close');

if (navToggle) {
  navToggle.addEventListener('click', () => navMenu.classList.add('show-menu'));
}
if (navClose) {
  navClose.addEventListener('click', () => navMenu.classList.remove('show-menu'));
}

/*===== REMOVE MENU ON LINK CLICK (MOBILE) =====*/
const navLinks = document.querySelectorAll('.nav__link');
navLinks.forEach(link => {
  link.addEventListener('click', () => {
    navMenu.classList.remove('show-menu');
  });
});

/*==================== SCROLL SECTIONS ACTIVE LINK ====================*/
const sections = document.querySelectorAll('main section[id]');

function scrollActive() {
  const scrollY = window.pageYOffset;

  sections.forEach(current => {
    const sectionHeight = current.offsetHeight;
    const sectionTop = current.offsetTop - 100;
    const sectionId = current.getAttribute('id');
    const link = document.querySelector('.nav__link[href*=' + sectionId + ']');

    if (link) {
      if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
        link.classList.add('active-link');
      } else {
        link.classList.remove('active-link');
      }
    }
  });
}
window.addEventListener('scroll', scrollActive);

/*==================== CHANGE BACKGROUND HEADER ====================*/
function scrollHeader() {
  const header = document.getElementById('header');
  if (window.scrollY >= 50) header.classList.add('scroll-header');
  else header.classList.remove('scroll-header');
}
window.addEventListener('scroll', scrollHeader);

/*==================== SHOW SCROLL UP ====================*/
function scrollUp() {
  const scrollUpBtn = document.getElementById('scroll-up');
  if (window.scrollY >= 400) scrollUpBtn.classList.add('show-scroll');
  else scrollUpBtn.classList.remove('show-scroll');
}
window.addEventListener('scroll', scrollUp);

/*==================== SCROLL REVEAL ====================*/
const revealElements = document.querySelectorAll('.reveal');

if ('IntersectionObserver' in window) {
  // Only hide elements once we know we can reveal them again — avoids any
  // chance of content staying invisible if the browser/tool doesn't fire callbacks.
  revealElements.forEach(el => el.classList.add('reveal-pending'));

  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.remove('reveal-pending');
        entry.target.classList.add('reveal-visible');
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15 });

  revealElements.forEach(el => revealObserver.observe(el));

  // Safety net: if something goes wrong and elements are still pending after
  // 2s (e.g. observer never fires), reveal everything anyway.
  setTimeout(() => {
    revealElements.forEach(el => {
      el.classList.remove('reveal-pending');
      el.classList.add('reveal-visible');
    });
  }, 2000);
}
// If IntersectionObserver isn't supported at all, elements simply stay at
// their default visible state — no animation, but content always shows.

/*==================== HERO TERMINAL TYPING EFFECT ====================*/
const terminalBody = document.getElementById('terminal-body');

const terminalLines = [
  { prompt: 'karthick@portfolio:~$ ', text: 'whoami' },
  { prompt: '', text: 'Karthick M — Full Stack Developer' },
  { prompt: 'karthick@portfolio:~$ ', text: 'cat skills.txt' },
  { prompt: '', text: 'HTML · CSS · Node.js · PHP · Python · SQL · MongoDB' },
  { prompt: 'karthick@portfolio:~$ ', text: 'status' },
  { prompt: '', text: 'Open to full stack developer opportunities.' }
];

function typeTerminal() {
  if (!terminalBody) return;
  let lineIndex = 0;
  let charIndex = 0;
  terminalBody.innerHTML = '';

  const cursor = document.createElement('span');
  cursor.className = 'terminal__cursor';

  function typeNextChar() {
    if (lineIndex >= terminalLines.length) {
      return;
    }

    const current = terminalLines[lineIndex];
    const fullText = current.prompt + current.text;

    if (charIndex === 0) {
      const lineEl = document.createElement('div');
      lineEl.className = 'terminal__line';
      lineEl.dataset.index = lineIndex;
      if (current.prompt) {
        const promptSpan = document.createElement('span');
        promptSpan.className = 'terminal__prompt';
        promptSpan.textContent = '';
        lineEl.appendChild(promptSpan);
      }
      lineEl.appendChild(document.createTextNode(''));
      lineEl.appendChild(cursor);
      terminalBody.appendChild(lineEl);
    }

    const lineEl = terminalBody.querySelector('[data-index="' + lineIndex + '"]');

    if (charIndex < fullText.length) {
      const promptLen = current.prompt.length;
      if (charIndex < promptLen) {
        lineEl.childNodes[0].textContent += fullText[charIndex];
      } else {
        lineEl.insertBefore(document.createTextNode(fullText[charIndex]), cursor);
      }
      charIndex++;
      setTimeout(typeNextChar, 28);
    } else {
      lineEl.appendChild(cursor);
      lineIndex++;
      charIndex = 0;
      setTimeout(typeNextChar, 450);
    }
  }

  typeNextChar();
}

const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

if (prefersReducedMotion && terminalBody) {
  terminalBody.innerHTML = terminalLines
    .map(l => '<div class="terminal__line"><span class="terminal__prompt">' + l.prompt + '</span>' + l.text + '</div>')
    .join('');
} else {
  typeTerminal();
}

/*==================== CONTACT FORM (no backend — opens mail client) ====================*/
const contactForm = document.getElementById('contact-form');
const formStatus = document.getElementById('form-status');

if (contactForm) {
  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const message = document.getElementById('message').value.trim();

    if (!name || !email || !message) {
      formStatus.textContent = 'Please fill in all fields.';
      return;
    }

    const subject = encodeURIComponent('Portfolio contact from ' + name);
    const body = encodeURIComponent(message + '\n\n— ' + name + ' (' + email + ')');
    window.location.href = 'mailto:karthick4142000@gmail.com?subject=' + subject + '&body=' + body;

    formStatus.textContent = 'Opening your email app to send this message...';
    contactForm.reset();
  });
}
