/* ============================================================
   SUNIL PORTFOLIO — CONSOLIDATED 3D JAVASCRIPT & MOBILE HANDLER
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
    const particlesCount = window.innerWidth < 768 ? 250 : 600;
    const geometry = new THREE.BufferGeometry();
    const positions = new Float32Array(particlesCount * 3);
    const colors = new Float32Array(particlesCount * 3);

    const color1 = new THREE.Color('#6c63ff');
    const color2 = new THREE.Color('#3ecfcf');

    for (let i = 0; i < particlesCount * 3; i += 3) {
      positions[i] = (Math.random() - 0.5) * 80;
      positions[i + 1] = (Math.random() - 0.5) * 80;
      positions[i + 2] = (Math.random() - 0.5) * 80;

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
     2. 3D CARD TILT EFFECT (DESKTOP + TOUCH MOBILE)
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
     3. MOBILE NAVIGATION MENU TOGGLE
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
     4. HEADER SCROLL & ACTIVE LINK HIGHLIGHT
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
     5. TYPEWRITER EFFECT
     ============================================ */
  const typewriterEl = document.getElementById('typewriter');
  const roles = [
    'Full-Stack Developer 💻',
    '3D Web Interactive Creator 🎨',
    'React & Three.js Engineer ⚡',
    'Mobile UI Specialist 📱',
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
     6. STATS COUNTER ANIMATION
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
     7. SKILL TABS & PROGRESS ANIMATION
     ============================================ */
  const skillTabBtns = document.querySelectorAll('.skill-tab-btn');
  const skillGroups = document.querySelectorAll('.skills-group');

  skillTabBtns.forEach((btn) => {
    btn.addEventListener('click', () => {
      skillTabBtns.forEach((b) => b.classList.remove('active'));
      skillGroups.forEach((g) => g.classList.remove('active'));

      btn.classList.add('active');
      const targetId = btn.getAttribute('data-target');
      const targetGroup = document.getElementById(targetId);
      if (targetGroup) {
        targetGroup.classList.add('active');
        animateSkillBars(targetGroup);
      }
    });
  });

  function animateSkillBars(container) {
    const progressFills = container.querySelectorAll('.progress-fill');
    progressFills.forEach((fill) => {
      fill.classList.add('animated');
    });
  }

  const activeSkillGroup = document.querySelector('.skills-group.active');
  if (activeSkillGroup) {
    setTimeout(() => animateSkillBars(activeSkillGroup), 300);
  }

  /* ============================================
     8. PORTFOLIO FILTER CONTROLS
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
     9. PROJECT DETAILS MODAL
     ============================================ */
  const modalOverlay = document.getElementById('projectModal');
  const modalClose = document.getElementById('modalClose');
  const modalBody = document.getElementById('modalBody');
  const openModalBtns = document.querySelectorAll('.open-modal-btn');

  const modalData = {
    'modal-1': {
      title: 'CyberSphere 3D Metaverse',
      tech: 'Three.js, WebGL, React, GSAP',
      desc: 'Full 3D interactive web environment featuring custom shaders, camera controls, dynamic lighting, and real-time audio visualizers.',
    },
    'modal-2': {
      title: 'Aether Pro E-Commerce',
      tech: 'Next.js, Node.js, Stripe, MongoDB',
      desc: 'Complete e-commerce platform with 3D product viewables, multi-currency support, automated checkout, and real-time inventory sync.',
    },
    'modal-3': {
      title: 'Nexus AI Intelligence Suite',
      tech: 'Python, FastAPI, Three.js, OpenAI',
      desc: 'Enterprise analytics dashboard featuring 3D data visualization grids, AI summary generation, and predictive chart metrics.',
    },
    'modal-4': {
      title: 'PulseFit Mobile Ecosystem',
      tech: 'React Native, Expo, Firebase',
      desc: 'Mobile-first application built for iOS & Android with 60 FPS performance, offline data sync, and 3D fitness progress models.',
    },
  };

  openModalBtns.forEach((btn) => {
    btn.addEventListener('click', () => {
      const modalKey = btn.getAttribute('data-modal');
      const data = modalData[modalKey];

      if (data && modalOverlay && modalBody) {
        modalBody.innerHTML = `
          <h3 style="font-size: 1.5rem; margin-bottom: 0.8rem; color: var(--primary-glow);">${data.title}</h3>
          <p style="font-size: 0.85rem; color: var(--accent); margin-bottom: 1.2rem; font-weight: 600;">Stack: ${data.tech}</p>
          <p style="color: var(--text-muted); line-height: 1.7; margin-bottom: 1.8rem;">${data.desc}</p>
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

  if (modalOverlay) {
    modalOverlay.addEventListener('click', (e) => {
      if (e.target === modalOverlay) modalOverlay.classList.remove('open');
    });
  }

  /* ============================================
     10. DESKTOP CUSTOM POINTER
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
     11. CONTACT FORM HANDLER
     ============================================ */
  const contactForm = document.getElementById('contactForm');
  const formStatus = document.getElementById('formStatus');

  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      formStatus.innerHTML = '<span class="form-status success"><i class="fas fa-spinner fa-spin"></i> Sending message...</span>';
      setTimeout(() => {
        formStatus.innerHTML = '<span class="form-status success"><i class="fas fa-check-circle"></i> Message sent successfully! I will reply shortly.</span>';
        contactForm.reset();
        setTimeout(() => {
          formStatus.innerHTML = '';
        }, 5000);
      }, 1500);
    });
  }

  /* ============================================
     12. RESUME DOWNLOAD BUTTON
     ============================================ */
  const downloadCVBtn = document.getElementById('downloadCVBtn');
  if (downloadCVBtn) {
    downloadCVBtn.addEventListener('click', () => {
      alert('📄 Download Sunil Resume PDF: Ready!');
    });
  }

  console.log('%c🚀 3D Portfolio Loaded Successfully | Single Directory Mode', 'color: #3ecfcf; font-weight: bold; font-size: 14px;');
})();
