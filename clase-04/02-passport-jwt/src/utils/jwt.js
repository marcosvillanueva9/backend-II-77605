import jwt from 'jsonwebtoken'

export function generateToken(user) {
    const payload = {
        id: user._id,
        first_name: user.first_name,
        email: user.email,
        role: user.role
    }

    return jwt.sign(payload, process.env.JWT_SECRET, {expiresIn: '1h'})
}

export function verifyToken(token) {
    return jwt.verify(token, process.env.JWT_SECRET)
}