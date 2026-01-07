// Wait for EmailJS to load, then initialize
function initializeEmailJS() {
  if (typeof emailjs !== 'undefined') {
    // Initialize EmailJS with your public key
    emailjs.init('kkJwyWKjxtkoMImLP');
    
    // Get form elements
    const contactForm = document.getElementById('contactForm');
    const formMessage = document.getElementById('formMessage');

    // Handle form submission
    contactForm.addEventListener('submit', function(e) {
      e.preventDefault();

      console.log('Form submitted'); // Debug log

      // Get form values
      const name = document.getElementById('name').value;
      const email = document.getElementById('email').value;
      const message = document.getElementById('message').value;
      const subject = 'someone interested in Xdits media';

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
        formMessage.classList.remove('error');
        formMessage.classList.add('success');
        formMessage.style.display = 'block';
        
        // Clear form
        contactForm.reset();
        
        // Hide message after 5 seconds
        setTimeout(() => {
          formMessage.classList.remove('success');
          formMessage.style.display = 'none';
        }, 5000);
      })
      .catch(function(error) {
        console.error('Email failed to send:', error);
        
        // Show error message
        formMessage.textContent = '✕ Failed to send message. Error: ' + (error.text || error.message || 'Unknown error');
        formMessage.classList.remove('success');
        formMessage.classList.add('error');
        formMessage.style.display = 'block';
        
        // Hide message after 5 seconds
        setTimeout(() => {
          formMessage.classList.remove('error');
          formMessage.style.display = 'none';
        }, 5000);
      });
    });
  } else {
    // Retry if EmailJS hasn't loaded yet
    setTimeout(initializeEmailJS, 100);
  }
}

// Start initialization when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initializeEmailJS);
} else {
  initializeEmailJS();
}
