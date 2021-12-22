const generateGenresArray = (movie) => {
    movie.Genre = movie.Genre.split(",").map(data => data.trim())
    return movie
}

module.exports = { generateGenresArray }