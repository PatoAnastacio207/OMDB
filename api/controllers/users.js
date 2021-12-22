const { User } = require("../models")
const { Op } = require("sequelize")
const { getCoincidencesId } = require("../utils/mostCoincidencesArrays")
const { default: axios } = require("axios")

class UsersController {
    static async register(req, res, next) {
        try {
            const oldUser = await User.findOne({ where: { email: req.body.email }})
            if (oldUser) res.sendStatus(401)
            else {
                const user = await User.create(req.body)
                res.send(user)
            }
        } catch (err) {
            res.sendStatus(500)
        }
    }
    static async login (req, res, next) {
        res.send(req.user)
    }
    static async logout (req, res, next) {
        req.logOut()
        res.send(null)
    }
    static async getAll (req, res, next) {
        const users = await User.findAll()
        res.json(users)
    }
    static async getByUsername (req, res) {
        try {
            const users = await User.findAll({ where: { username: req.query.username }})
            res.json(users)
        } catch (err) {
            res.sendStatus(500)
        }
    }
    static async getById (req, res, next) {
        try {
            const user = await User.findByPk(req.params.id)
            res.json(user)
        } catch (err) {
            res.sendStatus(500)
        }
    }
    static async editUser (req, res, next) {
        try {
            if (req.params.id == req.user.id) {
                await User.update(req.body, { where: {id: req.user.id }})
                res.sendStatus(200)
            } else {
                res.sendStatus(401)
            }
        } catch (err) {
            res.sendStatus(500)
        }
    }
    static async addFavorite (req, res, next) {
        try {
            if (req.user.id == req.params.id) {
                const user = await User.findByPk(req.user.id)
                let favorites = user.favorites
                if (favorites.length == 0) {
                    favorites = req.body.imdbID
                }
                else {
                    favorites.push(req.body.imdbID)
                    favorites = favorites.join(",")
                }
                await User.update({ favorites }, { where: { id: req.user.id }})
                res.sendStatus(200)
            } else {
                res.sendStatus(401)
            }
        } catch (err) {
            res.sendStatus(500)
        }
    }
    static async deleteFavorite (req, res, next) {
        try {
            if (req.user.id == req.params.id) {
                const user = await User.findByPk(req.user.id)
                const favorites = user.favorites.filter(id => id !== req.body.imdbID)
                await User.update({ favorites: favorites.join(",") }, {where: { id: req.user.id }})
                res.sendStatus(200)
            } else {
                res.sendStatus(401)
            }
        } catch (err) {
            res.sendStatus(500)
        }
    }
    static async getActive (req, res, next) {
        try {
            const data = await User.findAll()
            const filteredUsers = data.map(user => ({ id: user.id, username: user.username, imgUrl: user.imgUrl, favoritesCount: user.favoritesCount}))
            filteredUsers.sort((a, b) => {
                return a.favoritesCount === b.favoritesCount ? 0 : (
                    a.favoritesCount < b.favoritesCount ? 1 : -1
                    )
                })
                const topUsers = filteredUsers.splice(0,10)
                res.send(topUsers)
        } catch (err) {
            res.sendStatus(500)
        }
    }
    static async getSessionsUser (req, res, next) {
        if (req.user) res.send(req.user)  
        else res.sendStatus(401) 
    }
    static async getSimilarFavorites (req, res, next) {
        try {
            const user = await User.findByPk(req.params.id)
            const data = await User.findAll({ where: {
                id: { [Op.not]: req.params.id }
            }})
            const coincidences = getCoincidencesId(user.favorites, data)
            const coincidencesNotNull = coincidences.filter(user => user.coincidences)
            const promises = coincidencesNotNull.map(item => User.findByPk(item.id))
            const similar = await Promise.all(promises)
            res.send(similar)
        } catch (err){
            res.send(500)
        }
    }
}

module.exports = UsersController