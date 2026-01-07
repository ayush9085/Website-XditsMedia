// Initialize EmailJS with your public key
// Get your public key from EmailJS Account Settings
emailjs.init('kkJwyWKjxtkoMImLP');

// Get form elements
const contactForm = document.getElementById('contactForm');
const formMessage = document.getElementById('formMessage');

// Handle form submission
contactForm.addEventListener('submit', function(e) {
  e.preventDefault();

  // Get form values
  const name = document.getElementById('name').value;
  const email = document.getElementById('email').value;
  const message = document.getElementById('message').value;
  const subject = 'someone interested in Xdits media';

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
    
    // Clear form
    contactForm.reset();
    
    // Hide message after 5 seconds
    setTimeout(() => {
      formMessage.classList.remove('success');
    }, 5000);
  })
  .catch(function(error) {
    console.error('Email failed to send:', error);
    
    // Show error message
    formMessage.textContent = '✕ Failed to send message. Please try again.';
    formMessage.classList.remove('success');
    formMessage.classList.add('error');
    
    // Hide message after 5 seconds
    setTimeout(() => {
      formMessage.classList.remove('error');
    }, 5000);
  });
});
