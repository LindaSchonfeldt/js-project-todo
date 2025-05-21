import { createGlobalStyle } from 'styled-components'
import { media } from './media'

export const GlobalStyle = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  body {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    font-family: 'Poppins', sans-serif;
    font-size: 16px;
    background-color: #f0f0f0;
    color: #333;
    width: 100%;
    margin: 32px 16px 132px 16px; 


    ${media.tablet} {
      width: 350px;

    }
    ${media.laptop} {
      width: 500px;
    }
    ${media.desktop} {
      width: 600px;
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
