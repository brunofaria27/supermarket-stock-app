import * as express from 'express'
import * as cors from 'cors'

import { Request } from 'express'
import { addProducts, deleteProduct, getProducts } from './services/products'

const app = express()
const port = 4568

app.use(express.json()) 
app.use(cors<Request>())

// CRUD Products
app.post('/', addProducts)
app.get('/', getProducts)
app.delete('/:id', deleteProduct)

// Data Products

app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`)
})
