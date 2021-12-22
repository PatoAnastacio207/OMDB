import { Box } from '@mui/material'
import ActiveUsers from "../components/ActiveUsers"
import PopularMovies from "../components/PopularMovies"
import SimilarUsers from "../components/SimilarUsers"

function Home () {
    return (
        <Box>
            <h1>NGMDB</h1>
            <ActiveUsers />
            <SimilarUsers />
            <PopularMovies />
        </Box>
    )
}

export default Home