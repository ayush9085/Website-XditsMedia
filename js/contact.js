// Initialize EmailJS when script loads
(function() {
  // Wait for DOM to be ready
  document.addEventListener('DOMContentLoaded', function() {
    // Initialize EmailJS
    if (typeof emailjs !== 'undefined') {
      emailjs.init('kkJwyWKjxtkoMImLP');
      console.log('EmailJS initialized successfully');
    } else {
      console.error('EmailJS failed to load');
    }
    
    // Get form elements
    const contactForm = document.getElementById('contactForm');
    const submitBtn = document.getElementById('submitBtn');
    const formMessage = document.getElementById('formMessage');

    if (!submitBtn || !contactForm || !formMessage) {
      console.error('Form elements not found');
      return;
    }

    // Handle form submission
    submitBtn.addEventListener('click', function(e) {
      e.preventDefault();

      console.log('Button clicked');

      // Get form values
      const name = document.getElementById('name').value.trim();
      const email = document.getElementById('email').value.trim();
      const message = document.getElementById('message').value.trim();

      // Validate form
      if (!name || !email || !message) {
        formMessage.textContent = '✕ Please fill in all fields';
        formMessage.className = 'form-message error';
        formMessage.style.display = 'block';
        return;
      }

      // Check if EmailJS is available
      if (typeof emailjs === 'undefined') {
        formMessage.textContent = '✕ Email service not available. Please try again later.';
        formMessage.className = 'form-message error';
        formMessage.style.display = 'block';
        return;
      }

      // Show loading state
      submitBtn.textContent = 'Sending...';
      submitBtn.disabled = true;

      console.log('Sending email...');

      // Send email using EmailJS
      emailjs.send('xdit_media', 'template_bdhw6ka', {
        from_name: name,
        from_email: email,
        subject: 'Someone interested in Xdits Media',
        message: message,
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
        
        setTimeout(function() {
          formMessage.style.display = 'none';
        }, 5000);
      })
      .catch(function(error) {
        console.error('Email failed:', error);
        
        formMessage.textContent = '✕ Failed to send. Please try again.';
        formMessage.className = 'form-message error';
        formMessage.style.display = 'block';
        
        submitBtn.textContent = 'Send Message';
        submitBtn.disabled = false;
        
        setTimeout(function() {
          formMessage.style.display = 'none';
        }, 5000);
      });
    });
  });
})();
