/* ─── BINARY RAIN ─── */
(function() {
  const canvas = document.getElementById('binary-rain');
  const ctx = canvas.getContext('2d');

  function resize() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }
  resize();
  window.addEventListener('resize', resize);

  const fontSize = 13;
  let cols, drops;

  function init() {
    cols = Math.floor(canvas.width / fontSize);
    drops = Array(cols).fill(0).map(() => Math.random() * -50);
  }
  init();
  window.addEventListener('resize', init);

  // Chars: mix of binary (0,1) and some matrix symbols
  const chars = '01001101010110001100101100110101';

  function draw() {
    // Slight fade — creates the trail
    ctx.fillStyle = 'rgba(6,6,16,0.05)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    for (let i = 0; i < cols; i++) {
      const char = chars[Math.floor(Math.random() * chars.length)];
      const x = i * fontSize;
      const y = drops[i] * fontSize;

      // Head of stream: brighter
      const alpha = Math.random() > 0.97 ? 1 : 0.7;
      if (drops[i] * fontSize < fontSize * 2) {
        ctx.fillStyle = `rgba(255,255,255,${alpha})`;
      } else {
        // gradient: newer chars are brighter
        const brightness = Math.random() > 0.95 ? 220 : 130;
        ctx.fillStyle = `rgba(0,${brightness},${brightness},${alpha})`;
      }

      ctx.font = `${fontSize}px 'Orbitron', monospace`;
      ctx.fillText(char, x, y);

      // Reset drop when it goes off screen (random chance)
      if (y > canvas.height && Math.random() > 0.975) {
        drops[i] = 0;
      }
      drops[i] += 0.5;
    }
  }

  setInterval(draw, 50);
})();

