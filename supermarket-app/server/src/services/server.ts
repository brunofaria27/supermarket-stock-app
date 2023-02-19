import * as mongoDB from "mongodb";
import * as dotenv from "dotenv";

export const collections: { estoque?: mongoDB.Collection } = {};

export async function connectToDatabase() {
  dotenv.config();

  const client: mongoDB.MongoClient = new mongoDB.MongoClient(
    process.env.MONGO_TOKEN
  );

  await client.connect();

  const db: mongoDB.Db = client.db(process.env.DB_NAME);
  const estoqueCollection: mongoDB.Collection = db.collection(
    process.env.COLLECTION_NAME
  );
  collections.estoque = estoqueCollection;
  console.log(
    `Successfully connected to database: ${db.databaseName} and collection: ${estoqueCollection.collectionName}`
  );

  return client
}

// https://www.freecodecamp.org/portuguese/news/como-criar-um-frontend-em-react-e-um-backend-em-node-express-backend-e-conecta-los/
// https://www.mongodb.com/compatibility/using-typescript-with-mongodb-tutorial
// https://mui.com/material-ui/getting-started/installation/