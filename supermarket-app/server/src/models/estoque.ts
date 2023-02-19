import { ObjectId } from "mongodb";

export default class Estoque {
  constructor(
    public nome: string,
    public descricao: string,
    public preco: number,
    public categoria: string,
    public quantidade: number,
    public id?: ObjectId
  ) {}
}
