import React from "react";

import { Route, Routes } from "react-router-dom";

import { Header } from "./components/Header";
import { SimpleDatas } from "./components/SimpleDatas";
import { Products } from "./components/Products";

function ControleEstoque() {
  return (
    <>
      <SimpleDatas />
      <Products />
    </>
  );
}

function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<ControleEstoque />} />
      </Routes>
    </>
  );
}

export default App;
