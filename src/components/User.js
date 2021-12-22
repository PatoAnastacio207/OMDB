import { useParams, Link, Redirect } from "react-router-dom";
import { useSelector } from "react-redux"
import { useState, useEffect } from "react";
import axios from "axios";
import MovieGrid from "../containers/MovieGrid"

function User () {
    const { id } = useParams()
    const loggedUser = useSelector(state => state.user)
    const [user, setUser] = useState(false)
    const [favorites, setFavorites] = useState([])

    useEffect(() => {
        axios.get(`/api/users/id/${id}`)
            .then(({ data }) => {
                setUser(data)
                axios.get(`/api/movies/multiple/${data.id}`)
                    .then((movies) => {
                        setFavorites(movies.data)
                    })
                    .catch(console.error)
            }).catch((err) => setUser("error"))
    }, [id])

    
    return (
       <>
          {
          user ? (
            <div>
                { loggedUser.id ? (user.id === loggedUser.id ? <Link to="/edit"><p>Editar perfil</p></Link> : null) : null}
                <h3>{user.username}</h3>
                <img alt="Profile" style={{width: "300px"}}src={user.imgUrl}/>
                <p>{user.description}</p>
                <MovieGrid movies={favorites}/>
                {/* {favorites.map((movie, index) => movie.Title ? <MoviePreview movie={movie} key={index} index={index}/> : null)} */}
            </div>
          ) : <>Loading...</> }
          {
              user === "error" ? <Redirect to="/404"/> : null
          }
          </>
    )
}

export default User