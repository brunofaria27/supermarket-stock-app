import { ObjectId } from 'mongodb'
import { Request, Response } from 'express'

import { connectToDatabase, collections } from './server'

export async function addUser(req: Request, res: Response) {
  try {
    await connectToDatabase()
    const usuario = collections.usuarios

    if (!usuario) {
      return res.status(500).send('A coleção usuarios não foi encontrada.')
    }

    const { nome, cpf, email, senha } = req.body

    const userByEmail = await usuario.findOne({ email })
    if (userByEmail) {
      return res
        .status(400)
        .send('Já existe um usuário cadastrado com este email.')
    }

    const userByCpf = await usuario.findOne({ cpf })
    if (userByCpf) {
      return res
        .status(400)
        .send('Já existe um usuário cadastrado com este CPF.')
    }

    await usuario.insertOne({ nome, cpf, email, senha })
    return res.status(200).send('Adicionado com sucesso do banco de dados.')
  } catch (error) {
    return res.status(500).send('Erro ao adicionar usuário ao banco de dados.')
  }
}

export async function getUser(req: Request, res: Response) {
  try {
    await connectToDatabase()
    const usuario = collections.usuarios

    if (!usuario) {
      return res.status(500).send('A coleção usuarios não foi encontrada.')
    }

    const { email, password } = req.body

    const user = await usuario.findOne({ email })

    if (!user || user.senha !== password) {
      return res.status(400).json({ message: 'Email ou senha incorretos.' })
    }

    return res.status(200).json({ message: 'Usuário encontrado e senha correta.' })
  } catch (error) {
    console.error(error)
    return res.status(500).json({ message: 'Erro ao buscar usuário.' })
  }
}
