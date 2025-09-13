import express from 'express'
import exphbs from 'express-handlebars'
import mongoose from 'mongoose'

import viewsRouter from './src/routes/views.router.js'
import userRouter from './src/routes/user.router.js'

const mongoUrl = 'mongodb://localhost:27017/recupero-password'
mongoose.connect(mongoUrl, {})

const app = express()

app.use(express.json())
app.use(express.urlencoded({extended: true}))

// handlebars
app.engine('handlebars', exphbs.engine({
    extname: '.handlebars'
}))
app.set('view engine', 'handlebars')
app.use(express.static('public'))

app.use('/api/users', userRouter)
app.use('/', viewsRouter)

const PORT = 8080
app.listen(PORT, () => {
    console.log(`escuchando en http://localhost:${PORT}`)
})

// $2b$10$b3DQOvFg3X98WmRhRk29tOsMatCG2cuJEE.sY.b7GI6lpBx7nB74i
// $2b$10$FNj07VibmxZUfeKEBH9ty.RNFNqZniLDSowBa.LMIOJpsEng59ZBe