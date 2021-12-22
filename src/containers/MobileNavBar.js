import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logoutUser } from "../state/user.js";
import {
  Box,
  Button,
  MenuItem,
  Menu,
  IconButton,
  Avatar,
} from "@mui/material";
import { useState } from "react";
import MenuIcon from "@mui/icons-material/Menu";

function MobileNavBar() {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const handleLogout = () => {
    dispatch(logoutUser());
  };
  return (
    <Box
      sx={{ background: "#2F3E46", height: 60, display: "flex" }}
      alignItems="center"
    >
      <IconButton
        aria-controls="demo-positioned-menu"
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        onClick={handleClick}
        size="large"
        edge="start"
        sx={{ bgcolor: "secondary", margin: "-2px"}}
        aria-label="menu"
      >
        <Avatar variant="rounded" sx={{ bgcolor: "#9c27b0" }}>
          <MenuIcon />
        </Avatar>
      </IconButton>

      <Menu
        id="demo-positioned-menu"
        aria-labelledby="demo-positioned-button"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "top",
          horizontal: "left",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "left",
        }}
        sx={{textDecorators: "off"}}
      >
        <Link to="/"><MenuItem onClick={handleClose}>Home</MenuItem></Link>
        <Link to="/search"><MenuItem onClick={handleClose}>Movies</MenuItem></Link>
        <Link to="/users"><MenuItem onClick={handleClose}>Users</MenuItem></Link>
      </Menu>
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
    </Box>
  );
}

export default MobileNavBar;
