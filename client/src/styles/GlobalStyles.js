import { createGlobalStyle } from "styled-components";

export const GlobalStyles = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    -ms-overflow-style: none;
    scrollbar-width: none;
  }

  *::-webkit-scrollbar {
    width: 0;
    height: 0;
    display: none;
  }

  html {
    scroll-behavior: smooth;
  }

  body {
    font-family: 'Inter', 'Segoe UI', 'Roboto', 'Helvetica Neue', Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    color: ${({ theme }) => theme.colors.paragraph};
    background-color: ${({ theme }) => theme.colors.white};
    line-height: 1.6;
  }

  h1, h2, h3, h4, h5, h6 {
    color: ${({ theme }) => theme.colors.heading};
    font-weight: ${({ theme }) => theme.fontWeight.bold};
    line-height: 1.2;
  }

  p {
    color: ${({ theme }) => theme.colors.paragraph};
  }

  a {
    text-decoration: none;
    color: inherit;
  }

  button {
    font-family: inherit;
    cursor: pointer;
  }

  img {
    max-width: 100%;
    height: auto;
    display: block;
  }

  input, textarea, select {
    font-family: inherit;
    font-size: inherit;
  }

  ul, ol {
    list-style: none;
  }
`;

export default GlobalStyles;
