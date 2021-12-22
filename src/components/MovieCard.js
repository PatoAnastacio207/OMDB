import { Box, Typography, Card } from "@mui/material";
import {
    addToFavorites,
    removeFromFavorites,
  } from "../utils/favoriteManagment";
import StarBorderIcon from "@mui/icons-material/StarBorder";
import StarIcon from "@mui/icons-material/Star";
import { yellow } from "@mui/material/colors";
import { Link } from "react-router-dom";

function MovieCard({ movie, user, setLikes, dispatch, likes }) {
    return (
        <Card sx={{ margin: "50px", padding: "20px", marginBottom: "20px" }}>
        <Box display="flex" sx={{ margin: "10px" }}>
          {user.id ? (
            user.favorites === movie.imdbID ||
            user.favorites.includes(movie.imdbID) ? (
              <>
                <br />
                <StarIcon
                  fontSize="large"
                  onClick={() => {
                    setLikes(likes - 1);
                    removeFromFavorites(dispatch, movie, user);
                  }}
                  sx={{ color: yellow[600] }}
                />
              </>
            ) : (
              <>
                <br />
                <StarBorderIcon
                  fontSize="large"
                  onClick={() => {
                    setLikes(likes + 1);
                    addToFavorites(dispatch, movie, user);
                  }}
                />
              </>
            )
          ) : (
            <>
              <br />
              <Link to="/login">
                <StarBorderIcon fontSize="large" />
              </Link>
            </>
          )}
          <p style={{ fontSize: "20px", paddingBottom: "10px" }}>{likes}</p>
        </Box>
        <Typography variant="h3" component="div" color="primary" gutterBottom>
          {movie.Title}
        </Typography>
        <Typography variant="h6" color="default" gutterBottom>
          {movie.Year}
        </Typography>
        <img alt="Poster" src={movie.Poster} />
        <br />
        <Typography variant="p" gutterBottom>
          {movie.Plot}
        </Typography>
        <br />
        <br />
        <Typography variant="p" gutterBottom>
          director: <b>{movie.Director}</b>
        </Typography>
      </Card>
    )
}

export default MovieCard