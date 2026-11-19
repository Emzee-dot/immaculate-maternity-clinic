import React from 'react'
import { FaPersonPregnant, FaHospital, FaBaby } from "react-icons/fa6";

const Services = () => {
  return (
        <section id="services" className="services">
        <h2 className='services-h2'>Our Services</h2>

        <div className='services-container'>
          <div className='myservices'>
            <div className='services-icon'>{<FaPersonPregnant />}</div>
            <h3 className='services-h3'>Antenatal Care</h3>
            <p className='services-p'>
              Professional care and support throughout pregnancy.
            </p>
          </div>

          <div className='myservices'>
            <div className='services-icon'>{<FaHospital />}</div>
            <h3 className='services-h3'>Maternity Care</h3>
            <p className='services-p'>
              Quality care for mothers during delivery and recovery.
            </p>
          </div>

          <div className='myservices'>
            <div className='services-icon'>{<FaBaby />}</div>
            <h3 className='services-h3'>Baby Care</h3>
            <p className='services-p'>
              Gentle and attentive care for newborn babies.
            </p>
          </div>
        </div>
      </section>
  )
}

export default Services