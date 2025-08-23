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

router.post('/', async (req, res) => {
    const { nombre, apellido, edad, dni } = req.body

    if (!nombre || !apellido || !edad || !dni) {
        res.status(400).send("che te faltan datos!!!")
    }

    try {
        const nuevoUsuario = new usuario({ nombre, apellido, edad, dni })
        await nuevoUsuario.save()
        res.status(201).send(nuevoUsuario)
    } catch (err) {
        res.status(500).send("fallo el acceso a la db " + err)
    }
})

export default router;