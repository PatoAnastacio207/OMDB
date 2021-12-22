import axios from "axios"
import { useEffect, useState } from "react"
import MovieGrid from "../containers/MovieGrid"
import Loading from "./Loading"

function PopularMovies () {
    const [movies, setMovies] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        setLoading(true)
        axios.get("/api/movies/popular")
            .then(({ data }) => {
                const ids = data.map(item => item.movieId)
                axios.post("/api/movies/array", { array: ids })
                    .then(response => response.data)
                    .then(popularMovies => {
                        popularMovies.map((movie, index) => movie.likes = data[index].likes)
                        setMovies(popularMovies)
                        setLoading(false)
                    })
            })
    }, [])

    return (
        <div>
            <p><b>Top movies!</b></p>
            {loading ? <Loading /> : null}
            <MovieGrid movies={movies}/>
        </div>
    )
}

export default PopularMovies