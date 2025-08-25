import React from 'react';
import gsap from 'gsap';
import { useState, useEffect } from 'react';

import { MotionPathPlugin } from 'gsap/MotionPathPlugin';

const Hero = () => {
  gsap.registerPlugin(MotionPathPlugin);

  const [icons, setIcons] = useState([
    { id: 1, src: "../src/assets/idea.png", alt: "Idea", pos: "0.11" },
    { id: 2, src: "../src/assets/globe.png", alt: "Globe", pos: "0.255" },
    { id: 3, src: "../src/assets/nodes.png", alt: "Nodes", pos: "0.39" },
    { id: 4, src: "../src/assets/s_symbol.png", alt: "S Symbol", pos: "0.52" }, // active one
    { id: 5, src: "../src/assets/service.png", alt: "Service", pos: "0.66" },
    { id: 6, src: "../src/assets/sharing.png", alt: "Sharing", pos: "0.795" },
    { id: 7, src: "../src/assets/user.png", alt: "User", pos: '0.93' }

  ]);

  const [activeId, setActiveId] = useState(4);


  const step = 0.13; // Each icon's step distance
  const startOffset = 0.05;
  const midOffset = 0.52;
  const endOffset = 0.93;

  const finalPositions = [
    { top: "150px", left: "-15px" },
    { top: "58px", left: "45px" },
    { top: "-13px", left: "135px" },
    { top: "-40px", left: "250px" },
    { top: "-13px", right: "135px" },
    { top: "58px", right: "45px" },
    { top: "150px", right: "-15px" }
  ];

  const snapToFinalPositions = () => {
    document.querySelectorAll(".icon-holder").forEach((icon, i) => {
      gsap.set(icon, {
        clearProps: "transform", // remove translate/scale
        ...finalPositions[i]
      });
    });
  };

  const handleIconClick = (clickedIndex) => {
  const clickedId = icons[clickedIndex].id;
  const activeIndex = icons.findIndex(icon => icon.id === activeId);

  if (clickedId === activeId) return; // already active

  const activeIcon = document.querySelector(".icon-holder.active");
  const clickedIcon = document.querySelectorAll(".icon-holder")[clickedIndex];

  const clickedOffset = icons[clickedIndex].pos;
  const activeOffset = icons[activeIndex].pos;

  const tl = gsap.timeline({
    onComplete: () => {
      // This is where you replace the state update
      setIcons(prev =>
        prev.map((icon, i) =>
          i === clickedIndex
            ? { ...icon, pos: prev[activeIndex].pos }
            : i === activeIndex
            ? { ...icon, pos: prev[clickedIndex].pos }
            : icon,

            console.log(
              "Active Index Pos:", prev[activeIndex].pos,
              "Clicked Index Pos:", prev[clickedIndex].pos
            )
        )
      );
      setActiveId(prev => icons[clickedIndex].id);
     
    }
    });


  tl.to(clickedIcon, {
    duration: 1.2,
    motionPath: {
      path: "#motionPath",
      align: "#motionPath",
      alignOrigin: [clickedIndex < 4 ? 0.65 : 0.5,0.7],
      start: clickedOffset,
      end: midOffset // always the middle pos
    },
    ease: "power1.inOut"
  }, 0);

  tl.to(activeIcon, {
    duration: 1.2,
    motionPath: {
      path: "#motionPath",
      align: "#motionPath",
      alignOrigin: [0.58, 0.48],
      start: midOffset,
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
      <div className="heroheading">
            <h1><span>DIGITAL</span> SOLUTIONS THAT <br />SCALE</h1>
            <h3>
                Empowering utilities, municipalities, and enterprises to modernize,
                <br />integrate, and grow through agile, people-focused digital
                <br />transformation.
            </h3>
      </div>
        
      <div className='circular-menu'>
          <div  className='circular-menu-line'>

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
          style={{ transform: 'translateY(-5px)' }}
          
           />
          </svg>

          
        </div>                  
      </div>

      <div  id="idea_desc" className='description active'>
            <div className='description_heading'>
              <h1><span className='description_headingspan'>SOLUTIONS</span><br />ARCHITECTURE</h1>
              <h3>Design and deliver technological solutions to address specific business  
                <br />challenges, ensuring they align with the organizations overall IT strategy.</h3>
            </div>
            <div className='cards'>
                <div className='card'>
                  <img src="../src/assets/s_symbol.png" alt="" />
                  <label htmlFor="">What we offer</label>
                  <ul>
                    <li><span className='card_span'>Strategic Alignment: </span>Solutions tailored to your business goals and long-term vision</li>
                    <li><span className='card_span'>Integrated Approach: </span>Seamlessly connect systems, people, and workflows.</li>
                    <li><span className='card_span'>Scalability at Core: </span>Built to support evolving demands and future growth.</li>
                  </ul>
                </div>
                <div className='card'>
                  <img src="../src/assets/s_symbol.png" alt="" />
                  <label htmlFor="">Ideal clients</label>
                  <ul>
                    <li>Forward-thinking organizations looking to modernize their IT landscape, unify systems, and align technology with long-term strategic goals.</li>
                    </ul>
                </div>
                <div className='card'>
                  <img src="../src/assets/s_symbol.png" alt="" />
                  <label htmlFor="">Benefits</label>
                  <ul>
                    <li>Clear, scalable frameworks that grow with your business.</li>
                    <li>Stronger collaboration between IT and business teams. </li>
                    <li>Reduced complexity, faster delivery, and future-ready systems.</li>
                  </ul>
                </div>
              </div>
      </div> 

      <div  id="idea_desc" className='description'>
            <div className='description_heading'>
              <h1><span className='description_headingspan'>SOLUTIONS</span><br />ARCHITECTURE</h1>
              <h3>Design and deliver technological solutions to address specific business  
                <br />challenges, ensuring they align with the organizations overall IT strategy.</h3>
            </div>
            <div className='cards'>
                <div className='card'>
                  <img src="../src/assets/s_symbol.png" alt="" />
                  <label htmlFor="">What we offer</label>
                  <ul>
                    <li><span className='card_span'>Strategic Alignment: </span>Solutions tailored to your business goals and long-term vision</li>
                    <li><span className='card_span'>Integrated Approach: </span>Seamlessly connect systems, people, and workflows.</li>
                    <li><span className='card_span'>Scalability at Core: </span>Built to support evolving demands and future growth.</li>
                  </ul>
                </div>
                <div className='card'>
                  <img src="../src/assets/s_symbol.png" alt="" />
                  <label htmlFor="">Ideal clients</label>
                  <ul>
                    <li>Forward-thinking organizations looking to modernize their IT landscape, unify systems, and align technology with long-term strategic goals.</li>
                    </ul>
                </div>
                <div className='card'>
                  <img src="../src/assets/s_symbol.png" alt="" />
                  <label htmlFor="">Benefits</label>
                  <ul>
                    <li>Clear, scalable frameworks that grow with your business.</li>
                    <li>Stronger collaboration between IT and business teams. </li>
                    <li>Reduced complexity, faster delivery, and future-ready systems.</li>
                  </ul>
                </div>
              </div>
      </div>

      <div  id="idea_desc" className='description'>
            <div className='description_heading'>
              <h1><span className='description_headingspan'>SOLUTIONS</span><br />ARCHITECTURE</h1>
              <h3>Design and deliver technological solutions to address specific business  
                <br />challenges, ensuring they align with the organizations overall IT strategy.</h3>
            </div>
            <div className='cards'>
                <div className='card'>
                  <img src="../src/assets/s_symbol.png" alt="" />
                  <label htmlFor="">What we offer</label>
                  <ul>
                    <li><span className='card_span'>Strategic Alignment: </span>Solutions tailored to your business goals and long-term vision</li>
                    <li><span className='card_span'>Integrated Approach: </span>Seamlessly connect systems, people, and workflows.</li>
                    <li><span className='card_span'>Scalability at Core: </span>Built to support evolving demands and future growth.</li>
                  </ul>
                </div>
                <div className='card'>
                  <img src="../src/assets/s_symbol.png" alt="" />
                  <label htmlFor="">Ideal clients</label>
                  <ul>
                    <li>Forward-thinking organizations looking to modernize their IT landscape, unify systems, and align technology with long-term strategic goals.</li>
                    </ul>
                </div>
                <div className='card'>
                  <img src="../src/assets/s_symbol.png" alt="" />
                  <label htmlFor="">Benefits</label>
                  <ul>
                    <li>Clear, scalable frameworks that grow with your business.</li>
                    <li>Stronger collaboration between IT and business teams. </li>
                    <li>Reduced complexity, faster delivery, and future-ready systems.</li>
                  </ul>
                </div>
              </div>
      </div>

      <div  id="idea_desc" className='description'>
            <div className='description_heading'>
              <h1><span className='description_headingspan'>SOLUTIONS</span><br />ARCHITECTURE</h1>
              <h3>Design and deliver technological solutions to address specific business  
                <br />challenges, ensuring they align with the organizations overall IT strategy.</h3>
            </div>
            <div className='cards'>
                <div className='card'>
                  <img src="../src/assets/s_symbol.png" alt="" />
                  <label htmlFor="">What we offer</label>
                  <ul>
                    <li><span className='card_span'>Strategic Alignment: </span>Solutions tailored to your business goals and long-term vision</li>
                    <li><span className='card_span'>Integrated Approach: </span>Seamlessly connect systems, people, and workflows.</li>
                    <li><span className='card_span'>Scalability at Core: </span>Built to support evolving demands and future growth.</li>
                  </ul>
                </div>
                <div className='card'>
                  <img src="../src/assets/s_symbol.png" alt="" />
                  <label htmlFor="">Ideal clients</label>
                  <ul>
                    <li>Forward-thinking organizations looking to modernize their IT landscape, unify systems, and align technology with long-term strategic goals.</li>
                    </ul>
                </div>
                <div className='card'>
                  <img src="../src/assets/s_symbol.png" alt="" />
                  <label htmlFor="">Benefits</label>
                  <ul>
                    <li>Clear, scalable frameworks that grow with your business.</li>
                    <li>Stronger collaboration between IT and business teams. </li>
                    <li>Reduced complexity, faster delivery, and future-ready systems.</li>
                  </ul>
                </div>
              </div>
      </div>

      <div  id="idea_desc" className='description'>
            <div className='description_heading'>
              <h1><span className='description_headingspan'>SOLUTIONS</span><br />ARCHITECTURE</h1>
              <h3>Design and deliver technological solutions to address specific business  
                <br />challenges, ensuring they align with the organizations overall IT strategy.</h3>
            </div>
            <div className='cards'>
                <div className='card'>
                  <img src="../src/assets/s_symbol.png" alt="" />
                  <label htmlFor="">What we offer</label>
                  <ul>
                    <li><span className='card_span'>Strategic Alignment: </span>Solutions tailored to your business goals and long-term vision</li>
                    <li><span className='card_span'>Integrated Approach: </span>Seamlessly connect systems, people, and workflows.</li>
                    <li><span className='card_span'>Scalability at Core: </span>Built to support evolving demands and future growth.</li>
                  </ul>
                </div>
                <div className='card'>
                  <img src="../src/assets/s_symbol.png" alt="" />
                  <label htmlFor="">Ideal clients</label>
                  <ul>
                    <li>Forward-thinking organizations looking to modernize their IT landscape, unify systems, and align technology with long-term strategic goals.</li>
                    </ul>
                </div>
                <div className='card'>
                  <img src="../src/assets/s_symbol.png" alt="" />
                  <label htmlFor="">Benefits</label>
                  <ul>
                    <li>Clear, scalable frameworks that grow with your business.</li>
                    <li>Stronger collaboration between IT and business teams. </li>
                    <li>Reduced complexity, faster delivery, and future-ready systems.</li>
                  </ul>
                </div>
              </div>
      </div>

      <div  id="idea_desc" className='description'>
            <div className='description_heading'>
              <h1><span className='description_headingspan'>SOLUTIONS</span><br />ARCHITECTURE</h1>
              <h3>Design and deliver technological solutions to address specific business  
                <br />challenges, ensuring they align with the organizations overall IT strategy.</h3>
            </div>
            <div className='cards'>
                <div className='card'>
                  <img src="../src/assets/s_symbol.png" alt="" />
                  <label htmlFor="">What we offer</label>
                  <ul>
                    <li><span className='card_span'>Strategic Alignment: </span>Solutions tailored to your business goals and long-term vision</li>
                    <li><span className='card_span'>Integrated Approach: </span>Seamlessly connect systems, people, and workflows.</li>
                    <li><span className='card_span'>Scalability at Core: </span>Built to support evolving demands and future growth.</li>
                  </ul>
                </div>
                <div className='card'>
                  <img src="../src/assets/s_symbol.png" alt="" />
                  <label htmlFor="">Ideal clients</label>
                  <ul>
                    <li>Forward-thinking organizations looking to modernize their IT landscape, unify systems, and align technology with long-term strategic goals.</li>
                    </ul>
                </div>
                <div className='card'>
                  <img src="../src/assets/s_symbol.png" alt="" />
                  <label htmlFor="">Benefits</label>
                  <ul>
                    <li>Clear, scalable frameworks that grow with your business.</li>
                    <li>Stronger collaboration between IT and business teams. </li>
                    <li>Reduced complexity, faster delivery, and future-ready systems.</li>
                  </ul>
                </div>
              </div>
      </div>

      <div  id="idea_desc" className='description'>
            <div className='description_heading'>
              <h1><span className='description_headingspan'>SOLUTIONS</span><br />ARCHITECTURE</h1>
              <h3>Design and deliver technological solutions to address specific business  
                <br />challenges, ensuring they align with the organizations overall IT strategy.</h3>
            </div>
            <div className='cards'>
                <div className='card'>
                  <img src="../src/assets/s_symbol.png" alt="" />
                  <label htmlFor="">What we offer</label>
                  <ul>
                    <li><span className='card_span'>Strategic Alignment: </span>Solutions tailored to your business goals and long-term vision</li>
                    <li><span className='card_span'>Integrated Approach: </span>Seamlessly connect systems, people, and workflows.</li>
                    <li><span className='card_span'>Scalability at Core: </span>Built to support evolving demands and future growth.</li>
                  </ul>
                </div>
                <div className='card'>
                  <img src="../src/assets/s_symbol.png" alt="" />
                  <label htmlFor="">Ideal clients</label>
                  <ul>
                    <li>Forward-thinking organizations looking to modernize their IT landscape, unify systems, and align technology with long-term strategic goals.</li>
                    </ul>
                </div>
                <div className='card'>
                  <img src="../src/assets/s_symbol.png" alt="" />
                  <label htmlFor="">Benefits</label>
                  <ul>
                    <li>Clear, scalable frameworks that grow with your business.</li>
                    <li>Stronger collaboration between IT and business teams. </li>
                    <li>Reduced complexity, faster delivery, and future-ready systems.</li>
                  </ul>
                </div>
              </div>
      </div>
    </div>
  )
}

export default Hero
