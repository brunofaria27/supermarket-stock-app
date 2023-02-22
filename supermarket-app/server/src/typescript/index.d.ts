declare global {
  namespace NodeJS {
    interface ProcessEnv {
      NODE_ENV: "development" | "production";
      PORT?: string;
      MONGO_USER: string;
      MONGO_PASS: string;
      MONGO_TOKEN: string;
      DB_NAME: string;
      COLLECTION_NAME_ESTOQUE: string;
      COLLECTION_NAME_USUARIO: string;
    }
  }
}

export {};
