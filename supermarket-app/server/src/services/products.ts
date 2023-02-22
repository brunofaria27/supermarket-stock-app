import { ObjectId } from 'mongodb'
import { Request, Response } from 'express'

import { connectToDatabase, collections } from './server'

export async function deleteProduct(req: Request, res: Response) {
  try {
    await connectToDatabase()
    const estoque = collections.estoque

    if (!estoque) {
      return res.status(500).send('A coleção estoque não foi encontrada.')
    }

    const id = req.params.id
    await estoque.deleteOne({ _id: new ObjectId(id) })
    res.status(200).send('Excluído com sucesso do banco de dados.')
  } catch (error) {
    res.status(500).send('Erro ao excluir produto do banco de dados.')
  }
}

export async function getProducts(req: Request, res: Response) {
  try {
    await connectToDatabase()
    const estoque = collections.estoque

    if (!estoque) {
      return res.status(500).send('A coleção estoque não foi encontrada.')
    }

    const result = await estoque.find({}).toArray()
    res.send(result)
  } catch (error) {
    res.status(500).send('Erro ao pegar produtos do banco de dados.')
  }
}

export async function addProducts(req: Request, res: Response) {
  try {
    await connectToDatabase()
    const estoque = collections.estoque

    if (!estoque) {
      return res.status(500).send('A coleção estoque não foi encontrada.')
    }

    const { nome, descricao, preco, categoria, quantidade } = req.body
    await estoque.insertOne({ nome, descricao, preco, categoria, quantidade })
    res.status(200).send('Adicionado com sucesso do banco de dados.')
  } catch (error) {
    res.status(500).send('Erro ao adicionar produto ao banco de dados.')
  }
}
