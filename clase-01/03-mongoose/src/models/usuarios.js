import mongoose from "mongoose";

const userCollection = 'users'

const userSchema = new mongoose.Schema({
    nombre: String,
    apellido: {
        type: String,
        required: true
    },
    edad: Number,
    dni: {
        type: Number,
        unique: true
    }
})

export const usuario = mongoose.model(userCollection, userSchema)