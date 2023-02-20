import { Estoque } from "../../typescript";

export class EstoqueRe {
  static listProducts: () => Promise<Estoque[]> = async () => {
    const res = await fetch("http://localhost:4568/");
    return (await res.json()) as Estoque[];
  };

  static deleteProducts: (id: string | undefined) => Promise<void> = async (id: string | undefined) => {
    await fetch(`http://localhost:4568/${id}`, {
      method: "DELETE",
    });
  };

  static addProducts: (data: Estoque) => Promise<void> = async (data: Estoque) => {
    await fetch("http://localhost:4568/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
  };
}
