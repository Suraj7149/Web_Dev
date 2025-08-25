import React from 'react'

const App = () => {
  const Agent_name = "Himanshu Vishwakarma";
  

  return (
    <div className='box'>    
      <div className='contentbox'>
        <div className="notch">
          <div className="reverse_curve_bg">
            </div>
          <div className='notch_display' >
            <div className="inward_curve">
            </div>
            <div className="inward_curve curve1">
              <label htmlFor="">Agent: {Agent_name}</label>
            </div>
            <div className="inward_curve">
            </div>
        </div>
        </div>

        <div className="information_display">
          <div className="first_time_info">
            <label htmlFor="" className='green'>Date: <span>{new Date().toLocaleString("en-US", { day : '2-digit', month: "2-digit", year : "2-digit"})}</span></label>
            <label htmlFor="" className='normal'>Today - Log in Time: <span>{new Date().toLocaleString("en-US", {hour: "2-digit", minute: "2-digit", second: "2-digit"})}</span></label>
            <label htmlFor="" className='green'>Total Productive  Hours: <span>06:00:13</span></label>
          </div>
          <div className="overall_timeinfo">
            <div className="display1">
              <label htmlFor="" className='normal'>Bio Break Taken: <br /> <span>06:00:13</span></label>
              <label htmlFor="" className='normal'>Tea Break Taken: <br /> <span>06:00:13</span></label>
              <label htmlFor="" className='normal'>Lunch Taken: <br /> <span>06:00:13</span></label>
            </div>
            <div className="display2">
              <label htmlFor="" className='normal'>Offline Time Taken: <br /> <span>06:00:13</span></label>
              <label htmlFor="" className='normal'>Offline still on task <br /> Time Taken: <br />( Allows Time: 15 min ) <br /> <span>06:00:13</span></label>  
            </div>
            
            

          </div>
          <div className="logout_time">
             <label htmlFor="" className='red' >Expected Logout Time: <br /> <span>{new Date().toLocaleString("en-US", { day : '2-digit', month: "2-digit", year : "2-digit"})}</span></label>
          </div>

          
        </div>

      </div>

      
    </div>
  )
}

export default App
