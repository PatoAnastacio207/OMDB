const { MovieComment } = require("../models")

class MovieCommentsController {
    // Get comments by movie
    static async getCommentsByMovieId (req, res, next) {
        const movie = await MovieComment.findAll({where: { movieId: req.params.id }})
        res.send(movie)
    }
    // Get comments by user
    static async getCommentsUser (req, res, next) {
        const data = await MovieComment.findAll()
        res.send(data)
    }
    // Post comment
    static async createComment (req, res, next) {
        if(req.body.userId == req.user.id) {
            await MovieComment.create(req.body)
            res.sendStatus(200)
        } else {
            res.sendStatus(401)
        }
    }
}

module.exports = MovieCommentsController