import React, { ReactElement, useEffect } from "react";
import styled from "styled-components";

const Title = styled.h1`
  font-size: 1.5em;
  text-align: center;
  color: ;
`;

const Home = (): ReactElement => {
  return (
    <>
      <Title>Home</Title>
      <p>
        Sauras-tu détecter les bons artistes avant les autres, et gérer ton
        label pour les gouverner tous ?
      </p>
    </>
  );
};

export default Home;
