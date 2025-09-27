import { Router } from "express";
import { requireAuth } from "../middlewares/auth.js";

const router = Router()

router.get('/login', (req, res) => {
    const error = req.query.error
    res.render('login', { error })
})

router.get('/register', (req, res) => {
    const error = req.query.error
    res.render('register', { error })
})

router.get('/current', requireAuth, (req, res) => {
    res.render('current', { user: req.user})
})

export default router