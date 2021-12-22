import { Typography } from "@mui/material"
import axios from "axios"
import { useState, useEffect } from "react"
import { useSelector } from "react-redux"
import UserGrid from "../containers/UserGrid"
import Loading from "./Loading"

function SimilarUsers () {
    const user = useSelector(state => state.user)
    const [similarUsers, setSimilarUsers] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        if(user.username) {
            setLoading(true)
            axios.get(`/api/users/similar/${user.id}`)
                .then(({data}) => setSimilarUsers(data))
                .then(() => setLoading(false))
                .catch()
        }

    }, [user])

    return (
        <>
            {
                user.username ? 
                (<>
                    <Typography variant="p"><b>Users with similar tastes!</b></Typography>
                    {loading ? <Loading /> : null}
                    {
                        similarUsers.length ? (
                        <>
                            <UserGrid users={similarUsers}/>
                        </>
                        ) : <Typography variant="p"><br/><br/>No coincidences, you are unique!<br/><br/></Typography>
                    }
                </>) : null
            }
        </>
    )
}

export default SimilarUsers