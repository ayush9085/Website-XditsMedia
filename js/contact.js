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

    // Form field elements
    const nameField = document.getElementById('name');
    const emailField = document.getElementById('email');
    const projectTypeField = document.getElementById('projectType');
    const messageField = document.getElementById('message');

    // Validation functions
    function validateEmail(email) {
      const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return re.test(email);
    }

    function showFieldError(field, message) {
      field.classList.remove('success');
      field.classList.add('error');
      
      // Remove existing error message if any
      const existingError = field.parentElement.querySelector('.error-message');
      if (existingError) existingError.remove();
      
      // Add new error message
      const errorEl = document.createElement('span');
      errorEl.className = 'error-message visible';
      errorEl.textContent = message;
      field.parentElement.appendChild(errorEl);
    }

    function showFieldSuccess(field) {
      field.classList.remove('error');
      field.classList.add('success');
      
      const existingError = field.parentElement.querySelector('.error-message');
      if (existingError) existingError.remove();
    }

    function clearFieldState(field) {
      field.classList.remove('error', 'success');
      const existingError = field.parentElement.querySelector('.error-message');
      if (existingError) existingError.remove();
    }

    // Real-time validation on blur
    nameField.addEventListener('blur', function() {
      if (this.value.trim().length < 2) {
        showFieldError(this, 'Name must be at least 2 characters');
      } else {
        showFieldSuccess(this);
      }
    });

    emailField.addEventListener('blur', function() {
      if (!this.value.trim()) {
        showFieldError(this, 'Email is required');
      } else if (!validateEmail(this.value.trim())) {
        showFieldError(this, 'Please enter a valid email');
      } else {
        showFieldSuccess(this);
      }
    });

    projectTypeField.addEventListener('change', function() {
      if (!this.value) {
        showFieldError(this, 'Please select a project type');
      } else {
        showFieldSuccess(this);
      }
    });

    messageField.addEventListener('blur', function() {
      if (this.value.trim().length < 10) {
        showFieldError(this, 'Message must be at least 10 characters');
      } else {
        showFieldSuccess(this);
      }
    });

    // Clear validation state on focus
    [nameField, emailField, messageField].forEach(field => {
      field.addEventListener('focus', function() {
        clearFieldState(this);
      });
    });

    submitBtn.addEventListener('click', function(e) {
      e.preventDefault();

      const name = nameField.value.trim();
      const email = emailField.value.trim();
      const projectType = projectTypeField.value;
      const message = messageField.value.trim();

      let hasError = false;

      // Validate all fields
      if (name.length < 2) {
        showFieldError(nameField, 'Name must be at least 2 characters');
        hasError = true;
      } else {
        showFieldSuccess(nameField);
      }

      if (!email) {
        showFieldError(emailField, 'Email is required');
        hasError = true;
      } else if (!validateEmail(email)) {
        showFieldError(emailField, 'Please enter a valid email');
        hasError = true;
      } else {
        showFieldSuccess(emailField);
      }

      if (!projectType) {
        showFieldError(projectTypeField, 'Please select a project type');
        hasError = true;
      } else {
        showFieldSuccess(projectTypeField);
      }

      if (message.length < 10) {
        showFieldError(messageField, 'Message must be at least 10 characters');
        hasError = true;
      } else {
        showFieldSuccess(messageField);
      }

      if (hasError) {
        formMessage.innerHTML = '<span style="display: flex; align-items: center; gap: 8px;"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><line x1="15" y1="9" x2="9" y2="15"/><line x1="9" y1="9" x2="15" y2="15"/></svg> Please fix the errors above</span>';
        formMessage.className = 'form-message error';
        formMessage.style.display = 'block';
        return;
      }

      if (typeof emailjs === 'undefined') {
        formMessage.innerHTML = '<span style="display: flex; align-items: center; gap: 8px;"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><line x1="15" y1="9" x2="9" y2="15"/><line x1="9" y1="9" x2="15" y2="15"/></svg> Email service not available</span>';
        formMessage.className = 'form-message error';
        formMessage.style.display = 'block';
        return;
      }

      submitBtn.innerHTML = '<span style="display: flex; align-items: center; gap: 8px;"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="animation: spin 1s linear infinite;"><circle cx="12" cy="12" r="10" stroke-dasharray="32" stroke-dashoffset="32"/></svg> Sending...</span>';
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
        formMessage.innerHTML = '<span style="display: flex; align-items: center; gap: 8px;"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg> Message sent successfully!</span>';
        formMessage.className = 'form-message success';
        formMessage.style.display = 'block';
        
        // Clear form and validation states
        contactForm.reset();
        [nameField, emailField, projectTypeField, messageField].forEach(field => {
          field.classList.remove('success', 'error');
        });
        
        submitBtn.textContent = 'Send Message';
        submitBtn.disabled = false;
        setTimeout(function() { formMessage.style.display = 'none'; }, 5000);
      })
      .catch(function(error) {
        console.error('Email failed:', error);
        formMessage.innerHTML = '<span style="display: flex; align-items: center; gap: 8px;"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><line x1="15" y1="9" x2="9" y2="15"/><line x1="9" y1="9" x2="15" y2="15"/></svg> Failed to send. Please try again.</span>';
        formMessage.className = 'form-message error';
        formMessage.style.display = 'block';
        submitBtn.textContent = 'Send Message';
        submitBtn.disabled = false;
        setTimeout(function() { formMessage.style.display = 'none'; }, 5000);
      });
    });
  });
})();
