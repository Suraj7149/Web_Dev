import React from 'react';
import gsap from 'gsap';
import { useState, useEffect } from 'react';
// import idea from "../src/assets/idea.png";
// import globe from "../src/assets/globe.png";
// import nodes from "../src/assets/nodes.png";
// import sSymbol from "../src/assets/s_symbol.png";
// import service from "../src/assets/service.png";
// import sharing from "../src/assets/sharing.png";
// import user from "../src/assets/user.png";

import { MotionPathPlugin } from 'gsap/MotionPathPlugin';

const Hero = () => {
  const [activeIndex, setActiveIndex] = useState(3); // default active is s_symbol

//   gsap.to(".arc-item", {
//   scale: 1,
//   opacity: 1,
//   stagger: 0.2,
//   duration: 0.8,
//   ease: "back.out(1.7)"
// });


  
  return (
    <div className="hero-container">
        <div className="heading">
            <h3><span>DIGITAL</span> SOLUTIONS THAT <br />SCALE</h3>
            <h1>
                Empowering utilities, municipalities, and enterprises to modernize,
                <br />integrate, and grow through agile, people-focused digital
                <br />transformation.
            </h1>
        </div>

        <div className='circular-menu'>
          <div className='circular-menu-line'>
            <img className='icon' onClick={() => setActiveIndex(index)}  src="../src/assets/idea.png" alt="" />
            <img className='icon' onClick={() => setActiveIndex(index)}  src="../src/assets/globe.png" alt="" />
            <img className='icon' onClick={() => setActiveIndex(index)}  src="../src/assets/nodes.png" alt="" />
            <img className='icon active' onClick={() => setActiveIndex(index)}  src="../src/assets/s_symbol.png" alt="" />
            <img className='icon' onClick={() => setActiveIndex(index)}  src="../src/assets/service.png" alt="" />
            <img className='icon' onClick={() => setActiveIndex(index)}  src="../src/assets/sharing.png" alt="" />
            <img className='icon' onClick={() => setActiveIndex(index)}  src="../src/assets/user.png" alt="" />

          </div>


          


          
        </div>
        
      
    </div>
  )
}

export default Hero
