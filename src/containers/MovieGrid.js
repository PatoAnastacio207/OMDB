import MoviePreview from "../components/MoviePreview"
import Grid from '@mui/material/Grid'


function MovieGrid ({movies}) {
    return (
        <Grid container spacing={0} justifyContent="space-evenly">{
            movies.map((movie, index) => <MoviePreview key={index} index={index} movie={movie}/>)
        }</Grid>
    )
}

export default MovieGrid