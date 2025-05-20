import { createGlobalStyle } from 'styled-components'
import { media } from './media'

export const GlobalStyle = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  body {
    font-family: 'Poppins', sans-serif;
    background-color: #f0f0f0;
    color: #333;
    width: 100%;
    margin: 32px 16px 132px 16px; 


    ${media.tablet} {
      font-size: 16px;
      width: 70%;

    }
    ${media.laptop} {
      font-size: 18px;
      width: 50%;
    }
    ${media.desktop} {
      font-size: 20px;
      width: 40%;
    }
  }
    
  a {
    text-decoration: none;
    color: inherit;
  }
    h1, h2, h3, h4, h5, h6 {
    margin: 0;
  }
    p {
    margin: 0;
  }
    ul {
    list-style: none;
  }
    button {
    cursor: pointer;
  }`
