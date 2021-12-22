import useInput from "../hooks/useInput"
import { useSelector, useDispatch } from "react-redux"
import { updateUser } from "../state/user"
import { Redirect } from "react-router-dom"
import axios from "axios"
import { useState } from "react"
import Validators from "../utils/validators";
import { TextField, Box, Button } from '@mui/material'

function EditProfile() {
    const user = useSelector(state => state.user)
    const dispatch = useDispatch()

    const [change, setChange] = useState(false)
    const username = useInput(user.username, Validators.onlyTextAndNumbers)
    const description = useInput(user.description)
    const imgUrl = useInput("")

    const handleSubmit = (e) => {
        e.preventDefault()
        // hacer el put
        if(username.value){
            axios.put(`/api/users/edit/${user.id}`, {   
                username: username.value, 
                description: description.value, 
                imgUrl: imgUrl.value === "" ? user.imgUrl : imgUrl.value
            }).then(() => {
                dispatch(updateUser(user.id))
                    .then(() => setChange(true))
            })
            .catch(console.error)   
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
                id="description"
                label="Description"
                multiline
                maxRows={8}
                {...description}
            />
            <TextField
                sx={{margin: "20px", marginTop: "10px", maxWidth: "600px"}}
                id="imgUrl"
                label="Image url"
                type="text"
                autoComplete="new-password"
                {...imgUrl}
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
              Edit
            </Button>
            {
                change ? <Redirect to={`/users/${user.id}`}/> : null
            }
        </Box>
    )
}

export default EditProfile