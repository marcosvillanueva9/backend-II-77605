import { Router } from 'express'
import bcrypt from 'bcrypt'

import userModel from '../models/user.model.js'

const createHash = password => bcrypt.hashSync(password, bcrypt.genSaltSync(10))

const isValidPassword = (user, password) => bcrypt.compareSync(password, user.password)

const router = Router()

router.post('/login', async (req, res) => {
    const { username, password } = req.body
    if (!username || !password) {
        return res.status(400).json({message: "faltan datos"})
    }

    const user = await userModel.findOne({username})
    if (!user || !isValidPassword(user, password)) {
        return res.status(401).json({message: "password incorrecta", password, hashed: user.password})
    }

    res.status(200).json({message: "logueado correctamente"})
})

router.post('/register', async (req, res) => {
    const { username, password } = req.body
    if (!username || !password) {
        return res.status(400).json({message: "faltan datos"})
    }

    const user = await userModel.findOne({username})
    if (user) {
        return res.status(404).json({message: "ya existe ese usuario"})
    }

    const hashedPassword = createHash(password)
    
    await userModel.create({ username, password: hashedPassword})

    res.status(201).json({message: "creado correctamente"})
})

router.post('/forgot-password', async (req, res) => {
    const { username, newPassword } = req.body
    if (!username || !newPassword) {
        return res.status(400).json({message: "faltan datos"})
    }

    const user = await userModel.findOne({username})
    if (!user) {
        return res.status(404).json({message: "no ese usuario"})
    }

    const hashedNewPassword = createHash(newPassword)
    
    user.password = hashedNewPassword
    await user.save()

    res.status(201).json({message: "creado correctamente"})
})

export default router