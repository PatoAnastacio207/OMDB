import useInput from "../hooks/useInput";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux"
import { setUser } from "../state/user"
import { Redirect } from "react-router-dom"
import Validators from "../utils/validators";
import { TextField, Box, Button } from '@mui/material'
import { message } from "antd"


function RegisterForm () {
    const dispatch = useDispatch()
    const user = useSelector(state => state.user)
    const username = useInput("", Validators.onlyTextAndNumbers)
    const email = useInput("")
    const password = useInput("")

    const handleSubmit = (e) => {
        e.preventDefault()
        if (username.value && email.value && password.value) {
            axios.post("/api/users/register", { username: username.value, email: email.value, password: password.value })
                .then((e) => {
                    dispatch(setUser({ email: email.value, password: password.value}))
                        .catch(console.error)
                })
        } else {
            message.error("Empty fields")
        }
    }

    return (
        <Box component="form" onSubmit={handleSubmit} display="flex" justifyContent="space-evenly" flexDirection="column">
            <TextField 
              sx={{margin: "20px", maxWidth: "600px"}}
              id="username"
              label="Username"
              type="text"
              autoComplete="new-password"
              {...username}
              required
            />
            <TextField 
              sx={{margin: "20px", marginTop: "10px", maxWidth: "600px"}}
              id="email"
              label="Email"
              type="email"
              autoComplete="new-password"
              {...email}
              required
            />
            <TextField
              sx={{margin: "20px", marginTop: "10px", maxWidth: "600px"}}
              id="password"
              label="Password"
              type="password"
              autoComplete="new-password"
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
              Register
            </Button>
            {
                user.id ? <Redirect to="/" /> : null
            }
        </Box>
    )
}

export default RegisterForm