const S = require('sequelize')
const db = require('../config/db')

class Movie extends S.Model {}

Movie.init({
    movieId: {
        type: S.STRING,
        allowNull: false,
    },
    likes: {
        type: S.INTEGER,
        defaultValue: 0
    }
}, {
    sequelize: db, 
    modelName: "movie",
    timestamps: false
})

module.exports = Movie