document.addEventListener('DOMContentLoaded', () => {

  /* ─── CUSTOM CURSOR ─── */
  const dot = document.querySelector('.cursor-dot');
  const ring = document.querySelector('.cursor-ring');
  let mx = 0, my = 0, rx = 0, ry = 0;

  document.addEventListener('mousemove', e => {
    mx = e.clientX; my = e.clientY;
    dot.style.left = mx + 'px';
    dot.style.top  = my + 'px';
  });

  (function animRing() {
    rx += (mx - rx) * 0.14;
    ry += (my - ry) * 0.14;
    ring.style.left = rx + 'px';
    ring.style.top  = ry + 'px';
    requestAnimationFrame(animRing);
  })();

  document.querySelectorAll('a,button').forEach(el => {
    el.addEventListener('mouseenter', () => {
      ring.style.width = '52px'; ring.style.height = '52px';
      ring.style.borderColor = 'rgba(0,242,255,0.8)';
    });
    el.addEventListener('mouseleave', () => {
      ring.style.width = '34px'; ring.style.height = '34px';
      ring.style.borderColor = 'rgba(0,242,255,0.5)';
    });
  });

  /* ─── NAVBAR SCROLL ─── */
  const navbar = document.getElementById('navbar');
  window.addEventListener('scroll', () => {
    navbar.classList.toggle('scrolled', window.scrollY > 60);
  });

  /* ─── HAMBURGER MENU ─── */
  const hamburger = document.getElementById('hamburger');
  const mobileMenu = document.getElementById('mobile-menu');
  hamburger.addEventListener('click', () => {
    mobileMenu.classList.toggle('open');
  });
  document.querySelectorAll('.mob-link').forEach(l => {
    l.addEventListener('click', () => mobileMenu.classList.remove('open'));
  });

  /* ─── THEME TOGGLE ─── */
  const themeBtn = document.getElementById('toggle-theme');
  const themeIcon = document.getElementById('theme-icon');
  themeBtn.addEventListener('click', () => {
    document.body.classList.toggle('light');
    const isLight = document.body.classList.contains('light');
    themeIcon.className = isLight ? 'fas fa-sun' : 'fas fa-moon';
  });

  /* ─── TYPING EFFECT ─── */
  const phrases = [
    'Desenvolvedor Front-End | Criador de Soluções',
    'Especialista em Flutter & Node.js',
    'Apaixonado por Interfaces Modernas',
    'Baseado em Maputo, Moçambique 🇲🇿'
  ];
  const typed = document.getElementById('typed');
  let pi = 0, ci = 0, deleting = false, wait = 0;

  function typeLoop() {
    if (wait > 0) { wait--; setTimeout(typeLoop, 60); return; }
    const phrase = phrases[pi];
    if (!deleting) {
      typed.textContent = phrase.slice(0, ++ci);
      if (ci === phrase.length) { deleting = true; wait = 28; }
    } else {
      typed.textContent = phrase.slice(0, --ci);
      if (ci === 0) { deleting = false; pi = (pi + 1) % phrases.length; wait = 8; }
    }
    setTimeout(typeLoop, deleting ? 38 : 72);
  }
  typeLoop();

  /* ─── TERMINAL TYPEWRITER ─── */
  const terminalText = document.getElementById('terminal-text');
  const code = `{
  "name": "Melvin Cumbi",
  "age": 23,
  "location": "Maputo, Mozambique",
  "role": "Front-End Developer",
  "education": "Engenharia Informática",
  "experience": "3 anos",
  "stack": [
    "HTML5", "CSS3", "JavaScript",
    "Flutter", "Node.js", "Firebase"
  ],
  "passions": [
    "UI/UX Design",
    "Animações Web",
    "Mobile Dev"
  ],
  "status": "Disponível para projetos 🚀"
}`;

  let ti = 0;
  function typeTerminal() {
    if (ti < code.length) {
      terminalText.textContent += code[ti++];
      setTimeout(typeTerminal, 18);
    }
  }

  // Start when terminal is visible
  const termObs = new IntersectionObserver(entries => {
    if (entries[0].isIntersecting) {
      typeTerminal();
      termObs.disconnect();
    }
  }, { threshold: 0.3 });
  if (terminalText) termObs.observe(terminalText);

  /* ─── ANIMATED COUNTERS ─── */
  function animateCounter(el) {
    const target = parseInt(el.dataset.target);
    let current = 0;
    const step = Math.ceil(target / 40);
    const timer = setInterval(() => {
      current += step;
      if (current >= target) { current = target; clearInterval(timer); }
      el.textContent = current;
    }, 40);
  }

  const counterObs = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        animateCounter(e.target);
        counterObs.unobserve(e.target);
      }
    });
  }, { threshold: 0.5 });
  document.querySelectorAll('.stat-num').forEach(el => counterObs.observe(el));

  /* ─── SKILLS BARS (animate on scroll) ─── */
  const skillObs = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.querySelectorAll('.sk-bar').forEach(bar => {
          bar.style.width = bar.style.getPropertyValue('--w') ||
            getComputedStyle(bar).getPropertyValue('--w');
        });
        skillObs.unobserve(e.target);
      }
    });
  }, { threshold: 0.1 });
  const skillsGrid = document.querySelector('.skills-3d-grid');
  if (skillsGrid) skillObs.observe(skillsGrid);

  /* ─── PROJECT FILTER ─── */
  const filterBtns = document.querySelectorAll('.fb');
  const projCards = document.querySelectorAll('.proj-card');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const filter = btn.dataset.f;
      projCards.forEach(card => {
        const cat = card.dataset.cat;
        const show = filter === 'all' || cat === filter;
        card.style.display = show ? '' : 'none';
        if (show) {
          card.style.animation = 'none';
          card.offsetHeight; // reflow
          card.style.animation = '';
        }
      });
    });
  });

  /* ─── SCROLL REVEAL ─── */
  const revealObs = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.classList.add('visible');
        revealObs.unobserve(e.target);
      }
    });
  }, { threshold: 0.12 });

  // Add reveal class to sections
  document.querySelectorAll('.sk-card, .proj-card, .stat-box, .ci, .sobre-p, .sobre-list').forEach((el, i) => {
    el.classList.add('reveal');
    el.style.transitionDelay = (i * 0.04) + 's';
    revealObs.observe(el);
  });

  /* ─── 3D MOUSE TILT ON SKILL CARDS ─── */
  document.querySelectorAll('.sk-card').forEach(card => {
    card.addEventListener('mousemove', e => {
      const rect = card.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      const dx = (e.clientX - cx) / (rect.width / 2);
      const dy = (e.clientY - cy) / (rect.height / 2);
      card.querySelector('.sk-inner').style.transform =
        `rotateY(${dx * 12}deg) rotateX(${-dy * 12}deg) translateZ(8px) translateY(-4px)`;
    });
    card.addEventListener('mouseleave', () => {
      card.querySelector('.sk-inner').style.transform = '';
    });
  });

  /* ─── PARALLAX ON HERO PHOTO ─── */
  const heroSection = document.querySelector('.hero');
  const heroPhoto = document.querySelector('.hero-photo-wrap');
  if (heroSection && heroPhoto) {
    heroSection.addEventListener('mousemove', e => {
      const cx = heroSection.offsetWidth / 2;
      const cy = heroSection.offsetHeight / 2;
      const dx = (e.clientX - cx) / cx;
      const dy = (e.clientY - cy) / cy;
      heroPhoto.style.transform = `translate(${dx * 10}px, ${dy * 8}px) rotateX(${-dy * 4}deg) rotateY(${dx * 4}deg)`;
    });
    heroSection.addEventListener('mouseleave', () => {
      heroPhoto.style.transform = '';
    });
  }

  /* ─── SMOOTH ANCHOR SCROLL ─── */
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', e => {
      const target = document.querySelector(a.getAttribute('href'));
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });

  /* ─── EMAILJS ─── */
  if (typeof emailjs !== 'undefined') {
    emailjs.init("lwH6Kr1_UanwOLAit");
  }

  const form = document.getElementById('contact-form');
  const status = document.getElementById('form-status');

  if (form) {
    form.addEventListener('submit', function(e) {
      e.preventDefault();
      if (status) {
        status.textContent = 'Enviando...';
        status.style.color = 'var(--primary)';
      }
      if (typeof emailjs !== 'undefined') {
        emailjs.sendForm('service_mxt7ekr', 'template_4rq4bax', this)
          .then(() => {
            status.textContent = '✓ Mensagem enviada com sucesso!';
            status.style.color = '#28c840';
            form.reset();
          })
          .catch(err => {
            status.textContent = '✗ Erro ao enviar. Tente novamente.';
            status.style.color = '#ff5f57';
            console.error(err);
          });
      } else {
        // Demo mode
        setTimeout(() => {
          if (status) {
            status.textContent = '✓ Mensagem enviada com sucesso!';
            status.style.color = '#28c840';
            form.reset();
          }
        }, 1200);
      }
    });
  }

  /* ─── FOOTER YEAR ─── */
  const yr = document.getElementById('yr');
  if (yr) yr.textContent = new Date().getFullYear();

});
// script.js

