import express from 'express'
import handlebars from 'express-handlebars'
import cookieParser from 'cookie-parser'
import passport from 'passport'
import dotenv from 'dotenv'

import initializePassport from './src/config/passport.js'
import viewsRouter from './src/routes/views.router.js'
import userRouter from './src/routes/user.router.js'
import connectDB from './src/config/db.js'

dotenv.config()

const app = express()

app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(cookieParser(process.env.JWT_SECRET))
app.use(express.static('public'))

// Handlebars
app.engine('handlebars', handlebars.engine())
app.set('view engine', 'handlebars')
app.set('views', 'views')

// Passport JWT
initializePassport()
app.use(passport.initialize())

// Routes
app.use('/users', userRouter)
app.use('/', viewsRouter)

// Mongo y server
const PORT = process.env.PORT || 3000
connectDB(process.env.MONGO_URL).then(() => {
    app.listen(PORT, () => {
        console.log(`escuchando en http://localhost:${PORT}`)
    })
})