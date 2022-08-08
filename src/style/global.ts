import { createGlobalStyle } from "styled-components";
import { global_colors } from "./global_colors";

export default createGlobalStyle`
  body {
      margin: 0;
      padding: 0;
      font-family: 'Roboto', sans-serif;

  }

  main {
      padding: 50px;
  }

  h1 {
      font-size: 1.5em;
      font-weight: bold;
      color: ${global_colors.titles_color}
  }

  h2 {
    font-size: 1.2em;
    font-weight: bold;
  }

  h3 {
      font-size: 1.1em
  }

  a {
      text-decoration: none;
      color: black
  }

  .m-b-15 {
      margin-bottom: 15px;
  }

  .m-l-15 {
      margin-left: 15px;
  }

  .flex-center {
      display: flex;
      align-items: center;
      justify-content: center;
  }
`;
