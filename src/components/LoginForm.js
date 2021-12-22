import useInput from "../hooks/useInput"
import { useDispatch, useSelector } from "react-redux"
import { setUser } from "../state/user"
import { Redirect, useLocation } from "react-router-dom"
import { TextField, Box, Button } from '@mui/material'
import { message } from "antd"


function LoginForm () {
    const email = useInput("")
    const password = useInput("")

    const { search } = useLocation()
    const query = new URLSearchParams(search)
    const movieId = query.get("movieId")

    const user = useSelector(state => state.user)
    

    const dispatch = useDispatch()

    const handleSubmit = (e) => {
        e.preventDefault()
        if (email.value && password.value) {
            dispatch(setUser({ email: email.value, password: password.value }))
                .then((data) => {
                    console.log(data)
                })
                .catch(console.error)
        }
    }

    return (
        <Box component="form" onSubmit={handleSubmit} display="flex" justifyContent="space-evenly" flexDirection="column">
            <TextField 
              sx={{margin: "20px", maxWidth: "600px"}}
              id="email"
              label="Email"
              {...email}
              required
            />
            <TextField
              sx={{margin: "20px", marginTop: "10px", maxWidth: "600px"}}
              id="password"
              label="Password"
              type="password"
              {...password}
              required
            />
            <Button 
                variant="contained" 
                color="primary" 
                sx={{margin: "20px", 
                    marginTop: "10px", 
                    height: "50px", 
                    maxWidth: "600px"}}
                type="submit"
            >
              Login
            </Button>
            {
                user.id ? 
                    ( movieId || movieId === 0 ? <Redirect to={`/movie/${movieId}`} /> : <Redirect to="/" />)
                 : null
            }
        </Box>
    )
}

export default LoginForm