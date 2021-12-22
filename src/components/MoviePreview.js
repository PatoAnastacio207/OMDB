import { Link, Redirect } from "react-router-dom";
import Card from "@mui/material/Card";
import { useSelector, useDispatch } from "react-redux";
import StarBorderIcon from "@mui/icons-material/StarBorder";
import StarIcon from "@mui/icons-material/Star";
import { yellow } from "@mui/material/colors";
import { Box } from "@mui/material";
import { addToFavorites, removeFromFavorites } from "../utils/favoriteManagment"
import { useState } from "react"

function MoviePreview({ movie }) {
  const user = useSelector((state) => state.user);
  const [clicked, setClicked] = useState(false)
  const dispatch = useDispatch();
  return (
    <Card sx={{ maxWidth: 300, minWidth: 300, margin: 2 }}>
      <Link to={`/movie/${movie.imdbID}`} style={{ textDecoration: "none" }}>
        <Box>
          <Box display="flex" sx={{margin: "10px"}}>
            {user.id ? (
              user.favorites === movie.imdbID ||
              user.favorites.includes(movie.imdbID) ? (
                <Box>
                  <br />
                  <StarIcon
                    fontSize="large"
                    onClick={(e) => {
                      e.preventDefault();
                      removeFromFavorites(dispatch, movie, user);
                    }}
                    sx={{ color: yellow[600] }}
                  />
                </Box>
              ) : (
                <Box>
                  <br />
                  <StarBorderIcon
                    fontSize="large"
                    onClick={(e) => {
                      e.preventDefault();
                      addToFavorites(dispatch, movie, user);
                    }}
                  />
                </Box>
              )
            ) : (
              <Box onClick={(e) => {
                e.preventDefault()
                setClicked(true)
              }}>
                {
                  clicked ? <Redirect to={`/login?movieId=${movie.imdbID}`}/> : (
                    <>
                      <br />
                      <StarBorderIcon fontSize="large"/>
                    </>
                  )
                }
              </Box>
            )}
            <p style={{fontSize: "20px", paddingTop: "5px"}}>{ movie.likes ? <>{ movie.likes }</>: null }</p>
          </Box>
          <h3 style={{color: "black", margin: "6px"}}>{movie.Title}</h3>
          <p style={{color: "#C0C0C0", margin: "6px"}}>{movie.Year}</p>
          <img src={movie.Poster} alt="Movie poster"></img>
        </Box>
      </Link>
    </Card>
  );
}

export default MoviePreview;
