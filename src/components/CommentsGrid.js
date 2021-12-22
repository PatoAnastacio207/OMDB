import { Box, Typography } from "@mui/material";
import Comment from "./Comment"

function CommentGrid ({ comments }) {
    return (
        <Box>
            <Typography variant="h4" sx={{marginLeft: "50px", marginBottom: "10px"}}>Comments:</Typography>
            {
                comments.map((comment, index) => <Comment key={index} comment={comment}/>)
            }
        </Box>
    )
}

export default CommentGrid