const S = require('sequelize')
const db = require('../config/db')

class MovieComment extends S.Model {}

MovieComment.init({
    movieId: {
        type: S.STRING,
        allowNull: false
    },
    userId: {
        type: S.INTEGER,
        allowNull: false
    },
    text: {
        type: S.TEXT,
        allowNull: false
    }

}, {
    sequelize: db, 
    modelName: "moviecomment",
    timestamps: false
})

module.exports = MovieComment