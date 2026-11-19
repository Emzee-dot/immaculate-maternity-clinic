import React from 'react'

const CallToAction = () => {
  return (
    
    <section id="cta" className="cta">

      <h2>Ready to Begin Your Maternity Journey?</h2>

      <p>
        We're here to provide compassionate care and support
        for you and your baby.
      </p>

      <button onClick={() => {
        console.log('Booking appointment...');
        document.getElementById('contact').scrollIntoView({ 
          behavior: 'smooth' 
        });
      }}>
        Book an Appointment
      </button>

    </section>
  )
}

export default CallToAction