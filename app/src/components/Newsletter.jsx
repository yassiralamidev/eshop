import React from 'react'
import '../style/newsletter.css'
import {EmailOutlinedIcon} from './icons'

function Newsletter() {
  return ( 
    <div className='newsletter'>
      <div className='newsletter__Icon'>
          <EmailOutlinedIcon sx={{fontSize:80}}/>
        </div>
        <div className='newsletter__Text'>
          <h2>Don't miss the new products</h2>
          <p>Enter your email to subscribe to our newsletter !</p>
          <input type="text" placeholder='Enter your email ...' />
          <button>Subscribe</button>
        </div>
    </div>
  )
}

export default Newsletter