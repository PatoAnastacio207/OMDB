import { Box, Typography } from '@mui/material'
import SearchBar from '../containers/SearchBar'
import MovieGrid from '../containers/MovieGrid'
import { manageSubmitMovie } from "../utils/manageSubmit"
import { useState } from 'react'
import MovieFilters from "./MovieFilters"
import Loading from './Loading'

function SearchMovies () {
    const [filter, setFilter] = useState("all")
    const [movies, setMovies] = useState({})
    const [loading, setLoading] = useState(false)

    return (
        <Box>
            <Typography variant="h4">Search Movies</Typography>
            <MovieFilters setFilter={setFilter} />
            <SearchBar key="movies" setValue={setMovies} manageSubmit={manageSubmitMovie} filter={filter} setLoading={setLoading}/>
            {console.log(loading, movies)}
            { loading ? <Loading /> : (
                movies.Response ? (movies.Response === "True" ? <MovieGrid movies={movies.Search}/> : "Not found!") : null
            )}
        </Box>
    )
}

export default SearchMovies