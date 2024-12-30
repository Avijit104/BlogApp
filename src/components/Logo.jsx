import React from 'react'
import logo from  '../assets/logo.jpg'

function Logo({width = '50px'}) {
  return (
    <div>
      <img src = {logo}  width={width}/>
    </div>
  )
}

export default Logo