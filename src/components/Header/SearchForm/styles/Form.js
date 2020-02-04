import styled from 'styled-components'

const Form = styled.form`
  opacity: 0.9;
  display: flex;
  justify-content: center;

  input, button {
    border: 2px solid ${p => p.theme.colors.opaqueGrey};
    background: ${p => p.theme.colors.white};

    // Wouldn't do this in the real world (A11Y)
    &:focus { outline: none; }
    height: 60px;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  input {
    padding: 19px 25px;
    width: 325px;
    font-size: 1.5rem;
    min-width: 0;
  }

  button {
    font-weight: bold;
    text-transform: uppercase;
    padding: 20px 25px;
    text-align: center;
    border-left: none;
    cursor: pointer;
    font-size: 1.3rem;

    @media (max-width: ${({theme}) => theme.breakPoints.s}px) {
      font-size: 1.1rem;   
      padding: 20px; 10px;
    }
  }

  
`

export default Form