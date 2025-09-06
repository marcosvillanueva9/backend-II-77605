import express from 'express'
import session from 'express-session'

const app = express()

app.use(session({
    secret: 'coderhouse',
    resave: true,
    saveUninitialized: true
}))

app.get('/', (req, res) => {
    if (!req.session.contador) {
        req.session.contador = 1
        req.session.nombre = req.query.nombre || 'Anakin'
        res.send('Hello there, ' + req.session.nombre)
        return
    } else {
        req.session.contador++
        res.send('Hello again, ' + req.session.nombre + ' vino por ' + req.session.contador + ' veces')
        return
    }
})

app.get('/logout', (req, res) => {
    req.session.destroy((err) => {
        if (err) {
            return res.status(500).send('hubo un error en el logout')
        }

        res.send('deslogueado correctamente')
    })
})

const PORT = 8080
app.listen(PORT, () => {
    console.log("escuchando")
})