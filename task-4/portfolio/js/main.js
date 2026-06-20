// Hamburger menu
const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('nav-links');

if (hamburger && navLinks) {
  hamburger.addEventListener('click', () => {
    navLinks.classList.toggle('open');
  });

  // Close on link click (mobile)
  navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => navLinks.classList.remove('open'));
  });
}

// Contact form feedback
const sendBtn = document.getElementById('send-btn');
const feedback = document.getElementById('form-feedback');

if (sendBtn) {
  sendBtn.addEventListener('click', () => {
    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const message = document.getElementById('message').value.trim();

    if (!name || !email || !message) {
      feedback.textContent = 'Please fill in all fields.';
      feedback.style.color = '#e07070';
      feedback.style.display = 'block';
      return;
    }

    sendBtn.textContent = 'Sending...';
    sendBtn.disabled = true;

    setTimeout(() => {
      document.getElementById('name').value = '';
      document.getElementById('email').value = '';
      document.getElementById('message').value = '';
      sendBtn.textContent = 'Send message';
      sendBtn.disabled = false;
      feedback.textContent = "Message sent! I'll get back to you soon.";
      feedback.style.color = 'var(--green)';
      feedback.style.display = 'block';

      setTimeout(() => { feedback.style.display = 'none'; }, 4000);
    }, 1000);
  });
}

// Scroll fade-in
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = '1';
      entry.target.style.transform = 'translateY(0)';
    }
  });
}, { threshold: 0.1 });

document.querySelectorAll('.project-card, .skill-item').forEach(el => {
  el.style.opacity = '0';
  el.style.transform = 'translateY(16px)';
  el.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
  observer.observe(el);
});
