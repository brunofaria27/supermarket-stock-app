import { ObjectId } from 'mongodb'
import { Request, Response } from 'express'

import { connectToDatabase, collections } from './server'

export async function addUser(req: Request, res: Response) {}

export async function getUser(req: Request, res: Response) {}

// Preciso apenas adicionar e pegar: não vou fazer sistema de deletar a conta e mudar os dados da conta.