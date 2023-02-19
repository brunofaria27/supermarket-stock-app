import * as express from 'express'
import * as cors from 'cors'

import { Request } from 'express'

import { connectToDatabase, collections } from './services/server'

const app = express()
const port = 4568

app.use(express.json()) // Middleware para analisar o corpo da solicitação como JSON
app.use(cors<Request>())

app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`)
})
