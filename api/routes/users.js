const express = require("express")
const router = express.Router()
const User = require('../models/User')
const passport = require('passport')
const UsersController = require('../controllers/users')

router.get("/", UsersController.getAll)
router.post("/register", UsersController.register)
router.post("/login", passport.authenticate("local"), UsersController.login)
router.post("/logout", UsersController.logout)
router.get("/search", UsersController.getByUsername)
router.get("/active", UsersController.getActive)
router.get("/session", UsersController.getSessionsUser)
router.get("/id/:id", UsersController.getById)
router.put("/edit/:id", UsersController.editUser)
router.get("/similar/:id", UsersController.getSimilarFavorites)
router.put("/favorites/:id/add", UsersController.addFavorite)
router.put("/favorites/:id/delete", UsersController.deleteFavorite)


module.exports = router