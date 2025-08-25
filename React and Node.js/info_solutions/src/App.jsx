import React from 'react'
import Loader from './Components/Loader'
import Navbar from './Components/Navbar'
import Hero from './Components/Hero'
import Footer from './Components/Footer'

const App = () => {
  // const [loading, setLoading] = useState(true);

  return (    
    <div>
      {/* {loading && <Loader onFinish={() => setLoading(false)} />}
      
      {!loading && (
        <>
          <Navbar />
          <Hero />
          <Footer />
        </>
      )} */}
      <Loader />
    </div>
  )

}


{/* {}
      <Navbar />
      <Hero />
      <Footer /> */}


// const [loading, setLoading] = useState(true);

  // return (
  //   <main>
  //     {loading && <Loader onFinish={() => setLoading(false)} />}

      // {!loading && (
      //   <>
      //     <Navbar />
      //     <Hero />
      //     <Cocktails />
      //     <About />
      //     <Art />
      //     <Menu />
      //     <Contact />
      //   </>
      // )}
  //   </main>
  // )

export default App
