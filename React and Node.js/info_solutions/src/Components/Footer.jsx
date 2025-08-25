import React from 'react'

const Footer = () => {
  return (
    <div className='footer'>
        <div className='rectangle'>
            <h1> Let's build the utlity of <br />tomorrow, together</h1>
            <h3>Your One stop innovation partner.</h3>
            <a href="#footer">Contact us</a>
        </div>

        <div className='ending'>
            <div className='front'>
            <img src="../src/assets/idea.png" alt="" />
            <h3>Info Solutions is Specialized in providing consulting
                <br />with enterprise solutions, having team of experts 
                <br />with years of experience in different domains.</h3>
            <ul>
                <li><img src="../src/assets/idea.png" alt="" /></li>
                <li><img src="../src/assets/idea.png" alt="" /></li>
                <li><img src="../src/assets/idea.png" alt="" /></li>
                <li><img src="../src/assets/idea.png" alt="" /></li>
            </ul>
            </div>

            <div className='middle'>
            <label htmlFor="">Website</label>
            <ul>
                <li><a href="">Home</a></li>
                <li><a href="">About</a></li>
                <li><a href="">Services</a></li>
                <li><a href="">Case Studies</a></li>
                <li><a href="">Testimonials</a></li>
                <li><a href="">Blogs</a></li>
                <li><a href="">Careers</a></li>
            </ul>
            </div>

            <div className='last'>
                <label htmlFor="">Get In Touch</label>
                <ul>
                    <li><img src="../src/assets/idea.png" alt="" /><a href="">17541 17th St 201, Tustin, CA 92780, USA</a></li>
                    <li><img src="../src/assets/idea.png" alt="" /><a href="">+1 (714) 371-3631</a></li>
                    <li><img src="../src/assets/idea.png" alt="" /><a href="">hr@info-solutions.org</a></li>
                </ul>
            </div>
            



        </div>
      
    </div>
  )
}

export default Footer
