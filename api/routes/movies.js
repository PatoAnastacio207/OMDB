const { default: axios } = require("axios")
const express = require("express")
const MoviesController = require("../controllers/movies")

const router = express.Router()

router.get("/search", MoviesController.searchMovies)
router.get("/popular", MoviesController.getMostPopular)
router.post("/array", MoviesController.getWithArray)
router.get("/id/:id", MoviesController.getById)
router.get("/multiple/:id", MoviesController.getFavorites)
router.post("/increase", MoviesController.increaseFavoriteCount)
router.post("/decrease", MoviesController.decreaseFavoriteCount)

module.exports = router