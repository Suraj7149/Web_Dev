import React from 'react'

const Hero = () => {
  return (
    <>
      <section id='hero' className='noisy'>
        <h1 className='title'> 
            MOJITO
        </h1>

        <img 
        src="/images/hero-left-leaf.png" 
        alt="left-leaf"
        className="left-leaf"
        />

         <img 
        src="/images/hero-right-leaf.png" 
        alt="right-leaf"
        className="right-leaf"
        />

        <div className="body">

        </div>

      </section>

    </>
  )
}

export default Hero
