const S = require('sequelize')
const db = require('../config/db')
const bcrypt = require('bcrypt')

class User extends S.Model {
    hash(password, salt) {
        return bcrypt.hash(password, salt)
    }
}

User.init({
    username: {
        type: S.STRING,
        allowNull: false
    },
    email: {
        type: S.STRING,
        allowNull: false,
        validate: {
            isEmail: true
        },
    },
    password: {
        type: S.STRING
    },
    salt: {
        type: S.STRING
    },
    imgUrl: {
        type: S.TEXT,
        defaultValue: "https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/271deea8-e28c-41a3-aaf5-2913f5f48be6/de7834s-6515bd40-8b2c-4dc6-a843-5ac1a95a8b55.jpg?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7InBhdGgiOiJcL2ZcLzI3MWRlZWE4LWUyOGMtNDFhMy1hYWY1LTI5MTNmNWY0OGJlNlwvZGU3ODM0cy02NTE1YmQ0MC04YjJjLTRkYzYtYTg0My01YWMxYTk1YThiNTUuanBnIn1dXSwiYXVkIjpbInVybjpzZXJ2aWNlOmZpbGUuZG93bmxvYWQiXX0.BopkDn1ptIwbmcKHdAOlYHyAOOACXW0Zfgbs0-6BY-E"
    },
    favorites: {
        type: S.TEXT,
        defaultValue: "",
        get() {
            let string = this.getDataValue("favorites")
            if (string.includes(",")) return string.split(",")
            else if (string === "") return []
            else return [string]
        },
    },
    favoritesCount: {
        type: S.VIRTUAL,
        get () {
            return this.favorites.length
        }
    },
    description: {
        type: S.TEXT,
        defaultValue: "No description..."
    }
}, {
    sequelize: db, 
    modelName: "user",
    timestamps: false
})

User.beforeCreate((user) => {
    return bcrypt.genSalt(12)
        .then(salt => {
            user.salt = salt
            return user.hash(user.password, salt)
        })
        .then(hashed => {
            user.password = hashed
        });
})

module.exports = User