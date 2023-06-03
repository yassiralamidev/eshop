import React from 'react'
import '../style/contact.css'
import {EmailOutlinedIcon,CallOutlinedIcon} from '../components/icons'
import {Navbar,Newsletter,Footer} from '../components'

function Contact() {
  return (
    <>
    <Navbar/>
    <div className='contact'>
      <div className='contact__title'>
        <p>We are here to help you ! Contact us for all your questions. 💌</p>
      </div>
      <div className='contact__form'>
        <div className='form__left'>
          <h2>How can we help you ?</h2>
          <p>Fill the form or drop an email 📬</p>
          <div className='form__social'>
            <div>
              <EmailOutlinedIcon/>
              <p>contact@eshop.com</p>
            </div>
            <div>
              <CallOutlinedIcon/>
              <p>+212 512 345 678</p>
            </div>
          </div>
        </div>
        <div className='form__right'>
          <input placeholder='Name' type="text"/>
          <input placeholder='Email' type="email"/>
          <input placeholder='Subject' type="text"/>
          <input placeholder='Message' type="text"/>
          <button>Send</button>
        </div>
      </div>
    </div>
    <Newsletter/>
    <Footer/>
    </>
  )
}

export default Contact