import React from 'react';
import gsap from 'gsap';
import { useState, useEffect } from 'react';

import { MotionPathPlugin } from 'gsap/MotionPathPlugin';

const Hero = () => {
  const [activeIndex, setActiveIndex] = useState(3);

  // const positions = [
  //   { top: 1020, left: 490 },
  //   { top: 890, left: 555 },
  //   { top: 790, left: 680 },
  //   { top: 743, left: 860 },
  //   { top: 790, right: 680 },
  //   { top: 890, right: 555 },
  //   { top: 1020, right: 490 }
  // ];

  function givepos(clickIndex) {
    console.log("Clicked index:", clickIndex);
    if (activeIndex === clickIndex) {
    console.log('This element is active!');
    } else {
    console.log('This element is not active.');
    }
  }

  
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
            <div className='icon'>
            <img 
              className={` ${activeIndex === 1 ? "active" : ""}`} 
              onClick={() => {setActiveIndex(1); givepos(1);}}  
              src="../src/assets/idea.png" 
              alt="" />
            </div>

            <div>
              <img 
              className={`icon ${activeIndex === 2 ? "active" : ""}`} 
              onClick={() => {setActiveIndex(2); givepos(2);}}  
              src="../src/assets/globe.png" 
              alt="" />
            </div>
            
            <div>
            <img 
              className={`icon ${activeIndex === 3 ? "active" : ""}`} 
              onClick={() => {setActiveIndex(3); givepos(3);}}  
              src="../src/assets/nodes.png" 
              alt="" />
            </div>

            <div>
            <img 
              className={`icon ${activeIndex === 4 ? "active" : ""}`} 
              onClick={() => {setActiveIndex(4); givepos(4);}}  
              src="../src/assets/s_symbol.png" 
              alt="" />
            </div>

            <div>
            <img 
              className={`icon ${activeIndex === 5 ? "active" : ""}`} 
              onClick={() => {setActiveIndex(5); givepos(5);}}  
              src="../src/assets/service.png" 
              alt="" />
            </div>

            <div>
            <img 
              className={`icon ${activeIndex === 6 ? "active" : ""}`} 
              onClick={() => {setActiveIndex(6); givepos(6);}} 
              src="../src/assets/sharing.png" 
              alt="" />
            </div>

            <div>
            <img 
              className={`icon ${activeIndex === 7 ? "active" : ""}`} 
              onClick={() => {setActiveIndex(7); givepos(7);}}  
              src="../src/assets/user.png" 
              alt="" />
            </div>

          </div>


          


          
        </div>
        
      
    </div>
  )
}

export default Hero
