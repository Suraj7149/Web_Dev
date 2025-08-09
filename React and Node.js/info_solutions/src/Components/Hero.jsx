import React from 'react';
import gsap from 'gsap';
import { useState, useEffect } from 'react';

import { MotionPathPlugin } from 'gsap/MotionPathPlugin';

const Hero = () => {
  gsap.registerPlugin(MotionPathPlugin);

  const [icons, setIcons] = useState([
    { id: 1, src: "../src/assets/idea.png", alt: "Idea", pos: "0.14" },
    { id: 2, src: "../src/assets/globe.png", alt: "Globe", pos: "0.27" },
    { id: 3, src: "../src/assets/nodes.png", alt: "Nodes", pos: "0.40" },
    { id: 4, src: "../src/assets/s_symbol.png", alt: "S Symbol", pos: "0.53" }, // active one
    { id: 5, src: "../src/assets/service.png", alt: "Service", pos: "0.66" },
    { id: 6, src: "../src/assets/sharing.png", alt: "Sharing", pos: "0.79" },
    { id: 7, src: "../src/assets/user.png", alt: "User", pos: "0.92" }
  ]);

  const [activeId, setActiveId] = useState(4);

  
  const icon_sizes = [
    { height: 50,  width: 50, },
    { height: 50,  width: 50, },
    { height: 55,  width: 55, },
    { height: 70,  width: 70, },
    { height: 55,  width: 55, },
    { height: 50,  width: 50, },
    { height: 50,  width: 50, }
  ];

  // const handleClick = (clickedId) => {
  // if (clickedId === 4) {
      
  //   } else {
  //     let diff = 0;

  //     if (clickedId > 4) {
  //       diff = clickedId - 4;
  //     } else if (clickedId < 4) {
  //       diff = 4 - clickedId;
  //     }

  //     console.log("Diff from 4:", diff); 
  //   }
  // };

  
 
//   useEffect(() => {
//   const step = 0.14;     // gap between positions
//   const offsetBase = 0.05;
//   const centerPos = 0.47;

//   const icons = document.querySelectorAll(".icon-holder");

//   icons.forEach((icon, clickedIndex) => {
//     icon.addEventListener("click", () => {
//       // Find icon currently at the center
//       const topIcon = Array.from(icons).find(el => el.dataset.pos == centerPos);
//       const clickedIcon = icon;

//       if (clickedIcon === topIcon) return; // no swap if clicking the top

//       // Calculate clicked icon's current offset
//       const clickedOffset = (clickedIndex * step) + offsetBase;

//       // Animate top icon from center to clicked offset
//       gsap.to(topIcon, {
//         duration: 1.2,
//         motionPath: {
//           path: "#motionPath",
//           align: "#motionPath",
//           alignOrigin: [0.28, 0.52],
//           autoRotate: false,
//           start: centerPos,
//           end: clickedOffset
//         },
//         ease: "power1.inOut",
//         onComplete: () => {
//           topIcon.dataset.pos = clickedOffset; // update position
//         }
//       });

//       // Animate clicked icon from its current offset to center
//       gsap.to(clickedIcon, {
//         duration: 1.2,
//         motionPath: {
//           path: "#motionPath",
//           align: "#motionPath",
//           alignOrigin: [0.28, 0.52],
//           autoRotate: false,
//           start: clickedOffset,
//           end: centerPos
//         },
//         ease: "power1.inOut",
//         onComplete: () => {
//           clickedIcon.dataset.pos = centerPos; // update position
//         }
//       });
//     });
//   });

// }, []);
     
const step = 0.13; // Each icon's step distance
const startOffset = 0.12;
const midOffset = 0.50;
const endOffset = 0.92;

const handleIconClick = (clickedIndex) => {
  const clickedId = icons[clickedIndex].id;
  const activeIndex = icons.findIndex(icon => icon.id === activeId);

  if (clickedId === activeId) return; // already active

  const activeIcon = document.querySelector(".icon-holder.active");
  const clickedIcon = document.querySelectorAll(".icon-holder")[clickedIndex];

  const clickedOffset = startOffset + clickedIndex * step;
  const activeOffset = startOffset + activeIndex * step;

  const tl = gsap.timeline({
    onComplete: () => {
      setIcons((prev) => {
        const updated = [...prev];
        [updated[clickedIndex], updated[activeIndex]] = [updated[activeIndex], updated[clickedIndex]];
        return updated;
      });
      setActiveId(clickedId); // update active tracking
    }
  });

  tl.to(clickedIcon, {
    duration: 1.4,
    motionPath: {
      path: "#motionPath",
      align: "#motionPath",
      alignOrigin: [0.28, 0.52],
      start: clickedOffset,
      end: startOffset + 3 * step // always the middle pos
    },
    ease: "power1.inOut"
  }, 0);

  tl.to(activeIcon, {
    duration: 1.4,
    motionPath: {
      path: "#motionPath",
      align: "#motionPath",
      alignOrigin: [0.28, 0.52],
      start: activeOffset,
      end: clickedOffset
    },
    ease: "power1.inOut"
  }, 0);
};


//   useEffect(() => {
//   gsap.to(".icon-holder.active", {  
//     duration: 1.4,
//     motionPath: {
//       path: "#motionPath",
//       align: "#motionPath",
//       alignOrigin: [0.28, 0.52],
//       autoRotate: false,
//       start: 0.05,
//       end: 0.47,
//     },
//     ease: "power1.inOut",
//   });
// }, []);


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
          <div  className='circular-menu-line'>

            {
            /* <div className='icon-holder'>

            <img 
              id='1'
              className={`icon `} 
                
              src="../src/assets/idea.png" 
              alt="" />
            </div>

            <div className='icon-holder'>
              <img 
              id='2'
              className={`icon `} 
                
              src="../src/assets/globe.png" 
              alt="" />
            </div>
            
            <div className='icon-holder '>
            <img 
              id='3'
              className={`icon`} 
                
              src="../src/assets/nodes.png" 
              alt="" />
            </div>

            <div className='icon-holder active'>
            <img 
              id='4'
              data-pos="0.47"
              className={`icon `} 
              src="../src/assets/s_symbol.png" 
              alt="" />
            </div>

            <div className='icon-holder'>
            <img 
              id='5'
              className={`icon`} 
                
              src="../src/assets/service.png" 
              alt="" />
            </div>

            <div className='icon-holder'>
            <img 
              id='6'
              className={`icon`} 
               
              src="../src/assets/sharing.png" 
              alt="" />
            </div>

            <div className='icon-holder'>
            <img 
              id='7'
              className={`icon `} 
                
              src="../src/assets/user.png" 
              alt="" />
            </div> */}

            <div className="icon-wrapper">
  {icons.map((icon) => (
    <div
      key={icon.id}
      className={`icon-holder ${icon.id === activeId ? "active" : ""}`}
      onClick={() => handleIconClick(icons.findIndex(i => i.id === icon.id))}
    >
      <img
        id={icon.id}
        className="icon"
        src={icon.src}
        alt={icon.alt}
      />
    </div>
  ))}
</div>


          <svg width="590" height="225" viewBox="0 0 590 225" > 
          <path id="motionPath"
          d="M0,280 A299,307 0 0,1 590,250"
          fill="none"
          stroke="red"
          strokeWidth="2"
          strokeDasharray="5,5"
          style={{ transform: 'translateY(-5px)' }}
          
           />
          </svg>

          </div>


          


          
        </div>
        
      
    </div>
  )
}

export default Hero
