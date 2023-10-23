import React from 'react'
import { useHistory } from 'react-router-dom'
import './home.css'

function Home() {
  
  let history = useHistory()
  const buttonclicked=()=>{
    if(localStorage.getItem('token')){
      history.push('/notes')
    } else{
      history.push('/signup')
    }
  }
  return (

    <div>
      {/* ---------------------------Section 1--------------------- */}
      <div className="section1">
        <div className="center1">
          <div className="content1">
             <div>
             NoteNest
              </div>
            <p>
            "Your personal space for ideas and memories."
            </p>
          </div>
          <div className="button">
            <button onClick={buttonclicked} className='getstartedbutton'> Get started</button>
          </div>
        </div>
      </div>
      {/* ---------------------------Section 2--------------------- */}
      <div className={`section2 `}>
        <div className="left">
          <div>
          "Experience all your notes, beautifully presented."
          </div>
        </div>
        <div className="right">
          <div className="section2img">
          </div>
        </div>
      </div>
       {/* ---------------------------Section 3--------------------- */}
       <div className="section3">
        <div className="sec3left">
        <h2>Edit On-the-Go</h2>
        <p>Made a mistake? Want to add more details? Easily edit your notes anytime, anywhere.</p>
        </div>
        <div className="sec3right">
          
          <div className="sec3gif"></div>
        </div>
       </div>
       {/* ---------------------------Section 4--------------------- */}
       <div className="section4">
        <div className="sec4left">
        <h2>Declutter with Ease</h2>
        <p>Keep your notes organized. Delete the ones you don't need with just a tap.</p>
        </div>
        <div className="sec4right">
          
          <div className="sec4gif"></div>
        </div>
       </div>
      {/* ---------------------------Section 5--------------------- */}
      <div className="section5">
        <div className="content5">
        <h2>Instant Note-Taking</h2>
        <p>The moment an idea strikes, have it noted. A seamless experience ensures no thought goes amiss.</p>
        </div>
        <div className="sec5button">
          <button onClick={buttonclicked}>Get Started Today</button>
        </div>
      </div>

    </div>
  )
}

export default Home
