import passport from "passport";

// export const passportAuth = passport.authenticate('jwt', { session: false })

export const passportAuth = (strategy) => {
    return async(req, res, next) => {
        passport.authenticate(strategy, { session: false }, (error, user, info) => {
            if (error) {
                return res.redirect('/login?error=1')
            }
            if (!user) {
                return res.redirect('/login?error=2')
            }
            req.user = user
            next()
        })(req, res, next)
    }
}