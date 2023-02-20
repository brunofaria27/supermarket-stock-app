import React from "react";

import { Route, Routes } from "react-router-dom";

import { Header } from "./components/Header";
import { SimpleDatas } from "./components/SimpleDatas";
import { Products } from "./components/Products";
import { Estoque } from "../typescript";
import { EstoqueRe } from "./repositories/EstoqueRepository";

function ControleEstoque() {
  const [produtos, setProdutos] = React.useState<Estoque[]>([]);

  // Pegar os produtos sempre que abrir ou atualizar
  async function carregarProdutos() {
    try {
      setProdutos(await EstoqueRe.listProducts());
    } catch (error) {
      console.error(error);
    }
  }

  React.useEffect(() => {
    carregarProdutos();
  }, []);

  return (
    <>
      <SimpleDatas produtos={produtos} refreshProducts={carregarProdutos}/>
      <Products produtos={produtos} refreshProducts={carregarProdutos}/>
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
