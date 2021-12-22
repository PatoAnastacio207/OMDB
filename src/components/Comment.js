import { Box, Typography, Card, Avatar } from "@mui/material";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios"

function Comment ({ comment }) {
    const [user, setUser] = useState({})

    useEffect(() => {
      axios.get(`/api/users/id/${comment.userId}`)
        .then(({data}) => setUser(data))
    }, [comment.userId])

    return (
        <Card sx={{margin: "50px", marginTop: "0px", marginBottom: "10px"}}>
          {
            user.id ? (
              <Box sx={{margin: "10px", marginLeft: "50px", marginTop: "20px"}}display="flex" alignItems="center">
                <Avatar src={user.imgUrl}/>
                <Link to={`/users/${user.id}`}><Typography sx={{marginLeft: "10px", color:"#000000"}} variant="p">{user.username}</Typography></Link>
              </Box>
            ) : null
          }
          <hr style={{width: "95%"}}></hr>
          <Box sx={{margin: "10px", marginLeft: "50px", width: "95%", marginBottom: "20px"}}>
            {comment.text}
          </Box>
        </Card>
    )
}

export default Comment