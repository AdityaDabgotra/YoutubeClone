import React from 'react'
import './Navbar.css'
import logo from '../../../public/youtube.svg'
import { Link, useNavigate } from 'react-router-dom'
import profile_img from '/profile.jpg'

const Navbar = ({ setSidebar, search, setSearch }) => {
  const navigate = useNavigate()

  const searching = () => {
    if (search === "") {
      console.log("No input")
      return
    }
    navigate('/search')
  }

  const handleVoiceSearch = () => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition
    
    if (!SpeechRecognition) {
      alert("Speech recognition is not supported in this browser.")
      return
    }

    const recognition = new SpeechRecognition()
    recognition.continuous = false
    recognition.interimResults = false

    recognition.onresult = (event) => {
      const transcript = event.results[0][0].transcript
      setSearch(transcript)
      navigate('/search')
    }

    recognition.onerror = (event) => {
      console.error("Speech recognition error:", event.error)
    }

    recognition.start()
  }

  return (
    <nav className='flex-div'>
      <div className="nav-left flex-div">
        <i 
          className="fa-solid fa-bars" 
          onClick={() => setSidebar(prev => !prev)}
        ></i>
        <Link to="/">
          <img src={logo} alt="" className='logo'/>
        </Link>
        <Link to='/' className='white'>YouTube</Link><sup>IN</sup>
      </div>

      <div className="nav-middle flex-div">
        <div className="search-box flex-div">
          <input 
            type="text" 
            placeholder='Search' 
            value={search} 
            onChange={(e) => setSearch(e.target.value)}
            onKeyPress={(e) => {
              if (e.key === 'Enter') searching()
            }}
          />
          <i 
            className="fa-solid fa-magnifying-glass" 
            onClick={searching}
          ></i>
        </div>
        <i 
          className="fa-solid fa-microphone"
          onClick={handleVoiceSearch}
        ></i>
      </div>

      <div className="nav-right flex-div">
        <i className="fa-solid fa-video"></i>
        <i className="fa-solid fa-plus"></i>
        <i className="fa-solid fa-bell"></i>
        <i className="fa-solid fa-magnifying-glass mobile-search-icon"></i>
        <img 
          src={profile_img} 
          className='user-icon' 
          alt="" 
        />
      </div>
    </nav>
  )
}

export default Navbar