
import React, { useState, useRef, useEffect } from 'react';
import axios from 'axios';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const [error, setError] = useState({});
  const [touched, setTouched] = useState({});

  const [feedback, setFeedback] = useState({
    type: '',
    message: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const feedbackRef = useRef(null);
  const shouldFocusError = useRef(false);

  const fields = ['name', 'email', 'subject', 'message'];

  // Focus feedback after submission.
  useEffect(() => {
    if (feedback.message && feedbackRef.current) {
      feedbackRef.current.focus();
    }
  }, [feedback.message]);

  // Focus the first invalid field after submission.
  useEffect(() => {
    if (shouldFocusError.current) {
      const firstInvalid = fields.find((field) => error[field]);

      if (firstInvalid) {
        document.getElementById(firstInvalid)?.focus();
      }

      shouldFocusError.current = false;
    }
  }, [error]);

  // Validate individual fields.
  const validateField = (name, value) => {
    const trimmedValue = value.trim();

    switch (name) {
      case 'name':
        if (!trimmedValue) {
          return 'Name is required';
        }

        if (!/^[\p{L}\p{M}][\p{L}\p{M}\s'-]*$/u.test(trimmedValue)) {
          return 'Name must contain letters only';
        }

        return '';

      case 'email':
        if (!trimmedValue) {
          return 'Email is required';
        }

        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmedValue)) {
          return 'Please enter a valid email address';
        }

        return '';

      case 'subject':
        if (!trimmedValue) {
          return 'Subject is required';
        }

        return '';

      case 'message':
        if (!trimmedValue) {
          return 'Message is required';
        }

        if (trimmedValue.length < 10) {
          return 'Message must be at least 10 characters long';
        }

        if (trimmedValue.length > 500) {
          return 'Message must be no more than 500 characters long';
        }

        return '';

      default:
        return '';
    }
  };

  // Handle input changes.
  const handleInputChange = (e) => {
    const { name, value } = e.target;

    setFormData((prevData) => ({
      ...prevData,
      [name]: value
    }));

    // Only validate fields the visitor has interacted with.
    if (touched[name]) {
      setError((prevErrors) => ({
        ...prevErrors,
        [name]: validateField(name, value)
      }));
    }
  };

  // Validate a field when the visitor leaves it.
  const handleBlur = (e) => {
    const { name, value } = e.target;

    setTouched((prevTouched) => ({
      ...prevTouched,
      [name]: true
    }));

    setError((prevErrors) => ({
      ...prevErrors,
      [name]: validateField(name, value)
    }));
  };

  // Restore Enter-key navigation.
  const handleKeyDown = (e) => {
    if (e.key !== 'Enter' || e.target.tagName !== 'INPUT') {
      return;
    }

    e.preventDefault();

    const { name, value } = e.target;

    const fieldError = validateField(name, value);

    setTouched((prevTouched) => ({
      ...prevTouched,
      [name]: true
    }));

    setError((prevErrors) => ({
      ...prevErrors,
      [name]: fieldError
    }));

    // Don't move forward if the current field is invalid.
    if (fieldError) {
      return;
    }

    const currentIndex = fields.indexOf(name);
    const nextField = fields[currentIndex + 1];

    if (nextField) {
      document.getElementById(nextField)?.focus();
    }
  };

  // Submit the form.
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (isSubmitting) return;

    // Validate every field when the visitor submits.
    const newErrors = {};

    fields.forEach((field) => {
      const fieldError = validateField(field, formData[field]);

      if (fieldError) {
        newErrors[field] = fieldError;
      }
    });

    setTouched({
      name: true,
      email: true,
      subject: true,
      message: true
    });

    setError(newErrors);

    // Focus the first invalid field.
    if (Object.keys(newErrors).length > 0) {
      shouldFocusError.current = true;
      return;
    }

    setIsSubmitting(true);

    setFeedback({
      type: '',
      message: ''
    });

    try {
      const response = await axios.post(
        'http://localhost:5000/contact',
        {
          name: formData.name.trim(),
          email: formData.email.trim(),
          subject: formData.subject.trim(),
          message: formData.message.trim()
        }
      );

      if (response.data.emailSent === false) {
        setFeedback({
          type: 'warning',
          message:
            'Your message was saved successfully, but the clinic could not be notified by email. Please contact the clinic directly if your matter is urgent.'
        });
      } else {
        setFeedback({
          type: 'success',
          message:
            'Thank you for contacting Immaculate Maternity Clinic! Your message has been received.'
        });
      }

      setFormData({
        name: '',
        email: '',
        subject: '',
        message: ''
      });

      setError({});
      setTouched({});

    } catch (error) {
      console.error('Error submitting contact form:', error);

      setFeedback({
        type: 'error',
        message:
          error.response?.data?.message ||
          'Sorry, we could not send your message. Please check your connection and try again.'
      });

    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="contact" id="contact">
      <div className="contact-container">

        <div className="contact-info">

          <span className="contact-subtitle">
            GET IN TOUCH
          </span>

          <h2>Contact Us</h2>

          <p>
            We are here to provide compassionate and professional
            maternity care. Get in touch with us today.
          </p>

          <div className="contact-details">

            <p>
              <strong>📍 Address:</strong>
              Immaculate Maternity Clinic
            </p>

            <p>
              <strong>📞 Phone:</strong>
              <a href="tel:+2347015121604">
                +234 7015121604
              </a>
            </p>

            <p>
              <strong>✉️ Email:</strong>
              <a href="mailto:myownemzee@gmail.com">
                myownemzee@gmail.com
              </a>
            </p>

          </div>
        </div>

        <form
          className="contact-form"
          onSubmit={handleSubmit}
          noValidate
          aria-labelledby="contact-form-title"
        >

          {feedback.message && (
            <p
              ref={feedbackRef}
              className={`form-feedback ${feedback.type}`}
              role="status"
              aria-live="polite"
              tabIndex={-1}
            >
              {feedback.message}
            </p>
          )}

          <h3 id="contact-form-title">
            Send Us a Message
          </h3>

          <div className="form-group">
            <label htmlFor="name">Your Name</label>

            <input
              id="name"
              type="text"
              name="name"
              placeholder="Enter Your Name"
              value={formData.name}
              autoComplete="name"
              onChange={handleInputChange}
              onBlur={handleBlur}
              onKeyDown={handleKeyDown}
              aria-invalid={Boolean(error.name)}
              aria-describedby={error.name ? 'name-error' : undefined}
            />

            {error.name && (
              <span className="error" id="name-error">
                {error.name}
              </span>
            )}
          </div>

          <div className="form-group">
            <label htmlFor="email">Email Address</label>

            <input
              id="email"
              type="email"
              name="email"
              placeholder="Enter Your Email"
              value={formData.email}
              autoComplete="email"
              onChange={handleInputChange}
              onBlur={handleBlur}
              onKeyDown={handleKeyDown}
              aria-invalid={Boolean(error.email)}
              aria-describedby={error.email ? 'email-error' : undefined}
            />

            {error.email && (
              <span className="error" id="email-error">
                {error.email}
              </span>
            )}
          </div>

          <div className="form-group">
            <label htmlFor="subject">Subject</label>

            <input
              id="subject"
              type="text"
              name="subject"
              placeholder="Enter Message Subject"
              value={formData.subject}
              autoComplete="off"
              onChange={handleInputChange}
              onBlur={handleBlur}
              onKeyDown={handleKeyDown}
              aria-invalid={Boolean(error.subject)}
              aria-describedby={error.subject ? 'subject-error' : undefined}
            />

            {error.subject && (
              <span className="error" id="subject-error">
                {error.subject}
              </span>
            )}
          </div>

          <div className="form-group">
            <label htmlFor="message">Your Message</label>

            <textarea
              id="message"
              name="message"
              placeholder="How can we help you?"
              rows={5}
              minLength={10}
              maxLength={500}
              value={formData.message}
              autoComplete="off"
              onChange={handleInputChange}
              onBlur={handleBlur}
              aria-invalid={Boolean(error.message)}
              aria-describedby={
                error.message
                  ? 'message-error'
                  : 'message-count'
              }
            />

            {error.message && (
              <span className="error" id="message-error">
                {error.message}
              </span>
            )}

            <small className="message-count" id="message-count">
              {formData.message.length}/500 characters
            </small>
          </div>

          <button type="submit" disabled={isSubmitting}>
            {isSubmitting ? 'Sending...' : 'Send Message'}
          </button>

        </form>
      </div>
    </section>
  );
};

export default Contact;
