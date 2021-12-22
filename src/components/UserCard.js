import { Box, Card, Avatar } from "@mui/material"
import { Link } from "react-router-dom"
//import StarBorderIcon from '@mui/icons-material/StarBorder';
import StarIcon from '@mui/icons-material/Star';
import { yellow } from '@mui/material/colors';

function UserCard ({ user }) {
    return (
    <Box>    
        <Link to={`/users/${user.id}`} style={{ textDecoration: 'none' }}>
            <Card sx={{maxWidth: "200px", maxHeight: "250px", margin: "20px"}}>
                <Avatar 
                    alt={user.username}
                    src={user.imgUrl}
                    sx={{ width: 128, height: 128 }}
                    variant="rounded"
                />
                <Box display="flex">
                    <p style={{ marginLeft: "10px"}}>{user.username}</p>
                    <Box display="flex" style={{ marginLeft: "auto", marginRight: "10px", alignItems: "center"}}>
                        <p style={{marginLeft: "5px"}}>{user.favoritesCount}</p>
                        <StarIcon sx={{color: yellow[600]}}/>
                    </Box>
                </Box>
            </Card>
        </Link>
    </Box>)
}

export default UserCard