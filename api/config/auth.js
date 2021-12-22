const passport = require("passport")
const localStrategy = require("passport-local").Strategy;
const { User } = require("../models")
const app = require("../app")

passport.use(new localStrategy(
    {
        usernameField: "email",
        passwordField: "password"
    },
    (email, password, done) => {
        User.findOne({where: { email }})
            .then(user => {
                if (!user) return done(null, false)
                user.hash(password, user.salt)
                    .then(hash => {
                        if(hash !== user.getDataValue("password")) return done(null, false)
                        done(null, user)
                    })
            })
            .catch(done) 
    }
))

passport.serializeUser((user, done) => {
    done(null, user.id)
})

passport.deserializeUser((id, done) => {
    User.findByPk(id).then(user => done(null, user))
})

module.exports = passport