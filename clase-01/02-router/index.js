import express from 'express'

const app = express()

const usuarios = [
    { nombre: "Doliana", apellido: "Rivas"},
    { nombre: "Ismael", apellido: "Vasconcel"},
]

app.use(express.json())
//app.use(mid1)

app.get('/inicio', (req, res) => {
    res.send("bienvenidos a nuestro servidor")
})

// ROUTER
const routerUsuario = express.Router()

routerUsuario.use(isLogged)

routerUsuario.get('/', (req, res) => {
    res.json(usuarios)
})

routerUsuario.post('/', (req, res) => {
    // logica para agregar un usuario
    res.json(usuarios)
})


app.use('/api/usuarios', routerUsuario)

function isLogged(req, res, next) {
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