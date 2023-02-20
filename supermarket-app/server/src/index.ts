import * as express from 'express'
import * as cors from 'cors'

import { ObjectId } from 'mongodb'
import { Request } from 'express'

import { connectToDatabase, collections } from './services/server'

const app = express()
const port = 4568

app.use(express.json()) // Middleware para analisar o corpo da solicitação como JSON
app.use(cors<Request>())

app.post('/', async (req, res) => {
  const client = await connectToDatabase()
  const estoque = collections.estoque

  if (!estoque) {
    return res.status(500).send("A coleção estoque não foi encontrada.")
  }

  const {nome, descricao, preco, categoria, quantidade } = req.body
  await estoque.insertOne({nome, descricao, preco, categoria, quantidade })
  res.json({ message: "Inserido com sucesso no banco de dados." });
  client.close()
})

app.get('/', async (req, res) => {
  const client = await connectToDatabase()
  const estoque = collections.estoque

  if (!estoque) {
    return res.status(500).send("A coleção estoque não foi encontrada.")
  }

  const result = await estoque.find({}).toArray()
  client.close()
  res.send(result)
})

app.delete('/:id', async (req, res) => {
  const client = await connectToDatabase()
  const estoque = collections.estoque

  if (!estoque) {
    return res.status(500).send("A coleção estoque não foi encontrada.")
  }

  const id = req.params.id
  await estoque.deleteOne({ _id: new ObjectId(id) })
  res.json({ message: "Excluído com sucesso do banco de dados." });
  client.close()
})

app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`)
})
