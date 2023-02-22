import * as mongoDB from 'mongodb'
import * as dotenv from 'dotenv'

export const collections: {
  estoque?: mongoDB.Collection
  usuarios?: mongoDB.Collection
} = {}

export async function connectToDatabase() {
  dotenv.config()

  const client: mongoDB.MongoClient = new mongoDB.MongoClient(
    process.env.MONGO_TOKEN
  )

  try {
    await client.connect()

    const db: mongoDB.Db = client.db(process.env.DB_NAME)
    const estoqueCollection: mongoDB.Collection = db.collection(
      process.env.COLLECTION_NAME_ESTOQUE
    )
    collections.estoque = estoqueCollection

    const usuariosCollection: mongoDB.Collection = db.collection(
      process.env.COLLECTION_NAME_USUARIO
    )
    collections.usuarios = usuariosCollection

    console.log(
      `Successfully connected to database: ${db.databaseName} and collections: ${estoqueCollection.collectionName} - ${usuariosCollection.collectionName}`
    )

    return client
  } catch (error) {
    console.log(`Error to connect database.`)
    client.close()
  }
}
