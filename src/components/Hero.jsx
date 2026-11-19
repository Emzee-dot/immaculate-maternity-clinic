import React from 'react'
import clinicimg1 from "../assets/clinicimg1.jpg"
const Hero = () => {
  return (
    <div>
        <section id="home" className="hero">
          <div className="hero-text">
            <h1 className="hero-h1">Compassionate Care for Mothers and Babies</h1>

            <p className="hero-p">
              Welcome to Immaculate Maternity Clinic. 
              We provide compassionate maternity and maternal healthcare in a safe and welcoming environment.
            </p>

            <button className="hero-button" onClick={() => {
              console.log('Booking appointment...');
              document.getElementById('contact').scrollIntoView({ 
                behavior: 'smooth' 
              });
            }}>
              Book an Appointment
            </button>
          </div>

        <div className="hero-image">
            <img src={clinicimg1} alt="Maternity Care" />
        </div>
        </section>
    </div>
    

  )
}

export default Hero