import React from 'react'
import styled from 'styled-components'

import Section from './layout/Section'

const Footer = (props) => {
  return(
    <footer>
      <Section>
        <FooterContent>
          <div></div>
          <span>martinseanhunt@gmail.com</span>
        </FooterContent>
      </Section>
    </footer>
  )
}

const FooterContent = styled.div`
  padding: 80px 0;
  border-top: 1px solid ${({theme}) => theme.colors.opaqueGrey};
  position: relative;
  color: ${({theme}) => theme.colors.medLightGrey2};
  font-size: 1.3rem;
  display: flex;
  justify-content: space-between;
  align-items: center;

  div {
    width: 20px;
    height: 20px;
    border: 2px solid #000;
  }
`

export default Footer