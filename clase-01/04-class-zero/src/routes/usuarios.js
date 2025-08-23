import { Router } from "express";

import { usuario } from "../models/usuarios.js";

const router = Router()

router.get('/', async (req, res) => {
    try {
        const usuarios = await usuario.find()
        res.status(200).send(usuarios)
    } catch (err) {
        res.status(500).send("fallo el acceso a la db")
    }
})

router.get('/:id', async (req, res) => {
    try {
        const id = req.params.id
        const user = await usuario.findById(id)
        if (!user) {
            return res.status(404).send("user not foud")
        }
        res.status(200).send(user)
    } catch (err) {
        res.status(500).send("fallo el acceso a la db")
    }
})

router.post('/', async (req, res) => {
    const { name, age, email } = req.body

    if (!name || !age || !email) {
        return res.status(400).send("che te faltan datos!!!")
    }

    try {
        const nuevoUsuario = new usuario({ name, age, email })
        await nuevoUsuario.save()
        res.status(201).send(nuevoUsuario)
    } catch (err) {
        res.status(500).send("fallo el acceso a la db " + err)
    }
})

router.put('/:id', async (req, res) => {
    try {
        const id = req.params.id
        const newData = req.body

        const user = await usuario.findByIdAndUpdate(id, newData)
        if (!user) {
            return res.status(404).send("user not foud")
        }

        res.status(200).send(user)
    } catch (err) {
        res.status(500).send("fallo el acceso a la db")
    }
})

router.delete('/:id', async (req, res) => {
    try {
        const id = req.params.id
        const user = await usuario.findByIdAndDelete(id)
        if (!user) {
            return res.status(404).send("user not foud")
        }
        res.status(200).json({message: "usuario eliminado", user})
    } catch (err) {
        res.status(500).send("fallo el acceso a la db")
    }
})

export default router;