import axios from "axios"
import { updateUser } from "../state/user"
import { message } from "antd"

export async function addToFavorites (dispatch, movie, user) {
    try {
        await axios.put(`/api/users/favorites/${user.id}/add`, { imdbID: movie.imdbID })
        await axios.post("/api/movies/increase", { userId: user.id, movieId: movie.imdbID })
        message.info("Added")
        dispatch(updateUser(user.id))
    } catch {}
}
export async function removeFromFavorites (dispatch, movie, user) {
    try {
        await axios.put(`/api/users/favorites/${user.id}/delete`, { imdbID: movie.imdbID })
        await axios.post("/api/movies/decrease", { userId: user.id, movieId: movie.imdbID })
        message.info("Removed")
        dispatch(updateUser(user.id))
    } catch {}
}