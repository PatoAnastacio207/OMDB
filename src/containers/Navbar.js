import { Link } from "react-router-dom"
import { useSelector, useDispatch } from "react-redux"
import { logoutUser, renewUser } from "../state/user.js"
import { Box, Button } from "@mui/material"
import { useEffect } from "react"
import axios from "axios"
import PeopleOutlineIcon from '@mui/icons-material/PeopleOutline';
import HomeIcon from '@mui/icons-material/Home';
import PlayCircleOutlineIcon from '@mui/icons-material/PlayCircleOutline';

function Navbar () {
    const user = useSelector(state => state.user)
    const dispatch = useDispatch()
    const handleLogout = () => {
        dispatch(logoutUser())
    }

    useEffect(() => {
        axios.get("/api/users/session")
            .then(({ data }) => {
                dispatch(renewUser(data))
            }).catch(() => null)
    }, [])

    return (
    <Box sx={{ background: "#2F3E46", height: 60, display: "flex"}} alignItems="center">
        <Box sx={{ marginRight: "auto"}}>
            <Link to="/">
                <Button variant="contained" color="secondary" sx={{marginLeft: "10px"}}>
                    <HomeIcon />
                </Button>
            </Link>
            <Link to="/search">
                <Button variant="contained" color="secondary" sx={{marginLeft: "10px"}}>
                    <PlayCircleOutlineIcon />
                </Button>
            </Link>
            <Link to="/users">
                <Button variant="contained" color="secondary" sx={{marginLeft: "10px"}}>
                    <PeopleOutlineIcon/>
                </Button>
            </Link>
        </Box>
        <Box sx={{ marginLeft: "auto", marginRight: "5px"}}>
        {
            user.id ? (
            <>
                <Link to={ `/users/${user.id}` }>
                    <Button variant="outlined" color="primary" sx={{marginRight: "10px"}}>
                                { user.username }
                    </Button>
                </Link>
                <Button onClick={handleLogout} variant="contained" color="primary" sx={{marginRight: "10px"}}>
                    Logout  
                </Button>
            </>) : (
            <>
                <Link to="/register">
                    <Button variant="outlined" color="primary" sx={{marginRight: "10px"}}>
                        Register
                    </Button>
                </Link>
                <Link to="/login">
                    <Button variant="contained" color="primary" sx={{marginRight: "10px"}}> 
                        Login   
                    </Button>
                </Link>
            </>)
        }
        </Box>
    </Box>)
}

export default Navbar