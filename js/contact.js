// Initialize EmailJS when script loads
(function() {
  document.addEventListener('DOMContentLoaded', function() {
    // Initialize EmailJS with public key (v4 syntax)
    if (typeof emailjs !== 'undefined') {
      emailjs.init({
        publicKey: 'kkJwyWKjxtkoMImLP'
      });
      console.log('EmailJS v4 initialized');
    } else {
      console.error('EmailJS failed to load');
    }
    
    const contactForm = document.getElementById('contactForm');
    const submitBtn = document.getElementById('submitBtn');
    const formMessage = document.getElementById('formMessage');

    if (!submitBtn || !contactForm || !formMessage) {
      console.error('Form elements not found');
      return;
    }

    submitBtn.addEventListener('click', function(e) {
      e.preventDefault();

      const name = document.getElementById('name').value.trim();
      const email = document.getElementById('email').value.trim();
      const projectType = document.getElementById('projectType').value;
      const message = document.getElementById('message').value.trim();

      if (!name || !email || !projectType || !message) {
        formMessage.textContent = '✕ Please fill in all fields';
        formMessage.className = 'form-message error';
        formMessage.style.display = 'block';
        return;
      }

      if (typeof emailjs === 'undefined') {
        formMessage.textContent = '✕ Email service not available.';
        formMessage.className = 'form-message error';
        formMessage.style.display = 'block';
        return;
      }

      submitBtn.textContent = 'Sending...';
      submitBtn.disabled = true;

      emailjs.send('xdit_media', 'template_bdhw6ka', {
        from_name: name,
        from_email: email,
        subject: 'New Inquiry - ' + projectType,
        message: 'Project Type: ' + projectType + '\\n\\nMessage:\\n' + message,
        reply_to: email
      })
      .then(function(response) {
        console.log('Email sent!', response.status);
        formMessage.textContent = '✓ Message sent successfully!';
        formMessage.className = 'form-message success';
        formMessage.style.display = 'block';
        contactForm.reset();
        submitBtn.textContent = 'Send Message';
        submitBtn.disabled = false;
        setTimeout(function() { formMessage.style.display = 'none'; }, 5000);
      })
      .catch(function(error) {
        console.error('Email failed:', error);
        formMessage.textContent = '✕ Failed to send. Please try again.';
        formMessage.className = 'form-message error';
        formMessage.style.display = 'block';
        submitBtn.textContent = 'Send Message';
        submitBtn.disabled = false;
        setTimeout(function() { formMessage.style.display = 'none'; }, 5000);
      });
    });
  });
})();
