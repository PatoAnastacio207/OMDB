const express = require("express")
const MovieCommentsController = require("../controllers/movieComments")
const router = express.Router()

router.post("/new", MovieCommentsController.createComment)
router.get("/id/:id", MovieCommentsController.getCommentsByMovieId)

module.exports = router