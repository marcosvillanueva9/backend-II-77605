import User from "../models/User.js";
import bcrypt from 'bcrypt'
import { generateToken } from "../utils/jwt.js";

export async function loginUser(req, res) {
    const { email, password } = req.body
    if (!email || !password) {
        res.redirect('/login?error=1')
    }

    const user = await User.findOne({email})
    if (!user || !bcrypt.compareSync(password, user.password)) {
        res.redirect('/login?error=1')
    }

    const token = generateToken(user)
    res.cookie('currentUser', token, { signed: true, httpOnly: true })
    res.redirect('/current')
}

export async function registerUser(req, res) {
    const { first_name, last_name, email, password } = req.body
    if (!first_name || !last_name || !email || !password) {
        res.redirect('/register?error=1')
    }

    const hashedPassword = bcrypt.hashSync(password, 10)

    const user = await User.findOne({email})
    if (user) {
        res.redirect('/register?error=1')
    }

    const newUser = await User.create({ first_name, last_name, email, password: hashedPassword})

    const token = generateToken(newUser)
    res.cookie('currentUser', token, { signed: true, httpOnly: true })
    res.redirect('/current')
}