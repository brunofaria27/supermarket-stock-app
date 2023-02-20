import { ObjectId } from 'mongodb'
import { Request, Response } from 'express'

import { connectToDatabase, collections } from './server'

export async function deleteProduct(req: Request, res: Response) {
  const client = await connectToDatabase()
  const estoque = collections.estoque

  if (!estoque) {
    return res.status(500).send('A coleção estoque não foi encontrada.')
  }

  const id = req.params.id
  await estoque.deleteOne({ _id: new ObjectId(id) })
  res.json({ message: 'Excluído com sucesso do banco de dados.' })
  client.close()
}

export async function getProducts(req: Request, res: Response) {
  const client = await connectToDatabase()
  const estoque = collections.estoque

  if (!estoque) {
    return res.status(500).send('A coleção estoque não foi encontrada.')
  }

  const result = await estoque.find({}).toArray()
  client.close()
  res.send(result)
}

export async function addProducts(req: Request, res: Response) {
  const client = await connectToDatabase()
  const estoque = collections.estoque

  if (!estoque) {
    return res.status(500).send('A coleção estoque não foi encontrada.')
  }

  const { nome, descricao, preco, categoria, quantidade } = req.body
  await estoque.insertOne({ nome, descricao, preco, categoria, quantidade })
  res.json({ message: 'Inserido com sucesso no banco de dados.' })
  client.close()
}
