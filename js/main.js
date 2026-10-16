/**
 * Discovering Kids Consultation Service - Main JavaScript
 */

document.addEventListener('DOMContentLoaded', () => {
  // Mobile Nav Toggle Logic
  const mobileToggle = document.querySelector('.mobile-toggle');
  const navMenu = document.querySelector('.nav-menu');

  if (mobileToggle && navMenu) {
    mobileToggle.addEventListener('click', () => {
      const isExpanded = mobileToggle.getAttribute('aria-expanded') === 'true';
      mobileToggle.setAttribute('aria-expanded', !isExpanded);
      navMenu.classList.toggle('is-open');
    });

    // Close menu on press of Escape key
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && navMenu.classList.contains('is-open')) {
        navMenu.classList.remove('is-open');
        mobileToggle.setAttribute('aria-expanded', 'false');
        mobileToggle.focus();
      }
    });
  }

  // Active Link Highlighting
  const currentPath = window.location.pathname.split('/').pop() || 'index.html';
  const navLinks = document.querySelectorAll('.nav-link');

  navLinks.forEach(link => {
    const href = link.getAttribute('href');
    if (href === currentPath || (currentPath === '' && href === 'index.html')) {
      link.classList.add('active');
      link.setAttribute('aria-current', 'page');
    }
  });

  // Contact Form Handling (Interactive Demo feedback)
  const contactForm = document.getElementById('parent-inquiry-form');
  const formFeedback = document.getElementById('form-feedback');

  if (contactForm && formFeedback) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      
      // Get form fields
      const submitBtn = contactForm.querySelector('button[type="submit"]');
      if (submitBtn) {
        submitBtn.disabled = true;
        submitBtn.textContent = 'Sending Message...';
      }

      setTimeout(() => {
        contactForm.reset();
        if (submitBtn) {
          submitBtn.disabled = false;
          submitBtn.textContent = 'Send Message';
        }
        
        formFeedback.style.display = 'block';
        formFeedback.innerHTML = `
          <div style="background-color: #F0FDF4; border: 1px solid #BBF7D0; color: #166534; padding: 1.25rem; border-radius: 8px; font-weight: 500;">
            <p style="margin-bottom: 0.25rem; font-weight: 700; font-size: 1.05rem;">Thank You for Reaching Out!</p>
            <p style="margin: 0; font-size: 0.95rem;">Your message has been submitted to Discovering Kids. Our team will contact you shortly.</p>
          </div>
        `;
        formFeedback.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
      }, 800);
    });
  }
});
