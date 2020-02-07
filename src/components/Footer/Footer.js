import React from 'react'

import Section from '../layout/Section'
import FooterContent from './styles/FooterContent'

const Footer = (props) => {
  return(
    <footer>
      <Section>
        <FooterContent>
          <div></div>
          <span data-test='email'>
            martinseanhunt@gmail.com
          </span>
        </FooterContent>
      </Section>
    </footer>
  )
}

export default Footer