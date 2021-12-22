import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom"
import EditProfile from "./components/EditProfile"
import Movie from "./components/Movie"
import RegisterForm from "./components/RegisterForm"
import LoginForm from "./components/LoginForm"
import User from "./components/User"
import Navbar from "./containers/Navbar"
import { useSelector } from "react-redux"
import SearchMovies from "./components/SearchMovies"
import SearchUsers from "./components/SearchUsers"
import useMediaQuery from '@mui/material/useMediaQuery';
import MobileNavBar from "./containers/MobileNavBar"
import Home from "./containers/Home"
import axios from "axios"
// manejo de rutas


function App () {
    const user = useSelector(state => state.user)
    const mobile = useMediaQuery('(max-width:600px)');

    return (
        <BrowserRouter>
            {mobile ? <MobileNavBar /> : <Navbar />}
            <Switch>
                <Route exact path="/">
                    <Home />
                </Route>
                <Route path="/search">
                    <SearchMovies />
                </Route>
                <Route path="/movie/:id">
                    <Movie />
                </Route>
                <Route path="/register">
                    <RegisterForm />
                </Route>
                <Route path="/login">
                    <LoginForm />
                </Route>
                <Route exact path="/users">
                    <SearchUsers />
                </Route>
                <Route path="/edit">
                    { user.id ? <EditProfile /> : <Redirect to="/login"/> }
                </Route>
                <Route path="/users/:id">
                    <User />
                </Route>
                <Route path="/404">
                    <h1>404 not found</h1>
                </Route>
            </Switch>
        </BrowserRouter>
    )
}

export default App

// )