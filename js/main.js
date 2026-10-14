/**
 * NEXORA GLOBAL CONSULTING - CORE JAVASCRIPT
 * Handles Dynamic Branding, UI Interactivity, Animations & Forms
 */

document.addEventListener('DOMContentLoaded', () => {
  // 1. DYNAMIC BRANDING INJECTION FROM CONFIG.JS
  applyDynamicConfig();

  // 2. NAVBAR SCROLL EFFECT & ACTIVE LINK TRACKING
  initNavbarScroll();

  // 3. MOBILE MENU TOGGLE
  initMobileMenu();

  // 4. ANIMATED NUMERICAL COUNTERS
  initCounterAnimation();

  // 5. SERVICES FILTER TABS
  initServicesFilter();

  // 6. TECH STACK TABS
  initTechStackTabs();

  // 7. FAQ ACCORDION
  initFaqAccordion();

  // 8. CONTACT FORM SUBMISSION
  initContactForm();

  // 9. NEWSLETTER FORM
  initNewsletterForm();

  // 10. BACK TO TOP BUTTON
  initBackToTop();
});

/**
 * 1. Read SITE_CONFIG and update all [data-config] elements
 */
function applyDynamicConfig() {
  if (typeof window.SITE_CONFIG === 'undefined') return;

  const config = window.SITE_CONFIG;

  // Set document title
  document.title = `${config.companyName} | Enterprise IT Solutions & Consulting`;

  // Query all data-config elements
  const elements = document.querySelectorAll('[data-config]');
  elements.forEach(el => {
    const keyPath = el.getAttribute('data-config');
    const value = getNestedValue(config, keyPath);

    if (value !== undefined) {
      if (el.tagName === 'A' && el.getAttribute('href')?.startsWith('mailto:')) {
        el.href = `mailto:${value}`;
        el.textContent = value;
      } else if (el.tagName === 'A' && el.getAttribute('href')?.startsWith('tel:')) {
        el.href = `tel:${value.replace(/\s+/g, '')}`;
        el.textContent = value;
      } else {
        el.textContent = value;
      }
    }
  });

  // Current year in copyright
  const yearEl = document.getElementById('current-year');
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }
}

function getNestedValue(obj, path) {
  return path.split('.').reduce((acc, part) => acc && acc[part], obj);
}

/**
 * 2. Sticky Navbar & Active links
 */
