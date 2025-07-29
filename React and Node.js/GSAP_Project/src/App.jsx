import React from 'react'
import gsap from 'gsap';
import { ScrollTrigger, SplitText } from 'gsap/all';
gsap.registerPlugin(ScrollTrigger, SplitText);
import Navbar from './Components/Navbar';
import Hero from './Components/Hero';


const App = () => {
  return (
    <main>
      <Navbar />
      <Hero />
    </main>
  )
}

export default App
