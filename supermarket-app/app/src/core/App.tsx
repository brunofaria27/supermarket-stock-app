import React from "react";

import { Route, Routes } from "react-router-dom";

import { Header } from "./components/Header";
import { Listas } from "./components/Listas";

function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Listas />} />
      </Routes>
    </>
  );
}

export default App;
