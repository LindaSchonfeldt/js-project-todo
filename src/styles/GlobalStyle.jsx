import { createGlobalStyle } from 'styled-components'

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
