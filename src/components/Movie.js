import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import { Box, Button } from "@mui/material";
import CommentsGrid from "./CommentsGrid"
import CommentForm from "./CommentForm"
import MovieCard from "./MovieCard";
import { Link } from "react-router-dom"
import Loading from './Loading'

function Movie() {
  const [movie, setMovie] = useState();
  const [likes, setLikes] = useState(0);
  const [comments, setComments] = useState([])
  const user = useSelector((state) => state.user);
  const { id } = useParams(false);
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    setLoading(true)
    axios
      .get(`/api/movies/id/${id}`)
      .then(({ data }) => {
        setLikes(data.likes);
        setMovie(data);
        return data
      }).then(data => {
        return axios.get(`/api/comments/movies/id/${data.imdbID}`)
      }).then(({data}) => {
        setComments(data)
        setLoading(false)
      })
      .catch(console.error);
  }, [id]);

  return movie ? (
    <Box>
      { loading ? <Loading/ > : null}
      <MovieCard user={user} movie={movie} setLikes={setLikes} dispatch={dispatch} likes={likes}/>
      <CommentsGrid comments={comments}/>
      {
        user.id ? <CommentForm movieId={movie.imdbID} comments={comments} setComments={setComments} user={user}/> :
        (
          <>
            <Link to={`/login?movieId=${movie.imdbID}`}><Button sx={{marginLeft: "50px", marginBottom: "30px"}} variant="outlined">Log in to comment!</Button></Link>
          </>
        )
      }
    </Box>
  ) : (
    <></>
  );
}

export default Movie;
