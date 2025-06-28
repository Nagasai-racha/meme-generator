import React from 'react'
import "../styles/header.css"
import img from "../images/trollface.png"

const Header = () => {
  return (
    <>
    <header className="header">
        <img src={img} className="header--image" alt="" />
        <h2 className='header--title'>Meme Generator</h2>

        <h4 className='header--project'>React Course Project-3</h4>
    </header>
    </>
  )
}

export default Header