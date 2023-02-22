import { ObjectId } from "mongodb";

export default class Usuario {
  constructor(
    public nome: string,
    public cpf: string,
    public email: string,
    public senha: string,
    public id?: ObjectId,
  ) {}
}
