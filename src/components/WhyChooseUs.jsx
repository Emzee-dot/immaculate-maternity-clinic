
import React from 'react'
import { FaHeart, FaUserDoctor, FaBaby } from 'react-icons/fa6'

const WhyChooseUs = () => {
  return (
    <section id="why-us" className="why-us">

      <h2>Why Choose Immaculate?</h2>

      <p className="why-us-intro">
        We are committed to creating a caring and supportive
        environment for mothers and babies at every stage of
        the maternity journey.
      </p>

      <div className="why-us-content">

        <div className="why-card">
          <FaHeart className="why-icon" />
          
          <h3>Compassionate Care</h3>

          <p>
            Every mother deserves to feel heard, respected and
            supported throughout her pregnancy and maternity journey.
          </p>
        </div>

        <div className="why-card">
          <FaUserDoctor className="why-icon" />

          <h3>Professional Approach</h3>

          <p>
            We focus on providing thoughtful and professional
            maternal and newborn care.
          </p>
        </div>

        <div className="why-card">
          <FaBaby className="why-icon" />

          <h3>Mother & Baby Focused</h3>

          <p>
            Our approach places the wellbeing and comfort of both
            mother and baby at the heart of care.
          </p>
        </div>

      </div>

    </section>
  )
}

export default WhyChooseUs
