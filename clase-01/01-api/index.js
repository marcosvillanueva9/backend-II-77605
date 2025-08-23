import express from 'express'

const app = express()

const usuarios = [
    { nombre: "Doliana", apellido: "Rivas"},
    { nombre: "Ismael", apellido: "Vasconcel"},
]

app.use(express.json())
//app.use(mid1)

app.get('/api/usuarios', mid1, mid2, (req, res) => {
    res.json(usuarios)
})

app.get('/api2/usuarios', mid2, (req, res) => {
    res.json(usuarios)
})

function mid1(req, res, next) {
    console.log("hola soy un middleware")
    next()
}

function mid2(req, res, next) {
    console.log("hola soy otro middleware y soy mas copado")
    next()
}

const PORT = 8080

app.listen(PORT, () => {
    console.log(`escuchando en ${PORT}`)
})