(function() {
  const canvas = document.getElementById("binary-rain");
  const ctx = canvas.getContext("2d");

  function resize() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }
  resize();
  window.addEventListener("resize", resize);

  const fontSize = 13;
  let cols, drops;

  function init() {
    cols = Math.floor(canvas.width / fontSize);
    drops = Array(cols).fill(0).map(() => Math.random() * -50);
  }
  init();
  window.addEventListener("resize", init);

  const chars = "01001101010110001100101100110101"; // Binary and matrix-like characters

  function draw() {
    ctx.fillStyle = "rgba(6,6,16,0.05)"; // Fading trail effect
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    for (let i = 0; i < cols; i++) {
      const char = chars[Math.floor(Math.random() * chars.length)];
      const x = i * fontSize;
      const y = drops[i] * fontSize;

      // Brighter head of the stream
      const alpha = Math.random() > 0.97 ? 1 : 0.7;
      if (drops[i] * fontSize < fontSize * 2) {
        ctx.fillStyle = `rgba(255,255,255,${alpha})`;
      } else {
        // Greenish-blue body of the stream
        const brightness = Math.random() > 0.95 ? 220 : 130;
        ctx.fillStyle = `rgba(0,${brightness},${brightness},${alpha})`;
      }

      ctx.font = `${fontSize}px 'Orbitron', monospace`;
      ctx.fillText(char, x, y);

      // Reset drop when it goes off screen
      if (y * 1.5 > canvas.height && Math.random() > 0.975) { // Adjusted condition for better flow
        drops[i] = 0;
      }
      drops[i] += 0.5; // Falling speed
    }
  }

  setInterval(draw, 50); // Animation frame rate (50ms = 20 frames per second)
})();

// Your existing JavaScript code can follow here
// document.addEventListener('DOMContentLoaded', () => { ... });
// ====================== EMAILJS - FORMULÁRIO ======================
document.getElementById("contact-form").addEventListener("submit", function(event) {
    event.preventDefault();

    const templateParams = {
        name: document.querySelector('[name="user_name"]').value.trim(),
        user_email: document.querySelector('[name="user_email"]').value.trim(),
        message: document.querySelector('[name="message"]').value.trim()
    };

    // ← TUDO PRONTO (service + template já com os teus IDs)
    emailjs.send("service_mxt7ekr", "template_r5pxex9", templateParams)
        .then(function(response) {
            console.log(" Enviado!", response);
            document.getElementById("form-status").innerHTML = 
                `<span style="color:#00ff9d;"> Mensagem enviada com sucesso! Obrigado </span>`;
            document.getElementById("contact-form").reset();
        })
        .catch(function(error) {
            console.log(" Erro:", error);
            document.getElementById("form-status").innerHTML = 
                `<span style="color:#ff4d4d;"> Algo correu mal. Tenta novamente.</span>`;
        });
});
// ====================== FIM EMAILJS ======================