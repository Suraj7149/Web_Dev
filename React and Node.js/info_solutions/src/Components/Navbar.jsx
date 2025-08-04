import React, { useRef, useState, useEffect } from 'react'
import "../index.css" // Assuming you have a global CSS file for styles
import { useGSAP } from '@gsap/react'
import gsap from 'gsap';

const Navbar = () => {
  // useGSAP(() => {
  //   gsap.to(
  //     'nav', {
  //     height: "200px",
  //     duration: 2,
  //     ease: "power2.out"})
  //   });
    
  return (
    <nav className='Navbar'>
      <a href="#home" className='Navbar-logo'>
        <img src="../src/assets/sample_logo.png"  alt="" />
        <h1>Info Solutions</h1>
      </a>

      <ul className='Navbar-links'>
        <li><a href="#">About</a></li>
        <li><a href="#" className="active">Services</a></li>
        <li><a href="#">Case studies</a></li>
        <li><a href="#">Testimonials</a></li>
        <li><a href="#">Blog</a></li>
        <li><a href="#">Careers</a></li>
    </ul>

    <a href="" className='Navbar-contact-us'>Contact Us</a>
    </nav>
    
    
  )
}

export default Navbar
