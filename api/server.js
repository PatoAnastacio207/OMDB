const express = require('express')
const db = require("./config/db")
const { User, Movie, MovieComment } = require("./models")
const { usersRouter, moviesRouter, movieCommentsRouter } = require("./routes")

const app = require("./app")
const passport = require("./config/auth")
// const auth = require("./config/auth")

app.use(passport.initialize())
app.use(passport.session())

app.use("/api/users", usersRouter)
app.use("/api/movies", moviesRouter)
app.use("/api/comments/movies", movieCommentsRouter)

db.sync({ force: false })
    .then(() => {
        app.listen(3001, () => {

        })
    })
