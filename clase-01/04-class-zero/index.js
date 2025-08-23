import express from 'express'
import mongoose from 'mongoose'

import usuariosRouter from './src/routes/usuarios.js'

const app = express()
const PORT = 8080

mongoose.connect('mongodb://localhost:27017/class-zero', {})

app.use(express.json())
app.use(express.urlencoded({extended: true}))

app.use('/api/users', usuariosRouter)

app.listen(PORT, () => {
    console.log(`escuchando en ${PORT}`)
})