import React from 'react'
import '../style/footer.css'
import {GitHubIcon,TwitterIcon,LinkedInIcon} from './icons'

function Footer() {
  return (
    <div className='footer'>
      <div className='footer__left'>
        <a href="" target="_blank"><TwitterIcon/></a>
        <a href="" target="_blank"><GitHubIcon/></a>
        <a href="" target="_blank"><LinkedInIcon/></a>
      </div>
      <div className='footer__center'>
        <p>eShop</p>
      </div>
      <div className='footer__right'>
        <p>Made with ❤️ by Yassir</p>
      </div>
    </div>
  )
}

export default Footer