function initNavbarScroll() {
  const navbar = document.querySelector('.navbar');
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-link');

  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }

    // Scroll spy
    let current = '';
    const scrollPosition = window.pageYOffset + 120;

    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.offsetHeight;
      if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
        current = section.getAttribute('id');
      }
    });

    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${current}`) {
        link.classList.add('active');
      }
    });
  });
}

/**
 * 3. Mobile Navigation Drawer
 */
function initMobileMenu() {
  const toggleBtn = document.querySelector('.mobile-toggle');
  const navMenu = document.querySelector('.nav-menu');
  const navLinks = document.querySelectorAll('.nav-menu .nav-link');

  if (!toggleBtn || !navMenu) return;

  toggleBtn.addEventListener('click', () => {
    navMenu.classList.toggle('open');
    const isOpen = navMenu.classList.contains('open');
    toggleBtn.setAttribute('aria-expanded', isOpen);
  });

  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      navMenu.classList.remove('open');
    });
  });
}

/**
 * 4. Numerical Counter Animation
 */
function initCounterAnimation() {
  const counterElements = document.querySelectorAll('.counter-val');
  if (!counterElements.length) return;

  let hasAnimated = false;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting && !hasAnimated) {
        hasAnimated = true;
        counterElements.forEach(counter => {
          const target = parseInt(counter.getAttribute('data-target'), 10) || 0;
          const duration = 1800; // ms
          const stepTime = 30;
          const steps = duration / stepTime;
          const increment = target / steps;
          let current = 0;

          const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
              counter.textContent = target;
              clearInterval(timer);
            } else {
              counter.textContent = Math.floor(current);
            }
          }, stepTime);
        });
      }
    });
  }, { threshold: 0.3 });

  const statsSection = document.querySelector('.stats-bar');
  if (statsSection) {
    observer.observe(statsSection);
  }
}

/**
 * 5. Services Filter Tabs
 */
function initServicesFilter() {
  const filterBtns = document.querySelectorAll('.filter-btn');
  const serviceCards = document.querySelectorAll('.service-card');

  if (!filterBtns.length || !serviceCards.length) return;

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filterCategory = btn.getAttribute('data-filter');

      serviceCards.forEach(card => {
        const cardCategory = card.getAttribute('data-category');
        if (filterCategory === 'all' || cardCategory === filterCategory) {
          card.style.display = 'flex';
          setTimeout(() => {
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
          }, 10);
        } else {
          card.style.opacity = '0';
          card.style.transform = 'translateY(20px)';
          setTimeout(() => {
            card.style.display = 'none';
          }, 200);
        }
      });
    });
  });
}

/**
 * 6. Tech Stack Tabs
 */
function initTechStackTabs() {
  const tabBtns = document.querySelectorAll('.tech-tab-btn');
  const techItems = document.querySelectorAll('.tech-item');

  if (!tabBtns.length || !techItems.length) return;

  tabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      tabBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const techFilter = btn.getAttribute('data-tech');

      techItems.forEach(item => {
        const itemCategory = item.getAttribute('data-tech-cat');
        if (techFilter === 'all' || itemCategory === techFilter) {
          item.style.display = 'block';
        } else {
          item.style.display = 'none';
        }
      });
    });
  });
}

/**
 * 7. FAQ Accordion
 */
function initFaqAccordion() {
  const faqItems = document.querySelectorAll('.faq-item');

  faqItems.forEach(item => {
    const questionBtn = item.querySelector('.faq-question');
    if (!questionBtn) return;

    questionBtn.addEventListener('click', () => {
      const isActive = item.classList.contains('active');

      // Close other items
      faqItems.forEach(otherItem => {
        if (otherItem !== item) {
          otherItem.classList.remove('active');
        }
      });

      // Toggle current
      item.classList.toggle('active', !isActive);
    });
  });
}

/**
 * 8. Interactive Contact Form Submission
 */
function initContactForm() {
  const form = document.getElementById('consultation-form');
  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const name = form.querySelector('[name="fullName"]')?.value.trim();
    const email = form.querySelector('[name="email"]')?.value.trim();
    const service = form.querySelector('[name="service"]')?.value;
    const message = form.querySelector('[name="message"]')?.value.trim();

    if (!name || !email || !message) {
      showToast('Please fill in all required fields.', 'error');
      return;
    }

    // Submit button loading animation
    const submitBtn = form.querySelector('button[type="submit"]');
    const originalText = submitBtn.innerHTML;
    submitBtn.innerHTML = '<span>Sending Request...</span>';
    submitBtn.disabled = true;

    setTimeout(() => {
      submitBtn.innerHTML = originalText;
      submitBtn.disabled = false;
      form.reset();

      showToast(`Thank you, ${name}! Your inquiry for ${service || 'consulting'} has been received. Our team will contact you within 24 hours.`, 'success');
    }, 1200);
  });
}

/**
 * 9. Newsletter Subscription
 */
function initNewsletterForm() {
  const form = document.querySelector('.newsletter-form');
  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const input = form.querySelector('.newsletter-input');
    if (!input || !input.value.trim()) return;

    showToast('Subscribed successfully! You will receive our latest tech insights.', 'success');
    input.value = '';
  });
}

/**
 * 10. Back to top button
 */
function initBackToTop() {
  const backToTopBtn = document.querySelector('.back-to-top');
  if (!backToTopBtn) return;

  window.addEventListener('scroll', () => {
    if (window.scrollY > 400) {
      backToTopBtn.classList.add('visible');
    } else {
      backToTopBtn.classList.remove('visible');
    }
  });

  backToTopBtn.addEventListener('click', () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });
}

/**
 * Toast Notification Helper
 */
function showToast(message, type = 'success') {
  let toast = document.querySelector('.toast-notice');
  if (!toast) {
    toast = document.createElement('div');
    toast.className = 'toast-notice';
    document.body.appendChild(toast);
  }

  const icon = type === 'success' ? '✓' : '⚠';
  toast.style.borderLeftColor = type === 'success' ? '#22c55e' : '#ef4444';
  toast.innerHTML = `<span style="font-size: 1.25rem; font-weight: bold; color: ${type === 'success' ? '#4ade80' : '#f87171'}">${icon}</span> <span>${message}</span>`;
  toast.classList.add('show');

  setTimeout(() => {
    toast.classList.remove('show');
  }, 4500);
}
