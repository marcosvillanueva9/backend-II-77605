import express from 'express'
import bcrypt from 'bcrypt'

const users = []

const app = express()
app.use(express.json())

const createHash = password => bcrypt.hashSync(password, bcrypt.genSaltSync(10))

const isValidPassword = (user, password) => bcrypt.compareSync(password, user.password)

app.post('/login', (req, res) => {
    const { username, password } = req.body
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

    res.status(200).json({message: "logueado correctamente"})
})

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
    console.log(hashedPassword)

    users.push({ username, password: hashedPassword})

    res.status(201).json({message: "creado correctamente"})
})

app.get('/users', (req, res) => {
    res.json({users})
})

const PORT = 8080
app.listen(PORT, () => {
    console.log(`escuchando en http://localhost:${PORT}`)
})

// $2b$10$pjic8.Xm23D/HY9vkkqwkO0I1Im28Xa0LJ9GN7ougCqvhE6a/RBrG
// $2b$10$WPGY5dXSmh7mbmqh/ffK0OmLXPJbIX3673sgp2FBRsnF/9azJv7Uq
// $2b$10$qA7bkXMA32wzG5nuPz/pVu6Rommlu7LQzVjHo4AkexNlJaKXerwuG