import express from 'express'
import session from 'express-session'
import mongoose from 'mongoose'
import MongoStore from 'connect-mongo'
import handlebars from 'express-handlebars'

import sessionRouter from './src/routes/sessions.router.js'
import viewsRouter from './src/routes/views.router.js'

const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// CONEXION DB
mongoose.connect('mongodb://localhost:27017/nuestroprimerloginDB', {})

// SETEO SESSIONS
app.use(session({
    store: MongoStore.create({
        mongoUrl: 'mongodb://localhost:27017/nuestroprimerloginDB',
        collectionName: 'sessions',
        ttl: 3600
    }),
    secret: 'coderhouse',
    resave: true,
    saveUninitialized: true
}))

// SETEO HANDLEBARS
app.engine('handlebars', handlebars.engine())
app.set('view engine', 'handlebars')
app.set('views', './views')


// SETEO RUTAS
app.use('/', viewsRouter)
app.use('/api/sessions', sessionRouter)

// SERVER
const PORT = 8080
app.listen(PORT, () => {
    console.log(`Escuchando correctamente en el http://localhost:${PORT}`)
})