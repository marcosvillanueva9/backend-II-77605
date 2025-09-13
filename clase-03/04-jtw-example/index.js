import express from 'express'

import { generateToken, authToken } from './utils.js'

const app = express()

const users = [
    { username: 'marcos', rol: 'admin', dni: '21412412'}
]

app.post('/login/:username', (req, res) => {
    const username = req.params.username

    const user = users.find(u => u.username === username)
    if (!user) {
        return res.status(404).json("error login")
    }

    const token = generateToken(user)
    res.json({token})
})

app.get('/protected', authToken, (req, res) => {
    res.status(200).json("ENTRO EXITOSAMENTE")
})

app.post('/logout', (req, res) => {
    res.json({message: 'session close'})
})

const PORT = 8080
app.listen(PORT, () => {
    console.log(`escuchando en http://localhost:${PORT}`)
})