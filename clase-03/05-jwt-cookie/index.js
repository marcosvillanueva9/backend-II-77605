import express from 'express'
import bcrypt from 'bcrypt'
import cookieParser from 'cookie-parser'
import { generateToken } from './utils.js'

const createHash = password => bcrypt.hashSync(password, bcrypt.genSaltSync(10))

const isValidPassword = (user, password) => bcrypt.compareSync(password, user.password)

const app = express()
const PORT = 8080

const users = []

app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(cookieParser())

app.post('/register', (req, res) => {
    const { username, password } = req.body
    if (!username || !password) {
        return res.status(400).json({message: "faltan datos"})
    }

    const user = users.find(u => u.username === username)
    if (user) {
        return res.status(404).json({message: "ya existe ese usuario"})
    }

    const hashedPassword = createHash(password)

    users.push({ username, password: hashedPassword})

    res.status(201).json({message: "creado correctamente"})
})

app.get('/login/:username/:password', (req, res) => {
    const { username, password } = req.params
    if (!username || !password) {
        return res.status(400).json({message: "faltan datos"})
    }

    const user = users.find(u => u.username === username)
    if (!user) {
        return res.status(404).json({message: "no existe tal usuario"})
    }

    if (!isValidPassword(user, password)) {
        return res.status(401).json({message: "password incorrecta", password, hashed: user.password})
    }

    const token = generateToken(user)

    res.cookie('token', token, {
        httpOnly: true,
        maxAge: 3600000
    })

    res.status(200).json({message: "logueado correctamente"})
})

app.listen(PORT, () => {
    console.log(`escuchando en http://localhost:${PORT}`)
})