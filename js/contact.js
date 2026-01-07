// Wait for EmailJS to load, then initialize
function initializeEmailJS() {
  if (typeof emailjs !== 'undefined') {
    // Initialize EmailJS with your public key
    emailjs.init('kkJwyWKjxtkoMImLP');
    
    // Get form elements
    const contactForm = document.getElementById('contactForm');
    const submitBtn = document.getElementById('submitBtn');
    const formMessage = document.getElementById('formMessage');

    if (!submitBtn || !contactForm || !formMessage) {
      console.error('Form elements not found');
      return;
    }

    // Handle form submission
    function handleSubmit(e) {
      e.preventDefault();
      e.stopPropagation();

      console.log('Form submitted'); // Debug log

      // Get form values
      const name = document.getElementById('name').value.trim();
      const email = document.getElementById('email').value.trim();
      const message = document.getElementById('message').value.trim();
      const subject = 'Someone interested in Xdits Media';

      // Validate form
      if (!name || !email || !message) {
        formMessage.textContent = '✕ Please fill in all fields';
        formMessage.className = 'form-message error';
        formMessage.style.display = 'block';
        return;
      }

      // Show loading state
      submitBtn.textContent = 'Sending...';
      submitBtn.disabled = true;

      console.log('Sending email with:', { name, email, subject, message }); // Debug log

      // Send email using EmailJS
      emailjs.send('xdit_media', 'template_bdhw6ka', {
        from_name: name,
        from_email: email,
        subject: subject,
        message: message,
        reply_to: email
      })
      .then(function(response) {
        console.log('Email sent successfully!', response.status);
        
        // Show success message
        formMessage.textContent = '✓ Message sent successfully! We\'ll get back to you soon.';
        formMessage.className = 'form-message success';
        formMessage.style.display = 'block';
        
        // Clear form and reset button
        contactForm.reset();
        submitBtn.textContent = 'Send Message';
        submitBtn.disabled = false;
        
        // Hide message after 5 seconds
        setTimeout(() => {
          formMessage.style.display = 'none';
        }, 5000);
      })
      .catch(function(error) {
        console.error('Email failed to send:', error);
        
        // Show error message
        formMessage.textContent = '✕ Failed to send message. Please try again.';
        formMessage.className = 'form-message error';
        formMessage.style.display = 'block';
        
        // Reset button
        submitBtn.textContent = 'Send Message';
        submitBtn.disabled = false;
        
        // Hide message after 5 seconds
        setTimeout(() => {
          formMessage.style.display = 'none';
        }, 5000);
      });
    }

    // Attach event listeners
    submitBtn.addEventListener('click', handleSubmit);
    contactForm.addEventListener('submit', handleSubmit);
    
    console.log('EmailJS initialized successfully');
  } else {
    // Retry if EmailJS hasn't loaded yet
    console.log('Waiting for EmailJS to load...');
    setTimeout(initializeEmailJS, 100);
  }
}

// Start initialization when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initializeEmailJS);
} else {
  initializeEmailJS();
}
