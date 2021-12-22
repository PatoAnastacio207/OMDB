import { Box, Typography } from '@mui/material'
import SearchBar from '../containers/SearchBar'
import { manageSubmitUser } from "../utils/manageSubmit"
import { useState, useEffect } from 'react'
import UserGrid from '../containers/UserGrid'
import axios from "axios"
import Loading from './Loading'

function SearchUsers () {
    const [users, setUsers] = useState([])
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        axios.get("/api/users")
            .then(({data}) => setUsers(data))
    }, [])
    return (
        <Box>
            <Typography variant="h4">Search Movies</Typography>
            <SearchBar key="users" setValue={setUsers} manageSubmit={manageSubmitUser} setLoading={setLoading}/>
            {loading ? <Loading /> : null}
            <UserGrid users={users}/>
        </Box>
    )
}

export default SearchUsers