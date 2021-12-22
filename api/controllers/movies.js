const { API_KEY } = require('../config/config.json')
const axios = require('axios')
const { generateGenresArray } = require("../utils/manipulateMovies")
const { User, Movie } = require('../models')

const url = `http://www.omdbapi.com/?apikey=${API_KEY}`
class MoviesController {
    static async searchMovies(req, res, next) {
        try {
            const searchUrl = `${url}&s=${req.query.search}${req.query.type === "all" ? "" : `&type=${req.query.type}`}`
            console.log(searchUrl)
            const { data } = await axios.get(`${searchUrl}&page=1`)
            for(let i = 2; i <= 10; i++) {
                let newData = await axios.get(`${searchUrl}&page=${i}`)
                if(newData.data.Response == "True") newData.data.Search.forEach(movie => {
                    data.Search.push(movie)
                });
            } 
            res.json(data)
        } catch (err) {
            console.log(err)
            res.status(500).send(err)
        }
    }
    static async getById(req, res, next) {
        try {
            const { data } = await axios.get(`${url}&i=${req.params.id}&plot=full`)
            const [movie] = await Movie.findAll({where: { movieId: req.params.id }})
            data.likes = movie ? movie.likes : 0
            res.json(generateGenresArray(data))
        } catch (err) {
            res.status(404).send(err)
        }
    }
    static async getFavorites (req, res, next) {
        // Con promesas porque hay un loop, y al ser bloqueante una solicitud q demoraria 200ms demora varios segundos
        let promises = []       
        try {
            const user = await User.findByPk(req.params.id)
            user.favorites.map((value, index) => promises.push(axios.get(`${url}&i=${user.favorites[index]}&plot=full`)))
            const movies = await Promise.all(promises)
            res.send(movies.map(({data}) => data))
        } catch (err) {
            res.sendStatus(404)
        }
    }
    static async increaseFavoriteCount (req, res, next) {
        try {
            if(req.user.id == req.body.userId) {
                const movie = await Movie.findOne({where: { movieId: req.body.movieId }})
                if (movie) await Movie.update({ likes: movie.likes + 1 }, { where: { movieId: req.body.movieId }}) 
                else await Movie.create({ movieId: req.body.movieId, likes: 1 })
                res.sendStatus(200)
            } else res.sendStatus(401)
        } catch {
            res.sendStatus(500)
        }
    }
    static async decreaseFavoriteCount (req, res, next) {
        try {
            if(req.user.id == req.body.userId) {
                const movie = await Movie.findOne({where: { movieId: req.body.movieId }})
                if (movie) await Movie.update({ likes: movie.likes - 1 }, { where: { movieId: req.body.movieId }}) 
                res.sendStatus(200)
            } else res.sendStatus(401)
        } catch {
            res.sendStatus(500)
        }
    }
    static async getMostPopular (req, res, next) {
        try {
            const movies = await Movie.findAll()
            movies.sort((a, b) => a.likes < b.likes ? 1 : -1)
            res.send(movies.splice(0, 10))
        } catch {
            res.sendStatus(500)
        }
    }
    static async getWithArray (req, res, next) {
        let promises = []
        req.body.array.forEach(item => promises.push(axios.get(`${url}&i=${item}&plot=full`)))
        const promisesResponse = await Promise.all(promises)
        const data = promisesResponse.map(item => item.data)
        res.send(data)
    }
}

module.exports = MoviesController