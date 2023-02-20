import { ObjectId } from "mongodb";

type Estoque = {
    _id?: string,
    nome: string,
    descricao: string,
    preco: number,
    categoria: string,
    quantidade: number,
};