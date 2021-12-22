const cookieParser = require("cookie-parser")
const sessions = require("express-session")
const express = require("express")

const app = express()

app.use(express.json())

app.use(cookieParser())
app.use(sessions({
    secret: "123456",
    resave: true,
    saveUninitialized: true,
    cookie: {
        maxAge: 3600 * 24 * 60 * 3
    }
}))

module.exports = app