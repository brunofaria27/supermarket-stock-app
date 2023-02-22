import React from "react";

import { Route, Routes } from "react-router-dom";

import { Header } from "./components/Header";
import { SimpleDatas } from "./components/SimpleDatas";
import { Products } from "./components/Products";
import { Estoque } from "../typescript";
import { EstoqueRe } from "./repositories/EstoqueRepository";
import { Login } from "./components/Login";
import { Cadastro } from "./components/Cadastro";

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
      <Header />
      <SimpleDatas produtos={produtos} refreshProducts={carregarProdutos}/>
      <Products produtos={produtos} refreshProducts={carregarProdutos}/>
    </>
  );
}

function LoginPage() {
  return (
    <>
      <Login />
    </>
  );
}

function RegisterPage() {
  return (
    <>
      <Cadastro />
    </>
  );
}

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<ControleEstoque />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
      </Routes>
    </>
  );
}

export default App;
