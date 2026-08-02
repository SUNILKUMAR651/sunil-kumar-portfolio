/* ============================================================
   SUNIL KUMAR — CONSOLIDATED 3D JAVASCRIPT & MOBILE HANDLER
   ============================================================ */

(function () {
  'use strict';

  /* ============================================
     1. THREE.JS 3D CANVAS BACKGROUND & HERO SHAPE
     ============================================ */
  let scene, camera, renderer, particlesMesh, heroMesh;
  const canvasContainer = document.getElementById('canvas-container');
  const hero3DContainer = document.getElementById('hero-3d-object');

  function initThreeJS() {
    if (!window.Three && typeof THREE === 'undefined') return;

    // Background Scene
    scene = new THREE.Scene();
    camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.z = 30;

    renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    canvasContainer.appendChild(renderer.domElement);

    // 3D Particles
    const particlesCount = window.innerWidth < 768 ? 250 : 650;
    const geometry = new THREE.BufferGeometry();
    const positions = new Float32Array(particlesCount * 3);
    const colors = new Float32Array(particlesCount * 3);

    const color1 = new THREE.Color('#6c63ff');
    const color2 = new THREE.Color('#3ecfcf');

    for (let i = 0; i < particlesCount * 3; i += 3) {
      positions[i] = (Math.random() - 0.5) * 85;
      positions[i + 1] = (Math.random() - 0.5) * 85;
      positions[i + 2] = (Math.random() - 0.5) * 85;

      const mixedColor = color1.clone().lerp(color2, Math.random());
      colors[i] = mixedColor.r;
      colors[i + 1] = mixedColor.g;
      colors[i + 2] = mixedColor.b;
    }

    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));

    const material = new THREE.PointsMaterial({
      size: 0.7,
      vertexColors: true,
      transparent: true,
      opacity: 0.6,
    });

    particlesMesh = new THREE.Points(geometry, material);
    scene.add(particlesMesh);

    // Hero 3D Interactive Torus Knot
    if (hero3DContainer) {
      const heroScene = new THREE.Scene();
      const heroCamera = new THREE.PerspectiveCamera(50, 1, 0.1, 100);
      heroCamera.position.z = 4.5;

      const heroRenderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
      heroRenderer.setSize(hero3DContainer.clientWidth || 300, hero3DContainer.clientHeight || 300);
      heroRenderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      hero3DContainer.appendChild(heroRenderer.domElement);

      const torusGeo = new THREE.TorusKnotGeometry(1.1, 0.35, 128, 32);
      const torusMat = new THREE.MeshNormalMaterial({ wireframe: true });
      heroMesh = new THREE.Mesh(torusGeo, torusMat);
      heroScene.add(heroMesh);

      function animateHero() {
        requestAnimationFrame(animateHero);
        if (heroMesh) {
          heroMesh.rotation.x += 0.008;
          heroMesh.rotation.y += 0.012;
        }
        heroRenderer.render(heroScene, heroCamera);
      }
      animateHero();

      window.addEventListener('resize', () => {
        if (hero3DContainer && heroRenderer) {
          const w = hero3DContainer.clientWidth;
          const h = hero3DContainer.clientHeight;
          heroRenderer.setSize(w, h);
          heroCamera.aspect = w / h;
          heroCamera.updateProjectionMatrix();
        }
      });
    }

    function animate() {
      requestAnimationFrame(animate);
      if (particlesMesh) {
        particlesMesh.rotation.y += 0.001;
        particlesMesh.rotation.x += 0.0005;
      }
      renderer.render(scene, camera);
    }
    animate();

    window.addEventListener('resize', () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    });
  }

  initThreeJS();

  /* ============================================
     2. DYNAMIC THEME COLOR PICKER
     ============================================ */
  const themeToggleBtn = document.getElementById('themeToggleBtn');
  const themeOptions = document.getElementById('themeOptions');
  const themeOpts = document.querySelectorAll('.theme-opt');

  if (themeToggleBtn && themeOptions) {
    themeToggleBtn.addEventListener('click', () => {
      themeOptions.classList.toggle('open');
    });

    themeOpts.forEach(opt => {
      opt.addEventListener('click', () => {
        themeOpts.forEach(o => o.classList.remove('active'));
        opt.classList.add('active');
        const hue = opt.getAttribute('data-hue');
        document.documentElement.style.setProperty('--hue', hue);
        themeOptions.classList.remove('open');
      });
    });
  }

  /* ============================================
     3. 3D CARD TILT EFFECT (DESKTOP + TOUCH MOBILE)
     ============================================ */
  const tiltCards = document.querySelectorAll('.tilt-card, .tilt-card-3d');

  tiltCards.forEach((card) => {
    function handleMove(e) {
      const rect = card.getBoundingClientRect();
      const clientX = e.touches ? e.touches[0].clientX : e.clientX;
      const clientY = e.touches ? e.touches[0].clientY : e.clientY;

      const x = clientX - rect.left;
      const y = clientY - rect.top;

      const centerX = rect.width / 2;
      const centerY = rect.height / 2;

      const rotateX = ((y - centerY) / centerY) * -12;
      const rotateY = ((x - centerX) / centerX) * 12;

      card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
    }

    function handleReset() {
      card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)';
    }

    card.addEventListener('mousemove', handleMove);
    card.addEventListener('mouseleave', handleReset);
    card.addEventListener('touchmove', handleMove, { passive: true });
    card.addEventListener('touchend', handleReset);
  });

  /* ============================================
     4. MOBILE NAVIGATION MENU TOGGLE
     ============================================ */
  const navMenu = document.getElementById('navMenu');
  const navToggle = document.getElementById('navToggle');
  const navClose = document.getElementById('navClose');
  const navLinks = document.querySelectorAll('.nav-link');

  if (navToggle) {
    navToggle.addEventListener('click', () => {
      navMenu.classList.add('show-menu');
    });
  }

  if (navClose) {
    navClose.addEventListener('click', () => {
      navMenu.classList.remove('show-menu');
    });
  }

  navLinks.forEach((link) => {
    link.addEventListener('click', () => {
      navMenu.classList.remove('show-menu');
    });
  });

  /* ============================================
     5. HEADER SCROLL & ACTIVE LINK HIGHLIGHT
     ============================================ */
  const header = document.getElementById('header');

  window.addEventListener('scroll', () => {
    if (window.scrollY >= 50) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }

    const sections = document.querySelectorAll('section[id]');
    const scrollY = window.scrollY + 200;

    sections.forEach((current) => {
      const sectionHeight = current.offsetHeight;
      const sectionTop = current.offsetTop;
      const sectionId = current.getAttribute('id');
      const navLink = document.querySelector(`.nav-link[href*="${sectionId}"]`);

      if (navLink) {
        if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
          navLink.classList.add('active');
        } else {
          navLink.classList.remove('active');
        }
      }
    });
  });

  /* ============================================
     6. TYPEWRITER EFFECT
     ============================================ */
  const typewriterEl = document.getElementById('typewriter');
  const roles = [
    'AI Engineer 🤖',
    'Full Stack Developer 💻',
    'Flutter App Developer 📱',
    'IoT Systems Engineer 🔌',
    'AI Automation Specialist ⚡',
  ];
  let roleIndex = 0;
  let charIndex = 0;
  let isDeleting = false;

  function typeRole() {
    if (!typewriterEl) return;

    const currentRole = roles[roleIndex];
    if (isDeleting) {
      typewriterEl.textContent = currentRole.substring(0, charIndex - 1);
      charIndex--;
    } else {
      typewriterEl.textContent = currentRole.substring(0, charIndex + 1);
      charIndex++;
    }

    let typeSpeed = isDeleting ? 50 : 90;

    if (!isDeleting && charIndex === currentRole.length) {
      typeSpeed = 2000;
      isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
      isDeleting = false;
      roleIndex = (roleIndex + 1) % roles.length;
      typeSpeed = 300;
    }

    setTimeout(typeRole, typeSpeed);
  }
  setTimeout(typeRole, 600);

  /* ============================================
     7. STATS COUNTER ANIMATION
     ============================================ */
  const statNumbers = document.querySelectorAll('.stat-number');
  let animatedStats = false;

  function animateCounters() {
    statNumbers.forEach((stat) => {
      const target = +stat.getAttribute('data-target');
      const duration = 1500;
      const step = target / (duration / 16);
      let count = 0;

      const updateCount = () => {
        count += step;
        if (count < target) {
          stat.textContent = Math.ceil(count);
          requestAnimationFrame(updateCount);
        } else {
          stat.textContent = target;
        }
      };
      updateCount();
    });
  }

  const heroStatsSection = document.querySelector('.hero-stats');
  if (heroStatsSection) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting && !animatedStats) {
          animateCounters();
          animatedStats = true;
        }
      });
    }, { threshold: 0.5 });
    observer.observe(heroStatsSection);
  }

  /* ============================================
     8. SKILL FILTERING (INCLUDES ALL SKILLS)
     ============================================ */
  const skillTabBtns = document.querySelectorAll('.skill-tab-btn');
  const skillBoxCards = document.querySelectorAll('.skill-box-card');

  skillTabBtns.forEach((btn) => {
    btn.addEventListener('click', () => {
      skillTabBtns.forEach((b) => b.classList.remove('active'));
      btn.classList.add('active');

      const targetCategory = btn.getAttribute('data-target');

      skillBoxCards.forEach((card) => {
        const cardCat = card.getAttribute('data-category');
        if (targetCategory === 'all-skills' || cardCat === targetCategory) {
          card.classList.remove('hide');
          card.style.animation = 'fadeIn 0.4s ease forwards';
        } else {
          card.classList.add('hide');
        }
      });
    });
  });

  /* ============================================
     9. PORTFOLIO FILTER CONTROLS
     ============================================ */
  const filterBtns = document.querySelectorAll('.filter-btn');
  const projectCards = document.querySelectorAll('.project-card-3d');

  filterBtns.forEach((btn) => {
    btn.addEventListener('click', () => {
      filterBtns.forEach((b) => b.classList.remove('active'));
      btn.classList.add('active');

      const filterVal = btn.getAttribute('data-filter');

      projectCards.forEach((card) => {
        const cat = card.getAttribute('data-category');
        if (filterVal === 'all' || cat === filterVal) {
          card.classList.remove('hide');
          card.style.animation = 'fadeIn 0.5s ease forwards';
        } else {
          card.classList.add('hide');
        }
      });
    });
  });

  /* ============================================
     10. FAQ ACCORDION TOGGLE
     ============================================ */
  const faqItems = document.querySelectorAll('.faq-item');
  faqItems.forEach(item => {
    const qBtn = item.querySelector('.faq-question');
    qBtn.addEventListener('click', () => {
      const isActive = item.classList.contains('active');
      faqItems.forEach(i => i.classList.remove('active'));
      if (!isActive) item.classList.add('active');
    });
  });

  /* ============================================
     11. PROJECT DETAILS MODAL
     ============================================ */
  const modalOverlay = document.getElementById('projectModal');
  const modalClose = document.getElementById('modalClose');
  const modalBody = document.getElementById('modalBody');
  const openModalBtns = document.querySelectorAll('.open-modal-btn');

  const modalData = {
    'proj-xvrino': {
      title: 'Xvrino – AI English Speaking Application',
      tech: 'Flutter, Firebase, OpenAI API, Dart',
      features: ['AI-based Learning', 'Speaking Practice', 'Course Management', 'Learning Dashboard', 'Progress Tracking', 'Firebase Authentication'],
      desc: 'A modern AI-powered English speaking application designed to help learners improve communication skills through interactive lessons and AI-based learning experiences.',
    },
    'proj-coaching': {
      title: 'Coaching Institute Management Website',
      tech: 'Full Stack, Node.js, Admin Panel, SEO',
      features: ['Student Registration', 'Course Management', 'Faculty Profiles', 'Online Admission', 'Study Materials', 'Notice Board', 'Admin Dashboard'],
      desc: 'Designed and developed a complete coaching institute management website for educational organizations to manage admissions, courses, and announcements.',
    },
    'proj-clinic': {
      title: 'Clinic Management Website',
      tech: 'HTML5, CSS3, JavaScript, Bootstrap',
      features: ['Doctor Profiles', 'Appointment Information', 'Services List', 'Patient Info Portal', 'SEO Friendly'],
      desc: 'Developed a professional website for clinics to establish an online presence and simplify doctor-patient communication and appointment scheduling.',
    },
    'proj-news': {
      title: 'Live News Portal Website',
      tech: 'REST APIs, JavaScript ES6+, Responsive CSS',
      features: ['Live News Feed', 'API Integration', 'Category Filter', 'Real-time Search', 'Fast Loading Performance'],
      desc: 'Created a modern news website using external APIs to provide real-time news updates across sports, tech, entertainment, and world news.',
    },
    'proj-edu': {
      title: 'Educational Materials Application',
      tech: 'Flutter, PDF Reader, Material UI',
      features: ['Subject Notes', 'PDF Study Materials', 'Course Content Organizers', 'Easy Categorization'],
      desc: 'Built an application that provides students with centralized educational resources, notes, and downloadable study guides in one place.',
    },
    'proj-homeauto': {
      title: 'Smart Home Automation System',
      tech: 'ESP8266 Microcontroller, Blynk IoT, Relays',
      features: ['Remote Device Control', 'Wi-Fi Based Automation', 'Mobile Control App', 'Relay Switching', 'Real-time Monitoring'],
      desc: 'Designed and developed a smart home automation system using ESP8266 Wi-Fi modules and Blynk platform to remotely toggle appliances.',
    },
    'proj-agri': {
      title: 'Smart Agriculture Monitoring System',
      tech: 'ESP8266, Soil/Temp Sensors, IoT Dashboard',
      features: ['Sensor Monitoring', 'Real-time Data Streaming', 'Remote Telemetry', 'IoT Dashboard'],
      desc: 'Developed an IoT-based agriculture solution using ESP8266 and sensors to monitor farming environmental conditions remotely.',
    },
    'proj-gas': {
      title: 'Smart Gas Detection System',
      tech: 'ESP8266, Gas Leak Sensor, Alert Buzzer',
      features: ['Gas Leakage Detection', 'Sensor Integration', 'Alert Notifications', 'Real-time IoT Safety'],
      desc: 'Built an IoT safety system capable of detecting gas leakage instantly and dispatching real-time notifications for user safety.',
    },
  };

  openModalBtns.forEach((btn) => {
    btn.addEventListener('click', () => {
      const modalKey = btn.getAttribute('data-modal');
      const data = modalData[modalKey];

      if (data && modalOverlay && modalBody) {
        const featureListHtml = data.features ? data.features.map(f => `<span class="focus-pill" style="margin: 2px;">✓ ${f}</span>`).join('') : '';

        modalBody.innerHTML = `
          <h3 style="font-size: 1.5rem; margin-bottom: 0.8rem; color: var(--primary-glow);">${data.title}</h3>
          <p style="font-size: 0.85rem; color: var(--accent); margin-bottom: 1rem; font-weight: 600;">Stack: ${data.tech}</p>
          <p style="color: var(--text-muted); line-height: 1.7; margin-bottom: 1.4rem;">${data.desc}</p>
          <div style="margin-bottom: 1.8rem;">
            <strong style="display: block; font-size: 0.85rem; color: var(--text-main); margin-bottom: 0.5rem;">Key Features:</strong>
            <div style="display: flex; flex-wrap: wrap; gap: 4px;">${featureListHtml}</div>
          </div>
          <a href="#contact" class="btn btn-primary btn-sm" onclick="document.getElementById('projectModal').classList.remove('open')">Inquire Project <i class="fas fa-arrow-right"></i></a>
        `;
        modalOverlay.classList.add('open');
      }
    });
  });

  if (modalClose) {
    modalClose.addEventListener('click', () => {
      modalOverlay.classList.remove('open');
    });
  }

  /* ============================================
     12. RESUME MODAL VIEWER
     ============================================ */
  const resumeModal = document.getElementById('resumeModal');
  const resumeModalClose = document.getElementById('resumeModalClose');
  const navViewResumeBtn = document.getElementById('navViewResumeBtn');
  const heroViewResumeBtn = document.getElementById('heroViewResumeBtn');

  function openResume() {
    if (resumeModal) resumeModal.classList.add('open');
  }

  if (navViewResumeBtn) navViewResumeBtn.addEventListener('click', openResume);
  if (heroViewResumeBtn) heroViewResumeBtn.addEventListener('click', openResume);
  if (resumeModalClose) resumeModalClose.addEventListener('click', () => resumeModal.classList.remove('open'));

  /* ============================================
     13. FLOATING AI CHATBOT ASSISTANT ("ASK SUNIL AI")
     ============================================ */
  const aiChatbotToggle = document.getElementById('aiChatbotToggle');
  const aiChatbotWindow = document.getElementById('aiChatbotWindow');
  const aiChatClose = document.getElementById('aiChatClose');
  const aiChatMessages = document.getElementById('aiChatMessages');
  const aiChatForm = document.getElementById('aiChatForm');
  const aiChatInput = document.getElementById('aiChatInput');
  const chatChips = document.querySelectorAll('.chat-chip');

  if (aiChatbotToggle && aiChatbotWindow) {
    aiChatbotToggle.addEventListener('click', () => {
      aiChatbotWindow.classList.toggle('open');
    });

    if (aiChatClose) {
      aiChatClose.addEventListener('click', () => {
        aiChatbotWindow.classList.remove('open');
      });
    }

    const aiAnswers = {
      skills: "Sunil specializes in **AI Agents, Prompt Engineering, Flutter App Dev, Node.js Full Stack, ESP8266 IoT Systems, and n8n Automations**!",
      projects: "Sunil has built 8 real projects including **Xvrino AI App, Coaching Institute Website, Clinic Management, News Portal, and Smart IoT Systems**!",
      contact: "You can reach Sunil via Email: **sunilkumar8433256@gmail.com** or Phone/WhatsApp: **+91 9508008724**.",
      hire: "Yes! Sunil is actively available for **Freelance Projects, Internships, Full-Time Roles, and AI Consultations**!",
    };

    function appendMessage(text, isUser = false) {
      const msgDiv = document.createElement('div');
      msgDiv.className = `chat-msg ${isUser ? 'user-msg' : 'bot-msg'}`;
      msgDiv.innerHTML = `<p>${text}</p>`;
      aiChatMessages.appendChild(msgDiv);
      aiChatMessages.scrollTop = aiChatMessages.scrollHeight;
    }

    chatChips.forEach(chip => {
      chip.addEventListener('click', () => {
        const qKey = chip.getAttribute('data-q');
        const userText = chip.textContent;
        appendMessage(userText, true);

        setTimeout(() => {
          appendMessage(aiAnswers[qKey] || "Sunil Kumar is a Computer Science Engineering student skilled in AI, Full Stack, Flutter & IoT.");
        }, 500);
      });
    });

    if (aiChatForm) {
      aiChatForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const text = aiChatInput.value.trim();
        if (!text) return;

        appendMessage(text, true);
        aiChatInput.value = '';

        setTimeout(() => {
          const lower = text.toLowerCase();
          if (lower.includes('project') || lower.includes('work')) {
            appendMessage(aiAnswers.projects);
          } else if (lower.includes('skill') || lower.includes('tech') || lower.includes('flutter')) {
            appendMessage(aiAnswers.skills);
          } else if (lower.includes('contact') || lower.includes('email') || lower.includes('phone')) {
            appendMessage(aiAnswers.contact);
          } else if (lower.includes('hire') || lower.includes('job') || lower.includes('freelance')) {
            appendMessage(aiAnswers.hire);
          } else {
            appendMessage("Thanks for asking! Sunil Kumar is an AI Engineer and Full Stack Developer. Feel free to contact him at sunilkumar8433256@gmail.com!");
          }
        }, 600);
      });
    }
  }

  /* ============================================
     14. DESKTOP CUSTOM POINTER
     ============================================ */
  const cursorDot = document.getElementById('cursorDot');
  const cursorRing = document.getElementById('cursorRing');

  if (window.innerWidth > 768 && cursorDot && cursorRing) {
    window.addEventListener('mousemove', (e) => {
      cursorDot.style.left = `${e.clientX}px`;
      cursorDot.style.top = `${e.clientY}px`;

      cursorRing.style.left = `${e.clientX}px`;
      cursorRing.style.top = `${e.clientY}px`;
    });
  }

  /* ============================================
     15. CONTACT FORM HANDLER
     ============================================ */
  const contactForm = document.getElementById('contactForm');
  const formStatus = document.getElementById('formStatus');

  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      formStatus.innerHTML = '<span class="form-status success"><i class="fas fa-spinner fa-spin"></i> Sending message...</span>';
      setTimeout(() => {
        formStatus.innerHTML = '<span class="form-status success"><i class="fas fa-check-circle"></i> Thank you! Sunil Kumar will respond to your message shortly.</span>';
        contactForm.reset();
        setTimeout(() => {
          formStatus.innerHTML = '';
        }, 5000);
      }, 1500);
    });
  }

  console.log('%c🚀 Sunil Kumar Masterpiece 3D Portfolio Active', 'color: #3ecfcf; font-weight: bold; font-size: 14px;');
})();
