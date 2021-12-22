const Sequelize = require("sequelize")

const db = new Sequelize("omdb", "pato", null, {
    logging: false,
    dialect: "postgres",
    host: "localhost"
})

module.exports = db