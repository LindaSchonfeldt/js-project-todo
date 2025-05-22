import { createGlobalStyle } from 'styled-components'
import { media } from './media'

export const GlobalStyle = createGlobalStyle`
  /* Color scheme */
  :root {    /* Primary colors */
    --color-primary: #FFCD38;
    --color-primary-rgb: 255, 198, 27;
    --color-primary-light: #FEE187;
    --color-primary-dark: #FFBF00;
    
    /* Secondary colors */
    --color-secondary: #45a049;
    --color-secondary-light: #6aba6e;
    --color-secondary-dark: #367d39;
    
    /* Accent colors */
    --color-accent: #FF314F;
    --color-accent-light: #FF5D75;
    --color-accent-dark: #FF0529;
      
    /* Neutral colors */
    --color-background: #f0f0f0;
    --color-surface: #ffffff;
    --color-text: #333333;
    --color-text-rgb: 51, 51, 51;
    --color-text-light: #666666;
    --color-text-light-rgb: 102, 102, 102;
    --color-border: #dddddd;
    
    /* Status colors */
    --color-success: #05C46B;
    --color-warning: #FFC61B;
    --color-error: #FF314F;
    
    /* Priority colors */
    --color-priority-high: #FF314F;
    --color-priority-medium: #FF7F4F;
    --color-priority-low: #FEE187;

    /* Font settings */
    --font-family: 'DM Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
  }

  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  .visually-hidden {
    border: 0;
    clip: rect(0 0 0 0);
    height: 1px;
    margin: -1px;
    overflow: hidden;
    padding: 0;
    position: absolute;
    width: 1px;
    white-space: nowrap;
  }

  body {
    display: flex;
    flex-direction: column;
    align-items: center;
    font-family: 'DM Sans', sans-serif;
    font-size: 16px;
    background-color: var(--color-background);
    color: var(--color-text);
    padding: 20px 16px 100px;
  }

  /* Create a container for your app content */
  #root {
    width: 100%;
    max-width: 350px;
    margin: 0 auto;
    
    ${media.tablet} {
      max-width: 450px;
    }
    
    ${media.laptop} {
      max-width: 600px;
    }
    
    ${media.desktop} {
      max-width: 800px;
    }
  }
    
  a {
    text-decoration: none;
    color: inherit;
  }
  
  h1, h2, h3, h4, h5, h6 {
    margin: 0;
    color: var(--color-text);
  }
  
  p {
    margin: 0;
    color: var(--color-text-light);
  }
  
  ul {
    list-style: none;
  }
  
  button {
    cursor: pointer;
  }
`
