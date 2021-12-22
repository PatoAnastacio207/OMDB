import { Box, Typography, Card, Avatar, Button, TextField } from "@mui/material";
import axios from "axios";
import { Link } from "react-router-dom";
import useInput from "../hooks/useInput"

function CommentForm ({ movieId, user, comments, setComments }) {
    const text = useInput("")
    const handleSubmit = async (e) => {
        e.preventDefault()
        const newComment = { movieId, text: text.value, userId: user.id }
        await axios.post("/api/comments/movies/new", newComment)
        setComments([...comments, newComment])
        text.onChange({ target: { value: "" } })
    }
    return (
        <form onSubmit={handleSubmit}>
            <Card sx={{margin: "50px", marginTop: "0px"}}>
            <Box sx={{margin: "10px", marginLeft: "50px", marginTop: "20px"}}display="flex" alignItems="center">
                <Avatar src={user.imgUrl}/>
                <Link to={`/users/${user.id}`}><Typography sx={{marginLeft: "10px", color:"#000000"}} variant="p">{user.username}</Typography></Link>
            </Box>
            <hr style={{width: "95%"}}></hr>
            <TextField {...text} sx={{margin: "10px", marginLeft: "50px", width: "95%", marginBottom: "5px"}} multiline rows={4} />
            <Box sx={{width: "95%"}}>
                <Button style={{float: "right", margin: "10px", marginTop: "0px", marginBottom: "10px"}} variant="contained" type="submit">Add comment</Button>
            </Box>
            </Card>
        </form>
    )
}

export default CommentForm