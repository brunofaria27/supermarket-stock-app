import { User } from "../../typescript";

export class UserRe {
  static addUser: (data: User) => Promise<Response> = async (data: User) => {
    const response = await fetch("http://localhost:4568/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    return response;
  };

  static getUser: (email: string, password: string) => Promise<Response> = async (email: string, password: string) => {
    const response = await fetch("http://localhost:4568/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });
    return response;
  }
}