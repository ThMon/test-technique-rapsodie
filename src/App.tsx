import React, { ReactElement } from "react";
import "./App.css";
import { Routes, Route } from "react-router-dom";
import Container from "./components/layout/container";
import HocManager from "./lib/helpers/HocManager";
import Home from "./components/home";
import Label from "./components/label";
import Signature from "./components/signature";
import Chemar from "./components/chemar";
import Artiste from "./components/artiste";
import { Provider } from "react-redux";
import { store } from "./lib/redux";
import GlobalStyle from "./style/global";

function App() {
  return (
    <div className="App">
      <GlobalStyle />
      <Provider store={store}>
        <Container>
          <Routes>
            <Route
              path="/"
              element={
                <HocManager>
                  <Home />
                </HocManager>
              }
            />
            <Route
              path="/label"
              element={
                <HocManager>
                  <Label />
                </HocManager>
              }
            />
            <Route
              path="/signature"
              element={
                <HocManager>
                  <Signature />
                </HocManager>
              }
            />
            <Route
              path="/chemar"
              element={
                <HocManager>
                  <Chemar />
                </HocManager>
              }
            />
            <Route
              path="/artiste/:id"
              element={
                <HocManager>
                  <Artiste />
                </HocManager>
              }
            />
          </Routes>
        </Container>
      </Provider>
    </div>
  );
}

export default App;
